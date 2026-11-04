/* Logicers Story: the tile on the home page (4 Nov 2026). English only.

   The home page has a row "This week's story" with one tile, hidden in the HTML. This file shows it when there is a story
   on (from the launch day to the end of the last week) and the page is English, and keeps its line true:
     Chapter 3 of 7 · the world is deciding · 5 h left      a vote is open and this player has not cast it
     You voted · result in 5 h                               this player has voted today
     Result is in · read chapter 4                           a vote of an earlier day, whose result this player has not seen yet
     Chapter 7 of 7 · the ending · 5 h left                  Sunday
     Your week is done · next story on Monday                Sunday, read and the week card seen
   It only reads: the calendar from story/config.js and what this browser keeps in "story:v1" (written by story.js). It does not
   ask the server anything, so the home page stays as light as before; the clock is the phone's (the story page itself
   uses the server's, and corrects a wrong phone clock). */
(function () {
  "use strict";
  var CFG = window.STORY_CONFIG || {};
  var DAY = 86400000, KEY = "story:v1";

  /* where the story is at ms (the same calendar as story.js and the server): null unless a week is on */
  function clockAt(ms) {
    var L = Date.parse(String(CFG.launch) + "T00:00:00Z");
    if (!isFinite(L) || ms < L) return null;
    var n = Math.floor((ms - L) / DAY), week = Math.floor(n / 7) + 1;
    if (week > (CFG.weeks || 0)) return null;
    var start = L + n * DAY;
    return { week: week, day: (n % 7) + 1, end: start + DAY };
  }
  function left(ms) {                               // 5 h (an hour counts when it is whole) or 35 min; never less than 1 min
    var m = Math.max(1, Math.ceil(ms / 60000));
    return m >= 60 ? Math.floor(m / 60) + " h" : m + " min";
  }
  function readStore() {
    try { var s = JSON.parse(window.localStorage.getItem(KEY)); return s && typeof s === "object" ? s : null; } catch (e) { return null; }
  }

  /* what the tile says at ms for what this browser keeps (S); null when there is nothing to show */
  function compute(ms, S) {
    var c = clockAt(ms);
    if (!c) return null;
    var wk = S && S.weeks && S.weeks[c.week], days = (wk && wk.days) || {};
    var voted = function (d) { var x = days[d]; return !!x && (x.vote === "A" || x.vote === "B"); };
    var seen = function (d) { return !!(days[d] && days[d].seen); };
    var out = { week: c.week, day: c.day, title: (CFG.titles && CFG.titles[c.week]) || "This week’s story", line: "", done: false, label: "Read" };
    var unseen = 0, d;
    for (d = 1; d < c.day && d <= 6; d++) if (voted(d) && !seen(d)) unseen = d;
    var t = left(c.end - ms);
    if (unseen) out.line = "Result is in · read chapter " + c.day;
    else if (c.day <= 6) {
      if (voted(c.day)) { out.line = "You voted · result in " + t; out.done = true; }
      else out.line = "Chapter " + c.day + " of 7 · the world is deciding · " + t + " left";
    } else if (days[7] && days[7].read && days[7].card) {
      out.line = "Your week is done · " + (c.week < (CFG.weeks || 0) ? "next story on Monday" : "more stories soon");
      out.done = true;
    } else out.line = "Chapter 7 of 7 · the ending · " + t + " left";
    return out;
  }

  var section = document.getElementById("story-row");
  var tile = document.getElementById("tile-story");
  window.STORY_TILE = { compute: compute, clockAt: clockAt };           // for the tests
  if (!section || !tile) return;
  if (window.LG && window.LG.lang && window.LG.lang !== "en") return;   // English only for now: the other languages' homes keep it hidden

  function q(sel) { return tile.querySelector(sel); }
  var shown = "";
  function draw() {
    var s = compute(Date.now(), readStore());
    if (!s) { section.hidden = true; return; }
    var sig = [s.title, s.line, s.done].join("|");
    if (sig !== shown) {
      shown = sig;
      q("h3").textContent = s.title;
      q(".pitch").textContent = s.line;
      var go = q(".go"), mins = q(".mins"), res = q(".result"), again = q(".again");
      go.hidden = mins.hidden = s.done;
      res.hidden = again.hidden = !s.done;
      tile.classList.toggle("done", s.done);
      tile.setAttribute("aria-label", s.title + ". " + s.line);
    }
    section.hidden = false;
  }
  tile.addEventListener("click", function () {
    try { if (window.TurnsOut && window.TurnsOut.count) window.TurnsOut.count("home/story"); } catch (e) { /* counting never breaks a link */ }
  });
  draw();
  window.setInterval(draw, 30000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) draw(); });
  window.addEventListener("pageshow", draw);                            // coming back with the Back button
})();
