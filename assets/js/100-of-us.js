/* 100 of Us: one question a day about the world's people.
   Press and hold to count figures, lock in, see how it really is. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "100-of-us";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var stage = $("stage"), panel = $("panel"), crowd = $("crowd");
  var countEl = $("count"), hintEl = $("hint"), verdictEl = $("verdict");
  var lockBtn = $("lock"), redoBtn = $("redo"), range = $("a11y-range");

  if (!TO || !DATA || !DATA.questions || !DATA.questions.length) {
    $("question").textContent = "Today's question could not be loaded. Please try again in a moment.";
    stage.setAttribute("data-phase", "done");
    hintEl.hidden = true;
    countEl.hidden = true;
    return;
  }

  /* ---------- which day, which question, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,5}$/.test(v)) ? parseInt(v, 10) : null; }

  var day = today;
  var practice = false;      // practice never touches the streak or the album
  var friendGap = null;      // set when the page was opened from a friend's challenge link
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cGap = int(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay < today) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cGap !== null && cGap <= 100) friendGap = cGap;
  }

  var byId = {};
  DATA.questions.forEach(function (x) { byId[x.id] = x; });
  function questionOf(n) { return DATA.questions[(n - 1) % DATA.questions.length]; }
  var q = questionOf(day);
  var hue = TO.colour(q.colour);

  var count = 0;             // figures counted so far
  var phase = "guess";       // guess, then done
  var holding = false, raf = 0, nextAt = 0, steps = 0;
  var cardBlob = null, cardUrl = "";

  /* ---------- build the screen ---------- */
  var figs = [];
  for (var i = 0; i < 100; i++) { var f = TO.figure(); crowd.appendChild(f); figs.push(f); }
  panel.style.setProperty("--hue", hue);
  $("question").textContent = q.q;
  /* The page keeps room for three lines of question. On a small phone a long question can need a fourth line,
     which would push the page beyond the screen: then its letters shrink a little until three lines hold it. */
  function fitQuestion() {
    var el = $("question");
    el.style.fontSize = "";
    var size = parseFloat(window.getComputedStyle(el).fontSize), tries = 0;
    while (el.scrollHeight > Math.ceil(size * 3.36) + 1 && size > 14 && tries++ < 24) {
      size -= 0.5;
      el.style.fontSize = size + "px";
    }
  }
  fitQuestion();
  window.addEventListener("resize", fitQuestion);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitQuestion);
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "100 of Us, day " + day + " | Logicers";

  var notice = $("notice");
  if (friendGap !== null) {
    notice.textContent = (friendGap === 0 ? "A friend got this exactly right. Can you match it?" : "A friend was off by " + friendGap + ". Can you get closer?") +
      (practice ? " It is an earlier question, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friendGap !== null) TO.count("100-of-us/challenge-opened");

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  if (earlier && typeof earlier.g === "number") {
    count = earlier.g;
    showResult(false);
  } else {
    paint();
  }

  /* ---------- counting ---------- */
  function paint() {
    for (var k = 0; k < 100; k++) figs[k].classList.toggle("on", k < count);
    countEl.textContent = String(count);
    range.value = String(count);
    crowd.setAttribute("aria-label", count + " of 100 figures counted");
  }
  function add(n) {
    if (count >= 100) return;
    count = Math.min(100, count + n);
    for (var k = Math.max(0, count - n); k < count; k++) figs[k].classList.add("on");
    countEl.textContent = String(count);
  }
  function startHold() {
    if (holding || phase !== "guess") return;
    holding = true;
    add(1);                                   // a quick tap adds exactly one
    steps = 0;
    nextAt = performance.now() + 280;
    raf = window.requestAnimationFrame(tick);
  }
  function tick(now) {
    if (!holding) return;
    while (now >= nextAt && count < 100) {
      add(1);
      steps++;
      nextAt += Math.max(55, 150 - steps * 9);  // starts slow, then speeds up
    }
    if (count >= 100) { stopHold(); return; }
    raf = window.requestAnimationFrame(tick);
  }
  function stopHold() {
    if (!holding) return;
    holding = false;
    window.cancelAnimationFrame(raf);
    range.value = String(count);
    crowd.setAttribute("aria-label", count + " of 100 figures counted");
    showGuessButtons();
  }
  function showGuessButtons() {
    lockBtn.hidden = false;
    redoBtn.hidden = false;
    hintEl.textContent = count >= 100 ? "That is everyone." : "Hold again to add more.";
  }

  stage.addEventListener("pointerdown", function (e) {
    if (phase !== "guess") return;
    if (e.button) return;                      // only the main button or a finger
    e.preventDefault();
    try { stage.setPointerCapture(e.pointerId); } catch (err) { /* not fatal */ }
    startHold();
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (name) {
    stage.addEventListener(name, stopHold);
  });
  window.addEventListener("pointerup", stopHold);
  window.addEventListener("blur", stopHold);
  stage.addEventListener("contextmenu", function (e) { if (phase === "guess") e.preventDefault(); });
  stage.addEventListener("selectstart", function (e) { if (phase === "guess") e.preventDefault(); });

  range.addEventListener("input", function () {   // keyboard and screen-reader way to set the guess
    if (phase !== "guess") return;
    count = Math.max(0, Math.min(100, parseInt(range.value, 10) || 0));
    paint();
    showGuessButtons();
  });

  redoBtn.addEventListener("click", function () {
    if (phase !== "guess") return;
    count = 0;
    paint();
    lockBtn.hidden = true;
    redoBtn.hidden = true;
    hintEl.textContent = "Press and hold. Let go at your guess.";
  });

  lockBtn.addEventListener("click", function () {
    if (phase !== "guess") return;
    stopHold();
    var guess = count;
    TO.update(GAME, function (g) {
      var slot = practice ? g.practice : g.results;
      if (!slot[day]) slot[day] = { g: guess, a: q.answer, id: q.id };
    });
    TO.count(practice ? "100-of-us/practice-played" : "100-of-us/played/day-" + day);
    showResult(true);
  });

  /* ---------- the reveal ---------- */
  function showResult(animate) {
    var guess = count, answer = q.answer, gap = Math.abs(guess - answer);
    phase = "done";
    stage.setAttribute("data-phase", "done");
    lockBtn.hidden = true;
    redoBtn.hidden = true;
    $("guess-actions").hidden = true;
    range.disabled = true;
    for (var k = 0; k < 100; k++) figs[k].classList.remove("on");
    panel.classList.add("revealed");

    function finish() {
      for (var n = 0; n < 100; n++) {
        var real = n < answer, said = n < guess;
        figs[n].classList.toggle("real", real && said);
        figs[n].classList.toggle("missed", real && !said);     // real people you did not count
        figs[n].classList.toggle("phantom", !real && said);    // people you counted who are not there
      }
      crowd.setAttribute("aria-label", "The answer is " + answer + " of 100. You said " + guess + ".");
      countEl.hidden = true;
      $("turnsout").textContent = "Turns out, about " + answer + ".";
      $("offby").innerHTML = "You said " + guess + ". <b>" + (gap === 0 ? "Spot on." : "Off by " + gap + ".") + "</b>";
      $("offby").classList.toggle("hit", gap === 0);        // yellow is kept for a miss
      verdictEl.hidden = false;
      fillAfter(guess, gap);
      renderChip();
      if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
    }

    if (!animate || TO.reducedMotion()) { finish(); return; }

    countEl.textContent = "0";
    var shown = 0;
    var per = Math.max(14, Math.min(34, 1600 / answer));        // the whole count takes about a second and a half
    var t0 = performance.now() + 500;                           // let the colour arrive first
    function step(now) {
      var target = Math.max(0, Math.min(answer, Math.floor((now - t0) / per)));
      while (shown < target) { figs[shown].classList.add("real"); shown++; }
      countEl.textContent = String(shown);
      if (shown < answer) window.requestAnimationFrame(step);
      else window.setTimeout(finish, 420);
    }
    window.requestAnimationFrame(step);
  }

  function fillAfter(guess, gap) {
    var friend = $("friend");
    if (friendGap !== null) {
      var f = friendGap === 0 ? "Your friend got it exactly right" : "Your friend was off by " + friendGap;
      friend.textContent = gap < friendGap ? f + ". You got closer."
        : gap === friendGap ? (gap === 0 ? "Your friend got it exactly right too." : f + " too. A tie.")
        : f + ". Closer than you.";
      friend.hidden = false;
    }
    $("sentence").textContent = q.sentence || "";
    var link = $("source-link");
    link.textContent = (q.source || "World Bank") + (q.year ? ", " + q.year : "");
    link.href = q.link || "#";
    $("source-exact").textContent = (typeof q.exact === "number") ? " (" + q.exact + " in 100)" : "";

    if (!practice) {
      var box = $("earned-stamp");
      fillStamp(box, q, q.answer);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) {
      next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s question</a>';
    } else {
      next.textContent = "A new question at midnight.";
    }
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });   // what is played today, and the next game
    prepareCard(gap);
  }

  /* ---------- streak chip, album ---------- */
  function renderChip() {
    var s = TO.streak(TO.game(GAME).results, today);
    $("streak-chip").textContent = "Streak " + s.current;
    renderAlbum(s);
  }
  function fillStamp(el, question, answer) {
    el.style.setProperty("--hue", TO.colour(question.colour));
    el.innerHTML = "";
    var n = document.createElement("span"); n.className = "n"; n.textContent = String(answer);
    var of = document.createElement("span"); of.className = "of"; of.textContent = "of 100";
    var what = document.createElement("span"); what.className = "what"; what.textContent = question.stamp || "";
    el.appendChild(n); el.appendChild(of); el.appendChild(what);
  }
  function renderAlbum(s) {
    var res = TO.game(GAME).results;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1; }).sort(function (a, b) { return b - a; });
    var total = 0;
    days.forEach(function (n) { total += Math.abs(res[n].g - res[n].a); });
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    $("st-gap").textContent = days.length ? String(Math.round((total / days.length) * 10) / 10) : "0";
    var album = $("album");
    album.innerHTML = "";
    days.forEach(function (n) {
      var r = res[n];
      var question = (r.id && byId[r.id]) || questionOf(n);
      var st = document.createElement("div");
      st.className = "stamp";
      fillStamp(st, question, r.a);
      album.appendChild(st);
    });
    $("album-empty").hidden = days.length > 0;
  }

  /* ---------- practice: earlier questions ---------- */
  function buildPractice() {
    var list = $("practice-list");
    var g = TO.game(GAME);
    var first = Math.max(1, today - 60);
    for (var n = today - 1; n >= first; n--) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = questionOf(n).q;
      var s = document.createElement("span"); s.className = "s";
      var r = g.results[n] || g.practice[n];
      s.textContent = r ? (Math.abs(r.g - r.a) === 0 ? "You were spot on" : "You were off by " + Math.abs(r.g - r.a)) : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: it never shows the answer ---------- */
  function shareUrl(gap) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + gap;
  }
  function shareText(gap) {
    return "100 of Us, day " + day + ": " + (gap === 0 ? "spot on. Can you match it? " : "off by " + gap + ". Can you get closer? ") + shareUrl(gap);
  }
  function wrapLines(ctx, text, maxWidth) {
    var words = String(text).split(/\s+/), lines = [], line = "";
    words.forEach(function (w) {
      var trial = line ? line + " " + w : w;
      if (ctx.measureText(trial).width > maxWidth && line) { lines.push(line); line = w; }
      else line = trial;
    });
    if (line) lines.push(line);
    return lines;
  }
  function seeded(seed) {   // small repeatable random generator, so the same result always gives the same picture
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  function drawFigure(ctx, x, y, w) {      // same shape as the figure on screen (20 by 22)
    var s = w / 20;
    ctx.beginPath();
    ctx.arc(x + 10 * s, y + 5 * s, 4.4 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 2.2 * s, y + 22 * s);
    ctx.lineTo(x + 2.2 * s, y + 17.8 * s);
    ctx.arc(x + 10 * s, y + 17.8 * s, 7.8 * s, Math.PI, 0, false);
    ctx.lineTo(x + 17.8 * s, y + 22 * s);
    ctx.closePath();
    ctx.fill();
  }
  function drawCard(gap) {
    var W = 1080, H = 1350, M = 76;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    x.fillStyle = "#2D4FC4";                 // the game's own colour
    x.fillRect(0, 0, W, H);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", M, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("100 of Us, day " + day, W - M, 118);

    var head = gap === 0 ? "Spot on" : "Off by " + gap;
    var size = 196;
    x.textAlign = "left";
    x.font = "800 " + size + "px " + FD;
    while (x.measureText(head).width > W - 2 * M && size > 90) { size -= 6; x.font = "800 " + size + "px " + FD; }
    x.fillStyle = TO.MISS;
    x.fillText(head, M - 8, 318);

    x.fillStyle = "#ffffff";
    x.font = "600 46px " + F;
    var lines = wrapLines(x, q.q, W - 2 * M).slice(0, 3);
    var y = 432;
    lines.forEach(function (l) { x.fillText(l, M, y); y += 56; });

    // the crowd: all pale, and only your miss lit, scattered so it gives nothing away
    var miss = {};
    var rnd = seeded(day * 1009 + gap * 31 + 7);
    var left = Math.min(gap, 100);
    while (left > 0) {
      var pick = Math.floor(rnd() * 100);
      if (!miss[pick]) { miss[pick] = true; left--; }
    }
    var top = 566, bottom = 1180;
    var pitchY = (bottom - top) / 10;
    var figH = pitchY - 6, figW = figH / 1.1;
    var pitchX = figW * 1.16;
    var left0 = (W - pitchX * 10) / 2;
    for (var n = 0; n < 100; n++) {
      var col = n % 10, row = Math.floor(n / 10);
      var fx = left0 + col * pitchX + (pitchX - figW) / 2;
      var fy = top + row * pitchY + (pitchY - figH) / 2;
      x.globalAlpha = miss[n] ? 1 : 0.26;
      x.fillStyle = miss[n] ? TO.MISS : "#ffffff";
      drawFigure(x, fx, fy, figW);
    }
    x.globalAlpha = 1;

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "700 46px " + FD;
    x.fillText(gap === 0 ? "Can you match it?" : "Can you get closer?", M, 1250);
    var st = TO.streak(TO.game(GAME).results, today).current;
    if (!practice && st >= 2) {
      x.textAlign = "right";
      x.font = "500 38px " + F;
      x.fillText(st + " days in a row", W - M, 1250);
    }
    // where to play: a picture cannot carry a link you can tap, so it carries the address in words
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, fs = 40;
      x.textAlign = "left";
      x.font = "600 " + fs + "px " + F;
      while (x.measureText(line).width > W - 2 * M && fs > 24) { fs -= 2; x.font = "600 " + fs + "px " + F; }
      x.fillStyle = "#ffffff";
      x.fillText(line, M, 1308);
    }
    return c;
  }
  function prepareCard(gap) {
    function make() {
      try {
        var canvas = drawCard(gap);
        canvas.toBlob(function (blob) {
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
        document.fonts.load('600 46px \"Figtree\"'),
        document.fonts.load('500 38px \"Figtree\"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var gap = Math.abs(count - q.answer);
    TO.count("100-of-us/share");
    TO.share({ blob: cardBlob, filename: "100-of-us-day-" + day + ".png", text: shareText(gap) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "100-of-us-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var gap = Math.abs(count - q.answer);
    TO.copyText(shareText(gap)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(gap);
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
