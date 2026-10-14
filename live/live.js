/* Logicers Live: the page of How Sure? (14 Oct 2026). One page for everyone: the section's own page,
   the host's setup, joining, and the game itself, for the host and for every player.

   The host screen can be any screen: a TV, a projector, a laptop, or just a phone. Every phone shows
   everything, the reveal with everyone's nets included, so a shared screen is optional; and the host
   can play too ("I'm playing too": the host's own screen then carries their slider and a dark strip of
   host buttons). A host who is not playing, on a wide screen, gets the big-screen look (body.live-big).

   No account for anyone. The host's secret key and each phone's own random key live in this browser's
   storage, never in the address (the address bar may be on a projector); the address carries only the
   game's code, after the "#", so no server ever logs it. The server (server/live, a Cloudflare Worker)
   decides every score; hs-rules.js, the same file as the server's, only draws your own net as you move it.
   Words are few and pictures many (Khayyam, 14 Oct 2026: "very simple, user friendly, more visuals and
   less words"), and the way on to today's daily games is big on every phone's last screen. */
(function () {
  "use strict";
  var TO = window.TurnsOut, R = window.HSRules, SETS = window.LIVE_SETS || [], QRG = window.qrcodegen;
  if (!TO || !R) return;

  var PROTO = 1;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  var SERVER = window.LIVE_SERVER || (LOCAL ? "http://127.0.0.1:8787" : "https://logicers-live.rza-khay.workers.dev");
  var SITE = "logicers.com";
  var KEYP = "logicers-live:";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function now() { return Date.now(); }
  function randomKey() {
    var b = new Uint8Array(24);
    window.crypto.getRandomValues(b);
    var s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return window.btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  /* ---- this browser's own storage: the keys of the games it hosts or plays, the last setup ---- */
  var mem = {};
  function sget(k) {
    try { var v = window.localStorage.getItem(KEYP + k); return v ? JSON.parse(v) : null; }
    catch (e) { return mem[k] || null; }
  }
  function sset(k, v) {
    mem[k] = v;
    try { window.localStorage.setItem(KEYP + k, JSON.stringify(v)); } catch (e) { /* kept in memory only */ }
  }
  function sdel(k) {
    delete mem[k];
    try { window.localStorage.removeItem(KEYP + k); } catch (e) { /* nothing kept */ }
  }
  (function tidy() {                         // a game's keys are useless a few days on: forget them
    try {
      var old = [];
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(KEYP) === 0 && k !== KEYP + "setup") {
          var v = JSON.parse(window.localStorage.getItem(k) || "null");
          if (!v || !v.t || now() - v.t > 3 * 86400e3) old.push(k);
        }
      }
      old.forEach(function (k) { window.localStorage.removeItem(k); });
    } catch (e) { /* nothing to tidy */ }
  })();

  /* ---- numbers as people read them ---- */
  function decimals(step) { var s = String(step), i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; }
  function plain(x, d) { return Number(x).toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 }); }
  function fmt(q, x) {
    if (q.kind === "year") return String(Math.round(x));
    var a = Math.abs(x);
    if (a >= 1e12) return plain(Number((x / 1e12).toPrecision(3)), 2) + " trillion";
    if (a >= 1e9) return plain(Number((x / 1e9).toPrecision(3)), 2) + " billion";
    if (a >= 1e6) return plain(Number((x / 1e6).toPrecision(3)), 2) + " million";
    return plain(x, q.log ? 2 : decimals(q.step));
  }
  function withUnit(q, x) { return fmt(q, x) + (q.u ? " " + q.u : ""); }
  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function placeText(y) { return (y.tied ? "=" : "") + ordinal(y.place); }

  /* ---- the pictures ---- */
  var NET_W = { s: 12, m: 30, b: 62 };
  var NET_WORD = { s: "Small", m: "Medium", b: "Big" };
  function netIcon(n, cls) {
    return '<i class="hs-ic' + (cls ? " " + cls : "") + '" style="width:' + NET_W[n] + 'px"><i class="hs-net" style="left:0;width:100%"></i></i>';
  }
  var ICON = {
    check: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    person: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.4" r="3.6" fill="currentColor"/><path d="M3.4 17.6c.6-3.6 3.3-5.6 6.6-5.6s6 2 6.6 5.6z" fill="currentColor"/></svg>',
    share: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5v10M6 6.2l4-3.7 4 3.7M4.5 10.5v5.2c0 .7.6 1.3 1.3 1.3h8.4c.7 0 1.3-.6 1.3-1.3v-5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    youIn: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="lf-c" cx="24" cy="24" r="22"/><path class="ls-card" d="M14 24.5l7 7 13-14" fill="none" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    years: '<svg viewBox="0 0 46 46" aria-hidden="true"><rect class="lf-c" x="5" y="9" width="36" height="31" rx="7"/><rect class="lf-c" x="5" y="9" width="36" height="10" rx="5"/><rect class="lf-card" x="9" y="19" width="28" height="17" rx="3"/><rect class="lf-c" x="13" y="5" width="4" height="9" rx="2"/><rect class="lf-c" x="29" y="5" width="4" height="9" rx="2"/><text class="lf-c" x="23" y="32" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="11">1971</text></svg>',
    space: '<svg viewBox="0 0 46 46" aria-hidden="true"><circle class="lf-c" cx="23" cy="23" r="12"/><ellipse class="ls-c" cx="23" cy="23" rx="21" ry="6.5" fill="none" stroke-width="3" transform="rotate(-20 23 23)"/><circle class="ls-card" cx="23" cy="23" r="12" fill="none" stroke-width="1.5" opacity=".35"/><circle class="lf-c" cx="38" cy="8" r="2"/><circle class="lf-c" cx="7" cy="37" r="1.6"/></svg>',
    lost: '<svg viewBox="0 0 120 84" aria-hidden="true"><rect class="lf-c" x="10" y="44" width="100" height="8" rx="4" opacity=".2"/><rect class="ls-c" x="40" y="26" width="40" height="40" rx="10" fill="none" stroke-width="3" stroke-dasharray="7 5" opacity=".5"/><text class="lf-c" x="60" y="56" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="26">?</text></svg>',
    signal: '<svg viewBox="0 0 120 84" aria-hidden="true"><g class="lf-c"><rect x="34" y="52" width="10" height="16" rx="3"/><rect x="50" y="40" width="10" height="28" rx="3" opacity=".55"/><rect x="66" y="28" width="10" height="40" rx="3" opacity=".3"/><rect x="82" y="16" width="10" height="52" rx="3" opacity=".15"/></g></svg>',
    done: '<svg viewBox="0 0 120 84" aria-hidden="true"><rect class="lf-c" x="20" y="48" width="24" height="26" rx="5" opacity=".5"/><rect class="lf-c" x="48" y="30" width="24" height="44" rx="5"/><rect class="lf-c" x="76" y="56" width="24" height="18" rx="5" opacity=".3"/></svg>'
  };
  var STEP_MINUS = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
  var STEP_PLUS = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10M10 5v10" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
  /* the rules as three pictures: guess, pick a net, catch it */
  var meshN = 0;
  function rulesHtml() {
    var id = "m" + (++meshN);
    var mesh = function (c, o) { return '<pattern id="' + id + c + '" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H7M0 0V7" class="ls-c" stroke-width="1.5" opacity=".55"/></pattern>'; };
    var a = '<svg viewBox="0 0 120 70" aria-hidden="true"><rect class="lf-c" x="8" y="30" width="104" height="6" rx="3" opacity=".22"/><rect class="lf-c" x="66" y="12" width="3" height="42" rx="1.5"/><circle class="lf-c ls-card" cx="67.5" cy="57" r="8" stroke-width="2.5"/><text class="lf-c" x="67.5" y="9" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="11">1971</text></svg>';
    var b = '<svg viewBox="0 0 120 70" aria-hidden="true"><defs>' + mesh("A", "#470BA8") + '</defs><g class="ls-c" stroke-width="2"><rect x="57" y="6" width="9" height="15" rx="4" fill="url(#' + id + 'A)"/><rect x="45" y="26" width="33" height="15" rx="5" fill="url(#' + id + 'A)"/><rect x="22" y="46" width="78" height="15" rx="5" fill="url(#' + id + 'A)"/></g><rect class="lf-c" x="60.5" y="2" width="2" height="64" rx="1"/></svg>';
    var c = '<svg viewBox="0 0 120 70" aria-hidden="true"><defs>' + mesh("B", "#470BA8") + '</defs><rect class="lf-c" x="8" y="40" width="104" height="6" rx="3" opacity=".22"/><rect class="ls-c" x="40" y="22" width="40" height="30" rx="8" fill="url(#' + id + 'B)" stroke-width="2.4"/><rect class="lf-ink" x="58" y="12" width="4" height="48" rx="2"/><rect class="lf-c" x="86" y="4" width="28" height="18" rx="9"/><text class="lf-onc" x="100" y="17" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="12">+5</text></svg>';
    return '<div class="live-rule">' + a + '<b><i>1</i>Guess</b></div><div class="live-rule">' + b + '<b><i>2</i>Pick a net</b></div><div class="live-rule">' + c + '<b><i>3</i>Catch it</b></div>';
  }
  function pointsHtml() {
    return ["s", "m", "b"].map(function (n) {
      return '<div class="live-pt">' + netIcon(n) + '<b>' + NET_WORD[n] + '</b><span>' + R.POINTS[n][0] + " if it catches</span><span>" + R.POINTS[n][1] + " if not</span></div>";
    }).join("");
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-rules]"), function (e) { e.innerHTML = rulesHtml(); });
  Array.prototype.forEach.call(document.querySelectorAll("[data-points]"), function (e) { e.innerHTML = pointsHtml(); });

  TO.wireDialogs();
  TO.fixLocalLinks();

  /* ================================================================ views */
  var VIEWS = ["v-home", "v-setup", "v-join", "v-note", "v-game"];
  function show(id) {
    VIEWS.forEach(function (v) { $(v).hidden = v !== id; });
    if (id !== "v-game") { hostStrip(null); document.body.classList.remove("live-big"); }
    window.scrollTo(0, 0);
  }
  var netnote = $("netnote");
  function netNote(t) { netnote.textContent = t || ""; netnote.hidden = !t; }

  /* a note instead of a game: no such code, no signal, an old page, removed, over */
  function note(art, h, p, btns, hooks) {
    stopGame();
    $("n-art").innerHTML = ICON[art] || "";
    $("n-h").textContent = h;
    $("n-p").textContent = p || "";
    $("n-p").hidden = !p;
    var box = $("n-btns");
    box.innerHTML = "";
    (btns || []).forEach(function (b) {
      var e = document.createElement(b.href ? "a" : "button");
      e.className = "btn " + (b.solid ? "solid" : "ghost");
      e.textContent = b.text;
      if (b.href) e.href = b.href; else { e.type = "button"; e.addEventListener("click", b.go); }
      box.appendChild(e);
    });
    $("n-after").innerHTML = "";
    show("v-note");
    if (hooks) onwardInto($("n-after"));
  }

  /* the way on to today's daily games: the site's own block, the same as at the end of every daily game */
  function onwardInto(box) {
    var after = $("after");
    after.innerHTML = "";
    try { TO.onward({ game: "how-sure", wait: 1600 }); } catch (e) { /* the way on must never break a game */ }
    var b = $("onward");
    if (b && box !== after) box.appendChild(b);
    if (app.role === "host") dropBar();
  }
  function dropBar() {
    var bar = $("onbar");
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    document.body.classList.remove("onbar-room");
  }

  /* ================================================================ the section's own page */
  var joinform = $("joinform"), joincode = $("joincode");
  joincode.addEventListener("input", function () {
    var v = joincode.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
    if (v !== joincode.value) joincode.value = v;
  });
  joinform.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = joincode.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (v.length !== 5) { $("joinhint").textContent = "A code has five letters."; joincode.focus(); return; }
    window.location.hash = v;
  });
  function showHome() {
    document.title = "How Sure? Play live | Logicers";
    show("v-home");
  }

  /* ================================================================ the host's setup */
  var setup = Object.assign({ set: (SETS[0] || {}).id, play: window.innerWidth < 760, name: "", timer: 0, practice: true,
                              n: 10, shuffle: false, picked: false, teams: false, standings: true, awards: true }, sget("setup") || {});
  if (!SETS.some(function (s) { return s.id === setup.set; })) setup.set = (SETS[0] || {}).id;
  function seg(id, value, onPick) {
    var box = $(id);
    box.innerHTML = box.innerHTML;          // drop old listeners
    Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) {
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(b.getAttribute("data-v") === String(value)));
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
        onPick(b.getAttribute("data-v"));
      });
    });
  }
  function drawSetup() {
    var sets = $("sets");
    sets.innerHTML = SETS.map(function (s) {
      return '<button class="hs-set" type="button" role="radio" aria-checked="' + (s.id === setup.set) + '" data-set="' + esc(s.id) + '">' +
        (ICON[s.id] || ICON.space) + '<span class="hs-set-t"><b>' + esc(s.title) + '</b><small>' + esc(s.line) + '</small></span></button>';
    }).join("");
    Array.prototype.forEach.call(sets.querySelectorAll(".hs-set"), function (b) {
      b.addEventListener("click", function () {
        setup.set = b.getAttribute("data-set");
        Array.prototype.forEach.call(sets.querySelectorAll(".hs-set"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
      });
    });
    $("s-play").checked = !!setup.play;
    $("s-namerow").hidden = !setup.play;
    $("s-name").value = setup.name || "";
    $("s-practice").checked = !!setup.practice;
    $("s-standings").checked = !!setup.standings;
    $("s-awards").checked = !!setup.awards;
    seg("s-timer", setup.timer, function (v) { setup.timer = +v; });
    seg("s-n", setup.n, function (v) { setup.n = +v; });
    seg("s-order", setup.shuffle ? 1 : 0, function (v) { setup.shuffle = v === "1"; });
    seg("s-names", setup.picked ? 1 : 0, function (v) { setup.picked = v === "1"; });
    seg("s-teams", setup.teams ? 1 : 0, function (v) { setup.teams = v === "1"; });
    $("setup-err").hidden = true;
  }
  $("s-play").addEventListener("change", function () { setup.play = this.checked; $("s-namerow").hidden = !setup.play; if (setup.play) $("s-name").focus(); });
  $("s-practice").addEventListener("change", function () { setup.practice = this.checked; });
  $("s-standings").addEventListener("change", function () { setup.standings = this.checked; });
  $("s-awards").addEventListener("change", function () { setup.awards = this.checked; });
  function setupErr(t) { var e = $("setup-err"); e.textContent = t; e.hidden = !t; }
  var opening = false;
  $("open-game").addEventListener("click", function () {
    if (opening) return;
    setup.name = $("s-name").value.replace(/\s+/g, " ").trim();
    if (setup.play && !setup.name && !setup.picked) { setupErr("Type your name, or switch off “I'm playing too”."); $("s-name").focus(); return; }
    sset("setup", setup);
    opening = true;
    var btn = this;
    btn.disabled = true;
    setupErr("");
    var settings = { set: setup.set, n: setup.n, shuffle: setup.shuffle, timer: setup.timer, teams: setup.teams, picked: setup.picked,
                     practice: setup.practice, standings: setup.standings, awards: setup.awards };
    window.fetch(SERVER + "/new", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ v: PROTO, settings: settings }) })
      .then(function (res) { return res.json().then(function (b) { return { status: res.status, b: b }; }); })
      .then(function (r) {
        opening = false;
        btn.disabled = false;
        if (r.status === 200 && r.b.code && r.b.key) {
          sset("host:" + r.b.code, { key: r.b.key, play: !!setup.play, name: setup.name, pkey: setup.play ? randomKey() : null, pass: r.b.pass || null, t: now() });
          TO.count("live/hosted");
          window.location.hash = r.b.code;
          return;
        }
        if (r.b && r.b.e === "old") setupErr("Logicers has just been updated. Reload this page.");
        else if (r.status === 429) setupErr("Too many games from here just now. Try again later.");
        else setupErr("The game server is not ready. Try again in a minute.");
      }, function () {
        opening = false;
        btn.disabled = false;
        setupErr("Can't reach the game server. Check the signal. Some Wi-Fi networks block live games: try mobile data.");
      });
  });
  function showSetup() {
    document.title = "Host How Sure? | Logicers";
    drawSetup();
    show("v-setup");
  }

  /* ================================================================ a game: the connection */
  var app = { code: "", role: "", key: "", pkey: null, pass: null, playing: false, name: "", state: null, screen: "", ws: null,
              tries: 0, timer: null, beat: null, lastMsg: 0, stopped: true, everConnected: false, joining: false,
              q: null, info: null, finishedRound: 0, sentAt: 0, whoK: "" };

  function stopGame() {
    app.stopped = true;
    clearTimeout(app.timer);
    clearInterval(app.beat);
    clearInterval(app.tick);
    if (app.ws) { var w = app.ws; app.ws = null; try { w.close(); } catch (e) { /* gone */ } }
    netNote("");
    releaseWake();
    hostStrip(null);
    var c = $("codechip");
    c.hidden = true;
  }

  function openGame(code) {
    if (app.code === code && !app.stopped) return;
    stopGame();
    app = Object.assign(app, { code: code, state: null, screen: "", tries: 0, stopped: false, everConnected: false, joining: false, q: null, info: null });
    var h = sget("host:" + code);
    if (h && h.key) {
      app.role = "host"; app.key = h.key; app.pkey = h.pkey || null; app.pass = h.pass || null; app.playing = !!h.play; app.name = h.name || "";
      $("v-game").innerHTML = "";
      show("v-game");
      peek(code);
    } else {
      var p = sget("p:" + code);
      if (!p || !p.key) { p = { key: randomKey(), t: now() }; sset("p:" + code, p); }
      app.role = "player"; app.key = p.key; app.pkey = null; app.pass = p.pass || null; app.playing = true; app.name = "";
      joinView();
      peek(code);
    }
    var c = $("codechip");
    c.textContent = code;
    c.hidden = false;
    document.title = "How Sure? · " + code + " | Logicers";
  }

  function peek(code) {
    window.fetch(SERVER + "/game/" + code).then(function (res) {
      if (res.status === 404 && app.role === "host") {
        forget();
        note("done", "This game is over", "", [{ text: "Host a game", solid: true, href: "#host" }], true);
        return null;
      }
      if (res.status === 404) {
        note("lost", "No game with this code", "Check the letters on the host's screen.", [
          { text: "Type it again", solid: true, href: "./" }, { text: "Host a game", href: "#host" }]);
        sdel("p:" + code);
        return null;
      }
      if (res.status === 429) {
        if (app.pass) { connect(); return null; }      // braked, but this browser is in the game: its pass gets it back in
        note("lost", "Too many tries", "Wait a little, then try again.", [{ text: "Back", href: "./" }]);
        return null;
      }
      return res.json();
    }).then(function (info) {
      if (!info || app.code !== code) return;
      app.info = info;
      if (app.role === "player") joinInfo();
      connect();
    }, function () {
      if (app.code !== code) return;
      unreachable();
    });
  }

  function unreachable() {
    note("signal", "Can't reach the game", "Check the signal. Some Wi-Fi networks, such as a university's, block live games: try mobile data.", [
      { text: "Try again", solid: true, go: function () { var c = app.code; app.code = ""; openGame(c); } }]);
  }

  function wsUrl() { return SERVER.replace(/^http/, "ws") + "/ws/" + app.code; }
  /* "lv1", and once this browser is in the game, its pass ("p.<pass>"): the server's brake on guessing
     codes then never stops it coming back, even when the whole campus behind one address is braked */
  function protocols() { return app.pass ? ["lv1", "p." + app.pass] : ["lv1"]; }
  function connect() {
    if (app.stopped) return;
    clearTimeout(app.timer);
    var ws;
    try { ws = new WebSocket(wsUrl(), protocols()); } catch (e) { retry(); return; }
    app.ws = ws;
    ws.onopen = function () {
      if (app.ws !== ws) return;
      app.tries = 0;
      app.everConnected = true;
      app.lastMsg = now();
      netNote("");
      hello();
      clearInterval(app.beat);
      app.beat = setInterval(function () {
        if (app.ws !== ws || ws.readyState !== 1) return;
        if (now() - app.lastMsg > 70000) { try { ws.close(); } catch (e) { /* gone */ } return; }
        try { ws.send('{"t":"ping"}'); } catch (e) { /* the close handler follows */ }
      }, 25000);
    };
    ws.onmessage = function (e) {
      if (app.ws !== ws) return;
      app.lastMsg = now();
      var m;
      try { m = JSON.parse(e.data); } catch (x) { return; }
      if (m && m.t) onMsg(m);
    };
    ws.onclose = function (e) {
      if (app.ws !== ws) return;
      app.ws = null;
      clearInterval(app.beat);
      if (e && e.code === 4003) { elsewhere(); return; }      // this player came in on another screen: never fight it
      if (!app.stopped) retry();
    };
  }
  /* The server keeps one screen per player: the newest. This one stays quiet until asked back. */
  function elsewhere() {
    var c = app.code;
    note("signal", "This game is open on another screen", "", [
      { text: "Play here", solid: true, go: function () { app.code = ""; openGame(c); } }]);
  }
  function retry() {
    if (app.stopped) return;
    app.tries++;
    if (!app.everConnected && app.tries >= 4) { unreachable(); return; }
    if (app.tries >= 2) netNote(app.tries >= 6 ? "No connection. Still trying…" : "Reconnecting…");
    clearTimeout(app.timer);
    app.timer = setTimeout(connect, Math.min(8000, 400 * Math.pow(2, app.tries)));
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible" || app.stopped) return;
    if (!app.ws || app.ws.readyState > 1) { app.tries = 0; connect(); }
    if (app.role === "host") wake();
  });
  function send(o) {
    if (!app.ws || app.ws.readyState !== 1) return false;
    try { app.ws.send(JSON.stringify(o)); return true; } catch (e) { return false; }
  }
  function hello() {
    var m = { t: "hello", v: PROTO, role: app.role, key: app.key };
    if (app.role === "host" && app.pkey) m.pkey = app.pkey;
    var p = sget("ans:" + app.code);
    if (p && p.k) m.ans = { k: p.k, g: p.g, n: p.n };
    send(m);
  }

  /* the host's screen stays awake */
  var lock = null;
  function wake() {
    try {
      if (!lock && window.navigator.wakeLock && document.visibilityState === "visible") {
        window.navigator.wakeLock.request("screen").then(function (l) { lock = l; l.addEventListener("release", function () { lock = null; }); }, function () { /* not allowed: fine */ });
      }
    } catch (e) { /* an old browser */ }
  }
  function releaseWake() { try { if (lock) lock.release(); } catch (e) { /* gone */ } lock = null; }

  /* ================================================================ messages */
  function onMsg(m) {
    var s = app.state;
    switch (m.t) {
      case "state":
        if (m.v !== PROTO) { oldPage(m.v); return; }
        app.state = m;
        if (m.pass && m.pass !== app.pass) keepPass(m.pass);
        if (app.role === "host" && app.playing && !m.you && !app.joining) {
          app.joining = true;
          send(app.name ? { t: "join", name: app.name } : { t: "join", pick: true });
        }
        if (app.role === "player" && !m.you) { app.info = { title: m.g.title, np: m.np, ph: m.ph, closed: m.g.closed, teams: m.g.teams, picked: m.g.picked }; joinInfo(); return; }
        if (m.ph === "question" && app.q && app.q.final && m.q && m.q.k === app.q.k &&
            !(m.you && m.you.ans && m.you.ans.g === app.q.g && m.you.ans.n === app.q.n)) sendSoon(250);   // an answer the server does not have yet
        if (m.you && app.role === "player") {
          var rec = sget("p:" + app.code) || { key: app.key };
          if (!rec.joined) { rec.joined = 1; rec.t = now(); sset("p:" + app.code, rec); TO.count("live/joined"); }
        }
        render();
        return;
      case "lobby":
        if (!s) return;
        s.np = m.np;
        if (s.ph === "lobby") { s.lobby = { names: m.names, ids: m.ids, hosts: m.hosts, more: m.more }; lobbyUpdate(); }
        countsUpdate();
        hostStrip(s);
        return;
      case "cnt":
        if (!s || !s.q || m.k !== s.q.k) return;
        s.cnt = { in: m.in, of: m.of };
        s.np = m.of;
        countsUpdate();
        hostStrip(s);
        return;
      case "got":
        if (!s || !s.q || m.k !== s.q.k) return;
        app.sent = { k: m.k, g: m.g, n: m.n, r: m.r };
        sset("ans:" + app.code, { k: m.k, g: m.g, n: m.n, t: now() });
        sentUpdate();
        return;
      case "players":
        playersList(m.ps);
        return;
      case "over":
        gameOver();
        return;
      case "err":
        onErr(m);
        return;
    }
  }
  function onErr(m) {
    if (m.e === "old") { oldPage(m.v); return; }
    if (m.e === "removed") {
      forget();
      note("lost", "The host took you out of this game", "", [{ text: "Back", href: "./" }], true);
      return;
    }
    if (m.e === "host") {                    // this browser's host key no longer fits: play as anyone would
      sdel("host:" + app.code);
      var c = app.code; app.code = ""; openGame(c);
      return;
    }
    if (m.e === "name") {
      /* the host's own name refused: the host plays under a picked one (the lobby marks it "(you)") */
      if (app.role === "host" && app.playing && !(app.state && app.state.you)) { send({ t: "join", pick: true }); return; }
      joinErr("Try another name.");
      return;
    }
    if (m.e === "closed") { joinErr("This game is closed to new players."); return; }
    if (m.e === "full") { joinErr("This game is full."); return; }
    if (m.e === "nobody") { hostSay("Wait for a player"); return; }
    if (m.e === "late" && app.state && app.state.q && m.k === app.state.q.k) { app.late = true; sentUpdate(); return; }
    if (m.e === "who") {                    // the server did not know this phone yet: send again, once per question
      if (app.q && app.whoK !== app.q.k) { app.whoK = app.q.k; sendSoon(600); }
      return;
    }
  }
  /* the pass this game gave this browser, kept with the game's record: a reload comes back with it too */
  function keepPass(pass) {
    app.pass = pass;
    var k = (app.role === "host" ? "host:" : "p:") + app.code, rec = sget(k);
    if (rec) { rec.pass = pass; sset(k, rec); }
  }
  function oldPage(v) {
    if (v && v > PROTO) note("signal", "Logicers has been updated", "Reload to play.", [{ text: "Reload", solid: true, go: function () { window.location.reload(); } }]);
    else note("signal", "The game server is updating", "Try again in a few minutes.", [{ text: "Try again", solid: true, go: function () { window.location.reload(); } }]);
  }
  function forget() {
    sdel("host:" + app.code);
    sdel("p:" + app.code);
    sdel("ans:" + app.code);
  }
  function gameOver() {
    var s = app.state;
    var hosting = app.role === "host";
    forget();
    stopGame();
    if (hosting && app.newGame) { app.newGame = false; app.code = ""; window.location.hash = "host"; return; }
    if (s && s.ph === "end" && !$("v-game").hidden) {
      var line = document.createElement("p");
      line.className = "live-small";
      line.style.textAlign = "center";
      line.textContent = "This game is over.";
      $("v-game").appendChild(line);
      return;
    }
    note("done", "This game is over", "", [{ text: "Host a game", solid: true, href: "#host" }], true);
  }

  /* ================================================================ joining (a player) */
  function joinView() {
    $("j-code").innerHTML = app.code.split("").map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("");
    $("j-game").innerHTML = '<b>How Sure?</b><small>…</small>';
    $("j-err").hidden = true;
    $("j-name").value = "";
    $("j-form").hidden = false;
    $("j-go-picked").hidden = true;
    show("v-join");
  }
  function joinInfo() {
    var i = app.info;
    if (!i || (app.state && app.state.you)) return;
    if ($("v-join").hidden) show("v-join");
    $("j-game").innerHTML = '<b>How Sure?</b><small>' + esc(i.title) + '<span class="live-gc-n">' + ICON.person + i.np + "</span></small>";
    $("j-namelabel").textContent = i.teams ? "Team name" : "Your name";
    $("j-name").placeholder = i.teams ? "Team" : "Name";
    $("j-form").hidden = !!i.picked;
    $("j-go-picked").hidden = !i.picked;
    $("j-meta").textContent = i.teams ? "Join with your team" : "Join a game";
    if (i.closed) joinErr("This game is closed to new players.");
  }
  function joinErr(t) {
    var e = $("j-err");
    e.textContent = t;
    e.hidden = !t;
    app.joinWait = false;
  }
  function join(o) {
    if (app.joinWait) return;
    joinErr("");
    if (!send(o)) { joinErr("Connecting… try again in a moment."); return; }
    app.joinWait = true;
    setTimeout(function () { app.joinWait = false; }, 4000);
  }
  $("j-go").addEventListener("click", function () {
    var n = $("j-name").value.replace(/\s+/g, " ").trim();
    if (!n) { joinErr(app.info && app.info.teams ? "Type your team's name." : "Type your name."); $("j-name").focus(); return; }
    join({ t: "join", name: n });
  });
  $("j-name").addEventListener("keydown", function (e) { if (e.key === "Enter") $("j-go").click(); });
  $("j-pick").addEventListener("click", function () { join({ t: "join", pick: true }); });
  $("j-go-picked").addEventListener("click", function () { join({ t: "join", pick: true }); });

  /* ================================================================ drawing the game */
  function isDisplay() { return app.role === "host" && !app.playing; }
  function isBig() { return isDisplay() && window.innerWidth >= 860; }
  var resizeT = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {         // only a change of look draws again: a slider in use is never reset
      if (app.state && !$("v-game").hidden && isBig() !== document.body.classList.contains("live-big")) { app.screen = ""; render(); }
    }, 200);
  });

  function render() {
    var s = app.state;
    if (!s || app.stopped) return;
    if ($("v-game").hidden) show("v-game");
    var big = isBig();
    document.body.classList.toggle("live-big", big);
    var key = [s.ph, s.q ? s.q.k : "", isDisplay() ? "d" : "p", s.you ? "y" : "n", big ? "B" : "", s.g.round].join("|");
    if (key !== app.screen) {
      app.screen = key;
      app.late = false;
      if (s.ph !== "end") { $("after").innerHTML = ""; dropBar(); }
      TO.closeDialog($("dlg-send"));      // a card left open belongs to the screen that has gone
      var v = $("v-game");
      if (s.ph === "lobby") v.innerHTML = (isDisplay() || app.role === "host") ? lobbyHost(s) : lobbyPlayer(s);
      else if (s.ph === "question") { v.innerHTML = isDisplay() ? questionDisplay(s) : questionPlayer(s); if (!isDisplay()) wireQuestion(s); timerStart(s); countsUpdate(); }
      else if (s.ph === "reveal") v.innerHTML = (s.you && !isDisplay()) ? revealPlayer(s) : revealDisplay(s);
      else if (s.ph === "standings") v.innerHTML = standings(s);
      else if (s.ph === "end") { v.innerHTML = (s.you && !isDisplay()) ? endPlayer(s) : endDisplay(s); endHooks(s); }
      if (s.ph === "lobby") { wireLobby(s); lobbyUpdate(); }
      if (s.ph !== "question") clearInterval(app.tick);
      window.scrollTo(0, 0);
    } else {
      lobbyUpdate();
      countsUpdate();
    }
    if (app.role === "host") {
      wake();
      if (s.ph === "end" && app.finishedRound !== s.g.round) {
        app.finishedRound = s.g.round;
        TO.count("live/finished");
        TO.count("live/size-" + (s.np < 10 ? "1-9" : s.np < 30 ? "10-29" : s.np < 100 ? "30-99" : "100-plus"));
      }
    }
    app.lastPh = s.ph;
    hostStrip(s);
  }

  function topLine(s, what) {
    var right = "";
    if (s.ph === "question") {
      right = '<span class="hs-count" id="q-count">' + ICON.person + "<span></span></span>";
      if (s.q.left) right += '<svg class="hs-timer" id="q-timer" viewBox="0 0 40 40" aria-hidden="true"><circle class="ls-tint" cx="20" cy="20" r="16" fill="none" stroke-width="5"/><circle class="ls-c" id="q-ring" cx="20" cy="20" r="16" fill="none" stroke-width="5" stroke-linecap="round" stroke-dasharray="100.5" transform="rotate(-90 20 20)"/><text class="lf-c" id="q-secs" x="20" y="24.5" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="12"></text></svg>';
    }
    return '<div class="hs-top"><p class="meta"><b>How Sure?</b> ' + what + '</p><span style="display:inline-flex;align-items:center;gap:10px">' + right + "</span></div>";
  }
  function qWhat(s) { return s.q.i === 0 ? "Practice" : "Question " + s.q.i + " of " + s.q.of; }

  /* ---- the lobby ---- */
  function joinUrl() {
    return LOCAL ? window.location.origin + window.location.pathname + "#" + app.code : "https://" + SITE + "/live/#" + app.code;
  }
  function qrSvg(text) {
    if (!QRG) return "";
    try {
      var q = QRG.QrCode.encodeText(text, QRG.QrCode.Ecc.MEDIUM), d = "", n = q.size;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (q.getModule(x, y)) d += "M" + (x + 2) + " " + (y + 2) + "h1v1h-1z";
      return '<svg viewBox="0 0 ' + (n + 4) + " " + (n + 4) + '" role="img" aria-label="QR code to join"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#15172B"/></svg>';
    } catch (e) { return ""; }
  }
  function codeBoxes() { return '<div class="live-codeshow">' + app.code.split("").map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("") + "</div>"; }
  function lobbyHost(s) {
    var players = '<div class="live-card"><p class="hs-players" id="l-count"></p><div class="hs-chips" id="l-chips"></div></div>';
    var send = '<div class="hs-send"><button class="btn ghost" type="button" id="l-send">' + ICON.share + "<span>Send the link</span></button></div>";
    if (isBig()) {
      return '<div class="hs-bigrow"><div>' +
        '<h1 class="live-title" style="margin-top:12px">How Sure?</h1><p class="live-tag">' + esc(s.g.title) + ' · Guess the number. Pick your net.</p>' +
        '<div class="live-rules">' + rulesHtml() + "</div>" +
        '<div class="live-card" style="margin-top:18px"><p class="hs-joinat">Join on your phone at</p><p class="hs-bigurl">' + SITE + '</p><p class="hs-joinat" style="margin-top:8px">with the code</p><p class="hs-bigcode">' + esc(app.code) + "</p></div>" +
        '</div><div><div class="live-card"><div class="hs-qr">' + qrSvg(joinUrl()) + "<p>Or scan<br>this code</p></div>" + send + "</div>" + players + "</div></div>";
    }
    return topLine(s, esc(s.g.title)) +
      '<div class="live-card" style="text-align:center"><p class="hs-joinat">Join at <b>' + SITE + "</b> with the code</p>" + codeBoxes() +
      '<div class="hs-qr">' + qrSvg(joinUrl()) + "<p>Or scan<br>this code</p></div>" + send + "</div>" + players +
      (s.you ? "" : '<div class="live-card"><div class="live-rules" style="margin-top:0">' + rulesHtml() + "</div></div>");
  }
  function lobbyPlayer(s) {
    return topLine(s, esc(s.g.title)) +
      '<div class="live-card"><div class="hs-in">' + ICON.youIn + '<div><b>You\'re in!</b><span>' + esc(s.you ? s.you.name : "") + "</span></div></div>" +
      '<div class="live-rules">' + rulesHtml() + "</div>" +
      '<div class="hs-waiting"><span>Waiting for the host <span class="hs-dots"><i></i><i></i><i></i></span></span><span class="hs-count">' + ICON.person + '<span id="l-np"></span></span></div></div>' +
      '<div class="live-card"><div class="hs-chips" id="l-chips"></div></div>';
  }
  function wireLobby() {
    var b = $("l-send");
    if (b) b.addEventListener("click", function () {
      var url = joinUrl();
      var nav = window.navigator;
      if (nav.share) {
        nav.share({ title: "How Sure?", text: "Play How Sure? with us: code " + app.code, url: url }).then(function () {}, function () {});
      } else {
        TO.copyText(url).then(function () { b.querySelector("span").textContent = "Link copied"; setTimeout(function () { b.querySelector("span").textContent = "Send the link"; }, 2200); });
      }
    });
  }
  function lobbyUpdate() {
    var s = app.state;
    if (!s || s.ph !== "lobby" || !s.lobby) return;
    var chips = $("l-chips");
    if (chips) {
      var me = s.you ? s.you.name : null;
      chips.innerHTML = s.lobby.names.map(function (n) { return '<span' + (n === me ? ' class="me"' : "") + ">" + esc(n) + (n === me ? " (you)" : "") + "</span>"; }).join("") +
        (s.lobby.more ? '<span class="more">+' + s.lobby.more + "</span>" : "") +
        (s.np ? "" : '<p class="hs-empty">Nobody yet. Share the code.</p>');
    }
    var c = $("l-count");
    if (c) c.textContent = s.np + (s.np === 1 ? " player in" : " players in");
    var np = $("l-np");
    if (np) np.textContent = s.np;
  }

  /* ---- a question, on a phone ---- */
  function scaleNetHtml() {
    return '<div class="hs-track"></div><div class="hs-netwrap"><div class="hs-net" id="q-net"></div></div><div class="hs-needle" id="q-needle"></div><div class="hs-handle" id="q-handle"></div>';
  }
  function questionPlayer(s) {
    var q = s.q;
    return topLine(s, qWhat(s)) +
      '<div class="live-card">' + (q.i === 0 ? '<span class="hs-practice">Practice · no points</span>' : "") +
      '<p class="hs-q" id="q-text">' + esc(q.t) + "</p>" +
      '<div class="hs-guess untouched" id="q-guess"><button class="hs-step" type="button" data-d="-1" aria-label="Less">' + STEP_MINUS + '</button><b id="q-val"></b><button class="hs-step" type="button" data-d="1" aria-label="More">' + STEP_PLUS + '</button></div>' +
      '<div class="hs-scale untouched" id="q-scale" role="slider" tabindex="0" aria-label="Your guess" aria-valuemin="' + q.lo + '" aria-valuemax="' + q.hi + '">' + scaleNetHtml() + "</div>" +
      '<div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(fmt(q, q.hi)) + "</span></div>" +
      '<div class="hs-netsrow" role="radiogroup" aria-label="Your net">' +
      ["s", "m", "b"].map(function (n) {
        return '<button class="hs-netbtn" type="button" role="radio" data-n="' + n + '" aria-checked="false">' + netIcon(n) + "<b>" + NET_WORD[n] + "</b><span>" + R.POINTS[n][0] + " or " + R.POINTS[n][1] + "</span></button>";
      }).join("") + "</div>" +
      '<button class="btn solid hs-sendbtn" type="button" id="q-send" disabled>Send</button>' +
      '<p class="hs-status" id="q-status"></p></div>';
  }
  /* A guess goes to the server only when the player says so: Send, then the card in the middle (Send or
     Edit). A sent answer is final, so the host's count means "answered" (Khayyam, 14 Oct 2026). Only when a
     timer runs out does a guess that was moved but not sent go by itself, as it stands. */
  function wireQuestion(s) {
    var q = s.q;
    app.q = { q: q, k: q.k, g: R.round(q, R.val(q, 0.5)), n: "m", touched: false, final: false, sendT: null };
    app.sent = null;
    TO.closeDialog($("dlg-send"));
    var mine = s.you && s.you.ans;
    var kept = sget("ans:" + app.code);
    if (mine) { app.q.g = mine.g; app.q.n = mine.n; app.q.touched = true; app.q.final = true; app.sent = { k: q.k, g: mine.g, n: mine.n, r: mine.r }; }
    else if (kept && kept.k === q.k) { app.q.g = kept.g; app.q.n = kept.n; app.q.touched = true; app.q.final = true; sendSoon(250); }   // sent, and lost on the way
    if (!kept || kept.k !== q.k) sdel("ans:" + app.code);
    var scale = $("q-scale");
    var dragging = false;
    function fromX(x) {
      var r = scale.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (x - r.left) / r.width));
      setGuess(R.round(q, R.val(q, p)));
    }
    scale.addEventListener("pointerdown", function (e) {
      if (frozen()) return;
      dragging = true;
      try { scale.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
      fromX(e.clientX);
    });
    scale.addEventListener("pointermove", function (e) { if (dragging) fromX(e.clientX); });
    function up() { if (!dragging) return; dragging = false; }
    scale.addEventListener("pointerup", up);
    scale.addEventListener("pointercancel", up);
    scale.addEventListener("keydown", function (e) {
      if (frozen()) return;
      var g = app.q.g, k = e.key;
      if (k === "ArrowLeft" || k === "ArrowDown") g = R.nudge(q, g, -1);
      else if (k === "ArrowRight" || k === "ArrowUp") g = R.nudge(q, g, 1);
      else if (k === "PageDown") g = R.round(q, R.val(q, Math.max(0, R.pos(q, g) - 0.1)));
      else if (k === "PageUp") g = R.round(q, R.val(q, Math.min(1, R.pos(q, g) + 0.1)));
      else if (k === "Home") g = q.lo;
      else if (k === "End") g = q.hi;
      else return;
      e.preventDefault();
      setGuess(g);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".hs-step"), function (b) {
      b.addEventListener("click", function () {
        if (frozen()) return;
        setGuess(R.nudge(q, app.q.g, +b.getAttribute("data-d")));
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".hs-netbtn"), function (b) {
      b.addEventListener("click", function () {
        if (frozen()) return;
        app.q.n = b.getAttribute("data-n");
        app.q.touched = true;
        drawGuess();
      });
    });
    $("q-send").addEventListener("click", function () { if (!frozen() && app.q.touched) sendCard(); });
    drawGuess();
    countsUpdate();
    sentUpdate();
  }
  /* closed: the question takes no more answers. frozen: this phone's answer can no longer change */
  function closed() { return !app.q || app.late || (app.deadline && now() > app.deadline); }
  function frozen() { return closed() || app.q.final; }
  function setGuess(g) {
    app.q.g = g;
    app.q.touched = true;
    drawGuess();
  }
  /* the card in the middle: the answer as it will go, Send or Edit */
  function sendCard() {
    var a = app.q, q = a.q, r = R.net(q, a.g, a.n);
    $("send-ans").innerHTML = '<b class="hs-confirm-val">' + esc(fmt(q, a.g)) + (q.u ? "<small>" + esc(q.u) + "</small>" : "") + "</b>" +
      '<span class="hs-confirm-net">' + netIcon(a.n) + "<b>" + NET_WORD[a.n] + "</b> " + esc(fmt(q, r[0])) + " to " + esc(withUnit(q, r[1])) + "</span>";
    TO.openDialog($("dlg-send"));
    $("send-go").focus();
  }
  $("send-edit").addEventListener("click", function () { TO.closeDialog($("dlg-send")); });
  $("send-go").addEventListener("click", function () { TO.closeDialog($("dlg-send")); sendFinal(); });
  function sendFinal() {
    var a = app.q;
    if (!a || a.final || closed()) return;
    a.final = true;
    drawGuess();
    sendSoon(0);
  }
  function drawGuess() {
    var a = app.q, q = a.q;
    if (!$("q-val")) return;
    var r = R.net(q, a.g, a.n), p = R.pos(q, a.g) * 100;
    $("q-val").innerHTML = esc(fmt(q, a.g)) + (q.u ? "<small>" + esc(q.u) + "</small>" : "");
    $("q-guess").classList.toggle("untouched", !a.touched);
    var scale = $("q-scale");
    scale.classList.toggle("untouched", !a.touched);
    scale.setAttribute("aria-valuenow", a.g);
    scale.setAttribute("aria-valuetext", withUnit(q, a.g));
    $("q-needle").style.left = p + "%";
    $("q-handle").style.left = p + "%";
    var net = $("q-net"), l = R.pos(q, r[0]) * 100, w = R.pos(q, r[1]) * 100 - l;
    net.style.left = l + "%";
    net.style.width = Math.max(w, 0.8) + "%";
    Array.prototype.forEach.call(document.querySelectorAll(".hs-netbtn"), function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-n") === a.n)); });
    var sb = $("q-send");
    if (sb) { sb.disabled = !a.touched || frozen(); sb.hidden = a.final; }
    var card = scale.closest(".live-card");
    if (card) card.classList.toggle("hs-locked", a.final);
    sentUpdate();
  }
  function sendSoon(ms) {
    var a = app.q;
    if (!a) return;
    clearTimeout(a.sendT);
    /* answers go at least 0.4 s apart, the last one winning: the server ignores a connection's 31st
       message in 10 seconds, so a thumb tapping the nets must never cost the answer it ends on */
    var wait = Math.max(ms, app.sentAt + 400 - now());
    a.sendT = setTimeout(function () {
      if (!app.q || app.q !== a || !a.final || closed()) return;
      var msg = { t: "ans", k: a.k, g: a.g, n: a.n };
      sset("ans:" + app.code, { k: a.k, g: a.g, n: a.n, t: now() });     // kept, so a phone that drops sends it again
      if (!send(msg)) { app.sent = null; sentUpdate("wait"); return; }
      app.sentAt = now();
      sentUpdate("sending");
    }, wait);
  }
  function sentUpdate(how) {
    var st = $("q-status");
    if (!st || !app.q) return;
    var a = app.q, s = app.sent, q = a.q;
    if (s && s.k === a.k && s.g === a.g && s.n === a.n) {
      st.innerHTML = '<span class="ok">' + ICON.check + "Sent</span><span class=\"hs-range\">" + esc(fmt(q, s.r[0])) + " to " + esc(withUnit(q, s.r[1])) + "</span>";
      return;
    }
    if (app.late || (app.deadline && now() > app.deadline)) { st.innerHTML = "Time's up"; return; }
    if (a.final) { st.textContent = how === "wait" ? "Connecting… your answer goes when it can." : "Sending…"; return; }
    st.textContent = a.touched ? "" : "Slide to guess";
  }
  function countsUpdate() {
    var s = app.state;
    if (!s || s.ph !== "question" || !s.cnt) return;
    var c = $("q-count");
    if (c) c.querySelector("span").textContent = s.cnt.in + "/" + s.cnt.of;
    var big = $("q-bigcount");
    if (big) big.textContent = s.cnt.in + " of " + s.cnt.of;
    var dots = $("q-dots");
    if (dots) {
      var n = Math.min(s.cnt.of, 60), on = Math.round(n * (s.cnt.of ? s.cnt.in / s.cnt.of : 0)), h = "";
      for (var i = 0; i < n; i++) h += i < on ? "<i></i>" : '<i class="wait"></i>';
      dots.innerHTML = h;
    }
  }
  function timerStart(s) {
    clearInterval(app.tick);
    app.deadline = s.q.left ? now() + s.q.left : 0;
    if (!app.deadline) return;
    function tick() {
      var left = Math.max(0, app.deadline - now()), total = (s.g.timer || 60) * 1000;
      var ring = $("q-ring"), secs = $("q-secs");
      if (ring) ring.setAttribute("stroke-dashoffset", String(100.5 * (1 - left / total)));
      if (secs) secs.textContent = String(Math.ceil(left / 1000));
      /* the time is nearly up: a guess that was moved and never sent goes as it stands (the server allows
         a moment past the end for answers in flight) */
      if (left <= 1200 && app.q && app.q.k === s.q.k && app.q.touched && !app.q.final) { TO.closeDialog($("dlg-send")); sendFinal(); }
      if (left <= 0) { clearInterval(app.tick); sentUpdate(); if (app.q && $("q-val")) drawGuess(); }
    }
    tick();
    app.tick = setInterval(tick, 250);
  }

  /* ---- a question, on the host's screen when the host is not playing ---- */
  function questionDisplay(s) {
    var q = s.q;
    return topLine(s, qWhat(s)) +
      '<div class="live-card">' + (q.i === 0 ? '<span class="hs-practice">Practice · no points</span>' : "") +
      '<p class="hs-q">' + esc(q.t) + "</p>" +
      '<div class="hs-bigscale"><div class="hs-track"></div></div><div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(q.u ? fmt(q, q.hi) + " " + q.u : fmt(q, q.hi)) + "</span></div></div>" +
      '<div class="live-card"><p class="hs-bigcount" id="q-bigcount"></p><p class="live-small" style="margin-top:2px">answered · nets stay hidden until the reveal</p><div class="hs-dotsrow" id="q-dots"></div></div>';
  }

  /* ---- the reveal ---- */
  function netBox(q, r, cls, extra) {
    var l = R.pos(q, r[0]) * 100, w = Math.max(R.pos(q, r[1]) * 100 - l, 0.6);
    return '<div class="hs-net ' + cls + '" style="left:' + l.toFixed(2) + "%;width:" + w.toFixed(2) + '%"' + (extra || "") + "></div>";
  }
  function rvPicture(s) {
    var q = s.q, rv = s.rv, at = R.pos(q, rv.a);
    var named = rv.nets && rv.nets.some(function (x) { return x.length > 4; });
    var h = '<div class="hs-rv' + (named ? " named" : "") + '" style="--at:' + at.toFixed(4) + '">';
    h += '<div class="hs-tagrow"><span class="hs-tag" style="left:' + (at * 100).toFixed(2) + '%">' + esc(fmt(q, rv.a)) + "</span></div>";
    h += '<div class="hs-rows">';
    if (rv.nets) {
      if (!rv.nets.length) h += '<p class="live-small" style="color:inherit;opacity:.85;margin:6px 0">No nets this time.</p>';
      rv.nets.forEach(function (x, i) {
        var mine = s.you && s.you.ri === i;
        h += '<div class="hs-row' + (mine ? " you" : "") + '"><span class="hs-nm">' + (named ? (mine ? "You" : esc(x[4])) : "") + '</span><div class="hs-sc">' + netBox(q, [x[0], x[1]], x[2] ? "hit" : "out") + "</div></div>";
      });
    } else if (rv.dens) {
      var mx = Math.max(1, Math.max.apply(null, rv.dens.h.concat(rv.dens.x)));
      var strip = function (arr, cls) { return '<div class="hs-dens ' + cls + '">' + arr.map(function (v) { return '<i style="opacity:' + (v ? (0.12 + 0.88 * v / mx).toFixed(2) : 0) + '"></i>'; }).join("") + "</div>"; };
      if (s.you && s.you.res) h += '<div class="hs-mine">' + netBox(q, s.you.res.r, s.you.res.hit ? "hit" : "out") + "</div>";
      h += strip(rv.dens.h, "hit") + strip(rv.dens.x, "out");
    }
    h += '<div class="hs-line"></div></div>';
    h += '<div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(fmt(q, q.hi)) + "</span></div>";
    if (rv.dens) h += '<div class="hs-denslabel"><span>' + (s.you && s.you.res ? "Top: your net" : "") + '</span><span><i class="hs-sw hit"></i>caught <i class="hs-sw out"></i>missed</span></div>';
    h += "</div>";
    return h;
  }
  function byChips(rv) {
    return '<div class="hs-by">' + ["s", "m", "b"].map(function (n) {
      return '<span title="' + NET_WORD[n] + ' nets that caught it">' + netIcon(n) + rv.by[n][0] + "/" + rv.by[n][1] + "</span>";
    }).join("") + "</div>";
  }
  function factCard(rv) {
    var src = (rv.s || []).map(function (x) {
      var url = String(x[1] || "");
      return /^https:\/\//.test(url) ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(x[0]) + "</a>" : esc(x[0]);
    }).join(" · ");
    return '<div class="hs-fact">' + esc(rv.f) + '<p class="hs-src">Sources: ' + src + "</p></div>";
  }
  function youBar(s) {
    var y = s.you;
    if (!y || y.place === undefined) return "";
    return '<div class="hs-you"><span>Points <b>' + y.pts + "</b></span><span>Place <b>" + placeText(y) + "</b> of " + y.of + "</span></div>";
  }
  function revealPlayer(s) {
    var q = s.q, rv = s.rv, r = s.you.res, head;
    if (!r) head = '<span class="hs-big">No answer</span>';
    else if (r.hit) head = '<span class="hs-big">Caught!</span><span class="hs-chip white">' + (rv.practice ? "Practice" : "+" + r.pts) + "</span>";
    else head = '<span class="hs-big">Missed</span><span class="hs-chip yellow">' + (rv.practice ? "Practice" : "+" + r.pts) + "</span>";
    return topLine(s, qWhat(s)) +
      '<section class="hs-panel"><div class="hs-head">' + head + '</div><p class="hs-answer">' + esc(q.t) + " <b>" + esc(withUnit(q, rv.a)) + "</b></p>" +
      rvPicture(s) + byChips(rv) + "</section>" + factCard(rv) + (rv.practice ? "" : youBar(s));
  }
  function revealDisplay(s) {
    var q = s.q, rv = s.rv;
    var pic = '<section class="hs-panel"><p class="hs-q" style="color:inherit;font-size:1.4rem">' + esc(q.t) + "</p>" + rvPicture(s) + "</section>";
    var side = '<div><p class="hs-big" style="margin-top:14px;font-size:2.2rem">' + rv.hits + " of " + rv.total + " nets caught it</p>" +
      '<div class="hs-by" style="color:var(--ink)">' + ["s", "m", "b"].map(function (n) {
        return '<span style="background:var(--card);box-shadow:var(--shadow)">' + netIcon(n) + rv.by[n][0] + "/" + rv.by[n][1] + "</span>";
      }).join("") + "</div>" + factCard(rv) + "</div>";
    if (isBig()) return topLine(s, qWhat(s)) + '<div class="hs-bigrow" style="grid-template-columns:1.5fr 1fr">' + pic + side + "</div>";
    return topLine(s, qWhat(s)) + pic + side;
  }

  /* ---- the standings ---- */
  function topList(s) {
    var me = s.you ? s.you.name : null;
    return '<ol class="hs-list">' + (s.top || []).map(function (x) {
      return '<li' + (x[1] === me ? ' class="me"' : "") + '><span class="pl">' + x[0] + '</span><span class="nm">' + esc(x[1]) + '</span><span class="pt">' + x[2] + "</span></li>";
    }).join("") + "</ol>";
  }
  function standings(s) {
    return topLine(s, "After question " + (s.q ? s.q.i : "") + (s.q ? " of " + s.q.of : "")) +
      '<div class="live-card"><h2 class="live-h">Top ' + Math.min(5, s.np) + "</h2>" + topList(s) + "</div>" + (isDisplay() ? "" : youBar(s));
  }

  /* ---- the end ---- */
  function podium(e) {
    var order = [2, 1, 3], hgt = { 1: 120, 2: 88, 3: 64 };
    return '<div class="hs-podium">' + order.map(function (pl) {
      var x = null;
      e.podium.forEach(function (p) { if (p.place === pl) x = p; });
      if (!x) return '<div class="p"></div>';
      return '<div class="p"><p class="nm">' + x.names.map(esc).join(", ") + (x.more ? " +" + x.more : "") + '</p><p class="pt">' + x.pts + ' points</p><div class="blk" style="height:' + hgt[pl] + 'px">' + pl + "</div></div>";
    }).join("") + "</div>";
  }
  function meterRows(m, words) {
    var pay = { s: 60, m: 67, b: 0 };
    return '<div class="hs-meter">' + ["s", "m", "b"].map(function (n) {
      var c = m[n][0], t = m[n][1], p = t ? (c / t) * 100 : 0;
      var mark = pay[n] ? '<div class="pay" style="left:' + pay[n] + '%"></div><span class="paytag" style="left:' + pay[n] + '%">beats a big net from ' + (n === "s" ? "6 in 10" : "2 in 3") + "</span>" : "";
      return '<div class="hs-mrow' + (pay[n] ? " paid" : "") + '"><div class="hs-mtop"><b>' + netIcon(n) + NET_WORD[n] + "</b><span>" + (words ? (t ? Math.round(p) + "% caught" : "none") : (t ? "caught " + c + " of " + t : "none")) + '</span></div><div class="hs-mbar"><div class="fill" style="width:' + p.toFixed(1) + '%"></div>' + mark + "</div></div>";
    }).join("") + "</div>";
  }
  var VERDICT = {
    "sure-s": ["Too sure", "Medium nets instead of your small ones: +%d points."],
    "sure-m": ["Too sure", "Big nets instead of your medium ones: +%d points."],
    "careful-b": ["Too careful", "Medium nets instead of your big ones: +%d points."],
    "careful-m": ["Too careful", "Small nets instead of your medium ones: +%d points."],
    "well": ["Well judged", "No other net would have scored more."]
  };
  function awardsHtml(e, mine) {
    if (!e.awards || (!e.awards.sharp && !e.awards.bold)) return "";
    var a = function (k, title, what) {
      var x = e.awards[k];
      if (!x) return "";
      return '<div class="hs-award' + (mine && mine.indexOf(k) >= 0 ? " mine" : "") + '"><b>' + title + "</b><span>" + x.names.map(esc).join(", ") + (x.more ? " +" + x.more : "") + " · " + x.k + (x.k === 1 ? " small net " : " small nets ") + what + "</span></div>";
    };
    return '<div class="hs-awards">' + a("sharp", "Sharpest", "caught") + a("bold", "Boldest", "tried") + "</div>";
  }
  function endPlayer(s) {
    var y = s.you, e = s.end, v = y.verdict, played = y.meter.s[1] + y.meter.m[1] + y.meter.b[1];
    var verdict = v ? '<div class="hs-verdict"><b>' + VERDICT[v.k][0] + "</b><span>" + VERDICT[v.k][1].replace("%d", v.gain) + "</span></div>" : "";
    return topLine(s, "The end · " + esc(s.g.title)) +
      '<div class="live-card">' + podium(e) + awardsHtml(e, y.award) + "</div>" +
      '<div class="live-card"><h2 class="live-h">Your sure-meter</h2>' + (played ? meterRows(y.meter, false) + verdict : '<p class="live-small">No nets this time.</p>') + "</div>" +
      youBar(s) +
      '<div class="hs-hooks"><div class="live-btns"><button class="btn ghost live-iconbtn" type="button" id="e-share">' + ICON.share + 'Share</button>' +
      (app.role === "host" ? "" : '<a class="btn ghost" href="#host" id="e-host">Host your own game</a>') + "</div></div>";
  }
  function roomLine(m) {
    var rs = m.s[1] ? m.s[0] / m.s[1] : null, rb = m.b[1] ? m.b[0] / m.b[1] : null, rm = m.m[1] ? m.m[0] / m.m[1] : null;
    if (rs !== null && m.s[1] >= 3 && rs < 0.6) return "A little too sure: small nets caught " + Math.round(rs * 100) + "% of the time.";
    if (rb !== null && m.b[1] >= 3 && rb >= 0.95 && (rm === null || rm >= 2 / 3) && m.b[1] > m.s[1]) return "A little careful: big nets nearly always caught.";
    return "Well judged, as a room.";
  }
  function endDisplay(s) {
    var e = s.end;
    var left = '<div class="live-card">' + podium(e) + awardsHtml(e, null) + "</div>";
    var right = '<div class="live-card"><h2 class="live-h">The room\'s sure-meter</h2>' + meterRows(e.room, true) + '<p style="margin-top:14px;font-weight:700">' + roomLine(e.room) + "</p></div>";
    if (isBig()) return topLine(s, "The end · " + esc(s.g.title)) + '<div class="hs-bigrow" style="grid-template-columns:1fr 1fr">' + left + right + "</div>";
    return topLine(s, "The end · " + esc(s.g.title)) + left + right + (app.role === "host" ? "" : "");
  }
  function endHooks(s) {
    if (isDisplay()) return;
    onwardInto($("after"));
    var sh = $("e-share");
    if (sh) sh.addEventListener("click", function () { sharePicture(s); });
    var ho = $("e-host");
    if (ho) ho.addEventListener("click", function () { TO.count("live/host-own"); });
  }

  /* ---- the share picture: the sure-meter, never an answer ---- */
  function sharePicture(s) {
    TO.count("live/share");
    var y = s.you, W = 1080, H = 1350;
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var x = cv.getContext("2d");
    var draw = function () {
      x.fillStyle = "#470BA8"; x.fillRect(0, 0, W, H);
      x.fillStyle = "#fff";
      x.font = "800 128px 'Bricolage Grotesque', sans-serif";
      x.fillText("How Sure?", 90, 230);
      x.globalAlpha = 0.8;
      x.font = "600 44px Figtree, sans-serif";
      x.fillText(s.g.title + " · a live game", 94, 306);
      x.globalAlpha = 1;
      var rows = [["s", "Small nets"], ["m", "Medium nets"], ["b", "Big nets"]];
      rows.forEach(function (r, i) {
        var top = 430 + i * 190, c = y.meter[r[0]][0], t = y.meter[r[0]][1];
        x.font = "700 46px Figtree, sans-serif";
        x.fillText(r[1], 94, top);
        x.textAlign = "right";
        x.fillText(t ? "caught " + c + " of " + t : "none", W - 94, top);
        x.textAlign = "left";
        x.globalAlpha = 0.25; x.fillStyle = "#fff";
        round(x, 94, top + 34, W - 188, 34, 17); x.fill();
        x.globalAlpha = 1;
        if (t) { round(x, 94, top + 34, Math.max(34, (W - 188) * c / t), 34, 17); x.fill(); }
      });
      var sm = y.meter.s;
      x.font = "800 64px 'Bricolage Grotesque', sans-serif";
      x.fillText(sm[1] ? "My small nets caught " + sm[0] + " of " + sm[1] : "I played it safe", 90, 1080);
      x.globalAlpha = 0.85;
      x.font = "700 52px Figtree, sans-serif";
      x.fillText("How sure are you?", 94, 1160);
      x.globalAlpha = 1;
      x.font = "800 56px 'Bricolage Grotesque', sans-serif";
      x.fillText(SITE, 94, 1262);
      cv.toBlob(function (blob) {
        if (!blob) return;
        TO.share({ blob: blob, filename: "how-sure.png", text: "How sure are you? " + "https://" + SITE + "/live/" }).then(function (how) {
          if (how !== "fallback") return;
          var url = URL.createObjectURL(blob);
          $("share-img").src = url;
          $("share-save").href = url;
          $("share-copied").textContent = "";
          TO.openDialog($("dlg-share"));
        });
      }, "image/png");
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load("800 64px 'Bricolage Grotesque'"), document.fonts.load("700 46px Figtree")]).then(draw, draw);
    } else draw();
  }
  function round(x, l, t, w, h, r) {
    x.beginPath();
    x.moveTo(l + r, t); x.lineTo(l + w - r, t); x.quadraticCurveTo(l + w, t, l + w, t + r); x.lineTo(l + w, t + h - r);
    x.quadraticCurveTo(l + w, t + h, l + w - r, t + h); x.lineTo(l + r, t + h); x.quadraticCurveTo(l, t + h, l, t + h - r);
    x.lineTo(l, t + r); x.quadraticCurveTo(l, t, l + r, t); x.closePath();
  }
  $("share-copy").addEventListener("click", function () {
    TO.copyText("https://" + SITE + "/live/").then(function (ok) { $("share-copied").textContent = ok ? "Link copied." : "Copy failed: the address is " + SITE + "/live/"; });
  });

  /* ================================================================ the host's buttons */
  var strip = $("hoststrip"), hsSay = $("hs-say"), hsGo = $("hs-go"), hsAlt = $("hs-alt");
  function hostSay(t) { hsSay.textContent = t; }
  function hostStrip(s) {
    if (!s || app.role !== "host" || app.stopped) { strip.hidden = true; document.body.classList.remove("live-strip"); return; }
    strip.hidden = false;
    document.body.classList.add("live-strip");
    var go = "", say = "", alt = "", dis = false;
    if (s.ph === "lobby") { go = "Start"; dis = !s.np; say = '<b>' + s.np + "</b> " + (s.np === 1 ? "player" : "players"); }
    else if (s.ph === "question") {
      var c = counts(s);
      go = "Reveal";
      say = (s.q.i === 0 ? "Practice · " : "") + (c.of && c.in >= c.of ? "<b>All " + c.of + "</b> answered" : "<b>" + c.in + "</b> of " + c.of + " answered");
      seenAt(s);
    }
    else if (s.ph === "reveal") { go = s.q.i > 0 && s.q.i >= s.q.of ? "The end" : "Next"; say = s.rv ? "<b>" + s.rv.hits + "</b> of " + s.rv.total + " caught it" : ""; }
    else if (s.ph === "standings") { go = "Next question"; say = "Standings"; }
    else if (s.ph === "end") { go = "Play again"; alt = "New game"; say = ""; }
    hsSay.innerHTML = say;
    hsGo.textContent = go;
    hsGo.disabled = dis;
    hsAlt.textContent = alt;
    hsAlt.hidden = !alt;
    hsSay.hidden = !!alt && !isBig();
    revealCheck(false);                 // an open "still answering" card follows the count, and goes with the question
  }
  /* Where this screen stands ("question|1.0"), sent with every command that moves the game: a double tap,
     or a tap on a screen that is behind, then no longer matches and the server ignores it. */
  function atOf(s) { return s.ph + "|" + (s.q ? s.q.k : ""); }
  hsGo.addEventListener("click", function () {
    var s = app.state;
    if (!s) return;
    if (s.ph === "lobby") { if (send({ t: "start", at: atOf(s) })) TO.count("live/started"); }
    else if (s.ph === "question") {
      var c = counts(s);
      if (c.in >= c.of) send({ t: "reveal", at: atOf(s) });         // everyone has sent: straight to the reveal
      else revealCheck(true);
    }
    else if (s.ph === "reveal" || s.ph === "standings") send({ t: "next", at: atOf(s) });
    else if (s.ph === "end") hostMenu("again");
  });

  /* Reveal while someone is still answering: "Wait", or "Reveal now", which opens 30 seconds after the
     question did, so nobody is cut off at once and nobody can hold the room forever. The 30 seconds are
     counted from when this screen first showed the question, kept with the host's record through a reload. */
  var FORCE_AFTER = (LOCAL && window.LIVE_FORCE_AFTER) || 30000;     // the checks shorten it on this computer only
  function counts(s) { return s.cnt ? { in: s.cnt.in, of: s.cnt.of } : { in: 0, of: s.np || 0 }; }
  function seenAt(s) {
    var rec = sget("host:" + app.code) || null, k = app.code + "|" + s.q.k;
    if (app.seen && app.seen.k === k) return app.seen.t;
    app.seen = rec && rec.seen && rec.seen.k === k ? rec.seen : { k: k, t: now() };
    if (rec && (!rec.seen || rec.seen.k !== k)) { rec.seen = app.seen; sset("host:" + app.code, rec); }
    return app.seen.t;
  }
  var revealTick = 0;
  function revealCheck(open) {
    var dlg = $("dlg-reveal"), s = app.state;
    if (!s || s.ph !== "question" || app.role !== "host") { clearInterval(revealTick); TO.closeDialog(dlg); return; }
    if (!open && !dlg.open) return;
    var c = counts(s), wait = c.of - c.in, left = Math.max(0, seenAt(s) + FORCE_AFTER - now());
    var all = wait <= 0;
    $("reveal-title").textContent = all ? "Everyone has answered" : wait + " still answering";
    $("reveal-line").textContent = c.in + " of " + c.of + " sent";
    var n = Math.min(c.of, 60), on = Math.round(n * (c.of ? c.in / c.of : 0)), h = "";
    for (var i = 0; i < n; i++) h += i < on ? "<i></i>" : '<i class="wait"></i>';
    $("reveal-dots").innerHTML = h;
    var now_ = $("reveal-now");
    now_.disabled = !all && left > 0;
    now_.textContent = all ? "Reveal" : left > 0 ? "Reveal 0:" + ("0" + Math.ceil(left / 1000)).slice(-2) : "Reveal now";
    if (open) {
      TO.openDialog(dlg);
      clearInterval(revealTick);
      revealTick = setInterval(function () { if (!dlg.open) { clearInterval(revealTick); return; } revealCheck(false); }, 250);
    }
  }
  $("reveal-wait").addEventListener("click", function () { TO.closeDialog($("dlg-reveal")); });
  $("reveal-now").addEventListener("click", function () {
    var s = app.state;
    TO.closeDialog($("dlg-reveal"));
    if (s && s.ph === "question") send({ t: "reveal", at: atOf(s) });
  });
  hsAlt.addEventListener("click", function () {
    var s = app.state;
    if (s && s.ph === "end") { app.newGame = true; send({ t: "finish", at: atOf(s) }); }
  });
  $("hs-more").addEventListener("click", function () { hostMenu("menu"); });

  var endArm = 0;
  function hostMenu(what) {
    var s = app.state, box = $("hostmenu");
    if (!s) return;
    var h = "";
    if (what === "again") {
      $("host-title").textContent = "Play again";
      h = SETS.map(function (x) {
        var played = (s.g.played && s.g.played[x.id]) ? s.g.played[x.id].length : 0;
        return '<button type="button" data-again="' + esc(x.id) + '">' + esc(x.title) + '<span class="live-small" style="display:block;margin-top:2px">' + (played >= x.n ? "All played: they start again" : (x.n - played) + " new questions") + "</span></button>";
      }).join("");
    } else {
      $("host-title").textContent = "Host";
      h = '<button type="button" data-do="players">Players (' + s.np + ")</button>";
      h += '<button type="button" data-do="close">' + (s.g.closed ? "Open the game to new players" : "Close the game to new players") + "</button>";
      if (s.ph === "question") h += '<button type="button" data-do="skip">Skip this question (no points)</button>';
      if (s.ph !== "end") h += '<button type="button" class="danger" data-do="end">' + (s.ph === "lobby" ? "Close this game" : "End the game now") + "</button>";
      else h += '<button type="button" class="danger" data-do="new">New game</button>';
      h += '<div id="plist"></div>';
    }
    box.innerHTML = h;
    Array.prototype.forEach.call(box.querySelectorAll("[data-again]"), function (b) {
      b.addEventListener("click", function () { send({ t: "again", set: b.getAttribute("data-again"), at: atOf(app.state || s) }); TO.closeDialog($("dlg-host")); });
    });
    Array.prototype.forEach.call(box.querySelectorAll("[data-do]"), function (b) {
      b.addEventListener("click", function () {
        var d = b.getAttribute("data-do");
        if (d === "players") { send({ t: "players" }); return; }
        if (d === "close") { send({ t: "close", on: !s.g.closed }); TO.closeDialog($("dlg-host")); return; }
        if (d === "skip") { send({ t: "skip", at: atOf(s) }); TO.closeDialog($("dlg-host")); return; }    // the question shown when the menu opened, none other
        if (d === "end" || d === "new") {
          if (now() - endArm > 4000) { endArm = now(); b.textContent = "Tap again to be sure"; return; }
          endArm = 0;
          /* "End the game now" ends the round, and Play again stays; "Close this game" (the lobby) and
             "New game" (the end) finish the whole game */
          var fin = d === "new" || s.ph === "lobby";
          app.newGame = fin;
          send({ t: fin ? "finish" : "end", at: atOf(app.state || s) });
          TO.closeDialog($("dlg-host"));
        }
      });
    });
    TO.openDialog($("dlg-host"));
  }
  function playersList(ps) {
    var box = $("plist");
    if (!box) return;
    box.innerHTML = '<ul class="live-plist">' + ps.map(function (p) {
      return "<li><span>" + esc(p[1]) + (p[2] ? " (you)" : "") + "</span>" + (p[2] ? "" : '<button type="button" data-rm="' + esc(p[0]) + '">Remove</button>') + "</li>";
    }).join("") + "</ul>";
    Array.prototype.forEach.call(box.querySelectorAll("[data-rm]"), function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-armed") !== "1") { b.setAttribute("data-armed", "1"); b.textContent = "Sure?"; return; }
        send({ t: "remove", id: b.getAttribute("data-rm") });
        var li = b.closest("li");
        if (li) li.parentNode.removeChild(li);
      });
    });
  }

  /* ================================================================ the address decides the view */
  function route() {
    var h = window.location.hash.replace(/^#/, "");
    if (/^[A-Za-z]{5}$/.test(h)) { openGame(h.toUpperCase()); return; }
    stopGame();
    app.code = "";
    if (h === "host") { showSetup(); return; }
    showHome();
  }
  window.addEventListener("hashchange", route);
  route();
})();
