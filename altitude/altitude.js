/* Altitude: a daily word climb. Stage 1 is a 2-letter word, then 3, 4 ... up to 8, Wordle colours,
   and ONE budget of guesses for the whole climb. Same words for everyone (answers[L][day mod length]).
   Everything this game needs lives in this folder: altitude.css, strings.json (six languages), words/<lang>.json
   (made by another chat). It reads the site's frame (assets/js/turnsout.js) and writes nothing outside its own
   storage key and the results server's existing calls. */
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
  var START = "2026-10-28";        // day 1 (the day number only picks the words and labels the day)
  var BUDGET = 20;                 // guesses to start with; when they run out, the climb ends
  var BONUS = 1;                   // guesses given back for every word found ("+1" flies into the counter)
  /* Hints (29 Oct 2026, Khayyam): a climb starts with two, and two more can be earned by answering a question
     from Logicers' own puzzles. They cost no guesses — the pool is the limit, and so is the cap per word:
     one hint on the 2- and 3-letter words (where one letter is most of the answer), two from 4 letters up. */
  var HINTS_FREE = 2;              // hints a climb begins with
  var HINTS_EARN = 2;              // the most that can be earned on top, one question each
  var REVEAL_FROM = 7;             // from this many letters, the word's first letter is given
  var WARM_AT = 3;                 // the counter turns warm (never red) when this many guesses or fewer are left
  var FIRST = 2, LAST = 8;         // letters of the first stage and of the summit
  var HOLD = 3000;                 // ms a found word stays on screen (flag, cheer, +1) before the climb moves up
                                   /* 28 Oct 2026, Khayyam: the climb was flicking past. Every step is now walked
                                      through — the letters turn over one at a time, the flag goes in, the cheer
                                      reads, the +1 flies, and only then does the next word come. */
  var NEED_COUNTRY = 3;            // a country's average is shown from this many players
  var NEED_WORLD = 2;              // the day's picture of everyone from this many players

  var STORE_KEY = "altitude:v1";   // this game's own storage; no other game's data is touched
  var LANG_KEY = "altitude.lang";
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
    s = String(s).replace(/\{([a-z0-9_]+)\}/gi, function (m, k) { return Object.prototype.hasOwnProperty.call(v, k) ? String(v[k]) : m; });
    /* Italian: the article drops its vowel before a number said with a vowel, 8, 11 and 80 to 89: "il 8%" -> "l'8%" */
    if (lang === "it") s = s.replace(/\b([Ii])l (8|11|8[0-9])(?![0-9.])/g, function (m, i, n) { return (i === "I" ? "L" : "l") + "'" + n; });
    return s;
  }
  /* "one" after a count: exactly 1 everywhere; also 0 to 2 in French and above 0 to 2 in Portuguese, as those languages count (the same rule as LG.one) */
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
  function reduced() {
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) { return false; }
  }
  function computer() {
    try { return !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches); } catch (e) { return false; }
  }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function dateKey() { var d = new Date(); return String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate()); }
  function yesterKey() { var d = new Date(); d.setDate(d.getDate() - 1); return String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate()); }
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
  function clock(ms) {
    var s = Math.max(0, Math.round(ms / 1000)), m = Math.floor(s / 60);
    return m + ":" + two(s % 60);
  }

  /* ------------------------------------------------------------------ state */
  var STR = null;                  // strings.json
  var lang = "en";
  var W = null;                    // the prepared words of the current language
  var day = 1;
  var store = null;                // { runs: { lang: { day: run } }, main: { day: lang }, sent: {}, best, cc }
  var run = null;                  // today's run in this language
  var view = { L: FIRST };         // the stage on the board
  var cur = [];                    // the letters being typed
  var curRow = null;
  var busy = false;
  var beat = 0;                    // ?beat=N
  var srv = { views: {}, yviews: {}, cc: null, tried: {} };
  var toastTimer = 0, shakeTimer = 0, cheerTimer = 0;
  var lag = 0;                     // guesses given back that the counter has not shown yet (the "+1" is still flying)
  var cardOpen = false;
  var shownThisVisit = false;      // the card opens itself once a visit, not every time it is closed
  var cardAuto = 0;

  function T(k, v) {
    var s = null, k1 = k + "_1", c = v && v.cnt !== undefined ? v.cnt : v && v.n;       // cnt: the number itself, where n is already written out ("1.234")
    var single = v && c !== undefined && isOne(c);
    if (single && STR && STR[lang] && STR[lang][k1] != null) s = STR[lang][k1];            // a string of its own for exactly one: "1 guess", "1 tentativo"
    else if (STR && STR[lang] && STR[lang][k] != null) s = STR[lang][k];
    else if (single && STR && STR.en && STR.en[k1] != null) s = STR.en[k1];
    else if (STR && STR.en && STR.en[k] != null) s = STR.en[k];
    if (s == null) {                // a word the strings file does not have: say nothing rather than show its name
      if (window.console) window.console.warn("Logicers: no words for " + k);
      return "";
    }
    return fill(s, v);
  }
  function up(ch) { return String(ch).toLocaleUpperCase(lang); }
  function nf(n, d) {
    try { return Number(n).toLocaleString(lang, { minimumFractionDigits: d, maximumFractionDigits: d }); } catch (e) { return Number(n).toFixed(d); }
  }
  function nInt(n) {
    try { return Number(n).toLocaleString(lang); } catch (e) { return String(n); }
  }
  function pct(x) {
    try { return new window.Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 0 }).format(x); } catch (e) { return Math.round(x * 100) + "%"; }
  }
  function nth(n, fem) {                    // fem: a feminine noun follows (Portuguese "3ª tentativa")
    n = Number(n);
    if (lang === "en") { var e = ["th", "st", "nd", "rd"], v = n % 100; return n + (e[(v - 20) % 10] || e[v] || e[0]); }
    if (lang === "pt" && fem) return n + "ª";
    if (lang === "it" || lang === "pt") return n + "º";
    if (lang === "es") return n + ".º";
    if (lang === "fr") return n === 1 ? "1er" : n + "e";
    return n + ".";
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
    ["runs", "main", "sent"].forEach(function (k) { if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k])) s[k] = {}; });
    if (!isNum(s.best)) s.best = 0;
    return s;
  }
  function save() {
    mem = store;
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* no storage: the climb still works until the page closes */ }
  }
  function prune() {
    Object.keys(store.runs).forEach(function (l) {
      Object.keys(store.runs[l]).forEach(function (d) { if (+d < day - 30) delete store.runs[l][d]; });
    });
    Object.keys(store.sent).forEach(function (k) { if (String(k).slice(0, 8) < String(+dateKey() - 3)) delete store.sent[k]; });
  }
  function runOf(l, d) { return (store.runs[l] && store.runs[l][d]) || null; }
  function blank() {
    return { d: day, L: FIRST, g: {}, used: 0, found: [], h: null, done: false, ms: 0, t: 0,
             hp: HINTS_FREE, he: 0, hi: {}, qs: [] };
  }
  /* how many hints one word may take: a letter is most of a 2- or 3-letter word, so it gets one */
  function hintCap(L) { return L <= 3 ? 1 : 2; }
  function hintsOn(L) { return (run.hi && run.hi[String(L)]) || []; }
  function canHint() { return canPlay() && run.hp > 0 && hintsOn(run.L).length < hintCap(run.L); }
  function canEarn() { return canPlay() && run.he < HINTS_EARN; }
  function attach() {
    if (!store.runs[lang]) store.runs[lang] = {};
    store.runs[lang][day] = run;
  }
  function height(r) { return r.found.length ? Math.max.apply(null, r.found) : 0; }
  function capOf(r) { return BUDGET + BONUS * r.found.length; }          // all the guesses this climb has had so far
  function normalize(r) {
    if (!Array.isArray(r.found)) r.found = [];
    if (!r.g || typeof r.g !== "object") r.g = {};
    if (!isNum(r.used)) r.used = 0;
    if (!isNum(r.ms)) r.ms = 0;
    if (!isNum(r.L) || r.L < FIRST || r.L > LAST) r.L = FIRST;
    /* hints: a climb saved before 29 Oct 2026 carries one `hint` object and paid guesses for it. Keep the
       letter it revealed, and give the climb the new pool; the guesses it already spent are left spent. */
    if (!r.hi || typeof r.hi !== "object") r.hi = {};
    if (r.hint && isNum(r.hint.L) && isNum(r.hint.i)) {
      if (!r.hi[String(r.hint.L)]) r.hi[String(r.hint.L)] = [r.hint.i];
      delete r.hint;
    }
    if (!Array.isArray(r.qs)) r.qs = [];
    if (!isNum(r.he) || r.he < 0 || r.he > HINTS_EARN) r.he = 0;
    if (!isNum(r.hp) || r.hp < 0) {
      var spent = 0;
      Object.keys(r.hi).forEach(function (k) { spent += r.hi[k].length; });
      r.hp = Math.max(0, HINTS_FREE + r.he - spent);
    }
    if (!r.done) {
      while (r.found.indexOf(r.L) >= 0 && r.L < LAST) r.L++;
      if (r.found.indexOf(LAST) >= 0 || r.used >= capOf(r)) { r.done = true; r.h = height(r); }
    }
    return r;
  }

  /* ------------------------------------------------------------------ the language of the climb */
  function siteLang() {
    try {
      var v = (LG && LG.saved) ? LG.saved() : window.localStorage.getItem(SITE_LANG_KEY);
      return CODES.indexOf(v) >= 0 ? v : null;
    } catch (e) { return null; }
  }
  /* the word language follows the site's language chip; a pick made here (for a language the site's chip does not
     have, or for a second run) holds only until the site's chip is changed */
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

  /* ------------------------------------------------------------------ the words */
  function rowsOf(kb) {
    return (Array.isArray(kb) ? kb : []).map(function (r) { return typeof r === "string" ? Array.from(r) : Array.from(r || []); })
      .filter(function (r) { return r.length; });
  }
  function prepare(j) {
    if (!j || typeof j !== "object" || !j.answers || !j.allowed) throw new Error("words");
    var fold = (j.fold && typeof j.fold === "object") ? j.fold : {};
    var f = function (s) {
      var o = "";
      Array.from(String(s).toLowerCase()).forEach(function (ch) { o += Object.prototype.hasOwnProperty.call(fold, ch) ? fold[ch] : ch; });
      return o;
    };
    var rows = rowsOf(j.keyboard), keys = {};
    rows.forEach(function (r) { r.forEach(function (k) { keys[k] = true; }); });
    if (!rows.length) throw new Error("keyboard");
    var w = { fold: fold, f: f, rows: rows, keys: keys, answers: {}, valid: {} };
    for (var L = FIRST; L <= LAST; L++) {
      var a = j.answers[L], al = j.allowed[L];
      if (!Array.isArray(a) || !a.length) throw new Error("answers " + L);
      w.answers[L] = a;
      var set = new Set();
      (Array.isArray(al) ? al : []).forEach(function (x) { set.add(f(x)); });
      a.forEach(function (x) { set.add(f(x)); });
      w.valid[L] = set;
    }
    return w;
  }
  var WORDS = {};
  function loadWords(l) {
    if (WORDS[l]) return Promise.resolve(WORDS[l]);
    return getJSON("words/" + l + ".json").then(function (j) { WORDS[l] = prepare(j); return WORDS[l]; });
  }
  function fold(s) { return W.f(s); }
  function ans(L) { var a = W.answers[L]; return a[day % a.length]; }

  /* Wordle colours on the folded letters: greens first, then yellows by what is left of each letter */
  function score(g, a) {
    var n = a.length, out = [], left = {}, i;
    for (i = 0; i < n; i++) out[i] = "x";
    for (i = 0; i < n; i++) {
      if (g[i] === a[i]) out[i] = "g";
      else left[a[i]] = (left[a[i]] || 0) + 1;
    }
    for (i = 0; i < n; i++) {
      if (out[i] !== "g" && left[g[i]] > 0) { out[i] = "y"; left[g[i]]--; }
    }
    return out;
  }
  function scoreOf(guess, L) { return score(Array.from(fold(guess)), Array.from(fold(ans(L)))); }

  /* ------------------------------------------------------------------ the page's fixed words */
  function paintStatic() {
    document.documentElement.lang = lang;
    document.title = T("page_title");
    $("m-name").textContent = T("name");
    $("day-label").textContent = T("day", { n: day });
    $("hint-t").textContent = T("hint");
    $("giveup").textContent = T("give_btn");
    $("help-btn").setAttribute("aria-label", T("help"));
    $("help-title").textContent = T("help");
    $("h1").textContent = T("h1");
    $("h2").textContent = T("h2", { n: BUDGET, b: BONUS });
    $("h3").textContent = T("h3", { r: REVEAL_FROM });
    $("album-title").textContent = T("album");
    $("st-played-l").textContent = T("st_played");
    $("st-streak-l").textContent = T("st_now");
    $("st-best-l").textContent = T("st_best");
    $("st-height-l").textContent = T("st_height");
    $("lang-title").textContent = T("lang");
    $("share-title").textContent = T("share_title");
    $("share-save").textContent = T("save");
    $("share-copy").textContent = T("copy");
    $("share-more").textContent = T("more_ways");
    $("strip-share").textContent = T("share");
    $("strip-result").textContent = T("result");
    $("loaderr-t").textContent = T("err_words");
    $("loaderr-b").textContent = T("retry");
    Array.prototype.forEach.call(document.querySelectorAll(".close"), function (b) { b.setAttribute("aria-label", T("close")); });
    var chip = $("lg-chip");
    chip.textContent = "";
    chip.appendChild(el("span", "lg-flag", flagOfLang(lang)));
    chip.appendChild(document.createTextNode(" " + lang.toUpperCase()));
    chip.setAttribute("aria-label", T("lang"));
    paintStreak();
    var note = $("beat-note");
    if (beat) { note.textContent = T("beat", { n: beat }); note.hidden = false; } else note.hidden = true;
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
    $("st-height").textContent = store.best || 0;
  }

  /* ------------------------------------------------------------------ the board */
  function tile(ch, cls) { return el("div", "t" + (cls ? " " + cls : ""), ch ? up(ch) : ""); }
  function rowBox(L, extra) {
    var r = el("div", "row" + (L > 6 ? " long" : "") + (extra ? " " + extra : ""));
    r.style.setProperty("--n", L);
    return r;
  }
  function flipMs(L) { return reduced() ? 0 : (L - 1) * 120 + 700; }

  function renderBoard(o) {
    o = o || {};
    var board = $("board"), L = view.L, list = run.g[L] || [], a = ans(L);
    var solved = run.found.indexOf(L) >= 0;
    board.textContent = "";
    curRow = null;
    list.forEach(function (g, ri) {
      var sc = scoreOf(g, L), isWin = solved && ri === list.length - 1;
      var letters = isWin ? Array.from(a) : Array.from(g);        // the found word shows with its accents
      var row = rowBox(L, isWin && o.win ? "win" : "");
      for (var i = 0; i < L; i++) {
        var t = tile(letters[i], sc[i]);
        if (o.anim === ri && !reduced()) { t.classList.add("flip"); t.style.setProperty("--i", i); }
        else if (isWin && o.win) t.style.setProperty("--i", i);
        row.appendChild(t);
      }
      board.appendChild(row);
    });
    if (!run.done && !solved) {
      curRow = rowBox(L);
      board.appendChild(curRow);
      drawCur(false);
    } else if (run.done && !solved && o.reveal !== false) {
      var rv = rowBox(L, "reveal");
      Array.from(a).forEach(function (ch) { rv.appendChild(tile(ch, "")); });
      board.appendChild(rv);
    }
    board.scrollTop = board.scrollHeight;
  }
  function drawCur(pop) {
    if (!curRow) return;
    var L = view.L, lock = lockN(L), a = Array.from(ans(L));
    var shown = view.L === run.L ? hintsOn(L) : [];                                 // hints belong to the word they were spent on
    curRow.textContent = "";
    for (var i = 0; i < L; i++) {
      var t;
      if (i < lock) t = tile(a[i], "g lock");                                       // given: shown with its accent, and it stays
      else if (i < cur.length) { t = tile(cur[i], "f"); if (pop && i === cur.length - 1 && !reduced()) t.classList.add("pop"); }
      else if (shown.indexOf(i) >= 0) t = tile(a[i], "gh");
      else t = tile("", "");
      curRow.appendChild(t);
    }
  }
  function shake() {
    if (!curRow) return;
    curRow.classList.remove("shake");
    void curRow.offsetWidth;
    curRow.classList.add("shake");
    var r = curRow;
    window.clearTimeout(shakeTimer);
    shakeTimer = later(function () { r.classList.remove("shake"); }, 460);
  }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = later(function () { t.hidden = true; }, 1500);
  }

  var FLAG = '<svg class="fl%P%" viewBox="0 0 12 16" aria-hidden="true"><path class="pole" d="M2.2 15.5V1"/><path class="pen" d="M2.2 1.2l8.6 3.3-8.6 3.5z"/></svg>';
  function renderLadder(plant) {
    var box = $("ladder");
    box.textContent = "";
    for (var L = FIRST; L <= LAST; L++) {
      var i = el("i", "", String(L));
      if (run.found.indexOf(L) >= 0) { i.className = "on"; i.insertAdjacentHTML("beforeend", FLAG.replace("%P%", L === plant ? " plant" : "")); }      // a small flag for every word found
      else if (L === view.L && !run.done) i.className = "now";
      if (L === beat) i.className += (i.className ? " " : "") + "beat";         // the friend's height, marked on the ladder
      box.appendChild(i);
    }
  }
  function leftNow() { return Math.max(0, capOf(run) - run.used); }
  function shownLeft() { return Math.max(0, leftNow() - lag); }                // what the counter says (the "+1" lands a moment later)
  function renderBudget(grew) {
    var box = $("budget"), total = capOf(run) - lag, n = shownLeft();
    box.style.setProperty("--b", total);
    box.classList.toggle("warm", !run.done && n <= WARM_AT);
    box.textContent = "";
    for (var i = 0; i < total; i++) {
      var s = el("i", i < total - n ? "u" : "");
      if (grew && i === total - 1) s.classList.add("new");
      box.appendChild(s);
    }
  }
  function renderLeft(bump) {
    var left = $("left");
    left.innerHTML = T("left", { n: shownLeft() });
    left.setAttribute("aria-label", T("left_aria", { n: shownLeft() }));
    left.classList.toggle("warm", !run.done && shownLeft() <= WARM_AT);         // warm, never red
    if (bump && !reduced()) { var b = left.querySelector("b"); if (b) b.classList.add("bump"); }
  }
  function renderStatus() {
    renderLeft(false);
    /* One chip, two jobs (29 Oct 2026, Khayyam): while there are hints it spends one and shows how many are
       left; with none left and a question still to answer it becomes the way to earn the next one. That keeps
       the row to two controls on a phone and puts the offer exactly where the player looks when stuck. */
    var hb = $("hint"), earn = run.hp <= 0 && canEarn();
    var capped = run.hp > 0 && hintsOn(run.L).length >= hintCap(run.L);        // hints in hand, but this word has had its share
    hb.disabled = run.done || (!canHint() && !earn);
    hb.classList.toggle("earn", earn);
    $("hint-t").textContent = earn ? T("earn") : T("hint");
    $("hint-c").textContent = earn ? "" : String(run.hp);
    $("hint-c").hidden = earn;
    var label = earn ? T("earn_aria") : capped ? T("hint_full") : T("hint_aria", { n: run.hp });
    hb.setAttribute("aria-label", label);
    hb.setAttribute("title", label);
    $("srow").hidden = run.done;
    $("kb").hidden = run.done;
    $("strip").hidden = !run.done;
    var m = $("midnight");
    m.hidden = !run.done;
    m.textContent = T("midnight");
  }

  /* ------------------------------------------------------------------ the keyboard */
  function buildKeyboard() {
    var kb = $("kb");
    kb.textContent = "";
    var rows = W.rows, lastIdx = rows.length - 1;
    var stacked = rows[lastIdx].length >= 9;               // a long last row leaves Enter and Delete a row of their own
    /* 29 Oct 2026, Khayyam: Enter goes under the RIGHT thumb, where the hand that holds the phone can reach it,
       and Delete to the left. The same way round in both layouts (a last row of 9 or more letters, as Turkish has,
       puts the two on a row of their own), so the thumb only ever learns one place. It is the other way round from
       Wordle, which costs a regular player a day of muscle memory and then reads as obvious. */
    rows.forEach(function (r, ri) {
      var line = el("div", "kr");
      if (ri === lastIdx && !stacked) line.appendChild(special("back"));
      r.forEach(function (k) {
        var b = el("button", "k", up(k));
        b.type = "button"; b.tabIndex = -1; b.setAttribute("data-k", k);
        line.appendChild(b);
      });
      if (ri === lastIdx && !stacked) line.appendChild(special("enter"));
      kb.appendChild(line);
    });
    if (stacked) {
      var line2 = el("div", "kr");
      line2.appendChild(special("back", true));
      line2.appendChild(special("enter", true));
      kb.appendChild(line2);
    }
  }
  function special(kind, big) {
    var b = el("button", "k wide" + (big ? " big" : "") + (kind === "enter" ? " enter" : ""));
    b.type = "button"; b.tabIndex = -1; b.setAttribute("data-a", kind);
    if (kind === "enter") {
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
      b.setAttribute("aria-label", "Enter");
    } else {
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h10a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 19H9l-6-7z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/></svg>';
      b.setAttribute("aria-label", "Delete");
    }
    return b;
  }
  function renderKeyboard() {
    var best = {};
    var L = view.L;
    (run.g[L] || []).forEach(function (g) {
      var sc = scoreOf(g, L), ch = Array.from(g);
      ch.forEach(function (c, i) {
        var s = sc[i], old = best[c];
        if (!old || (s === "g") || (s === "y" && old === "x")) best[c] = s;
      });
    });
    Array.prototype.forEach.call($("kb").querySelectorAll(".k[data-k]"), function (b) {
      var s = best[b.getAttribute("data-k")];
      b.className = "k" + (s ? " " + s : "");
    });
  }
  function mapKey(ch) {
    ch = String(ch).toLocaleLowerCase(lang);
    if (W.keys[ch]) return ch;
    var f = W.fold[ch];
    return (f && W.keys[f]) ? f : null;
  }

  /* ------------------------------------------------------------------ playing */
  function touchTime() {
    var now = Date.now();
    if (run.t) run.ms += Math.min(now - run.t, 90000);
    run.t = now;
  }
  function canPlay() { return !!(W && run && !busy && !run.done && !cardOpen); }
  function lockN(L) { return L >= REVEAL_FROM ? 1 : 0; }                     // letters of the word that are given
  function freshCur(L) {
    var out = [], a = Array.from(fold(ans(L)));
    for (var i = 0; i < lockN(L); i++) out.push(a[i]);
    return out;
  }
  function typeLetter(k) {
    if (!canPlay() || cur.length >= view.L) return;
    if (!run.t) run.t = Date.now();
    cur.push(k);
    drawCur(true);
  }
  function backspace() {
    if (!canPlay() || cur.length <= lockN(view.L)) return;
    cur.pop();
    drawCur(false);
  }
  function submit() {
    if (!canPlay()) return;
    var L = run.L;
    if (cur.length < L) { shake(); toast(T("too_short")); return; }
    var g = cur.join(""), gf = fold(g);
    if (!W.valid[L].has(gf)) { shake(); toast(T("not_a_word")); return; }
    touchTime();
    attach();
    var list = run.g[L] || (run.g[L] = []);
    list.push(g);
    run.used++;
    var win = gf === fold(ans(L));
    if (win && run.found.indexOf(L) < 0) run.found.push(L);                // a word found gives BONUS guesses back, so a win never ends the climb but the summit
    var over = win ? L === LAST : leftNow() <= 0;
    lag = (win && !over) ? BONUS : 0;                                      // the counter shows the "+1" when it lands
    cur = freshCur(L);
    if (over) finishRun(); else save();
    busy = true;
    view.L = L;
    renderBoard({ anim: list.length - 1, reveal: false });
    renderBudget();
    renderLeft(false);
    later(function () {
      renderKeyboard();
      if (over) {
        renderBoard({ win: win });
        renderLadder(win ? L : 0);
        if (win) { paintSky(); cheer(L); haptic(true); }
        afterFinish(win);
      } else if (win) {
        renderBoard({ win: true });
        renderLadder(L);                                                   // the flag is planted
        paintSky();                                                        // the sky gets lighter
        cheer(L);
        haptic(false);
        later(function () {
          flyBonus(function () {
            lag = 0;
            renderBudget(true);
            renderLeft(true);
          });
        }, reduced() ? 0 : 650);
        later(advance, reduced() ? 600 : HOLD);
      } else {
        busy = false;                 // free the game first: renderStatus() asks canPlay(), which reads busy
        renderStatus();
      }
    }, flipMs(L));
  }
  function advance() {
    lag = 0;
    run.L = Math.min(LAST, run.L + 1);
    view.L = run.L;
    save();
    cur = freshCur(run.L);
    renderLadder();
    var now = $("ladder").querySelector(".now");
    if (now && !reduced()) now.classList.add("pulse");
    renderBoard();
    renderKeyboard();
    renderBudget();
    busy = false;                     // before renderStatus(): the hint chip asks canPlay(), which reads busy
    renderStatus();
  }

  /* ---- the feel of going up: sky, cheer, haptic tap, the flying "+1" ---- */
  function altOf(h) { return h >= FIRST ? Math.min(1, (h - 1) / (LAST - 1)) : 0; }
  function paintSky() { document.documentElement.style.setProperty("--alt", String(altOf(height(run)))); }
  /* The step window (29 Oct 2026, Khayyam: "it has to feel alive and communicating"). A word found is the one
     moment the game has the player's full attention, so it says three things and then gets out of the way:
     a cheer that changes with the height, how many tries it took, and — when the server has numbers — the share
     of people who got past this very word. No dictionary text: the day's own figures are more alive than a
     definition, they are in every language already, and they cost nothing to write. */
  function stepStat(L) {
    var dist = distOf(srv.views[lang]) || distOf(srv.yviews[lang]);
    if (!dist) return "";
    if (L >= LAST) {
      var top = dist.reached[LAST];
      return top > 0 ? T("step_top", { p: pct(top) }) : "";
    }
    var past = dist.reached[L + 1];                       // the people who went on from here
    if (!(past > 0)) return "";
    return T(past < 0.5 ? "step_past" : "step_past_hi", { p: pct(past) });
  }
  function cheer(L) {
    var c = $("cheer");
    c.textContent = "";
    c.hidden = false;
    c.classList.remove("show");

    var head = el("b", "step-head", T("cheer_" + L));
    c.appendChild(head);

    var row = el("div", "step-word");
    Array.from(ans(L)).forEach(function (ch) { row.appendChild(el("i", "", up(ch))); });
    c.appendChild(row);

    var tries = (run.g[L] || []).length;
    c.appendChild(el("span", "step-try", tries <= 1 ? T("step_first") : T("step_try", { nth: nth(tries, true) })));

    var stat = stepStat(L);
    if (stat) c.appendChild(el("span", "step-stat", stat));
    else if (L < LAST) c.appendChild(el("span", "step-stat", T("step_next", { n: L + 1 })));

    void c.offsetWidth;
    c.classList.add("show");
    window.clearTimeout(cheerTimer);
    cheerTimer = later(function () { c.hidden = true; c.classList.remove("show"); }, HOLD - 250);
  }
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
    } catch (e) { /* no haptic: the flag and the cheer still tell it */ }
  }
  function flyBonus(done) {
    var from = document.querySelector("#board .row.win"), to = $("left").querySelector("b");
    if (reduced() || !from || !to || !from.animate) { done(); return; }
    var a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    var p = el("span", "plus", "+" + BONUS);
    var x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = b.left + b.width / 2, y1 = b.top + b.height / 2;
    p.style.left = x0 + "px"; p.style.top = y0 + "px";
    document.body.appendChild(p);
    var dx = x1 - x0, dy = y1 - y0, ended = false;
    function end() { if (ended) return; ended = true; if (p.parentNode) p.parentNode.removeChild(p); done(); }
    try {
      var an = p.animate([
        { transform: "translate(-50%, -50%) scale(.5)", opacity: 0 },
        { transform: "translate(-50%, -50%) scale(1.35)", opacity: 1, offset: .22 },
        { transform: "translate(-50%, -50%) scale(1.35)", opacity: 1, offset: .38 },
        { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(.8)", opacity: 1, offset: .92 },
        { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(.6)", opacity: 0 }
      ], { duration: 950, easing: "cubic-bezier(.45,0,.25,1)", fill: "forwards" });
      an.onfinish = end; an.oncancel = end;
    } catch (e) { end(); }
    later(end, 1500);                                                      // never leave the counter waiting
  }

  /* where the next hint should land: a place the player cannot already work out — not the given first letter,
     not one a guess has already turned green, and not one a hint has already shown. */
  function hintSpot(L) {
    var af = Array.from(fold(ans(L))), known = [], j;
    for (var k = 0; k < lockN(L); k++) known[k] = true;                    // the given first letter is not worth a hint
    (run.g[L] || []).forEach(function (g) {
      scoreOf(g, L).forEach(function (s, i) { if (s === "g") known[i] = true; });
    });
    hintsOn(L).forEach(function (i) { known[i] = true; });
    var i = -1;                                                            // the hint goes where it can be seen: the first open place not yet known
    for (j = Math.min(cur.length, af.length); j < af.length && i < 0; j++) if (!known[j]) i = j;
    for (j = 0; j < af.length && i < 0; j++) if (!known[j]) i = j;
    return i;
  }
  function useHint() {
    if (!canHint()) { if (canEarn() && run.hp <= 0) openQuestion(); return; }
    var L = run.L, i = hintSpot(L);
    if (i < 0) return;                                                     // every letter is already known: nothing a hint could add
    touchTime();
    attach();
    if (!run.hi[String(L)]) run.hi[String(L)] = [];
    run.hi[String(L)].push(i);
    run.hp -= 1;
    save();
    if (TO && TO.count) TO.count("altitude/hint");
    drawCur(false);
    renderStatus();
  }

  /* ------------------------------------------------------------------ earning a hint (29 Oct 2026, Khayyam)
     One question at a time, never a pair: the player answers, takes the hint, and comes back for the second
     only if still stuck. Every answer is read out of Logicers' own puzzle data, so nothing here is invented.
     A wrong answer costs nothing — it shows the right one and offers another question — because the point is
     to keep someone climbing, not to punish them for a guess. */
  var BANK = null, QT = null;              // the questions, and the current language's words for them (LG_QUESTIONS)
  var QTS = {};                            // every language's words once read, so a switch back needs no new fetch
  var qCur = null;                         // the question on screen: { q, opts: [{text, right}] }

  function loadBank() {
    if (BANK) return Promise.resolve(BANK);
    return getJSON("questions.json").then(function (b) {
      BANK = (b && b.questions && b.stems) ? b : { stems: {}, questions: [] };
      return BANK;
    }, function () { BANK = { stems: {}, questions: [] }; return BANK; });
  }
  /* the language's words for the questions: assets/lang/<code>/questions.js, which sets window.LG_QUESTIONS.
     English is the bank itself. (Not to be confused with loadWords(), which loads the climb's word lists.)
     It is read as text and its object parsed, not added as a <script>, so it can be asked for fresh like the
     game's other files (see SELF_V); the build writes the object as plain JSON.
     The words belong to the language they were read for (29 Oct 2026): after a switch with the chip the questions
     used to keep the first language's words, even in English. QT is set only for the language still on screen,
     so a file that arrives after a switch cannot paint the wrong language either. */
  function loadQWords() {
    var l = lang;
    if (l === "en") { QT = null; return Promise.resolve(null); }
    if (QTS[l]) { QT = QTS[l]; return Promise.resolve(QT); }
    return window.fetch(freshURL("../assets/lang/" + l + "/questions.js"), { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    }).then(function (src) {
      var a = src.indexOf("{", src.indexOf("LG_QUESTIONS")), b = src.lastIndexOf("}");
      var words = (a >= 0 && b > a) ? JSON.parse(src.slice(a, b + 1)) : null;
      if (words) QTS[l] = words;
      if (lang === l) QT = words;
      return lang === l ? QT : null;
    }).catch(function () { if (lang === l) QT = null; return null; });   // no file: the question is asked in English
  }
  function qText(en) { return (QT && QT.text && QT.text[en]) || en; }
  /* {x} inside a sentence (after a space) starts small: "…the price of a first iPad?", "Which is the raccoon's…",
     "…del prezzo di un iPhone 4?" (30 Oct 2026). A first word with a capital further in (iPhone, VAT) is a name
     and stays as it is; {x} that opens the question, or sits after a quote mark, keeps its capital. */
  function smallHead(s) {
    var w = String(s).split(/\s/)[0];
    if (w.length > 1 && w.slice(1) !== w.slice(1).toLowerCase()) return s;
    try { return s.charAt(0).toLocaleLowerCase(lang === "tr" ? "tr-TR" : lang) + s.slice(1); }
    catch (e) { return s.charAt(0).toLowerCase() + s.slice(1); }
  }
  function qStem(q) {
    var t = (QT && QT.stems && QT.stems[q.stem]) || (BANK.stems && BANK.stems[q.stem]) || "";
    if (!q.x) return t;
    var forms = (QT && QT.forms && QT.forms[q.x]) || null, x = qText(q.x);
    return t.replace(/\{x\.the\}/g, (forms && forms.the) || x)
            .replace(/\{x\.of\}/g, (forms && forms.of) || x)
            .replace(/(\s)\{x\}/g, function (m, sp) { return sp + smallHead(x); })
            .replace(/\{x\}/g, x);
  }
  /* the day picks where in the bank to start, so two players of the same day meet the same questions, and the
     options are shuffled every time: in the bank the right answer is nearly always written first. */
  function pickQuestion() {
    var qs = BANK.questions || [];
    if (!qs.length) return null;
    var used = run.qs || [], start = ((day - 1) * 7) % qs.length;
    for (var k = 0; k < qs.length; k++) {
      var q = qs[(start + k) % qs.length];
      if (used.indexOf(q.id) < 0 && qStem(q)) return q;
    }
    return null;
  }
  function shuffled(q) {
    var opts = q.opts.map(function (t, i) { return { text: qText(t), right: i === q.a }; });
    for (var i = opts.length - 1; i > 0; i--) {                 // Fisher–Yates, so the first tile is never the answer
      var j = Math.floor(Math.random() * (i + 1)), t = opts[i];
      opts[i] = opts[j]; opts[j] = t;
    }
    return opts;
  }
  function openQuestion() {
    if (!canEarn()) return;
    var dlg = $("dlg-q");
    if (!dlg || !dlg.showModal) return;
    loadBank().then(loadQWords).then(function () { showQuestion(); });
    try { if (!dlg.open) dlg.showModal(); } catch (e) { return; }
    if (TO && TO.count) TO.count("altitude/question-open");
  }
  function showQuestion() {
    var q = pickQuestion();
    $("q-kicker").textContent = T("q_h");
    $("q-after").hidden = true;
    var opts = $("q-opts");
    opts.textContent = "";
    if (!q) {                                                    // the bank is spent for today: say so and go back
      $("q-title").textContent = T("q_empty");
      $("q-after").hidden = false;
      $("q-said").textContent = "";
      $("q-more").hidden = true;
      $("q-play").textContent = T("q_play");
      return;
    }
    qCur = { q: q, opts: shuffled(q) };
    $("q-title").textContent = qStem(q);
    qCur.opts.forEach(function (o, i) {
      var b = el("button", "q-opt", o.text);
      b.type = "button";
      b.addEventListener("click", function () { answer(i); });
      opts.appendChild(b);
    });
  }
  function answer(i) {
    if (!qCur) return;
    var picked = qCur.opts[i], right = picked.right;
    var btns = Array.prototype.slice.call($("q-opts").querySelectorAll(".q-opt"));
    btns.forEach(function (b, k) {
      b.disabled = true;
      if (k === i) b.classList.add(right ? "right" : "wrong");
      else if (qCur.opts[k].right) b.classList.add(right ? "" : "was");
    });
    touchTime();
    attach();
    run.qs.push(qCur.q.id);
    if (right) {
      run.he += 1;
      run.hp += 1;
      if (TO && TO.count) TO.count("altitude/question-right");
    } else if (TO && TO.count) TO.count("altitude/question-wrong");
    save();
    renderStatus();
    var said = $("q-said"), more = $("q-more"), play = $("q-play");
    if (right) {
      said.textContent = canEarn() ? T("q_right") : T("q_right") + " " + T("q_done");
      more.hidden = !canEarn();
      more.textContent = T("q_more");
    } else {
      var a = qCur.opts.filter(function (o) { return o.right; })[0];
      said.textContent = T("q_wrong", { a: a ? a.text : "" });   // nothing is taken away: another question is free
      more.hidden = !canEarn();
      more.textContent = T("q_another");
    }
    play.textContent = T("q_play");
    $("q-kicker").textContent = "";          // the offer has been taken: the line above it would read stale
    $("q-after").hidden = false;
    qCur = null;
  }
  function closeQuestion() {
    var dlg = $("dlg-q");
    if (dlg && dlg.open) { try { dlg.close(); } catch (e) { /* already shut */ } }
  }

  /* ------------------------------------------------------------------ giving up (29 Oct 2026, Khayyam)
     A player who is stuck and cannot see the word has two ways out of the game: close the tab, or be shown the
     word. The second keeps them. So the button is there, quietly — but pressing it offers the ways on first (a
     hint, and later a question to earn one), and asks once more before it ends the day. Two steps and no more:
     a third would stop reading as encouragement and start reading as a trap, and either step ends it in one tap. */
  function openGive() {
    if (!canPlay()) return;
    var dlg = $("dlg-give");
    if (!dlg || !dlg.showModal) return;
    $("give-step1").hidden = false;
    $("give-step2").hidden = true;
    $("give-title").textContent = T("give_h");
    var h = height(run);
    $("give-sub").textContent = h >= FIRST ? T("give_sub", { n: h, m: h + 1 }) : T("give_sub0");
    /* the ways on, before the way out: a hint if one is in hand, otherwise a question to earn one */
    var hb = $("give-hint"), hint = canHint(), earn = !hint && canEarn();
    hb.hidden = !hint && !earn;
    hb.textContent = hint ? T("give_hint") : T("give_earn");
    hb.setAttribute("data-act", hint ? "hint" : "earn");
    $("give-stay").textContent = T("give_stay");
    $("give-show").textContent = T("give_show");
    $("give-title2").textContent = T("give_h2");
    $("give-back").textContent = T("give_stay");
    $("give-yes").textContent = T("give_yes");
    try { dlg.showModal(); } catch (e) { /* an old browser: the button simply does nothing */ }
    if (TO && TO.count) TO.count("altitude/giveup-open");
  }
  function closeGive() {
    var dlg = $("dlg-give");
    if (dlg && dlg.open) { try { dlg.close(); } catch (e) { /* already shut */ } }
  }
  /* the climb ends where it stands: the same result running out of guesses would give, so it is sent to the
     server like any other and cannot be used to duck a bad day */
  function giveUp() {
    closeGive();
    if (!canPlay()) return;
    if (TO && TO.count) TO.count("altitude/gaveup");
    run.gaveUp = true;
    touchTime();
    attach();                           // a climb given up before the first guess was never in the store yet
    finishRun();
    save();
    view.L = run.L;
    renderBoard();                      // the word they could not get, revealed on the board
    renderBudget();
    afterFinish(false);                 // paints the rest and opens the card
  }

  /* ------------------------------------------------------------------ the end of the climb */
  function finishRun() {
    run.done = true;
    run.h = height(run);
    if (!store.main[day]) store.main[day] = lang;            // the day's first climb counts for the streak; a second language never does
    if (run.h > (store.best || 0)) store.best = run.h;
    save();
    if (TO && TO.count) TO.count("altitude/played/" + lang);
  }
  function afterFinish(won) {
    renderStatus();
    renderLadder(won ? run.L : 0);
    paintStreak();
    $("kb").hidden = true;
    busy = false;
    syncServer(lang);
    cardAuto = later(function () { openCard(); }, reduced() ? 300 : (won ? 2600 : 1400));      // the summit's cheer plays first
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

  /* One game id per language. The result is { k, e, g }: e = levels short of the summit (0 = summit, 8 = missed the
     first word), g = guesses used. That is the shape every other game sends, so the Worker needs only the six ids. */
  var refused = {};
  function sendRun(l, r) {
    var key = dateKey(), tag = key + ":" + l, id = "altitude-" + l;
    if (optedOut() || store.sent[tag] || refused[tag]) return Promise.resolve(null);
    store.sent[tag] = 1;
    save();
    return post("/stats/send", { d: key, rs: [{ k: id, e: LAST - r.h, g: r.used }], k: id }).then(function (res) {
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
    return post("/stats/view", { d: dateKey(), k: "altitude-" + l }).then(function (res) {
      if (res.status === 200) {
        takeYou(res.data.you);
        if (res.data.view) srv.views[l] = res.data.view;
      }
    }).then(null, noop);
  }
  /* Yesterday (28 Oct 2026, Khayyam: the card must hook). A new game has almost nobody on it at the moment you
     finish, so today's picture is often empty. The server keeps 70 days, so when today is too thin the card shows
     yesterday's instead, said plainly. Asked for only when it is needed. */
  function loadYesterday(l) {
    return post("/stats/view", { d: yesterKey(), k: "altitude-" + l }).then(function (res) {
      if (res.status === 200 && res.data.view) srv.yviews[l] = res.data.view;
    }).then(null, noop);
  }
  function needYesterday() {
    var v = srv.views[lang];
    return !(v && v.w && v.w.n >= NEED_WORLD);
  }
  function ensureCountry() {
    if (srv.cc) return Promise.resolve();
    /* altitude-* ids may not be on the server yet (400 carries no country): ask an existing game, only for where the player is */
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
      if (refused[dateKey() + ":" + l]) return null;       // the server does not know these ids yet: its views would be refused too
      return Promise.all(CODES.map(loadView));
    }).then(function () {
      if (refused[dateKey() + ":" + l] || !needYesterday()) return null;
      liveUpdate();                                        // show what today has while yesterday is on its way
      return Promise.all(CODES.map(loadYesterday));
    }).then(function () { return ensureCountry(); }).then(function () { liveUpdate(); });
  }

  /* ------------------------------------------------------------------ numbers from the server's views */
  function tenthOf(h) {
    var p = Math.round(100 * (1 - (LAST - h) / LAST));        // the points the Worker gives that height
    return p >= 100 ? 10 : Math.max(0, Math.min(9, Math.floor(p / 10)));
  }
  /* The day's shape, read two ways (28 Oct 2026, Khayyam: "i like % but i also like the real numbers").
     stopped[h] = the people whose climb ended at h. reached[h] = the people who got AT LEAST that high, which is
     what the mountain shows: it thins out as it rises, the way a real one does, and it answers the question a
     player actually has — "did many get this far?" — instead of "where did people fall?". Counts come with it,
     because "6%" and "74 people" say different things and both are worth saying. */
  function distOf(v) {
    var w = v && v.w;
    if (!w || !(w.n >= NEED_WORLD) || !Array.isArray(w.h)) return null;
    var n = w.n, stopped = {}, stoppedN = {}, reached = {}, reachedN = {}, run = 0;
    for (var h = 0; h <= LAST; h++) {
      if (h === 1) continue;                                  // a 1-letter word does not exist, so nobody stops there
      stoppedN[h] = w.h[tenthOf(h)] || 0;
      stopped[h] = stoppedN[h] / n;
    }
    for (var k = LAST; k >= 0; k--) {
      if (k === 1) continue;
      run += stoppedN[k] || 0;
      reachedN[k] = run;
      reached[k] = run / n;
    }
    return { share: stopped, n: n, stopped: stopped, stoppedN: stoppedN, reached: reached, reachedN: reachedN };
  }
  /* the day's word that ended the most climbs: the stage after the one most people stopped on */
  function wallOf(dist) {
    if (!dist) return null;
    var best = null;
    for (var h = 0; h <= LAST - 1; h++) {                     // LAST means they finished, so it never "stopped" them
      if (h === 1) continue;
      var c = dist.stoppedN[h] || 0;
      if (c > 0 && (!best || c > best.n)) best = { h: h, n: c, p: dist.stopped[h] };
    }
    if (!best || best.n < 2) return null;                     // never a single player's result
    best.L = best.h === 0 ? FIRST : best.h + 1;               // the word they could not get
    return best;
  }
  /* the average guesses a climb took, from the sums the server already keeps */
  function guessAvg(v) {
    var w = v && v.w;
    if (!w || !(w.gn >= NEED_WORLD)) return null;
    return w.gs / w.gn;
  }
  function avgOf(a, need) { return (a && a.n >= need) ? a.p / a.n * LAST / 100 : null; }

  /* ------------------------------------------------------------------ the mountain (one picture, drawn twice: SVG on the page, canvas for the share) */
  var MG = { cx: 140, ground: 254, bottom: 248, bandH: 25, pitch: 28, hwBase: 126, hwTop: 28, yTop: 55 };
  function hwAt(y) { return MG.hwTop + (MG.hwBase - MG.hwTop) * (y - MG.yTop) / (MG.ground - MG.yTop); }
  function band(i) {
    var yb = MG.bottom - MG.pitch * i, yt = yb - MG.bandH;
    return { L: FIRST + i, yb: yb, yt: yt, hb: hwAt(yb), ht: hwAt(yt), yc: (yb + yt) / 2 };
  }
  function flagPos(h) {
    if (h >= FIRST) return { x: MG.cx - 22, y: band(h - FIRST).yt };
    return { x: 44, y: MG.ground - 2 };
  }
  function f1(n) { return Math.round(n * 10) / 10; }
  function mountainSVG(o) {
    var h = o.h, dist = o.dist, w = dist ? 408 : 280, s = "";
    s += '<svg class="mt" viewBox="0 0 ' + w + ' 284" role="img" aria-label="' + (h ? T("letters", { n: h }) : T("base")).replace(/"/g, "&quot;") + '">';
    s += '<line class="ground" x1="8" y1="' + MG.ground + '" x2="272" y2="' + MG.ground + '"/>';
    var maxShare = dist ? Math.max(dist.reached[FIRST] || 0, 0.0001) : 0;
    function bar(yc, share, count, me) {
      if (!dist || !(maxShare > 0)) return "";
      var len = share > 0 ? Math.max(3, share / maxShare * 48) : 0;
      var t = share > 0 ? pct(share) : "";
      var c = count > 0 ? String(nInt(count)) : "";
      return (len ? '<rect class="dbar' + (me ? " me" : "") + '" x="278" y="' + f1(yc - 6) + '" width="' + f1(len) + '" height="12" rx="4"/>' : "") +
        '<text class="pct" x="' + f1(282 + len) + '" y="' + f1(yc + 4) + '">' + t +
        (c ? '<tspan class="cnt" dx="5">' + c + '</tspan>' : "") + '</text>';
    }
    for (var i = 0; i <= LAST - FIRST; i++) {
      var b = band(i), on = h >= b.L;
      s += '<polygon class="' + (on ? "on" : "off") + '" points="' + f1(MG.cx - b.hb) + "," + b.yb + " " + f1(MG.cx + b.hb) + "," + b.yb + " " +
        f1(MG.cx + b.ht) + "," + b.yt + " " + f1(MG.cx - b.ht) + "," + b.yt + '"/>';
      s += '<text class="num ' + (on ? "on" : "off") + '" x="' + MG.cx + '" y="' + f1(b.yc + 4.6) + '">' + b.L + '</text>';
      if (dist) s += bar(b.yc, dist.reached[b.L] || 0, dist.reachedN[b.L] || 0, h === b.L);
    }
    if (dist) {
      s += '<text class="num off" x="' + MG.cx + '" y="273.5">0</text>';       // the row under the ground: those who did not find the first word
      s += bar(269, dist.stopped[0] || 0, dist.stoppedN[0] || 0, h === 0);
    }
    if (o.beat >= FIRST && o.beat <= LAST) {
      var bb = band(o.beat - FIRST), x1 = MG.cx - bb.ht - 5, x2 = MG.cx + bb.ht + 5, y = bb.yt - 0.5;
      s += '<line class="beatline" x1="' + f1(x1) + '" y1="' + f1(y) + '" x2="' + f1(x2) + '" y2="' + f1(y) + '"/>';
      s += '<polygon class="beatflag" points="' + f1(x2) + "," + f1(y) + " " + f1(x2) + "," + f1(y - 16) + " " + f1(x2 + 12) + "," + f1(y - 11) + '"/>';
    }
    var fp = flagPos(h);
    s += '<g><line class="pole" x1="' + fp.x + '" y1="' + fp.y + '" x2="' + fp.x + '" y2="' + (fp.y - 30) + '"/>' +
      '<polygon class="pennant" points="' + fp.x + "," + (fp.y - 30) + " " + (fp.x + 18) + "," + (fp.y - 24) + " " + fp.x + "," + (fp.y - 18) + '"/>' +
      '<circle class="knob" cx="' + fp.x + '" cy="' + (fp.y - 31) + '" r="2.2"/></g>';
    return s + "</svg>";
  }

  /* ------------------------------------------------------------------ the end sheet */
  function runDone(l) { var r = runOf(l, day); return (r && r.done) ? r : null; }
  function failedWord() {
    if (!run.done || run.found.indexOf(run.L) >= 0) return "";
    return ans(run.L);
  }
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
  function heading() {                                  // the picture's words: how high
    if (run.h >= LAST) return T("summit");
    return run.h ? T("letters", { n: run.h }) : T("base");
  }
  function reachedLine() {                              // the card's words: what you did, never what you missed
    if (run.h >= LAST) return T("reached_top");
    return run.h ? T("reached", { n: run.h }) : T("reached_base");
  }
  function higherThan(dist, h) {                        // the share of today's players who ended lower than this
    if (!dist || h < FIRST) return null;
    var p = 0;
    for (var k in dist.stopped) if (+k < h) p += dist.stopped[k];
    return p > 0.005 ? Math.min(1, p) : null;
  }
  function openCard() {
    if (!run || !run.done) return;
    closeCard(true);
    var wrap = el("div", "fin");
    wrap.id = "fin";
    var scrim = el("div", "fin-scrim");
    wrap.appendChild(scrim);
    var sheet = el("section", "fin-sheet fin-full");
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", reachedLine());
    sheet.setAttribute("tabindex", "-1");
    var top = el("div", "onward-top");
    top.appendChild(el("h2", "fin-h", reachedLine()));
    var x = el("button", "chip round close fin-x", "×");
    x.type = "button";
    x.setAttribute("aria-label", T("close"));
    top.appendChild(x);
    sheet.appendChild(top);

    var hi = el("p", "cl-higher");                      // "Higher than 64% of players today": filled when the server has answered
    hi.id = "cl-higher";
    hi.hidden = true;
    sheet.appendChild(hi);
    sheet.appendChild(el("p", "cl-sub", T("used", { n: run.used }) + " · " + clock(run.ms)));

    var gv = el("p", "cl-gavg");                        // what a climb takes everyone else, beside what it took you
    gv.id = "cl-gavg";
    gv.hidden = true;
    sheet.appendChild(gv);

    /* The word that stopped the climb, shown in the game's own tiles rather than as a sentence (29 Oct 2026,
       Khayyam: "the last word should be written like in boxes as in the game, it is something important").
       Green, because it is the answer — the colour the player never got to see. */
    var fw = failedWord();
    if (fw) {
      var wd = el("p", "cl-word", T("word_was", { w: "" }).replace(/\s+$/, ""));
      sheet.appendChild(wd);
      var wrow = rowBox(Array.from(fw).length, "cl-wordrow");   // not .reveal: that is the board's outline, here it is the answer
      Array.from(fw).forEach(function (ch) { wrow.appendChild(tile(ch, "g")); });
      sheet.appendChild(wrow);
    }
    if (beat >= FIRST && beat <= LAST) {
      var bt = el("p", "cl-beat", run.h > beat ? T("beat_won") : run.h === beat ? T("beat_tie") : T("beat_lost"));
      sheet.appendChild(bt);
    }

    var live1 = el("div", "cl-live1");                  // how far everyone got + the mountain
    live1.id = "cl-live1";
    sheet.appendChild(live1);

    var wl = el("p", "cl-wall");                        // the word that ended the most climbs today
    wl.id = "cl-wall";
    wl.hidden = true;
    sheet.appendChild(wl);

    var cr = el("p", "cl-rank");                        // where this country stands, as the nine games say it
    cr.id = "cl-rank";
    cr.hidden = true;
    sheet.appendChild(cr);

    var live3 = el("div", "cl-live3");                  // the language race: the six languages against each other
    live3.id = "cl-live3";
    sheet.appendChild(live3);

    /* Share, and beside it a challenge (28 Oct 2026): the challenge link was already built into the share text but
       nothing on the card pointed at it, so nobody used the one thing that brings a second player. */
    var acts = el("div", "cl-acts");
    var sh = el("button", "btn solid cl-share", T("share"));
    sh.type = "button";
    sh.addEventListener("click", function () { shareNow(); });
    acts.appendChild(sh);
    if (run.h >= FIRST) {
      var ch = el("button", "btn ghost cl-chal", T("challenge"));
      ch.type = "button";
      ch.addEventListener("click", function () { challengeNow(); });
      acts.appendChild(ch);
    }
    sheet.appendChild(acts);

    var live2 = el("div", "cl-live2");                  // the averages
    live2.id = "cl-live2";
    sheet.appendChild(live2);

    var tries = el("div", "cl-sec");
    tries.appendChild(el("h3", "", T("try_h")));
    var tb = el("div", "cl-tries");
    CODES.forEach(function (l) {
      if (l === lang) return;
      var d = runDone(l);
      var b = el("button", "cl-try" + (d ? " done" : ""));
      b.type = "button";
      b.appendChild(el("span", "fl", flagOfLang(l)));
      b.appendChild(document.createTextNode(T("langs")[l] || l));
      if (d) b.appendChild(el("b", "", d.h ? String(d.h) : "✓"));
      b.addEventListener("click", function () { closeCard(true); switchLang(l, true); });
      tb.appendChild(b);
    });
    tries.appendChild(tb);
    sheet.appendChild(tries);

    var more = el("a", "fin-more cl-more");
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

  /* the parts of the sheet that come from the server */
  function liveUpdate() { paintToday(); if (cardOpen) renderLive(); }
  /* How many are on the mountain today, shown WHILE you play (28 Oct 2026, Khayyam). Every other signal in this
     game waits for the end card, which a player only reaches once; this one is there from the first word. */
  function paintToday() {
    var e = $("today-n");
    if (!e) return;
    var v = srv.views[lang], n = v && v.w ? v.w.n : 0;
    if (n >= NEED_WORLD) { e.textContent = T("on_today", { n: nInt(n) }); e.hidden = false; }
    else e.hidden = true;
  }
  /* asked for once as the page opens, so the counter is there before the climb is over */
  function loadToday() {
    if (!serverOn() || refused[dateKey() + ":" + lang]) return Promise.resolve();
    return loadView(lang).then(function () {
      paintToday();
      /* the step window wants a figure from the first word on, so when today is still thin pull yesterday too —
         this language only, one more call, not all six */
      if (needYesterday()) return loadYesterday(lang);
    }).then(null, noop);
  }
  function renderLive() {
    var a = $("cl-live1"), b = $("cl-live2"), c = $("cl-live3");
    if (!a || !run) return;

    /* Today when it has enough players, else yesterday, said plainly. A card that shows nothing is the one thing
       this game cannot afford: it is finished at the moment the player is most likely to look. */
    var today = srv.views[lang], dist = distOf(today), old = false;
    if (!dist) {
      var yd = distOf(srv.yviews[lang]);
      if (yd) { dist = yd; old = true; }
    }
    var views = old ? srv.yviews : srv.views;
    var v = views[lang];
    function tag(h3) { if (old) h3.appendChild(el("small", "cl-when", T("yesterday"))); return h3; }
    function K(key) { return old ? key + "_y" : key; }      // the same line, said for the day it describes

    var hiEl = $("cl-higher"), hp = higherThan(dist, run.h);
    if (hiEl) {
      if (hp !== null) { hiEl.hidden = false; hiEl.textContent = T(old ? "higher_y" : "higher", { p: pct(hp) }); }
      else if (today && today.w && today.w.n === 1) { hiEl.hidden = false; hiEl.textContent = T("first_today"); }
      else hiEl.hidden = true;
    }

    /* What a climb costs everyone else, beside what it cost you: height says how far, guesses say how well. */
    var gEl = $("cl-gavg"), ga = guessAvg(v);
    if (gEl) {
      if (ga !== null) { gEl.hidden = false; gEl.textContent = T(K("guess_avg"), { n: nf(ga, 0), cnt: Math.round(ga) }); }
      else gEl.hidden = true;
    }

    /* The word that ended the most climbs. It is the line people repeat to each other, and it costs the server
       nothing: the day's word at each stage is the same for everyone, so the shape of the day names it. */
    var wEl = $("cl-wall"), wall = wallOf(dist);
    if (wEl) {
      if (wall && W && W.answers && W.answers[wall.L]) {
        wEl.hidden = false;
        wEl.innerHTML = "";
        var parts = T(K("wall"), { w: "\u0000", n: nInt(wall.n), cnt: wall.n, p: pct(wall.p) }).split("\u0000");
        wEl.appendChild(document.createTextNode(parts[0] || ""));
        wEl.appendChild(el("b", "", up(ans(wall.L))));
        wEl.appendChild(document.createTextNode(parts[1] || ""));
      } else wEl.hidden = true;
    }

    /* Where this country stands today, the same line the other nine games carry. */
    var rEl = $("cl-rank"), rk = v && v.rank, cc0 = srv.cc || store.cc;
    if (rEl) {
      if (rk && rk.at > 0 && rk.of >= 2 && cc0 && countryName(cc0.c)) {
        rEl.hidden = false;
        rEl.textContent = flagOf(cc0.c) + " " + T(K("country_rank"), { country: countryName(cc0.c), nth: nth(rk.at), of: nInt(rk.of) });
      } else rEl.hidden = true;
    }

    a.textContent = "";
    if (dist) {
      var hd = el("div", "cl-sec");
      var h3 = el("h3", "", T("fell"));
      h3.appendChild(el("small", "", T("players", { n: dist.n.toLocaleString ? dist.n.toLocaleString(lang) : dist.n, cnt: dist.n })));
      hd.appendChild(tag(h3));
      a.appendChild(hd);
    }
    a.insertAdjacentHTML("beforeend", mountainSVG({ h: run.h, beat: beat, dist: dist ? dist : null }));

    b.textContent = "";
    var cc = srv.cc || store.cc;
    var cAvg = avgOf(v && v.h, NEED_COUNTRY), wAvg = avgOf(v && v.w, NEED_WORLD);
    if (cAvg !== null || wAvg !== null) {
      var g = el("div", "cl-avgs");
      var when = old ? " · " + T("yesterday") : "";
      if (cAvg !== null && cc) g.appendChild(avgCell(nf(cAvg, 1), flagOf(cc.c) + " " + T("avg_country", { country: countryName(cc.c) }) + when));
      if (wAvg !== null) g.appendChild(avgCell(nf(wAvg, 1), T("avg_world") + when));
      b.appendChild(g);
    }

    c.textContent = "";
    var rows = [];
    CODES.forEach(function (l) {
      var x = avgOf(views[l] && views[l].w, NEED_WORLD);
      if (x !== null) rows.push({ l: l, v: x });
    });
    if (rows.length >= 2) {
      rows.sort(function (p, q) { return q.v - p.v; });
      var sec = el("div", "cl-sec");
      sec.appendChild(tag(el("h3", "", T("race"))));
      var ul = el("ul", "cl-race");
      rows.forEach(function (r) {
        var li = el("li", r.l === lang ? "me" : "");
        li.appendChild(el("span", "fl", flagOfLang(r.l)));
        var bar = el("span", "bar-l"), fillI = el("i");
        fillI.style.width = Math.max(2, Math.round(r.v / LAST * 100)) + "%";
        bar.appendChild(fillI);
        li.appendChild(bar);
        li.appendChild(el("span", "v", nf(r.v, 1)));
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      /* the race in one sentence: the bars show the order, this says what it means */
      if (rows.length >= 3) {
        var top = rows[0], low = rows[rows.length - 1];
        if (low.v + 0.15 < top.v) {
          var say = el("p", "cl-raceline");
          say.textContent = T(K("race_top"), { lang: T("langs")[top.l] || top.l }) + " · " +
                            T("race_low", { lang: T("langs")[low.l] || low.l });
          sec.appendChild(say);
        }
      }
      c.appendChild(sec);
    }
  }
  function avgCell(value, label) {
    var d = el("div", "cl-avg");
    d.appendChild(el("b", "", value));
    d.appendChild(el("span", "", label));
    return d;
  }

  /* ------------------------------------------------------------------ share: the mountain as a picture, a line of text, a challenge link */
  function baseUrl() {
    var u = window.location.origin + window.location.pathname.replace(/index\.html$/, "");
    return LOCAL ? u : "https://logicers.com/altitude/";
  }
  function shareText() {
    var parts = ["Logicers Altitude", run.h ? T("letters", { n: run.h }) : T("base"), T("used", { n: run.used })];
    var cc = srv.cc || store.cc, fl = cc ? flagOf(cc.c) : "";
    if (fl) parts.push(fl);
    return parts.join(" · ") + "\n" + baseUrl() + (run.h >= FIRST ? "?beat=" + run.h : "");
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
      var INK = "#15172B", SOFT = "#5D6279", ACC = "#4F6B80", HIT = "#2E9F63", PALE = "#DCE4EB";
      ctx.fillStyle = "#E3EBF1"; ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = "#FFFFFF"; roundRect(ctx, 56, 56, 968, 1238, 60); ctx.fill();
      // wordmark
      var dots = [["#2D4FC4", 112, 134], ["#D5492F", 92, 164], ["#0D7D73", 132, 164]];
      dots.forEach(function (d) { ctx.fillStyle = d[0]; ctx.beginPath(); ctx.arc(d[1], d[2], 13, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = INK; ctx.font = "800 54px " + D; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
      ctx.fillText("Logicers", 160, 166);
      ctx.fillStyle = ACC; ctx.textAlign = "right"; ctx.fillText(T("name"), 984, 166);
      // mountain
      var s = 3.0, ox = 540 - MG.cx * s, oy = 232 - 20 * s + 0;
      function px(x) { return ox + x * s; }
      function py(y) { return oy + y * s; }
      ctx.strokeStyle = "#C9D0E0"; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(px(8), py(MG.ground)); ctx.lineTo(px(272), py(MG.ground)); ctx.stroke();
      for (var i = 0; i <= LAST - FIRST; i++) {
        var b = band(i), on = run.h >= b.L;
        ctx.fillStyle = on ? HIT : PALE;
        ctx.beginPath();
        ctx.moveTo(px(MG.cx - b.hb), py(b.yb)); ctx.lineTo(px(MG.cx + b.hb), py(b.yb));
        ctx.lineTo(px(MG.cx + b.ht), py(b.yt)); ctx.lineTo(px(MG.cx - b.ht), py(b.yt));
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = on ? "#FFFFFF" : SOFT; ctx.font = "800 " + Math.round(13 * s) + "px " + D; ctx.textAlign = "center";
        ctx.fillText(String(b.L), px(MG.cx), py(b.yc + 4.6));
      }
      if (beat >= FIRST && beat <= LAST) {
        var bb = band(beat - FIRST), y = bb.yt - 0.5, x1 = MG.cx - bb.ht - 5, x2 = MG.cx + bb.ht + 5;
        ctx.strokeStyle = "#F28A1B"; ctx.lineWidth = 6; ctx.setLineDash([15, 12]);
        ctx.beginPath(); ctx.moveTo(px(x1), py(y)); ctx.lineTo(px(x2), py(y)); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#F28A1B"; ctx.beginPath();
        ctx.moveTo(px(x2), py(y)); ctx.lineTo(px(x2), py(y - 16)); ctx.lineTo(px(x2 + 12), py(y - 11)); ctx.closePath(); ctx.fill();
      }
      var fp = flagPos(run.h);
      ctx.strokeStyle = INK; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(px(fp.x), py(fp.y)); ctx.lineTo(px(fp.x), py(fp.y - 30)); ctx.stroke();
      ctx.fillStyle = ACC; ctx.beginPath();
      ctx.moveTo(px(fp.x), py(fp.y - 30)); ctx.lineTo(px(fp.x + 18), py(fp.y - 24)); ctx.lineTo(px(fp.x), py(fp.y - 18)); ctx.closePath(); ctx.fill();
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(px(fp.x), py(fp.y - 31), 6.5, 0, Math.PI * 2); ctx.fill();
      // the result
      ctx.textAlign = "center"; ctx.fillStyle = INK; ctx.font = "800 104px " + D;
      ctx.fillText(heading(), 540, 1128);
      ctx.fillStyle = SOFT; ctx.font = "700 46px " + X;
      ctx.fillText(T("used", { n: run.used }) + " · " + clock(run.ms), 540, 1196);
      ctx.fillStyle = ACC; ctx.font = "700 40px " + X;
      ctx.fillText("logicers.com/altitude", 540, 1256);
      return new Promise(function (resolve) {
        if (cv.toBlob) cv.toBlob(function (bl) { resolve(bl); }, "image/png");
        else resolve(null);
      });
    });
  }
  var shareUrl = null;
  function shareNow() {
    if (!run || !run.done) return;
    picture().then(function (blob) {
      var text = shareText(), file = null, can = false;
      try { if (blob && typeof File === "function") file = new File([blob], "altitude.png", { type: "image/png" }); } catch (e) { file = null; }
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
    if (TO && TO.count) TO.count("altitude/share");
  }
  /* The challenge (28 Oct 2026): the plain words plus the ?beat= link, no picture. It is the shortest thing a
     player can paste into a group chat, and it is what brings the second player a new game needs. */
  function challengeNow() {
    if (!run || !run.done || run.h < FIRST) return;
    var text = T("beat_them", { n: run.h }) + "\n" + baseUrl() + "?beat=" + run.h;
    var nav = window.navigator;
    if (nav.share && !computer()) {
      nav.share({ text: text }).then(noop, noop);
    } else {
      shareDialog(null, text, null, false);
    }
    if (TO && TO.count) TO.count("altitude/challenge");
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
      var d = runDone(L[0]);
      var b = el("button", "lg-pick" + (L[0] === lang ? " on" : ""));
      b.type = "button";
      b.appendChild(el("span", "lg-flag", L[2]));
      b.appendChild(el("b", "", L[1]));
      if (d) { var s = el("span", "", d.h ? T("letters", { n: d.h }) : T("base")); s.style.marginLeft = "auto"; s.style.color = "var(--soft)"; s.style.fontWeight = "700"; b.appendChild(s); }
      b.addEventListener("click", function () {
        if (TO) TO.closeDialog($("dlg-lang"));
        switchLang(L[0], false);
      });
      list.appendChild(b);
    });
  }
  function switchLang(l, showCard) {
    if (l === lang || CODES.indexOf(l) < 0) return;
    window.clearTimeout(cardAuto);
    closeCard(true);
    rememberLang(l);
    lang = l;
    QT = QTS[l] || null;                                   // the hint questions speak the new language (loadQWords)
    closeQuestion();                                       // a question half asked in the old language is not kept
    cur = [];
    busy = false;
    $("loaderr").hidden = true;
    paintStatic();
    start(showCard);
  }

  /* ------------------------------------------------------------------ starting */
  function setRun() {
    var r = runOf(lang, day);
    run = r ? normalize(r) : blank();
    run.t = 0;                                              // the clock starts again with the first letter typed
    view = { L: run.L };
    lag = 0;
    cur = run.done ? [] : freshCur(run.L);
    busy = false;
  }
  function renderAll() {
    paintSky();
    renderLadder();
    renderBoard();
    renderBudget();
    renderStatus();
    renderKeyboard();
  }
  function start(showCard) {
    $("loaderr").hidden = true;
    return loadWords(lang).then(function (w) {
      W = w;
      setRun();
      buildKeyboard();
      renderAll();
      $("app").style.visibility = "";
      if (run.done) {
        syncServer(lang);                                  // sending also brings back today's numbers
        /* 29 Oct 2026, Khayyam: coming back to a finished climb used to leave the player on a dead board with a
           Result button to find. The card opens by itself instead — once per visit, so closing it still means
           closed, and the Result button is still there to open it again. */
        if (showCard || !shownThisVisit) { shownThisVisit = true; later(function () { openCard(); }, 260); }
      } else {
        loadToday();                                       // still climbing: just ask how many others are up here
      }
    }, function () {
      W = null;
      $("loaderr").hidden = false;
      $("board").textContent = "";
    });
  }

  function onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.querySelector("dialog[open]") || cardOpen) return;
    if (!W) return;
    var k = e.key;
    if (k === "Enter") {
      var t = e.target;
      if (t && t.closest && t.closest("button:not(.k), a, input, textarea, select")) return;
      e.preventDefault();
      submit();
    } else if (k === "Backspace") {
      e.preventDefault();
      backspace();
    } else if (k && Array.from(k).length === 1) {
      var m = mapKey(k);
      if (m) { e.preventDefault(); typeLetter(m); }
    }
  }

  function readBeat() {
    var n = 0;
    try { n = parseInt(new window.URLSearchParams(window.location.search).get("beat"), 10); } catch (e) { n = 0; }
    return (n >= FIRST && n <= LAST) ? n : 0;
  }

  function boot() {
    if (TO) { TO.wireDialogs(); TO.fixLocalLinks(); }
    store = readStore();
    day = dayNo();
    prune();
    beat = readBeat();
    lang = pickLang();
    run = blank();

    $("kb").addEventListener("mousedown", function (e) { e.preventDefault(); });
    $("kb").addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".k") : null;
      if (!b) return;
      var k = b.getAttribute("data-k"), a = b.getAttribute("data-a");
      if (k) typeLetter(k);
      else if (a === "enter") submit();
      else if (a === "back") backspace();
    });
    $("hint").addEventListener("click", useHint);
    $("giveup").addEventListener("click", openGive);
    $("give-stay").addEventListener("click", closeGive);
    $("give-back").addEventListener("click", closeGive);
    $("give-hint").addEventListener("click", function () {
      var act = this.getAttribute("data-act");
      closeGive();
      if (act === "earn") openQuestion(); else useHint();
    });
    $("q-more").addEventListener("click", showQuestion);
    $("q-play").addEventListener("click", closeQuestion);
    $("give-show").addEventListener("click", function () {      // one more ask, then it is their call
      $("give-step1").hidden = true;
      $("give-step2").hidden = false;
    });
    $("give-yes").addEventListener("click", giveUp);
    $("strip-share").addEventListener("click", shareNow);
    $("strip-result").addEventListener("click", function () { openCard(); });
    $("loaderr-b").addEventListener("click", function () { start(false); });
    $("streak-chip").addEventListener("click", paintAlbum);
    $("lg-chip").addEventListener("click", buildLangList);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        if (run && !run.done && run.t) { touchTime(); run.t = 0; attach(); save(); }      // time away from the page is not climbing time
      } else if (dayNo() !== day) window.location.reload();
    });

    getJSON("strings.json").then(function (s) { STR = s; }, function () { STR = { en: {} }; }).then(function () {
      paintStatic();
      return start(false);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
