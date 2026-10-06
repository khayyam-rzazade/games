/* One of 193: a game for one phone and a group. The phone hides one of the 193 UN member states; the table asks it
   yes-or-no questions from a menu, sees after each answer how many countries are still possible, and guesses.
   At the end: the country, how few questions would have been enough, and three true facts with their sources.
   Not daily: no day number, no streak, no album. The table's best result is kept in this browser (TO.groupUpdate).
   Every opening of the page starts fresh (Khayyam, 6 Oct 2026): a round lives only while the page is open. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "one-of-193";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  if (!TO || !DATA || !DATA.countries || DATA.countries.length !== 193 || !DATA.questions || !DATA.questions.length) {
    $("start-title").textContent = "The countries could not be loaded. Please try again in a moment.";
    $("btn-start").hidden = true;
    return;
  }

  var C = DATA.countries, Q = DATA.questions, LISTS = DATA.lists || {}, FIG = DATA.figures || {};
  // the tabs that hold at least one question (a question the World Bank's figures could not answer is left out by the R script)
  var TABS = (DATA.tabs || []).filter(function (t) { return Q.some(function (q) { return q.tab === t.id; }); });
  if (!TABS.length) TABS = [{ id: Q[0].tab, name: "Questions" }];
  var REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  var WRONG = 2;                                  // a wrong guess costs two questions
  var byId = {};
  C.forEach(function (c, i) { byId[c.id] = i; });
  var inList = {};
  Object.keys(LISTS).forEach(function (k) {
    inList[k] = {};
    (LISTS[k].ids || []).forEach(function (id) { inList[k][id] = true; });
  });

  /* ---------- what the phone answers: computed from the data file, the same way for every country ---------- */
  function val(c, key) { var f = c.f && c.f[key]; return f ? f[0] : NaN; }
  function truth(q, c) {
    switch (q.kind) {
      case "region": return c.region === q.key;
      case "sub": return c.sub === q.key;
      case "list": return !!(inList[q.key] && inList[q.key][c.id]);
      case "above": return val(c, q.key) > q.value;
      case "ref": return val(c, q.key) > val(C[byId[q.value]], q.key);
      case "income": return c.inc === q.key;
    }
    return false;
  }
  var A = C.map(function (c) { return Q.map(function (q) { return truth(q, c); }); });

  /* ---------- small helpers ---------- */
  function num(v) { return typeof v === "number" && isFinite(v); }
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function people(v) {
    if (v >= 1e9) return (Math.round(v / 1e7) / 100) + " billion";
    if (v >= 1e6) return (Math.round(v / 1e5) / 10) + " million";
    return commas(v);
  }
  function ordinal(n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function fullName(c) { return c.alt ? c.name + " (" + c.alt + ")" : c.name; }
  function sortKey(c) { return c.name.normalize ? c.name.normalize("NFD").replace(/[̀-ͯ]/g, "") : c.name; }

  /* ---------- links: a friend's table plays the same country (?c=code&q=questions) ---------- */
  var MUL = 89, ADD = 57, INV = 0;                // the country's place, scrambled a little (193 is prime)
  for (var k = 1; k < 193; k++) if ((MUL * k) % 193 === 1) INV = k;
  function encode(i) { return ((i * MUL + ADD) % 193 + 193 * Math.floor(Math.random() * 9 + 1)).toString(36); }
  function decode(s) {
    if (!/^[0-9a-z]{1,4}$/.test(s || "")) return -1;
    var n = parseInt(s, 36);
    if (!(n >= 0 && n < 193 * 10)) return -1;
    return (((n % 193) - ADD + 193) % 193) * INV % 193;
  }
  var params = new URLSearchParams(window.location.search);
  var friendC = decode(params.get("c"));
  var friendQ = /^\d{1,3}$/.test(params.get("q") || "") ? parseInt(params.get("q"), 10) : null;

  /* ---------- the round, in the page only: a new opening of the page (or Restart) starts afresh ---------- */
  var round = null;      // { h: hidden country index, seq: [{t: "q", i: question} or {t: "g", i: country guessed wrong}], over, found }
  var tab = TABS[0].id;
  var shownLeft = 193;
  function stored() { return TO.group(GAME); }
  function asked(r) { return r.seq.filter(function (s) { return s.t === "q"; }).map(function (s) { return s.i; }); }
  function wrongs(r) { return r.seq.filter(function (s) { return s.t === "g"; }).map(function (s) { return s.i; }); }
  function saved() {                  // the round in the form the checks read and hand over (CORE.now, CORE.load)
    return round && !round.over ? { c: C[round.h].id, s: round.seq.map(function (x) { return x.t + ":" + (x.t === "q" ? Q[x.i].id : C[x.i].id); }) } : null;
  }
  /* what earlier versions kept in the browser (a round going on) is cleared */
  TO.groupUpdate(GAME, function (g) { delete g.cur; });
  function resume(cur) {
    if (!cur || typeof cur.c !== "string" || byId[cur.c] === undefined || !Array.isArray(cur.s)) return null;
    var qi = {};
    Q.forEach(function (q, i) { qi[q.id] = i; });
    var r = { h: byId[cur.c], seq: [], over: false, found: false };
    cur.s.forEach(function (x) {
      var m = /^([qg]):(.+)$/.exec(String(x));
      if (!m) return;
      var i = m[1] === "q" ? qi[m[2]] : byId[m[2]];
      if (i === undefined || (m[1] === "g" && i === r.h)) return;
      if (r.seq.some(function (y) { return y.t === m[1] && y.i === i; })) return;
      r.seq.push({ t: m[1], i: i });
    });
    return r;
  }
  function score(r) { return asked(r).length + WRONG * wrongs(r).length; }
  function possible(r, upto) {         // which countries fit every answer so far (and were not guessed wrong); upto: only the first steps
    var steps = upto === undefined ? r.seq : r.seq.slice(0, upto), out = [];
    for (var c = 0; c < C.length; c++) {
      var okc = true;
      for (var j = 0; okc && j < steps.length; j++) {
        var st = steps[j];
        if (st.t === "q" ? A[c][st.i] !== A[r.h][st.i] : st.i === c) okc = false;
      }
      if (okc) out.push(c);
    }
    return out;
  }
  function newRound(forced) {
    var kept = stored().recent, recent = Array.isArray(kept) ? kept.slice(-40) : [];
    var pool = [];
    for (var i = 0; i < C.length; i++) if (recent.indexOf(C[i].id) < 0) pool.push(i);
    if (!pool.length) pool = C.map(function (c, i) { return i; });
    var h = forced >= 0 ? forced : pool[Math.floor(Math.random() * pool.length)];
    round = { h: h, seq: [], over: false, found: false };
    TO.groupUpdate(GAME, function (g) {
      var r2 = Array.isArray(g.recent) ? g.recent.filter(function (x) { return typeof x === "string"; }) : [];
      r2.push(C[h].id);
      g.recent = r2.slice(-40);
    });
    TO.count(GAME + "/started");
  }

  /* ---------- how few questions would have been enough: the smallest set of menu questions whose answers
     leave only this country (or only it and the countries no question can tell apart from it) ---------- */
  function fewest(h) {
    var n = Q.length, els = [], twins = [];
    for (var c = 0; c < C.length; c++) {
      if (c === h) continue;
      var opts = [];
      for (var q = 0; q < n; q++) if (A[c][q] !== A[h][q]) opts.push(q);
      if (opts.length) els.push(opts); else twins.push(c);
    }
    var cover = [];
    for (var j = 0; j < n; j++) cover.push(0);
    els.forEach(function (o) { o.forEach(function (q) { cover[q]++; }); });
    els.forEach(function (o) { o.sort(function (a, b) { return cover[b] - cover[a] || a - b; }); });
    var chosen = [], pick = [], nodes = 0, LIMIT = 3000000;
    for (j = 0; j < n; j++) chosen.push(false);
    function covered(o) { for (var i = 0; i < o.length; i++) if (chosen[o[i]]) return true; return false; }
    function dfs(depth) {
      if (++nodes > LIMIT) return false;
      var best = null;
      for (var i = 0; i < els.length; i++) {
        var o = els[i];
        if (!covered(o) && (!best || o.length < best.length)) { best = o; if (o.length === 1) break; }
      }
      if (!best) return true;
      if (depth === 0) return false;
      for (var b = 0; b < best.length; b++) {
        chosen[best[b]] = true; pick.push(best[b]);
        if (dfs(depth - 1)) return true;
        chosen[best[b]] = false; pick.pop();
      }
      return false;
    }
    var exact = false;
    for (var d = 0; d <= n; d++) {
      if (dfs(d)) { exact = nodes <= LIMIT; break; }
      if (nodes > LIMIT) break;
    }
    if (!exact) {                      // a very hard case: the greedy answer, said as "about"
      pick = []; chosen = chosen.map(function () { return false; });
      for (;;) {
        var left = els.filter(function (o) { return !covered(o); });
        if (!left.length) break;
        var cnt = {};
        left.forEach(function (o) { o.forEach(function (q) { cnt[q] = (cnt[q] || 0) + 1; }); });
        var bq = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a] || a - b; })[0] | 0;
        chosen[bq] = true; pick.push(bq);
      }
    }
    return { n: pick.length, qs: pick.slice().sort(function (a, b) { return a - b; }), twins: twins, exact: exact };
  }
  window.OneOf193 = { fewest: function (id) { var r = fewest(byId[id]); return { n: r.n, qs: r.qs.map(function (i) { return Q[i].id; }), twins: r.twins.map(function (i) { return C[i].id; }), exact: r.exact }; },
                      answer: function (id, qid) { var qi = -1; Q.forEach(function (q, i) { if (q.id === qid) qi = i; }); return qi < 0 ? null : A[byId[id]][qi]; } };   // read by the checks

  /* ---------- the views ---------- */
  var views = { start: $("v-start"), play: $("v-play"), end: $("v-end") };
  function show(v) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.setAttribute("data-view", v);
    if (v !== "end") document.body.classList.remove("fit1", "fit2", "fit3");
    $("btn-restart").hidden = !(round && !round.over);      // Restart only while a round is in play
  }

  function bestLine() {
    var g = stored();
    $("best-n").textContent = num(g.best) ? String(g.best) : "–";
    $("best-chip").setAttribute("aria-label", num(g.best) ? "Your table's best: " + plural(g.best, "question", "questions") : "Your table's best result: none yet");
    $("st-best").textContent = num(g.best) ? String(g.best) : "–";
    $("st-found").textContent = String(num(g.found) ? g.found : 0);
    $("st-rounds").textContent = String(num(g.rounds) ? g.rounds : 0);
  }

  /* the start */
  function showStart() {
    show("start");
    if (friendC >= 0) {
      var f = $("friend");
      f.textContent = friendQ !== null
        ? "A friend's table found their country in " + plural(friendQ, "question", "questions") + ". It is hidden for you now. Can your table do better?"
        : "A friend's table could not find their country. It is hidden for you now. Can your table find it?";
      f.hidden = false;
      $("btn-start").textContent = "Play their country";
    } else {                            // after Restart, a friend's round already played is not offered again
      $("friend").hidden = true;
      $("btn-start").textContent = "Hide a country";
    }
  }

  /* playing */
  function renderTabs() {
    var box = $("tabs");
    box.innerHTML = "";
    TABS.forEach(function (t) {
      var b = el("button", "o-tab", t.name);
      b.type = "button";
      b.id = "tab-" + t.id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "menu");
      b.setAttribute("aria-selected", t.id === tab ? "true" : "false");
      b.tabIndex = t.id === tab ? 0 : -1;
      b.addEventListener("click", function () { tab = t.id; renderTabs(); renderMenu(); });
      b.addEventListener("keydown", function (e) {
        var i = TABS.map(function (x) { return x.id; }).indexOf(t.id), to = -1;
        if (e.key === "ArrowRight") to = (i + 1) % TABS.length;
        else if (e.key === "ArrowLeft") to = (i - 1 + TABS.length) % TABS.length;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = TABS.length - 1;
        if (to < 0) return;
        e.preventDefault();
        tab = TABS[to].id; renderTabs(); renderMenu();
        $("tab-" + tab).focus();
      });
      box.appendChild(b);
    });
    $("menu").setAttribute("aria-labelledby", "tab-" + tab);
  }
  function renderMenu() {
    var box = $("menu");
    box.innerHTML = "";
    Q.forEach(function (q, i) {
      if (q.tab !== tab) return;
      var done = asked(round).indexOf(i) >= 0, a = A[round.h][i];
      var b = el("button", "o-q" + (done ? " asked " + (a ? "yes" : "no") : ""));
      b.type = "button";
      b.setAttribute("data-q", q.id);
      b.appendChild(el("span", "o-q-t", q.q));
      if (done) {
        var tagEl = el("span", "o-a", a ? "Yes" : "No");
        tagEl.setAttribute("aria-hidden", "true");
        b.appendChild(tagEl);
        b.setAttribute("aria-disabled", "true");
        b.setAttribute("aria-label", q.q + " Asked. The answer was " + (a ? "yes" : "no") + ".");
      }
      b.addEventListener("click", function () { if (!done) ask(i); });
      box.appendChild(b);
    });
  }
  function setLeft(n, animate) {
    var from = shownLeft;
    shownLeft = n;
    var out = $("left-n");
    $("left-cap").textContent = n === 1 ? "country still possible" : "countries still possible";
    if (!animate || TO.reducedMotion() || from === n) { out.textContent = String(n); return; }
    var t0 = null, dur = 520;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      out.textContent = String(Math.round(from + (n - from) * e));
      if (p < 1 && shownLeft === n) window.requestAnimationFrame(step);
      else if (shownLeft === n) out.textContent = String(n);
    }
    window.requestAnimationFrame(step);
  }
  function setAsked() {
    var s = score(round);
    $("asked-n").textContent = String(s);
    $("asked-cap").textContent = s === 1 ? "question" : "questions";
    $("btn-answers").setAttribute("aria-label", plural(s, "question", "questions") + " so far. Show all answers.");
  }
  function lastLine(html, spoken) {
    var l = $("last");
    l.innerHTML = html;
    l.setAttribute("aria-label", spoken);
  }
  // what to do next: guess when one country fits, or when the ones that fit give the same answer to every question (twins)
  function nextStep(rest) {
    if (rest.length === 1) return "Only one country fits. Guess it!";
    var same = rest.every(function (c) { return A[c].every(function (v, q) { return v === A[rest[0]][q]; }); });
    return same ? "These " + rest.length + " give the same answer to every question. Guess!" : "Pass the phone.";
  }
  function ask(i) {
    if (!round || round.over || asked(round).indexOf(i) >= 0) return;
    round.seq.push({ t: "q", i: i });
    var a = A[round.h][i], rest = possible(round), n = rest.length, next = nextStep(rest);
    setLeft(n, true);
    setAsked();
    var q = Q[i].q;
    lastLine('<span class="o-lq"></span> <b class="o-ans ' + (a ? "yes" : "no") + '">' + (a ? "Yes" : "No") + '</b><span class="o-pass">' + next + "</span>",
             q + " " + (a ? "Yes." : "No.") + " " + plural(n, "country", "countries") + " still possible. " + next);
    $("last").querySelector(".o-lq").textContent = q;
    renderTabs(); renderMenu();
    var b = $("menu").querySelector('[data-q="' + Q[i].id + '"]');
    if (b) b.focus();
  }
  function showPlay(resumed) {
    show("play");
    renderTabs(); renderMenu();
    var n = possible(round).length;
    shownLeft = n;
    setLeft(n, false);
    setAsked();
    if (resumed && round.seq.length > 0) {
      lastLine("Your round goes on: " + plural(score(round), "question", "questions") + " so far.", "Your round goes on: " + plural(score(round), "question", "questions") + " so far. " + plural(n, "country", "countries") + " still possible.");
    } else {
      lastLine("Pick a question from the menu.", "Pick a question from the menu. 193 countries still possible.");
    }
    $("mode").textContent = "Pass the phone";
  }

  /* guessing: pick the country from a list, by region. Countries already guessed wrong are marked. */
  var region = REGIONS[0], picked = -1;
  function renderRegions() {
    var box = $("regions");
    box.innerHTML = "";
    REGIONS.forEach(function (r) {
      var b = el("button", "o-tab", r);
      b.type = "button";
      b.id = "reg-" + r;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "list");
      b.setAttribute("aria-selected", r === region ? "true" : "false");
      b.tabIndex = r === region ? 0 : -1;
      b.addEventListener("click", function () { region = r; renderRegions(); renderList(); });
      b.addEventListener("keydown", function (e) {
        var i = REGIONS.indexOf(r), to = -1;
        if (e.key === "ArrowRight") to = (i + 1) % REGIONS.length;
        else if (e.key === "ArrowLeft") to = (i - 1 + REGIONS.length) % REGIONS.length;
        if (to < 0) return;
        e.preventDefault();
        region = REGIONS[to]; renderRegions(); renderList();
        $("reg-" + region).focus();
      });
      box.appendChild(b);
    });
  }
  function renderList() {
    var box = $("list");
    box.innerHTML = "";
    box.setAttribute("aria-label", region);
    C.map(function (c, i) { return i; })
      .filter(function (i) { return C[i].region === region; })
      .sort(function (a, b) { return sortKey(C[a]).localeCompare(sortKey(C[b]), "en"); })
      .forEach(function (i) {
        var li = el("li");
        var wrong = !!round && wrongs(round).indexOf(i) >= 0;
        var b = el("button", "o-c" + (wrong ? " wrong" : "") + (i === picked ? " on" : ""));
        b.type = "button";
        b.setAttribute("data-c", C[i].id);
        b.setAttribute("aria-pressed", i === picked ? "true" : "false");
        b.appendChild(el("span", "o-c-n", C[i].name));
        if (C[i].alt) b.appendChild(el("span", "o-c-a", C[i].alt));
        if (wrong) { b.appendChild(el("span", "o-c-x", "not it")); b.setAttribute("aria-disabled", "true"); }
        b.addEventListener("click", function () {
          if (wrong) return;
          picked = i;
          Array.prototype.forEach.call(box.querySelectorAll(".o-c"), function (x) {
            var on = x.getAttribute("data-c") === C[i].id;
            x.classList.toggle("on", on);
            x.setAttribute("aria-pressed", on ? "true" : "false");
          });
          var cb = $("btn-confirm");
          cb.disabled = false;
          cb.textContent = "Guess " + C[i].name;
        });
        li.appendChild(b);
        box.appendChild(li);
      });
    box.scrollTop = 0;
  }
  function openGuess() {
    if (!round || round.over) return;
    picked = -1;
    var cb = $("btn-confirm");
    cb.disabled = true;
    cb.textContent = "Pick a country";
    // open the region the table already knows, if it asked; otherwise the first one
    var known = null;
    asked(round).forEach(function (qi) { if (Q[qi].kind === "region" && A[round.h][qi]) known = Q[qi].key; });
    region = known || region || REGIONS[0];
    renderRegions(); renderList();
    TO.openDialog($("dlg-guess"));
    $("reg-" + region).focus();
  }
  function guess() {
    if (picked < 0 || !round || round.over) return;
    var i = picked;
    TO.closeDialog($("dlg-guess"));
    if (i === round.h) { finish(true); return; }
    if (wrongs(round).indexOf(i) < 0) round.seq.push({ t: "g", i: i });
    var rest = possible(round), n = rest.length, next = nextStep(rest);
    setLeft(n, true);
    setAsked();
    lastLine('<b class="o-ans no">Not ' + "</b><span class=\"o-lq\"></span>. That costs two questions.<span class=\"o-pass\">" + next + "</span>",
             "Not " + C[i].name + ". That costs two questions. " + plural(n, "country", "countries") + " still possible. " + next);
    $("last").querySelector(".o-lq").textContent = C[i].name;
    $("btn-guess").focus();
  }

  /* the end */
  function factsFor(c) {
    var out = [], iso2 = c.iso2;
    function rank(key) {
      var v = val(c, key), r = 1;
      C.forEach(function (o) { if (val(o, key) > v) r++; });
      return r;
    }
    function wb(key, text) {
      var f = c.f[key], m = FIG[key] || {};
      out.push({ t: text, src: [{ name: "World Bank, " + f[1], url: (m.url || "https://data.worldbank.org/indicator/" + (m.indicator || "")) + "?locations=" + iso2 }] });
    }
    if (c.f && c.f.pop) {
      var rp = rank("pop");
      wb("pop", people(val(c, "pop")) + " people live here: " + (rp === 1 ? "the most populous of all 193." : rp === 193 ? "the least populous of all 193." : "the " + ordinal(rp) + " most populous of the 193."));
    }
    if (c.f && c.f.area) {
      var ra = rank("area"), av = val(c, "area");
      wb("area", "It covers " + commas(av) + " km²: " + (ra === 1 ? "the largest of all 193." : ra === 193 ? "the smallest of all 193." : "the " + ordinal(ra) + " largest of the 193."));
    }
    // the rarest list it belongs to, else its forest
    // counted among the 193 UN members only: a source may count more (WorldAtlas gives Russia 16 neighbours, with
    // Abkhazia and South Ossetia; the Vatican is landlocked; Kosovo uses the euro), so every sentence says "UN members"
    var say = {
      equator: function (n) { return "It is one of " + n + " UN members whose land the equator crosses."; },
      china: function (n) { return "It is one of the " + n + " UN members that border China on land."; },
      russia: function (n) { return "It is one of the " + n + " UN members that border Russia on land."; },
      med: function (n) { return "It is one of " + n + " UN members with a coast on the Mediterranean."; },
      euro: function (n) { return "It is one of " + n + " UN members that use the euro."; },
      landlocked: function (n) { return "It is one of " + n + " landlocked UN members, with no coast at all."; },
      island: function (n) { return "It is one of " + n + " island countries in the UN."; },
      left: function (n) { return "It is one of " + n + " UN members where traffic drives on the left."; }
    };
    var best = null;
    Object.keys(say).forEach(function (k) {
      if (!inList[k] || !inList[k][c.id]) return;
      var n = (LISTS[k].ids || []).length;
      if (!best || n < best.n) best = { k: k, n: n };
    });
    if (best) out.push({ t: say[best.k](best.n), src: (LISTS[best.k].src || []).map(function (s) { return { name: s.name, url: s.url }; }) });
    // then, while there are fewer than three, its forest (if more than half) or its towns, then its forest anyway
    var forest = c.f && c.f.forest ? val(c, "forest") : null;
    if (out.length < 3 && forest !== null && forest >= 50) wb("forest", "More than half of its land is forest: " + Math.round(forest) + "%.");
    if (out.length < 3 && c.f && c.f.urban) wb("urban", Math.round(val(c, "urban")) + "% of its people live in towns and cities.");
    if (out.length < 3 && forest !== null && forest < 50) wb("forest", Math.round(forest) + "% of its land is forest.");
    return out.slice(0, 3);
  }
  function finish(found) {
    var leftAtEnd = possible(round).length;          // how many still fitted when the round ended
    round.over = true;
    round.found = found;
    var s = score(round), res = fewest(round.h);
    var before = stored().best;
    TO.groupUpdate(GAME, function (g) {
      g.rounds = (num(g.rounds) ? g.rounds : 0) + 1;
      if (found) {
        g.found = (num(g.found) ? g.found : 0) + 1;
        if (!num(g.best) || s < g.best) g.best = s;
      }
    });
    TO.count(GAME + (found ? "/found" : "/gave-up"));
    lastResult = { found: found, s: s, res: res, h: round.h, left: leftAtEnd };
    renderEnd(lastResult, before);
    show("end");
    fitEnd();
    bestLine();
    prepareCard();
    $("btn-again").focus();
  }
  var lastResult = null;
  function renderEnd(r, before) {
    var c = C[r.h];
    var name = $("end-name");
    name.textContent = c.name;
    name.classList.toggle("long", c.name.length > 16);
    name.classList.toggle("longer", c.name.length > 24);
    // the other name only where it is the one many people know (Turkey, Ivory Coast, Nauru...), not a long official one
    if (c.alt && c.alt.length <= 14) { var a = el("span", "o-alt", "(" + c.alt + ")"); name.appendChild(document.createTextNode(" ")); name.appendChild(a); }
    $("end-kicker").textContent = "It was";
    var w = wrongs(round).length, parts = !r.found ? "You stopped after " + plural(r.s, "question", "questions") + "."
      : r.s === 0 ? "Found without a single question!"
      : "Found in " + plural(r.s, "question", "questions") + (w ? " (" + asked(round).length + " asked, " + plural(w, "wrong guess", "wrong guesses") + ")" : "") + ".";
    $("end-score").textContent = parts;
    var m = $("end-min"), res = r.res, narrowed = r.left <= 1 + res.twins.length;
    var count = (res.exact ? "" : "About ") + plural(res.n, "question", "questions");
    // twins: countries that give the same answer to every question in the menu; then only a guess tells them apart
    var enough = res.twins.length ? count + " would have left only it and " + res.twins.map(function (i) { return C[i].name; }).join(" and ") + ":"
      : count + " would have been enough:";
    if (r.found && !narrowed) enough = "A bold guess! " + (res.twins.length ? enough : count + " would have made sure:");
    else if (r.found && r.s <= res.n && res.exact) enough = "A perfect round: " + plural(res.n, "question", "questions") + " is the fewest possible.";
    m.textContent = enough;
    var path = $("end-path");
    path.innerHTML = "";
    res.qs.forEach(function (qi) {
      var li = el("li", "o-chip " + (A[r.h][qi] ? "yes" : "no"));
      li.appendChild(el("span", "", Q[qi].q + " "));
      li.appendChild(el("b", "", A[r.h][qi] ? "Yes" : "No"));
      path.appendChild(li);
    });
    var facts = $("facts");
    facts.innerHTML = "";
    factsFor(c).forEach(function (f) {
      var li = el("li", "o-fact");
      li.appendChild(el("span", "o-fact-t", f.t + " "));
      var s = el("span", "o-src");
      f.src.forEach(function (x, i) {
        if (i) s.appendChild(document.createTextNode(" · "));
        var aEl = el("a", "", x.name);
        aEl.href = x.url; aEl.target = "_blank"; aEl.rel = "noopener";
        s.appendChild(aEl);
      });
      li.appendChild(s);
      facts.appendChild(li);
    });
    var g = stored(), eb = $("end-best");
    if (r.found && (!num(before) || r.s < before)) eb.textContent = num(before) ? "A new best for this table!" : "Your table's first country found.";
    else eb.textContent = num(g.best) ? "Your table's best: " + plural(g.best, "question", "questions") + "." : "";
    renderTrail();
  }

  /* the end must fit the screen without scrolling, whatever the country: step down until it does */
  function fitEnd() {
    var b = document.body;
    b.classList.remove("fit1", "fit2", "fit3");
    if (document.body.getAttribute("data-view") !== "end") return;
    ["fit1", "fit2", "fit3"].forEach(function (k) {
      if (document.documentElement.scrollHeight > window.innerHeight) b.classList.add(k);
    });
  }
  window.addEventListener("resize", fitEnd);

  /* all answers so far (during play: the answers; after the end: also the hidden country's figures) */
  function renderTrail() {
    var box = $("trail");
    box.innerHTML = "";
    if (!round) return;
    $("answers-empty").hidden = round.seq.length > 0;
    var c = C[round.h];
    round.seq.forEach(function (st, k) {
      var li = el("li", "o-step"), left = possible(round, k + 1).length + " left";
      if (st.t === "g") {
        li.appendChild(el("span", "o-step-q", "Guess: " + C[st.i].name));
        li.appendChild(el("b", "o-ans no", "Wrong"));
        li.appendChild(el("span", "o-step-n", "+2 questions · " + left));
        box.appendChild(li);
        return;
      }
      var q = Q[st.i], a = A[round.h][st.i];
      li.appendChild(el("span", "o-step-q", q.q));
      li.appendChild(el("b", "o-ans " + (a ? "yes" : "no"), a ? "Yes" : "No"));
      var extra = "";
      if (round.over && (q.kind === "above" || q.kind === "ref")) {      // the real figure, only once the round is over
        var v = val(c, q.key);
        extra = q.key === "pop" ? people(v) + " people" : q.key === "area" ? commas(v) + " km²" : q.key === "life" ? (Math.round(v * 10) / 10) + " years" : Math.round(v) + "%";
        extra += " (" + C[round.h].name + ")";
      }
      li.appendChild(el("span", "o-step-n", (extra ? extra + " · " : "") + left));
      box.appendChild(li);
    });
  }

  /* ---------- the picture to share: how many were still possible after each question, never the country ---------- */
  var cardBlob = null, cardUrl = null, layout = null;
  function roundRect(x, X, Y, W, H, R) {
    x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R);
    x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath();
  }
  function counts() {         // after each step, in order: how many were still possible, and whether the step was a wrong guess
    return round.seq.map(function (st, k) { return { n: possible(round, k + 1).length, wrong: st.t === "g" }; });
  }
  function drawCard() {
    var W2 = 1080, H2 = 1350, MG = 76, BLUE = "#166FA5";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
    x.fillStyle = BLUE; x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(190, 230, 255, .20)"); glow.addColorStop(1, "rgba(0, 0, 0, .10)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.fillStyle = "#ffffff"; x.textBaseline = "alphabetic";
    x.textAlign = "left"; x.font = "800 48px " + FD; x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F; x.fillText("One of 193", W2 - MG, 118);
    x.textAlign = "left"; x.font = "800 92px " + FD;
    var r = lastResult;
    x.fillText(r.found ? "Found it in " + r.s + "." : "Still hidden.", MG - 4, 262);
    x.font = "600 44px " + F; x.fillStyle = "rgba(255, 255, 255, .92)";
    x.fillText(r.found ? (r.s === 1 ? "One question" : r.s + " questions") + " to find the hidden country." : "We stopped after " + plural(r.s, "question", "questions") + ".", MG, 336);
    // the staircase: 193 countries at the start, then what was still possible after each step
    var steps = [{ n: 193, wrong: false }].concat(counts());
    var top = 410, bottom = 980, left = MG, right = W2 - MG, lmax = Math.log(193);
    var bw = Math.min(110, (right - left) / steps.length), gap = Math.min(16, bw * 0.18);
    x.fillStyle = "rgba(255, 255, 255, .18)"; x.fillRect(left, bottom + 4, right - left, 3);
    steps.forEach(function (s, i) {
      var h = s.n <= 1 ? 14 : 14 + (bottom - top - 14) * Math.log(s.n) / lmax;
      var bx = left + i * bw + gap / 2, by = bottom - h;
      x.fillStyle = s.wrong ? TO.MISS : (s.n === 1 ? "#ffffff" : "rgba(255, 255, 255, " + (i === 0 ? 0.42 : 0.82) + ")");
      roundRect(x, bx, by, bw - gap, h, Math.min(12, (bw - gap) / 2)); x.fill();
      if (bw >= 54) {
        x.fillStyle = s.wrong ? "#15172B" : BLUE; x.textAlign = "center";
        var fs = Math.min(30, bw * 0.42); x.font = "800 " + fs + "px " + F;
        if (h > fs + 14) x.fillText(String(s.n), bx + (bw - gap) / 2, by + fs + 6);
      }
    });
    x.textAlign = "left"; x.fillStyle = "rgba(255, 255, 255, .9)"; x.font = "600 30px " + F;
    var cap = "Countries still possible after each question", capW = x.measureText(cap).width, keyW = 0;
    x.fillText(cap, MG, bottom + 54);
    if (steps.some(function (s) { return s.wrong; })) {        // the key to the yellow bars, on the right of the same line
      keyW = x.measureText("wrong guess").width + 34;
      x.textAlign = "right"; x.fillText("wrong guess", W2 - MG, bottom + 54);
      x.fillStyle = TO.MISS; roundRect(x, W2 - MG - keyW, bottom + 32, 24, 24, 6); x.fill();
      x.textAlign = "left";
    }
    x.fillStyle = "#ffffff"; x.font = "700 44px " + FD;
    var res = r.res;
    x.fillText(plural(res.n, "question", "questions") + " would have been enough.", MG, bottom + 128);
    x.font = "800 72px " + FD;
    x.fillText("Can your table do better?", MG - 3, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1270);
    }
    x.font = "800 92px " + FD;
    var headW = x.measureText(r.found ? "Found it in " + r.s + "." : "Still hidden.").width;
    x.font = "700 44px " + FD;
    var enoughW = x.measureText(plural(res.n, "question", "questions") + " would have been enough.").width;
    x.font = "800 72px " + FD;
    layout = { fits: headW <= W2 - 2 * MG && enoughW <= W2 - 2 * MG && x.measureText("Can your table do better?").width <= W2 - 2 * MG && capW + keyW + 30 <= W2 - 2 * MG, steps: steps.length, barWidth: bw, key: keyW > 0 };
    return c;
  }
  window.OneOf193Card = function () { return layout; };       // read by r/site-workshop/checks/t_one.py
  function prepareCard() {
    cardBlob = null;
    function make() {
      try {
        drawCard().toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 92px "Bricolage Grotesque"'), document.fonts.load('600 40px "Figtree"'), document.fonts.load('800 30px "Figtree"')]).then(make, make);
    } else make();
  }
  function shareUrl() {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?c=" + encode(lastResult.h) + (lastResult.found ? "&q=" + lastResult.s : "");
  }
  function shareText() {
    var r = lastResult;
    return (r.found
      ? "One of 193: the phone hid a country and our table found it in " + plural(r.s, "question", "questions") + " (" + r.res.n + " would have been enough). Can yours do better? "
      : "One of 193: the phone hid a country and our table could not find it. Can yours? ") + shareUrl();
  }

  /* ---------- the sources, in the help: every list with its two websites, and the World Bank's figures ---------- */
  (function () {
    var box = $("help-sources");
    if (!box) return;
    function item(label, links) {
      var li = el("li");
      li.appendChild(el("span", "", label + ": "));
      links.forEach(function (x, i) {
        if (i) li.appendChild(document.createTextNode(" · "));
        var a = el("a", "", x.name);
        a.href = x.url; a.target = "_blank"; a.rel = "noopener";
        li.appendChild(a);
      });
      box.appendChild(li);
    }
    Object.keys(LISTS).forEach(function (k) { if (LISTS[k].src) item(LISTS[k].name, LISTS[k].src); });
    var figs = Object.keys(FIG).map(function (k) { return { name: FIG[k].name, url: FIG[k].url }; });
    if (figs.length) item("World Bank figures", figs);
  })();

  /* ---------- wiring ---------- */
  TO.wireDialogs();
  TO.fixLocalLinks();
  bestLine();
  if (friendC >= 0) TO.count(GAME + "/challenge-opened");

  function plainAddress() {           // once a friend's country is hidden, the address loses ?c=: a new opening is a plain start
    if (window.location.search && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, "", window.location.pathname); } catch (e) { /* keep the address */ }
    }
  }
  $("btn-start").addEventListener("click", function () {
    newRound(friendC >= 0 ? friendC : -1);
    friendC = -1;
    plainAddress();
    tab = TABS[0].id;
    showPlay(false);
    var t = $("tab-" + tab);
    if (t) t.focus();
  });
  $("btn-guess").addEventListener("click", openGuess);
  $("btn-confirm").addEventListener("click", guess);
  $("btn-stop").addEventListener("click", function () { TO.closeDialog($("dlg-guess")); TO.openDialog($("dlg-stop")); });
  $("btn-giveup").addEventListener("click", function () { TO.closeDialog($("dlg-stop")); if (round && !round.over) finish(false); });
  $("btn-answers").addEventListener("click", renderTrail);
  $("btn-restart-yes").addEventListener("click", function () { fresh(); $("btn-start").focus(); });
  $("btn-again").addEventListener("click", function () {
    plainAddress();
    newRound(-1);
    tab = TABS[0].id;
    showPlay(false);
    var t = $("tab-" + tab);
    if (t) t.focus();
  });
  $("share").addEventListener("click", function () {
    TO.count(GAME + "/share");
    TO.share({ blob: cardBlob, filename: "one-of-193.png", text: shareText() }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), sv = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; sv.href = cardUrl; sv.hidden = false; }
      else { img.hidden = true; sv.hidden = true; }
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    TO.copyText(shareText()).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl();
    });
  });

  /* ---------- starting afresh (Khayyam, 6 Oct 2026: the game must restart when you go to the home page and come back,
     and a Restart button). Every opening of the page (from the home page, the Back button or a reload) and Restart
     drop the round in play and show the start. The table's best stays. ---------- */
  function fresh() {
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) { TO.closeDialog(d); });
    round = null;
    tab = TABS[0].id;
    showStart();
  }
  /* for the checks (r/site-workshop/checks/t_one.py): a round going on, handed over and read back. Nothing is stored. */
  window.OneOf193.load = function (cur) {
    fresh();
    var r = resume(cur);
    if (!r) return false;
    round = r;
    if (possible(round).indexOf(round.h) < 0) round.seq = [];         // a broken record: never lose the hidden country
    showPlay(true);
    return true;
  };
  window.OneOf193.now = saved;

  // a page that the browser brings back from its memory (the Back button) starts afresh too
  window.addEventListener("pageshow", function (e) { if (e.persisted) fresh(); });
  fresh();
})();
