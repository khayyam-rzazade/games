/* Logicers in six languages (23 Oct 2026, Khayyam): English, Italian, Turkish, Spanish, Portuguese (Brazil, 28 Oct) and French (28 Oct).
   This file is the site's language layer. It loads first on every page, after the page's dictionary
   (assets/lang/<code>.js, built from the string docs by claude/logicers-data/scripts/build_lang.py), and it does
   four things:
     1. T(key, vars): every word a player reads in a script comes from the dictionary, never from the script.
     2. The pick. The first time a phone reaches any page a sheet rises from the bottom and asks the language
        (flag and word). The pick is remembered under the find-outs' own key, lg.findout.lang, so one pick serves
        the whole site; a remembered pick opens every page in that language (location.replace before anything is
        drawn). A chip in the header shows the language and opens the same sheet for a change. On a first visit the
        sheet puts the phone's own language (navigator.language) first and marked, if it is one of the four; the
        player still chooses. The home pages also carry a small line under the subtitle (#lg-line: the six names,
        each in its own tongue); its links are plain addresses (/, /it/, /tr/, /es/, /pt/, /fr/) that work without a script, and
        here they pick exactly as the sheet does (pick()). Every real change of language is counted once, as the
        event lang/<code> through the frame's own TurnsOut.count (not when the player taps the language already
        remembered, not on the automatic redirect).
     3. The pages that exist in one language only (the pass-the-phone games, Who Was Closer, the team page, the
        live games) say so in one quiet line, in the phone's language, and are never redirected.
     4. Numbers, dates and ordinals in the language's own way (LG.num, LG.date, LG.nth), country names from the
        browser's own list in the language, and the day's translated puzzles (LG.puzzle).
   The page says where it is on <html>: lang, data-lg-path (its path from the site root, without the language
   folder: "", "room/", "100-of-us/"), data-lg-root (from this page to the site root) and, on an English-only page,
   data-lg-only. Nothing here can break a page: a missing dictionary gives the key's English from the English file,
   and a missing storage gives English. */
