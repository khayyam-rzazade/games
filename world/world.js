/* The World table (16 Oct 2026): which country plays the daily games best, today, yesterday and this month.
   Everything comes from the server's summary of a date or a month (/stats/world, server/live/src/tally.js),
   ranked here by assets/js/world.js (LogicersWorld.rank): a country's score is its players' average points,
   made fair across games by the server, pulled toward the world's average while it has few games, plus a small
   bonus for how many games it played (16 Oct 2026). */
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

  function words(key, sp) {
    var d = W.dateOf(key);
    if (!d) return "";
    if (sp === "month") return MONTHS[d.getMonth()] + " " + d.getFullYear() + ", up to today";
    return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()];
  }
  function when(sp) { return sp === "month" ? "this month" : sp === "yday" ? "yesterday" : "today"; }

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
    nm.appendChild(el("span", "", sp === "month" ? "Your country this month" : sp === "yday" ? "Your country yesterday" : "Your country today"));
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
    var t = W.rank(Object.assign({}, d, { span: sp === "month" ? "month" : "day" }));
    var mine = (d.you || {}).c;
    $("wt-date").textContent = words(d.d, sp === "month" ? "month" : "day");
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

    /* the best scores: the top 20 (or all), and your country's row where it stands */
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
    ["day", "yday", "month"].forEach(function (s) { $("tab-" + s).setAttribute("aria-selected", s === sp ? "true" : "false"); });
    var key = sp === "yday" ? W.shiftKey(today, -1) : today;
    $("wt-mine").textContent = "";
    $("wt-mine").appendChild(el("p", "wt-wait", "Counting the world…"));
    return W.call("world", { d: key, span: sp === "month" ? "month" : "day" }).then(function (r) {
      if (span !== sp) return;                      // another tab was tapped meanwhile
      if (r.status !== 200) { fail(); return; }
      render(r.data, sp);
    }, function () { if (span === sp) fail(); });
  }
  function fail() {
    var box = $("wt-mine");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", "The world table can't be reached just now. Try again in a minute."));
    ["wt-conts-card", "wt-best-card", "wt-busy-card"].forEach(function (id) { $(id).hidden = true; });
  }

  $("tab-day").addEventListener("click", function () { load("day"); });
  $("tab-yday").addEventListener("click", function () { load("yday"); });
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
