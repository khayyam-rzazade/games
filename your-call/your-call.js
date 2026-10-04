/* Your Call: one real moment from history a day.
   You make your call, then you see what the real leader did and what happened next.
   There is no right or wrong choice. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "your-call";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), choicesEl = $("choices"), lockBtn = $("lock");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("pov").textContent = "Today's moment could not be loaded. Please try again in a moment.";
    return;
  }

  /* ---------- which day, which moment, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,5}$/.test(v)) ? parseInt(v, 10) : null; }

  var day = today;
  var practice = false;       // practice never touches the streak or the album
  var friendSame = null;      // true or false when opened from a friend's challenge link
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cM = params.get("m");
  if (pDay !== null && pDay >= 1 && pDay < today) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    if (cM === "1" || cM === "0") friendSame = cM === "1";
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }
  var q = puzzleOf(day);
  var hue = TO.colour(q.colour);
  var LETTERS = ["A", "B", "C"];

  var picked = -1;            // which choice is selected
  var phase = "choose";       // choose, then done
  var cardBlob = null, cardUrl = "";

  /* ---------- build the screen ---------- */
  panel.style.setProperty("--hue", hue);
  $("year").textContent = String(q.year);
  $("place").textContent = q.place;
  $("pov").textContent = "POV: " + q.pov + " Your call.";
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Your Call, day " + day + " | Logicers";

  var buttons = q.choices.map(function (text, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "yc-choice";
    b.setAttribute("aria-pressed", "false");
    var k = document.createElement("span"); k.className = "k"; k.textContent = LETTERS[i];
    var body = document.createElement("span");
    var t = document.createElement("span"); t.className = "t"; t.textContent = text;
    var tag = document.createElement("span"); tag.className = "tag";
    body.appendChild(t); body.appendChild(tag);
    b.appendChild(k); b.appendChild(body);
    b.addEventListener("click", function () { choose(i); });
    choicesEl.appendChild(b);
    return b;
  });

  var notice = $("notice");
  if (friendSame !== null) {
    notice.textContent = (friendSame ? "A friend made the same call as the real leader." : "A friend chose differently from the real leader.") +
      " Your call." + (practice ? " It is an earlier moment, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friendSame !== null) TO.count("your-call/challenge-opened");

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  if (earlier && typeof earlier.c === "number") {
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
      if (!slot[day]) slot[day] = { c: mine, r: q.real, id: q.id };
    });
    TO.count(practice ? "your-call/practice-played" : "your-call/played/day-" + day);
    showResult(true);
  });

  /* ---------- the reveal ---------- */
  function showResult(animate) {
    var same = picked === q.real;
    phase = "done";
    lockBtn.hidden = true;
    $("guess-actions").hidden = true;
    buttons.forEach(function (b, n) {
      b.disabled = true;
      b.setAttribute("aria-pressed", n === picked ? "true" : "false");
    });
    panel.classList.add("revealed");

    function finish() {
      buttons.forEach(function (b, n) {
        b.classList.remove("scan");
        b.classList.toggle("real", n === q.real);
        b.classList.toggle("mine", n === picked && !same);
        var tag = b.querySelector(".tag");
        tag.textContent = n === q.real ? (same ? "Your call, and what " + q.short + " did" : "What " + q.short + " did")
          : (n === picked ? "Your call" : "");
      });
      var v = $("verdict");
      v.textContent = same ? "Same call. That is what " + q.short + " did." : q.short + " made a different call.";
      v.hidden = false;
      fillAfter(same);
      renderChip();
      if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
    }

    if (!animate || TO.reducedMotion()) { finish(); return; }

    // a short moment of suspense: the three choices light up in turn, then the real one stays
    var step = 0, total = 7;
    function scan() {
      buttons.forEach(function (b, n) { b.classList.toggle("scan", n === step % 3); });
      step++;
      if (step <= total) window.setTimeout(scan, 190);
      else window.setTimeout(finish, 240);
    }
    window.setTimeout(scan, 420);
  }

  function fillAfter(same) {
    var friend = $("friend");
    if (friendSame !== null) {
      friend.textContent = friendSame
        ? (same ? "Your friend made that call too." : "Your friend made the leader's call.")
        : (same ? "Your friend chose differently." : "Your friend chose differently too.");
      friend.hidden = false;
    }
    $("did").textContent = q.did;
    $("next-text").textContent = q.next;
    [["src1", 0], ["src2", 1]].forEach(function (p) {
      var a = $(p[0]), s = (q.sources || [])[p[1]];
      if (s) { a.textContent = s.name; a.href = s.url; }
    });
    if (!practice) {
      fillStamp($("earned-stamp"), q);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s moment</a>';
    else next.textContent = "A new moment at midnight.";
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });   // what is played today, and the next game
    prepareCard(same);
  }

  /* ---------- streak chip, album ---------- */
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1; }).sort(function (a, b) { return b - a; });
    var same = 0;
    days.forEach(function (n) { if (res[n].c === res[n].r) same++; });
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    $("st-same").textContent = String(same);
    var album = $("album");
    album.innerHTML = "";
    days.forEach(function (n) {
      var p = (res[n].id && byId[res[n].id]) || puzzleOf(n);
      var st = document.createElement("div");
      st.className = "stamp yc";
      fillStamp(st, p);
      album.appendChild(st);
    });
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = "";
    var n = document.createElement("span"); n.className = "n"; n.textContent = String(p.year);
    var of = document.createElement("span"); of.className = "of"; of.textContent = p.place;
    var what = document.createElement("span"); what.className = "what"; what.textContent = p.stamp || "";
    el.appendChild(n); el.appendChild(of); el.appendChild(what);
  }

  /* ---------- practice: earlier moments ---------- */
  function buildPractice() {
    var list = $("practice-list");
    var g = TO.game(GAME);
    var first = Math.max(1, today - 60);
    for (var n = today - 1; n >= first; n--) {
      var p = puzzleOf(n);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = p.year + ", " + p.place;
      var s = document.createElement("span"); s.className = "s";
      var r = g.results[n] || g.practice[n];
      s.textContent = r ? (r.c === r.r ? "You made the leader's call" : "You chose differently") : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: it never shows what the leader did ---------- */
  function shareUrl(same) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&m=" + (same ? "1" : "0");
  }
  function shareText(same) {
    return "Your Call, day " + day + ": " + q.year + ", " + q.place + ". " +
      (same ? "I made the same call as the real leader." : "I chose differently from the real leader.") +
      " Your call. " + shareUrl(same);
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
  function drawCard(same) {
    var W = 1080, H = 1350, M = 76;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    x.fillStyle = "#6A45CC";                 // the game's own colour
    x.fillRect(0, 0, W, H);
    x.textBaseline = "alphabetic";
    x.fillStyle = "#ffffff";

    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", M, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("Your Call, day " + day, W - M, 118);

    x.textAlign = "left";
    x.font = "800 190px " + FD;
    x.fillText(String(q.year), M - 8, 300);
    var yw = x.measureText(String(q.year)).width;
    x.font = "600 44px " + F;
    x.fillText(q.place, M + yw + 16, 300);

    // the moment, in a size that fits
    var fs = 44, lines;
    do {
      x.font = "600 " + fs + "px " + F;
      lines = wrapLines(x, "POV: " + q.pov, W - 2 * M);
      fs -= 2;
    } while (lines.length > 6 && fs > 30);
    var lh = Math.round((fs + 2) * 1.24), y = 372;
    lines.forEach(function (l) { x.fillText(l, M, y); y += lh; });

    // the three choices, with no hint of which one was real
    var boxTop = Math.max(y + 6, 660), boxH = 104, gap = 16;
    x.lineWidth = 4;
    x.strokeStyle = "#ffffff";
    q.choices.forEach(function (text, i) {
      var by = boxTop + i * (boxH + gap);
      roundRect(x, M, by, W - 2 * M, boxH, 30);
      x.stroke();
      x.font = "800 46px " + FD;
      x.fillText(LETTERS[i], M + 30, by + 68);
      var cs = 40;
      x.font = "600 " + cs + "px " + F;
      while (x.measureText(text).width > W - 2 * M - 130 && cs > 26) { cs -= 2; x.font = "600 " + cs + "px " + F; }
      x.fillText(text, M + 96, by + 66);
    });

    var ry = boxTop + 3 * (boxH + gap) + 44;
    x.font = "600 40px " + F;
    x.fillText(same ? "I made the same call as the real leader." : "I chose differently from the real leader.", M, ry);

    x.font = "800 72px " + FD;
    x.fillText("Your call.", M, 1258);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W - 2 * M && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, M, 1314);
    }
    return c;
  }
  function prepareCard(same) {
    function make() {
      try {
        drawCard(same).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 100px "Bricolage Grotesque"'), document.fonts.load('600 44px \"Figtree\"')]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var same = picked === q.real;
    TO.count("your-call/share");
    TO.share({ blob: cardBlob, filename: "your-call-day-" + day + ".png", text: shareText(same) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "your-call-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var same = picked === q.real;
    TO.copyText(shareText(same)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(same);
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
