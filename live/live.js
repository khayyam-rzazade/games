/* Logicers Live: the page of the live games (14 Oct 2026; games that hosts make, 15 Oct 2026). One page for
   everyone: the section's own page, the host's setup, joining, the game itself for the host and for every
   player, and a saved game's own page, where it is played alone.

   Two kinds of game. How Sure? with Logicers' own sets: guess a number, pick a net. A game a host made with
   the editor (make/): its questions are numbers (the same slider and nets), choices of 2 to 4 answers, true
   or false, or typed answers, and every question asks how sure the player is (Sure 5 or 0, Fairly 4 or 1,
   Not sure 3 or 2) unless its maker switched that off. A made game wears its maker's colour and speaks its
   language (words.js: English, Italian, Turkish, Spanish, Portuguese, French), and every screen of it says it was made by the host, not
   checked by Logicers, with a Report link. Typed answers are judged by people: when an answer is not on the
   maker's list, the host first sees each different answer once and ticks the right ones ("check").

   The host screen can be any screen: a TV, a projector, a laptop, or just a phone. Every phone shows
   everything, the reveal with everyone's answers included, so a shared screen is optional; and the host
   can play too ("I'm playing too": the host's own screen then carries their question and a dark strip of
   host buttons). A host who is not playing, on a wide screen, gets the big-screen look (body.live-big).

   A saved game's code (seven letters, where a live game has five) opens its own page when its maker lets
   people play it alone: the phone gets the questions without their answers, plays at its own pace, keeps the
   answers in this browser until the end, and sends them all at once; the server scores them, and the first
   play of a browser goes on the game's scoreboard.

   No account for anyone. The host's secret key and each phone's own random key live in this browser's
   storage, never in the address (the address bar may be on a projector); the address carries only the
   game's code, after the "#", so no server ever logs it. The server (server/live, a Cloudflare Worker)
   decides every score; hs-rules.js, the same file as the server's, only draws your own net as you move it.
   Every text a person wrote (titles, questions, answers, names) is escaped, and shown with dir="auto".
   Words are few and pictures many (Khayyam, 14 Oct 2026: "very simple, user friendly, more visuals and
   less words"), and the way on to today's daily games is big on every phone's last screen. */
