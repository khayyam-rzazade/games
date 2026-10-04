/* The home page: what is done today, the streak, and today's animal on the Long Lost Cousin tile.
   It never shows an answer before you have played. */
(function () {
  "use strict";
  var TO = window.TurnsOut;
  if (!TO) return;
  TO.wireDialogs();
  TO.fixLocalLinks();
  var D = window.TURNSOUT_DATA || {};
  var now = new Date();
  var DAY = 86400000;

  try {
    document.getElementById("eyebrow").textContent = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  } catch (e) { /* no date line then */ }

  var GAMES = TO.GAMES;       // the one list of games, kept in assets/js/turnsout.js

  /* which calendar days had any game played: that is the streak of the whole site */
  var todayIndex = Math.round(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY);
  function dayIndex(startISO, n) {
    var p = String(startISO).split("-");
    return Math.min(todayIndex, Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / DAY) + (n - 1));
  }
  var playedOn = {}, live = 0, doneToday = 0;

  GAMES.forEach(function (G) {
    var tile = document.getElementById("tile-" + G.key);
    if (!tile) return;
    live++;
    var data = D[G.id];
    G.stats = { current: 0, best: 0, played: 0 };
    if (!data || !data.start) return;                      // the game's file did not load: the tile still opens the game
    if (data.start !== G.start && window.console) window.console.warn("Start date of " + G.id + " differs: " + data.start + " in its file, " + G.start + " in turnsout.js");
    var today = Math.max(1, TO.dayNumber(data.start));
    var results = {};
    try { results = TO.game(G.id).results; } catch (e) { /* what the browser kept is broken: treat it as nothing played */ }
    if (!results || typeof results !== "object") results = {};
    Object.keys(results).forEach(function (k) {
      var n = Number(k);
      if (n >= 1 && n <= today) playedOn[dayIndex(data.start, n)] = true;
    });
    G.stats = TO.streak(results, today);
    var r = results[today];
    if (G.done(r)) {
      doneToday++;
      tile.classList.add("done");
      tile.querySelector(".result b").textContent = G.says(r);
      tile.querySelector(".result").hidden = false;
      tile.querySelector(".again").hidden = false;
      tile.querySelector(".go").hidden = true;
      tile.querySelector(".mins").hidden = true;
      var pip = document.getElementById("pip-" + G.key);
      if (pip) pip.classList.add("on");
    }
  });

  document.getElementById("today-count").innerHTML = "<b>" + doneToday + "</b> of " + live + " played";
  if (live > 0 && doneToday === live) document.getElementById("today-note").textContent = "All done for today. New games at midnight.";

  var streak = 0;
  for (var d = playedOn[todayIndex] ? todayIndex : todayIndex - 1; playedOn[d]; d--) streak++;
  document.getElementById("streak-n").textContent = String(streak);
  document.getElementById("streak-line").textContent = streak === 0
    ? "No streak yet. Play any game today to start one."
    : "You have played " + streak + (streak === 1 ? " day" : " days") + " in a row." + (playedOn[todayIndex] ? "" : " Play any game today to keep it.");
  var rows = document.getElementById("streak-rows");
  GAMES.forEach(function (G) {
    if (!G.stats) return;
    var li = document.createElement("li");
    li.setAttribute("data-g", G.key);
    var dot = document.createElement("span"); dot.className = "dot";
    var nm = document.createElement("span"); nm.className = "nm"; nm.textContent = G.name;
    var st = document.createElement("span"); st.className = "st";
    st.innerHTML = G.stats.played === 0 ? "Not played yet"
      : "Streak <b>" + G.stats.current + "</b> · best <b>" + G.stats.best + "</b> · " + G.stats.played + (G.stats.played === 1 ? " day" : " days");
    li.appendChild(dot); li.appendChild(nm); li.appendChild(st);
    rows.appendChild(li);
  });

  /* Long Lost Cousin: today's animal or plant stands on the tile. Its small picture file is fetched here. */
  var cousin = D["long-lost-cousin"];
  var slot = document.getElementById("cousin-pic");
  if (cousin && cousin.puzzles && cousin.puzzles.length && slot) {
    var day = Math.max(1, TO.dayNumber(cousin.start));
    var q = cousin.puzzles[(day - 1) % cousin.puzzles.length];
    var pics = window.TURNSOUT_PICS = window.TURNSOUT_PICS || {};
    window.TurnsOutPic = function (key, pic) { pics[key] = pic; };
    var file = document.createElement("script");
    file.src = "long-lost-cousin/pics/" + q.subject + ".js";
    file.onload = function () {
      var pic = pics[q.subject];
      if (!pic) return;
      slot.setAttribute("viewBox", "0 0 " + pic.w + " " + pic.h);
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pic.d);
      slot.appendChild(path);
    };
    document.head.appendChild(file);
  }

  /* a new day while the page stays open: show it when the visitor comes back to the tab */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    var t = new Date();
    if (Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / DAY) !== todayIndex) window.location.reload();
  });
})();
