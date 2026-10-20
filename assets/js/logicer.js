/* Logicers: "You are Logicer №2,354" (20 Oct 2026, Khayyam: "it has to be written in an explicitly visible way with maybe
   some colours"). A browser that has finished its first game is given the next number, once, by the site's own server
   (server/live/src/totals.js keeps only the running total: not who got which number, no address). The number is kept
   in this browser beside the world's marks (TurnsOut.worldStore), so it is never asked for again. A browser that has
   not finished a game yet sees the number it would get, "Finish a game to be Logicer №2,355": an invitation, and the
   total in view for anyone curious how many play. A player who left their results out of the world's counts is never
   given a number and sees the total alone. Home page only. Nothing here can break a game: every step is wrapped, and
   the whole file does nothing when the world's server is off. */
(function () {
  "use strict";
  var TO = window.TurnsOut, W = window.LogicersWorld;
  if (!TO || !W || !W.on()) return;
  var box = document.getElementById("logicer");
  if (!box) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = String(text);
    return e;
  }
  function soFar(n) { return fmt(n) + (n === 1 ? " Logicer" : " Logicers") + " so far"; }
  function fmt(n) { try { return Number(n).toLocaleString("en-US"); } catch (e) { return String(n); } }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function since(d) {
    var s = String(d || "");
    if (!/^\d{8}$/.test(s)) return "";
    var m = +s.slice(4, 6) - 1, day = +s.slice(6, 8);
    return m >= 0 && m < 12 && day > 0 ? " · since " + day + " " + MONTHS[m] : "";
  }
  function mine() {
    try {
      var L = TO.worldStore().logicer;
      return L && typeof L === "object" && Number.isInteger(L.n) && L.n > 0 ? L : null;
    } catch (e) { return null; }
  }
  /* has this browser finished at least one daily game, ever (practice does not count: the games' own rule) */
  function played() {
    try {
      return TO.GAMES.some(function (G) {
        var res = TO.game(G.id).results;
        return Object.keys(res).some(function (k) { try { return !!G.done(res[k]); } catch (e) { return false; } });
      });
    } catch (e) { return false; }
  }
  function left() { try { return TO.worldStore().off === true; } catch (e) { return false; } }

  function draw(label, big, small, fresh) {
    box.textContent = "";
    box.classList.toggle("fresh", !!fresh);
    box.appendChild(el("span", "logicer-label", label));
    box.appendChild(el("span", "logicer-big", big));
    box.appendChild(el("span", "logicer-small", small));
    box.hidden = false;
  }
  function show(total, L, fresh) {
    if (L) draw("You are", "Logicer №" + fmt(L.n), soFar(Math.max(total, L.n)) + since(L.d), fresh);
    else if (left()) draw("Logicers so far", "№" + fmt(total), "Every one of them finished a game.", false);
    else draw("Finish a game to be", "Logicer №" + fmt(total + 1), soFar(total), false);
  }

  function start() {
    var L = mine();
    W.post("/count/view", {}).then(function (r) {
      if (r.status !== 200 || !r.data || !Number.isInteger(r.data.n)) return;
      var total = r.data.n;
      if (L || left() || !played()) { show(total, L, false); return; }
      /* a first finished game and no number yet: ask once */
      W.post("/count/join", {}).then(function (j) {
        if (j.status !== 200 || !j.data || !Number.isInteger(j.data.n) || j.data.n < 1) { show(total, null, false); return; }
        var have = mine();                                    // another tab may have been quicker
        if (!have) {
          try { TO.worldUpdate(function (w) { w.logicer = { n: j.data.n, d: W.todayKey() }; }); } catch (e) { /* kept for this visit only */ }
          have = { n: j.data.n, d: W.todayKey() };
          TO.count("logicer/joined");
        }
        show(Math.max(total, j.data.n), have, true);
      }, function () { show(total, null, false); });
    }, function () { /* the line stays hidden */ });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
