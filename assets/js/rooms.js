/* Logicers — Rooms: a room of 2 to 50 friends who play the daily games and share a table,
   today's and the month's, on the site's one small server (server/rooms/worker.js).
   This script rides on the home page, the nine daily game pages and the room page, after
   turnsout.js and duel.js. For a browser that is in no room it draws nothing, fetches nothing
   and changes nothing: the site's promise stays true word for word for everyone who never joins.
   For a member it does three quiet things: at a reveal it sends that day's finished scores (and,
   for the games whose guess is one number, the guess, so friends who have ALSO played can see
   where everyone landed), says so in one line, and shows the friends' guesses on a small strip;
   on the home page it fills the Game Room box; and when all of today is played it offers the way
   back to the room. The room page (room/) does the joining, the board and the deleting.
   Why each decision was taken: r/rooms-workshop/design.txt on the Mac.
   A dead or unreachable server must never break a game: every call here is wrapped whole, like
   the visitor counter's. */
(function () {
  "use strict";

  var TO = window.TurnsOut, D = window.Duel;
  if (!TO || !D) return;

  /* ------------------------------------------------------------------
     The server's own address (the Cloudflare Worker logicers-rooms, made by Khayyam on 9 Oct 2026).
     Empty quotes would switch rooms off: nothing of them would show anywhere. No closing slash.
     ------------------------------------------------------------------ */
  var API = "https://logicers-rooms.rza-khay.workers.dev";

  /* The checks run the site from localhost and stand a pretend server up; they may point this
     script at it. Only there: a live page never takes an address from anywhere but API above. */
  function apiBase() {
    var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
    if (local && typeof window.LOGICERS_ROOMS_API === "string") return window.LOGICERS_ROOMS_API;
    return API;
  }
  function on() { return !!apiBase(); }

  /* ---------------- who this browser is ---------------- */
  /* A random token, drawn once, kept beside the duel's name. It stands for this browser on the
     server; the name is only what the table shows. No account, nothing to guess. */
  function token() {
    var r = TO.roomsStore();
    if (r.tok) return r.tok;
    var b = new Uint8Array(16), s = "";
    (window.crypto || {}).getRandomValues ? window.crypto.getRandomValues(b) : b.forEach(function (_, i) { b[i] = Math.floor(Math.random() * 256); });
    for (var i = 0; i < b.length; i++) s += (b[i] < 16 ? "0" : "") + b[i].toString(16);
    TO.roomsUpdate(function (st) { if (!st.tok) st.tok = s; });
    return TO.roomsStore().tok;
  }
  function myRooms() { return TO.roomsStore().list.filter(function (x) { return x && typeof x.code === "string"; }); }
  function inRooms() { return myRooms().length > 0; }

  /* ---------------- talking to the server ---------------- */
  function call(what, body) {
    return window.fetch(apiBase() + "/api/" + what, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().then(function (data) { return { status: res.status, data: data }; },
                             function () { return { status: res.status, data: {} }; });
    });
  }

  /* ---------------- the room's link ----------------
     Short since the second round: logicers.com/r/#Khayyam-k7m2q9xp4h — the sharer's own name as a
     label a friend recognises, then the code, which alone opens the room. The label is for people;
     the server never reads it. /r/ is a tiny page that forwards to /room/#r=..., and every old
     20-letter /room/#r= link keeps working for ever. */
  var SELF = (document.currentScript && document.currentScript.src) || "";
  var ROOT = /assets\/js\/rooms\.js/.test(SELF) ? SELF.replace(/assets\/js\/rooms\.js.*$/, "") : "../";
  function roomsHref() { return TO.here(ROOT + "room/"); }
  var HREF = roomsHref();
  function absolute(href) {
    try { return new URL(href, window.location.href).href; } catch (e) { return href; }
  }
  function link(code) {
    var label = D.named() ? encodeURIComponent(D.me()) + "-" : "";
    return absolute(TO.here(ROOT + "r/")) + "#" + label + code;
  }
  function invite(code) {
    var who = D.named() ? D.me() + " invites you to " + (D.me().slice(-1).toLowerCase() === "s" ? D.me() + "'" : D.me() + "'s") + " room on Logicers" : "You are invited to a room on Logicers";
    return who + " — small daily games, a minute each, with a shared table for the month. " + link(code);
  }

  /* ---------------- the faces ----------------
     A face is a coloured circle with the first letters of the name: nobody uploads anything.
     The colour is drawn from the name, and two names in one room can never share one (the duel's
     rule that two meanings never share a shape): members are laid out in one fixed order (their
     folded names), each name hashes to one of 60 slots — 30 hues, two lightnesses — and walks
     forward to the first free one. Every phone works from the same member list, so every phone
     draws the same colours. 50 members at most, 60 slots: there is always room. */
  function foldN(s) { return String(s || "").toLowerCase().replace(/\s+/g, ""); }
  function hashN(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h;
  }
  function initials(n) {
    var a = [];
    try { a = Array.from(String(n).trim()); } catch (e) { a = String(n).trim().split(""); }
    return a.slice(0, 2).join("").toUpperCase();
  }
  function faces(names) {
    var sorted = names.slice().sort(function (a, b) {
      var x = foldN(a), y = foldN(b);
      return x < y ? -1 : x > y ? 1 : 0;
    });
    var used = {}, out = {};
    sorted.forEach(function (n) {
      var f = foldN(n);
      if (out[f]) return;
      var s = hashN(f) % 60;
      while (used[s]) s = (s + 1) % 60;
      used[s] = 1;
      out[f] = { bg: "hsl(" + (s % 30) * 12 + ", 62%, " + (s < 30 ? 34 : 44) + "%)", two: initials(n) };
    });
    return out;
  }
  function faceEl(name, book, cls) {
    var f = (book && book[foldN(name)]) || { bg: "hsl(230, 20%, 40%)", two: initials(name) };
    var e = el("span", "rm-face" + (cls ? " " + cls : ""), f.two);
    e.style.background = f.bg;
    e.title = name;
    e.setAttribute("aria-label", name);
    return e;
  }

  /* ---------------- sending a day to the rooms ---------------- */
  /* The whole finished day goes, not one game: the server keeps the first result per game and
     day, so a resend costs nothing and heals any send that failed earlier. What goes is exactly
     what a duel link would carry (Duel.mine): the games' own scores, nothing of any answer —
     plus, for the games whose guess is one number, the raw guess, so a friend who has ALSO
     played can see where everyone landed. The server shows a guess to nobody who has not sent
     that game themselves. */
  var TRACK = {                          /* how to read the viewer's own stored result */
    hundred: { real: function (r) { return r.a; }, guess: function (r) { return r.g; } },
    apart:   { real: function (r) { return r.a; }, guess: function (r) { return r.g; } },
    o24:     { real: function (r) { return r.g - r.y; }, guess: function (r) { return r.g; } },
    energy:  { real: function (r) { return r.g - r.y / 2; }, guess: function (r) { return r.g; } },
    every:   { real: function (r) {
                 if (!r.y) return r.g;
                 var k = Math.abs(r.y) / 10;
                 return r.y > 0 ? r.g / k : r.g * k;
               }, guess: function (r) { return r.g; } }
  };
  function gameFor(key) {
    var G = null;
    TO.GAMES.forEach(function (x) { if (x.key === key) G = x; });
    return G;
  }
  function resultFor(key, dayKey) {
    var G = gameFor(key);
    if (!G) return null;
    var n = D.dayFor(G, dayKey);
    if (!n) return null;
    var r = null;
    try { r = TO.game(G.id).results[n]; } catch (e) { return null; }
    return (r && G.done(r)) ? r : null;
  }
  function guessesOf(dayKey) {
    var out = {};
    Object.keys(TRACK).forEach(function (key) {
      var r = resultFor(key, dayKey);
      if (!r) return;
      var g = TRACK[key].guess(r);
      if (typeof g === "number" && isFinite(g)) out[key] = g;
    });
    return out;
  }
  function flush(key, done) {
    key = key || D.todayKey();
    var scores = D.mine(key), rooms = myRooms();
    if (!on() || !rooms.length || !D.named() || !D.countOf(scores)) { if (done) done(null); return; }
    var guesses = guessesOf(key);
    var waiting = rooms.length, failed = [], sent = 0;
    rooms.forEach(function (room) {
      call("send", { code: room.code, tok: token(), name: D.me(), day: key, scores: scores, guesses: guesses })
        .then(function (r) {
          if (r.status === 404 || r.status === 403) forget(room.code);   // the room or the membership is gone
          else if (r.status !== 200) failed.push(room.code);
          else sent++;
          step();
        }, function () { failed.push(room.code); step(); });
    });
    function step() {
      if (--waiting) return;
      TO.roomsUpdate(function (st) {
        st.out = {};
        if (failed.length) st.out[key] = failed;    // tried again on the next page this script rides on
      });
      if (done) done({ sent: sent, failed: failed.length });
    }
  }
  function forget(code) {
    TO.roomsUpdate(function (st) { st.list = st.list.filter(function (x) { return !x || x.code !== code; }); });
  }
  function retry() {                     // what an earlier page could not send
    var out = TO.roomsStore().out, keys = Object.keys(out);
    if (!keys.length) return;
    var key = keys[0];
    if (!/^\d{8}$/.test(key) || key < D.keyOf(new Date(Date.now() - 2 * 86400000))) {
      TO.roomsUpdate(function (st) { st.out = {}; });     // too old to take: the server would refuse it
      return;
    }
    flush(key, null);
  }

  /* ---------------- the quiet line and the strip at a reveal ---------------- */
  /* The duel block above it is the loud thing; a room is a standing table, so the words stay one
     line. Under it, for the games whose guess is one number, the friends' guesses stand on one
     small strip: the real answer marked, a face per friend placed by their guess. It is drawn
     only from what the server sends, and the server sends a game's guesses only to a member who
     has already sent that game — so nothing here can ever spoil a puzzle. */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function strip(gameKey, dayKey, data) {
    var t = TRACK[gameKey];
    var list = (data && data.today && data.today.guesses && data.today.guesses[gameKey]) || [];
    var mineR = resultFor(gameKey, dayKey);
    if (!t || !mineR) return null;
    var others = list.filter(function (x) { return x && !x.you && typeof x.g === "number" && isFinite(x.g); });
    if (!others.length) return null;
    var real = t.real(mineR), mineG = t.guess(mineR);

    /* the window: everything shown, padded, the answer always inside */
    var vals = [real, mineG];
    others.forEach(function (x) { vals.push(x.g); });
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    var pad = Math.max((hi - lo) * 0.18, (hi - lo) === 0 ? 1 : 0.0001);
    lo -= pad; hi += pad;
    function at(v) { return ((v - lo) / (hi - lo)) * 100; }

    var names = [D.me()];
    others.forEach(function (x) { names.push(x.name); });
    var book = faces(names);

    var box = el("div", "rm-strip");
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", "Where your room landed: " + others.length + (others.length === 1 ? " friend" : " friends") + " and you, beside the answer.");
    var head = el("p", "rm-strip-h", "Where your room landed");
    box.appendChild(head);
    var rail = el("div", "rm-strip-rail");
    var line = el("i", "rm-strip-line");
    rail.appendChild(line);
    var mark = el("i", "rm-strip-real");
    mark.style.left = at(real) + "%";
    rail.appendChild(mark);
    var tag = el("span", "rm-strip-tag", "the answer");
    tag.style.left = at(real) + "%";
    rail.appendChild(tag);

    /* five faces at most: you, the two closest and the two furthest; the rest one tap away */
    var sorted = others.slice().sort(function (a, b) { return Math.abs(a.g - real) - Math.abs(b.g - real); });
    var shown = sorted, folded = 0;
    if (sorted.length > 4) {
      shown = sorted.slice(0, 2).concat(sorted.slice(-2));
      folded = sorted.length - 4;
    }
    function put(name, g, mine) {
      var f = faceEl(name, book, mine ? "you" : "");
      f.style.left = at(g) + "%";
      rail.appendChild(f);
    }
    function fill(all) {
      (all ? sorted : shown).forEach(function (x) { put(x.name, x.g, false); });
      put(D.me(), mineG, true);
    }
    fill(false);
    box.appendChild(rail);
    if (folded) {
      var more = el("button", "rm-strip-more", "+" + folded + " more");
      more.type = "button";
      more.addEventListener("click", function () {
        Array.prototype.forEach.call(rail.querySelectorAll(".rm-face"), function (x) { rail.removeChild(x); });
        fill(true);
        more.hidden = true;
      });
      box.appendChild(more);
    }
    return box;
  }

  function block(after, o) {
    var old = document.getElementById("rooms-line");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var oldStrip = document.getElementById("rooms-strip");
    if (oldStrip && oldStrip.parentNode) oldStrip.parentNode.removeChild(oldStrip);
    if (!on() || !inRooms()) return null;
    var liveDay = !o.practice && (!o.day || !o.today || o.day === o.today);
    if (!liveDay) return null;
    var p = el("p", "rooms-line");
    p.id = "rooms-line";
    var word = el("span", "", "Sending to your room…");
    p.appendChild(word);
    p.appendChild(document.createTextNode(" "));
    var a = el("a", "", myRooms().length === 1 ? "See the table" : "See the tables");
    a.href = HREF;
    p.appendChild(a);
    after.appendChild(p);
    var key = D.todayKey();
    flush(key, function (r) {
      if (!r) { if (p.parentNode) p.parentNode.removeChild(p); return; }
      word.textContent = r.failed
        ? "Your room's table gets this when the server can be reached again."
        : (myRooms().length === 1 ? "Sent to your room." : "Sent to your " + myRooms().length + " rooms.");
      if (r.failed || !o.game) return;
      /* the strip: the first room's friends, on this game's own scale */
      var G = null;
      TO.GAMES.forEach(function (x) { if (x.id === o.game) G = x; });
      if (!G || !TRACK[G.key]) return;
      call("view", { code: myRooms()[0].code, tok: token(), day: key }).then(function (v) {
        if (v.status !== 200) return;
        var s = strip(G.key, key, v.data);
        if (!s) return;
        s.id = "rooms-strip";
        if (p.parentNode) p.parentNode.insertBefore(s, p.nextSibling);
      }, function () { /* the line already said what matters */ });
    });
    return p;
  }
  TO.roomHook = block;

  /* ---------------- all of today played: back to the room ---------------- */
  TO.allDoneHook = function () {
    if (!on() || !inRooms()) return null;
    var a = el("a", "rm-back");
    a.href = HREF;
    a.setAttribute("data-g", "room");
    var t = el("span", "rm-back-text");
    t.appendChild(el("span", "rm-back-kicker", "All done for today"));
    t.appendChild(el("span", "rm-back-name", "Back to the room"));
    a.appendChild(t);
    a.insertAdjacentHTML("beforeend",
      '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    a.addEventListener("click", function () { TO.count("room/back"); });
    return a;
  };

  /* ---------------- the honest sentence for a member ---------------- */
  /* Every page says results stay in the browser. For a member of a room that is no longer the
     whole truth, so this one sentence joins the privacy lines — on their pages only. The full
     words (what is sent, when, to whom, for how long, and how to delete it) stand in the room
     page's help sheet and in the About sheet. */
  function honest() {
    if (!on() || !inRooms()) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (elx) {
      if (elx.getAttribute("data-privacy") === "rooms") return;    // the room page's own words already say it all
      if (elx.getAttribute("data-rooms")) return;
      elx.setAttribute("data-rooms", "1");
      elx.textContent += " You are in a room, so each game you finish also sends its result — the game, the score, your guess, the day and your name — to your room's table on the site's own server.";
    });
  }

  /* ---------------- the home page: the Game Room box ---------------- */
  /* The box waits hidden in the page, so a site where rooms are not switched on shows nothing and
     promises nothing. For a browser in no room it is one still picture and one line, and nothing
     is fetched: the promise that a non-member's phone sends not one request stays a fact. For a
     member it shows the room itself: the faces, how many have played today, a crown on who leads
     the month. */
  function home() {
    if (!on()) return;
    var about = document.getElementById("about-rooms");
    if (about) about.hidden = false;
    var line = document.getElementById("today-rooms");      // the old quiet line, on pages not yet rebuilt
    if (line && !document.getElementById("gameroom")) line.hidden = false;
    var box = document.getElementById("gameroom");
    if (!box) return;
    box.hidden = false;
    if (!inRooms()) return;
    var room = myRooms()[0];
    call("view", { code: room.code, tok: token(), day: D.todayKey() }).then(function (r) {
      if (r.status === 404 || r.status === 403) { forget(room.code); return; }
      if (r.status !== 200 || !r.data.today) return;
      var d = r.data;
      var played = d.today.points.filter(function (p) { return p.sent > 0; }).length;
      var h = document.getElementById("gameroom-h");
      var sub = document.getElementById("gameroom-sub");
      if (h) h.textContent = played + " of " + d.count + " played today";
      if (sub) sub.textContent = d.streak > 1 ? "Room streak: " + d.streak + " days" : (room.label || "Your room");
      var row = document.getElementById("gameroom-faces");
      if (!row) return;
      row.textContent = "";
      var names = d.standings.map(function (x) { return x.name; });
      var book = faces(names);
      var lead = d.standings[0] && d.standings[0].pts > 0 ? d.standings[0].name : null;
      var playedBy = {};
      d.today.points.forEach(function (p) { if (p.sent > 0) playedBy[foldN(p.name)] = true; });
      var shown = d.standings.slice(0, 7);
      shown.forEach(function (x) {
        var wrap = el("span", "rm-face-wrap" + (playedBy[foldN(x.name)] ? "" : " quiet-face"));
        wrap.appendChild(faceEl(x.name, book));
        if (lead && x.name === lead) wrap.appendChild(el("i", "rm-crown", "👑"));
        row.appendChild(wrap);
      });
      if (d.standings.length > 7) row.appendChild(el("span", "rm-face-more", "+" + (d.standings.length - 7)));
      row.hidden = false;
    }, function () { /* the box keeps its plain words */ });
  }

  window.Rooms = {
    API: apiBase, on: on, token: token, myRooms: myRooms, inRooms: inRooms,
    call: call, flush: flush, retry: retry, forget: forget, block: block, href: HREF,
    link: link, invite: invite, faces: faces, faceEl: faceEl, foldN: foldN, TRACK: TRACK,
    guessesOf: guessesOf, strip: strip
  };

  function start() { honest(); home(); retry(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
