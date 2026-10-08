/* Out of 24: one real day a day. Shade on the dial how many of the 24 hours an animal, or the people of one country,
   spend on one thing; then the real arc draws in over yours, with the figure and where it comes from. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "out-of-24";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), stage = $("stage"), dial = $("dial"), thumbAt = $("thumb-at"), nudgeG = $("nudge");
  var actions = $("guess-actions"), btnShow = $("btn-show"), hint = $("hint");
  var arcYou = $("arc-you"), arcMiss = $("arc-miss"), arcBand = $("arc-band"), arcReal = $("arc-real");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("question").textContent = "Today's day could not be loaded. Please try again in a moment.";
    panel.hidden = true; actions.hidden = true; hint.hidden = true;
    return;
  }

  var DAY = 1440;               // minutes in the 24 hours: the dial runs from 0 at the top round to 1,440
  var STEP = 15;                // the dial moves in quarter hours
  var TOL = 15;                 // within a quarter of an hour of the band counts as spot on
  var R = 96, CIRC = 2 * Math.PI * R;   // the ring in the dial's own units (viewBox 240)
  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- the small pictures: what the hours go on, where, and whose day ---------- */
  var ICON = {
    asleep:    'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
    rest:      'M3 6v13 M3 15h18 M21 19v-6.5a2.5 2.5 0 0 0-2.5-2.5H10v5 M6.5 12.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z',
    dreaming:  'M7 18h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 10a4 4 0 0 0 0 8Z M10 12.6h3.4L10 15.4h3.4',
    eating:    'M6.5 3v6.5a2.5 2.5 0 0 0 5 0V3 M9 3v18 M17.5 21V3c-2.2 1.4-3.3 4-3.3 7.5V13h3.3',
    cud:       'M4 12a8 8 0 0 1 13.7-5.6L20 8.5 M20 4v4.5h-4.5 M20 12a8 8 0 0 1-13.7 5.6L4 15.5 M4 20v-4.5h4.5',
    lying:     'M5.5 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M9 12h8.5a2.5 2.5 0 0 1 2.5 2.5V16 M3 16h18 M3 19v-3 M21 19v-3',
    tv:        'M3 7h18v11H3Z M8 21h8 M9 3l3 4 3-4',
    housework: 'M16.5 2.5 11 12 M6.5 12h8l1.5 9H5Z M8.5 15.5 8 21 M11.3 15.5V21 M14 15.5l.5 5.5',
    care:      'M16.5 2.5 11 12 M6.5 12h8l1.5 9H5Z M8.5 15.5 8 21 M11.3 15.5V21 M14 15.5l.5 5.5',
    work:      'M3 8h18v12H3Z M8 8V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V8 M3 13h18',
    workstudy: 'M3 8h18v12H3Z M8 8V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V8 M3 13h18',
    pin:       'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z',
    people:    'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M2.5 20a6.5 6.5 0 0 1 13 0 M16 4.3a3.5 3.5 0 0 1 0 6.4 M18 13.6a6.5 6.5 0 0 1 3.5 6.4'
  };
  function icon(k) {
    var d = ICON[k] || ICON.asleep;
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      d.split(" M").map(function (p, i) { return '<path d="' + (i ? "M" + p : p) + '"/>'; }).join("") + '</svg>';
  }

  /* ---------- the flags, drawn here (no files): each a list of shapes, for the page and for the share picture ---------- */
  function star(cx, cy, r, rot) {        // a five-pointed star; rot turns its first point clockwise from straight up
    var p = [];
    for (var k = 0; k < 10; k++) {
      var rr = k % 2 ? r * 0.381966 : r, a = rot + k * Math.PI / 5;
      p.push((cx + rr * Math.sin(a)).toFixed(3) + "," + (cy - rr * Math.cos(a)).toFixed(3));
    }
    return "M" + p.join("L") + "Z";
  }
  function towards(cx, cy, x, y) { return Math.atan2(x - cx, -(y - cy)); }
  var FLAGS = {
    jp: { w: 30, h: 20, s: [["rect", 0, 0, 30, 20, "#FFFFFF"], ["circle", 15, 10, 6, "#BC002D"]] },
    fr: { w: 30, h: 20, s: [["rect", 0, 0, 10, 20, "#000091"], ["rect", 10, 0, 10, 20, "#FFFFFF"], ["rect", 20, 0, 10, 20, "#E1000F"]] },
    it: { w: 30, h: 20, s: [["rect", 0, 0, 10, 20, "#009246"], ["rect", 10, 0, 10, 20, "#F1F2F1"], ["rect", 20, 0, 10, 20, "#CE2B37"]] },
    at: { w: 30, h: 20, s: [["rect", 0, 0, 30, 20, "#C8102E"], ["rect", 0, 6.6667, 30, 6.6667, "#FFFFFF"]] },
    de: { w: 30, h: 18, s: [["rect", 0, 0, 30, 6, "#000000"], ["rect", 0, 6, 30, 6, "#DD0000"], ["rect", 0, 12, 30, 6, "#FFCE00"]] },
    cn: (function () {
      var s = [["rect", 0, 0, 30, 20, "#EE1C25"], ["path", star(5, 5, 3, 0), "#FFFF00"]];
      [[10, 2], [12, 4], [12, 7], [10, 9]].forEach(function (c) { s.push(["path", star(c[0], c[1], 1, towards(c[0], c[1], 5, 5)), "#FFFF00"]); });
      return { w: 30, h: 20, s: s };
    })(),
    us: (function () {
      var s = [], H = 100, W = 190, sh = H / 13, cw = W * 0.4, ch = sh * 7, d = "";
      s.push(["rect", 0, 0, W, H, "#FFFFFF"]);
      for (var i = 0; i < 13; i += 2) s.push(["rect", 0, i * sh, W, sh, "#B22234"]);
      s.push(["rect", 0, 0, cw, ch, "#3C3B6E"]);
      for (var row = 0; row < 9; row++) {
        var n = row % 2 ? 5 : 6;
        for (var j = 0; j < n; j++) d += star(cw / 12 * (row % 2 ? 2 * j + 2 : 2 * j + 1), ch / 10 * (row + 1), 3.08, 0);
      }
      s.push(["path", d, "#FFFFFF"]);
      return { w: W, h: H, s: s };
    })()
  };
  function flagSvg(f) {
    var out = "", edge = Math.max(f.w, f.h) / 75;
    f.s.forEach(function (x) {
      if (x[0] === "rect") out += '<rect x="' + x[1] + '" y="' + x[2] + '" width="' + x[3] + '" height="' + x[4] + '" fill="' + x[5] + '"/>';
      else if (x[0] === "circle") out += '<circle cx="' + x[1] + '" cy="' + x[2] + '" r="' + x[3] + '" fill="' + x[4] + '"/>';
      else out += '<path d="' + x[1] + '" fill="' + x[2] + '"/>';
    });
    return out + '<rect x="' + edge / 2 + '" y="' + edge / 2 + '" width="' + (f.w - edge) + '" height="' + (f.h - edge) +
      '" fill="none" stroke="rgba(21,23,43,.28)" stroke-width="' + edge + '"/>';
  }
  function flagOnCanvas(x, f, left, top, scale) {
    x.save();
    x.translate(left, top); x.scale(scale, scale);
    f.s.forEach(function (s) {
      if (s[0] === "rect") { x.fillStyle = s[5]; x.fillRect(s[1], s[2], s[3], s[4]); }
      else if (s[0] === "circle") { x.fillStyle = s[4]; x.beginPath(); x.arc(s[1], s[2], s[3], 0, 2 * Math.PI); x.fill(); }
      else if (window.Path2D) { x.fillStyle = s[2]; x.fill(new Path2D(s[1])); }
    });
    x.restore();
  }

  /* ---------- which day, which puzzle, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,7}$/.test(v)) ? parseInt(v, 10) : null; }
  function signed(v) { return (v !== null && /^-?\d{1,5}$/.test(v)) ? parseInt(v, 10) : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function scoreOk(y) { return num(y) && Math.round(y) === y && (y === 0 || (Math.abs(y) > TOL && Math.abs(y) <= DAY)); }

  var day = today, practice = false, friend = null;
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = signed(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay === today - 1) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay >= today - 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cG !== null && scoreOk(cG)) friend = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }

  function valid(r) {
    return !!r && num(r.g) && r.g >= 0 && r.g <= DAY && r.g % STEP === 0 && scoreOk(r.y) && typeof r.t === "string";
  }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier)) q = byId[earlier.id];
  if (!valid(earlier)) earlier = null;

  var v = 0;                                // the hours you have shaded, in minutes: the dial starts empty
  var phase = "play", cardBlob = null, cardUrl = "", layout = null, picData = null;
  var reduced = TO.reducedMotion();

  /* ---------- time, written the way the page writes it ---------- */
  function fmt(m) {                         // 0 h, 45 min, 2 h, 7 h 05
    m = Math.round(m);
    var h = Math.floor(m / 60), mm = m % 60;
    if (m === 0) return "0 h";
    if (h === 0) return mm + " min";
    if (mm === 0) return h + " h";
    return h + " h " + (mm < 10 ? "0" : "") + mm;
  }
  function spoken(m) {                      // for screen readers: 7 hours 45 minutes
    var h = Math.floor(m / 60), mm = m % 60, out = [];
    if (h || !mm) out.push(h + (h === 1 ? " hour" : " hours"));
    if (mm) out.push(mm + (mm === 1 ? " minute" : " minutes"));
    return out.join(" ");
  }
  function scoreOf(g) {                     // 0 is spot on; otherwise minutes off the band, + too long, − too short
    if (g < q.lo - TOL) return -(q.lo - g);
    if (g > q.hi + TOL) return g - q.hi;
    return 0;
  }
  function scoreText(y) { return y === 0 ? "Spot on" : fmt(Math.abs(y)) + (y > 0 ? " too long" : " too short"); }
  function snap(m) { return Math.max(0, Math.min(DAY, Math.round(m / STEP) * STEP)); }
  function chipsText(p) { return p.chips.map(function (c) { return c.t; }).join(", "); }

  /* ---------- the screen ---------- */
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Out of 24, day " + day + " | Logicers";
  $("face").textContent = q.face;
  var chips = $("chips");
  q.chips.forEach(function (c, i) {
    var s = document.createElement("span");
    s.className = "o-chip" + (i ? " soft" : "");
    s.innerHTML = icon(c.i);
    s.appendChild(document.createTextNode(c.t));
    chips.appendChild(s);
  });

  var pic = $("pic");
  if (q.flag && FLAGS[q.flag]) {
    var F = FLAGS[q.flag];
    pic.setAttribute("viewBox", "0 0 " + F.w + " " + F.h);
    pic.innerHTML = flagSvg(F);
    pic.classList.add("flag");
  } else {
    /* the silhouette: the same files as Long Lost Cousin's, copied into pics/ by build.py */
    window.TurnsOutPic = function (name, data) {
      if (name !== q.pic || !data || !data.d) return;
      picData = data;
      pic.setAttribute("viewBox", "0 0 " + data.w + " " + data.h);
      pic.innerHTML = '<path d="' + data.d + '"/>';
    };
    (function () {
      var s = document.createElement("script");
      s.src = "pics/" + q.pic + ".js";
      s.async = true;
      document.head.appendChild(s);
    })();
  }

  /* the hours on the ring: a line across it every hour, a stronger one every six */
  (function () {
    var g = $("hours");
    for (var h = 0; h < 24; h++) {
      var a = h / 24 * 2 * Math.PI, sx = Math.sin(a), cy = -Math.cos(a);
      var l = document.createElementNS(SVGNS, "line");
      l.setAttribute("x1", (120 + 83.5 * sx).toFixed(2)); l.setAttribute("y1", (120 + 83.5 * cy).toFixed(2));
      l.setAttribute("x2", (120 + 108.5 * sx).toFixed(2)); l.setAttribute("y2", (120 + 108.5 * cy).toFixed(2));
      if (h % 6 === 0) l.setAttribute("class", "six");
      g.appendChild(l);
    }
  })();

  /* an arc of the ring from one time of the day to another, in minutes from the top */
  function arc(el, from, to) {
    from = Math.max(0, Math.min(DAY, from)); to = Math.max(from, Math.min(DAY, to));
    var a = from / DAY * CIRC, len = (to - from) / DAY * CIRC;
    el.setAttribute("stroke-dasharray", "0 " + a.toFixed(3) + " " + len.toFixed(3) + " " + (CIRC + 1).toFixed(3));
  }

  /* ---------- the centre of the dial ---------- */
  function centre(lines, cap, small) {
    var big = $("big"), big2 = $("big2");
    $("cap").textContent = cap || "";
    big.textContent = lines[0];
    big2.textContent = lines[1] || "";
    var two = lines.length > 1;
    big.classList.toggle("two", two); big2.classList.toggle("two", two);
    big.setAttribute("y", two ? "110" : (cap ? "120" : "116"));
    big2.setAttribute("y", "136");
    $("small").textContent = small || "";
    $("small").setAttribute("y", two ? "162" : (cap ? "150" : "146"));
  }
  function figLines(f) {                    // a long band goes on two lines: "12 h 06–" and "14 h 30"
    if (f.length > 9 && f.indexOf("–") > 0) { var k = f.indexOf("–"); return [f.slice(0, k + 1), f.slice(k + 1)]; }
    return [f];
  }

  /* ---------- setting the hours ---------- */
  /* The dial starts empty. Nothing in the stock takes no time at all, so the start is never an answer; and, as
     Every Beat learnt, Show still asks for one move first. */
  var moved = false, nudgeTimer = 0;
  function setV(m) {                        // a move is a change: touching the empty dial at the top is not yet one
    if (phase !== "play") return;
    m = snap(m);
    if (m === v) return;
    v = m;
    moved = true;
    if (nudgeTimer) { window.clearTimeout(nudgeTimer); nudgeTimer = 0; btnShow.textContent = "Show the real hours"; }
    paint();
  }
  function paint() {
    arc(arcYou, 0, v);
    thumbAt.setAttribute("transform", "rotate(" + (v / DAY * 360).toFixed(2) + " 120 120)");
    if (phase === "play") centre([fmt(v)], "", "a day");
    dial.setAttribute("aria-valuenow", String(v));
    dial.setAttribute("aria-valuetext", spoken(v) + " a day");
  }
  function nudge() {
    btnShow.textContent = "First drag round the dial";
    $("say").textContent = "";
    $("say").textContent = "First shade the hours: drag round the dial, or use the arrow keys on it.";
    if (!reduced) { nudgeG.classList.remove("nudge"); void nudgeG.getBoundingClientRect(); nudgeG.classList.add("nudge"); }
    window.clearTimeout(nudgeTimer);
    nudgeTimer = window.setTimeout(function () { nudgeTimer = 0; btnShow.textContent = "Show the real hours"; }, 1800);
  }

  /* Where the finger is, as minutes round the dial from the top, or null too near the middle to tell. The value
     follows the finger; at the top it stops: past 24 h it stays full, back past 0 it stays empty, until the finger
     comes back across the top the other way. */
  function fingerAt(e) {
    var r = dial.getBoundingClientRect();
    var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    if (Math.sqrt(dx * dx + dy * dy) < r.width * 0.12) return null;
    var a = Math.atan2(dx, -dy);
    if (a < 0) a += 2 * Math.PI;
    return a / (2 * Math.PI) * DAY;
  }
  var drag = null, pin = 0, lastA = null;
  var NEAR = 90;                            // a finger that lands this close to the thumb, across the top, means the thumb
  function grab(a) {                        // the finger lands: the dial goes to that point, except right by the top,
    if (v >= DAY - NEAR && a < NEAR) { pin = 1; setV(DAY); }        // where a full dial stays full
    else if (v <= NEAR && a > DAY - NEAR) { pin = -1; setV(0); }    // and an empty one stays empty
    else { pin = 0; setV(a); }
    lastA = a;
  }
  function follow(a) {
    if (lastA === null) { grab(a); return; }
    var d = a - lastA;
    if (d > DAY / 2) d -= DAY;
    if (d < -DAY / 2) d += DAY;
    var overTop = d > 0 && lastA + d >= DAY, backOverTop = d < 0 && lastA + d < 0;
    if (pin === 1) { if (backOverTop) { pin = 0; setV(a); } }
    else if (pin === -1) { if (overTop) { pin = 0; setV(a); } }
    else if (overTop) { pin = 1; setV(DAY); }
    else if (backOverTop) { pin = -1; setV(0); }
    else setV(a);
    lastA = a;
  }
  dial.addEventListener("pointerdown", function (e) {
    if (phase !== "play" || e.button > 0) return;
    drag = { id: e.pointerId };
    var a = fingerAt(e);
    lastA = null;
    if (a !== null) grab(a);
    stage.classList.add("on");
    try { dial.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    e.preventDefault();
  });
  dial.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var a = fingerAt(e);
    if (a !== null) follow(a);
    e.preventDefault();
  });
  function stop(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    drag = null;
    stage.classList.remove("on");
  }
  dial.addEventListener("pointerup", stop);
  dial.addEventListener("pointercancel", stop);
  dial.addEventListener("lostpointercapture", stop);

  /* keys on the dial: arrows by a quarter hour, Page keys by an hour, Home and End to the ends, Enter shows */
  dial.addEventListener("keydown", function (e) {
    if (phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return;
    var step = e.shiftKey ? 60 : STEP;
    switch (e.key) {
      case "ArrowUp": case "ArrowRight": setV(v + step); break;
      case "ArrowDown": case "ArrowLeft": setV(v - step); break;
      case "PageUp": setV(v + 60); break;
      case "PageDown": setV(v - 60); break;
      case "Home": setV(0); break;
      case "End": setV(DAY); break;
      case "Enter": case " ": show(); break;
      default: return;
    }
    pin = v >= DAY ? 1 : v <= 0 ? -1 : 0;
    e.preventDefault();
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 0 ? "A friend was spot on. Can you match that?"
      : "A friend was " + scoreText(friend) + ". Can you beat that?") +
      (practice ? " It is an earlier day, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("out-of-24/challenge-opened");

  if (earlier) { v = snap(earlier.g); paint(); showResult(false); } else { paint(); fit(); }
  window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit, function () { /* ignore */ });

  /* ---------- nothing may need scrolling while you play; after Show, the whole dial and the verdict stay in
     view, above the bar that leads to the next game ---------- */
  function fit() {
    var app = document.documentElement;
    function over() {
      if (phase === "play") return document.body.scrollHeight > window.innerHeight + 1;
      return panel.getBoundingClientRect().bottom + window.pageYOffset > window.innerHeight - 76;
    }
    app.classList.remove("fit1", "fit2", "fit3");
    for (var i = 1; i <= 3 && over(); i++) {
      app.classList.remove("fit1", "fit2", "fit3");
      app.classList.add("fit" + i);
    }
  }

  /* ---------- showing the real hours ---------- */
  function show() {
    if (phase !== "play") return;
    if (!moved) { nudge(); return; }
    var g = v, y = scoreOf(g), t = scoreText(y);
    TO.update(GAME, function (s) {
      var slot = practice ? s.practice : s.results;
      if (!valid(slot[day])) slot[day] = { g: g, y: y, t: t, id: q.id };
    });
    TO.count(practice ? "out-of-24/practice-played" : "out-of-24/played/day-" + day);
    showResult(true);
  }
  btnShow.addEventListener("click", show);

  var drawing = 0;
  function showResult(animate) {
    var g = v, y = scoreOf(g);
    var hadFocus = document.activeElement === btnShow || document.activeElement === dial;
    phase = "done";
    drag = null;
    actions.hidden = true;
    hint.hidden = true;
    panel.classList.add("revealed");
    stage.classList.remove("on");
    dial.setAttribute("tabindex", "-1");
    dial.setAttribute("aria-hidden", "true");

    // the real hours enter the page only now: the band, the part you got wrong, and the arc that draws in
    arc(arcBand, q.lo, q.hi);
    if (y > 0) arc(arcMiss, q.hi, g);
    else if (y < 0) arc(arcMiss, g, q.lo);
    else arc(arcMiss, 0, 0);
    var you = "You: " + fmt(g);
    function finish() {
      drawing = 0;
      arc(arcReal, 0, q.lo);
      arcBand.classList.remove("wait"); arcMiss.classList.remove("wait");
      centre(figLines(q.fig), "REAL", you);
      panel.setAttribute("data-drawn", "1");
    }
    if (animate && !reduced && window.requestAnimationFrame) {
      arcBand.classList.add("fade", "wait"); arcMiss.classList.add("fade", "wait");
      arc(arcReal, 0, 0);
      var t0 = null, dur = 1100;
      var frame = function (t) {
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        arc(arcReal, 0, q.lo * e);
        centre([fmt(q.lo * e)], "REAL", you);
        if (p < 1) drawing = window.requestAnimationFrame(frame);
        else finish();
      };
      drawing = window.requestAnimationFrame(frame);
    } else finish();

    var o = $("offby");
    o.innerHTML = "";
    var b = document.createElement("b");
    b.textContent = scoreText(y);
    o.appendChild(b);
    o.appendChild(document.createTextNode(" You said " + fmt(g) + "; the real figure is " + q.fig + "."));
    o.classList.toggle("hit", y === 0);
    $("verdict").hidden = false;
    fillAfter(y);
    renderChip();
    buildPractice();
    fit();
    if (hadFocus) { o.setAttribute("tabindex", "-1"); try { o.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  function link(s) {
    var a = document.createElement("a");
    a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name;
    return a;
  }
  function fillAfter(y) {
    var f = $("friend");
    if (friend !== null) {
      var said = friend === 0 ? "Your friend was spot on" : "Your friend was " + scoreText(friend);
      var a = Math.abs(y), c = Math.abs(friend);
      f.textContent = a < c ? said + ". You were closer." : a === c ? said + ", like you. A tie." : said + ". Closer than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.sentence;
    if (q.note) { $("note").textContent = q.note; $("note").hidden = false; }
    var list = $("sources");
    list.innerHTML = "";
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("The figure: "));
    q.src.forEach(function (s, i) {
      if (i) li.appendChild(document.createTextNode(" · "));
      li.appendChild(link(s));
    });
    list.appendChild(li);
    if (q.pic) {
      var cr = document.createElement("li");
      cr.appendChild(document.createTextNode("Silhouette from "));
      cr.appendChild(link({ name: "PhyloPic", url: "https://www.phylopic.org/" }));
      if (q.credit && q.credit.lic) {
        var L = { by3: ["CC BY 3.0", "https://creativecommons.org/licenses/by/3.0/"],
                  by4: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"] }[q.credit.lic];
        cr.appendChild(document.createTextNode(": " + q.face + " by " + (q.credit.by || "an unnamed artist") + " ("));
        if (L) cr.appendChild(link({ name: L[0], url: L[1] })); else cr.appendChild(document.createTextNode(q.credit.lic));
        cr.appendChild(document.createTextNode(")."));
      } else {
        cr.appendChild(document.createTextNode(", in the public domain."));
      }
      list.appendChild(cr);
    }
    if (!practice) { fillStamp($("earned-stamp"), q); $("earned").hidden = false; }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today</a>';
    else next.textContent = "A new day arrives at midnight.";
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });
    prepareCard(y);
  }

  /* ---------- streak chip and album ---------- */
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
    var album = $("album"), spot = 0;
    album.innerHTML = "";
    days.forEach(function (n) {
      if (res[n].y === 0) spot++;
      var st = document.createElement("div");
      st.className = "stamp o24";
      fillStamp(st, playedPuzzle(res[n], n));
      album.appendChild(st);
    });
    $("st-spot").textContent = String(spot);
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    var c = 2 * Math.PI * 12, len = p.lo / DAY * c;
    el.innerHTML = '<svg class="o24d" viewBox="0 0 30 30" aria-hidden="true" focusable="false">' +
      '<circle class="r" cx="15" cy="15" r="12"/><circle class="a" cx="15" cy="15" r="12" transform="rotate(-90 15 15)" ' +
      'stroke-dasharray="' + len.toFixed(2) + ' ' + c.toFixed(2) + '"/></svg>';
    function add(cls, text) { var s = document.createElement("span"); s.className = cls; s.textContent = text; el.appendChild(s); }
    add("p", p.fig);
    add("what", p.face);
    add("of", chipsText(p));
  }

  /* ---------- practice: yesterday only ---------- */
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 1);
    for (var n = today - 1; n >= first; n--) {
      var r = g.results[n] || g.practice[n];
      var p = playedPuzzle(r, n);
      if (!valid(r)) { r = null; p = puzzleOf(n); }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = p.face + ", " + chipsText(p);
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? r.t : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: who, what, and how far off you were; never the real hours or yours ---------- */
  function shareUrl(y) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + y;
  }
  function shareText(y) {
    return "Out of 24, day " + day + ": how many hours a day? " + q.face + ", " + chipsText(q) + ". " +
      (y === 0 ? "I was spot on." : "I was " + scoreText(y) + ".") + " Can you beat that? " + shareUrl(y);
  }
  function roundRect(x, a, b, w, h, rad) {
    x.beginPath();
    x.moveTo(a + rad, b);
    x.arcTo(a + w, b, a + w, b + h, rad);
    x.arcTo(a + w, b + h, a, b + h, rad);
    x.arcTo(a, b + h, a, b, rad);
    x.arcTo(a, b, a + w, b, rad);
    x.closePath();
  }
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
  function drawCard(y) {
    var W = 1080, H = 1350, MG = 76, INK = "#0A5666";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var Fn = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + Fn;
    var fits = true;
    x.fillStyle = INK; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 0, 40, W / 2, 0, 1100);
    glow.addColorStop(0, "rgba(221, 240, 243, .16)"); glow.addColorStop(1, "rgba(0, 0, 0, .16)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.setLineDash([16, 12]); x.lineWidth = 3; x.strokeStyle = "rgba(221, 240, 243, .34)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke(); x.setLineDash([]);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 48px " + FD;
    x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + Fn;
    x.fillText("Out of 24, day " + day, W - MG, 118);

    x.textAlign = "left";
    var tq = wrap(x, "How many hours a day?", "800", 92, FD, W - 2 * MG, 1, 66);
    if (!tq.fits) tq = wrap(x, "How many hours a day?", "800", 92, FD, W - 2 * MG, 2, 60);
    fits = fits && tq.fits;
    tq.lines.forEach(function (l, i) { x.font = "800 " + tq.size + "px " + FD; x.fillText(l, MG - 4, 250 + i * tq.size * 1.06); });
    var after = 250 + (tq.lines.length - 1) * tq.size * 1.06;

    // the 24 hours as an empty ring, for the look of it: it shows neither the real hours nor yours
    var cx = W / 2, cy = after + (tq.lines.length > 1 ? 300 : 340), rr = 222;
    x.lineWidth = 46; x.strokeStyle = "rgba(255, 255, 255, .16)";
    x.beginPath(); x.arc(cx, cy, rr, 0, 2 * Math.PI); x.stroke();
    x.strokeStyle = INK;
    for (var h = 0; h < 24; h++) {
      var a = h / 24 * 2 * Math.PI;
      x.lineWidth = h % 6 ? 3 : 6;
      x.beginPath();
      x.moveTo(cx + (rr - 24) * Math.sin(a), cy - (rr - 24) * Math.cos(a));
      x.lineTo(cx + (rr + 24) * Math.sin(a), cy - (rr + 24) * Math.cos(a));
      x.stroke();
    }
    x.fillStyle = "rgba(255, 255, 255, .7)"; x.font = "700 34px " + Fn; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText("24", cx, cy - rr + 62); x.fillText("6", cx + rr - 62, cy); x.fillText("12", cx, cy + rr - 62); x.fillText("18", cx - rr + 62, cy);
    x.textBaseline = "alphabetic";

    // who, inside the ring
    var boxW = 270, boxH = 210, drawn = false;
    if (q.flag && FLAGS[q.flag]) {
      var Fg = FLAGS[q.flag], s = Math.min(216 / Fg.w, 156 / Fg.h);      // a flag stays clear of the hours' numbers
      var fw = Fg.w * s, fh = Fg.h * s;
      x.fillStyle = "rgba(255, 255, 255, .9)";
      roundRect(x, cx - fw / 2 - 8, cy - fh / 2 - 8, fw + 16, fh + 16, 10); x.fill();
      flagOnCanvas(x, Fg, cx - fw / 2, cy - fh / 2, s);
      drawn = true;
    } else if (picData && window.Path2D) {
      try {
        var sc = Math.min(boxW / picData.w, boxH / picData.h);
        var pw = picData.w * sc, ph = picData.h * sc;
        x.save();
        x.translate(cx - pw / 2, cy - ph / 2);
        x.scale(sc, sc);
        x.fillStyle = "rgba(255, 255, 255, .96)";
        x.fill(new Path2D(picData.d));
        x.restore();
        drawn = true;
      } catch (e) { /* the picture is a bonus */ }
    }

    var nameY = cy + rr + 105;
    x.textAlign = "center"; x.fillStyle = "#fff";
    var nm = q.face + " · " + chipsText(q), ns = 58;
    x.font = "700 " + ns + "px " + FD;
    while (x.measureText(nm).width > W - 2 * MG && ns > 30) { ns -= 2; x.font = "700 " + ns + "px " + FD; }
    x.fillText(nm, W / 2, nameY);

    // how far off you were
    var vy = nameY + 125;
    var head = scoreText(y), hs = 108;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head).width > W - 2 * MG && hs > 60) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head, W / 2, vy);

    x.font = "800 70px " + FD;
    x.fillText("Can you beat that?", W / 2, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + Fn;
      while (x.measureText(line).width > W - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + Fn; }
      x.fillText(line, W / 2, 1270);
    }
    fits = fits && ns > 30 && vy <= 1204 - 70;
    layout = { fits: fits, bottom: vy, limit: 1204 - 70, titleLines: tq.lines.length, sizes: [tq.size, ns, hs],
               pic: drawn, verdict: head, name: nm, realShown: false, guessShown: false };
    return c;
  }
  window.OutOf24Card = function () { return layout; };     // read by r/site-workshop/checks/t_24.py
  function prepareCard(y) {
    function make() {
      try {
        drawCard(y).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 92px "Bricolage Grotesque"'),
        document.fonts.load('700 58px "Bricolage Grotesque"'),
        document.fonts.load('600 40px "Figtree"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var y = scoreOf(v);
    TO.count("out-of-24/share");
    TO.share({ blob: cardBlob, filename: "out-of-24-day-" + day + ".png", text: shareText(y) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "out-of-24-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var y = scoreOf(v);
    TO.copyText(shareText(y)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(y);
    });
  });

  /* ---------- a new day while the page is open ---------- */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (!practice && day === today && Math.max(1, TO.dayNumber(DATA.start)) !== today && !window.location.search) {
      window.location.reload();
    }
  });

  /* a small way in for the browser checks: play a day, and read what the page thinks */
  window.OutOf24 = {
    now: function () {
      var y = scoreOf(v);
      return { day: day, id: q.id, v: v, lo: q.lo, hi: q.hi, fig: q.fig, phase: phase, score: y, text: scoreText(y),
               moved: moved, pin: pin, pic: !!picData, flag: q.flag || null, drawing: !!drawing };
    },
    set: function (m) { if (phase !== "play") return false; setV(m); return true; },
    show: show
  };
})();
