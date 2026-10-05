/* Years Apart: a ruler from one real event to another, the older at the left end, the newer at the right.
   A third event happened in between: slide it to where you think it falls, then measure.
   The years appear, the tag travels to its true place, and the yellow band shows how far off you were. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "years-apart";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), board = $("board"), ruler = $("ruler"), cursor = $("cursor"), pin = $("pin");
  var tag = $("tag"), stringPath = $("string-path"), actions = $("guess-actions"), btnMeasure = $("btn-measure"), hint = $("hint");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length || !DATA.events) {
    $("question").textContent = "Today's line could not be loaded. Please try again in a moment.";
    panel.hidden = true;
    actions.hidden = true;
    hint.hidden = true;
    return;
  }

  /* ---------- which day, which line, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,7}$/.test(v)) ? parseInt(v, 10) : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }

  var day = today;
  var practice = false;       // practice never touches the streak or the album
  var friend = null;          // how many years off a friend was, when opened from a challenge link
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = int(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay === today - 1) {     // practice: yesterday only
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay >= today - 1 && cDay <= today + 1) {   // a friend's link: yesterday, today or tomorrow; older ones open today
    day = cDay; practice = cDay < today;
    if (cG !== null) friend = cG;
  }

  var EV = DATA.events;
  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }

  /* a stored result: g = where you put it, a = where it really is (both in thousandths of the line), y = years off */
  function valid(r) {
    return !!r && num(r.g) && r.g >= 0 && r.g <= 1000 && num(r.a) && r.a >= 0 && r.a <= 1000 && num(r.y) && r.y >= 0;
  }
  function spotOn(r) { return Math.abs(r.g - r.a) <= 5; }      // within half a percent of the line
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function yearsText(y) { return y < 1 ? "less than a year" : commas(y) + (Math.round(y) === 1 ? " year" : " years"); }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier)) q = byId[earlier.id];   // show the line that was really played
  if (!valid(earlier)) earlier = null;

  var L = EV[q.left], M = EV[q.mid], R = EV[q.right];
  var ANSWER = Math.round(q.at * 1000);
  var guess = 500;            // in thousandths of the line, from the left end
  var phase = "play";
  var cardBlob = null, cardUrl = "";
  var layout = null;          // what the last share picture needed, for the browser checks
  /* the little ruler on every stamp. Defined up here: the album is drawn while the page starts. */
  var ICON = '<svg class="ya-icon" viewBox="0 0 44 18" aria-hidden="true" focusable="false"><rect x="1" y="4" width="42" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
    '<path d="M7 4v4M12 4v3M17 4v4M22 4v5M27 4v4M32 4v3M37 4v4" stroke="currentColor" stroke-width="1.2"/><rect x="25" y="1" width="5" height="16" rx="1.5" fill="currentColor"/></svg>';

  function yearsOff(g) { return Math.round(Math.abs(g / 1000 - q.at) * q.span); }
  function about() { return /^about /.test(L.y) || /^about /.test(R.y); }

  /* ---------- build the screen ---------- */
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Years Apart, day " + day + " | Logicers";
  $("left-t").textContent = L.t;
  $("right-t").textContent = R.t;
  $("tag-t").textContent = M.t;
  if (L.t.length > 34) $("end-l").classList.add("small-text");
  if (R.t.length > 34) $("end-r").classList.add("small-text");
  cursor.setAttribute("aria-label", "Where " + lower(M.t) + " falls, on a line from " + lower(L.t) + " (left) to " + lower(R.t) + " (right)");
  function lower(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  /* the ruler is drawn to the width of the board: brass caps at both ends, a hundred ticks in between */
  var SVGNS = "http://www.w3.org/2000/svg";
  var W = 0, X0 = 0, X1 = 0, CAP = 13;
  function xOf(t) { return X0 + (X1 - X0) * t / 1000; }
  function drawRuler() {
    W = board.clientWidth;
    X0 = CAP + 7; X1 = W - CAP - 7;
    var h = 56, s = [];
    s.push('<defs>' +
      '<linearGradient id="ya-wood" x1="0" y1="0" x2="0" y2="1"><stop class="w1" offset="0"/><stop class="w2" offset=".5"/><stop class="w3" offset="1"/></linearGradient>' +
      '<linearGradient id="ya-brass" x1="0" y1="0" x2="1" y2="0"><stop class="b1" offset="0"/><stop class="b2" offset=".32"/><stop class="b3" offset=".7"/><stop class="b4" offset="1"/></linearGradient>' +
      '<filter id="ya-grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.22" numOctaves="3" seed="7"/>' +
      '<feColorMatrix values="0 0 0 0 .42  0 0 0 0 .25  0 0 0 0 .1  0 0 0 .55 -.12"/><feComposite in2="SourceGraphic" operator="in"/></filter>' +
      '<filter id="ya-soft" x="-10%" y="-60%" width="120%" height="260%"><feGaussianBlur stdDeviation="4.5"/></filter>' +
      '</defs>');
    s.push('<rect x="5" y="26" width="' + (W - 10) + '" height="40" rx="5" fill="#140A04" opacity=".55" filter="url(#ya-soft)"/>');
    s.push('<rect x="0" y="0" width="' + W + '" height="' + h + '" rx="4" fill="url(#ya-wood)"/>');
    s.push('<rect x="0" y="0" width="' + W + '" height="' + h + '" rx="4" fill="#000" filter="url(#ya-grain)"/>');
    s.push('<rect x="0" y="0" width="' + W + '" height="3" rx="2" fill="#fff" opacity=".42"/>');
    s.push('<rect class="edge" x="0" y="' + (h - 4) + '" width="' + W + '" height="4" rx="2" opacity=".55"/>');
    s.push('<rect class="band" id="ya-band" x="0" y="' + (h - 21) + '" width="0" height="13" rx="2" opacity="0"/>');
    for (var i = 0; i <= 100; i++) {
      var x = Math.round((X0 + (X1 - X0) * i / 100) * 10) / 10;
      var len = i % 10 === 0 ? 19 : (i % 5 === 0 ? 13 : 7);
      s.push('<line class="tk" x1="' + x + '" y1="3" x2="' + x + '" y2="' + (3 + len) + '" stroke-width="' + (i % 10 === 0 ? 1.15 : 0.8) + '" opacity=".82"/>' +
             '<line class="tk-hi" x1="' + (x + 0.9) + '" y1="3" x2="' + (x + 0.9) + '" y2="' + (3 + len) + '" stroke-width=".5" opacity=".45"/>');
    }
    if (W > 300) s.push('<text class="mk" x="' + (W / 2) + '" y="' + (h - 9) + '" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="7" letter-spacing="2.4" opacity=".5">LOGICERS · YEARS APART</text>');
    s.push('<rect x="0" y="0" width="' + CAP + '" height="' + h + '" rx="3" fill="url(#ya-brass)"/>');
    s.push('<rect x="' + (W - CAP) + '" y="0" width="' + CAP + '" height="' + h + '" rx="3" fill="url(#ya-brass)"/>');
    s.push('<circle class="screw" cx="' + (CAP / 2) + '" cy="' + (h / 2) + '" r="2.4"/><circle class="screw" cx="' + (W - CAP / 2) + '" cy="' + (h / 2) + '" r="2.4"/>');
    ruler.setAttribute("viewBox", "0 0 " + W + " 66");
    ruler.innerHTML = s.join("");
  }

  /* place the slider, the pin, the band, the tag and its string */
  var tagAt = 500;            // where the tag hangs: from the slider while playing, from the pin after measuring
  function place() {
    var gx = xOf(guess);
    cursor.style.left = gx + "px";
    if (phase === "done") {
      pin.style.left = xOf(ANSWER) + "px";
      var band = $("ya-band");
      if (band) {
        var a = Math.min(gx, xOf(ANSWER)), b = Math.max(gx, xOf(ANSWER));
        band.setAttribute("x", a); band.setAttribute("width", Math.max(0, b - a)); band.setAttribute("opacity", b - a > 0.5 ? ".9" : "0");
      }
    }
    var tx = xOf(tagAt), tw = tag.offsetWidth;
    var left = Math.max(0, Math.min(W - tw, tx - tw / 2));
    tag.style.left = left + "px";
    var hole = Math.max(14, Math.min(tw - 14, tx - left));
    tag.style.setProperty("--hole", hole + "px");
    var top = tag.offsetTop + 9, from = phase === "done" ? 88 : 95;
    stringPath.setAttribute("d", "M" + tx + " " + from + " C " + tx + " " + (from + 10) + ", " + (left + hole) + " " + (top - 12) + ", " + (left + hole) + " " + top);
    board.style.height = (tag.offsetTop + tag.offsetHeight + 8) + "px";
  }

  function describe() {
    var pct = Math.round(guess / 10);
    cursor.setAttribute("aria-valuenow", String(pct));
    cursor.setAttribute("aria-valuetext", pct + " percent of the way" + (pct < 50 ? ", closer to the left end" : pct > 50 ? ", closer to the right end" : ", halfway"));
  }
  function setGuess(g) {
    g = Math.max(0, Math.min(1000, Math.round(g)));
    if (g === guess) return;
    var tickBefore = Math.floor(guess / 100), tickAfter = Math.floor(g / 100);
    guess = g; tagAt = g;
    place();
    describe();
    if (tickBefore !== tickAfter && window.navigator.vibrate) { try { window.navigator.vibrate(4); } catch (e) { /* ignore */ } }
  }

  /* ---------- dragging along the ruler: press anywhere on it, slide, let go ---------- */
  var dragging = null;
  function fromPointer(e) {
    var r = board.getBoundingClientRect();
    return (e.clientX - r.left - X0) / (X1 - X0) * 1000;
  }
  board.addEventListener("pointerdown", function (e) {
    if (phase !== "play" || e.button > 0) return;
    dragging = e.pointerId;
    try { board.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    board.classList.add("dragging", "moving");
    setGuess(fromPointer(e));
    e.preventDefault();
  });
  board.addEventListener("pointermove", function (e) {
    if (dragging === null || e.pointerId !== dragging) return;
    setGuess(fromPointer(e));
  });
  function stop(e) {
    if (dragging === null || (e && e.pointerId !== dragging)) return;
    dragging = null;
    board.classList.remove("dragging", "moving");
  }
  board.addEventListener("pointerup", stop);
  board.addEventListener("pointercancel", stop);

  /* keys: arrows move by one percent (with Shift by five), Page keys by ten, Home and End to the ends, Enter measures */
  function key(e) {
    if (phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return false;
    var step = e.shiftKey ? 50 : 10;
    switch (e.key) {
      case "ArrowLeft": case "ArrowDown": setGuess(guess - step); return true;
      case "ArrowRight": case "ArrowUp": setGuess(guess + step); return true;
      case "PageDown": setGuess(guess - 100); return true;
      case "PageUp": setGuess(guess + 100); return true;
      case "Home": setGuess(0); return true;
      case "End": setGuess(1000); return true;
    }
    return false;
  }
  cursor.addEventListener("keydown", function (e) {
    if (key(e)) { e.preventDefault(); return; }
    if (phase === "play" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); measure(); }
  });
  document.addEventListener("keydown", function (e) {                 // the arrows also work when nothing else has the focus
    if (e.target === cursor || document.querySelector("dialog[open]")) return;   // the slider handles its own keys
    var a = document.activeElement;
    if (a && a !== document.body) return;
    if (key(e)) e.preventDefault();
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 0 ? "A friend was spot on to the year. Can you match that?"
      : "A friend was " + yearsText(friend) + " off. Can you get closer?") +
      (practice ? " It is an earlier line, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("years-apart/challenge-opened");

  drawRuler();
  describe();
  if (earlier) {
    guess = earlier.g;
    showResult(false);
  } else {
    board.classList.add("play");
    place();
  }
  window.addEventListener("resize", function () { drawRuler(); place(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(); }, function () { /* ignore */ });

  /* ---------- measuring ---------- */
  function measure() {
    if (phase !== "play") return;
    var g = guess, y = yearsOff(g);
    TO.update(GAME, function (s) {
      var slot = practice ? s.practice : s.results;
      if (!valid(slot[day])) slot[day] = { g: g, a: ANSWER, y: y, id: q.id };
    });
    TO.count(practice ? "years-apart/practice-played" : "years-apart/played/day-" + day);
    showResult(true);
  }
  btnMeasure.addEventListener("click", measure);

  /* ---------- the reveal: the years appear, the tag travels to its true place ---------- */
  function showResult(animate) {
    var r = { g: guess, a: ANSWER, y: yearsOff(guess) };
    var hadFocus = document.activeElement === btnMeasure || document.activeElement === cursor;
    phase = "done";
    actions.hidden = true;
    hint.hidden = true;
    board.classList.remove("play", "dragging", "moving");
    board.classList.add("done");
    cursor.setAttribute("tabindex", "-1");
    cursor.setAttribute("aria-disabled", "true");
    panel.classList.add("revealed");
    var motion = animate && !TO.reducedMotion();

    $("left-y").textContent = L.y; $("left-y").hidden = false;
    $("right-y").textContent = R.y; $("right-y").hidden = false;
    $("tag-y").textContent = M.y; $("tag-y").hidden = false;
    pin.hidden = false;
    if (motion) {
      pin.classList.add("drop");
      tag.classList.add("travel");
    }
    tagAt = ANSWER;
    place();
    if (motion) window.setTimeout(function () { tag.classList.remove("travel"); place(); }, 950);

    var v = $("offby");
    var line = "The line is " + (about() ? "about " : "") + commas(q.span) + " years long.";
    v.innerHTML = spotOn(r) ? "<b>Spot on.</b> Just " + yearsText(r.y) + " off." : "You were <b>" + yearsText(r.y) + "</b> off.";
    v.insertAdjacentHTML("beforeend", '<span class="ya-line"></span>');
    v.lastChild.textContent = line;
    v.classList.toggle("hit", spotOn(r));               // yellow is kept for a miss
    $("verdict").hidden = false;
    place();
    fillAfter(r);
    renderChip();
    buildPractice();
    if (hadFocus) { v.setAttribute("tabindex", "-1"); try { v.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
  }

  function fillAfter(r) {
    var f = $("friend");
    if (friend !== null) {
      var said = friend === 0 ? "Your friend was spot on to the year" : "Your friend was " + yearsText(friend) + " off";
      f.textContent = r.y < friend ? said + ". You did better." : r.y === friend ? said + ", like you. A tie." : said + ". Closer than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.fact;
    var list = $("sources");
    list.innerHTML = "";
    [L, M, R].forEach(function (e) {
      var li = document.createElement("li");
      var b = document.createElement("b"); b.textContent = e.t;
      li.appendChild(b);
      li.appendChild(document.createTextNode(", " + e.y + ": "));
      (e.src || []).forEach(function (s, i) {
        if (i) li.appendChild(document.createTextNode(", "));
        var a = document.createElement("a");
        a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name;
        li.appendChild(a);
      });
      list.appendChild(li);
    });
    if (!practice) {
      fillStamp($("earned-stamp"), q);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s line</a>';
    else next.textContent = "A new line arrives at midnight.";
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });   // what is played today, and the next game
    prepareCard(r);
  }

  /* ---------- streak chip, album ---------- */
  function playedPuzzle(r, n) { return (r && r.id && byId[r.id]) || puzzleOf(n); }
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1 && valid(res[n]); })
      .sort(function (a, b) { return b - a; });
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    var album = $("album"), off = 0;
    album.innerHTML = "";
    days.forEach(function (n) {
      off += Math.abs(res[n].g - res[n].a);
      var st = document.createElement("div");
      st.className = "stamp ya";
      fillStamp(st, playedPuzzle(res[n], n));
      album.appendChild(st);
    });
    $("st-avg").textContent = (days.length ? Math.round(off / days.length / 10) : 0) + "%";
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    var m = EV[p.mid] || {};
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = ICON;
    var what = document.createElement("span"); what.className = "what"; what.textContent = m.stamp || m.t || "";
    var of = document.createElement("span"); of.className = "of"; of.textContent = m.y || "";
    el.appendChild(what); el.appendChild(of);
  }

  /* ---------- practice: yesterday's line ---------- */
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 1);      // only yesterday can be practised
    for (var n = today - 1; n >= first; n--) {
      var r = g.results[n] || g.practice[n];
      var p = playedPuzzle(r, n);
      if (!valid(r)) { r = null; p = puzzleOf(n); }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = "Where does it fall? " + EV[p.mid].t;
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? "You were " + yearsText(r.y) + " off. " + EV[p.mid].y + "." : "Not played yet";   // the year stays hidden until you have played
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: the three events and how far off you were, never where it falls ---------- */
  function shareUrl(r) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + r.y;
  }
  function shareText(r) {
    return "Years Apart, day " + day + ": where does “" + M.t + "” fall between “" + L.t + "” and “" + R.t + "”? " +
      (spotOn(r) ? "I was spot on." : "I was " + yearsText(r.y) + " off.") + " Can you get closer? " + shareUrl(r);
  }
  function roundRect(ctx, x, y, w, h, rad) {
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }
  /* splits a text into lines that fit, making the letters smaller (down to a floor) until it takes at most maxLines */
  function wrap(x, text, weight, size, family, maxW, maxLines, floor) {
    for (var s = size; s >= floor; s -= 2) {
      x.font = weight + " " + s + "px " + family;
      var words = text.split(" "), lines = [], cur = "";
      for (var i = 0; i < words.length; i++) {
        var t = cur ? cur + " " + words[i] : words[i];
        if (x.measureText(t).width <= maxW || !cur) cur = t;
        else { lines.push(cur); cur = words[i]; }
      }
      if (cur) lines.push(cur);
      var widest = Math.max.apply(null, lines.map(function (l) { return x.measureText(l).width; }));
      if (lines.length <= maxLines && widest <= maxW) return { lines: lines, size: s, fits: true };
      if (s - 2 < floor) return { lines: lines, size: s, fits: false };
    }
  }
  function drawCard(r) {
    var W2 = 1080, H2 = 1350, MG = 76, BROWN = "#7A5034";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    var fits = true;
    x.fillStyle = BROWN;                         // the game's own colour
    x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 225, 180, .16)"); glow.addColorStop(1, "rgba(0, 0, 0, .12)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.setLineDash([16, 12]); x.lineWidth = 3; x.strokeStyle = "rgba(240, 214, 170, .35)";
    roundRect(x, 26, 26, W2 - 52, H2 - 52, 44); x.stroke(); x.setLineDash([]);
    x.textBaseline = "alphabetic";
    x.fillStyle = "#ffffff";

    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", MG, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("Years Apart, day " + day, W2 - MG, 118);

    x.textAlign = "left";
    x.font = "800 100px " + FD;
    x.fillText("Where does it fall?", MG - 4, 262);

    // the two ends, above the ruler
    var colW = (W2 - 2 * MG - 40) / 2, gold = "#F2D7A2";
    var lw = wrap(x, L.t, "700", 42, FD, colW, 3, 30), rw = wrap(x, R.t, "700", 42, FD, colW, 3, 30);
    fits = fits && lw.fits && rw.fits;
    var endLines = Math.max(lw.lines.length, rw.lines.length), lh = Math.max(lw.size, rw.size) * 1.16;
    var rulerY = 352 + 40 + endLines * lh + 24;
    x.font = "800 24px " + F; x.fillStyle = "#E3C58F";
    x.textAlign = "left"; x.fillText("FROM", MG, 352);
    x.textAlign = "right"; x.fillText("TO", W2 - MG, 352);
    x.fillStyle = gold;
    lw.lines.forEach(function (l, i) { x.textAlign = "left"; x.font = "700 " + lw.size + "px " + FD; x.fillText(l, MG, 352 + 46 + i * lh); });
    rw.lines.forEach(function (l, i) { x.textAlign = "right"; x.font = "700 " + rw.size + "px " + FD; x.fillText(l, W2 - MG, 352 + 46 + i * lh); });

    // the ruler, with no mark on it
    var rx = MG - 8, rw2 = W2 - 2 * MG + 16, rh = 92;
    x.fillStyle = "rgba(20, 10, 4, .45)"; roundRect(x, rx + 8, rulerY + 18, rw2 - 16, rh, 10); x.fill();
    var wood = x.createLinearGradient(0, rulerY, 0, rulerY + rh);
    wood.addColorStop(0, "#F0D3A0"); wood.addColorStop(0.5, "#E2BA7D"); wood.addColorStop(1, "#C99A5B");
    x.fillStyle = wood; roundRect(x, rx, rulerY, rw2, rh, 8); x.fill();
    var brass = x.createLinearGradient(0, 0, 22, 0);
    brass.addColorStop(0, "#9C7128"); brass.addColorStop(0.32, "#F6DC92"); brass.addColorStop(0.7, "#D2A247"); brass.addColorStop(1, "#8A5F1E");
    x.save(); x.translate(rx, 0); x.fillStyle = brass; roundRect(x, 0, rulerY, 22, rh, 6); x.fill(); x.restore();
    x.save(); x.translate(rx + rw2 - 22, 0); x.fillStyle = brass; roundRect(x, 0, rulerY, 22, rh, 6); x.fill(); x.restore();
    x.strokeStyle = "rgba(58, 38, 20, .85)";
    var a0 = rx + 34, a1 = rx + rw2 - 34;
    for (var i = 0; i <= 50; i++) {
      var tx = a0 + (a1 - a0) * i / 50, tl = i % 5 === 0 ? 34 : 18;
      x.lineWidth = i % 5 === 0 ? 2.4 : 1.6;
      x.beginPath(); x.moveTo(tx, rulerY + 5); x.lineTo(tx, rulerY + 5 + tl); x.stroke();
    }

    // the tag with the event in between, under the ruler, not on it
    var tagW = Math.min(W2 - 2 * MG, 760);
    var mw = wrap(x, M.t, "700", 50, FD, tagW - 80, 2, 34);
    fits = fits && mw.fits;
    var mlh = mw.size * 1.15, tagH = 96 + mw.lines.length * mlh;
    var ty = rulerY + rh + 50, tx0 = (W2 - tagW) / 2;
    x.fillStyle = "rgba(20, 10, 4, .4)"; roundRect(x, tx0 + 6, ty + 12, tagW, tagH, 14); x.fill();
    x.fillStyle = "#FBF4E4"; roundRect(x, tx0, ty, tagW, tagH, 14); x.fill();
    x.fillStyle = "#6E4429"; x.beginPath(); x.arc(W2 / 2, ty + 22, 9, 0, Math.PI * 2); x.fill();
    x.textAlign = "center"; x.fillStyle = "#8C6A47"; x.font = "800 24px " + F;
    x.fillText("SOMEWHERE IN BETWEEN", W2 / 2, ty + 70);
    x.fillStyle = "#2A1B10";
    mw.lines.forEach(function (l, i) { x.font = "700 " + mw.size + "px " + FD; x.fillText(l, W2 / 2, ty + 70 + 18 + mlh * (i + 0.8)); });

    // how far off: the yellow part is the miss, as on the ruler in the game. It starts at the left, so it says nothing about where.
    var resY = ty + tagH + 104;
    x.textAlign = "left"; x.fillStyle = "#ffffff"; x.font = "800 86px " + FD;
    var head = spotOn(r) ? "Spot on" : "Off by " + yearsText(r.y);
    var hs = 86; while (x.measureText(head).width > W2 - 2 * MG && hs > 50) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head, MG - 3, resY);
    var barY = resY + 34, barW = W2 - 2 * MG, frac = Math.min(1, Math.abs(r.g - r.a) / 1000);
    x.fillStyle = "rgba(255, 255, 255, .22)"; roundRect(x, MG, barY, barW, 22, 11); x.fill();
    x.fillStyle = TO.MISS; roundRect(x, MG, barY, Math.max(22, barW * frac), 22, 11); x.fill();

    x.fillStyle = "#ffffff"; x.textAlign = "left";
    x.font = "800 72px " + FD;
    x.fillText("Can you get closer?", MG - 3, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1270);
    }
    layout = { fits: fits, bottom: barY + 22, limit: 1204 - 72, ends: endLines, tagLines: mw.lines.length, sizes: [lw.size, rw.size, mw.size],
               rulerTop: rulerY, tagBottom: ty + tagH };
    return c;
  }
  window.YearsApartCard = function () { return layout; };     // read by r/site-workshop/checks/t_apart.py
  function prepareCard(r) {
    function make() {
      try {
        drawCard(r).toBlob(function (blob) {
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
        document.fonts.load('700 46px "Bricolage Grotesque"'),
        document.fonts.load('600 40px "Figtree"'),
        document.fonts.load('800 24px "Figtree"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var r = { g: guess, a: ANSWER, y: yearsOff(guess) };
    TO.count("years-apart/share");
    TO.share({ blob: cardBlob, filename: "years-apart-day-" + day + ".png", text: shareText(r) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "years-apart-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var r = { g: guess, a: ANSWER, y: yearsOff(guess) };
    TO.copyText(shareText(r)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(r);
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
