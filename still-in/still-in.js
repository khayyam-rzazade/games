/* Still In: a game for one phone and a group. Twelve countries and one rule ("More people than Spain").
   The players take turns tapping a country that fits; the phone checks it against the World Bank's figures or a
   checked list and shows the real figure. A wrong tap puts that player out. When no country that fits is left,
   a new rule comes. The last player still in wins.
   Not daily: no day number, no streak, no album. Every opening of the page starts fresh (Khayyam, 6 Oct 2026): the
   players' names, the game and the wins at this table live only while the page is open, and are never stored. The
   browser keeps only the rules a table had lately (TO.groupUpdate), so that it deals others first.
   Its countries, lists and five figures come from One of 193's file (data/one-of-193.js); four more figures from
   data/still-in.js (r/make-still-in.R). Without that second file the game plays with the first five. */
(function () {
  "use strict";

  var GAME = "still-in";
  var TO = window.TurnsOut;
  var BASE = (window.TURNSOUT_DATA || {})["one-of-193"];
  var MORE = (window.TURNSOUT_DATA || {})["still-in"];
  var HAS_DOC = typeof document !== "undefined";
  function $(id) { return document.getElementById(id); }

  var READY = !!(BASE && Array.isArray(BASE.countries) && BASE.countries.length === 193 && BASE.lists && BASE.figures);

  /* ================================================================================================
     The core: countries, figures, lists, rules and pools. No page needed (the checks call it too).
     ================================================================================================ */
  var MIN_PEOPLE = 1000000;          // only countries with at least a million people come into a pool
  var SIZE = 12;                     // countries in a pool
  var PLAYERS_MIN = 2, PLAYERS_MAX = 8;

  // The bars: well-known countries from every continent. A rule compares with one of them.
  var BAR_IDS = ["ESP", "FRA", "DEU", "ITA", "GBR", "POL", "SWE", "NOR", "GRC", "PRT", "NLD", "CHE", "IRL", "FIN", "AUT",
                 "USA", "CAN", "MEX", "BRA", "ARG", "CHL", "PER", "COL",
                 "CHN", "IND", "JPN", "KOR", "IDN", "THA", "VNM", "PHL", "PAK", "BGD", "TUR", "SAU", "MYS",
                 "EGY", "NGA", "KEN", "ZAF", "ETH", "MAR", "GHA",
                 "AUS", "NZL"];

  // The figures. "ratio": compared by how many times bigger (people, area...), else by the difference (years,
  // percentage points). "margin": no country in a pool lies this close to the bar, so that a small revision of a
  // figure can never change an answer. "near" and "mid": what counts as a close call and as a middle one.
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

  // The rules. A figure rule compares with a bar country (dir 1: more than the bar, -1: less).
  // A list rule asks whether the country is on one of One of 193's checked lists.
  var RULES = [
    { id: "more-people", key: "pop", dir: 1, head: "More people than {b}" },
    { id: "fewer-people", key: "pop", dir: -1, head: "Fewer people than {b}" },
    { id: "bigger", key: "area", dir: 1, head: "Bigger than {b}" },
    { id: "smaller", key: "area", dir: -1, head: "Smaller than {b}" },
    { id: "longer-lives", key: "life", dir: 1, head: "Longer lives than in {b}" },
    { id: "more-urban", key: "urban", dir: 1, head: "More urban than {b}" },
    { id: "less-urban", key: "urban", dir: -1, head: "Less urban than {b}" },
    { id: "more-forest", key: "forest", dir: 1, head: "More forest than {b}" },
    { id: "less-forest", key: "forest", dir: -1, head: "Less forest than {b}" },
    { id: "richer", key: "gdp", dir: 1, head: "Richer per person than {b}" },
    { id: "more-online", key: "net", dir: 1, head: "More online than {b}" },
    { id: "more-crowded", key: "dense", dir: 1, head: "More crowded than {b}" },
    { id: "less-crowded", key: "dense", dir: -1, head: "Less crowded than {b}" },
    { id: "younger", key: "young", dir: 1, head: "Younger than {b}" },
    { id: "landlocked", list: "landlocked", head: "Landlocked", line: "No coast on the open sea", other: "Has a coast",
      yes: "{c} is landlocked.", no: "{c} has a coast." },
    { id: "island", list: "island", head: "An island country", line: "All of its land lies on islands", other: "Not an island country",
      yes: "{c} is an island country.", no: "{c} is not an island country." },
    { id: "med", list: "med", head: "On the Mediterranean", line: "A coast on the Mediterranean Sea", other: "No coast on it",
      yes: "{c} has a coast on the Mediterranean.", no: "{c} has no coast on the Mediterranean." },
    { id: "equator", list: "equator", head: "On the equator", line: "The equator crosses its land", other: "The equator misses it",
      yes: "The equator crosses {c}.", no: "The equator does not cross {c}." },
    { id: "china", list: "china", head: "Borders China", line: "A land border with China", other: "No border with China",
      yes: "{c} borders China.", no: "{c} does not border China." },
    { id: "russia", list: "russia", head: "Borders Russia", line: "A land border with Russia", other: "No border with Russia",
      yes: "{c} borders Russia.", no: "{c} does not border Russia." },
    { id: "left", list: "left", head: "Drives on the left", line: "Traffic keeps to the left", other: "Drives on the right",
      yes: "In {c}, traffic keeps to the left.", no: "In {c}, traffic keeps to the right." },
    { id: "euro", list: "euro", head: "Uses the euro", line: "The euro is its currency", other: "Another currency",
      yes: "{c} uses the euro.", no: "{c} does not use the euro." }
  ];

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
  // a figure: [value, year], or null
  function fig(id, key) {
    var spec = FIGS[key];
    if (!spec) return null;
    var f;
    if (spec.file === "base") {
      if (!BASE.figures[key]) return null;
      var c = C[byId[id]];
      f = c && c.f && c.f[key];
    } else {
      if (!MOREFIG[key]) return null;
      f = MOREF[id] && MOREF[id][key];
    }
    return (Array.isArray(f) && num(f[0]) && num(f[1])) ? f : null;
  }
  function val(id, key) { var f = fig(id, key); return f ? f[0] : NaN; }
  function meta(key) { return FIGS[key] && (FIGS[key].file === "base" ? BASE.figures[key] : MOREFIG[key]) || null; }
  function people(id) { return val(id, "pop"); }
  // the countries that can come into a pool: at least a million people (the same figure as One of 193's)
  var POOLED = C.filter(function (c) { return people(c.id) >= MIN_PEOPLE; }).map(function (c) { return c.id; });

  function ruleById(id) { for (var i = 0; i < RULES.length; i++) if (RULES[i].id === id) return RULES[i]; return null; }
  // a rule can be played if its figure (with its source) or its list is in the data
  function available(r) {
    if (r.list) return !!(LISTS[r.list] && Array.isArray(LISTS[r.list].ids) && LISTS[r.list].ids.length);
    return !!meta(r.key);
  }
  // does country id fit rule r (with bar b)?
  function fits(r, b, id) {
    if (r.list) return !!(inList[r.list] && inList[r.list][id]);
    var v = val(id, r.key), w = val(b, r.key);
    return r.dir > 0 ? v > w : v < w;
  }
  // how far a figure lies from the bar: times (as a logarithm) or points
  function dist(key, v, w) { return FIGS[key].ratio ? Math.abs(Math.log(v / w)) : Math.abs(v - w); }
  function marginOf(key) { var s = FIGS[key]; return s.ratio ? Math.log(1 + s.margin) : s.margin; }
  function band(key, d) {
    var s = FIGS[key];
    var near = s.ratio ? Math.log(s.near) : s.near, mid = s.ratio ? Math.log(s.mid) : s.mid;
    return d <= near ? "near" : d <= mid ? "mid" : "far";
  }
  // too close to the bar to be fair: a revision could flip it, or the two figures would look the same on screen
  function tooClose(key, id, b) {
    var v = val(id, key), w = val(b, key);
    if (!(dist(key, v, w) > marginOf(key))) return true;
    var sv = shown(key, v), sw = shown(key, w);
    return sv === sw || (sv > sw) !== (v > w);
  }

  /* a random number generator that can be seeded (the checks use seeds; the game uses Math.random) */
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
  function sortKey(id) { var n = C[byId[id]].name; return n.normalize ? n.normalize("NFD").replace(/[̀-ͯ]/g, "") : n; }
  function byName(a, b) { return sortKey(a).localeCompare(sortKey(b), "en"); }

  // how many of each kind a side of the pool gets, by level: 0 for the first rule of a game, 1 for the second,
  // 2 from the third on (more close calls each time)
  var MIX = [{ near: 1 / 3, far: 1 / 3 }, { near: 1 / 2, far: 1 / 6 }, { near: 2 / 3, far: 1 / 6 }];
  function plan(size, level) {
    var m = MIX[Math.max(0, Math.min(2, level))];
    var far = Math.max(1, Math.round(size * m.far)), near = Math.max(1, Math.round(size * m.near));
    if (near + far > size) near = size - far;
    return { near: near, mid: size - near - far, far: far };
  }
  function takeSide(groups, want, rnd) {
    var out = [], order = { near: ["near", "mid", "far"], mid: ["mid", "near", "far"], far: ["far", "mid", "near"] };
    var pools = { near: shuffle(groups.near.slice(), rnd), mid: shuffle(groups.mid.slice(), rnd), far: shuffle(groups.far.slice(), rnd) };
    ["near", "far", "mid"].forEach(function (k) {
      var need = want[k];
      order[k].forEach(function (from) {
        while (need > 0 && pools[from].length) { out.push(pools[from].shift()); need--; }
      });
    });
    return out;
  }
  // the number that fit: 5, 6 or 7 of the 12, so that nobody can count on it
  function fitCount(rnd) { return 5 + Math.floor(rnd() * 3); }

  // a pool for figure rule r with bar b; null if the bar does not give a fair pool
  function figurePool(r, b, level, rnd) {
    if (!num(val(b, r.key))) return null;
    var w = val(b, r.key);
    var g = { fit: { near: [], mid: [], far: [] }, non: { near: [], mid: [], far: [] } };
    POOLED.forEach(function (id) {
      if (id === b) return;
      var v = val(id, r.key);
      if (!num(v) || tooClose(r.key, id, b)) return;           // too close to the bar: never in a pool
      g[fits(r, b, id) ? "fit" : "non"][band(r.key, dist(r.key, v, w))].push(id);
    });
    var F = fitCount(rnd), N = SIZE - F;
    var nf = g.fit.near.length + g.fit.mid.length + g.fit.far.length, nn = g.non.near.length + g.non.mid.length + g.non.far.length;
    if (nf < F || nn < N) return null;
    var minNear = level >= 1 ? 2 : 1;                           // close calls on both sides
    if (g.fit.near.length < minNear || g.non.near.length < minNear) return null;
    var fit = takeSide(g.fit, plan(F, level), rnd), non = takeSide(g.non, plan(N, level), rnd);
    return { r: r.id, b: b, c: fit.concat(non).sort(byName) };
  }
  // a pool for list rule r: countries on the list, and countries that are not, from the same parts of the world
  function listPool(r, level, rnd) {
    var members = POOLED.filter(function (id) { return fits(r, null, id); });
    var others = POOLED.filter(function (id) { return !fits(r, null, id); });
    var F = Math.min(fitCount(rnd), members.length), N = SIZE - F;
    if (F < 4 || others.length < N) return null;
    var fit = shuffle(members.slice(), rnd).slice(0, F);
    var subs = {}, regs = {};
    fit.forEach(function (id) { var c = C[byId[id]]; subs[c.sub] = true; regs[c.region] = true; });
    var t1 = [], t2 = [], t3 = [];
    others.forEach(function (id) {
      var c = C[byId[id]];
      (subs[c.sub] ? t1 : regs[c.region] ? t2 : t3).push(id);
    });
    var non = shuffle(t1, rnd).concat(shuffle(t2, rnd), shuffle(t3, rnd)).slice(0, N);
    return { r: r.id, b: null, c: fit.concat(non).sort(byName) };
  }
  // a pool for rule r: a bar is picked among those that give a fair pool (avoiding the bars in "avoid")
  function makePool(r, level, rnd, avoid) {
    if (!available(r)) return null;
    if (r.list) return listPool(r, level, rnd);
    var bars = shuffle(BAR_IDS.filter(function (b) { return byId[b] !== undefined && num(val(b, r.key)); }), rnd);
    var fresh = bars.filter(function (b) { return !avoid || avoid.indexOf(r.id + "." + b) < 0; });
    var tries = fresh.concat(bars.filter(function (b) { return fresh.indexOf(b) < 0; }));
    for (var i = 0; i < tries.length; i++) {
      var p = figurePool(r, tries[i], level, rnd);
      if (p) return p;
    }
    return null;
  }
  // is a pool (from a friend's link, or from the browser's storage) still fair on the data of today?
  function poolOk(p) {
    if (!p || typeof p !== "object") return false;
    var r = ruleById(p.r);
    if (!r || !available(r) || !Array.isArray(p.c) || p.c.length !== SIZE) return false;
    var seen = {};
    for (var i = 0; i < p.c.length; i++) {
      var id = p.c[i];
      if (typeof id !== "string" || byId[id] === undefined || seen[id] || id === p.b) return false;
      if (POOLED.indexOf(id) < 0) return false;
      seen[id] = true;
      if (!r.list && (!num(val(id, r.key)) || tooClose(r.key, id, p.b))) return false;
    }
    if (!r.list && (typeof p.b !== "string" || BAR_IDS.indexOf(p.b) < 0 || !num(val(p.b, r.key)))) return false;
    if (r.list && p.b) return false;
    var nfit = p.c.filter(function (id) { return fits(r, p.b, id); }).length;
    return nfit >= 3 && nfit <= SIZE - 3;
  }

  // the order of rules in a game: every rule at most once, never the same figure or list twice, a list rule
  // never twice in a row, and never first
  function nextRule(used, rnd, avoid) {
    var usedKeys = {};
    used.forEach(function (id) { var r = ruleById(id); if (r) usedKeys[r.key || r.list] = true; });
    var lastList = used.length && ruleById(used[used.length - 1]) && !!ruleById(used[used.length - 1]).list;
    var cands = RULES.filter(function (r) { return available(r) && used.indexOf(r.id) < 0 && !usedKeys[r.key || r.list]; });
    if (!cands.length) cands = RULES.filter(function (r) { return available(r) && used.indexOf(r.id) < 0; });
    if (!cands.length) cands = RULES.filter(available);
    var noList = cands.filter(function (r) { return !r.list; });
    if ((lastList || !used.length) && noList.length) cands = noList;     // a game opens with a figure and its bar
    return shuffle(cands.slice(), rnd);
  }

  /* ---------- words and numbers ---------- */
  function commas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
  function fmtPeople(v) {
    if (v >= 1e9) return (Math.round(v / 1e7) / 100).toFixed(2) + " billion";
    if (v >= 1e6) return (Math.round(v / 1e5) / 10).toFixed(1) + " million";
    return commas(v);
  }
  // a figure rounded as it is shown (two countries in a pool never look the same as the bar)
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
  // a figure as it stands in a tile and in the list after a rule
  function short(key, v) {
    var s = shown(key, v);
    switch (key) {
      case "pop": return fmtPeople(v);
      case "area": return commas(s) + " km²";
      case "life": return s.toFixed(1) + " years";
      case "gdp": return "$" + commas(s);
      case "dense": return (v < 100 ? s.toFixed(1) : commas(s)) + " per km²";
      default: return s + "%";                          // urban, forest, net, young
    }
  }
  // a little shorter, for a tile
  function tileValue(key, v) {
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
  function cname(id) { return C[byId[id]].name; }
  // in a sentence some names take "the" (the Netherlands, the United States); the tiles and lists show the bare name
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
  function headOf(r, b) { return r.head.replace("{b}", b ? inText(b) : ""); }
  function lineOf(r, b) { return r.list ? r.line : says(r.key, b) + " (" + yearOf(r.key, b) + ")"; }
  function verdict(r, b, id) {              // the sentence after a tap (with the year where it is not the bar's)
    if (r.list) return upFirst((fits(r, b, id) ? r.yes : r.no).replace("{c}", inText(id)));
    var y = yearOf(r.key, id);
    return says(r.key, id) + (y === yearOf(r.key, b) ? "." : " (" + y + ").");
  }
  function sourceOf(r) {                     // the sources of a rule, for the list after it
    if (r.list) return (LISTS[r.list].src || []).map(function (s) { return { name: s.name, url: s.url }; });
    var m = meta(r.key) || {};
    return [{ name: "World Bank: " + (m.name || r.key), url: m.url || "https://data.worldbank.org/" }];
  }

  var CORE = {
    ready: READY, RULES: RULES, FIGS: FIGS, BAR_IDS: BAR_IDS, SIZE: SIZE, MIN_PEOPLE: MIN_PEOPLE,
    pooled: function () { return POOLED.slice(); },
    available: function (id) { var r = ruleById(id); return !!r && available(r); },
    fits: function (rid, b, id) { return fits(ruleById(rid), b, id); },
    value: function (id, key) { return fig(id, key); },
    pool: function (rid, level, seed, avoid) { return makePool(ruleById(rid), level, seeded(seed), avoid || []); },
    poolOk: poolOk,
    nextRules: function (used, seed) { return nextRule(used || [], seeded(seed)).map(function (r) { return r.id; }); },
    head: function (rid, b) { return headOf(ruleById(rid), b); },
    line: function (rid, b) { return lineOf(ruleById(rid), b); },
    verdict: function (rid, b, id) { return verdict(ruleById(rid), b, id); },
    short: short, tileValue: tileValue, says: says, margin: marginOf, shown: shown
  };
  window.StillIn = CORE;
  if (!HAS_DOC) return;

  /* ================================================================================================
     The page
     ================================================================================================ */
  if (!TO || !READY) {
    var t0 = $("start-title");
    if (t0) t0.textContent = "The countries could not be loaded. Please try again in a moment.";
    var b0 = $("btn-start");
    if (b0) b0.hidden = true;
    var p0 = document.querySelector(".s-players");
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

  /* ---------- who plays: how many, and their names (optional). They live only while the page is open. ---------- */
  function blankSetup() {
    var nm = [];
    while (nm.length < PLAYERS_MAX) nm.push("");
    return { n: 3, names: nm };
  }
  var setup = blankSetup();
  function nameOf(i) { return setup.names[i] || "Player " + (i + 1); }
  /* the table of this sitting: the wins per name, and who starts the next game */
  var table = { wins: {}, next: 0 };
  /* what earlier versions kept in the browser (names, wins, a game going on) is cleared: nothing about the players stays */
  TO.groupUpdate(GAME, function (g) { delete g.cur; delete g.names; delete g.wins; delete g.next; delete g.n; });

  /* ---------- the game, in the page only: a new opening of the page (or Restart) starts afresh ----------
     { p: names, out: [0/1], outOn: [{n: rule number, c: country}|null], turn, first, n: rule number,
       used: [rule ids], pool: {r, b, c: [12]}, taps: [[country, player, 1 right / 0 wrong]], total, hist: [past pools],
       over, winner } */
  var game = null;
  var picked = "";
  var view = "start";
  function rule() { return ruleById(game.pool.r); }
  function tappedOf(id) { for (var i = 0; i < game.taps.length; i++) if (game.taps[i][0] === id) return game.taps[i]; return null; }
  function inPlayers() { var o = []; game.p.forEach(function (x, i) { if (!game.out[i]) o.push(i); }); return o; }
  function after(i) {                       // the next player after i who is still in
    var n = game.p.length;
    for (var k = 1; k <= n; k++) { var j = (i + k) % n; if (!game.out[j]) return j; }
    return i;
  }
  function fitLeft() {
    var r = rule();
    return game.pool.c.filter(function (id) { return !tappedOf(id) && fits(r, game.pool.b, id); });
  }
  function validGame(x) {
    if (!x || typeof x !== "object" || !Array.isArray(x.p) || x.p.length < PLAYERS_MIN || x.p.length > PLAYERS_MAX) return false;
    if (!Array.isArray(x.out) || x.out.length !== x.p.length || !Array.isArray(x.taps) || !Array.isArray(x.used)) return false;
    if (!num(x.turn) || x.turn < 0 || x.turn >= x.p.length || x.out[x.turn]) return false;
    if (!poolOk(x.pool) || !num(x.n) || x.n < 1) return false;
    var ins = 0;
    x.out.forEach(function (o) { if (!o) ins++; });
    if (ins < 2) return false;
    var seen = {};
    for (var i = 0; i < x.taps.length; i++) {
      var t = x.taps[i];
      if (!Array.isArray(t) || x.pool.c.indexOf(t[0]) < 0 || seen[t[0]] || !num(t[1]) || t[1] < 0 || t[1] >= x.p.length) return false;
      seen[t[0]] = true;
    }
    return true;
  }
  function resume(cur) {            // a game as the checks hand it over (CORE.load): only what makes sense is kept
    cur = JSON.parse(JSON.stringify(cur));
    cur.p = cur.p.map(function (s, i) { return clean(s) || "Player " + (i + 1); });
    cur.outOn = cur.p.map(function (x, i) {          // who went out on what: kept only where it makes sense
      var o = Array.isArray(cur.outOn) ? cur.outOn[i] : null;
      if (!cur.out[i] || !o || typeof o !== "object" || byId[o.c] === undefined || !num(o.n)) return null;
      var r = ruleById(o.r);
      return { n: o.n, c: o.c, r: r ? o.r : null, b: r && !r.list && BAR_IDS.indexOf(o.b) >= 0 ? o.b : null, k: num(o.k) ? o.k : 0 };
    });
    cur.hist = Array.isArray(cur.hist) ? cur.hist.filter(poolOk).slice(-12) : [];
    cur.total = num(cur.total) ? cur.total : cur.taps.length;
    cur.first = num(cur.first) ? cur.first : 0;
    cur.pass = cur.pass && !cur.done ? 1 : 0;
    cur.over = false;
    return cur;
  }
  function recentList() {
    var r = stored().recent;
    return Array.isArray(r) ? r.filter(function (x) { return typeof x === "string"; }).slice(-40) : [];
  }
  // a new pool for the game's next rule (or the friend's pool, for the first rule)
  function dealPool(forced) {
    var rnd = Math.random, p = null;
    if (forced && poolOk(forced)) p = { r: forced.r, b: forced.b || null, c: forced.c.slice() };
    if (!p) {
      var avoid = recentList(), level = Math.min(2, game.n - 1);
      var order = nextRule(game.used, rnd, avoid);
      for (var i = 0; i < order.length && !p; i++) p = makePool(order[i], level, rnd, avoid);
      for (var j = 0; j < RULES.length && !p; j++) p = makePool(RULES[j], 0, rnd, []);      // never without a pool
    }
    game.pool = p;
    game.taps = [];
    game.used.push(p.r);
    TO.groupUpdate(GAME, function (g) {
      var r2 = Array.isArray(g.recent) ? g.recent.filter(function (x) { return typeof x === "string"; }) : [];
      r2.push(p.r + "." + (p.b || "-"));
      g.recent = r2.slice(-40);
    });
  }
  function newGame(forced) {
    var first = num(table.next) && table.next >= 0 && table.next < setup.n ? table.next : 0;
    game = { p: [], out: [], outOn: [], turn: first, first: first, n: 1, used: [], pool: null, taps: [], total: 0, hist: [], over: false };
    for (var i = 0; i < setup.n; i++) { game.p.push(nameOf(i)); game.out.push(0); game.outOn.push(null); }
    dealPool(forced);
    TO.count(GAME + "/started");
  }

  /* ---------- the views ---------- */
  var views = { start: $("v-start"), hand: $("v-hand"), play: $("v-play"), rule: $("v-rule"), end: $("v-end") };
  function show(v) {
    view = v;
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.setAttribute("data-view", v);
    restartChip();
    fit();
  }
  function restartChip() { $("btn-restart").hidden = !(game && !game.over); }      // Restart only while a game is in play
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
    var r = params.get("r"), b = params.get("b"), c = params.get("c"), k = params.get("k");
    if (!r || !c) return;
    var p = { r: String(r), b: b && b !== "-" ? String(b).toUpperCase() : null, c: String(c).toUpperCase().split(".") };
    if (!poolOk(p)) return;
    friend = { pool: p, k: /^\d$/.test(k || "") ? parseInt(k, 10) : null };
  })();
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
        var lab = el("label", "s-name-field");
        lab.appendChild(el("span", "s-name-n", String(i + 1)));
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
      var r = ruleById(friend.pool.r);
      f.textContent = "A friend's table played twelve countries with the rule \"" + headOf(r, friend.pool.b) + "\"" +
        (friend.k ? " and lost " + plural(friend.k, "player", "players") + " on it" : "") + ". Can your table get through it?";
      f.hidden = false;
      $("btn-start").textContent = "Play their twelve";
    } else {
      f.hidden = true;
      $("btn-start").textContent = "Start";
    }
    fit();
  }

  /* playing */
  function renderRule() {
    var r = rule();
    $("rule-n").textContent = "Rule " + game.n;
    $("rule-head").textContent = headOf(r, game.pool.b);
    $("rule-line").textContent = lineOf(r, game.pool.b);
    $("rule").classList.toggle("is-list", !!r.list);
  }
  function renderTurn() {
    var who = game.over ? game.winner : game.turn, ins = inPlayers();
    $("turn-name").textContent = game.p[who];
    $("turn-cap").textContent = game.over ? " is still in" : "'s turn";
    var dots = $("dots");
    dots.innerHTML = "";
    game.p.forEach(function (x, i) {
      dots.appendChild(el("span", "s-dot" + (game.out[i] ? " out" : "") + (i === who && !game.over ? " now" : "")));
    });
    $("dots-t").textContent = ins.length + " of " + game.p.length + " in";
    $("btn-players").setAttribute("aria-label", ins.length + " of " + game.p.length + " players still in. Show who.");
  }
  function tileLabel(id) {
    var r = rule(), t = tappedOf(id), n = cname(id);
    if (!t) return n;
    var what = r.list ? verdict(r, game.pool.b, id) : says(r.key, id) + ".";
    return what + " " + (t[2] ? "It fits. " + game.p[t[1]] + " tapped it." : "It does not fit. " + game.p[t[1]] + " went out on it.");
  }
  // the grid takes one stop of the Tab key: the arrows move inside it, Tab goes on to the button
  var home = "";
  function renderGrid(focusId) {
    var box = $("grid"), r = rule();
    box.innerHTML = "";
    if (focusId) home = focusId;
    if (!home || game.pool.c.indexOf(home) < 0) home = game.pool.c.filter(function (id) { return !tappedOf(id); })[0] || game.pool.c[0];
    game.pool.c.forEach(function (id, k) {
      var t = tappedOf(id);
      var b = el("button", "s-tile" + (t ? (t[2] ? " right" : " wrong") : "") + (id === picked ? " on" : ""));
      b.type = "button";
      b.setAttribute("data-c", id);
      b.setAttribute("data-k", String(k));
      var nm = el("span", "s-tile-n", cname(id));
      if (cname(id).length > 15) nm.classList.add("long");
      b.appendChild(nm);
      if (t) {
        b.appendChild(el("span", "s-tile-v" + (r.key === "area" ? " is-area" : ""), (t[2] ? "✓ " : "✗ ") + (r.list ? (t[2] ? "yes" : "no") : tileValue(r.key, val(id, r.key)))));
        b.setAttribute("aria-disabled", "true");
      } else {
        b.setAttribute("aria-pressed", id === picked ? "true" : "false");
      }
      b.setAttribute("aria-label", tileLabel(id));
      b.tabIndex = id === home ? 0 : -1;
      b.addEventListener("click", function () { pick(id); });
      b.addEventListener("keydown", function (e) { gridKey(e, k); });
      b.addEventListener("focus", function () { setHome(id); });
      box.appendChild(b);
    });
    if (focusId) { var f = box.querySelector('[data-c="' + focusId + '"]'); if (f) f.focus(); }
  }
  function setHome(id) {
    home = id;
    Array.prototype.forEach.call($("grid").querySelectorAll(".s-tile"), function (x) { x.tabIndex = x.getAttribute("data-c") === id ? 0 : -1; });
  }
  function gridKey(e, k) {               // the arrows move round the grid of twelve (three across)
    var cols = 3, to = -1, n = game.pool.c.length;
    if (e.key === "ArrowRight") to = Math.min(n - 1, k + 1);
    else if (e.key === "ArrowLeft") to = Math.max(0, k - 1);
    else if (e.key === "ArrowDown") to = k + cols < n ? k + cols : k;
    else if (e.key === "ArrowUp") to = k - cols >= 0 ? k - cols : k;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    if (to < 0) return;
    e.preventDefault();
    var b = $("grid").querySelector('[data-k="' + to + '"]');
    if (b) b.focus();
  }
  function pick(id) {
    if (!game || game.over || game.done || stage !== "pick" || tappedOf(id)) return;
    picked = picked === id ? "" : id;
    Array.prototype.forEach.call($("grid").querySelectorAll(".s-tile"), function (x) {
      if (x.classList.contains("right") || x.classList.contains("wrong")) return;
      var on = x.getAttribute("data-c") === picked;
      x.classList.toggle("on", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
    setCheck();
  }
  function say(html, spoken) {
    var s = $("say");
    s.innerHTML = html;
    s.setAttribute("aria-label", spoken);
  }
  function sayStart() {
    var who = game.p[game.turn];
    if (game.n === 1 && !game.taps.length) say("<b></b>, tap a country that fits the rule.", who + ", tap a country that fits the rule.");
    else if (!game.taps.length) say("A new rule, a little harder. <b></b> starts.", "A new rule, a little harder. " + who + " starts.");
    else say("<b></b>'s turn. Tap a country that fits.", who + "'s turn. Tap a country that fits.");
    $("say").querySelector("b").textContent = who;
  }
  function showPlay() {
    picked = "";
    stage = game.done ? "rule" : "pick";
    show("play");
    renderRule();
    renderTurn();
    renderGrid();
    setCheck();
    sayStart();
    fit();
  }
  // the big button: check the country picked; after the last country that fits, see all twelve; after the last
  // player but one went out, see who is still in
  var stage = "pick";
  function setCheck() {
    var cb = $("btn-check");
    if (stage === "rule") { cb.disabled = false; cb.textContent = "See all twelve"; return; }
    if (stage === "over") { cb.disabled = false; cb.textContent = "Who is still in?"; return; }
    cb.disabled = !picked;
    cb.textContent = picked ? "Check " + inText(picked) : "Tap a country";
  }
  function mainButton() {
    if (stage === "rule") { endRule(); return; }
    if (stage === "over") { showEnd(); return; }
    check();
  }
  function check() {
    if (!game || game.over || game.done || !picked || tappedOf(picked)) return;
    var id = picked, who = game.turn, r = rule(), right = fits(r, game.pool.b, id);
    picked = "";
    game.taps.push([id, who, right ? 1 : 0]);
    game.total++;
    if (!right) { game.out[who] = 1; game.outOn[who] = { n: game.n, c: id, r: game.pool.r, b: game.pool.b, k: game.total }; }
    var line = verdict(r, game.pool.b, id), ins = inPlayers();
    if (ins.length <= 1) {               // the last player but one went out: the game is over
      finish(ins.length ? ins[0] : who);
      stage = "over";
      renderTurn(); renderGrid(); setCheck();
      say('<b class="s-no">Out!</b> <span class="s-v"></span> <span class="s-pass"><span class="s-who-out"></span> is out. <b></b> is the last one in!</span>',
          "Wrong. " + line + " " + game.p[who] + " is out. " + game.p[game.winner] + " is the last one in!");
      $("say").querySelector(".s-v").textContent = line;
      $("say").querySelector(".s-who-out").textContent = game.p[who];
      $("say").querySelector(".s-pass b").textContent = game.p[game.winner];
      flip(id);
      $("btn-check").focus();
      fit();
      return;
    }
    game.turn = after(who);
    if (!fitLeft().length) {             // no country that fits is left: the rule is over, everyone still in goes on
      game.done = 1;
      stage = "rule";
      renderTurn(); renderGrid(); setCheck();
      say('<b class="s-ok">Right.</b> <span class="s-v"></span> <span class="s-pass">That was the last one that fits.</span>',
          "Right. " + line + " That was the last one that fits. Everyone still in goes on to the next rule.");
      $("say").querySelector(".s-v").textContent = line;
      flip(id);
      $("btn-check").focus();
      fit();
      return;
    }
    home = "";
    showHand();
  }
  /* passing the phone (Khayyam, 5 Oct 2026, late evening: it must say so very plainly). Whenever the phone goes to
     another player (a game starts, a tap passes the turn, a new rule comes), a whole screen says what just happened
     and to whom the phone goes, and the next player taps to say they have it. */
  function handRecap() {
    var last = game.taps[game.taps.length - 1];
    if (last) {
      var line = verdict(rule(), game.pool.b, last[0]);
      if (last[2]) return { mark: "Right.", cls: "s-hand-ok", text: line, spoken: "Right. " + line };
      var outLine = line + " " + game.p[last[1]] + " is out.";
      return { mark: "Out!", cls: "s-no", text: outLine, spoken: "Wrong. " + outLine };
    }
    var t = game.n === 1 ? "A new game: twelve countries, one rule." : "Rule " + game.n + " is next, a little harder.";
    return { mark: "", cls: "", text: t, spoken: t };
  }
  function showHand() {
    game.pass = 1;
    stage = "hand";
    picked = "";
    var who = game.p[game.turn], rc = handRecap(), res = $("hand-res");
    res.innerHTML = "";
    if (rc.mark) { res.appendChild(el("b", rc.cls, rc.mark)); res.appendChild(document.createTextNode(" ")); }
    res.appendChild(document.createTextNode(rc.text));
    res.setAttribute("aria-label", rc.spoken + " Pass the phone to " + who + ".");
    $("hand-name").textContent = who;
    $("btn-hand").textContent = who + " has the phone";
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
  function handed() {                        // the next player has the phone: their turn on the board
    if (!game || !game.pass) return;
    game.pass = 0;
    showPlay();
    var t = $("grid").querySelector('.s-tile[tabindex="0"]') || $("grid").querySelector(".s-tile");
    if (t) t.focus();
  }
  function flip(id) {
    var t = $("grid").querySelector('[data-c="' + id + '"]');
    if (t && !TO.reducedMotion()) { t.classList.add("flip"); window.setTimeout(function () { t.classList.remove("flip"); }, 420); }
  }

  /* after a rule: the twelve in order. For a figure, from the biggest down, with the bar where it falls;
     for a list, the countries on it, then the others. Each with who tapped it. */
  var ruleNote = "";
  function renderLadder(p, taps, endOfGame) {
    var r = ruleById(p.r), box = $("ladder");
    box.innerHTML = "";
    box.classList.toggle("is-list", !!r.list);
    function mark(id) {
      for (var i = 0; i < taps.length; i++) if (taps[i][0] === id) return taps[i];
      return null;
    }
    function row(id, isBar) {
      var t = isBar ? null : mark(id), f = isBar || fits(r, p.b, id);
      var li = el("li", "s-rung" + (isBar ? " is-bar" : f ? " fit" : " not") + (t ? (t[2] ? " right" : " wrong") : ""));
      li.appendChild(el("span", "s-rung-n", cname(id)));
      if (!r.list) li.appendChild(el("span", "s-rung-v", short(r.key, val(id, r.key))));
      var who = el("span", "s-rung-w");
      if (isBar) who.textContent = "the bar";
      else if (t) { who.appendChild(el("i", "", t[2] ? "✓" : "✗")); who.appendChild(el("span", "s-rung-p", " " + game.p[t[1]])); }
      li.appendChild(who);
      li.setAttribute("aria-label", cname(id) + (r.list ? "" : ": " + short(r.key, val(id, r.key))) +
        (isBar ? ". The bar." : (f ? ". Fits." : ". Does not fit.") + (t ? (t[2] ? " Tapped by " : " Put out ") + (game ? game.p[t[1]] : "") + "." : "")));
      box.appendChild(li);
    }
    if (r.list) {
      var yes = p.c.filter(function (id) { return fits(r, null, id); }), no = p.c.filter(function (id) { return !fits(r, null, id); });
      box.appendChild(el("li", "s-group", r.head));
      yes.forEach(function (id) { row(id, false); });
      box.appendChild(el("li", "s-group", r.other));
      no.forEach(function (id) { row(id, false); });
    } else {
      var ids = p.c.slice(), w = val(p.b, r.key), placed = false;
      ids.sort(function (a, b) { return val(b, r.key) - val(a, r.key); });
      ids.forEach(function (id) {
        if (!placed && val(id, r.key) < w) { row(p.b, true); placed = true; }
        row(id, false);
      });
      if (!placed) row(p.b, true);
    }
    var src = $("sum-src");
    src.innerHTML = "";
    src.appendChild(document.createTextNode(r.list ? "Checked on " : "Source: "));
    sourceOf(r).forEach(function (s, i) {
      if (i) src.appendChild(document.createTextNode(" · "));
      var a = el("a", "", s.name);
      a.href = s.url + (r.list ? "" : ""); a.target = "_blank"; a.rel = "noopener";
      src.appendChild(a);
    });
    if (!r.list) src.appendChild(document.createTextNode(" (CC BY 4.0)"));
    $("sum-head").textContent = headOf(r, p.b);
    var nIn = p.c.filter(function (id) { return fits(r, p.b, id); }).length;
    $("sum-kicker").textContent = endOfGame ? "The last twelve · " + nIn + " fit"
      : "Rule " + game.n + " is over · " + nIn + " of the 12 fit" + (ruleNote ? " · " + ruleNote : "");
  }
  function endRule() {
    var outs = game.taps.filter(function (t) { return !t[2]; }).length;
    ruleNote = outs ? plural(outs, "player", "players") + " out" : "nobody out";
    renderLadder(game.pool, game.taps, false);
    $("btn-next").textContent = "Next rule";
    $("btn-next").setAttribute("data-do", "next");
    show("rule");
    $("btn-next").focus();
  }
  function nextRuleNow() {
    game.hist.push({ r: game.pool.r, b: game.pool.b, c: game.pool.c.slice(), taps: game.taps.slice() });
    game.hist = game.hist.slice(-12);
    game.n++;
    game.done = 0;
    stage = "pick";
    dealPool(null);
    showHand();
  }

  /* the end */
  function finish(winner) {
    game.over = true;
    game.winner = winner;
    game.hist.push({ r: game.pool.r, b: game.pool.b, c: game.pool.c.slice(), taps: game.taps.slice() });
    var wname = game.p[winner];
    table.wins[wname] = (num(table.wins[wname]) ? table.wins[wname] : 0) + 1;
    table.next = (game.first + 1) % game.p.length;          // the next game starts with the next player
    TO.groupUpdate(GAME, function (g) { g.games = (num(g.games) ? g.games : 0) + 1; });
    restartChip();
    TO.count(GAME + "/finished");
    winsLine();
    prepareCard();
  }
  function showEnd() {
    renderEnd();
    show("end");
    $("btn-again").focus();
  }
  function renderEnd() {
    var w = game.p[game.winner];
    var nm = $("end-name");
    nm.textContent = w + " is still in!";
    nm.classList.toggle("long", w.length > 9);
    $("end-line").textContent = "The last one in, after " + plural(game.n, "rule", "rules") + " and " + plural(game.total, "tap", "taps") + ".";
    $("end-k").textContent = "Game over";
    var box = $("outs");
    box.innerHTML = "";
    var order = [];
    game.p.forEach(function (x, i) { if (game.out[i] && game.outOn[i]) order.push(i); });
    order.sort(function (a, b) { return (game.outOn[a].k || 0) - (game.outOn[b].k || 0) || game.outOn[a].n - game.outOn[b].n; });   // in the order they went out
    order.forEach(function (i) {
      var o = game.outOn[i], r = ruleById(o.r);
      var li = el("li", "s-out");
      li.appendChild(el("b", "", game.p[i]));
      li.appendChild(document.createTextNode(" went out on " + inText(o.c)));
      if (r && (r.list || o.b)) li.appendChild(el("span", "s-out-r", " (" + headOf(r, o.b).replace(/^./, function (c) { return c.toLowerCase(); }) + ")"));
      box.appendChild(li);
    });
    tallyLine();
  }
  function tallyLine() {
    var w = table.wins, parts = [];
    game.p.forEach(function (x) { parts.push(x + " (" + (num(w[x]) ? w[x] : 0) + ")"); });
    $("tally").textContent = "Wins at this table: " + parts.join(", ") + ".";
  }
  function winsLine() {
    var w = table.wins, list = $("wins-list");
    list.innerHTML = "";
    var names = [];
    for (var i = 0; i < setup.n; i++) names.push(nameOf(i));
    names.forEach(function (x) {
      var li = el("li", "s-roster-i");
      li.appendChild(el("span", "", x));
      li.appendChild(el("b", "", String(num(w[x]) ? w[x] : 0)));
      list.appendChild(li);
    });
    var total = 0;
    names.forEach(function (x) { total += num(w[x]) ? w[x] : 0; });
    $("wins-chip").textContent = "Wins";
    $("wins-chip").setAttribute("aria-label", "Wins at this table" + (total ? ": " + total + " so far" : ""));
  }
  function renderRoster() {
    var list = $("roster");
    list.innerHTML = "";
    if (!game) { $("roster-note").textContent = "No game going on."; return; }
    game.p.forEach(function (x, i) {
      var li = el("li", "s-roster-i" + (game.out[i] ? " out" : ""));
      li.appendChild(el("span", "", x));
      var o = game.outOn[i];
      li.appendChild(el("b", "", game.out[i] ? "out on " + (o ? inText(o.c) : "a country") : i === game.turn ? "in · their turn" : "in"));
      list.appendChild(li);
    });
    $("roster-note").textContent = "Rule " + game.n + " · " + plural(game.total, "tap", "taps") + " so far.";
  }

  /* ---------- the picture to share: the rule that put the most players out, with its twelve countries,
     never which of them fit ---------- */
  var cardBlob = null, cardUrl = null, layout = null, hardest = null;
  function pickHardest() {
    var best = null;
    game.hist.forEach(function (h) {
      var outs = h.taps.filter(function (t) { return !t[2]; }).length;
      if (!best || outs >= best.k) best = { r: h.r, b: h.b, c: h.c.slice(), k: outs };
    });
    return best;
  }
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
  function drawCard(h) {
    var W2 = 1080, H2 = 1350, MG = 76, PLUM = "#6E2C78";
    var c = document.createElement("canvas");
    c.width = W2; c.height = H2;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
    x.fillStyle = PLUM; x.fillRect(0, 0, W2, H2);
    var glow = x.createRadialGradient(W2 / 2, 0, 40, W2 / 2, 0, 1100);
    glow.addColorStop(0, "rgba(255, 210, 255, .20)"); glow.addColorStop(1, "rgba(0, 0, 0, .12)");
    x.fillStyle = glow; x.fillRect(0, 0, W2, H2);
    x.fillStyle = "#ffffff"; x.textBaseline = "alphabetic";
    x.textAlign = "left"; x.font = "800 48px " + FD; x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + F; x.fillText("Still In", W2 - MG, 118);
    var r = ruleById(h.r);
    x.textAlign = "left"; x.font = "600 36px " + F; x.fillStyle = "rgba(255, 255, 255, .86)";
    x.fillText("Tap a country that fits:", MG, 214);
    var hs = 84, head = headOf(r, h.b);
    x.font = "800 " + hs + "px " + FD;
    var lines = wrapText(x, head, W2 - 2 * MG);
    while (lines.length > 2 && hs > 56) { hs -= 4; x.font = "800 " + hs + "px " + FD; lines = wrapText(x, head, W2 - 2 * MG); }
    x.fillStyle = "#ffffff";
    var y = 214 + hs + 12;
    lines.forEach(function (l) { x.fillText(l, MG - 3, y); y += hs * 1.04; });
    // what the bar's figure counts (or what the list means), so that the picture says it too
    x.font = "600 36px " + F; x.fillStyle = "rgba(255, 255, 255, .9)";
    var sub = wrapText(x, lineOf(r, h.b), W2 - 2 * MG);
    y += 2;
    sub.slice(0, 2).forEach(function (l) { x.fillText(l, MG, y); y += 46; });
    // the twelve, three across, without a mark (a little smaller when the rule and its line take two lines each)
    var tall = lines.length > 1 && sub.length > 1;
    var top = y + 10, gap = tall ? 14 : 18, tw = (W2 - 2 * MG - 2 * gap) / 3, th = tall ? 92 : 104, maxText = 0;
    h.c.forEach(function (id, i) {
      var col = i % 3, rowN = Math.floor(i / 3), tx = MG + col * (tw + gap), ty = top + rowN * (th + gap);
      x.fillStyle = "rgba(255, 255, 255, .95)";
      roundRect(x, tx, ty, tw, th, 20); x.fill();
      x.fillStyle = PLUM; x.textAlign = "center";
      var fs = 34, nm = cname(id);
      x.font = "800 " + fs + "px " + F;
      var nl = wrapText(x, nm, tw - 24);
      while ((nl.length > 2 || nl.some(function (l) { return x.measureText(l).width > tw - 24; })) && fs > 22) { fs -= 2; x.font = "800 " + fs + "px " + F; nl = wrapText(x, nm, tw - 24); }
      nl.forEach(function (l) { maxText = Math.max(maxText, x.measureText(l).width); });
      var ly = ty + th / 2 + fs * 0.36 - (nl.length - 1) * fs * 0.56;
      nl.forEach(function (l) { x.fillText(l, tx + tw / 2, ly); ly += fs * 1.12; });
    });
    var below = top + 4 * (th + gap) + 26;
    x.textAlign = "left"; x.fillStyle = "#ffffff"; x.font = "700 46px " + FD;
    var outLine = h.k ? "It put " + plural(h.k, "player", "players") + " out." : "Nobody went out on it.";
    x.fillText(outLine, MG, below + 30);
    x.font = "800 66px " + FD;
    x.fillText("Can your table get through it?", MG - 3, 1198);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + F;
      while (x.measureText(line).width > W2 - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + F; }
      x.fillText(line, MG, 1268);
    }
    x.font = "800 66px " + FD;
    var askW = x.measureText("Can your table get through it?").width;
    layout = { fits: askW <= W2 - 2 * MG && lines.length <= 2 && sub.length <= 2 && maxText <= tw - 20 && below + 40 < 1130,
               lines: lines.length, sub: sub.length, size: hs, bottom: below + 40 };
    return c;
  }
  window.StillInCard = function (p, k) {                    // read by r/site-workshop/checks/t_still.py
    if (p) { drawCard({ r: p.r, b: p.b, c: p.c, k: k || 0 }); }  // a picture for any twelve (it shares nothing)
    return layout;
  };
  function prepareCard() {
    cardBlob = null;
    hardest = pickHardest();
    if (!hardest) return;
    function make() {
      try {
        drawCard(hardest).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 84px "Bricolage Grotesque"'), document.fonts.load('600 40px "Figtree"'), document.fonts.load('800 34px "Figtree"')]).then(make, make);
    } else make();
  }
  function shareUrl() {
    var base = window.location.href.split("#")[0].split("?")[0], h = hardest;
    return base + "?r=" + encodeURIComponent(h.r) + "&b=" + (h.b || "-") + "&c=" + h.c.join(".") + "&k=" + Math.min(9, h.k);
  }
  function shareText() {
    var h = hardest, r = ruleById(h.r);
    return "Still In: twelve countries, one rule: " + headOf(r, h.b) + ". " +
      (h.k ? "It put " + plural(h.k, "player", "players") + " at our table out." : "Nobody at our table went out on it.") +
      " Can your table get through it? " + shareUrl();
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
    RULES.forEach(function (r) { if (r.list && available(r)) item(LISTS[r.list].name, LISTS[r.list].src || []); });
    var figs = [];
    Object.keys(FIGS).forEach(function (k) { var m = meta(k); if (m) figs.push({ name: m.name, url: m.url }); });
    if (figs.length) item("World Bank figures", figs);
  })();

  /* ---------- wiring ---------- */
  TO.wireDialogs();
  TO.fixLocalLinks();
  winsLine();
  if (friend) TO.count(GAME + "/challenge-opened");

  function plainAddress() {           // once a friend's twelve are dealt, the address loses them: a new opening is a plain start
    if (window.location.search && window.history && window.history.replaceState) {
      try { window.history.replaceState(null, "", window.location.pathname); } catch (e) { /* keep the address */ }
    }
  }
  $("btn-fewer").addEventListener("click", function () { if (setup.n > PLAYERS_MIN) { setup.n--; renderSetup(); } });
  $("btn-more").addEventListener("click", function () { if (setup.n < PLAYERS_MAX) { setup.n++; renderSetup(); } });
  $("btn-names").addEventListener("click", renderNameFields);
  $("btn-start").addEventListener("click", function () {
    var f = friend ? friend.pool : null;
    friend = null;
    plainAddress();
    newGame(f);
    showHand();
  });
  $("btn-check").addEventListener("click", mainButton);
  $("btn-hand").addEventListener("click", handed);
  $("btn-next").addEventListener("click", function () {
    if ($("btn-next").getAttribute("data-do") === "back") { show("end"); $("btn-again").focus(); return; }
    nextRuleNow();
  });
  $("btn-players").addEventListener("click", renderRoster);
  $("btn-restart-yes").addEventListener("click", function () { fresh(); $("btn-start").focus(); });
  $("wins-chip").addEventListener("click", winsLine);
  $("btn-again").addEventListener("click", function () {
    plainAddress();
    newGame(null);
    showHand();
  });
  $("btn-change").addEventListener("click", function () { fresh(); $("btn-more").focus(); });
  $("btn-last").addEventListener("click", function () {
    if (!game) return;
    var last = game.hist[game.hist.length - 1];
    renderLadder(last, last.taps, true);
    $("btn-next").textContent = "Back";
    $("btn-next").setAttribute("data-do", "back");
    show("rule");
    $("btn-next").focus();
  });
  $("share").addEventListener("click", function () {
    if (!hardest) return;
    TO.count(GAME + "/share");
    TO.share({ blob: cardBlob, filename: "still-in.png", text: shareText() }).then(function (how) {
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
     (from the home page, the Back button or a reload), Restart and "New players" clear the game, the players' names
     and the wins at this table, and show the start. ---------- */
  function fresh() {
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) { TO.closeDialog(d); });
    game = null;
    picked = "";
    home = "";
    stage = "pick";
    setup = blankSetup();
    table = { wins: {}, next: 0 };
    winsLine();
    showStart();
  }
  /* for the checks (r/site-workshop/checks/t_still.py): the players, the table and a game going on, set as a table
     would have them, and read back. Nothing of it is stored. */
  CORE.load = function (s) {
    s = s || {};
    fresh();
    if (num(s.n) && s.n >= PLAYERS_MIN && s.n <= PLAYERS_MAX) setup.n = Math.round(s.n);
    if (Array.isArray(s.names)) s.names.slice(0, PLAYERS_MAX).forEach(function (x, i) { setup.names[i] = clean(x); });
    if (s.wins && typeof s.wins === "object") Object.keys(s.wins).forEach(function (k) { if (num(s.wins[k])) table.wins[k] = s.wins[k]; });
    if (num(s.next)) table.next = s.next;
    winsLine();
    if (!validGame(s.cur)) { showStart(); return false; }
    game = resume(s.cur);
    if (game.done) { stage = "rule"; endRule(); }       // a rule that was over: its list
    else if (game.pass) showHand();                      // the phone is being passed
    else showPlay();
    return true;
  };
  CORE.now = function () {
    return JSON.parse(JSON.stringify({ game: game, n: setup.n, names: setup.names, wins: table.wins, next: table.next }));
  };

  // a page that the browser brings back from its memory (the Back button) starts afresh too
  window.addEventListener("pageshow", function (e) { if (e.persisted) fresh(); });
  fresh();
})();
