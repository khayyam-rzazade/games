/* Logicers, the cards: when a card is open, and the words that point to it (me/year/open.js, 7 Nov 2026).
   A classic script with no imports, so the home page, My Logicers (me/) and, later, the push system can all load it with one
   <script> tag, and so a test can require() it. It puts one object on the page: window.LogicersYear.

   The rules (claude/me-plan.md section 0):
     - "Your 2026" opens on 1 December 2026 and stays visible through 31 January 2027. The same for every year after.
     - "Your {month}" opens on the 1st of every month from 1 January 2027 and is the month before: the first is "Your
       December" (visible all January). It stays visible for the whole month.
     - In January and in December both can be open at once (January: the year just ended and the month before). The year
       comes first.
     - The days are the phone's own calendar days, as the games count them.
     - A card is offered only to a phone that played at least once in its period (when the stats say so; with no stats
       it is offered).
   What it gives:
     cardsOpen(now, stats)   every open card, the year first            -> [card]
     cardOpen(stats, now)    the first one, or null (the hook plan 0 asks for: me/ and the home page call this)
     card = { kind: "year"|"month", id: "y2026"|"m2026-12", y, ym, query: "?y=2026"|"?m=2026-12" }
     url(card, root)         the address from a page: root + "me/year/" + query   (root "" on the home page, "../" in me/)
     label(card, lang)       "Your 2026 →" in the player's language (the link on the home page and in me/)
     push(card, lang)        the one line the push system can use later: "Your 2026 is here."
     parse(search)           "?y=2026" or "?m=2026-11" -> { kind, y|ym } or null
     period(card)            the object stats() takes: { year: 2026 } or { month: "2026-11" }
     range(card)             { from: "2026-01-01", to: "2026-12-31" } (ISO days)
     monthName(ym, lang)     "November", "novembre", "Kasım" ... in the language's own way
   Words here: the two link lines and the two push lines, six languages, mirrored in lang/<code>.json (keys link_year,
   link_month, push_year, push_month); the test compares the two. Nothing else in this file is a word. */
