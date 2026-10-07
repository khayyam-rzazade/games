/* Twin or Trap: a game for one phone and two to eight players.
   Ten words a game. Each looks the same in two languages: a twin means the same in both, a trap means something else
   (a false friend). Whoever holds the phone reads out the word and its sentence; the table talks it over; on three,
   everyone votes at once with a thumb (up for twin, down for trap). The answer shows both meanings, the sentences in
   English, for a trap how the sentence would sound to the other language's ear, and the two dictionaries of every word.
   Then the holder taps who was right and passes the phone on. Right scores 1 point; right while most of the table was
   wrong scores 2. Most points wins.
   Not daily: no day number, no streak, no album. Every opening of the page starts afresh (Khayyam, 6 Oct 2026, for
   all the games for groups): the players' names, the game and the wins at this table live only while the page is open,
   and are never stored. The browser keeps only the words a table had lately and how many games it played
   (TO.groupUpdate), so that it deals fresh words first.
   The words come from data/twin-or-trap.js (made by r/twin-or-trap-workshop/build.py, which checks them). */
(function () {
  "use strict";

  var GAME = "twin-or-trap";
  var TO = window.TurnsOut;
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  var HAS_DOC = typeof document !== "undefined";
  function $(id) { return document.getElementById(id); }

  var PLAYERS_MIN = 2, PLAYERS_MAX = 8;
  var WORDS = 10;                       // words in a game
  var TWINS = [4, 5, 6];                // twins in a game: one of these, at random, so that counting never tells
  var PER_LANG = 3;                     // at most this many words of one language (English apart) in a game
  var RECENT = 40;                      // the words a table had lately, dealt again only when the others run out

  /* ================================================================================================
     The core: the words, the deal, the points. No page needed (the checks call it too).
     ================================================================================================ */
  function num(v) { return typeof v === "number" && isFinite(v); }
  function str(v) { return typeof v === "string" && v.length > 0; }
  var LANGS = DATA && DATA.langs && typeof DATA.langs === "object" ? DATA.langs : {};
  function srcOk(s) {
    return Array.isArray(s) && s.length === 2 && s.every(function (x) {
      return Array.isArray(x) && x.length === 2 && str(x[0]) && /^https:\/\//.test(x[1]);
    });
  }
  function sideOk(s) { return !!s && str(LANGS[s.l]) && str(s.w) && str(s.m) && srcOk(s.s); }
  function pairOk(p) {
    if (!p || !str(p.id) || (p.v !== "twin" && p.v !== "trap") || !sideOk(p.a) || !sideOk(p.b) || p.a.l === p.b.l) return false;
    if (!Array.isArray(p.x) || p.x.length < 1 || p.x.length > 2) return false;
    if (!p.x.every(function (x) { return x && (x.l === p.a.l || x.l === p.b.l) && /\[[^\]]+\]/.test(x.t || "") && str(x.e); })) return false;
    if (p.v === "trap") return str(p.mix) && num(p.mx) && p.mx >= 0 && p.mx < p.x.length && str(LANGS[p.ear]);
    return !p.mix;
  }
  var PAIRS = DATA && Array.isArray(DATA.pairs) ? DATA.pairs.filter(pairOk) : [];
  var byId = {};
  PAIRS.forEach(function (p) { byId[p.id] = p; });
  var READY = PAIRS.length >= WORDS * 2;

  function pair(id) { return byId[id] || null; }
  function lang(code) { return LANGS[code] || code; }
  function others(p) {                       // the languages of a pair other than English
    return [p.a.l, p.b.l].filter(function (l) { return l !== "en"; });
  }
  function label(p) { return p.a.tr ? p.a.tr : p.a.w; }      // the word in Latin letters, for lines and messages

  function shuffle(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function seeded(seed) {                    // a small repeatable random number maker, for the checks
    var s = (seed >>> 0) || 1;
    return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  /* ten words: four, five or six twins; the words a table has not had lately first (a word comes back only when no
     fresh word of its kind, twin or trap, is left), then the oldest of the recent ones; at most three of one language
     (English apart) where the words allow it, and one language twice in a row only where it cannot be helped.
     A friend's ten words come as they are. */
  function deal(avoid, rnd) {
    var twins = TWINS[Math.floor(rnd() * TWINS.length)];
    var fresh = shuffle(PAIRS.filter(function (p) { return avoid.indexOf(p.id) < 0; }).map(function (p) { return p.id; }), rnd);
    var old = avoid.filter(function (id) { return !!pair(id); });
    var out = [], used = {};
    function take(list, capped) {
      var per = {}, nt = 0;
      out.forEach(function (id) { var p = pair(id); if (p.v === "twin") nt++; others(p).forEach(function (l) { per[l] = (per[l] || 0) + 1; }); });
      list.forEach(function (id) {
        if (out.length >= WORDS || used[id]) return;
        var p = pair(id), tw = p.v === "twin";
        if (tw ? nt >= twins : out.length - nt >= WORDS - twins) return;
        if (capped && others(p).some(function (l) { return (per[l] || 0) >= PER_LANG; })) return;
        out.push(id); used[id] = 1;
        if (tw) nt++;
        others(p).forEach(function (l) { per[l] = (per[l] || 0) + 1; });
      });
    }
    take(fresh, true);
    take(fresh, false);
    take(old, true);
    take(old, false);
    if (out.length < WORDS) {                // too few twins or traps in all for the count drawn: take any
      fresh.concat(old).forEach(function (id) { if (out.length < WORDS && !used[id]) { out.push(id); used[id] = 1; } });
    }
    return arrange(out, rnd);
  }
  function clashes(ids) {                    // words in a row that share a language other than English
    var n = 0;
    for (var i = 1; i < ids.length; i++) {
      var a = others(pair(ids[i - 1])), b = others(pair(ids[i]));
      if (a.some(function (l) { return b.indexOf(l) >= 0; })) n++;
    }
    return n;
  }
  function arrange(ids, rnd) {
    var best = shuffle(ids.slice(), rnd), bc = clashes(best);
    for (var t = 0; t < 60 && bc > 0; t++) {
      var c = shuffle(ids.slice(), rnd), cc = clashes(c);
      if (cc < bc) { best = c; bc = cc; }
    }
    return best;
  }
  /* the points of a word: 1 for each player who was right; 2 if they were fewer than half of the table */
  function worth(right, n) { return right.length > 0 && right.length * 2 < n ? 2 : 1; }
  function readerOf(g, k) { return (g.first + k) % g.p.length; }
  function points(g) {
    var pts = g.p.map(function () { return 0; }), n = g.p.length;
    g.right.forEach(function (r) {
      if (!Array.isArray(r)) return;
      var w = worth(r, n);
      r.forEach(function (i) { pts[i] += w; });
    });
    return pts;
  }
  function winners(g) {
    var pts = points(g), best = Math.max.apply(null, pts), w = [];
    pts.forEach(function (x, i) { if (x === best) w.push(i); });
    return w;
  }

  var CORE = {
    ready: READY, PAIRS: PAIRS, LANGS: LANGS, WORDS: WORDS, TWINS: TWINS, PER_LANG: PER_LANG,
    PLAYERS_MIN: PLAYERS_MIN, PLAYERS_MAX: PLAYERS_MAX, RECENT: RECENT,
    pair: pair, pairOk: pairOk, label: label, others: others, clashes: clashes,
    deal: function (avoid, seed) { return deal(avoid || [], seeded(seed)); },
    worth: worth, points: points, winners: winners, readerOf: readerOf
  };
  window.TwinOrTrap = CORE;
  if (!HAS_DOC) return;

  /* ================================================================================================
     The page
     ================================================================================================ */
  if (!TO || !READY) {
    var t0 = $("start-title");
    if (t0) t0.textContent = "The words could not be loaded. Please try again in a moment.";
    var b0 = $("btn-start");
    if (b0) b0.hidden = true;
    var p0 = document.querySelector(".w-players");
    if (p0) p0.hidden = true;
    return;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }
  function clean(s) { return String(s || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 14); }
  function stored() { return TO.group(GAME); }
  function listOf(names) {                  // "Ana", "Ana and Bo", "Ana, Bo and Cy"
    return names.length < 2 ? names.join("") : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
  }
  function an(l) { return /^[AEIOU]/.test(lang(l)) ? "an " + lang(l) : "a " + lang(l); }
  function langsOf(p) { return lang(p.a.l) + " and " + lang(p.b.l); }

  /* ---------- who plays: how many, and their names (optional). They live only while the page is open. ---------- */
  function blankSetup() {
    var nm = [];
    while (nm.length < PLAYERS_MAX) nm.push("");
    return { n: 3, names: nm };
  }
  var setup = blankSetup();
  function nameOf(i) { return setup.names[i] || "Player " + (i + 1); }
  /* the table of this sitting: the wins per name, and who reads first in the next game */
  var table = { wins: {}, next: 0 };
  /* nothing about the players is ever stored; should anything of the kind be there, it is cleared */
  TO.groupUpdate(GAME, function (g) { delete g.cur; delete g.names; delete g.wins; delete g.next; delete g.n; });

  /* ---------- the game, in the page only: a new opening of the page (or Restart) starts afresh ----------
     { p: names, first: the first reader, k: the word (0 to 9), ids: [the ten words], right: [[the players who were
       right] per word scored], st: "hand" | "word" | "answer" | "score", over } */
  var game = null;
  var view = "start";
  function idsOk(ids) {
    if (!Array.isArray(ids) || ids.length !== WORDS) return false;
    var seen = {};
    for (var i = 0; i < ids.length; i++) {
      if (!pair(ids[i]) || seen[ids[i]]) return false;
      seen[ids[i]] = 1;
    }
    return true;
  }
  function validGame(x) {
    if (!x || typeof x !== "object" || !Array.isArray(x.p) || x.p.length < PLAYERS_MIN || x.p.length > PLAYERS_MAX) return false;
    var n = x.p.length;
    if (!num(x.first) || x.first < 0 || x.first >= n || !num(x.k) || x.k < 0 || x.k >= WORDS) return false;
    if (!idsOk(x.ids)) return false;
    if (["hand", "word", "answer", "score"].indexOf(x.st) < 0) return false;
    if (!Array.isArray(x.right) || x.right.length !== x.k) return false;
    for (var k = 0; k < x.right.length; k++) {
      var r = x.right[k], seen = {};
      if (!Array.isArray(r)) return false;
      for (var j = 0; j < r.length; j++) {
        if (!num(r[j]) || r[j] < 0 || r[j] >= n || seen[r[j]]) return false;
        seen[r[j]] = 1;
      }
    }
    return true;
  }
  function recentList() {
    var r = stored().recent;
    return Array.isArray(r) ? r.filter(function (x) { return typeof x === "string"; }).slice(-RECENT) : [];
  }
  function newGame(forced) {
    var n = setup.n, first = num(table.next) && table.next >= 0 && table.next < n ? Math.round(table.next) : 0;
    game = { p: [], first: first, k: 0, ids: forced ? forced.slice() : deal(recentList(), Math.random), right: [], st: "hand", over: false };
    for (var i = 0; i < n; i++) game.p.push(nameOf(i));
    TO.groupUpdate(GAME, function (g2) {
      var r = Array.isArray(g2.recent) ? g2.recent.filter(function (x) { return typeof x === "string"; }) : [];
      game.ids.forEach(function (id) { var at = r.indexOf(id); if (at >= 0) r.splice(at, 1); r.push(id); });
      g2.recent = r.slice(-RECENT);
    });
    TO.count(GAME + "/started");
  }
  function cur() { return pair(game.ids[game.k]); }
  function reader() { return game.p[readerOf(game, game.k)]; }

  /* ---------- the views ---------- */
  var views = { start: $("v-start"), hand: $("v-hand"), word: $("v-word"), answer: $("v-answer"), score: $("v-score"), end: $("v-end") };
  function show(v) {
    view = v;
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.setAttribute("data-view", v);
    $("btn-restart").hidden = !(game && !game.over);        // Restart only while a game is in play
    fit();
  }
  /* every view must fit the screen without scrolling: step down until it does */
  function fit() {
    var b = document.body;
    b.classList.remove("fit1", "fit2", "fit3");
    ["fit1", "fit2", "fit3"].forEach(function (k) {
      if (document.documentElement.scrollHeight > window.innerHeight) b.classList.add(k);
    });
  }
  window.addEventListener("resize", function () { fitWords(); fit(); });
  function focusOn(id) {                     // a heading takes the focus too, so that a screen reader reads where it is
    var e = $(id);
    if (!e) return;
    if (!/^(BUTTON|A|INPUT)$/.test(e.nodeName) && !e.hasAttribute("tabindex")) e.setAttribute("tabindex", "-1");
    e.focus();
  }

  /* the start, and a friend's ten words */
  var params = new URLSearchParams(window.location.search);
  var friend = null;
  (function () {
    var w = String(params.get("w") || "").toLowerCase().split("."), k = params.get("k"), f = params.get("f"), n = params.get("n");
    if (!idsOk(w)) return;
    var ko = /^\d$/.test(k || "") ? parseInt(k, 10) : null, fo = /^\d$/.test(f || "") ? parseInt(f, 10) : null, no = /^\d$/.test(n || "") ? parseInt(n, 10) : null;
    if (ko === null || fo === null || no === null || no < PLAYERS_MIN || no > PLAYERS_MAX || fo > no) { ko = null; fo = null; no = null; }
    friend = { ids: w, k: ko, f: fo, n: no };
  })();
  function friendLine(f) {
    var line = "A friend's table played these ten words.";
    if (f.k !== null) {
      var p = pair(f.ids[f.k]);
      line += " " + (f.f === 0 ? "Nobody at their table was fooled by " + label(p) + " (" + langsOf(p) + ")."
        : label(p) + " (" + langsOf(p) + ") fooled " + (f.f === f.n ? "all " + f.n + " of them." : f.f + " of their " + f.n + "."));
    }
    return line + " Can your table tell twins from traps?";
  }
  function renderSetup() {
    $("players-n").textContent = String(setup.n);
    $("btn-fewer").disabled = setup.n <= PLAYERS_MIN;
    $("btn-more").disabled = setup.n >= PLAYERS_MAX;
    var line = [];
    for (var i = 0; i < setup.n; i++) line.push(nameOf(i));
    $("names-line").textContent = line.join(" · ");
    if (view === "start") fit();
  }
  function renderNameFields() {
    var box = $("name-fields");
    box.innerHTML = "";
    for (var i = 0; i < setup.n; i++) {
      (function (i) {
        var lab = el("label", "w-name-field");
        lab.appendChild(el("span", "w-name-n", String(i + 1)));
        var inp = el("input");
        inp.type = "text";
        inp.maxLength = 14;
        inp.autocomplete = "off";
        inp.spellcheck = false;
        inp.placeholder = "Player " + (i + 1);
        inp.value = setup.names[i];
        inp.setAttribute("aria-label", "Name of player " + (i + 1));
        inp.addEventListener("input", function () { setup.names[i] = clean(inp.value); renderSetup(); });
        lab.appendChild(inp);
        box.appendChild(lab);
      })(i);
    }
  }
  function showStart() {
    show("start");
    renderSetup();
    var f = $("friend");
    if (friend) {
      f.textContent = friendLine(friend);
      f.hidden = false;
      $("btn-start").textContent = "Play their words";
    } else {
      f.hidden = true;
      $("btn-start").textContent = "Start";
    }
    fit();
  }

  /* ---------- pieces of a word ---------- */
  function sentence(box, x) {                // the sentence, with the word in bold
    box.innerHTML = "";
    var m = /^(.*)\[([^\]]+)\](.*)$/.exec(x.t);
    if (!m) { box.textContent = x.t; return; }
    if (m[1]) box.appendChild(document.createTextNode(m[1]));
    box.appendChild(el("b", "", m[2]));
    if (m[3]) box.appendChild(document.createTextNode(m[3]));
  }
  function plainSentence(t) { return t.replace(/[\[\]]/g, ""); }
  function wordRow(s) {                      // "German  Gift" (and the Latin letters of a Russian word)
    var row = el("div", "w-side");
    row.appendChild(el("span", "w-lang", lang(s.l)));
    var w = el("span", "w-word", s.w);
    w.setAttribute("lang", s.l);
    row.appendChild(w);
    if (s.tr) row.appendChild(el("span", "w-tr", s.tr));
    return row;
  }
  function sayBlock(x, withEnglish) {        // a sentence (Literata italic), its Latin letters, its English
    var li = el("li", "w-x");
    var t = el("span", "w-sent");
    t.setAttribute("lang", x.l);
    sentence(t, x);
    li.appendChild(t);
    if (x.tr) {
      var tr = el("span", "w-sent-tr");
      sentence(tr, { t: x.tr });
      li.appendChild(tr);
    }
    if (withEnglish) li.appendChild(el("span", "w-en", x.e));
    return li;
  }
  function links(box, list) {
    list.forEach(function (s, i) {
      if (i) box.appendChild(document.createTextNode(" · "));
      var a = el("a", "", s[0]);
      a.href = s[1]; a.target = "_blank"; a.rel = "noopener";
      box.appendChild(a);
    });
  }
  function sources(box, p) {                 // "German: DWDS · Wiktionary. English: Merriam-Webster · Britannica Dictionary."
    box.innerHTML = "";
    box.appendChild(el("span", "w-src-k", "Dictionaries "));
    [p.a, p.b].forEach(function (s, i) {
      if (i) box.appendChild(document.createTextNode(" "));
      box.appendChild(document.createTextNode(lang(s.l) + ": "));
      links(box, s.s);
      box.appendChild(document.createTextNode("."));
    });
  }
  /* the meaning of a trap, as a short line: "In German, bald means soon." */
  function trapLine(p) {
    if (p.b.l === "en") return "In " + lang(p.a.l) + ", " + label(p) + " means " + p.a.m + ".";
    return "In " + lang(p.a.l) + ", " + p.a.w + " means " + p.a.m + "; in " + lang(p.b.l) + ", " + p.b.m + ".";
  }
  function twinLine(p) { return "In " + langsOf(p) + ", " + label(p) + " means the same."; }

  /* ---------- passing the phone (Khayyam, 5 Oct 2026, late evening: it must say so very plainly):
     before every word a whole screen says what the last word gave and to whom the phone goes; that player taps to say
     they have it. ---------- */
  function recap() {
    if (game.k === 0) return "A new game: ten words, each in two languages.";
    var k = game.k - 1, p = pair(game.ids[k]), r = game.right[k] || [], n = game.p.length, w = worth(r, n);
    var head = p.v === "trap" ? "Trap! " + trapLine(p) : "Twin! " + twinLine(p);
    var names = r.map(function (i) { return game.p[i]; });
    var tail = r.length === 0 ? (p.v === "trap" ? "It fooled everyone." : "Nobody believed it.")
      : r.length === n ? "Everyone was right: 1 point each."
      : w === 2 ? "Only " + listOf(names) + (r.length === 1 ? " was" : " were") + " right: 2 points" + (r.length === 1 ? "." : " each.")
      : listOf(names) + (r.length === 1 ? " was" : " were") + " right: 1 point" + (r.length === 1 ? "." : " each.");
    return head + " " + tail;
  }
  function showHand() {
    var who = reader();
    game.st = "hand";
    show("hand");
    $("hand-res").textContent = recap();
    $("hand-name").textContent = who;
    $("hand-line").textContent = "Word " + (game.k + 1) + " of " + WORDS + ". " + who + " reads it out.";
    $("btn-hand").textContent = who + " has the phone";
    $("hand-k").textContent = "Word " + (game.k + 1) + " of " + WORDS;
    fitHandName();
    focusOn("btn-hand");
  }
  function fitHandName() {                   // a long name gets smaller until it fits on one line
    var n = $("hand-name");
    n.style.fontSize = "";
    var size = parseFloat(window.getComputedStyle(n).fontSize) || 48;
    while (n.scrollWidth > n.clientWidth + 1 && size > 22) { size -= 2; n.style.fontSize = size + "px"; }
    fit();
  }

  /* ---------- the word: the two words, the sentence to read out, the question ---------- */
  function fitWords() {                      // a long word gets smaller until its row fits
    Array.prototype.forEach.call(document.querySelectorAll(".w-pair .w-word"), function (w) {
      w.style.fontSize = "";
      var size = parseFloat(window.getComputedStyle(w).fontSize) || 30, row = w.parentNode;
      while (row.scrollWidth > row.clientWidth + 1 && size > 16) { size -= 1; w.style.fontSize = size + "px"; }
    });
  }
  function showWord() {
    var p = cur(), x = p.x[0], who = reader();
    game.st = "word";
    show("word");
    $("word-k").textContent = "Word " + (game.k + 1) + " of " + WORDS + " · " + who + " reads it out";
    var box = $("word-pair");
    box.innerHTML = "";
    box.appendChild(wordRow(p.a));
    box.appendChild(wordRow(p.b));
    box.setAttribute("aria-label", lang(p.a.l) + " " + p.a.w + (p.a.tr ? " (" + p.a.tr + ")" : "") + ", and " + lang(p.b.l) + " " + p.b.w);
    $("say-k").textContent = "In " + lang(x.l) + ":";
    var s = $("word-say");
    s.innerHTML = "";
    s.appendChild(sayBlock(x, false));
    $("word-line").textContent = "Talk it over. Then, on three, everyone votes at once: thumbs up for twin, thumbs down for trap.";
    fitWords();
    fit();
    focusOn("word-q");
  }

  /* ---------- the answer: twin or trap, both meanings, the sentences in English, the dictionaries ---------- */
  function showAnswer() {
    var p = cur();
    game.st = "answer";
    show("answer");
    $("ans-k").textContent = "Word " + (game.k + 1) + " of " + WORDS + " · " + langsOf(p);
    var st = $("ans-stamp");
    st.textContent = p.v === "trap" ? "Trap!" : "Twin!";
    st.className = "w-stamp-big " + (p.v === "trap" ? "is-trap" : "is-twin");
    var m = $("ans-means");
    m.innerHTML = "";
    if (p.v === "twin") {
      var row = el("div", "w-mean");
      var dt = el("dt");
      [p.a, p.b].forEach(function (s, i) {
        if (i) dt.appendChild(document.createTextNode(" and "));
        dt.appendChild(document.createTextNode(lang(s.l) + " "));
        var b = el("b", "", s.w); b.setAttribute("lang", s.l); dt.appendChild(b);
      });
      row.appendChild(dt);
      row.appendChild(el("dd", "", "both: " + p.a.m));
      m.appendChild(row);
    } else {
      [p.a, p.b].forEach(function (s) {
        var row = el("div", "w-mean"), dt = el("dt");
        dt.appendChild(document.createTextNode(lang(s.l) + " "));
        var b = el("b", "", s.w); b.setAttribute("lang", s.l); dt.appendChild(b);
        row.appendChild(dt);
        row.appendChild(el("dd", "", s.m));
        m.appendChild(row);
      });
    }
    var box = $("ans-x");
    box.innerHTML = "";
    p.x.forEach(function (x, i) {
      var li = sayBlock(x, true);
      if (p.v === "trap" && p.mx === i) {
        var mix = el("span", "w-mix");
        mix.appendChild(el("span", "w-mix-k", "To " + an(p.ear) + " ear: "));
        mix.appendChild(document.createTextNode("“" + p.mix + "”"));
        li.appendChild(mix);
      }
      box.appendChild(li);
    });
    sources($("ans-src"), p);
    $("btn-who").textContent = "Who said " + p.v + "?";
    fit();
    focusOn("ans-stamp");
  }

  /* ---------- who was right ---------- */
  var picked = [];
  function showScore() {
    var p = cur(), n = game.p.length;
    game.st = "score";
    show("score");
    $("score-k").textContent = "Word " + (game.k + 1) + " of " + WORDS + " · " + label(p) + " · " + langsOf(p);
    $("who-q").textContent = "It's a " + p.v + ". Who said " + p.v + "?";
    $("score-line").textContent = "Tap everyone who voted " + p.v + ". Right scores 1 point; if most of the table got it wrong, 2.";
    var box = $("who");
    box.innerHTML = "";
    picked = [];
    game.p.forEach(function (x, i) {
      var b = el("button", "w-who-b", x);
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-i", String(i));
      b.addEventListener("click", function () {
        var at = picked.indexOf(i);
        if (at >= 0) picked.splice(at, 1); else picked.push(i);
        b.setAttribute("aria-pressed", at >= 0 ? "false" : "true");
        b.classList.toggle("on", at < 0);
        scoreButton();
      });
      box.appendChild(b);
    });
    scoreButton();
    scoreLine($("score-pts"));
    fit();
    focusOn("who-q");
  }
  function scoreButton() {
    var p = cur(), n = game.p.length, r = picked.length;
    var b = $("btn-score");
    b.textContent = r === 0 ? "Nobody said " + p.v : r === n ? "Everyone said " + p.v : "Score it";
    var w = worth(picked, n);
    b.setAttribute("aria-label", (r === 0 ? "Nobody said " + p.v + ": no points" : r === n ? "Everyone said " + p.v + ": 1 point each"
      : "Score it: " + plural(w, "point", "points") + (r === 1 ? "" : " each") + " for " + listOf(picked.slice().sort(function (a, c) { return a - c; }).map(function (i) { return game.p[i]; }))) + ".");
  }
  function scoreLine(box) {
    var pts = points(game);
    box.innerHTML = "";
    box.appendChild(el("span", "w-pts-k", "Points"));
    game.p.forEach(function (x, i) {
      var s = el("span", "w-pt");
      s.appendChild(el("span", "w-pt-n", x));
      s.appendChild(el("b", "", String(pts[i])));
      box.appendChild(s);
    });
    box.setAttribute("aria-label", "Points so far: " + game.p.map(function (x, i) { return x + ", " + plural(pts[i], "point", "points"); }).join("; ") + ".");
  }
  function scoreIt() {
    if (!game || game.st !== "score") return;
    game.right[game.k] = picked.slice().sort(function (a, b) { return a - b; });
    if (game.k === WORDS - 1) { finish(); showEnd(); return; }
    game.k++;
    showHand();
  }

  /* ---------- the end ---------- */
  function finish() {
    game.over = true;
    var w = winners(game).map(function (i) { return game.p[i]; });
    w.forEach(function (x) { table.wins[x] = (num(table.wins[x]) ? table.wins[x] : 0) + 1; });
    table.next = (game.first + 1) % game.p.length;          // the next game starts with the next player as the reader
    TO.groupUpdate(GAME, function (g) { g.games = (num(g.games) ? g.games : 0) + 1; });
    TO.count(GAME + "/finished");
    winsLine();
    prepareCard();
  }
  function showEnd() {
    renderEnd();
    show("end");
    focusOn("end-name");
  }
  function rightCount(i) { return game.right.filter(function (r) { return r.indexOf(i) >= 0; }).length; }
  function doubles(i) { var n = game.p.length; return game.right.filter(function (r) { return r.indexOf(i) >= 0 && worth(r, n) === 2; }).length; }
  function renderEnd() {
    var pts = points(game), w = winners(game), names = w.map(function (i) { return game.p[i]; });
    var nm = $("end-name");
    nm.textContent = names.length === 1 ? names[0] + " wins!" : names.length === 2 ? listOf(names) + " share the win!"
      : names.length === game.p.length ? "Everyone shares the win!" : names.length + " players share the win!";   // the board below stars them
    nm.classList.toggle("long", nm.textContent.length > 16);
    $("end-line").textContent = "With " + plural(pts[w[0]], "point", "points") + ", after ten words.";
    var box = $("board");
    box.innerHTML = "";
    var order = game.p.map(function (x, i) { return i; }).sort(function (a, b) { return pts[b] - pts[a] || a - b; });
    order.forEach(function (i) {
      var li = el("li", "w-row" + (w.indexOf(i) >= 0 ? " win" : "")), d = doubles(i), rc = rightCount(i);
      var detail = rc + " of " + WORDS + " right" + (d ? ", " + (d === rc ? (d === 1 ? "that one" : "all of them") : d + " of them") + " for 2 points" : "");
      li.appendChild(el("span", "w-row-n", game.p[i]));
      li.appendChild(el("span", "w-row-d", detail));
      li.appendChild(el("b", "w-row-p", String(pts[i])));
      li.setAttribute("aria-label", game.p[i] + ": " + plural(pts[i], "point", "points") + ". " + detail + ".");
      box.appendChild(li);
    });
    tallyLine();
    fit();
  }
  function tallyLine() {
    var w = table.wins, parts = [];
    game.p.forEach(function (x) { parts.push(x + " (" + (num(w[x]) ? w[x] : 0) + ")"); });
    $("tally").textContent = "Wins at this table: " + parts.join(", ") + ".";
  }
  function winsLine() {
    var w = table.wins, list = $("wins-list");
    list.innerHTML = "";
    var names = [];
    for (var i = 0; i < setup.n; i++) names.push(nameOf(i));
    names.forEach(function (x) {
      var li = el("li", "w-roster-i");
      li.appendChild(el("span", "", x));
      li.appendChild(el("b", "", String(num(w[x]) ? w[x] : 0)));
      list.appendChild(li);
    });
    var total = 0;
    names.forEach(function (x) { total += num(w[x]) ? w[x] : 0; });
    $("wins-chip").setAttribute("aria-label", "Wins at this table" + (total ? ": " + total + " so far" : ""));
  }
  function renderRoster() {
    var list = $("roster");
    list.innerHTML = "";
    if (!game || game.over) { $("roster-note").textContent = "No game going on."; return; }
    var pts = points(game);
    game.p.forEach(function (x, i) {
      var li = el("li", "w-roster-i");
      li.appendChild(el("span", "", x));
      li.appendChild(el("b", "", plural(pts[i], "point", "points")));
      list.appendChild(li);
    });
    $("roster-note").textContent = "Word " + (game.k + 1) + " of " + WORDS + ". " + reader() + " reads it out.";
  }
  /* all ten words, after the game: twin or trap, both meanings, how many were right */
  function renderWords() {
    var list = $("words-list");
    list.innerHTML = "";
    if (!game) return;
    game.ids.forEach(function (id, k) {
      var p = pair(id), r = game.right[k] || [];
      var li = el("li", "w-wl");
      var h = el("span", "w-wl-h");
      h.appendChild(el("span", "w-wl-v " + (p.v === "trap" ? "is-trap" : "is-twin"), p.v === "trap" ? "Trap" : "Twin"));
      [p.a, p.b].forEach(function (s, i) {
        if (i) h.appendChild(document.createTextNode(" · "));
        h.appendChild(document.createTextNode(lang(s.l) + " "));
        var b = el("b", "", s.w); b.setAttribute("lang", s.l); h.appendChild(b);
      });
      li.appendChild(h);
      li.appendChild(el("span", "w-wl-m", p.v === "twin" ? "Both: " + p.a.m + "." : lang(p.a.l) + ": " + p.a.m + ". " + lang(p.b.l) + ": " + p.b.m + "."));
      li.appendChild(el("span", "w-wl-r", r.length + " of " + game.p.length + " right"));
      list.appendChild(li);
    });
  }

  /* ---------- the picture to share: the word that fooled the most players, and how many it fooled. Never the
     answer, so that the friends' table can play the same ten words. ---------- */
  var cardBlob = null, cardUrl = null, layout = null, best = null;
  function pickBest() {
    var b = null, n = game.p.length;
    game.right.forEach(function (r, k) {
      var fooled = n - r.length;
      if (!b || fooled >= b.f) b = { k: k, id: game.ids[k], f: fooled, n: n };
    });
    return b;
  }
  function roundRect(x, X, Y, W, H, R) {
    x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R);
    x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath();
  }
  function wrapText(x, text, maxW) {
    var words = text.split(" "), lines = [], line = "";
    words.forEach(function (w) {
      var t = line ? line + " " + w : w;
      if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  }
  function fooledLine(b) {
    return b.f === 0 ? "Nobody at our table was fooled" : b.f === b.n ? "It fooled all " + b.n + " of us" : "It fooled " + b.f + " of our " + b.n;
  }
  function drawCard(b) {
    var W2 = 1080, H2 = 1350, MG = 76, HEATHER = "#845B83", DEEP = "#3C2340";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d"), p = pair(b.id);
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F, FL = '"Literata", Georgia, serif';
    x.fillStyle = HEATHER; x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 225, 250, .22)"); glow.addColorStop(1, "rgba(0, 0, 0, .14)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.fillStyle = "#ffffff"; x.textBaseline = "alphabetic";
    x.textAlign = "left"; x.font = "800 48px " + FD; x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F; x.fillText("Twin or Trap", W2 - MG, 118);
    x.textAlign = "left";
    x.fillStyle = "rgba(255, 255, 255, .92)"; x.font = "700 44px " + F;
    x.fillText("Same word, two languages:", MG, 262);
    // the card: the two words, one under the other, like a dictionary's entry
    var cw = W2 - 2 * MG + 40, cx = MG - 20, cy = 300, rows = [p.a, p.b], ws = 112;
    x.font = "600 " + ws + "px " + FL;
    function widest() { return Math.max.apply(null, rows.map(function (s) { return x.measureText(s.w).width; })); }
    var room = cw - 120 - 260;
    while (widest() > room && ws > 60) { ws -= 4; x.font = "600 " + ws + "px " + FL; }
    var rowH = ws * 1.32, ch = rows.length * rowH + 70;
    x.fillStyle = "#ffffff"; roundRect(x, cx, cy, cw, ch, 34); x.fill();
    rows.forEach(function (s, i) {
      var base = cy + 46 + rowH * i + ws * 0.98;
      x.fillStyle = HEATHER; x.font = "800 34px " + F;
      x.fillText(lang(s.l).toUpperCase(), cx + 56, base - ws * 0.36);
      x.fillStyle = DEEP; x.font = "600 " + ws + "px " + FL;
      x.fillText(s.w, cx + 56 + 260, base);
      if (i === 0) { x.fillStyle = "rgba(132, 91, 131, .25)"; x.fillRect(cx + 56, cy + 46 + rowH - 4, cw - 112, 4); }
    });
    var y = cy + ch + 150;
    var qs = 116;
    x.fillStyle = "#ffffff"; x.font = "800 " + qs + "px " + FD;
    while (x.measureText("Twin or trap?").width > W2 - 2 * MG && qs > 80) { qs -= 4; x.font = "800 " + qs + "px " + FD; }
    x.fillText("Twin or trap?", MG - 4, y);
    // how many it fooled, on a strip of its own
    y += 56;
    var strip = fooledLine(b), ss = 58;
    x.font = "800 " + ss + "px " + FD;
    while (x.measureText(strip).width + 70 > W2 - 2 * MG + 60 && ss > 36) { ss -= 2; x.font = "800 " + ss + "px " + FD; }
    var sw = Math.min(W2 - 2 * MG + 60, x.measureText(strip).width + 70);
    x.fillStyle = DEEP;
    roundRect(x, MG - 30, y, sw, ss + 44, 22); x.fill();
    x.fillStyle = "#ffffff";
    x.fillText(strip, MG + 5, y + 22 + ss * 0.82);
    y += ss + 44;
    x.font = "600 44px " + F; x.fillStyle = "rgba(255, 255, 255, .94)";
    var al = wrapText(x, "Ten words that look the same in two languages. Does each mean the same?", W2 - 2 * MG);
    var ay = y + 84;
    al.forEach(function (l) { x.fillText(l, MG, ay); ay += 58; });
    x.font = "800 64px " + FD; x.fillStyle = "#ffffff";
    var ask = "Can your table tell?";
    x.fillText(ask, MG - 3, 1198);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where + "/twin-or-trap", wsz = 40;
      x.font = "600 " + wsz + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && wsz > 24) { wsz -= 2; x.font = "600 " + wsz + "px " + F; }
      x.fillText(line, MG, 1268);
    }
    x.font = "800 64px " + FD;
    layout = { fits: x.measureText(ask).width <= W2 - 2 * MG && ws >= 60 && sw <= W2 - 2 * MG + 60 && ay - 58 < 1120 && al.length <= 2,
               size: ws, strip: ss, bottom: ay - 58, card: ch };
    return c;
  }
  window.TwinOrTrapCard = function (id, f, n) {          // read by r/site-workshop/checks/t_twin.py
    if (id) drawCard({ id: id, f: f || 0, n: n || 4 });   // a picture for any word (it never shows the answer)
    return layout;
  };
  function prepareCard() {
    cardBlob = null;
    best = pickBest();
    if (!best) return;
    var p = pair(best.id), text = p.a.w + p.b.w;
    function make() {
      try {
        drawCard(best).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 120px "Bricolage Grotesque"'), document.fonts.load('600 40px "Figtree"'),
        document.fonts.load('700 40px "Figtree"'), document.fonts.load('600 112px "Literata"', text)]).then(make, make);
    } else make();
  }
  function shareUrl() {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?w=" + game.ids.join(".") + "&k=" + best.k + "&f=" + best.f + "&n=" + best.n;
  }
  function shareText() {
    var p = pair(best.id);
    return "Twin or Trap: " + p.a.w + (p.a.tr ? " (" + p.a.tr + ")" : "") + " in " + lang(p.a.l) + " and " + p.b.w + " in " + lang(p.b.l) +
      ": same meaning or not? " + fooledLine(best) + ". Can your table tell twins from traps? " + shareUrl();
  }

  /* ---------- wiring ---------- */
  TO.wireDialogs();
  TO.fixLocalLinks();
  winsLine();
  (function () {
    var langs = {};
    PAIRS.forEach(function (p) { langs[p.a.l] = 1; langs[p.b.l] = 1; });
    var names = Object.keys(LANGS).filter(function (l) { return langs[l]; }).map(lang);
    var twins = PAIRS.filter(function (p) { return p.v === "twin"; }).length;
    $("help-count").textContent = "The game has " + PAIRS.length + " words (" + twins + " twins and " + (PAIRS.length - twins) +
      " traps) in " + names.length + " languages: " + listOf(names) + ". It deals first the ones your table has not had lately.";
  })();
  if (friend) TO.count(GAME + "/challenge-opened");

  function plainAddress() {           // once a friend's words are dealt, the address loses them: a new opening is a plain start
    if (window.location.search && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, "", window.location.pathname); } catch (e) { /* keep the address */ }
    }
  }
  $("btn-fewer").addEventListener("click", function () { if (setup.n > PLAYERS_MIN) { setup.n--; renderSetup(); } });
  $("btn-more").addEventListener("click", function () { if (setup.n < PLAYERS_MAX) { setup.n++; renderSetup(); } });
  $("btn-names").addEventListener("click", renderNameFields);
  $("btn-start").addEventListener("click", function () {
    var f = friend ? friend.ids : null;
    friend = null;
    plainAddress();
    newGame(f);
    showHand();
  });
  $("btn-hand").addEventListener("click", function () { if (game && game.st === "hand") showWord(); });
  $("btn-answer").addEventListener("click", function () { if (game && game.st === "word") showAnswer(); });
  $("btn-who").addEventListener("click", function () { if (game && game.st === "answer") showScore(); });
  $("btn-score").addEventListener("click", scoreIt);
  $("btn-scores").addEventListener("click", renderRoster);
  $("btn-restart-yes").addEventListener("click", function () { fresh(); focusOn("btn-start"); });
  $("wins-chip").addEventListener("click", winsLine);
  $("btn-words").addEventListener("click", renderWords);
  $("btn-again").addEventListener("click", function () {
    plainAddress();
    newGame(null);
    showHand();
  });
  $("btn-change").addEventListener("click", function () { fresh(); focusOn("btn-more"); });
  $("share").addEventListener("click", function () {
    if (!best) return;
    TO.count(GAME + "/share");
    TO.share({ blob: cardBlob, filename: "twin-or-trap.png", text: shareText() }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), sv = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; sv.href = cardUrl; sv.hidden = false; }
      else { img.hidden = true; sv.hidden = true; }
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    TO.copyText(shareText()).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl();
    });
  });

  /* ---------- starting afresh (Khayyam, 6 Oct 2026, for all the games for groups: the names must restart every time
     the game is opened, and the game must restart when you go to the home page and come back; and a Restart button).
     Every opening of the page (from the home page, the Back button or a reload), Restart and "New players" clear the
     game, the players' names and the wins at this table, and show the start. ---------- */
  function fresh() {
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) { TO.closeDialog(d); });
    game = null;
    picked = [];
    setup = blankSetup();
    table = { wins: {}, next: 0 };
    winsLine();
    showStart();
  }
  /* for the checks (r/site-workshop/checks/t_twin.py): the players, the table and a game going on, set as a table
     would have them, and read back. Nothing of it is stored. */
  CORE.load = function (s) {
    s = s || {};
    fresh();
    if (num(s.n) && s.n >= PLAYERS_MIN && s.n <= PLAYERS_MAX) setup.n = Math.round(s.n);
    if (Array.isArray(s.names)) s.names.slice(0, PLAYERS_MAX).forEach(function (x, i) { setup.names[i] = clean(x); });
    if (s.wins && typeof s.wins === "object") Object.keys(s.wins).forEach(function (k) { if (num(s.wins[k])) table.wins[k] = s.wins[k]; });
    if (num(s.next)) table.next = s.next;
    winsLine();
    if (!validGame(s.cur)) { showStart(); return false; }
    game = JSON.parse(JSON.stringify(s.cur));
    game.p = game.p.map(function (x, i) { return clean(x) || "Player " + (i + 1); });
    game.over = false;
    if (game.st === "word") showWord();
    else if (game.st === "answer") showAnswer();
    else if (game.st === "score") showScore();
    else showHand();
    return true;
  };
  CORE.now = function () {
    return JSON.parse(JSON.stringify({ game: game, n: setup.n, names: setup.names, wins: table.wins, next: table.next }));
  };

  // a page that the browser brings back from its memory (the Back button) starts afresh too
  window.addEventListener("pageshow", function (e) { if (e.persisted) fresh(); });
  fresh();
})();
