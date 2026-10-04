/* The Club: some are in the club and some are not. One secret rule decides it.
   You stand at the door: five candidates come, one at a time, and you say In or Out.
   Every answer shows the truth at once. After the fifth, the sign of the club lights up with the rule. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "the-club";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), sign = $("sign"), ruleEl = $("rule");
  var inList = $("in-list"), outList = $("out-list");
  var door = $("door"), candEl = $("cand"), truthEl = $("truth"), pipsEl = $("pips");
  var actions = $("guess-actions"), btnIn = $("btn-in"), btnOut = $("btn-out");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("question").textContent = "Today's club could not be loaded. Please try again in a moment.";
    panel.hidden = true;
    actions.hidden = true;
    return;
  }

  /* ---------- which day, which club, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,5}$/.test(v)) ? parseInt(v, 10) : null; }

  var day = today;
  var practice = false;       // practice never touches the streak or the album
  var friend = null;          // how many of five a friend got right, when opened from a challenge link
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = int(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay < today) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cG !== null && cG <= 5) friend = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }
  var TOPICS = { countries: "Countries", places: "Places", animals: "Animals", food: "Food and plants",
    science: "Science", history: "History", culture: "Culture", sport: "Sport" };

  /* a stored result is five calls, each 1 (In) or 0 (Out) */
  function goodCalls(c, n) {
    return Array.isArray(c) && c.length === n && c.every(function (v) { return v === 0 || v === 1; });
  }
  function valid(r, p) { return !!r && goodCalls(r.c, p.door.length); }
  function isIn(p, i) { return !!p.door[i][1]; }
  function rightOf(p, c) {
    var n = 0;
    c.forEach(function (v, i) { if ((v === 1) === isIn(p, i)) n++; });
    return n;
  }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier, byId[earlier.id])) q = byId[earlier.id];   // show the club that was really played
  if (!valid(earlier, q)) earlier = null;
  var N = q.door.length;

  var calls = [];             // what you said so far: 1 = In, 0 = Out
  var phase = "play";         // play, then done
  var busy = false;           // true while the truth of an answer is on show
  var cardBlob = null, cardUrl = "";
  var PAUSE = 950;            // how long the truth stays on the door before the next candidate comes

  /* ---------- build the screen ---------- */
  panel.style.setProperty("--hue", TO.colour(q.colour));
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "The Club, day " + day + " | Logicers";

  function chip(name, kind, mine, ok, fresh) {
    var li = document.createElement("li");
    li.className = "tc-chip" + (mine ? " me " + (ok ? "ok" : "miss") : "") + (fresh ? " new" : "");
    li.appendChild(document.createTextNode(name));
    if (mine) {
      var sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = ok ? ", you were right" : ", you were wrong";
      li.appendChild(sr);
    }
    (kind ? inList : outList).appendChild(li);
    return li;
  }
  q["in"].forEach(function (name) { chip(name, true, false); });
  q.out.forEach(function (name) { chip(name, false, false); });

  var pips = Array.prototype.slice.call(pipsEl.querySelectorAll("i"));
  function paintPips() {
    var words = [];
    pips.forEach(function (p, i) {
      var done = i < calls.length, ok = done && ((calls[i] === 1) === isIn(q, i));
      p.className = done ? (ok ? "ok" : "miss") : (i === calls.length && phase === "play" ? "now" : "");
      if (done) words.push(ok ? "right" : "wrong");
    });
    pipsEl.setAttribute("aria-label", words.length ? words.length + " of " + N + " answered: " + words.join(", ") : "No answers yet");
  }

  function fitName() {                        // a long name gets smaller letters instead of a second line
    candEl.style.fontSize = "";
    var size = parseFloat(window.getComputedStyle(candEl).fontSize) || 28;
    while (candEl.scrollWidth > candEl.clientWidth + 1 && size > 15) { size -= 1; candEl.style.fontSize = size + "px"; }
  }
  function showCandidate() {
    var i = calls.length;
    door.className = "tc-door";
    candEl.textContent = q.door[i][0];
    truthEl.textContent = "";
    $("step").textContent = "At the door, " + (i + 1) + " of " + N;
    actions.classList.remove("wait");
    busy = false;
    paintPips();
    fitName();
  }

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 5 ? "A friend got all five right at the door. Can you match that?"
      : "A friend got " + friend + " of 5 at the door. Can you do better?") +
      (practice ? " It is an earlier club, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("the-club/challenge-opened");

  if (earlier) {
    calls = earlier.c.slice();
    calls.forEach(function (v, i) { chip(q.door[i][0], isIn(q, i), true, (v === 1) === isIn(q, i)); });
    showResult(false);
  } else {
    // a day that was begun and left: go on where it stopped, so that a reload gives no second try
    var open = practice ? null : stored.open;
    if (open && open.d === day && open.id === q.id && Array.isArray(open.c) && open.c.length < N && goodCalls(open.c, open.c.length)) {
      calls = open.c.slice();
      calls.forEach(function (v, i) { chip(q.door[i][0], isIn(q, i), true, (v === 1) === isIn(q, i)); });
    }
    showCandidate();
  }
  window.addEventListener("resize", function () { if (phase === "play") fitName(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (phase === "play") fitName(); }, function () { /* ignore */ });

  /* ---------- at the door ---------- */
  function answer(v) {
    if (phase !== "play" || busy) return;
    busy = true;
    var i = calls.length, truth = isIn(q, i), ok = (v === 1) === truth, name = q.door[i][0];
    calls.push(v);
    if (!practice) {
      var soFar = calls.slice();
      TO.update(GAME, function (g) { g.open = { d: day, id: q.id, c: soFar }; });
    }
    door.className = "tc-door " + (truth ? "is-in" : "is-out");
    actions.classList.add("wait");
    truthEl.innerHTML = '<span class="sr-only"></span>' + (truth ? "In the club" : "Not in the club") +
      ' <b class="tc-mark ' + (ok ? "ok" : "miss") + '">' + (ok ? "Right" : "You said " + (v === 1 ? "In" : "Out")) + "</b>";
    truthEl.firstChild.textContent = name + ": ";
    paintPips();
    if (!ok && window.navigator.vibrate) { try { window.navigator.vibrate(12); } catch (e) { /* ignore */ } }
    window.setTimeout(function () {
      chip(name, truth, true, ok, true);
      if (calls.length < N) { showCandidate(); return; }
      finish();
    }, PAUSE);
  }
  btnIn.addEventListener("click", function () { answer(1); });
  btnOut.addEventListener("click", function () { answer(0); });
  document.addEventListener("keydown", function (e) {          // arrow keys: right is In, left is Out
    if (phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector("dialog[open]")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); answer(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); answer(0); }
  });

  function finish() {
    var mine = calls.slice(), score = rightOf(q, mine);
    TO.update(GAME, function (g) {
      var slot = practice ? g.practice : g.results;
      if (!valid(slot[day], q)) slot[day] = { c: mine, r: score, id: q.id };
      if (!practice && g.open && g.open.d === day) delete g.open;
    });
    TO.count(practice ? "the-club/practice-played" : "the-club/played/day-" + day);
    showResult(true);
  }

  /* ---------- the reveal: the sign lights up ---------- */
  function showResult(animate) {
    var score = rightOf(q, calls);
    var hadFocus = document.activeElement === btnIn || document.activeElement === btnOut;
    phase = "done";
    busy = false;
    actions.hidden = true;
    door.hidden = true;
    paintPips();
    ruleEl.textContent = q.sign;
    sign.setAttribute("aria-label", "The rule of the club: " + q.sign);
    panel.classList.add("revealed");

    function done() {
      sign.classList.remove("lighting");
      sign.classList.add("lit");
      var v = $("offby");
      v.innerHTML = score === N ? "You got <b>" + N + " of " + N + "</b>. A perfect night at the door."
        : "You got <b>" + score + " of " + N + "</b> at the door.";
      v.classList.toggle("hit", score === N);            // yellow is kept for a miss
      $("verdict").hidden = false;
      fillAfter(score);
      renderChip();
      buildPractice();
      if (hadFocus) { v.setAttribute("tabindex", "-1"); try { v.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
    }

    if (!animate || TO.reducedMotion()) { done(); return; }
    sign.classList.add("lighting");                       // a short flicker, like a neon tube coming on
    window.setTimeout(done, 1150);
  }

  function fillAfter(score) {
    var f = $("friend");
    if (friend !== null) {
      var said = "Your friend got " + (friend === 5 ? "all five" : friend + " of 5");
      f.textContent = score > friend ? said + ". You did better."
        : score === friend ? said + " too. A tie."
        : said + ". Better than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.fact;
    [["src1", 0], ["src2", 1]].forEach(function (p) {
      var a = $(p[0]), s = (q.sources || [])[p[1]];
      if (s) { a.textContent = s.name; a.href = s.url; }
    });
    if (!practice) {
      fillStamp($("earned-stamp"), q);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s club</a>';
    else next.textContent = "A new club opens at midnight.";
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });   // what is played today, and the next game
    prepareCard(score);
  }

  /* ---------- streak chip, album ---------- */
  function playedPuzzle(r, n) { return (r && r.id && byId[r.id]) || puzzleOf(n); }
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1 && valid(res[n], playedPuzzle(res[n], n)); })
      .sort(function (a, b) { return b - a; });
    var right = 0;
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    var album = $("album");
    album.innerHTML = "";
    days.forEach(function (n) {
      var p = playedPuzzle(res[n], n);
      right += rightOf(p, res[n].c);
      var st = document.createElement("div");
      st.className = "stamp tc";
      fillStamp(st, p);
      album.appendChild(st);
    });
    $("st-right").textContent = String(right);
    $("album-empty").hidden = days.length > 0;
  }
  var RING = '<svg class="tc-ring" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.6"/>' +
    '<circle cx="15" cy="16" r="2.7"/><circle cx="24" cy="14" r="2.7"/><circle cx="19" cy="24" r="2.7"/><circle cx="27" cy="23" r="2.7"/><circle cx="3.6" cy="5" r="2.4" opacity=".55"/><circle cx="37" cy="34" r="2.4" opacity=".55"/></svg>';
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = RING;
    var what = document.createElement("span"); what.className = "what"; what.textContent = p.stamp || p.sign;
    var of = document.createElement("span"); of.className = "of"; of.textContent = TOPICS[p.topic] || "";
    el.appendChild(what); el.appendChild(of);
  }

  /* ---------- practice: earlier clubs ---------- */
  function listed(names) { return names.slice(0, -1).join(", ") + " and " + names[names.length - 1]; }
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 60);
    for (var n = today - 1; n >= first; n--) {
      var r = g.results[n] || g.practice[n];
      var p = playedPuzzle(r, n);
      if (!valid(r, p)) { r = null; p = puzzleOf(n); }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = listed(p["in"]);
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? "You got " + rightOf(p, r.c) + " of " + p.door.length + ". " + p.sign + "." : "Not played yet";   // the rule stays hidden until you have played
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: who is in and who is not, never the rule or who got in at the door ---------- */
  function shareUrl(score) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + score;
  }
  function shareText(score) {
    return "The Club, day " + day + ": " + listed(q["in"]) + " are in. " + listed(q.out) + " are not. " +
      "I got " + score + " of " + N + " at the door. Can you work out the rule? " + shareUrl(score);
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawCard(score) {
    var W = 1080, H = 1350, M = 76, PINK = "#BE3A82";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    x.fillStyle = PINK;                      // the game's own colour
    x.fillRect(0, 0, W, H);
    x.textBaseline = "alphabetic";
    x.fillStyle = "#ffffff";

    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", M, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("The Club, day " + day, W - M, 118);

    x.textAlign = "left";
    x.font = "800 104px " + FD;
    x.fillText("Who else gets in?", M - 4, 268);

    // the names as pills: filled for the members, outlined for the others.
    // First a dry run to see how many rows they need, then the whole block is set in the middle of the free space.
    var ph = 92, gap = 16, d = 96;
    function widthOf(name) {
      var size = 46;
      x.font = "700 " + size + "px " + F;
      while (x.measureText(name).width > W - 2 * M - 72 && size > 28) { size -= 2; x.font = "700 " + size + "px " + F; }
      return { w: Math.ceil(x.measureText(name).width) + 72, size: size };
    }
    function rowsOf(names) {
      var rows = 1, px = M;
      names.forEach(function (name) {
        var w = widthOf(name).w;
        if (px + w > W - M && px > M) { px = M; rows++; }
        px += w + gap;
      });
      return rows;
    }
    function groupHeight(names) { var r = rowsOf(names); return 52 + r * ph + (r - 1) * gap; }
    var block = groupHeight(q["in"]) + 40 + groupHeight(q.out) + 64 + d;
    var topEdge = 318, bottomEdge = 1096;
    var y = topEdge + Math.max(0, Math.round((bottomEdge - topEdge - block) / 2));
    function pills(label, names, filled) {
      x.globalAlpha = 0.9;
      x.fillStyle = "#ffffff";
      x.textAlign = "left";
      x.font = "800 30px " + F;
      x.fillText(label, M, y + 30);
      x.globalAlpha = 1;
      y += 52;
      var px = M;
      names.forEach(function (name) {
        var m = widthOf(name);
        if (px + m.w > W - M && px > M) { px = M; y += ph + gap; }
        roundRect(x, px, y, m.w, ph, ph / 2);
        if (filled) { x.fillStyle = "#ffffff"; x.fill(); x.fillStyle = PINK; }
        else { x.lineWidth = 4; x.strokeStyle = "#ffffff"; x.stroke(); x.fillStyle = "#ffffff"; }
        x.font = "700 " + m.size + "px " + F;
        x.fillText(name, px + 36, y + ph / 2 + m.size * 0.35);
        px += m.w + gap;
      });
      y += ph;
    }
    pills("IN THE CLUB", q["in"], true);
    y += 40;
    pills("NOT IN THE CLUB", q.out, false);
    y += 64;

    // the five answers at the door: right or wrong, in order, with no names
    var cy = y + d / 2, cx = M + d / 2;
    calls.forEach(function (v, i) {
      var ok = (v === 1) === isIn(q, i);
      x.beginPath();
      x.arc(cx, cy, d / 2, 0, Math.PI * 2);
      x.fillStyle = ok ? "#ffffff" : TO.MISS;
      x.fill();
      x.lineWidth = 9;
      x.lineCap = "round";
      x.lineJoin = "round";
      x.strokeStyle = ok ? PINK : "#15172B";
      x.beginPath();
      if (ok) { x.moveTo(cx - 20, cy + 2); x.lineTo(cx - 6, cy + 16); x.lineTo(cx + 22, cy - 15); }
      else { x.moveTo(cx - 16, cy - 16); x.lineTo(cx + 16, cy + 16); x.moveTo(cx + 16, cy - 16); x.lineTo(cx - 16, cy + 16); }
      x.stroke();
      cx += d + 20;
    });
    x.fillStyle = "#ffffff";
    x.textAlign = "right";
    x.font = "800 104px " + FD;
    x.fillText(score + " of " + N, W - M, cy + 36);

    x.textAlign = "left";
    x.font = "800 72px " + FD;
    x.fillText("Can you work out the rule?", M - 3, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W - 2 * M && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, M, 1270);
    }
    return c;
  }
  function prepareCard(score) {
    function make() {
      try {
        drawCard(score).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 100px "Bricolage Grotesque"'),
        document.fonts.load('700 46px "Figtree"'),
        document.fonts.load('600 40px "Figtree"'),
        document.fonts.load('800 30px "Figtree"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var score = rightOf(q, calls);
    TO.count("the-club/share");
    TO.share({ blob: cardBlob, filename: "the-club-day-" + day + ".png", text: shareText(score) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "the-club-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var score = rightOf(q, calls);
    TO.copyText(shareText(score)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(score);
    });
  });

  /* ---------- a new day while the page is open ---------- */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (!practice && day === today && Math.max(1, TO.dayNumber(DATA.start)) !== today && !window.location.search) {
      window.location.reload();
    }
  });
})();
