/* A country's team page (19 Oct 2026, Khayyam: "a country like a team, that sends the sense of unity").
   Not a new place for data: it reads what the server already counts, by country (the World table's own days, the
   week and the month, and since today the games one by one and the reactions), and keeps nothing of the visitor.
   Everything on it comes from four calls: /stats/world (the day, yesterday, the week, the month: the places) and
   /stats/team (the day game by game, the feelings, the records). The one thing kept on the server for this page
   is each country's biggest day, a small record of its own (tally.js, "rec").
   Opened by one click from the World table (the button's other half, or any country's name), and from the
   links people share: team/?c=IT, and team/?c=IT&v=DE for a face-off with a rival.
   Nothing is typed anywhere, so there is nothing to moderate. */
(function () {
  "use strict";

  var TO = window.TurnsOut, W = window.LogicersWorld;
  function $(id) { return document.getElementById(id); }
  if (!TO || !W) return;
  var el = W.el;
  TO.wireDialogs();
  TO.fixLocalLinks();

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var CC = /^[A-Z]{2}$/;
  var today = W.todayKey(), yesterday = W.shiftKey(today, -1);
  var q = new window.URLSearchParams(window.location.search);
  function codeOf(v) { v = String(v || "").toUpperCase(); return CC.test(v) ? v : ""; }
  var homeC = (function () { var c = TO.worldStore().home; return codeOf(c); })();
  var S = { c: codeOf(q.get("c")), v: codeOf(q.get("v")), day: null, yday: null, week: null, month: null, team: null, vteam: null, rec: null, you: "" };
  var BEST_MIN = 3;                        // a game must have this many of the team's results to be called one of its best
  var FEEL_MIN = 5;                        // and the feelings show from this many taps

  function games(n) { return W.commas(n) + (n === 1 ? " game" : " games"); }
  function dayLabel(key) {
    var d = W.dateOf(key);
    return d ? d.getDate() + " " + MONTHS[d.getMonth()] + (d.getFullYear() !== new Date().getFullYear() ? " " + d.getFullYear() : "") : "";
  }
  function show(id, on) { $(id).hidden = !on; }
  function rowOf(t, c) { var x = null; if (t) t.rows.forEach(function (r) { if (r.c === c) x = r; }); return x; }
  function tableOf(d, sp) { return d ? W.rank(Object.assign({}, d, { span: sp })) : null; }
  function done(r) { return r && r.status === 200 && r.data; }

  /* ---------------- what each part of the page says ---------------- */
  function hero() {
    var box = $("tm-hero"), c = S.c, name = W.countryName(c);
    box.textContent = "";
    if (!name) {
      box.appendChild(el("p", "wt-mine-line", "Pick a country from the World table to see its team."));
      var a = el("a", "wt-more");
      a.href = TO.here("../world/");
      a.textContent = "Open the World table";
      box.appendChild(a);
      return;
    }
    var top = el("div", "tm-top");
    var f = el("span", "wt-bigflag", W.flag(c));
    f.setAttribute("aria-hidden", "true");
    top.appendChild(f);
    var nm = el("div", "tm-name");
    nm.appendChild(el("b", "", name));
    nm.appendChild(el("span", "", c === homeC || c === S.you ? "Your team" : "Team " + name));
    top.appendChild(nm);
    box.appendChild(top);

    var t = {
      day: tableOf(S.day, "day"), week: tableOf(S.week, "week"), month: tableOf(S.month, "month")
    };
    var places = el("div", "tm-places");
    [["Today", "day"], ["Week", "week"], ["Month", "month"]].forEach(function (p) {
      var tb = t[p[1]], x = rowOf(tb, c), card = el("div", "tm-place");
      card.appendChild(el("span", "", p[0]));
      if (!tb) { card.appendChild(el("b", "", "…")); card.appendChild(el("small", "", "")); }
      else if (x && x.at) { card.appendChild(el("b", "", W.nth(x.at))); card.appendChild(el("small", "", "of " + tb.ranked.length)); }
      else { card.appendChild(el("b", "", "–")); card.appendChild(el("small", "", x ? Math.max(1, tb.min - x.n) + " games to place" : tb.min + " games to place")); }
      places.appendChild(card);
    });
    box.appendChild(places);

    /* one plain line: how the day is going */
    var x = rowOf(t.day, c), line = el("p", "tm-line");
    if (!S.day) line.textContent = "";
    else if (x && x.at === 1) line.textContent = "Top of the world today!";
    else if (x && x.at) {
      var above = t.day.ranked[x.at - 2], diff = Math.max(1, Math.round(above.s - x.s));
      line.textContent = diff + (diff === 1 ? " point" : " points") + " behind " + W.flag(above.c) + " " + W.countryName(above.c) + " today.";
    } else if (x && x.played) line.textContent = Math.max(1, t.day.min - x.n) + " more games and " + name + " takes a place on today's table.";
    else line.textContent = "No games from " + name + " yet today.";
    if (line.textContent) box.appendChild(line);
  }

  /* the team bar: how far today's games fill it, and how today compares with yesterday (the whole of it) */
  function bar() {
    var c = S.c, x = rowOf(tableOf(S.day, "day"), c);
    if (!S.day || !W.countryName(c)) { show("tm-bar-card", false); return; }
    var played = x ? x.played : 0, full = W.BONUS.full.day, y = rowOf(tableOf(S.yday, "day"), c), before = y ? y.played : 0;
    var pc = Math.min(100, Math.round(100 * played / full));
    $("tm-bar").firstChild.style.width = pc + "%";
    $("tm-bar").setAttribute("aria-label", games(played) + " of " + W.commas(full) + " today");
    var words = games(played) + " of " + W.commas(full) + " today. The bar adds " + (x ? Math.round(x.bonus) : 0) + " of 25 points to the score.";
    var cmp = "";
    if (S.yday) {
      if (!before && !played) cmp = "";
      else if (played > before) cmp = " Already " + W.commas(played - before) + " more than all of yesterday (" + W.commas(before) + ").";
      else if (played === before) cmp = " Level with all of yesterday (" + W.commas(before) + ").";
      else cmp = " Yesterday it was " + W.commas(before) + ": " + W.commas(before - played) + " more to match it.";
    }
    $("tm-bar-note").textContent = words + cmp;
    show("tm-bar-card", true);
  }

  /* the games the team did best at, against the world's average in the same game (at least BEST_MIN results) */
  function best() {
    var tm = S.team && S.team[S.c], w = S.team && S.team.world;
    if (!tm || !w) { show("tm-best-card", false); return; }
    var list = [];
    TO.GAMES.forEach(function (G) {
      if (G.key === "call") return;
      var a = tm.g[G.key], b = w.g[G.key];
      if (!a || !b || a[0] < BEST_MIN || !b[0]) return;
      list.push({ G: G, n: a[0], d: a[1] / a[0] - b[1] / b[0] });
    });
    list.sort(function (x, y) { return y.d - x.d || y.n - x.n; });
    var ol = $("tm-best");
    ol.textContent = "";
    list.slice(0, 3).forEach(function (x, i) {
      var li = el("li", "");
      li.setAttribute("data-g", x.G.key);
      var at = el("span", "at");
      at.appendChild(el("i", "dot"));
      li.appendChild(at);
      var who = el("span", "who", x.G.name);
      who.appendChild(el("small", "", games(x.n)));
      li.appendChild(who);
      var val = el("span", "val");
      var r = Math.round(x.d);
      val.appendChild(el("b", "", (r > 0 ? "+" : r < 0 ? "−" : "±") + Math.abs(r)));
      li.appendChild(val);
      ol.appendChild(li);
    });
    $("tm-best-note").textContent = list.length ? "Points above (+) or below (−) the world's average in that game." : "A game shows here once the team has " + BEST_MIN + " results in it today.";
    show("tm-best-card", true);
  }

  function sum3(a) { return a ? a[0] + a[1] + a[2] : 0; }
  function feelOf(map) {
    var t = [0, 0, 0];
    Object.keys(map || {}).forEach(function (k) { for (var i = 0; i < 3; i++) t[i] += map[k][i] || 0; });
    return t;
  }
  /* how the team felt about today's games: its share of each of the three feelings, the world's under it */
  function feel() {
    var tm = S.team && S.team[S.c];
    if (!tm) { show("tm-feel-card", false); return; }
    var a = feelOf(tm.x), w = feelOf(S.team.world.x), ta = sum3(a), tw = sum3(w);
    if (ta < FEEL_MIN) { show("tm-feel-card", false); return; }
    var top = 0;
    for (var i = 1; i < 3; i++) if (a[i] > a[top]) top = i;
    var box = $("tm-feel");
    box.textContent = "";
    W.FEEL.forEach(function (f, i) {
      var c = el("div", "tm-f" + (i === top ? " top" : ""));
      c.appendChild(el("span", "e", f.e));
      c.appendChild(el("b", "", Math.round(100 * a[i] / ta) + "%"));
      c.appendChild(el("small", "", tw >= FEEL_MIN ? "world " + Math.round(100 * w[i] / tw) + "%" : f.t));
      box.appendChild(c);
    });
    $("tm-feel-note").textContent = W.countryName(S.c) + " found today's games mostly " + W.FEEL[top].w + ". From " + W.commas(ta) + " taps on the end card.";
    show("tm-feel-card", true);
  }

  /* the biggest day the team has had, kept by the server as a record of its own */
  function recWords(r) {
    return r ? games(r[0]) + " on " + dayLabel(r[1]) : "";
  }
  function record() {
    var r = S.rec && S.rec[S.c];
    if (!r) { show("tm-rec-card", false); return; }
    var x = rowOf(tableOf(S.day, "day"), S.c), played = x ? x.played : 0, p = $("tm-rec");
    p.textContent = "";
    p.appendChild(el("b", "", recWords(r)));
    if (S.day && r[1] !== today) p.appendChild(document.createTextNode(". Today it is at " + W.commas(played) + (played >= r[0] ? ": a new record!" : ", " + W.commas(r[0] - played) + " to go.")));
    else if (r[1] === today) p.appendChild(document.createTextNode(": today's a record day so far!"));
    var wr = S.rec["**"];
    if (wr) p.appendChild(document.createTextNode(" The whole world's best day: " + recWords(wr) + "."));
    show("tm-rec-card", true);
  }

  /* ---------------- the buttons: invite, room, play ---------------- */
  var ROOM_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="7" cy="7.2" r="2.9" fill="currentColor"/><circle cx="13.6" cy="8.2" r="2.4" fill="currentColor" opacity=".55"/><path d="M1.8 16.4c.4-3 2.5-4.7 5.2-4.7s4.8 1.7 5.2 4.7z" fill="currentColor"/><path d="M12.4 16.4c-.2-1.6-.8-2.9-1.8-3.8.9-.6 1.9-.9 3-.9 2.3 0 4.1 1.5 4.6 4.7z" fill="currentColor" opacity=".55"/></svg>';
  $("tm-play").addEventListener("click", function () { TO.count("team/play"); });
  function inRoom() { try { return TO.roomsStore().list.some(function (r) { return r && typeof r.code === "string"; }); } catch (e) { return false; } }
  function actions() {
    var c = S.c, name = W.countryName(c);
    if (!name) { show("tm-acts", false); return; }
    var n = TO.GAMES.filter(TO.playedToday).length, N = TO.GAMES.length, own = c === homeC || c === S.you;
    var duo = $("tm-duo");
    duo.textContent = "";
    var x = rowOf(tableOf(S.day, "day"), c);
    var note = $("tm-note");
    var inv = W.inviteButton(c, x && x.at ? x.at : 0, note, "wt-duo-inv");
    inv.textContent = "";
    inv.appendChild(el("span", "wt-long", "Invite friends from " + name));
    inv.appendChild(el("span", "wt-short", "Invite friends"));
    duo.appendChild(inv);
    var mine = inRoom(), a = el("a", "wt-duo-room");
    a.href = TO.here("../room/");
    a.insertAdjacentHTML("beforeend", ROOM_ICON);
    a.appendChild(el("span", "", mine ? "Your room" : "Start a room"));
    a.addEventListener("click", function () { TO.count(mine ? "team/room" : "team/room-new"); });
    duo.appendChild(a);
    $("tm-play-kicker").textContent = n === N ? "All " + N + " played today" : n + " of " + N + " played today";
    $("tm-play").querySelector("b").textContent = own ? "Play for " + name : "Play today's games";
    show("tm-acts", true);
    duo.hidden = !own;                       // inviting friends "from Italy" is for Italians; a visitor can still play
    fit();
  }
  function fit() {
    Array.prototype.forEach.call(document.querySelectorAll(".wt-duo-inv"), function (b) {
      b.classList.remove("tight");
      var long = b.querySelector(".wt-long");
      if (long && (long.scrollWidth > long.clientWidth + 1 || b.scrollWidth > b.clientWidth + 1)) b.classList.add("tight");
    });
  }
  window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit, function () {});

  /* ---------------- the face-off with a rival ---------------- */
  function pickRival() {
    var sel = $("tm-rival"), t = tableOf(S.day, "day"), list = [], seen = {};
    sel.textContent = "";
    var first = el("option", "", "Choose a country");
    first.value = "";
    sel.appendChild(first);
    if (t) t.rows.forEach(function (r) { if (r.c !== S.c && W.countryName(r.c)) { list.push(r.c); seen[r.c] = 1; } });
    if (S.v && !seen[S.v] && W.countryName(S.v)) list.push(S.v);
    list.sort(function (a, b) { return W.countryName(a) < W.countryName(b) ? -1 : 1; });
    list.forEach(function (c) {
      var o = el("option", "", W.flag(c) + " " + W.countryName(c));
      o.value = c;
      sel.appendChild(o);
    });
    sel.value = S.v && W.countryName(S.v) ? S.v : "";
    show("tm-vs-card", !!W.countryName(S.c) && !!S.day);
  }
  /* the two teams, side by side: what each row says and who is ahead */
  function duel() {
    var box = $("tm-vs"), v = S.v;
    box.textContent = "";
    if (!v || v === S.c || !W.countryName(v) || !S.day) { box.hidden = true; show("tm-vs-share", false); return null; }
    var t = tableOf(S.day, "day"), a = rowOf(t, S.c), b = rowOf(t, v);
    var ra = S.rec && S.rec[S.c], rb = S.rec && S.rec[v];
    var rows = [
      ["Place today", a && a.at ? W.nth(a.at) : "–", b && b.at ? W.nth(b.at) : "–", a && a.at ? -a.at : null, b && b.at ? -b.at : null],
      ["Score", a && a.at ? String(Math.round(a.s)) : "–", b && b.at ? String(Math.round(b.s)) : "–", a && a.at ? a.s : null, b && b.at ? b.s : null],
      ["Games today", W.commas(a ? a.played : 0), W.commas(b ? b.played : 0), a ? a.played : 0, b ? b.played : 0],
      ["Record day", ra ? W.commas(ra[0]) : "–", rb ? W.commas(rb[0]) : "–", ra ? ra[0] : null, rb ? rb[0] : null]
    ];
    function head(c) {
      var h = el("div", "h");
      h.appendChild(W.flagEl(c));
      h.appendChild(document.createTextNode(W.countryName(c)));
      return h;
    }
    box.appendChild(head(S.c));
    box.appendChild(el("div", "k"));
    box.appendChild(head(v));
    rows.forEach(function (r) {
      var wa = r[3] !== null && r[4] !== null && r[3] > r[4], wb = r[3] !== null && r[4] !== null && r[4] > r[3];
      box.appendChild(el("div", "v" + (wa ? " win" : ""), r[1]));
      box.appendChild(el("div", "k t", r[0]));
      box.appendChild(el("div", "v" + (wb ? " win" : ""), r[2]));
    });
    box.hidden = false;
    show("tm-vs-share", true);
    return { rows: rows, a: a, b: b };
  }
  $("tm-rival").addEventListener("change", function () {
    S.v = codeOf($("tm-rival").value);
    S.vteam = null;
    try { window.history.replaceState(null, "", "?c=" + S.c + (S.v ? "&v=" + S.v : "")); } catch (e) { /* the address just stays */ }
    TO.count(S.v ? "team/rival" : "team/rival-none");
    duel();
    if (S.v) {
      W.call("team", { d: today, c: S.c, c2: S.v }).then(function (r) {
        if (done(r) && S.v === r.data.c2) { S.rec = r.data.rec; S.vteam = r.data.team; record(); duel(); }
      }, function () { /* the face-off just keeps what it has */ });
    }
  });

  /* ---------------- the picture you share ---------------- */
  var EMO = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
  var GOLD = "#F6C445", INK = "#15172B", flagsDraw = null, fontsReady = null;
  function loadFonts() {
    if (fontsReady || !(document.fonts && document.fonts.load)) return;
    fontsReady = Promise.all([
      document.fonts.load('800 80px "Bricolage Grotesque"'), document.fonts.load('800 40px "Figtree"'),
      document.fonts.load('700 40px "Figtree"'), document.fonts.load('600 34px "Figtree"')
    ]).catch(function () {});
  }
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
  function fitText(x, text, weight, size, family, w, least) {
    x.font = weight + " " + size + "px " + family;
    while (x.measureText(text).width > w && size > (least || 20)) { size -= 2; x.font = weight + " " + size + "px " + family; }
    return size;
  }
  function drawFlag(x, c, l, mid, h) {
    x.font = Math.round(h) + "px " + EMO;
    var fw = x.measureText(W.flag(c)).width;
    if (canFlag() && fw && fw < h * 1.6) {
      x.textAlign = "left"; x.textBaseline = "middle";
      x.fillText(W.flag(c), l, mid + h * 0.04);
      x.textBaseline = "alphabetic";
      return Math.ceil(fw);
    }
    var w = Math.round(h * 1.3), ph = Math.round(h * 0.86);
    roundRect(x, l, mid - ph / 2, w, ph, ph * 0.22);
    x.fillStyle = "rgba(255, 255, 255, .16)";
    x.fill();
    x.fillStyle = "#ffffff";
    x.font = "800 " + Math.round(h * 0.42) + "px " + F;
    x.textAlign = "center";
    x.fillText(c, l + w / 2, mid + h * 0.15);
    x.textAlign = "left";
    return w;
  }
  function canvas() {
    var c = document.createElement("canvas");
    c.width = 1080; c.height = 1350;
    var x = c.getContext("2d");
    var bg = x.createLinearGradient(0, 0, 0, 1350);
    bg.addColorStop(0, "#262B52");
    bg.addColorStop(1, "#0F1126");
    x.fillStyle = bg;
    x.fillRect(0, 0, 1080, 1350);
    x.textBaseline = "alphabetic";
    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "800 46px " + FD;
    x.fillText("Logicers", 72, 104);
    return { c: c, x: x };
  }
  function footer(x, ask, link) {
    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    fitText(x, ask, "800", 62, FD, 936, 36);
    x.fillText(ask, 70, 1228);
    x.fillStyle = GOLD;
    x.font = "800 38px " + F;
    var where = TO.address() || "logicers.com";
    var line = where + link;
    fitText(x, line, "800", 38, F, 936, 22);
    x.fillText(line, 72, 1290);
  }
  function drawTeam() {
    var o = canvas(), x = o.x, c = S.c, t = tableOf(S.day, "day"), r = rowOf(t, c);
    x.textAlign = "right"; x.globalAlpha = 0.75; x.font = "700 36px " + F;
    x.fillText("Team page", 1008, 104);
    x.globalAlpha = 1; x.textAlign = "left";
    x.fillStyle = "#ffffff";
    fitText(x, dayLabel(today), "800", 76, FD, 936, 40);
    x.fillText(dayLabel(today), 69, 200);
    /* the team */
    var top = 236, h = 330, g = x.createLinearGradient(0, top, 0, top + h);
    g.addColorStop(0, "#FFD866"); g.addColorStop(1, "#F2B33A");
    roundRect(x, 72, top, 936, h, 40);
    x.fillStyle = g; x.fill();
    var fw = drawFlag(x, c, 116, top + 130, 130);
    x.fillStyle = INK;
    var nl = 116 + fw + 30, nw = 1008 - 44 - nl;
    x.font = "700 40px " + F;
    x.fillText("Team", nl, top + 104);
    fitText(x, W.countryName(c), "800", 84, FD, nw, 36);
    x.fillText(W.countryName(c), nl - 2, top + 188);
    x.fillStyle = "rgba(21, 23, 43, .12)";
    x.fillRect(116, top + 232, 848, 2);
    x.fillStyle = INK;
    var facts = [[r && r.at ? W.nth(r.at) : "–", "today"], [W.commas(r ? r.played : 0), "games"], [r && r.at ? String(Math.round(r.s)) : "–", "points"]];
    var cw = 848 / 3;
    facts.forEach(function (f, i) {
      var l = 116 + i * cw;
      fitText(x, f[0], "800", 58, FD, cw * 0.62, 34);
      x.fillText(f[0], l, top + 296);
      var vw = x.measureText(f[0]).width;
      fitText(x, f[1], "700", 30, F, cw - vw - 26, 18);
      x.fillText(f[1], l + vw + 12, top + 294);
    });
    /* the places, the team bar, the best game, the record */
    var wk = rowOf(tableOf(S.week, "week"), c), mo = rowOf(tableOf(S.month, "month"), c);
    var played = r ? r.played : 0, full = W.BONUS.full.day;
    var lines = [];
    lines.push(["This week", wk && wk.at ? W.nth(wk.at) : "–"]);
    lines.push(["This month", mo && mo.at ? W.nth(mo.at) : "–"]);
    var tm = S.team && S.team[c], bestG = null;
    if (tm && S.team.world) TO.GAMES.forEach(function (G) {
      var a = tm.g[G.key], b = S.team.world.g[G.key];
      if (G.key === "call" || !a || !b || a[0] < BEST_MIN || !b[0]) return;
      var d = a[1] / a[0] - b[1] / b[0];
      if (!bestG || d > bestG.d) bestG = { name: G.name, d: d };
    });
    if (bestG) lines.push(["Best game today", bestG.name + " (" + (bestG.d >= 0 ? "+" : "−") + Math.abs(Math.round(bestG.d)) + ")"]);
    var rec = S.rec && S.rec[c];
    if (rec) lines.push(["Record day", games(rec[0])]);
    var y0 = top + h + 64;
    lines.forEach(function (ln, i) {
      var y = y0 + i * 84;
      if (i) { x.fillStyle = "rgba(255, 255, 255, .09)"; x.fillRect(72, y - 54, 936, 2); }
      x.fillStyle = "rgba(255, 255, 255, .7)";
      x.textAlign = "left"; x.font = "700 36px " + F;
      x.fillText(ln[0], 72, y);
      x.fillStyle = "#ffffff"; x.textAlign = "right";
      fitText(x, ln[1], "800", 44, FD, 560, 26);
      x.fillText(ln[1], 1008, y + 2);
    });
    x.textAlign = "left";
    /* the bar */
    var by = y0 + lines.length * 84 - 30;
    roundRect(x, 72, by, 936, 26, 13);
    x.fillStyle = "rgba(255, 255, 255, .14)"; x.fill();
    var bw = Math.max(26, 936 * Math.min(1, played / full));
    if (played) { roundRect(x, 72, by, bw, 26, 13); x.fillStyle = GOLD; x.fill(); }
    x.fillStyle = "rgba(255, 255, 255, .7)";
    x.font = "600 30px " + F;
    x.fillText("Team bar: " + W.commas(played) + " of " + W.commas(full) + " games", 72, by + 70);
    footer(x, "Can your country beat us?", "/team/?c=" + c);
    return o.c;
  }
  function drawDuel(d) {
    var o = canvas(), x = o.x;
    x.textAlign = "right"; x.globalAlpha = 0.75; x.font = "700 36px " + F;
    x.fillText("Face-off", 1008, 104);
    x.globalAlpha = 1; x.textAlign = "left";
    x.fillStyle = "#ffffff";
    fitText(x, dayLabel(today), "800", 76, FD, 936, 40);
    x.fillText(dayLabel(today), 69, 200);
    var cs = [S.c, S.v], i;
    for (i = 0; i < 2; i++) {
      var left = i === 0, cx = left ? 72 : 560, w = 448;
      roundRect(x, cx, 240, w, 330, 36);
      x.fillStyle = left ? "#FFD866" : "rgba(255, 255, 255, .12)";
      x.fill();
      x.fillStyle = left ? INK : "#ffffff";
      var fw = drawFlag(x, cs[i], cx + 36, 340, 110);
      void fw;
      x.textAlign = "left";
      fitText(x, W.countryName(cs[i]), "800", 54, FD, w - 72, 28);
      x.fillText(W.countryName(cs[i]), cx + 36, 470);
    }
    x.textAlign = "center"; x.fillStyle = GOLD;
    x.font = "800 40px " + FD;
    x.fillText("vs", 540, 420);
    var y0 = 664;
    d.rows.forEach(function (r, k) {
      var y = y0 + k * 120;
      x.fillStyle = "rgba(255, 255, 255, .09)"; x.fillRect(72, y - 78, 936, 2);
      x.fillStyle = "rgba(255, 255, 255, .7)"; x.textAlign = "center";
      x.font = "700 32px " + F;
      x.fillText(r[0], 540, y - 20);
      var wa = r[3] !== null && r[4] !== null && r[3] > r[4], wb = r[3] !== null && r[4] !== null && r[4] > r[3];
      x.font = "800 64px " + FD;
      x.fillStyle = wa ? GOLD : "#ffffff"; x.textAlign = "left";
      fitText(x, r[1], "800", 64, FD, 300, 30);
      x.fillText(r[1], 90, y + 40);
      x.fillStyle = wb ? GOLD : "#ffffff"; x.textAlign = "right";
      fitText(x, r[2], "800", 64, FD, 300, 30);
      x.fillText(r[2], 990, y + 40);
    });
    x.textAlign = "left";
    footer(x, "Which side are you on?", "/team/?c=" + S.c + "&v=" + S.v);
    return o.c;
  }
  function blobOf(url) {
    var b = window.atob(url.split(",")[1]), a = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    return new Blob([a], { type: "image/png" });
  }
  var shareUrl = null;
  function shareThis(face) {
    if (!S.day || !W.countryName(S.c)) return;
    var d = face ? duel() : null;
    if (face && !d) return;
    var name = W.countryName(S.c), t = tableOf(S.day, "day"), r = rowOf(t, S.c), text, url = "", blob = null;
    if (face) {
      var vn = W.countryName(S.v), b = d.b;
      text = W.flag(S.c) + " " + name + " vs " + W.flag(S.v) + " " + vn + " on Logicers today: " +
        (d.a && d.a.at ? W.nth(d.a.at) : "no place yet") + " against " + (b && b.at ? W.nth(b.at) : "no place yet") + ". Which side are you on? " + W.teamUrl(S.c, S.v);
    } else {
      text = W.flag(S.c) + " " + name + " " + (r && r.at ? "is " + W.nth(r.at) + " on the Logicers world table today" : "is playing the Logicers daily games today") +
        ", with " + games(r ? r.played : 0) + " so far. Can your country beat us? " + W.teamUrl(S.c);
    }
    loadFonts();
    try { url = (face ? drawDuel(d) : drawTeam()).toDataURL("image/png"); blob = blobOf(url); } catch (e) { url = ""; blob = null; }
    TO.count(face ? "team/share-duel" : "team/share");
    var file = "logicers-" + (face ? "faceoff-" + S.c + "-" + S.v : "team-" + S.c) + "-" + today + ".png";
    $("share-title").textContent = face ? "Share the face-off" : "Share the team";
    TO.share({ blob: blob, filename: file, text: text }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (shareUrl) { window.URL.revokeObjectURL(shareUrl); shareUrl = null; }
      if (blob) {
        shareUrl = window.URL.createObjectURL(blob);
        img.src = url; img.hidden = false;
        save.href = shareUrl; save.hidden = false;
        save.setAttribute("download", file);
      } else { img.hidden = true; save.hidden = true; }
      $("share-copied").textContent = "";
      $("share-copy").onclick = function () {
        TO.copyText(text).then(function (ok) {
          $("share-copied").textContent = ok ? "Copied. Paste it into a chat or a post." : "Copying did not work here. The link is: " + W.teamUrl(S.c, face ? S.v : "");
        });
      };
      TO.openDialog($("dlg-share"));
    });
  }
  $("tm-share").addEventListener("click", function () { shareThis(false); });
  $("tm-vs-share").addEventListener("click", function () { shareThis(true); });

  /* ---------------- putting it together ---------------- */
  function foot() {
    var d = S.day, total = d ? (d.n || 0) + (d.calls || 0) : 0, name = W.countryName(S.c);
    $("tm-foot").textContent = d && name && W.on()
      ? "Counted from every game finished on Logicers today, " + W.commas(total) + " in all. Nobody's name is kept, only the country."
      : "";
  }
  function paint() {
    $("tm-date").textContent = dayLabel(today);
    hero();
    if (!W.countryName(S.c)) {
      ["tm-acts", "tm-bar-card", "tm-best-card", "tm-feel-card", "tm-rec-card", "tm-vs-card", "tm-share-row"].forEach(function (id) { show(id, false); });
      return;
    }
    bar(); best(); feel(); record(); actions(); pickRival(); duel();
    show("tm-share-row", !!S.day);
    foot();
    document.title = W.countryName(S.c) + " team page | Logicers";
  }
  function fail(why) {
    var box = $("tm-hero");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", why || "The team page can't be reached just now. Try again in a minute."));
  }

  if (!W.on()) { fail("The team pages are not switched on here."); return; }
  loadFonts();
  W.flushBoth(today).then(function () {}, function () {}).then(function () {
    return W.call("world", { d: today, span: "day" });
  }).then(function (r) {
    if (!done(r)) { fail(); return; }
    S.day = r.data;
    S.you = codeOf(r.data.you && r.data.you.c);
    if (!S.c) S.c = homeC || S.you;
    if (S.c === S.you && S.you) { try { TO.worldUpdate(function (w) { w.home = S.you; }); } catch (e) { /* kept for the button only */ } }
    paint();
    if (!W.countryName(S.c)) return;
    /* the rest arrive when they arrive; each repaints the page */
    var jobs = [
      W.call("world", { d: yesterday, span: "day" }).then(function (x) { if (done(x)) S.yday = x.data; }),
      W.call("world", { d: today, span: "week" }).then(function (x) { if (done(x)) S.week = x.data; }),
      W.call("world", { d: today, span: "month" }).then(function (x) { if (done(x)) S.month = x.data; }),
      W.call("team", { d: today, c: S.c, c2: S.v || undefined }).then(function (x) { if (done(x)) { S.team = x.data.team; S.rec = x.data.rec; S.vteam = x.data.team; } })
    ];
    jobs.forEach(function (j) { j.then(paint, function () { /* that part simply stays out */ }); });
  }, function () { fail(); });
})();
