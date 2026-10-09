/* Logicers — Rooms: a room of 2 to 50 friends who play the daily games and share a table,
   today's and the month's, on the site's one small server (server/rooms/worker.js).
   This script rides on the home page, the nine daily game pages and the room page, after
   turnsout.js and duel.js. For a browser that is in no room it draws nothing, fetches nothing
   and changes nothing: the site's promise stays true word for word for everyone who never joins.
   For a member it does one thing at a reveal: it sends that day's finished scores to their rooms
   and says so in one quiet line. The room page (room/) does the joining, the table and the
   deleting. Why each decision was taken: r/rooms-workshop/design.txt on the Mac.
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

  /* ---------------- sending a day to the rooms ---------------- */
  /* The whole finished day goes, not one game: the server keeps the first result per game and
     day, so a resend costs nothing and heals any send that failed earlier. What goes is exactly
     what a duel link would carry (Duel.mine): the games' own scores, nothing of any answer. */
  function flush(key, done) {
    key = key || D.todayKey();
    var scores = D.mine(key), rooms = myRooms();
    if (!on() || !rooms.length || !D.named() || !D.countOf(scores)) { if (done) done(null); return; }
    var waiting = rooms.length, failed = [], sent = 0;
    rooms.forEach(function (room) {
      call("send", { code: room.code, tok: token(), name: D.me(), day: key, scores: scores })
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

  /* ---------------- the quiet line at a reveal ---------------- */
  /* The duel block above it is the loud thing; a room is a standing table, so one line is enough.
     It appears only for a member, on the day's own puzzle. */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function roomsHref() {
    var SELF = (document.currentScript && document.currentScript.src) || "";
    var ROOT = /assets\/js\/rooms\.js/.test(SELF) ? SELF.replace(/assets\/js\/rooms\.js.*$/, "") : "../";
    return TO.here(ROOT + "room/");
  }
  var HREF = roomsHref();
  function block(after, o) {
    var old = document.getElementById("rooms-line");
    if (old && old.parentNode) old.parentNode.removeChild(old);
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
    flush(D.todayKey(), function (r) {
      if (!r) { if (p.parentNode) p.parentNode.removeChild(p); return; }
      word.textContent = r.failed
        ? "Your room's table gets this when the server can be reached again."
        : (myRooms().length === 1 ? "Sent to your room." : "Sent to your " + myRooms().length + " rooms.");
    });
    return p;
  }
  TO.roomHook = block;

  /* ---------------- the honest sentence for a member ---------------- */
  /* Every page says results stay in the browser. For a member of a room that is no longer the
     whole truth, so this one sentence joins the privacy lines — on their pages only. The full
     words (what is sent, when, to whom, for how long, and how to delete it) stand on the room
     page and in the About sheet. */
  function honest() {
    if (!on() || !inRooms()) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-privacy]"), function (elx) {
      if (elx.getAttribute("data-privacy") === "rooms") return;    // the room page's own words already say it all
      if (elx.getAttribute("data-rooms")) return;
      elx.setAttribute("data-rooms", "1");
      elx.textContent += " You are in a room, so each game you finish also sends its result — the game, the score, the day and your name — to your room's table on the site's own server.";
    });
  }

  /* ---------------- the home page ---------------- */
  /* Its quiet line under the Today card is in the page but hidden, so a site where rooms are not
     switched on yet shows nothing and promises nothing. */
  function home() {
    if (!on()) return;
    var line = document.getElementById("today-rooms");
    if (line) line.hidden = false;
    var about = document.getElementById("about-rooms");
    if (about) about.hidden = false;
  }

  window.Rooms = {
    API: apiBase, on: on, token: token, myRooms: myRooms, inRooms: inRooms,
    call: call, flush: flush, retry: retry, forget: forget, block: block, href: HREF
  };

  function start() { honest(); home(); retry(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
