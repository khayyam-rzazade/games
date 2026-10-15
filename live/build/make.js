/* Logicers Live, Build your own (live/build/; "Make your own" until 15 Oct 2026): the editor (15 Oct 2026). Anyone writes a game here with no account, in
   English, Italian or Turkish, saves it on Logicers' server and gets back a code, a QR code, a link for the
   players and an edit link, the only key. The contract with the server and the other pages is
   r/live-workshop/step2-spec.md (sections 3 to 8 and 12); the look is the approved mock-up (sheet5.png).

   Why it is built the way it is:
   - The edit key never stays in the address (a projector shows the address bar): the page takes it from
     "#edit=CODE.KEY" at once and keeps it in this tab's sessionStorage. Nothing here ever logs it.
   - The editor speaks the game's language, chosen first ("very important for international reach",
     Khayyam, 15 Oct 2026): every word comes from words.js, numbers are typed and shown the language's way
     (a decimal comma in Italian and Turkish) and kept as plain numbers.
   - Everything a person typed is drawn as text (esc(), or a field's value set in script), in elements with
     dir="auto"; no inline handlers, no eval. The checks the server makes (kit.js, cleanKit) are made here
     first, in words next to the field, so a save never fails on something the page could have said.
   - Unsaved work survives a reload (sessionStorage) and a lost signal; the browser's leave question comes
     only when there is unsaved work.
   - A game of 100 questions stays smooth: typing changes one line of the list and the open question's
     preview, never the whole page.
   - Words are few and pictures many (Khayyam: "very simple, user friendly, more visuals and less words"). */
