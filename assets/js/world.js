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
   3. It gives the World table page (world/world.js) and the team pages (team/team.js) what they need: the calls,
      the names, the flags, the ranking, the links to a country's team page.
   4. Reactions (19 Oct 2026): the row of three taps on the finish card (reactRow, below).
   The country is read by the server from the connection; the page never knows more than its two letters.
   Nothing that identifies a player is sent or kept: the server adds each result to its country's counts and
   keeps only the counts (server/live/src/tally.js). A player can leave their results out (the World table's
   "?" sheet); views still come.
   A dead or unreachable server must never break a game: every call is wrapped, as Rooms' are. */
(function () {
  "use strict";

  var TO = window.TurnsOut, P = window.LogicersPoints, LG = window.LG, T = LG ? LG.t : function (k) { return k; };
  if (!TO || !P) return;

  /* ------------------------------------------------------------------
     The server's address: Logicers Live's Worker, which also keeps the world's counts (it deploys by itself
     from the repository). Empty quotes would switch the world's counts off everywhere. No closing slash.
     ------------------------------------------------------------------ */
  /* Two addresses (27 Oct 2026): live.logicers.com first, because some campus Wi-Fi blocks workers.dev; the workers.dev
     one only when the first gives no answer at all (not even an error) before anything has been heard from it, and then
     for the rest of the page. Nothing is probed on load. */
  var API = "https://live.logicers.com";
  var API_OLD = "https://logicers-live.rza-khay.workers.dev";
  var heard = false, useOld = false;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
  /* the checks run the site from localhost and may point this at a server of their own; nothing else may */
  function apiBase() {
    if (LOCAL) return typeof window.LOGICERS_WORLD_API === "string" ? window.LOGICERS_WORLD_API : "";
    return useOld ? API_OLD : API;
  }
  function on() { return !!apiBase(); }
  var V = 1;

  var WAIT = 10000;                  // a call that has not answered in this time is given up (the box then goes)
  function call(what, body) {
    try { return send(what, body); } catch (e) { return Promise.reject(e); }
  }
  function send(what, body) { return post("/stats/" + what, body); }
  /* any call to the same server, by its path (what players said, assets/js/said.js, uses /said/...) */
  function post(path, body) {
    body.v = V;
    return attempt(apiBase(), path, body);
  }
  function attempt(base, path, body) {
    var ctl = null, timer = null;
    try { ctl = new window.AbortController(); } catch (e) { ctl = null; }
    if (ctl) timer = window.setTimeout(function () { ctl.abort(); }, WAIT);
    return window.fetch(base + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) window.clearTimeout(timer);
      if (base === API) heard = true;
      return res.json().then(function (data) { return { status: res.status, data: data || {} }; },
                             function () { return { status: res.status, data: {} }; });
    }, function (e) {
      if (timer) window.clearTimeout(timer);
      if (base !== API || heard || LOCAL) throw e;      // only the first address, and only while it has never answered
      useOld = true;
      return attempt(API_OLD, path, body);
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
  var CONT = { AF: T("world.cont_af"), AN: T("world.cont_an"), AS: T("world.cont_as"), EU: T("world.cont_eu"), NA: T("world.cont_na"), OC: T("world.cont_oc"), SA: T("world.cont_sa") };
  var names = null;
  try { names = new window.Intl.DisplayNames([LG ? LG.lang : "en"], { type: "region" }); } catch (e) { names = null; }
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
  function commas(n) { return LG ? LG.num(Math.round(n)) : String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function nth(n) {
    if (LG) return LG.nth(n);
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
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function flagEl(c) { var f = el("span", "wd-flag", flag(c)); f.setAttribute("aria-hidden", "true"); return f; }
  function avg(a) { return a && a.n ? a.p / a.n : null; }

  /* ---------------- the invitation ---------------- */
  var SELF = (document.currentScript && document.currentScript.src) || "";
  var ROOT = /assets\/js\/world\.js/.test(SELF) ? SELF.replace(/assets\/js\/world\.js.*$/, "") : "../";
  function tableHref() { return TO.here(ROOT + (LG ? LG.base : "") + "world/"); }
  function tableUrl() {
    var a = TO.address();
    return a ? "https://" + a + "/" + (LG ? LG.base : "") + "world/" : (function () { try { return new URL(tableHref(), window.location.href).href; } catch (e) { return tableHref(); } })();
  }
  /* a country's team page (19 Oct 2026): team/?c=IT, with a rival too (team/?c=IT&v=DE) */
  function teamHref(c, rival) {
    if (!/^[A-Z]{2}$/.test(String(c))) return TO.here(ROOT + "team/");
    return TO.here(ROOT + "team/?c=" + c + (/^[A-Z]{2}$/.test(String(rival || "")) && rival !== c ? "&v=" + rival : ""));
  }
  function teamUrl(c, rival) {
    var a = TO.address(), rel = "team/?c=" + c + (/^[A-Z]{2}$/.test(String(rival || "")) && rival !== c ? "&v=" + rival : "");
    return a ? "https://" + a + "/" + rel : (function () { try { return new URL(TO.here(ROOT + rel), window.location.href).href; } catch (e) { return TO.here(ROOT + rel); } })();
  }
  /* place: the country's place on the world table, or, with game (a game's name), its place in that game today */
  function inviteText(c, place, game, rival) {
    var name = countryName(c);
    if (!name) return T("world.invite_plain") + " " + tableUrl();
    if (place && rival && countryName(rival)) {      // the end of the day (17 Oct 2026): the country just above
      return T("world.invite_behind", { flag: flag(c), country: name, place: nth(place), rflag: flag(rival), rival: countryName(rival) }) + " " + tableUrl();
    }
    return (place ? (game ? T("world.invite_place_game", { flag: flag(c), country: name, place: nth(place), game: game }) : T("world.invite_place", { flag: flag(c), country: name, place: nth(place) })) :
      T("world.invite_onto", { flag: flag(c), country: name })) + " " + tableUrl();
  }
  function invite(c, place, note, game, rival) {
    var text = inviteText(c, place, game, rival), nav = window.navigator;
    TO.count("world/invite");
    function copy() {
      TO.copyText(text).then(function (ok) {
        if (!note) return;
        note.textContent = ok ? T("world.copied") : T("world.copy_failed", { url: tableUrl() });
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
    b.appendChild(el("span", "", countryName(c) ? T("world.invite_from", { country: countryName(c) }) : T("world.invite")));
    b.addEventListener("click", function () { invite(c, place, note, game); });
    return b;
  }

  /* ---------------- the reveal: "The world today" ---------------- */
  var SPOT = { cousin: T("world.spot_cousin"), club: T("world.spot_club") };
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
      return T("world.hours", { h: h }) + (mm ? " " + two(mm) : "");
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
    row(T("world.you"), me, "r-you", T("world.your_score", { n: me }));
    row(T("world.world"), avg(v.w), "r-world", T("world.world_avg", { n: Math.round(avg(v.w)) }));
    if (v.t && v.t.n) row(contName(you.ct), avg(v.t), "r-cont", T("world.place_avg", { place: contName(you.ct), n: Math.round(avg(v.t)) }));
    if (v.h && v.h.n) {
      var lab = el("span", "wd-cname");
      lab.appendChild(flagEl(you.c));
      lab.appendChild(document.createTextNode(countryName(you.c)));
      row(lab, avg(v.h), "r-home", T("world.place_avg", { place: countryName(you.c), n: Math.round(avg(v.h)) }));
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
    var pts = [{ id: "ans", v: real, label: T("world.answer") + (fmt(k, real) ? " " + fmt(k, real) : "") },
               { id: "you", v: mine.g, label: T("world.you") + (fmt(k, mine.g) ? " " + fmt(k, mine.g) : "") },
               { id: "world", v: wv, label: T("world.world") + (fmt(k, wv) ? " " + fmt(k, wv) : "") }];
    if (hv !== null && v.h.gn >= 2) pts.push({ id: "home", v: hv, label: flag(you.c) + (fmt(k, hv) ? " " + fmt(k, hv) : " " + you.c) });
    var tr = function (x) { return log ? Math.log(Math.max(x, 0.5)) : x; };
    var vals = pts.map(function (p) { return tr(p.v); });
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    var pad = Math.max((hi - lo) * 0.2, hi === lo ? 1 : 0);
    lo -= pad; hi += pad;
    pts.forEach(function (p) { p.x = (tr(p.v) - lo) / (hi - lo) * 100; });

    var box = el("div", "wd-rail");
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", T("world.rail") + ": " + pts.map(function (p) { return p.label; }).join(", ") + ".");
    box.appendChild(el("p", "wd-h", T("world.rail")));
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
      p.appendChild(document.createTextNode(" "));
      if (place !== 1) p.insertAdjacentHTML("beforeend", T("world.place_in_game", { country: esc(countryName(c)), place: nth(place), of: v.rank.of }));
      else p.appendChild(document.createTextNode(v.rank.of > 1 ? T.n(v.rank.of - 1, "world.leads_game_ahead", { country: countryName(c) }) : T("world.leads_game", { country: countryName(c) })));
    } else if (named && v.h && v.h.n && v.rank) {
      var need = Math.max(1, v.rank.min - v.h.n);
      p.appendChild(flagEl(c));
      p.appendChild(document.createTextNode(" "));
      p.insertAdjacentHTML("beforeend", T.n(v.h.n, "world.players_so_far_need", { country: esc(countryName(c)), need: need }));
    } else if (named && v.h && v.h.n) {
      p.appendChild(flagEl(c));
      p.appendChild(document.createTextNode(" " + T.n(v.h.n, "world.players_so_far", { country: countryName(c) })));
    } else p.hidden = true;
    wrap.appendChild(p);
    if (v.top && v.top.length) {
      var t = el("p", "wd-top3");
      t.appendChild(el("span", "", T("world.top_today")));
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
    a.appendChild(el("span", "", T("world.table")));
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
      mid.appendChild(el("span", "t", text || T("world.choice", { letter: letter })));
      var bar = el("span", "wd-bar");
      var fill = el("i", "");
      var share = pct(v.w.k[i], n);
      fill.style.width = Math.max(2, share) + "%";
      bar.appendChild(fill);
      mid.appendChild(bar);
      li.appendChild(mid);
      li.appendChild(el("b", "", LG ? LG.pct(share) : share + "%"));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    var same = pct(v.w.k[r.c] || 0, v.w.n);
    var line = el("p", "wd-big");
    line.innerHTML = v.h && v.h.n > 1 ? T("world.chose_like_both", { pct: same, hpct: pct(v.h.k[r.c], v.h.n), country: esc(countryName(you.c)) }) : T("world.chose_like", { pct: same });
    box.appendChild(line);
    var real = el("p", "wd-line");
    real.textContent = T("world.same_as_leader", { pct: pct(v.w.k[r.r] || 0, v.w.n) });
    box.appendChild(real);
    return box;
  }

  function draw(box, G, r, mine, data, counted) {
    var v = data.view, you = data.you || { c: "??", ct: "??" };
    box.textContent = "";
    if (!v || !v.w || !v.w.n) { box.hidden = true; return; }
    box.hidden = false;
    var top = el("div", "wd-top2");
    top.appendChild(el("h2", "", T("world.today")));
    var n = el("span", "wd-n");
    n.innerHTML = T("world.n_played", { n: commas(v.w.n) });
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
    box.appendChild(el("p", "wd-sub", T("world.score_of_100")));
    box.appendChild(bars(G, me, v, you));
    var b = beat(v, me, counted), big = el("p", "wd-big");
    if (b === null) big.textContent = counted ? T("world.first_today") : T("world.nobody_yet");
    else big.innerHTML = T("world.you_beat", { pct: b });
    box.appendChild(big);
    var rl = rail(G, r, mine, v, you);
    if (rl) box.appendChild(rl);
    if (v.w.n >= 2) {
      var spot = el("p", "wd-line");
      var sp = pct(v.w.h[10], v.w.n);
      spot.textContent = (v.h && v.h.n >= 3 ? T("world.spot_share_both", { pct: sp, did: SPOT[G.key] || T("world.spot_were"), hpct: pct(v.h.h[10], v.h.n), country: countryName(you.c) })
        : T("world.spot_share", { pct: sp, did: SPOT[G.key] || T("world.spot_were") }));
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
    box.setAttribute("aria-label", T("world.today"));
    box.setAttribute("data-g", G.key);
    box.appendChild(el("p", "wd-wait", T("world.counting")));
    after.appendChild(box);
    flush(key, G.key).then(function (res) {
      if (!res || res.status !== 200 || !res.data || !res.data.view) { box.hidden = true; return; }
      draw(box, G, r, mine, res.data, gotOn(key).indexOf(G.key) >= 0);
    }, function () { box.hidden = true; }).catch(function () { box.hidden = true; });
    return box;
  }
  TO.worldHook = block;

  /* ---------------- the end of the day: your country's place today (17 Oct 2026) ----------------
     Under the clock of the card that closes a day with all nine games played: where your country stands on the
     world table today, who stands just above it, and one tap to bring friends ("this country is doing better than
     that", Khayyam, 15 Oct 2026). The same call and the same table as the home page's box. Nothing more is sent. */
  function pride(host) {
    if (!on() || !host) return;
    var key = todayKey();
    flushBoth(key).then(function () { return call("world", { d: key, span: "day" }); }).then(function (r) {
      if (!r || r.status !== 200 || !host.parentNode) return;
      var t = rank(r.data), you = r.data.you || {}, c = you.c;
      if (!countryName(c)) return;
      var me = null;
      t.rows.forEach(function (x) { if (x.c === c) me = x; });
      var place = me && me.at ? me.at : 0, rival = place > 1 ? t.ranked[place - 2] : null;
      var btn = el("button", "eod-pride"), line = el("span", "eod-pride-text");
      btn.type = "button";
      line.appendChild(flagEl(c));
      line.appendChild(document.createTextNode(" "));
      var cta;
      if (place === 1) {
        line.appendChild(document.createTextNode(T("world.leads_world", { country: countryName(c) })));
        cta = T("world.keep_it_there");
      } else if (place && rival) {
        line.insertAdjacentHTML("beforeend", T("world.is_behind", { country: esc(countryName(c)), place: nth(place), rflag: flag(rival.c), rival: esc(countryName(rival.c)) }));
        cta = T("world.help_climb");
      } else {
        var need = Math.max(1, t.min - (me ? me.n : 0));
        line.insertAdjacentHTML("beforeend", T.n(need, "world.needs_more", { country: esc(countryName(c)), need: need }));
        cta = T("world.invite");
      }
      /* the daily reminder may say it tomorrow, once, when the place changed (turnsout.js keeps and sends it) */
      try {
        if (typeof TO.keepTip === "function") {
          var tip = place === 1 ? T("world.tip_led", { country: countryName(c) })
            : (place && rival) ? T("world.tip_behind", { country: countryName(c), place: nth(place), rival: countryName(rival.c) }) : "";
          if (tip) TO.keepTip(tip.length <= 110 ? tip : "", c + ":" + place);
        }
      } catch (e) { /* the reminder simply has no country line */ }
      btn.appendChild(line);
      btn.appendChild(el("span", "eod-pride-go", cta + " \u203a"));
      var note = el("p", "wd-note");
      note.hidden = true;
      note.setAttribute("role", "status");
      btn.addEventListener("click", function () { invite(c, place, note, "", rival ? rival.c : ""); });
      host.textContent = "";
      host.appendChild(btn);
      host.appendChild(note);
      host.hidden = false;
    }).then(null, function () { /* the line simply stays away */ });
  }
  TO.prideHook = pride;

  /* ---------------- reactions (19 Oct 2026, Khayyam: "reactions on the site") ----------------
     One slim row of three taps on the finish card, above the "Next game" button: surprised, knew it, made me think.
     One tap per game and day (kept in this browser, beside the world's other marks); the tap goes to the server,
     which counts it by country and answers with everyone's counts, and the three chips turn into the world's share
     of each feeling, with the country's share under it. The row never grows: the same three chips, the same height.
     Nothing is typed, nothing identifies anyone, so there is nothing to moderate. A player who left their results
     out of the world's counts gets no row. Whatever goes wrong, the row simply stays as it is or stays away. */
  var FEEL = [
    { e: "\uD83D\uDE2E", t: T("world.feel_surprised"), w: T("world.felt_surprised") },
    { e: "\uD83D\uDE0F", t: T("world.feel_knew"), w: T("world.felt_knew") },
    { e: "\uD83E\uDD14", t: T("world.feel_think"), w: T("world.felt_think") }
  ];
  function rxMap() { var m = store().rx; return m && typeof m === "object" && !Array.isArray(m) ? m : {}; }
  function rxGet(key, k) { var d = rxMap()[key], v = d && typeof d === "object" ? d[k] : null; return v === 0 || v === 1 || v === 2 ? v : null; }
  function rxSet(key, k, r) {
    TO.worldUpdate(function (w) {
      if (!w.rx || typeof w.rx !== "object" || Array.isArray(w.rx)) w.rx = {};
      if (!w.rx[key] || typeof w.rx[key] !== "object") w.rx[key] = {};
      w.rx[key][k] = r;
      var keep = shiftKey(todayKey(), -1);
      Object.keys(w.rx).forEach(function (d) { if (!(d >= keep)) delete w.rx[d]; });
    });
  }
  function sum3(a) { return (a ? a[0] + a[1] + a[2] : 0); }
  function drawFeel(row, view, you, mine) {
    var w = view && view.w ? view.w : [0, 0, 0], h = view && view.h ? view.h : null;
    var tw = sum3(w), th = sum3(h), c = you && you.c;
    row.setAttribute("data-done", "1");
    Array.prototype.forEach.call(row.querySelectorAll(".rx-b"), function (b, i) {
      var pw = tw >= 5 ? Math.round(100 * w[i] / tw) : null;
      b.classList.toggle("rx-me", i === mine);
      b.setAttribute("aria-pressed", i === mine ? "true" : "false");
      b.style.setProperty("--p", (pw === null ? 0 : pw) + "%");
      b.textContent = "";
      var top = el("span", "rx-top");
      top.appendChild(el("span", "rx-e", FEEL[i].e));
      top.appendChild(el("span", "rx-globe", "\uD83C\uDF0D"));          // the big number is the world's (24 Oct 2026, Khayyam)
      top.appendChild(el("b", "rx-n", pw === null ? String(w[i]) : (LG ? LG.pct(pw) : pw + "%")));
      b.appendChild(top);
      var ph = th >= 5 && countryName(c) ? Math.round(100 * h[i] / th) : null;
      var low = el("span", "rx-low");
      if (ph !== null) { low.appendChild(flagEl(c)); low.appendChild(document.createTextNode(" " + (LG ? LG.pct(ph) : ph + "%"))); } else low.textContent = FEEL[i].t;
      b.appendChild(low);
      b.setAttribute("aria-label", FEEL[i].t + ": " + (pw === null ? T.n(w[i], "world.n_players") : T("world.pct_of_world", { pct: pw })) +
        (ph !== null ? ", " + T("world.pct_of_country", { pct: ph, country: countryName(c) }) : "") + (i === mine ? ". " + T("world.your_pick") : "."));
      b.disabled = true;
    });
    /* how many people stand behind the numbers, so the scale is plain (24 Oct 2026, Khayyam) */
    var old = row.querySelector(".rx-people");
    if (old) row.removeChild(old);
    if (tw > 0) row.appendChild(el("p", "rx-people", "\uD83C\uDF0D " + T.n(tw, "world.reacted", { n: fmtN(tw) })));
  }
  function fmtN(n) { try { return Number(n).toLocaleString(LG ? LG.locale : "en-US"); } catch (e) { return String(n); } }
  function reactRow(o) {
    if (!on() || off() || !o || !o.game) return null;
    var G = gameBy("id", o.game);
    var liveDay = !o.practice && (!o.day || !o.today || o.day === o.today);
    if (!G || !liveDay) return null;
    var key = o.day > 0 ? keyForDay(G, o.day) : todayKey();
    if (!resultFor(G, key)) return null;
    var row = el("div", "rx");
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", T("world.how_feel"));
    row.setAttribute("data-g", G.key);
    FEEL.forEach(function (f, i) {
      var b = el("button", "rx-b");
      b.type = "button";
      b.setAttribute("data-r", String(i));
      b.setAttribute("aria-label", f.t);
      b.appendChild(el("span", "rx-e", f.e));
      b.appendChild(el("span", "rx-t", f.t));
      row.appendChild(b);
    });
    function show(r, res) { drawFeel(row, res && res.data ? res.data.view : null, res && res.data ? res.data.you : null, r); }
    var had = rxGet(key, G.key);
    if (had !== null) {                                // tapped before: the counts, read only
      row.setAttribute("data-wait", "1");
      call("react", { d: key, k: G.key }).then(function (res) {
        row.removeAttribute("data-wait");
        if (res.status === 200 && res.data && res.data.view) show(had, res); else drawFeel(row, null, null, had);
      }, function () { row.removeAttribute("data-wait"); drawFeel(row, null, null, had); });
      return row;
    }
    Array.prototype.forEach.call(row.querySelectorAll(".rx-b"), function (b) {
      b.addEventListener("click", function () {
        if (row.getAttribute("data-wait") || row.getAttribute("data-done")) return;
        var r = +b.getAttribute("data-r");
        row.setAttribute("data-wait", "1");
        b.classList.add("rx-me");
        TO.count("rx/" + G.key + "/" + r);
        call("react", { d: key, k: G.key, r: r }).then(function (res) {
          row.removeAttribute("data-wait");
          if (res.status === 200 && res.data && res.data.view) { rxSet(key, G.key, r); show(r, res); }
          else b.classList.remove("rx-me");            // not counted (a refusal, an old page): tap again
        }, function () { row.removeAttribute("data-wait"); b.classList.remove("rx-me"); });
      });
    });
    return row;
  }
  TO.reactHook = reactRow;

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
    flushBoth(key).then(function () { return call("world", { d: key, span: "day", tot: 1 }); }).then(function (r) {
      if (!r || r.status !== 200) return;
      var t = rank(r.data), you = r.data.you || {};
      /* the games played today: the daily games and the word games together (29 Oct 2026, Khayyam: the box counted
         the daily games only). tot comes with the answer (the server's two halves of the World page); without it,
         the daily games as before. */
      var tot = r.data.tot, played = r.data.n + (r.data.calls || 0);
      if (tot && tot.d === key && tot.daily && tot.words && isFinite(tot.daily[0]) && isFinite(tot.words[0])) played = Math.max(played, tot.daily[0]) + tot.words[0];
      var h = document.getElementById("worldbox-h"), sub = document.getElementById("worldbox-sub");
      var mine = null;
      t.rows.forEach(function (x) { if (x.c === you.c) mine = x; });
      if (h && mine && mine.at) h.textContent = flag(you.c) + " " + T("world.is_today", { country: countryName(you.c), place: nth(mine.at) });
      else if (h && countryName(you.c)) h.textContent = flag(you.c) + " " + T("world.on_table", { country: countryName(you.c) });
      if (sub) sub.textContent = played ? T.n(Math.max(1, t.rows.length), "world.games_today_in", { games: commas(played) }) : T("world.counts_for_country");
    }, function () { /* the box keeps its plain words */ });
  }

  /* ---------------- the table itself, worked out from a summary (the World table page and the home box) ----
     A country's score is one number, from two parts (18 Oct 2026, Khayyam's choice: a country is a team):
       quality: its players' average points, made fair across games by the server (tally.js); above the world's
                average it is pulled back toward it as if it had PULL more games at that average, so a handful of
                lucky games, or one person playing again and again, never tops the table; below the average a
                country keeps its own average (so more players never hurt it);
       + team:  up to BONUS.most points for the games its players finished (Your Call's too). It grows with every
                tenfold of games and is full at BONUS.full games, so 10 games earn 40% of it and 100 games 81%
                (on a day); after that more players add nothing and only playing well counts. Inviting friends
                always helps, but it never decides alone.
     The score never goes above 100. A country takes a place from MIN games. Continents: the quality only, with
     the same pull and minimum. The week (from Monday) and the month sit between and above the day in all of these.
     Kept for later (Khayyam, 18 Oct 2026): teams sized by population, the full-team ceiling growing with the
     square root of the country's population (Penrose), so the USA needs about 2.4 times Italy's players. */
  var PULL = { day: 100, week: 200, month: 300 };
  var MIN = { day: 10, week: 20, month: 30 };
  var BONUS = { most: 25, full: { day: 300, week: 1500, month: 6000 } };
  function bonus(played, span) {
    var full = BONUS.full[span] || BONUS.full.day;
    return played > 1 ? BONUS.most * Math.min(1, Math.log(played) / Math.log(full)) : 0;
  }
  function quality(n, a, K, M) { return n && a / n <= M ? a / n : (a + K * M) / (n + K); }
  function rank(d) {
    var span = d.span === "month" ? "month" : d.span === "week" ? "week" : "day", K = PULL[span], M = d.m || 0;
    /* n: the scored games, which rank; played: those and Your Call's, which count in the games played and the bonus */
    var rows = (d.cs || []).map(function (x) {
      var played = x[2] + (x[4] || 0), q = quality(x[2], x[3], K, M), b = bonus(played, span);
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
    on: on, call: call, post: post, flush: flush, flushBoth: flushBoth, todayKey: todayKey, shiftKey: shiftKey, dateOf: dateOf,
    countryName: countryName, flag: flag, flagEl: flagEl, contName: contName, CONT: CONT,
    commas: commas, nth: nth, rank: rank, bonus: bonus, BONUS: BONUS, invite: invite, inviteButton: inviteButton, inviteText: inviteText,
    off: off, setOff: setOff, block: block, draw: draw, el: el, esc: esc, tableUrl: tableUrl, PULL: PULL, MIN: MIN,
    teamHref: teamHref, teamUrl: teamUrl, FEEL: FEEL, keyForDay: keyForDay
  };

  /* ---------------- the honest sentence ----------------
     Every page that sends says so where it speaks about privacy, in the same words (and the World table page
     says it in full). Joined once, as Rooms join theirs; on a page where the world's counts are off, nothing. */
  var SHORT = T("world.priv_short"), TINY = T("world.priv_tiny"), FULL = T("world.priv_full");
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
