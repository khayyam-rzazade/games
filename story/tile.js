/* Logicers Story: the thin line on the home page (4 Nov 2026). English only.

   One slim line right under the Today card (Khayyam, 4 Nov 2026: "under the today box, a horizontal one line box, very
   thin"): the week's story name, how many people have ever read the story, and one small sign at the end:
     ›          today's chapter is waiting (it pulses, like the Today card's Play)
     Result ›   a vote of an earlier day has its result, and this player has not seen it yet (it pulses too)
     Voted ✓    this player has voted today
     ✓          Sunday, the ending read and the week card seen
   The whole line is the link into story/. It is hidden before the launch day, after the last week, and on any language
   but English, and it is not in the daily chain, the streak or the "x of 12 played" count.

   The number: GET /counter on the story server (everyone who has ever read a chapter, each phone once, all weeks). It is
   asked once when the page opens (and again on coming back after 5 minutes); the last answer is kept in this browser
   ("story:readers") so the line has its number at once next time. Shown from 1; with no answer the line simply has no
   number. Everything else comes from story/config.js and what this browser keeps in "story:v1" (written by story.js); the
   clock is the phone's (the story page itself uses the server's, and corrects a wrong phone clock). */
(function () {
  "use strict";
  var CFG = window.STORY_CONFIG || {};
  var DAY = 86400000, KEY = "story:v1", KEPT = "story:readers", AGAIN_MS = 5 * 60000;

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

  /* what the line says at ms for what this browser keeps (S); null when there is nothing to show.
     sign: "go" | "result" | "voted" | "done"; line: the same in words (read out by screen readers) */
  function compute(ms, S) {
    var c = clockAt(ms);
    if (!c) return null;
    var wk = S && S.weeks && S.weeks[c.week], days = (wk && wk.days) || {};
    var voted = function (d) { var x = days[d]; return !!x && (x.vote === "A" || x.vote === "B"); };
    var seen = function (d) { return !!(days[d] && days[d].seen); };
    var out = { week: c.week, day: c.day, title: (CFG.titles && CFG.titles[c.week]) || "This week’s story", line: "", done: false, sign: "go" };
    var unseen = 0, d;
    for (d = 1; d < c.day && d <= 6; d++) if (voted(d) && !seen(d)) unseen = d;
    var t = left(c.end - ms);
    if (unseen) { out.line = "Result is in · read chapter " + c.day; out.sign = "result"; }
    else if (c.day <= 6) {
      if (voted(c.day)) { out.line = "You voted · result in " + t; out.done = true; out.sign = "voted"; }
      else out.line = "Chapter " + c.day + " of 7 · the world is deciding · " + t + " left";
    } else if (days[7] && days[7].read && days[7].card) {
      out.line = "Your week is done · " + (c.week < (CFG.weeks || 0) ? "next story on Monday" : "more stories soon");
      out.done = true; out.sign = "done";
    } else out.line = "Chapter 7 of 7 · the ending · " + t + " left";
    return out;
  }

  var box = document.getElementById("story-line");
  window.STORY_TILE = { compute: compute, clockAt: clockAt };           // for the tests
  if (!box) return;
  if (window.LG && window.LG.lang && window.LG.lang !== "en") return;   // English only for now: the other languages' homes keep it hidden

  var nameEl = box.querySelector(".sl-name"), countEl = box.querySelector(".sl-count"), signEl = box.querySelector(".sl-sign");
  var ARROW = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHECK = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M5 10.4l3.1 3.1L15 6.6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SIGNS = { go: ARROW, result: "<span>Result</span>" + ARROW, voted: "<span>Voted</span>" + CHECK, done: CHECK };

  function kept() {
    try { var k = JSON.parse(window.localStorage.getItem(KEPT)); return k && typeof k.n === "number" && k.n >= 0 ? k.n : 0; } catch (e) { return 0; }
  }
  var readers = kept();
  function num(n) { try { return Number(n).toLocaleString("en-US"); } catch (e) { return String(n); } }

  var shown = "", asked = 0;
  function draw() {
    var s = compute(Date.now(), readStore());
    if (!s) { box.hidden = true; return; }
    if ([s.title, s.sign, readers].join("|") !== shown) {
      shown = [s.title, s.sign, readers].join("|");
      nameEl.textContent = s.title;
      countEl.textContent = readers >= 1 ? num(readers) + " read" : "";
      countEl.hidden = readers < 1;
      signEl.innerHTML = SIGNS[s.sign];                                   // fixed markup, never text from outside
      box.setAttribute("data-sign", s.sign);
      box.classList.toggle("done", s.done);
    }
    /* what a screen reader says: the same line as before, with the hours left */
    box.setAttribute("aria-label", s.title + ". " + s.line + (readers >= 1 ? ". " + num(readers) + (readers === 1 ? " person has" : " people have") + " read the story." : "."));
    box.hidden = false;
    if (!asked) ask();
  }

  /* story.logicers.com first (some campus Wi-Fi blocks workers.dev); the workers.dev address only when nothing comes back from it */
  function get(url, next) {
    return window.fetch(url).then(function (r) { return r.ok ? r.json() : null; }, function (e) { if (next) return get(next); throw e; });
  }
  function ask() {
    if (!window.fetch || !CFG.api) return;
    asked = Date.now();
    get(String(CFG.api) + "/counter", CFG.apiOld ? String(CFG.apiOld) + "/counter" : null).then(function (j) {
      if (!j || typeof j.readers !== "number" || j.readers < 0) return;
      readers = Math.max(j.readers, 0);
      try { window.localStorage.setItem(KEPT, JSON.stringify({ n: readers, at: Date.now() })); } catch (e) { /* the number is shown all the same */ }
      draw();
    }).catch(function () { /* the line reads the same without the number */ });
  }
  function back() {
    if (document.hidden) return;
    draw();
    if (!box.hidden && Date.now() - asked > AGAIN_MS) ask();
  }

  box.addEventListener("click", function () {
    try { if (window.TurnsOut && window.TurnsOut.count) window.TurnsOut.count("home/story"); } catch (e) { /* counting never breaks a link */ }
  });
  draw();
  window.setInterval(draw, 30000);
  document.addEventListener("visibilitychange", back);
  window.addEventListener("pageshow", back);                            // coming back with the Back button
})();
