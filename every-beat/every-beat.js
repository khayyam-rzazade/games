/* Every Beat: one real animal a day. Set how fast you think its heart beats; then the real heart beats beside
   yours, with the figure and where it comes from. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "every-beat";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), stage = $("stage"), ladder = $("ladder"), thumb = $("thumb");
  var actions = $("guess-actions"), btnShow = $("btn-show"), hint = $("hint"), feelBtn = $("feel");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("question").textContent = "Today's heart could not be loaded. Please try again in a moment.";
    panel.hidden = true; actions.hidden = true; hint.hidden = true;
    return;
  }

  var MINR = 1, MAXR = 2000;    // the scale runs from 1 to 2,000 beats a minute, on a log ruler
  var TOL = 1.15;               // a real heart moves about this much from minute to minute: spot on inside it
  var FAST = 170;               // from 171 a minute nothing pulses, so never more than three pulses in any second
                                // (WCAG 2.3.1), even with a late frame; the line under the heart shows the pace
  var WINDOW = 10;              // seconds of each heart drawn as a line
  var DRAG = Math.log(MAXR) / 300;   // a 300-pixel drag crosses the whole scale

  /* ---------- the small pictures for what the heart is doing ---------- */
  var ICON = {
    rest:        'M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3 M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 M6 16v3 M18 16v3',
    awake:       'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    asleep:      'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z',
    diving:      'M12 3v10 M8 9l4 4 4-4 M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0',
    surface:     'M12 14V4 M8 8l4-4 4 4 M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0',
    fastest:     'M13 2 4 14h7l-1 8 9-12h-7z',
    hibernating: 'M12 2v20 M3.3 7l17.4 10 M20.7 7 3.3 17 M9.5 4.5 12 7l2.5-2.5 M9.5 19.5 12 17l2.5 2.5',
    summer:      'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M12 2v2.5 M12 19.5V22 M2 12h2.5 M19.5 12H22 M4.9 4.9l1.8 1.8 M17.3 17.3l1.8 1.8 M4.9 19.1l1.8-1.8 M17.3 6.7l1.8-1.8',
    torpor:      'M15.5 13A6.5 6.5 0 1 1 8 4.5a5 5 0 0 0 7.5 8.5Z M19 14v7 M16 15.75l6 3.5 M22 15.75l-6 3.5',
    flying:      'M2 8c4 0 7 3 10 7 3-4 6-7 10-7 M6 6.5C7.5 5 9.5 4 12 4s4.5 1 6 2.5',
    temp:        'M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z M12 9v7'
  };
  function icon(k) {
    var d = ICON[k] || ICON.rest;
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      d.split(" M").map(function (p, i) { return '<path d="' + (i ? "M" + p : p) + '"/>'; }).join("") + '</svg>';
  }
  var HEART = 'M12 21.2s-7.7-4.7-9.9-9.4C.5 8.4 2.4 4 6.6 4 9 4 10.7 5.3 12 7.1 13.3 5.3 15 4 17.4 4c4.2 0 6.1 4.4 4.5 7.8C19.7 16.5 12 21.2 12 21.2z';

  /* ---------- which day, which heart, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,7}$/.test(v)) ? parseInt(v, 10) : null; }
  function signed(v) { return (v !== null && /^-?\d{1,6}$/.test(v)) ? parseInt(v, 10) : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }

  var day = today, practice = false, friend = null;
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = signed(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay === today - 1) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay >= today - 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cG !== null && (cG === 0 || Math.abs(cG) >= 11)) friend = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }

  function valid(r) {
    return !!r && num(r.g) && r.g >= MINR && r.g <= MAXR && num(r.y) && Math.round(r.y) === r.y &&
      (r.y === 0 || Math.abs(r.y) >= 11) && typeof r.t === "string";
  }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier)) q = byId[earlier.id];
  if (!valid(earlier)) earlier = null;

  var REAL = Math.sqrt(q.lo * q.hi);        // the real heart beats at the middle of the band
  var bpm = 60;                             // where you start: about a resting person
  var phase = "play", cardBlob = null, cardUrl = "", layout = null, picData = null;
  var reduced = TO.reducedMotion();

  /* ---------- numbers ---------- */
  function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function fmt(v) {
    if (v < 10) return String(Math.round(v * 10) / 10);
    return commas(Math.round(v));
  }
  function band(p) { return p.lo === p.hi ? fmt(p.lo) : fmt(p.lo) + "–" + fmt(p.hi); }
  function scoreOf(g) {                     // 0 is spot on; otherwise ten times "how many times", + too fast, − too slow
    if (g < q.lo / TOL) return -Math.round(q.lo / g * 10);
    if (g > q.hi * TOL) return Math.round(g / q.hi * 10);
    return 0;
  }
  function times(y) {
    var f = Math.abs(y) / 10;
    return (f < 10 ? String(Math.round(f * 10) / 10) : commas(Math.round(f))) + "×";
  }
  function scoreText(y) { return y === 0 ? "Spot on" : times(y) + (y > 0 ? " too fast" : " too slow"); }
  function round1(v) { return Math.round(v * 10) / 10; }
  function clamp(v) { return Math.max(MINR, Math.min(MAXR, v)); }
  function posOf(v) { return Math.log(v) / Math.log(MAXR); }

  /* ---------- the screen ---------- */
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Every Beat, day " + day + " | Logicers";
  $("face").textContent = q.face;
  $("state").innerHTML = icon(q.state);
  $("state").appendChild(document.createTextNode(q.label));
  if (q.temp) {
    $("temp").innerHTML = icon("temp");
    $("temp").appendChild(document.createTextNode("water " + q.temp + " °C"));
    $("temp").hidden = false;
  }

  /* the silhouette: the same files as Long Lost Cousin's, copied into pics/ by build.py */
  window.TurnsOutPic = function (name, pic) {
    if (name !== q.pic || !pic || !pic.d) return;
    picData = pic;
    var svg = $("pic");
    svg.setAttribute("viewBox", "0 0 " + pic.w + " " + pic.h);
    svg.innerHTML = '<path d="' + pic.d + '"/>';
  };
  (function () {
    var s = document.createElement("script");
    s.src = "pics/" + q.pic + ".js";
    s.async = true;
    document.head.appendChild(s);
  })();

  /* ---------- the hearts ---------- */
  var hearts = {
    you:  { svg: $("heart-you"),  canvas: $("trace-you"),  rate: function () { return bpm; },  last: 0, fired: 0, r: 0, beats: 0, times: [], pulses: [], on: true },
    real: { svg: $("heart-real"), canvas: $("trace-real"), rate: function () { return REAL; }, last: 0, fired: 0, r: 0, beats: 0, times: [], pulses: [], on: false }
  };
  function voiced() { return phase === "play" ? "you" : "real"; }

  /* sound and touch, off until the player turns them on */
  var feel = false, actx = null;
  function thump(iv) {
    if (!actx) return;
    try {
      var t = actx.currentTime, dur = Math.max(0.012, Math.min(0.11, iv / 1000 * 0.45));
      var o = actx.createOscillator(), g = actx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(72, t);
      o.frequency.exponentialRampToValueAtTime(44, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.55, t + Math.min(0.012, dur / 3));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* ignore */ }
  }
  feelBtn.addEventListener("click", function () {
    feel = !feel;
    feelBtn.setAttribute("aria-pressed", feel ? "true" : "false");
    if (feel && !actx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { actx = new AC(); } catch (e) { actx = null; } }
    }
    if (actx && actx.state === "suspended") { try { actx.resume(); } catch (e) { /* ignore */ } }
  });

  function beat(k, h, now, iv) {
    h.beats++;
    var r = h.rate();
    if (modeOf(h) === "pulse") {                     // the moving line keeps only the beats it can draw
      h.times.push(now);
      if (h.times.length > 200) h.times.splice(0, h.times.length - 200);
    }
    // a pulse only if the last three began more than a second ago: never four in any one second
    if (!reduced && r <= FAST && (h.pulses.length < 3 || now - h.pulses[h.pulses.length - 3] > 1000)) {
      h.pulses.push(now);
      if (h.pulses.length > 3) h.pulses.shift();
      h.svg.classList.remove("pulse");
      void h.svg.getBoundingClientRect();
      h.svg.style.setProperty("--pulse", Math.min(0.32, iv / 1000 * 0.55).toFixed(3) + "s");
      h.svg.classList.add("pulse");
    }
    if (feel && k === voiced()) {
      thump(iv);
      if (iv >= 200 && window.navigator.vibrate) { try { window.navigator.vibrate(12); } catch (e) { /* ignore */ } }
    }
  }
  function modeOf(h) { return (reduced || h.rate() > FAST) ? "still" : "pulse"; }

  var raf = 0;
  function tick(now) {
    ["you", "real"].forEach(function (k) {
      var h = hearts[k];
      if (!h.on) return;
      var r = h.rate(), iv = 60000 / r;
      if (h.r !== r) { h.r = r; if (h.fired) h.last = h.fired; }   // a new pace counts from the last real beat, never sooner
      if (!h.last) h.last = now - iv + 350;                    // the first beat comes soon after the start
      if (now >= h.last + iv) {
        beat(k, h, now, iv);
        h.fired = now;
        h.last = (now - (h.last + iv) > iv) ? now : h.last + iv;
      }
      var m = modeOf(h);
      if (h.mode !== m) { h.mode = m; h.times = []; }   // a fresh line when the heart changes between moving and still
      h.svg.classList.toggle("hum", m === "still");
      if (m === "still") h.svg.classList.remove("pulse");
    });
    draw(now);
    raf = window.requestAnimationFrame(tick);
  }

  /* ten seconds of a heart as a line, one spike per beat. Up to 170 a minute the line moves with the
     beats; faster than that, or with reduced motion, it holds still and shows the pace by how close the spikes are. */
  function inkOf(el) { return window.getComputedStyle(el).color || "#C40045"; }
  function spike(x, ctx, base, h, w) {
    ctx.moveTo(x - w, base);
    ctx.lineTo(x - w * 0.35, base);
    ctx.lineTo(x, base - h * 0.78);
    ctx.lineTo(x + w * 0.4, base + h * 0.3);
    ctx.lineTo(x + w * 0.8, base);
    ctx.lineTo(x + w * 1.6, base);
  }
  function drawOne(h, now) {
    var c = h.canvas;
    if (!c || c.offsetParent === null) return;
    var dpr = window.devicePixelRatio || 1;
    var W = Math.max(10, Math.round(c.clientWidth * dpr)), H = Math.max(10, Math.round(c.clientHeight * dpr));
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    var ink = inkOf(c), base = H * 0.62, amp = H * 0.62, r = h.rate();
    var gap = W * (60 / r) / WINDOW;                 // pixels between two beats
    var w = Math.max(1.5 * dpr, Math.min(7 * dpr, gap * 0.28));
    ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineWidth = Math.max(1, 1.6 * dpr); ctx.lineJoin = "round";
    ctx.globalAlpha = 0.35;
    ctx.beginPath(); ctx.moveTo(0, base); ctx.lineTo(W, base); ctx.stroke();
    ctx.globalAlpha = 1;
    if (modeOf(h) === "still") {
      if (gap < 2.5 * dpr) {                         // too many beats to draw one by one: a solid band, never stripes
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, base - amp * 0.78, W, amp * 1.08);
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(0, base - amp * 0.78); ctx.lineTo(W, base - amp * 0.78);
        ctx.moveTo(0, base + amp * 0.3); ctx.lineTo(W, base + amp * 0.3);
        ctx.stroke();
        return;
      }
      ctx.beginPath();
      for (var x = W - w * 1.6; x > -w * 2; x -= gap) spike(x, ctx, base, amp, w);
      ctx.stroke();
      return;
    }
    var t0 = now - WINDOW * 1000;
    ctx.beginPath();
    for (var i = h.times.length - 1; i >= 0; i--) {
      var t = h.times[i];
      if (t < t0 - 200) break;
      spike(W * (t - t0) / (WINDOW * 1000), ctx, base, amp, w);
    }
    ctx.stroke();
  }
  function draw(now) {
    drawOne(hearts.you, now);
    if (hearts.real.on) drawOne(hearts.real, now);
  }

  /* ---------- setting the beat ---------- */
  /* The heart starts at 60, about a person at rest, so that you have something to compare with. That start is not
     a guess: a person, a cow or a trout would be spot on without a move. So Show asks for one move first. */
  var moved = false, nudgeTimer = 0;
  function setRate(v) {
    if (phase !== "play") return;
    bpm = clamp(v);
    moved = true;
    if (nudgeTimer) { window.clearTimeout(nudgeTimer); nudgeTimer = 0; btnShow.textContent = "Show its heart"; }
    paint();
  }
  function nudge() {
    btnShow.textContent = "First drag up or down";
    $("say").textContent = "";
    $("say").textContent = "First set the beat: drag the heart up or down, or use the arrow keys on the scale.";
    if (!reduced) { thumb.classList.remove("nudge"); void thumb.offsetWidth; thumb.classList.add("nudge"); }
    window.clearTimeout(nudgeTimer);
    nudgeTimer = window.setTimeout(function () { nudgeTimer = 0; btnShow.textContent = "Show its heart"; }, 1800);
  }
  function paint() {
    $("rate-you").textContent = fmt(bpm);
    thumb.style.setProperty("--pos", posOf(bpm).toFixed(4));
    ladder.setAttribute("aria-valuenow", String(round1(bpm)));
    ladder.setAttribute("aria-valuetext", fmt(bpm) + " beats a minute");
  }
  function fromLadder(y) {
    var r = ladder.getBoundingClientRect(), top = r.top + 12, height = Math.max(1, r.height - 24);
    var f = 1 - (y - top) / height;
    return Math.exp(Math.max(0, Math.min(1, f)) * Math.log(MAXR));
  }
  var drag = null;
  stage.addEventListener("pointerdown", function (e) {
    if (phase !== "play" || e.button > 0) return;
    var abs = ladder.contains(e.target);
    drag = { id: e.pointerId, y: e.clientY, from: bpm, abs: abs };
    if (abs) setRate(fromLadder(e.clientY));
    stage.classList.add("on");
    try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    e.preventDefault();
  });
  stage.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.abs) setRate(fromLadder(e.clientY));
    else setRate(drag.from * Math.exp(-(e.clientY - drag.y) * DRAG));
    e.preventDefault();
  });
  function stop(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    drag = null;
    stage.classList.remove("on");
  }
  stage.addEventListener("pointerup", stop);
  stage.addEventListener("pointercancel", stop);

  /* keys on the scale: arrows by 3%, with Shift by 25%; Page keys double or halve; Home and End go to the ends */
  ladder.addEventListener("keydown", function (e) {
    if (phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return;
    var f = e.shiftKey ? 1.25 : 1.03;
    switch (e.key) {
      case "ArrowUp": case "ArrowRight": setRate(bpm * f); break;
      case "ArrowDown": case "ArrowLeft": setRate(bpm / f); break;
      case "PageUp": setRate(bpm * 2); break;
      case "PageDown": setRate(bpm / 2); break;
      case "Home": setRate(MINR); break;
      case "End": setRate(MAXR); break;
      case "Enter": case " ": show(); break;
      default: return;
    }
    e.preventDefault();
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 0 ? "A friend was spot on. Can you match that?"
      : "A friend was " + scoreText(friend).toLowerCase() + ". Can you beat that?") +
      (practice ? " It is an earlier heart, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("every-beat/challenge-opened");

  if (earlier) { bpm = clamp(earlier.g); paint(); showResult(false); } else { paint(); fit(); }
  raf = window.requestAnimationFrame(tick);
  window.addEventListener("resize", fit);
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

  /* ---------- showing the real heart ---------- */
  function show() {
    if (phase !== "play") return;
    if (!moved) { nudge(); return; }
    var g = round1(bpm), y = scoreOf(g), t = scoreText(y);
    TO.update(GAME, function (s) {
      var slot = practice ? s.practice : s.results;
      if (!valid(slot[day])) slot[day] = { g: g, y: y, t: t, id: q.id };
    });
    TO.count(practice ? "every-beat/practice-played" : "every-beat/played/day-" + day);
    showResult(true);
  }
  btnShow.addEventListener("click", show);

  function showResult(animate) {
    var g = round1(bpm), y = scoreOf(g);
    var hadFocus = document.activeElement === btnShow || document.activeElement === ladder;
    phase = "done";
    actions.hidden = true;
    hint.hidden = true;
    panel.classList.add("revealed");
    stage.classList.remove("on");
    $("lab-you").hidden = false;
    $("tlab-you").hidden = false;
    $("rate-real").textContent = band(q);         // the real figure enters the page only now
    $("real").hidden = false;
    $("trow-real").hidden = false;
    hearts.real.on = true;
    hearts.real.last = 0;
    ladder.setAttribute("tabindex", "-1");
    ladder.setAttribute("aria-hidden", "true");

    var v = $("offby");
    v.innerHTML = "";
    var b = document.createElement("b");
    b.textContent = scoreText(y);
    v.appendChild(b);
    v.appendChild(document.createTextNode(" You set " + fmt(g) + " a minute; the real heart beats " + band(q) + "."));
    v.classList.toggle("hit", y === 0);
    $("verdict").hidden = false;
    fillAfter(y);
    renderChip();
    buildPractice();
    fit();
    if (hadFocus) { v.setAttribute("tabindex", "-1"); try { v.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (animate && feel && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
  }

  function link(s) {
    var a = document.createElement("a");
    a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name;
    return a;
  }
  function fillAfter(y) {
    var f = $("friend");
    if (friend !== null) {
      var said = friend === 0 ? "Your friend was spot on" : "Your friend was " + scoreText(friend).toLowerCase();
      var a = Math.abs(y), c = Math.abs(friend);
      f.textContent = a < c ? said + ". You were closer." : a === c ? said + ", like you. A tie." : said + ". Closer than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.sentence;
    if (q.note) { $("note").textContent = q.note; $("note").hidden = false; }
    var life = $("life");
    life.innerHTML = "";
    life.appendChild(document.createTextNode((DATA.lifetime && DATA.lifetime.line ? DATA.lifetime.line : "") + " "));
    (DATA.lifetime && DATA.lifetime.src || []).forEach(function (s, i) {
      if (i) life.appendChild(document.createTextNode(" · "));
      life.appendChild(link(s));
    });
    var list = $("sources");
    list.innerHTML = "";
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("The figure: "));
    q.src.forEach(function (s, i) {
      if (i) li.appendChild(document.createTextNode(" · "));
      li.appendChild(link(s));
    });
    list.appendChild(li);
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
    if (!practice) { fillStamp($("earned-stamp"), q); $("earned").hidden = false; }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s heart</a>';
    else next.textContent = "A new heart arrives at midnight.";
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
      st.className = "stamp eb";
      fillStamp(st, playedPuzzle(res[n], n));
      album.appendChild(st);
    });
    $("st-spot").textContent = String(spot);
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = '<svg class="ebh" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + HEART + '"/></svg>';
    function add(cls, text) { var s = document.createElement("span"); s.className = cls; s.textContent = text; el.appendChild(s); }
    add("p", band(p));
    var u = document.createElement("small"); u.textContent = "/min"; el.lastChild.appendChild(u);
    add("what", p.face);
    add("of", p.label);
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
      var t = document.createElement("span"); t.className = "q"; t.textContent = p.face + ", " + p.label;
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? r.t : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: the animal and how far off you were, never the real rate ---------- */
  function shareUrl(y) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + y;
  }
  function shareText(y) {
    return "Every Beat, day " + day + ": how fast does a heart beat? " + q.face + ", " + q.label + ". " +
      (y === 0 ? "I was spot on." : "I was " + scoreText(y).toLowerCase() + ".") + " Can you beat that? " + shareUrl(y);
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
    var W = 1080, H = 1350, MG = 76, RED = "#C40045";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + F;
    var fits = true;
    x.fillStyle = RED; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 0, 40, W / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 228, 236, .18)"); glow.addColorStop(1, "rgba(0, 0, 0, .14)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.setLineDash([16, 12]); x.lineWidth = 3; x.strokeStyle = "rgba(255, 228, 236, .36)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke(); x.setLineDash([]);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 48px " + FD;
    x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F;
    x.fillText("Every Beat, day " + day, W - MG, 118);

    x.textAlign = "left";
    var tq = wrap(x, "How fast does its heart beat?", "800", 92, FD, W - 2 * MG, 2, 60);
    fits = fits && tq.fits;
    tq.lines.forEach(function (l, i) { x.font = "800 " + tq.size + "px " + FD; x.fillText(l, MG - 4, 252 + i * tq.size * 1.06); });
    var after = 252 + (tq.lines.length - 1) * tq.size * 1.06;

    // the animal, in white
    var boxT = after + 50, boxH = 330, boxW = W - 2 * MG;
    if (picData && window.Path2D) {
      try {
        var s = Math.min(boxW / picData.w, boxH / picData.h);
        var pw = picData.w * s, ph = picData.h * s;
        x.save();
        x.translate(MG + (boxW - pw) / 2, boxT + (boxH - ph) / 2);
        x.scale(s, s);
        x.fillStyle = "rgba(255, 255, 255, .96)";
        x.fill(new Path2D(picData.d));
        x.restore();
      } catch (e) { /* the picture is a bonus */ }
    }
    var nameY = boxT + boxH + 82;
    x.textAlign = "center"; x.fillStyle = "#fff";
    var nm = q.face + " · " + q.label, ns = 58;
    x.font = "700 " + ns + "px " + FD;
    while (x.measureText(nm).width > W - 2 * MG && ns > 34) { ns -= 2; x.font = "700 " + ns + "px " + FD; }
    x.fillText(nm, W / 2, nameY);

    // a line of heartbeats, for the look of it: it shows no rate
    var ly = nameY + 92;
    x.strokeStyle = "rgba(255, 255, 255, .55)"; x.lineWidth = 6; x.lineJoin = "round"; x.lineCap = "round";
    x.beginPath(); x.moveTo(MG, ly);
    x.lineTo(W / 2 - 80, ly); x.lineTo(W / 2 - 50, ly - 70); x.lineTo(W / 2 - 18, ly + 46); x.lineTo(W / 2 + 12, ly - 26);
    x.lineTo(W / 2 + 34, ly); x.lineTo(W - MG, ly); x.stroke();

    // how far off you were
    var vy = ly + 150;
    var head = scoreText(y), hs = 112;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head).width > W - 2 * MG && hs > 60) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head, W / 2, vy);

    x.font = "800 70px " + FD;
    x.fillText("Can you beat that?", W / 2, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, W / 2, 1270);
    }
    layout = { fits: fits, bottom: vy, limit: 1204 - 70, titleLines: tq.lines.length, sizes: [tq.size, ns, hs],
               pic: !!picData, verdict: head, rateShown: false };
    return c;
  }
  window.EveryBeatCard = function () { return layout; };     // read by r/site-workshop/checks/t_every.py
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
    var y = scoreOf(round1(bpm));
    TO.count("every-beat/share");
    TO.share({ blob: cardBlob, filename: "every-beat-day-" + day + ".png", text: shareText(y) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "every-beat-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var y = scoreOf(round1(bpm));
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
  window.EveryBeat = {
    now: function () {
      var y = scoreOf(round1(bpm));
      return { day: day, id: q.id, bpm: round1(bpm), real: REAL, lo: q.lo, hi: q.hi, phase: phase, score: y,
               text: scoreText(y), beats: { you: hearts.you.beats, real: hearts.real.beats },
               mode: { you: modeOf(hearts.you), real: modeOf(hearts.real) }, pic: !!picData, feel: feel, moved: moved };
    },
    set: function (v) { if (phase !== "play") return false; setRate(v); return true; },
    show: show
  };
})();
