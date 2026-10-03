/* Turns Out: the frame every game uses.
   The daily change, what is kept in the browser, streaks, sharing, dialogs.
   No login, no server, no tracking. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     The free visitor counter (GoatCounter).
     To switch it on, put your GoatCounter code between the quotes,
     for example "turnsout" if your counter lives at turnsout.goatcounter.com.
     Empty quotes: nothing is counted and no outside service is contacted.
     ------------------------------------------------------------------ */
  var COUNTER = "";

  /* ------------------------------------------------------------------
     The address printed on every share picture, so that people who only
     get the picture know where to play.
     Empty quotes: the site's own web address is used.
     Once the site has its own domain, write it here, for example "turnsout.games".
     ------------------------------------------------------------------ */
  var ADDRESS = "";
  var SELF = (document.currentScript && document.currentScript.src) || "";

  var KEY = "turnsout:v1";
  var memory = null; // used when the browser will not let us store anything (private mode)

  function readAll() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) || {};
    } catch (e) { /* fall through */ }
    return memory || {};
  }
  function writeAll(all) {
    memory = all;
    try { window.localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* keep in memory only */ }
  }
  function blank() { return { results: {}, practice: {} }; }

  /* What one game has stored: { results: {day: {g, a}}, practice: {day: {g, a}} } */
  function game(id) {
    var all = readAll();
    var g = (all.games && all.games[id]) || blank();
    g.results = g.results || {};
    g.practice = g.practice || {};
    return g;
  }
  function update(id, change) {
    var all = readAll();
    all.games = all.games || {};
    var g = all.games[id] || blank();
    g.results = g.results || {};
    g.practice = g.practice || {};
    change(g);
    all.games[id] = g;
    writeAll(all);
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
    blue: "#2447e0",
    teal: "#007f86",
    red: "#d92b21",
    violet: "#6d3fe0",
    green: "#0c8346",
    magenta: "#c0177a"
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
  function counterOn() { return !!COUNTER && window.location.protocol !== "file:"; }
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
    MISS: "#ffd21f",
    reducedMotion: reducedMotion
  };

  privacyNotes();
  startCounter();
})();
