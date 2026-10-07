/* Who Gets What: one real price a day. The bar under it is the whole price; drag the lines between the slices to
   say who is paid what. Then the real split, from a body that measures it, slides in underneath. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "who-gets-what";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  /* The share picture shows your bar and how much you misplaced, and NOT the real split: a friend who gets the
     picture must still be able to play the same day. Section 7 of the plan sketched the real bar in the picture
     too; that would give the answer away, so it is off, and one word here turns it on again. */
  var SPOIL = false;

  var panel = $("panel"), bar = $("bar"), realbar = $("realbar"), keys = $("keys");
  var actions = $("guess-actions"), btnShow = $("btn-show"), hint = $("hint");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("question").textContent = "Today's price could not be loaded. Please try again in a moment.";
    panel.hidden = true; actions.hidden = true; hint.hidden = true;
    return;
  }

  /* ---------- the little pictures, one per kind of receiver ---------- */
  var ICON = {
    barrel: 'M7 5h10v14H7z M7 9h10 M7 15h10 M9 5v14 M15 5v14',
    flask:  'M9 3h6 M10 3v6l-4.6 8A1.4 1.4 0 0 0 6.6 19h10.8a1.4 1.4 0 0 0 1.2-2L14 9V3 M8.2 14h7.6',
    truck:  'M2 7h11v9H2z M13 10h4l3 3v3h-7 M5.5 19a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z M16.5 19a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z',
    tax:    'M3 20h18 M5 20V9 M9.5 20V9 M14.5 20V9 M19 20V9 M2.5 9 12 3.5 21.5 9Z',
    vat:    'M6 2.5h12v19l-3-2-3 2-3-2-3 2Z M9.5 8.5a1 1 0 1 0 0-.1Z M14.5 15.5a1 1 0 1 0 0-.1Z M15 8 9 16',
    shop:   'M3 9h18v11H3z M3 9 5 4h14l2 5 M8 20v-6h4v6 M3 9h18',
    plug:   'M9 2v6 M15 2v6 M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6Z M12 17v5',
    wires:  'M12 2v20 M6 22 12 6l6 16 M8 14h8 M9.4 10h5.2',
    leaf:   'M4 20C4 11 10 5 20 4c1 10-5 16-14 16Z M4 20C8 16 12 13 18 9',
    supplier: 'M5 3h14v18H5z M8.5 8h7 M8.5 12h7 M8.5 16h4',
    farm:   'M12 21V7 M12 7c0-2.1 1.4-3.5 3.5-3.5 0 2.1-1.4 3.5-3.5 3.5Z M12 7c0-2.1-1.4-3.5-3.5-3.5 0 2.1 1.4 3.5 3.5 3.5Z M12 12.5c0-2.1 1.4-3.5 3.5-3.5 0 2.1-1.4 3.5-3.5 3.5Z M12 12.5c0-2.1-1.4-3.5-3.5-3.5 0 2.1 1.4 3.5 3.5 3.5Z M4.5 21h15',
    factory: 'M3 21V10l5 3V10l5 3V7l8 5v9Z M3 21h18 M7.5 17h2 M13 17h2 M18 17h1.5',
    ship:   'M2.8 13.5h18.4l-2.3 5.6a2 2 0 0 1-1.85 1.25H6.95a2 2 0 0 1-1.85-1.25Z M6.5 13.5v-4h5v4 M11.5 13.5v-6h4v6 M8 6.5h3',
    coin:   'M12 7.5a7 3 0 1 0 0-.1Z M5 7.5v4a7 3 0 0 0 14 0v-4 M5 11.5v4a7 3 0 0 0 14 0v-4',
    cloth:  'M8.5 3 5 5.5 3 11l3 1.2V21h12v-8.8L21 11l-2-5.5L15.5 3 M8.5 3a3.5 3.5 0 0 0 7 0',
    brand:  'M20.5 12.5 12.5 20.5a2 2 0 0 1-2.8 0L3 13.8V4h9.8l7.7 7.7a1 1 0 0 1 0 .8Z M7.5 8.5a1 1 0 1 0 0-.1Z',
    chip:   'M7 7h10v10H7z M9.5 2.5v4 M14.5 2.5v4 M9.5 17.5v4 M14.5 17.5v4 M2.5 9.5h4 M2.5 14.5h4 M17.5 9.5h4 M17.5 14.5h4',
    worker: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7'
  };
  function icon(k, cls) {
    var d = ICON[k] || ICON.coin;
    return '<svg class="' + (cls || "ic") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      d.split(" M").map(function (p, i) { return '<path d="' + (i ? "M" + p : p) + '"/>'; }).join("") + '</svg>';
  }

  /* ---------- which day, which price, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,7}$/.test(v)) ? parseInt(v, 10) : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }

  var day = today, practice = false, friend = null;
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = int(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay === today - 1) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay >= today - 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cG !== null) friend = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }

  var MIN = 20;              // a slice is never thinner than two points, so every line stays grabbable
  var SPOT = 15;             // within a point and a half of the real split: spot on
  function valid(r) {
    return !!r && Array.isArray(r.g) && r.g.length >= 3 && r.g.length <= 4 &&
      r.g.every(function (v) { return num(v) && v >= 0 && v <= 1000; }) &&
      Math.abs(r.g.reduce(function (a, b) { return a + b; }, 0) - 1000) <= 1 &&
      num(r.y) && r.y >= 0 && typeof r.t === "string";
  }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier)) q = byId[earlier.id];
  if (!valid(earlier)) earlier = null;
  if (earlier && earlier.g.length !== q.slices.length) earlier = null;

  var N = q.slices.length;
  var REAL = (function () {                       // the real shares, scaled so that they fill the bar exactly
    var raw = q.slices.map(function (s) { return s.p; });
    var sum = raw.reduce(function (a, b) { return a + b; }, 0);
    return raw.map(function (v) { return v / sum * 1000; });
  })();
  var guess = (function () {
    var out = [], left = 1000;
    for (var i = 0; i < N; i++) {
      var v = (i === N - 1) ? left : Math.round(1000 / N);
      out.push(v); left -= v;
    }
    return out;
  })();
  var phase = "play", cardBlob = null, cardUrl = "", layout = null;

  /* ---------- money ---------- */
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function money(v) {
    var s = Math.abs(v).toFixed(q.dec);
    var p = s.split(".");
    s = commas(p[0]) + (p[1] ? "." + p[1] : "");
    return q.cur === "c" ? s + "c" : q.cur + s;
  }
  function ofPrice(tenths) { return q.price * tenths / 1000; }       // tenths of a point of the price, as money
  function pct(tenths) { return (Math.round(tenths / 10 * 10) / 10).toFixed(1).replace(/\.0$/, "") + "%"; }
  function missOf(g) {
    var m = 0;
    for (var i = 0; i < N; i++) m += Math.abs(g[i] - REAL[i]);
    return Math.round(m / 2);
  }
  function missText(y) { return y <= SPOT ? "Spot on" : "Off by " + money(ofPrice(y)); }

  /* ---------- the screen ---------- */
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Who Gets What, day " + day + " | Logicers";
  $("what").textContent = q.what;
  $("where").textContent = q.where;
  $("when").textContent = q.when;
  $("price").textContent = money(q.price);
  if (q.unit) { $("unit").textContent = q.unit; $("unit").hidden = false; }
  if (q.what.length > 26) $("what").style.fontSize = "1.1rem";

  var slices = [], divs = [];
  function build() {
    bar.innerHTML = "";
    slices = []; divs = [];
    q.slices.forEach(function (s, i) {
      var d = document.createElement("div");
      d.className = "w-slice s" + i;
      d.innerHTML = icon(s.k) + '<span class="m"></span>';
      bar.appendChild(d);
      slices.push(d);
    });
    for (var i = 0; i < N - 1; i++) {
      var h = document.createElement("div");
      h.className = "w-div";
      h.setAttribute("role", "slider");
      h.setAttribute("tabindex", "0");
      h.setAttribute("aria-valuemin", "0");
      h.setAttribute("aria-valuemax", "100");
      h.dataset.i = String(i);
      h.innerHTML = "<i></i>";
      bar.appendChild(h);
      divs.push(h);
    }
    keys.innerHTML = "";
    q.slices.forEach(function (s) {
      var li = document.createElement("li");
      li.innerHTML = icon(s.k) + '<span class="n"></span><span class="v"></span>';
      li.querySelector(".n").textContent = s.n;
      keys.appendChild(li);
    });
  }

  function cum(g) {
    var out = [0], t = 0;
    for (var i = 0; i < g.length; i++) { t += g[i]; out.push(t); }
    return out;
  }
  function place(g, bars, animate) {
    var c = cum(g), w = bars.clientWidth || 1;
    for (var i = 0; i < N; i++) {
      var el = bars.children[i];
      if (!el) continue;
      if (animate) el.classList.add("move"); else el.classList.remove("move");
      el.style.left = (c[i] / 10) + "%";
      el.style.width = (g[i] / 10) + "%";
      var px = w * g[i] / 1000;
      el.classList.toggle("thin", px < 52);
      el.classList.toggle("hair", px < 26);
      var m = el.querySelector(".m");
      if (m) m.textContent = money(ofPrice(g[i]));
    }
  }
  function paint() {
    place(guess, bar, false);
    var c = cum(guess);
    divs.forEach(function (h, i) {
      h.style.left = (c[i + 1] / 10) + "%";
      h.setAttribute("aria-valuenow", String(Math.round(c[i + 1] / 10)));
      h.setAttribute("aria-label", "The line between " + q.slices[i].n + " and " + q.slices[i + 1].n);
      h.setAttribute("aria-valuetext", q.slices[i].n + " " + money(ofPrice(guess[i])) + ", " +
        q.slices[i + 1].n + " " + money(ofPrice(guess[i + 1])));
    });
    fillKeys();
  }
  function fillKeys() {
    for (var i = 0; i < N; i++) {
      var v = keys.children[i].querySelector(".v");
      if (phase === "play") { v.textContent = money(ofPrice(guess[i])); continue; }
      var real = Math.round(REAL[i]), gap = guess[i] - real, off = Math.abs(gap);
      v.innerHTML = "";
      var a = document.createElement("span"); a.className = "yours"; a.textContent = money(ofPrice(guess[i]));
      var b = document.createElement("span"); b.className = "real"; b.textContent = money(ofPrice(real));
      var c = document.createElement("span");
      c.className = off <= SPOT ? "spot" : "off";
      c.textContent = off <= SPOT ? "✓" : (gap > 0 ? "+" : "−") + money(ofPrice(off));
      v.appendChild(a); v.appendChild(b); v.appendChild(c);
    }
  }

  /* ---------- dragging a line ---------- */
  function setBoundary(i, tenths) {
    var c = cum(guess);
    var lo = c[i] + MIN, hi = c[i + 2] - MIN;
    var at = Math.max(lo, Math.min(hi, Math.round(tenths)));
    if (at === c[i + 1]) return;
    guess[i] = at - c[i];
    guess[i + 1] = c[i + 2] - at;
    paint();
    var step = 50;
    if (Math.floor(c[i + 1] / step) !== Math.floor(at / step) && window.navigator.vibrate) {
      try { window.navigator.vibrate(4); } catch (e) { /* ignore */ }
    }
  }
  var dragging = null;
  function fromPointer(e) {
    var r = bar.getBoundingClientRect();
    return (e.clientX - r.left) / Math.max(1, r.width) * 1000;
  }
  /* Whichever line is nearest the finger is the one you grab, within a thumb's width. Picking the line by what
     was under the finger failed once two lines sat together: the later one covered the earlier one, and a line
     dragged all the way could never be dragged back. */
  function nearest(e) {
    var r = bar.getBoundingClientRect(), c = cum(guess), best = -1, gap = 1e9;
    var reach = Math.max(28, Math.min(52, r.width * 0.14));          // a thumb, in pixels
    for (var i = 0; i < N - 1; i++) {
      var px = r.left + r.width * c[i + 1] / 1000, d = Math.abs(e.clientX - px);
      if (d < gap) { gap = d; best = i; }
    }
    return gap <= reach ? best : -1;
  }
  bar.addEventListener("pointerdown", function (e) {
    if (phase !== "play" || e.button > 0) return;
    var i = nearest(e);
    if (i < 0) return;
    dragging = { id: e.pointerId, i: i, el: divs[i] };
    divs[i].classList.add("on");
    try { bar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    e.preventDefault();
  });
  bar.addEventListener("pointermove", function (e) {
    if (!dragging || e.pointerId !== dragging.id) return;
    setBoundary(dragging.i, fromPointer(e));
    e.preventDefault();
  });
  function stop(e) {
    if (!dragging || (e && e.pointerId !== dragging.id)) return;
    dragging.el.classList.remove("on");
    dragging = null;
  }
  bar.addEventListener("pointerup", stop);
  bar.addEventListener("pointercancel", stop);

  /* keys: arrows move a line by one point, with Shift by five, Home and End to its limits, Enter shows the split */
  bar.addEventListener("keydown", function (e) {
    var h = e.target.closest ? e.target.closest(".w-div") : null;
    if (!h || phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return;
    var i = +h.dataset.i, c = cum(guess), step = e.shiftKey ? 50 : 10, at = c[i + 1];
    switch (e.key) {
      case "ArrowLeft": case "ArrowDown": setBoundary(i, at - step); break;
      case "ArrowRight": case "ArrowUp": setBoundary(i, at + step); break;
      case "PageDown": setBoundary(i, at - 100); break;
      case "PageUp": setBoundary(i, at + 100); break;
      case "Home": setBoundary(i, 0); break;
      case "End": setBoundary(i, 1000); break;
      case "Enter": case " ": show(); break;
      default: return;
    }
    e.preventDefault();
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend <= SPOT ? "A friend was spot on. Can you match that?"
      : "A friend put " + money(ofPrice(friend)) + " in the wrong place. Can you do better?") +
      (practice ? " It is an earlier price, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  build();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("who-gets-what/challenge-opened");

  if (earlier) { guess = earlier.g.slice(); showResult(false); } else { paint(); fit(); }
  window.addEventListener("resize", function () { paint(); if (phase === "done") place(REAL.map(Math.round), realbar, false); fit(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit, function () { /* ignore */ });

  /* ---------- nothing may need scrolling while you play ---------- */
  function fit() {
    var app = document.documentElement;
    app.classList.remove("fit1", "fit2", "fit3");
    for (var i = 1; i <= 3 && document.body.scrollHeight > window.innerHeight + 1; i++) {
      app.classList.remove("fit1", "fit2", "fit3");
      app.classList.add("fit" + i);
    }
  }

  /* ---------- showing the split ---------- */
  function show() {
    if (phase !== "play") return;
    var g = guess.slice(), y = missOf(g), t = missText(y);
    TO.update(GAME, function (s) {
      var slot = practice ? s.practice : s.results;
      if (!valid(slot[day])) slot[day] = { g: g, y: y, t: t, id: q.id };
    });
    TO.count(practice ? "who-gets-what/practice-played" : "who-gets-what/played/day-" + day);
    showResult(true);
  }
  btnShow.addEventListener("click", show);

  function showResult(animate) {
    var y = missOf(guess);
    var hadFocus = document.activeElement === btnShow || (document.activeElement && document.activeElement.classList &&
      document.activeElement.classList.contains("w-div"));
    phase = "done";
    actions.hidden = true;
    hint.hidden = true;
    bar.classList.add("done");
    panel.classList.add("revealed");
    $("lab-you").hidden = false;
    var motion = animate && !TO.reducedMotion();

    realbar.innerHTML = "";
    q.slices.forEach(function (s, i) {
      var d = document.createElement("div");
      d.className = "w-slice s" + i;
      d.innerHTML = icon(s.k) + '<span class="m"></span>';
      realbar.appendChild(d);
    });
    var rr = REAL.map(function (v) { return Math.round(v); });
    $("row-real").hidden = false;
    if (!motion) $("row-real").style.animation = "none";
    place(rr, realbar, false);
    fillKeys();

    var v = $("offby");
    v.innerHTML = y <= SPOT
      ? "<b>Spot on.</b> You put the money almost exactly where it goes."
      : "You put <b>" + money(ofPrice(y)) + "</b> of " + money(q.price) + " in the wrong place.";
    v.classList.toggle("hit", y <= SPOT);
    $("verdict").hidden = false;
    fillAfter(y);
    renderChip();
    buildPractice();
    fit();
    if (hadFocus) { v.setAttribute("tabindex", "-1"); try { v.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
  }

  function fillAfter(y) {
    var f = $("friend");
    if (friend !== null) {
      var said = friend <= SPOT ? "Your friend was spot on" : "Your friend put " + money(ofPrice(friend)) + " in the wrong place";
      f.textContent = y < friend ? said + ". You did better." : y === friend ? said + ", like you. A tie." : said + ". Closer than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.fact;
    if (q.note) { $("note").textContent = q.note; $("note").hidden = false; }
    var list = $("sources");
    list.innerHTML = "";
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("The split: "));
    q.src.forEach(function (s, i) {
      if (i) li.appendChild(document.createTextNode(" · "));
      var a = document.createElement("a");
      a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name;
      li.appendChild(a);
    });
    list.appendChild(li);
    if (!practice) { fillStamp($("earned-stamp"), q); $("earned").hidden = false; }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s price</a>';
    else next.textContent = "A new price arrives at midnight.";
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
    var album = $("album"), off = 0;
    album.innerHTML = "";
    days.forEach(function (n) {
      off += res[n].y;
      var st = document.createElement("div");
      st.className = "stamp wg";
      fillStamp(st, playedPuzzle(res[n], n));
      album.appendChild(st);
    });
    $("st-avg").textContent = (days.length ? Math.round(off / days.length / 10) : 0) + "%";
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = icon(p.slices[0].k, "wgi");
    function add(cls, text) { var s = document.createElement("span"); s.className = cls; s.textContent = text; el.appendChild(s); }
    var cur = p.cur, dec = p.dec;
    var s = Math.abs(p.price).toFixed(dec), parts = s.split(".");
    s = commas(parts[0]) + (parts[1] ? "." + parts[1] : "");
    add("p", cur === "c" ? s + "c" : cur + s);
    add("what", p.what.replace(/^An? /, ""));
    add("of", p.where + " · " + p.when);
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
      var t = document.createElement("span"); t.className = "q"; t.textContent = p.what + ", " + p.where + " " + p.when;
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? r.t : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share ---------- */
  function shareUrl(y) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + y;
  }
  function shareText(y) {
    return "Who Gets What, day " + day + ": " + q.what.toLowerCase() + " in " + q.where + ", " + q.when +
      ", costs " + money(q.price) + ". Who gets what? " +
      (y <= SPOT ? "I was spot on." : "I put " + money(ofPrice(y)) + " in the wrong place.") +
      " Can you do better? " + shareUrl(y);
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
    var W = 1080, H = 1350, MG = 76, GREEN = "#005E16";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + F;
    var fits = true;
    x.fillStyle = GREEN; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 0, 40, W / 2, 0, 1100);
    glow.addColorStop(0, "rgba(220, 255, 226, .17)"); glow.addColorStop(1, "rgba(0, 0, 0, .12)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.setLineDash([16, 12]); x.lineWidth = 3; x.strokeStyle = "rgba(220, 242, 226, .34)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke(); x.setLineDash([]);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 48px " + FD;
    x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F;
    x.fillText("Who Gets What, day " + day, W - MG, 118);

    x.textAlign = "left"; x.font = "800 104px " + FD;
    x.fillText("Who gets what?", MG - 4, 268);

    // the thing and its price
    var tw = wrap(x, q.what, "700", 56, FD, W - 2 * MG, 2, 38);
    fits = fits && tw.fits;
    var ty = 372;
    x.fillStyle = "#DCF2E2";
    tw.lines.forEach(function (l, i) { x.font = "700 " + tw.size + "px " + FD; x.fillText(l, MG, ty + i * tw.size * 1.14); });
    var sub = ty + (tw.lines.length - 1) * tw.size * 1.14;
    x.font = "600 36px " + F; x.fillStyle = "rgba(255,255,255,.78)";
    x.fillText(q.where + " · " + q.when, MG, sub + 52);
    x.textAlign = "right"; x.font = "800 96px " + FD; x.fillStyle = "#fff";
    var pr = money(q.price) + (q.unit ? "" : ""), ps = 96;
    while (x.measureText(pr).width > 470 && ps > 48) { ps -= 2; x.font = "800 " + ps + "px " + FD; }
    x.fillText(pr, W - MG, sub + 40);

    // the bars
    var barY = sub + 118, barW = W - 2 * MG, barH = SPOIL ? 128 : 192;
    function drawBar(label, shares, labelled) {
      x.textAlign = "left"; x.font = "800 30px " + F; x.fillStyle = "rgba(255,255,255,.8)";
      x.fillText(label.toUpperCase(), MG, barY - 16);
      var at = MG;
      var shade = ["rgba(255,255,255,1)", "rgba(255,255,255,.76)", "rgba(255,255,255,.5)", "rgba(255,255,255,.3)"];
      x.save();
      roundRect(x, MG, barY, barW, barH, 18); x.clip();
      for (var i = 0; i < shares.length; i++) {
        var w = barW * shares[i] / 1000;
        x.fillStyle = shade[i];
        x.fillRect(at, barY, w, barH);
        if (labelled && w > 120) {
          x.fillStyle = "#083D13";
          x.textAlign = "center"; x.font = "800 34px " + F;
          x.fillText(q.slices[i].n, at + w / 2, barY + barH / 2 - 4);
          x.font = "700 31px " + F;
          x.fillText(money(ofPrice(shares[i])), at + w / 2, barY + barH / 2 + 34);
        }
        at += w;
      }
      x.restore();
      x.strokeStyle = "rgba(0,0,0,.12)"; x.lineWidth = 2;
      roundRect(x, MG, barY, barW, barH, 18); x.stroke();
      barY += barH + 64;
    }
    drawBar("You", guess, true);
    if (SPOIL) drawBar("Really", REAL.map(Math.round), true);

    // how much you misplaced, held low on the card so that one bar does not leave a hole in the middle
    var missY = Math.max(barY + 36, 912);
    x.textAlign = "left"; x.fillStyle = "#fff"; x.font = "800 86px " + FD;
    var head = y <= SPOT ? "Spot on" : "Off by " + money(ofPrice(y));
    var hs = 86; while (x.measureText(head).width > W - 2 * MG && hs > 50) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head, MG - 3, missY);
    var mb = missY + 34, frac = Math.min(1, y / 500);
    x.fillStyle = "rgba(255,255,255,.22)"; roundRect(x, MG, mb, W - 2 * MG, 22, 11); x.fill();
    x.fillStyle = TO.MISS; roundRect(x, MG, mb, Math.max(22, (W - 2 * MG) * frac), 22, 11); x.fill();

    x.fillStyle = "#fff"; x.font = "800 72px " + FD;
    x.fillText("Can you split it better?", MG - 3, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1270);
    }
    layout = { fits: fits, bottom: mb + 22, limit: 1204 - 72, thingLines: tw.lines.length,
               sizes: [tw.size, ps, hs], spoil: SPOIL, bars: SPOIL ? 2 : 1 };
    return c;
  }
  window.WhoGetsWhatCard = function () { return layout; };     // read by r/site-workshop/checks/t_gets.py
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
        document.fonts.load('800 104px "Bricolage Grotesque"'),
        document.fonts.load('700 56px "Bricolage Grotesque"'),
        document.fonts.load('600 40px "Figtree"'),
        document.fonts.load('800 30px "Figtree"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var y = missOf(guess);
    TO.count("who-gets-what/share");
    TO.share({ blob: cardBlob, filename: "who-gets-what-day-" + day + ".png", text: shareText(y) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "who-gets-what-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var y = missOf(guess);
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
  window.WhoGetsWhat = {
    now: function () { return { day: day, id: q.id, guess: guess.slice(), real: REAL.map(Math.round),
                                miss: missOf(guess), phase: phase, text: missText(missOf(guess)) }; },
    set: function (g) { if (phase !== "play") return false; guess = g.slice(); paint(); return true; },
    show: show
  };
})();
