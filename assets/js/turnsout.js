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
      /* a tap on the dark area around it; not on a dialog marked data-stay (the editor's keep screen, which
         closes only once the edit link is kept somewhere) */
      if (e.target && e.target.nodeName === "DIALOG" && !e.target.hasAttribute("data-stay")) closeDialog(e.target);
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
  /* The pages where people type what is theirs (the editor of a game people build, the report form: a game's
     words, an email, an edit link in the address) load no script from outside (15 Oct 2026). There, marked
     <html data-count="pixel">, each visit and each event goes to GoatCounter as a small picture, with what its
     count.js itself sends (the path, the title, the page before, the screen size) and nothing of the page:
     never what is typed, never the part of the address after "#" or "?". Their CSP lets only the site's own
     scripts run. As with count.js, a browser where skipgc is set (GoatCounter's way to leave out one's own
     visits) is not counted. */
  function pixelMode() { return document.documentElement.getAttribute("data-count") === "pixel"; }
  var pixels = [];
  function pixel(path, title, ev) {
    try {
      if (window.localStorage && window.localStorage.getItem("skipgc") === "t") return;
    } catch (e) { /* no storage: counted as usual */ }
    try {
      var sc = window.screen || {};
      var q = "p=" + encodeURIComponent(path) + "&t=" + encodeURIComponent(title || path) + "&e=" + (ev ? "true" : "false") +
              "&r=" + encodeURIComponent(String(document.referrer || "").replace(/[?#].*$/, "")) +
              "&s=" + encodeURIComponent([sc.width || 0, sc.height || 0, window.devicePixelRatio || 1].join(",")) +
              (window.navigator.webdriver ? "&b=153" : "") + "&rnd=" + Math.random().toString(36).slice(2);
      var img = new Image();           // the browser sends it the site's name only (no path, never the "#" part)
      pixels.push(img);                // held until it has gone, so the browser never drops it half-way
      img.onload = img.onerror = function () { var i = pixels.indexOf(img); if (i >= 0) pixels.splice(i, 1); };
      img.src = "https://" + COUNTER + ".goatcounter.com/count?" + q;
    } catch (e) { /* counting must never break a page */ }
  }
  function count(name) {              // an event, for example "100-of-us/played/day-7"
    if (!counterOn()) return;
    if (pixelMode()) { pixel(name, name, true); return; }
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
    if (pixelMode()) {                  // the visit itself, once the page has its title
      var visit = function () { pixel(window.location.pathname || "/", document.title, false); };
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", visit); else visit();
      return;
    }
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://" + COUNTER + ".goatcounter.com/count");
    s.onload = function () { var q = waiting; waiting = []; q.forEach(count); };
    document.head.appendChild(s);
  }
  /* What the pages say about privacy must match what the site does. The world's counts (16 Oct 2026) add their
     own sentence to these lines, from assets/js/world.js, on the pages that send (as Rooms add theirs). */
  function privacyNotes() {
    if (!counterOn()) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (el) {
      var kind = el.getAttribute("data-privacy");
      el.textContent = kind === "short"
        ? "No login. No cookies. Results stay in your browser, unless you play in a room or a live game. Visits are counted without identifying anyone."
        : kind === "group"
        ? "No login and no cookies. Your table's best result is kept only in this browser. Visits and plays are counted with GoatCounter, without identifying anyone."
        : kind === "names"
        ? "No login and no cookies. The players' names and wins are forgotten when you leave this page. Visits and plays are counted with GoatCounter, without identifying anyone."
        : kind === "duel"
        ? "No login and no cookies. A duel link carries only the day, the scores and the name the sender chose for themselves, inside the link itself: nothing reached a server, not even ours. The name you choose travels in every link you send. What your phone has merged is kept only in this browser. Visits are counted with GoatCounter, without identifying anyone."
        : kind === "rooms"
        ? "No login and no cookies. Outside your own browser, a room stores only this: each daily game a member finishes sends the game, the score, the day and their chosen name to the site's own small server, and nothing else — and nothing at all for anyone who is in no room. It keeps this month and the last, then deletes; a room nobody plays in for 60 days is deleted whole, and leaving a room deletes everything of yours at once. Visits are counted with GoatCounter, without identifying anyone."
        : kind === "live"
        ? "No login and no cookies. Live games: the name you type and your answers stay on Logicers' server for the game and are deleted a day after it ends (the server's own backups clear within 30 days). Nothing else about you is kept. Visits and plays are counted with GoatCounter, without identifying anyone."
        : kind === "live-all"
        ? "No login and no cookies. Live games: the name you type and your answers stay on Logicers' server for the game and are deleted a day after it ends. Games people make: a saved game keeps only what its maker typed into it, with no name of the maker, and an email only as a one-way fingerprint, if the maker leaves one as a way back to a lost link (the address itself only if they also tick feedback emails, and only for those); it is deleted two months after its last use. Playing one alone keeps the name you type and your answers with the game, for its scoreboard, and they go when the game goes. A report keeps what its sender writes, the game's code, and a name and email only if given, for six months. The server's own backups clear within 30 days. Nothing else about you is kept. Visits and plays are counted with GoatCounter, without identifying anyone."
        : kind === "table"
        ? "No login and no cookies. Your table's best journey is kept only in this browser; the players' names are forgotten when you leave this page. Visits and plays are counted with GoatCounter, without identifying anyone."
        : kind === "world"
        ? "No login and no cookies. Visits are counted with GoatCounter, without identifying anyone."
        : "No login and no cookies. Your streak and your album are kept only in this browser. Visits and plays are counted with GoatCounter, without identifying anyone.";
    });
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* ------------------------------------------------------------------
     The games of the site, in the order of the shelf: the newest game first, then the others in the
     order they arrived (100 of Us, Your Call, ...). One list for the home page and for the way onward
     at the end of every game. The way onward goes round this list, so which game stands first does not
     change which game comes next.
     "start" repeats day 1 from each game's own file, because a game's page loads only its own file.
     The browser checks compare the two (r/site-workshop/checks/t_onward.py).
     "done" says whether a stored result is a finished game, "says" puts it into a few words.
     To add a game: add it here, give it a colour in logicers.css and a tile in r/site-workshop/build_home.py.
     Same Street was taken off this list on 9 Oct 2026 on Khayyam's word, after bad feedback. Its page,
     its puzzles and its photos are untouched and logicers.com/same-street/ still works for anyone with
     a link or coming from Listdle or Alldle; it is simply no longer one of the daily games, so it is
     not on the shelf, not in the Today card, not in the streak, not in the way onward and not in a
     duel. Putting it back is this one entry.
     ------------------------------------------------------------------ */
  function num(v) { return typeof v === "number" && isFinite(v); }
  function whole(v) { return num(v) && Math.round(v) === v; }
  var GAMES = [
    { id: "same-energy", key: "energy", name: "Same Energy", href: "same-energy/", start: "2026-10-10",
      pitch: "A real food or drink. How many of another hold the same energy?",
      score: function (r) { return r.y; }, wins: "low",
      ok: function (v) { return whole(v) && Math.abs(v) <= 120; },
      done: function (r) { return !!r && num(r.g) && r.g >= 0 && r.g <= 60 && num(r.y) && typeof r.t === "string"; },
      tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 2 ? 2 : a <= 4 ? 1 : 0; },
      says: function (r) { return r.t; } },
    { id: "100-of-us", key: "hundred", name: "100 of Us", href: "100-of-us/", start: "2026-10-03",
      pitch: "Of 100 people in the world, how many…?",
      score: function (r) { return Math.abs(r.g - r.a); }, wins: "low",
      ok: function (v) { return whole(v) && v >= 0 && v <= 100; },
      done: function (r) { return !!r && num(r.g) && num(r.a); },
      tier: function (r) { var a = Math.abs(r.g - r.a); return a === 0 ? 3 : a <= 3 ? 2 : a <= 8 ? 1 : 0; },
      says: function (r) { var gap = Math.abs(r.g - r.a); return gap === 0 ? "Spot on" : "Off by " + gap; } },
    { id: "your-call", key: "call", name: "Your Call", href: "your-call/", start: "2026-10-03",
      pitch: "A real moment from history. What did they do?",
      score: function (r) { return r.c === r.r ? 1 : 0; }, wins: "match",
      ok: function (v) { return v === 0 || v === 1; },
      done: function (r) { return !!r && num(r.c); },
      tier: function (r) { return r.c === r.r ? 3 : 0; },
      stampWords: { 3: "Same call!" }, tuck: false,      /* the stamp may never cover a choice's words */
      says: function (r) { return r.c === r.r ? "Same call" : "Different call"; } },
    { id: "long-lost-cousin", key: "cousin", name: "Long Lost Cousin", href: "long-lost-cousin/", start: "2026-10-04",
      pitch: "Which one is the closest relative?",
      score: function (r) { return r.r; }, wins: "low",
      ok: function (v) { return whole(v) && v >= 0 && v <= 2; },
      done: function (r) { return !!r && num(r.c); },
      tuckMax: 0.5,      /* the stamp may rest on the foot of the tree, which carries no words */
      tier: function (r) { return r.r === 0 ? 3 : r.r === 1 ? 2 : 0; },
      stampWords: { 3: "Found it!" },
      says: function (r) { return r.r === 0 ? "Found it" : r.r === 1 ? "One branch away" : "Two branches away"; } },
    { id: "the-club", key: "club", name: "The Club", href: "the-club/", start: "2026-10-04",
      pitch: "Work out the secret rule. Who gets in?",
      score: function (r) { return r.r; }, wins: "high",
      ok: function (v) { return whole(v) && v >= 0 && v <= 5; },
      done: function (r) { return !!r && Array.isArray(r.c) && r.c.length === 5 && num(r.r) && r.r >= 0 && r.r <= 5; },
      tier: function (r) { return r.r >= 5 ? 3 : r.r === 4 ? 2 : r.r === 3 ? 1 : 0; },
      says: function (r) { return r.r + " of 5"; } },
    { id: "years-apart", key: "apart", name: "Years Apart", href: "years-apart/", start: "2026-10-05",
      pitch: "Two real events, one in between. Where does it fall?",
      score: function (r) { return r.y; }, wins: "low",
      ok: function (v) { return num(v) && v >= 0 && v <= 9999999; },
      done: function (r) { return !!r && num(r.g) && num(r.a) && num(r.y) && r.g >= 0 && r.g <= 1000 && r.y >= 0; },
      tier: function (r) { var a = Math.abs(r.g - r.a); return a <= 5 ? 3 : a <= 40 ? 2 : a <= 120 ? 1 : 0; },
      says: function (r) { return Math.abs(r.g - r.a) <= 5 ? "Spot on" : r.y < 1 ? "Under a year off" : "Off by " + commas(r.y) + (Math.round(r.y) === 1 ? " year" : " years"); } },
    { id: "who-gets-what", key: "gets", name: "Who Gets What", href: "who-gets-what/", start: "2026-10-08",
      pitch: "A real price. Who gets what out of it?",
      score: function (r) { return r.y; }, wins: "low",
      ok: function (v) { return whole(v) && v >= 0 && v <= 9999999; },
      done: function (r) { return !!r && Array.isArray(r.g) && r.g.length >= 3 && r.g.length <= 4 && num(r.y) && r.y >= 0 && typeof r.t === "string"; },
      tier: function (r) { return r.y <= 15 ? 3 : r.y <= 50 ? 2 : r.y <= 120 ? 1 : 0; },
      says: function (r) { return r.t; } },
    { id: "every-beat", key: "every", name: "Every Beat", href: "every-beat/", start: "2026-10-09",
      pitch: "One real animal. How fast does its heart beat?",
      score: function (r) { return r.y; }, wins: "low",
      ok: function (v) { return whole(v) && (v === 0 || Math.abs(v) >= 11) && Math.abs(v) <= 20000; },
      done: function (r) { return !!r && num(r.g) && r.g >= 1 && r.g <= 2000 && num(r.y) && typeof r.t === "string"; },
      tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 13 ? 2 : a <= 20 ? 1 : 0; },
      says: function (r) { return r.t; } },
    { id: "out-of-24", key: "o24", name: "Out of 24", href: "out-of-24/", start: "2026-10-09",
      pitch: "A real animal or country. How many hours a day?",
      score: function (r) { return r.y; }, wins: "low",
      ok: function (v) { return whole(v) && (v === 0 || Math.abs(v) > 15) && Math.abs(v) <= 1440; },
      done: function (r) { return !!r && num(r.g) && r.g >= 0 && r.g <= 1440 && num(r.y) && typeof r.t === "string"; },
      tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 45 ? 2 : a <= 120 ? 1 : 0; },
      says: function (r) { return r.t; } }
  ];
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  /* ------------------------------------------------------------------
     The games for groups ("Pass the phone" on the home page): one phone, a group of players, any time and as
     often as they like. In the order of their row: the newest first, then the others in the order they arrived
     (since the night of 6 to 7 Oct 2026: Twin or Trap, One of 193, Still In, So-Called Expert, Beat the Phone). They are not daily: no day number, no streak, no album. Nothing they store counts in the
     Today card, the streak of the site, the way onward or the returning-player events, which all read GAMES only.
     Their own records (a table's best result or journey, the countries, rules, cards, stops and words it had lately) are kept
     apart, under "groups". Since 6 Oct 2026 the players' names, the wins and a game going on are never stored: every
     opening of a game's page starts afresh.
     To add one: add it here and to GROUP in r/site-workshop/build_home.py, and give it a colour in logicers.css.
     ------------------------------------------------------------------ */
  var GROUP = [
    { id: "twin-or-trap", key: "twin", name: "Twin or Trap", href: "twin-or-trap/", players: "2+ players",
      pitch: "Same word, two languages. Twin or trap?" },
    { id: "one-of-193", key: "o193", name: "One of 193", href: "one-of-193/", players: "2+ players",
      pitch: "The phone hides a country. Ask yes or no, and find it." },
    { id: "still-in", key: "still", name: "Still In", href: "still-in/", players: "2+ players",
      pitch: "Twelve countries, one rule. Tap one that fits, or you're out." },
    { id: "so-called-expert", key: "expert", name: "So-Called Expert", href: "so-called-expert/", players: "3+ players",
      pitch: "Five facts about a country, one invented. Can the table spot it?" },
    { id: "beat-the-phone", key: "beat", name: "Beat the Phone", href: "beat-the-phone/", players: "2+ players",
      pitch: "Ten stops round the world, three lives. The whole table against the phone." }
  ];
  function group(id) {
    var all = readAll();
    return obj(obj(all.groups) && all.groups[id]) || {};
  }
  function groupUpdate(id, change) {
    var all = readAll();
    all.groups = obj(all.groups) || {};
    var g = obj(all.groups[id]) || {};
    change(g);
    all.groups[id] = g;
    writeAll(all);                        // no milestones here: a group game is not a daily play
    return g;
  }
  /* ------------------------------------------------------------------
     Who Was Closer (the duel): what one phone has merged from the links it has opened.
     It lives beside "games" and "groups", never inside them, so a duel can never touch a
     streak, an album, the Today card or the returning-player events, which all read "games" only.
       duels: { me: "copper-llama",
                days: { "20261009": { p: [ { n: "ana-otter", s: { hundred: 3, club: 4 } } ] } } }
     Only the last few dates are kept, so it never grows. Nothing about a friend is kept but the
     nickname they chose themselves and the scores their link carried.
     ------------------------------------------------------------------ */
  var DUEL_DAYS = 3;                       // how many dates are remembered
  function duels() {
    var all = readAll();
    var d = obj(all.duels) || {};
    d.days = obj(d.days) || {};
    if (typeof d.me !== "string") d.me = "";
    return d;
  }
  function duelsUpdate(change) {
    var all = readAll();
    all.duels = obj(all.duels) || {};
    var d = all.duels;
    d.days = obj(d.days) || {};
    if (typeof d.me !== "string") d.me = "";
    change(d);
    var keys = Object.keys(d.days).sort();                  // dates sort as text, so the newest are last
    while (keys.length > DUEL_DAYS) delete d.days[keys.shift()];
    writeAll(all);
    return d;
  }

  /* ------------------------------------------------------------------
     Rooms: which rooms this browser is in, its own random token, and what still waits to be sent.
     It lives beside "games", "groups" and "duels", never inside them, so a room can never touch a
     streak, an album, the Today card or the returning-player events, which all read "games" only.
       rooms: { tok: "4f...", list: [ { code: "...", label: "Ana's room" } ], out: { "20261012": ["code"] } }
     The token stands for this browser on the room's own server; the name shown at the table is the
     one the duel's window asked for. A browser in no room has nothing here and sends nothing anywhere.
     ------------------------------------------------------------------ */
  function roomsStore() {
    var all = readAll();
    var r = obj(all.rooms) || {};
    if (typeof r.tok !== "string") r.tok = "";
    r.list = Array.isArray(r.list) ? r.list : [];
    r.out = obj(r.out) || {};
    return r;
  }
  function roomsUpdate(change) {
    var all = readAll();
    all.rooms = obj(all.rooms) || {};
    var r = all.rooms;
    if (typeof r.tok !== "string") r.tok = "";
    r.list = Array.isArray(r.list) ? r.list : [];
    r.out = obj(r.out) || {};
    change(r);
    writeAll(all);
    return r;
  }

  /* ------------------------------------------------------------------
     The world's counts (16 Oct 2026, assets/js/world.js): which of today's finished games this browser has
     already added to the world's counts (and which of those the server counted), and whether its player has
     chosen to leave them out.
       world: { off: false, sent: { "20261016": ["hundred", "club"] }, got: { "20261016": ["hundred", "club"] } }
     It lives beside "games", "groups", "duels" and "rooms", never inside them, so it can never touch a streak,
     an album, the Today card or the returning-player events. Only the last two dates are kept.
     ------------------------------------------------------------------ */
  function worldStore() {
    var all = readAll();
    var w = obj(all.world) || {};
    w.off = w.off === true;
    w.sent = obj(w.sent) || {};
    return w;
  }
  function worldUpdate(change) {
    var all = readAll();
    all.world = obj(all.world) || {};
    var w = all.world;
    w.off = w.off === true;
    w.sent = obj(w.sent) || {};
    change(w);
    writeAll(all);
    return w;
  }

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
     The result stamp (11 Oct 2026, Khayyam: "stamp idea is great!!!!"). At every reveal of a daily
     game a big white stamp lands just above the game's own verdict, in the game's own colour: one
     of four words, so a result can be seen at a glance and a miss still earns something. Each game
     says how good a result is with its own "tier" in GAMES (3 spot on, 2 so close, 1 not far,
     0 now you know); the frame draws the stamp, so no game script changed. It is never red or
     green (yellow already means the part you got wrong, and Same Energy's guardrails forbid
     judging colours), and a miss is a light bulb, never an X: the site promises one true thing
     every time, and a miss is exactly when the fact lands. Tapping it scrolls to the full results.
     ------------------------------------------------------------------ */
  var STAMP_ICONS = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4.5 9.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0M4.5 15.5c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12.5l4.6 4.6L19 7.6"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/></svg>'
  ];
  var STAMP_WORDS = ["Now you know", "Not far", "So close!", "Spot on!"];
  var stampResize = false;
  function stampFor(G, r) {
    if (!G || typeof G.tier !== "function" || !G.done(r)) return null;
    var t = G.tier(r);
    if (!(t >= 0 && t <= 3)) return null;
    var words = (G.stampWords && G.stampWords[t]) || STAMP_WORDS[t];
    return { tier: t, words: words, kind: ["learn", "near", "close", "spot"][t] };
  }
  function stamp(o) {
    var old = document.getElementById("vstamp");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var G = null;
    GAMES.forEach(function (x) { if (x.id === o.game) G = x; });
    var verdict = document.getElementById("verdict");
    if (!G || !verdict || !verdict.parentNode || !num(o.day)) return null;
    var r = null;
    try { var g = game(G.id); r = (o.practice ? g.practice : g.results)[o.day]; } catch (e) { r = null; }
    var st = stampFor(G, r);
    if (!st) return null;
    var row = el("div", "vstamp-row");
    row.id = "vstamp";
    row.setAttribute("data-tier", String(st.tier));
    var b = el("button", "vstamp vstamp-" + st.kind);
    b.type = "button";
    b.setAttribute("aria-label", st.words + " See the full results below.");
    var i = el("i", "vstamp-icon");
    i.innerHTML = STAMP_ICONS[st.tier];
    b.appendChild(i);
    var t = el("span", "vstamp-text");
    t.appendChild(el("span", "vstamp-word", st.words));
    t.appendChild(el("span", "vstamp-note", "See full results below ↓"));
    b.appendChild(t);
    b.addEventListener("click", function () {
      var after = document.getElementById("after");
      if (!after) return;
      try { after.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" }); }
      catch (e) { after.scrollIntoView(); }
    });
    row.appendChild(b);
    verdict.parentNode.insertBefore(row, verdict);
    /* Every game was laid out so that its whole result fits on the screen, above the bar to the next
       game, on the smallest phone. The stamp must not undo that: where the room is short, it tucks up
       into its own top margin (never over anything of the picture above),
       and if that is still not enough it takes its smaller size; on the very smallest phones the last
       line of the verdict may then sit under the bar, which steps aside once the reader scrolls. Measured, not guessed, because each game's picture
       ends differently. */
    function lowest() {
      var low = 0;
      [verdict].concat(Array.prototype.slice.call(verdict.querySelectorAll("*"))).forEach(function (x) {
        var r = x.getBoundingClientRect();
        if (r.height) low = Math.max(low, r.bottom + window.scrollY);
      });
      return low;
    }
    function fit() {
      row.style.marginTop = "";
      row.classList.remove("tight");
      var room = window.innerHeight - 76;                     // the bar to the next game and its shadow: the last 76 pixels (as t_energy.py measures)
      var over = lowest() - room;
      if (over <= 0) return;
      if (G.tuck === false) { row.classList.add("tight"); row.style.marginTop = "6px"; return; }
      var base = parseFloat(window.getComputedStyle(row).marginTop) || 0;
      var tuck = Math.min(over, base + Math.round(row.offsetHeight * (G.tuckMax || 0)));
      row.style.marginTop = (base - tuck) + "px";
      if (lowest() - room > 0) {
        row.classList.add("tight");
        over = lowest() - room + tuck;
        tuck = Math.max(0, Math.min(over, base + Math.round(row.offsetHeight * (G.tuckMax || 0))));
        row.style.marginTop = (base - tuck) + "px";
      }
    }
    /* Several games fit themselves to the screen when it changes size (Same Energy, Out of 24 and others
       take their own smaller steps), and they last did so before the stamp existed: one resize event lets
       each game make its own room for it, in its own way, before the stamp measures what is left. */
    function refit() {
      if (!row.parentNode) return;
      try { window.dispatchEvent(new Event("resize")); } catch (e) { /* an old browser: the stamp still fits itself */ }
      fit();
    }
    refit();
    /* again once the reveal has settled: several games slide their real answer in over a second, and a
       measure taken mid-slide would tuck the stamp over words that end up with room to spare */
    [450, 1300].forEach(function (ms) { window.setTimeout(refit, ms); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (row.parentNode) fit(); }, function () {});
    if (!stampResize) {
      stampResize = true;
      window.addEventListener("resize", function () { var r = document.getElementById("vstamp"); if (r && r.__fit) r.__fit(); });
    }
    row.__fit = fit;
    if (!reducedMotion()) {
      b.classList.add("thud");
      window.setTimeout(function () { b.classList.remove("thud"); }, 700);
    }
    document.body.classList.add("stamped");
    return row;
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
    try { stamp(o); } catch (e) { /* a stamp must never break a game */ }
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
      /* A day with everything played can end somewhere better than a sentence: a member of a
         room goes back to its table (assets/js/rooms.js fills this hook in). Wrapped whole,
         like the duel's and the room's own hooks: nothing here may ever break a game, and for
         everyone else the words stay exactly what they were. */
      var doneEl = null;
      if (typeof window.TurnsOut.allDoneHook === "function") {
        try { doneEl = window.TurnsOut.allDoneHook(); } catch (e) { /* the sentence stands */ }
      }
      box.appendChild(doneEl || el("p", "onward-done", "All done for today. New games at midnight."));
    }
    var all = el("a", "onward-all");
    all.href = here("../");
    all.insertAdjacentHTML("beforeend", '<svg class="onward-dots" viewBox="0 0 34 10" aria-hidden="true" focusable="false">' +
      '<circle cx="5" cy="5" r="4" fill="#2D4FC4"/><circle cx="17" cy="5" r="4" fill="#CF4327"/><circle cx="29" cy="5" r="4" fill="#0D7D73"/></svg>');
    all.appendChild(el("span", "onward-all-name", "All games"));
    all.insertAdjacentHTML("beforeend", ARROW);
    box.appendChild(all);
    /* the world today: the world, the continent and the country beside this result (assets/js/world.js) */
    if (typeof window.TurnsOut.worldHook === "function") {
      try { window.TurnsOut.worldHook(after, o, played); } catch (e) { /* the world's counts must never break a game */ }
    }
    if (typeof window.TurnsOut.duelHook === "function") {
      try { window.TurnsOut.duelHook(after, o, played); } catch (e) { /* a duel must never break a game */ }
    }
    if (typeof window.TurnsOut.roomHook === "function") {
      try { window.TurnsOut.roomHook(after, o, played); } catch (e) { /* a room must never break a game */ }
    }
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

  /* ------------------------------------------------------------------
     The installable app (11 Oct 2026). A web app manifest and a service worker (sw.js at the root)
     let a phone keep Logicers on its home screen and open it full screen, at once, even offline.
     The service worker runs on the live site only; on the checks' own server it runs only when a
     check asks for it (window.LOGICERS_SW), so every other check sees the site as it always was.
     The browser's own install offer is kept quiet (nothing pops up by itself); the About sheet
     offers it instead, and on an iPhone, which has no such offer, it says how.
     ------------------------------------------------------------------ */
  var installEvent = null;
  function standalone() {
    try { return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; }
    catch (e) { return false; }
  }
  function iOS() {
    var ua = window.navigator.userAgent || "";
    return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && window.navigator.maxTouchPoints > 1);
  }
  function appStart() {
    var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
    var wanted = window.location.protocol === "https:" ? !local : (local && window.LOGICERS_SW === true);
    if (wanted && "serviceWorker" in window.navigator) {
      var root = /assets\/js\/turnsout\.js/.test(SELF) ? SELF.replace(/assets\/js\/turnsout\.js.*$/, "") : "/";
      try { window.navigator.serviceWorker.register(root + "sw.js").catch(function () { /* the site works without it */ }); }
      catch (e) { /* the site works without it */ }
    }
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();                       // no banner of the browser's own: the About sheet offers it
      installEvent = e;
      appUi();
    });
    window.addEventListener("appinstalled", function () { installEvent = null; count_("app/installed"); appUi(); });
    if (standalone()) {
      try {
        if (!window.sessionStorage.getItem("logicers-app")) { window.sessionStorage.setItem("logicers-app", "1"); count_("app/open"); }
      } catch (e) { /* counting is never needed */ }
    }
    appUi();
  }
  function appUi() {                           // the About sheet's section, wherever it is on the page
    var on = document.getElementById("app-on");
    if (!on) return;
    var add = document.getElementById("app-add"), ios = document.getElementById("app-ios"), other = document.getElementById("app-other");
    var inApp = standalone();
    on.hidden = !inApp;
    add.hidden = inApp || !installEvent;
    ios.hidden = inApp || !iOS();
    other.hidden = inApp || !!installEvent || iOS();
    var go = document.getElementById("app-add-go");
    if (go && !go.__wired) {
      go.__wired = true;
      go.addEventListener("click", function () {
        if (!installEvent) return;
        var ev = installEvent;
        try {
          ev.prompt();
          if (ev.userChoice && ev.userChoice.then) ev.userChoice.then(function (c) {
            if (c && c.outcome === "accepted") installEvent = null;
            appUi();
          }, function () {});
        } catch (e) { /* the browser's menu still offers it */ }
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appStart);
  else appStart();

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
    counting: counterOn,               // whether this page counts visits (its privacy line says so only then)
    address: address,
    figure: figure,
    colour: colour,
    MISS: "#f0b429",
    reducedMotion: reducedMotion,
    stamp: stamp,
    app: { standalone: standalone, installable: function () { return !!installEvent; }, ui: appUi },
    stampFor: stampFor,
    GAMES: GAMES,
    GROUP: GROUP,
    group: group,
    groupUpdate: groupUpdate,
    duels: duels,
    duelsUpdate: duelsUpdate,
    roomsStore: roomsStore,
    roomsUpdate: roomsUpdate,
    worldStore: worldStore,
    worldUpdate: worldUpdate,
    todayOf: todayOf,
    playedToday: playedToday,
    onward: onward
  };

  privacyNotes();
  startCounter();
})();
