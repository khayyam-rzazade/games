/* Logicers (first called Turns Out): the frame every game uses.
   The daily change, what is kept in the browser, streaks, sharing, dialogs, the list of games and the way onward.
   No login, no server, no tracking. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     The free visitor counter (GoatCounter).
     To switch it on, put your GoatCounter code between the quotes,
     for example "turnsout" if your counter lives at turnsout.goatcounter.com.
     Empty quotes: nothing is counted and no outside service is contacted.
     ------------------------------------------------------------------ */
  var COUNTER = "khayyam";

  /* ------------------------------------------------------------------
     The address printed on every share picture, so that people who only
     get the picture know where to play.
     Empty quotes: the site's own web address is used.
     Once the site has its own domain, write it here, for example "turnsout.games".
     ------------------------------------------------------------------ */
  var ADDRESS = "logicers.com";
  var SELF = (document.currentScript && document.currentScript.src) || "";

  var KEY = "turnsout:v1";
  var memory = null; // used when the browser will not let us store anything (private mode)

  function obj(v) { return (v && typeof v === "object" && !Array.isArray(v)) ? v : null; }
  function readAll() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return obj(JSON.parse(raw)) || {};          // anything that is not a plain object counts as empty
    } catch (e) { /* fall through */ }
    return memory || {};
  }
  function writeAll(all) {
    memory = all;
    try { window.localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* keep in memory only */ }
  }
  function blank() { return { results: {}, practice: {} }; }

  /* What one game has stored: { results: {day: {...}}, practice: {day: {...}} }.
     Damaged data (a number where a list of results should be, and the like) is treated as nothing played. */
  function game(id) {
    var all = readAll();
    var g = obj(obj(all.games) && all.games[id]) || blank();
    g.results = obj(g.results) || {};
    g.practice = obj(g.practice) || {};
    return g;
  }
  function update(id, change) {
    var all = readAll();
    all.games = obj(all.games) || {};
    var g = obj(all.games[id]) || blank();
    g.results = obj(g.results) || {};
    g.practice = obj(g.practice) || {};
    change(g);
    all.games[id] = g;
    var reached = milestones(all);      // returning players: see below
    writeAll(all);
    reached.forEach(count);
    return g;
  }

  /* ---- the daily change: day 1 is the start date, a new day begins at the player's own midnight ---- */
  function dayNumber(startISO, now) {
    var p = String(startISO || "").split("-");
    var d = now || new Date();
    var a = Date.UTC(+p[0], +p[1] - 1, +p[2]);
    var b = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    if (isNaN(a)) return 1;
    return Math.floor((b - a) / 86400000) + 1;
  }

  /* ---- streak: days played in a row. A bad guess never breaks it. ---- */
  function streak(results, today) {
    var days = Object.keys(results || {}).map(Number).filter(function (n) { return n >= 1 && n <= today; });
    var played = {};
    days.forEach(function (n) { played[n] = true; });
    var current = 0;
    var from = played[today] ? today : today - 1;
    for (var n = from; n >= 1 && played[n]; n--) current++;
    var best = 0, run = 0;
    days.sort(function (x, y) { return x - y; }).forEach(function (n, i, arr) {
      run = (i > 0 && arr[i - 1] === n - 1) ? run + 1 : 1;
      if (run > best) best = run;
    });
    return { current: current, best: Math.max(best, current), played: days.length };
  }

  /* ---- sharing: the phone's own share sheet when it can take a picture, otherwise the caller shows a fallback ---- */
  function share(o) {
    var file = null;
    try {
      if (o.blob && typeof File === "function") file = new File([o.blob], o.filename || "turns-out.png", { type: "image/png" });
    } catch (e) { file = null; }
    var nav = window.navigator;
    if (file && nav.canShare && nav.share) {
      var ok = false;
      try { ok = nav.canShare({ files: [file] }); } catch (e) { ok = false; }
      if (ok) {
        return nav.share({ files: [file], text: o.text }).then(
          function () { return "shared"; },
          function (err) { return (err && err.name === "AbortError") ? "closed" : "fallback"; }
        );
      }
    }
    return Promise.resolve("fallback");
  }

  function copyText(text) {
    if (window.navigator.clipboard && window.navigator.clipboard.writeText) {
      return window.navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  function legacyCopy(text) {
    try {
      var t = document.createElement("textarea");
      t.value = text;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(t);
      return ok;
    } catch (e) { return false; }
  }

  /* ---- dialogs ---- */
  function openDialog(el) {
    if (!el) return;
    if (typeof el.showModal === "function") { if (!el.open) el.showModal(); }
    else el.setAttribute("open", "");
  }
  function closeDialog(el) {
    if (!el) return;
    if (typeof el.close === "function") { if (el.open) el.close(); }
    else el.removeAttribute("open");
  }
  function wireDialogs() {
    document.addEventListener("click", function (e) {
      var opener = e.target.closest ? e.target.closest("[data-open]") : null;
      if (opener) { openDialog(document.getElementById(opener.getAttribute("data-open"))); return; }
      var closer = e.target.closest ? e.target.closest("[data-close]") : null;
      if (closer) { closeDialog(closer.closest("dialog")); return; }
      if (e.target && e.target.nodeName === "DIALOG") closeDialog(e.target); // a tap on the dark area around it
    });
  }

  /* ---- one little figure, as SVG. The shape lives once in the page as <symbol id="p">. ---- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function figure() {
    var s = document.createElementNS(SVGNS, "svg");
    s.setAttribute("class", "fig");
    s.setAttribute("viewBox", "0 0 20 22");
    s.setAttribute("aria-hidden", "true");
    var u = document.createElementNS(SVGNS, "use");
    u.setAttribute("href", "#p");
    s.appendChild(u);
    return s;
  }

  /* The colour of each topic. Yellow is kept for one meaning only: the part you got wrong. */
  var COLOURS = {
    blue: "#1f3a7a",
    teal: "#0e5f63",
    red: "#a8322b",
    violet: "#4c3a8f",
    green: "#1c6b47",
    magenta: "#8f2a5f"
  };
  function colour(name) { return COLOURS[name] || COLOURS.blue; }

  /* On a web server "games/" opens "games/index.html" by itself. Opened from a folder it does not,
     so there we add the file name. */
  var LOCAL = window.location.protocol === "file:";
  function here(href) {
    if (!LOCAL) return href;
    var parts = String(href).split(/(?=[?#])/);
    if (parts[0] === "" || parts[0].slice(-1) === "/") parts[0] += "index.html";
    return parts.join("");
  }
  function fixLocalLinks() {
    if (!LOCAL) return;
    Array.prototype.forEach.call(document.querySelectorAll("a[href]"), function (a) {
      var h = a.getAttribute("href");
      if (/^(https?:|mailto:|#|blob:)/.test(h)) return;
      a.setAttribute("href", here(h));
    });
  }

  /* ---- where to play: "name.github.io/turns-out" or, later, the site's own domain ---- */
  function address() {
    if (ADDRESS) return ADDRESS;
    if (!/^https?:/.test(SELF)) return "";       // opened from a folder: there is no web address yet
    return SELF.replace(/^https?:\/\//, "").replace(/assets\/js\/turnsout\.js.*$/, "").replace(/\/$/, "").replace(/^www\./, "");
  }

  /* ---- counting visits and plays, without cookies and without identifying anyone ---- */
  var waiting = [];
  function counterOn() {              // not from a folder and not on a test server on this computer
    return !!COUNTER && window.location.protocol !== "file:" && !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  }
  function count(name) {              // an event, for example "100-of-us/played/day-7"
    if (!counterOn()) return;
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({ path: name, title: name, event: true });
      } else {
        waiting.push(name);
      }
    } catch (e) { /* counting must never break a game */ }
  }
  function startCounter() {
    if (!counterOn()) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + COUNTER + ".goatcounter.com/count");
    s.onload = function () { var q = waiting; waiting = []; q.forEach(count); };
    document.head.appendChild(s);
  }
  /* What the pages say about privacy must match what the site does. */
  function privacyNotes() {
    if (!counterOn()) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (el) {
      el.textContent = el.getAttribute("data-privacy") === "short"
        ? "No login. No cookies. Your results stay in your browser. Visits are counted without identifying anyone."
        : "No login and no cookies. Your streak and your album are kept only in this browser. Visits and plays are counted with GoatCounter, without identifying anyone.";
    });
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* ------------------------------------------------------------------
     The games of the site, in the order of the shelf. One list for the home page and for the
     way onward at the end of every game.
     "start" repeats day 1 from each game's own file, because a game's page loads only its own file.
     The browser checks compare the two (r/site-workshop/checks/t_onward.py).
     "done" says whether a stored result is a finished game, "says" puts it into a few words.
     To add a game: add it here, give it a colour in logicers.css and a tile in r/site-workshop/build_home.py.
     ------------------------------------------------------------------ */
  function num(v) { return typeof v === "number" && isFinite(v); }
  var GAMES = [
    { id: "100-of-us", key: "hundred", name: "100 of Us", href: "100-of-us/", start: "2026-10-03",
      pitch: "Of 100 people in the world, how many…?",
      done: function (r) { return !!r && num(r.g) && num(r.a); },
      says: function (r) { var gap = Math.abs(r.g - r.a); return gap === 0 ? "Spot on" : "Off by " + gap; } },
    { id: "your-call", key: "call", name: "Your Call", href: "your-call/", start: "2026-10-03",
      pitch: "A real moment from history. What did they do?",
      done: function (r) { return !!r && num(r.c); },
      says: function (r) { return r.c === r.r ? "Same call" : "Different call"; } },
    { id: "same-street", key: "street", name: "Same Street", href: "same-street/", start: "2026-10-03",
      pitch: "One real home. Where on the street is it?",
      done: function (r) { return !!r && num(r.g) && r.g >= 1 && r.g <= 100 && r.a >= 1 && r.a <= 100; },
      says: function (r) { var gap = Math.abs(r.g - r.a); return gap === 0 ? "The right house" : gap === 1 ? "Next door" : gap + " doors away"; } },
    { id: "long-lost-cousin", key: "cousin", name: "Long Lost Cousin", href: "long-lost-cousin/", start: "2026-10-04",
      pitch: "Which one is the closest relative?",
      done: function (r) { return !!r && num(r.c); },
      says: function (r) { return r.r === 0 ? "Found it" : r.r === 1 ? "One branch away" : "Two branches away"; } },
    { id: "the-club", key: "club", name: "The Club", href: "the-club/", start: "2026-10-04",
      pitch: "Work out the secret rule. Who gets in?",
      done: function (r) { return !!r && Array.isArray(r.c) && r.c.length === 5 && num(r.r) && r.r >= 0 && r.r <= 5; },
      says: function (r) { return r.r + " of 5"; } },
    { id: "years-apart", key: "apart", name: "Years Apart", href: "years-apart/", start: "2026-10-05",
      pitch: "Two real events, one in between. Where does it fall?",
      done: function (r) { return !!r && num(r.g) && num(r.a) && num(r.y) && r.g >= 0 && r.g <= 1000 && r.y >= 0; },
      says: function (r) { return Math.abs(r.g - r.a) <= 5 ? "Spot on" : r.y < 1 ? "Under a year off" : "Off by " + commas(r.y) + (Math.round(r.y) === 1 ? " year" : " years"); } }
  ];
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  /* Every game counts its days from its own start date, so "today" is worked out for each game on its own. */
  function todayOf(G) { return Math.max(1, dayNumber(G.start)); }

  /* ---- returning players, counted without identifying anyone ----
     Each time a game stores something, the frame looks at the calendar days on which this browser finished
     at least one game (practice does not count). The first time a milestone is reached it sends one event,
     once per browser, and notes it under "sent" in the stored data so that it is never sent again:
       players/new                 finished a first game
       players/2-days              finished games on 2 different days
       players/7-days              ... on 7 different days
       players/2-days-in-a-row     played yesterday and today
       players/7-days-in-a-row     played 7 days in a row, up to today
     Together they show how many come back the next day and within a week. */
  var MILESTONES = [["players/new", 1, 0], ["players/2-days", 2, 0], ["players/7-days", 7, 0],
                    ["players/2-days-in-a-row", 0, 2], ["players/7-days-in-a-row", 0, 7]];
  function calendarDay(d) { return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }
  function milestones(all) {
    try {
      var today = calendarDay(new Date()), on = {}, days = 0, run = 0;
      GAMES.forEach(function (G) {
        var res = obj(obj(obj(all.games) && all.games[G.id]) && all.games[G.id].results);
        if (!res) return;
        var p = String(G.start).split("-"), first = Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000);
        Object.keys(res).forEach(function (k) {
          var n = Number(k), d = first + n - 1;
          if (n >= 1 && Math.floor(n) === n && d <= today && G.done(res[k]) && !on[d]) { on[d] = true; days++; }
        });
      });
      for (var d = today; on[d]; d--) run++;
      var sent = obj(all.sent) || {}, reached = [];
      MILESTONES.forEach(function (m) {
        if (!sent[m[0]] && days >= m[1] && run >= m[2] && days > 0) { sent[m[0]] = 1; reached.push(m[0]); }
      });
      all.sent = sent;
      return reached;
    } catch (e) { return []; }            // counting must never break a game
  }
  function playedToday(G) {
    try { return !!G.done(game(G.id).results[todayOf(G)]); } catch (e) { return false; }
  }

  /* ------------------------------------------------------------------
     The way onward. A game calls TO.onward({ game, day, today, practice }) when its answer is shown.
     1. A block at the very end of the page, after the story, the sources and the Share button:
        how many of today's games are played, a big button to the next game not yet played today,
        and a link back to all games.
     2. On screens where that block is below the fold, a slim bar at the bottom edge: "Next: ..." and
        a quiet "Stay and read" that puts it away. It hides for good once the block has come into view,
        and it steps aside while the Share button would lie under it.
     Nothing pops up over the text and nothing moves on by itself.
     ------------------------------------------------------------------ */
  var ARROW = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function onward(o) {
    o = o || {};
    var after = document.getElementById("after");
    if (!after) return null;
    var old = document.getElementById("onward"), oldBar = document.getElementById("onbar");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (oldBar && oldBar.parentNode) oldBar.parentNode.removeChild(oldBar);

    var mine = -1;
    GAMES.forEach(function (G, i) { if (G.id === o.game) mine = i; });
    var played = GAMES.map(playedToday);
    var count = played.filter(Boolean).length;

    // where to go: back to this game's own puzzle of today when the page showed another day, otherwise the next game not played today
    var next = null, kicker = "Next game";
    var otherDay = !!o.practice || (num(o.day) && num(o.today) && o.day !== o.today);
    if (mine >= 0 && otherDay && !played[mine]) {
      next = GAMES[mine]; kicker = "Not played yet today";
    } else {
      for (var k = 1; k <= GAMES.length && !next; k++) {
        var j = (Math.max(mine, 0) + k) % GAMES.length;
        if (j !== mine && !played[j]) next = GAMES[j];
      }
    }
    var href = next ? here("../" + next.href) : "";

    var box = el("section", "onward");
    box.id = "onward";
    box.setAttribute("aria-label", "Today's games");
    var top = el("div", "onward-top");
    top.appendChild(el("h2", "", "Today"));
    var c = el("span", "onward-count");
    c.appendChild(el("b", "", String(count)));
    c.appendChild(document.createTextNode(" of " + GAMES.length + " played"));
    top.appendChild(c);
    box.appendChild(top);
    var pips = el("div", "pips");
    pips.setAttribute("aria-hidden", "true");
    GAMES.forEach(function (G, i) {
      var p = el("i", played[i] ? "on" : "");
      p.setAttribute("data-g", G.key);
      pips.appendChild(p);
    });
    box.appendChild(pips);
    if (next) {
      var a = el("a", "onward-next");
      a.href = href;
      a.setAttribute("data-g", next.key);
      var t = el("span", "onward-text");
      t.appendChild(el("span", "onward-kicker", kicker));
      t.appendChild(el("span", "onward-name", next.name));
      t.appendChild(el("span", "onward-pitch", next.pitch));
      a.appendChild(t);
      a.insertAdjacentHTML("beforeend", ARROW);
      a.addEventListener("click", function () { count_("onward/" + next.id); });
      box.appendChild(a);
    } else {
      box.appendChild(el("p", "onward-done", "All done for today. New games at midnight."));
    }
    var all = el("a", "onward-all", "All games");
    all.href = here("../");
    box.appendChild(all);
    after.appendChild(box);

    if (!next || !("IntersectionObserver" in window)) return box;      // nothing to go to, or an old browser: the block is enough

    var bar = el("nav", "onbar");
    bar.id = "onbar";
    bar.setAttribute("aria-label", "Next game");
    bar.hidden = true;
    var go = el("a", "onbar-next");
    go.href = href;
    go.setAttribute("data-g", next.key);
    var words = el("span", "");
    words.appendChild(document.createTextNode(next === GAMES[mine] ? "Today: " : "Next: "));
    words.appendChild(el("b", "", next.name));
    go.appendChild(words);
    go.insertAdjacentHTML("beforeend", ARROW);
    go.addEventListener("click", function () { count_("onward-bar/" + next.id); });
    var stay = el("button", "onbar-stay", "Stay and read");
    stay.type = "button";
    bar.appendChild(go);
    bar.appendChild(stay);
    document.body.appendChild(bar);

    var seen = false, away = false, ready = false;
    var share = document.getElementById("share");
    function duck() {                 // the bar steps aside whenever the Share button would lie under it
      if (bar.hidden) return;
      var under = false;
      if (share) {
        var r = share.getBoundingClientRect(), edge = window.innerHeight - bar.offsetHeight;
        under = r.height > 0 && r.bottom > edge - 6 && r.top < window.innerHeight;
      }
      bar.classList.toggle("duck", under);
    }
    function place() {
      var show = ready && !seen && !away;
      bar.hidden = !show;
      if (show) {
        document.body.classList.add("onbar-room");      // room at the end of the page, so the bar never hides the last lines
        duck();
      }
    }
    window.addEventListener("scroll", duck, { passive: true });
    window.addEventListener("resize", duck);
    var watch = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { seen = true; place(); watch.disconnect(); }
      });
    }, { threshold: 0.2 });
    watch.observe(box);
    stay.addEventListener("click", function () { away = true; place(); });
    window.setTimeout(function () { ready = true; place(); }, num(o.wait) ? o.wait : 1400);   // let the reveal have its moment first
    return box;
  }

  function count_(name) { count(name); }

  window.TurnsOut = {
    game: game,
    update: update,
    dayNumber: dayNumber,
    streak: streak,
    share: share,
    copyText: copyText,
    openDialog: openDialog,
    closeDialog: closeDialog,
    wireDialogs: wireDialogs,
    here: here,
    fixLocalLinks: fixLocalLinks,
    count: count,
    address: address,
    figure: figure,
    colour: colour,
    MISS: "#f0b429",
    reducedMotion: reducedMotion,
    GAMES: GAMES,
    todayOf: todayOf,
    playedToday: playedToday,
    onward: onward
  };

  privacyNotes();
  startCounter();
})();
