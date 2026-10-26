/* Logicers in four languages (23 Oct 2026, Khayyam): English, Italian, Turkish and Spanish.
   This file is the site's language layer. It loads first on every page, after the page's dictionary
   (assets/lang/<code>.js, built from the string docs by claude/logicers-data/scripts/build_lang.py), and it does
   four things:
     1. T(key, vars): every word a player reads in a script comes from the dictionary, never from the script.
     2. The pick. The first time a phone reaches any page a sheet rises from the bottom and asks the language
        (flag and word). The pick is remembered under the find-outs' own key, lg.findout.lang, so one pick serves
        the whole site; a remembered pick opens every page in that language (location.replace before anything is
        drawn). A chip in the header shows the language and opens the same sheet for a change.
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
               ["tr", "Türkçe", "🇹🇷", "tr-TR"], ["es", "Español", "🇪🇸", "es-ES"]];
  var KEY = "lg.findout.lang";             // the find-outs' key (find-out/find-out.js): one pick per phone
  var FINDOUT = { it: "it/", tr: "tr/", es: "es/" };  // the find-outs exist in these (Spanish since 26 Oct 2026)
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
  /* 1st, 2nd, 3rd / 1º, 2º / 1., 2. / 1.º, 2.º */
  function nth(n) {
    n = Number(n);
    if (lang === "en") { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }
    if (lang === "it") return n + "º";
    if (lang === "es") return n + ".º";
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
  var dlg = null;
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
      box.appendChild(el("p", "quiet lg-sub", "Language · Lingua · Dil · Idioma"));
      var list = el("div", "lg-list");
      LANGS.forEach(function (l) {
        var a = el("a", "lg-pick" + (l[0] === lang ? " on" : ""));
        a.lang = l[0]; a.hreflang = l[0];
        a.href = only ? "#" : hrefIn(l[0]);
        a.appendChild(el("span", "lg-flag", l[2]));
        a.appendChild(el("b", "", l[1]));
        a.addEventListener("click", function (e) {
          remember(l[0]);
          if (l[0] === lang || only) { e.preventDefault(); dlg.close(); if (only) note(); }
        });
        list.appendChild(a);
      });
      box.appendChild(list);
      dlg.appendChild(box);
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
      document.body.appendChild(dlg);
    }
    if (open) { try { if (dlg.showModal && !dlg.open) dlg.showModal(); else dlg.setAttribute("open", ""); } catch (e) { dlg.setAttribute("open", ""); } }
    return dlg;
  }
  function chip() {
    var c = document.getElementById("lg-chip");
    if (!c) return;
    var pick = known(saved()) || me;
    c.textContent = "";
    c.appendChild(el("span", "lg-flag", pick[2]));
    c.appendChild(document.createTextNode(" " + pick[0].toUpperCase()));
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