(function (root, make) {
  var api = make();
  if (typeof module === "object" && module && module.exports) module.exports = api;
  if (root) root.LogicersYear = api;
})(typeof self !== "undefined" ? self : (typeof globalThis !== "undefined" ? globalThis : this), function () {
  "use strict";

  var FIRST_YEAR = 2026;                       // the site began on 3 October 2026: the first year card is 2026
  var LOCALE = { en: "en-GB", it: "it-IT", es: "es-ES", pt: "pt-BR", fr: "fr-FR", tr: "tr-TR" };
  var LANGS = ["en", "it", "es", "pt", "fr", "tr"];

  /* the language's own words. {x} is "2026" or the month's name. Informal "you" (tu, tú, você, tu, sen); Turkish says
     "your summary": "2026 özetin", because a possessive on a bare year or a month name needs a suffix that changes with the word. */
  var WORDS = {
    en: { link_year: "Your {x} →", link_month: "Your {x} →", push_year: "Your {x} is here.", push_month: "Your {x} is here." },
    it: { link_year: "Il tuo {x} →", link_month: "Il tuo {x} →", push_year: "Il tuo {x} è qui.", push_month: "Il tuo {x} è qui." },
    es: { link_year: "Tu {x} →", link_month: "Tu {x} →", push_year: "Tu {x} ya está aquí.", push_month: "Tu {x} ya está aquí." },
    pt: { link_year: "Seu {x} →", link_month: "Seu {x} →", push_year: "Seu {x} chegou.", push_month: "Seu {x} chegou." },
    fr: { link_year: "Ton {x} →", link_month: "Ton {x} →", push_year: "Ton {x} est là.", push_month: "Ton {x} est là." },
    tr: { link_year: "{x} özetin →", link_month: "{x} özetin →", push_year: "{x} özetin hazır.", push_month: "{x} özetin hazır." }
  };

  function two(n) { return (n < 10 ? "0" : "") + n; }
  function iso(y, m, d) { return y + "-" + two(m) + "-" + two(d); }
  function daysIn(y, m) { return new Date(Date.UTC(y, m, 0)).getUTCDate(); }
  /* whole days from ISO day a to ISO day b (b - a), in UTC so no clock change can bend it */
  function diff(a, b) {
    var p = String(a).split("-"), q = String(b).split("-");
    return Math.round((Date.UTC(+q[0], +q[1] - 1, +q[2]) - Date.UTC(+p[0], +p[1] - 1, +p[2])) / 86400000);
  }
  function plus(a, n) {
    var p = String(a).split("-"), t = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]) + n * 86400000);
    return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
  }
  function lang(l) { return LANGS.indexOf(l) >= 0 ? l : "en"; }

  function yearCard(y) { return { kind: "year", id: "y" + y, y: y, ym: null, query: "?y=" + y }; }
  function monthCard(y, m) { var ym = y + "-" + two(m); return { kind: "month", id: "m" + ym, y: y, ym: ym, query: "?m=" + ym }; }

  function period(card) { return card.kind === "year" ? { year: card.y } : { month: card.ym }; }
  function range(card) {
    if (card.kind === "year") return { from: iso(card.y, 1, 1), to: iso(card.y, 12, 31) };
    var p = card.ym.split("-"), y = +p[0], m = +p[1];
    return { from: iso(y, m, 1), to: iso(y, m, daysIn(y, m)) };
  }

  /* "?y=2026" -> year card; "?m=2026-11" -> month card; anything else (or a year or month the site never had) -> null */
  function parse(search) {
    var q = String(search || "").replace(/^\?/, ""), y = null, m = null;
    q.split("&").forEach(function (kv) {
      var i = kv.indexOf("="), k = i < 0 ? kv : kv.slice(0, i), v = "";
      try { v = i < 0 ? "" : decodeURIComponent(kv.slice(i + 1)); } catch (e) { v = ""; }   // a broken %-escape is an empty value, not a blank page
      if (k === "y" && /^\d{4}$/.test(v)) y = +v;
      if (k === "m" && /^\d{4}-(0[1-9]|1[0-2])$/.test(v)) m = v;
    });
    if (y !== null && y >= FIRST_YEAR && y <= 2999) return yearCard(y);
    if (m !== null) {
      var p = m.split("-"), yy = +p[0], mm = +p[1];
      if (yy > FIRST_YEAR || (yy === FIRST_YEAR && mm >= 10)) return monthCard(yy, mm);       // the site's first month is October 2026
    }
    return null;
  }

  /* did the stats' calendar (every day of the record, "1" played) hold a played day inside the card's period?
     No calendar, or one this cannot read: yes (the card is offered; the card itself says if it is empty). */
  function playedIn(stats, card) {
    var cal = stats && stats.calendar;
    if (!cal || typeof cal.d !== "string" || typeof cal.from !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(cal.from)) return true;
    var r = range(card), i0 = Math.max(0, diff(cal.from, r.from)), i1 = Math.min(cal.d.length - 1, diff(cal.from, r.to));
    for (var i = i0; i <= i1; i++) if (cal.d.charAt(i) !== "0") return true;
    return false;
  }

  function cardsOpen(now, stats) {
    now = now || new Date();
    var y = now.getFullYear(), m = now.getMonth() + 1, out = [];
    if (m === 12 && y >= FIRST_YEAR) out.push(yearCard(y));                      // 1 December: the year that is ending
    if (m === 1 && y - 1 >= FIRST_YEAR) out.push(yearCard(y - 1));               // through 31 January: the year that has ended
    if (y > FIRST_YEAR) out.push(m === 1 ? monthCard(y - 1, 12) : monthCard(y, m - 1));   // from 1 January 2027: the month before
    return out.filter(function (c) { return playedIn(stats, c); });
  }
  function cardOpen(stats, now) { var all = cardsOpen(now, stats); return all.length ? all[0] : null; }

  function url(card, root) { return String(root || "") + "me/year/" + card.query; }

  /* the month's name as the language writes it ("November", "novembre", "Kasım"); ym is "2026-11" */
  function monthName(ym, l) {
    var p = String(ym).split("-");
    try { return new Date(Date.UTC(+p[0], +p[1] - 1, 15)).toLocaleDateString(LOCALE[lang(l)], { month: "long", timeZone: "UTC" }); }
    catch (e) { return String(ym); }
  }
  function name(card, l) { return card.kind === "year" ? String(card.y) : monthName(card.ym, l); }
  function fill(s, x) { return s.replace("{x}", x); }
  function label(card, l) { l = lang(l); return fill(WORDS[l]["link_" + card.kind], name(card, l)); }
  function push(card, l) { l = lang(l); return fill(WORDS[l]["push_" + card.kind], name(card, l)); }

  return {
    FIRST_YEAR: FIRST_YEAR, LOCALE: LOCALE, LANGS: LANGS, WORDS: WORDS,
    cardsOpen: cardsOpen, cardOpen: cardOpen, url: url, label: label, push: push,
    parse: parse, period: period, range: range, monthName: monthName, name: name,
    yearCard: yearCard, monthCard: monthCard, playedIn: playedIn,
    iso: iso, diff: diff, plus: plus, daysIn: daysIn
  };
});
