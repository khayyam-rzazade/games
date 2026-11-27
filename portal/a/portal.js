/* Play Logicers — the pages' script (chat B, 19 Nov 2026). The pages work without it (every link is a real link); it adds:
     - the device's id (portal.id: 16 random bytes as 22 base64url characters, made once), sent only with a count
     - the counts: a tap on Play or on the big coin of a game page, on a Logicers coin, on the dice or on My run sends /api/hit
       by sendBeacon (the link itself opens the game). Another maker's coin opens its game's page, as its name does, and
       counts nothing (Khayyam, 22 Nov 2026; it played from 20 Nov). A page under /<lang>/ sends /api/view once; the numbers come
       live from /api/counts (on load, and again when the page is shown after a game, so a player back from it sees it
       counted). A 0 is never written: a coin with nobody today shows its kind's icon (.is-0), and the lines "{n} players
       today" and a game page's numbers stay hidden until 1.
     - Yours (portal.mine: saved games and the day each was last played, the device's own day): the Yours row from
       /api/<lang>/games?ids=, the Save buttons, the tick of a game played today
     - the streak (portal.mine.streak: the days in a row on which a game was played from here, the device's own day; a flame and
       the number on the Yours row from 1, grey until today's first game), the run (the Yours row's one-tap run through
       Logicers' first game and your games, each once a day) and the dice (a random game of the language, from /api/<lang>/dice)
     - the game of the week (chat J, 20 Nov 2026, plan 2.20): the games played this UTC week (portal.mine.week), the vote on a
       game's page (shown once this device played that game this week; one vote a language and week, final: portal.vote keeps
       { <lang>: { w: the week's Monday, g: the game } }), and the crown on the coins the API marks
     - the language: a language's page is remembered (portal.lang); the wall puts it, or the browser's language, first; the
       language button of a language's page opens the list of the open languages (a sheet, as Add a game: chat K, 20 Nov 2026)
     - the sheets (add a game, report) with every error, and More on a kind's page
     - search (chat S, 24 Nov 2026): the magnifier of a language with 40 games or more opens a sheet that finds a game by its
       name, its maker or its kind, on the device (the one matching function below, "fold"); a search that finds nothing is
       sent once, as words only (/api/miss), to see which games are missing
     - My Logicers (chat M, 26 Nov 2026): on a language's page, a kind page and a game page, once the page has settled, a hidden
       frame of logicers.com/portal/bridge.html (the one frame the page's CSP lets in). It says whether this device keeps a My
       Logicers code and the player's Logicer number; with a code, Yours (saved games, the day each was played, the streak) is
       merged with the copy kept there (pmMerge below) and every change goes there too, so it follows the code to every device.
       Beside the flame, Logicers' mark (#me-mark) leads to My Logicers, with the Logicer number when the device has one
       (portal.me keeps it, so it shows at once on the next page). Without an answer from logicers.com the page is as before.
   Words come only from the page's own data (#pl-data), never from this file. No inline style, no HTML strings: the CSP
   forbids them, so everything is built with the DOM. */