(function () {
  "use strict";
  var TO = window.TurnsOut, R = window.HSRules, QRG = window.qrcodegen, WORDS = window.MAKE_WORDS;
  if (!TO || !R || !WORDS || !WORDS.en) return;

  /* ================================================================ the address, first of all
     An edit key or a copy token is taken and removed from the address before anything else happens; the same
     when one is pasted into the address bar of this page later (only the part after # changes then, so the
     browser does not load the page again: "hashchange", at the end). */
  function takeLink() {
    var h = String(window.location.hash || "").replace(/^#/, "");
    if (!/^(edit|copy)=/.test(h)) return null;
    try { window.history.replaceState(null, "", window.location.pathname + window.location.search); }
    catch (e) { try { window.location.hash = ""; } catch (x) { /* nothing more can be done */ } }
    var m = /^(edit|copy)=([A-Za-z]{7})\.([A-Za-z0-9_-]{20,64})$/.exec(h);
    return m ? { kind: m[1], code: m[2].toUpperCase(), key: m[3] } : { kind: h.charAt(0) === "e" ? "badedit" : "badcopy" };
  }
  var LINK = takeLink();

  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  /* the checks may point the page at another local server; on the site, never (an element with that id could
     otherwise stand in for it: a string set by a script on this computer only) */
  var SERVER = (LOCAL && typeof window.LIVE_SERVER === "string" && window.LIVE_SERVER) || (LOCAL ? "http://127.0.0.1:8787" : "https://logicers-live.rza-khay.workers.dev");
  var SITE = "https://logicers.com";
  var PROTO = 1;
  var COLOURS = ["indigo", "blue", "teal", "red", "pink", "green", "orange", "slate"];
  var LANGS = ["en", "it", "tr"];
  var TYPES = ["num", "mc", "tf", "tx"];
  var TIMERS = [0, 30, 60, 90];
  var LOC = { en: "en-US", it: "it-IT", tr: "tr-TR" };
  var DEC = { en: ".", it: ",", tr: "," }, GRP = { en: ",", it: ".", tr: "." };
  var MAXQ = 100;
  var CODE_RE = /^[BCDFGHJKLMNPQRSTVWXZ]{7}$/, KEY_RE = /^[A-Za-z0-9_-]{20,64}$/;
  var KS = { games: "logicers-make:games", open: "logicers-make:open", draft: "logicers-make:draft", lang: "logicers-make:lang", host: "logicers-live:hostkit" };
  var LETTERS = "ABCD";
  var NETW = { s: "netS", m: "netM", b: "netB" };
  /* a question about a year, in the three languages: the editor then offers "Year" by itself */
  var YEARISH = /(^|[^\p{L}])(year|years|anno|anni|yıl|yılı|yılında|yılda|yil)(?=[^\p{L}]|$)/iu;

  function $(id) { return document.getElementById(id); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function now() { return Date.now(); }
  function num(x) { return typeof x === "number" && isFinite(x); }
  function whole(x) { return num(x) && Math.floor(x) === x; }
  function obj(x) { return x && typeof x === "object" && !Array.isArray(x) ? x : {}; }
  function cut(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function lg10(x) { return Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10; }
  function p10(e) { return Number("1e" + e); }

  /* ================================================================ words, in the game's language */
  var lang = "en";
  function wd(k) { var L = WORDS[lang] || {}; return L[k] !== undefined ? L[k] : WORDS.en[k]; }
  function nfmt(n) { try { return new Intl.NumberFormat(LOC[lang]).format(n); } catch (e) { return String(n); } }
  function fillIn(s, args) {
    var i = 0;
    return String(s === undefined ? "" : s).replace(/(\b(?:[IiAa]l|[Dd][ae]l|[Nn]el|[Ss]ul) )?%([sd])/g, function (m, art, ty) {
      var v = args[i++];
      if (v === undefined || v === null) return art || "";
      v = ty === "d" && typeof v === "number" ? nfmt(v) : String(v);
      return art ? (lang === "it" ? itArt(art, v, ty) : art + v) : v;
    });
  }
  /* Italian before a number, as it is said: "il 8 ottobre" is "l'8 ottobre", "fino al 11" is "fino all'11" (and
     "l'80", "l'800": every number said with a vowel first), and a date's first day is "1°" ("il 1° dicembre").
     Only the article Logicers wrote before a %s or %d changes, never what fills it (a review of the Italian,
     15 Oct 2026: "il 8 ott" reads as machine-made). */
  function itArt(art, v, ty) {
    var ELIDE = { il: "l'", al: "all'", dal: "dall'", del: "dell'", nel: "nell'", sul: "sull'" };
    var w = art.slice(0, -1), low = w.toLowerCase(), e = ELIDE[low];
    if (e && /^(8|11(?!\d))/.test(v)) return (w === low ? e : e.charAt(0).toUpperCase() + e.slice(1)) + v;
    if (ty === "s" && /^1 [a-z]/.test(v)) return art + "1°" + v.slice(1);
    return art + v;
  }
  function t(k) { return fillIn(wd(k), Array.prototype.slice.call(arguments, 1)); }
  function pick(w, n) {
    if (typeof w === "string") return w;
    if (!w) return "";
    var r = "other";
    try { r = new Intl.PluralRules(LOC[lang]).select(n); } catch (e) { /* "other" */ }
    return w[r] !== undefined ? w[r] : w.other;
  }
  /* a word that counts n: its form chosen by n, filled with the rest of the arguments (or with n alone) */
  function pl(k, n) {
    var rest = Array.prototype.slice.call(arguments, 2);
    return fillIn(pick(wd(k), n), rest.length ? rest : [n]);
  }
  function sub(group, k) { var g = wd(group); return g && g[k] !== undefined ? g[k] : (WORDS.en[group] || {})[k]; }
  /* the words are Logicers' own: escaped all the same, then *stars* become bold */
  function rich(s) { return esc(s).replace(/\*([^*]+)\*/g, "<b>$1</b>"); }
  function cap(s) { s = String(s || ""); return s ? s.charAt(0).toLocaleUpperCase(LOC[lang]) + s.slice(1) : s; }
  function browserLang() {
    var ls = window.navigator.languages && window.navigator.languages.length ? window.navigator.languages : [window.navigator.language || "en"];
    for (var i = 0; i < ls.length; i++) {
      var l = String(ls[i] || "").slice(0, 2).toLowerCase();
      if (LANGS.indexOf(l) >= 0) return l;
    }
    return "en";
  }

  /* ================================================================ this tab's and this browser's storage
     Every read and write is wrapped: a page in a private window, or with storage blocked, still works. */
  var mem = {};
  function sget(k) {
    try { var v = window.sessionStorage.getItem(k); return v ? JSON.parse(v) : (mem[k] || null); }
    catch (e) { return mem[k] || null; }
  }
  function sset(k, v) {
    mem[k] = v;
    try { window.sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* kept in this page's memory */ }
  }
  function sdel(k) {
    delete mem[k];
    try { window.sessionStorage.removeItem(k); } catch (e) { /* nothing kept */ }
  }
  function lget(k) {
    try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function lset(k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  }

  /* ================================================================ the server */
  function call(path, body) {
    var o = { method: body ? "POST" : "GET", cache: "no-store", credentials: "omit" };
    if (body) { o.headers = { "Content-Type": "application/json" }; o.body = JSON.stringify(body); }
    return window.fetch(SERVER + path, o).then(function (res) {
      return res.json().then(function (b) { return { status: res.status, b: obj(b) }; }, function () { return { status: res.status, b: {} }; });
    }, function () { return { status: 0, b: {} }; });
  }
  /* whether feedback emails are on, as the server says: true, false, or null when its list did not answer (then
     Stop stays at hand: an error is never shown as "off") */
  function tri(v) { return v === true ? true : v === false ? false : null; }
  /* the server's words for an error, in the page's own (spec section 5) */
  function errText(r) {
    var e = r.b && r.b.e;
    if (r.status === 0) return t("errNet");
    if (e === "old") return t("errOld");
    if (r.status === 429) return t("errLater");
    if (e === "budget") return t("errBudget");
    if (e === "title") return t("errTitle");
    if (r.status === 413 || e === "big") return t("errBig");
    if (e === "edit" && r.b && typeof r.b.replaced === "number") return t("errReplaced", dateLong(r.b.replaced));
    if (e === "edit") return t("errEdit");
    if (e === "nogame") return t("errNogame");
    if (e === "copy") return t("errCopy");
    return t("errServer");
  }

  /* ================================================================ text, numbers, links
     A person's text as the server keeps it (kit.js, cleanText): NFC, the zero-width space and the byte order
     mark removed, every run of white space one space, trimmed. The characters the server refuses (control
     characters, the ones that turn text around) are invisible, so they are simply left out here. */
  var BADCH = /[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g;
  function clean(x) {
    return String(x === undefined || x === null ? "" : x).normalize("NFC").replace(/[\u200B\uFEFF]/g, "")
      .replace(/\s+/g, " ").replace(BADCH, "").replace(/ {2,}/g, " ").trim();
  }
  /* a source link as the server keeps it (https, a host name with a dot, no name or password), or null */
  function linkOf(s) {
    if (!s) return "";
    if (s.length > 300 || !/^https:\/\/[^\s<>"'`\\]+$/i.test(s)) return null;
    var u;
    try { u = new URL(s); } catch (e) { return null; }
    if (u.protocol !== "https:" || !/^[^.]+(\.[^.]+)+$/.test(u.hostname) || u.username || u.password) return null;
    return u.href.length <= 300 ? u.href : null;
  }

  /* A number typed the language's way. Lenient: "3,5" in English and "3.5" in Italian are both three and a
     half; "1.234,5" and "1,234.5" are read in any language. One separator followed by exactly three digits
     ("1.234", "12,345") could be a thousand or a decimal: the language's reading is taken, and the editor
     asks which one was meant (two: true). -> { v: number|null, two?, group?, dec?, ip?, sign?, bad?, empty? } */
  function groupsOk(s, g) {
    var p = s.split(g);
    if (!/^\d{1,3}$/.test(p[0])) return false;
    for (var i = 1; i < p.length; i++) if (!/^\d{3}$/.test(p[i])) return false;
    return true;
  }
  function parseNum(text) {
    var bad = { v: null, bad: true };
    var s = String(text === undefined || text === null ? "" : text).replace(/[\s   '’]/g, "").replace(/−/g, "-");
    if (!s) return { v: null, empty: true };
    var m = /^([+-]?)(\d[\d.,]*|[.,]\d+)$/.exec(s);
    if (!m) return bad;
    var sign = m[1] === "-" ? "-" : "", body = m[2], D = DEC[lang];
    var dots = body.split(".").length - 1, commas = body.split(",").length - 1, ip, fp = "";
    if (dots && commas) {
      var last = Math.max(body.lastIndexOf("."), body.lastIndexOf(",")), ds = body.charAt(last), gs = ds === "." ? "," : ".";
      ip = body.slice(0, last);
      fp = body.slice(last + 1);
      if (ip.indexOf(ds) >= 0 || !groupsOk(ip, gs)) return bad;
      ip = ip.split(gs).join("");
    } else if (dots || commas) {
      var sep = dots ? "." : ",", parts = body.split(sep);
      if (parts.length > 2) {
        if (!groupsOk(body, sep)) return bad;
        ip = parts.join("");
      } else {
        ip = parts[0];
        fp = parts[1];
        if (fp.length === 3 && /^[1-9]\d{0,2}$/.test(ip)) {
          var g = Number(sign + ip + fp), dd = Number(sign + ip + "." + fp);
          return { v: sep === D ? dd : g, two: true, group: g, dec: dd, ip: ip, sign: sign };
        }
      }
    } else ip = body;
    if (!/^\d*$/.test(ip) || !/^\d*$/.test(fp) || (!ip && !fp)) return bad;
    var x = Number(sign + (ip || "0") + (fp ? "." + fp : ""));
    return isFinite(x) ? { v: x } : bad;
  }
  /* a number as it is put into a field: the language's decimal mark, grouped only from a million up (so
     the field never shows "1,234", the shape that reads two ways) */
  function numText(x) {
    if (!num(x)) return "";
    var neg = x < 0, a = Math.abs(x), s = String(a);
    if (/e/i.test(s)) s = a.toFixed(12).replace(/\.?0+$/, "");
    var p = s.split("."), ip = p[0], fp = p[1] || "";
    if (ip.length >= 7) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, GRP[lang]);
    return (neg ? "-" : "") + ip + (fp ? DEC[lang] + fp : "");
  }
  function decimals(step) {
    var s = String(step);
    if (/e-/.test(s)) return Number(s.split("e-")[1]) || 0;
    var i = s.indexOf(".");
    return i < 0 ? 0 : s.length - i - 1;
  }
  function nf(x, o) { try { return new Intl.NumberFormat(LOC[lang], o).format(x); } catch (e) { return String(x); } }
  function bigWord(v, w) {
    var n = Number(v.toPrecision(3));
    return fillIn(pick(wd(w), n), [nf(n, { maximumFractionDigits: 2 })]);
  }
  /* a number as players will read it (live.js's fmt, in the game's language) */
  function numShow(q, x) {
    if (!num(x)) return "";
    if (q.k === "year") return String(Math.round(x));
    var a = Math.abs(x);
    if (a >= 1e12) return bigWord(x / 1e12, "trillion");
    if (a >= 1e9) return bigWord(x / 1e9, "billion");
    if (a >= 1e6) return bigWord(x / 1e6, "million");
    if (q.log) return a > 0 && a < 1 ? nf(x, { maximumSignificantDigits: 2 }) : nf(x, { maximumFractionDigits: 2 });
    return nf(x, { maximumFractionDigits: Math.min(6, decimals(q.step || 1)) });
  }
  function withUnit(q, x) { return numShow(q, x) + (q.u ? " " + q.u : ""); }
  /* the answer as the maker typed it (players see it rounded to the slider at the reveal) */
  function exact(q, x) {
    if (q.k === "year" || Math.abs(x) >= 1e6) return numShow(q, x);
    return nf(x, { maximumFractionDigits: 6 });
  }
  function dateLong(ms) {
    try { return new Intl.DateTimeFormat(LOC[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(ms)); }
    catch (e) { return new Date(ms).toDateString(); }
  }
  function dateShort(ms) {
    try { return new Intl.DateTimeFormat(LOC[lang], { day: "numeric", month: "short" }).format(new Date(ms)); }
    catch (e) { return new Date(ms).toDateString(); }
  }
  /* "today", "yesterday", "3 days ago", by calendar days, in the language */
  function ago(ms) {
    var a = new Date(), b = new Date(ms);
    a.setHours(0, 0, 0, 0);
    b.setHours(0, 0, 0, 0);
    var n = Math.max(0, Math.round((a - b) / 864e5));
    try { return new Intl.RelativeTimeFormat(LOC[lang], { numeric: "auto" }).format(-n, "day"); }
    catch (e) { return dateShort(ms); }
  }

  /* ================================================================ the pictures */
  var ICON = {
    num: '<svg viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="13" width="30" height="3" rx="1.5" fill="currentColor" opacity=".35"/><rect x="11" y="6" width="12" height="9" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="3" width="2" height="16" rx="1" fill="currentColor"/></svg>',
    mc: '<svg viewBox="0 0 34 22" aria-hidden="true"><rect x="4" y="2" width="12" height="8" rx="2.5" fill="currentColor"/><rect x="18" y="2" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/><rect x="4" y="12" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/><rect x="18" y="12" width="12" height="8" rx="2.5" fill="currentColor" opacity=".35"/></svg>',
    tf: '<svg viewBox="0 0 34 22" aria-hidden="true"><path d="M4 11.5l3.8 3.8 7-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6l9 10M30 6l-9 10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" opacity=".45"/></svg>',
    tx: '<svg viewBox="0 0 34 22" aria-hidden="true"><text x="3" y="17" font-family="Bricolage Grotesque, sans-serif" font-weight="800" font-size="15" fill="currentColor">Aa</text><rect x="25" y="4" width="2.4" height="15" rx="1.2" fill="currentColor"/></svg>',
    check: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6 7.4-8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15.5V4.5M5 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4.5v11M5 11l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dup: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13.2 4.6A2.4 2.4 0 0 0 11 3.2H5.6A2.4 2.4 0 0 0 3.2 5.6V11a2.4 2.4 0 0 0 1.4 2.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    del: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4.4h4V6M6 6l.8 10.2h6.4L14 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5L7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    games: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1.8" fill="currentColor"/><rect x="11" y="3" width="6" height="6" rx="1.8" fill="currentColor" opacity=".45"/><rect x="3" y="11" width="6" height="6" rx="1.8" fill="currentColor" opacity=".45"/><rect x="11" y="11" width="6" height="6" rx="1.8" fill="currentColor"/></svg>',
    file: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11.5 2.8H6a2 2 0 0 0-2 2v10.4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.3z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M11.3 3v4.5H16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4.5v11M4.5 10h11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    share: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5v10M6 6.2l4-3.7 4 3.7M4.5 10.5v5.2c0 .7.6 1.3 1.3 1.3h8.4c.7 0 1.3-.6 1.3-1.3v-5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9.5M6 8.8l4 3.9 4-3.9M4.5 13.5v2.2c0 .7.6 1.3 1.3 1.3h8.4c.7 0 1.3-.6 1.3-1.3v-2.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    results: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="10" width="3.6" height="7" rx="1.2" fill="currentColor"/><rect x="8.2" y="5" width="3.6" height="12" rx="1.2" fill="currentColor"/><rect x="13.4" y="8" width="3.6" height="9" rx="1.2" fill="currentColor"/></svg>',
    refresh: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10a6 6 0 1 1-1.8-4.3M16 3.5v3.7h-3.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    /* the keep screen and the key part of the saved sheet (15 Oct 2026) */
    key: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12.2 12H21M17.5 12v3.2M20.5 12v2.4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    mail: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.6" y="4.4" width="14.8" height="11.2" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M3.4 5.6l6.6 5.2 6.6-5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    laptop: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="4.2" width="12" height="8.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M2.2 15.8h15.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    wayback: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.4 4.6 4 8l3.4 3.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.4 8h7.2a4.4 4.4 0 0 1 0 8.8H8.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    eye: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M1.8 10s3-5.6 8.2-5.6 8.2 5.6 8.2 5.6-3 5.6-8.2 5.6S1.8 10 1.8 10z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="10" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    eyeoff: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M1.8 10s3-5.6 8.2-5.6 8.2 5.6 8.2 5.6-3 5.6-8.2 5.6S1.8 10 1.8 10z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="10" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.6 3.6l12.8 12.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>'
  };
  /* the three languages' flags (Khayyam, 15 Oct 2026: "for the language sections: small flags are important"),
     drawn here so they look the same on every computer (an emoji flag is two letters on Windows) */
  var FLAG = {
    en: '<svg class="mk-flag" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30M60 0 0 30"/><path stroke="#C8102E" stroke-width="2" d="M0 0l60 30M60 0 0 30"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#C8102E" stroke-width="6" d="M30 0v30M0 15h60"/></svg>',
    it: '<svg class="mk-flag" viewBox="0 0 3 2" aria-hidden="true" focusable="false"><path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#CE2B37" d="M2 0h1v2H2z"/></svg>',
    tr: '<svg class="mk-flag" viewBox="0 0 1200 800" aria-hidden="true" focusable="false"><path fill="#E30A17" d="M0 0h1200v800H0z"/><circle cx="400" cy="400" r="200" fill="#fff"/><circle cx="450" cy="400" r="160" fill="#E30A17"/><path fill="#fff" d="M556.7 400L625.8 377.5 625.8 304.9 668.5 363.7 737.6 341.2 694.9 400 737.6 458.8 668.5 436.3 625.8 495.1 625.8 422.5z"/></svg>'
  };
  function dots(n) {
    var h = '<span class="mk-dots" aria-hidden="true">';
    for (var i = 0; i < 3; i++) h += i < n ? "<i></i>" : '<i class="mk-off"></i>';
    return h + "</span>";
  }
  function netIc(n) {
    return '<span class="mk-netic" style="width:' + { s: 14, m: 26, b: 46 }[n] + 'px"><i class="mk-net" style="left:0;right:0"></i></span>';
  }
  function qrSvg(text) {
    if (!QRG) return "";
    try {
      var q = QRG.QrCode.encodeText(text, QRG.QrCode.Ecc.MEDIUM), d = "", n = q.size;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (q.getModule(x, y)) d += "M" + (x + 2) + " " + (y + 2) + "h1v1h-1z";
      return '<svg viewBox="0 0 ' + (n + 4) + " " + (n + 4) + '" role="img" aria-label="' + esc(t("scanPlay")) + '"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#15172B"/></svg>';
    } catch (e) { return ""; }
  }
  function codeBoxes(code) { return '<div class="mk-code">' + String(code).split("").map(function (c) { return "<i>" + esc(c) + "</i>"; }).join("") + "</div>"; }

  /* ================================================================ the game: its shape (spec section 3) */
  var G = null;           // the game open in this tab
  function rid() {
    var a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(8), s = "";
    window.crypto.getRandomValues(b);
    for (var i = 0; i < b.length; i++) s += a[b[i] % a.length];
    return s;
  }
  function newId() {
    var used = {};
    if (G) G.kit.qs.forEach(function (q) { used[q.id] = 1; });
    var id = rid();
    while (used[id]) id = rid();
    return id;
  }
  function blankQ(type) {
    var q = { id: newId(), type: type, t: "", f: "", s: "" };
    if (type === "num") { q.a = null; q.lo = null; q.hi = null; q.log = false; q.step = null; q.u = ""; }
    else if (type === "mc") { q.o = ["", "", "", ""]; q.r = null; }
    else if (type === "tf") q.r = null;
    else { q.ok = []; q.fold = true; }
    return q;
  }
  function blankKit(l) {
    return { v: 1, title: "", line: "", lang: l, colour: "teal", sure: true, mode: "alone",
             st: { n: 0, shuffle: false, timer: 0, picked: false, teams: false, standings: true, awards: true }, qs: [] };
  }
  function newG(kit) {
    return { kit: kit, code: null, edit: null, copy: "", until: 0, plays: 0, from: null, note: "", sel: 0,
             saved: null,          // the game as last saved or opened, as JSON: what "unsaved" is measured against
             kept: true,           // false from a game's first save until its edit link is kept somewhere (the keep screen)
             way: false,           // whether the server keeps a way back (an email's fingerprint) for it
             wayAt: 0,             // since when (shown in the sheet: a date the maker does not recognise says someone else set it)
             mail: false,          // whether that email is on the list of feedback emails (the maker ticked it)
             raw: {}, m: {}, two: {}, sure2: {}, stash: {}, touched: {}, checked: false, titleErr: "" };
  }
  /* A game from anywhere (the server, a file, this tab's draft) as the editor holds it: known fields only,
     each of the right kind. Lenient, so nothing a maker wrote is lost: what is still wrong is said in words. */
  function txt(x, max) { return typeof x === "string" ? x.slice(0, max * 2) : ""; }
  function fnum(x) { return num(x) ? x : null; }
  function normKit(k) {
    k = obj(k);
    var st = obj(k.st), out = blankKit(LANGS.indexOf(k.lang) >= 0 ? k.lang : lang), ids = {};
    out.title = txt(k.title, 80);
    out.line = txt(k.line, 140);
    out.colour = COLOURS.indexOf(k.colour) >= 0 ? k.colour : "teal";
    out.sure = k.sure !== false;
    out.mode = k.mode === "live" ? "live" : "alone";
    out.st = { n: whole(st.n) && st.n > 0 && st.n <= MAXQ ? st.n : 0, shuffle: st.shuffle === true, timer: TIMERS.indexOf(st.timer) >= 0 ? st.timer : 0,
               picked: st.picked === true, teams: st.teams === true, standings: st.standings !== false, awards: st.awards !== false };
    (Array.isArray(k.qs) ? k.qs : []).slice(0, MAXQ).forEach(function (q) {
      q = obj(q);
      var type = q.type === undefined ? "num" : q.type;
      if (TYPES.indexOf(type) < 0) return;
      var n = blankQ(type);
      if (typeof q.id === "string" && /^[a-z0-9]{4,12}$/.test(q.id) && !ids[q.id]) n.id = q.id;
      while (ids[n.id]) n.id = rid();
      ids[n.id] = 1;
      n.t = txt(q.t, 200);
      n.f = txt(q.f, 240);
      n.s = txt(q.s, 300);
      if (type === "num") {
        n.a = fnum(q.a); n.lo = fnum(q.lo); n.hi = fnum(q.hi); n.log = q.log === true; n.u = txt(q.u, 20);
        if (q.k === "year") { n.k = "year"; n.log = false; }
        n.step = n.log ? 0 : n.k === "year" ? 1 : (num(q.step) && q.step > 0 ? q.step : autoStep(n));
      } else if (type === "mc") {
        n.o = (Array.isArray(q.o) ? q.o : []).slice(0, 4).map(function (x) { return txt(x, 80); });
        while (n.o.length < 2) n.o.push("");
        n.r = whole(q.r) && q.r >= 0 && q.r < n.o.length ? q.r : null;
      } else if (type === "tf") n.r = typeof q.r === "boolean" ? q.r : null;
      else {
        n.ok = (Array.isArray(q.ok) ? q.ok : []).filter(function (x) { return typeof x === "string" && x.trim(); }).slice(0, 10).map(function (x) { return x.slice(0, 120); });
        n.fold = q.fold !== false;
      }
      out.qs.push(n);
    });
    return out;
  }
  /* the game as it is sent, kept and downloaded: the texts cleaned, empty answer places left out */
  function builtQ(q) {
    var o = { id: q.id, type: q.type, t: clean(q.t), f: clean(q.f), s: "" };
    var s = clean(q.s), L = linkOf(s);
    o.s = L === null ? s : L;
    if (q.type === "num") {
      o.a = num(q.a) ? q.a : null; o.lo = num(q.lo) ? q.lo : null; o.hi = num(q.hi) ? q.hi : null;
      o.log = q.log === true; o.step = o.log ? 0 : num(q.step) ? q.step : null; o.u = clean(q.u);
      if (q.k === "year") o.k = "year";
    } else if (q.type === "mc") {
      var opts = [], r = null;
      (q.o || []).forEach(function (x, i) { var c = clean(x); if (!c) return; if (i === q.r) r = opts.length; opts.push(c); });
      o.o = opts;
      o.r = r;
    } else if (q.type === "tf") o.r = typeof q.r === "boolean" ? q.r : null;
    else { o.ok = (q.ok || []).map(clean).filter(Boolean); o.fold = q.fold !== false; }
    return o;
  }
  function built(k) {
    var qs = k.qs.map(builtQ), st = k.st;
    return { v: 1, title: clean(k.title), line: clean(k.line), lang: k.lang, colour: k.colour, sure: k.sure !== false, mode: k.mode,
             st: { n: st.n > 0 && st.n < qs.length ? st.n : 0, shuffle: !!st.shuffle, timer: st.timer, picked: !!st.picked, teams: !!st.teams,
                   standings: st.standings !== false, awards: st.awards !== false }, qs: qs };
  }

  /* ---- the slider's step and ends (spec 8.3) ----
     The step comes from the ends: 1 for whole numbers and years (up to 2,000 places), otherwise a hundredth
     of the range's power of ten (100 to 1,000 places). */
  function autoStep(q) {
    if (q.log) return 0;
    if (q.k === "year") return 1;
    if (!num(q.lo) || !num(q.hi) || !(q.hi > q.lo)) return null;
    var range = q.hi - q.lo, p = p10(Math.floor(lg10(range)) - 2);
    var wholes = [q.a, q.lo, q.hi].every(function (x) { return !num(x) || whole(x); });
    if (wholes && range >= 4 && range <= 2000) return 1;
    return wholes ? Math.max(1, p) : p;
  }
  function restep(q) { q.step = q.log ? 0 : autoStep(q); }
  /* the round number nearest x (> 0) */
  var NICE = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8];
  function niceNear(x) {
    var e = Math.floor(lg10(x)), best = null;
    [e - 1, e, e + 1].forEach(function (k) {
      NICE.forEach(function (m) {
        var v = Number((m * p10(k)).toPrecision(6));
        if (best === null || Math.abs(v - x) < Math.abs(best - x)) best = v;
      });
    });
    return best;
  }
  /* Ends suggested from the answer: straight from 0 to a round number about twice it; from 1,000 up, log,
     two powers of ten below to one above; a year, about a century around (the answer near two thirds). */
  function suggest(q) {
    var a = q.a;
    if (!num(a) || Math.abs(a) > 1e15) return null;
    if (q.k === "year") {
      if (!whole(a)) return null;
      var y0 = Math.floor((a - 65) / 10) * 10;
      return { lo: y0, hi: y0 + 100, log: false };
    }
    var m = (G && G.m[q.id]) || {}, log = m.scale ? q.log : a >= 1000;
    if (log && a > 0) { var e = Math.floor(lg10(a)); return { lo: p10(e - 2), hi: p10(e + 2), log: true }; }
    if (a > 0) return { lo: 0, hi: niceNear(2 * a), log: false };
    if (a < 0) return { lo: -niceNear(-2 * a), hi: 0, log: false };
    return { lo: -10, hi: 10, log: false };
  }
  function meta(q) { return G.m[q.id] || (G.m[q.id] = {}); }

  /* ================================================================ the checks (kit.js's cleanKit, here first)
     Each problem: { i: the question's place (-1 for the game), f: the field, m: the words }. */
  function decimalsOk(x) { return Math.abs(x - Number(x.toFixed(6))) <= Math.abs(x) * 1e-12; }
  function qProblems(q) {
    var out = [];
    function add(f, m) { out.push({ f: f, m: m }); }
    if (!q.t) add("t", t("vQ"));
    else if (q.t.length > 200) add("t", t("vLong", 200));
    if (q.type === "num") {
      var a = q.a, lo = q.lo, hi = q.hi;
      if (a === null) add("a", t("vNum"));
      else if (Math.abs(a) > 1e15) add("a", t("vHuge"));
      if (q.u.length > 20) add("a", t("vLong", 20));
      if (lo === null || hi === null) add("lo", t("vEnds"));
      else if (Math.abs(lo) > 1e15 || Math.abs(hi) > 1e15) add("lo", t("vHuge"));
      else if (!(lo < hi)) add("lo", t("vOrder"));
      else {
        if (a !== null && Math.abs(a) <= 1e15 && (a < lo || a > hi)) add("a", t("vOutside"));
        if (q.log) {
          if (!(lo > 0)) add("lo", t("vLogZero"));
          else if (!(hi / lo >= 3)) add("lo", t("vLogRatio"));
        } else {
          var st = q.step, n = st > 0 ? (hi - lo) / st : 0;
          if (!(st > 0) || !decimalsOk(st) || !(n >= 4 && n <= 1e6)) add("lo", t("vClose"));
        }
        if (q.k === "year" && ((a !== null && !whole(a)) || !whole(lo) || !whole(hi))) add("a", t("vYear"));
      }
    } else if (q.type === "mc") {
      var seen = {}, dup = false, bad = false, long = false;
      q.o.forEach(function (x) {
        if (x.length > 80) long = true;
        var k = R.fold(x, true);
        if (!k) bad = true; else { if (seen[k]) dup = true; seen[k] = 1; }
      });
      if (long) add("o", t("vLong", 80));
      if (bad) add("o", t("vLetters"));
      if (q.o.length < 2) add("o", t("vTwo"));
      else if (dup) add("o", t("vSame"));
      if (q.r === null && q.o.length >= 2) add("r", t("vTick"));
    } else if (q.type === "tf") {
      if (typeof q.r !== "boolean") add("r", t("vTickTF"));
    } else {
      var seen2 = {}, dup2 = false, bad2 = false, long2 = false;
      q.ok.forEach(function (x) {
        if (x.length > 60) long2 = true;
        var k = R.fold(x, q.fold);
        if (!k) bad2 = true; else { if (seen2[k]) dup2 = true; seen2[k] = 1; }
      });
      if (q.ok.length > 10) add("ok", t("okMax"));
      if (long2) add("ok", t("vLong", 60));
      if (bad2) add("ok", t("vLetters"));
      if (dup2) add("ok", t("vSameOk"));
    }
    if (q.f.length > 240) add("f", t("vLong", 240));
    if (q.s && linkOf(q.s) === null) add("s", t("vSrc"));
    return out;
  }
  function problems(b) {
    var out = [];
    if (!b.title) out.push({ i: -1, f: "title", m: t("vTitle") });
    else if (b.title.length > 80) out.push({ i: -1, f: "title", m: t("vLong", 80) });
    if (b.line.length > 140) out.push({ i: -1, f: "line", m: t("vLong", 140) });
    if (!b.qs.length) out.push({ i: -1, f: "qs", m: t("vNoQs") });
    if (b.qs.length > MAXQ) out.push({ i: -1, f: "qs", m: t("vManyQs") });
    b.qs.forEach(function (q, i) { qProblems(q).forEach(function (p) { out.push({ i: i, f: p.f, m: p.m }); }); });
    return out;
  }
  /* the server's own refusal, when it ever disagrees with the page: its field, in words */
  function whyProblem(why) {
    var m = /^q(\d+)\.(\w+)$/.exec(String(why || ""));
    if (m) return { i: +m[1] - 1, f: m[2] === "hi" ? "lo" : m[2], m: t("vField") };
    if (why === "title-text") return { i: -1, f: "title", m: t("vTitle") };
    if (why === "line") return { i: -1, f: "line", m: t("vLong", 140) };
    if (why === "qs") return { i: -1, f: "qs", m: t("vNoQs") };
    return { i: -1, f: "", m: t("errServer") };
  }

  /* ================================================================ unsaved work */
  function snapJson() { return JSON.stringify(built(G.kit)); }
  function hasContent() {
    var k = G.kit;
    return !!(clean(k.title) || clean(k.line) || k.qs.length > 1 || k.qs.some(function (q) {
      var b = builtQ(q);
      return b.t || b.f || b.s || (b.o && b.o.length) || (b.ok && b.ok.length) || b.a !== null && b.a !== undefined;
    }));
  }
  function isDirty() {
    if (!G) return false;
    return G.saved === null ? hasContent() : snapJson() !== G.saved;
  }
  var tickT = 0;
  function changed() { clearTimeout(tickT); tickT = setTimeout(tick, 300); }
  function tick() {
    tickT = 0;
    if (!G) return;
    writeDraft();
    saveDots();
    marks();
    gameErrs();
    qErrs();
    /* the panel follows the fixes, drawn again only when its list changes (it is an alert: no repeating) */
    if (msgBox.getAttribute("data-kind") === "problems") {
      var p = problems(built(G.kit));
      if (!p.length) msgClear();
      else if (probKey(p) !== msgBox.getAttribute("data-key")) showProblems(p);
    }
  }
  function probKey(list) { return list.map(function (p) { return p.i + "." + p.f + "." + p.m; }).join("|"); }
  function writeDraft() {
    if (!G) return;
    sset(KS.draft, { code: G.code, kit: G.kit, t: now(), from: G.from, note: G.note, sel: G.sel, raw: G.raw, m: G.m, saved: G.saved, kept: G.kept });
  }
  /* the browser's own leave question: unsaved work, or a new game whose edit link is kept nowhere yet */
  function unkept() { return !!(G && G.code && G.kept === false); }
  window.addEventListener("beforeunload", function (e) {
    if (G && !G.leaving && (isDirty() || unkept())) { e.preventDefault(); e.returnValue = ""; }
  });

  /* ================================================================ views */
  var VIEWS = ["v-start", "v-load", "v-edit", "v-results", "v-stop"];
  function show(id) {
    VIEWS.forEach(function (v) { $(v).hidden = v !== id; });
    $("mk-topr").hidden = !(id === "v-edit" || id === "v-results");
    $("mk-dock").hidden = id !== "v-edit";
    document.body.classList.toggle("mk-nodock", id !== "v-edit");
    if (id !== "v-edit" && id !== "v-results") $("mk-gtitle").textContent = "";
    window.scrollTo(0, 0);
  }
  function applyWords() {
    document.documentElement.lang = lang;
    document.title = t("docTitle");
    each(document.querySelectorAll("[data-w]"), function (e) { e.textContent = t(e.getAttribute("data-w")); });
    each(document.querySelectorAll("[data-wp]"), function (e) { e.setAttribute("placeholder", t(e.getAttribute("data-wp"))); });
    each(document.querySelectorAll("[data-wa]"), function (e) { e.setAttribute("aria-label", t(e.getAttribute("data-wa"))); });
    each(document.querySelectorAll("[data-ws]"), function (e) { e.textContent = t("secs", +e.getAttribute("data-ws")); });
    /* the terms for games people make, in the language on screen (the page reads #lang=…, as the report form) */
    each(document.querySelectorAll("[data-terms]"), function (a) { a.href = TO.here("../terms/") + "#" + lang; });
    /* the counter's sentence, only where visits are counted (the live site; never on this computer). This page
       counts them as small pictures, with no script from outside (assets/js/turnsout.js, pixel) */
    each(document.querySelectorAll("[data-counted]"), function (e) { e.hidden = !(TO.counting && TO.counting()); });
    $("mk-gamesbtn").setAttribute("aria-label", t("yourGames"));
    $("mk-gamesbtn").title = t("yourGames");          // on a tablet or a phone the button is its picture only
  }
  var mqPhone = window.matchMedia("(max-width: 759px)");
  function phone() { return mqPhone.matches; }
  /* a radio group: only its chosen radio is in the Tab order, the arrows move within it */
  function rove(g) {
    if (!g) return;
    var rs = g.querySelectorAll('[role="radio"]'), any = false;
    each(rs, function (r) { var on = r.getAttribute("aria-checked") === "true"; r.tabIndex = on ? 0 : -1; if (on) any = true; });
    if (!any && rs[0]) rs[0].tabIndex = 0;
  }
  function segSet(g, v) {
    if (!g) return;
    each(g.querySelectorAll("button[data-v]"), function (b) {
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(b.getAttribute("data-v") === String(v)));
    });
    rove(g);
  }
  document.addEventListener("keydown", function (e) {
    var el = e.target;
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "s" || e.key === "S") && G && !$("v-edit").hidden) { e.preventDefault(); save(); return; }
    if (!el || !el.getAttribute || el.getAttribute("role") !== "radio") return;
    var k = e.key, d = k === "ArrowRight" || k === "ArrowDown" ? 1 : k === "ArrowLeft" || k === "ArrowUp" ? -1 : 0;
    if (!d) return;
    var g = el.closest('[role="radiogroup"]');
    if (!g) return;
    var all = Array.prototype.filter.call(g.querySelectorAll('[role="radio"]'), function (x) { return !x.disabled && !x.hidden; });
    var i = all.indexOf(el);
    if (i < 0) return;
    e.preventDefault();
    var nx = all[(i + d + all.length) % all.length];
    nx.focus();
    nx.click();
  });

  /* ---- the panel of problems and messages ---- */
  var msgBox = $("mk-msg"), shownProblems = [];
  function msgClear() { msgBox.hidden = true; msgBox.innerHTML = ""; msgBox.removeAttribute("data-kind"); msgBox.removeAttribute("data-key"); msgBox._acts = []; }
  function msgShow(kind, inner, acts) {
    msgBox._acts = acts || [];
    msgBox.innerHTML = '<div class="mk-msg-body">' + inner + (msgBox._acts.length ? '<div class="mk-btnrow">' + msgBox._acts.map(function (a, i) {
      return '<button class="btn ' + (a.solid ? "solid" : "ghost") + '" type="button" data-mi="' + i + '">' + esc(a.text) + "</button>";
    }).join("") + "</div>" : "") + '</div><button class="mk-x" type="button" data-mx aria-label="' + esc(t("close")) + '">×</button>';
    msgBox.setAttribute("data-kind", kind);
    msgBox.hidden = false;
  }
  function sayErr(text, acts) { msgShow("err", "<p>" + esc(text) + "</p>", acts); }
  /* the problems, one line for each question (its first): the others show next to their fields */
  function showProblems(all) {
    var seen = {}, list = all.filter(function (p) { var k = p.i < 0 ? p.f : p.i; if (seen[k]) return false; seen[k] = 1; return true; });
    shownProblems = list;
    var items = list.slice(0, 8).map(function (p, i) {
      return '<li><button type="button" data-pi="' + i + '">' + esc(p.i < 0 ? cap(p.m) : t("qProblem", p.i + 1, p.m)) + "</button></li>";
    }).join("");
    msgShow("problems", "<p>" + esc(t("fixFirst")) + "</p><ul>" + items + "</ul>" + (list.length > 8 ? '<p class="mk-small">… +' + nfmt(list.length - 8) + "</p>" : ""));
    msgBox.setAttribute("data-key", probKey(all));
  }
  msgBox.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.hasAttribute("data-mx")) { msgClear(); return; }
    var i = b.getAttribute("data-mi");
    if (i !== null) { var a = msgBox._acts[+i]; if (a && a.go) a.go(); return; }
    var p = b.getAttribute("data-pi");
    if (p !== null) gotoProblem(+p);
  });
  function gotoProblem(j) {
    var p = shownProblems[j];
    if (!p || !G) return;
    if (p.i < 0) {
      if (phone()) showList();
      var el = p.f === "line" ? $("g-line") : p.f === "qs" ? $("g-add") : $("g-title");
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "center" });
      return;
    }
    openQ(p.i, { focus: p.f });
  }

  /* ---- a short line at the bottom: "Saved", or a question deleted, with Undo ---- */
  var toastT = 0;
  function toast(text, actText, act, ms) {
    var el = $("mk-toast");
    el.innerHTML = "<span>" + esc(text) + "</span>" + (actText ? '<button type="button">' + esc(actText) + "</button>" : "");
    el.classList.toggle("mk-solo", !actText);
    el.hidden = false;
    var b = el.querySelector("button");
    if (b) b.addEventListener("click", function () { el.hidden = true; clearTimeout(toastT); act(); });
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.hidden = true; }, ms || 2400);
  }

  /* ================================================================ the start */
  function showStart() {
    G = null;
    lang = browserLang();            // the start speaks the browser's language when it is one of the three
    applyWords();
    document.body.setAttribute("data-kc", "teal");
    var last = lget(KS.lang), mark = LANGS.indexOf(last) >= 0 ? last : lang;
    each(document.querySelectorAll(".mk-lang"), function (b) {
      var on = b.getAttribute("data-lang") === mark;
      b.classList.toggle("mk-mine", on);
      b.querySelector(".mk-langtag").textContent = on ? (LANGS.indexOf(last) >= 0 ? t("lastUsed") : t("yourBrowser")) : "";
    });
    $("st-tiles").innerHTML = TYPES.map(function (ty) { return "<span>" + ICON[ty] + "<b>" + esc(sub("types", ty)) + "</b></span>"; }).join("");
    drawKeptInto($("st-games"), $("st-nogames"));
    show("v-start");
  }
  function loadingView() { applyWords(); show("v-load"); }
  function newGame(l) {
    if (LANGS.indexOf(l) < 0) return;
    lset(KS.lang, l);
    lang = l;
    G = newG(blankKit(l));
    G.kit.qs.push(blankQ("num"));
    sdel(KS.open);
    writeDraft();
    TO.count("live/build/new-" + l);
    enterEditor({ focus: "title" });
  }
  each(document.querySelectorAll(".mk-lang"), function (b) {
    b.addEventListener("click", function () { msgClear(); newGame(b.getAttribute("data-lang")); });
  });
  $("st-file").addEventListener("click", function () { fileIn.click(); });

  /* ================================================================ the editor */
  function enterEditor(o) {
    o = o || {};
    lang = G.kit.lang;
    applyWords();
    document.body.setAttribute("data-kc", G.kit.colour);
    if (msgBox.getAttribute("data-kind") === "problems") msgClear();
    drawGame();
    drawSettings();
    if (G.sel >= G.kit.qs.length) G.sel = Math.max(0, G.kit.qs.length - 1);
    drawQ();
    $("mk-grid").setAttribute("data-pane", "list");
    show("v-edit");
    growAll();
    updateTop();
    if (o.focus === "title" && !phone()) $("g-title").focus();
  }
  function updateTop() {
    if (!G) return;
    var res = !$("v-results").hidden;
    $("mk-gtitle").textContent = clean(G.kit.title) + (res ? " · " + t("results") : "");
    var cc = $("mk-codechip");
    cc.hidden = !G.code;
    cc.textContent = G.code || "";
    if (G.code) cc.setAttribute("aria-label", t("codeChip", G.code));
    $("mk-resbtn").hidden = !G.code || res;
    $("mk-save").hidden = res;
    saveDots();
  }
  function saveDots() {
    if (!G) return;
    var d = isDirty();
    each(document.querySelectorAll(".mk-savebtn"), function (b) {
      b.querySelector(".mk-dot").hidden = !d;
      b.setAttribute("aria-label", d ? t("save") + " · " + t("notSaved") : t("save"));
    });
  }

  /* ---- the left column: the game, its colour and its questions ---- */
  function drawGame() {
    $("g-title").value = G.kit.title;
    $("g-line").value = G.kit.line;
    drawNote();
    drawColours();
    drawList();
    gameErrs();
  }
  function drawNote() {
    var n = $("g-note"), w = !G.code && G.note === "copy" ? "copyLine" : !G.code && G.note === "file" ? "fileLine" : "";
    n.textContent = w ? t(w) : "";
    n.hidden = !w;
  }
  function drawColours() {
    $("g-colours").innerHTML = COLOURS.map(function (c) {
      return '<button class="mk-sw" type="button" role="radio" data-c="' + c + '" aria-checked="' + (c === G.kit.colour) + '" aria-label="' + esc(sub("colours", c)) + '"></button>';
    }).join("");
    rove($("g-colours"));
  }
  var mqMouse = window.matchMedia("(pointer: fine)");
  function liHtml(q, i) {
    var x = clean(q.t);
    return '<li><button class="mk-li" type="button" data-i="' + i + '"' + (mqMouse.matches ? ' draggable="true"' : "") + (i === G.sel ? ' aria-current="true"' : "") + "><b>" + (i + 1) +
      '</b><span class="mk-tyi" title="' + esc(sub("types", q.type)) + '">' + ICON[q.type] + '</span><span class="mk-lt' + (x ? "" : " mk-empty") + '" dir="auto">' +
      esc(x ? cut(x, 120) : t("newQ")) + '</span><i class="mk-bad" hidden><span aria-hidden="true">!</span><span class="sr-only">' + esc(t("hasProblem")) + "</span></i></button></li>";
  }
  function drawList() {
    $("g-qsl").textContent = t("qsL", G.kit.qs.length);
    $("g-list").innerHTML = G.kit.qs.map(liHtml).join("");
    $("g-add").disabled = G.kit.qs.length >= MAXQ;
    marks();
    drawToPlay();
  }
  function listItem(i) { return $("g-list").querySelector('.mk-li[data-i="' + i + '"]'); }
  /* one question's line as it is typed: never the whole list */
  function updateLi(i) {
    var b = listItem(i), q = G.kit.qs[i];
    if (!b || !q) return;
    var x = clean(q.t), lt = b.querySelector(".mk-lt");
    lt.textContent = x ? cut(x, 120) : t("newQ");
    lt.classList.toggle("mk-empty", !x);
    var ty = b.querySelector(".mk-tyi");
    ty.innerHTML = ICON[q.type];
    ty.title = sub("types", q.type);
  }
  /* the "!" on questions that still need something, once a save was tried */
  function marks() {
    if (!G) return;
    each($("g-list").querySelectorAll(".mk-li"), function (b) {
      var q = G.kit.qs[+b.getAttribute("data-i")];
      b.querySelector(".mk-bad").hidden = !(G.checked && q && qProblems(builtQ(q)).length);
    });
  }
  function setErr(id, m, field) {
    var e = $(id);
    if (!e) return;
    e.textContent = m || "";
    e.hidden = !m;
    if (field) { if (m) field.setAttribute("aria-invalid", "true"); else field.removeAttribute("aria-invalid"); }
  }
  function gameErrs() {
    if (!G) return;
    var title = clean(G.kit.title), line = clean(G.kit.line);
    var te = G.titleErr || (!title ? (G.checked ? t("vTitle") : "") : title.length > 80 ? t("vLong", 80) : "");
    setErr("e-title", cap(te), $("g-title"));
    setErr("e-line", line.length > 140 ? cap(t("vLong", 140)) : "", $("g-line"));
    setErr("e-qs", G.checked && !G.kit.qs.length ? cap(t("vNoQs")) : "");
  }
  $("g-title").addEventListener("input", function () {
    G.kit.title = this.value;
    G.titleErr = "";
    $("mk-gtitle").textContent = clean(this.value);
    changed();
  });
  $("g-line").addEventListener("input", function () { G.kit.line = this.value; changed(); });
  $("g-colours").addEventListener("click", function (e) {
    var b = e.target.closest("[data-c]");
    if (!b || !G) return;
    G.kit.colour = b.getAttribute("data-c");
    document.body.setAttribute("data-kc", G.kit.colour);
    each(this.querySelectorAll("[data-c]"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
    rove(this);
    changed();
  });
  $("g-list").addEventListener("click", function (e) {
    var b = e.target.closest(".mk-li");
    if (b) openQ(+b.getAttribute("data-i"));
  });
  /* keyboard: Alt with an arrow moves the question in the list */
  $("g-list").addEventListener("keydown", function (e) {
    if (!e.altKey || (e.key !== "ArrowUp" && e.key !== "ArrowDown")) return;
    var b = e.target.closest(".mk-li");
    if (!b) return;
    e.preventDefault();
    var i = +b.getAttribute("data-i"), j = i + (e.key === "ArrowUp" ? -1 : 1);
    if (j < 0 || j >= G.kit.qs.length) return;
    moveTo(i, j);
    var nb = listItem(j);                       // the focus goes with the question that moved
    if (nb) nb.focus();
  });
  /* a mouse can drag a question to its place (the buttons and the keys do the same for everyone) */
  var dragI = -1;
  $("g-list").addEventListener("dragstart", function (e) {
    var b = e.target.closest(".mk-li");
    if (!b) return;
    dragI = +b.getAttribute("data-i");
    b.classList.add("mk-drag");
    try { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(dragI)); } catch (x) { /* fine */ }
  });
  $("g-list").addEventListener("dragover", function (e) {
    if (dragI < 0) return;
    var b = e.target.closest(".mk-li");
    if (!b) return;
    e.preventDefault();
    each(this.querySelectorAll(".mk-over"), function (x) { if (x !== b) x.classList.remove("mk-over"); });
    b.classList.add("mk-over");
  });
  $("g-list").addEventListener("drop", function (e) {
    var b = e.target.closest(".mk-li");
    if (dragI < 0 || !b) return;
    e.preventDefault();
    var to = +b.getAttribute("data-i"), from = dragI;
    dragI = -1;
    moveTo(from, to);
  });
  $("g-list").addEventListener("dragend", function () {
    dragI = -1;
    each(this.querySelectorAll(".mk-drag, .mk-over"), function (x) { x.classList.remove("mk-drag", "mk-over"); });
  });
  $("g-add").addEventListener("click", function () { addQ(); });
  $("g-paste").addEventListener("click", openPaste);

  /* ---- the questions: add, move, duplicate, delete (with Undo) ---- */
  function cur() { return G && G.kit.qs[G.sel] || null; }
  function addQ(ty) {
    if (!G || G.kit.qs.length >= MAXQ) return;
    var q = blankQ(ty || (cur() ? cur().type : "num"));
    G.kit.qs.push(q);
    drawList();
    openQ(G.kit.qs.length - 1, { focus: "t" });
    changed();
  }
  function moveTo(from, to) {
    var qs = G.kit.qs;
    if (from === to || from < 0 || to < 0 || from >= qs.length || to >= qs.length) return;
    var selId = cur() ? cur().id : null, q = qs.splice(from, 1)[0];
    qs.splice(to, 0, q);
    qs.forEach(function (x, i) { if (x.id === selId) G.sel = i; });
    drawList();
    drawQ();
    changed();
  }
  function dupQ() {
    var q = cur();
    if (!q || G.kit.qs.length >= MAXQ) return;
    var c = JSON.parse(JSON.stringify(q));
    c.id = newId();
    if (G.m[q.id]) G.m[c.id] = JSON.parse(JSON.stringify(G.m[q.id]));
    G.kit.qs.splice(G.sel + 1, 0, c);
    G.sel++;
    drawList();
    drawQ();
    changed();
  }
  function delQ() {
    var g = G, i = G.sel, q = G.kit.qs[i];
    if (!q) return;
    G.kit.qs.splice(i, 1);
    G.sel = Math.max(0, Math.min(i, G.kit.qs.length - 1));
    drawList();
    drawQ();
    changed();
    toast(t("deletedQ", i + 1), t("undo"), function () {
      if (g !== G || G.kit.qs.length >= MAXQ) return;
      G.kit.qs.splice(Math.min(i, G.kit.qs.length), 0, q);
      G.sel = Math.min(i, G.kit.qs.length - 1);
      drawList();
      drawQ();
      changed();
    }, 7000);
  }

  /* ---- the panes of a phone: the list, or one question full width with Back ---- */
  function openQ(i, o) {
    o = o || {};
    if (!G || i < 0 || i >= G.kit.qs.length) return;
    var prev = $("g-list").querySelector('.mk-li[aria-current="true"]');
    if (prev) prev.removeAttribute("aria-current");
    G.sel = i;
    var li = listItem(i);
    if (li) li.setAttribute("aria-current", "true");
    /* on a phone the question's pane is shown first, so its text boxes are measured as they will be */
    if (phone() && $("mk-grid").getAttribute("data-pane") !== "q") {
      $("mk-grid").setAttribute("data-pane", "q");
      try { window.history.pushState({ mk: "q" }, "", window.location.pathname + window.location.search); } catch (e) { /* Back still works */ }
    }
    drawQ();
    if (phone()) window.scrollTo(0, 0);
    else if (li && !o.noScroll) {
      var r = li.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) li.scrollIntoView({ block: "nearest" });
    }
    if (o.focus) focusField(o.focus);
    changed();
  }
  function showList() {
    $("mk-grid").setAttribute("data-pane", "list");
    var li = listItem(G ? G.sel : 0);
    if (li) li.scrollIntoView({ block: "center" });
  }
  function backToList() {
    if (window.history.state && window.history.state.mk === "q") { window.history.back(); return; }
    showList();
  }
  window.addEventListener("popstate", function (e) {
    var st = e.state || {};
    if (!$("v-results").hidden && st.mk !== "r") closeResults();
    if (st.mk !== "q" && $("mk-grid").getAttribute("data-pane") === "q") showList();
  });

  /* ---- the open question ---- */
  var qcol = $("mk-qcol");
  function err(f) { return '<p class="mk-err" id="e-' + f + '" hidden></p>'; }
  function tool(act, off) { return '<button class="mk-tool" type="button" data-act="' + act + '" aria-label="' + esc(t(act)) + '" title="' + esc(t(act)) + '"' + (off ? " disabled" : "") + ">" + ICON[act] + "</button>"; }
  function numIn(f, by) {
    return '<span class="mk-numwrap"><input class="mk-in mk-numin" id="f-' + f + '" inputmode="decimal" autocomplete="off" spellcheck="false" aria-describedby="e-' + by + '">' +
      '<button class="mk-sign" type="button" data-act="sign" data-f="' + f + '" aria-label="' + esc(t("sign")) + '" tabindex="-1">±</button></span>';
  }
  function drawQ() {
    var q = cur(), k = G.kit;
    if (!q) {
      qcol.innerHTML = '<div class="mk-empty-state"><p class="mk-h2">' + esc(t("noQs")) + '</p><div class="mk-btnrow" style="justify-content:center"><button class="btn solid" type="button" data-act="add">' +
        esc(t("addQ")) + '</button><button class="btn ghost" type="button" data-act="paste">' + esc(t("paste")) + "</button></div></div>";
      return;
    }
    var n = k.qs.length, i = G.sel, h = "";
    h += '<div class="mk-phonenav"><button class="mk-back" type="button" data-act="back">' + ICON.back + "<span>" + esc(t("backQs")) + '</span></button><span class="mk-qnav">' +
      '<button class="mk-tool" type="button" data-act="prev" aria-label="' + esc(t("prevQ")) + '"' + (i ? "" : " disabled") + ">" + ICON.back + "</button><span>" + (i + 1) + "/" + n + "</span>" +
      '<button class="mk-tool" type="button" data-act="next" aria-label="' + esc(t("nextQ")) + '"' + (i < n - 1 ? "" : " disabled") + ">" + ICON.next + "</button></span></div>";
    h += '<div class="mk-qhead"><p class="mk-lab" id="l-ty">' + esc(t("qHead", i + 1)) + '</p><div class="mk-qtools">' + tool("up", i === 0) + tool("down", i === n - 1) + tool("dup", n >= MAXQ) + tool("del", false) + "</div></div>";
    h += '<div class="mk-ty" role="radiogroup" aria-labelledby="l-ty">' + TYPES.map(function (ty) {
      return '<button type="button" role="radio" data-ty="' + ty + '" aria-checked="' + (ty === q.type) + '">' + ICON[ty] + "<span>" + esc(sub("types", ty)) + "</span></button>";
    }).join("") + "</div>";
    h += '<label class="mk-lab" for="f-t">' + esc(t("qL")) + '</label><textarea class="mk-in" id="f-t" rows="1" maxlength="200" dir="auto" aria-describedby="e-t" placeholder="' + esc(t("qPh")) + '"></textarea>' + err("t");
    h += typeFields(q);
    h += '<label class="mk-lab" for="f-f">' + esc(t("afterL")) + '</label><textarea class="mk-in" id="f-f" rows="1" maxlength="240" dir="auto" aria-describedby="e-f" placeholder="' + esc(t("afterPh")) + '"></textarea>' + err("f");
    h += '<label class="mk-lab" for="f-s">' + esc(t("srcL")) + '</label><input class="mk-in" id="f-s" type="url" inputmode="url" maxlength="300" autocomplete="off" spellcheck="false" aria-describedby="e-s" placeholder="https://…">' + err("s");
    h += '<div class="mk-prev" id="mk-prev"></div>';
    qcol.innerHTML = h;
    if (G.drawn !== q.id) { qcol.scrollTop = 0; G.drawn = q.id; }
    rove(qcol.querySelector(".mk-ty"));
    /* what a person typed goes into the fields as values, never through HTML */
    $("f-t").value = q.t;
    $("f-f").value = q.f;
    $("f-s").value = q.s;
    grow($("f-t"));
    grow($("f-f"));
    fillType(q);
    drawPreview();
    qErrs();
  }
  function typeFields(q) {
    if (q.type === "num") {
      return '<div class="mk-three"><div><label class="mk-lab" for="f-a">' + esc(t("answerL")) + "</label>" + numIn("a", "a") + '</div><div><label class="mk-lab" for="f-u">' + esc(t("unitL")) +
        '</label><input class="mk-in" id="f-u" maxlength="20" dir="auto" autocomplete="off" placeholder="' + esc(t("unitPh")) + '"></div></div>' + err("a") + '<div id="w-a"></div>' +
        '<div class="mk-two"><div><label class="mk-lab" for="f-lo">' + esc(t("fromL")) + "</label>" + numIn("lo", "lo") + '</div><div><label class="mk-lab" for="f-hi">' + esc(t("toL")) + "</label>" + numIn("hi", "lo") + "</div></div>" +
        err("lo") + '<div id="w-lo"></div><div id="w-hi"></div><p class="mk-small" id="n-sug" hidden>' + esc(t("suggested")) + "</p>" +
        '<div class="mk-two"><div><span class="mk-lab" id="l-scale">' + esc(t("scaleL")) + '</span><div class="mk-seg" id="f-scale" role="radiogroup" aria-labelledby="l-scale"><button type="button" data-act="scale" data-v="0">' +
        esc(t("straight")) + '</button><button type="button" data-act="scale" data-v="1">' + esc(t("logS")) + '</button></div></div><div><span class="mk-lab" id="l-kind">' + esc(t("shownL")) +
        '</span><div class="mk-seg" id="f-kind" role="radiogroup" aria-labelledby="l-kind"><button type="button" data-act="kind" data-v="n">' + esc(t("asNumber")) + '</button><button type="button" data-act="kind" data-v="year">' + esc(t("asYear")) + "</button></div></div></div>";
    }
    if (q.type === "mc") {
      return '<p class="mk-lab" id="l-opts">' + esc(t("answersL")) + '</p><div class="mk-opts" id="f-opts" role="radiogroup" aria-labelledby="l-opts">' + q.o.map(function (x, i) {
        var L = LETTERS[i];
        return '<div class="mk-opt"><button class="mk-mark" type="button" role="radio" data-act="mark" data-i="' + i + '" aria-checked="' + (q.r === i) + '" aria-label="' + esc(t("markRightN", L)) + '">' + ICON.check +
          '</button><input class="mk-in" data-o="' + i + '" maxlength="80" dir="auto" autocomplete="off" aria-label="' + esc(t("answerN", L)) + '" placeholder="' + esc(t("answerN", L)) + '">' +
          '<button class="mk-rm" type="button" data-act="rmopt" data-i="' + i + '" aria-label="' + esc(t("removeAns", L)) + '"' + (q.o.length <= 2 ? " hidden" : "") + ">×</button></div>";
      }).join("") + '</div><button class="mk-add" type="button" data-act="addopt"' + (q.o.length >= 4 ? " disabled" : "") + ">" + esc(t("addAns")) + "</button>" + err("o") + err("r");
    }
    if (q.type === "tf") {
      return '<p class="mk-lab" id="l-tf">' + esc(t("tfL")) + '</p><div class="mk-tf" id="f-tf" role="radiogroup" aria-labelledby="l-tf">' +
        '<button type="button" role="radio" data-act="tf" data-v="1" aria-checked="' + (q.r === true) + '"><span class="mk-mark" aria-hidden="true">' + ICON.check + "</span>" + esc(t("tfTrue")) + "</button>" +
        '<button type="button" role="radio" data-act="tf" data-v="0" aria-checked="' + (q.r === false) + '"><span class="mk-mark" aria-hidden="true">' + ICON.check + "</span>" + esc(t("tfFalse")) + "</button></div>" + err("r");
    }
    return '<p class="mk-lab" id="l-ok">' + esc(t("okL")) + '</p><div class="mk-chips" id="f-ok" role="group" aria-labelledby="l-ok">' + q.ok.map(chipHtml).join("") + '<input class="mk-okin" id="f-okadd" maxlength="60" dir="auto" autocomplete="off" aria-describedby="e-ok" aria-label="' + esc(t("okAddL")) + '" placeholder="' + esc(t("okAdd")) + '"' +
      (q.ok.length >= 10 ? " hidden" : "") + "></div>" + err("ok") +
      '<div class="mk-row"><label for="f-fold">' + esc(t("foldL")) + '</label><input class="mk-switch" type="checkbox" id="f-fold" role="switch"></div>' +
      '<p class="mk-note">' + rich(t("anyOther")) + "</p>";
  }
  /* a text box as tall as its text */
  function grow(el) {
    if (!el || !el.offsetParent) return;          // not shown yet: sized when it is (growAll)
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight + 4, 280) + "px";
  }
  function growAll() { grow($("f-t")); grow($("f-f")); }
  var growT = 0;
  window.addEventListener("resize", function () { clearTimeout(growT); growT = setTimeout(growAll, 150); });
  function rawOr(q, f) { var r = G.raw[q.id + "." + f]; return typeof r === "string" ? r : numText(q[f]); }
  function fillType(q) {
    if (q.type === "num") {
      $("f-a").value = rawOr(q, "a");
      $("f-lo").value = rawOr(q, "lo");
      $("f-hi").value = rawOr(q, "hi");
      $("f-u").value = q.u;
      numSegs(q);
      $("n-sug").hidden = !meta(q).auto;
      ["a", "lo", "hi"].forEach(drawTwo);
    } else if (q.type === "mc") {
      each(qcol.querySelectorAll("[data-o]"), function (el) { el.value = q.o[+el.getAttribute("data-o")] || ""; });
      rove($("f-opts"));
    } else if (q.type === "tf") rove($("f-tf"));
    else $("f-fold").checked = q.fold !== false;
  }
  function numSegs(q) {
    segSet($("f-scale"), q.log ? "1" : "0");
    segSet($("f-kind"), q.k === "year" ? "year" : "n");
    $("f-scale").querySelector('[data-v="1"]').disabled = q.k === "year";
  }
  /* "1.234": a thousand, or one and a bit? The two readings, the language's way. */
  function drawTwo(f) {
    var q = cur(), box = $("w-" + f);
    if (!q || !box) return;
    var p = G.two[q.id + "." + f];
    if (!p) { box.innerHTML = ""; return; }
    var choice = function (v, words) {
      return '<button type="button" data-act="two" data-f="' + f + '" data-v="' + v + '" aria-pressed="' + (q[f] === v) + '"><b>' + esc(numText(v)) + "</b><small>" + esc(words) + "</small></button>";
    };
    box.innerHTML = '<div class="mk-twoways"><p>' + esc(t("twoWays")) + '</p><div class="mk-btnrow">' + choice(p.group, pl("thousand", +p.ip, p.sign + p.ip)) + choice(p.dec, t("point", p.sign + p.ip)) + "</div></div>";
  }
  function qErrs() {
    var q = cur();
    if (!q || !$("f-t")) return;
    var by = {}, F = { hi: "lo", k: "a", step: "lo", u: "a" };
    qProblems(builtQ(q)).forEach(function (p) { var f = F[p.f] || p.f; if (!by[f]) by[f] = p.m; });
    ["t", "a", "lo", "o", "r", "ok", "f", "s"].forEach(function (f) {
      var show = by[f] && (G.checked || G.touched[q.id + "." + f]);
      var field = f === "t" ? $("f-t") : f === "a" ? $("f-a") : f === "lo" ? $("f-lo") : f === "f" ? $("f-f") : f === "s" ? $("f-s") : null;
      setErr("e-" + f, show ? cap(by[f]) : "", field);
    });
  }
  function focusField(f) {
    var map = { t: "f-t", a: "f-a", lo: "f-lo", hi: "f-hi", f: "f-f", s: "f-s", ok: "f-okadd", u: "f-u", k: "f-a", step: "f-lo" }, el = null;
    if (f === "o") {
      var ins = qcol.querySelectorAll("[data-o]");
      each(ins, function (x) { if (!el && !x.value.trim()) el = x; });
      el = el || ins[0];
    } else if (f === "r") el = qcol.querySelector('[data-act="mark"], [data-act="tf"]');
    else el = $(map[f] || "f-t");
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
    el.scrollIntoView({ block: "center" });
  }

  /* ---- what players see: a small phone (a number: the slider, its answer and the three nets) ---- */
  var prevT = 0;
  function previewSoon() {
    if (prevT) return;
    prevT = window.requestAnimationFrame(function () { prevT = 0; drawPreview(); });
  }
  function sureHtml() {
    var lv = [["lvS", "ptsS", 3], ["lvM", "ptsM", 2], ["lvB", "ptsB", 1]];
    return '<p class="mk-psure-l">' + esc(t("howSure")) + '</p><div class="mk-psure">' + lv.map(function (x) {
      return "<span>" + dots(x[2]) + "<b>" + esc(t(x[0])) + "</b><small>" + esc(t(x[1])) + "</small></span>";
    }).join("") + "</div>";
  }
  function drawPreview() {
    var box = $("mk-prev"), q = cur();
    if (!box || !q) return;
    var b = builtQ(q), k = G.kit;
    if (q.type === "num") { box.innerHTML = numPreview(b); return; }
    var h = '<p class="mk-lab">' + esc(t("seeL")) + '</p><div class="mk-phone">' + (b.t ? '<p class="mk-pq" dir="auto">' + esc(b.t) + "</p>" : "");
    if (q.type === "mc") h += '<div class="mk-pch">' + b.o.map(function (x, i) { return "<span><i>" + LETTERS[i] + '</i><b dir="auto">' + esc(x) + "</b></span>"; }).join("") + "</div>";
    else if (q.type === "tf") h += '<div class="mk-pch mk-ptf"><span>' + esc(t("tfTrue")) + "</span><span>" + esc(t("tfFalse")) + "</span></div>";
    else h += '<div class="mk-ptype">' + esc(t("typeYour")) + "</div>";
    if (k.sure) h += sureHtml();
    box.innerHTML = h + "</div>";
  }
  function numOk(b) {
    return qProblems(b).every(function (p) { return ["a", "lo", "hi", "k", "step"].indexOf(p.f) < 0; });
  }
  function numPreview(b) {
    var sure = G.kit.sure, h = '<p class="mk-lab">' + esc(t(sure ? "netsL" : "netL")) + "</p>";
    if (!numOk(b)) return h + '<div class="mk-numprev"><div class="mk-numempty"><div class="mk-track"></div></div><p class="mk-warn">' + esc(t("numHint")) + "</p></div>";
    var at = R.pos(b, b.a), nets = sure ? ["b", "m", "s"] : ["m"], pct = (at * 100).toFixed(2) + "%";
    h += '<div class="mk-numprev"><div class="mk-nets" style="height:' + (nets.length * 16 + 18) + 'px">' + nets.map(function (n, j) {
      var r = R.net(b, b.a, n), l = R.pos(b, r[0]) * 100, w = Math.max(R.pos(b, r[1]) * 100 - l, 0.8);
      return '<div class="mk-netrow" style="top:' + (j * 16) + 'px"><i class="mk-net" style="left:' + l.toFixed(2) + "%;width:" + w.toFixed(2) + '%"></i></div>';
    }).join("") + '<div class="mk-track"></div><i class="mk-ansline" style="left:' + pct + '"></i><span class="mk-anstag" style="left:clamp(34px, ' + pct + ', calc(100% - 34px))">' +
      esc(exact(b, b.a) + (b.u ? " " + b.u : "")) + "</span></div>";
    h += '<div class="mk-ends"><span>' + esc(numShow(b, b.lo)) + "</span><span>" + esc(withUnit(b, b.hi)) + "</span></div>";
    h += '<ul class="mk-netkey">' + nets.slice().reverse().map(function (n) {
      var r = R.net(b, b.a, n);
      return "<li>" + netIc(n) + "<b>" + esc(t(NETW[n])) + "</b><span>" + esc(numShow(b, r[0]) + "–" + numShow(b, r[1])) + "</span></li>";
    }).join("") + "</ul>";
    if (at < 0.1 || at > 0.9) h += '<p class="mk-warn">' + esc(t("edge")) + "</p>";
    if (!b.log && (b.hi - b.lo) / b.step < 20) h += '<p class="mk-warn">' + esc(t("few")) + "</p>";
    return h + "</div>";
  }

  /* ---- typing in the open question ---- */
  function after() { changed(); previewSoon(); }
  function numInput(q, f, text) {
    var p = parseNum(text), key = q.id + "." + f;
    q[f] = p.v;
    G.raw[key] = text;
    if (p.two && G.sure2[key] !== text) G.two[key] = p; else delete G.two[key];
    drawTwo(f);
    if (f === "lo" || f === "hi") { meta(q).auto = false; $("n-sug").hidden = true; }
    if (f === "a") answerTyped(q);
    restep(q);
  }
  /* the answer typed: a year is offered for a question about a year, and empty ends are suggested */
  function answerTyped(q) {
    var m = meta(q);
    if (!num(q.a)) return;
    if (!m.kind && q.k !== "year" && whole(q.a) && q.a >= 1000 && q.a <= 2100 && YEARISH.test(q.t)) { q.k = "year"; q.log = false; numSegs(q); }
    var empty = !num(q.lo) && !G.raw[q.id + ".lo"] && !num(q.hi) && !G.raw[q.id + ".hi"];
    if (m.auto || empty) suggestEnds(q);
  }
  function suggestEnds(q) {
    var s = suggest(q);
    if (!s) return;
    q.lo = s.lo;
    q.hi = s.hi;
    q.log = s.log;
    meta(q).auto = true;
    delete G.raw[q.id + ".lo"];
    delete G.raw[q.id + ".hi"];
    delete G.two[q.id + ".lo"];
    delete G.two[q.id + ".hi"];
    $("f-lo").value = numText(q.lo);
    $("f-hi").value = numText(q.hi);
    drawTwo("lo");
    drawTwo("hi");
    numSegs(q);
    $("n-sug").hidden = false;
  }
  qcol.addEventListener("input", function (e) {
    var el = e.target, q = cur();
    if (!q) return;
    var id = el.id;
    if (id === "f-t") { q.t = el.value; updateLi(G.sel); grow(el); }
    else if (id === "f-f") { q.f = el.value; grow(el); }
    else if (id === "f-s") q.s = el.value;
    else if (id === "f-u") q.u = el.value;
    else if (id === "f-a" || id === "f-lo" || id === "f-hi") numInput(q, id.slice(2), el.value);
    else if (el.hasAttribute("data-o")) q.o[+el.getAttribute("data-o")] = el.value;
    else return;
    after();
  });
  qcol.addEventListener("change", function (e) {
    var q = cur();
    if (q && e.target.id === "f-fold") { q.fold = e.target.checked; after(); }
  });
  qcol.addEventListener("keydown", function (e) {
    var el = e.target, q = cur();
    if (!q || e.key !== "Enter" || e.isComposing) return;
    if (el.id === "f-okadd") { e.preventDefault(); addOk(); return; }
    if (el.hasAttribute("data-o")) {
      e.preventDefault();
      var i = +el.getAttribute("data-o"), nx = qcol.querySelector('[data-o="' + (i + 1) + '"]');
      if (nx) nx.focus();
      else if (q.o.length < 4) addOpt();
    }
  });
  qcol.addEventListener("focusout", function (e) {
    var el = e.target, q = cur();
    if (!q || !el.id && !el.hasAttribute("data-o")) return;
    var f = { "f-t": "t", "f-f": "f", "f-s": "s", "f-a": "a", "f-lo": "lo", "f-hi": "lo", "f-okadd": "ok" }[el.id] || (el.hasAttribute("data-o") ? "o" : null);
    if (!f) return;
    if (el.id === "f-s") fixLink(q, el);
    if (el.id === "f-okadd" && clean(el.value)) { addOk(true); return; }
    if (clean(el.value)) G.touched[q.id + "." + f] = true;
    qErrs();
  });
  /* a link typed as "www.…" or "http://…" becomes https, the only kind the server keeps */
  function fixLink(q, el) {
    var s = el.value.trim(), v = s;
    if (!s) return;
    if (/^http:\/\//i.test(v)) v = "https://" + v.slice(7);
    else if (!/^[a-z][a-z0-9+.-]*:/i.test(v) && /^[^\s\/]+\.[^\s\/]+/.test(v)) v = "https://" + v;
    if (v !== s) { el.value = v; q.s = v; after(); }
  }
  function chipHtml(x, i) {
    return '<span class="mk-chip"><span dir="auto">' + esc(x) + '</span><button type="button" data-act="rmok" data-i="' + i + '" aria-label="' + esc(t("okRemove", x)) + '">×</button></span>';
  }
  /* only the chips are drawn again: the field to add one stays, so a tap elsewhere is never lost */
  function drawChips(q) {
    var box = $("f-ok"), add = $("f-okadd");
    if (!box || !add) return;
    each(box.querySelectorAll(".mk-chip"), function (c) { box.removeChild(c); });
    add.insertAdjacentHTML("beforebegin", q.ok.map(chipHtml).join(""));
    add.hidden = q.ok.length >= 10;
  }
  function addOk(blurred) {
    var q = cur(), el = $("f-okadd");
    if (!q || !el) return;
    var v = clean(el.value);
    if (!v || q.ok.length >= 10) return;
    q.ok.push(v);
    el.value = "";
    G.touched[q.id + ".ok"] = true;
    drawChips(q);
    if (!blurred && !el.hidden) el.focus();
    after();
    qErrs();
  }
  function addOpt() {
    var q = cur();
    if (!q || q.o.length >= 4) return;
    q.o.push("");
    drawQ();
    var n = qcol.querySelector('[data-o="' + (q.o.length - 1) + '"]');
    if (n) n.focus();
    after();
  }
  function setType(ty) {
    var q = cur();
    if (!q || q.type === ty || TYPES.indexOf(ty) < 0) return;
    /* the old type's fields wait in memory, in case the maker comes back to it */
    G.stash[q.id + "." + q.type] = q;
    var n = G.stash[q.id + "." + ty] || blankQ(ty);
    n.id = q.id; n.t = q.t; n.f = q.f; n.s = q.s; n.type = ty;
    G.kit.qs[G.sel] = n;
    drawQ();
    updateLi(G.sel);
    var b = qcol.querySelector('[data-ty="' + ty + '"]');
    if (b) b.focus();
    after();
  }
  qcol.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !G) return;
    var q = cur(), act = b.getAttribute("data-act"), ty = b.getAttribute("data-ty");
    if (ty) { setType(ty); return; }
    if (act === "add") { addQ(); return; }
    if (act === "paste") { openPaste(); return; }
    if (!q) return;
    var i = +b.getAttribute("data-i"), keep;
    switch (act) {
      case "back": backToList(); return;
      case "prev": openQ(G.sel - 1); return;
      case "next": openQ(G.sel + 1); return;
      case "up": case "down":
        moveTo(G.sel, G.sel + (act === "up" ? -1 : 1));
        keep = qcol.querySelector('[data-act="' + act + '"]:not([disabled])') || qcol.querySelector('[data-act="' + (act === "up" ? "down" : "up") + '"]');
        if (keep) keep.focus();
        return;
      case "dup": dupQ(); keep = qcol.querySelector('[data-act="dup"]'); if (keep) keep.focus(); return;
      case "del": delQ(); return;
      case "scale":
        if (q.k === "year") return;
        q.log = b.getAttribute("data-v") === "1";
        meta(q).scale = true;
        if (meta(q).auto) suggestEnds(q);
        numSegs(q);
        restep(q);
        break;
      case "kind":
        if (b.getAttribute("data-v") === "year") { q.k = "year"; q.log = false; } else delete q.k;
        meta(q).kind = true;
        if (meta(q).auto) suggestEnds(q);
        numSegs(q);
        restep(q);
        break;
      case "sign":
        var f = b.getAttribute("data-f"), inp = $("f-" + f);
        if (num(q[f])) { inp.value = numText(-q[f]); numInput(q, f, inp.value); }
        else { inp.value = /^-/.test(inp.value) ? inp.value.slice(1) : "-" + inp.value; inp.focus(); numInput(q, f, inp.value); }
        break;
      case "two":
        var f2 = b.getAttribute("data-f"), v = Number(b.getAttribute("data-v")), el = $("f-" + f2), key = q.id + "." + f2;
        q[f2] = v;
        el.value = numText(v);
        G.raw[key] = el.value;
        G.sure2[key] = el.value;
        delete G.two[key];
        drawTwo(f2);
        if (f2 === "a") answerTyped(q);
        if (f2 !== "a") { meta(q).auto = false; $("n-sug").hidden = true; }
        restep(q);
        el.focus();
        break;
      case "mark":
        q.r = i;
        each(qcol.querySelectorAll('[data-act="mark"]'), function (x) { x.setAttribute("aria-checked", String(x === b)); });
        rove($("f-opts"));
        break;
      case "rmopt":
        if (q.o.length <= 2) return;
        q.o.splice(i, 1);
        if (q.r === i) q.r = null; else if (q.r !== null && q.r > i) q.r--;
        drawQ();
        keep = qcol.querySelector('[data-o="' + Math.min(i, q.o.length - 1) + '"]');
        if (keep) keep.focus();
        break;
      case "addopt": addOpt(); return;
      case "tf":
        q.r = b.getAttribute("data-v") === "1";
        each(qcol.querySelectorAll('[data-act="tf"]'), function (x) { x.setAttribute("aria-checked", String(x === b)); });
        rove($("f-tf"));
        break;
      case "rmok":
        q.ok.splice(i, 1);
        drawChips(q);
        keep = $("f-okadd");
        if (keep && !keep.hidden) keep.focus();
        break;
      default: return;
    }
    after();
    qErrs();
  });

  /* ---- the right column: the settings ---- */
  function drawToPlay() {
    var n = G.kit.qs.length, sel = $("s-n"), h = '<option value="0">' + esc(t("allN", n)) + "</option>";
    for (var i = 1; i < n; i++) h += '<option value="' + i + '">' + nfmt(i) + "</option>";
    sel.innerHTML = h;
    sel.value = String(G.kit.st.n > 0 && G.kit.st.n < n ? G.kit.st.n : 0);
  }
  function whoHtml(mode) {
    return [["alone", "alone", "aloneSub"], ["live", "liveOnly", "liveSub"]].map(function (x) {
      return '<button type="button" role="radio" data-mode="' + x[0] + '" aria-checked="' + (mode === x[0]) + '"><i aria-hidden="true"></i><b>' + esc(t(x[1])) + "</b><small>" + esc(t(x[2])) + "</small></button>";
    }).join("");
  }
  function drawSettings() {
    var k = G.kit;
    drawToPlay();
    segSet($("s-order"), k.st.shuffle ? 1 : 0);
    segSet($("s-timer"), k.st.timer);
    segSet($("s-names"), k.st.picked ? 1 : 0);
    segSet($("s-lang"), k.lang);
    $("s-sure").checked = k.sure !== false;
    $("s-standings").checked = k.st.standings !== false;
    $("s-awards").checked = k.st.awards !== false;
    $("s-mode").innerHTML = whoHtml(k.mode);
    rove($("s-mode"));
    $("s-surenote").innerHTML = rich(t(k.sure !== false ? "sureNote" : "plainNote"));
  }
  $("mk-c3").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !G) return;
    var k = G.kit, g = b.parentNode, v = b.getAttribute("data-v");
    if (b.hasAttribute("data-mode")) { setMode(b.getAttribute("data-mode"), false); var nb = $("s-mode").querySelector('[aria-checked="true"]'); if (nb) nb.focus(); return; }
    if (g.id === "s-order") k.st.shuffle = v === "1";
    else if (g.id === "s-timer") k.st.timer = +v;
    else if (g.id === "s-names") k.st.picked = v === "1";
    else if (g.id === "s-lang") { setGameLang(v); return; }
    else return;
    segSet(g, v);
    changed();
  });
  $("s-n").addEventListener("change", function () { G.kit.st.n = +this.value; changed(); });
  $("s-sure").addEventListener("change", function () {
    G.kit.sure = this.checked;
    $("s-surenote").innerHTML = rich(t(G.kit.sure ? "sureNote" : "plainNote"));
    drawPreview();
    changed();
  });
  $("s-standings").addEventListener("change", function () { G.kit.st.standings = this.checked; changed(); });
  $("s-awards").addEventListener("change", function () { G.kit.st.awards = this.checked; changed(); });
  /* the game's language: the whole editor turns to it at once */
  function setGameLang(l) {
    if (LANGS.indexOf(l) < 0 || l === G.kit.lang) return;
    G.kit.lang = l;
    lang = l;
    G.raw = {};                  // a number half typed the old way would be read the new way: start from the numbers
    G.two = {};
    lset(KS.lang, l);
    applyWords();
    drawGame();
    drawSettings();
    drawQ();
    updateTop();
    var b = $("s-lang").querySelector('[data-v="' + l + '"]');
    if (b) b.focus();
    if (msgBox.getAttribute("data-kind") === "problems") showProblems(problems(built(G.kit)));
    changed();
  }
  /* who can use the code: in the settings it waits for Save; in the saved sheet it is saved at once */
  function setMode(m, now_) {
    if (!G || G.kit.mode === m) return;
    G.kit.mode = m;
    drawSettings();
    if ($("dlg-saved").open) drawSaved();
    changed();
    if (now_ && G.code) save({ sheet: true });
  }

  /* ================================================================ saving */
  var saving = false;
  function busy(on) {
    each(document.querySelectorAll(".mk-savebtn"), function (b) { b.disabled = on; b.querySelector("span").textContent = t(on ? "saving" : "save"); });
    $("mk-host").disabled = on;
    $("mk-host2").disabled = on;
  }
  function save(o) {
    o = o || {};
    if (!G || saving) return;
    var b = built(G.kit), probs = problems(b);
    G.checked = true;
    marks();
    gameErrs();
    qErrs();
    if (probs.length) {
      if (o.sheet) $("sv-modemsg").textContent = t("fixFirst");
      if ($("dlg-saved").open) TO.closeDialog($("dlg-saved"));
      showProblems(probs);
      gotoProblem(0);
      return;
    }
    if (msgBox.getAttribute("data-kind") === "problems") msgClear();
    var first = !G.code, json = JSON.stringify(b), g = G;
    var body = first ? { v: PROTO, kit: b } : { v: PROTO, edit: G.edit, kit: b };
    if (first && G.from) body.from = { code: G.from.code, copy: G.from.copy };
    saving = true;
    busy(true);
    call(first ? "/kit" : "/kit/" + G.code, body).then(function (r) {
      saving = false;
      busy(false);
      if (g !== G) return;
      if (r.status === 200 && (first ? CODE_RE.test(r.b.code || "") && KEY_RE.test(r.b.edit || "") : r.b.ok)) {
        if (first) {
          G.code = r.b.code;
          G.edit = r.b.edit;
          G.copy = typeof r.b.copy === "string" ? r.b.copy : "";
          G.from = null;
          G.note = "";
          G.kept = false;
          G.way = false;
          G.mail = false;
          sset(KS.open, { code: G.code, edit: G.edit });
          drawNote();
          TO.count("live/build/saved");
        }
        if (r.b.until) G.until = r.b.until;
        G.saved = json;
        G.titleErr = "";
        if (msgBox.getAttribute("data-kind") === "err") msgClear();
        syncKept();
        writeDraft();
        updateTop();
        gameErrs();
        if (first) { openKeep(o.then); return; }      // the keep screen first; then the saved sheet, or hosting
        if (o.sheet) { drawSaved(); $("sv-modemsg").textContent = t("modeSaved"); }
        else if (!o.then) toast(t("savedQuiet"));
        if (o.then) o.then();
        return;
      }
      saveFailed(r, first, o);
    });
  }
  function saveFailed(r, first, o) {
    var e = r.b.e, text = errText(r);
    if (o.sheet) $("sv-modemsg").textContent = text;
    if (e === "title") {
      G.titleErr = t("errTitle");
      gameErrs();
      if ($("dlg-saved").open) TO.closeDialog($("dlg-saved"));
      if (phone()) showList();
      $("g-title").focus();
      sayErr(t("errTitle"));
      return;
    }
    if (e === "kit") { showProblems([whyProblem(r.b.why)]); gotoProblem(0); return; }
    if (e === "budget") { sayErr(t("errBudget"), [{ text: t("download"), solid: true, go: download }]); return; }
    if (e === "stopped") { if (first) sayErr(t("errStoppedFrom")); else showStopped(r.b.why); return; }
    if (!first && r.status === 404) {
      /* gone from the server (deleted elsewhere, or two months unused): the work here is kept, and the next
         save gives it a new code */
      forgetKept(G.code);
      G.code = null; G.edit = null; G.copy = ""; G.saved = null;
      sdel(KS.open);
      writeDraft();
      updateTop();
      sayErr(t("errGoneSave"), [{ text: t("save"), solid: true, go: function () { save(); } }]);
      return;
    }
    var acts = null;
    if (e === "old") acts = [{ text: t("reload"), solid: true, go: function () { G.leaving = !isDirty(); window.location.reload(); } }];
    else if (r.status === 0 || r.status >= 500 || r.status === 429) acts = [{ text: t("tryAgain"), solid: true, go: function () { msgClear(); save(o); } }, { text: t("download"), go: download }];
    sayErr(text, acts);
  }

  /* ---- the saved sheet (mock-up 3) ---- */
  function makeBase() { return LOCAL ? window.location.origin + window.location.pathname : SITE + "/live/build/"; }
  function liveBase() { return LOCAL ? window.location.origin + window.location.pathname.replace(/build\/(index\.html)?$/, "") : SITE + "/live/"; }
  function playersLink() { return liveBase() + "#" + G.code; }
  function editLink() { return makeBase() + "#edit=" + G.code + "." + G.edit; }
  function copyLink() { return makeBase() + "#copy=" + G.code + "." + G.copy; }
  function shortLink(u) { return u.replace(/^https?:\/\//, ""); }
  function drawSaved() {
    if (!G || !G.code) return;
    var alone = G.kit.mode === "alone";
    $("sv-code").innerHTML = codeBoxes(G.code).replace(/^<div class="mk-code">|<\/div>$/g, "");
    $("sv-plink").textContent = alone ? shortLink(playersLink()) : "";
    $("sv-plink").hidden = !alone;
    $("sv-liveonly").hidden = alone;
    $("sv-qr").innerHTML = alone ? qrSvg(playersLink()) : "";
    $("sv-qr").hidden = !alone;
    $("sv-mode").innerHTML = whoHtml(G.kit.mode);
    rove($("sv-mode"));
    showEdit(false);
    $("sv-mail").href = selfMail("");
    $("sv-keep").checked = isKept(G.code);
    if (!$("dlg-saved").open) { $("sv-wayform").hidden = true; $("sv-waymsg").textContent = ""; }
    drawWay();
    $("sv-until").textContent = G.until ? t("keptUntil", dateLong(G.until)) : "";
    $("sv-share").hidden = !G.copy;
    resetDel($("sv-del"));
  }
  function openSaved() {
    if (!G || !G.code) return;
    drawSaved();
    $("sv-modemsg").textContent = "";
    $("sv-sharemsg").textContent = "";
    $("sv-delmsg").textContent = "";
    TO.openDialog($("dlg-saved"));
  }
  $("sv-mode").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]");
    if (!b) return;
    setMode(b.getAttribute("data-mode"), true);
    var nb = $("sv-mode").querySelector('[aria-checked="true"]');
    if (nb) nb.focus();
  });
  $("sv-host").addEventListener("click", hostNow);
  /* the edit link in the sheet: dots until Show is tapped, since the sheet may be on a projector (the players'
     code and QR code are there for everyone); Copy and Email it to me work either way */
  var EDIT_DOTS = "••••••••••••••••••••••••••••";
  function showEdit(on) {
    var b = $("sv-showedit");
    $("sv-edit").value = on && G && G.code ? editLink() : EDIT_DOTS;
    b.setAttribute("aria-pressed", String(!!on));
    b.setAttribute("aria-label", t(on ? "hideLink" : "showLink"));
    b.title = t(on ? "hideLink" : "showLink");
    b.innerHTML = ICON[on ? "eyeoff" : "eye"];
  }
  $("sv-showedit").addEventListener("click", function () { showEdit(this.getAttribute("aria-pressed") !== "true"); });
  $("sv-copyedit").addEventListener("click", function () {
    var b = this;
    keptNow();
    TO.copyText(editLink()).then(function (ok) {
      b.textContent = t(ok ? "copied" : "copy");
      if (!ok) { showEdit(true); $("sv-edit").select(); }
      setTimeout(function () { b.textContent = t("copy"); }, 2200);
    });
  });
  $("sv-edit").addEventListener("focus", function () { this.select(); });
  /* copying the dots themselves (a long press, Ctrl+C) copies the link they stand for */
  $("sv-edit").addEventListener("copy", function (e) {
    if (this.value !== EDIT_DOTS || !G || !G.code || !e.clipboardData) return;
    e.preventDefault();
    e.clipboardData.setData("text/plain", editLink());
    keptNow();
  });
  $("sv-keep").addEventListener("change", function () { keepGame(this.checked); if (this.checked) keptNow(); });
  $("sv-mail").addEventListener("click", function () { keptNow(); TO.count("live/build/keep-mail"); });
  $("sv-share").addEventListener("click", shareCopy);
  $("sv-down").addEventListener("click", download);
  $("sv-results").addEventListener("click", function () { TO.closeDialog($("dlg-saved")); openResults(); });
  $("sv-del").addEventListener("click", function () { delGame(this, $("sv-delmsg")); });
  function shareCopy() {
    if (!G || !G.copy) return;
    var url = copyLink(), nav = window.navigator, m = $("sv-sharemsg");
    var copy = function () { TO.copyText(url).then(function (ok) { m.textContent = ok ? t("linkCopied") : url; }); };
    if (nav.share) {
      nav.share({ title: clean(G.kit.title), text: t("shareText"), url: url }).then(function () {}, function (err) { if (!err || err.name !== "AbortError") copy(); });
      return;
    }
    copy();
  }

  /* ---- the edit link kept somewhere: the keep screen (after a game's first save) and the saved sheet ----
     Khayyam, 15 Oct 2026: "they may lose it ... we need bigger pop up saying save the link"; and "very easy
     interface ... less and less words, more and more pictures ... the technical details in the ? subsections".
     Three ways, one tap each: an email to oneself (the maker's own mail app, mailto:, with the link written in;
     nothing goes through Logicers), a copy, this computer. Done opens once one is used; until then leaving the
     page asks first (unkept). Then, optional, a way back: the maker's email, of which only a fingerprint leaves
     the browser (../wayprint.js); with it, Logicers' desk can make a new link for a maker who writes from that
     address. */
  function keptNow() {
    if (!G || G.kept !== false) return;
    G.kept = true;
    writeDraft();
  }
  /* the maker's own email, ready in their mail app: the link and the code, in the game's language */
  function selfMail(to) {
    var title = clean(G.kit.title) || t("untitled"), addr = "", W = window.LogicersWay;
    var c = String(to || "").trim();
    if (c && W && W.ok(c)) { var at = c.lastIndexOf("@"); addr = encodeURIComponent(c.slice(0, at)) + "@" + encodeURIComponent(c.slice(at + 1)); }
    return "mailto:" + addr + "?subject=" + encodeURIComponent(t("selfSubject", title)) + "&body=" + encodeURIComponent(t("selfBody", title, editLink(), G.code));
  }
  /* the way back: the fingerprint of an email (made here, wayprint.js), sent with the edit key; null removes it.
     fb: the maker ticked "Email me for feedback" (never ticked for them): then, and only then, the address itself
     goes too, once, for the list of feedback emails; the server checks it is the fingerprint's own address.
     -> a Promise of { ok, mail } or { ok: false, text } */
  function setWay(email, fb) {
    var g = G, W = window.LogicersWay;
    if (!g || !g.code || !W || !W.can) return Promise.resolve({ ok: false, text: t("errServer") });
    return (email === null ? Promise.resolve(null) : W.print(email)).then(function (mp) {
      if (email !== null && !mp) return { ok: false, text: t("errEmail") };
      var body = { edit: g.edit, mp: mp };
      if (mp && fb) body.mail = W.tidy(email);
      return call("/kit/" + g.code + "/way", body).then(function (r) {
        if (r.status === 200 && r.b.ok) {
          g.way = !!r.b.way;
          g.wayAt = g.way ? r.b.wayAt || now() : 0;
          g.mail = g.way ? tri(r.b.mail) : false;
          TO.count(g.way ? "live/build/way-set" : "live/build/way-removed");
          if (body.mail && g.mail === true) TO.count("live/build/fb-on");
          return { ok: true, mail: g.mail, missed: !!body.mail && g.mail !== true };
        }
        return { ok: false, text: errText(r) };
      });
    });
  }

  var KP = null;          // the keep screen while it is open: { then, mail, copy, here, busy, set }
  function openKeep(then) {
    if (!G || !G.code) return;
    KP = { then: then || null, mail: false, copy: false, here: isKept(G.code), busy: false, set: "" };
    $("kp-email").value = "";
    $("kp-fb").checked = false;            // never ticked for the maker
    $("kp-err").hidden = true;
    $("kp-link").hidden = true;
    $("kp-link").value = editLink();
    $("kp-step2").hidden = !(window.LogicersWay && window.LogicersWay.can);
    each($("dlg-keep").querySelectorAll(".mk-help"), function (b) { helpSet(b, false); });
    drawKeep();
    TO.openDialog($("dlg-keep"));
    $("kp-h").focus();
    TO.count("live/build/keep");
  }
  function drawKeep() {
    if (!KP) return;
    var any = KP.mail || KP.copy || KP.here;
    $("kp-mail").href = selfMail($("kp-email").value);
    $("kp-mail").classList.toggle("mk-done", KP.mail);
    $("kp-copy").classList.toggle("mk-done", KP.copy);
    $("kp-here").classList.toggle("mk-done", KP.here);
    $("kp-here").setAttribute("aria-pressed", String(KP.here));
    $("kp-done").disabled = !any || KP.busy;
    $("kp-foot").textContent = !any ? t("keepFirst") : KP.mail && !KP.copy && !KP.here ? t("keepAfterMail") : "";
  }
  $("kp-mail").addEventListener("click", function () {
    if (!KP) return;
    KP.mail = true;
    keptNow();
    drawKeep();
    TO.count("live/build/keep-mail");
  });
  $("kp-copy").addEventListener("click", function () {
    if (!KP) return;
    var link = editLink();
    TO.copyText(link).then(function (ok) {
      if (!KP) return;
      KP.copy = true;
      keptNow();
      drawKeep();
      if (!ok) { var l = $("kp-link"); l.value = link; l.hidden = false; l.focus(); l.select(); }     // copied by hand, then
    });
    TO.count("live/build/keep-copy");
  });
  $("kp-link").addEventListener("focus", function () { this.select(); });
  $("kp-here").addEventListener("click", function () {
    if (!KP) return;
    KP.here = !KP.here;
    keepGame(KP.here);
    if (KP.here) { keptNow(); TO.count("live/build/keep-here"); }
    drawKeep();
  });
  $("kp-email").addEventListener("input", function () { $("kp-err").hidden = true; $("kp-mail").href = selfMail(this.value); });
  $("kp-email").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); if (!$("kp-done").disabled) $("kp-done").click(); } });
  function kpErr(text) { var e = $("kp-err"); e.textContent = text; e.hidden = false; $("kp-email").focus(); }
  $("kp-done").addEventListener("click", function () {
    if (!KP || KP.busy) return;
    var v = $("kp-email").value.trim(), fb = $("kp-fb").checked;
    if (!v || $("kp-step2").hidden) { finishKeep(); return; }
    if (!window.LogicersWay.ok(v)) { kpErr(t("errEmail")); return; }
    if (KP.set && KP.set === v && !fb) { finishKeep(); return; }      // the way back is already set: Done goes on
    KP.busy = true;
    drawKeep();
    setWay(v, fb).then(function (r) {
      if (!KP) return;
      KP.busy = false;
      drawKeep();
      if (!r.ok) { kpErr(t("wayNotAdded", r.text)); return; }      // empty the field to go on without it
      /* the way back is set, but the tick was not taken: said here, where it was ticked; Done then goes on, and
         ticking it again tries again */
      if (r.missed) { KP.set = v; $("kp-fb").checked = false; kpErr(t("fbNotTaken")); return; }
      finishKeep();
    });
  });
  function finishKeep() {
    var then = KP && KP.then;
    KP = null;
    TO.closeDialog($("dlg-keep"));
    if (then) then(); else openSaved();
  }
  /* Escape waits until the link is kept; if the dialog closes all the same (a second Escape), the way goes on,
     and the leave question stays until the link is kept */
  $("dlg-keep").addEventListener("cancel", function (e) { if (KP && !(KP.mail || KP.copy || KP.here)) e.preventDefault(); });
  $("dlg-keep").addEventListener("close", function () {
    if (!KP) return;
    var then = KP.then, any = KP.mail || KP.copy || KP.here;
    KP = null;
    if (then && any) then(); else openSaved();
  });

  /* the way back in the saved sheet: add, change or remove the email */
  function drawWay() {
    if (!G) return;
    var on = !!G.way, form = !$("sv-wayform").hidden;
    $("sv-way").hidden = !(window.LogicersWay && window.LogicersWay.can);
    $("sv-waystate").textContent = on ? (G.wayAt ? t("wayOnDate", dateShort(G.wayAt)) : t("wayOn")) : "";
    $("sv-waystate").hidden = !on;
    $("sv-wayadd").hidden = on || form;
    $("sv-waychange").hidden = !on || form;
    $("sv-wayrm").hidden = !on || form;
    $("sv-fbrow").hidden = !form;
    $("sv-fbstate").hidden = !on || G.mail === false || form;
    fbText($("sv-fbtext"), G.mail);
  }
  /* "Feedback emails: on", or, when the list did not answer, that it could not be checked (Stop still there) */
  function fbText(e, mail) {
    e.setAttribute("data-w", mail === null ? "fbMaybe" : "fbOn");
    e.textContent = t(e.getAttribute("data-w"));
  }
  function wayForm(open) {
    $("sv-wayform").hidden = !open;
    $("sv-waymsg").textContent = "";
    if (open) $("sv-fb").checked = false;  // never ticked for the maker
    drawWay();
    if (open) { $("sv-email").value = ""; $("sv-email").focus(); }
  }
  $("sv-wayadd").addEventListener("click", function () { wayForm(true); });
  $("sv-waychange").addEventListener("click", function () { wayForm(true); });
  function saveWayForm() {
    var v = $("sv-email").value.trim(), m = $("sv-waymsg"), b = $("sv-waysave");
    if (!window.LogicersWay || !window.LogicersWay.ok(v)) { m.textContent = t("errEmail"); $("sv-email").focus(); return; }
    b.disabled = true;
    setWay(v, $("sv-fb").checked).then(function (r) {
      b.disabled = false;
      if (r.ok) { wayForm(false); m.textContent = t(r.missed ? "fbNotTaken" : "wayAdded"); }
      else m.textContent = t("wayNotAdded", r.text);
    });
  }
  /* Stop: the address off the list of feedback emails at once (the way back stays) */
  $("sv-fbstop").addEventListener("click", function () {
    var b = this, m = $("sv-waymsg"), g = G;
    if (!g || !g.code) return;
    b.disabled = true;
    call("/kit/" + g.code + "/mail", { edit: g.edit }).then(function (r) {
      b.disabled = false;
      if (r.status === 200 && r.b.ok) { g.mail = false; drawWay(); m.textContent = t("fbStopped"); TO.count("live/build/fb-stop"); $("sv-waychange").focus(); }
      else m.textContent = errText(r);
    });
  });
  $("sv-waysave").addEventListener("click", saveWayForm);
  $("sv-email").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); saveWayForm(); } });
  $("sv-wayrm").addEventListener("click", function () {
    var b = this, m = $("sv-waymsg");
    b.disabled = true;
    setWay(null).then(function (r) {
      b.disabled = false;
      drawWay();
      m.textContent = r.ok ? t("wayRemoved") : r.text;
      if (r.ok) $("sv-wayadd").focus();
    });
  });

  /* ---- the ? buttons: a few more words, only for whoever asks (Khayyam: the details "optional to read") ---- */
  function helpSet(b, open) {
    var box = $(b.getAttribute("aria-controls"));
    b.setAttribute("aria-expanded", String(open));
    if (box) box.hidden = !open;
  }
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest(".mk-help") : null;
    if (b) helpSet(b, b.getAttribute("aria-expanded") !== "true");
  });

  /* ---- kept on this computer: only when the maker says so (a shared computer would hand on the key) ---- */
  function keptList() {
    var a = lget(KS.games);
    return Array.isArray(a) ? a.filter(function (g) { return g && CODE_RE.test(g.code) && KEY_RE.test(g.edit); }) : [];
  }
  function isKept(code) { return keptList().some(function (g) { return g.code === code; }); }
  function keptEntry() { return { code: G.code, edit: G.edit, title: clean(G.kit.title), n: G.kit.qs.length, lang: G.kit.lang, colour: G.kit.colour, t: now() }; }
  function keepGame(on) {
    var list = keptList().filter(function (g) { return g.code !== G.code; });
    if (on) list.unshift(keptEntry());
    lset(KS.games, list.slice(0, 50));
  }
  function syncKept() {
    if (!G || !G.code || !isKept(G.code)) return;
    keepGame(true);
  }
  function forgetKept(code) {
    if (isKept(code)) lset(KS.games, keptList().filter(function (g) { return g.code !== code; }));
  }
  /* a key refused (replaced, or wrong): the game kept on this computer goes only if it was kept with that very key
     (a newer key kept here stays) */
  function forgetKeptKey(code, edit) {
    var list = keptList();
    if (list.some(function (g) { return g.code === code && g.edit === edit; })) lset(KS.games, list.filter(function (g) { return g.code !== code; }));
  }
  function gameLi(g) {
    var here = G && G.code === g.code;
    return '<li><button class="mk-gitem" type="button" data-code="' + esc(g.code) + '"' + (here ? ' aria-current="true"' : "") + '><span class="mk-gdot" data-c="' +
      esc(COLOURS.indexOf(g.colour) >= 0 ? g.colour : "teal") + '" aria-hidden="true">' + (LANGS.indexOf(g.lang) >= 0 ? FLAG[g.lang] : "") + '</span><b dir="auto">' +
      esc(g.title || t("untitled")) + "</b><small>" + esc(g.code + " · " + pl("nQs", whole(g.n) ? g.n : 0, whole(g.n) ? g.n : 0) + (here ? " · " + t("current") : "")) + "</small></button>" +
      '<button class="mk-gforget" type="button" data-forget="' + esc(g.code) + '" aria-label="' + esc(t("forget", g.title || g.code)) + '">×</button></li>';
  }
  function drawKeptInto(ul, empty) {
    var list = keptList();
    ul.innerHTML = list.map(gameLi).join("");
    empty.hidden = list.length > 0;
  }
  function keptClick(e) {
    var b = e.target.closest("button");
    if (!b) return;
    var fg = b.getAttribute("data-forget"), code = b.getAttribute("data-code");
    if (fg) { forgetKept(fg); drawKeptInto($("st-games"), $("st-nogames")); drawKeptInto($("gm-list"), $("gm-empty")); return; }
    if (!code) return;
    var g = keptList().filter(function (x) { return x.code === code; })[0];
    if (!g) return;
    if (G && G.code === code) { TO.closeDialog($("dlg-games")); return; }
    leaveGuard(function () { TO.closeDialog($("dlg-games")); msgClear(); openByKey(g.code, g.edit, true); });
  }
  $("st-games").addEventListener("click", keptClick);
  $("gm-list").addEventListener("click", keptClick);

  /* ---- your games: the list, a new game, a file ---- */
  var leaveArm = 0;
  function leaveGuard(fn) {
    if (!G || (!isDirty() && !unkept()) || now() - leaveArm < 6000) { leaveArm = 0; $("gm-leave").hidden = true; fn(); return; }
    leaveArm = now();
    $("gm-leave").textContent = t(isDirty() ? "leaveFirst" : "leaveKeep");
    $("gm-leave").hidden = false;
  }
  function openGames() {
    drawKeptInto($("gm-list"), $("gm-empty"));
    $("gm-leave").hidden = true;
    leaveArm = 0;
    $("gm-down").hidden = !G;
    TO.openDialog($("dlg-games"));
  }
  $("mk-gamesbtn").addEventListener("click", openGames);
  $("gm-new").addEventListener("click", function () {
    leaveGuard(function () {
      TO.closeDialog($("dlg-games"));
      G = null;
      sdel(KS.draft);
      sdel(KS.open);
      msgClear();
      showStart();
    });
  });
  $("gm-file").addEventListener("click", function () { leaveGuard(function () { fileIn.click(); }); });
  $("gm-down").addEventListener("click", download);

  /* ---- a file: "Download a copy" and "Open a file" (spec 8.10) ---- */
  function fileName(title) {
    var s = clean(title).normalize("NFC").replace(/[^\p{L}\p{M}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 60);
    return (s || "logicers-game") + ".logicers.json";
  }
  function download() {
    if (!G) return;
    var k = built(G.kit), data = JSON.stringify({ logicers: "live-game", v: 1, kit: k }, null, 2), url;
    try { url = window.URL.createObjectURL(new Blob([data], { type: "application/json" })); } catch (e) { return; }
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName(k.title);
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { window.URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 2000);
    TO.count("live/build/download");
  }
  var fileIn = $("mk-file");
  fileIn.addEventListener("change", function () {
    var f = this.files && this.files[0];
    this.value = "";
    if (!f) return;
    var bad = function () { if (!G) showStart(); sayErr(t("errFile")); };
    if (f.size > 2e6) { bad(); return; }
    var rd = new FileReader();
    rd.onload = function () {
      var o = null;
      try { o = JSON.parse(String(rd.result)); } catch (e) { o = null; }
      if (!o || o.logicers !== "live-game" || o.v !== 1 || !o.kit || typeof o.kit !== "object" || Array.isArray(o.kit)) { bad(); return; }
      TO.closeDialog($("dlg-games"));
      msgClear();
      G = newG(normKit(o.kit));
      G.note = "file";
      sdel(KS.open);
      writeDraft();
      TO.count("live/build/file");
      enterEditor();
    };
    rd.onerror = bad;
    rd.readAsText(f);
  });

  /* ---- delete, for good: tap twice ---- */
  var delArm = 0, delT = 0;
  function resetDel(btn) {
    if (!btn) return;
    btn.textContent = t("delGame");
    btn.classList.remove("mk-armed");
    btn.disabled = false;
  }
  function delGame(btn, out) {
    if (!G || !G.code) return;
    if (now() - delArm > 4000) {
      delArm = now();
      btn.textContent = t("delAgain");
      btn.classList.add("mk-armed");
      clearTimeout(delT);
      delT = setTimeout(function () { delArm = 0; resetDel(btn); }, 4000);
      return;
    }
    delArm = 0;
    clearTimeout(delT);
    btn.disabled = true;
    var code = G.code;
    call("/kit/" + code + "/delete", { edit: G.edit }).then(function (r) {
      resetDel(btn);
      if (r.status === 200 || r.status === 404) {
        forgetKept(code);
        sdel(KS.open);
        sdel(KS.draft);
        TO.closeDialog($("dlg-saved"));
        G = null;
        msgClear();
        showStart();
        toast(t("deleted"), null, null, 3200);
        TO.count("live/build/deleted");
        return;
      }
      if (out) out.textContent = errText(r); else sayErr(errText(r));
    });
  }

  /* ---- Host it now: saved first if needed, then the live page's setup with this game (spec 8.8) ---- */
  function hostNow() {
    if (!G) return;
    var go = function () {
      var b = built(G.kit);
      sset(KS.host, { code: G.code, edit: G.edit, title: b.title, colour: b.colour, lang: b.lang, n: b.qs.length, sure: b.sure, st: b.st, t: now() });
      TO.count("live/build/host");
      G.leaving = true;
      window.location.href = TO.here("../#host");
    };
    if (!G.code || isDirty()) save({ then: go }); else go();
  }
  $("mk-save").addEventListener("click", function () { save(); });
  $("mk-save2").addEventListener("click", function () { save(); });
  $("mk-host").addEventListener("click", hostNow);
  $("mk-host2").addEventListener("click", hostNow);
  $("mk-codechip").addEventListener("click", openSaved);
  $("mk-resbtn").addEventListener("click", function () { openResults(); });

  /* ================================================================ paste from a spreadsheet (spec 8.9) */
  var PS = { type: "num", chosen: false, items: [] };
  /* the rows a spreadsheet copies: tabs between cells, a cell with a tab, a line break or a quote in quotes */
  function tsv(text) {
    var rows = [], row = [], cell = "", i = 0, n, q = false, c;
    text = String(text || "").replace(/\r\n?/g, "\n");
    n = text.length;
    while (i < n) {
      c = text.charAt(i);
      if (q) {
        if (c === '"') { if (text.charAt(i + 1) === '"') { cell += '"'; i += 2; continue; } q = false; i++; continue; }
        cell += c; i++; continue;
      }
      if (c === '"' && cell === "") { q = true; i++; continue; }
      if (c === "\t") { row.push(cell); cell = ""; i++; continue; }
      if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; i++; continue; }
      cell += c; i++;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (x) { return x.trim(); }); });
  }
  var TFYES = ["true", "t", "yes", "1", "vero", "v", "si", "dogru", "evet", "right", "correct", "giusto", "x"];
  var TFNO = ["false", "f", "no", "0", "falso", "yanlis", "hayir", "wrong", "sbagliato"];
  function tfWord(s) {
    var k = R.fold(s, true);
    return TFYES.indexOf(k) >= 0 ? true : TFNO.indexOf(k) >= 0 ? false : null;
  }
  var HEADS = ["question", "questions", "domanda", "domande", "soru", "sorular", "q", "#"];
  function looksHead(type, r) {
    if (type === "num") return parseNum(r[1]).v === null;
    if (type === "tf") return tfWord(r[1] || "") === null;
    return HEADS.indexOf(R.fold(r[0] || "", true)) >= 0;
  }
  function guessType(rows) {
    var body = rows.length > 1 ? rows.slice(1) : rows, n = body.length, c = { tf: 0, num: 0, mc: 0 };
    body.forEach(function (r) {
      if (tfWord(r[1] || "") !== null) c.tf++;
      else if (parseNum(r[1]).v !== null) c.num++;
      else if (clean(r[2]) && clean(r[2]).length <= 80 && clean(r[1]).indexOf("|") < 0) c.mc++;
    });
    if (c.tf >= n * 0.6) return "tf";
    if (c.num >= n * 0.6) return "num";
    if (c.mc >= n * 0.6) return "mc";
    return "tx";
  }
  /* one row as a question, with what is still wrong */
  function rowQ(type, r) {
    var c = function (i) { return clean(r[i]); };
    if (!c(0)) return null;
    var q = blankQ(type), m = {};
    q.t = c(0);
    if (type === "num") {
      q.a = parseNum(c(1)).v; q.u = c(2); q.lo = parseNum(c(3)).v; q.hi = parseNum(c(4)).v; q.f = c(5); q.s = c(6);
      if (num(q.a) && whole(q.a) && q.a >= 1000 && q.a <= 2100 && YEARISH.test(q.t)) q.k = "year";
      if (num(q.a) && !num(q.lo) && !num(q.hi)) {
        var s = suggest(q);
        if (s) { q.lo = s.lo; q.hi = s.hi; q.log = s.log; m.auto = true; }
      }
      restep(q);
    } else if (type === "mc") {
      var right = c(1), others = [c(2), c(3), c(4)].filter(Boolean), at = Math.floor(Math.random() * (others.length + 1));
      q.o = others.slice(0, at).concat(right ? [right] : [], others.slice(at));
      q.r = right ? at : null;
      while (q.o.length < 2) q.o.push("");
      q.f = c(5); q.s = c(6);
    } else if (type === "tf") {
      q.r = tfWord(c(1)); q.f = c(2); q.s = c(3);
    } else {
      q.ok = c(1).split("|").map(clean).filter(Boolean).slice(0, 10); q.f = c(2); q.s = c(3);
    }
    var b = builtQ(q);
    return { q: q, m: m, b: b, probs: qProblems(b) };
  }
  function rowSum(it) {
    var b = it.b;
    if (b.type === "num") return num(b.a) ? withUnit(b, b.a) + (num(b.lo) && num(b.hi) ? " · " + numShow(b, b.lo) + "–" + numShow(b, b.hi) : "") : "";
    if (b.type === "mc") return b.o.map(function (x, i) { return (i === b.r ? "✓ " : "") + x; }).join(" · ");
    if (b.type === "tf") return b.r === true ? t("tfTrue") : b.r === false ? t("tfFalse") : "";
    return b.ok.join(" | ");
  }
  function drawPasteType() {
    $("ps-type").innerHTML = TYPES.map(function (ty) { return '<button type="button" role="radio" data-v="' + ty + '" aria-checked="' + (PS.type === ty) + '">' + esc(sub("pTypes", ty)) + "</button>"; }).join("");
    rove($("ps-type"));
    $("ps-cols").innerHTML = (sub("cols", PS.type) || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
  }
  function room() {
    var qs = G.kit.qs, blank = qs.length === 1 && isBlankQ(qs[0]);
    return MAXQ - qs.length + (blank ? 1 : 0);
  }
  function isBlankQ(q) { var b = builtQ(q); return !b.t && !b.f && !b.s && !(b.o && b.o.length) && !(b.ok && b.ok.length) && !num(b.a); }
  var psT = 0;
  function readPaste() {
    psT = 0;
    var rows = tsv($("ps-box").value), lines = [];
    if (!PS.chosen && rows.length) { var g = guessType(rows); if (g !== PS.type) { PS.type = g; drawPasteType(); } }
    var head = rows.length > 1 && looksHead(PS.type, rows[0]), body = head ? rows.slice(1) : rows;
    /* only the rows that could ever be added are read (a game holds 100 questions) */
    PS.items = body.slice(0, MAXQ + 20).map(function (r) { return rowQ(PS.type, r); }).filter(Boolean);
    var n = Math.min(PS.items.length, room());
    if (rows.length) lines.push(pl("pasteRead", body.length));
    if (head) lines.push(t("pasteHead"));
    if (rows.length && !rows.some(function (r) { return r.length > 1; })) lines.push(t("pasteNoTabs"));
    if (PS.items.length > n) lines.push(t("pasteFull", n));
    if (PS.items.some(function (it) { return it.probs.length; })) lines.push(t("pasteFixLater"));
    $("ps-status").textContent = lines.join(" ");
    $("ps-prev").innerHTML = PS.items.length ? '<table class="mk-pst"><tbody>' + PS.items.slice(0, 100).map(function (it, i) {
      return '<tr><td class="mk-n">' + (i + 1) + '</td><td class="mk-t"><span dir="auto">' + esc(it.b.t) + '</span><div class="mk-a" dir="auto">' + esc(rowSum(it)) + "</div>" +
        (it.probs.length ? '<p class="mk-err">' + esc(cap(it.probs[0].m)) + "</p>" : "") + "</td></tr>";
    }).join("") + "</tbody></table>" : "";
    var add = $("ps-add");
    add.textContent = pl("pasteAdd", n, n);
    add.disabled = n === 0;
  }
  function openPaste() {
    if (!G) return;
    PS.chosen = false;
    $("ps-box").value = "";
    drawPasteType();
    readPaste();
    TO.openDialog($("dlg-paste"));
    setTimeout(function () { $("ps-box").focus(); }, 30);
  }
  $("ps-type").addEventListener("click", function (e) {
    var b = e.target.closest("[data-v]");
    if (!b) return;
    PS.type = b.getAttribute("data-v");
    PS.chosen = true;
    drawPasteType();
    readPaste();
    var nb = $("ps-type").querySelector('[data-v="' + PS.type + '"]');
    if (nb) nb.focus();
  });
  $("ps-box").addEventListener("input", function () { clearTimeout(psT); psT = setTimeout(readPaste, 150); });
  $("ps-add").addEventListener("click", function () {
    var n = Math.min(PS.items.length, room());
    if (!n) return;
    if (G.kit.qs.length === 1 && isBlankQ(G.kit.qs[0])) G.kit.qs = [];     // the untouched first question gives its place
    var first = G.kit.qs.length;
    PS.items.slice(0, n).forEach(function (it) { G.kit.qs.push(it.q); if (it.m.auto) G.m[it.q.id] = { auto: true }; });
    TO.closeDialog($("dlg-paste"));
    G.checked = G.checked || false;
    drawList();
    openQ(first);
    changed();
    TO.count("live/build/paste");
  });

  /* ================================================================ opening a game */
  function openByKey(code, edit, fromList) {
    if (!CODE_RE.test(code) || !KEY_RE.test(edit)) { showStart(); sayErr(t("errEdit")); return; }
    loadingView();
    call("/kit/" + code + "/open", { edit: edit }).then(function (r) {
      if (r.status === 200 && r.b.stopped) {
        G = newG(blankKit(lang));
        G.code = code;
        G.edit = edit;
        sset(KS.open, { code: code, edit: edit });
        sdel(KS.draft);
        showStopped(r.b.stopped.why, r.b.mail);
        return;
      }
      if (r.status === 200 && r.b.kit) {
        G = newG(normKit(r.b.kit));
        G.code = code;
        G.edit = edit;
        G.copy = typeof r.b.copy === "string" ? r.b.copy : "";
        G.until = r.b.until || 0;
        G.plays = r.b.plays || 0;
        G.way = !!r.b.way;
        G.wayAt = r.b.wayAt || 0;
        G.mail = G.way ? tri(r.b.mail) : false;
        G.saved = snapJson();
        sset(KS.open, { code: code, edit: edit });
        writeDraft();
        syncKept();
        enterEditor();
        return;
      }
      if (r.status === 404) { var was = isKept(code); forgetKept(code); sdel(KS.open); showStart(); sayErr(t(was || fromList ? "removedGone" : "errNogame")); return; }
      if (r.status === 403) { if (r.b.replaced) forgetKeptKey(code, edit); sdel(KS.open); showStart(); sayErr(errText(r)); return; }
      showStart();
      sayErr(errText(r), [{ text: t("tryAgain"), solid: true, go: function () { msgClear(); openByKey(code, edit, fromList); } }]);
    });
  }
  function openCopy(code, token) {
    if (!CODE_RE.test(code)) { showStart(); sayErr(t("errCopy")); return; }
    loadingView();
    call("/kit/" + code + "/copy", { copy: token }).then(function (r) {
      if (r.status === 200 && r.b.kit) {
        G = newG(normKit(r.b.kit));
        G.from = { code: code, copy: token };
        G.note = "copy";
        sdel(KS.open);
        writeDraft();
        TO.count("live/build/copy");
        enterEditor();
        return;
      }
      showStart();
      if (r.b.e === "stopped") sayErr(t("errStoppedCopy"));
      else if (r.status === 404) sayErr(t("errNogame"));
      else if (r.status === 403) sayErr(t("errCopy"));
      else sayErr(errText(r), [{ text: t("tryAgain"), solid: true, go: function () { msgClear(); openCopy(code, token); } }]);
    });
  }
  /* a reload, or coming back to this tab: the draft as it was, and what the server knows, quietly */
  function restore(d, o) {
    G = newG(normKit(d.kit));
    G.from = d.from && CODE_RE.test(String(d.from.code)) && typeof d.from.copy === "string" ? { code: d.from.code, copy: d.from.copy } : null;
    G.note = d.note === "copy" || d.note === "file" ? d.note : "";
    G.raw = obj(d.raw);
    G.m = obj(d.m);
    G.sel = whole(d.sel) && d.sel >= 0 && d.sel < G.kit.qs.length ? d.sel : 0;
    G.saved = typeof d.saved === "string" ? d.saved : null;
    G.kept = d.kept !== false;
    var mine = d.code && o && o.code === d.code && KEY_RE.test(String(o.edit));
    if (!mine) { G.saved = null; enterEditor(); return; }
    G.code = d.code;
    G.edit = o.edit;
    var unsaved = G.saved === null || isDirty();
    enterEditor();
    var g = G;
    call("/kit/" + G.code + "/open", { edit: G.edit }).then(function (r) {
      if (g !== G) return;
      if (r.status === 200 && r.b.stopped) { showStopped(r.b.stopped.why, r.b.mail); return; }
      if (r.status === 200 && r.b.kit) {
        G.copy = typeof r.b.copy === "string" ? r.b.copy : "";
        G.until = r.b.until || 0;
        G.plays = r.b.plays || 0;
        G.way = !!r.b.way;
        G.wayAt = r.b.wayAt || 0;
        G.mail = G.way ? tri(r.b.mail) : false;
        var server = normKit(r.b.kit), sj = JSON.stringify(built(server));
        if (!unsaved && !isDirty() && sj !== G.saved) {     // changed elsewhere, and nothing unsaved here: the newer one
          var sel = G.sel;
          G.kit = server;
          G.sel = Math.min(sel, Math.max(0, server.qs.length - 1));
          G.saved = sj;
          enterEditor();
        } else G.saved = sj;
        syncKept();
        writeDraft();
        updateTop();
        return;
      }
      if (r.status === 404 || r.status === 403) {
        if (r.status === 404) forgetKept(G.code); else forgetKeptKey(G.code, G.edit);
        G.code = null; G.edit = null; G.copy = ""; G.saved = null; G.kept = true; G.way = false; G.mail = false;
        sdel(KS.open);
        writeDraft();
        updateTop();
        sayErr(r.status === 404 ? t("errGoneSave") : errText(r));
      }
      /* no signal: the work goes on here, and the save will say so */
    });
  }
  /* mail: what the server said of feedback emails with the stop (open); left out, what this page knew */
  function showStopped(why, mail) {
    applyWords();
    $("stop-why").textContent = why ? String(why) : t("stoppedNoWhy");
    if (G) { sdel(KS.draft); if (mail !== undefined) G.mail = tri(mail); }
    $("stop-fbmsg").textContent = "";
    drawStopFb();
    TO.closeDialog($("dlg-saved"));
    show("v-stop");
  }
  /* a stopped game's maker can still stop feedback emails (the review of 15 Oct 2026) */
  function drawStopFb() {
    var m = G && G.code ? G.mail : false;
    $("stop-fb").hidden = m === false;
    fbText($("stop-fbtext"), m);
  }
  $("stop-fbstop").addEventListener("click", function () {
    var b = this, g = G;
    if (!g || !g.code) return;
    b.disabled = true;
    call("/kit/" + g.code + "/mail", { edit: g.edit }).then(function (r) {
      b.disabled = false;
      if (g !== G) return;
      if (r.status === 200 && r.b.ok) { g.mail = false; drawStopFb(); $("stop-fbmsg").textContent = t("fbStopped"); TO.count("live/build/fb-stop"); $("stop-new").focus(); }
      else $("stop-fbmsg").textContent = errText(r);
    });
  });
  $("stop-new").addEventListener("click", function () { G = null; sdel(KS.open); sdel(KS.draft); showStart(); });
  $("stop-del").addEventListener("click", function () { delGame(this, null); });

  /* ================================================================ results (spec 8.14) */
  var RS = null;
  function openResults() {
    if (!G || !G.code) return;
    RS = { data: null, limit: 50, shown: {}, ticks: {}, timers: {}, flying: {}, busy: 0, status: "" };
    try { window.history.pushState({ mk: "r" }, "", window.location.pathname + window.location.search); } catch (e) { /* the button still goes back */ }
    msgClear();
    show("v-results");
    updateTop();
    $("rs-left").innerHTML = '<p class="mk-wait"><span class="mk-spin" aria-hidden="true"></span>' + esc(t("loading")) + "</p>";
    $("rs-right").innerHTML = "";
    loadResults(true);
    TO.count("live/build/results");
  }
  function closeResults() {
    if (RS) Object.keys(RS.timers).forEach(function (id) { clearTimeout(RS.timers[id]); sendGrade(id); });
    show("v-edit");
    growAll();
    updateTop();
  }
  $("rs-back").addEventListener("click", function () {
    if (window.history.state && window.history.state.mk === "r") window.history.back(); else closeResults();
  });
  $("rs-refresh").addEventListener("click", function () {
    if (!RS) return;
    Object.keys(RS.timers).forEach(function (id) { clearTimeout(RS.timers[id]); sendGrade(id); });
    loadResults(true);
  });
  function loadResults(all) {
    var g = G, rs = RS;
    call("/kit/" + G.code + "/results", { edit: G.edit }).then(function (r) {
      if (g !== G || rs !== RS || $("v-results").hidden) return;
      if (r.status === 200) {
        RS.data = { plays: Array.isArray(r.b.plays) ? r.b.plays : [], typed: Array.isArray(r.b.typed) ? r.b.typed : [] };
        drawLeft();
        if (all || !(RS.busy || Object.keys(RS.timers).length)) drawRight();
        return;
      }
      if (r.b.e === "stopped") { showStopped(r.b.why); return; }
      $("rs-left").innerHTML = '<p class="mk-err">' + esc(errText(r)) + '</p><div class="mk-btnrow"><button class="btn solid" type="button" data-act="retry">' + esc(t("tryAgain")) + "</button></div>";
    });
  }
  function drawLeft() {
    var plays = RS.data.plays, alone = G.kit.mode === "alone", h = "";
    if (!alone) h += '<p class="mk-note mk-notice">' + esc(t("liveOnlyRes")) + "</p>";
    if (!plays.length) {
      if (alone) h += '<div class="mk-empty-state"><p class="mk-h2">' + esc(t("noPlays")) + "</p>" + codeBoxes(G.code) + '<div class="mk-qr">' + qrSvg(playersLink()) +
        '</div><p class="mk-link">' + esc(shortLink(playersLink())) + "</p></div>";
    } else {
      h += '<p class="mk-lab mk-first">' + esc(pl("playedAlone", plays.length, plays.length, dateShort(G.until || now()))) + "</p>" +
        '<table class="mk-rt"><thead><tr><th scope="col">' + esc(t("resPlace")) + '</th><th scope="col">' + esc(t("resName")) + '</th><th scope="col" class="mk-r">' + esc(t("resPts")) +
        '</th><th scope="col" class="mk-r">' + esc(t("resRight")) + '</th><th scope="col" class="mk-r">' + esc(t("resWhen")) + "</th></tr></thead><tbody>";
      var place = 0;
      plays.slice(0, RS.limit).forEach(function (p, i) {
        if (i === 0 || p[1] < plays[i - 1][1]) place = i + 1;
        h += '<tr><td class="mk-pl">' + place + '</td><td class="mk-nm" dir="auto">' + esc(p[0]) + '</td><td class="mk-pt">' + esc(nfmt(+p[1] || 0)) + '</td><td class="mk-ro">' +
          (+p[3] || 0) + "/" + (+p[4] || 0) + '</td><td class="mk-wh">' + esc(ago(+p[2] || now())) + "</td></tr>";
      });
      h += "</tbody></table>";
      if (plays.length > RS.limit) h += '<p class="mk-small">' + esc(pl("andMore", plays.length - RS.limit, plays.length - RS.limit)) + ' <button class="mk-showbtn" type="button" data-act="more">' + esc(t("showMore")) + "</button></p>";
      h += '<p class="mk-small">' + esc(t("asTyped")) + "</p>";
    }
    $("rs-left").innerHTML = h;
  }
  $("rs-left").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !RS) return;
    if (b.getAttribute("data-act") === "more") { RS.limit += 100; drawLeft(); }
    if (b.getAttribute("data-act") === "retry") { $("rs-left").innerHTML = ""; loadResults(true); }
  });
  function typedOf(id) { return (RS.data.typed || []).filter(function (x) { return x.id === id; })[0] || null; }
  function qIndex(id) { var n = -1; G.kit.qs.forEach(function (q, i) { if (q.id === id) n = i; }); return n; }
  function ticked(tq, g) { var tk = RS.ticks[tq.id] || {}; return !!g[3] || (Object.prototype.hasOwnProperty.call(tk, "=" + g[0]) ? tk["=" + g[0]] : !!g[4]); }
  function drawRight() {
    var typed = RS.data.typed, h = "";
    if (!typed.length) { $("rs-right").innerHTML = '<p class="mk-small">' + esc(t("noTypedQs")) + "</p>"; return; }
    typed.forEach(function (tq) {
      var qi = qIndex(tq.id), groups = Array.isArray(tq.groups) ? tq.groups : [];
      h += '<div class="mk-tblock" data-q="' + esc(tq.id) + '"><p class="mk-lab mk-first">' + esc(t("checkL", qi >= 0 ? qi + 1 : "")) + '</p><p class="mk-tq" dir="auto">' + esc(tq.t) + "</p>";
      if (!groups.length) h += '<p class="mk-small">' + esc(t("noTyped")) + "</p>";
      else {
        h += '<div class="mk-gr">' + groups.map(function (g, j) {
          var listed = !!g[3], hidden = !!g[5] && !RS.shown[tq.id + "\u0000" + g[0]], shown = hidden ? "••••" : String(g[1]);
          return '<div><span class="mk-ga"><span dir="auto">' + esc(shown) + "</span>" + (hidden ? '<button class="mk-showbtn" type="button" data-show="' + j + '" title="' + esc(t("hiddenL")) + '">' + esc(t("show")) + "</button>" : "") +
            '</span><span class="mk-gn">' + esc(nfmt(+g[2] || 0) + (listed ? " · " + t("onList") : "")) + '</span><button class="mk-tick" type="button" data-tick="' + j + '" aria-pressed="' + ticked(tq, g) + '"' +
            (listed ? " disabled" : "") + ' aria-label="' + esc(t("markRight", shown)) + '">' + ICON.check + "</button></div>";
        }).join("") + "</div>";
        if (tq.more) h += '<p class="mk-small">' + esc(pl("moreTyped", +tq.more, +tq.more)) + "</p>";
      }
      h += "</div>";
    });
    h += '<p class="mk-note">' + rich(t("tapRight")) + '</p><p class="mk-small mk-status" id="rs-status" role="status">' + esc(RS.status || "") + "</p>";
    $("rs-right").innerHTML = h;
  }
  $("rs-right").addEventListener("click", function (e) {
    var b = e.target.closest("button"), blk = b && b.closest(".mk-tblock");
    if (!blk || !RS) return;
    var id = blk.getAttribute("data-q"), tq = typedOf(id);
    if (!tq) return;
    if (b.hasAttribute("data-show")) { RS.shown[id + "\u0000" + tq.groups[+b.getAttribute("data-show")][0]] = true; drawRight(); return; }
    if (!b.hasAttribute("data-tick")) return;
    var g = tq.groups[+b.getAttribute("data-tick")];
    if (!g || g[3]) return;
    var on = b.getAttribute("aria-pressed") !== "true", tk = RS.ticks[id] || (RS.ticks[id] = {});
    tk["=" + g[0]] = on;
    b.setAttribute("aria-pressed", String(on));
    /* the ticks of about a second go together, as the whole list of that question */
    clearTimeout(RS.timers[id]);
    RS.timers[id] = setTimeout(function () { sendGrade(id); }, 1000);
  });
  function sendGrade(id) {
    if (!RS || !G) return;
    var rs = RS, tq = typedOf(id);
    delete RS.timers[id];
    if (!tq) return;
    /* one call at a time for a question, so an older list can never arrive after a newer one */
    if (RS.flying[id]) { RS.timers[id] = setTimeout(function () { sendGrade(id); }, 400); return; }
    RS.flying[id] = true;
    var ok = tq.groups.filter(function (g) { return !g[3] && ticked(tq, g); }).map(function (g) { return g[0]; });
    RS.busy++;
    call("/kit/" + G.code + "/grade", { edit: G.edit, id: id, ok: ok }).then(function (r) {
      rs.busy--;
      delete rs.flying[id];
      if (rs !== RS) return;
      /* the line stays when the list is drawn again with the new scores */
      RS.status = r.status === 200 ? t("scoresUpdated") : errText(r);
      var st = $("rs-status");
      if (st) st.textContent = RS.status;
      if (r.status === 200) {
        tq.groups.forEach(function (g) { if (!g[3]) g[4] = ok.indexOf(g[0]) >= 0 ? 1 : 0; });
        if (!RS.timers[id]) delete RS.ticks[id];
        loadResults(false);
      }
    });
  }

  /* ================================================================ the start of it all */
  each(document.querySelectorAll("[data-icon]"), function (e) { e.innerHTML = ICON[e.getAttribute("data-icon")] || ""; });
  TO.wireDialogs();
  TO.fixLocalLinks();
  (function start() {
    var d = sget(KS.draft), o = sget(KS.open);
    if (LINK && LINK.kind === "edit") {
      /* the edit link of the game already open in this tab: its unsaved work stays */
      if (d && d.kit && d.code === LINK.code) { restore(d, { code: LINK.code, edit: LINK.key }); sset(KS.open, { code: LINK.code, edit: LINK.key }); return; }
      openByKey(LINK.code, LINK.key);
      return;
    }
    if (LINK && LINK.kind === "copy") { openCopy(LINK.code, LINK.key); return; }
    if (LINK) { showStart(); sayErr(t(LINK.kind === "badcopy" ? "errCopy" : "errEdit")); return; }
    if (d && d.kit && typeof d.kit === "object") { restore(d, o); return; }
    if (o && CODE_RE.test(String(o.code)) && KEY_RE.test(String(o.edit))) { openByKey(o.code, o.edit); return; }
    showStart();
  })();
  /* a link pasted into the address bar of this page while it is open (an edit link from the maker's own email, a
     new one from Logicers, a copy link): opened as at load; unsaved work here, or a game whose edit link is kept
     nowhere yet, asks first, in the panel at the top */
  window.addEventListener("hashchange", function () {
    var l = takeLink();
    if (!l) return;
    if (l.kind === "edit" && G && G.code === l.code) {
      /* this very game, with a key that may be a new one: tried first, and taken (the work here stays) only if it
         opens the game; a wrong or old key changes nothing here (an independent review, 15 Oct 2026) */
      if (l.key === G.edit) { msgClear(); return; }
      var g0 = G;
      call("/kit/" + l.code + "/open", { edit: l.key }).then(function (r) {
        if (g0 !== G) return;
        if (r.status === 200 && r.b.kit) {
          G.edit = l.key;
          G.kept = true;
          G.way = !!r.b.way;
          G.wayAt = r.b.wayAt || 0;
          G.mail = G.way ? tri(r.b.mail) : false;
          sset(KS.open, { code: G.code, edit: G.edit });
          syncKept();
          writeDraft();
          msgClear();
          return;
        }
        if (r.status === 200 && r.b.stopped) {          // stopped meanwhile: its reason, with the key that opens it
          G.edit = l.key;
          sset(KS.open, { code: G.code, edit: G.edit });
          msgClear();
          showStopped(r.b.stopped.why, r.b.mail);
          return;
        }
        sayErr(errText(r));
      });
      return;
    }
    var go = function () {
      msgClear();
      KP = null;
      each(document.querySelectorAll("dialog[open]"), function (d) { TO.closeDialog(d); });
      if (l.kind === "edit") openByKey(l.code, l.key);
      else if (l.kind === "copy") openCopy(l.code, l.key);
      else { showStart(); sayErr(t(l.kind === "badcopy" ? "errCopy" : "errEdit")); }
    };
    if (G && (isDirty() || unkept())) {
      msgShow("err", "<p>" + esc(t(isDirty() ? "linkLeave" : "linkLeaveKeep")) + "</p>", [{ text: t("linkOpen"), solid: true, go: go }, { text: t("linkStay"), go: msgClear }]);
      return;
    }
    go();
  });
})();
