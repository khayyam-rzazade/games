/* Same Street: one real home a day, in three photos.
   You place it on a street of 100 houses sorted by income, then you see where it really stands.
   The game asks "where on the street?". Photos: Dollar Street, a Gapminder project (CC BY 4.0). */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "same-street";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), street = $("street"), rowTop = $("row-top"), rowBottom = $("row-bottom");
  var countEl = $("count"), hintEl = $("hint"), verdictEl = $("verdict");
  var lockBtn = $("lock"), minusBtn = $("minus"), plusBtn = $("plus");
  var pin = $("pin"), tagYou = $("tag-you"), tagReal = $("tag-real"), gapEl = $("gap");

  if (!TO || !DATA || !DATA.homes || !DATA.homes.length) {
    $("question").textContent = "Today's home could not be loaded. Please try again in a moment.";
    $("photos").hidden = true;
    panel.hidden = true;
    return;
  }

  var LOW = DATA.low || 25, HIGH = DATA.high || 15000;
  var FAMILY = "https://www.gapminder.org/dollar-street/families/";
  var CAPTIONS = ["The home from outside", "Where the family cooks", "Where the family sleeps"];

  /* ---------- small helpers ---------- */
  function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
  function rounded(v) {                       // whole dollars below 100, then two leading digits
    if (v < 100) return Math.round(v);
    var p = Math.pow(10, Math.floor(Math.log(v) / Math.LN10) - 1);
    return Math.round(v / p) * p;
  }
  function incomeAt(house) {                  // each step along the street multiplies the income by the same amount
    return rounded(LOW * Math.pow(HIGH / LOW, (house - 1) / 99));
  }
  function doors(gap) { return gap === 0 ? "The right house" : gap === 1 ? "Next door" : gap + " doors away"; }
  var WITH_THE = { "United States": 1, "United Kingdom": 1, "Netherlands": 1, "Philippines": 1, "Czech Republic": 1,
    "Gambia": 1, "Bahamas": 1, "Maldives": 1, "Comoros": 1, "Solomon Islands": 1, "United Arab Emirates": 1,
    "Dominican Republic": 1, "Central African Republic": 1, "Democratic Republic of the Congo": 1 };
  function place(country) { return (WITH_THE[country] ? "the " : "") + country; }
  function photoOf(home, i) { return "photos/" + home.id + "-" + (i + 1) + ".jpg"; }
  function clamp(n) { return Math.max(1, Math.min(100, n)); }

  /* ---------- which day, which home, which mode ---------- */
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
    if (cGap !== null && cGap <= 99) friendGap = cGap;
  }

  var byId = {};
  DATA.homes.forEach(function (x) { byId[x.id] = x; });
  function homeOf(n) { return DATA.homes[(n - 1) % DATA.homes.length]; }
  var q = homeOf(day);
  var hue = TO.colour(q.colour);

  var guess = 0;             // the house you chose, 1 to 100. 0: not placed yet
  var phase = "guess";       // guess, then done
  var dragging = false;
  var cardBlob = null, cardUrl = "";

  /* ---------- build the screen ---------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function houseShape() {
    var s = document.createElementNS(SVGNS, "svg");
    s.setAttribute("class", "ss-house");
    s.setAttribute("viewBox", "0 0 10 12");
    var p = document.createElementNS(SVGNS, "path");
    p.setAttribute("d", "M1 12V5.2L5 1l4 4.2V12z");
    s.appendChild(p);
    return s;
  }
  var houses = [null];       // houses[1] to houses[100]; odd numbers on the top side, even numbers on the bottom side
  for (var n = 1; n <= 100; n++) {
    var h = houseShape();
    (n % 2 ? rowTop : rowBottom).appendChild(h);
    houses.push(h);
  }
  function along(house) { return (Math.floor((house - 1) / 2) + 0.5) * 2; }   // how far along the street, in percent

  panel.style.setProperty("--hue", hue);
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Same Street, day " + day + " | Logicers";
  $("end-low").textContent = money(LOW);
  $("end-high").textContent = money(HIGH);
  $("help-low").textContent = money(LOW);
  $("help-high").textContent = money(HIGH);

  var imgs = [0, 1, 2].map(function (i) {
    var im = $("photo-" + i);
    im.src = photoOf(q, i);
    return im;
  });
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".ss-photo"));
  var big = 0;
  tiles.forEach(function (tile, i) {
    tile.addEventListener("click", function () {
      if (i !== big) {                           // a small photo: swap it into the big place
        tiles[big].classList.remove("big");
        tile.classList.add("big");
        big = i;
        return;
      }
      $("zoom-img").src = imgs[i].src;           // the big photo: show it larger
      $("zoom-img").alt = CAPTIONS[i];
      $("zoom-cap").textContent = CAPTIONS[i] + ".";
      TO.openDialog($("dlg-photo"));
    });
  });

  var notice = $("notice");
  if (friendGap !== null) {
    notice.textContent = (friendGap === 0 ? "A friend found the right house. Can you match it?"
      : friendGap === 1 ? "A friend was next door. Can you match it?"
      : "A friend was " + friendGap + " doors away. Can you get closer?") +
      (practice ? " It is an earlier home, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friendGap !== null) TO.count("same-street/challenge-opened");

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  if (earlier && typeof earlier.g === "number" && earlier.g >= 1) {
    guess = clamp(earlier.g);
    showResult(false);
  }

  /* ---------- placing the home ---------- */
  function setGuess(nw) {
    if (phase !== "guess") return;
    nw = clamp(nw);
    if (guess) houses[guess].classList.remove("on");
    guess = nw;
    houses[guess].classList.add("on");
    pin.style.left = along(guess) + "%";
    pin.hidden = false;
    countEl.textContent = String(guess);
    var text = "House " + guess + " of 100: about " + money(incomeAt(guess)) + " a month for each adult";
    hintEl.textContent = "about " + money(incomeAt(guess)) + " a month for each adult";
    street.setAttribute("aria-valuenow", String(guess));
    street.setAttribute("aria-valuetext", text);
    lockBtn.hidden = false;
    minusBtn.hidden = false;
    plusBtn.hidden = false;
    minusBtn.disabled = guess <= 1;
    plusBtn.disabled = guess >= 100;
  }
  function setFromX(clientX) {
    var r = rowTop.getBoundingClientRect();
    if (!r.width) return;
    var f = (clientX - r.left) / r.width;
    setGuess(1 + Math.floor(Math.max(0, Math.min(0.9999, f)) * 100));
  }
  function stopDrag() { dragging = false; }

  street.addEventListener("pointerdown", function (e) {
    if (phase !== "guess" || e.button) return;   // only the main button or a finger
    e.preventDefault();
    dragging = true;
    try { street.setPointerCapture(e.pointerId); } catch (err) { /* not fatal */ }
    setFromX(e.clientX);
  });
  street.addEventListener("pointermove", function (e) { if (dragging && phase === "guess") setFromX(e.clientX); });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (name) { street.addEventListener(name, stopDrag); });
  window.addEventListener("blur", stopDrag);
  street.addEventListener("contextmenu", function (e) { if (phase === "guess") e.preventDefault(); });
  street.addEventListener("selectstart", function (e) { if (phase === "guess") e.preventDefault(); });

  street.addEventListener("keydown", function (e) {   // the keyboard way to place the home
    if (phase !== "guess") return;
    var from = guess || 50, to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") to = guess ? from + 1 : from;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") to = guess ? from - 1 : from;
    else if (e.key === "PageUp") to = from + 10;
    else if (e.key === "PageDown") to = from - 10;
    else if (e.key === "Home") to = 1;
    else if (e.key === "End") to = 100;
    else if (e.key === "Enter" && guess) { e.preventDefault(); lockBtn.click(); return; }
    if (to === null) return;
    e.preventDefault();
    setGuess(to);
  });
  minusBtn.addEventListener("click", function () { if (guess) setGuess(guess - 1); });
  plusBtn.addEventListener("click", function () { if (guess) setGuess(guess + 1); });

  lockBtn.addEventListener("click", function () {
    if (phase !== "guess" || !guess) return;
    var mine = guess;
    TO.update(GAME, function (g) {
      var slot = practice ? g.practice : g.results;
      if (!slot[day]) slot[day] = { g: mine, a: q.house, id: q.id };
    });
    TO.count(practice ? "same-street/practice-played" : "same-street/played/day-" + day);
    showResult(true);
  });

  /* ---------- the reveal ---------- */
  function placeTag(tag, house) {               // keeps the little label inside the street
    tag.hidden = false;
    var w = street.clientWidth, tw = tag.offsetWidth;
    var x = along(house) / 100 * w - tw / 2;
    tag.style.left = Math.max(0, Math.min(w - tw, x)) + "px";
  }
  function placeStem(stem, house, fromTop) {    // a thin line from the label to its house
    var s = street.getBoundingClientRect(), hr = houses[house].getBoundingClientRect();
    var len = fromTop ? hr.top - s.top - 17 : s.bottom - 17 - hr.bottom;
    stem.style.left = along(house) + "%";
    stem.style.height = Math.max(0, len) + "px";
    stem.hidden = len <= 0;
  }
  function placeTags() {
    if (phase !== "done" || !houses[q.house].classList.contains("real")) return;
    placeTag(tagReal, q.house);
    placeStem($("stem-real"), q.house, false);
    if (guess !== q.house) { placeTag(tagYou, guess); placeStem($("stem-you"), guess, true); }
    else { tagYou.hidden = true; $("stem-you").hidden = true; }
  }
  window.addEventListener("resize", placeTags);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeTags, function () { /* ignore */ });

  function showResult(animate) {
    var answer = q.house, gap = Math.abs(guess - answer);
    phase = "done";
    dragging = false;
    street.setAttribute("data-phase", "done");
    street.setAttribute("aria-disabled", "true");
    street.removeAttribute("tabindex");
    lockBtn.hidden = true;
    minusBtn.hidden = true;
    plusBtn.hidden = true;
    $("guess-actions").hidden = true;
    pin.hidden = true;
    for (var k = 1; k <= 100; k++) houses[k].classList.remove("on");
    panel.classList.add("revealed");
    houses[guess].classList.add("mine");

    function finish() {
      for (var k2 = 1; k2 <= 100; k2++) houses[k2].classList.remove("walk");
      houses[guess].classList.toggle("mine", gap !== 0);
      houses[answer].classList.add("real");
      if (gap !== 0) {
        var a = along(guess), b = along(answer);
        gapEl.style.left = Math.min(a, b) + "%";
        gapEl.style.width = Math.abs(a - b) + "%";
        gapEl.hidden = Math.abs(a - b) === 0;
      }
      placeTags();
      street.setAttribute("aria-valuetext", "This home stands at house " + answer + ". You said house " + guess + ".");
      countEl.hidden = true;
      $("turnsout").textContent = "Turns out, house " + answer + ".";
      $("offby").innerHTML = "You said house " + guess + ". <b>" + doors(gap) + ".</b>";
      $("offby").classList.toggle("hit", gap === 0);        // yellow is kept for a miss
      verdictEl.hidden = false;
      fillAfter(gap);
      renderChip();
      buildPractice();
      if (animate && window.navigator.vibrate) { try { window.navigator.vibrate(18); } catch (e) { /* ignore */ } }
    }

    if (!animate || TO.reducedMotion()) { finish(); return; }

    // a light walks along the street, from your house to the real one
    countEl.textContent = String(guess);
    var dir = answer >= guess ? 1 : -1;
    var total = gap === 0 ? 200 : Math.max(500, Math.min(1500, 350 + gap * 24));
    var t0 = performance.now() + 500;            // let the colour arrive first
    var at = guess;
    function step(now) {
      var f = Math.max(0, Math.min(1, (now - t0) / total));
      var pos = guess + dir * Math.round(f * gap);
      if (pos !== at) {
        if (at !== guess) houses[at].classList.remove("walk");
        at = pos;
        houses[at].classList.add("walk");
        countEl.textContent = String(at);
      }
      if (f < 1) window.requestAnimationFrame(step);
      else window.setTimeout(finish, 380);
    }
    window.requestAnimationFrame(step);
  }

  function fillAfter(gap) {
    var friend = $("friend");
    if (friendGap !== null) {
      var f = friendGap === 0 ? "Your friend found the right house" : friendGap === 1 ? "Your friend was next door" : "Your friend was " + friendGap + " doors away";
      friend.textContent = gap < friendGap ? f + ". You got closer."
        : gap === friendGap ? f + " too. A tie."
        : f + ". Closer than you.";
      friend.hidden = false;
    }
    $("sentence").textContent = "This home is in " + place(q.country) + ". Each adult here lives on about " + money(q.income) + " a month.";
    $("photo-credit").textContent = "Photos: " + (q.by ? q.by + " for Dollar Street" : "Dollar Street") + (q.year ? " " + q.year : "") + ".";
    $("family-link").href = FAMILY + encodeURIComponent(q.page || "");

    if (!practice) {
      fillStamp($("earned-stamp"), q);
      $("earned").hidden = false;
    }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today\'s home</a>';
    else next.textContent = "A new home at midnight.";
    $("after").hidden = false;
    prepareCard(gap);
  }

  /* ---------- streak chip, album ---------- */
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n2) { return n2 >= 1; }).sort(function (a, b) { return b - a; });
    var total = 0, countries = {};
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    var album = $("album");
    album.innerHTML = "";
    days.forEach(function (n2) {
      var r = res[n2];
      var home = (r.id && byId[r.id]) || homeOf(n2);
      total += Math.abs(r.g - r.a);
      countries[home.country] = true;
      var st = document.createElement("div");
      st.className = "stamp ss";
      fillStamp(st, home);
      album.appendChild(st);
    });
    $("st-gap").textContent = days.length ? String(Math.round((total / days.length) * 10) / 10) : "0";
    var nc = Object.keys(countries).length, line = $("album-countries");
    line.textContent = "Homes in " + nc + (nc === 1 ? " country" : " countries") + " so far.";
    line.hidden = nc === 0;
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, home) {
    el.style.setProperty("--hue", TO.colour(home.colour));
    el.innerHTML = "";
    var nEl = document.createElement("span"); nEl.className = "n";
    var small = document.createElement("small"); small.textContent = "House";
    nEl.appendChild(small);
    nEl.appendChild(document.createTextNode(String(home.house)));
    var of = document.createElement("span"); of.className = "of"; of.textContent = home.country;
    var what = document.createElement("span"); what.className = "what"; what.textContent = money(home.income) + " a month";
    el.appendChild(nEl); el.appendChild(of); el.appendChild(what);
  }

  /* ---------- practice: earlier homes ---------- */
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 60);
    for (var n2 = today - 1; n2 >= first; n2--) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n2);
      var r = g.results[n2] || g.practice[n2];
      var home = (r && r.id && byId[r.id]) || homeOf(n2);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n2;
      var t = document.createElement("span"); t.className = "q";
      t.textContent = r ? "A home in " + place(home.country) : "A home somewhere on the street";   // the country stays hidden until you have played
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? "You were " + (Math.abs(r.g - r.a) === 0 ? "at the right house" : Math.abs(r.g - r.a) === 1 ? "next door" : Math.abs(r.g - r.a) + " doors away") : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: the photo and your distance, never the country or the place on the street ---------- */
  function shareUrl(gap) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + gap;
  }
  function shareText(gap) {
    return "Same Street, day " + day + ": " + (gap === 0 ? "the right house. Can you match it? " : gap === 1 ? "next door. Can you match it? " : gap + " doors away. Can you get closer? ") + shareUrl(gap);
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
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawHouse(ctx, x, y, w) {            // same shape as the house on screen (10 by 12)
    var s = w / 10;
    ctx.beginPath();
    ctx.moveTo(x + 1 * s, y + 12 * s);
    ctx.lineTo(x + 1 * s, y + 5.2 * s);
    ctx.lineTo(x + 5 * s, y + 1 * s);
    ctx.lineTo(x + 9 * s, y + 5.2 * s);
    ctx.lineTo(x + 9 * s, y + 12 * s);
    ctx.closePath();
    ctx.fill();
  }
  function fitText(ctx, text, weight, size, min, maxWidth, F) {
    ctx.font = weight + " " + size + "px " + F;
    while (ctx.measureText(text).width > maxWidth && size > min) { size -= 2; ctx.font = weight + " " + size + "px " + F; }
    return size;
  }
  function drawCard(gap, photo) {
    var W = 1080, H = 1350, M = 76;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';       // text
    var FD = '"Bricolage Grotesque", ' + F;                                       // headlines
    x.fillStyle = "#0D7D73";                 // the game's own colour, never the region's: that would give the region away
    x.fillRect(0, 0, W, H);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "800 48px " + FD;
    x.fillText("Logicers", M, 118);
    x.textAlign = "right";
    x.font = "600 40px " + F;
    x.fillText("Same Street, day " + day, W - M, 118);

    // the home from outside
    var px = M, py = 164, pw = W - 2 * M, phh = 600;
    x.save();
    roundRect(x, px, py, pw, phh, 40);
    x.clip();
    x.fillStyle = "rgba(255,255,255,0.16)";
    x.fillRect(px, py, pw, phh);
    if (photo) {
      var sw = photo.naturalWidth, sh = photo.naturalHeight;
      var scale = Math.max(pw / sw, phh / sh);
      var cw = pw / scale, ch = phh / scale;
      x.drawImage(photo, (sw - cw) / 2, (sh - ch) / 2, cw, ch, px, py, pw, phh);
    }
    x.restore();

    x.textAlign = "left";
    x.fillStyle = "#ffffff";
    x.font = "600 44px " + F;
    x.fillText("Where on the street is this home?", M, 836);

    var head = doors(gap);
    fitText(x, head, 800, 150, 90, W - 2 * M, FD);
    x.fillStyle = TO.MISS;
    x.fillText(head, M - 6, 984);

    // the street: all pale, and only as many houses lit as you were away, scattered so it gives nothing away
    var miss = {};
    var rnd = seeded(day * 1009 + gap * 31 + 11);
    var left = Math.min(gap, 100);
    while (left > 0) {
      var pick = Math.floor(rnd() * 100);
      if (!miss[pick]) { miss[pick] = true; left--; }
    }
    var pitch = (W - 2 * M) / 50, hw = pitch * 0.92, top = 1030;
    for (var n2 = 0; n2 < 100; n2++) {
      var col = Math.floor(n2 / 2), row = n2 % 2;
      x.globalAlpha = miss[n2] ? 1 : 0.28;
      x.fillStyle = miss[n2] ? TO.MISS : "#ffffff";
      drawHouse(x, M + col * pitch + (pitch - hw) / 2, top + row * (hw * 1.2 + 14), hw);
    }
    x.globalAlpha = 0.28;
    x.fillStyle = "#ffffff";
    x.fillRect(M, top + hw * 1.2 + 4, W - 2 * M, 6);
    x.globalAlpha = 1;

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "700 46px " + FD;
    x.fillText(gap <= 1 ? "Can you match it?" : "Can you get closer?", M, 1178);
    var st = TO.streak(TO.game(GAME).results, today).current;
    if (!practice && st >= 2) {
      x.textAlign = "right";
      x.font = "500 38px " + F;
      x.fillText(st + " days in a row", W - M, 1178);
    }
    // where to play: a picture cannot carry a link you can tap, so it carries the address in words
    var where = TO.address();
    if (where) {
      x.textAlign = "left";
      fitText(x, "Play at " + where, 600, 40, 24, W - 2 * M, F);
      x.fillText("Play at " + where, M, 1240);
    }
    // the credit travels with the photo
    if (photo) {
      var credit = "Photo: " + (q.by ? q.by + " for Dollar Street" : "Dollar Street") + (q.year ? " " + q.year : "") +
        ". Free material from GAPMINDER.ORG, CC-BY LICENSE";
      x.textAlign = "left";
      x.globalAlpha = 0.85;
      fitText(x, credit, 500, 27, 16, W - 2 * M, F);
      x.fillText(credit, M, 1306);
      x.globalAlpha = 1;
    }
    return c;
  }
  function prepareCard(gap) {
    function toBlob(photo, fallback) {
      try {
        drawCard(gap, photo).toBlob(function (blob) {
          if (!blob) { if (fallback) fallback(); return; }
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) {
        if (fallback) fallback(); else cardBlob = null;
      }
    }
    function make() {
      var photo = imgs[0];
      var ready = photo && photo.complete && photo.naturalWidth > 0;
      // if the browser will not let the photo into a picture (this happens when the page is opened from a folder), share without it
      if (ready) toBlob(photo, function () { toBlob(null, null); });
      else toBlob(null, null);
    }
    function whenPhoto() {
      var photo = imgs[0];
      if (photo.complete) make();
      else { photo.addEventListener("load", make, { once: true }); photo.addEventListener("error", make, { once: true }); }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 100px "Bricolage Grotesque"'),
        document.fonts.load('600 44px \"Figtree\"'),
        document.fonts.load('500 38px \"Figtree\"')
      ]).then(whenPhoto, whenPhoto);
    } else whenPhoto();
  }

  $("share").addEventListener("click", function () {
    var gap = Math.abs(guess - q.house);
    TO.count("same-street/share");
    TO.share({ blob: cardBlob, filename: "same-street-day-" + day + ".png", text: shareText(gap) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "same-street-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var gap = Math.abs(guess - q.house);
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
