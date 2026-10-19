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
     The second visitor counter, a double check on the first (16 Oct 2026, Khayyam: "goatcounter is ok but
     i want to have a double check"): Cloudflare Web Analytics. It counts page visits only (the plays stay
     GoatCounter's), sets no cookies and keeps nothing in the browser. It runs wherever GoatCounter runs, except
     on the pages that load no script from outside (data-count="pixel": the editor and the report form).
     Put the site's token from Cloudflare (Web Analytics, logicers.com) between the quotes.
     Empty quotes: Cloudflare is never contacted, and the privacy lines name GoatCounter only.
     ------------------------------------------------------------------ */
  var WEB_ANALYTICS = "44a4c8f907a04a778c876ab1eb1c9667";

  /* ------------------------------------------------------------------
     The address printed on every share picture, so that people who only
     get the picture know where to play.
     Empty quotes: the site's own web address is used.
     Once the site has its own domain, write it here, for example "turnsout.games".
     ------------------------------------------------------------------ */
  var ADDRESS = "logicers.com";

  /* ------------------------------------------------------------------
     "Tell Khayyam" (17 Oct 2026): the end-of-day card's three short questions go by Web3Forms (a free form service)
     to Logicers' inbox, logicers.world@gmail.com. Get the access key at web3forms.com (enter that address; the key
     is sent to it) and put it between the quotes. A key of this kind is meant to be public: it only lets a form
     send to that one inbox.
     Empty quotes: there is no "Tell Khayyam" (no hello at the bottom corner, no cell in the card), nothing is sent
     anywhere, and the privacy lines say nothing of it. The rest of the end-of-day card works without it.
     ------------------------------------------------------------------ */
  var FEEDBACK_KEY = "178c5d15-c4af-419e-8199-a5b233101978";

  /* The Reddit community the end-of-day card points to (16 Oct 2026). */
  var REDDIT = "https://www.reddit.com/r/Logicers/";
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

  /* ---- streak: days played in a row. A bad guess never breaks it.
     Streak insurance (17 Oct 2026, Khayyam): one missed day never breaks it either. Two missed days in a row do.
     A streak counts the days played, so a forgiven day adds nothing. It is alive while the last day played was today,
     yesterday, or the day before (today is then still there to save it). ---- */
  function streak(results, today) {
    var days = Object.keys(results || {}).map(Number).filter(function (n) { return n >= 1 && n <= today; });
    var played = {};
    days.forEach(function (n) { played[n] = true; });
    var current = 0, n = today;
    if (!played[n]) n = played[n - 1] ? n - 1 : (played[n - 2] ? n - 2 : 0);
    while (n >= 1 && played[n]) {
      current++; n--;
      if (!played[n] && played[n - 1]) n--;           // one missed day is forgiven
    }
    var best = 0, run = 0;
    days.sort(function (x, y) { return x - y; }).forEach(function (d, i, arr) {
      run = (i > 0 && d - arr[i - 1] <= 2) ? run + 1 : 1;
      if (run > best) best = run;
    });
    return { current: current, best: Math.max(best, current), played: days.length };
  }

  /* ---- sharing ----
     On a phone or a tablet: the phone's own share sheet, which can also save the picture.
     On a computer (16 Oct 2026): the system's share menu there has no Save (Khayyam: "on mac safari i don't have
     save option, i can just share with apps"), so the frame shows its own small window instead, the same for every
     game: the picture, Save picture, Copy text, and the system's menu one tap away ("More ways"). A browser with no
     share menu at all is left as it was: the caller shows its own window ("fallback"). */
  function computer() {
    try { return !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches); } catch (e) { return false; }
  }
  function share(o) {
    var file = null;
    try {
      if (o.blob && typeof File === "function") file = new File([o.blob], o.filename || "turns-out.png", { type: "image/png" });
    } catch (e) { file = null; }
    var nav = window.navigator, ok = false;
    if (file && nav.canShare && nav.share) {
      try { ok = nav.canShare({ files: [file] }); } catch (e) { ok = false; }
    }
    if (!ok) return Promise.resolve("fallback");
    if (computer()) return saveSheet(o, file);
    return nav.share({ files: [file], text: o.text }).then(
      function () { return "shared"; },
      function (err) { return (err && err.name === "AbortError") ? "closed" : "fallback"; }
    );
  }

  /* the frame's own window, made once and reused; it answers "sheet", so the caller shows nothing more */
  var sheetUrl = null;
  function saveSheet(o, file) {
    var dlg = document.getElementById("to-save");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "to-save";
      dlg.className = "to-save";
      dlg.setAttribute("aria-labelledby", "to-save-h");
      dlg.innerHTML = '<div class="sheet">' +
        '<button class="chip round close" type="button" id="to-save-x" aria-label="Close">\u00d7</button>' +
        '<h2 id="to-save-h">Save or share</h2>' +
        '<p class="quiet">Save the picture and post it with the text, so friends can tap the link.</p>' +
        '<img class="shot" id="to-save-img" alt="The picture to share.">' +
        '<div class="actions to-save-acts">' +
          '<a class="btn solid" id="to-save-pic" download="logicers.png">Save picture</a>' +
          '<button class="btn ghost" id="to-save-copy" type="button">Copy text</button>' +
          '<button class="btn ghost" id="to-save-more" type="button">More ways</button>' +
        '</div>' +
        '<p class="copied" id="to-save-note" role="status"></p>' +
        '</div>';
      document.body.appendChild(dlg);
      document.getElementById("to-save-x").addEventListener("click", function () { closeDialog(dlg); });
      dlg.addEventListener("close", function () {
        if (sheetUrl) { try { window.URL.revokeObjectURL(sheetUrl); } catch (e) { /* nothing to free */ } sheetUrl = null; }
      });
    }
    if (sheetUrl) { try { window.URL.revokeObjectURL(sheetUrl); } catch (e) { /* nothing to free */ } }
    sheetUrl = window.URL.createObjectURL(o.blob);
    var img = document.getElementById("to-save-img"), pic = document.getElementById("to-save-pic"), note = document.getElementById("to-save-note");
    img.src = sheetUrl;
    pic.href = sheetUrl;
    pic.setAttribute("download", o.filename || "logicers.png");
    note.textContent = "";
    var copy = document.getElementById("to-save-copy"), more = document.getElementById("to-save-more");
    copy.hidden = !o.text;
    more.hidden = !file;                                   // no system menu here (the end of the day's own picture): no "More ways"
    copy.onclick = function () {
      copyText(o.text || "").then(function (done) {
        note.textContent = done ? "Copied. Paste it with the picture into a chat or a post." : "Copying did not work here.";
      });
    };
    pic.onclick = function () { note.textContent = "Saved to your downloads."; };
    more.onclick = function () {
      window.navigator.share({ files: [file], text: o.text }).then(function () { closeDialog(dlg); }, function () { /* closed: the window stays */ });
    };
    openDialog(dlg);
    return Promise.resolve("sheet");
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
    if (secondOn()) {                   // Cloudflare's own snippet, exactly as its dashboard gives it (16 Oct 2026)
      try {
        var c = document.createElement("script");
        c.type = "module";
        c.src = "https://static.cloudflareinsights.com/beacon.min.js";
        c.setAttribute("data-cf-beacon", JSON.stringify({ token: WEB_ANALYTICS }));
        document.head.appendChild(c);
      } catch (e) { /* counting must never break a page */ }
    }
  }
  function secondOn() { return counterOn() && !pixelMode() && /^[0-9a-f]{32}$/.test(WEB_ANALYTICS); }
  /* What the pages say about privacy must match what the site does. The world's counts (16 Oct 2026) add their
     own sentence to these lines, from assets/js/world.js, on the pages that send (as Rooms add theirs). */
  /* the end-of-day card's form, said where the privacy lines are, only on the pages that have it (the daily games' pages) */
  function feedbackNote(kind) {
    if (!feedbackKey() || (kind !== "long" && kind !== "short")) return "";
    return " If you choose to message Khayyam from the end-of-day card, what you write goes through Web3Forms, a form service, to Logicers' inbox, together with the day and the results of your games, and nothing else about you.";
  }
  /* the daily reminder (18 Oct 2026): said where the privacy lines are, on the pages that offer it */
  function reminderNote(kind) {
    if (!pushKey() || (kind !== "long" && kind !== "short")) return "";
    return " If you turn on the daily reminder, Logicers' server keeps your browser's notification address, the hour you usually play, your time zone, your streak, the day you last played and your country until you turn it off (or a month and a half after your last visit), and sends at most one reminder a day.";
  }
  function privacyNotes() {
    if (!counterOn()) return;
    var VP = secondOn()
      ? "Visits and plays are counted with GoatCounter, and visits also with Cloudflare Web Analytics, without identifying anyone."
      : "Visits and plays are counted with GoatCounter, without identifying anyone.";
    var V = secondOn()
      ? "Visits are counted with GoatCounter and Cloudflare Web Analytics, without identifying anyone."
      : "Visits are counted with GoatCounter, without identifying anyone.";
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (el) {
      var kind = el.getAttribute("data-privacy");
      el.textContent = (kind === "short"
        ? "No login. No cookies. Results stay in your browser, unless you play in a room or a live game. Visits are counted without identifying anyone."
        : kind === "group"
        ? "No login and no cookies. Your table's best result is kept only in this browser. " + VP
        : kind === "names"
        ? "No login and no cookies. The players' names and wins are forgotten when you leave this page. " + VP
        : kind === "duel"
        ? "No login and no cookies. A duel link carries only the day, the scores and the name the sender chose for themselves, inside the link itself: nothing reached a server, not even ours. The name you choose travels in every link you send. What your phone has merged is kept only in this browser. " + V
        : kind === "rooms"
        ? "No login and no cookies. Outside your own browser, a room stores only this: each daily game a member finishes sends the game, the score, the day and their chosen name to the site's own small server, and nothing else — and nothing at all for anyone who is in no room. It keeps this month and the last, then deletes; a room nobody plays in for 60 days is deleted whole, and leaving a room deletes everything of yours at once. " + V
        : kind === "live"
        ? "No login and no cookies. Live games: the name you type and your answers stay on Logicers' server for the game and are deleted a day after it ends (the server's own backups clear within 30 days). Nothing else about you is kept. " + VP
        : kind === "live-all"
        ? "No login and no cookies. Live games: the name you type and your answers stay on Logicers' server for the game and are deleted a day after it ends. Games people make: a saved game keeps only what its maker typed into it, with no name of the maker, and an email only as a one-way fingerprint, if the maker leaves one as a way back to a lost link (the address itself only if they also tick feedback emails, and only for those); it is deleted two months after its last use. Playing one alone keeps the name you type and your answers with the game, for its scoreboard, and they go when the game goes. A report keeps what its sender writes, the game's code, and a name and email only if given, for six months. The server's own backups clear within 30 days. Nothing else about you is kept. " + VP
        : kind === "table"
        ? "No login and no cookies. Your table's best journey is kept only in this browser; the players' names are forgotten when you leave this page. " + VP
        : kind === "world"
        ? "No login and no cookies. " + V
        : "No login and no cookies. Your streak and your album are kept only in this browser. " + VP) + feedbackNote(kind) + reminderNote(kind);
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
  /* the play sign of the finish card's button (19 Oct 2026, Khayyam: "not just 'next' but we have to say
     'next game' with a play symbol to make it easy to understand") */
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.6v12.8c0 .9 1 1.5 1.8 1L19 13c.8-.5.8-1.6 0-2.1L9.8 4.6c-.8-.5-1.8.1-1.8 1z" fill="currentColor"/></svg>';
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
    try { afterPlay(); } catch (e) { /* a reminder must never break a game */ }
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

    var below = document.getElementById("below");
    if (below && below.parentNode) below.parentNode.removeChild(below);
    below = el("div", "below");               // the boxes under a game: "Today" first, then the world, a friend's duel, a room
    below.id = "below";

    var box = el("section", "onward");
    box.id = "onward";
    box.setAttribute("aria-label", "Today's games");
    if (typeof window.TurnsOut.duelBar === "function") {
      try { var who = window.TurnsOut.duelBar(o); if (who) box.appendChild(who); } catch (e) { /* the name and Send my day are optional */ }
    }
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
    var eodEl = null;                     // the end-of-day card, when today is done: it may spend a while in the finish card
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
      /* 19 Oct 2026, Khayyam: "it must be same for all the games". The cells that used to come only with the
         last game (the offers, today's thread, Tell Khayyam, Share my day) now follow every game; only the
         clock and the country's place wait for the end of the day. */
      try { box.appendChild(endOfDay(false)); } catch (e) { /* the end of the day must never break a game */ }
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
      try { eodEl = endOfDay(true); box.appendChild(eodEl); } catch (e) { eodEl = null; /* the end of the day must never break a game */ }
    }
    var all = el("a", "onward-all");
    all.href = here("../");
    all.insertAdjacentHTML("beforeend", '<svg class="onward-dots" viewBox="0 0 34 10" aria-hidden="true" focusable="false">' +
      '<circle cx="5" cy="5" r="4" fill="#2D4FC4"/><circle cx="17" cy="5" r="4" fill="#CF4327"/><circle cx="29" cy="5" r="4" fill="#0D7D73"/></svg>');
    all.appendChild(el("span", "onward-all-name", "All games"));
    all.insertAdjacentHTML("beforeend", ARROW);
    box.appendChild(all);
    try { box.appendChild(messageLine("onward-msg", "A message from Khayyam \u2192", "box")); } catch (e) { /* the message is optional */ }
    /* the world today: the world, the continent and the country beside this result (assets/js/world.js) */
    if (typeof window.TurnsOut.worldHook === "function") {
      try { window.TurnsOut.worldHook(below, o, played); } catch (e) { /* the world's counts must never break a game */ }
    }
    if (typeof window.TurnsOut.duelHook === "function") {
      try { window.TurnsOut.duelHook(below, o, played); } catch (e) { /* a duel must never break a game */ }
    }
    if (typeof window.TurnsOut.roomHook === "function") {
      try { window.TurnsOut.roomHook(below, o, played); } catch (e) { /* a room must never break a game */ }
    }
    below.insertBefore(box, below.firstChild);
    after.appendChild(below);

    /* The finish card (19 Oct 2026): a real play of today's own puzzle ends with a card over the bottom of the
       screen — how far through the day you are and one big way on — so nobody has to hunt for the next game.
       Practice and old days get none, and nothing moves on by itself. */
    var fin = null;
    if (!otherDay) {
      try { fin = finCard(o, next, played, count, href, box, eodEl); } catch (e) { fin = null; /* the card must never break a game */ }
    }

    if (!next || !("IntersectionObserver" in window)) return box;      // nothing to go to, or an old browser: the block is enough

    var bar = el("nav", "onbar");
    bar.id = "onbar";
    bar.setAttribute("aria-label", "Next game");
    bar.hidden = true;
    var go = el("a", "onbar-next");
    go.href = href;
    go.setAttribute("data-g", next.key);
    go.insertAdjacentHTML("beforeend", PLAY);
    var words = el("span", "");
    words.appendChild(el("b", "", next === GAMES[mine] ? "Today's puzzle" : "Next game"));
    go.appendChild(words);
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
    if (fin) fin.closed(function () { ready = true; place(); });                              // the slim bar waits its turn behind the finish card
    else window.setTimeout(function () { ready = true; place(); }, num(o.wait) ? o.wait : 1400);   // let the reveal have its moment first
    return box;
  }

  /* ------------------------------------------------------------------
     The finish card (19 Oct 2026, Khayyam: the way to the next game "must be very obvious, as a first thing to
     see"). A moment after the reveal it slides up over the bottom of the screen, the same on all nine games:
     the day's pips, "N of 9 played", one big "Next game" button with a play sign — never the next game's name,
     which says nothing to a newcomer — and a quiet line down to the stats. A tap on the line, the cross or the
     dark area puts it away, and only then may the slim bar appear. When the last game of the day is done, the
     card grows instead and holds the end of the day whole (the clock, the country, the offers, Tell Khayyam);
     put away, the card gives that end-of-day block back to the page, so nothing is ever on the page twice.
     ------------------------------------------------------------------ */
  var finTimer = 0;
  /* The world's answers arrive when its server does: watch the boxes under the game until the wanted
     piece appears (up to half a minute), hand it over once, and never break anything while looking. */
  function watchBelow(box, want, give) {
    var home = box && box.parentNode;
    if (!home || !("MutationObserver" in window)) return null;
    var found = function () {
      try {
        var e = home.querySelector(want);
        if (!e || e.hidden || (e.closest && e.closest("[hidden]"))) return false;
        give(e);
        return true;
      } catch (err) { return true; }      // looking must never break the card
    };
    if (found()) return null;
    var mo = new window.MutationObserver(function () { if (found()) stop(); });
    mo.observe(home, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    var t = window.setTimeout(function () { stop(); }, 30000);
    function stop() { try { mo.disconnect(); } catch (e) { /* done */ } window.clearTimeout(t); }
    return stop;
  }
  /* The last card opens on the day's stats; about two seconds later, once, it slides down by itself to the
     "More to play" button (19 Oct 2026, Khayyam). It never fights a hand: any touch, wheel, key or click on the
     card within that time cancels it, it only moves when the button is not already in view, and it stays
     still for anyone who asked for less motion. Coming back up to the stats is the player's own choice. */
  function autoDown(sheet, wrap) {
    if (reducedMotion()) return;
    var cancelled = false;
    function stop() { cancelled = true; }
    ["touchstart", "wheel", "pointerdown", "keydown", "mousedown"].forEach(function (n) {
      sheet.addEventListener(n, stop, { passive: true, once: true });
    });
    window.setTimeout(function () {
      try {
        if (cancelled || !wrap.parentNode) return;
        var more = sheet.querySelector(".fin-more");
        if (!more) return;
        var s = sheet.getBoundingClientRect(), m = more.getBoundingClientRect();
        if (m.bottom <= s.bottom - 8) return;                         // already in view: nothing to show
        var by = Math.min(m.top - s.top - 70, sheet.scrollHeight - sheet.clientHeight - sheet.scrollTop);
        if (by > 0) sheet.scrollBy({ top: by, behavior: "smooth" });
      } catch (e) { /* the card just stays where it is */ }
    }, 2000);
  }
  function finCard(o, next, played, count, href, box, eodEl) {
    var old = document.getElementById("fin");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    window.clearTimeout(finTimer);

    var wrap = el("div", "fin");
    wrap.id = "fin";
    var scrim = el("div", "fin-scrim");
    wrap.appendChild(scrim);
    var sheet = el("section", "fin-sheet" + (next ? "" : " fin-full"));
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", next ? "Played. The next game" : "All done for today");
    sheet.setAttribute("tabindex", "-1");
    if (next) sheet.setAttribute("data-g", next.key);
    var top = el("div", "onward-top");
    top.appendChild(el("h2", "fin-h", next ? "Played!" : "All done! 🎉"));
    var c = el("span", "onward-count");
    c.appendChild(el("b", "", String(count)));
    c.appendChild(document.createTextNode(" of " + GAMES.length + " played"));
    top.appendChild(c);
    var x = el("button", "chip round close fin-x", "×");
    x.type = "button";
    x.setAttribute("aria-label", "Close");
    top.appendChild(x);
    sheet.appendChild(top);
    var pips = el("div", "pips");
    pips.setAttribute("aria-hidden", "true");
    GAMES.forEach(function (G, i) {
      var p = el("i", played[i] ? "on" : "");
      p.setAttribute("data-g", G.key);
      pips.appendChild(p);
    });
    sheet.appendChild(pips);
    /* how the day is going: spot-on count (19 Oct 2026, Khayyam: option C) */
    var spot = 0;
    try { dayRows().forEach(function (x) { if (x.tier === 3) spot++; }); } catch (e) { spot = 0; }
    if (spot > 0 && count > 0) {
      sheet.appendChild(el("p", "fin-spot", "✓ " + spot + " of " + count + " spot on today"));
    }
    var watching = null;                   // the country line and the world box arrive when the server answers
    if (next) {
      /* the country's place in this game (option A): the line the world block works out, mirrored here
         the moment it arrives, so the push to the next game carries the team with it */
      var rank = el("p", "fin-rank");
      rank.hidden = true;
      sheet.appendChild(rank);
      watching = watchBelow(box, "#world .wd-place", function (p) {
        rank.textContent = p.textContent;
        rank.hidden = false;
      });
      var a = el("a", "fin-next");
      a.href = href;
      a.insertAdjacentHTML("beforeend", PLAY);
      var at = el("span", "fin-next-words");
      at.appendChild(el("span", "", "Next game"));
      at.appendChild(el("small", "", "about 15 seconds"));
      a.appendChild(at);
      a.addEventListener("click", function () { count_("onward-sheet/" + next.id); });
      sheet.appendChild(a);
    } else {
      /* The last game of the day (19 Oct 2026, Khayyam: "it feels like end of Logicers, but it is not"). The
         card goes up almost the whole screen: the world's scores of the day first, in plain view (they come
         along once the server has them), then one big way on to the games that never run out, then the end
         of the day (the clock, the country, the cells). */
      var seat = el("div", "fin-world");
      sheet.appendChild(seat);
      watching = watchBelow(box, "#world", function (w) { seat.appendChild(w); });
      var more = el("a", "fin-more");
      more.href = here("../") + "#more-to-play";
      var mw = el("span", "fin-next-words");
      mw.appendChild(el("span", "", "More to play \u2192"));
      mw.appendChild(el("small", "", "games for friends, live rooms, the world table"));
      more.appendChild(mw);
      more.addEventListener("click", function () { count_("onward-sheet/more"); });
      sheet.appendChild(more);
      if (eodEl) sheet.appendChild(eodEl);   // borrowed from the page; given back when the card is put away
    }
    var stats = el("button", "fin-stats");
    stats.type = "button";
    stats.appendChild(document.createTextNode(next ? "See stats & explanation ↓" : "See the full explanation ↓"));
    sheet.appendChild(stats);
    wrap.appendChild(sheet);

    var fns = [], done = false;
    function onKey(e) { if (e.key === "Escape") close(false); }
    function close(toStats) {
      if (done) return;
      done = true;
      document.removeEventListener("keydown", onKey);
      if (watching) { try { watching(); } catch (e) { /* nothing to stop */ } }
      if (eodEl && !next && box) {         // the end of the day goes back to its place on the page
        try {
          var allA = box.querySelector(".onward-all");
          if (allA) box.insertBefore(eodEl, allA); else box.appendChild(eodEl);
        } catch (e) { /* the card simply keeps it */ }
      }
      try {                                // the borrowed world box goes back under the game
        var wb = wrap.querySelector("#world");
        if (wb && box && box.parentNode) box.parentNode.appendChild(wb);
      } catch (e) { /* the card simply keeps it */ }
      function away() { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }
      if (reducedMotion()) away();
      else { wrap.classList.add("fin-out"); window.setTimeout(away, 200); }
      if (toStats) {
        var after = document.getElementById("after");
        if (after) {
          try { after.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" }); }
          catch (e) { after.scrollIntoView(); }
        }
      }
      fns.forEach(function (f) { try { f(); } catch (e) { /* the bar can live without it */ } });
    }
    scrim.addEventListener("click", function () { count_("onward-sheet/away"); close(false); });
    x.addEventListener("click", function () { count_("onward-sheet/away"); close(false); });
    stats.addEventListener("click", function () { count_("onward-sheet/stats"); close(true); });

    finTimer = window.setTimeout(function () {         // the reveal has its moment first
      document.body.appendChild(wrap);
      document.addEventListener("keydown", onKey);
      count_(next ? "onward-sheet/seen" : "onward-sheet/day-done");
      try { sheet.focus({ preventScroll: true }); } catch (e) { /* no focus */ }
      if (!next) autoDown(sheet, wrap);
    }, num(o.wait) ? o.wait : 1400);
    return { closed: function (fn) { if (done) fn(); else fns.push(fn); } };
  }

  /* ------------------------------------------------------------------
     The end of the day (17 Oct 2026). When the last of today's daily games is finished, the block at the end of
     the page (the way onward) has nothing left to point to, so it ends the day instead, in one slim card:
       - the time until the new games (the day changes at the player's own midnight);
       - their country's place today, with an invitation to bring friends (assets/js/world.js fills this in);
       - three cells side by side: today's thread on Reddit (r/Logicers), "Tell Khayyam", and "Share my day";
       - on a phone that can keep the site on its home screen, a small offer to (at most once in three days);
       - and, a moment later, a small round photo of Khayyam at the bottom corner with a short hello, like the
         assistant of a website. A tap opens three short questions, all optional. Once a day at most, away for
         3 days after a tap on its cross and for 30 days after a message was sent.
     "Share my day" is one picture and one text of all nine results with no answers in them: a grid of squares (the
     result of each game as one of four colours, in the order of the shelf), so friends see a pattern and wonder.
     Nothing here is shown during a game, and nothing here can break one: every part is wrapped.
     ------------------------------------------------------------------ */
  var DAY_MS = 86400000;
  function eodStore() { return obj(readAll().eod) || {}; }
  function eodUpdate(change) {
    var all = readAll();
    all.eod = obj(all.eod) || {};
    change(all.eod);
    writeAll(all);
    return all.eod;
  }
  function siteRoot() { return /assets\/js\/turnsout\.js/.test(SELF) ? SELF.replace(/assets\/js\/turnsout\.js.*$/, "") : "../"; }
  function onTestServer() { return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname); }
  /* the key of the form service: on the live site only the one above; the checks may give their own */
  function feedbackKey() {
    if (onTestServer()) return typeof window.LOGICERS_FEEDBACK_KEY === "string" ? window.LOGICERS_FEEDBACK_KEY : "";
    return FEEDBACK_KEY;
  }

  /* time until the player's next midnight, in words */
  function untilMidnight(now) {
    var n = now || new Date(), m = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0, 0, 0);
    var mins = Math.max(1, Math.ceil((m.getTime() - n.getTime()) / 60000)), h = Math.floor(mins / 60), r = mins % 60;
    return h ? h + " h" + (r ? " " + r + " min" : "") : r + " min";
  }

  /* ---- the result grid: one square per game, in the order of the shelf ---- */
  var SQUARES = [String.fromCodePoint(0x2B1C), String.fromCodePoint(0x1F7E6), String.fromCodePoint(0x1F7EA), String.fromCodePoint(0x1F7E7)];
  var NOT_PLAYED = String.fromCodePoint(0x2B1B);
  function dayRows() {
    return GAMES.map(function (G) {
      var r = null;
      try { r = game(G.id).results[todayOf(G)]; } catch (e) { r = null; }
      r = (r && G.done(r)) ? r : null;
      var t = r && typeof G.tier === "function" ? G.tier(r) : -1;
      return { G: G, r: r, tier: (t >= 0 && t <= 3) ? t : -1 };
    });
  }
  function dayLabel(now) {
    var d = now || new Date();
    try { return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }); } catch (e) { return ""; }
  }
  function dayText(rows, now) {
    rows = rows || dayRows();
    var done = rows.filter(function (x) { return !!x.r; }).length, lines = [];
    for (var i = 0; i < rows.length; i += 3) {
      lines.push(rows.slice(i, i + 3).map(function (x) { return x.tier >= 0 ? SQUARES[x.tier] : NOT_PLAYED; }).join(""));
    }
    return "Logicers " + dayLabel(now) + " · " + done + " of " + rows.length + "\n" + lines.join("\n") +
           "\nCan you beat me? https://" + (address() || "logicers.com");
  }
  /* each game's colour on the picture, the same as the light colours in logicers.css */
  var PIC = { hundred: "#2D4FC4", call: "#6A45CC", cousin: "#CF4327", club: "#BE3A82", apart: "#7A5034",
              gets: "#005E16", every: "#C40045", o24: "#0A5666", energy: "#A55200" };
  function rrect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y); c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y); c.closePath();
  }
  function wrapWords(c, text, max) {
    var words = String(text).split(" "), lines = [], cur = "";
    words.forEach(function (w) {
      var t = cur ? cur + " " + w : w;
      if (cur && c.measureText(t).width > max) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  /* "My Logicers day": 1080 x 1350. No answers on it: the game's name and how close, as dots (three filled: spot on). */
  function dayPicture(rows, now) {
    var W = 1080, H = 1350, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var c = cv.getContext("2d");
    if (!c) return Promise.resolve(null);
    var D = '"Bricolage Grotesque", "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var T = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var ready = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load('800 48px "Bricolage Grotesque"'), document.fonts.load('700 34px "Figtree"')]).then(function () {}, function () {})
      : Promise.resolve();
    return ready.then(function () {
      c.fillStyle = "#F3F4F9"; c.fillRect(0, 0, W, H);
      c.fillStyle = "#15172B"; c.textBaseline = "alphabetic"; c.textAlign = "left";
      c.font = "800 84px " + D; c.fillText("My Logicers day", 66, 150);
      c.fillStyle = "#5D6279"; c.font = "700 40px " + T;
      var done = rows.filter(function (x) { return !!x.r; }).length;
      c.fillText(dayLabel(now) + "  ·  " + done + " of " + rows.length + " played", 66, 214);
      var tw = 300, th = 280, gap = 24, x0 = 66, y0 = 290;
      rows.forEach(function (x, i) {
        var col = i % 3, row = Math.floor(i / 3), px = x0 + col * (tw + gap), py = y0 + row * (th + gap);
        c.fillStyle = x.r ? (PIC[x.G.key] || "#2D4FC4") : "#C9CCDC";
        rrect(c, px, py, tw, th, 38); c.fill();
        c.fillStyle = "#ffffff"; c.textAlign = "left"; c.font = "800 46px " + D;
        wrapWords(c, x.G.name, tw - 56).slice(0, 3).forEach(function (ln, k) { c.fillText(ln, px + 28, py + 70 + k * 50); });
        for (var d = 0; d < 3; d++) {
          c.beginPath(); c.arc(px + 44 + d * 46, py + th - 40, 15, 0, Math.PI * 2);
          if (x.tier > d) { c.fillStyle = "#ffffff"; c.fill(); }
          else { c.lineWidth = 5; c.strokeStyle = "rgba(255,255,255,.7)"; c.stroke(); }
        }
      });
      c.fillStyle = "#15172B"; c.font = "800 52px " + D; c.textAlign = "left";
      c.fillText("Can you beat me?", 66, 1262);
      c.fillStyle = "#5D6279"; c.font = "700 38px " + T;
      c.fillText(address() || "logicers.com", 66, 1314);
      var dots = [["#2D4FC4", 936], ["#CF4327", 978], ["#0D7D73", 1020]];
      dots.forEach(function (d) { c.beginPath(); c.arc(d[1], 1290, 15, 0, Math.PI * 2); c.fillStyle = d[0]; c.fill(); });
      return new Promise(function (resolve) {
        try { cv.toBlob(function (b) { resolve(b || null); }, "image/png"); } catch (e) { resolve(null); }
      });
    });
  }
  function shareDay(btn) {
    count_("eod/share-day");
    var rows = dayRows(), text = dayText(rows), busy = btn && btn.getAttribute("aria-busy") === "true";
    if (busy) return;
    if (btn) btn.setAttribute("aria-busy", "true");
    function free() { if (btn) btn.removeAttribute("aria-busy"); }
    dayPicture(rows).then(function (blob) {
      if (!blob) { copyText(text); free(); return; }
      var o = { blob: blob, filename: "my-logicers-day.png", text: text };
      return share(o).then(function (how) {
        if (how === "fallback") saveSheet(o, null);
        free();
      });
    }).then(null, function () { free(); });
  }

  /* ------------------------------------------------------------------
     Keep Logicers close (18 Oct 2026, Khayyam: "we have to hook them as soon as they are in and keep them", and the
     offers "should not be hidden, once installed it won't show, same for notifications").
     A slim strip of two halves, side by side, that stands under the way onward after the first finished game, and
     in the card that closes the day. Every half is there until it is done, and then it is gone:
       Add to home screen   until the site is installed (a phone only)
       Play on your phone   on a computer: a QR code of the site; gone once it has been shown
       Daily reminder       until the reminder is on, or the browser has been told no (then the calendar half)
       Calendar reminder    where a reminder cannot be pushed (an iPhone in Safari, or a no): a daily event for the
                            calendar, gone once it has been taken
     The reminder is a push the browser's own service delivers: the phone gives the server (server/live, push.js) its
     push address, the hour it usually plays at, its clock's offset, its streak and the day it last played, and the
     server sends at most ONE push a day (never when the phone has played that day). The key below is the public half of
     the server's signing key (the same text as VAPID_PUBLIC in server/live/wrangler.jsonc); empty means no reminder.
     ------------------------------------------------------------------ */
  var PUSH_KEY = "BHTIP9q1jseMP0W-aAJkMUO6dPLmnkAG0Mdmodw6BKARfNYSrhYxg3pBkeeLEM7TJ_kVbRzYlj6nPTOAei1DRC0";
  var PUSH_API = "https://logicers-live.rza-khay.workers.dev";
  function pushKey() {
    if (onTestServer()) return typeof window.LOGICERS_PUSH_KEY === "string" ? window.LOGICERS_PUSH_KEY : "";
    return PUSH_KEY;
  }
  function swWanted() {
    var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
    return window.location.protocol === "https:" ? !local : (local && window.LOGICERS_SW === true);
  }
  function pushSupported() {
    return !!pushKey() && swWanted() && "serviceWorker" in window.navigator && "PushManager" in window && "Notification" in window;
  }
  function permission() {
    try { return window.Notification.permission; } catch (e) { return "denied"; }
  }
  function swReady() {
    return new Promise(function (resolve, reject) {
      var t = window.setTimeout(function () { reject(new Error("no service worker")); }, 8000);
      window.navigator.serviceWorker.ready.then(function (r) { window.clearTimeout(t); resolve(r); }, function (x) { window.clearTimeout(t); reject(x); });
    });
  }
  function keyBytes(s) {
    var b = atob(String(s).replace(/-/g, "+").replace(/_/g, "/")), out = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) out[i] = b.charCodeAt(i);
    return out;
  }
  function dayKeyOf(d) { return new Date(d * 86400000).toISOString().slice(0, 10).replace(/-/g, ""); }

  /* the calendar days (the phone's own) on which this browser finished at least one game: practice does not count */
  function siteDays() {
    var all = readAll(), on = {};
    GAMES.forEach(function (G) {
      var res = obj(obj(obj(all.games) && all.games[G.id]) && all.games[G.id].results);
      if (!res) return;
      var p = String(G.start).split("-"), first = Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000), today = calendarDay(new Date());
      Object.keys(res).forEach(function (k) {
        var n = Number(k), d = first + n - 1;
        if (n >= 1 && Math.floor(n) === n && d <= today && G.done(res[k])) on[d] = true;
      });
    });
    return on;
  }
  /* the hours of the day at which the last two weeks' first games were finished -> the hour most often (this hour when none yet) */
  function noteHour() {
    var key = dayKeyOf(calendarDay(new Date()));
    var e = eodStore();
    if (e.hrDay === key) return;
    eodUpdate(function (x) {
      var a = Array.isArray(x.hrs) ? x.hrs.filter(function (h) { return typeof h === "number" && h >= 0 && h <= 23; }) : [];
      a.push(new Date().getHours());
      x.hrs = a.slice(-14);
      x.hrDay = key;
    });
  }
  function usualHour() {
    var a = eodStore().hrs, n = {}, best = new Date().getHours(), top = 0;
    if (!Array.isArray(a) || !a.length) return best;
    a.forEach(function (h) { n[h] = (n[h] || 0) + 1; });
    Object.keys(n).forEach(function (h) { if (n[h] > top || (n[h] === top && +h > best)) { top = n[h]; best = +h; } });
    return best;
  }
  function pushState() {
    var on = siteDays(), today = calendarDay(new Date()), res = {}, last = 0;
    Object.keys(on).forEach(function (d) { res[Number(d) - 19000] = 1; last = Math.max(last, Number(d)); });
    var e = eodStore();
    return {
      v: 1, h: usualHour(), z: -new Date().getTimezoneOffset(),
      st: Math.min(9999, streak(res, today - 19000).current), pl: last ? dayKeyOf(last) : "",
      tip: typeof e.tip === "string" ? e.tip : ""
    };
  }
  function pushPost(path, body) {
    return window.fetch(pushBase() + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  }
  function pushSend(sub) {
    var s = pushState();
    s.ep = sub.endpoint;
    return pushPost("/push/join", s).then(function (r) {
      if (r && r.ok && s.tip) eodUpdate(function (x) { if (x.tip === s.tip) x.tip = ""; });
      return r;
    });
  }
  /* the phone still says yes: tell the server how it stands (it has played, its streak, its hour). Quiet when it can't. */
  function pushSync(force) {
    try {
      if (!pushSupported() || permission() !== "granted" || eodStore().remind !== 1) return;
      var last = 0;
      try { last = +window.sessionStorage.getItem("logicers-push") || 0; } catch (e) { last = 0; }
      if (!force && Date.now() - last < 30 * 60000) return;
      try { window.sessionStorage.setItem("logicers-push", String(Date.now())); } catch (e) { /* no matter */ }
      swReady().then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (sub) {
        if (sub) return pushSend(sub);
        eodUpdate(function (x) { x.remind = 0; });          // the browser lost it: the half comes back
        keepUi(); remindSettings();
      }).then(null, function () { /* the server or the network is away: the next visit tries again */ });
    } catch (e) { /* a reminder must never break a game */ }
  }
  function remindOn() {
    count_("remind/tap");
    var ask;
    try { ask = permission() === "granted" ? Promise.resolve("granted") : Promise.resolve(window.Notification.requestPermission()); }
    catch (e) { ask = Promise.resolve("denied"); }
    ask.then(function (p) {
      if (p !== "granted") { count_("remind/no"); keepUi(); return; }
      return swReady().then(function (reg) {
        return reg.pushManager.getSubscription().then(function (s) {
          return s || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(pushKey()) });
        });
      }).then(pushSend).then(function (r) {
        if (!r || !r.ok) throw new Error("server");
        count_("remind/on");
        eodUpdate(function (x) { x.remind = 1; });
        keepUi(); remindSettings();
      });
    }).then(null, function () { count_("remind/failed"); keepUi(); });
  }
  function remindOff() {
    count_("remind/off");
    eodUpdate(function (x) { x.remind = 0; });
    keepUi(); remindSettings();
    try {
      swReady().then(function (reg) { return reg.pushManager.getSubscription(); }).then(function (sub) {
        if (!sub) return;
        var ep = sub.endpoint;
        return pushPost("/push/leave", { v: 1, ep: ep }).then(null, function () {}).then(function () { return sub.unsubscribe(); });
      }).then(null, function () { /* the browser's own switch is still there */ });
    } catch (e) { /* nothing more to do */ }
  }

  /* The calendar half: ONE tap, no choice to make (Khayyam, 18 Oct 2026). A daily event at the hour this phone usually
     plays at, starting tomorrow, with an alarm. Where the calendar is Apple's (an iPhone, an iPad, Safari on a Mac) the tap
     opens the event as the server serves it, and the phone offers "Add to Calendar"; everywhere else it opens Google
     Calendar with the event filled in, for one tap on Save. Nothing is signed in to and nothing is stored. */
  function appleCalendar() {
    var ua = window.navigator.userAgent || "";
    return iOS() || (/Macintosh/.test(ua) && /Safari\//.test(ua) && !/Chrome\/|Chromium\/|Edg\/|OPR\/|Firefox\//.test(ua));
  }
  function pushBase() {
    return onTestServer() && typeof window.LOGICERS_PUSH_API === "string" && window.LOGICERS_PUSH_API ? window.LOGICERS_PUSH_API : PUSH_API;
  }
  function calendarUrl() {
    var h = usualHour();
    if (appleCalendar()) return pushBase() + "/ics?h=" + h;
    var n = new Date(), t = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, h, 0, 0), end = new Date(t.getTime() + 15 * 60000);
    function p2(v) { return (v < 10 ? "0" : "") + v; }
    function f(d) { return d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + "T" + p2(d.getHours()) + p2(d.getMinutes()) + "00"; }
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Logicers: today's games") +
      "&details=" + encodeURIComponent("A minute each. https://logicers.com/") + "&dates=" + f(t) + "/" + f(end) +
      "&recur=" + encodeURIComponent("RRULE:FREQ=DAILY");
  }
  function takeCalendar() {
    count_("remind/ics");
    var url = calendarUrl();
    eodUpdate(function (x) { x.ics = 1; });
    keepUi();
    try {
      if (appleCalendar()) { window.location.href = url; return; }
      var a = document.createElement("a");                    // a link of its own, in a new tab: this page stays where it is
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (e) { window.location.href = url; }
  }

  /* the QR half, for a computer: the site's own address as a code, drawn with the library the live games use */
  function openQr() {
    count_("qr/tap");
    var dlg = document.getElementById("keep-qr");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "keep-qr";
      dlg.setAttribute("aria-labelledby", "keep-qr-h");
      dlg.innerHTML = '<div class="sheet"><button class="chip round close" type="button" data-close aria-label="Close">×</button>' +
        '<h2 id="keep-qr-h">Play on your phone</h2><div class="keep-qr-code" id="keep-qr-code" role="img" aria-label="A QR code that opens Logicers"></div>' +
        '<p class="quiet">Point your phone’s camera at the code. Then add Logicers to your home screen and turn on the daily reminder: one reminder a day, never more.</p></div>';
      document.body.appendChild(dlg);
    }
    openDialog(dlg);
    function draw() {
      var host = document.getElementById("keep-qr-code");
      if (!host || host.firstChild || !window.qrcodegen) return;
      var Q = window.qrcodegen.QrCode, qr = Q.encodeText("https://logicers.com/?ref=qr", Q.Ecc.MEDIUM), n = qr.size, pad = 3, d = "";
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (qr.getModule(x, y)) d += "M" + (x + pad) + "," + (y + pad) + "h1v1h-1z";
      host.innerHTML = '<svg viewBox="0 0 ' + (n + pad * 2) + " " + (n + pad * 2) + '" width="220" height="220" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' +
        '<rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
    }
    if (window.qrcodegen) draw();
    else {
      var s = document.createElement("script");
      s.src = siteRoot() + "live/qrcodegen.js";
      s.onload = draw;
      document.head.appendChild(s);
    }
    eodUpdate(function (x) { x.qr = 1; });
    keepUi();
  }

  /* ---- the strip ---- */
  function keepWant() {
    var e = eodStore(), perm = permission(), sup = pushSupported(), on = sup && perm === "granted" && e.remind === 1;
    var canAsk = sup && perm !== "denied";
    return {
      install: !standalone() && !computer() && (!!installEvent || iOS()),
      qr: computer() && !standalone() && e.qr !== 1,
      remind: canAsk && !on,
      ics: !on && !canAsk && e.ics !== 1
    };
  }
  var keepSeen = {};
  function keepUi() {
    var want = keepWant();
    Array.prototype.forEach.call(document.querySelectorAll(".keep"), function (strip) {
      var n = 0;
      Array.prototype.forEach.call(strip.children, function (c) {
        var k = c.getAttribute("data-keep"), show = !!want[k];
        c.hidden = !show;
        if (show) {
          n++;
          if (!keepSeen[k]) { keepSeen[k] = 1; count_(k === "install" ? "eod/app-seen" : k === "qr" ? "qr/seen" : k === "ics" ? "remind/ics-seen" : "remind/seen"); }
        }
      });
      strip.hidden = n === 0;
      strip.style.setProperty("--n", String(Math.max(1, n)));
    });
  }
  function keepCell(kind, ico, label, sub, fn) {
    var b = el("button", "keep-cell");
    b.type = "button"; b.setAttribute("data-keep", kind); b.hidden = true;
    var t = el("span", "keep-t");
    t.appendChild(icon(ico)); t.appendChild(document.createTextNode(label));
    b.appendChild(t); b.appendChild(el("small", "keep-s", sub));
    b.addEventListener("click", fn);
    return b;
  }
  function keepStrip() {
    var strip = el("div", "keep");
    strip.hidden = true;
    strip.setAttribute("aria-label", "Keep Logicers close");
    strip.appendChild(keepCell("install", "📲", "Add to home screen", "opens like an app", askInstall));
    strip.appendChild(keepCell("qr", "📱", "Play on your phone", "scan the code", openQr));
    strip.appendChild(keepCell("remind", "🔔", "Daily reminder", "one a day, never more", remindOn));
    strip.appendChild(keepCell("ics", "🗓️", "Calendar reminder", "daily, no app needed", takeCalendar));
    window.setTimeout(keepUi, 0);
    return strip;
  }
  /* the number on the app's icon: the daily games not yet played today (only an installed app can show it) */
  function badgeUi() {
    try {
      if (!standalone() || !window.navigator.setAppBadge) return;
      var left = GAMES.filter(function (G) { return !playedToday(G); }).length;
      if (left > 0) window.navigator.setAppBadge(left).then(null, function () {});
      else if (window.navigator.clearAppBadge) window.navigator.clearAppBadge().then(null, function () {});
    } catch (e) { /* a badge is only a nicety */ }
  }
  /* the line about the country that the end-of-day card works out (world.js): sent once when it changes */
  function keepTip(text, sig) {
    try {
      if (typeof text !== "string" || !text || eodStore().remind !== 1 || eodStore().tipSig === sig) return;
      eodUpdate(function (x) { x.tip = text.slice(0, 110); x.tipSig = sig; });
      pushSync(true);
    } catch (e) { /* the reminder simply has no country line */ }
  }
  /* the "Daily reminder is on" line with its switch, under the privacy line of every About sheet */
  function remindSettings() {
    var on = pushSupported() && permission() === "granted" && eodStore().remind === 1;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (host) {
      var next = host.nextElementSibling, has = next && next.hasAttribute("data-keep-set");
      if (!on) { if (has) next.parentNode.removeChild(next); return; }
      if (has) return;
      var p = el("p", "quiet keep-set");
      p.setAttribute("data-keep-set", "");
      p.appendChild(document.createTextNode("The daily reminder is on. "));
      var b = el("button", "", "Turn it off");
      b.type = "button";
      b.addEventListener("click", remindOff);
      p.appendChild(b);
      host.parentNode.insertBefore(p, host.nextSibling);
    });
  }
  function afterPlay() {
    noteHour();
    badgeUi();
    pushSync(true);
  }

  /* ---- the offer to keep the site on the home screen ---- */
  function askInstall() {
    count_("eod/app-tap");
    if (installEvent) {
      var ev = installEvent;
      try {
        ev.prompt();
        if (ev.userChoice && ev.userChoice.then) ev.userChoice.then(function (c) {
          if (c && c.outcome === "accepted") { installEvent = null; keepUi(); }
        }, function () {});
      } catch (e) { /* the browser's menu still offers it */ }
      return;
    }
    var dlg = document.getElementById("eod-ios");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "eod-ios";
      dlg.setAttribute("aria-labelledby", "eod-ios-h");
      var SHARE = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M12 15V3m0 0L8 7m4-4 4 4M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      var PLUS = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      var pad = /iPad/.test(window.navigator.userAgent || "") || (/Macintosh/.test(window.navigator.userAgent || "") && window.navigator.maxTouchPoints > 1);
      dlg.innerHTML = '<div class="sheet"><button class="chip round close" type="button" data-close aria-label="Close">×</button>' +
        '<h2 id="eod-ios-h">Add Logicers to your home screen</h2>' +
        '<ol class="ios-steps"><li><span class="ios-ico">' + SHARE + '</span><span>Tap <b>Share</b> ' + (pad ? 'at the top of Safari' : 'at the bottom of Safari') + '.</span></li>' +
        '<li><span class="ios-ico">' + PLUS + '</span><span>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</span></li></ol>' +
        '<p class="quiet">Then open Logicers from your home screen and tap <b>Daily reminder</b>.</p>' +
        (pad ? '' : '<p class="ios-point" aria-hidden="true">\u2193</p>') + '</div>';
      document.body.appendChild(dlg);
    }
    openDialog(dlg);
  }

  /* ---- Tell Khayyam ---- */
  var FORM_URL = "https://api.web3forms.com/submit";
  var khayOpen = null;
  function khayReady() { return !!feedbackKey(); }
  function khayFace(size) {
    var i = document.createElement("img");
    i.src = siteRoot() + "assets/img/khayyam.jpg";
    i.alt = "";
    i.width = size; i.height = size;
    i.decoding = "async";
    return i;
  }
  function khayPayload(f) {
    var rows = dayRows();
    return {
      access_key: feedbackKey(),
      subject: "Logicers: a message from a player",
      from_name: "Logicers player",
      botcheck: f.botcheck ? "yes" : "",
      mood: f.mood || "",
      liked_and_disliked: f.liked || "",
      fix_or_build_next: f.next || "",
      day: "Day " + Math.max(1, dayNumber("2026-10-03")) + " (" + dayLabel() + ")",
      games_today: rows.map(function (x) { return x.G.name + ": " + (x.r ? x.G.says(x.r) : "not played"); }).join("; "),
      grid: dayText(rows).split("\n").slice(1, 1 + Math.ceil(rows.length / 3)).join(" / "),
      page: window.location.pathname,
      language: window.navigator.language || "",
      screen: ((window.screen && window.screen.width) || 0) + "x" + ((window.screen && window.screen.height) || 0)
    };
  }
  function khaySend(body) {
    var ctl = null, timer = null;
    try { ctl = new window.AbortController(); } catch (e) { ctl = null; }
    if (ctl) timer = window.setTimeout(function () { ctl.abort(); }, 12000);
    return window.fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) window.clearTimeout(timer);
      return res.json().then(function (j) { return !!(j && j.success); }, function () { return false; });
    }, function () { if (timer) window.clearTimeout(timer); return false; });
  }
  function khayPanel() {
    var dlg = document.getElementById("khay");
    if (dlg) return dlg;
    dlg = document.createElement("dialog");
    dlg.id = "khay";
    dlg.className = "khay";
    dlg.setAttribute("data-stay", "");                // the frame's tap-outside-to-close must not close this one
    dlg.setAttribute("aria-labelledby", "khay-h");
    var head = el("div", "khay-head");
    var who = el("div", "khay-who");
    who.appendChild(el("b", "", "Khayyam"));
    who.appendChild(el("span", "", "Builds Logicers on his own"));
    var face = el("span", "khay-photo"); face.appendChild(khayFace(44));
    var x = el("button", "chip round close", "×"); x.type = "button"; x.setAttribute("aria-label", "Close");
    x.id = "khay-x";
    head.appendChild(face); head.appendChild(who); head.appendChild(x);
    dlg.appendChild(head);
    var form = el("form", "khay-form"); form.id = "khay-form"; form.noValidate = true;
    var intro = el("p", "khay-intro", "I’m Khayyam, a scientist, the kind who studies politics. I build Logicers on my own. Three quick questions, all optional. I read every answer. ");
    var more = el("a", "khay-more", "More about me \u2192");     // 19 Oct 2026: a way to reach him directly
    more.href = "https://thekhayyam.com"; more.target = "_blank"; more.rel = "noopener noreferrer";
    more.addEventListener("click", function () { count_("eod/about-me"); });
    intro.appendChild(more);
    form.appendChild(intro);
    var h = el("h2", "sr-only", "Tell Khayyam"); h.id = "khay-h"; form.appendChild(h);
    form.appendChild(el("p", "khay-q", "How was today?"));
    var moods = el("div", "khay-moods"); moods.setAttribute("role", "group"); moods.setAttribute("aria-label", "How was today?");
    [["😍", "Loved it"], ["🙂", "Good"], ["😐", "Okay"], ["🙁", "Not great"]].forEach(function (m) {
      var b = el("button", "khay-mood", m[0]); b.type = "button"; b.setAttribute("aria-pressed", "false"); b.setAttribute("aria-label", m[1]); b.setAttribute("data-m", m[0]);
      b.addEventListener("click", function () {
        var on = b.getAttribute("aria-pressed") !== "true";
        Array.prototype.forEach.call(moods.children, function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", on ? "true" : "false");
        sendable();
      });
      moods.appendChild(b);
    });
    form.appendChild(moods);
    function area(id, q, ph) {
      var l = el("label", "khay-q", q); l.setAttribute("for", id); form.appendChild(l);
      var t = el("textarea", "khay-text"); t.id = id; t.rows = 2; t.maxLength = 600; t.placeholder = ph;
      t.addEventListener("input", sendable);
      form.appendChild(t);
      return t;
    }
    var liked = area("khay-liked", "What do you like, and what don’t you like?", "Anything, big or small");
    var next = area("khay-next", "What should I fix, or build next?", "A game idea, a bug, a wish");
    var trap = el("input"); trap.type = "checkbox"; trap.name = "botcheck"; trap.tabIndex = -1; trap.setAttribute("aria-hidden", "true"); trap.className = "khay-trap"; trap.id = "khay-trap";
    form.appendChild(trap);
    /* 19 Oct 2026, Khayyam: his message comes last, "right before submitting the feedback", so nobody reads it and forgets to send */
    try { form.appendChild(messageLine("khay-msg-line", "Read my message to you \u2192", "tell")); } catch (e) { /* the message is optional */ }
    var send = el("button", "btn solid khay-send", "Send to Khayyam"); send.type = "submit"; send.disabled = true; send.id = "khay-send";
    form.appendChild(send);
    var note = el("p", "khay-note"); note.id = "khay-note"; note.setAttribute("role", "status"); form.appendChild(note);
    var thanks = el("div", "khay-thanks"); thanks.id = "khay-thanks"; thanks.hidden = true;
    thanks.appendChild(el("p", "khay-big", "Thank you! 🙏"));
    thanks.appendChild(el("p", "", "I read every message, and it shapes what I build next."));
    var done = el("button", "btn ghost", "Close"); done.type = "button"; done.id = "khay-done"; thanks.appendChild(done);
    function sendable() {
      var any = !!(liked.value.trim() || next.value.trim() || moods.querySelector('[aria-pressed="true"]'));
      send.disabled = !any;
    }
    function close() {
      closeDialog(dlg);
      khayOpen = null;
    }
    x.addEventListener("click", close);
    done.addEventListener("click", close);
    dlg.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (send.disabled || send.getAttribute("aria-busy") === "true") return;
      var m = moods.querySelector('[aria-pressed="true"]');
      send.setAttribute("aria-busy", "true"); send.textContent = "Sending…"; note.textContent = "";
      khaySend(khayPayload({ mood: m ? m.getAttribute("data-m") : "", liked: liked.value.trim(), next: next.value.trim(), botcheck: trap.checked })).then(function (ok) {
        send.removeAttribute("aria-busy"); send.textContent = "Send to Khayyam";
        if (ok) {
          count_("eod/sent");
          eodUpdate(function (s) { s.sent = Date.now(); });
          form.hidden = true; thanks.hidden = false;
          var l = document.getElementById("khay-launch"); if (l && l.parentNode) l.parentNode.removeChild(l);
          try { done.focus(); } catch (er) { /* no focus */ }
        } else {
          note.textContent = "That did not go through. Please try again, or write to logicers.world@gmail.com.";
        }
      });
    });
    dlg.appendChild(form);
    dlg.appendChild(thanks);
    document.body.appendChild(dlg);
    return dlg;
  }
  function khayOpenPanel(from) {
    if (!khayReady()) return;
    count_("eod/open-" + from);
    var dlg = khayPanel();
    var l = document.getElementById("khay-launch");
    if (l) l.hidden = true;
    if (typeof dlg.show === "function") { if (!dlg.open) dlg.show(); } else dlg.setAttribute("open", "");
    khayOpen = dlg;
    try { var t = dlg.querySelector(".khay-mood"); if (t) t.focus({ preventScroll: true }); } catch (e) { /* no focus */ }   // not a text box: a phone's keyboard must not open by itself
  }
  /* the little round photo and its hello, at the bottom corner, a moment after the day has ended */
  var launchTimer = 0;
  var HELLO_DELAY = 5000;            // long enough for the reveal and the first read of the story to have their moment
  function khayLaunch() {
    if (!khayReady() || document.getElementById("khay-launch")) return;
    var e = eodStore(), today = calendarDay(new Date());
    var away = (num(e.sent) && Date.now() - e.sent < 30 * DAY_MS) || (num(e.hid) && Date.now() - e.hid < 3 * DAY_MS) || e.shown === today;
    if (away) return;
    window.clearTimeout(launchTimer);
    launchTimer = window.setTimeout(function () {
      if (document.getElementById("khay-launch") || (khayOpen && khayOpen.open)) return;
      var box = el("div", "khay-launch"); box.id = "khay-launch";
      var wrap = el("div", "khay-bubble-wrap");
      var bubble = el("button", "khay-bubble"); bubble.type = "button";
      bubble.appendChild(document.createTextNode("Hi, I’m Khayyam 👋"));
      bubble.appendChild(el("span", "", "Got 30 seconds?"));
      var x = el("button", "khay-x", "×"); x.type = "button"; x.setAttribute("aria-label", "Hide this");
      wrap.appendChild(bubble); wrap.appendChild(x);
      var face = el("button", "khay-face"); face.type = "button"; face.setAttribute("aria-label", "Tell Khayyam what you think");
      face.appendChild(khayFace(56));
      box.appendChild(wrap); box.appendChild(face);
      document.body.appendChild(box);
      eodUpdate(function (s) { s.shown = today; });
      count_("eod/bubble-seen");
      bubble.addEventListener("click", function () { khayOpenPanel("bubble"); });
      face.addEventListener("click", function () { khayOpenPanel("bubble"); });
      x.addEventListener("click", function () {
        eodUpdate(function (s) { s.hid = Date.now(); });
        count_("eod/bubble-hidden");
        if (box.parentNode) box.parentNode.removeChild(box);
      });
      window.setTimeout(function () { box.classList.add("quiet"); }, 9000);       // the hello fades, the face stays
      /* the face steps aside whenever it would lie over a button the player may be about to press */
      var avoid = "#share, .eod-strip, .onward-all, #after .actions";
      var raf = 0;
      function duck() {
        raf = 0;
        if (!box.parentNode) return;
        var b = box.getBoundingClientRect(), under = false;
        Array.prototype.forEach.call(document.querySelectorAll(avoid), function (n) {
          var r = n.getBoundingClientRect();
          if (r.width && r.height && r.bottom > b.top - 6 && r.top < b.bottom + 6 && r.right > b.left - 6 && r.left < b.right + 6) under = true;
        });
        if (document.querySelector("dialog[open]")) under = true;
        box.classList.toggle("duck", under);
      }
      function soon() { if (!raf) raf = window.requestAnimationFrame(duck); }
      window.addEventListener("scroll", soon, { passive: true });
      window.addEventListener("resize", soon);
      duck();
    }, HELLO_DELAY);
  }

  /* ---- a message from Khayyam (19 Oct 2026) ----
     His own words to the players, one small window, the same wherever it is opened from: the line at the
     bottom of the box after every game, the line before Send in Tell Khayyam, and the home page's footer
     (any element marked data-msg opens it). Nothing here can break a game. */
  var MESSAGE = [
    "Hi, I’m Khayyam. I’m a scientist, the kind who studies politics. Thank you for playing!",
    "My goal in life is to teach people, one way or another, and to help science reach more of them. Logicers is part of that, next to the other work I do, and it is free.",
    "If this matters to you the way it matters to me, please pass it on: to a friend, a colleague, your school or university. That is the only way it grows.",
    "I’m also building new parts of Logicers for universities, schools, learning centres and companies. If you want one for yours, write to me: logicers.world@gmail.com"
  ];
  function messageDialog() {
    var dlg = document.getElementById("khay-msg");
    if (dlg) return dlg;
    dlg = document.createElement("dialog");
    dlg.id = "khay-msg";
    dlg.className = "khay-msg";
    dlg.setAttribute("aria-labelledby", "khay-msg-h");
    var sheet = el("div", "sheet");
    var x = el("button", "chip round close", "×"); x.type = "button"; x.setAttribute("data-close", ""); x.setAttribute("aria-label", "Close");
    sheet.appendChild(x);
    var head = el("div", "khay-msg-head");
    var face = el("span", "khay-photo"); face.appendChild(khayFace(56));
    head.appendChild(face);
    var h = el("h2", "", "A message from Khayyam"); h.id = "khay-msg-h";
    head.appendChild(h);
    sheet.appendChild(head);
    MESSAGE.forEach(function (t) { sheet.appendChild(el("p", "khay-msg-p", t)); });
    var sig = el("p", "khay-msg-sign", "– Khayyam");
    sheet.appendChild(sig);
    var more = el("a", "khay-more", "More about me \u2192");
    more.href = "https://thekhayyam.com"; more.target = "_blank"; more.rel = "noopener noreferrer";
    more.addEventListener("click", function () { count_("msg/about-me"); });
    var mp = el("p", "khay-msg-more"); mp.appendChild(more);
    sheet.appendChild(mp);
    dlg.appendChild(sheet);
    document.body.appendChild(dlg);
    return dlg;
  }
  function openMessage(from) {
    count_("msg/open-" + (from || "page"));
    openDialog(messageDialog());
  }
  function messageLine(cls, words, from) {
    var p = el("p", cls);
    var b = el("button", "msg-link", words);
    b.type = "button";
    b.setAttribute("data-msg", from);
    p.appendChild(b);
    return p;
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-msg]") : null;
    if (!t) return;
    e.preventDefault();
    try { openMessage(t.getAttribute("data-msg")); } catch (err) { /* the message is optional */ }
  });

  /* ---- the card itself ---- */
  function icon(emoji) { var i = el("span", "ico", emoji); i.setAttribute("aria-hidden", "true"); return i; }
  function endOfDay(full) {
    var wrap = el("div", "eod");
    if (full) wrap.id = "eod";
    var row = el("div", "eod-row");
    if (full) {
    var clock = el("p", "eod-clock");
    function tick() {
      if (!wrap.parentNode && clock.__tick) { window.clearInterval(clock.__tick); return; }
      clock.textContent = "";
      clock.appendChild(document.createTextNode("New games in "));
      clock.appendChild(el("b", "", untilMidnight()));
    }
    tick();
    clock.__tick = window.setInterval(tick, 30000);
    row.appendChild(clock);
    wrap.appendChild(row);
    }

    var pride = el("div", "eod-pride-wrap");
    pride.id = "eod-pride";
    pride.hidden = true;
    if (full) wrap.appendChild(pride);

    try { wrap.appendChild(keepStrip()); } catch (e) { /* the offers are optional */ }
    var strip = el("div", "eod-strip");
    var cells = 2;
    var thread = el("a", "eod-cell");
    thread.href = REDDIT; thread.target = "_blank"; thread.rel = "noopener noreferrer";
    thread.appendChild(icon("💬")); thread.appendChild(el("span", "", "Today’s thread"));
    thread.addEventListener("click", function () { count_("eod/reddit"); });
    strip.appendChild(thread);
    if (khayReady()) {
      cells++;
      var tell = el("button", "eod-cell"); tell.type = "button"; tell.id = "eod-tell";
      tell.appendChild(icon("✉️")); tell.appendChild(el("span", "", "Tell Khayyam"));
      tell.addEventListener("click", function () { khayOpenPanel("strip"); });
      strip.appendChild(tell);
    }
    var mine = el("button", "eod-cell"); mine.type = "button"; mine.id = "eod-share";
    mine.appendChild(icon("📤")); mine.appendChild(el("span", "", "Share my day"));
    mine.addEventListener("click", function () { shareDay(mine); });
    strip.appendChild(mine);
    strip.style.setProperty("--n", String(cells));
    wrap.appendChild(strip);

    if (full && typeof window.TurnsOut.prideHook === "function") {
      try { window.TurnsOut.prideHook(pride); } catch (e) { /* the country's place must never break the end of the day */ }
    }
    if (full) { try { khayLaunch(); } catch (e) { /* the hello is optional */ } }
    return wrap;
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
    if (swWanted() && "serviceWorker" in window.navigator) {
      var root = /assets\/js\/turnsout\.js/.test(SELF) ? SELF.replace(/assets\/js\/turnsout\.js.*$/, "") : "/";
      try { window.navigator.serviceWorker.register(root + "sw.js").catch(function () { /* the site works without it */ }); }
      catch (e) { /* the site works without it */ }
    }
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();                       // no banner of the browser's own: the About sheet offers it
      installEvent = e;
      appUi();
    });
    window.addEventListener("appinstalled", function () {
      installEvent = null; count_("app/installed");
      appUi();
    });
    if (standalone()) {
      try {
        if (!window.sessionStorage.getItem("logicers-app")) { window.sessionStorage.setItem("logicers-app", "1"); count_("app/open"); }
      } catch (e) { /* counting is never needed */ }
    }
    appUi();
    try { remindSettings(); badgeUi(); pushSync(false); } catch (e) { /* the reminder is optional */ }
  }
  function appUi() {                           // the About sheet's section, wherever it is on the page
    try { keepUi(); } catch (e) { /* the offers are optional */ }
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
    message: openMessage,              // the message to the players (19 Oct 2026)
    MISS: "#f0b429",
    reducedMotion: reducedMotion,
    stamp: stamp,
    app: { standalone: standalone, installable: function () { return !!installEvent; }, ui: appUi },
    keepTip: keepTip,
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
    onward: onward,
    eod: { text: dayText, until: untilMidnight, rows: dayRows, picture: dayPicture }
  };

  privacyNotes();
  startCounter();
})();