(function () {
  "use strict";
  var doc = document;
  var D = {};
  try { D = JSON.parse(doc.getElementById("pl-data").textContent) || {}; } catch (e) { D = {}; }
  /* the numbers of players are counted and, for now, not shown (Khayyam, 21 Nov 2026): the page says so (nums: 0), and then
     no counts are asked for and a tap turns no coin into a number; the tap itself is still counted */
  var NUMS = D.nums !== 0;
  var W = D.words || {}, LANG = D.lang || "en", TAG = D.tag || LANG, PAGE = D.page || "";
  var IN_LANG = PAGE === "lang" || PAGE === "kind" || PAGE === "game";
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function closest(el, s) { return el && el.closest ? el.closest(s) : null; }

  /* ---- the device's storage (a private window may refuse it: then nothing is kept) ---- */
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { window.localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  var ID_OK = /^[A-Za-z0-9_-]{21}[AQgw]$/;
  var idMemo = null;
  function deviceId() {
    if (idMemo) return idMemo;
    var id = get("portal.id");
    if (!id || !ID_OK.test(id)) {
      var b = new Uint8Array(16), s = "";
      window.crypto.getRandomValues(b);
      for (var i = 0; i < 16; i++) s += String.fromCharCode(b[i]);
      id = window.btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      put("portal.id", id);
    }
    idMemo = id;
    return id;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  /* the UTC week of now, as its Monday ("2026-11-16"): the week of the game of the week runs from Monday 00:00 UTC */
  function utcWeek() { var d = new Date(), k = (d.getUTCDay() + 6) % 7; return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - k)).toISOString().slice(0, 10); }
  function localDay(t) { var d = t ? new Date(t) : new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dayBack(k) { var d = new Date(); d.setDate(d.getDate() - k); return localDay(d.getTime()); }   // by the calendar: a day with 23 or 25 hours is still a day
  var GAME_ID = /^[a-z0-9-]{1,40}$/;
  function readMine() {
    var m = null;
    try { m = JSON.parse(get("portal.mine") || "null"); } catch (e) { m = null; }
    var out = { v: 1, star: [], played: {}, streak: { n: 0, last: "" }, week: { w: "", ids: [] } };
    if (m && typeof m === "object") {
      if (Array.isArray(m.star)) out.star = m.star.filter(function (x) { return typeof x === "string" && GAME_ID.test(x); }).slice(0, 200);
      if (m.played && typeof m.played === "object") Object.keys(m.played).forEach(function (k) { if (GAME_ID.test(k) && /^\d{4}-\d{2}-\d{2}$/.test(m.played[k])) out.played[k] = m.played[k]; });
    }
    if (m && m.streak && typeof m.streak === "object" && /^\d{4}-\d{2}-\d{2}$/.test(m.streak.last || "") && m.streak.n >= 1 && m.streak.n <= 9999 && m.streak.n === Math.floor(m.streak.n)) out.streak = { n: m.streak.n, last: m.streak.last };
    if (m && m.week && typeof m.week === "object" && m.week.w === utcWeek() && Array.isArray(m.week.ids)) out.week = { w: m.week.w, ids: m.week.ids.filter(function (x) { return typeof x === "string" && GAME_ID.test(x); }).slice(0, 300) };
    var c = pmClean(m);                                     // when each game was saved or unsaved, and what My Logicers shows of it (chat M)
    out.t = c.t; out.g = c.g;
    return out;
  }
  function saveMine(m) {
    var cut = localDay(Date.now() - 8 * 864e5), old = Date.now() - PM_KEEP * 864e5;
    Object.keys(m.played).forEach(function (k) { if (m.played[k] < cut) delete m.played[k]; });
    m.t = m.t || {}; m.g = m.g || {};
    Object.keys(m.g).forEach(function (k) { if (m.star.indexOf(k) < 0) delete m.g[k]; });
    Object.keys(m.t).filter(function (k) { return m.star.indexOf(k) < 0; }).sort(function (x, y) { return m.t[y] - m.t[x]; })
      .forEach(function (k, i) { if (i >= PM_OFF || m.t[k] < old) delete m.t[k]; });
    put("portal.mine", JSON.stringify(m));
  }

  /* ---- numbers and words ---- */
  var NF = null, PR = null;
  try { NF = new Intl.NumberFormat(D.nt || TAG); } catch (e) { NF = null; }   // nt: the language's own digits (chat R: ١٢٣ in Arabic, ۱۲۳ in Persian), as the server writes them
  try { PR = new Intl.PluralRules(TAG); } catch (e) { PR = null; }
  function fmt(n) { return NF ? NF.format(n) : String(n); }
  function wordN(key, n) {
    var cat = PR ? PR.select(n) : "other";
    var s = cat !== "other" && W[key + "." + cat] != null ? W[key + "." + cat] : W[key];
    return s == null ? "" : String(s);
  }
  function aroundN(key, n) { var s = wordN(key, n), i = s.indexOf("{n}"); return i < 0 ? [s.trim(), ""] : [s.slice(0, i).trim(), s.slice(i + 3).trim()]; }
  function withN(key, n) { return wordN(key, n).replace("{n}", fmt(n)); }
  function numCls(s) { var n = Array.from(String(s)).length; return n >= 7 ? "n7" : n === 6 ? "n6" : n === 5 ? "n5" : ""; }   // as pages.js: every character, its separators too (chat R)
  function setNum(el, n) {
    if (!el || el.hasAttribute("data-mark")) return;
    var s = n ? fmt(n) : "";
    if (el.textContent !== s) el.textContent = s;
    if (el.classList.contains("tile-n")) {
      el.classList.remove("n5", "n6", "n7"); var c = numCls(s); if (c) el.classList.add(c);
      var li = closest(el, "li.tile");
      if (li) li.classList.toggle("is-0", !n);
    }
  }
  function setLabel(el, n) { if (el) el.textContent = n ? ", " + withN("today_n", n) : ""; }
  function setWords(box, key, n) {                          // "{n} players today": the words before and after the number
    var w = $$(".today-w, .num-w", box), a = aroundN(key, n);
    if (w.length === 2) { w[0].textContent = a[0]; w[1].textContent = a[1]; }
  }

  /* ---- search: the matching (chat S, 24 Nov 2026). The one function the search compares with; src/search.js keeps the same
     text, letter for letter (test/test_s.mjs), so the Worker keeps a search that found nothing exactly as it was compared. ---- */
  /* fold: from here */
  /* The search's one matching function (chat S, 24 Nov 2026). A name, a maker, a kind's word or what was typed, as the search
     compares them: case and accents go (NFKD; the marks of Latin, Greek and Cyrillic letters, Hebrew points and Arabic,
     Persian and Urdu marks are taken off, and Devanagari's nukta, as Hindi is often typed without it: ज़ is ज (chat Q3);
     the vowel signs of Indic and Thai letters stay, as they are letters there); ı, İ
     and i are one, ß is ss, Greek's final sigma is sigma; the forms of alef, yeh, kaf and heh are one; katakana is
     hiragana; full and half width are one (NFKD); every script's digits are 0-9; spaces, punctuation and symbols go. On a
     Serbian page Cyrillic reads as Latin, so a game named in either script is found from the other. */
  var FOLD_ONE = { "ı": "i", "ß": "ss", "ς": "σ", "ə": "e", "ø": "o", "æ": "ae", "œ": "oe", "đ": "d", "ł": "l", "ħ": "h", "þ": "th", "ð": "d",
    "ٱ": "ا", "ى": "ی", "ي": "ی", "ك": "ک", "ة": "ه", "ە": "ه", "ہ": "ه", "ھ": "ه" };
  var FOLD_SR = { "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "ђ": "d", "е": "e", "ж": "z", "з": "z", "и": "i", "ј": "j", "к": "k",
    "л": "l", "љ": "lj", "м": "m", "н": "n", "њ": "nj", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "ћ": "c", "у": "u", "ф": "f",
    "х": "h", "ц": "c", "ч": "c", "џ": "dz", "ш": "s" };
  var FOLD_ZERO = [0x660, 0x6F0, 0x7C0, 0x966, 0x9E6, 0xA66, 0xAE6, 0xB66, 0xBE6, 0xC66, 0xCE6, 0xD66, 0xDE6, 0xE50, 0xED0, 0xF20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0];
  function fold(s, lang) {
    s = String(s == null ? "" : s).normalize("NFKD").toLowerCase()
      .replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u0591-\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u093C\uFE00-\uFE0F]/g, "")
      .replace(/[ıßςəøæœđłħþðٱىيكةەہھ]/g, function (c) { return FOLD_ONE[c]; });
    if (lang === "sr") s = s.replace(/[\u0430-\u0448\u0452\u0458-\u045B\u045F]/g, function (c) { return FOLD_SR[c] || c; });
    return s.replace(/[\u30A1-\u30F6\u30FD\u30FE]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); })
      .replace(/\p{Nd}/gu, function (c) {
        var n = c.codePointAt(0), i = FOLD_ZERO.length;
        while (i--) if (n >= FOLD_ZERO[i] && n < FOLD_ZERO[i] + 10) return String(n - FOLD_ZERO[i]);
        return c;
      })
      .replace(/[\p{Z}\p{P}\p{S}\p{Cc}\p{Cf}\u0640]/gu, "")
      .normalize("NFC");
  }
  /* a game as the search compares it, folded once: its name (with where each of its words starts), its maker, its kind's word */
  function foldGame(name, maker, kindWord, lang) {
    var parts = String(name == null ? "" : name).split(/[\p{Z}\p{P}\p{S}]+/u), at = [], n = "";
    for (var i = 0; i < parts.length; i++) { var f = fold(parts[i], lang); if (f) { at.push(n.length); n += f; } }
    return { n: n, at: at, m: fold(maker, lang), k: fold(kindWord, lang) };
  }
  /* where a game goes among the results for a folded query q: 0 its name starts with q, 1 a word of its name does, 2 its
     name holds q, 3 its maker or its kind's word holds it; -1 not found. Chinese, Japanese and Thai write no spaces, so
     there it is the name's start, then anywhere in it (by substring). */
  function rankOf(g, q) {
    if (!q || !g) return -1;
    var i = g.n.indexOf(q);
    if (i === 0) return 0;
    for (var w = 1; w < g.at.length; w++) if (g.n.substr(g.at[w], q.length) === q) return 1;
    if (i > 0) return 2;
    return g.m.indexOf(q) >= 0 || g.k.indexOf(q) >= 0 ? 3 : -1;
  }
  /* fold: to here */

  /* play-merge: from here */
  /* Play Logicers' Yours as My Logicers carries it from device to device (chat M, 26 Nov 2026):
       { v: 1, star: [game ids, newest first], t: { id: when it was last saved or unsaved, ms }, g: { id: [language, slug, name,
         address] } (what My Logicers needs to name and link a saved game: its page on play.logicers.com, or the address of one of
         Logicers' own games), played: { id: the device's day it was last played }, streak: { n, last }, lang }
     An id in t that is not in star was unsaved at that time. Two copies merge so that a saved game is never lost, a streak is
     never lowered, and a game unsaved on one device stays unsaved on the others: of a game's two states the later one wins (a
     save kept with no time, from before 26 Nov 2026, loses only to an unsave that has one); two streaks that touch or overlap
     are one (days in a row on any of the devices are days in a row); a game's last day played is the later one. b is the copy
     of the side that merges: its words win (a game's name, the language). The same text is in portal/a/portal.js and
     assets/js/me.js (server/portal/test/test_m.mjs compares them). */
  var PM_ID = /^[a-z0-9-]{1,40}$/, PM_DAY = /^\d{4}-\d{2}-\d{2}$/, PM_LANG = /^[a-z]{2,3}(-[a-z]{4})?$/, PM_SLUG = /^(?:[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?)?$/;
  var PM_STAR = 200, PM_OFF = 100, PM_KEEP = 400, PM_PLAYED = 8;       // saved games; unsaved ones remembered (at most, and days); days of plays kept
  function pmObj(x) { return x && typeof x === "object" && !Array.isArray(x) ? x : null; }
  function pmDay(s) { return Math.round(Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / 864e5); }
  function pmToday() { var d = new Date(); return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  function pmSort(o) { var out = {}; Object.keys(o).sort().forEach(function (k) { out[k] = o[k]; }); return out; }
  function pmClean(x) {
    var o = { v: 1, star: [], t: {}, g: {}, played: {}, streak: { n: 0, last: "" } };
    x = pmObj(x);
    if (!x) return o;
    (Array.isArray(x.star) ? x.star : []).forEach(function (id) { if (typeof id === "string" && PM_ID.test(id) && o.star.indexOf(id) < 0 && o.star.length < PM_STAR) o.star.push(id); });
    var t = pmObj(x.t) || {}, g = pmObj(x.g) || {}, p = pmObj(x.played) || {}, s = pmObj(x.streak);
    Object.keys(t).forEach(function (id) { var v = t[id]; if (PM_ID.test(id) && typeof v === "number" && isFinite(v) && v > 0) o.t[id] = Math.floor(v); });
    Object.keys(g).forEach(function (id) {
      var v = g[id];
      if (!PM_ID.test(id) || !Array.isArray(v) || !PM_LANG.test(String(v[0])) || !PM_SLUG.test(String(v[1] == null ? "" : v[1])) || typeof v[2] !== "string" || !v[2].trim()) return;
      var u = typeof v[3] === "string" && /^https:\/\/[^\s"'<>\\]{1,200}$/.test(v[3]) ? v[3] : "";
      if (!v[1] && !u) return;                                         // nothing to link to
      o.g[id] = [v[0], v[1] || "", v[2].replace(/[\u0000-\u001f]/g, " ").trim().slice(0, 80), u];
    });
    Object.keys(p).forEach(function (id) { if (PM_ID.test(id) && PM_DAY.test(String(p[id])) && isFinite(pmDay(p[id]))) o.played[id] = p[id]; });
    if (s && PM_DAY.test(String(s.last)) && isFinite(pmDay(s.last)) && typeof s.n === "number" && s.n >= 1 && s.n <= 9999 && Math.floor(s.n) === s.n) o.streak = { n: s.n, last: s.last };
    if (typeof x.lang === "string" && PM_LANG.test(x.lang)) o.lang = x.lang;
    o.t = pmSort(o.t); o.g = pmSort(o.g); o.played = pmSort(o.played);
    return o;
  }
  function pmStreak(x, y) {
    if (!x.n) return { n: y.n, last: y.last };
    if (!y.n) return { n: x.n, last: x.last };
    var ex = pmDay(x.last), ey = pmDay(y.last), sx = ex - x.n + 1, sy = ey - y.n + 1;
    if (Math.max(sx, sy) <= Math.min(ex, ey) + 1) {
      var e = Math.max(ex, ey);
      return { n: Math.min(9999, e - Math.min(sx, sy) + 1), last: e === ex ? x.last : y.last };
    }
    return ex > ey ? { n: x.n, last: x.last } : { n: y.n, last: y.last };
  }
  function pmMerge(a, b) {
    a = pmClean(a); b = pmClean(b);
    var o = { v: 1, star: [], t: {}, g: {}, played: {}, streak: pmStreak(a.streak, b.streak) }, seen = {}, on = [];
    a.star.concat(b.star, Object.keys(a.t), Object.keys(b.t)).forEach(function (id) {
      if (seen[id]) return;
      seen[id] = 1;
      var ia = a.star.indexOf(id), ib = b.star.indexOf(id), ta = a.t[id] || 0, tb = b.t[id] || 0, t = Math.max(ta, tb);
      var saved = ta === tb ? ia >= 0 || ib >= 0 : ta > tb ? ia >= 0 : ib >= 0;
      if (t) o.t[id] = t;
      if (saved) on.push({ id: id, t: t, i: Math.min(ia < 0 ? 1e9 : ia, ib < 0 ? 1e9 : ib) });
    });
    on.sort(function (x, y) { return y.t - x.t || x.i - y.i || (x.id < y.id ? -1 : 1); });
    o.star = on.slice(0, PM_STAR).map(function (x) { return x.id; });
    on.slice(PM_STAR).forEach(function (x) { delete o.t[x.id]; });  // past the most Play keeps: gone, not an unsave
    var cut = Date.now() - PM_KEEP * 864e5;
    Object.keys(o.t).filter(function (id) { return o.star.indexOf(id) < 0; }).sort(function (x, y) { return o.t[y] - o.t[x] || (x < y ? -1 : 1); })
      .forEach(function (id, i) { if (i >= PM_OFF || o.t[id] < cut) delete o.t[id]; });
    o.star.forEach(function (id) { var v = b.g[id] || a.g[id]; if (v) o.g[id] = v; });
    var from = pmToday() - PM_PLAYED;
    [a.played, b.played].forEach(function (p) { Object.keys(p).forEach(function (id) { if (pmDay(p[id]) >= from && p[id] > (o.played[id] || "")) o.played[id] = p[id]; }); });
    if (b.lang || a.lang) o.lang = b.lang || a.lang;
    o.t = pmSort(o.t); o.g = pmSort(o.g); o.played = pmSort(o.played);
    return o;
  }
  /* play-merge: to here */

  /* ---- icons (the sprite the page already uses, with its stamp) ---- */
  var SPRITE = (function () { var u = $("svg use"); var h = u ? u.getAttribute("href") || "" : ""; return h.split("#")[0] || "/a/icons.svg"; })();
  var SVG = "http://www.w3.org/2000/svg";                // the SVG namespace, not an address
  function icon(id, cls) {
    var s = doc.createElementNS(SVG, "svg"), u = doc.createElementNS(SVG, "use");
    s.setAttribute("class", "ico" + (cls ? " " + cls : ""));
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    u.setAttribute("href", SPRITE + "#" + id);
    s.appendChild(u);
    return s;
  }
  function clear(el) { while (el && el.firstChild) el.removeChild(el.firstChild); }

  /* ---- the counts ---- */
  function beacon(path, body) {
    var s = JSON.stringify(body);
    try { if (navigator.sendBeacon && navigator.sendBeacon(path, s)) return; } catch (e) { /* the fetch below */ }
    try { window.fetch(path, { method: "POST", body: s, keepalive: true, credentials: "omit", headers: { "Content-Type": "application/json" } }); } catch (e) { /* not counted */ }
  }
  var lastCounts = 0, lastGames = {};
  /* the number an element shows now (the page's own, or the last count): an older answer never lowers it. Since chat N (22 Nov
     2026) a play happens on the game's page, so a player comes back to a new page with a newer number than the counts the
     browser may still hold; the counts are also asked again each time (no-cache), as the pages are. */
  function shownNum(x) { return +(x.getAttribute("data-today") || 0) || +(x.textContent || "").replace(/\D/g, "") || 0; }
  function counts() {
    if (!NUMS || !window.fetch) return;
    lastCounts = Date.now();
    window.fetch(IN_LANG ? "/api/counts?lang=" + encodeURIComponent(LANG) : "/api/counts", { credentials: "omit", cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.ok) return;
        var g = j.games || {};
        lastGames = g;
        $$("[data-game]").forEach(function (el) {
          var c = g[el.getAttribute("data-game")];
          if (!c || el.tagName === "FORM") return;
          var t = Math.max(c.t, bumped[el.getAttribute("data-game")] || 0);
          $$('[data-count="today"]', el).forEach(function (x) { if (x.hasAttribute("data-mark")) return; t = Math.max(t, shownNum(x)); });
          $$('[data-count="today"]', el).forEach(function (x) { if (x.classList.contains("tile-n")) x.setAttribute("data-today", String(t)); setNum(x, t); });
          $$('[data-count="all"]', el).forEach(function (x) { setNum(x, Math.max(c.a, shownNum(x), t)); });
          $$('[data-count-label="today"]', el).forEach(function (x) { setLabel(x, t); });
          var art = el.tagName === "ARTICLE" ? el : null;
          if (art) {
            $$(".num-today", art).forEach(function (b) { setWords(b, "today_n", t); b.hidden = !t; });
            $$(".num-all", art).forEach(function (b) { setWords(b, "total_n", c.a); b.hidden = !c.a; });
            $$(".game-nums", art).forEach(function (b) { b.hidden = !t && !c.a; });
          }
        });
        if (typeof j.page === "number") $$(".today").forEach(function (p) { var n = Math.max(j.page, shownNum($(".today-n", p))); setNum($(".today-n", p), n); setWords(p, "players_today", n); p.hidden = !n; });
        paintMarks(readMine());
      })
      .catch(function () { /* the numbers the page came with stay */ });
  }

  /* ---- Yours: saved games, ticks, the row ---- */
  function paintStars(m) {
    m = m || readMine();
    $$("[data-star]").forEach(function (b) {
      var on = m.star.indexOf(b.getAttribute("data-star")) >= 0;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var li = closest(b, ".tile");
      if (li) li.classList.toggle("is-star", on);
    });
  }
  function paintTicks(m) {
    m = m || readMine();
    var today = localDay();
    $$("li.tile[data-game]").forEach(function (li) {
      var on = m.played[li.getAttribute("data-game")] === today, a = $(".tile-a", li), i = $(".tile-tick-i", li);
      li.classList.toggle("tile-tick", on);
      if (on && !i && a) { var k = $(".tile-kind", a); a.insertBefore(icon("i-check", "tile-tick-i"), k || null); }
      if (!on && i) i.parentNode.removeChild(i);
    });
    paintMarks(m);
    paintStreak(m);
    paintRun(m);
    fitMark();
  }
  /* the streak: shown while it is alive (today or yesterday was the last day), from 1; grey until today's first game */
  function paintStreak(m) {
    var el = $("#streak");
    if (!el) return;
    var s = m.streak, today = localDay(), alive = s.n >= 1 && (s.last === today || s.last === dayBack(1));
    el.hidden = !alive;
    if (!alive) return;
    var label = withN("streak_n", s.n);
    $(".streak-n", el).textContent = fmt(s.n);
    el.classList.toggle("is-wait", s.last !== today);
    el.setAttribute("aria-label", label);
    el.setAttribute("title", label);
  }
  /* the run: Logicers' first game (where the page has Logicers in its own language), then Yours in its order, each once; the
     link goes to the first not played today. A tap on it counts as any Play does. Held still for a moment after a tap on
     it, so the tab it opens gets the address it had when it was tapped. */
  var held = false;
  function runList() {
    var out = [], seen = {};
    function add(li) {                                      // the game's own address: a Yours tile keeps it (data-url); a Logicers coin is it
      var id = li && li.getAttribute("data-game"), a = li && $(".tile-a", li), u = li && (li.getAttribute("data-url") || (a && a.getAttribute("href")));
      if (!id || !u || seen[id] || !SAFE.test(u)) return;
      seen[id] = 1; out.push({ id: id, url: u });
    }
    add($(".row-lg:not(.row-lg-en) li.tile"));
    $$("#row-mine li.tile").forEach(add);
    return out;
  }
  function paintRun(m) {
    var a = $("#run"), done = $("#run-done"), sec = $("#row-mine");
    if (!a || !done || !sec || held) return;
    m = m || readMine();
    var list = runList(), today = localDay(), k = 0, next = null;
    list.forEach(function (p) { if (m.played[p.id] === today) k++; else if (!next) next = p; });
    if (sec.hidden || list.length < 2) { a.hidden = true; done.hidden = true; return; }
    var text = k ? fmt(k) + "/" + fmt(list.length) : fmt(list.length);   // a 0 is never written
    if (next) {
      var label = W.run + ", " + text;
      done.hidden = true; a.hidden = false;
      a.setAttribute("href", next.url); a.setAttribute("data-game", next.id);
      a.setAttribute("aria-label", label); a.setAttribute("title", label);
      $(".run-t", a).textContent = text;
    } else {
      var all = W.run_done + ", " + text;
      a.hidden = true; a.removeAttribute("href"); a.setAttribute("data-game", "");
      done.hidden = false;
      done.setAttribute("aria-label", all); done.setAttribute("title", all);
      $(".run-t", done).textContent = text;
    }
  }
  /* the dice: the language's games (id and address) are fetched once, and the link is given a random one it can open at once
     (a tap is a real link in a new tab: no script between the tap and the page). Games played today are left out unless
     they are all played, and so is the last one picked. */
  var diceList = null, diceAt = 0, diceLast = "";
  function diceInit() {
    var a = $("#dice");
    if (!a || PAGE !== "lang" || !window.fetch) return;
    a.hidden = false; if (!a.getAttribute("href")) a.setAttribute("aria-disabled", "true");   // in its place from the start; it gets its address with the list
    fitDice();
    diceAt = Date.now();
    window.fetch("/api/" + encodeURIComponent(LANG) + "/dice", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.ok || !Array.isArray(j.games)) return;
        diceList = j.games.filter(function (p) { return Array.isArray(p) && GAME_ID.test(p[0] || "") && SAFE.test(p[1] || ""); });
        if (diceList.length < 2) { a.hidden = true; diceList = null; return; }
        fitDice();
        pickDice();
      })
      .catch(function () { a.hidden = true; });
  }
  function pickDice() {
    var a = $("#dice");
    if (!a || !diceList || held) return;
    var m = readMine(), today = localDay();
    var pool = diceList.filter(function (p) { return p[0] !== diceLast && m.played[p[0]] !== today; });
    if (!pool.length) pool = diceList.filter(function (p) { return p[0] !== diceLast; });
    var p = pool[Math.floor(Math.random() * pool.length)];
    a.setAttribute("href", p[1]); a.setAttribute("data-game", p[0]); a.removeAttribute("aria-disabled");
  }
  function paintMarks(m) {                                  // a Yours tile: a tick if played today, the Save mark if saved, else today's number
    var today = localDay();
    $$("li.tile-mine").forEach(function (li) {
      var id = li.getAttribute("data-game"), n = $(".tile-n", li), mark = m.played[id] === today ? "i-check" : m.star.indexOf(id) >= 0 ? "i-star" : "";
      if (!n) return;
      if (mark) {
        if (n.getAttribute("data-mark") !== mark) { clear(n); n.appendChild(icon(mark, mark === "i-star" ? "is-on" : "")); n.setAttribute("data-mark", mark); n.classList.remove("n5", "n6", "n7"); }
        li.classList.remove("is-0");
      } else if (n.hasAttribute("data-mark")) {
        n.removeAttribute("data-mark"); clear(n); setNum(n, +(n.getAttribute("data-today") || 0));
      }
    });
  }
  function yoursIds(m) {
    var week = localDay(Date.now() - 6 * 864e5), ids = m.star.slice();
    var played = Object.keys(m.played).filter(function (id) { return m.played[id] >= week && ids.indexOf(id) < 0; })
      .sort(function (a, b) { return m.played[a] < m.played[b] ? 1 : m.played[a] > m.played[b] ? -1 : 0; });
    return ids.concat(played).slice(0, 60);
  }
  /* one tile from the template, for a game as /api/<lang>/games gives it: the coin and the name under it (the same link, out of
     the tab order) open the game's page in this tab and count nothing (Khayyam, 22 Nov 2026). A Logicers game has no page
     here: its coin opens the game in a new tab and counts. The tile keeps the game's own address (data-url) for My run. */
  var SAFE = /^https:\/\//i;
  function build(g, mine) {
    var tpl = $("#tpl-tile");
    if (!tpl || !tpl.content || ((g.logicers || !g.slug || g.url) && !SAFE.test(g.url || ""))) return null;   // the search names a maker's game by its page alone (no url)
    var li = tpl.content.firstElementChild.cloneNode(true), a = $(".tile-a", li), nm = $(".tile-name", li);
    var cls = ["tile", /^t\d{1,2}$/.test(g.ring) ? g.ring : "t8"];
    if (g.logicers) cls.push("tile-lg");
    else { if (g.new) cls.push("tile-new"); if (g.slot === 1 && !mine) cls.push("tile-one"); if (g.sold && !mine) cls.push("tile-sold"); }
    if (mine) cls.push("tile-mine");
    li.className = cls.join(" ");
    li.setAttribute("data-game", g.id);
    li.setAttribute("data-kind", g.kind);
    if (g.url) li.setAttribute("data-url", g.url);
    var page = "/" + (g.lang || LANG) + "/g/" + encodeURIComponent(g.slug) + "/";
    a.setAttribute("href", g.logicers ? g.url : page);
    nm.setAttribute("href", g.logicers ? g.url : page);
    var vp = $(".tile-vp", li);                            // "Play <name>" for a screen reader only where the coin plays
    if (g.logicers) {
      [a, nm].forEach(function (x) { x.setAttribute("target", "_blank"); x.setAttribute("rel", "noopener"); x.setAttribute("data-hit", ""); });
      vp.hidden = false;
    } else vp.parentNode.removeChild(vp);
    $(".tile-badge", li).hidden = !(g.new && !g.logicers);
    if (g.crown && !g.logicers) li.classList.add("tile-crown");
    $(".tile-gotw", li).hidden = !(g.crown && !g.logicers);
    $(".tile-chip", li).hidden = !g.en;
    $$(".tile-kind use, .tile-zero use", li).forEach(function (u) { u.setAttribute("href", SPRITE + "#k-" + g.kind); });
    /* the logo (chat J, plan 2.20): a maker's picture from our own /p/, or the drawing of one of Logicers' games */
    var img = $("img.tile-logo", li), lgo = $("svg.tile-logo", li);
    var drop = function (e) { if (e && e.parentNode) e.parentNode.removeChild(e); };
    if (g.logo && /^[a-z0-9]{2,12}$/.test(g.logo)) { $("use", lgo).setAttribute("href", SPRITE + "#lg-" + g.logo); lgo.removeAttribute("hidden"); drop(img); }   // an svg has no .hidden to set (chat S: Logicers' coins in Yours and More showed no drawing)
    else if (g.pic && /^\/p\/[a-z0-9-]{1,40}\/[0-9a-f]{16}\.(png|jpg|webp)$/.test(g.pic)) { img.setAttribute("src", g.pic); img.hidden = false; drop(lgo); }
    else { drop(img); drop(lgo); }
    if (img.parentNode || lgo.parentNode) $$(".tile-kind, .tile-zero", li).forEach(drop);     // the logo takes the kind icon's place
    nm.textContent = g.name;
    var vn = $(".tile-vt", li);
    if (vn) vn.textContent = g.name;
    if (g.en) { nm.setAttribute("lang", "en"); if (vn) vn.setAttribute("lang", "en"); }
    var n = $(".tile-n", li), t = Math.max(g.today || 0, bumped[g.id] || 0, (lastGames[g.id] || {}).t || 0);
    n.setAttribute("data-today", String(t));
    setNum(n, t);
    setLabel($("[data-count-label]", li), t);
    $(".tile-star", li).setAttribute("data-star", g.id);
    return li;
  }
  var mineAsked = 0;
  function renderMine(focusAt) {
    var sec = $("#row-mine");
    if (!sec || !window.fetch) return;
    var ul = $("ul", sec), m = readMine(), ids = yoursIds(m), ask = ++mineAsked;
    function refocus() {                                    // a game taken out of Yours: the focus goes to its neighbour, or to the top
      if (typeof focusAt !== "number" || focusAt < 0) return;
      var links = $$(".tile-a", ul), t = links[Math.min(focusAt, links.length - 1)] || $(".chip-lang, .back, .brand-a");
      if (t) { try { t.focus({ preventScroll: true }); } catch (e) { t.focus(); } }
    }
    if (!ids.length) { clear(ul); sec.hidden = true; refocus(); return; }
    window.fetch("/api/" + encodeURIComponent(LANG) + "/games?ids=" + ids.join(","), { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (ask !== mineAsked || !j || !j.ok) return;
        var list = (j.games || []).filter(function (g) { return !D.kind || g.kind === D.kind; });
        meNames(j.games || []);
        clear(ul);
        list.forEach(function (g) { var li = build(g, true); if (li) ul.appendChild(li); });
        sec.hidden = !ul.children.length;
        paintStars(m);
        paintTicks(m);
        fitMark();
        refocus();
      })
      .catch(function () { /* the row stays as it was */ });
  }
  function toggleStar(btn) {
    var id = btn.getAttribute("data-star");
    if (!GAME_ID.test(id || "")) return;
    var m = readMine(), i = m.star.indexOf(id);
    if (i >= 0) m.star.splice(i, 1); else { m.star.unshift(id); var g = metaOf(btn); if (g) m.g[id] = g; }
    m.t[id] = Date.now();                                   // when: an unsave on one device stays an unsave on the others (chat M)
    saveMine(m);
    mePush();
    paintStars(m);
    var inMine = closest(btn, "#row-mine");
    if ($("#row-mine")) renderMine(inMine && i >= 0 ? $$(".tile-star", inMine).indexOf(btn) : undefined);
  }
  /* a game played from here: the count goes by beacon; the first play today on this device also turns its coins' number
     one up at once (an icon becomes a 1), until /api/counts says the real number on the way back */
  var bumped = {}, hitAt = 0;
  function played(el) {
    var host = closest(el, "[data-game]"), id = host ? host.getAttribute("data-game") : "";
    if (!GAME_ID.test(id || "")) return;
    beacon("/api/hit", { game: id, id: deviceId() });
    hitAt = Date.now();
    var m = readMine(), first = m.played[id] !== localDay();
    m.played[id] = localDay();
    var wk = utcWeek();                                     // the games played this UTC week, for the vote
    if (m.week.w !== wk) m.week = { w: wk, ids: [] };
    if (m.week.ids.indexOf(id) < 0) m.week.ids.unshift(id);
    var s = m.streak, today = localDay();                   // the streak: the same day changes nothing; the day after the last adds one; any other starts again
    if (s.last !== today) { s.n = s.last === dayBack(1) ? s.n + 1 : 1; s.last = today; }
    saveMine(m);
    mePush();
    if (host.id === "dice" || host.id === "run") {          // the tap's own link opens first; the next address comes a moment later
      held = true;
      window.setTimeout(function () { held = false; if (host.id === "dice") diceLast = id; pickDice(); paintRun(); }, 80);
    }
    if (first && NUMS) {
      $$('[data-game="' + id + '"]').forEach(function (g) {
        $$('.tile-n[data-count="today"]', g).forEach(function (x) {
          var t = (+(x.getAttribute("data-today") || 0) || +(x.textContent || "").replace(/\D/g, "") || 0) + 1;
          bumped[id] = Math.max(bumped[id] || 0, t);
          x.setAttribute("data-today", String(t)); setNum(x, t);
          setLabel($('[data-count-label="today"]', g), t);
        });
      });
    }
    paintTicks(m);
    paintVote(m);
  }

  /* ---- the game of the week: the vote on a game's page ---- */
  function readVote() { var v = null; try { v = JSON.parse(get("portal.vote") || "null"); } catch (e) { v = null; } return v && typeof v === "object" && !Array.isArray(v) ? v : {}; }
  function keepVote(game) { var v = readVote(); v[LANG] = { w: utcWeek(), g: game }; put("portal.vote", JSON.stringify(v)); }
  /* shown once this device played the game this UTC week (a vote counts only then); a tick on the game voted for this
     week; gone on the other games of the language until next Monday (one vote a language and week, final) */
  /* Edit, for the maker only (chat J, plan 2.20): maker.js keeps on the device which maker its key opens and that maker's
     games ("portal.makerof"); a game's page or the maker's page shows Edit there, and nowhere else */
  function paintEdit() {
    var o = null;
    try { o = JSON.parse(get("portal.makerof") || "null"); } catch (e) { o = null; }
    var games = o && Array.isArray(o.games) ? o.games : [], slug = o && typeof o.slug === "string" ? o.slug : "";
    $$("[data-maker-game]").forEach(function (a) { a.hidden = games.indexOf(a.getAttribute("data-maker-game")) < 0; });
    $$("[data-maker-slug]").forEach(function (a) { a.hidden = !slug || a.getAttribute("data-maker-slug") !== slug; });
    $$("[data-own-nums]").forEach(function (a) { a.hidden = games.indexOf(a.getAttribute("data-own-nums")) < 0; });   // its days and countries, while nobody else sees numbers
  }
  function paintVote(m) {
    var b = $("[data-vote]");
    if (!b) return;
    m = m || readMine();
    var id = b.getAttribute("data-vote"), v = readVote()[LANG], wk = utcWeek(), mine = v && v.w === wk;
    var on = mine && v.g === id;
    b.setAttribute("aria-pressed", on ? "true" : "false");
    if (on) b.setAttribute("aria-disabled", "true"); else b.removeAttribute("aria-disabled");
    b.hidden = mine ? !on : !(m.week.w === wk && m.week.ids.indexOf(id) >= 0);
  }
  function sendVote(b) {
    var id = b.getAttribute("data-vote");
    if (!GAME_ID.test(id || "") || b.getAttribute("aria-pressed") === "true" || b.getAttribute("aria-busy") === "true" || !window.fetch) return;
    b.setAttribute("aria-busy", "true");
    post("/api/vote", { game: id, id: deviceId() })
      .then(function (j) {
        b.removeAttribute("aria-busy");
        if (j && (j.ok || (j.e === "voted" && j.same))) keepVote(id);
        else if (j && j.e === "voted") keepVote("");          // this week's vote went to another game of the language
        else if (j && j.e === "notplayed") { var m = readMine(); m.week.ids = m.week.ids.filter(function (x) { return x !== id; }); saveMine(m); }
        paintVote();
        if (b.getAttribute("aria-pressed") === "true") { try { b.focus({ preventScroll: true }); } catch (e) { b.focus(); } }
      })
      .catch(function () { b.removeAttribute("aria-busy"); });
  }

  /* ---- the language ---- */
  function bestOf(codes) {
    var saved = get("portal.lang");
    if (saved && codes.indexOf(saved) >= 0) return saved;
    var tags = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]);
    for (var i = 0; i < tags.length; i++) {
      var t = String(tags[i] || "").toLowerCase(), base = t.split("-")[0], c = null;
      if (base === "zh") c = /-(tw|hk|mo|hant)\b/.test(t) ? "zh-hant" : "zh-hans";
      else if (base === "nb" || base === "nn") c = "no";
      else if (base === "tl") c = "fil";
      else c = base;
      if (codes.indexOf(t) >= 0) return t;
      if (codes.indexOf(c) >= 0) return c;
    }
    return null;
  }
  function wall() {
    $$(".langs").forEach(function (ul) {
      var items = $$("li.lang", ul), codes = items.map(function (li) { return li.getAttribute("data-lang"); });
      var best = bestOf(codes);
      if (!best) return;
      var li = items[codes.indexOf(best)];
      li.classList.add("lang-best");
      if (ul.firstElementChild !== li) ul.insertBefore(li, ul.firstElementChild);
    });
    fitLangs();
    var at = 0;
    window.addEventListener("resize", function () { if (!at) at = window.requestAnimationFrame(function () { at = 0; fitLangs(); }); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fitLangs);
  }
  /* a language's name on the wall is never cut inside its word ("Azərbaycan-ca" at 390 px, "Portu-guês" at 320): where it would
     be, it is drawn a step smaller, three steps at most (chat Q3, 27 Nov 2026) */
  var LANG_FIT = ["lang-name-fit", "lang-name-fit2", "lang-name-fit3"];
  function fitLangs() {
    $$(".langs .lang-name").forEach(function (e) {
      LANG_FIT.forEach(function (c) { e.classList.remove(c); });
      for (var i = 0; i < LANG_FIT.length && cutWord(e); i++) { if (i) e.classList.remove(LANG_FIT[i - 1]); e.classList.add(LANG_FIT[i]); }
    });
  }

  /* ---- the sheets ---- */
  function errs(form) { return $$(".sheet-err", form); }
  function showErr(form, key) { errs(form).forEach(function (p) { p.hidden = p.getAttribute("data-e") !== key; }); }
  function clearMarks(form) {
    errs(form).forEach(function (p) { p.hidden = true; });
    $$(".sheet-claim", form).forEach(function (x) { x.hidden = true; x.setAttribute("href", "/claim/"); });
    $$("[aria-invalid]", form).forEach(function (x) { x.removeAttribute("aria-invalid"); });
    $$("[data-invalid]", form).forEach(function (x) { x.removeAttribute("data-invalid"); });
  }
  function resetForm(form) {
    form.reset();
    form.classList.remove("is-sent");
    clearMarks(form);
    $$(".sheet-ok, .btn-done", form).forEach(function (x) { x.hidden = true; });
    var b = $(".btn-send", form);
    if (b) b.removeAttribute("aria-busy");
    var sel = $('select[name="lang"]', form);
    if (sel) { var codes = $$("option", sel).map(function (o) { return o.value; }).filter(Boolean), best = bestOf(codes); if (best) sel.value = best; }
  }
  function openSheet(id, kind) {
    var dlg = doc.getElementById(id);
    if (!dlg) return;
    var form = $("form", dlg);
    if (form && (form.classList.contains("is-sent") || !form.getAttribute("data-ready"))) { resetForm(form); form.setAttribute("data-ready", "1"); }
    if (form && kind) { var r = $('input[name="kind"][value="' + kind + '"]', form); if (r) r.checked = true; }
    dlg.plOpener = doc.activeElement;                     // each sheet its own: Add a game can open over the search's
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
    var first = form ? ($('input[name="url"]', form) || $('input[name="reason"]', form) || $(".find-q", form)) : $('[aria-current="page"]', dlg) || $("a[href]", dlg);   // the languages: the page's own
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
    if (id === "sheet-find") { if (first && first.select) first.select(); findOpen(); }
  }
  function closeSheet(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === "function" && dlg.open) dlg.close(); else dlg.removeAttribute("open");
  }
  function busy(form, on) { var b = $(".btn-send", form); if (b) { if (on) b.setAttribute("aria-busy", "true"); else b.removeAttribute("aria-busy"); } }
  function sent(form) {
    form.classList.add("is-sent");
    $$(".sheet-ok, .btn-done", form).forEach(function (x) { x.hidden = false; });
    var d = $(".btn-done", form);
    if (d) d.focus();
  }
  function post(path, body) {
    return window.fetch(path, { method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, e: r.status === 429 ? "busy" : "server" }; }); });
  }
  function invalid(el) { if (el) el.setAttribute("aria-invalid", "true"); }
  function sendAdd(form) {
    clearMarks(form);
    var urlIn = form.elements.namedItem("url"), raw = (urlIn.value || "").trim();
    if (raw && !/^[a-z][a-z0-9+.-]*:/i.test(raw) && /^[^\s/?#]+\.[^\s/?#]+/.test(raw)) raw = "https://" + raw;   // a bare "contexto.me" gets its https:// in front
    raw = raw.replace(/^http:\/\//i, "https://");
    urlIn.value = raw;
    var u = null;
    try { u = new URL(raw); } catch (e) { u = null; }
    var langEl = form.elements.namedItem("lang"), kindEl = $('input[name="kind"]:checked', form), email = form.elements.namedItem("email");
    var nameEl = form.elements.namedItem("name"), hpEl = form.elements.namedItem("pl_x9");   // the robots' field (its name no autofill knows)
    var first = null;
    if (!u || u.protocol !== "https:" || !/\./.test(u.hostname)) { showErr(form, "link"); invalid(urlIn); first = first || urlIn; }
    if (langEl && !langEl.value) { invalid(langEl); first = first || langEl; }
    if (!kindEl) { var ks = $(".kinds", form); if (ks) ks.setAttribute("data-invalid", ""); first = first || $('input[name="kind"]', form); }
    if (email && email.value.trim() && !email.checkValidity()) { invalid(email); first = first || email; }
    if (first) { first.focus(); return; }
    busy(form, true);
    post("/api/add", { url: raw, lang: langEl ? langEl.value : LANG, kind: kindEl.value, name: nameEl ? (nameEl.value || "").trim() : "",
      email: (email.value || "").trim(), hp: hpEl ? hpEl.value : "" })
      .then(function (j) {
        busy(form, false);
        if (j && j.ok) return sent(form);
        var e = j && j.e;
        if (e === "link") { showErr(form, "link"); invalid(urlIn); urlIn.focus(); }
        else if (e === "here") {                            // a listed game, not claimed: Claim beside "It's already here" (chat N)
          var cl = $(".sheet-claim", form);
          if (cl && j.game && GAME_ID.test(j.game.id || "")) { cl.setAttribute("href", "/claim/?g=" + encodeURIComponent(j.game.id)); cl.hidden = false; }
          showErr(form, "here"); urlIn.focus();
        }
        else if (e === "bad" && email.value.trim()) { invalid(email); email.focus(); }
        else if (e === "bad") { showErr(form, "link"); invalid(urlIn); urlIn.focus(); }
        else showErr(form, "busy");
      })
      .catch(function () { busy(form, false); showErr(form, "busy"); });
  }
  function sendReport(form) {
    clearMarks(form);
    var r = $('input[name="reason"]:checked', form);
    if (!r) { var box = $(".reasons", form); if (box) box.setAttribute("data-invalid", ""); var f = $('input[name="reason"]', form); if (f) f.focus(); return; }
    busy(form, true);
    post("/api/report", { game: form.getAttribute("data-game"), reason: r.value, browser: deviceId() })
      .then(function (j) {
        busy(form, false);
        if (j && (j.ok || j.e === "nogame")) return sent(form);
        showErr(form, "busy");
      })
      .catch(function () { busy(form, false); showErr(form, "busy"); });
  }

  /* ---- More on a kind's page: the rest of the kind, a page at a time ---- */
  function more(btn) {
    var kind = btn.getAttribute("data-more"), from = parseInt(btn.getAttribute("data-from"), 10) || 0, ul = $(".tiles-all");
    if (!ul || !window.fetch) return;
    btn.setAttribute("aria-busy", "true");
    window.fetch("/api/" + encodeURIComponent(LANG) + "/games?kind=" + encodeURIComponent(kind) + "&from=" + from + "&n=60", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        btn.removeAttribute("aria-busy");
        if (!j || !j.ok) return;
        var firstNew = null;
        (j.games || []).forEach(function (g) {
          if ($('li.tile[data-game="' + g.id + '"]', ul)) return;
          var li = build(g, false);
          if (li) { ul.appendChild(li); firstNew = firstNew || li; }
        });
        paintStars();
        paintTicks();
        if (j.next == null) btn.hidden = true; else btn.setAttribute("data-from", String(j.next));
        var a = firstNew && $(".tile-a", firstNew);
        if (a) { try { a.focus({ preventScroll: true }); } catch (e) { a.focus(); } }
      })
      .catch(function () { btn.removeAttribute("aria-busy"); });
  }

  /* ---- search (chat S, 24 Nov 2026; plan 2.17 item 5) ----
     The magnifier (#find-b, drawn by the Worker where the language has 40 games or more) opens #sheet-find: a field and the
     rows' own tiles, at most FIND_MAX, best match first (rankOf above), then in the order of the page's rows. The list comes
     once, when the sheet first opens (/api/<lang>/names, kept 5 minutes like the dice's). Nothing typed, nothing shown;
     nothing found: "Nothing here." and Add a game. A search that finds nothing, at FIND_MISS characters or more, is sent once
     per term and page view, as words only, when the player stops typing (FIND_WAIT), presses search or closes the sheet;
     never one that holds "@", "://" or 6 digits in a row (a person's address or number), which the Worker drops anyway.
     On a computer "/" opens it too, except while typing in a field. */
  var FIND_MAX = 24, FIND_MISS = 3, FIND_WAIT = 1500, KIND_OK = /^(words|numbers|maps|knowledge|music|screen|sport|other)$/;
  var findList = null, findAsk = null, findSent = {}, findTimer = 0, findLast = null;
  function ringOf(id) {                                     // a coin's ring colour from the game's id, as the Worker draws it (util.js ring)
    var h = 2166136261;
    for (var i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return "t" + (h % 12);
  }
  function findLoad() {
    if (findList || findAsk || !window.fetch) return;
    findAsk = window.fetch("/api/" + encodeURIComponent(LANG) + "/names", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        findAsk = null;
        if (!j || !j.ok || !Array.isArray(j.games)) return;
        var en = !!D.lgLang && D.lgLang !== LANG, list = [];
        j.games.forEach(function (x, i) {
          if (!Array.isArray(x) || !GAME_ID.test(x[0] || "") || typeof x[2] !== "string") return;
          var lg = SAFE.test(x[1] || ""), kind = KIND_OK.test(x[4] || "") ? x[4] : "other";
          if (!lg && !/^[a-z0-9-]{1,64}$/.test(x[1] || "")) return;
          list.push({ i: i, f: foldGame(x[2], x[3], W["cat." + kind], LANG), g: { id: x[0], slug: lg ? "" : x[1], url: lg ? x[1] : "", name: x[2], kind: kind,
            ring: ringOf(x[0]), logicers: lg, en: lg && en, pic: lg ? null : x[5], logo: lg ? x[5] : null } });
        });
        findList = list;
        findRun();
      })
      .catch(function () { findAsk = null; });
  }
  function findRun() {
    var dlg = $("#sheet-find");
    if (!dlg) return;
    var input = $(".find-q", dlg), ul = $(".find-tiles", dlg), nf = $(".find-nf", dlg);
    var raw = input ? input.value : "", q = fold(raw, LANG);
    if (q && findList && q === findLast) return;            // the same search (a space typed): nothing changes, its wait runs on
    window.clearTimeout(findTimer);
    if (!q || !findList) { clear(ul); nf.hidden = true; findLast = q && !findList ? null : ""; return; }
    findLast = q;
    var hits = [];
    findList.forEach(function (x) { var r = rankOf(x.f, q); if (r >= 0) hits.push({ r: r, i: x.i, g: x.g }); });
    hits.sort(function (a, b) { return a.r - b.r || a.i - b.i; });
    clear(ul);
    hits.slice(0, FIND_MAX).forEach(function (h) { var li = build(h.g, false); if (li) ul.appendChild(li); });
    nf.hidden = !!ul.children.length;
    if (!ul.children.length) findTimer = window.setTimeout(function () { findMiss(q, raw); }, FIND_WAIT);
    var m = readMine();
    paintStars(m);
    paintTicks(m);
  }
  function findMiss(q, raw) {                               // sent once per term and page view, as words only
    if (Array.from(q).length < FIND_MISS || findSent[q] || /@|:\/\//.test(String(raw).normalize("NFKC")) || /\d{6}/.test(q)) return;
    findSent[q] = 1;
    beacon("/api/miss", { lang: LANG, q: String(raw).trim().slice(0, 200) });
  }
  function findDone() {                                     // pressed search, or closed the sheet: a search that found nothing goes now
    var dlg = $("#sheet-find"), input = dlg && $(".find-q", dlg);
    window.clearTimeout(findTimer);
    if (!input || !findList) return;
    var q = fold(input.value, LANG);
    if (q && q === findLast && !$(".find-tiles", dlg).children.length) findMiss(q, input.value);
  }
  function findOpen() { findLast = null; findLoad(); findRun(); }
  /* the head with search: four 44 px buttons would push the page's name onto another line on a phone, so there the dice gives
     way (search takes its place). Measured, not guessed: it shows wherever it fits beside the name as it is, adding no line
     and breaking no word ("Portu-guês"). */
  function nameLines(h) {
    var r = doc.createRange(), t = {};
    r.selectNodeContents(h);
    Array.prototype.forEach.call(r.getClientRects(), function (x) { if (x.width > 1) t[Math.round(x.top)] = 1; });
    return Object.keys(t).length;
  }
  /* Chat Q3, 27 Nov 2026: and never a word of the name cut in two, with search or without. On a narrow phone "Play Azərbaycanca"
     (360 px), "Play ქართული" or "Play Українська" (320 px) cut the name inside its word: there the dice gives way where that mends
     it, and where even that is not enough, the name is drawn a step smaller (two steps at most). */
  function cutWord(h) {
    var w = doc.createTreeWalker(h, 4), n, m, re = /\S+/g;
    while ((n = w.nextNode())) {
      re.lastIndex = 0;
      while ((m = re.exec(n.textContent))) {
        var r = doc.createRange(), t = {}, k = 0;
        r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        Array.prototype.forEach.call(r.getClientRects(), function (x) { if (x.width > 1 && !t[Math.round(x.top)]) { t[Math.round(x.top)] = 1; k++; } });
        if (k > 1) return true;
      }
    }
    return false;
  }
  function fitDice() {
    var top = $(".top-lang"), h = top && $(".brand", top), a = top && $("#dice", top);
    if (!h) return;
    h.classList.remove("brand-fit", "brand-fit2");
    if (a && !a.hidden) {
      var find = !!$("#find-b", top), words = String(h.textContent || "").trim().split(/\s+/).length;
      a.classList.remove("dice-off");
      var on = nameLines(h), cut = cutWord(h);
      if (find || cut) {
        a.classList.add("dice-off");
        if (find && on <= nameLines(h) && on <= words && !cut) a.classList.remove("dice-off");   // never a line more, never a word broken in two
      }
    }
    if (cutWord(h)) { h.classList.add("brand-fit"); if (cutWord(h)) { h.classList.remove("brand-fit"); h.classList.add("brand-fit2"); } }
  }

  /* ---- My Logicers (chat M, 26 Nov 2026) ----
     The page data's "me" (pages.js meOf): the bridge's address on logicers.com, My Logicers' address in the page's language (or
     English) and its name there, and how Logicers writes a Logicer number in that language ("№{n}", "n.º {n}"…). The bridge is
     opened once a page view, after the page has settled, in a hidden frame; every message waits a few seconds at most, and a
     page whose bridge never answers works exactly as before. Nothing about the player goes anywhere but logicers.com, and Yours
     goes there only when the device keeps a My Logicers code (the bridge refuses it otherwise). */
  var ME = D.me && typeof D.me === "object" && typeof D.me.bridge === "string" ? D.me : null;
  var meBr = null, meCode = false, meT = 0, meAsk = 0;
  function bridge(op, data) {
    if (!ME || !window.postMessage || !IN_LANG) return Promise.resolve(null);
    if (!meBr) {
      var origin = "";
      try { origin = new URL(ME.bridge).origin; } catch (e) { origin = ""; }
      if (!/^https:\/\/|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return Promise.resolve(null);
      meBr = { origin: origin, wait: {} };
      meBr.ready = new Promise(function (resolve) { meBr.go = resolve; window.setTimeout(function () { resolve(false); }, 8000); });
      window.addEventListener("message", function (e) {
        var x = e.data;
        if (!meBr || e.origin !== meBr.origin || !x || typeof x !== "object" || x.lg !== "play" || e.source !== (meBr.frame && meBr.frame.contentWindow)) return;
        if (x.op === "ready") { meBr.go(true); return; }
        var w = meBr.wait[x.id];
        if (w) { delete meBr.wait[x.id]; w(x); }
      });
      var f = doc.createElement("iframe");
      f.className = "me-frame"; f.src = ME.bridge; f.title = "My Logicers"; f.tabIndex = -1; f.hidden = true;
      f.setAttribute("aria-hidden", "true");
      doc.body.appendChild(f);
      meBr.frame = f;
    }
    var b = meBr;
    return b.ready.then(function (ok) {
      if (!ok || !b.frame.contentWindow) return null;
      return new Promise(function (resolve) {
        var id = "m" + (++meAsk) + "-" + Date.now().toString(36);
        b.wait[id] = resolve;
        window.setTimeout(function () { if (b.wait[id]) { delete b.wait[id]; resolve(null); } }, op === "hello" ? 9000 : 6000);
        b.frame.contentWindow.postMessage({ lg: "play", op: op, id: id, data: data || null }, b.origin);
      });
    });
  }
  /* Yours as it goes to My Logicers (pmClean keeps the rest out: the week's games stay on this device, for its vote) */
  function meRec(m) { return pmClean({ star: m.star, t: m.t, g: m.g, played: m.played, streak: m.streak, lang: get("portal.lang") || "" }); }
  /* what came from My Logicers, merged into Yours here; the page is drawn again where it changed. push: send the merged copy back
     when it holds something the other did not */
  function meTake(remote, push) {
    var m = readMine(), was = JSON.stringify(meRec(m)), merged = pmMerge(remote, meRec(m));
    if (JSON.stringify(merged) !== was) {
      var ids = JSON.stringify(yoursIds(m));
      m.star = merged.star.slice(); m.t = merged.t; m.g = merged.g; m.played = merged.played; m.streak = merged.streak;
      saveMine(m);
      paintStars(m); paintTicks(m); paintVote(m);
      if (JSON.stringify(yoursIds(m)) !== ids) renderMine();
    }
    if (push && JSON.stringify(merged) !== JSON.stringify(pmClean(remote))) mePut();
  }
  function mePut() {
    return bridge("put", { play: meRec(readMine()) }).then(function (r) { if (r && r.ok && r.kept && r.play) meTake(r.play, false); });
  }
  /* a change here (a game saved or unsaved, a game played) goes to My Logicers a moment later, on a device that keeps a code */
  function mePush() {
    if (!meCode) return;
    window.clearTimeout(meT);
    meT = window.setTimeout(mePut, 300);
  }
  /* the names of the saved games as the API gives them now (a game's name can change), for My Logicers' list */
  function meNames(list) {
    var m = readMine(), ch = false;
    list.forEach(function (g) {
      if (!g || m.star.indexOf(g.id) < 0 || typeof g.name !== "string") return;
      var v = g.logicers ? [LANG, "", g.name, SAFE.test(g.url || "") ? g.url : ""] : [LANG, g.slug || "", g.name, ""];
      if (!v[1] && !v[3]) return;
      if (JSON.stringify(m.g[g.id]) !== JSON.stringify(v)) { m.g[g.id] = v; ch = true; }
    });
    if (ch) { saveMine(m); mePush(); }
  }
  /* a game saved here: its language, its slug and its name as the page shows them (a Logicers game: its own address) */
  function metaOf(btn) {
    var li = closest(btn, "li.tile"), art = closest(btn, "article.game");
    var nm = li ? $(".tile-name", li) : art ? $(".game-name", art) : null, name = nm ? String(nm.textContent || "").trim() : "";
    if (!name) return null;
    if (art) { var g = /^\/([a-z]{2,3}(?:-[a-z]{4})?)\/g\/([a-z0-9-]{1,64})\/$/.exec(window.location.pathname); return g ? [g[1], g[2], name, ""] : null; }
    var href = nm.getAttribute("href") || "", p = /^\/([a-z]{2,3}(?:-[a-z]{4})?)\/g\/([a-z0-9-]{1,64})\/$/.exec(href);
    if (p) return [p[1], p[2], name, ""];
    return li.classList.contains("tile-lg") && SAFE.test(href) ? [LANG, "", name, href] : null;
  }
  /* the mark: Logicers' three dots, and the Logicer number of this device when it has one (portal.me, as the bridge last said) */
  function meNum(n) {
    if (typeof n === "number" && n >= 1 && n <= 1e9 && Math.floor(n) === n) put("portal.me", String(n));
    else if (n === null) { try { window.localStorage.removeItem("portal.me"); } catch (e) { /* nothing kept */ } }
    paintMark();
  }
  function paintMark() {
    var a = $("#me-mark"), t = a && $(".me-mark-n", a);
    if (!a || !t || !ME) return;
    var n = +(get("portal.me") || 0), txt = n >= 1 ? String(ME.nf || "№{n}").replace("{n}", fmt(n)) : "", label = ME.name + (txt ? ", " + txt : "");
    if (t.textContent !== txt) t.textContent = txt;
    t.hidden = !txt;
    a.setAttribute("aria-label", label);
    a.setAttribute("title", label);
    fitMark();
  }
  /* the number shows where it fits beside Yours, the flame and the run without a line more; else the dots alone (the number stays
     in the mark's name); and where even the dots would push Yours onto another line or cut its word, the mark gives way, as the
     dice gives way to search: the row is never fuller than it would be without the mark */
  function fitMark() {
    var a = $("#me-mark"), t = a && $(".me-mark-n", a), top = closest(a, ".row-top"), h = top && $(".row-h", top);
    if (!a || !t || !top || !h) return;
    a.classList.remove("me-mark-tight", "me-mark-off");
    if (top.offsetParent === null) return;
    var size = function () { return [nameLines(h), h.scrollWidth > h.clientWidth + 1 ? 1 : 0, top.scrollWidth > top.clientWidth + 1 ? 1 : 0]; };
    a.classList.add("me-mark-off");
    var base = size();
    a.classList.remove("me-mark-off");
    var worse = function () { var x = size(); return x[0] > base[0] || x[1] > base[1] || x[2] > base[2]; };
    if (!worse()) return;
    if (!t.hidden) { a.classList.add("me-mark-tight"); if (!worse()) return; }
    a.classList.add("me-mark-off");
  }
  function meHello() {
    bridge("hello").then(function (r) {
      if (!r || !r.ok) return;
      meNum(typeof r.n === "number" ? r.n : null);
      meCode = r.code === true;
      if (meCode) meTake(r.play || null, true);
    });
  }
  /* after the page has settled: its load, a moment, and the browser's next quiet time */
  function meStart() {
    if (!ME || !IN_LANG) return;
    var go = function () {
      window.setTimeout(function () {
        if (window.requestIdleCallback) window.requestIdleCallback(meHello, { timeout: 2000 }); else meHello();
      }, 1200);
    };
    if (doc.readyState === "complete") go(); else window.addEventListener("load", go);
  }

  /* ---- one listener for every tap ---- */
  doc.addEventListener("click", function (e) {
    var t = e.target;
    var star = closest(t, "[data-star]");
    if (star) { e.preventDefault(); toggleStar(star); return; }
    var vt = closest(t, "[data-vote]");
    if (vt) { e.preventDefault(); sendVote(vt); return; }
    var hit = closest(t, "[data-hit]");
    if (hit && !hit.getAttribute("href")) { e.preventDefault(); return; }   // the dice before its list has come
    if (hit) { played(hit); return; }                       // the link opens the game as it is
    var open = closest(t, "[data-open]");
    if (open) { e.preventDefault(); openSheet(open.getAttribute("data-open"), open.getAttribute("data-kind")); return; }
    var x = closest(t, "[data-close]");
    if (x) { e.preventDefault(); closeSheet(closest(x, "dialog")); return; }
    var m = closest(t, "[data-more]");
    if (m) { e.preventDefault(); more(m); return; }
    if (t && t.tagName === "DIALOG" && t.classList.contains("sheet")) {   // a tap on the shade around the sheet
      var r = t.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeSheet(t);
    }
  });
  doc.addEventListener("auxclick", function (e) { if (e.button === 1) { var hit = closest(e.target, "[data-hit]"); if (hit) played(hit); } });
  doc.addEventListener("submit", function (e) {
    var f = e.target;
    if (!f || !f.classList || !f.classList.contains("sheet-form")) return;
    e.preventDefault();
    if (!window.fetch) return;
    if (f.getAttribute("data-api") === "add") sendAdd(f); else if (f.getAttribute("data-api") === "report") sendReport(f);
    else if (f.classList.contains("find-form")) { findRun(); findDone(); var q = $(".find-q", f); if (q && window.matchMedia && window.matchMedia("(hover: none)").matches) q.blur(); }   // a phone's keyboard goes, the results stay
  });
  doc.addEventListener("change", function (e) {             // a choice made clears its own mark
    var t = e.target, f = closest(t, ".sheet-form");
    if (!f) return;
    if (t.name === "kind") { var k = $(".kinds", f); if (k) k.removeAttribute("data-invalid"); }
    if (t.name === "reason") { var r = $(".reasons", f); if (r) r.removeAttribute("data-invalid"); }
    if (t.getAttribute("aria-invalid")) t.removeAttribute("aria-invalid");
  });
  doc.addEventListener("input", function (e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute("aria-invalid")) t.removeAttribute("aria-invalid");
    if (t && t.classList && t.classList.contains("find-q")) findRun();
  });
  $$("dialog.sheet").forEach(function (dlg) {
    dlg.addEventListener("close", function () {
      if (dlg.id === "sheet-find") findDone();
      var o = dlg.plOpener;
      if (o && doc.contains(o) && o.focus) { try { o.focus({ preventScroll: true }); } catch (e) { o.focus(); } }
      dlg.plOpener = null;
    });
  });
  /* "/" opens the search on a computer, except while typing in a field or with a sheet open */
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && e.target && e.target.classList && e.target.classList.contains("find-q")) {   // a search field would only clear itself first
      e.preventDefault(); closeSheet(closest(e.target, "dialog")); return;
    }
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    var b = $("#find-b"), t = e.target;
    if (!b || $("dialog[open]") || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || "")))) return;
    e.preventDefault();
    try { b.focus({ preventScroll: true }); } catch (x) { b.focus(); }
    openSheet("sheet-find");
  });

  /* ---- start ---- */
  if (IN_LANG) {
    put("portal.lang", LANG);
    beacon("/api/view", { lang: LANG, id: deviceId() });
  }
  if (PAGE === "wall" || PAGE === "nf") wall();
  $$(".btn-more[data-more]").forEach(function (b) { b.hidden = false; });
  var mine = readMine();
  paintStars(mine);
  paintTicks(mine);
  paintVote(mine);
  paintEdit();
  paintMark();
  renderMine();
  counts();
  diceInit();
  meStart();
  if ($("#me-mark")) {                                      // the mark's number fits beside Yours, or keeps to its name (chat M)
    var markAt = 0;
    window.addEventListener("resize", function () { if (!markAt) markAt = window.requestAnimationFrame(function () { markAt = 0; fitMark(); }); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fitMark);
    /* and again at once when a word of the row changes (the flame's number, the run's, a longer name): never a moment with Yours cut */
    if (window.MutationObserver) new MutationObserver(fitMark).observe(closest($("#me-mark"), ".row-top"), { subtree: true, childList: true, characterData: true });
  }
  if ($(".top-lang .brand")) {                              // the head: the dice fits beside the name, or gives way (search; a cut word)
    var fitAt = 0;
    window.addEventListener("resize", function () { if (!fitAt) fitAt = window.requestAnimationFrame(function () { fitAt = 0; fitDice(); }); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fitDice);
  }
  doc.addEventListener("visibilitychange", function () {
    if (doc.visibilityState !== "visible") return;
    var m = readMine();
    paintStars(m);
    paintTicks(m);
    paintVote(m);
    if (diceList && Date.now() - diceAt > 600000) { diceAt = Date.now(); diceList = null; diceInit(); } else pickDice();
    if (Date.now() - lastCounts > 30000 || hitAt > lastCounts) { counts(); renderMine(); }
  });
})();
