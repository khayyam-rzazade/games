/* Logicers — the world's counts (16 Oct 2026). Khayyam, 15 Oct 2026: "at the end you can see the stats of your
   country, continent and the world", and "this country is doing better than that ... they would invite their
   friends in their country to lead the stats".

   This script rides on the nine daily game pages, the home page and the World table (world/), after
   turnsout.js and points.js. It does three things:
   1. At a reveal of today's game it sends the day's finished results (each as points.js reads it: the game,
      how far off, and the guess where a game's guess is one number) to the site's server, once per game and
      day, and draws "The world today" under the result: you beside the world, your continent and your country,
      what share of players you beat, where the guesses landed, and your country's place.
   2. On the home page it fills the World table box with your country's place today.
   3. It gives the World table page (world/world.js) what it needs: the calls, the names, the flags.
   The country is read by the server from the connection; the page never knows more than its two letters.
   Nothing that identifies a player is sent or kept: the server adds each result to its country's counts and
   keeps only the counts (server/live/src/tally.js). A player can leave their results out (the World table's
   "?" sheet); views still come.
   A dead or unreachable server must never break a game: every call is wrapped, as Rooms' are. */
(function () {
  "use strict";

  var TO = window.TurnsOut, P = window.LogicersPoints;
  if (!TO || !P) return;

  /* ------------------------------------------------------------------
     The server's address: Logicers Live's Worker, which also keeps the world's counts (it deploys by itself
     from the repository). Empty quotes would switch the world's counts off everywhere. No closing slash.
     ------------------------------------------------------------------ */
  var API = "https://logicers-live.rza-khay.workers.dev";
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
  /* the checks run the site from localhost and may point this at a server of their own; nothing else may */
  function apiBase() {
    if (LOCAL) return typeof window.LOGICERS_WORLD_API === "string" ? window.LOGICERS_WORLD_API : "";
    return API;
  }
  function on() { return !!apiBase(); }
  var V = 1;

  var WAIT = 10000;                  // a call that has not answered in this time is given up (the box then goes)
  function call(what, body) {
    try { return send(what, body); } catch (e) { return Promise.reject(e); }
  }
  function send(what, body) {
    body.v = V;
    var ctl = null, timer = null;
    try { ctl = new window.AbortController(); } catch (e) { ctl = null; }
    if (ctl) timer = window.setTimeout(function () { ctl.abort(); }, WAIT);
    return window.fetch(apiBase() + "/stats/" + what, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) window.clearTimeout(timer);
      return res.json().then(function (data) { return { status: res.status, data: data || {} }; },
                             function () { return { status: res.status, data: {} }; });
    }, function (e) {
      if (timer) window.clearTimeout(timer);
      throw e;
    });
  }

  /* ---------------- dates: a date is the player's own calendar day, as a duel's is ---------------- */
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function keyOf(d) { return String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate()); }
  function todayKey() { return keyOf(new Date()); }
  function dateOf(key) {
    var m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(key));
    return m ? new Date(+m[1], +m[2] - 1, +m[3], 12, 0, 0) : null;
  }
  function shiftKey(key, by) {
    var d = dateOf(key);
    if (!d) return key;
    d.setDate(d.getDate() + by);
    return keyOf(d);
  }
  /* the date of a game's day number n, by the player's own calendar */
  function keyForDay(G, n) {
    var p = String(G.start || "").split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2] + n - 1, 12, 0, 0);
    return isNaN(d.getTime()) ? todayKey() : keyOf(d);
  }
  function dayFor(G, key) {
    var d = dateOf(key);
    if (!d) return 0;
    var n = TO.dayNumber(G.start, d);
    return n >= 1 ? n : 0;
  }
  function gameBy(field, v) {
    var G = null;
    TO.GAMES.forEach(function (x) { if (x[field] === v) G = x; });
    return G;
  }
  /* a finished result of that date, as the game stored it (never practice) */
  function resultFor(G, key) {
    var n = dayFor(G, key);
    if (!n) return null;
    var r = null;
    try { r = TO.game(G.id).results[n]; } catch (e) { return null; }
    return (r && G.done(r)) ? r : null;
  }

  /* ---------------- what is sent, once per game and date ----------------
     "sent": the games of a date already sent (or refused for good), never sent again; "got": those of them the
     server counted (its brake may refuse one), so the reveal knows whether the player is among the players. */
  function store() { return TO.worldStore(); }
  function off() { return store().off === true; }
  function setOff(v) { TO.worldUpdate(function (w) { w.off = !!v; }); }
  function listOf(o, key) { var s = o && typeof o === "object" ? o[key] : null; return Array.isArray(s) ? s : []; }
  function sentOn(key) { return listOf(store().sent, key); }
  function gotOn(key) { return listOf(store().got, key); }
  /* add (or, with drop, take away) games in a date's list; only today's and yesterday's lists are kept */
  function mark(list, key, keys, drop) {
    TO.worldUpdate(function (w) {
      if (!w[list] || typeof w[list] !== "object" || Array.isArray(w[list])) w[list] = {};
      var have = Array.isArray(w[list][key]) ? w[list][key] : [];
      keys.forEach(function (k) {
        var i = have.indexOf(k);
        if (drop) { if (i >= 0) have.splice(i, 1); } else if (i < 0) have.push(k);
      });
      if (have.length) w[list][key] = have; else delete w[list][key];
      var keep = shiftKey(todayKey(), -1);
      Object.keys(w[list]).forEach(function (d) { if (!(d >= keep)) delete w[list][d]; });
    });
  }
  /* the day's finished games not sent yet, as points.js reads them */
  function unsent(key) {
    if (off()) return [];
    var done = sentOn(key), out = [];
    TO.GAMES.forEach(function (G) {
      if (done.indexOf(G.key) >= 0) return;
      var r = resultFor(G, key);
      var x = r ? P.read(G.key, r) : null;
      if (x) out.push(x);
    });
    return out;
  }
  /* send what is waiting (and get game k's view back with it). The games are marked as sent BEFORE the call, so
     that an answer lost on the way (the page closed, the signal dropped, a call given up) can never send the same
     result twice; they are put back only when the server surely did not count them: no connection at all, an old
     page (409), the brake (429) or a fault of the server (5xx). A refusal of the results themselves (400) is final. */
  function flush(key, k) {
    var rs = unsent(key);
    if (!rs.length) return k ? call("view", { d: key, k: k }) : Promise.resolve(null);
    var ks = rs.map(function (x) { return x.k; });
    mark("sent", key, ks);
    return call("send", { d: key, rs: rs, k: k || null }).then(function (r) {
      if (r.status === 200) {
        var got = Array.isArray(r.data.ks) ? r.data.ks.filter(function (x) { return ks.indexOf(x) >= 0; }) : [];
        if (got.length) mark("got", key, got);
      } else if (r.status !== 400) mark("sent", key, ks, true);
      if (r.status === 200 && r.data.view) return r;
      return k ? call("view", { d: key, k: k }) : r;
    }, function (e) {
      if (!e || e.name !== "AbortError") mark("sent", key, ks, true);   // given up after WAIT: it may have arrived
      throw e;
    });
  }

  /* ---------------- names, flags, numbers ---------------- */
  var CONT = { AF: "Africa", AN: "Antarctica", AS: "Asia", EU: "Europe", NA: "North America", OC: "Oceania", SA: "South America" };
  var names = null;
  try { names = new window.Intl.DisplayNames(["en"], { type: "region" }); } catch (e) { names = null; }
  function countryName(c) {
    if (!/^[A-Z]{2}$/.test(String(c))) return "";
    var n = "";
    try { n = names ? names.of(c) : ""; } catch (e) { n = ""; }
    return n && n !== c ? n : c;
  }
  function flag(c) {
    if (!/^[A-Z]{2}$/.test(String(c))) return "";
    return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65, 0x1F1E6 + c.charCodeAt(1) - 65);
  }
  function contName(ct) { return CONT[ct] || ""; }
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function nth(n) {
    var s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function flagEl(c) { var f = el("span", "wd-flag", flag(c)); f.setAttribute("aria-hidden", "true"); return f; }
  function avg(a) { return a && a.n ? a.p / a.n : null; }

  /* ---------------- the invitation ---------------- */
  var SELF = (document.currentScript && document.currentScript.src) || "";
  var ROOT = /assets\/js\/world\.js/.test(SELF) ? SELF.replace(/assets\/js\/world\.js.*$/, "") : "../";
  function tableHref() { return TO.here(ROOT + "world/"); }
  function tableUrl() {
    var a = TO.address();
    return a ? "https://" + a + "/world/" : (function () { try { return new URL(tableHref(), window.location.href).href; } catch (e) { return tableHref(); } })();
  }
  /* place: the country's place on the world table, or, with game (a game's name), its place in that game today */
  function inviteText(c, place, game) {
    var name = countryName(c);
    if (!name) return "Small daily games about the real world, a minute each. Every game you finish counts for your country. " + tableUrl();
    return (place ? flag(c) + " " + name + " is " + nth(place) + (game ? " at " + game + " on Logicers today" : " on the Logicers world table today") + ". Help us climb: " :
      "Help " + flag(c) + " " + name + " onto the Logicers world table: ") +
      "small daily games about the real world, a minute each, and every game you finish counts for your country. " + tableUrl();
  }
  function invite(c, place, note, game) {
    var text = inviteText(c, place, game), nav = window.navigator;
    TO.count("world/invite");
    function copy() {
      TO.copyText(text).then(function (ok) {
        if (!note) return;
        note.textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + tableUrl();
        note.hidden = false;
      });
    }
    if (nav.share) {
      nav.share({ text: text }).then(function () {}, function (e) { if (!e || e.name !== "AbortError") copy(); });
    } else copy();
  }
  function inviteButton(c, place, note, cls, game) {
    var b = el("button", "wd-invite" + (cls ? " " + cls : ""));
    b.type = "button";
    b.appendChild(el("span", "", countryName(c) ? "Invite friends from " + countryName(c) : "Invite friends"));
    b.addEventListener("click", function () { invite(c, place, note, game); });
    return b;
  }

  /* ---------------- the reveal: "The world today" ---------------- */
  var SPOT = { cousin: "found it", club: "got all five right" };
  /* where the answer is, from the player's own result (as Rooms' strip reads it) */
  var REAL = {
    hundred: function (r) { return r.a; },
    apart: function (r) { return r.a; },
    o24: function (r) { return r.g - r.y; },
    energy: function (r) { return r.g - r.y / 2; },
    every: function (r) { if (!r.y) return r.g; var k = Math.abs(r.y) / 10; return r.y > 0 ? r.g / k : r.g * k; }
  };
  function fmt(k, v) {
    if (k === "hundred") return String(Math.round(v));
    if (k === "o24") {
      var m = Math.round(v / 5) * 5, h = Math.floor(m / 60), mm = m % 60;
      return h + " h" + (mm ? " " + two(mm) : "");
    }
    if (k === "energy") {
      var x = Math.round(v * 2) / 2, w = Math.floor(x);
      return (x - w ? (w ? w + "½" : "½") : String(w));
    }
    if (k === "every") return commas(v);
    return "";
  }
  function guessAvg(k, a) {
    if (!a || !a.gn) return null;
    var m = a.gs / a.gn;
    return P.GUESS[k] === "log" ? Math.exp(m) : m;
  }

  function bars(G, me, v, you) {
    var ul = el("ul", "wd-bars");
    function row(label, value, cls, sub) {
      if (value === null) return;
      var li = el("li", cls || "");
      var who = el("span", "wd-who");
      if (typeof label === "string") who.textContent = label; else who.appendChild(label);
      li.appendChild(who);
      var bar = el("span", "wd-bar");
      var fill = el("i", "");
      fill.style.width = Math.max(2, Math.min(100, value)) + "%";
      bar.appendChild(fill);
      li.appendChild(bar);
      li.appendChild(el("b", "", String(Math.round(value))));
      if (sub) li.setAttribute("aria-label", sub);
      ul.appendChild(li);
    }
    row("You", me, "r-you", "Your score: " + me + " of 100");
    row("World", avg(v.w), "r-world", "The world's average: " + Math.round(avg(v.w)) + " of 100");
    if (v.t && v.t.n) row(contName(you.ct), avg(v.t), "r-cont", contName(you.ct) + "'s average: " + Math.round(avg(v.t)) + " of 100");
    if (v.h && v.h.n) {
      var lab = el("span", "wd-cname");
      lab.appendChild(flagEl(you.c));
      lab.appendChild(document.createTextNode(countryName(you.c)));
      row(lab, avg(v.h), "r-home", countryName(you.c) + "'s average: " + Math.round(avg(v.h)) + " of 100");
    }
    return ul;
  }

  /* "You beat 71% of players": from the world's tenths, counting yourself out where your result is counted */
  function beat(v, me, counted) {
    var w = v.w, b = P.tenth(me), below = 0, self = counted ? 1 : 0;
    for (var i = 0; i < b; i++) below += w.h[i];
    var same = Math.max(0, w.h[b] - self), others = w.n - self;
    if (others < 1) return null;
    return Math.round(100 * (below + same / 2) / others);
  }

  function rail(G, r, mine, v, you) {
    var k = G.key;
    if (!REAL[k]) return null;
    var real = REAL[k](r), wv = guessAvg(k, v.w), hv = guessAvg(k, v.h);
    if (wv === null || !isFinite(real)) return null;
    var log = P.GUESS[k] === "log";
    var pts = [{ id: "ans", v: real, label: "Answer" + (fmt(k, real) ? " " + fmt(k, real) : "") },
               { id: "you", v: mine.g, label: "You" + (fmt(k, mine.g) ? " " + fmt(k, mine.g) : "") },
               { id: "world", v: wv, label: "World" + (fmt(k, wv) ? " " + fmt(k, wv) : "") }];
    if (hv !== null && v.h.gn >= 2) pts.push({ id: "home", v: hv, label: flag(you.c) + (fmt(k, hv) ? " " + fmt(k, hv) : " " + you.c) });
    var tr = function (x) { return log ? Math.log(Math.max(x, 0.5)) : x; };
    var vals = pts.map(function (p) { return tr(p.v); });
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    var pad = Math.max((hi - lo) * 0.2, hi === lo ? 1 : 0);
    lo -= pad; hi += pad;
    pts.forEach(function (p) { p.x = (tr(p.v) - lo) / (hi - lo) * 100; });

    var box = el("div", "wd-rail");
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", "Where the guesses landed: " + pts.map(function (p) { return p.label; }).join(", ") + ".");
    box.appendChild(el("p", "wd-h", "Where the guesses landed"));
    var line = el("div", "wd-track");
    /* labels in four lanes, two above the line and two below, so none sits on another */
    var lanes = [-1e9, -1e9, -1e9, -1e9];
    pts.slice().sort(function (a, b) { return a.x - b.x; }).forEach(function (p) {
      var pref = p.id === "ans" || p.id === "you" ? [0, 2, 1, 3] : [1, 3, 0, 2], lane = pref[0];
      for (var i = 0; i < pref.length; i++) { if (p.x - lanes[pref[i]] >= 26) { lane = pref[i]; break; } }
      lanes[lane] = p.x;
      var mk = el("i", "wd-mk m-" + p.id);
      mk.style.left = p.x + "%";
      line.appendChild(mk);
      var t = el("span", "wd-lab l" + lane + " m-" + p.id, p.label);
      t.style.left = Math.max(6, Math.min(94, p.x)) + "%";
      t.setAttribute("aria-hidden", "true");
      line.appendChild(t);
    });
    box.appendChild(line);
    return box;
  }

  function standing(G, v, you, note) {
    var wrap = el("div", "wd-rank");
    var p = el("p", "wd-place"), c = you.c;
    var named = !!countryName(c);
    var place = 0;
    if (named && v.rank && v.rank.at) {
      place = v.rank.at;
      p.appendChild(flagEl(c));
      p.appendChild(document.createTextNode(countryName(c) + (place === 1 ? " leads this game today" : " is ")));
      if (place !== 1) {
        p.appendChild(el("b", "", nth(place)));
        p.appendChild(document.createTextNode(" of " + v.rank.of + " countries in this game today"));
      } else p.appendChild(document.createTextNode(v.rank.of > 1 ? ", ahead of " + (v.rank.of - 1) + (v.rank.of === 2 ? " other country" : " other countries") : ""));
      p.appendChild(document.createTextNode(place === 1 ? "!" : "."));
    } else if (named && v.h && v.h.n && v.rank) {
      var need = Math.max(1, v.rank.min - v.h.n);
      p.appendChild(flagEl(c));
      p.appendChild(document.createTextNode(countryName(c) + ": " + v.h.n + (v.h.n === 1 ? " player" : " players") + " so far. "));
      p.appendChild(el("b", "", need + " more"));
      p.appendChild(document.createTextNode(" and it takes a place."));
    } else if (named && v.h && v.h.n) {
      p.appendChild(flagEl(c));
      p.appendChild(document.createTextNode(countryName(c) + ": " + v.h.n + (v.h.n === 1 ? " player" : " players") + " so far."));
    } else p.hidden = true;
    wrap.appendChild(p);
    if (v.top && v.top.length) {
      var t = el("p", "wd-top3");
      t.appendChild(el("span", "", "Top today"));
      v.top.forEach(function (x, i) {
        var s = el("span", "wd-chip" + (x[0] === c ? " me" : ""));
        s.appendChild(flagEl(x[0]));
        s.appendChild(document.createTextNode(" " + countryName(x[0])));
        s.title = nth(i + 1) + ": " + countryName(x[0]);
        t.appendChild(s);
      });
      wrap.appendChild(t);
    }
    var acts = el("div", "wd-acts");
    acts.appendChild(inviteButton(c, place, note, "", place ? G.name : ""));
    var a = el("a", "wd-table");
    a.href = tableHref();
    a.appendChild(el("span", "", "World table"));
    a.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    a.addEventListener("click", function () { TO.count("world/from-game"); });
    acts.appendChild(a);
    wrap.appendChild(acts);
    wrap.appendChild(note);
    return wrap;
  }

  /* Your Call: no right answer, so the world's choices instead of points */
  function choices(G, r, v, you) {
    var box = el("div", "wd-calls");
    var btns = document.querySelectorAll("#choices .yc-choice");
    var ul = el("ul", "wd-choices");
    var n = v.w.n || 1;
    [0, 1, 2].forEach(function (i) {
      var li = el("li", (i === r.r ? "real" : "") + (i === r.c ? " mine" : ""));
      var b = btns[i], text = "", letter = "ABC"[i];
      try { text = b.querySelector(".t").textContent; letter = b.querySelector(".k").textContent || letter; } catch (e) { text = ""; }
      li.appendChild(el("span", "k", letter));
      var mid = el("span", "wd-cmid");
      mid.appendChild(el("span", "t", text || "Choice " + letter));
      var bar = el("span", "wd-bar");
      var fill = el("i", "");
      var share = pct(v.w.k[i], n);
      fill.style.width = Math.max(2, share) + "%";
      bar.appendChild(fill);
      mid.appendChild(bar);
      li.appendChild(mid);
      li.appendChild(el("b", "", share + "%"));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    var same = pct(v.w.k[r.c] || 0, v.w.n);
    var line = el("p", "wd-big");
    line.appendChild(document.createTextNode("You chose like "));
    line.appendChild(el("b", "", same + "%"));
    line.appendChild(document.createTextNode(" of the world" + (v.h && v.h.n > 1 ? " and " + pct(v.h.k[r.c], v.h.n) + "% of " + countryName(you.c) : "") + "."));
    box.appendChild(line);
    var real = el("p", "wd-line");
    real.textContent = pct(v.w.k[r.r] || 0, v.w.n) + "% of the world made the same call as the real leader.";
    box.appendChild(real);
    return box;
  }

  function draw(box, G, r, mine, data, counted) {
    var v = data.view, you = data.you || { c: "??", ct: "??" };
    box.textContent = "";
    if (!v || !v.w || !v.w.n) { box.hidden = true; return; }
    box.hidden = false;
    var top = el("div", "wd-top2");
    top.appendChild(el("h2", "", "The world today"));
    var n = el("span", "wd-n");
    n.appendChild(el("b", "", commas(v.w.n)));
    n.appendChild(document.createTextNode(" played"));
    top.appendChild(n);
    box.appendChild(top);
    var note = el("p", "wd-note");
    note.hidden = true;
    note.setAttribute("role", "status");
    if (G.key === "call") {
      box.appendChild(choices(G, r, v, you));
      box.appendChild(standing(G, v, you, note));
      return;
    }
    var me = P.points(G.key, mine.e);
    box.appendChild(el("p", "wd-sub", "Score out of 100"));
    box.appendChild(bars(G, me, v, you));
    var b = beat(v, me, counted), big = el("p", "wd-big");
    if (b === null) big.textContent = counted ? "You are the first in the world to finish this one today." : "Nobody else has finished this one yet today.";
    else {
      big.appendChild(document.createTextNode("You beat "));
      big.appendChild(el("b", "", b + "%"));
      big.appendChild(document.createTextNode(" of players today."));
    }
    box.appendChild(big);
    var rl = rail(G, r, mine, v, you);
    if (rl) box.appendChild(rl);
    if (v.w.n >= 2) {
      var spot = el("p", "wd-line");
      var sp = pct(v.w.h[10], v.w.n);
      spot.textContent = sp + "% of players in the world " + (SPOT[G.key] || "were spot on") +
        (v.h && v.h.n >= 3 ? "; " + pct(v.h.h[10], v.h.n) + "% in " + countryName(you.c) + "." : ".");
      box.appendChild(spot);
    }
    box.appendChild(standing(G, v, you, note));
  }

  function block(after, o) {
    var old = document.getElementById("world");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!on() || !o || !o.game) return null;
    var G = gameBy("id", o.game);
    var liveDay = !o.practice && (!o.day || !o.today || o.day === o.today);
    if (!G || !liveDay) return null;
    /* the date of the day played (a page left open past midnight still plays the day it opened on) */
    var key = o.day > 0 ? keyForDay(G, o.day) : todayKey(), r = resultFor(G, key);
    var mine = r ? P.read(G.key, r) : null;
    if (!mine) return null;
    var box = el("section", "world");
    box.id = "world";
    box.setAttribute("aria-label", "The world today");
    box.setAttribute("data-g", G.key);
    box.appendChild(el("p", "wd-wait", "Counting the world…"));
    after.appendChild(box);
    flush(key, G.key).then(function (res) {
      if (!res || res.status !== 200 || !res.data || !res.data.view) { box.hidden = true; return; }
      draw(box, G, r, mine, res.data, gotOn(key).indexOf(G.key) >= 0);
    }, function () { box.hidden = true; }).catch(function () { box.hidden = true; });
    return box;
  }
  TO.worldHook = block;

  /* today's games not sent yet, and yesterday's (a game finished just before midnight, with no signal) */
  function flushBoth(key) {
    function quiet(p) { return p.then(function () {}, function () {}); }
    return quiet(flush(shiftKey(key, -1), null)).then(function () { return quiet(flush(key, null)); });
  }

  /* ---------------- the home page: the World table box ---------------- */
  function home() {
    var box = document.getElementById("worldbox");
    if (!box || !on()) return;
    box.hidden = false;
    var key = todayKey();
    flushBoth(key).then(function () { return call("world", { d: key, span: "day" }); }).then(function (r) {
      if (!r || r.status !== 200) return;
      var t = rank(r.data), you = r.data.you || {};
      var h = document.getElementById("worldbox-h"), sub = document.getElementById("worldbox-sub");
      var mine = null;
      t.rows.forEach(function (x) { if (x.c === you.c) mine = x; });
      if (h && mine && mine.at) h.textContent = flag(you.c) + " " + countryName(you.c) + " is " + nth(mine.at) + " today";
      else if (h && countryName(you.c)) h.textContent = flag(you.c) + " " + countryName(you.c) + " on the world table";
      if (sub) sub.textContent = r.data.n ? commas(r.data.n + (r.data.calls || 0)) + " games played today, in " + t.rows.length + (t.rows.length === 1 ? " country." : " countries.") : "Every game you finish counts for your country.";
    }, function () { /* the box keeps its plain words */ });
  }

  /* ---------------- the table itself, worked out from a summary (the World table page and the home box) ----
     A country's score (16 Oct 2026, Khayyam's choice "C": quality first, and some credit for bringing players):
       quality: its players' average points, made fair across games by the server (tally.js); above the world's
                average it is pulled back toward it as if it had PULL more games at that average, so a handful of
                lucky games never tops the table, while below it a country keeps its own average (so more
                players never hurt it); a country takes a place from MIN games;
       + bonus: BONUS.per points for every tenfold of the games it played (Your Call's too), at most BONUS.most:
                2 at 10 games, 4 at 100, 6 at 1,000, never more than 8, so inviting friends always helps and
                playing well still matters most. The score never goes above 100.
     Continents: the quality only, with the same rule and minimum. A week (from Monday, 16 Oct 2026) sits between
     the day and the month in both. */
  var PULL = { day: 30, week: 60, month: 90 };
  var MIN = { day: 10, week: 20, month: 30 };
  var BONUS = { per: 2, most: 8 };
  function bonus(played) { return played > 1 ? Math.min(BONUS.most, BONUS.per * Math.log(played) / Math.LN10) : 0; }
  function quality(n, a, K, M) { return n && a / n <= M ? a / n : (a + K * M) / (n + K); }
  function rank(d) {
    var span = d.span === "month" ? "month" : d.span === "week" ? "week" : "day", K = PULL[span], M = d.m || 0;
    /* n: the scored games, which rank; played: those and Your Call's, which count in the games played and the bonus */
    var rows = (d.cs || []).map(function (x) {
      var played = x[2] + (x[4] || 0), q = quality(x[2], x[3], K, M), b = bonus(played);
      return { c: x[0], ct: x[1], n: x[2], played: played, q: q, bonus: b, s: Math.min(100, q + b) };
    });
    var ranked = rows.filter(function (x) { return x.n >= MIN[span]; })
      .sort(function (a, b) { return b.s - a.s || b.n - a.n || (a.c < b.c ? -1 : 1); });
    ranked.forEach(function (x, i) { x.at = i + 1; });
    var busy = rows.slice().sort(function (a, b) { return b.played - a.played || (a.c < b.c ? -1 : 1); });
    var conts = (d.ts || []).map(function (x) { return { ct: x[0], n: x[1], s: quality(x[1], x[2], K, M) }; })
      .filter(function (x) { return CONT[x.ct] && x.ct !== "AN" && x.n >= MIN[span]; })
      .sort(function (a, b) { return b.s - a.s || b.n - a.n; });
    return { rows: rows, ranked: ranked, busy: busy, conts: conts, min: MIN[span], m: M };
  }

  window.LogicersWorld = {
    on: on, call: call, flush: flush, flushBoth: flushBoth, todayKey: todayKey, shiftKey: shiftKey, dateOf: dateOf,
    countryName: countryName, flag: flag, flagEl: flagEl, contName: contName, CONT: CONT,
    commas: commas, nth: nth, rank: rank, bonus: bonus, BONUS: BONUS, invite: invite, inviteButton: inviteButton, inviteText: inviteText,
    off: off, setOff: setOff, block: block, draw: draw, el: el, tableUrl: tableUrl, PULL: PULL, MIN: MIN
  };

  /* ---------------- the honest sentence ----------------
     Every page that sends says so where it speaks about privacy, in the same words (and the World table page
     says it in full). Joined once, as Rooms join theirs; on a page where the world's counts are off, nothing. */
  var SHORT = "Each daily game you finish also adds its score to the world's counts by country, on Logicers' own server: your country is read from your connection, and nothing that identifies you is kept. You can leave your results out on the World table page.";
  var TINY = "Each daily game you finish also adds its score, and nothing that identifies you, to the world's counts by country.";
  var FULL = "When you finish a daily game, your phone sends the game, how far off you were and, for the games whose guess is one number, your guess, to Logicers' own server. The server reads your country and continent from your connection, adds the result to that country's counts for the day, and keeps only the counts: no address, nothing that identifies you. A guess is shown only as an average of two or more. A day's counts are deleted 75 days after it. You can leave your results out here and still see everyone else's.";
  function honest() {
    if (!on()) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (x) {
      var kind = x.getAttribute("data-privacy");
      if (x.getAttribute("data-world") || (kind !== "long" && kind !== "short" && kind !== "world")) return;
      x.setAttribute("data-world", "1");
      x.textContent += " " + (kind === "world" ? FULL : kind === "short" ? TINY : SHORT);
    });
  }

  function start() { honest(); if (document.getElementById("worldbox")) home(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
