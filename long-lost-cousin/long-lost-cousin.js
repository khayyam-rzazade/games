/* Long Lost Cousin: one animal or plant a day, and three others.
   You pick the one you think is its closest relative, then the family tree draws itself. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "long-lost-cousin";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), optionsEl = $("options"), lockBtn = $("lock");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length || !DATA.things) {
    $("question").textContent = "Today's puzzle could not be loaded. Please try again in a moment.";
    return;
  }

  /* ---------- which day, which puzzle, which mode ---------- */
  var THINGS = DATA.things;
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,5}$/.test(v)) ? parseInt(v, 10) : null; }

  var day = today;
  var practice = false;       // practice never touches the streak or the album
  var friend = null;          // 0, 1 or 2 branches away, when opened from a friend's challenge link
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = int(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay < today) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cG !== null && cG <= 2) friend = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }
  function thing(key) { return THINGS[key] || { name: key, the: "the " + key }; }
  function bare(key) { return thing(key).the.replace(/^the /, ""); }          // "the hippo" -> "hippo"
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function closestOf(p) { return p.options[p.rank.indexOf(0)]; }
  function branches(rank) { return rank === 0 ? "Found it" : rank === 1 ? "One branch away" : "Two branches away"; }

  var LICENCE = {
    by3: ["CC BY 3.0", "https://creativecommons.org/licenses/by/3.0/"],
    by4: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"]
  };

  var q = puzzleOf(day);
  var hue = TO.colour(q.colour);
  var best = q.rank.indexOf(0);       // which of the three is the closest relative
  var picked = -1;                    // which one is selected
  var phase = "choose";               // choose, then done
  var cardBlob = null, cardUrl = "";

  /* ---------- the silhouettes: one small file each, fetched only when needed ---------- */
  var PICS = window.TURNSOUT_PICS = window.TURNSOUT_PICS || {};
  var waiting = {};
  window.TurnsOutPic = function (key, pic) { PICS[key] = pic; };
  function loadPic(key, done) {
    if (PICS[key]) { done(PICS[key]); return; }
    if (waiting[key]) { waiting[key].push(done); return; }
    waiting[key] = [done];
    var s = document.createElement("script");
    s.src = "pics/" + key + ".js";
    s.async = true;
    s.onload = s.onerror = function () {
      var list = waiting[key] || [];
      delete waiting[key];
      list.forEach(function (f) { f(PICS[key] || null); });
    };
    document.head.appendChild(s);
  }
  var SVGNS = "http://www.w3.org/2000/svg";
  function drawInto(el, key) {
    loadPic(key, function (pic) {
      el.innerHTML = "";
      if (!pic) { el.classList.add("missing"); return; }      // no picture: the name still tells which one it is
      var s = document.createElementNS(SVGNS, "svg");
      s.setAttribute("viewBox", "0 0 " + pic.w + " " + pic.h);
      s.setAttribute("aria-hidden", "true");
      var p = document.createElementNS(SVGNS, "path");
      p.setAttribute("d", pic.d);
      s.appendChild(p);
      el.appendChild(s);
    });
  }
  function picBox() { var s = document.createElement("span"); s.className = "lc-pic"; return s; }
  function nameBox(text) { var s = document.createElement("span"); s.className = "lc-name"; s.textContent = text; return s; }

  /* ---------- build the screen ---------- */
  panel.style.setProperty("--hue", hue);
  // "T. rex" must not break between its two halves
  $("question").textContent = "Which of these is " + thing(q.subject).the.replace(/\b([A-Z])\. /g, "$1.\u00a0") + "'s closest relative?";
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Long Lost Cousin, day " + day + " | Logicers";
  $("subject-name").textContent = thing(q.subject).name;
  drawInto($("subject-pic"), q.subject);

  var buttons = q.options.map(function (key, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "lc-opt";
    b.setAttribute("aria-pressed", "false");
    var pic = picBox();
    b.appendChild(pic);
    b.appendChild(nameBox(thing(key).name));
    drawInto(pic, key);
    b.addEventListener("click", function () { choose(i); });
    optionsEl.appendChild(b);
    return b;
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 0 ? "A friend found the long lost cousin. Can you?" : "A friend was " + branches(friend).toLowerCase() + ". Can you find the cousin?") +
      (practice ? " It is an earlier puzzle, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("long-lost-cousin/challenge-opened");

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  if (earlier && typeof earlier.c === "number" && earlier.c >= 0 && earlier.c <= 2) {
    picked = earlier.c;
    showResult(false);
  }

  /* ---------- choosing ---------- */
  function choose(i) {
    if (phase !== "choose") return;
    picked = i;
    buttons.forEach(function (b, n) { b.setAttribute("aria-pressed", n === i ? "true" : "false"); });
    lockBtn.hidden = false;
  }

  lockBtn.addEventListener("click", function () {
    if (phase !== "choose" || picked < 0) return;
    var mine = picked;
    TO.update(GAME, function (g) {
      var slot = practice ? g.practice : g.results;
      if (!slot[day]) slot[day] = { c: mine, r: q.rank[mine], id: q.id };
    });
    TO.count(practice ? "long-lost-cousin/practice-played" : "long-lost-cousin/played/day-" + day);
    showResult(true);
  });

  /* ---------- the family tree ----------
     Four tips along the top, the root at the bottom. Each line runs from the root to one tip,
     so the tree seems to grow when the lines are drawn. */
  function routes(tie) {
    if (tie) {      // the subject and its cousin on the left, the other two as a pair on the right
      return ["M200 150V104H100V46H50V0", "M200 150V104H100V46H150V0", "M200 150V104H300V46H250V0", "M200 150V104H300V46H350V0"];
    }
    // a ladder: the cousin joins first, then the next one, then the farthest
    return ["M262.5 150V126H175V86H100V46H50V0", "M262.5 150V126H175V86H100V46H150V0", "M262.5 150V126H175V86H250V0", "M262.5 150V126H350V0"];
  }
  function buildTree() {
    var order = [0, 1, 2].sort(function (a, b) { return (q.rank[a] - q.rank[b]) || (a - b); });   // closest first
    var tie = q.rank[order[1]] === q.rank[order[2]];
    var leaves = $("leaves"), svg = $("branches");
    leaves.innerHTML = "";
    svg.innerHTML = "";
    var keys = [q.subject].concat(order.map(function (i) { return q.options[i]; }));
    keys.forEach(function (key, n) {
      var mine = n > 0 && order[n - 1] === picked;
      var leaf = document.createElement("div");
      leaf.className = "lc-leaf " + (n <= 1 ? "pair" : "far") + (mine ? " you" + (q.rank[picked] === 0 ? "" : " miss") : "");
      var tag = document.createElement("span"); tag.className = "lc-tag"; tag.textContent = "You";
      var pic = picBox();
      leaf.appendChild(tag); leaf.appendChild(pic); leaf.appendChild(nameBox(thing(key).name));
      drawInto(pic, key);
      leaves.appendChild(leaf);
    });
    var lines = routes(tie);
    [3, 2, 1, 0].forEach(function (n) {           // the far branches first, so the bright pair lies on top
      var p = document.createElementNS(SVGNS, "path");
      p.setAttribute("d", lines[n]);
      p.setAttribute("class", n <= 1 ? "pair" : "far");
      svg.appendChild(p);
    });
    var dot = document.createElementNS(SVGNS, "circle");      // where the subject and its cousin meet
    dot.setAttribute("cx", "100"); dot.setAttribute("cy", "46"); dot.setAttribute("r", "8");
    svg.appendChild(dot);
    var when = $("when");
    if (typeof q.mya === "number") { when.textContent = "about " + q.mya + " million years ago"; when.hidden = false; }
    else when.hidden = true;
  }
  function grow(then) {
    var paths = Array.prototype.slice.call($("branches").querySelectorAll("path"));
    paths.forEach(function (p) {
      var len = 600;
      try { len = p.getTotalLength(); } catch (e) { /* keep the estimate */ }
      p.style.strokeDasharray = len + " " + len;
      p.style.strokeDashoffset = String(len);
    });
    void $("branches").getBoundingClientRect();     // let the browser take in the starting state
    paths.forEach(function (p) {
      p.style.transition = "stroke-dashoffset 1.25s ease-in-out, opacity 0.3s ease";
      p.style.strokeDashoffset = "0";
    });
    window.setTimeout(function () {
      paths.forEach(function (p) { p.style.strokeDasharray = ""; p.style.strokeDashoffset = ""; p.style.transition = ""; });
      then();
    }, 1450);
  }

  /* ---------- the reveal ---------- */
  function showResult(animate) {
    var rank = q.rank[picked];
    phase = "done";
    lockBtn.hidden = true;
    $("guess-actions").hidden = true;
    $("guess").hidden = true;
    $("hint").hidden = true;
    buttons.forEach(function (b) { b.disabled = true; });
    buildTree();
    $("tree").hidden = false;
    panel.classList.add("revealed");

    function finish() {
      $("tree").classList.add("done");
      $("turnsout").textContent = "Turns out, " + thing(q.options[best]).the + ".";
      $("offby").innerHTML = rank === 0 ? "You found the long lost cousin."
        : "You picked " + esc(thing(q.options[picked]).the) + ". <b>" + branches(rank) + ".</b>";
      $("verdict").hidden = false;
      fillAfter(rank);
      renderChip();
      buildPractice();
      if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
    }

    if (!animate || TO.reducedMotion()) { finish(); return; }
    grow(finish);
  }

  function credits(html) {        // who drew today's four silhouettes, where the artist asks to be named
    var need = [], free = 0;
    [q.subject].concat(q.options).forEach(function (key) {
      var t = thing(key), l = LICENCE[t.lic];
      if (!l) { free++; return; }
      var who = bare(key) + " by " + (t.by || "an unnamed artist");
      need.push(html ? esc(who) + ' (<a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + "</a>)" : who + " (" + l[0] + ")");
    });
    return { need: need, free: free };
  }

  function fillAfter(rank) {
    var f = $("friend");
    if (friend !== null) {
      f.textContent = friend === 0
        ? "Your friend found the cousin" + (rank === 0 ? " too." : ".")
        : "Your friend was " + branches(friend).toLowerCase() + (rank === friend ? " too." : ".");
      f.hidden = false;
    }
    $("sentence").textContent = q.fact;
    [["src1", 0], ["src2", 1]].forEach(function (p) {
      var a = $(p[0]), s = (q.sources || [])[p[1]];
      if (s) { a.textContent = s.name; a.href = s.url; }
    });
    var c = credits(true);
    $("pic-credit").innerHTML = 'Silhouettes from <a href="https://www.phylopic.org/" target="_blank" rel="noopener">PhyloPic</a>' +
      (c.need.length
        ? ": " + c.need.join("; ") + "." + (c.free ? " The " + (c.free === 1 ? "other one is" : "others are") + " in the public domain." : "")
        : ", in the public domain.");
    if (!practice) {
      fillStamp($("earned-stamp"), q);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s puzzle</a>';
    else next.textContent = "A new cousin to find at midnight.";
    $("after").hidden = false;
    prepareCard(rank);
  }

  /* ---------- streak chip, album ---------- */
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1; }).sort(function (a, b) { return b - a; });
    var found = 0;
    days.forEach(function (n) { if (res[n].r === 0) found++; });
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    $("st-found").textContent = String(found);
    var album = $("album");
    album.innerHTML = "";
    days.forEach(function (n) {
      var p = (res[n].id && byId[res[n].id]) || puzzleOf(n);
      var st = document.createElement("div");
      st.className = "stamp lc";
      fillStamp(st, p);
      album.appendChild(st);
    });
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = "";
    var pic = picBox();
    var what = document.createElement("span"); what.className = "what"; what.textContent = thing(p.subject).name;
    var of = document.createElement("span"); of.className = "of"; of.textContent = "and " + thing(closestOf(p)).the;
    el.appendChild(pic); el.appendChild(what); el.appendChild(of);
    drawInto(pic, p.subject);
  }

  /* ---------- practice: earlier puzzles ---------- */
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 60);
    for (var n = today - 1; n >= first; n--) {
      var p = puzzleOf(n);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = cap(thing(p.subject).the);
      var s = document.createElement("span"); s.className = "s";
      var r = g.results[n] || g.practice[n];
      s.textContent = r ? (r.r === 0 ? "You found the cousin" : branches(r.r)) : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: the four silhouettes, never the answer ---------- */
  function shareUrl(rank) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + rank;
  }
  function mine(rank) { return rank === 0 ? "I found the long lost cousin." : "I was " + branches(rank).toLowerCase() + "."; }
  function shareText(rank) {
    return "Long Lost Cousin, day " + day + ": which of these is " + thing(q.subject).the + "'s closest relative? " +
      mine(rank) + " Can you find it? " + shareUrl(rank);
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
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function paintPic(ctx, pic, bx, by, bw, bh) {       // a silhouette, fitted into a box
    if (!pic || typeof window.Path2D !== "function") return;
    var k = Math.min(bw / pic.w, bh / pic.h);
    ctx.save();
    ctx.translate(bx + (bw - pic.w * k) / 2, by + (bh - pic.h * k) / 2);
    ctx.scale(k, k);
    try { ctx.fill(new window.Path2D(pic.d)); } catch (e) { /* leave the box empty */ }
    ctx.restore();
  }
  function fitText(ctx, text, weight, size, min, maxWidth, F) {
    ctx.font = weight + " " + size + "px " + F;
    while (ctx.measureText(text).width > maxWidth && size > min) { size -= 2; ctx.font = weight + " " + size + "px " + F; }
  }
  function drawCard(rank) {
    var W = 1080, H = 1350, M = 76;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    x.fillStyle = "#CF4327";                 // the game's own colour
    x.fillRect(0, 0, W, H);
    x.textBaseline = "alphabetic";
    x.fillStyle = "#ffffff";

    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", M, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("Long Lost Cousin, day " + day, W - M, 118);

    // the subject, large
    paintPic(x, PICS[q.subject], M, 178, W - 2 * M, 340);

    // the question
    x.textAlign = "left";
    var fs = 60, lines;
    do {
      x.font = "700 " + fs + "px " + FD;
      lines = wrapLines(x, "Which of these is " + thing(q.subject).the + "'s closest relative?", W - 2 * M);
      fs -= 2;
    } while (lines.length > 2 && fs > 40);
    var lh = Math.round((fs + 2) * 1.16), y = 610;
    lines.forEach(function (l) { x.fillText(l, M, y); y += lh; });

    // the three candidates, with no hint of which one it is
    var gap = 22, bw = (W - 2 * M - 2 * gap) / 3, bh = 270, by = 760;
    x.lineWidth = 4;
    x.strokeStyle = "#ffffff";
    q.options.forEach(function (key, i) {
      var bx = M + i * (bw + gap);
      roundRect(x, bx, by, bw, bh, 30);
      x.stroke();
      paintPic(x, PICS[key], bx + 24, by + 24, bw - 48, 150);
      x.textAlign = "center";
      fitText(x, thing(key).name, "700", 36, 22, bw - 28, F);
      x.fillText(thing(key).name, bx + bw / 2, by + 232);
    });

    x.textAlign = "left";
    x.font = "600 40px " + F;
    x.fillText(mine(rank), M, 1112);
    x.font = "800 72px " + FD;
    x.fillText(rank === 0 ? "Can you find it too?" : "Can you find it?", M, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where;
      fitText(x, line, "600", 40, 24, W - 2 * M, F);
      x.fillText(line, M, 1264);
    }
    var cr = credits(false);
    var note = "Silhouettes: PhyloPic" + (cr.need.length ? ". " + cr.need.join("; ") : "");
    x.globalAlpha = 0.85;
    fitText(x, note, "500", 26, 15, W - 2 * M, F);
    x.fillText(note, M, 1314);
    x.globalAlpha = 1;
    return c;
  }
  function prepareCard(rank) {
    function make() {
      try {
        drawCard(rank).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    // wait for the four silhouettes and the typeface, then draw
    var keys = [q.subject].concat(q.options), left = keys.length + 1;
    function one() { left--; if (left === 0) make(); }
    keys.forEach(function (key) { loadPic(key, one); });
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 100px "Bricolage Grotesque"'), document.fonts.load('600 44px \"Figtree\"')]).then(one, one);
    } else one();
  }

  $("share").addEventListener("click", function () {
    var rank = q.rank[picked];
    TO.count("long-lost-cousin/share");
    TO.share({ blob: cardBlob, filename: "long-lost-cousin-day-" + day + ".png", text: shareText(rank) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "long-lost-cousin-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var rank = q.rank[picked];
    TO.copyText(shareText(rank)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(rank);
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
