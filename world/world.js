/* The World table (16 Oct 2026): which country plays the daily games best, today, yesterday, this week and this month.
   Everything comes from the server's summary of a date or a month (/stats/world, server/live/src/tally.js),
   ranked here by assets/js/world.js (LogicersWorld.rank): a country's score is its players' average points,
   made fair across games by the server, pulled toward the world's average while it has few games, plus a small
   bonus for how many games it played (16 Oct 2026). Each table can be shared as a picture of its top 10, the
   winner given the most room (16 Oct 2026, Khayyam: "it has to trigger competition, but simple, at the same time
   attractive"). */
(function () {
  "use strict";

  var TO = window.TurnsOut, W = window.LogicersWorld;
  function $(id) { return document.getElementById(id); }
  if (!TO || !W) return;
  var el = W.el;
  TO.wireDialogs();
  TO.fixLocalLinks();

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = W.todayKey();
  var span = "day", shown = null, all = false, allBusy = false;   // all, allBusy: "Show every country" tapped

  /* the way to today's games: how many are played */
  function play() {
    var n = TO.GAMES.filter(TO.playedToday).length, N = TO.GAMES.length;
    $("wt-play-kicker").textContent = n === N ? "All " + N + " played today. New games at midnight." : n + " of " + N + " played today";
  }

  /* the privacy switch */
  var opt = $("wt-optin");
  opt.checked = !W.off();
  opt.addEventListener("change", function () {
    W.setOff(!opt.checked);
    $("wt-optnote").textContent = opt.checked
      ? "Your results are added to the world's counts again, from your next game."
      : "Your results stay out of the world's counts from now on, on this browser. You still see everyone else's.";
    $("wt-optnote").hidden = false;
    TO.count(opt.checked ? "world/opt-in" : "world/opt-out");
  });

  /* the week runs from Monday, as the server counts it */
  function monday(key) { var d = W.dateOf(key); return d ? W.shiftKey(key, -((d.getDay() + 6) % 7)) : key; }
  function dayWords(key) { var d = W.dateOf(key); return d ? DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()] : ""; }
  function words(key, sp) {
    var d = W.dateOf(key);
    if (!d) return "";
    if (sp === "month") return MONTHS[d.getMonth()] + " " + d.getFullYear() + ", up to today";
    if (sp === "week") return "From " + dayWords(monday(key)) + ", up to today";
    return dayWords(key);
  }
  function when(sp) { return sp === "month" ? "this month" : sp === "week" ? "this week" : sp === "yday" ? "yesterday" : "today"; }
  function ofSpan(sp) { return sp === "yday" ? "day" : sp; }        // the table the server and the ranking know

  function row(x, i, mine, value, sub, barMax) {
    var li = el("li", x.c === mine ? "me" : "");
    li.appendChild(el("span", "at", i ? String(i) : "–"));
    var who = el("span", "who");
    who.appendChild(W.flagEl(x.c));
    who.appendChild(document.createTextNode(W.countryName(x.c)));
    if (sub) who.appendChild(el("small", "", sub));
    li.appendChild(who);
    var val = el("span", "val");
    val.appendChild(el("b", "", value));
    if (barMax) {
      var bar = el("span", "wd-bar"), fill = el("i", "");
      fill.style.width = Math.max(3, Math.round(100 * x.played / barMax)) + "%";
      bar.appendChild(fill);
      val.appendChild(bar);
    }
    li.appendChild(val);
    return li;
  }
  function gap() { var li = el("li", "gap"); li.appendChild(el("span", "", "···")); li.setAttribute("aria-hidden", "true"); return li; }
  function games(n) { return W.commas(n) + (n === 1 ? " game" : " games"); }

  function mineCard(d, t, sp) {
    var box = $("wt-mine");
    box.textContent = "";
    var you = d.you || {}, c = you.c, name = W.countryName(c);
    var x = null;
    t.rows.forEach(function (r) { if (r.c === c) x = r; });
    var note = el("p", "wd-note");
    note.hidden = true;
    note.setAttribute("role", "status");
    if (!name) {
      box.appendChild(el("p", "wt-mine-line", "Your connection did not say which country you are in, so your games count for the world only."));
      return;
    }
    var top = el("div", "wt-mine-top");
    var f = el("span", "wt-bigflag", W.flag(c));
    f.setAttribute("aria-hidden", "true");
    top.appendChild(f);
    var nm = el("div", "wt-mine-name");
    nm.appendChild(el("b", "", name));
    nm.appendChild(el("span", "", "Your country " + when(sp)));
    top.appendChild(nm);
    if (x && x.at) {
      var pl = el("div", "wt-place");
      pl.appendChild(el("b", "", W.nth(x.at)));
      pl.appendChild(el("span", "", "of " + t.ranked.length));
      top.appendChild(pl);
    }
    box.appendChild(top);

    var facts = el("div", "wt-mine-facts");
    function fact(v, label) { var e = el("div", "wt-fact"); e.appendChild(el("b", "", v)); e.appendChild(el("span", "", label)); facts.appendChild(e); }
    fact(x && x.at ? String(Math.round(x.s)) : "–", "score");
    fact(x ? W.commas(x.played) : "0", x && x.played === 1 ? "game played" : "games played");
    fact(String(Math.round(t.m)), "world's average");
    box.appendChild(facts);

    var line = el("p", "wt-mine-line");
    if (x && x.at === 1) {
      line.appendChild(document.createTextNode("Top of the world " + when(sp) + "!"));
      if (t.ranked[1]) {
        var lead = Math.round(x.s - t.ranked[1].s);
        line.appendChild(document.createTextNode(lead >= 1 ? " " + lead + (lead === 1 ? " point" : " points") + " ahead of " + W.countryName(t.ranked[1].c) + "." : " Only just ahead of " + W.countryName(t.ranked[1].c) + "."));
      }
    } else if (x && x.at) {
      var above = t.ranked[x.at - 2], diff = Math.max(1, Math.round(above.s - x.s));
      line.appendChild(el("b", "", diff + (diff === 1 ? " point" : " points")));
      line.appendChild(document.createTextNode(" behind " + W.flag(above.c) + " " + W.countryName(above.c) + " (" + W.nth(above.at) + "). Every game a friend plays counts."));
    } else if (x && x.played) {
      var need = Math.max(1, t.min - x.n);
      line.appendChild(el("b", "", need + " more " + (need === 1 ? "game" : "games")));
      line.appendChild(document.createTextNode(" and " + name + " takes a place on the table."));
    } else {
      line.textContent = sp === "day" ? "No games from " + name + " yet today. Be the first." : "No games from " + name + " " + when(sp) + ".";
    }
    box.appendChild(line);
    if (sp !== "yday") {
      var acts = el("div", "wd-acts");
      acts.appendChild(W.inviteButton(c, sp === "day" && x ? x.at : 0, note));
      box.appendChild(acts);
      box.appendChild(note);
    }
  }

  function render(d, sp) {
    shown = { d: d, sp: sp };
    loadFonts();
    var t = W.rank(Object.assign({}, d, { span: ofSpan(sp) }));
    var mine = (d.you || {}).c;
    shown.t = t;
    $("wt-date").textContent = words(d.d, ofSpan(sp));
    mineCard(d, t, sp);
    play();

    /* continents */
    var cl = $("wt-conts");
    cl.textContent = "";
    t.conts.forEach(function (x) {
      var li = el("li", x.ct === (d.you || {}).ct ? "me" : "");
      li.appendChild(el("span", "n", W.contName(x.ct)));
      var bar = el("span", "wd-bar"), fill = el("i", "");
      fill.style.width = Math.max(2, Math.min(100, x.s)) + "%";
      bar.appendChild(fill);
      li.appendChild(bar);
      li.appendChild(el("b", "", String(Math.round(x.s))));
      cl.appendChild(li);
    });
    $("wt-conts-card").hidden = t.conts.length < 2;

    /* the best scores: the top 10 (or all), and your country's row where it stands */
    var best = $("wt-best");
    best.textContent = "";
    var cut = all ? t.ranked.length : 10, meAt = 0;      // the top 10; "Show every country", all of them
    t.ranked.forEach(function (x) { if (x.c === mine) meAt = x.at; });
    t.ranked.slice(0, cut).forEach(function (x) { best.appendChild(row(x, x.at, mine, String(Math.round(x.s)), games(x.played))); });
    if (meAt > cut) {
      if (meAt > cut + 1) best.appendChild(gap());
      best.appendChild(row(t.ranked[meAt - 1], meAt, mine, String(Math.round(t.ranked[meAt - 1].s)), games(t.ranked[meAt - 1].played)));
    }
    $("wt-best-more").hidden = all || t.ranked.length <= 10;
    $("wt-best-note").textContent = t.ranked.length
      ? t.ranked.length + (t.ranked.length === 1 ? " country" : " countries") + " with " + t.min + " games or more. Score out of 100."
      : "No country has " + t.min + " games yet " + when(sp) + ". Yours could be the first.";
    $("wt-best-card").hidden = !t.rows.length;
    $("wt-share").hidden = !t.ranked.length;

    /* the most games played */
    var busy = $("wt-busy");
    busy.textContent = "";
    var max = t.busy.length ? t.busy[0].played : 1, busyAt = 0;
    t.busy.forEach(function (x, i) { if (x.c === mine) busyAt = i + 1; });
    var busyCut = allBusy ? t.busy.length : 10;
    t.busy.slice(0, busyCut).forEach(function (x, i) { busy.appendChild(row(x, i + 1, mine, W.commas(x.played), "", max)); });
    if (busyAt > busyCut) {
      if (busyAt > busyCut + 1) busy.appendChild(gap());
      busy.appendChild(row(t.busy[busyAt - 1], busyAt, mine, W.commas(t.busy[busyAt - 1].played), "", max));
    }
    $("wt-busy-more").hidden = allBusy || t.busy.length <= 10;
    $("wt-busy-card").hidden = !t.busy.length;

    var total = (d.n || 0) + (d.calls || 0);
    $("wt-foot").textContent = total
      ? W.commas(total) + (total === 1 ? " game" : " games") + " played " + when(sp) + ", in " + t.rows.length + (t.rows.length === 1 ? " country" : " countries") + "."
      : "Nobody has finished a game " + when(sp) + " yet.";
  }

  function load(sp) {
    span = sp;
    all = false;
    allBusy = false;
    ["day", "yday", "week", "month"].forEach(function (s) { $("tab-" + s).setAttribute("aria-selected", s === sp ? "true" : "false"); });
    var key = sp === "yday" ? W.shiftKey(today, -1) : today;
    $("wt-mine").textContent = "";
    $("wt-mine").appendChild(el("p", "wt-wait", "Counting the world…"));
    return W.call("world", { d: key, span: ofSpan(sp) }).then(function (r) {
      if (span !== sp) return;                      // another tab was tapped meanwhile
      if (r.status !== 200) { fail(); return; }
      render(r.data, sp);
    }, function () { if (span === sp) fail(); });
  }
  function fail() {
    shown = null;
    var box = $("wt-mine");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", "The world table can't be reached just now. Try again in a minute."));
    ["wt-conts-card", "wt-best-card", "wt-busy-card"].forEach(function (id) { $(id).hidden = true; });
  }

  /* ---------------- the picture you share: the top 10, the winner given the most room ----------------
     Drawn when the button is tapped, at once (fonts loaded beforehand), so the phone's share sheet still opens
     from the tap. 1080 by 1350, the shape the chat apps and Instagram show whole. */
  var EMO = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
  var GOLD = "#F6C445", INK = "#15172B";
  var fontsReady = null, flagsDraw = null;
  function loadFonts() {
    if (fontsReady || !(document.fonts && document.fonts.load)) return;
    fontsReady = Promise.all([
      document.fonts.load('800 80px "Bricolage Grotesque"'),
      document.fonts.load('800 40px "Figtree"'),
      document.fonts.load('700 40px "Figtree"'),
      document.fonts.load('600 34px "Figtree"')
    ]).catch(function () {});
  }
  /* whether this system draws flags (Windows writes two letters instead): Italy's in colour, or not */
  function canFlag() {
    if (flagsDraw !== null) return flagsDraw;
    flagsDraw = false;
    try {
      var c = document.createElement("canvas");
      c.width = c.height = 40;
      var x = c.getContext("2d");
      x.font = "32px " + EMO;
      x.textBaseline = "top";
      x.fillStyle = "#000000";
      x.fillText(W.flag("IT"), 2, 2);
      var p = x.getImageData(0, 0, 40, 40).data;
      for (var i = 0; i < p.length; i += 4) {
        if (p[i + 3] > 150 && (Math.abs(p[i] - p[i + 1]) > 60 || Math.abs(p[i + 1] - p[i + 2]) > 60)) { flagsDraw = true; break; }
      }
    } catch (e) { flagsDraw = false; }
    return flagsDraw;
  }
  function roundRect(x, l, t, w, h, r) {
    x.beginPath();
    x.moveTo(l + r, t);
    x.arcTo(l + w, t, l + w, t + h, r);
    x.arcTo(l + w, t + h, l, t + h, r);
    x.arcTo(l, t + h, l, t, r);
    x.arcTo(l, t, l + w, t, r);
    x.closePath();
  }
  /* the font at size, made smaller until text fits in w */
  function fit(x, text, weight, size, family, w, least) {
    x.font = weight + " " + size + "px " + family;
    while (x.measureText(text).width > w && size > (least || 20)) { size -= 2; x.font = weight + " " + size + "px " + family; }
    return size;
  }
  /* a flag at (l, middle) of height h; or, where flags aren't drawn, the country's two letters in a pill */
  function drawFlag(x, c, l, mid, h, light) {
    x.font = Math.round(h) + "px " + EMO;
    var fw = x.measureText(W.flag(c)).width;
    if (canFlag() && fw && fw < h * 1.6) {          // a code with no flag of its own comes out as two wide letters
      x.textAlign = "left";
      x.textBaseline = "middle";
      x.fillText(W.flag(c), l, mid + h * 0.04);
      x.textBaseline = "alphabetic";
      return Math.ceil(fw);
    }
    var w = Math.round(h * 1.3), ph = Math.round(h * 0.86);
    roundRect(x, l, mid - ph / 2, w, ph, ph * 0.22);
    x.fillStyle = light ? "rgba(21, 23, 43, .14)" : "rgba(255, 255, 255, .16)";
    x.fill();
    x.fillStyle = light ? INK : "#ffffff";
    x.font = "800 " + Math.round(h * 0.42) + "px " + F;
    x.textAlign = "center";
    x.fillText(c, l + w / 2, mid + h * 0.15);
    x.textAlign = "left";
    return w;
  }
  function crown(x, cx, cy, s) {           // a small crown, s wide
    x.beginPath();
    x.moveTo(cx - s / 2, cy + s * 0.3);
    x.lineTo(cx - s / 2, cy - s * 0.22);
    x.lineTo(cx - s / 4, cy + s * 0.02);
    x.lineTo(cx, cy - s * 0.34);
    x.lineTo(cx + s / 4, cy + s * 0.02);
    x.lineTo(cx + s / 2, cy - s * 0.22);
    x.lineTo(cx + s / 2, cy + s * 0.3);
    x.closePath();
    x.fill();
  }
  /* what the picture says of the table: "Friday 16 October", "Week of 12 October", "October 2026" */
  function period(key, sp) {
    var d = W.dateOf(key);
    if (!d) return "";
    if (sp === "month") return MONTHS[d.getMonth()] + " " + d.getFullYear();
    if (sp === "week") { var m = W.dateOf(monday(key)); return "Week of " + m.getDate() + " " + MONTHS[m.getMonth()]; }
    return dayWords(key);
  }
  function topLine(sp) {
    return sp === "month" ? "Top of the world this month" : sp === "week" ? "Top of the world this week" : sp === "yday" ? "Top of the world that day" : "Top of the world today";
  }
  function drawTable(d, t, sp) {
    var WD = 1080, HT = 1350, M = 72;
    var c = document.createElement("canvas");
    c.width = WD; c.height = HT;
    var x = c.getContext("2d");
    var bg = x.createLinearGradient(0, 0, 0, HT);
    bg.addColorStop(0, "#262B52");
    bg.addColorStop(1, "#0F1126");
    x.fillStyle = bg;
    x.fillRect(0, 0, WD, HT);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "800 46px " + FD;
    x.fillText("Logicers", M, 104);
    x.textAlign = "right";
    x.globalAlpha = 0.75;
    x.font = "700 36px " + F;
    x.fillText("World table", WD - M, 104);
    x.globalAlpha = 1;
    x.textAlign = "left";
    fit(x, period(d.d, sp), "800", 76, FD, WD - 2 * M, 40);
    x.fillText(period(d.d, sp), M - 3, 200);

    /* the winner */
    var w1 = t.ranked[0], top = 236, bh = 372;
    var g = x.createLinearGradient(0, top, 0, top + bh);
    g.addColorStop(0, "#FFD866");
    g.addColorStop(1, "#F2B33A");
    roundRect(x, M, top, WD - 2 * M, bh, 40);
    x.fillStyle = g;
    x.fill();
    x.fillStyle = INK;
    crown(x, M + 66, top + 64, 46);
    x.font = "800 30px " + F;
    x.fillText(topLine(sp).toUpperCase(), M + 104, top + 75);
    x.textAlign = "right";
    x.font = "800 30px " + F;
    x.fillText("1ST", WD - M - 44, top + 75);
    x.textAlign = "left";
    var fw = drawFlag(x, w1.c, M + 44, top + 178, 120, true);
    x.fillStyle = INK;
    var nl = M + 44 + fw + 30, nw = WD - M - 44 - nl;
    x.font = "700 40px " + F;
    x.fillText("Congratulations,", nl, top + 150);
    fit(x, W.countryName(w1.c) + "!", "800", 76, FD, nw, 36);
    x.fillText(W.countryName(w1.c) + "!", nl - 2, top + 226);
    /* its score, games and lead */
    x.fillStyle = "rgba(21, 23, 43, .12)";
    x.fillRect(M + 44, top + 266, WD - 2 * M - 88, 2);
    x.fillStyle = INK;
    var facts = [[String(Math.round(w1.s)), "points"], [W.commas(w1.played), w1.played === 1 ? "game" : "games"]];
    if (t.ranked[1]) {
      var lead = Math.round(w1.s - t.ranked[1].s);
      facts.push(lead >= 1 ? ["+" + lead, "ahead of 2nd"] : ["0", "just ahead"]);
    }
    var cw = (WD - 2 * M - 88) / 3;
    facts.forEach(function (f, i) {
      var l = M + 44 + i * cw;
      x.font = "800 58px " + FD;
      x.fillText(f[0], l, top + 336);
      var vw = x.measureText(f[0]).width;
      x.font = "700 30px " + F;
      x.fillText(f[1], l + vw + 12, top + 334);
    });

    /* 2nd to 10th */
    var rows = t.ranked.slice(1, 10), rh = 58, y0 = top + bh + 34;
    var RANK = ["#D9DEEC", "#E9A877"];
    rows.forEach(function (r, i) {
      var y = y0 + i * rh, mid = y + rh / 2;
      if (i) { x.fillStyle = "rgba(255, 255, 255, .09)"; x.fillRect(M, y, WD - 2 * M, 2); }
      x.textAlign = "center";
      x.fillStyle = RANK[i] || "rgba(255, 255, 255, .6)";
      x.font = "800 38px " + FD;
      x.fillText(String(r.at), M + 26, mid + 13);
      x.textAlign = "left";
      var w = drawFlag(x, r.c, M + 70, mid, 42, false);
      x.fillStyle = "#ffffff";
      var l = M + 70 + w + 18;
      fit(x, W.countryName(r.c), "700", 38, F, WD - M - 110 - l, 24);
      x.fillText(W.countryName(r.c), l, mid + 13);
      x.textAlign = "right";
      x.font = "800 42px " + FD;
      x.fillText(String(Math.round(r.s)), WD - M - 8, mid + 15);
      x.textAlign = "left";
    });

    /* the challenge */
    var total = (d.n || 0) + (d.calls || 0);
    x.fillStyle = "#ffffff";
    fit(x, "Can your country beat them?", "800", 62, FD, WD - 2 * M, 36);
    x.fillText("Can your country beat them?", M - 2, 1228);
    var where = TO.address() || "logicers.com";
    x.fillStyle = GOLD;
    x.font = "800 38px " + F;
    x.fillText(where + "/world", M, 1290);
    var pw = x.measureText(where + "/world").width;
    x.textAlign = "right";
    x.fillStyle = "rgba(255, 255, 255, .7)";
    var sum = W.commas(total) + (total === 1 ? " game, " : " games, ") + t.rows.length + (t.rows.length === 1 ? " country" : " countries");
    fit(x, sum, "600", 32, F, WD - 2 * M - pw - 30, 20);
    x.fillText(sum, WD - M, 1290);
    x.textAlign = "left";
    return c;
  }
  function shareText(d, t, sp) {
    var w1 = t.ranked[0], name = W.countryName(w1.c), mine = (d.you || {}).c, me = null;
    t.ranked.forEach(function (r) { if (r.c === mine) me = r; });
    var lines = [(sp === "yday" ? "🏆 " + name + " was top of the Logicers world table yesterday!" : "🏆 " + name + " is top of the Logicers world table " + when(sp) + "!")];
    t.ranked.slice(0, 3).forEach(function (r) { lines.push(r.at + ". " + W.flag(r.c) + " " + W.countryName(r.c) + " " + Math.round(r.s)); });
    if (me && me.at > 3) lines.push("…" + me.at + ". " + W.flag(me.c) + " " + W.countryName(me.c) + " " + Math.round(me.s));
    lines.push("Can your country beat them? " + W.tableUrl());
    return lines.join("\n");
  }
  function fileName(d, sp) {
    var k = String(sp === "week" ? monday(d.d) : d.d), day = k.slice(0, 4) + "-" + k.slice(4, 6) + "-" + k.slice(6, 8);
    return "logicers-world-" + (sp === "month" ? day.slice(0, 7) : sp === "week" ? "week-" + day : day) + ".png";
  }
  function blobOf(url) {
    var b = window.atob(url.split(",")[1]), a = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    return new Blob([a], { type: "image/png" });
  }
  var shareUrl = null;
  $("wt-share").addEventListener("click", function () {
    if (!shown || !shown.t || !shown.t.ranked.length) return;
    var d = shown.d, t = shown.t, sp = shown.sp, url = "", blob = null, text = shareText(d, t, sp);
    try { url = drawTable(d, t, sp).toDataURL("image/png"); blob = blobOf(url); } catch (e) { url = ""; blob = null; }
    TO.count("world/share");
    TO.share({ blob: blob, filename: fileName(d, sp), text: text }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (shareUrl) { window.URL.revokeObjectURL(shareUrl); shareUrl = null; }
      if (blob) {
        shareUrl = window.URL.createObjectURL(blob);
        img.src = url; img.hidden = false;
        save.href = shareUrl; save.hidden = false;
        save.setAttribute("download", fileName(d, sp));
      } else { img.hidden = true; save.hidden = true; }
      $("share-copied").textContent = "";
      $("share-copy").onclick = function () {
        TO.copyText(text).then(function (ok) {
          $("share-copied").textContent = ok ? "Copied. Paste it into a chat or a post." : "Copying did not work here. The link is: " + W.tableUrl();
        });
      };
      TO.openDialog($("dlg-share"));
    });
  });

  $("tab-day").addEventListener("click", function () { load("day"); });
  $("tab-yday").addEventListener("click", function () { load("yday"); });
  $("tab-week").addEventListener("click", function () { load("week"); });
  $("tab-month").addEventListener("click", function () { load("month"); });
  $("wt-best-more").addEventListener("click", function () { all = true; if (shown) render(shown.d, shown.sp); });
  $("wt-busy-more").addEventListener("click", function () { allBusy = true; if (shown) render(shown.d, shown.sp); });

  play();
  if (!W.on()) {
    var box = $("wt-mine");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", "The world table is not switched on here."));
    return;
  }
  /* today's games not yet counted go first, so your own country already holds them */
  W.flushBoth(today).then(function () { return load("day"); }, function () { return load("day"); });
})();
