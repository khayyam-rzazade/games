/* The word game with two meanings: three words a day, the same for everyone. Each word looks the same in two
   languages and means something different in each. The player is asked what it means in the language of the pair
   that is not theirs and taps one of three meanings in their own language: the real one, the other language's
   meaning (the trap) and a decoy. After every tap a split card shows both meanings, then the next word. Score x/3.

   Everything this game needs lives in this folder: lookalike.css, strings.json (six languages, the game's name
   and every word of the interface) and data/days.json (made by another chat). It reads the site's frame
   (assets/js/turnsout.js) and writes nothing outside its own storage key and the results server's existing calls. */
(function () {
  "use strict";

  var TO = window.TurnsOut || null;
  var LG = window.LG || null;

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
  var START = "2026-10-29";        // day 1: the launch day. The day index is the days since this date, modulo the list's length
  var DATA = "data/days.json";     // [{ day, words: [{ pair, word, meaning, decoy, sources }] }]
  var N = 3;                       // words a day (also the score's denominator and the width of the result's mask)
  var NEED_WORLD = 5;              // "x% fell for it" is shown from this many players of the language that day

  var STORE_KEY = "lookalike:v1";         // this game's own storage; no other game's data is touched
  var LANG_KEY = "lookalike.lang";
  var SITE_LANG_KEY = "lg.findout.lang";
  var LANGS = [["en", "English", "🇬🇧"], ["it", "Italiano", "🇮🇹"],
               ["tr", "Türkçe", "🇹🇷"], ["es", "Español", "🇪🇸"],
               ["pt", "Português", "🇧🇷"], ["fr", "Français", "🇫🇷"]];
  var CODES = LANGS.map(function (l) { return l[0]; });

  var API = "https://live.logicers.com";
  var API_OLD = "https://logicers-live.rza-khay.workers.dev";
  var WAIT = 10000;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";

  /* ------------------------------------------------------------------ small helpers */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function fill(s, v) {
    if (!v) return s;
    return String(s).replace(/\{([a-z0-9_]+)\}/gi, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
  }
  function isNum(v) { return typeof v === "number" && isFinite(v); }
  function noop() { /* nothing to do */ }
  function later(f, ms) { return window.setTimeout(f, ms); }
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
  var DAYS = null;                 // the list from data/days.json, checked
  var day = 1;
  var words = [];                  // today's words prepared for the language of the player
  var store = null;                // { runs: { lang: { day: run } }, main: { day: lang }, perf: { day: 1 }, sent: {}, cc }
  var run = null;                  // today's run in this language: { p: ["r"|"t"|"d", ...], n, done }
  var srv = { views: {}, cc: null };
  var cardOpen = false;
  var cardAuto = 0;

  function T(k, v) {
    var s = null;
    if (STR && STR[lang] && STR[lang][k] != null) s = STR[lang][k];
    else if (STR && STR.en && STR.en[k] != null) s = STR.en[k];
    if (s == null) {                // a word the strings file does not have: say nothing rather than show its name
      if (window.console) window.console.warn("Logicers: no words for " + k);
      return "";
    }
    return fill(s, v);
  }
  function up1(s) { s = String(s); return s ? s.charAt(0).toLocaleUpperCase(lang) + s.slice(1) : s; }
  function pct(x) {
    try { return new window.Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 0 }).format(x); } catch (e) { return Math.round(x * 100) + "%"; }
  }
  /* Turkish puts a suffix on a number ("%62'si", "%30'u", "%100'ü"): it follows the vowel of the number as it is spoken */
  function trSuffix(n) {
    n = Math.max(0, Math.min(100, Math.round(n)));
    var ones = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    var tens = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
    var w = n === 100 ? "yüz" : n === 0 ? "sıfır" : (n % 10 === 0 ? tens[n / 10] : ones[n % 10]);
    var m = w.match(/[aeıioöuü]/g), v = m ? m[m.length - 1] : "a";
    var h = "ıa".indexOf(v) >= 0 ? "ı" : "ei".indexOf(v) >= 0 ? "i" : "ou".indexOf(v) >= 0 ? "u" : "ü";
    return "'" + (/[aeıioöuü]$/.test(w) ? "s" : "") + h;
  }

  /* ------------------------------------------------------------------ storage (this game's own key) */
  var mem = null;
  function readStore() {
    var s = null;
    try { s = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null"); } catch (e) { s = null; }
    if (!s || typeof s !== "object") s = mem || {};
    ["runs", "main", "perf", "sent"].forEach(function (k) { if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = {}; });
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
  function blank() { return { d: day, p: [], n: 0, done: false }; }
  function attach() {
    if (!store.runs[lang]) store.runs[lang] = {};
    store.runs[lang][day] = run;
  }
  function normalize(r) {
    if (!Array.isArray(r.p)) r.p = [];
    r.p = r.p.filter(function (x) { return x === "r" || x === "t" || x === "d"; }).slice(0, N);
    if (!isNum(r.n) || r.n < 0) r.n = 0;
    r.n = Math.min(r.n, r.p.length);
    r.done = r.p.length >= N;
    return r;
  }
  function score(r) { return r.p.filter(function (x) { return x === "r"; }).length; }
  function maskOf(r) {                                  // bit i is set when word i was the trap: what the server counts
    var m = 0;
    r.p.forEach(function (x, i) { if (x === "t") m |= (1 << i); });
    return m;
  }
  function allDone(r) { return !!(r && r.done && r.n >= N); }

  /* ------------------------------------------------------------------ the language of the game */
  function siteLang() {
    try {
      var v = (LG && LG.saved) ? LG.saved() : window.localStorage.getItem(SITE_LANG_KEY);
      return CODES.indexOf(v) >= 0 ? v : null;
    } catch (e) { return null; }
  }
  /* the language follows the site's language chip; a pick made here holds only until the site's chip is changed */
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

  /* ------------------------------------------------------------------ the words of the day */
  function txt(o, l) { return (o && typeof o === "object" && (o[l] || o.en)) || ""; }
  function okWord(w) {
    if (!w || !Array.isArray(w.pair) || w.pair.length !== 2) return false;
    var a = w.pair[0], b = w.pair[1];
    if (CODES.indexOf(a) < 0 || CODES.indexOf(b) < 0 || a === b) return false;
    if (!w.word || !w.word[a] || !w.word[b]) return false;
    if (!w.meaning || !w.meaning[a] || !w.meaning[b] || !w.decoy) return false;
    return true;
  }
  function checkDays(list) {
    if (!Array.isArray(list)) throw new Error("days");
    var ok = list.filter(function (d) { return d && Array.isArray(d.words) && d.words.length >= N && d.words.slice(0, N).every(okWord); });
    if (!ok.length) throw new Error("days");
    if (ok.every(function (d) { return isNum(d.day); })) ok.sort(function (x, y) { return x.day - y.day; });
    return ok;
  }
  function rng(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }
  function shuffled(arr, seed) {
    var a = arr.slice(), r = rng(seed), i, j, t;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  /* what the player is asked: the pair's language that is not theirs (a player of neither is asked about the first) */
  function prepare(entry, l) {
    var ls = 0;
    for (var k = 0; k < l.length; k++) ls += l.charCodeAt(k);
    return entry.words.slice(0, N).map(function (w, i) {
      var a = w.pair[0], b = w.pair[1];
      var target = (l === a) ? b : (l === b ? a : a);
      var other = target === a ? b : a;
      var opts = shuffled([
        { k: "r", text: txt(w.meaning[target], l) },
        { k: "t", text: txt(w.meaning[other], l) },
        { k: "d", text: txt(w.decoy, l) }
      ], day * 7919 + i * 104729 + ls * 31);
      return { i: i, a: a, b: b, target: target, other: other, word: String(w.word[target]), spell: w.word, meaning: w.meaning, opts: opts };
    });
  }
  function langName(code) { var m = T("langs"); return (m && m[code]) || code; }

  /* ------------------------------------------------------------------ the page's fixed words */
  function paintStatic() {
    document.documentElement.lang = lang;
    document.title = T("name") + " | Logicers";
    [["meta[name=description]", T("pitch")], ["meta[property='og:description']", T("pitch")], ["meta[property='og:title']", T("name")]].forEach(function (p) {
      var m = document.querySelector(p[0]);
      if (m) m.setAttribute("content", p[1]);
    });
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
    $("st-perfect-l").textContent = T("st_perfect");
    $("lang-title").textContent = T("lang");
    $("share-title").textContent = T("share_title");
    $("share-save").textContent = T("save");
    $("share-copy").textContent = T("copy");
    $("share-more").textContent = T("more_ways");
    $("strip-share").textContent = T("share");
    $("strip-result").textContent = T("result");
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
    var s = streakOf(store.main, day);
    $("st-played").textContent = s.played;
    $("st-streak").textContent = s.current;
    $("st-best").textContent = s.best;
    $("st-perfect").textContent = Object.keys(store.perf || {}).length;
  }

  /* ------------------------------------------------------------------ the screen */
  function kind(p) { return p === "r" ? "r" : p === "t" ? "t" : "m"; }
  function paintPips() {
    var box = $("pips");
    box.textContent = "";
    for (var i = 0; i < N; i++) {
      var p = run.p[i];
      box.appendChild(el("i", p ? kind(p) : (i === run.n ? "now" : "")));
    }
  }
  function langChip(code, ask) {
    var c = el("span", "lk-lang" + (ask ? " ask" : ""));
    c.appendChild(el("span", "fl", flagOfLang(code)));
    c.appendChild(document.createTextNode(langName(code)));
    return c;
  }
  function paintStage(w) {
    $("stage").hidden = false;
    $("done").hidden = true;
    var word = $("word");
    word.textContent = w.word;
    var len = Array.from(w.word).length;
    word.className = "lk-word" + (len > 9 ? " long" : "");
    word.style.setProperty("--fit", "calc((min(100vw, 30rem) - 2 * var(--pad, 16px)) / " + (Math.max(len, 1) * 0.56) + ")");     // a very long word shrinks to one line
    word.style.animation = "none"; void word.offsetWidth; word.style.animation = "";
    var box = $("langs");
    box.textContent = "";
    box.appendChild(langChip(w.a, w.a === w.target));
    box.appendChild(el("span", "sep", "≠"));
    box.appendChild(langChip(w.b, w.b === w.target));
    var inl = T("in");
    $("q").textContent = up1(T("q", { "in": (inl && inl[w.target]) || langName(w.target) }));
  }
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12.5 6.5L18 12l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function showQuestion() {
    var w = words[run.n];
    paintPips();
    paintStage(w);
    $("strip").hidden = true;
    $("midnight").hidden = true;
    var dock = $("dock");
    dock.textContent = "";
    w.opts.forEach(function (o, ix) {
      var b = el("button", "lk-opt", o.text);
      b.type = "button";
      b.setAttribute("data-k", o.k);
      b.style.setProperty("--i", ix);
      b.addEventListener("click", function () { choose(o.k); });
      dock.appendChild(b);
    });
  }
  function half(w, code, pos, pick) {
    var h = el("div", "lk-half " + pos + (code === w.target ? " ask" : (pick === "t" ? " fell" : "")));
    h.style.setProperty("--n", Math.max(8, Array.from(String(w.spell[code])).length));     // a long word takes a smaller size, never a broken line
    var l = el("p", "l");
    l.appendChild(el("span", "fl", flagOfLang(code)));
    l.appendChild(document.createTextNode(langName(code)));
    h.appendChild(l);
    h.appendChild(el("p", "w", String(w.spell[code])));
    h.appendChild(el("p", "m", txt(w.meaning[code], lang)));
    return h;
  }
  function showReveal() {
    var i = run.n, w = words[i], pick = run.p[i], last = i >= N - 1;
    paintPips();
    paintStage(w);
    $("strip").hidden = true;
    $("midnight").hidden = true;
    var dock = $("dock");
    dock.textContent = "";
    var v = el("div", "lk-verdict " + kind(pick));
    v.setAttribute("role", "status");
    v.appendChild(el("i", "", pick === "r" ? "✓" : "✕"));
    v.appendChild(el("span", "", T(pick === "r" ? "v_r" : pick === "t" ? "v_t" : "v_m")));
    dock.appendChild(v);
    var split = el("div", "lk-split");
    split.appendChild(half(w, w.a, "a", pick));
    split.appendChild(half(w, w.b, "b", pick));
    dock.appendChild(split);
    var nb = el("button", "btn solid lk-next");
    nb.type = "button";
    nb.id = "next";
    nb.appendChild(el("span", "", T(last ? "result" : "next")));
    nb.insertAdjacentHTML("beforeend", ARROW);
    nb.addEventListener("click", next);
    dock.appendChild(nb);
    try { nb.focus({ preventScroll: true }); } catch (e) { /* no focus */ }
  }
  function showDone() {
    paintPips();
    $("stage").hidden = true;
    $("dock").textContent = "";
    var box = $("done");
    box.hidden = false;
    box.textContent = "";
    var s = el("p", "lk-score");
    s.setAttribute("aria-label", T("score_aria", { n: score(run), t: N }));
    s.appendChild(document.createTextNode(String(score(run))));
    s.appendChild(el("small", "", "/" + N));
    box.appendChild(s);
    box.appendChild(rowsEl());
    $("strip").hidden = false;
    $("midnight").hidden = false;
  }
  function render() {
    if (allDone(run)) showDone();
    else if (run.p.length > run.n) showReveal();
    else showQuestion();
    $("app").style.visibility = "";
  }

  /* ------------------------------------------------------------------ playing */
  function choose(k) {
    if (!run || run.done && run.p.length >= N || run.p.length > run.n || cardOpen) return;
    var i = run.n;
    run.p[i] = k;
    attach();
    var finished = run.p.length >= N;
    if (finished) finishRun(); else save();
    showReveal();
  }
  function next() {
    if (!run || run.p.length <= run.n) return;
    run.n++;
    attach();
    save();
    if (run.n >= N) {
      showDone();
      window.clearTimeout(cardAuto);
      cardAuto = later(function () { openCard(); }, reduced() ? 150 : 450);
    } else showQuestion();
  }
  function finishRun() {
    run.done = true;
    if (!store.main[day]) {                                // the day's first run counts for the streak and the perfect days; a second language never does
      store.main[day] = lang;
      if (score(run) >= N) store.perf[day] = 1;
    }
    save();
    paintStreak();
    if (TO && TO.count) TO.count("lookalike/played/" + lang);
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
  function idOf(l) { return "lookalike-" + l; }

  /* One game id per language. The result is { k, e }: e is a number from 0 to 7 whose bits say which of the three
     words were the trap (bit 0 the first word). That is the shape of Long Lost Cousin's and The Club's results (one
     whole number, no guess), so the Worker needs only the six ids. */
  var refused = {};
  function sendRun(l, r) {
    var key = dateKey(), tag = key + ":" + l, id = idOf(l);
    if (optedOut() || store.sent[tag] || refused[tag]) return Promise.resolve(null);
    store.sent[tag] = 1;
    save();
    return post("/stats/send", { d: key, rs: [{ k: id, e: maskOf(r) }], k: id }).then(function (res) {
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
    return post("/stats/view", { d: dateKey(), k: idOf(l) }).then(function (res) {
      if (res.status === 200) {
        takeYou(res.data.you);
        if (res.data.view) srv.views[l] = res.data.view;
      }
    }).then(null, noop);
  }
  function ensureCountry() {
    if (srv.cc) return Promise.resolve();
    /* the lookalike-* ids may not be on the server yet (400 carries no country): ask an existing game, only for where the player is */
    return post("/stats/view", { d: dateKey(), k: "hundred" }).then(function (res) {
      if (res.status === 200) takeYou(res.data.you);
    }).then(null, noop);
  }
  function syncServer(l) {
    if (!serverOn()) return Promise.resolve();
    var r = runOf(l, day);
    if (!r || !r.done) return Promise.resolve();
    return sendRun(l, r).then(function (res) {
      if (res && res.status === 200) {
        takeYou(res.data.you);
        if (res.data.view) srv.views[l] = res.data.view;
      }
    }).then(null, noop).then(function () {
      if (refused[dateKey() + ":" + l]) return null;       // the server does not know the ids yet: its views would be refused too
      return srv.views[l] ? null : loadView(l);
    }).then(function () { return ensureCountry(); }).then(function () { liveUpdate(); });
  }

  /* ------------------------------------------------------------------ "x% fell for it", from the server's histogram */
  /* The server keeps, per game id and day, how many results fell in each tenth of the points (view.w.h, eleven
     columns) and how many results there were (view.w.n). A result's points are round(100 * (1 - e / 7)), so the eight
     possible masks 0..7 land in eight different columns, and the share of players who fell for word i is the sum
     of the columns of the masks that have bit i. */
  function tenthOfMask(m) {
    var p = Math.round(100 * (1 - m / 7));
    return p >= 100 ? 10 : Math.max(0, Math.min(9, Math.floor(p / 10)));
  }
  function trapShares(v) {
    var w = v && v.w;
    if (!w || !(w.n >= NEED_WORLD) || !Array.isArray(w.h) || w.h.length < 11) return null;
    var cnt = [0, 0, 0], m, i;
    for (m = 0; m < 8; m++) {
      var c = w.h[tenthOfMask(m)] || 0;
      for (i = 0; i < N; i++) if (m & (1 << i)) cnt[i] += c;
    }
    return { n: w.n, share: cnt.map(function (x) { return Math.max(0, Math.min(1, x / w.n)); }) };
  }

  /* ------------------------------------------------------------------ the three results (the page's own list and the end sheet's) */
  function rowsEl() {
    var box = el("div", "lk-rows");
    var sh = trapShares(srv.views[lang]);
    words.forEach(function (w, i) {
      var pk = run.p[i];
      var row = el("div", "lk-row " + kind(pk));
      row.appendChild(el("i", "mk", pk === "r" ? "✓" : "✕"));
      var body = el("div", "bd");
      body.appendChild(el("span", "w", w.word));
      var ms = el("div", "ms");
      [w.a, w.b].forEach(function (code) {
        var s = el("span");
        s.appendChild(el("b", "", code.toUpperCase()));
        s.appendChild(document.createTextNode(txt(w.meaning[code], lang)));
        ms.appendChild(s);
      });
      body.appendChild(ms);
      if (sh) {
        var x = sh.share[i];
        body.appendChild(el("span", "fellp", T("fell", { p: pct(x), who: (T("who") || {})[lang] || "", s: lang === "tr" ? trSuffix(Math.round(x * 100)) : "" })));
        var bp = el("span", "bar-p"), f = el("i");
        f.style.width = Math.round(x * 100) + "%";
        bp.appendChild(f);
        body.appendChild(bp);
      }
      row.appendChild(body);
      box.appendChild(row);
    });
    return box;
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
    if (!allDone(run)) return;
    closeCard(true);
    var wrap = el("div", "fin");
    wrap.id = "fin";
    var scrim = el("div", "fin-scrim");
    wrap.appendChild(scrim);
    var sheet = el("section", "fin-sheet fin-full");
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", T("score_aria", { n: score(run), t: N }));
    sheet.setAttribute("tabindex", "-1");
    var top = el("div", "onward-top");
    var h = el("h2", "fin-h lk-fin-h", score(run) + "/" + N);
    h.setAttribute("aria-label", T("score_aria", { n: score(run), t: N }));
    top.appendChild(h);
    var x = el("button", "chip round close fin-x", "×");
    x.type = "button";
    x.setAttribute("aria-label", T("close"));
    top.appendChild(x);
    sheet.appendChild(top);

    var pips = el("div", "lk-fin-pips");
    pips.setAttribute("aria-hidden", "true");
    run.p.forEach(function (p) { pips.appendChild(el("i", kind(p))); });
    sheet.appendChild(pips);

    var live = el("div", "lk-live");                    // the three results; the server's lines join them when it has answered
    live.id = "lk-live";
    sheet.appendChild(live);
    var sub = el("p", "lk-fin-sub");
    sub.id = "lk-players";
    sub.hidden = true;
    sheet.appendChild(sub);

    var sh = el("button", "btn solid lk-share", T("share"));
    sh.type = "button";
    sh.addEventListener("click", function () { shareNow(); });
    sheet.appendChild(sh);

    var more = el("a", "fin-more lk-more");
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
  function renderLive() {
    var live = $("lk-live");
    if (!live || !run) return;
    live.textContent = "";
    live.appendChild(rowsEl());
    var sh = trapShares(srv.views[lang]), sub = $("lk-players");
    if (sub) { sub.hidden = !sh; if (sh) sub.textContent = T("players", { n: sh.n.toLocaleString ? sh.n.toLocaleString(lang) : sh.n }); }
  }
  function liveUpdate() {
    if (cardOpen) renderLive();
    if (run && allDone(run) && !$("done").hidden) showDone();
  }

  /* ------------------------------------------------------------------ share: the three results as a picture, a line of text */
  function baseUrl() {
    var u = window.location.origin + window.location.pathname.replace(/index\.html$/, "");
    return LOCAL ? u : "https://logicers.com/lookalike/";
  }
  function shareText() {
    var cc = srv.cc || store.cc, fl = cc ? flagOf(cc.c) : "";
    if (!fl) fl = flagOfLang(lang);
    return ["Logicers " + T("name"), score(run) + "/" + N, fl].join(" · ") + "\n" + baseUrl();
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
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
      var ctx = cv.getContext("2d"), D = '"Bricolage Grotesque", "Figtree", system-ui, sans-serif', X = '"Figtree", system-ui, sans-serif';
      var INK = "#15172B", SOFT = "#5D6279", ACC = "#0087A8", HIT = "#2E9F63", TRAP = "#E8780C", MISS = "#8D93AB";
      ctx.fillStyle = "#DAF1F7"; ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = "#FFFFFF"; roundRect(ctx, 56, 56, 968, 1238, 60); ctx.fill();
      // wordmark
      var dots = [["#2D4FC4", 112, 134], ["#D5492F", 92, 164], ["#0D7D73", 132, 164]];
      dots.forEach(function (d) { ctx.fillStyle = d[0]; ctx.beginPath(); ctx.arc(d[1], d[2], 13, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = INK; ctx.font = "800 54px " + D; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillText("Logicers", 160, 166);
      ctx.fillStyle = ACC; ctx.textAlign = "right"; ctx.fillText(T("name"), 984, 166);
      // the score
      ctx.textAlign = "center"; ctx.fillStyle = INK; ctx.font = "800 190px " + D;
      ctx.fillText(score(run) + "/" + N, 540, 384);
      // the three results, one bar each: green right, orange the trap, grey the other
      words.forEach(function (w, i) {
        var pk = run.p[i], y = 448 + i * 252, col = pk === "r" ? HIT : pk === "t" ? TRAP : MISS;
        ctx.fillStyle = col; roundRect(ctx, 96, y, 888, 222, 44); ctx.fill();
        // the mark: a white disc with a tick or a cross
        ctx.fillStyle = "rgba(255,255,255,.95)"; ctx.beginPath(); ctx.arc(190, y + 111, 52, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath();
        if (pk === "r") { ctx.moveTo(166, y + 112); ctx.lineTo(184, y + 131); ctx.lineTo(217, y + 90); }
        else { ctx.moveTo(171, y + 92); ctx.lineTo(209, y + 130); ctx.moveTo(209, y + 92); ctx.lineTo(171, y + 130); }
        ctx.stroke();
        // the word, as large as the room allows, and the two languages
        var size = 104, wd = w.word;
        ctx.textAlign = "left"; ctx.fillStyle = "#FFFFFF";
        do { ctx.font = "800 " + size + "px " + D; size -= 4; } while (ctx.measureText(wd).width > 560 && size > 44);
        ctx.fillText(wd, 276, y + 128);
        ctx.font = "800 38px " + X; ctx.textAlign = "right";
        ctx.fillText(w.a.toUpperCase() + " ≠ " + w.b.toUpperCase(), 948, y + 66);
      });
      ctx.textAlign = "center"; ctx.fillStyle = ACC; ctx.font = "700 40px " + X;
      ctx.fillText("logicers.com/lookalike", 540, 1262);
      return new Promise(function (resolve) {
        if (cv.toBlob) cv.toBlob(function (bl) { resolve(bl); }, "image/png");
        else resolve(null);
      });
    });
  }
  var shareUrl = null;
  function shareNow() {
    if (!run || !allDone(run)) return;
    picture().then(function (blob) {
      var text = shareText(), file = null, can = false;
      try { if (blob && typeof File === "function") file = new File([blob], "lookalike.png", { type: "image/png" }); } catch (e) { file = null; }
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
    if (TO && TO.count) TO.count("lookalike/share");
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
      var d = runOf(L[0], day), done = d && normalize(d).done;
      var b = el("button", "lg-pick" + (L[0] === lang ? " on" : ""));
      b.type = "button";
      b.appendChild(el("span", "lg-flag", L[2]));
      b.appendChild(el("b", "", L[1]));
      if (done) { var s = el("span", "", score(d) + "/" + N); s.style.marginLeft = "auto"; s.style.color = "var(--soft)"; s.style.fontWeight = "700"; b.appendChild(s); }
      b.addEventListener("click", function () {
        if (TO) TO.closeDialog($("dlg-lang"));
        switchLang(L[0]);
      });
      list.appendChild(b);
    });
  }
  function switchLang(l) {
    if (l === lang || CODES.indexOf(l) < 0) return;
    window.clearTimeout(cardAuto);
    closeCard(true);
    rememberLang(l);
    lang = l;
    $("loaderr").hidden = true;
    paintStatic();
    start();
  }

  /* ------------------------------------------------------------------ starting */
  function setRun() {
    var r = runOf(lang, day);
    run = r ? normalize(r) : blank();
    words = prepare(DAYS[(day - 1) % DAYS.length], lang);
  }
  function start() {
    $("loaderr").hidden = true;
    var ready = DAYS ? Promise.resolve(DAYS) : getJSON(DATA).then(function (j) { DAYS = checkDays(j); return DAYS; });
    return ready.then(function () {
      setRun();
      render();
      if (run.done) syncServer(lang);
    }, function () {
      $("stage").hidden = true;
      $("dock").textContent = "";
      $("done").hidden = true;
      $("pips").textContent = "";
      $("loaderr").hidden = false;
      $("app").style.visibility = "";
    });
  }

  function onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector("dialog[open]") || cardOpen || !run || !words.length) return;
    var k = e.key;
    if ((k === "1" || k === "2" || k === "3") && !allDone(run) && run.p.length <= run.n) {
      var o = words[run.n].opts[+k - 1];
      if (o) { e.preventDefault(); choose(o.k); }
    } else if (k === "Enter" && !allDone(run) && run.p.length > run.n) {
      var t = e.target;
      if (t && t.closest && t.closest("button, a, input, textarea, select")) return;
      e.preventDefault();
      next();
    }
  }

  function boot() {
    if (TO) { TO.wireDialogs(); TO.fixLocalLinks(); }
    store = readStore();
    day = dayNo();
    prune();
    lang = pickLang();
    run = blank();

    $("strip-share").addEventListener("click", shareNow);
    $("strip-result").addEventListener("click", function () { openCard(); });
    $("loaderr-b").addEventListener("click", function () { start(); });
    $("streak-chip").addEventListener("click", paintAlbum);
    $("lg-chip").addEventListener("click", buildLangList);
    document.addEventListener("keydown", onKeyDown);
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
