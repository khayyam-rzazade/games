/* So-Called Expert: a game for one phone and three to eight players.
   Each player is the expert once. The expert alone sees a card with five facts about a country: four true, and one
   that Logicers invented, marked with a stamp. The expert presents all five as true and takes up to three questions;
   then the phone goes to the middle and everyone else points at the fact they think is invented. The reveal shows
   the invented fact, always marked as invented by Logicers, the truth and its sources; then the four true facts with
   theirs. Each player who found it gets a point; the expert gets a point for each player fooled. Most points wins.
   Not daily: no day number, no streak, no album. Every opening of the page starts fresh (Khayyam, 6 Oct 2026): the
   players' names, the game and the wins at this table live only while the page is open, and are never stored. The
   browser keeps only the cards a table had lately (TO.groupUpdate), so that it deals new ones first.
   The cards come from data/so-called-expert.js (made by r/so-called-expert-workshop/build.py, which checks them). */
(function () {
  "use strict";

  var GAME = "so-called-expert";
  var TO = window.TurnsOut;
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  var HAS_DOC = typeof document !== "undefined";
  function $(id) { return document.getElementById(id); }

  var PLAYERS_MIN = 3, PLAYERS_MAX = 8;
  var RECENT = 40;                     // the cards a table had lately, dealt again only when the others run out

  /* ================================================================================================
     The core: the cards, the deal, the points. No page needed (the checks call it too).
     ================================================================================================ */
  function num(v) { return typeof v === "number" && isFinite(v); }
  function str(v) { return typeof v === "string" && v.length > 0; }
  function srcOk(s) {
    return Array.isArray(s) && s.length > 0 && s.every(function (x) {
      return Array.isArray(x) && x.length === 2 && str(x[0]) && /^https:\/\//.test(x[1]);
    });
  }
  function cardOk(c) {
    return !!c && str(c.id) && str(c.name) && Array.isArray(c.f) && c.f.length === 4 &&
      c.f.every(function (f) { return f && str(f.t) && srcOk(f.s); }) &&
      !!c.x && str(c.x.t) && str(c.x.truth) && srcOk(c.x.s);
  }
  var CARDS = DATA && Array.isArray(DATA.cards) ? DATA.cards.filter(cardOk) : [];
  var byId = {};
  CARDS.forEach(function (c) { byId[c.id] = c; });
  var READY = CARDS.length >= PLAYERS_MAX;

  function card(id) { return byId[id] || null; }
  function title(c) { return (c.the ? "The " : "") + c.name; }          // at the start of a line
  function inText(c) { return (c.the ? "the " : "") + c.name; }         // inside a sentence
  /* the five facts of a turn in the order shown: perm[i] is the fact at place i (0 to 3 true, 4 invented) */
  function factsOf(id, perm) {
    var c = card(id);
    return perm.map(function (k, i) {
      var f = k === 4 ? c.x : c.f[k];
      return { n: i + 1, t: f.t, s: f.s, inv: k === 4, truth: k === 4 ? c.x.truth : "" };
    });
  }
  function permOk(p) {
    if (!Array.isArray(p) || p.length !== 5) return false;
    var seen = {};
    for (var i = 0; i < 5; i++) { if (!num(p[i]) || p[i] < 0 || p[i] > 4 || seen[p[i]]) return false; seen[p[i]] = 1; }
    return true;
  }
  function shuffle(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function seeded(seed) {                    // a small repeatable random number maker, for the checks
    var s = (seed >>> 0) || 1;
    return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  /* n different cards: a friend's card first, then the cards the table has not had lately, then the others */
  function deal(n, avoid, forced, rnd) {
    var out = [], used = {};
    if (forced && card(forced)) { out.push(forced); used[forced] = 1; }
    var fresh = shuffle(CARDS.filter(function (c) { return !used[c.id] && avoid.indexOf(c.id) < 0; }).map(function (c) { return c.id; }), rnd);
    var old = avoid.filter(function (id) { return card(id) && !used[id]; });        // the oldest of the recent ones first
    fresh.concat(old).forEach(function (id) { if (out.length < n && !used[id]) { out.push(id); used[id] = 1; } });
    return out;
  }
  function order(rnd) { return shuffle([0, 1, 2, 3, 4], rnd); }
  /* the points: each player who found the invented fact gets one; the expert one for each player fooled */
  function expertOf(g, k) { return (g.first + k) % g.p.length; }
  function points(g) {
    var pts = g.p.map(function () { return 0; });
    g.found.forEach(function (f, k) {
      if (!Array.isArray(f)) return;
      f.forEach(function (i) { pts[i] += 1; });
      pts[expertOf(g, k)] += (g.p.length - 1) - f.length;
    });
    return pts;
  }
  function winners(g) {
    var pts = points(g), best = Math.max.apply(null, pts), w = [];
    pts.forEach(function (x, i) { if (x === best) w.push(i); });
    return w;
  }

  var CORE = {
    ready: READY, CARDS: CARDS, PLAYERS_MIN: PLAYERS_MIN, PLAYERS_MAX: PLAYERS_MAX,
    card: card, title: title, inText: inText, factsOf: factsOf, permOk: permOk, cardOk: cardOk,
    deal: function (n, avoid, forced, seed) { return deal(n, avoid || [], forced || null, seeded(seed)); },
    order: function (seed) { return order(seeded(seed)); },
    points: points, winners: winners, expertOf: expertOf
  };
  window.SoCalledExpert = CORE;
  if (!HAS_DOC) return;

  /* ================================================================================================
     The page
     ================================================================================================ */
  if (!TO || !READY) {
    var t0 = $("start-title");
    if (t0) t0.textContent = "The cards could not be loaded. Please try again in a moment.";
    var b0 = $("btn-start");
    if (b0) b0.hidden = true;
    var p0 = document.querySelector(".e-players");
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

  /* ---------- who plays: how many, and their names (optional). They live only while the page is open. ---------- */
  function blankSetup() {
    var nm = [];
    while (nm.length < PLAYERS_MAX) nm.push("");
    return { n: 4, names: nm };
  }
  var setup = blankSetup();
  function nameOf(i) { return setup.names[i] || "Player " + (i + 1); }
  /* the table of this sitting: the wins per name, and who is the first expert of the next game */
  var table = { wins: {}, next: 0 };
  /* what earlier versions kept in the browser (names, wins, a game going on) is cleared: nothing about the players stays */
  TO.groupUpdate(GAME, function (g) { delete g.cur; delete g.names; delete g.wins; delete g.next; delete g.n; });

  /* ---------- the game, in the page only: a new opening of the page (or Restart) starts afresh ----------
     { p: names, first: the first expert, k: the turn (0 to n-1), cards: [card id per turn], ord: [the order of the
       five facts per turn], found: [[the players who found it] per turn scored], st: "hand" | "vote" | "reveal" |
       "sum", over } */
  var game = null;
  var view = "start";
  function validGame(x) {
    if (!x || typeof x !== "object" || !Array.isArray(x.p) || x.p.length < PLAYERS_MIN || x.p.length > PLAYERS_MAX) return false;
    var n = x.p.length;
    if (!num(x.first) || x.first < 0 || x.first >= n || !num(x.k) || x.k < 0 || x.k >= n) return false;
    if (!Array.isArray(x.cards) || x.cards.length !== n || !Array.isArray(x.ord) || x.ord.length !== n) return false;
    var seen = {};
    for (var i = 0; i < n; i++) {
      if (!card(x.cards[i]) || seen[x.cards[i]] || !permOk(x.ord[i])) return false;
      seen[x.cards[i]] = 1;
    }
    if (["hand", "vote", "reveal", "sum"].indexOf(x.st) < 0) return false;
    if (!Array.isArray(x.found) || x.found.length !== x.k + (x.st === "sum" ? 1 : 0)) return false;
    for (var k = 0; k < x.found.length; k++) {
      var f = x.found[k], e = (x.first + k) % n, s2 = {};
      if (!Array.isArray(f)) return false;
      for (var j = 0; j < f.length; j++) {
        if (!num(f[j]) || f[j] < 0 || f[j] >= n || f[j] === e || s2[f[j]]) return false;
        s2[f[j]] = 1;
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
    var rnd = Math.random;
    game = { p: [], first: first, k: 0, cards: deal(n, recentList(), forced, rnd), ord: [], found: [], st: "hand", over: false };
    for (var i = 0; i < n; i++) { game.p.push(nameOf(i)); game.ord.push(order(rnd)); }
    TO.groupUpdate(GAME, function (g2) {
      var r = Array.isArray(g2.recent) ? g2.recent.filter(function (x) { return typeof x === "string"; }) : [];
      game.cards.forEach(function (id) { var at = r.indexOf(id); if (at >= 0) r.splice(at, 1); r.push(id); });
      g2.recent = r.slice(-RECENT);
    });
    TO.count(GAME + "/started");
  }
  function cur() { return card(game.cards[game.k]); }
  function expert() { return expertOf(game, game.k); }
  function facts() { return factsOf(game.cards[game.k], game.ord[game.k]); }

  /* ---------- the views ---------- */
  var views = { start: $("v-start"), hand: $("v-hand"), card: $("v-card"), vote: $("v-vote"), reveal: $("v-reveal"), sum: $("v-sum"), end: $("v-end") };
  function show(v) {
    view = v;
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.setAttribute("data-view", v);
    if (v !== "card") $("card-facts").innerHTML = "";      // the stamp never stays in the page once the card is put away
    if (v !== "vote") $("vote-facts").innerHTML = "";      // nor the facts of a turn in the views that do not show them
    if (v !== "sum") $("sum-facts").innerHTML = "";
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
  window.addEventListener("resize", fit);
  function focusOn(id) {                     // a heading takes the focus too, so that a screen reader reads where it is
    var e = $(id);
    if (!e) return;
    if (!/^(BUTTON|A|INPUT)$/.test(e.nodeName) && !e.hasAttribute("tabindex")) e.setAttribute("tabindex", "-1");
    e.focus();
  }

  /* the start */
  var params = new URLSearchParams(window.location.search);
  var friend = null;
  (function () {
    var c = String(params.get("card") || "").toUpperCase(), f = params.get("f"), v = params.get("v");
    if (!card(c)) return;
    var fo = /^\d$/.test(f || "") ? parseInt(f, 10) : null, vo = /^\d$/.test(v || "") ? parseInt(v, 10) : null;
    if (fo === null || vo === null || vo < 2 || vo > PLAYERS_MAX - 1 || fo > vo) { fo = null; vo = null; }
    friend = { card: c, f: fo, v: vo };
  })();
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
        var lab = el("label", "e-name-field");
        lab.appendChild(el("span", "e-name-n", String(i + 1)));
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
      var c = card(friend.card);
      f.textContent = "A friend's table played five facts about " + inText(c) +
        (friend.v ? ", and their expert fooled " + friend.f + " of " + friend.v : "") + ". Can your table spot the invented one?";
      f.hidden = false;
      $("btn-start").textContent = "Play their card";
    } else {
      f.hidden = true;
      $("btn-start").textContent = "Start";
    }
    fit();
  }

  /* the country's name as a heading, with the other name people know in brackets */
  function heading(box, c) {
    box.textContent = title(c);
    if (c.also) {
      box.appendChild(document.createTextNode(" "));
      box.appendChild(el("span", "e-also", "(" + c.also + ")"));
    }
  }
  function scoreLine(box) {
    var pts = points(game);
    box.innerHTML = "";
    box.appendChild(el("span", "e-pts-k", "Points"));
    game.p.forEach(function (x, i) {
      var s = el("span", "e-pt");
      s.appendChild(el("span", "e-pt-n", x));
      s.appendChild(el("b", "", String(pts[i])));
      box.appendChild(s);
    });
    box.setAttribute("aria-label", "Points so far: " + game.p.map(function (x, i) { return x + ", " + plural(pts[i], "point", "points"); }).join("; ") + ".");
  }

  /* passing the phone (Khayyam, 5 Oct 2026, late evening, after trying Still In: it must say so very plainly):
     before every turn a whole screen says what the last turn gave and to whom the phone goes; the expert taps to say
     they have it, and only then the card shows. */
  function handRecap() {
    if (game.k === 0) return "A new game: each of you is the expert once.";
    var k = game.k - 1, e = game.p[expertOf(game, k)], c = inText(card(game.cards[k]));
    var voters = game.p.length - 1, fooled = voters - (game.found[k] || []).length;
    return fooled === 0 ? "Nobody was fooled by " + e + " on " + c + "." : fooled === voters ? e + " fooled everyone on " + c + "."
      : e + " fooled " + fooled + " of " + voters + " on " + c + ".";
  }
  function showHand() {
    var e = game.p[expert()];
    game.st = "hand";
    show("hand");
    $("hand-res").textContent = handRecap();
    $("hand-name").textContent = e;
    $("hand-line").textContent = e + " is the expert. Everyone else: look away until " + e + " puts the phone in the middle.";
    $("btn-card").textContent = e + " has the phone";
    $("hand-k").textContent = "Turn " + (game.k + 1) + " of " + game.p.length;
    fitHandName();
    focusOn("btn-card");
  }
  function fitHandName() {                   // a long name gets smaller until it fits on one line
    var n = $("hand-name");
    n.style.fontSize = "";
    var size = parseFloat(window.getComputedStyle(n).fontSize) || 48;
    while (n.scrollWidth > n.clientWidth + 1 && size > 22) { size -= 2; n.style.fontSize = size + "px"; }
    fit();
  }

  /* the expert's card: the five facts, the stamp on the invented one */
  function factItem(f, withStamp) {
    var li = el("li", "e-fact" + (withStamp && f.inv ? " is-inv" : ""));
    li.appendChild(el("span", "e-n", String(f.n)));
    var t = el("span", "e-t");
    if (withStamp && f.inv) {
      t.appendChild(el("span", "e-stamp", "Invented"));
      t.appendChild(el("span", "sr-only", " by Logicers: "));
    }
    t.appendChild(document.createTextNode(f.t));
    if (withStamp && f.inv) t.appendChild(el("span", "e-say", "Say it like the others."));
    li.appendChild(t);
    return li;
  }
  function showCard() {
    var c = cur();
    show("card");
    heading($("card-name"), c);
    $("card-k").textContent = "Only you see this · " + game.p[expert()] + ", turn " + (game.k + 1) + " of " + game.p.length;
    var box = $("card-facts");
    box.innerHTML = "";
    facts().forEach(function (f) { box.appendChild(factItem(f, true)); });
    fit();
    focusOn("card-name");
  }

  /* the table votes: the same five facts, in the same order, with no mark */
  function showVote() {
    var c = cur(), e = game.p[expert()];
    game.st = "vote";
    show("vote");
    $("vote-k").textContent = e + " is the expert · " + title(c);
    var box = $("vote-facts");
    box.innerHTML = "";
    facts().forEach(function (f) { box.appendChild(factItem(f, false)); });
    $("vote-line").textContent = "On three, everyone but " + e + " points at the number they think is invented.";
    fit();
    focusOn("vote-q");
  }

  /* the reveal: the invented fact, always marked as invented by Logicers, the truth and its sources */
  function links(box, list, lead) {
    box.innerHTML = "";
    if (lead) box.appendChild(document.createTextNode(lead));
    list.forEach(function (s, i) {
      if (i) box.appendChild(document.createTextNode(" · "));
      var a = el("a", "", s[0]);
      a.href = s[1]; a.target = "_blank"; a.rel = "noopener";
      box.appendChild(a);
    });
    if (list.some(function (s) { return /worldbank\.org/.test(s[1]); })) box.appendChild(document.createTextNode(" (CC BY 4.0)"));
  }
  var picked = [];
  function showReveal() {
    var c = cur(), e = expert(), inv = facts().filter(function (f) { return f.inv; })[0];
    game.st = "reveal";
    show("reveal");
    $("rev-k").textContent = title(c) + " · number " + inv.n + " was invented";
    $("rev-head").textContent = inv.t;
    $("rev-truth").textContent = "";
    $("rev-truth").appendChild(el("b", "", "The truth: "));
    $("rev-truth").appendChild(document.createTextNode(inv.truth));
    links($("rev-src"), inv.s, "Sources: ");
    var box = $("who");
    box.innerHTML = "";
    picked = [];
    game.p.forEach(function (x, i) {
      if (i === e) return;
      var b = el("button", "e-who-b", x);
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
    fit();
    focusOn("rev-head");
  }
  function scoreButton() {
    var voters = game.p.length - 1, f = picked.length;
    $("btn-score").textContent = f === 0 ? "Nobody found it" : f === voters ? "Everyone found it" : "Score it";
  }
  function scoreIt() {
    if (!game || game.st !== "reveal") return;
    game.found[game.k] = picked.slice().sort(function (a, b) { return a - b; });
    game.st = "sum";
    showSum(true);
  }

  /* after a turn: the four true facts with their sources, and the points */
  function showSum(fresh) {
    var c = cur(), e = expert(), found = game.found[game.k] || [], voters = game.p.length - 1, fooled = voters - found.length;
    show("sum");
    var en = game.p[e];
    $("sum-k").textContent = fooled === 0 ? "Nobody was fooled by " + en + " · " + title(c)
      : fooled === voters ? en + " fooled everyone · " + title(c)
      : en + " fooled " + fooled + " of " + voters + " · " + title(c);
    var box = $("sum-facts");
    box.innerHTML = "";
    facts().forEach(function (f) {
      if (f.inv) return;
      var li = el("li", "e-fact");
      li.appendChild(el("span", "e-n", String(f.n)));
      var t = el("span", "e-t", f.t);
      var s = el("span", "e-src");
      links(s, f.s, "");
      t.appendChild(s);
      li.appendChild(t);
      box.appendChild(li);
    });
    scoreLine($("sum-scores"));
    var last = game.k === game.p.length - 1;
    var nb = $("btn-next");
    nb.textContent = last ? "Final scores" : "Pass to " + game.p[expertOf(game, game.k + 1)];
    nb.setAttribute("aria-label", last ? "Final scores" : "Pass the phone to " + game.p[expertOf(game, game.k + 1)]);
    fit();
    focusOn(fresh ? "sum-head" : "btn-next");
  }
  function nextTurn() {
    if (!game || game.st !== "sum") return;
    if (game.k === game.p.length - 1) { finish(); showEnd(); return; }
    game.k++;
    showHand();
  }

  /* the end */
  function finish() {
    game.over = true;
    var w = winners(game).map(function (i) { return game.p[i]; });
    w.forEach(function (x) { table.wins[x] = (num(table.wins[x]) ? table.wins[x] : 0) + 1; });
    table.next = (game.first + 1) % game.p.length;          // the next game starts with the next player as the expert
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
  function renderEnd() {
    var pts = points(game), w = winners(game), names = w.map(function (i) { return game.p[i]; });
    var nm = $("end-name");
    nm.textContent = names.length === 1 ? names[0] + " wins!" : names.length === 2 ? listOf(names) + " share the win!"
      : names.length === game.p.length ? "Everyone shares the win!" : names.length + " players share the win!";   // the board below stars them
    nm.classList.toggle("long", nm.textContent.length > 16);
    $("end-line").textContent = "With " + plural(pts[w[0]], "point", "points") + ", after " + plural(game.p.length, "turn", "turns") + ".";
    var box = $("board");
    box.innerHTML = "";
    var order = game.p.map(function (x, i) { return i; }).sort(function (a, b) { return pts[b] - pts[a] || a - b; });
    order.forEach(function (i) {
      var k = (i - game.first + game.p.length) % game.p.length, f = game.found[k] || [], fooled = game.p.length - 1 - f.length;
      var li = el("li", "e-row" + (w.indexOf(i) >= 0 ? " win" : ""));
      li.appendChild(el("span", "e-row-n", game.p[i]));
      li.appendChild(el("span", "e-row-d", "fooled " + fooled + " of " + (game.p.length - 1) + " on " + inText(card(game.cards[k]))));
      li.appendChild(el("b", "e-row-p", String(pts[i])));
      li.setAttribute("aria-label", game.p[i] + ": " + plural(pts[i], "point", "points") + ". As the expert, fooled " + fooled + " of " + (game.p.length - 1) + " on " + inText(card(game.cards[k])) + ".");
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
      var li = el("li", "e-roster-i");
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
    if (!game) { $("roster-note").textContent = "No game going on."; return; }
    var pts = points(game);
    game.p.forEach(function (x, i) {
      var li = el("li", "e-roster-i");
      li.appendChild(el("span", "", x));
      li.appendChild(el("b", "", plural(pts[i], "point", "points")));
      list.appendChild(li);
    });
    $("roster-note").textContent = "Turn " + (game.k + 1) + " of " + game.p.length + ". " + game.p[expert()] + " is the expert.";
  }

  /* ---------- the picture to share: the turn that fooled the most players. Its country and how many it fooled,
     never a fact: an invented fact must not travel without its label. ---------- */
  var cardBlob = null, cardUrl = null, layout = null, best = null;
  function pickBest() {
    var b = null;
    game.found.forEach(function (f, k) {
      var fooled = game.p.length - 1 - f.length;
      if (!b || fooled >= b.f) b = { card: game.cards[k], f: fooled, v: game.p.length - 1 };
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
  function bluffLine(b) {
    return b.f === 0 ? "Nobody was fooled" : b.f === b.v ? "Fooled all " + b.v : "Fooled " + b.f + " of " + b.v;
  }
  function drawCard(b) {
    var W2 = 1080, H2 = 1350, MG = 76, RED = "#9B0238";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d"), cd = card(b.card);
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
    x.fillStyle = RED; x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 200, 220, .22)"); glow.addColorStop(1, "rgba(0, 0, 0, .14)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.fillStyle = "#ffffff"; x.textBaseline = "alphabetic";
    x.textAlign = "left"; x.font = "800 48px " + FD; x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F; x.fillText("So-Called Expert", W2 - MG, 118);
    // the line under the expert, as on television: who, and on what
    var top = 300;
    x.textAlign = "left";
    x.fillStyle = "rgba(255, 255, 255, .9)"; x.font = "700 40px " + F;
    x.fillText("Our expert on", MG, top);
    var hs = 120, head = title(cd);
    x.font = "800 " + hs + "px " + FD;
    var lines = wrapText(x, head, W2 - 2 * MG);
    while ((lines.length > 2 || lines.some(function (l) { return x.measureText(l).width > W2 - 2 * MG; })) && hs > 64) {
      hs -= 6; x.font = "800 " + hs + "px " + FD; lines = wrapText(x, head, W2 - 2 * MG);
    }
    var y = top + 24, bandH = lines.length * hs * 1.06 + 50;
    x.fillStyle = "#ffffff";
    roundRect(x, MG - 30, y, W2 - 2 * MG + 60, bandH, 26); x.fill();
    x.fillStyle = RED;
    var ly = y + 22 + hs * 0.86;
    lines.forEach(function (l) { x.fillText(l, MG, ly); ly += hs * 1.06; });
    y += bandH + 22;
    // how many it fooled, on a strip of its own
    var strip = bluffLine(b) + (b.f ? "" : ""), ss = 72;
    x.font = "800 " + ss + "px " + FD;
    var sw = Math.min(W2 - 2 * MG + 60, x.measureText(strip).width + 70);
    x.fillStyle = "#15172B";
    roundRect(x, MG - 30, y, sw, ss + 44, 22); x.fill();
    x.fillStyle = "#ffffff";
    x.fillText(strip, MG + 5, y + 22 + ss * 0.82);
    y += ss + 44;
    // what the game is, without a fact
    x.font = "600 44px " + F; x.fillStyle = "rgba(255, 255, 255, .94)";
    var about = "Five facts about " + inText(cd) + ". Logicers invented one of them.";
    var al = wrapText(x, about, W2 - 2 * MG);
    var ay = y + 96;
    al.forEach(function (l) { x.fillText(l, MG, ay); ay += 58; });
    // the expert's card, as on the home page: five lines, a stamp across one, no words
    var room = 1110 - (ay - 20), ch = Math.min(300, room - 40);
    if (ch >= 180) {
      var cw = Math.round(ch * 1.3), cx = (W2 - cw) / 2, cy = ay - 20 + (room - ch) / 2;
      x.save(); x.translate(cx + cw / 2, cy + ch / 2); x.rotate(-0.05); x.translate(-cw / 2, -ch / 2);
      x.fillStyle = "#ffffff"; roundRect(x, 0, 0, cw, ch, 22); x.fill();
      x.save(); roundRect(x, 0, 0, cw, ch, 22); x.clip(); x.fillStyle = RED; x.fillRect(0, 0, cw, ch * 0.16); x.restore();
      var gap = ch * 0.84 / 6;
      for (var i = 0; i < 5; i++) {
        var yy = ch * 0.16 + gap * (i + 1);
        x.fillStyle = "rgba(155, 2, 56, .22)";
        x.beginPath(); x.arc(cw * 0.1, yy, ch * 0.028, 0, Math.PI * 2); x.fill();
        roundRect(x, cw * 0.17, yy - ch * 0.02, cw * [0.66, 0.56, 0.72, 0.6, 0.5][i], ch * 0.04, ch * 0.02); x.fill();
      }
      x.save(); x.translate(cw * 0.58, ch * 0.16 + gap * 4); x.rotate(-0.16);
      x.strokeStyle = RED; x.lineWidth = 7; roundRect(x, -cw * 0.24, -ch * 0.085, cw * 0.48, ch * 0.17, 12); x.stroke();
      x.fillStyle = RED; roundRect(x, -cw * 0.17, -ch * 0.017, cw * 0.34, ch * 0.034, ch * 0.017); x.fill();
      x.restore(); x.restore();
    }
    x.font = "800 66px " + FD; x.fillStyle = "#ffffff";
    x.fillText("Can your table spot it?", MG - 3, 1198);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1268);
    }
    x.font = "800 66px " + FD;
    var askW = x.measureText("Can your table spot it?").width;
    layout = { fits: askW <= W2 - 2 * MG && lines.length <= 2 && sw <= W2 - 2 * MG + 60 && ay - 58 < 1120 && al.length <= 3,
               lines: lines.length, size: hs, about: al.length, bottom: ay - 58 };
    return c;
  }
  window.SoCalledExpertCard = function (id, f, v) {          // read by r/site-workshop/checks/t_expert.py
    if (id) drawCard({ card: id, f: f || 0, v: v || 3 });     // a picture for any card (it shows no fact)
    return layout;
  };
  function prepareCard() {
    cardBlob = null;
    best = pickBest();
    if (!best) return;
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
      Promise.all([document.fonts.load('800 120px "Bricolage Grotesque"'), document.fonts.load('600 40px "Figtree"'), document.fonts.load('700 40px "Figtree"')]).then(make, make);
    } else make();
  }
  function shareUrl() {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?card=" + best.card + "&f=" + best.f + "&v=" + best.v;
  }
  function shareText() {
    var c = card(best.card);
    return "So-Called Expert: five facts about " + inText(c) + ", one invented by Logicers. " +
      (best.f ? "Our expert fooled " + best.f + " of " + best.v + "." : "Our table spotted the fake.") +
      " Can your table spot it? " + shareUrl();
  }

  /* ---------- wiring ---------- */
  TO.wireDialogs();
  TO.fixLocalLinks();
  winsLine();
  $("help-count").textContent = "The game has " + CARDS.length + " cards. It deals first the ones your table has not had lately.";
  if (friend) TO.count(GAME + "/challenge-opened");

  function plainAddress() {           // once a friend's card is dealt, the address loses it: a new opening is a plain start
    if (window.location.search && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, "", window.location.pathname); } catch (e) { /* keep the address */ }
    }
  }
  $("btn-fewer").addEventListener("click", function () { if (setup.n > PLAYERS_MIN) { setup.n--; renderSetup(); } });
  $("btn-more").addEventListener("click", function () { if (setup.n < PLAYERS_MAX) { setup.n++; renderSetup(); } });
  $("btn-names").addEventListener("click", renderNameFields);
  $("btn-start").addEventListener("click", function () {
    var f = friend ? friend.card : null;
    friend = null;
    plainAddress();
    newGame(f);
    showHand();
  });
  $("btn-card").addEventListener("click", showCard);
  $("btn-table").addEventListener("click", showVote);
  $("btn-reveal").addEventListener("click", showReveal);
  $("btn-score").addEventListener("click", scoreIt);
  $("btn-next").addEventListener("click", nextTurn);
  $("btn-scores").addEventListener("click", renderRoster);
  $("btn-restart-yes").addEventListener("click", function () { fresh(); focusOn("btn-start"); });
  $("wins-chip").addEventListener("click", winsLine);
  $("btn-again").addEventListener("click", function () {
    plainAddress();
    newGame(null);
    showHand();
  });
  $("btn-change").addEventListener("click", function () { fresh(); focusOn("btn-more"); });
  $("share").addEventListener("click", function () {
    if (!best) return;
    TO.count(GAME + "/share");
    TO.share({ blob: cardBlob, filename: "so-called-expert.png", text: shareText() }).then(function (how) {
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

  /* ---------- starting afresh (Khayyam, 6 Oct 2026: the names must restart every time the game is opened, and the
     game must restart when you go to the home page and come back; and a Restart button). Every opening of the page
     (from the home page, the Back button or a reload), Restart and "New players" clear the game, the players' names
     and the wins at this table, and show the start. ---------- */
  function fresh() {
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) { TO.closeDialog(d); });
    game = null;
    picked = [];
    setup = blankSetup();
    table = { wins: {}, next: 0 };
    winsLine();
    showStart();
  }
  /* for the checks (r/site-workshop/checks/t_expert.py): the players, the table and a game going on, set as a table
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
    if (game.st === "vote") showVote();
    else if (game.st === "reveal") showReveal();
    else if (game.st === "sum") showSum(false);
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
