/* Beat the Phone: a game for one phone and a whole table, playing together against the phone.
   The phone sets a journey of ten stops round the world, one country per stop. At each stop the player holding
   the phone answers one question about that country, alone: two countries, pick the one that fits ("Which has more
   people?"). Right: the table moves on to the next stop. Wrong: the table loses one of its three lives, and the next
   player tries again at the same stop, with a new question. Twice a journey the one holding the phone may ask the
   table. The questions get harder along the route. Reach the tenth stop and the table beats the phone.
   Not daily: no day number, no streak, no album. The table's best journey is kept in this browser (TO.groupUpdate).
   Every opening of the page starts fresh (Khayyam, 6 Oct 2026): the players' names and the journey going on live only
   while the page is open, and are never stored.
   Its countries, lists and five figures come from One of 193's file (data/one-of-193.js); four more figures from
   data/still-in.js (r/make-still-in.R). Without that second file the game plays with the first five. */
(function () {
  "use strict";

  var GAME = "beat-the-phone";
  var TO = window.TurnsOut;
  var BASE = (window.TURNSOUT_DATA || {})["one-of-193"];
  var MORE = (window.TURNSOUT_DATA || {})["still-in"];
  var HAS_DOC = typeof document !== "undefined";
  function $(id) { return document.getElementById(id); }

  var READY = !!(BASE && Array.isArray(BASE.countries) && BASE.countries.length === 193 && BASE.lists && BASE.figures);

  /* ================================================================================================
     The core: countries, figures, lists, the route and the questions. No page needed (the checks call it too).
     ================================================================================================ */
  var MIN_PEOPLE = 1000000;          // only countries with at least a million people are stops or answers
  var STOPS = 10, LIVES = 3, ASKS = 2;
  var PLAYERS_MIN = 2, PLAYERS_MAX = 8;
  var RECENT = 40;                   // the stops a table had lately, chosen again only when others run out

  // The countries a stop is compared with in a question about a figure: well known, from every continent
  // (the same 45 as Still In's bars).
  var BAR_IDS = ["ESP", "FRA", "DEU", "ITA", "GBR", "POL", "SWE", "NOR", "GRC", "PRT", "NLD", "CHE", "IRL", "FIN", "AUT",
                 "USA", "CAN", "MEX", "BRA", "ARG", "CHL", "PER", "COL",
                 "CHN", "IND", "JPN", "KOR", "IDN", "THA", "VNM", "PHL", "PAK", "BGD", "TUR", "SAU", "MYS",
                 "EGY", "NGA", "KEN", "ZAF", "ETH", "MAR", "GHA",
                 "AUS", "NZL"];

  // The figures, as in Still In. "ratio": compared by how many times bigger (people, area...), else by the
  // difference (years, percentage points). "margin": two countries in a question never lie this close, so that a
  // small revision of a figure can never change an answer. "near" and "mid": what counts as a close call and as a
  // middle one.
  var FIGS = {
    pop:    { file: "base", ratio: true,  margin: 0.05, near: 1.6, mid: 4 },
    area:   { file: "base", ratio: true,  margin: 0.03, near: 1.6, mid: 4 },
    life:   { file: "base", ratio: false, margin: 1,    near: 2.5, mid: 7 },
    urban:  { file: "base", ratio: false, margin: 3,    near: 8,   mid: 20 },
    forest: { file: "base", ratio: false, margin: 2,    near: 8,   mid: 20 },
    gdp:    { file: "more", ratio: true,  margin: 0.08, near: 1.5, mid: 3 },
    net:    { file: "more", ratio: false, margin: 3,    near: 8,   mid: 20 },
    dense:  { file: "more", ratio: true,  margin: 0.05, near: 1.6, mid: 4 },
    young:  { file: "more", ratio: false, margin: 1.5,  near: 4,   mid: 10 }
  };

  // The kinds of question. Each asks which of two countries fits: for a figure, the one with more of it (never the
  // one with less: no question ranks countries by what they lack); for a list, the one on One of 193's checked list.
  var KINDS = [
    { id: "pop", key: "pop", head: "Which has more people?", line: "How many people live there" },
    { id: "area", key: "area", head: "Which is bigger?", line: "Its total area, in km²" },
    { id: "life", key: "life", head: "Where do people live longer?", line: "Life expectancy at birth" },
    { id: "urban", key: "urban", head: "Which is more urban?", line: "A bigger share of its people live in towns and cities" },
    { id: "forest", key: "forest", head: "Which has more forest?", line: "A bigger share of its land is forest" },
    { id: "gdp", key: "gdp", head: "Which is richer per person?", line: "GDP per person, adjusted for prices" },
    { id: "net", key: "net", head: "Which is more online?", line: "A bigger share of its people use the internet" },
    { id: "dense", key: "dense", head: "Which is more crowded?", line: "More people per km² of land" },
    { id: "young", key: "young", head: "Which is younger?", line: "A bigger share of its people are under 15" },
    { id: "landlocked", list: "landlocked", head: "Which is landlocked?", line: "No coast on the open sea",
      yes: "{c} is landlocked.", no: "{c} has a coast." },
    { id: "island", list: "island", head: "Which is an island country?", line: "All of its land lies on islands",
      yes: "{c} is an island country.", no: "{c} is not an island country." },
    { id: "med", list: "med", head: "Which has a coast on the Mediterranean?", line: "A coast on the Mediterranean Sea",
      yes: "{c} has a coast on the Mediterranean.", no: "{c} has no coast on the Mediterranean." },
    { id: "equator", list: "equator", head: "Which does the equator cross?", line: "The equator crosses its land",
      yes: "The equator crosses {c}.", no: "The equator does not cross {c}." },
    { id: "china", list: "china", head: "Which borders China?", line: "A land border with China",
      yes: "{c} borders China.", no: "{c} does not border China." },
    { id: "russia", list: "russia", head: "Which borders Russia?", line: "A land border with Russia",
      yes: "{c} borders Russia.", no: "{c} does not border Russia." },
    { id: "left", list: "left", head: "Which drives on the left?", line: "Traffic keeps to the left",
      yes: "In {c}, traffic keeps to the left.", no: "In {c}, traffic keeps to the right." },
    { id: "euro", list: "euro", head: "Which uses the euro?", line: "The euro is its currency",
      yes: "{c} uses the euro.", no: "{c} does not use the euro." }
  ];
  // the country a list is about is never asked about it ("Which borders China: China or ...?")
  var SELF = { china: "CHN", russia: "RUS" };
  // and two countries are left out of one list each, because people and sources differ on them: Australia in "an
  // island country" (a continent or an island?), and the United Kingdom in "a coast on the Mediterranean" (only a
  // country's own land counts, as in One of 193, but its overseas territory Gibraltar has one)
  var LEAVE = { island: "AUS", med: "GBR" };
  function leftOut(list, id) { return SELF[list] === id || LEAVE[list] === id; }

  // The way round the world: the UN's sub-regions in one eastward loop. A journey picks ten of them, starts at one
  // of them at random and keeps to this order (Europe, Africa, Asia, Oceania, the Americas and back to Europe).
  var CYCLE = ["Northern Europe", "Western Europe", "Southern Europe", "Eastern Europe",
               "Northern Africa", "Western Africa", "Middle Africa", "Southern Africa", "Eastern Africa",
               "Western Asia", "Central Asia", "Southern Asia", "South-eastern Asia", "Eastern Asia",
               "Melanesia", "Australia and New Zealand",
               "South America", "Central America", "Caribbean", "Northern America"];
  // how many stops each region gets: two each, one in Oceania, and one more in one of the four others
  var SHARE = { Europe: 2, Africa: 2, Asia: 2, Oceania: 1, Americas: 2 };
  var EXTRA = ["Europe", "Africa", "Asia", "Americas"];

  var C = READY ? BASE.countries : [];
  var byId = {};
  C.forEach(function (c, i) { byId[c.id] = i; });
  var LISTS = READY ? BASE.lists : {};
  var inList = {};
  Object.keys(LISTS).forEach(function (k) {
    inList[k] = {};
    (LISTS[k].ids || []).forEach(function (id) { inList[k][id] = true; });
  });
  var MOREF = (MORE && MORE.f && typeof MORE.f === "object") ? MORE.f : {};
  var MOREFIG = (MORE && MORE.figures && typeof MORE.figures === "object") ? MORE.figures : {};

  function num(v) { return typeof v === "number" && isFinite(v); }
  function country(id) { return C[byId[id]]; }
  // a figure: [value, year], or null
  function fig(id, key) {
    var spec = FIGS[key];
    if (!spec || byId[id] === undefined) return null;
    var f;
    if (spec.file === "base") {
      if (!BASE.figures[key]) return null;
      var c = country(id);
      f = c && c.f && c.f[key];
    } else {
      if (!MOREFIG[key]) return null;
      f = MOREF[id] && MOREF[id][key];
    }
    return (Array.isArray(f) && num(f[0]) && num(f[1])) ? f : null;
  }
  function val(id, key) { var f = fig(id, key); return f ? f[0] : NaN; }
  function meta(key) { return FIGS[key] && (FIGS[key].file === "base" ? BASE.figures[key] : MOREFIG[key]) || null; }
  var POOLED = C.filter(function (c) { return val(c.id, "pop") >= MIN_PEOPLE; }).map(function (c) { return c.id; });
  var isPooled = {};
  POOLED.forEach(function (id) { isPooled[id] = true; });
  var BY_SUB = {};
  POOLED.forEach(function (id) { var s = country(id).sub; (BY_SUB[s] = BY_SUB[s] || []).push(id); });
  var BARS = BAR_IDS.filter(function (b) { return isPooled[b]; });

  function kindById(id) { for (var i = 0; i < KINDS.length; i++) if (KINDS[i].id === id) return KINDS[i]; return null; }
  // a kind can be asked if its figure (with its source) or its list is in the data
  function available(k) {
    if (!k) return false;
    if (k.list) return !!(LISTS[k.list] && Array.isArray(LISTS[k.list].ids) && LISTS[k.list].ids.length);
    return !!meta(k.key);
  }
  // how far apart two figures lie: times (as a logarithm) or points
  function dist(key, v, w) { return FIGS[key].ratio ? Math.abs(Math.log(v / w)) : Math.abs(v - w); }
  function marginOf(key) { var s = FIGS[key]; return s.ratio ? Math.log(1 + s.margin) : s.margin; }
  function nearOf(key) { var s = FIGS[key]; return s.ratio ? Math.log(s.near) : s.near; }
  function midOf(key) { var s = FIGS[key]; return s.ratio ? Math.log(s.mid) : s.mid; }
  // too close to be fair: a revision could flip it, or the two figures would look the same on screen
  function tooClose(key, a, b) {
    var v = val(a, key), w = val(b, key);
    if (!(dist(key, v, w) > marginOf(key))) return true;
    var sv = shown(key, v), sw = shown(key, w);
    return sv === sw || (sv > sw) !== (v > w);
  }
  /* how hard a stop's question is, by the stop: 0 big differences (stops 1 to 3), 1 middle ones (4 to 6),
     2 middle or close (7 and 8), 3 close calls (9 and 10) */
  function level(s) { return s < 3 ? 0 : s < 6 ? 1 : s < 8 ? 2 : 3; }
  function inLevel(key, d, lv) {
    var near = nearOf(key), mid = midOf(key);
    return lv === 0 ? d > mid : lv === 1 ? (d > near && d <= mid) : lv === 2 ? d <= mid : d <= near;
  }

  /* a random number generator that can be seeded (a journey is made from its seed, so that a friend's link
     deals the same questions; the checks use seeds too) */
  function seeded(seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pickOne(a, rnd) { return a[Math.floor(rnd() * a.length)]; }
  function sortKey(id) { var n = country(id).name; return n.normalize ? n.normalize("NFD").replace(/[̀-ͯ]/g, "") : n; }
  function byName(a, b) { return sortKey(a).localeCompare(sortKey(b), "en"); }
  function cyclePos(id) { return CYCLE.indexOf(country(id).sub); }

  /* ---------- the route: ten stops round the world ---------- */
  function makeRoute(seed, recent) {
    var rnd = seeded(seed), avoid = {};
    (recent || []).forEach(function (id) { avoid[id] = true; });
    var want = {};
    Object.keys(SHARE).forEach(function (r) { want[r] = SHARE[r]; });
    want[pickOne(EXTRA, rnd)]++;
    var stops = [];
    function choose(ids) {                      // a country the table has not had lately, if there is one
      var fresh = ids.filter(function (id) { return !avoid[id] && stops.indexOf(id) < 0; });
      var all = ids.filter(function (id) { return stops.indexOf(id) < 0; });
      return pickOne(fresh.length ? fresh : all, rnd);
    }
    ["Europe", "Africa", "Asia", "Oceania", "Americas"].forEach(function (region) {
      var subs = CYCLE.filter(function (s) {
        return (BY_SUB[s] || []).length && country(BY_SUB[s][0]).region === region;
      });
      if (region === "Oceania") {               // by country, so that Papua New Guinea is one of three
        var all = [];
        subs.forEach(function (s) { all = all.concat(BY_SUB[s]); });
        stops.push(choose(all));
        return;
      }
      shuffle(subs, rnd).slice(0, want[region]).forEach(function (s) { stops.push(choose(BY_SUB[s])); });
    });
    var start = Math.floor(rnd() * CYCLE.length);
    function from(id) { return (cyclePos(id) - start + CYCLE.length) % CYCLE.length; }
    return stops.sort(function (a, b) { return from(a) - from(b); });
  }
  // a route from a friend's link or the browser's storage: ten different stops, each a country of a million people
  function routeOk(r) {
    if (!Array.isArray(r) || r.length !== STOPS) return false;
    var seen = {};
    for (var i = 0; i < r.length; i++) {
      if (typeof r[i] !== "string" || !isPooled[r[i]] || seen[r[i]]) return false;
      seen[r[i]] = true;
    }
    return true;
  }

  /* ---------- the questions ---------- */
  // which of the two fits: the one with more of the figure, or the one on the list
  function answerOf(q) {
    var k = kindById(q.k);
    if (k.list) return inList[k.list][q.s] ? q.s : q.o;
    return val(q.s, k.key) > val(q.o, k.key) ? q.s : q.o;
  }
  // is a question fair on today's data? (also for questions kept in the browser)
  function questionOk(q) {
    if (!q || typeof q !== "object") return false;
    var k = kindById(q.k);
    if (!available(k) || !isPooled[q.s] || !isPooled[q.o] || q.s === q.o) return false;
    if (k.list) {
      if (leftOut(k.list, q.s) || leftOut(k.list, q.o)) return false;
      return !!inList[k.list][q.s] !== !!inList[k.list][q.o];
    }
    if (!num(val(q.s, k.key)) || !num(val(q.o, k.key))) return false;
    if (BARS.indexOf(q.o) < 0) return false;
    return !tooClose(k.key, q.s, q.o);
  }
  // a question of kind k about stop s at level lv; null if none is fair
  function build(k, s, lv, rnd, used, want) {
    if (k.list) {
      if (leftOut(k.list, s)) return null;
      var on = !!inList[k.list][s], c = country(s);
      if (on !== want) return null;              // the stop is the answer exactly when it is on the list
      var opp = POOLED.filter(function (id) { return id !== s && !!inList[k.list][id] !== on && !leftOut(k.list, id); });
      var t1 = opp.filter(function (id) { return country(id).sub === c.sub; });
      var t2 = opp.filter(function (id) { return country(id).region === c.region; });
      var from = t1.length ? t1 : t2;
      if (!from.length) return null;
      var fresh = from.filter(function (id) { return !used[id]; });
      return { k: k.id, s: s, o: pickOne(fresh.length ? fresh : from, rnd) };
    }
    var w = val(s, k.key);
    if (!num(w)) return null;
    var cands = BARS.filter(function (b) {
      if (b === s || !num(val(b, k.key)) || tooClose(k.key, b, s)) return false;
      return inLevel(k.key, dist(k.key, val(b, k.key), w), lv);
    });
    if (!cands.length) return null;
    var fresh2 = cands.filter(function (b) { return !used[b]; });
    var pool = fresh2.length ? fresh2 : cands;
    var side = pool.filter(function (b) { return (w > val(b, k.key)) === want; });
    return side.length ? { k: k.id, s: s, o: pickOne(side, rnd) } : null;
  }
  /* The whole journey's questions, made from its route and seed: three per stop (the first try, and new questions
     for the next players if a try goes wrong: three lives allow at most three tries at one stop). The first tries
     of two stops in a row never ask the same thing; a stop's tries never repeat a kind; a list comes from the
     third stop on, never right after a list, and at most three times among the first tries; no kind more than
     twice among them. The comparison countries change as long as there are new ones. */
  function makeTable(route, seed) {
    var rnd = seeded((seed ^ 0x5bd1e995) >>> 0), table = [], firsts = [], count = {}, used = {};
    route.forEach(function (id) { used[id] = true; });
    for (var s = 0; s < STOPS; s++) {
      var row = [];
      for (var j = 0; j < LIVES; j++) {
        var prev = j === 0 ? (s ? firsts[s - 1] : null) : row[j - 1].k;
        var lists = firsts.filter(function (id) { return !!kindById(id).list; }).length;
        var cands = KINDS.filter(function (k) {
          if (!available(k)) return false;
          if (row.some(function (q) { return q.k === k.id; }) || k.id === prev) return false;
          if (k.list && (s < 2 || (prev && kindById(prev).list) || (j === 0 && lists >= 3))) return false;
          if (j === 0 && (count[k.id] || 0) >= 2) return false;
          return true;
        });
        shuffle(cands, rnd);
        var q = null, want = rnd() < 0.5;       // the stop is the answer about half the time
        for (var side = 0; side < 2 && !q; side++) {
          for (var lv = level(s); lv >= 0 && !q; lv--) {
            for (var i = 0; i < cands.length && !q; i++) q = build(cands[i], route[s], lv, rnd, used, side ? !want : want);
          }
        }
        // never without a question: any kind of figure not asked at this stop yet, either way round, at its level or
        // an easier one, and only if there is none at all, a harder one (in 600,000 questions this never happened)
        var tryLv = [];
        for (var a = level(s); a >= 0; a--) tryLv.push(a);
        for (var b2 = level(s) + 1; b2 <= 3; b2++) tryLv.push(b2);
        for (var i2 = 0; i2 < KINDS.length && !q; i2++) {
          var k2 = KINDS[i2];
          if (k2.list || !available(k2) || row.some(function (x) { return x.k === k2.id; })) continue;
          for (var t2 = 0; t2 < tryLv.length && !q; t2++) q = build(k2, route[s], tryLv[t2], rnd, used, true) || build(k2, route[s], tryLv[t2], rnd, used, false);
        }
        row.push(q);
        if (q) used[q.o] = true;
        if (j === 0 && q) { firsts.push(q.k); count[q.k] = (count[q.k] || 0) + 1; }
      }
      table.push(row);
    }
    return table;
  }
  function tableOk(route, t) {
    if (!routeOk(route) || !Array.isArray(t) || t.length !== STOPS) return false;
    for (var s = 0; s < STOPS; s++) {
      if (!Array.isArray(t[s]) || t[s].length !== LIVES) return false;
      for (var j = 0; j < LIVES; j++) if (!questionOk(t[s][j]) || t[s][j].s !== route[s]) return false;
    }
    return true;
  }

  /* ---------- words and numbers (as in Still In) ---------- */
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function fmtPeople(v) {
    if (v >= 1e9) return (Math.round(v / 1e7) / 100).toFixed(2) + " billion";
    if (v >= 1e6) return (Math.round(v / 1e5) / 10).toFixed(1) + " million";
    return commas(v);
  }
  // a figure rounded as it is shown (two countries in a question never look the same)
  function shown(key, v) {
    switch (key) {
      case "pop": return v >= 1e9 ? Math.round(v / 1e7) * 1e7 : v >= 1e6 ? Math.round(v / 1e5) * 1e5 : Math.round(v);
      case "area": return Math.round(v);
      case "life": return Math.round(v * 10) / 10;
      case "gdp": if (v >= 1000) { var p = Math.pow(10, Math.floor(Math.log10(v)) - 2); return Math.round(v / p) * p; } return Math.round(v);
      case "dense": return v < 100 ? Math.round(v * 10) / 10 : Math.round(v);
      default: return Math.round(v);                    // urban, forest, net, young: whole percentages
    }
  }
  function short(key, v) {                              // a figure in words, as it stands in a sentence
    var s = shown(key, v);
    switch (key) {
      case "pop": return fmtPeople(v);
      case "area": return commas(s) + " km²";
      case "life": return s.toFixed(1) + " years";
      case "gdp": return "$" + commas(s);
      case "dense": return (v < 100 ? s.toFixed(1) : commas(s)) + " per km²";
      default: return s + "%";
    }
  }
  function tileValue(key, v) {                          // a little shorter, under a name on an answer
    var s = shown(key, v);
    switch (key) {
      case "pop": return fmtPeople(v);
      case "area": return commas(s) + " km²";
      case "life": return s.toFixed(1) + " years";
      case "gdp": return "$" + commas(s);
      case "dense": return (v < 100 ? s.toFixed(1) : commas(s)) + " /km²";
      default: return s + "%";
    }
  }
  function cname(id) { return country(id).name; }
  // in a sentence some names take "the" (the Netherlands, the United States); the answers and the route show the bare name
  var THE = { ARE: 1, BHS: 1, CAF: 1, COM: 1, DOM: 1, GBR: 1, GMB: 1, MDV: 1, MHL: 1, NLD: 1, PHL: 1, SLB: 1, SYC: 1, USA: 1 };
  function inText(id) { return (THE[id] ? "the " : "") + cname(id); }
  function upFirst(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  // a whole sentence about one country's figure: it says what the number counts
  function says(key, id) {
    var f = fig(id, key), v = f[0], n = inText(id), s = short(key, v);
    switch (key) {
      case "pop": return upFirst(n) + " has " + s + " people";
      case "area": return upFirst(n) + " covers " + s;
      case "life": return "Life expectancy in " + n + " is " + s;
      case "urban": return "In " + n + ", " + s + " of people live in towns and cities";
      case "forest": return "In " + n + ", forest covers " + s + " of the land";
      case "gdp": return "In " + n + ", GDP per person is " + s + ", adjusted for prices";
      case "net": return "In " + n + ", " + s + " of people use the internet";
      case "dense": return upFirst(n) + " has " + s.replace(" per km²", "") + " people per km² of land";
      case "young": return "In " + n + ", " + s + " of people are under 15";
    }
    return upFirst(n) + ": " + s;
  }
  function yearOf(key, id) { var f = fig(id, key); return f ? f[1] : null; }
  // the two answers in the order shown: by name
  function pairOf(q) { return [q.s, q.o].sort(byName); }
  // what the reveal says: one sentence per country (the figure's year where the two years differ), and the year
  function factsOf(q) {
    var k = kindById(q.k), pair = pairOf(q);
    if (k.list) return pair.map(function (id) { return upFirst((inList[k.list][id] ? k.yes : k.no).replace("{c}", inText(id))); });
    var y0 = yearOf(k.key, pair[0]), y1 = yearOf(k.key, pair[1]);
    return pair.map(function (id) { return says(k.key, id) + (y0 === y1 ? "." : " (" + yearOf(k.key, id) + ")."); });
  }
  function yearsOf(q) {
    var k = kindById(q.k);
    if (k.list) return "";
    var y = [yearOf(k.key, q.s), yearOf(k.key, q.o)].sort();
    return y[0] === y[1] ? String(y[0]) : y[0] + " and " + y[1];
  }
  function sourceOf(q) {                     // the sources of a question
    var k = kindById(q.k);
    if (k.list) return (LISTS[k.list].src || []).map(function (s) { return { name: s.name, url: s.url }; });
    var m = meta(k.key) || {};
    return [{ name: "World Bank: " + (m.name || k.key), url: m.url || "https://data.worldbank.org/" }];
  }
  function better(a, b) { return !b || a.s > b.s || (a.s === b.s && a.l > b.l); }

  var CORE = {
    ready: READY, KINDS: KINDS, FIGS: FIGS, BAR_IDS: BAR_IDS, CYCLE: CYCLE, STOPS: STOPS, LIVES: LIVES, ASKS: ASKS,
    MIN_PEOPLE: MIN_PEOPLE, THE: THE,
    pooled: function () { return POOLED.slice(); },
    bars: function () { return BARS.slice(); },
    route: function (seed, recent) { return makeRoute(seed, recent || []); },
    routeOk: routeOk,
    table: function (route, seed) { return makeTable(route, seed); },
    tableOk: tableOk,
    questionOk: questionOk,
    level: level,
    answer: answerOf,
    pair: pairOf,
    facts: factsOf,
    years: yearsOf,
    sources: sourceOf,
    head: function (kid) { var k = kindById(kid); return k ? k.head : ""; },
    line: function (kid) { var k = kindById(kid); return k ? k.line : ""; },
    value: function (id, key) { return fig(id, key); },
    tileValue: tileValue, short: short, says: says, shown: shown, margin: marginOf, inText: inText,
    better: better
  };
  if (typeof window !== "undefined") window.BeatThePhone = CORE;
  if (!HAS_DOC) return;

  /* ================================================================================================
     The page
     ================================================================================================ */
  if (!TO || !READY) {
    var t0 = $("start-title");
    if (t0) t0.textContent = "The countries could not be loaded. Please try again in a moment.";
    var b0 = $("btn-start");
    if (b0) b0.hidden = true;
    var p0 = document.querySelector(".b-players");
    if (p0) p0.hidden = true;
    return;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }
  function clean(s) { return String(s || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 14); }
  function stored() { return TO.group(GAME); }
  var HEART = "M12 20.6 4.1 12.9C1.5 10.4 1.6 6.3 4.3 4.4c2.2-1.6 5.3-1.1 7 1l.7.9.7-.9c1.7-2.1 4.8-2.6 7-1 2.7 1.9 2.8 6 .2 8.5Z";
  function hearts(box, left, lost) {         // three hearts: full for each life left, an outline in yellow for each lost
    box.innerHTML = "";
    for (var i = 0; i < LIVES; i++) {
      var on = i < left;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", "b-heart" + (on ? "" : " lost") + (lost && i === left ? " now" : ""));
      svg.setAttribute("aria-hidden", "true");
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", HEART);
      svg.appendChild(p);
      box.appendChild(svg);
    }
  }

  /* ---------- who plays: how many, and their names (optional). They live only while the page is open. ---------- */
  function blankSetup() {
    var nm = [];
    while (nm.length < PLAYERS_MAX) nm.push("");
    return { n: 3, names: nm };
  }
  var setup = blankSetup();
  function nameOf(i) { return setup.names[i] || "Player " + (i + 1); }
  /* the table of this sitting: who starts the next journey */
  var table = { next: 0 };
  /* what earlier versions kept in the browser (names, a journey going on) is cleared: nothing about the players stays */
  TO.groupUpdate(GAME, function (g) { delete g.cur; delete g.names; delete g.next; delete g.n; });

  /* ---------- the journey, in the page only: a new opening of the page (or Restart) starts afresh ----------
     { p: names, route: [ten countries], seed, tab: [[[kind, other] for each of three tries] for each stop],
       stop: the stops cleared (the table stands at stop + 1), lives, asks (times left to ask the table), turn, first,
       log: [[stop, try, player, country picked, 1 right / 0 wrong, 1 if the table was asked]], asked (this question),
       phase: "pass" (the phone is being handed on), "q" (a question is open) or "shown" (its answer is shown) } */
  var game = null, picked = "", view = "start";
  function qAt(s, j) { return { k: game.tab[s][j][0], s: game.route[s], o: game.tab[s][j][1] }; }
  function triesAt(s) { var n = 0; game.log.forEach(function (e) { if (e[0] === s) n++; }); return n; }
  function curQ() { return qAt(game.stop, triesAt(game.stop)); }
  function lastEntry() { return game.log.length ? game.log[game.log.length - 1] : null; }
  function over() { return game.stop >= STOPS || game.lives <= 0; }
  function validGame(x) {
    if (!x || typeof x !== "object" || !Array.isArray(x.p) || x.p.length < PLAYERS_MIN || x.p.length > PLAYERS_MAX) return false;
    if (!routeOk(x.route) || !num(x.seed) || !Array.isArray(x.tab) || x.tab.length !== STOPS || !Array.isArray(x.log)) return false;
    for (var s = 0; s < STOPS; s++) {
      if (!Array.isArray(x.tab[s]) || x.tab[s].length !== LIVES) return false;
      for (var j = 0; j < LIVES; j++) {
        var t = x.tab[s][j];
        if (!Array.isArray(t) || t.length !== 2 || !questionOk({ k: t[0], s: x.route[s], o: t[1] })) return false;
      }
    }
    if (!num(x.turn) || x.turn < 0 || x.turn >= x.p.length || !num(x.first) || x.first < 0 || x.first >= x.p.length) return false;
    if (["pass", "q", "shown"].indexOf(x.phase) < 0) return false;
    // the log must tell the same story as the stop, the lives and the asks
    var stop = 0, lives = LIVES, asks = ASKS, tries = {};
    for (var i = 0; i < x.log.length; i++) {
      var e = x.log[i];
      if (stop >= STOPS || lives <= 0) return false;
      if (!Array.isArray(e) || e.length !== 6 || e[0] !== stop || e[1] !== (tries[stop] || 0) || !num(e[2]) || e[2] < 0 || e[2] >= x.p.length) return false;
      var q = { k: x.tab[stop][e[1]][0], s: x.route[stop], o: x.tab[stop][e[1]][1] };
      if ((e[3] !== q.s && e[3] !== q.o) || (e[3] === answerOf(q) ? 1 : 0) !== e[4] || (e[5] !== 0 && e[5] !== 1)) return false;
      if (e[5]) asks--;
      if (e[4]) stop++; else { lives--; tries[stop] = (tries[stop] || 0) + 1; }
    }
    if (x.asked) asks--;
    if (stop !== x.stop || lives !== x.lives || asks !== x.asks || asks < 0) return false;
    if (stop >= STOPS || lives <= 0) return false;                       // a journey that is over is never kept
    if (x.phase === "shown" && !x.log.length) return false;
    return true;
  }
  function resume(cur) {            // a journey as the checks hand it over (CORE.load)
    cur = JSON.parse(JSON.stringify(cur));
    cur.p = cur.p.map(function (s, i) { return clean(s) || "Player " + (i + 1); });
    cur.asked = cur.asked ? 1 : 0;
    if (cur.phase !== "q") cur.asked = 0;
    return cur;
  }
  function recentList() {
    var r = stored().recent;
    return Array.isArray(r) ? r.filter(function (x) { return typeof x === "string"; }).slice(-RECENT) : [];
  }
  function newJourney(f) {
    var first = num(table.next) && table.next >= 0 && table.next < setup.n ? table.next : 0;
    var seed = 0, route = null, tab = null;
    if (f) { seed = f.seed; route = f.route.slice(); tab = makeTable(route, seed); if (!tableOk(route, tab)) { route = null; } }
    for (var n = 0; n < 20 && !route; n++) {             // a new journey (a table that cannot be made is never dealt)
      seed = 1 + Math.floor(Math.random() * 2147483646);
      route = makeRoute(seed, recentList());
      tab = makeTable(route, seed);
      if (!tableOk(route, tab)) route = null;
    }
    game = { p: [], route: route, seed: seed, tab: tab.map(function (row) { return row.map(function (q) { return [q.k, q.o]; }); }),
             stop: 0, lives: LIVES, asks: ASKS, turn: first, first: first, log: [], asked: 0, phase: "pass" };
    for (var i = 0; i < setup.n; i++) game.p.push(nameOf(i));
    TO.groupUpdate(GAME, function (g2) {
      var r2 = Array.isArray(g2.recent) ? g2.recent.filter(function (x) { return typeof x === "string"; }) : [];
      g2.recent = r2.concat(route).slice(-RECENT);
    });
    TO.count(GAME + "/started");
  }

  /* ---------- the views ---------- */
  var views = { start: $("v-start"), hand: $("v-hand"), play: $("v-play"), end: $("v-end") };
  function show(v) {
    view = v;
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.setAttribute("data-view", v);
    restartChip();
    fit();
  }
  function restartChip() { $("btn-restart").hidden = !(game && !over()); }      // Restart only while a journey is in play
  /* every view must fit the screen without scrolling: step down until it does */
  function fit() {
    var b = document.body;
    b.classList.remove("fit1", "fit2", "fit3");
    ["fit1", "fit2", "fit3"].forEach(function (k) {
      if (document.documentElement.scrollHeight > window.innerHeight) b.classList.add(k);
    });
  }
  window.addEventListener("resize", fit);

  /* the start */
  var params = new URLSearchParams(window.location.search);
  var friend = null;
  (function () {
    var j = params.get("j"), s = params.get("s"), k = params.get("k"), l = params.get("l");
    if (!j || !s || !/^\d{1,10}$/.test(s)) return;
    var route = String(j).toUpperCase().split(".");
    var seed = parseInt(s, 10);
    if (!routeOk(route) || !(seed >= 1 && seed <= 2147483647) || !tableOk(route, makeTable(route, seed))) return;
    var stops = /^\d{1,2}$/.test(k || "") ? parseInt(k, 10) : null, lives = /^\d$/.test(l || "") ? parseInt(l, 10) : null;
    if (stops !== null && stops > STOPS) stops = null;
    if (lives !== null && lives > LIVES) lives = null;
    friend = { route: route, seed: seed, k: stops, l: lives };
  })();
  function friendLine(f) {
    var did = f.k === null ? "" : f.k >= STOPS
      ? " and went round the world" + (f.l === null ? "" : f.l === LIVES ? " without losing a life" : " with " + plural(f.l, "life", "lives") + " left")
      : " and got to stop " + (f.k + 1) + " of " + STOPS;
    return "A friend's table played this route of ten stops" + did + ". Can your table beat the phone?";
  }
  function renderSetup() {
    $("players-n").textContent = String(setup.n);
    $("btn-fewer").disabled = setup.n <= PLAYERS_MIN;
    $("btn-more").disabled = setup.n >= PLAYERS_MAX;
    var line = [];
    for (var i = 0; i < setup.n; i++) line.push(nameOf(i));
    $("names-line").textContent = line.join(" · ");
    if (view === "start") fit();
  }
  function renderNameFields() {
    var box = $("name-fields");
    box.innerHTML = "";
    for (var i = 0; i < setup.n; i++) {
      (function (i) {
        var lab = el("label", "b-name-field");
        lab.appendChild(el("span", "b-name-n", String(i + 1)));
        var inp = el("input");
        inp.type = "text";
        inp.maxLength = 14;
        inp.autocomplete = "off";
        inp.spellcheck = false;
        inp.placeholder = "Player " + (i + 1);
        inp.value = setup.names[i];
        inp.setAttribute("aria-label", "Name of player " + (i + 1));
        inp.addEventListener("input", function () { setup.names[i] = clean(inp.value); renderSetup(); });
        lab.appendChild(inp);
        box.appendChild(lab);
      })(i);
    }
  }
  function showStart() {
    show("start");
    renderSetup();
    var f = $("friend");
    if (friend) {
      f.textContent = friendLine(friend);
      f.hidden = false;
      $("btn-start").textContent = "Play their route";
    } else {
      f.hidden = true;
      $("btn-start").textContent = "Start";
    }
    fit();
  }

  /* ---------- the route, as a line of ten stops (no map) ---------- */
  function stopState(s) {                    // "done", "now", "end" (the journey ended there) or "ahead"; and lives lost there
    var lost = 0;
    game.log.forEach(function (e) { if (e[0] === s && !e[4]) lost++; });
    var st = s < game.stop ? "done" : s === game.stop ? (game.lives <= 0 ? "end" : "now") : "ahead";
    return { st: st, lost: lost };
  }
  function renderStrip() {
    var box = $("strip");
    box.innerHTML = "";
    for (var s = 0; s < STOPS; s++) {
      var x = stopState(s);
      box.appendChild(el("li", "b-dot " + x.st + (x.lost ? " lost" : "")));
    }
    var here = Math.min(game.stop, STOPS - 1);
    $("btn-route").setAttribute("aria-label", "The route: stop " + (here + 1) + " of " + STOPS + ", " + cname(game.route[here]) +
      ". " + plural(game.stop, "stop", "stops") + " cleared. Show the whole journey.");
  }
  function renderLives(justLost) {
    hearts($("lives"), game.lives, justLost);
    $("lives").setAttribute("aria-label", plural(game.lives, "life", "lives") + " left");
  }

  /* ---------- passing the phone (as in Still In and So-Called Expert): whenever the phone goes to another player,
     a whole screen says what just happened and to whom the phone goes, and the next player taps to say they have it.
     ---------- */
  function handRecap() {
    var e = lastEntry();
    if (!e) {
      var t0 = "A new journey: ten stops round the world, and three lives.";
      return { mark: "", cls: "", text: t0, spoken: t0 };
    }
    if (e[4]) {
      var t1 = "On to stop " + (game.stop + 1) + " of " + STOPS + ".";
      return { mark: "Right!", cls: "b-hand-ok", text: t1, spoken: "Right! " + t1 };
    }
    var t2 = "One life lost: " + plural(game.lives, "life", "lives") + " left. A new question at the same stop.";
    return { mark: "Wrong.", cls: "b-no", text: t2, spoken: "Wrong. " + t2 };
  }
  function showHand() {
    game.phase = "pass";
    picked = "";
    var who = game.p[game.turn], rc = handRecap(), res = $("hand-res"), here = game.route[game.stop];
    res.innerHTML = "";
    if (rc.mark) { res.appendChild(el("b", rc.cls, rc.mark)); res.appendChild(document.createTextNode(" ")); }
    res.appendChild(document.createTextNode(rc.text));
    var line = "Stop " + (game.stop + 1) + " of " + STOPS + ": " + cname(here) + ". " + who + " answers alone.";
    res.setAttribute("aria-label", rc.spoken + " Pass the phone to " + who + ". " + line);
    $("hand-name").textContent = who;
    $("hand-line").textContent = line;
    $("btn-hand").textContent = who + " has the phone";
    $("hand-k").textContent = plural(game.lives, "life", "lives") + " left · " + (game.asks ? "ask the table " + (game.asks === 1 ? "once more" : "twice") : "no asks left");
    show("hand");
    fitHandName();
    $("btn-hand").focus();
  }
  function fitHandName() {                   // a long name gets smaller until it fits on one line
    var n = $("hand-name");
    n.style.fontSize = "";
    var size = parseFloat(window.getComputedStyle(n).fontSize) || 48;
    while (n.scrollWidth > n.clientWidth + 1 && size > 22) { size -= 2; n.style.fontSize = size + "px"; }
    fit();
  }
  function handed() {                        // the next player has the phone: the stop's question
    if (!game || game.phase !== "pass") return;
    game.phase = "q";
    game.asked = 0;
    showPlay();
    var t = $("pair").querySelector(".b-ans");
    if (t) t.focus();
  }

  /* ---------- a stop: the question, the two answers, and after the answer the real figures ---------- */
  function shownQ() {                        // the question on the screen: the open one, or the one just answered
    if (game.phase === "shown") { var e = lastEntry(); return qAt(e[0], e[1]); }
    return curQ();
  }
  function showPlay() {
    if (game.phase !== "shown") picked = "";
    show("play");
    renderPlay();
    fit();
  }
  function renderPlay(justLost) {
    var q = shownQ(), k = kindById(q.k), e = game.phase === "shown" ? lastEntry() : null;
    var s = e ? e[0] : game.stop, c = country(q.s);
    renderStrip();
    renderLives(justLost);
    $("stop-k").textContent = "Stop " + (s + 1) + " of " + STOPS + " · " + c.sub;
    var nm = $("stop-name");
    nm.textContent = c.name;
    nm.classList.toggle("long", c.name.length > 15);
    $("q-head").textContent = k.head;
    $("q-line").textContent = k.line;
    $("q").classList.toggle("is-list", !!k.list);
    renderPair(q, e);
    var who = game.p[e ? e[2] : game.turn];
    $("turn-name").textContent = who;
    $("turn-cap").textContent = e ? (e[5] ? " asked the table" : " answered alone") : game.asked ? " asks the table" : " answers alone";
    var ask = $("btn-ask");
    ask.disabled = !!game.asked || game.asks <= 0;
    ask.hidden = !!e || !!game.asked;
    $("asks-n").textContent = game.asks ? String(game.asks) + " left" : "none left";
    ask.setAttribute("aria-label", game.asked ? "The table is asked about this question." : game.asks ? "Ask the table: everyone may talk about this question. " + plural(game.asks, "time", "times") + " left in this journey." : "No more times to ask the table in this journey.");
    var say = $("say"), src = $("src");
    src.innerHTML = "";
    if (e) {
      var right = !!e[4], facts = factsOf(q);
      say.innerHTML = "";
      say.appendChild(el("b", right ? "b-ok" : "b-no", right ? "Right!" : "Wrong."));
      say.appendChild(document.createTextNode(" " + facts.join(" ")));
      var tail = right ? (game.stop >= STOPS ? " That was the tenth stop!" : "")
                       : (game.lives <= 0 ? " That was the last life." : " One life lost.");
      if (tail) say.appendChild(el("span", "b-say-tail", tail));
      say.setAttribute("aria-label", (right ? "Right! " : "Wrong. ") + facts.join(" ") + tail);
      say.hidden = false;
      src.appendChild(document.createTextNode(k.list ? "Checked on " : "Source: "));
      sourceOf(q).forEach(function (x, i) {
        if (i) src.appendChild(document.createTextNode(" · "));
        var a = el("a", "", x.name);
        a.href = x.url; a.target = "_blank"; a.rel = "noopener";
        src.appendChild(a);
      });
      if (!k.list) src.appendChild(document.createTextNode(" (" + yearsOf(q) + "; CC BY 4.0)"));
      src.hidden = false;
    } else if (game.asked) {
      say.textContent = "Everyone may talk about this one. " + who + " gives the answer.";
      say.removeAttribute("aria-label");
      say.hidden = false;
      src.hidden = true;
    } else {
      say.textContent = "";
      say.removeAttribute("aria-label");
      say.hidden = true;
      src.hidden = true;
    }
    setGo();
  }
  function renderPair(q, e) {
    var box = $("pair"), k = kindById(q.k), fit2 = answerOf(q);
    box.innerHTML = "";
    pairOf(q).forEach(function (id, i) {
      var b = el("button", "b-ans");
      b.type = "button";
      b.setAttribute("data-c", id);
      var n = el("span", "b-ans-n", cname(id));
      if (cname(id).length > 15) n.classList.add("long");
      b.appendChild(n);
      if (e) {
        var isFit = id === fit2, isPick = id === e[3];
        b.classList.add(isFit ? "right" : isPick ? "wrong" : "other");
        if (isPick) b.classList.add("picked");
        var v = k.list ? (isFit ? "yes" : "no") : tileValue(k.key, val(id, k.key));
        b.appendChild(el("span", "b-ans-v" + (k.key === "area" ? " is-area" : ""), (isFit ? "✓ " : isPick ? "✗ " : "") + v));
        b.setAttribute("aria-disabled", "true");
        b.setAttribute("aria-label", cname(id) + ": " + (k.list ? (isFit ? "yes" : "no") : short(k.key, val(id, k.key))) +
          (isFit ? ". The right answer" : ". Not the answer") + (isPick ? ", picked by " + game.p[e[2]] + "." : "."));
      } else {
        if (id === picked) b.classList.add("on");
        b.setAttribute("aria-pressed", id === picked ? "true" : "false");
        b.setAttribute("aria-label", cname(id));
      }
      b.addEventListener("click", function () { pick(id); });
      b.addEventListener("keydown", function (ev) {     // the arrows move between the two answers
        if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight" && ev.key !== "ArrowUp" && ev.key !== "ArrowDown") return;
        ev.preventDefault();
        var all = box.querySelectorAll(".b-ans"), to = all[i === 0 ? 1 : 0];
        if (to) to.focus();
      });
      box.appendChild(b);
    });
  }
  function pick(id) {
    if (!game || game.phase !== "q") return;
    picked = picked === id ? "" : id;
    Array.prototype.forEach.call($("pair").querySelectorAll(".b-ans"), function (x) {
      var on = x.getAttribute("data-c") === picked;
      x.classList.toggle("on", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    setGo();
  }
  function setGo() {
    var b = $("btn-go");
    if (game.phase === "shown") {
      b.disabled = false;
      b.textContent = over() ? "See how it ended" : "Pass the phone";
      return;
    }
    b.disabled = !picked;
    b.textContent = picked ? "Go with " + inText(picked) : "Pick one";
  }
  function goButton() {
    if (!game) return;
    if (game.phase === "shown") { if (over()) showEnd(); else passOn(); return; }
    answer();
  }
  function answer() {
    if (!game || game.phase !== "q" || !picked) return;
    var q = curQ(), j = triesAt(game.stop), right = picked === answerOf(q);
    game.log.push([game.stop, j, game.turn, picked, right ? 1 : 0, game.asked ? 1 : 0]);
    game.asked = 0;
    if (right) game.stop++; else game.lives--;
    game.phase = "shown";
    picked = "";
    if (over()) finish();
    renderPlay(!right);
    flip();
    fit();
    $("btn-go").focus();
  }
  function flip() {
    if (TO.reducedMotion()) return;
    Array.prototype.forEach.call($("pair").querySelectorAll(".b-ans"), function (t) {
      t.classList.add("flip");
      window.setTimeout(function () { t.classList.remove("flip"); }, 420);
    });
  }
  function askTable() {
    if (!game || game.phase !== "q" || game.asked || game.asks <= 0) return;
    game.asks--;
    game.asked = 1;
    renderPlay();
    fit();
    var t = $("pair").querySelector(".b-ans.on") || $("pair").querySelector(".b-ans");
    if (t) t.focus();
  }
  function passOn() {
    game.turn = (game.turn + 1) % game.p.length;
    showHand();
  }

  /* ---------- the end ---------- */
  var result = null;                          // { route, seed, s: stops cleared, l: lives left, end: where it ended }
  function finish() {
    var won = game.stop >= STOPS;
    result = { route: game.route.slice(), seed: game.seed, s: game.stop, l: game.lives, log: game.log.slice(), p: game.p.slice() };
    var rec = { s: game.stop, l: game.lives }, was = stored().best;
    var wasOk = was && num(was.s) && num(was.l) ? was : null;
    result.newBest = better(rec, wasOk);
    result.hadBest = !!wasOk;
    TO.groupUpdate(GAME, function (g) {
      g.journeys = (num(g.journeys) ? g.journeys : 0) + 1;
      if (won) g.world = (num(g.world) ? g.world : 0) + 1;
      if (won && game.lives === LIVES) g.perfect = (num(g.perfect) ? g.perfect : 0) + 1;
      if (better(rec, g.best && num(g.best.s) && num(g.best.l) ? g.best : null)) g.best = rec;
    });
    table.next = (game.first + 1) % game.p.length;          // the next journey starts with the next player
    restartChip();
    TO.count(GAME + "/finished");
    bestLine();
    prepareCard();
  }
  function recordText(b) {                    // a journey's result in a few words
    if (!b) return "";
    if (b.s >= STOPS) return b.l === LIVES ? "round the world without losing a life" : "round the world with " + plural(b.l, "life", "lives") + " left";
    return "stop " + (b.s + 1) + " of " + STOPS;
  }
  function showEnd() {
    renderEnd();
    show("end");
    $("btn-again").focus();
  }
  function renderEnd() {
    var r = result, won = r.s >= STOPS;
    $("end-k").textContent = "Journey over";
    $("end-head").textContent = won ? "You beat the phone!" : "The phone wins.";
    $("end-line").textContent = won
      ? (r.l === LIVES ? "Round the world in ten stops, without losing a life. A perfect journey!" : "Round the world in ten stops, with " + plural(r.l, "life", "lives") + " left.")
      : "Your journey ended in " + inText(r.route[r.s]) + ", at stop " + (r.s + 1) + " of " + STOPS + ".";
    var box = $("trip");
    box.innerHTML = "";
    r.route.forEach(function (id, s) {
      var marks = "", lost = 0;
      r.log.forEach(function (e) { if (e[0] === s) { if (e[4]) marks += "✓"; else lost++; } });
      var st = s < r.s ? "done" : s === r.s && !won ? "end" : "ahead";
      var li = el("li", "b-trip-i " + st);
      li.appendChild(el("span", "b-trip-n", String(s + 1)));
      li.appendChild(el("span", "b-trip-c" + (cname(id).length > 13 ? " long" : ""), cname(id)));
      var m = el("span", "b-trip-m");
      for (var i = 0; i < lost; i++) m.appendChild(el("i", "b-x"));          // a yellow dot for each life lost there
      if (marks) m.appendChild(el("i", "b-v", "✓"));
      li.appendChild(m);
      li.setAttribute("aria-label", "Stop " + (s + 1) + ", " + cname(id) + ": " +
        (st === "done" ? "cleared" + (lost ? ", " + plural(lost, "life", "lives") + " lost there" : "") : st === "end" ? "the journey ended here" : "not reached") + ".");
      box.appendChild(li);
    });
    bestLine();
  }
  function bestLine() {
    var g = stored(), b = g.best && num(g.best.s) && num(g.best.l) ? g.best : null;
    var line = b ? "Your table's best: " + recordText(b) + "." : "";
    if (result && result.newBest && result.hadBest) line = "A new best for your table: " + recordText({ s: result.s, l: result.l }) + "!";
    var bl = $("best-line");
    if (bl) bl.textContent = line;
    $("best-chip").setAttribute("aria-label", "Your table's best journey" + (b ? ": " + recordText(b) : ""));
    var box = $("best-body");
    if (!box) return;
    box.textContent = b ? "Your table's best journey: " + recordText(b) + "." : "No journey yet. Your table's best will stand here.";
    var j = num(g.journeys) ? g.journeys : 0, w = num(g.world) ? g.world : 0, pf = num(g.perfect) ? g.perfect : 0;
    $("best-count").textContent = j ? plural(j, "journey", "journeys") + " · round the world " + plural(w, "time", "times") + (pf ? " · " + plural(pf, "perfect journey", "perfect journeys") : "") + "." : "";
  }

  /* ---------- the journey so far, and every question with its figures and sources (a window) ---------- */
  function renderJourney() {
    var g = game, box = $("journey"), route = $("journey-route");
    box.innerHTML = "";
    route.innerHTML = "";
    if (!g) { $("journey-note").textContent = "No journey going on."; return; }
    g.route.forEach(function (id, s) {
      var x = stopState(s);
      var li = el("li", "b-jr " + x.st);
      li.appendChild(el("span", "b-jr-n", String(s + 1)));
      li.appendChild(el("span", "b-jr-c", cname(id)));
      li.appendChild(el("span", "b-jr-s", x.st === "done" ? "✓" : x.st === "now" ? "now" : x.st === "end" ? "ended" : ""));
      li.setAttribute("aria-label", "Stop " + (s + 1) + ", " + cname(id) + ": " +
        (x.st === "done" ? "cleared" : x.st === "now" ? "the table is here" : x.st === "end" ? "the journey ended here" : "ahead") +
        (x.lost ? ", " + plural(x.lost, "life", "lives") + " lost there" : "") + ".");
      route.appendChild(li);
    });
    g.log.forEach(function (e) {
      var q = qAt(e[0], e[1]), k = kindById(q.k), li = el("li", "b-jq" + (e[4] ? " right" : " wrong"));
      li.appendChild(el("p", "b-jq-k", "Stop " + (e[0] + 1) + " · " + cname(q.s) + " · " + g.p[e[2]] + (e[5] ? " (asked the table)" : "")));
      var h = el("p", "b-jq-h");
      h.appendChild(el("b", "", k.head + " "));
      h.appendChild(el("span", e[4] ? "b-ok" : "b-no", (e[4] ? "✓ " : "✗ ") + cname(e[3])));
      li.appendChild(h);
      li.appendChild(el("p", "b-jq-f", factsOf(q).join(" ")));
      var src = el("p", "b-jq-s");
      src.appendChild(document.createTextNode(k.list ? "Checked on " : "Source: "));
      sourceOf(q).forEach(function (x, i) {
        if (i) src.appendChild(document.createTextNode(" · "));
        var a = el("a", "", x.name);
        a.href = x.url; a.target = "_blank"; a.rel = "noopener";
        src.appendChild(a);
      });
      if (!k.list) src.appendChild(document.createTextNode(" (" + yearsOf(q) + ")"));
      li.appendChild(src);
      box.appendChild(li);
    });
    $("journey-note").textContent = g.log.length ? "" : "No question answered yet.";
  }

  /* ---------- the picture to share: how far the table got, and the route; never a question or an answer ---------- */
  var cardBlob = null, cardUrl = null, layout = null;
  function roundRect(x, X, Y, W, H, R) {
    x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R);
    x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath();
  }
  function wrapText(x, text, maxW) {
    var words = text.split(" "), lines = [], cur = "";
    words.forEach(function (w) {
      var t = cur ? cur + " " + w : w;
      if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function heartPath(x, cx, cy, sz) {         // the same heart as on the page, drawn at size sz around (cx, cy)
    var p = new window.Path2D(HEART), k = sz / 24;
    x.save(); x.translate(cx - sz / 2, cy - sz / 2); x.scale(k, k);
    return { p: p, done: function () { x.restore(); } };
  }
  function drawCard(r) {
    var W2 = 1080, H2 = 1350, MG = 76, OLIVE = "#6F6C00", MISS = "#F0B429";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
    var won = r.s >= STOPS;
    x.fillStyle = OLIVE; x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 255, 220, .20)"); glow.addColorStop(1, "rgba(0, 0, 0, .12)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.fillStyle = "#ffffff"; x.textBaseline = "alphabetic";
    x.textAlign = "left"; x.font = "800 48px " + FD; x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F; x.fillText("Beat the Phone", W2 - MG, 118);
    x.textAlign = "left"; x.font = "600 36px " + F; x.fillStyle = "rgba(255, 255, 255, .86)";
    x.fillText("Ten stops round the world, three lives:", MG, 214);
    x.fillStyle = "#ffffff"; x.font = "800 92px " + FD;
    var big = won ? "We beat the phone!" : "We got to stop " + (r.s + 1) + ".";
    var bs = 92;
    while (x.measureText(big).width > W2 - 2 * MG && bs > 60) { bs -= 4; x.font = "800 " + bs + "px " + FD; }
    x.fillText(big, MG - 3, 214 + bs + 10);
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .92)";
    var sub = won ? (r.l === LIVES ? "Round the world without losing a life." : "Round the world with " + plural(r.l, "life", "lives") + " left.")
                  : "The phone won at stop " + (r.s + 1) + " of " + STOPS + ".";
    var y = 214 + bs + 10 + 64;
    x.fillText(sub, MG, y);
    // the lives: a heart for each, full or lost
    for (var i = 0; i < LIVES; i++) {
      var h = heartPath(x, W2 - MG - 30 - (LIVES - 1 - i) * 66, y - 14, 54);
      if (i < r.l) { x.fillStyle = "#ffffff"; x.fill(h.p); }
      else { x.lineWidth = 2.6; x.strokeStyle = MISS; x.stroke(h.p); }
      h.done();
    }
    // the route: ten stops in two columns of five, a line through them; cleared ones full, where it ended yellow.
    // The names share one size, and a long one takes two lines.
    var top = y + 72, gap = 40, colW = (W2 - 2 * MG - gap) / 2, rowH = 112, nameMax = colW - 84, fs = 42;
    function linesOf(nm, size) { x.font = "700 " + size + "px " + F; return wrapText(x, nm, nameMax); }
    function fitsAll(size) {
      return r.route.every(function (id) {
        var ls = linesOf(cname(id), size);
        return ls.length <= 2 && ls.every(function (l) { return x.measureText(l).width <= nameMax; });
      });
    }
    while (!fitsAll(fs) && fs > 28) fs -= 2;
    var maxText = 0, maxLines = 0;
    r.route.forEach(function (id, s) {
      var col = s < 5 ? 0 : 1, row = s % 5, cx = MG + col * (colW + gap) + 28, cy = top + row * rowH + 28;
      var st = s < r.s ? "done" : (s === r.s && !won) ? "end" : "ahead";
      if (row < 4) { x.strokeStyle = "rgba(255, 255, 255, .45)"; x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy + 30); x.lineTo(cx, cy + rowH - 30); x.stroke(); }
      x.beginPath(); x.arc(cx, cy, 26, 0, Math.PI * 2);
      if (st === "done") { x.fillStyle = "#ffffff"; x.fill(); }
      else if (st === "end") { x.fillStyle = MISS; x.fill(); }
      else { x.lineWidth = 5; x.strokeStyle = "rgba(255, 255, 255, .6)"; x.stroke(); }
      x.fillStyle = st === "done" ? OLIVE : st === "end" ? "#15172B" : "rgba(255, 255, 255, .8)";
      x.textAlign = "center"; x.font = "800 28px " + F; x.fillText(String(s + 1), cx, cy + 10);
      x.textAlign = "left"; x.fillStyle = st === "ahead" ? "rgba(255, 255, 255, .62)" : "#ffffff";
      var ls = linesOf(cname(id), fs);
      maxLines = Math.max(maxLines, ls.length);
      var ly = cy + fs * 0.36 - (ls.length - 1) * fs * 0.55;
      ls.forEach(function (l) { maxText = Math.max(maxText, x.measureText(l).width); x.fillText(l, cx + 50, ly); ly += fs * 1.1; });
    });
    var below = top + 5 * rowH - 30;
    x.textAlign = "left"; x.fillStyle = "#ffffff"; x.font = "800 62px " + FD;
    x.fillText("Can your table beat the phone?", MG - 3, 1198);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1268);
    }
    x.font = "800 62px " + FD;
    var askW = x.measureText("Can your table beat the phone?").width;
    layout = { fits: askW <= W2 - 2 * MG && maxText <= nameMax && maxLines <= 2 && below < 1110 && bs >= 60, size: bs, names: fs, lines: maxLines, bottom: below, ask: askW };
    return c;
  }
  window.BeatThePhoneCard = function (r) {               // read by r/site-workshop/checks/t_beat.py
    if (r) drawCard(r);                                  // a picture for any route (it shares no question)
    return layout;
  };
  function prepareCard() {
    cardBlob = null;
    if (!result) return;
    function make() {
      try {
        drawCard(result).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 92px "Bricolage Grotesque"'), document.fonts.load('600 40px "Figtree"'), document.fonts.load('700 38px "Figtree"')]).then(make, make);
    } else make();
  }
  function shareUrl() {
    var base = window.location.href.split("#")[0].split("?")[0], r = result;
    return base + "?j=" + r.route.join(".") + "&s=" + r.seed + "&k=" + r.s + "&l=" + r.l;
  }
  function shareText() {
    var r = result;
    return (r.s >= STOPS
      ? "Beat the Phone: our table went round the world in ten stops" + (r.l === LIVES ? " without losing a life" : " with " + plural(r.l, "life", "lives") + " left") + ". Can your table beat the phone? "
      : "Beat the Phone: our table got to stop " + (r.s + 1) + " of " + STOPS + " before the phone won. Can your table beat the phone? ") + shareUrl();
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
    KINDS.forEach(function (k) { if (k.list && available(k)) item(LISTS[k.list].name, LISTS[k.list].src || []); });
    var figs = [];
    Object.keys(FIGS).forEach(function (key) { var m = meta(key); if (m) figs.push({ name: m.name, url: m.url }); });
    if (figs.length) item("World Bank figures", figs);
  })();

  /* ---------- wiring ---------- */
  TO.wireDialogs();
  TO.fixLocalLinks();
  bestLine();
  if (friend) TO.count(GAME + "/challenge-opened");

  function plainAddress() {           // once a friend's route is dealt, the address loses it: a new opening is a plain start
    if (window.location.search && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, "", window.location.pathname); } catch (e) { /* keep the address */ }
    }
  }
  $("btn-fewer").addEventListener("click", function () { if (setup.n > PLAYERS_MIN) { setup.n--; renderSetup(); } });
  $("btn-more").addEventListener("click", function () { if (setup.n < PLAYERS_MAX) { setup.n++; renderSetup(); } });
  $("btn-names").addEventListener("click", renderNameFields);
  $("btn-start").addEventListener("click", function () {
    var f = friend;
    friend = null;
    plainAddress();
    result = null;
    newJourney(f);
    showHand();
  });
  $("btn-hand").addEventListener("click", handed);
  $("btn-go").addEventListener("click", goButton);
  $("btn-ask").addEventListener("click", askTable);
  $("btn-route").addEventListener("click", renderJourney);
  $("btn-route-h").addEventListener("click", renderJourney);
  $("btn-all").addEventListener("click", renderJourney);
  $("best-chip").addEventListener("click", bestLine);
  $("btn-restart-yes").addEventListener("click", function () { fresh(); $("btn-start").focus(); });
  $("btn-again").addEventListener("click", function () {
    plainAddress();
    result = null;
    newJourney(null);
    showHand();
  });
  $("btn-change").addEventListener("click", function () { fresh(); $("btn-more").focus(); });
  $("share").addEventListener("click", function () {
    if (!result) return;
    TO.count(GAME + "/share");
    TO.share({ blob: cardBlob, filename: "beat-the-phone.png", text: shareText() }).then(function (how) {
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

  /* ---------- starting afresh (Khayyam, 6 Oct 2026: the names must restart every time the game is opened, and the
     game must restart when you go to the home page and come back; and a Restart button). Every opening of the page
     (from the home page, the Back button or a reload), Restart and "New players" clear the journey and the players'
     names, and show the start. The table's best journey stays. ---------- */
  function fresh() {
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) { TO.closeDialog(d); });
    game = null;
    result = null;
    picked = "";
    setup = blankSetup();
    table = { next: 0 };
    bestLine();
    showStart();
  }
  /* for the checks (r/site-workshop/checks/t_beat.py): the players and a journey going on, set as a table would have
     them, and read back. Nothing of it is stored. */
  CORE.load = function (s) {
    s = s || {};
    fresh();
    if (num(s.n) && s.n >= PLAYERS_MIN && s.n <= PLAYERS_MAX) setup.n = Math.round(s.n);
    if (Array.isArray(s.names)) s.names.slice(0, PLAYERS_MAX).forEach(function (x, i) { setup.names[i] = clean(x); });
    if (num(s.next)) table.next = s.next;
    if (!validGame(s.cur)) { showStart(); return false; }
    game = resume(s.cur);
    if (game.phase === "pass") showHand();
    else showPlay();
    return true;
  };
  CORE.now = function () {
    return JSON.parse(JSON.stringify({ game: game, n: setup.n, names: setup.names, next: table.next }));
  };

  // a page that the browser brings back from its memory (the Back button) starts afresh too
  window.addEventListener("pageshow", function (e) { if (e.persisted) fresh(); });
  fresh();
})();