(function () {
  "use strict";
  var TO = window.TurnsOut, R = window.HSRules, SETS = window.LIVE_SETS || [], QRG = window.qrcodegen;
  var WORDS = window.LIVE_WORDS || { en: {} };
  if (!TO || !R) return;

  var PROTO = 1;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  /* Two addresses for the server (27 Oct 2026): live.logicers.com first, because some campus Wi-Fi blocks workers.dev;
     the workers.dev one only when the first gives no answer at all (not even an error) before anything has been heard
     from it, and then for the rest of the page. Nothing is probed on load. */
  var SERVER_NEW = "https://live.logicers.com", SERVER_OLD = "https://logicers-live.rza-khay.workers.dev";
  var TWIN = !LOCAL, heard = false;
  /* the checks may point the page at another local server; on the site, never (an element with that id could
     otherwise stand in for it: a string set by a script on this computer only) */
  var SERVER = (LOCAL && typeof window.LIVE_SERVER === "string" && window.LIVE_SERVER) || (LOCAL ? "http://127.0.0.1:8787" : SERVER_NEW);
  var SITE = "logicers.com";
  var CONTACT = "logicers.world@gmail.com";
  var KEYP = "logicers-live:";
  var LOC = { en: "en-US", it: "it-IT", tr: "tr-TR", es: "es-ES", pt: "pt-BR", fr: "fr-FR" };
  var COLOURS = ["indigo", "blue", "teal", "red", "pink", "green", "orange", "slate"];
  var LEVELS = ["s", "m", "b"];
  var LETTERS = "ABCD";

  function $(id) { return document.getElementById(id); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function now() { return Date.now(); }
  function randomKey() {
    var b = new Uint8Array(24);
    window.crypto.getRandomValues(b);
    var s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return window.btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  /* ---- words in the game's language (words.js): English outside a made game ---- */
  var L = "en";
  var pluralRules = {};
  function raw(k) {
    var d = WORDS[L] || {};
    if (Object.prototype.hasOwnProperty.call(d, k)) return d[k];
    return (WORDS.en || {})[k];
  }
  /* %s and %d in order, or by number (%1$s) when a language puts them in another order; %% a percent sign */
  function fill(s, args) {
    var i = 0;
    return String(s).replace(/(\b(?:[IiAa]l|[Dd][ae]l|[Nn]el|[Ss]ul) )?%(?:(\d)\$)?([sd%])/g, function (m, art, n, t) {
      art = art || "";
      if (t === "%") return art + "%";
      var v = n ? args[+n - 1] : args[i++];
      if (v === undefined || v === null) return art;
      v = String(v);
      return art && L === "it" ? itArt(art, v, t) : art + v;
    });
  }
  /* Italian before a number, as it is said: "aperto fino al 11 nov" is "aperto fino all'11 nov", "il 8" is "l'8"
     (every number said with a vowel first), and a date's first day is "1°". Only the article written before a
     %s or %d changes, never what fills it (the same rule as the editor's, live/build/make.js). */
  function itArt(art, v, t) {
    var ELIDE = { il: "l'", al: "all'", dal: "dall'", del: "dell'", nel: "nell'", sul: "sull'" };
    var w = art.slice(0, -1), low = w.toLowerCase(), e = ELIDE[low];
    if (e && /^(8|11(?!\d))/.test(v)) return (w === low ? e : e.charAt(0).toUpperCase() + e.slice(1)) + v;
    if (t === "s" && /^1 [a-z]/.test(v)) return art + "1°" + v.slice(1);
    return art + v;
  }
  function pluralOf(n) {
    try {
      if (!pluralRules[L]) pluralRules[L] = new Intl.PluralRules(LOC[L] || "en-US");
      return pluralRules[L].select(n);
    } catch (e) { return n === 1 ? "one" : "other"; }
  }
  function pick(v, n) {
    if (v && typeof v === "object") return v[pluralOf(n)] !== undefined ? v[pluralOf(n)] : v.other;
    return v;
  }
  function W(k) {
    var v = raw(k);
    if (v === undefined) return k;
    return fill(pick(v, 1), Array.prototype.slice.call(arguments, 1));
  }
  /* a word with a little HTML of its own: what fills it in is escaped */
  function WH(k) {
    var v = raw(k);
    if (v === undefined) return esc(k);
    return fill(pick(v, 1), Array.prototype.slice.call(arguments, 1).map(esc));
  }
  /* a word that counts n (its first place is n) */
  function WN(k, n) {
    var v = raw(k);
    if (v === undefined) return k;
    return fill(pick(v, n), [n].concat(Array.prototype.slice.call(arguments, 2)));
  }
  function WNH(k, n) {
    var v = raw(k);
    if (v === undefined) return esc(k);
    return fill(pick(v, n), [n].concat(Array.prototype.slice.call(arguments, 2).map(esc)));
  }
  function loc() { return LOC[L] || "en-US"; }

  /* ---- this browser's own storage: the keys of the games it hosts or plays, the last setup ---- */
  var mem = {};
  function sget(k) {
    try { var v = window.localStorage.getItem(KEYP + k); return v ? JSON.parse(v) : null; }
    catch (e) { return mem[k] || null; }
  }
  function sset(k, v) {
    mem[k] = v;
    try { window.localStorage.setItem(KEYP + k, JSON.stringify(v)); } catch (e) { /* kept in memory only */ }
  }
  function sdel(k) {
    delete mem[k];
    try { window.localStorage.removeItem(KEYP + k); } catch (e) { /* nothing kept */ }
  }
  (function tidy() {                         // a live game's keys are useless a few days on: forget them
    try {
      var old = [];
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(KEYP) === 0 && k !== KEYP + "setup") {
          var v = JSON.parse(window.localStorage.getItem(k) || "null");
          /* a saved game played alone keeps its key for the game's two months (and a little more): it is what
             says the scoreboard holds this browser's first play */
          var keep = k.indexOf(KEYP + "kp:") === 0 ? 70 * 86400e3 : 3 * 86400e3;
          if (!v || !v.t || now() - v.t > keep) old.push(k);
        }
      }
      old.forEach(function (k) { window.localStorage.removeItem(k); });
    } catch (e) { /* nothing to tidy */ }
  })();
  function sessionGet(k) {
    try { var v = window.sessionStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function sessionDel(k) { try { window.sessionStorage.removeItem(k); } catch (e) { /* nothing kept */ } }
  /* the games its maker kept on this computer (the editor writes them, only when asked to) */
  function keptGames() {
    try {
      var v = JSON.parse(window.localStorage.getItem("logicers-make:games") || "[]");
      return Array.isArray(v) ? v.filter(function (g) { return g && /^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(g.code) && typeof g.edit === "string"; }) : [];
    } catch (e) { return []; }
  }

  /* ---- numbers as people read them, in the game's language ---- */
  function decimals(step) { var s = String(step), i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; }
  function plain(x, d) { return Number(x).toLocaleString(loc(), { maximumFractionDigits: d, minimumFractionDigits: 0 }); }
  function big(k, v) { var n = Number(v.toPrecision(3)); return fill(pick(raw(k), n), [plain(n, 2)]); }
  function fmt(q, x) {
    if (q.kind === "year") return String(Math.round(x));
    var a = Math.abs(x);
    if (a >= 1e12) return big("trillion", x / 1e12);
    if (a >= 1e9) return big("billion", x / 1e9);
    if (a >= 1e6) return big("million", x / 1e6);
    return plain(x, q.log ? 2 : decimals(q.step));
  }
  function withUnit(q, x) { return fmt(q, x) + (q.u ? " " + q.u : ""); }
  function ord(n) {
    if (L === "it" || L === "pt") return n + "º";
    if (L === "tr") return n + ".";
    if (L === "es") return n + ".º";
    if (L === "fr") return n + (n === 1 ? "er" : "e");
    var s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function placeText(y) { return (y.tied ? "=" : "") + ord(y.place); }
  function dateShort(t) {
    try { return new Date(t).toLocaleDateString(loc(), { day: "numeric", month: "short" }); } catch (e) { return ""; }
  }

  /* ---- the pictures ---- */
  var NET_W = { s: 12, m: 30, b: 62 };
  var NET_KEY = { s: "netS", m: "netM", b: "netB" };
  var SURE_KEY = { s: "sureS", m: "sureM", b: "sureB" };
  function netWord(n) { return W(NET_KEY[n]); }
  function netIcon(n, cls) {
    return '<i class="hs-ic' + (cls ? " " + cls : "") + '" style="width:' + NET_W[n] + 'px"><i class="hs-net" style="left:0;width:100%"></i></i>';
  }
  /* how sure, as three dots: three for Sure, two for Fairly, one for Not sure */
  function dots(n) {
    var on = n === "s" ? 3 : n === "m" ? 2 : 1;
    return '<span class="hs-dots3" aria-hidden="true"><i></i><i' + (on < 2 ? ' class="hs-off"' : "") + "></i><i" + (on < 3 ? ' class="hs-off"' : "") + "></i></span>";
  }
  var ICON = {
    check: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    person: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.4" r="3.6" fill="currentColor"/><path d="M3.4 17.6c.6-3.6 3.3-5.6 6.6-5.6s6 2 6.6 5.6z" fill="currentColor"/></svg>',
    share: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5v10M6 6.2l4-3.7 4 3.7M4.5 10.5v5.2c0 .7.6 1.3 1.3 1.3h8.4c.7 0 1.3-.6 1.3-1.3v-5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    youIn: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle class="lf-c" cx="24" cy="24" r="22"/><path class="ls-card" d="M14 24.5l7 7 13-14" fill="none" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    years: '<svg viewBox="0 0 46 46" aria-hidden="true"><rect class="lf-c" x="5" y="9" width="36" height="31" rx="7"/><rect class="lf-c" x="5" y="9" width="36" height="10" rx="5"/><rect class="lf-card" x="9" y="19" width="28" height="17" rx="3"/><rect class="lf-c" x="13" y="5" width="4" height="9" rx="2"/><rect class="lf-c" x="29" y="5" width="4" height="9" rx="2"/><text class="lf-c" x="23" y="32" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="11">1971</text></svg>',
    space: '<svg viewBox="0 0 46 46" aria-hidden="true"><circle class="lf-c" cx="23" cy="23" r="12"/><ellipse class="ls-c" cx="23" cy="23" rx="21" ry="6.5" fill="none" stroke-width="3" transform="rotate(-20 23 23)"/><circle class="ls-card" cx="23" cy="23" r="12" fill="none" stroke-width="1.5" opacity=".35"/><circle class="lf-c" cx="38" cy="8" r="2"/><circle class="lf-c" cx="7" cy="37" r="1.6"/></svg>',
    body: '<svg viewBox="0 0 46 46" aria-hidden="true"><circle class="lf-c" cx="23" cy="10" r="6.5"/><path class="lf-c" d="M9 41c0-11 6-19 14-19s14 8 14 19z"/><path class="lf-card" d="M23 37.5l-5.2-5.1a3.2 3.2 0 0 1 4.6-4.5l.6.6.6-.6a3.2 3.2 0 0 1 4.6 4.5z"/></svg>',
    animals: '<svg viewBox="0 0 46 46" aria-hidden="true"><ellipse class="lf-c" cx="23" cy="30" rx="10" ry="8.5"/><ellipse class="lf-c" cx="10.5" cy="19" rx="4" ry="5"/><ellipse class="lf-c" cx="18" cy="11" rx="4" ry="5.2"/><ellipse class="lf-c" cx="28" cy="11" rx="4" ry="5.2"/><ellipse class="lf-c" cx="35.5" cy="19" rx="4" ry="5"/></svg>',
    planet: '<svg viewBox="0 0 46 46" aria-hidden="true"><circle class="lf-c" cx="23" cy="23" r="18"/><path class="lf-card" d="M11 14c4 0 6 2 5.4 5-.4 2.4 1.8 3.3 4 3.8 2.6.5 2.8 2.8 1.6 4.8-1.3 2.2-.7 5 1.1 7.2-5 .2-9.1-2-11.7-5.9-2.9-4.3-2.6-9.9.6-14.9z" opacity=".9"/><path class="lf-card" d="M28.5 9.5c-.6 2 .2 3.5 2.2 4.1 2.2.8 2.6 2.6 1.5 4.5-1 1.7.4 3.3 2.4 3.5 1.5.2 3-.3 4-1.3.6 4.8-1 9.4-4.5 12.6-1-2.2-2.6-3.3-4.8-3.5-2.4-.2-3.7-2-3-4.3.7-1.9-.3-3.4-2.2-3.9-2.1-.7-2.7-2.5-1.6-4.4 1.2-2.4 3.4-5.3 6-7.3z" opacity=".9"/></svg>',
    built: '<svg viewBox="0 0 46 46" aria-hidden="true"><path class="lf-c" d="M20 4h6l2 36h-10z"/><rect class="lf-c" x="15" y="38" width="16" height="4" rx="1.5"/><rect class="lf-card" x="21.5" y="12" width="3" height="4" rx="1"/><rect class="lf-card" x="21.2" y="21" width="3.6" height="4" rx="1"/><path class="ls-c" d="M2 33c5-7 9-7 12 0M32 33c3-7 7-7 12 0" fill="none" stroke-width="2.6"/><rect class="lf-c" x="2" y="32" width="12" height="2.6" rx="1"/><rect class="lf-c" x="32" y="32" width="12" height="2.6" rx="1"/></svg>',
    sport: '<svg viewBox="0 0 46 46" aria-hidden="true"><rect class="lf-c" x="19" y="3" width="8" height="5" rx="2"/><circle class="lf-c" cx="23" cy="26" r="16"/><circle class="lf-card" cx="23" cy="26" r="11.5"/><path class="ls-c" d="M23 26V18M23 26l5 3" fill="none" stroke-width="3" stroke-linecap="round"/><rect class="lf-c" x="35" y="9" width="5" height="4" rx="1.5" transform="rotate(40 37.5 11)"/></svg>',
    science: '<svg viewBox="0 0 46 46" aria-hidden="true"><path class="lf-c" d="M17 4h12v4h-2v9l11 18c1.8 3-.4 7-4 7H10c-3.6 0-5.8-4-4-7l11-18V8h-2V4z"/><path class="lf-card" d="M12.5 31h21l2.6 4.3c.6 1-.1 2.2-1.3 2.2H11.2c-1.2 0-1.9-1.2-1.3-2.2z" opacity=".9"/><circle class="lf-card" cx="20" cy="25" r="1.8"/><circle class="lf-card" cx="26" cy="20" r="1.3"/></svg>',
    lost: '<svg viewBox="0 0 120 84" aria-hidden="true"><rect class="lf-c" x="10" y="44" width="100" height="8" rx="4" opacity=".2"/><rect class="ls-c" x="40" y="26" width="40" height="40" rx="10" fill="none" stroke-width="3" stroke-dasharray="7 5" opacity=".5"/><text class="lf-c" x="60" y="56" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="26">?</text></svg>',
    signal: '<svg viewBox="0 0 120 84" aria-hidden="true"><g class="lf-c"><rect x="34" y="52" width="10" height="16" rx="3"/><rect x="50" y="40" width="10" height="28" rx="3" opacity=".55"/><rect x="66" y="28" width="10" height="40" rx="3" opacity=".3"/><rect x="82" y="16" width="10" height="52" rx="3" opacity=".15"/></g></svg>',
    done: '<svg viewBox="0 0 120 84" aria-hidden="true"><rect class="lf-c" x="20" y="48" width="24" height="26" rx="5" opacity=".5"/><rect class="lf-c" x="48" y="30" width="24" height="44" rx="5"/><rect class="lf-c" x="76" y="56" width="24" height="18" rx="5" opacity=".3"/></svg>',
    stop: '<svg viewBox="0 0 120 84" aria-hidden="true"><circle class="ls-c" cx="60" cy="42" r="26" fill="none" stroke-width="5" opacity=".55"/><rect class="lf-c" x="44" y="38" width="32" height="8" rx="4"/></svg>',
    /* the four kinds of question, as the editor draws them */
    num: '<svg viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="13" width="30" height="3" rx="1.5" fill="currentColor" opacity=".35"/><rect x="11" y="6" width="12" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="3" width="2" height="16" rx="1" fill="currentColor"/></svg>',
    mc: '<svg viewBox="0 0 34 22" aria-hidden="true"><rect x="4" y="2" width="12" height="8" rx="2.5" fill="currentColor"/><rect x="18" y="2" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/><rect x="4" y="12" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/><rect x="18" y="12" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/></svg>',
    tf: '<svg viewBox="0 0 34 22" aria-hidden="true"><path d="M4 11.5l3.8 3.8 7-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6l9 10M30 6l-9 10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".45"/></svg>',
    tx: '<svg viewBox="0 0 34 22" aria-hidden="true"><text x="3" y="17" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="15" fill="currentColor">Aa</text><rect x="25" y="4" width="2.4" height="15" rx="1.2" fill="currentColor"/></svg>'
  };
  var STEP_MINUS = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
  var STEP_PLUS = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10M10 5v10" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
  /* the rules as three pictures: guess, pick a net, catch it */
  var meshN = 0;
  function rulesHtml() {
    var id = "m" + (++meshN);
    var mesh = function (c, o) { return '<pattern id="' + id + c + '" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H7M0 0V7" class="ls-c" stroke-width="1.5" opacity=".55"/></pattern>'; };
    var a = '<svg viewBox="0 0 120 70" aria-hidden="true"><rect class="lf-c" x="8" y="30" width="104" height="6" rx="3" opacity=".22"/><rect class="lf-c" x="66" y="12" width="3" height="42" rx="1.5"/><circle class="lf-c ls-card" cx="67.5" cy="57" r="8" stroke-width="2.5"/><text class="lf-c" x="67.5" y="9" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="11">1971</text></svg>';
    var b = '<svg viewBox="0 0 120 70" aria-hidden="true"><defs>' + mesh("A", "#470BA8") + '</defs><g class="ls-c" stroke-width="2"><rect x="57" y="6" width="9" height="15" rx="4" fill="url(#' + id + 'A)"/><rect x="45" y="26" width="33" height="15" rx="5" fill="url(#' + id + 'A)"/><rect x="22" y="46" width="78" height="15" rx="5" fill="url(#' + id + 'A)"/></g><rect class="lf-c" x="60.5" y="2" width="2" height="64" rx="1"/></svg>';
    var c = '<svg viewBox="0 0 120 70" aria-hidden="true"><defs>' + mesh("B", "#470BA8") + '</defs><rect class="lf-c" x="8" y="40" width="104" height="6" rx="3" opacity=".22"/><rect class="ls-c" x="40" y="22" width="40" height="30" rx="8" fill="url(#' + id + 'B)" stroke-width="2.4"/><rect class="lf-ink" x="58" y="12" width="4" height="48" rx="2"/><rect class="lf-c" x="86" y="4" width="28" height="18" rx="9"/><text class="lf-onc" x="100" y="17" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="12">+5</text></svg>';
    return '<div class="live-rule">' + a + '<b><i>1</i>Guess</b></div><div class="live-rule">' + b + '<b><i>2</i>Pick a net</b></div><div class="live-rule">' + c + '<b><i>3</i>Catch it</b></div>';
  }
  function pointsHtml() {
    return ["s", "m", "b"].map(function (n) {
      return '<div class="live-pt">' + netIcon(n) + '<b>' + netWord(n) + '</b><span>' + R.POINTS[n][0] + " if it catches</span><span>" + R.POINTS[n][1] + " if not</span></div>";
    }).join("");
  }
  /* a made game's lobby: how sure, as three pictures of dots and points */
  function levelsHtml() {
    return '<div class="hs-levels">' + LEVELS.map(function (n) {
      return '<div class="hs-level">' + dots(n) + "<b>" + esc(W(SURE_KEY[n])) + "</b><span>" + esc(W("orPts", R.POINTS[n][0], R.POINTS[n][1])) + "</span></div>";
    }).join("") + "</div>";
  }
  each(document.querySelectorAll("[data-rules]"), function (e) { e.innerHTML = rulesHtml(); });
  each(document.querySelectorAll("[data-points]"), function (e) { e.innerHTML = pointsHtml(); });

  TO.wireDialogs();
  TO.fixLocalLinks();

  /* ================================================================ a made game's look and language */
  var STATIC = {};                  // the page's own English words, kept to put back when a made game ends
  function keepStatic(id) { var e = $(id); if (e && STATIC[id] === undefined) STATIC[id] = e.innerHTML; }
  ["send-title", "send-quiet", "send-edit", "send-go", "reveal-wait", "share-title", "share-save", "share-copy"].forEach(keepStatic);
  var made = null;                  // the made game shown: { title, colour, lang, sure, mixed } or null
  /* A made game's colour and language, or (null) Logicers' own look and English. */
  function setLook(m) {
    made = m || null;
    L = made && WORDS[made.lang] ? made.lang : "en";
    document.documentElement.lang = L;
    /* the site's own words on this page (the way on to today's games at the end, 29 Oct 2026): the player's own
       language when they have picked one, otherwise the game's; and no "English only" line over a made game */
    if (made && window.LG && window.LG.speak) { try { window.LG.speak(window.LG.saved() || L); } catch (e) { /* stays English */ } }
    if (made && COLOURS.indexOf(made.colour) >= 0) document.body.setAttribute("data-kc", made.colour);
    else document.body.removeAttribute("data-kc");
    if (made) {
      $("send-title").textContent = W("sendTitle");
      $("send-quiet").textContent = W("sendFinal");
      $("send-edit").textContent = W("edit");
      $("send-go").textContent = W("send");
      $("reveal-wait").textContent = W("wait");
      $("share-title").textContent = W("share");
      $("share-save").textContent = W("savePic");
      $("share-copy").textContent = W("copyLink");
    } else {
      Object.keys(STATIC).forEach(function (id) { var e = $(id); if (e) e.innerHTML = STATIC[id]; });
    }
    $("hs-more").setAttribute("aria-label", made ? W("moreHost") : "More for the host");
    helpFor();
  }
  /* "How to play": How Sure?'s own pictures, or a made game's words */
  function helpFor() {
    var hs = $("help-hs"), mk = $("help-kit");
    if (!hs || !mk) return;
    hs.hidden = !!made;
    mk.hidden = !made;
    $("help-title").textContent = made ? W("helpTitle") : "How to play";
    if (!made) return;
    var sure = made.sure !== false;
    mk.innerHTML = (sure ? '<p class="quiet">' + esc(W("helpAnswer")) + "</p>" + levelsHtml() + '<p class="quiet">' + esc(W("helpNets")) + "</p>" : '<p class="quiet">' + esc(W("helpPlain")) + "</p>") +
      '<p class="quiet">' + esc(W("helpNoSpeed")) + "</p>" +
      "<h3>" + esc(W("madeTitle")) + '</h3><p class="quiet">' + esc(W("helpMade")) + ' <a href="' + esc(reportHref()) + '">' + esc(W("report")) + '</a> · <a href="' + esc(termsHref()) + '">' + esc(W("terms")) + "</a></p>" +
      "<h3>" + esc(W("aboutGames")) + '</h3><p class="quiet">' + esc(W("helpAccount")) + "</p>" +
      "<h3>" + esc(W("helpPrivacy")) + '</h3><p class="quiet">' + esc(privacyLine(app.alone ? "alone" : "live")) + "</p>" +
      '<p class="quiet">' + WH("contact", CONTACT).replace(esc(CONTACT), '<a href="mailto:' + CONTACT + '">' + CONTACT + "</a>") + "</p>";
  }
  /* the privacy words of a made game's screens, in its language (TurnsOut's own words are English only) */
  function counted() { return !!document.querySelector("script[data-goatcounter]"); }
  function countedTwice() { return !!document.querySelector("script[data-cf-beacon]"); }   // Cloudflare Web Analytics too (16 Oct 2026)
  function privacyLine(kind) {
    var s = kind === "alone" ? W("privacyAlone") + " " + W("privacyBrowser") : W("privacyLive");
    return s + (counted() ? " " + W(countedTwice() ? "countedBoth" : "counted") : "");
  }
  function reportHref() { return TO.here("report/") + "#lang=" + L + (app.code || kit.code ? "&code=" + (app.code || kit.code) : ""); }
  function termsHref() { return TO.here("terms/") + "#" + L; }
  function madeLine(short) {
    return '<p class="hs-made">' + esc(W(short ? "madeByShort" : "madeBy")) + ' · <a href="' + esc(reportHref()) + '">' + esc(W("report")) + "</a></p>";
  }
  /* the join screen's privacy line: Logicers' English one, or the made game's own */
  var joinPrivacy = document.querySelector("#v-join [data-privacy]");
  var joinPrivacyText = joinPrivacy ? joinPrivacy.textContent : "";
  function joinPrivacyFor() {
    if (!joinPrivacy) return;
    joinPrivacy.textContent = made ? privacyLine("live") : (joinPrivacy.getAttribute("data-en") || joinPrivacyText);
  }
  if (joinPrivacy) joinPrivacy.setAttribute("data-en", joinPrivacyText);

  /* ================================================================ views */
  var VIEWS = ["v-home", "v-setup", "v-join", "v-note", "v-game", "v-kit"];
  function show(id) {
    VIEWS.forEach(function (v) { $(v).hidden = v !== id; });
    if (id !== "v-game") { hostStrip(null); document.body.classList.remove("live-big"); }
    window.scrollTo(0, 0);
  }
  var netnote = $("netnote");
  function netNote(t) { netnote.textContent = t || ""; netnote.hidden = !t; }

  /* a note instead of a game: no such code, no signal, an old page, removed, over */
  function note(art, h, p, btns, hooks) {
    stopGame();
    $("n-art").innerHTML = ICON[art] || "";
    $("n-h").textContent = h;
    $("n-p").textContent = p || "";
    $("n-p").hidden = !p;
    var box = $("n-btns");
    box.innerHTML = "";
    (btns || []).forEach(function (b) {
      var e = document.createElement(b.href ? "a" : "button");
      e.className = "btn " + (b.solid ? "solid" : "ghost");
      e.textContent = b.text;
      if (b.href) e.href = b.href; else { e.type = "button"; e.addEventListener("click", b.go); }
      box.appendChild(e);
    });
    $("n-after").innerHTML = "";
    show("v-note");
    if (hooks) onwardInto($("n-after"));
  }

  /* the way on to today's daily games: the site's own block, the same as at the end of every daily game */
  function onwardInto(box) {
    var after = $("after");
    after.innerHTML = "";
    try { TO.onward({ game: "how-sure", wait: 1600 }); } catch (e) { /* the way on must never break a game */ }
    var b = $("onward");
    if (b && box !== after) box.appendChild(b);
    if (app.role === "host") dropBar();
  }
  function dropBar() {
    var bar = $("onbar");
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    document.body.classList.remove("onbar-room");
  }

  /* ================================================================ the section's own page */
  var joinform = $("joinform"), joincode = $("joincode");
  joincode.addEventListener("input", function () {
    var v = joincode.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7);
    if (v !== joincode.value) joincode.value = v;
  });
  joinform.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = joincode.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (v.length !== 5 && v.length !== 7) { $("joinhint").textContent = "A code has five letters, or seven for a saved game."; joincode.focus(); return; }
    window.location.hash = v;
  });
  function showHome() {
    setLook(null);
    document.title = "How Sure? Play live | Logicers";
    show("v-home");
  }

  /* ================================================================ the host's setup */
  var setup = Object.assign({ set: (SETS[0] || {}).id, play: window.innerWidth < 760, name: "", timer: 0, practice: true,
                              n: 10, shuffle: false, picked: false, teams: false, standings: true, awards: true }, sget("setup") || {});
  if (!SETS.some(function (s) { return s.id === setup.set; })) setup.set = (SETS[0] || {}).id;
  var setupKit = null;              // a game made with the editor, chosen to host: { code, edit, title, n, colour, lang, sure, st }
  var setupKn = 0;                  // its questions to play: 0 = all
  function seg(id, value, onPick) {
    var box = $(id);
    box.innerHTML = box.innerHTML;          // drop old listeners
    each(box.querySelectorAll("button"), function (b) {
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(b.getAttribute("data-v") === String(value)));
      b.addEventListener("click", function () {
        each(box.querySelectorAll("button"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
        onPick(b.getAttribute("data-v"));
      });
    });
  }
  function kitButton(g, on) {
    var n = +g.n || 0;
    return '<button class="hs-set hs-kitset" type="button" role="radio" aria-checked="' + on + '" data-kit="' + esc(g.code) + '" data-kc="' + esc(COLOURS.indexOf(g.colour) >= 0 ? g.colour : "teal") + '">' +
      '<span class="hs-kitdot" aria-hidden="true">' + ICON.mc + '</span><span class="hs-set-t"><b dir="auto">' + esc(g.title || g.code) + "</b><small>" +
      (n ? n + (n === 1 ? " question" : " questions") + " · " : "") + esc(g.code) + "</small></span></button>";
  }
  function drawSetup() {
    var sets = $("sets"), kits = keptGames(), hk = sessionGet("logicers-live:hostkit");
    if (hk && (!hk.t || now() - hk.t > 3600e3 || !/^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(hk.code || ""))) { sessionDel("logicers-live:hostkit"); hk = null; }
    if (hk) {
      kits = kits.filter(function (g) { return g.code !== hk.code; });
      kits.unshift(hk);
      if (!setupKit || setupKit.code !== hk.code) { setupKit = hk; useKitSettings(hk); }
    }
    if (setupKit && !kits.some(function (g) { return g.code === setupKit.code; })) setupKit = null;
    sets.innerHTML = SETS.map(function (s) {
      return '<button class="hs-set" type="button" role="radio" aria-checked="' + (!setupKit && s.id === setup.set) + '" data-set="' + esc(s.id) + '">' +
        (ICON[s.id] || ICON.space) + '<span class="hs-set-t"><b>' + esc(s.title) + '</b><small>' + esc(s.line) + '</small></span></button>';
    }).join("") + (kits.length ? '<p class="hs-yours">Your games</p>' + kits.map(function (g) { return kitButton(g, !!setupKit && setupKit.code === g.code); }).join("") : "");
    each(sets.querySelectorAll(".hs-set"), function (b) {
      b.addEventListener("click", function () {
        var kc = b.getAttribute("data-kit");
        if (kc) {
          var g = null;
          kits.forEach(function (x) { if (x.code === kc) g = x; });
          if (!g) return;
          if (!setupKit || setupKit.code !== g.code) { setupKit = g; useKitSettings(g); }
        } else { setupKit = null; setup.set = b.getAttribute("data-set"); }
        each(sets.querySelectorAll(".hs-set"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
        drawSetupRows();
      });
    });
    $("s-play").checked = !!setup.play;
    $("s-namerow").hidden = !setup.play;
    $("s-name").value = setup.name || "";
    drawSetupRows();
    $("setup-err").hidden = true;
  }
  /* a made game's own settings, from the editor, as the starting choice */
  function useKitSettings(g) {
    var st = g.st || {};
    setupKn = Number.isInteger(st.n) && st.n > 0 ? st.n : 0;
    if (g.st) {
      setup.timer = [0, 30, 60, 90].indexOf(st.timer) >= 0 ? st.timer : 0;
      setup.shuffle = st.shuffle === true;
      setup.picked = st.picked === true;
      setup.teams = st.teams === true;
      setup.standings = st.standings !== false;
      setup.awards = st.awards !== false;
    }
  }
  function drawSetupRows() {
    var kitOn = !!setupKit, n = kitOn ? (+setupKit.n || 0) : 0;
    $("s-practicerow").hidden = kitOn;
    $("s-practice").checked = !!setup.practice;
    $("s-standings").checked = !!setup.standings;
    $("s-awards").checked = !!setup.awards;
    seg("s-timer", setup.timer, function (v) { setup.timer = +v; });
    var nbox = $("s-n");
    if (kitOn) {
      var opts = [0].concat([5, 10, 20, 30, 50].filter(function (x) { return x < n; }));
      if (opts.indexOf(setupKn) < 0) setupKn = 0;
      nbox.innerHTML = opts.map(function (x) { return '<button type="button" data-v="' + x + '">' + (x ? x : "All" + (n ? " " + n : "")) + "</button>"; }).join("");
      seg("s-n", setupKn, function (v) { setupKn = +v; });
    } else {
      nbox.innerHTML = '<button type="button" data-v="5">5</button><button type="button" data-v="10">10</button>';
      seg("s-n", setup.n, function (v) { setup.n = +v; });
    }
    seg("s-order", setup.shuffle ? 1 : 0, function (v) { setup.shuffle = v === "1"; });
    seg("s-names", setup.picked ? 1 : 0, function (v) { setup.picked = v === "1"; });
    seg("s-teams", setup.teams ? 1 : 0, function (v) { setup.teams = v === "1"; });
  }
  $("s-play").addEventListener("change", function () { setup.play = this.checked; $("s-namerow").hidden = !setup.play; if (setup.play) $("s-name").focus(); });
  $("s-practice").addEventListener("change", function () { setup.practice = this.checked; });
  $("s-standings").addEventListener("change", function () { setup.standings = this.checked; });
  $("s-awards").addEventListener("change", function () { setup.awards = this.checked; });
  function setupErr(t) { var e = $("setup-err"); e.textContent = t; e.hidden = !t; }
  var opening = false;
  $("open-game").addEventListener("click", function () {
    if (opening) return;
    setup.name = $("s-name").value.replace(/\s+/g, " ").trim();
    if (setup.play && !setup.name && !setup.picked) { setupErr("Type your name, or switch off “I'm playing too”."); $("s-name").focus(); return; }
    sset("setup", setup);
    opening = true;
    var btn = this;
    btn.disabled = true;
    setupErr("");
    var kitOn = setupKit, body;
    if (kitOn) {
      body = { v: PROTO, kit: kitOn.code, edit: kitOn.edit, settings: { n: setupKn, shuffle: setup.shuffle, timer: setup.timer, teams: setup.teams,
                                                                       picked: setup.picked, standings: setup.standings, awards: setup.awards } };
    } else {
      body = { v: PROTO, settings: { set: setup.set, n: setup.n, shuffle: setup.shuffle, timer: setup.timer, teams: setup.teams, picked: setup.picked,
                                     practice: setup.practice, standings: setup.standings, awards: setup.awards } };
    }
    reach("/new", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (res) { return res.json().then(function (b) { return { status: res.status, b: b }; }); })
      .then(function (r) {
        opening = false;
        btn.disabled = false;
        if (r.status === 200 && r.b.code && r.b.key) {
          sset("host:" + r.b.code, { key: r.b.key, play: !!setup.play, name: setup.name, pkey: setup.play ? randomKey() : null, pass: r.b.pass || null, t: now() });
          if (kitOn) sessionDel("logicers-live:hostkit");
          TO.count(kitOn ? "live/hosted-made" : "live/hosted");
          window.location.hash = r.b.code;
          return;
        }
        if (r.b && r.b.e === "old") setupErr("Logicers has just been updated. Reload this page.");
        else if (r.status === 429) setupErr("Too many games from here just now. Try again later.");
        else if (kitOn && r.b && r.b.e === "stopped") setupErr("Logicers stopped this game: it can't be hosted.");
        else if (kitOn && r.status === 403) setupErr("This game's edit link no longer opens it. Open the game in the editor again.");
        else if (kitOn && r.status === 404) setupErr("This game no longer exists: saved games are deleted two months after their last use.");
        else setupErr("The game server is not ready. Try again in a minute.");
      }, function () {
        opening = false;
        btn.disabled = false;
        setupErr("Can't reach the game server. Check the signal. Some Wi-Fi networks block live games: try mobile data.");
      });
  });
  function showSetup() {
    setLook(null);
    document.title = "Host How Sure? | Logicers";
    drawSetup();
    show("v-setup");
  }

  /* ================================================================ a game: the connection */
  var app = { code: "", role: "", key: "", pkey: null, pass: null, playing: false, name: "", state: null, screen: "", ws: null,
              tries: 0, timer: null, beat: null, lastMsg: 0, stopped: true, everConnected: false, joining: false,
              q: null, info: null, finishedRound: 0, sentAt: 0, whoK: "", alone: false };
  var kit = { code: "" };           // the saved game shown on its own page (play alone)

  function stopGame() {
    app.stopped = true;
    clearTimeout(app.timer);
    clearInterval(app.beat);
    clearInterval(app.tick);
    if (app.ws) { var w = app.ws; app.ws = null; try { w.close(); } catch (e) { /* gone */ } }
    netNote("");
    releaseWake();
    hostStrip(null);
    var c = $("codechip");
    c.hidden = true;
  }

  function openGame(code, pass) {
    if (app.code === code && !app.stopped) return;
    stopGame();
    kit = { code: "" };
    app = Object.assign(app, { code: code, state: null, screen: "", tries: 0, stopped: false, everConnected: false, joining: false, q: null, info: null, alone: false, shown: {} });
    setLook(null);
    var h = sget("host:" + code);
    if (h && h.key) {
      app.role = "host"; app.key = h.key; app.pkey = h.pkey || null; app.pass = h.pass || null; app.playing = !!h.play; app.name = h.name || "";
      $("v-game").innerHTML = "";
      show("v-game");
      peek(code);
    } else {
      var p = sget("p:" + code);
      if (!p || !p.key) { p = { key: randomKey(), t: now() }; sset("p:" + code, p); }
      if (pass && !p.pass) { p.pass = pass; sset("p:" + code, p); }       // the pass that came with the link (joinUrl)
      app.role = "player"; app.key = p.key; app.pkey = null; app.pass = p.pass || null; app.playing = true; app.name = "";
      joinView();
      peek(code);
    }
    var c = $("codechip");
    c.textContent = code;
    c.hidden = false;
    document.title = "How Sure? · " + code + " | Logicers";
  }

  /* a made game: its look and language, from what the server says of it */
  function madeFrom(i) {
    return i && i.kit ? { title: i.title || "", colour: i.colour, lang: i.lang, sure: i.sure !== false, mixed: !!i.mixed } : null;
  }
  /* the state's own word on a made game, when it differs from the look on screen */
  function lookChanged(g) {
    return !made || made.lang !== g.lang || made.colour !== g.colour || made.mixed !== !!g.mixed || made.sure !== (g.sure !== false) || made.title !== g.title;
  }

  function peek(code) {
    reach("/game/" + code).then(function (res) {
      if (res.status === 404 && app.role === "host") {
        forget();
        note("done", "This game is over", "", [{ text: "Host a game", solid: true, href: "#host" }], true);
        return null;
      }
      if (res.status === 404) {
        note("lost", "No game with this code", "Check the letters on the host's screen.", [
          { text: "Type it again", solid: true, href: "./" }, { text: "Host a game", href: "#host" }]);
        sdel("p:" + code);
        return null;
      }
      if (res.status === 429) {
        if (app.pass) { connect(); return null; }      // braked, but this browser is in the game: its pass gets it back in
        note("lost", "Too many tries", "Wait a little, then try again.", [{ text: "Back", href: "./" }]);
        return null;
      }
      return res.json();
    }).then(function (info) {
      if (!info || app.code !== code) return;
      app.info = info;
      if (info.kit) { setLook(madeFrom(info)); joinPrivacyFor(); }
      if (app.role === "player") joinInfo();
      connect();
    }, function () {
      if (app.code !== code) return;
      unreachable();
    });
  }

  /* one call to the server, by its path: the first address's failure to answer at all (before it has ever answered)
     moves the page to the second; any answer, even an error, settles it */
  function reach(path, init) {
    var base = SERVER;
    return window.fetch(base + path, init).then(function (res) {
      if (base === SERVER_NEW) heard = true;
      return res;
    }, function (err) {
      if (!TWIN || heard || base !== SERVER_NEW) throw err;
      SERVER = SERVER_OLD;
      return window.fetch(SERVER_OLD + path, init);
    });
  }

  function unreachable() {
    note("signal", W("cantReach"), W("signal"), [
      { text: W("tryAgain"), solid: true, go: function () { var c = app.code; app.code = ""; openGame(c); } }]);
  }

  /* the socket goes to whichever address the page's own calls settled on (every game starts with a call, /game/ or /new,
     so a blocked first address has already moved the page to the second by the time the socket opens) */
  function wsUrl() { return SERVER.replace(/^http/, "ws") + "/ws/" + app.code; }
  /* "lv1", and once this browser is in the game, its pass ("p.<pass>"): the server's brake on guessing
     codes then never stops it coming back, even when the whole campus behind one address is braked */
  function protocols() { return app.pass ? ["lv1", "p." + app.pass] : ["lv1"]; }
  function connect() {
    if (app.stopped) return;
    clearTimeout(app.timer);
    var ws;
    try { ws = new WebSocket(wsUrl(), protocols()); } catch (e) { retry(); return; }
    app.ws = ws;
    ws.onopen = function () {
      if (app.ws !== ws) return;
      app.tries = 0;
      app.everConnected = true;
      app.lastMsg = now();
      netNote("");
      hello();
      clearInterval(app.beat);
      app.beat = setInterval(function () {
        if (app.ws !== ws || ws.readyState !== 1) return;
        if (now() - app.lastMsg > 70000) { try { ws.close(); } catch (e) { /* gone */ } return; }
        try { ws.send('{"t":"ping"}'); } catch (e) { /* the close handler follows */ }
      }, 25000);
    };
    ws.onmessage = function (e) {
      if (app.ws !== ws) return;
      app.lastMsg = now();
      var m;
      try { m = JSON.parse(e.data); } catch (x) { return; }
      if (m && m.t) onMsg(m);
    };
    ws.onclose = function (e) {
      if (app.ws !== ws) return;
      app.ws = null;
      clearInterval(app.beat);
      if (e && e.code === 4003) { elsewhere(); return; }      // this player came in on another screen: never fight it
      if (!app.stopped) retry();
    };
  }
  /* The server keeps one screen per player: the newest. This one stays quiet until asked back. */
  function elsewhere() {
    var c = app.code;
    note("signal", W("elsewhere"), "", [
      { text: W("playHere"), solid: true, go: function () { app.code = ""; openGame(c); } }]);
  }
  function retry() {
    if (app.stopped) return;
    app.tries++;
    if (!app.everConnected && app.tries >= 4) { unreachable(); return; }
    if (app.tries >= 2) netNote(app.tries >= 6 ? W("noConnection") : W("reconnecting"));
    clearTimeout(app.timer);
    app.timer = setTimeout(connect, Math.min(8000, 400 * Math.pow(2, app.tries)));
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible" || app.stopped) return;
    if (!app.ws || app.ws.readyState > 1) { app.tries = 0; connect(); }
    if (app.role === "host") wake();
  });
  function send(o) {
    if (!app.ws || app.ws.readyState !== 1) return false;
    try { app.ws.send(JSON.stringify(o)); return true; } catch (e) { return false; }
  }
  /* the answer fields of a question's kind: a number (g), a choice (c) or typed words (x) */
  /* Typed words as the server keeps them (kit.js cleanText), so the answer it confirms is the one on screen:
     no control or direction marks, NFC, no zero-width space or byte order mark, one space between words,
     trimmed, and never longer than the server takes (60). */
  function cleanTyped(s) {
    s = String(s === undefined || s === null ? "" : s).replace(/[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g, "")
      .normalize("NFC").replace(/[\u200B\uFEFF]/g, "").replace(/\s+/g, " ").trim();
    while (s.length > 60) s = Array.from(s).slice(0, -1).join("").trim();
    return s;
  }
  function ansFields(type, a) {
    if (type === "mc" || type === "tf") return { c: a.c };
    if (type === "tx") return { x: a.x };
    return { g: a.g };
  }
  function hello() {
    /* kt: this page knows a made game's kinds of question (a made game turns an older page away) */
    var m = { t: "hello", v: PROTO, role: app.role, key: app.key, kt: 1 };
    if (app.role === "host" && app.pkey) m.pkey = app.pkey;
    var p = sget("ans:" + app.code);
    if (p && p.k) m.ans = Object.assign({ k: p.k, n: p.n }, ansFields(p.type || "num", p));
    send(m);
  }

  /* the host's screen stays awake */
  var lock = null;
  function wake() {
    try {
      if (!lock && window.navigator.wakeLock && document.visibilityState === "visible") {
        window.navigator.wakeLock.request("screen").then(function (l) { lock = l; l.addEventListener("release", function () { lock = null; }); }, function () { /* not allowed: fine */ });
      }
    } catch (e) { /* an old browser */ }
  }
  function releaseWake() { try { if (lock) lock.release(); } catch (e) { /* gone */ } lock = null; }

  /* ================================================================ messages */
  function onMsg(m) {
    var s = app.state;
    switch (m.t) {
      case "state":
        if (m.v !== PROTO) { oldPage(m.v); return; }
        app.state = m;
        if (m.g && m.g.kit && lookChanged(m.g)) { setLook(madeFrom(m.g)); joinPrivacyFor(); }
        if (m.pass && m.pass !== app.pass) keepPass(m.pass);
        if (app.role === "host" && app.playing && !m.you && !app.joining) {
          app.joining = true;
          send(app.name ? { t: "join", name: app.name } : { t: "join", pick: true });
        }
        if (app.role === "player" && !m.you) { app.info = Object.assign({}, app.info || {}, { title: m.g.title, np: m.np, ph: m.ph, closed: m.g.closed, teams: m.g.teams, picked: m.g.picked }); joinInfo(); return; }
        if (m.ph === "question" && app.q && app.q.final && m.q && m.q.k === app.q.k &&
            !(m.you && m.you.ans && sameAns(m.you.ans, app.q))) sendSoon(250);   // an answer the server does not have yet
        if (m.you && app.role === "player") {
          var rec = sget("p:" + app.code) || { key: app.key };
          if (!rec.joined) { rec.joined = 1; rec.t = now(); sset("p:" + app.code, rec); TO.count("live/joined"); }
        }
        render();
        return;
      case "lobby":
        if (!s) return;
        s.np = m.np;
        if (s.ph === "lobby") { s.lobby = { names: m.names, ids: m.ids, hosts: m.hosts, more: m.more }; lobbyUpdate(); }
        countsUpdate();
        hostStrip(s);
        return;
      case "cnt":
        if (!s || !s.q || m.k !== s.q.k) return;
        s.cnt = { in: m.in, of: m.of };
        s.np = m.of;
        countsUpdate();
        hostStrip(s);
        return;
      case "got":
        if (!s || !s.q || m.k !== s.q.k) return;
        app.sent = { k: m.k, g: m.g, c: m.c, x: m.x, n: m.n, r: m.r };
        sset("ans:" + app.code, Object.assign({ k: m.k, n: m.n, type: s.q.type || "num", t: now() }, ansFields(s.q.type || "num", m)));
        sentUpdate();
        return;
      case "ticks":
        if (!s || s.ph !== "check" || !s.chk || m.k !== s.chk.k || !Array.isArray(m.ok)) return;
        s.chk.groups.forEach(function (g, i) { g[3] = m.ok[i] ? 1 : 0; });
        checkUpdate();
        hostStrip(s);
        return;
      case "players":
        playersList(m.ps);
        return;
      case "over":
        gameOver(m.why);
        return;
      case "err":
        onErr(m);
        return;
    }
  }
  function onErr(m) {
    if (m.e === "old") { oldPage(m.v); return; }
    if (m.e === "removed") {
      forget();
      note("lost", W("removed"), "", [{ text: W("back"), href: "./" }], true);
      return;
    }
    if (m.e === "host") {                    // this browser's host key no longer fits: play as anyone would
      sdel("host:" + app.code);
      var c = app.code; app.code = ""; openGame(c);
      return;
    }
    if (m.e === "name") {
      /* the host's own name refused: the host plays under a picked one (the lobby marks it "(you)") */
      if (app.role === "host" && app.playing && !(app.state && app.state.you)) { send({ t: "join", pick: true }); return; }
      joinErr(W("anotherName"));
      return;
    }
    if (m.e === "closed") { joinErr(W("closedNew")); return; }
    if (m.e === "full") { joinErr(W("full")); return; }
    if (m.e === "nobody") { hostSay(W("waitPlayer")); return; }
    if (m.e === "late" && app.state && app.state.q && m.k === app.state.q.k) { app.late = true; sentUpdate(); return; }
    if (m.e === "bad" && app.q && !app.alone && m.k === app.q.k && !app.sent) {
      /* the server did not take this answer: it opens again, never left "Sending…" for ever */
      app.q.final = false;
      sdel("ans:" + app.code);
      drawAnswer();
      var st = $("q-status");
      if (st) st.textContent = W("notTaken");
      return;
    }
    if (m.e === "who") {                    // the server did not know this phone yet: send again, once per question
      if (app.q && app.whoK !== app.q.k) { app.whoK = app.q.k; sendSoon(600); }
      return;
    }
  }
  /* the pass this game gave this browser, kept with the game's record: a reload comes back with it too */
  function keepPass(pass) {
    app.pass = pass;
    var k = (app.role === "host" ? "host:" : "p:") + app.code, rec = sget(k);
    if (rec) { rec.pass = pass; sset(k, rec); }
  }
  function oldPage(v) {
    if (v && v > PROTO) note("signal", W("updated"), W("reloadToPlay"), [{ text: W("reload"), solid: true, go: function () { window.location.reload(); } }]);
    else note("signal", W("updating"), W("tryFewMin"), [{ text: W("tryAgain"), solid: true, go: function () { window.location.reload(); } }]);
  }
  function forget() {
    sdel("host:" + app.code);
    sdel("p:" + app.code);
    sdel("ans:" + app.code);
  }
  function gameOver(why) {
    var s = app.state;
    var hosting = app.role === "host";
    forget();
    stopGame();
    if (why === "stopped") {                 // Logicers stopped the saved game this game came from
      note("stop", W("stoppedGame"), W("stoppedP"), [{ text: W("back"), href: "./" }], true);
      return;
    }
    if (hosting && app.newGame) { app.newGame = false; app.code = ""; window.location.hash = "host"; return; }
    if (s && s.ph === "end" && !$("v-game").hidden) {
      var line = document.createElement("p");
      line.className = "live-small";
      line.style.textAlign = "center";
      line.textContent = W("overLine");
      $("v-game").appendChild(line);
      return;
    }
    note("done", W("over"), "", [{ text: W("hostAGame"), solid: true, href: "#host" }], true);
  }

  /* ================================================================ joining (a player) */
  function joinView() {
    $("j-code").innerHTML = app.code.split("").map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("");
    $("j-game").innerHTML = '<b>How Sure?</b><small>…</small>';
    $("j-err").hidden = true;
    $("j-name").value = "";
    $("j-form").hidden = false;
    $("j-go-picked").hidden = true;
    $("j-made").innerHTML = "";
    joinWords();
    joinPrivacyFor();
    show("v-join");
  }
  function joinWords() {
    $("j-play").textContent = made ? W("play") : "Play live";
    $("j-go").textContent = W("join");
    $("j-go-picked").textContent = W("join");
    $("j-pick").textContent = W("pickName");
  }
  function joinInfo() {
    var i = app.info;
    if (!i || (app.state && app.state.you)) return;
    if ($("v-join").hidden) show("v-join");
    joinWords();
    var title = made ? esc(i.title) : "How Sure?";
    var line = made ? "" : esc(i.title);
    $("j-game").innerHTML = '<b dir="auto">' + title + '</b><small>' + line + '<span class="live-gc-n">' + ICON.person + esc(i.np) + "</span></small>";
    $("j-made").innerHTML = made ? madeLine(false) : "";
    $("j-namelabel").textContent = i.teams ? W("teamName") : W("yourName");
    $("j-name").placeholder = i.teams ? W("teamPh") : W("namePh");
    $("j-form").hidden = !!i.picked;
    $("j-go-picked").hidden = !i.picked;
    $("j-meta").textContent = i.teams ? W("joinTeam") : W("joinMeta");
    if (i.closed) joinErr(W("closedNew"));
  }
  function joinErr(t) {
    var e = $("j-err");
    e.textContent = t;
    e.hidden = !t;
    app.joinWait = false;
  }
  function join(o) {
    if (app.joinWait) return;
    joinErr("");
    if (!send(o)) { joinErr(W("connectingTry")); return; }
    app.joinWait = true;
    setTimeout(function () { app.joinWait = false; }, 4000);
  }
  $("j-go").addEventListener("click", function () {
    var n = $("j-name").value.replace(/\s+/g, " ").trim();
    if (!n) { joinErr(app.info && app.info.teams ? W("typeTeam") : W("typeName")); $("j-name").focus(); return; }
    join({ t: "join", name: n });
  });
  $("j-name").addEventListener("keydown", function (e) { if (e.key === "Enter") $("j-go").click(); });
  $("j-pick").addEventListener("click", function () { join({ t: "join", pick: true }); });
  $("j-go-picked").addEventListener("click", function () { join({ t: "join", pick: true }); });

  /* ================================================================ drawing the game */
  function isDisplay() { return app.role === "host" && !app.playing; }
  function isBig() { return isDisplay() && window.innerWidth >= 860; }
  var resizeT = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {         // only a change of look draws again: a slider in use is never reset
      if (app.state && !$("v-game").hidden && isBig() !== document.body.classList.contains("live-big")) { app.screen = ""; render(); }
    }, 200);
  });

  function render() {
    var s = app.state;
    if (!s || app.stopped) return;
    if ($("v-game").hidden) show("v-game");
    var big = isBig();
    document.body.classList.toggle("live-big", big);
    var key = [s.ph, s.q ? s.q.k : "", isDisplay() ? "d" : "p", s.you ? "y" : "n", big ? "B" : "", s.g.round].join("|");
    if (key !== app.screen) {
      app.screen = key;
      app.late = false;
      if (s.ph !== "end") { $("after").innerHTML = ""; dropBar(); }
      TO.closeDialog($("dlg-send"));      // a card left open belongs to the screen that has gone
      var v = $("v-game");
      if (s.ph === "lobby") v.innerHTML = (isDisplay() || app.role === "host") ? lobbyHost(s) : lobbyPlayer(s);
      else if (s.ph === "question") { v.innerHTML = isDisplay() ? questionDisplay(s) : questionPlayer(s); if (!isDisplay()) wireQuestion(s); timerStart(s); countsUpdate(); }
      else if (s.ph === "check") { v.innerHTML = app.role === "host" ? checkHost(s) : checkPlayer(s); if (app.role === "host") wireCheck(); }
      else if (s.ph === "reveal") v.innerHTML = (s.you && !isDisplay()) ? revealPlayer(s) : revealDisplay(s);
      else if (s.ph === "standings") v.innerHTML = standings(s);
      else if (s.ph === "end") { v.innerHTML = (s.you && !isDisplay()) ? endPlayer(s) : endDisplay(s); endHooks(s); }
      if (s.ph === "lobby") { wireLobby(s); lobbyUpdate(); }
      if (s.ph !== "question") clearInterval(app.tick);
      window.scrollTo(0, 0);
    } else {
      lobbyUpdate();
      countsUpdate();
      if (s.ph === "check" && app.role === "host") checkUpdate();
    }
    if (app.role === "host") {
      wake();
      if (s.ph === "end" && app.finishedRound !== s.g.round) {
        app.finishedRound = s.g.round;
        TO.count("live/finished");
        TO.count("live/size-" + (s.np < 10 ? "1-9" : s.np < 30 ? "10-29" : s.np < 100 ? "30-99" : "100-plus"));
      }
    }
    app.lastPh = s.ph;
    hostStrip(s);
  }

  /* the line at the top: the game's name (How Sure?, or a made game's own title) and where it stands */
  function gameName(s) { return made && s && s.g ? esc(s.g.title) : "How Sure?"; }
  function topLine(s, what) {
    var right = "";
    if (s.ph === "question") {
      right = '<span class="hs-count" id="q-count">' + ICON.person + "<span></span></span>";
      if (s.q.left) right += '<svg class="hs-timer" id="q-timer" viewBox="0 0 40 40" aria-hidden="true"><circle class="ls-tint" cx="20" cy="20" r="16" fill="none" stroke-width="5"/><circle class="ls-c" id="q-ring" cx="20" cy="20" r="16" fill="none" stroke-width="5" stroke-linecap="round" stroke-dasharray="100.5" transform="rotate(-90 20 20)"/><text class="lf-c" id="q-secs" x="20" y="24.5" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="12"></text></svg>';
    }
    return '<div class="hs-top"><p class="meta"><b dir="auto"' + (made ? ' class="hs-ttl"' : "") + ">" + gameName(s) + "</b> " + what + '</p><span style="display:inline-flex;align-items:center;gap:10px">' + right + "</span></div>";
  }
  function qWhat(s) { return s.q.i === 0 ? esc(W("practice")) : esc(W("qOf", s.q.i, s.q.of)); }

  /* ---- the lobby ---- */
  /* The link players scan or receive: the code and, after it, the game's pass (the server gives it to the host
     and to every phone that joined). With the pass, a phone gets in even when a prankster's sweep of wrong
     codes has braked the whole campus behind one address (worker.js): the pass proves it was invited, and
     nobody makes one without being in the game. Typed codes carry no pass, so the brake still stops sweeps. */
  function joinUrl() {
    var tail = app.code + (app.pass ? "." + app.pass : "");
    return LOCAL ? window.location.origin + window.location.pathname + "#" + tail : "https://" + SITE + "/live/#" + tail;
  }
  function qrSvg(text, label) {
    if (!QRG) return "";
    try {
      var q = QRG.QrCode.encodeText(text, QRG.QrCode.Ecc.MEDIUM), d = "", n = q.size;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (q.getModule(x, y)) d += "M" + (x + 2) + " " + (y + 2) + "h1v1h-1z";
      return '<svg viewBox="0 0 ' + (n + 4) + " " + (n + 4) + '" role="img" aria-label="' + esc(label || W("qrJoin")) + '"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#15172B"/></svg>';
    } catch (e) { return ""; }
  }
  function codeBoxes() { return '<div class="live-codeshow">' + app.code.split("").map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("") + "</div>"; }
  /* the lobby's pictures: How Sure?'s three rules, or a made game's levels of sure */
  function lobbyRules() { return made ? (made.sure !== false ? levelsHtml() : "") : '<div class="live-rules" style="margin-top:0">' + rulesHtml() + "</div>"; }
  function lobbyHost(s) {
    var players = '<div class="live-card"><p class="hs-players" id="l-count"></p><div class="hs-chips" id="l-chips"></div></div>';
    var sendLink = '<div class="hs-send"><button class="btn ghost" type="button" id="l-send">' + ICON.share + "<span>" + esc(W("sendLink")) + "</span></button></div>";
    if (isBig()) {
      return '<div class="hs-bigrow"><div>' +
        '<h1 class="live-title" style="margin-top:12px" dir="auto">' + gameName(s) + "</h1>" +
        (made ? madeLine(false) + (made.sure !== false ? levelsHtml() : "")
              : '<p class="live-tag">' + esc(s.g.title) + ' · Guess the number. Pick your net.</p><div class="live-rules">' + rulesHtml() + "</div>") +
        '<div class="live-card" style="margin-top:18px"><p class="hs-joinat">' + esc(W("joinOnPhone")) + '</p><p class="hs-bigurl">' + SITE + '</p><p class="hs-joinat" style="margin-top:8px">' + esc(W("withCode")) + '</p><p class="hs-bigcode">' + esc(app.code) + "</p></div>" +
        '</div><div><div class="live-card"><div class="hs-qr" data-join="' + esc(joinUrl()) + '">' + qrSvg(joinUrl()) + "<p>" + WH("orScanH") + "</p></div>" + sendLink + "</div>" + players + "</div></div>";
    }
    return topLine(s, made ? "" : esc(s.g.title)) +
      '<div class="live-card" style="text-align:center"><p class="hs-joinat">' + WH("joinAtH", SITE) + "</p>" + codeBoxes() +
      '<div class="hs-qr" data-join="' + esc(joinUrl()) + '">' + qrSvg(joinUrl()) + "<p>" + WH("orScanH") + "</p></div>" + sendLink + "</div>" + players +
      (s.you ? "" : (made ? (made.sure !== false ? '<div class="live-card">' + levelsHtml() + "</div>" : "") : '<div class="live-card"><div class="live-rules" style="margin-top:0">' + rulesHtml() + "</div></div>")) +
      (made ? madeLine(false) : "");
  }
  function lobbyPlayer(s) {
    return topLine(s, made ? "" : esc(s.g.title)) +
      '<div class="live-card"><div class="hs-in">' + ICON.youIn + '<div><b>' + esc(W("youreIn")) + '</b><span dir="auto">' + esc(s.you ? s.you.name : "") + "</span></div></div>" +
      (made ? (made.sure !== false ? levelsHtml() : "") : '<div class="live-rules">' + rulesHtml() + "</div>") +
      '<div class="hs-waiting"><span>' + esc(W("waitingHost")) + ' <span class="hs-dots"><i></i><i></i><i></i></span></span><span class="hs-count">' + ICON.person + '<span id="l-np"></span></span></div></div>' +
      '<div class="live-card"><div class="hs-chips" id="l-chips"></div></div>' + (made ? madeLine(false) : "");
  }
  function wireLobby() {
    var b = $("l-send");
    if (b) b.addEventListener("click", function () {
      var url = joinUrl();
      var nav = window.navigator;
      if (nav.share) {
        nav.share({ title: made ? made.title : "How Sure?", text: made ? W("shareText", app.code) : "Play How Sure? with us: code " + app.code, url: url }).then(function () {}, function () {});
      } else {
        TO.copyText(url).then(function () { b.querySelector("span").textContent = W("linkCopied"); setTimeout(function () { b.querySelector("span").textContent = W("sendLink"); }, 2200); });
      }
    });
  }
  function lobbyUpdate() {
    var s = app.state;
    if (!s || s.ph !== "lobby" || !s.lobby) return;
    var chips = $("l-chips");
    if (chips) {
      var me = s.you ? s.you.name : null;
      chips.innerHTML = s.lobby.names.map(function (n) { return '<span dir="auto"' + (n === me ? ' class="me"' : "") + ">" + esc(n) + (n === me ? " " + esc(W("youParen")) : "") + "</span>"; }).join("") +
        (s.lobby.more ? '<span class="more">+' + s.lobby.more + "</span>" : "") +
        (s.np ? "" : '<p class="hs-empty">' + esc(W("nobodyYet")) + "</p>");
    }
    var c = $("l-count");
    if (c) c.textContent = WN("playersIn", s.np);
    var np = $("l-np");
    if (np) np.textContent = s.np;
  }

  /* ---- a question, on a phone (also the play-alone page's) ---- */
  function scaleNetHtml() {
    return '<div class="hs-track"></div><div class="hs-netwrap"><div class="hs-net" id="q-net"></div></div><div class="hs-needle" id="q-needle"></div><div class="hs-handle" id="q-handle"></div>';
  }
  function sureOn() { return !made || made.sure !== false; }
  /* How sure?, for a question with no slider: three levels with their dots and points */
  function sureRow() {
    if (!sureOn()) return "";
    return '<p class="hs-surelab" id="q-surelab">' + esc(W("howSure")) + '</p><div class="hs-sure" role="radiogroup" aria-labelledby="q-surelab">' + LEVELS.map(function (n) {
      return '<button class="hs-surebtn" type="button" role="radio" data-n="' + n + '" aria-checked="false">' + dots(n) + "<b>" + esc(W(SURE_KEY[n])) + "</b><span>" + esc(W("orPts", R.POINTS[n][0], R.POINTS[n][1])) + "</span></button>";
    }).join("") + "</div>";
  }
  function tfWord(c) { return W(c === 0 ? "true" : "false"); }
  /* the body of a question card: the kind's own answer, then (for a made game) How sure? */
  function questionBody(q) {
    var type = q.type || "num";
    if (type === "mc" || type === "tf") {
      var opts = type === "tf" ? [W("true"), W("false")] : q.o;
      return '<div class="hs-choices' + (type === "tf" ? " hs-tf" : "") + '" role="radiogroup" aria-label="' + esc(W("yourAnswerAria")) + '">' + opts.map(function (o, i) {
        return '<button class="hs-choice" type="button" role="radio" data-c="' + i + '" aria-checked="false">' + (type === "mc" ? "<i>" + LETTERS[i] + "</i>" : "") + '<span dir="auto">' + esc(o) + "</span></button>";
      }).join("") + "</div>" + sureRow();
    }
    if (type === "tx") {
      return '<input class="hs-typein" id="q-typed" type="text" maxlength="60" dir="auto" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(W("typeAnswer")) + '" aria-label="' + esc(W("yourAnswerAria")) + '">' + sureRow();
    }
    return '<div class="hs-guess untouched" id="q-guess"><button class="hs-step" type="button" data-d="-1" aria-label="' + esc(W("less")) + '">' + STEP_MINUS + '</button><b id="q-val"></b><button class="hs-step" type="button" data-d="1" aria-label="' + esc(W("more")) + '">' + STEP_PLUS + '</button></div>' +
      '<div class="hs-scale untouched" id="q-scale" role="slider" tabindex="0" aria-label="' + esc(W("yourGuess")) + '" aria-valuemin="' + q.lo + '" aria-valuemax="' + q.hi + '">' + scaleNetHtml() + "</div>" +
      '<div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(fmt(q, q.hi)) + "</span></div>" +
      (sureOn() ? '<div class="hs-netsrow" role="radiogroup" aria-label="' + esc(W("yourNet")) + '">' +
      ["s", "m", "b"].map(function (n) {
        return '<button class="hs-netbtn" type="button" role="radio" data-n="' + n + '" aria-checked="false">' + netIcon(n) + "<b>" + esc(netWord(n)) + "</b><span>" + esc(W("orPts", R.POINTS[n][0], R.POINTS[n][1])) + "</span></button>";
      }).join("") + "</div>" : "");
  }
  function questionPlayer(s) {
    var q = s.q;
    return topLine(s, qWhat(s)) +
      '<div class="live-card">' + (q.i === 0 ? '<span class="hs-practice">' + esc(W("practiceNoPts")) + "</span>" : "") +
      '<p class="hs-q" id="q-text" dir="auto">' + esc(q.t) + "</p>" + questionBody(q) +
      '<button class="btn solid hs-sendbtn" type="button" id="q-send" disabled>' + esc(W("send")) + "</button>" +
      '<p class="hs-status" id="q-status"></p></div>';
  }
  /* an answer the server has (or the page kept) is the same as the one on screen */
  function sameAns(x, a) {
    if (!x || !a || x.n !== a.n) return false;
    var type = a.type || "num";
    if (type === "mc" || type === "tf") return x.c === a.c;
    if (type === "tx") return cleanTyped(x.x) === cleanTyped(a.x);
    return x.g === a.g;
  }
  /* A guess goes to the server only when the player says so: Send, then the card in the middle (Send or
     Edit). A sent answer is final, so the host's count means "answered" (Khayyam, 14 Oct 2026). Only when a
     timer runs out does an answer that was given but not sent go by itself, as it stands. On the page of a
     game played alone, the same card says Next, and the answer stays on this phone until the end. */
  function wireQuestion(s, alone) {
    var q = s.q, type = q.type || "num";
    app.q = { q: q, k: q.k, type: type, g: type === "num" ? R.round(q, R.val(q, 0.5)) : null, c: null, x: "", n: "m", touched: false, final: false, sendT: null };
    app.sent = null;
    TO.closeDialog($("dlg-send"));
    if (!alone) {
      var mine = s.you && s.you.ans;
      var kept = sget("ans:" + app.code);
      if (mine) { takeAns(mine); app.q.final = true; app.sent = Object.assign({ k: q.k }, mine); }
      else if (kept && kept.k === q.k) { takeAns(kept); app.q.final = true; sendSoon(250); }   // sent, and lost on the way
      if (!kept || kept.k !== q.k) sdel("ans:" + app.code);
    }
    if (type === "num") wireSlider(q);
    else if (type === "mc" || type === "tf") {
      each(document.querySelectorAll(".hs-choice"), function (b) {
        b.addEventListener("click", function () {
          if (frozen()) return;
          app.q.c = +b.getAttribute("data-c");
          app.q.touched = true;
          drawAnswer();
        });
      });
    } else {
      var t = $("q-typed");
      if (app.q.x) t.value = app.q.x;
      t.addEventListener("input", function () {
        if (frozen()) { t.value = app.q.x; return; }
        app.q.x = t.value;
        app.q.touched = !!R.fold(cleanTyped(t.value), true);
        drawAnswer();
      });
      t.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); $("q-send").click(); } });
    }
    each(document.querySelectorAll(".hs-surebtn, .hs-netbtn"), function (b) {
      b.addEventListener("click", function () {
        if (frozen()) return;
        app.q.n = b.getAttribute("data-n");
        if (type === "num") app.q.touched = true;
        drawAnswer();
      });
    });
    $("q-send").addEventListener("click", function () {
      if (frozen() || !app.q.touched || !typedReady(app.q)) return;
      if (alone) kitNext(false); else sendCard();
    });
    drawAnswer();
    countsUpdate();
    sentUpdate();
  }
  /* an answer kept or sent before, back on screen */
  function takeAns(a) {
    var x = app.q;
    x.n = a.n || "m";
    if (x.type === "mc" || x.type === "tf") x.c = a.c;
    else if (x.type === "tx") x.x = a.x || "";
    else x.g = a.g;
    x.touched = true;
  }
  function wireSlider(q) {
    var scale = $("q-scale");
    var dragging = false;
    function fromX(x) {
      var r = scale.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (x - r.left) / r.width));
      setGuess(R.round(q, R.val(q, p)));
    }
    scale.addEventListener("pointerdown", function (e) {
      if (frozen()) return;
      dragging = true;
      try { scale.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
      fromX(e.clientX);
    });
    scale.addEventListener("pointermove", function (e) { if (dragging) fromX(e.clientX); });
    function up() { if (!dragging) return; dragging = false; }
    scale.addEventListener("pointerup", up);
    scale.addEventListener("pointercancel", up);
    scale.addEventListener("keydown", function (e) {
      if (frozen()) return;
      var g = app.q.g, k = e.key;
      if (k === "ArrowLeft" || k === "ArrowDown") g = R.nudge(q, g, -1);
      else if (k === "ArrowRight" || k === "ArrowUp") g = R.nudge(q, g, 1);
      else if (k === "PageDown") g = R.round(q, R.val(q, Math.max(0, R.pos(q, g) - 0.1)));
      else if (k === "PageUp") g = R.round(q, R.val(q, Math.min(1, R.pos(q, g) + 0.1)));
      else if (k === "Home") g = q.lo;
      else if (k === "End") g = q.hi;
      else return;
      e.preventDefault();
      setGuess(g);
    });
    each(document.querySelectorAll(".hs-step"), function (b) {
      b.addEventListener("click", function () {
        if (frozen()) return;
        setGuess(R.nudge(q, app.q.g, +b.getAttribute("data-d")));
      });
    });
  }
  /* closed: the question takes no more answers. frozen: this phone's answer can no longer change */
  function closed() { return !app.q || (!app.alone && (app.late || (app.deadline && now() > app.deadline))); }
  function frozen() { return closed() || app.q.final; }
  function setGuess(g) {
    app.q.g = g;
    app.q.touched = true;
    drawAnswer();
  }
  /* the answer, as the card in the middle shows it: the guess and its net, the choice, the words */
  function answerShown(a) {
    var q = a.q;
    if (a.type === "num") {
      var r = R.net(q, a.g, a.n);
      return '<b class="hs-confirm-val">' + esc(fmt(q, a.g)) + (q.u ? "<small>" + esc(q.u) + "</small>" : "") + "</b>" +
        '<span class="hs-confirm-net">' + netIcon(a.n) + "<b>" + esc(netWord(a.n)) + "</b> " + esc(W("rangeTo", fmt(q, r[0]), withUnit(q, r[1]))) + "</span>";
    }
    var txt = a.type === "tx" ? a.x : a.type === "tf" ? tfWord(a.c) : q.o[a.c];
    return '<b class="hs-confirm-val hs-confirm-txt" dir="auto">' + (a.type === "mc" ? '<i class="hs-letter">' + LETTERS[a.c] + "</i>" : "") + esc(String(txt).trim()) + "</b>" +
      (sureOn() ? '<span class="hs-confirm-net">' + dots(a.n) + "<b>" + esc(W(SURE_KEY[a.n])) + "</b> " + esc(W("orPts", R.POINTS[a.n][0], R.POINTS[a.n][1])) + "</span>" : "");
  }
  /* the card in the middle: the answer as it will go, Send or Edit */
  function sendCard() {
    $("send-ans").innerHTML = answerShown(app.q);
    TO.openDialog($("dlg-send"));
    $("send-go").focus();
  }
  $("send-edit").addEventListener("click", function () { TO.closeDialog($("dlg-send")); });
  $("send-go").addEventListener("click", function () { TO.closeDialog($("dlg-send")); sendFinal(); });
  /* the typed words as they will go; false when nothing is left of them */
  function typedReady(a) {
    if (a.type !== "tx") return true;
    a.x = cleanTyped(a.x);
    var t = $("q-typed");
    if (t) t.value = a.x;
    if (R.fold(a.x, true)) return true;
    a.touched = false;
    drawAnswer();
    return false;
  }
  function sendFinal() {
    var a = app.q;
    if (!a || a.final || closed() || !typedReady(a)) return;
    a.final = true;
    drawAnswer();
    sendSoon(0);
  }
  function drawAnswer() {
    var a = app.q;
    if (!a) return;
    if (a.type === "num") { drawGuess(); return; }
    each(document.querySelectorAll(".hs-choice"), function (b) { b.setAttribute("aria-checked", String(+b.getAttribute("data-c") === a.c)); });
    each(document.querySelectorAll(".hs-surebtn"), function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-n") === a.n)); });
    var t = $("q-typed");
    if (t) t.readOnly = frozen();
    lockSend();
  }
  function lockSend() {
    var a = app.q, sb = $("q-send");
    if (sb) { sb.disabled = !a.touched || frozen(); sb.hidden = a.final; }
    var card = sb && sb.closest(".live-card");
    if (card) card.classList.toggle("hs-locked", a.final);
    sentUpdate();
  }
  function drawGuess() {
    var a = app.q, q = a.q;
    if (!$("q-val")) return;
    var r = R.net(q, a.g, a.n), p = R.pos(q, a.g) * 100;
    $("q-val").innerHTML = esc(fmt(q, a.g)) + (q.u ? "<small>" + esc(q.u) + "</small>" : "");
    $("q-guess").classList.toggle("untouched", !a.touched);
    var scale = $("q-scale");
    scale.classList.toggle("untouched", !a.touched);
    scale.setAttribute("aria-valuenow", a.g);
    scale.setAttribute("aria-valuetext", withUnit(q, a.g));
    $("q-needle").style.left = p + "%";
    $("q-handle").style.left = p + "%";
    var net = $("q-net"), l = R.pos(q, r[0]) * 100, w = R.pos(q, r[1]) * 100 - l;
    net.style.left = l + "%";
    net.style.width = Math.max(w, 0.8) + "%";
    each(document.querySelectorAll(".hs-netbtn"), function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-n") === a.n)); });
    lockSend();
  }
  function sendSoon(ms) {
    var a = app.q;
    if (!a || app.alone) return;
    clearTimeout(a.sendT);
    /* answers go at least 0.4 s apart, the last one winning: the server ignores a connection's 31st
       message in 10 seconds, so a thumb tapping the nets must never cost the answer it ends on */
    var wait = Math.max(ms, app.sentAt + 400 - now());
    a.sendT = setTimeout(function () {
      if (!app.q || app.q !== a || !a.final || closed()) return;
      var msg = Object.assign({ t: "ans", k: a.k, n: a.n }, ansFields(a.type, a));
      sset("ans:" + app.code, Object.assign({ k: a.k, n: a.n, type: a.type, t: now() }, ansFields(a.type, a)));     // kept, so a phone that drops sends it again
      if (!send(msg)) { app.sent = null; sentUpdate("wait"); return; }
      app.sentAt = now();
      sentUpdate("sending");
    }, wait);
  }
  function sentUpdate(how) {
    var st = $("q-status");
    if (!st || !app.q) return;
    var a = app.q, s = app.sent, q = a.q;
    if (app.alone) { st.textContent = a.touched ? "" : hintFor(a.type); return; }
    if (s && s.k === a.k && sameAns(s, a)) {
      st.innerHTML = '<span class="ok">' + ICON.check + esc(W("sent")) + "</span>" +
        (a.type === "num" && s.r ? '<span class="hs-range">' + esc(W("rangeTo", fmt(q, s.r[0]), withUnit(q, s.r[1]))) + "</span>" : "");
      return;
    }
    if (app.late || (app.deadline && now() > app.deadline)) { st.textContent = W("timeUp"); return; }
    if (a.final) { st.textContent = how === "wait" ? W("connectingSend") : W("sending"); return; }
    st.textContent = a.touched ? "" : hintFor(a.type);
  }
  function hintFor(type) { return type === "num" ? W("slideToGuess") : type === "tx" ? W("typeAnswer") : W("pickAnswer"); }
  function countsUpdate() {
    var s = app.state;
    if (!s || s.ph !== "question" || !s.cnt) return;
    var c = $("q-count");
    if (c) c.querySelector("span").textContent = s.cnt.in + "/" + s.cnt.of;
    var bigc = $("q-bigcount");
    if (bigc) bigc.textContent = W("nOfM", s.cnt.in, s.cnt.of);
    var d = $("q-dots");
    if (d) d.innerHTML = dotRow(s.cnt.in, s.cnt.of);
  }
  function dotRow(n, of) {
    var k = Math.min(of, 60), on = Math.round(k * (of ? n / of : 0)), h = "";
    for (var i = 0; i < k; i++) h += i < on ? "<i></i>" : '<i class="wait"></i>';
    return h;
  }
  function timerStart(s) {
    clearInterval(app.tick);
    app.deadline = s.q.left ? now() + s.q.left : 0;
    if (!app.deadline) return;
    function tick() {
      var left = Math.max(0, app.deadline - now()), total = (s.g.timer || 60) * 1000;
      var ring = $("q-ring"), secs = $("q-secs");
      if (ring) ring.setAttribute("stroke-dashoffset", String(100.5 * (1 - left / total)));
      if (secs) secs.textContent = String(Math.ceil(left / 1000));
      /* the time is nearly up: an answer that was given and never sent goes as it stands (the server allows
         a moment past the end for answers in flight) */
      if (left <= 1200 && app.q && app.q.k === s.q.k && app.q.touched && !app.q.final) { TO.closeDialog($("dlg-send")); sendFinal(); }
      if (left <= 0) { clearInterval(app.tick); sentUpdate(); if (app.q) drawAnswer(); }
    }
    tick();
    app.tick = setInterval(tick, 250);
  }

  /* ---- a question, on the host's screen when the host is not playing ---- */
  function questionDisplay(s) {
    var q = s.q, type = q.type || "num", body;
    if (type === "mc" || type === "tf") {
      var opts = type === "tf" ? [W("true"), W("false")] : q.o;
      body = '<div class="hs-choices hs-shown' + (type === "tf" ? " hs-tf" : "") + '">' + opts.map(function (o, i) {
        return '<div class="hs-choice">' + (type === "mc" ? "<i>" + LETTERS[i] + "</i>" : "") + '<span dir="auto">' + esc(o) + "</span></div>";
      }).join("") + "</div>";
    } else if (type === "tx") body = '<p class="hs-typedhint">' + ICON.tx + "<span>" + esc(W("playersType")) + "</span></p>";
    else body = '<div class="hs-bigscale"><div class="hs-track"></div></div><div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(q.u ? fmt(q, q.hi) + " " + q.u : fmt(q, q.hi)) + "</span></div>";
    return topLine(s, qWhat(s)) +
      '<div class="live-card">' + (q.i === 0 ? '<span class="hs-practice">' + esc(W("practiceNoPts")) + "</span>" : "") +
      '<p class="hs-q" dir="auto">' + esc(q.t) + "</p>" + body + "</div>" +
      '<div class="live-card"><p class="hs-bigcount" id="q-bigcount"></p><p class="live-small" style="margin-top:2px">' + esc(W(type === "num" ? "answeredNets" : "answeredHidden")) + '</p><div class="hs-dotsrow" id="q-dots"></div></div>';
  }

  /* ---- the host's check of typed answers: each different answer once, the right ones ticked ---- */
  function checkPlayer(s) {
    var a = s.you && s.you.ans;
    return topLine(s, qWhat(s)) +
      '<div class="live-card"><p class="hs-q" dir="auto">' + esc(s.q.t) + "</p>" +
      (a ? '<p class="hs-mine-ans">' + esc(W("yourAnswer")) + ': <b dir="auto">' + esc(a.x || "") + "</b></p>" : "") +
      '<div class="hs-waiting"><span>' + esc(W("checking")) + ' <span class="hs-dots"><i></i><i></i><i></i></span></span></div></div>';
  }
  function checkHost(s) {
    return topLine(s, qWhat(s)) +
      '<div class="live-card"><h2 class="live-h">' + esc(W("whichRight")) + '</h2><p class="live-small" style="margin-top:4px" dir="auto">' + esc(s.q.t) + "</p>" +
      '<div class="hs-grade" id="c-list"></div><p class="live-small" id="c-more" hidden></p>' +
      '<p class="hs-waitnote">' + esc(W("playersSee")) + "</p></div>";
  }
  function checkUpdate() {
    var s = app.state, box = $("c-list");
    if (!s || !s.chk || !box) return;
    var shown = app.shown || (app.shown = {});
    box.innerHTML = s.chk.groups.map(function (g, i) {
      var hide = g[4] && !shown[s.chk.k + "|" + i];
      return '<div class="hs-grp' + (g[3] ? " ok" : "") + '"><span class="hs-grptxt" dir="auto">' + (hide ? '<span class="hs-masked" title="' + esc(W("hiddenWord")) + '">••••</span> <button class="hs-showbtn" type="button" data-show="' + i + '">' + esc(W("show")) + "</button>" : esc(g[0])) +
        (g[2] ? ' <small class="hs-listed">' + esc(W("onList")) + "</small>" : "") + "</span><small>" + g[1] + "</small>" +
        '<button class="hs-tick" type="button" aria-pressed="' + (g[3] ? "true" : "false") + '" data-tick="' + i + '" aria-label="' + esc(W("markRight", hide ? "••••" : g[0])) + '">' + ICON.check + "</button></div>";
    }).join("");
    var more = $("c-more");
    more.hidden = !s.chk.more;
    if (s.chk.more) more.textContent = WN("moreNotListed", s.chk.more);
  }
  function wireCheck() {
    checkUpdate();
    var box = $("c-list");
    if (!box) return;
    box.addEventListener("click", function (e) {
      var s = app.state, t = e.target.closest ? e.target.closest("[data-tick],[data-show]") : null;
      if (!t || !s || s.ph !== "check" || !s.chk) return;
      if (t.hasAttribute("data-show")) { (app.shown || (app.shown = {}))[s.chk.k + "|" + t.getAttribute("data-show")] = 1; checkUpdate(); return; }
      var i = +t.getAttribute("data-tick"), g = s.chk.groups[i];
      if (!g) return;
      g[3] = g[3] ? 0 : 1;                       // at once on this screen; the server's "ticks" confirms it to every host screen
      send({ t: "tick", k: s.chk.k, i: i, on: !!g[3] });
      checkUpdate();
      hostStrip(s);
    });
  }
  function rightSoFar(s) {
    var n = 0;
    (s.chk ? s.chk.groups : []).forEach(function (g) { if (g[3]) n += g[1]; });
    return n;
  }

  /* ---- the reveal ---- */
  function netBox(q, r, cls, extra) {
    var l = R.pos(q, r[0]) * 100, w = Math.max(R.pos(q, r[1]) * 100 - l, 0.6);
    return '<div class="hs-net ' + cls + '" style="left:' + l.toFixed(2) + "%;width:" + w.toFixed(2) + '%"' + (extra || "") + "></div>";
  }
  function rvPicture(s) {
    var q = s.q, rv = s.rv, at = R.pos(q, rv.a);
    var named = rv.nets && rv.nets.some(function (x) { return x.length > 4; });
    var h = '<div class="hs-rv' + (named ? " named" : "") + '" style="--at:' + at.toFixed(4) + '">';
    h += '<div class="hs-tagrow"><span class="hs-tag" style="left:' + (at * 100).toFixed(2) + '%">' + esc(fmt(q, rv.a)) + "</span></div>";
    h += '<div class="hs-rows">';
    if (rv.nets) {
      if (!rv.nets.length) h += '<p class="live-small" style="color:inherit;opacity:.85;margin:6px 0">' + esc(W("noNets")) + "</p>";
      rv.nets.forEach(function (x, i) {
        var mine = s.you && s.you.ri === i;
        h += '<div class="hs-row' + (mine ? " you" : "") + '"><span class="hs-nm" dir="auto">' + (named ? (mine ? esc(W("youName")) : esc(x[4])) : "") + '</span><div class="hs-sc">' + netBox(q, [x[0], x[1]], x[2] ? "hit" : "out") + "</div></div>";
      });
    } else if (rv.dens) {
      var mx = Math.max(1, Math.max.apply(null, rv.dens.h.concat(rv.dens.x)));
      var strip = function (arr, cls) { return '<div class="hs-dens ' + cls + '">' + arr.map(function (v) { return '<i style="opacity:' + (v ? (0.12 + 0.88 * v / mx).toFixed(2) : 0) + '"></i>'; }).join("") + "</div>"; };
      if (s.you && s.you.res) h += '<div class="hs-mine">' + netBox(q, s.you.res.r, s.you.res.hit ? "hit" : "out") + "</div>";
      h += strip(rv.dens.h, "hit") + strip(rv.dens.x, "out");
    }
    h += '<div class="hs-line"></div></div>';
    h += '<div class="hs-ends"><span>' + esc(fmt(q, q.lo)) + "</span><span>" + esc(fmt(q, q.hi)) + "</span></div>";
    if (rv.dens) h += '<div class="hs-denslabel"><span>' + (s.you && s.you.res ? esc(W("topYourNet")) : "") + '</span><span><i class="hs-sw hit"></i>' + esc(W("caughtW")) + ' <i class="hs-sw out"></i>' + esc(W("missedW")) + "</span></div>";
    h += "</div>";
    return h;
  }
  /* right (or caught) of tried, at each level: nets for a number, dots for anything else */
  function byChips(rv, type, style) {
    if (!sureOn()) return "";
    return '<div class="hs-by"' + (style ? ' style="' + style + '"' : "") + ">" + ["s", "m", "b"].map(function (n) {
      var num = (type || "num") === "num";
      return '<span title="' + esc(num ? W("netsCaughtTitle", netWord(n)) : W("levelRightTitle", W(SURE_KEY[n]))) + '"' + (style ? ' style="background:var(--card);box-shadow:var(--shadow)"' : "") + ">" +
        (num ? netIcon(n) : dots(n)) + rv.by[n][0] + "/" + rv.by[n][1] + "</span>";
    }).join("") + "</div>";
  }
  /* the line after the answer: Logicers' facts with their two sources, or a made game's own line and the
     link its host gave (shown with its site's name, and opened elsewhere) */
  function factCard(rv) {
    if (Array.isArray(rv.s) || !made) {
      var src = (rv.s || []).map(function (x) {
        var url = String(x[1] || "");
        return /^https:\/\//.test(url) ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(x[0]) + "</a>" : esc(x[0]);
      }).join(" · ");
      return '<div class="hs-fact">' + esc(rv.f) + '<p class="hs-src">Sources: ' + src + "</p></div>";
    }
    var link = "";
    if (typeof rv.s === "string" && /^https:\/\//.test(rv.s)) {
      var host = "";
      try { host = new URL(rv.s).hostname.replace(/^www\./, ""); } catch (e) { host = ""; }
      if (host) link = '<p class="hs-src">' + esc(W("sourceHost")) + ': <a href="' + esc(rv.s) + '" target="_blank" rel="noopener noreferrer nofollow ugc">' + esc(host) + "</a></p>";
    }
    if (!rv.f && !link) return "";
    return '<div class="hs-fact" dir="auto">' + esc(rv.f) + link + "</div>";
  }
  function youBar(s) {
    var y = s.you;
    if (!y || y.place === undefined) return "";
    return '<div class="hs-you"><span>' + WH("pointsH", y.pts) + "</span><span>" + WH("placeH", placeText(y), y.of) + "</span></div>";
  }
  /* the right answer of a question that is not a number, in words */
  function rightText(q, rv) {
    var type = q.type || "num";
    if (type === "mc") return q.o[rv.a];
    if (type === "tf") return tfWord(rv.a);
    if (type === "tx") return (rv.ok && rv.ok[0]) || (rv.top && rv.top[0] && rv.top[0][0]) || "—";
    return "";
  }
  /* a bar per answer (a choice), or per right answer given (typed): how many, the right ones white */
  function barsHtml(s) {
    var q = s.q, rv = s.rv, type = q.type, res = s.you && s.you.res, rows = [];
    if (type === "mc" || type === "tf") {
      var opts = type === "tf" ? [W("true"), W("false")] : q.o;
      opts.forEach(function (o, i) { rows.push({ t: o, n: rv.cnt[i] || 0, right: i === rv.a, mine: !!res && res.c === i, letter: type === "mc" ? LETTERS[i] : "" }); });
    } else {
      (rv.top || []).forEach(function (x) { rows.push({ t: x[0], n: x[1], right: true, mine: false }); });
      if (rv.other) rows.push({ t: WN("otherAnswers", rv.other), n: rv.other, right: false, mine: false, other: true });
    }
    var mx = Math.max(1, rv.total);
    return '<div class="hs-bars">' + rows.map(function (r) {
      return '<div class="hs-bar' + (r.right ? " hs-right" : "") + (r.other ? " hs-other" : "") + '"><em style="width:' + (100 * r.n / mx).toFixed(1) + '%"></em>' +
        '<span dir="auto">' + (r.letter ? "<i>" + r.letter + "</i>" : "") + esc(r.t) + (r.mine ? ' <span class="hs-youtag">' + esc(W("you")) + "</span>" : "") + "</span><b>" + r.n + "</b></div>";
    }).join("") + "</div>";
  }
  function revealPlayer(s) {
    var q = s.q, rv = s.rv, r = s.you.res, head, type = q.type || "num";
    if (type === "num") {
      if (!r) head = '<span class="hs-big">' + esc(W("noAnswer")) + "</span>";
      else if (r.hit) head = '<span class="hs-big">' + esc(W("caught")) + '</span><span class="hs-chip white">' + (rv.practice ? esc(W("practice")) : "+" + r.pts) + "</span>";
      else head = '<span class="hs-big">' + esc(W("missed")) + '</span><span class="hs-chip yellow">' + (rv.practice ? esc(W("practice")) : "+" + r.pts) + "</span>";
      return topLine(s, qWhat(s)) +
        '<section class="hs-panel"><div class="hs-head">' + head + '</div><p class="hs-answer"><span dir="auto">' + esc(q.t) + "</span> <b>" + esc(withUnit(q, rv.a)) + "</b></p>" +
        rvPicture(s) + byChips(rv, type) + "</section>" + factCard(rv) + (rv.practice ? "" : youBar(s));
    }
    if (!r) head = '<span class="hs-big">' + esc(W("noAnswer")) + "</span>";
    else if (r.hit) head = '<span class="hs-big">' + esc(W("right")) + '</span><span class="hs-chip white">+' + r.pts + "</span>";
    else head = '<span class="hs-big">' + esc(W("wrong")) + '</span><span class="hs-chip yellow">+' + r.pts + "</span>";
    return topLine(s, qWhat(s)) +
      '<section class="hs-panel"><div class="hs-head">' + head + '</div><p class="hs-answer"><span dir="auto">' + esc(q.t) + '</span> <b dir="auto">' + esc(rightText(q, rv)) + "</b></p>" +
      (type === "tx" && r ? '<p class="hs-answer">' + esc(W("yourAnswer")) + ': <b dir="auto">' + esc(r.x) + "</b></p>" : "") +
      barsHtml(s) + byChips(rv, type) + "</section>" + factCard(rv) + youBar(s);
  }
  function revealDisplay(s) {
    var q = s.q, rv = s.rv, type = q.type || "num", pic, side;
    if (type === "num") {
      pic = '<section class="hs-panel"><p class="hs-q" style="color:inherit;font-size:1.4rem" dir="auto">' + esc(q.t) + "</p>" + rvPicture(s) + "</section>";
      side = '<div><p class="hs-big" style="margin-top:14px;font-size:2.2rem">' + esc(W("netsCaughtIt", rv.hits, rv.total)) + "</p>" +
        byChips(rv, type, "color:var(--ink)") + factCard(rv) + "</div>";
    } else {
      pic = '<section class="hs-panel"><p class="hs-q" style="color:inherit;font-size:1.4rem" dir="auto">' + esc(q.t) + '</p><p class="hs-answer"><b dir="auto">' + esc(rightText(q, rv)) + "</b></p>" + barsHtml(s) + "</section>";
      side = '<div><p class="hs-big" style="margin-top:14px;font-size:2.2rem">' + esc(W("nRight", rv.hits, rv.total)) + "</p>" + byChips(rv, type, "color:var(--ink)") + factCard(rv) + "</div>";
    }
    if (isBig()) return topLine(s, qWhat(s)) + '<div class="hs-bigrow" style="grid-template-columns:1.5fr 1fr">' + pic + side + "</div>";
    return topLine(s, qWhat(s)) + pic + side;
  }

  /* ---- the standings ---- */
  function topList(list, meName) {
    return '<ol class="hs-list">' + (list || []).map(function (x) {
      return '<li' + (x[1] === meName ? ' class="me"' : "") + '><span class="pl">' + x[0] + '</span><span class="nm" dir="auto">' + esc(x[1]) + '</span><span class="pt">' + x[2] + "</span></li>";
    }).join("") + "</ol>";
  }
  function standings(s) {
    return topLine(s, esc(W("afterQ", s.q ? s.q.i : "", s.q ? s.q.of : ""))) +
      '<div class="live-card"><h2 class="live-h">' + esc(W("topN", Math.min(5, s.np))) + "</h2>" + topList(s.top, s.you ? s.you.name : null) + "</div>" + (isDisplay() ? "" : youBar(s));
  }

  /* ---- the end ---- */
  function podium(e) {
    var order = [2, 1, 3], hgt = { 1: 120, 2: 88, 3: 64 };
    return '<div class="hs-podium">' + order.map(function (pl) {
      var x = null;
      e.podium.forEach(function (p) { if (p.place === pl) x = p; });
      if (!x) return '<div class="p"></div>';
      return '<div class="p"><p class="nm" dir="auto">' + x.names.map(esc).join(", ") + (x.more ? " +" + x.more : "") + '</p><p class="pt">' + esc(WN("ptsN", x.pts)) + '</p><div class="blk" style="height:' + hgt[pl] + 'px">' + pl + "</div></div>";
    }).join("") + "</div>";
  }
  function meterRows(m, words) {
    var pay = { s: 60, m: 67, b: 0 };
    return '<div class="hs-meter">' + ["s", "m", "b"].map(function (n) {
      var c = m[n][0], t = m[n][1], p = t ? (c / t) * 100 : 0;
      var mark = pay[n] ? '<div class="pay" style="left:' + pay[n] + '%"></div><span class="paytag" style="left:' + pay[n] + '%">' + esc(W(n === "s" ? "beatsBig6" : "beatsBig23")) + "</span>" : "";
      return '<div class="hs-mrow' + (pay[n] ? " paid" : "") + '"><div class="hs-mtop"><b>' + netIcon(n) + esc(netWord(n)) + "</b><span>" + esc(words ? (t ? W("pctCaught", Math.round(p)) : W("none")) : (t ? W("caughtCofT", c, t) : W("none"))) + '</span></div><div class="hs-mbar"><div class="fill" style="width:' + p.toFixed(1) + '%"></div>' + mark + "</div></div>";
    }).join("") + "</div>";
  }
  /* a made game with more than numbers: right of tried at each level of sure, with the dots */
  function levelRows(m, words) {
    return '<div class="hs-meter">' + ["s", "m", "b"].map(function (n) {
      var c = m[n][0], t = m[n][1], p = t ? (c / t) * 100 : 0;
      return '<div class="hs-mrow"><div class="hs-mtop"><b>' + dots(n) + " " + esc(W(SURE_KEY[n])) + "</b><span>" + esc(words ? (t ? W("pctRight", Math.round(p)) : W("none")) : (t ? W("rightCofT", c, t) : W("none"))) + '</span></div><div class="hs-mbar"><div class="fill" style="width:' + p.toFixed(1) + '%"></div></div></div>';
    }).join("") + "</div>";
  }
  function mixed() { return !!(made && made.mixed); }
  var VERDICT = { "sure-s": ["tooSure", "vSureS", "kSureS"], "sure-m": ["tooSure", "vSureM", "kSureM"], "careful-b": ["tooCareful", "vCarefulB", "kCarefulB"],
                  "careful-m": ["tooCareful", "vCarefulM", "kCarefulM"], "well": ["wellJudged", "vWell", "kWell"] };
  function verdictHtml(v) {
    if (!v || !VERDICT[v.k]) return "";
    var x = VERDICT[v.k];
    return '<div class="hs-verdict"><b>' + esc(W(x[0])) + "</b><span>" + esc(W(mixed() ? x[2] : x[1], v.gain)) + "</span></div>";
  }
  function awardsHtml(e, mine) {
    if (!e.awards || (!e.awards.sharp && !e.awards.bold)) return "";
    var a = function (k, title, what) {
      var x = e.awards[k];
      if (!x) return "";
      return '<div class="hs-award' + (mine && mine.indexOf(k) >= 0 ? " mine" : "") + '"><b>' + esc(W(title)) + '</b><span dir="auto">' + x.names.map(esc).join(", ") + (x.more ? " +" + x.more : "") + " · " + esc(WN(what, x.k)) + "</span></div>";
    };
    return '<div class="hs-awards">' + a("sharp", "sharpest", mixed() ? "sureRight" : "smallCaught") + a("bold", "boldest", mixed() ? "sureTried" : "smallTried") + "</div>";
  }
  function endPlayer(s) {
    var y = s.you, e = s.end, played = y.meter.s[1] + y.meter.m[1] + y.meter.b[1], meter;
    /* with how sure off: right of the questions played, so a question left unanswered counts too */
    if (e.plain) meter = '<div class="live-card"><h2 class="live-h">' + esc(W("rightCofT", y.ok ? y.ok[0] : 0, Math.max(e.played || 0, y.ok ? y.ok[1] : 0))) + "</h2></div>";
    else if (mixed()) meter = '<div class="live-card"><h2 class="live-h">' + esc(W("howSureWere")) + "</h2>" + (played ? levelRows(y.meter, false) + '<p class="live-small">' + esc(W("rightBySure")) + "</p>" + verdictHtml(y.verdict) : '<p class="live-small">' + esc(W("noAnswersEnd")) + "</p>") + "</div>";
    else meter = '<div class="live-card"><h2 class="live-h">' + esc(W("yourMeter")) + "</h2>" + (played ? meterRows(y.meter, false) + verdictHtml(y.verdict) : '<p class="live-small">' + esc(W("noNetsEnd")) + "</p>") + "</div>";
    return topLine(s, esc(W("theEnd")) + (made ? "" : " · " + esc(s.g.title))) +
      '<div class="live-card">' + podium(e) + awardsHtml(e, y.award) + "</div>" + meter + youBar(s) +
      '<div class="hs-hooks"><div class="live-btns">' + (e.plain ? "" : '<button class="btn ghost live-iconbtn" type="button" id="e-share">' + ICON.share + esc(W("share")) + "</button>") +
      (app.role === "host" ? "" : made ? '<a class="btn ghost" href="' + esc(TO.here("build/")) + '" id="e-make">' + esc(W("makeOwn")) + "</a>" : '<a class="btn ghost" href="#host" id="e-host">Host your own game</a>') + "</div></div>" +
      (made ? madeLine(false) : "");
  }
  function roomLine(m) {
    var rs = m.s[1] ? m.s[0] / m.s[1] : null, rb = m.b[1] ? m.b[0] / m.b[1] : null, rm = m.m[1] ? m.m[0] / m.m[1] : null, k = mixed();
    if (rs !== null && m.s[1] >= 3 && rs < 0.6) return W(k ? "roomTooSureK" : "roomTooSure", Math.round(rs * 100));
    if (rb !== null && m.b[1] >= 3 && rb >= 0.95 && (rm === null || rm >= 2 / 3) && m.b[1] > m.s[1]) return W(k ? "roomCarefulK" : "roomCareful");
    return W("roomWell");
  }
  function endDisplay(s) {
    var e = s.end;
    var left = '<div class="live-card">' + podium(e) + awardsHtml(e, null) + "</div>";
    var right = e.plain ? '<div class="live-card"><h2 class="live-h">' + esc(W("rightCofT", e.ok ? e.ok[0] : 0, e.ok ? e.ok[1] : 0)) + "</h2></div>"
      : '<div class="live-card"><h2 class="live-h">' + esc(mixed() ? W("howSureWere") : W("roomMeter")) + "</h2>" + (mixed() ? levelRows(e.room, true) : meterRows(e.room, true)) + '<p style="margin-top:14px;font-weight:700">' + esc(roomLine(e.room)) + "</p></div>";
    var tail = made ? madeLine(false) : "";
    if (isBig()) return topLine(s, esc(W("theEnd")) + (made ? "" : " · " + esc(s.g.title))) + '<div class="hs-bigrow" style="grid-template-columns:1fr 1fr">' + left + right + "</div>" + tail;
    return topLine(s, esc(W("theEnd")) + (made ? "" : " · " + esc(s.g.title))) + left + right + tail;
  }
  function endHooks(s) {
    if (isDisplay()) return;
    onwardInto($("after"));
    var sh = $("e-share");
    if (sh) sh.addEventListener("click", function () { sharePicture(s); });
    var ho = $("e-host");
    if (ho) ho.addEventListener("click", function () { TO.count("live/host-own"); });
    var mk = $("e-make");
    if (mk) mk.addEventListener("click", function () { TO.count("live/make-own"); });
  }

  /* ---- the share picture: how sure, never an answer ---- */
  function sharePicture(s) {
    TO.count("live/share");
    var y = s.you, W_ = 1080, H = 1350, k = mixed();
    var cv = document.createElement("canvas");
    cv.width = W_; cv.height = H;
    var x = cv.getContext("2d");
    var colour = getComputedStyle(document.body).getPropertyValue("--c").trim() || "#470BA8";
    var draw = function () {
      x.fillStyle = made ? colour : "#470BA8"; x.fillRect(0, 0, W_, H);
      x.fillStyle = "#fff";
      x.font = "800 " + (made ? 96 : 128) + "px 'Bricolage Grotesque', sans-serif";
      var title = made ? String(s.g.title) : "How Sure?";
      if (made && title.length > 18) title = title.slice(0, 17) + "…";
      x.fillText(title, 90, 230);
      x.globalAlpha = 0.8;
      x.font = "600 44px Figtree, sans-serif";
      x.fillText(made ? W("shareLine") : s.g.title + " · a live game", 94, 306);
      x.globalAlpha = 1;
      var rows = ["s", "m", "b"].map(function (n) { return [n, k ? W(SURE_KEY[n]) : (made ? netWord(n) : { s: "Small nets", m: "Medium nets", b: "Big nets" }[n])]; });
      rows.forEach(function (r, i) {
        var top = 430 + i * 190, c = y.meter[r[0]][0], t = y.meter[r[0]][1];
        x.font = "700 46px Figtree, sans-serif";
        x.fillText(r[1], 94, top);
        x.textAlign = "right";
        x.fillText(t ? (k ? W("rightCofT", c, t) : W("caughtCofT", c, t)) : W("none"), W_ - 94, top);
        x.textAlign = "left";
        x.globalAlpha = 0.25; x.fillStyle = "#fff";
        round(x, 94, top + 34, W_ - 188, 34, 17); x.fill();
        x.globalAlpha = 1;
        if (t) { round(x, 94, top + 34, Math.max(34, (W_ - 188) * c / t), 34, 17); x.fill(); }
      });
      var sm = y.meter.s;
      x.font = "800 " + (L === "en" ? 64 : 54) + "px 'Bricolage Grotesque', sans-serif";
      x.fillText(sm[1] ? (k ? W("shareSure", sm[0], sm[1]) : W("shareCaught", sm[0], sm[1])) : W("shareSafe"), 90, 1080);
      x.globalAlpha = 0.85;
      x.font = "700 52px Figtree, sans-serif";
      x.fillText(W("shareAsk"), 94, 1160);
      x.globalAlpha = 1;
      x.font = "800 56px 'Bricolage Grotesque', sans-serif";
      x.fillText(SITE, 94, 1262);
      cv.toBlob(function (blob) {
        if (!blob) return;
        TO.share({ blob: blob, filename: "how-sure.png", text: W("shareAsk") + " " + "https://" + SITE + "/live/" }).then(function (how) {
          if (how !== "fallback") return;
          var url = URL.createObjectURL(blob);
          $("share-img").src = url;
          $("share-save").href = url;
          $("share-copied").textContent = "";
          TO.openDialog($("dlg-share"));
        });
      }, "image/png");
    };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load("800 64px 'Bricolage Grotesque'"), document.fonts.load("700 46px Figtree")]).then(draw, draw);
    } else draw();
  }
  function round(x, l, t, w, h, r) {
    x.beginPath();
    x.moveTo(l + r, t); x.lineTo(l + w - r, t); x.quadraticCurveTo(l + w, t, l + w, t + r); x.lineTo(l + w, t + h - r);
    x.quadraticCurveTo(l + w, t + h, l + w - r, t + h); x.lineTo(l + r, t + h); x.quadraticCurveTo(l, t + h, l, t + h - r);
    x.lineTo(l, t + r); x.quadraticCurveTo(l, t, l + r, t); x.closePath();
  }
  $("share-copy").addEventListener("click", function () {
    TO.copyText("https://" + SITE + "/live/").then(function (ok) { $("share-copied").textContent = ok ? W("linkCopiedDot") : W("copyFailed", SITE + "/live/"); });
  });

  /* ================================================================ the host's buttons */
  var strip = $("hoststrip"), hsSay = $("hs-say"), hsGo = $("hs-go"), hsAlt = $("hs-alt");
  function hostSay(t) { hsSay.textContent = t; }
  function hostStrip(s) {
    if (!s || app.role !== "host" || app.stopped) { strip.hidden = true; document.body.classList.remove("live-strip"); return; }
    strip.hidden = false;
    document.body.classList.add("live-strip");
    var go = "", say = "", alt = "", dis = false;
    if (s.ph === "lobby") { go = W("start"); dis = !s.np; say = WNH("playersH", s.np); }
    else if (s.ph === "question") {
      var c = counts(s);
      go = W("reveal");
      say = (s.q.i === 0 ? esc(W("practice")) + " · " : "") + (c.of && c.in >= c.of ? WH("allAnsweredH", c.of) : WH("answeredH", c.in, c.of));
      seenAt(s);
    }
    else if (s.ph === "check") { go = W("reveal"); say = WH("rightSoFarH", rightSoFar(s)); }
    else if (s.ph === "reveal") {
      go = s.q.i > 0 && s.q.i >= s.q.of ? W("theEndBtn") : W("next");
      say = s.rv ? ((s.q.type || "num") === "num" ? WH("caughtItH", s.rv.hits, s.rv.total) : WH("rightItH", s.rv.hits, s.rv.total)) : "";
    }
    else if (s.ph === "standings") { go = W("nextQ"); say = esc(W("standings")); }
    else if (s.ph === "end") { go = W("playAgain"); alt = W("newGame"); say = ""; }
    hsSay.innerHTML = say;
    hsGo.textContent = go;
    hsGo.disabled = dis;
    hsAlt.textContent = alt;
    hsAlt.hidden = !alt;
    hsSay.hidden = !!alt && !isBig();
    revealCheck(false);                 // an open "still answering" card follows the count, and goes with the question
  }
  /* Where this screen stands ("question|1.0"), sent with every command that moves the game: a double tap,
     or a tap on a screen that is behind, then no longer matches and the server ignores it. */
  function atOf(s) { return s.ph + "|" + (s.q ? s.q.k : ""); }
  hsGo.addEventListener("click", function () {
    var s = app.state;
    if (!s) return;
    if (s.ph === "lobby") { if (send({ t: "start", at: atOf(s) })) TO.count("live/started"); }
    else if (s.ph === "question") {
      var c = counts(s);
      if (c.in >= c.of) send({ t: "reveal", at: atOf(s) });         // everyone has sent: straight to the reveal
      else revealCheck(true);
    }
    else if (s.ph === "check") send({ t: "reveal", at: atOf(s) });  // the answers were closed already: the host's ticks decide
    else if (s.ph === "reveal" || s.ph === "standings") send({ t: "next", at: atOf(s) });
    else if (s.ph === "end") hostMenu("again");
  });

  /* Reveal while someone is still answering: "Wait", or "Reveal now", which opens 30 seconds after the
     question did, so nobody is cut off at once and nobody can hold the room forever. The 30 seconds are
     counted from when this screen first showed the question, kept with the host's record through a reload. */
  var FORCE_AFTER = (LOCAL && window.LIVE_FORCE_AFTER) || 30000;     // the checks shorten it on this computer only
  function counts(s) { return s.cnt ? { in: s.cnt.in, of: s.cnt.of } : { in: 0, of: s.np || 0 }; }
  function seenAt(s) {
    var rec = sget("host:" + app.code) || null, k = app.code + "|" + s.q.k;
    if (app.seen && app.seen.k === k) return app.seen.t;
    app.seen = rec && rec.seen && rec.seen.k === k ? rec.seen : { k: k, t: now() };
    if (rec && (!rec.seen || rec.seen.k !== k)) { rec.seen = app.seen; sset("host:" + app.code, rec); }
    return app.seen.t;
  }
  var revealTick = 0;
  function revealCheck(open) {
    var dlg = $("dlg-reveal"), s = app.state;
    if (!s || s.ph !== "question" || app.role !== "host") { clearInterval(revealTick); TO.closeDialog(dlg); return; }
    if (!open && !dlg.open) return;
    var c = counts(s), wait = c.of - c.in, left = Math.max(0, seenAt(s) + FORCE_AFTER - now());
    var all = wait <= 0;
    $("reveal-title").textContent = all ? W("everyone") : WN("stillAnswering", wait);
    $("reveal-line").textContent = W("sentOf", c.in, c.of);
    $("reveal-dots").innerHTML = dotRow(c.in, c.of);
    var now_ = $("reveal-now");
    now_.disabled = !all && left > 0;
    now_.textContent = all ? W("reveal") : left > 0 ? W("revealIn", ("0" + Math.ceil(left / 1000)).slice(-2)) : W("revealNow");
    if (open) {
      TO.openDialog(dlg);
      clearInterval(revealTick);
      revealTick = setInterval(function () { if (!dlg.open) { clearInterval(revealTick); return; } revealCheck(false); }, 250);
    }
  }
  $("reveal-wait").addEventListener("click", function () { TO.closeDialog($("dlg-reveal")); });
  $("reveal-now").addEventListener("click", function () {
    var s = app.state;
    TO.closeDialog($("dlg-reveal"));
    if (s && s.ph === "question") send({ t: "reveal", at: atOf(s) });
  });
  hsAlt.addEventListener("click", function () {
    var s = app.state;
    if (s && s.ph === "end") { app.newGame = true; send({ t: "finish", at: atOf(s) }); }
  });
  $("hs-more").addEventListener("click", function () { hostMenu("menu"); });

  var endArm = 0;
  function hostMenu(what) {
    var s = app.state, box = $("hostmenu");
    if (!s) return;
    var h = "";
    if (what === "again") {
      $("host-title").textContent = W("playAgain");
      if (made) h = '<button type="button" data-again="kit">' + esc(W("playThisAgain")) + "</button>";
      else h = SETS.map(function (x) {
        var played = (s.g.played && s.g.played[x.id]) ? s.g.played[x.id].length : 0;
        return '<button type="button" data-again="' + esc(x.id) + '">' + esc(x.title) + '<span class="live-small" style="display:block;margin-top:2px">' + (played >= x.n ? "All played: they start again" : (x.n - played) + " new questions") + "</span></button>";
      }).join("");
    } else {
      $("host-title").textContent = W("hostMenu");
      h = '<button type="button" data-do="players">' + esc(W("playersN", s.np)) + "</button>";
      h += '<button type="button" data-do="close">' + esc(s.g.closed ? W("openNew") : W("closeNew")) + "</button>";
      if (s.ph === "question" || s.ph === "check") h += '<button type="button" data-do="skip">' + esc(W("skipQ")) + "</button>";
      if (s.ph !== "end") h += '<button type="button" class="danger" data-do="end">' + esc(s.ph === "lobby" ? W("closeGame") : W("endNow")) + "</button>";
      else h += '<button type="button" class="danger" data-do="new">' + esc(W("newGame")) + "</button>";
      h += '<div id="plist"></div>';
    }
    box.innerHTML = h;
    each(box.querySelectorAll("[data-again]"), function (b) {
      b.addEventListener("click", function () { send({ t: "again", set: b.getAttribute("data-again"), at: atOf(app.state || s) }); TO.closeDialog($("dlg-host")); });
    });
    each(box.querySelectorAll("[data-do]"), function (b) {
      b.addEventListener("click", function () {
        var d = b.getAttribute("data-do");
        if (d === "players") { send({ t: "players" }); return; }
        if (d === "close") { send({ t: "close", on: !s.g.closed }); TO.closeDialog($("dlg-host")); return; }
        if (d === "skip") { send({ t: "skip", at: atOf(s) }); TO.closeDialog($("dlg-host")); return; }    // the question shown when the menu opened, none other
        if (d === "end" || d === "new") {
          if (now() - endArm > 4000) { endArm = now(); b.textContent = W("tapAgain"); return; }
          endArm = 0;
          /* "End the game now" ends the round, and Play again stays; "Close this game" (the lobby) and
             "New game" (the end) finish the whole game */
          var fin = d === "new" || s.ph === "lobby";
          app.newGame = fin;
          send({ t: fin ? "finish" : "end", at: atOf(app.state || s) });
          TO.closeDialog($("dlg-host"));
        }
      });
    });
    TO.openDialog($("dlg-host"));
  }
  function playersList(ps) {
    var box = $("plist");
    if (!box) return;
    box.innerHTML = '<ul class="live-plist">' + ps.map(function (p) {
      return '<li><span dir="auto">' + esc(p[1]) + (p[2] ? " " + esc(W("youParen")) : "") + "</span>" + (p[2] ? "" : '<button type="button" data-rm="' + esc(p[0]) + '">' + esc(W("remove")) + "</button>") + "</li>";
    }).join("") + "</ul>";
    each(box.querySelectorAll("[data-rm]"), function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-armed") !== "1") { b.setAttribute("data-armed", "1"); b.textContent = W("sureQ"); return; }
        send({ t: "remove", id: b.getAttribute("data-rm") });
        var li = b.closest("li");
        if (li) li.parentNode.removeChild(li);
      });
    });
  }

  /* ================================================================ a saved game's own page: playing it alone
     The code shows the game, its scoreboard and Play it now. The questions come without their answers; the
     answers stay in this browser (kp:CODE) until the end, then go in one call; the server sends back the
     score, every right answer for the review, and the scoreboard. The browser's random key (kept with the
     record for the game's two months) is what makes its first play the one on the scoreboard. */
  function kitRec() {
    var r = sget("kp:" + kit.code);
    if (!r || typeof r.key !== "string") r = { key: randomKey(), t: now() };
    return r;
  }
  function kitSave(r) { r.t = now(); sset("kp:" + kit.code, r); }
  function kitView(h) { $("after").innerHTML = ""; dropBar(); $("v-kit").innerHTML = h; show("v-kit"); }
  function openKit(code) {
    stopGame();
    app = Object.assign(app, { code: "", state: null, screen: "", stopped: true, q: null, info: null, alone: true });
    kit = { code: code, info: null, qs: null };
    setLook(null);
    document.title = "Play · " + code + " | Logicers";
    kitView('<div class="live-card live-notecard"><p class="hs-waiting" style="justify-content:center"><span class="hs-dots"><i></i><i></i><i></i></span></p></div>');
    reach("/kit/" + code).then(function (res) {
      if (res.status === 404) { note("lost", W("noGame"), "", [{ text: W("typeAgain"), solid: true, href: "./" }]); return null; }
      if (res.status === 429) { note("lost", W("tooMany"), W("waitRetry"), [{ text: W("back"), href: "./" }]); return null; }
      if (!res.ok) throw new Error("server");
      return res.json();
    }).then(function (info) {
      if (!info || kit.code !== code) return;
      if (info.stopped) { setLook({ lang: info.lang }); note("stop", W("stoppedKit"), W("stoppedP"), [{ text: W("back"), href: "./" }], true); return; }
      if (info.mode === "live") { setLook({ lang: info.lang, colour: info.colour }); note("signal", W("liveOnly"), W("liveOnlyP"), [{ text: W("back"), href: "./" }], true); return; }
      kit.info = info;
      setLook({ title: info.title, colour: info.colour, lang: info.lang, sure: info.sure !== false, mixed: true });
      kitHome();
    }, function () {
      if (kit.code !== code) return;
      note("signal", W("cantReach"), W("signal"), [{ text: W("tryAgain"), solid: true, go: function () { openKit(code); } }]);
    });
  }
  function kitTop(what) {
    return '<div class="hs-top"><p class="meta"><b dir="auto" class="hs-ttl">' + esc(kit.info.title) + "</b> " + what + "</p></div>";
  }
  function boardHtml(board, meName, mePts) {
    if (!board || !board.length) return '<p class="live-small">' + esc(W("firstToPlay")) + "</p>";
    var marked = false;
    return '<ol class="hs-list">' + board.map(function (x) {
      var me = !marked && meName && x[1] === meName && x[2] === mePts;
      if (me) marked = true;
      return "<li" + (me ? ' class="me"' : "") + '><span class="pl">' + x[0] + '</span><span class="nm" dir="auto">' + esc(x[1]) + '</span><span class="pt">' + x[2] + "</span></li>";
    }).join("") + "</ol>";
  }
  function kitHome() {
    var i = kit.info, r = kitRec();
    document.title = "Play · " + kit.code + " | Logicers";        // never the game's own title: the visit counter reads it
    var going = r.ids && r.ids.length && r.i > 0 && r.i < r.ids.length;
    var form;
    if (r.done) form = '<p class="hs-yourplay" id="k-mine">' + WH("yourPlayH", WN("ptsN", r.done.pts), ord(r.done.place), r.done.of) + "</p>" +
      '<button class="btn solid live-wide" type="button" id="k-play">' + esc(going ? W("resume") : W("playAgainPractice")) + "</button>";
    else form = (i.picked ? "" : '<label class="live-label" for="k-name" style="margin-top:14px">' + esc(W("yourName")) + '</label><input class="live-field" id="k-name" maxlength="14" autocomplete="nickname" dir="auto" placeholder="' + esc(W("namePh")) + '" value="' + esc(r.name || "") + '">') +
      '<button class="btn solid live-wide" type="button" id="k-play">' + esc(going ? W("resume") : W("playNow")) + "</button>";
    kitView('<p class="meta"><b>' + esc(W("play")) + "</b> " + esc(W("savedGame")) + "</p>" +
      '<div class="live-card"><h1 class="live-title hs-kittitle" dir="auto">' + esc(i.title) + "</h1>" + (i.line ? '<p class="live-tag" dir="auto">' + esc(i.line) + "</p>" : "") +
      '<p class="hs-made">' + esc(WN("nQuestions", i.n)) + " · " + esc(W("madeByShort")) + ' · <a href="' + esc(reportHref()) + '">' + esc(W("report")) + "</a></p>" +
      form + '<p class="live-err" id="k-err" role="alert" hidden></p></div>' +
      '<div class="live-card"><h2 class="live-h">' + esc(W("scoreboard")) + '</h2><p class="live-small" style="margin-top:2px">' + esc(WN("playedUntil", i.plays, dateShort(i.until))) + "</p>" + boardHtml(i.board, r.done && r.done.name, r.done && r.done.pts) + "</div>" +
      '<p class="live-small live-privacy">' + esc(privacyLine("alone")) + "</p>");
    var name = $("k-name");
    if (name) name.addEventListener("keydown", function (e) { if (e.key === "Enter") $("k-play").click(); });
    $("k-play").addEventListener("click", function () {
      var rec = kitRec();
      if (!rec.done && !i.picked) {
        var n = name.value.replace(/\s+/g, " ").trim();
        if (!n) { kitErr(W("typeName")); name.focus(); return; }
        rec.name = n;
      }
      if (rec.ids && rec.ids.length && rec.i > 0 && rec.i < rec.ids.length) { kitSave(rec); kitLoad(function () { kitQuestion(); }); return; }
      kitStart(rec);
    });
    if (r.done) kitMine();
  }
  function kitErr(t) { var e = $("k-err"); if (!e) return; e.textContent = t; e.hidden = !t; }
  /* a play on the scoreboard: its points and place as they are now (the maker's ticks can change them) */
  function kitMine() {
    var r = kitRec(), code = kit.code;
    reach("/kit/" + code + "/me", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: r.key }) })
      .then(function (res) { return res.ok ? res.json() : null; }).then(function (me) {
        if (!me || kit.code !== code) return;
        var rec = kitRec();
        rec.done = { name: me.name, pts: me.pts, place: me.place, of: me.players };
        kitSave(rec);
        var e = $("k-mine");
        if (e) e.innerHTML = WH("yourPlayH", WN("ptsN", me.pts), ord(me.place), me.players);
      }, function () { /* the line stays as it was */ });
  }
  /* the questions, without their answers */
  function kitLoad(then) {
    var code = kit.code;
    if (kit.qs) { then(); return; }
    reach("/kit/" + code + "/play").then(function (res) {
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    }).then(function (p) {
      if (kit.code !== code) return;
      if (!p || p.mode !== "alone" || !Array.isArray(p.qs)) { openKit(code); return; }
      kit.qs = p.qs;
      kit.shuffle = !!p.shuffle;
      kit.byId = {};
      p.qs.forEach(function (q) { kit.byId[q.id] = q; });
      then();
    }, function () { kitErr(W("playErrNet")); });
  }
  function kitStart(rec) {
    kitLoad(function () {
      var ids = kit.qs.map(function (q) { return q.id; });
      var order = ids.slice();
      if (kit.shuffle) for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
      rec.ids = order;
      rec.i = 0;
      rec.ans = {};
      kitSave(rec);
      TO.count("live/alone/started");
      kitQuestion();
    });
  }
  function kitQuestion() {
    var rec = kitRec();
    while (rec.i < rec.ids.length && !kit.byId[rec.ids[rec.i]]) rec.i++;         // the maker removed a question meanwhile
    if (rec.i >= rec.ids.length) { kitSubmit(); return; }
    var q = Object.assign({}, kit.byId[rec.ids[rec.i]]), n = rec.ids.length;
    q.k = "alone|" + rec.i;
    q.i = rec.i + 1;
    q.of = n;
    var last = rec.i === n - 1;
    kitView(kitTop(esc(W("qOf", rec.i + 1, n))) +
      '<div class="live-card"><p class="hs-q" id="q-text" dir="auto">' + esc(q.t) + "</p>" + questionBody(q) +
      '<button class="btn solid hs-sendbtn" type="button" id="q-send" disabled>' + esc(last ? W("finish") : W("nextBtn")) + "</button>" +
      '<button class="live-link" type="button" id="k-skip">' + esc(W("skip")) + "</button>" +
      '<p class="hs-status" id="q-status"></p></div>');
    app.alone = true;
    wireQuestion({ q: q }, true);
    var kept = rec.ans && rec.ans[q.id];
    if (kept) { takeAns(kept); drawAnswer(); if (q.type === "tx" && $("q-typed")) $("q-typed").value = app.q.x; }
    $("k-skip").addEventListener("click", function () { kitNext(true); });
  }
  function kitNext(skip) {
    var rec = kitRec(), a = app.q;
    if (!a) return;
    var id = rec.ids[rec.i];
    rec.ans = rec.ans || {};
    if (skip) delete rec.ans[id];
    else rec.ans[id] = Object.assign({ n: sureOn() ? a.n : "m", type: a.type }, ansFields(a.type, a));
    rec.i++;
    kitSave(rec);
    app.q = null;
    if (rec.i < rec.ids.length) kitQuestion(); else kitSubmit();
  }
  function kitSubmit() {
    var rec = kitRec(), code = kit.code, ans = [];
    Object.keys(rec.ans || {}).forEach(function (id) {
      var a = rec.ans[id];
      if (a && kit.byId[id]) ans.push(Object.assign({ id: id, n: a.n }, ansFields(a.type || "num", a)));
    });
    kitView(kitTop("") + '<div class="live-card live-notecard"><p class="hs-waiting" style="justify-content:center"><span>' + esc(W("sendingPlay")) + ' <span class="hs-dots"><i></i><i></i><i></i></span></span></p></div>');
    var body = { v: PROTO, key: rec.key, name: rec.name || "", pick: !!(kit.info && kit.info.picked), ans: ans };
    reach("/kit/" + code + "/play", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (res) { return res.json().then(function (b) { return { status: res.status, b: b }; }, function () { return { status: res.status, b: {} }; }); })
      .then(function (r) {
        if (kit.code !== code) return;
        if (r.status === 200) {
          var x = r.b, rr = kitRec();
          if (x.kept) rr.done = { name: x.name, pts: x.pts, place: x.place, of: x.players };
          else if (x.mine && !rr.done) rr.done = { name: x.mine.name, pts: x.mine.pts, place: x.mine.place, of: x.players };
          rr.name = x.name || rr.name;
          rr.ids = null; rr.i = 0; rr.ans = {};
          kitSave(rr);
          TO.count("live/alone/finished");
          kitResult(x);
          return;
        }
        if (r.status === 400 && r.b && r.b.e === "name") { kitRetry(W("playErrName"), true); return; }
        if (r.status === 409) { openKit(code); return; }
        if (r.status === 429) { kitRetry(W("playErrLater")); return; }
        kitRetry(W("playErrNet"));
      }, function () { if (kit.code === code) kitRetry(W("playErrNet")); });
  }
  /* sending failed: the answers stay on this phone, and the player can try again (with another name) */
  function kitRetry(t, askName) {
    var rec = kitRec();
    kitView(kitTop("") + '<div class="live-card"><p class="live-err" role="alert">' + esc(t) + "</p>" +
      (askName ? '<label class="live-label" for="k-name" style="margin-top:14px">' + esc(W("yourName")) + '</label><input class="live-field" id="k-name" maxlength="14" dir="auto" autocomplete="nickname" value="' + esc(rec.name || "") + '">' : "") +
      '<button class="btn solid live-wide" type="button" id="k-again">' + esc(W("sendAgain")) + "</button></div>");
    $("k-again").addEventListener("click", function () {
      var r2 = kitRec();
      if (askName) {
        var n = $("k-name").value.replace(/\s+/g, " ").trim();
        if (!n) { $("k-name").focus(); return; }
        r2.name = n;
        kitSave(r2);
      }
      kitSubmit();
    });
  }
  /* the end of a play alone: the score, how sure, the scoreboard, every answer, the way on */
  function kitResult(x) {
    var i = kit.info, practice = !x.kept, rec = kitRec();
    var chip = x.kept ? WH("placeOf", ord(x.place), x.players) : esc(W("practiceRun"));
    var notes = practice ? '<p class="hs-note">' + esc(x.why === "full" ? W("fullNote") : x.why === "budget" ? W("budgetNote") :
      W("practiceNote", rec.done ? WN("ptsN", rec.done.pts) + ", " + ord(rec.done.place) : "")) + "</p>" : "";
    var meter = x.meter ? '<div class="live-card"><h2 class="live-h">' + esc(W("howSureWere")) + "</h2>" + levelRows(x.meter, false) + '<p class="live-small">' + esc(W("rightBySure")) + "</p>" + verdictHtml(x.verdict) + "</div>"
      : '<div class="live-card"><h2 class="live-h">' + esc(W("rightCofT", x.right[0], Math.max(x.of || 0, x.right[1]))) + "</h2></div>";
    var meName = rec.done ? rec.done.name : null, mePts = rec.done ? rec.done.pts : null;
    kitView('<section class="hs-panel"><div class="hs-head"><span class="hs-big">' + esc(WN("ptsN", x.pts)) + '</span><span class="hs-chip white">' + chip + "</span></div>" +
      '<p class="hs-answer"><span dir="auto">' + esc(i.title) + "</span> · " + esc(WN("nQuestions", x.of)) + "</p></section>" + notes + meter +
      '<div class="live-card"><h2 class="live-h">' + esc(W("scoreboard")) + "</h2>" + boardHtml(x.board, meName, mePts) + "</div>" +
      '<details class="live-card hs-review"><summary>' + esc(W("seeAnswers")) + "</summary>" + reviewHtml(x) + "</details>" +
      '<div class="live-btns"><button class="btn ghost" type="button" id="k-again">' + esc(W("playAgainPractice")) + '</button><a class="btn ghost" href="' + esc(TO.here("build/")) + '">' + esc(W("makeOwn")) + "</a></div>" +
      madeLine(false));
    $("k-again").addEventListener("click", function () { kitHome(); });
    onwardInto($("after"));
  }
  /* every question: the player's answer, the right one, the points, and the maker's line after it */
  function reviewHtml(x) {
    var byId = {}, h = "";
    (x.review || []).forEach(function (r) { byId[r.id] = r; });
    (x.unanswered || []).forEach(function (r) { byId[r.id] = Object.assign({ none: true }, r); });
    kit.qs.forEach(function (q) {
      var r = byId[q.id];
      if (!r) return;
      var type = q.type || "num", mine = "", right = "";
      if (type === "num") {
        right = withUnit(q, r.a);
        if (!r.none) mine = withUnit(q, r.g) + (sureOn() ? " · " + netWord(r.n) + " (" + W("rangeTo", fmt(q, r.r[0]), withUnit(q, r.r[1])) + ")" : "");
      } else {
        right = type === "mc" ? q.o[r.a] : type === "tf" ? tfWord(r.a) : (r.ok || []).join(" / ") || "—";
        if (!r.none) mine = (type === "tx" ? r.x : type === "tf" ? tfWord(r.c) : q.o[r.c]) + (sureOn() ? " · " + W(SURE_KEY[r.n]) : "");
      }
      h += '<div class="hs-rvw"><p class="hs-rvwq" dir="auto">' + esc(q.t) + "</p>" +
        '<p><span class="live-small">' + esc(W("yourAnswer")) + ":</span> " + (r.none ? esc(W("notAnswered")) : '<b dir="auto">' + esc(mine) + "</b>") +
        (r.none ? "" : ' <span class="hs-chip ' + (r.hit ? "white hs-chipsm" : "yellow hs-chipsm") + '">+' + r.pts + "</span>") + "</p>" +
        '<p><span class="live-small">' + esc(W("rightAnswer")) + ':</span> <b dir="auto">' + esc(right) + "</b></p>" +
        (type === "tx" && !r.none && !r.hit ? '<p class="live-small">' + esc(W("notOnList")) + "</p>" : "") +
        factCard({ f: r.f, s: r.s }) + "</div>";
    });
    return h;
  }

  /* ================================================================ the address decides the view */
  function route() {
    var h = window.location.hash.replace(/^#/, "");
    var m = /^([A-Za-z]{5})(?:\.([A-Za-z0-9_-]{22}))?$/.exec(h);
    if (m) { openGame(m[1].toUpperCase(), m[2] || null); return; }
    if (/^[A-Za-z]{7}$/.test(h)) { openKit(h.toUpperCase()); return; }
    stopGame();
    app.code = "";
    app.alone = false;
    kit = { code: "" };
    if (h === "host") { showSetup(); return; }
    showHome();
  }
  window.addEventListener("hashchange", route);
  route();
})();