(function () {
  "use strict";
  var LANGS = [["en", "English", "🇬🇧", "en-GB"], ["it", "Italiano", "🇮🇹", "it-IT"],
               ["tr", "Türkçe", "🇹🇷", "tr-TR"], ["es", "Español", "🇪🇸", "es-ES"],
               ["pt", "Português", "🇧🇷", "pt-BR"], ["fr", "Français", "🇫🇷", "fr-FR"]];
  var KEY = "lg.findout.lang";             // the find-outs' key (find-out/find-out.js): one pick per phone
  var FINDOUT = { it: "it/", tr: "tr/", es: "es/", pt: "pt/", fr: "fr/" };  // the find-outs exist in these (Spanish since 26 Oct, Portuguese and French since 28 Oct 2026)
  var html = document.documentElement;
  function known(c) { for (var i = 0; i < LANGS.length; i++) if (LANGS[i][0] === c) return LANGS[i]; return null; }
  var me = known(String(html.lang || "en").slice(0, 2).toLowerCase()) || LANGS[0];
  var lang = me[0], locale = me[3];
  var path = html.getAttribute("data-lg-path") || "";          // this page, from the site root, without the language
  var root = html.getAttribute("data-lg-root") || "";          // from this page to the site root
  var only = html.hasAttribute("data-lg-only");                // English only: no redirect, no sheet, one quiet line
  var D = window.LG_DICT || {};
  var ONLY = window.LG_ONLY || {};                             // the quiet line in every language, for the English-only pages

  function saved() { try { var v = window.localStorage.getItem(KEY); return known(v) ? v : null; } catch (e) { return null; } }
  function remember(c) { try { window.localStorage.setItem(KEY, c); } catch (e) { /* no storage: the page still works */ } }

  /* the same page in another language: / <-> /it/ , /room/ <-> /it/room/ (the "?" and "#" parts kept) */
  function hrefIn(c) {
    return root + (c === "en" ? "" : c + "/") + path + window.location.search + window.location.hash;
  }
  /* a page of the site, from this page, in this language: LG.href("room/"), LG.href("find-out/") */
  function href(p) {
    p = String(p || "");
    if (/^find-out\//.test(p)) return root + "find-out/" + (FINDOUT[lang] || "") + p.slice(9);
    if (p === "" || /^(room|world|100-of-us|your-call|long-lost-cousin|the-club|years-apart|who-gets-what|every-beat|out-of-24|same-energy)\//.test(p)) {
      return root + (lang === "en" ? "" : lang + "/") + p;
    }
    return root + p;                                           // a page that exists in English only
  }

  /* ---- the words ---- */
  function fill(s, vars) {
    if (!vars) return s;
    return String(s).replace(/\{([a-z0-9_]+)\}/gi, function (m, k) { return Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m; });
  }
  function T(key, vars) {
    var s = D[key];
    if (typeof s !== "string") {
      if (window.console && !T.quiet) window.console.warn("Logicers: no words for " + key);
      return "";
    }
    return fill(s, vars);
  }
  /* one or many: key_1 for exactly one, key_n otherwise (the same words in Turkish) */
  T.n = function (n, key, vars) {
    var v = {};
    if (vars) for (var k in vars) if (Object.prototype.hasOwnProperty.call(vars, k)) v[k] = vars[k];
    if (v.n === undefined) v.n = num(n);
    return T(n === 1 && typeof D[key + "_1"] === "string" ? key + "_1" : key + "_n", v);
  };
  T.has = function (key) { return typeof D[key] === "string"; };
  function num(n) {
    try { return Number(n).toLocaleString(locale); } catch (e) { return String(n); }
  }
  function date(d, opts) {
    try { return (d || new Date()).toLocaleDateString(locale, opts || { day: "numeric", month: "long" }); } catch (e) { return ""; }
  }
  /* 1st, 2nd, 3rd / 1º, 2º / 1., 2. / 1.º, 2.º / 1º, 2º (Portuguese) / 1er, 2e (French) */
  function nth(n) {
    n = Number(n);
    if (lang === "en") { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
    if (lang === "it" || lang === "pt") return n + "º";
    if (lang === "es") return n + ".º";
    if (lang === "fr") return n + (n === 1 ? "er" : "e");
    return n + ".";
  }
  var names = null;
  try { names = new window.Intl.DisplayNames([lang], { type: "region" }); } catch (e) { names = null; }
  function country(c) {
    if (!/^[A-Z]{2}$/.test(String(c))) return "";
    var n = "";
    try { n = names ? names.of(c) : ""; } catch (e) { n = ""; }
    return n && n !== c ? n : c;
  }

  /* ---- the day's puzzles in the language ----
     A daily game's page loads its puzzles.js (English) and then, on a language page, <game>/puzzles.<code>.js: the
     translated fields of the first days, by day number (window.LG_PUZZLES[id][day] = { field: words }). LG.puzzle
     lays them over today's puzzle and says whether it did; a day not yet translated keeps its English and the page
     shows one quiet line (LG.puzzleNote). */
  function puzzle(id, day, p) {
    var all = window.LG_PUZZLES, mine = all && all[id] && all[id][day];
    if (!p || !mine || typeof mine !== "object") return false;
    for (var k in mine) if (Object.prototype.hasOwnProperty.call(mine, k)) p[k] = mine[k];
    return true;
  }
  function puzzleHas(id, day) { var all = window.LG_PUZZLES; return !!(all && all[id] && all[id][day]); }
  /* every translated day at once: get(day) gives the puzzle object of that day (so an album or a practice list
     shows the language's words for the translated days too) */
  function puzzleAll(id, get) {
    var all = window.LG_PUZZLES, mine = all && all[id];
    if (!mine) return;
    for (var d in mine) if (Object.prototype.hasOwnProperty.call(mine, d)) { try { puzzle(id, d, get(Number(d))); } catch (e) { /* that day's puzzle is not there */ } }
  }
  function puzzleNote(done) {
    var old = document.getElementById("lg-note");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (lang === "en" || done) return;
    var p = document.createElement("p");
    p.className = "lg-note"; p.id = "lg-note";
    p.textContent = T("lang.puzzle_english");
    var meta = document.querySelector("main .meta");
    if (meta && meta.parentNode) meta.parentNode.insertBefore(p, meta.nextSibling);
  }

  /* ---- the sheet and the chip ---- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  /* the phone's own language, if it is one of the six ("it-IT" -> Italiano, "pt-BR" -> Português); null for any other */
  function phone() {
    var n = "";
    try { n = String(window.navigator.language || window.navigator.userLanguage || ""); } catch (e) { n = ""; }
    return known(n.slice(0, 2).toLowerCase());
  }
  /* counting a pick: lang/en, lang/it, lang/tr, lang/es, lang/pt, lang/fr, through the frame's own TurnsOut.count */
  function countPick(code) {
    try { if (window.TurnsOut && typeof window.TurnsOut.count === "function") window.TurnsOut.count("lang/" + code); } catch (e) { /* counting never breaks a page */ }
  }
  /* A player's pick, from the sheet or from the home's line (26 Oct 2026): remembered, counted once if it is a real
     change (a different language from the one remembered; on a first visit nothing is remembered yet, so the first
     pick counts; tapping the language already remembered does not), then the page in that language. The automatic
     redirect of a remembered pick never comes through here, so it is never counted. A short moment passes before
     the page leaves, so the counter's small request is on its way; a click with a modifier key is left to the
     browser (a new tab). "after" runs when the pick keeps the player on this page. */
  function pick(code, e, a, after) {
    var before = saved(), changed = code !== before;
    remember(code);
    if (changed) countPick(code);
    if (code === lang || only) { e.preventDefault(); if (after) after(); return; }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.button || 0) > 0) return;
    e.preventDefault();
    var to = a.href;
    window.setTimeout(function () { window.location.assign(to); }, changed ? 200 : 0);
  }
  var dlg = null, list = null;
  /* the sheet's six rows. On a first visit (nothing remembered) the phone's own language comes first and is the
     marked one, if it is one of the six; otherwise the usual order, this page's language marked */
  function fillList() {
    var lead = saved() ? null : phone();
    var order = lead ? [lead].concat(LANGS.filter(function (l) { return l !== lead; })) : LANGS;
    var on = lead ? lead[0] : lang;
    list.textContent = "";
    order.forEach(function (l) {
      var a = el("a", "lg-pick" + (l[0] === on ? " on" : ""));
      a.lang = l[0]; a.hreflang = l[0];
      a.href = only ? "#" : hrefIn(l[0]);
      a.appendChild(el("span", "lg-flag", l[2]));
      a.appendChild(el("b", "", l[1]));
      a.addEventListener("click", function (e) {
        pick(l[0], e, a, function () { dlg.close(); if (only) note(); });
      });
      list.appendChild(a);
    });
  }
  function sheet(open) {
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "lg-sheet";
      dlg.className = "lg-sheet";
      dlg.setAttribute("aria-labelledby", "lg-sheet-h");
      var box = el("div", "sheet lg-box");
      var x = el("button", "chip round close", "×"); x.type = "button"; x.setAttribute("aria-label", T("lang.close"));
      x.addEventListener("click", function () { dlg.close(); });
      box.appendChild(x);
      box.appendChild(el("h2", "lg-h", T("lang.title")));
      box.appendChild(el("p", "quiet lg-sub", "Language · Lingua · Dil · Idioma · Língua · Langue"));
      list = el("div", "lg-list");
      box.appendChild(list);
      dlg.appendChild(box);
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    if (!dlg.open) fillList();
    if (open) { try { if (dlg.showModal && !dlg.open) dlg.showModal(); else dlg.setAttribute("open", ""); } catch (e) { dlg.setAttribute("open", ""); } }
    return dlg;
  }
  /* the home's line under the subtitle: the page's own language is marked (aria-current; the bold itself is CSS on
     <html lang>, so it shows without a script too), every name picks like the sheet's rows */
  function line() {
    var box = document.getElementById("lg-line");
    if (!box) return;
    var links = box.querySelectorAll("a[hreflang]");
    for (var i = 0; i < links.length; i++) (function (a) {
      var code = a.getAttribute("hreflang");
      if (!known(code)) return;
      if (code === lang) a.setAttribute("aria-current", "true");
      if (!only) a.href = hrefIn(code);          // the sheet's own address: this page's path, ?query and #hash kept (without a script the plain / /it/ … /fr/ stay)
      a.addEventListener("click", function (e) { pick(code, e, a); });
    })(links[i]);
  }
  function chip() {
    var c = document.getElementById("lg-chip");
    if (!c) return;
    var pick = known(saved()) || me;
    c.textContent = "";
    c.appendChild(el("span", "lg-flag", pick[2]));
    c.appendChild(el("span", "lg-code", " " + pick[0].toUpperCase()));   // the letters; a narrow phone shows the flag alone (CSS)
    c.setAttribute("aria-label", T("lang.change") + ": " + pick[1]);
    c.hidden = false;
    c.addEventListener("click", function () { sheet(true); });
  }
  /* the quiet line of an English-only page, in the phone's language */
  function note() {
    var p = document.getElementById("lg-only"), pick = saved() || "en";
    if (!p) return;
    p.textContent = pick === "en" ? "" : (ONLY[pick] || "");
    p.hidden = !p.textContent;
  }

  function start() {
    if (only) { note(); return; }
    chip();
    line();
    if (!saved()) sheet(true);
  }

  window.LG = { lang: lang, locale: locale, base: lang === "en" ? "" : lang + "/", root: root, path: path, LANGS: LANGS,
                t: T, num: num, date: date, nth: nth, country: country, href: href, hrefIn: hrefIn, saved: saved, remember: remember,
                sheet: sheet, puzzle: puzzle, puzzleAll: puzzleAll, puzzleHas: puzzleHas, puzzleNote: puzzleNote, findout: FINDOUT[lang] || "", KEY: KEY };
  window.T = T;

  /* the remembered pick, before anything is drawn */
  var want = saved();
  if (!only && want && want !== lang) { window.location.replace(hrefIn(want)); return; }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
