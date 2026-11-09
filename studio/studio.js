/* Logicers Studio (by.logicers.com): the pages, from one shell (chat B, 8 Nov 2026; the design is claude/studio-plan.md).

   The path says the page:  /  the directory · /<maker>/  the maker's page · /<maker>/<game>/  the game ·
   .../about/  its About · .../embed/  the slim layout for other sites · .../edit/#<edit key>  the editor ·
   /new/  a new game · /terms/  the terms. The editor is editor.js, loaded only there.

   Every maker game carries its maker's name under its own name on every screen, the notice line under it ("Made by…
   Logicers hosts this game and did not check its content"), and a Report button. The words "approved" and "checked
   it" never appear for a game: it is listed, or not listed yet.

   Kept in this browser (by.logicers.com):
     lg.studio.v1    { v, lang, pid: {game: id}, name: {game: name}, r: {game: {slot: {a, k, c, t}}} }  the answers, for a revisit
     lg.studio.play  { v, g: {game: {t, by, m, d: {YYYY-MM-DD: k}, o, of, last}} }                     the plays, for streaks
     lg.studio.mine  { v, maker: {slug, name, key, t} | null, games: [{maker, slug, title, edit, t}] }  the keys (editor.js)
   game = "<maker>/<game>"; slot = the local day (daily mode) or "i:<item id>" (open mode); k = 0..3, how close.
   The plays and the keys go to logicers.com through bridge.html, into My Logicers' own keys (chat D): logicers-studio:played
   on every phone; logicers-studio:maker and logicers-studio:games only on a phone that keeps a My Logicers code. The two
   sites cannot read each other's storage. */
(function () {
  "use strict";
  var WORDS = window.STUDIO_WORDS, API = window.StudioAPI;
  if (!WORDS || !API) return;
  var TPL = window.StudioT = window.StudioT || {};

  /* ---------------- where this page runs ---------------- */
  var HOST = window.location.hostname;
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(HOST);
  /* the copy of this folder that GitHub Pages also publishes on logicers.com/studio/ is not the Studio */
  if (/(^|\.)logicers\.com$/.test(HOST) && HOST !== "by.logicers.com") { window.location.replace("https://by.logicers.com/"); return; }
  var SITE = LOCAL ? window.location.origin : "https://by.logicers.com";
  var MAIN = "https://logicers.com";
  var BRIDGE = LOCAL ? (typeof window.STUDIO_BRIDGE === "string" ? window.STUDIO_BRIDGE : "") : MAIN + "/studio/bridge.html";
  var TERMS_VERSION = "2026-11-08";
  var LANGS = ["en", "it", "tr", "es", "pt", "fr"];
  var LANG_NAMES = { en: "English", it: "Italiano", tr: "Türkçe", es: "Español", pt: "Português", fr: "Français" };

  /* ---------------- small things ---------------- */
  function $(id) { return document.getElementById(id); }
  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function attr(e, o) { Object.keys(o).forEach(function (k) { if (o[k] != null) e.setAttribute(k, o[k]); }); return e; }
  function btn(cls, text, onClick) {
    var b = el("button", cls, text);
    b.type = "button";
    if (onClick) b.addEventListener("click", onClick);
    return b;
  }
  function reduced() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  function rid(n) {
    var a = "abcdefghjkmnpqrstuvwxyz23456789", b = new Uint8Array(n || 12), s = "";
    try { window.crypto.getRandomValues(b); } catch (e) { for (var j = 0; j < b.length; j++) b[j] = Math.floor(Math.random() * 256); }
    for (var i = 0; i < b.length; i++) s += a[b[i] % a.length];
    return s;
  }

  /* ---------------- words ---------------- */
  var KEY_LANG = "lg.studio.lang";
  function known(l) { return LANGS.indexOf(l) >= 0; }
  function firstLang() {
    var q = /[?&]lang=([a-z]{2})/.exec(window.location.search);
    if (q && known(q[1])) { try { window.localStorage.setItem(KEY_LANG, q[1]); } catch (e) { /* fine */ } return q[1]; }
    try { var s = window.localStorage.getItem(KEY_LANG); if (known(s)) return s; } catch (e) { /* fine */ }
    var list = (window.navigator.languages || [window.navigator.language || "en"]);
    for (var i = 0; i < list.length; i++) { var c = String(list[i] || "").slice(0, 2).toLowerCase(); if (known(c)) return c; }
    return "en";
  }
  var uiLang = firstLang(), lang = uiLang;
  function t(k, vars) {
    var s = (WORDS[lang] && WORDS[lang][k]) || WORDS.en[k];
    if (s == null) s = k;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, v) { return vars[v] != null ? String(vars[v]) : m; });
    return s;
  }
  function useLang(l) { lang = known(l) ? l : "en"; document.documentElement.lang = lang; }
  function fmt(n, plain) {
    if (!num(n)) return "";
    try { return new Intl.NumberFormat(lang, plain ? { useGrouping: false, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 }).format(n); }
    catch (e) { return String(n); }
  }

  /* ---------------- days: the player's own local day, as the daily games count them ---------------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayOf(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dayIndex(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) : null; }
  function dayFrom(i) { var d = new Date(i * 86400000); return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()); }
  function today() { return dayOf(new Date()); }
  function dayLong(s, short) {
    var i = dayIndex(s); if (i == null) return "";
    try { return new Intl.DateTimeFormat(lang, short ? { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" } : { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(i * 86400000)); }
    catch (e) { return s; }
  }

  /* ---------------- storage ---------------- */
  function lget(k) { try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lset(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  var memo = {};
  function store() { var s = obj(lget("lg.studio.v1")) || obj(memo.v1) || {}; s.v = 1; s.pid = obj(s.pid) || {}; s.name = obj(s.name) || {}; s.r = obj(s.r) || {}; return s; }
  function storeSet(s) { memo.v1 = s; lset("lg.studio.v1", s); }
  function result(game, slot) { var r = store().r[game]; return r && obj(r[slot]) ? r[slot] : null; }
  function saveResult(game, slot, res) {
    var s = store();
    s.r[game] = obj(s.r[game]) || {};
    s.r[game][slot] = res;
    storeSet(s);
  }
  function playBook() { var p = obj(lget("lg.studio.play")) || obj(memo.play) || {}; p.v = 1; p.g = obj(p.g) || {}; return p; }
  function playNote(meta, slot, k, of) {
    var p = playBook(), e = obj(p.g[meta.key]) || {};
    e.t = meta.title; e.by = meta.maker_name; e.m = meta.mode;
    e.d = obj(e.d) || {};
    if (meta.mode === "daily") e.d[slot] = k;
    else { var s = store().r[meta.key] || {}; e.o = Object.keys(s).filter(function (x) { return /^i:/.test(x); }).length; if (num(of)) e.of = of; }
    e.last = today();
    p.g[meta.key] = e;
    memo.play = p;
    lset("lg.studio.play", p);
    var one = {}; one[meta.key] = e;
    bridge("play", { g: one });
  }
  /* the site's own streak rule (assets/js/turnsout.js): days played, one missed day forgiven, alive while the last
     day played is today, yesterday or the day before */
  function streakOf(game) {
    var e = obj(playBook().g[game]); if (!e || !obj(e.d)) return 0;
    var on = {}; Object.keys(e.d).forEach(function (d) { var i = dayIndex(d); if (i != null) on[i] = 1; });
    var n = dayIndex(today()), current = 0;
    if (!on[n]) n = on[n - 1] ? n - 1 : on[n - 2] ? n - 2 : null;
    while (n != null && on[n]) { current++; n--; if (!on[n] && on[n - 1]) n--; }
    return current;
  }
  function mine() { var m = obj(lget("lg.studio.mine")) || obj(memo.mine) || {}; m.v = 1; m.maker = obj(m.maker); m.games = Array.isArray(m.games) ? m.games.filter(obj) : []; return m; }
  function mineSet(m) { memo.mine = m; return lset("lg.studio.mine", m); }

  /* ---------------- the bridge to logicers.com (bridge.html): My Logicers lives there ---------------- */
  var br = null;
  function bridge(op, data) {
    if (!BRIDGE || document.body.classList.contains("st-embed")) return Promise.resolve(null);
    if (!br) {
      br = { wait: {}, ready: null, origin: "" };
      try { br.origin = new URL(BRIDGE, window.location.href).origin; } catch (e) { br = null; return Promise.resolve(null); }
      br.ready = new Promise(function (resolve) {
        br.go = resolve;
        window.setTimeout(function () { resolve(false); }, 4000);
      });
      window.addEventListener("message", function (e) {
        if (e.origin !== br.origin || !obj(e.data) || e.data.lg !== "studio") return;
        if (e.data.op === "ready") { br.go(true); return; }
        var w = br.wait[e.data.id]; if (w) { delete br.wait[e.data.id]; w(e.data); }
      });
      var f = attr(el("iframe"), { src: BRIDGE, title: "", "aria-hidden": "true", tabindex: "-1" });
      f.hidden = true;
      document.body.appendChild(f);
      br.frame = f;
    }
    var b = br;
    return b.ready.then(function (ok) {
      if (!ok || !b.frame.contentWindow) return null;
      return new Promise(function (resolve) {
        var id = rid(8);
        b.wait[id] = resolve;
        window.setTimeout(function () { if (b.wait[id]) { delete b.wait[id]; resolve(null); } }, 3000);
        b.frame.contentWindow.postMessage({ lg: "studio", op: op, id: id, data: data || null }, b.origin);
      });
    });
  }

  /* ---------------- rich text: paragraphs, **bold**, links. Built as nodes, never as HTML. ---------------- */
  /* F, 8 Nov 2026: exactly the Worker's rule (server/studio/src/util.js linksIn): [words](address) and bare http(s) addresses,
     no "www." guesses; an address with a user part (https://a.org@b.org) or without a dotted host is shown as plain text */
  var URL_RE = /\[([^\]\n]{0,200})\]\(([^)\s]{0,500})\)|(https?:\/\/[^\s<>"'`)\]]+)/gi;
  function safeHref(h) {
    var u; try { u = new URL(h); } catch (e) { return null; }
    if ((u.protocol !== "https:" && u.protocol !== "http:") || u.username || u.password || !/^[^.]+(\.[^.]+)+$/.test(u.hostname)) return null;
    return u.href.length <= 500 ? u.href : null;
  }
  function links(text) { var n = 0; String(text || "").replace(URL_RE, function () { n++; return ""; }); return n; }
  function linkEl(href, label) {
    var a = attr(el("a", null, label), { href: href, target: "_blank", rel: "nofollow noopener noreferrer ugc" });
    var mark = attr(el("span", "st-out-mark", "↗"), { title: t("site.outside") });
    var sr = el("span", "sr-only", " (" + t("site.outside") + ")");
    var w = document.createDocumentFragment(); w.appendChild(a); a.appendChild(mark); a.appendChild(sr);
    return w;
  }
  function inline(parent, text) {
    var parts = String(text).split(/(\*\*[^*\n]{1,300}\*\*)/);
    parts.forEach(function (p) {
      if (!p) return;
      var bold = /^\*\*([\s\S]+)\*\*$/.exec(p);
      var host = parent;
      if (bold) { host = el("b"); parent.appendChild(host); p = bold[1]; }
      var last = 0; URL_RE.lastIndex = 0;
      var m;
      while ((m = URL_RE.exec(p))) {
        if (m.index > last) host.appendChild(document.createTextNode(p.slice(last, m.index)));
        var md = m[2] !== undefined, href = md ? m[2] : m[3], label = md ? (m[1] || m[2]) : m[3];
        var trail = "";
        if (!md) { var tm = /[.,;:!?]+$/.exec(href); if (tm) { trail = tm[0]; href = href.slice(0, -trail.length); label = href; } }
        var ok = safeHref(href);
        if (ok) host.appendChild(linkEl(ok, label)); else host.appendChild(document.createTextNode(md ? label : href));
        if (trail) host.appendChild(document.createTextNode(trail));
        last = m.index + m[0].length;
      }
      if (last < p.length) host.appendChild(document.createTextNode(p.slice(last)));
    });
  }
  function rich(text, cls) {
    var box = el("div", cls || "");
    String(text || "").replace(/\r/g, "").split(/\n{2,}/).forEach(function (para) {
      para = para.trim(); if (!para) return;
      var p = el("p");
      para.split("\n").forEach(function (line, i) { if (i) p.appendChild(el("br")); inline(p, line); });
      box.appendChild(p);
    });
    return box;
  }

  /* ---------------- motion helpers ---------------- */
  function countUp(node, to, from, render) {
    render = render || function (v) { return fmt(v); };
    if (reduced() || !num(to)) { node.textContent = render(to); return; }
    from = num(from) ? from : 0;
    var t0 = 0, dur = 600;
    function ease(x) { return 1 - Math.pow(1 - x, 3); }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      node.textContent = render(Math.round(from + (to - from) * ease(p)));
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  function enter(node, delay) {
    if (!node) return node;
    node.classList.remove("st-enter");
    void node.offsetWidth;
    if (delay && !reduced()) node.style.animationDelay = delay + "ms";
    node.classList.add("st-enter");
    return node;
  }

  /* ---------------- the toast and the sheets ---------------- */
  var toastT = 0;
  function toast(text) {
    var old = document.querySelector(".st-toast"); if (old) old.remove();
    var n = attr(el("div", "st-toast", text), { role: "status" });
    document.body.appendChild(n);
    window.clearTimeout(toastT);
    toastT = window.setTimeout(function () { n.remove(); }, 2600);
  }
  function copyText(text) {
    if (window.navigator.clipboard && window.isSecureContext) {
      return window.navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacy(); });
    }
    return Promise.resolve(legacy());
    function legacy() {
      var a = el("textarea"); a.value = text; a.setAttribute("readonly", ""); a.className = "sr-only";
      document.body.appendChild(a); a.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      a.remove(); return ok;
    }
  }
  /* a sheet: a dialog that rises from the bottom (a phone) or pops in the middle (a computer); a tap beside it closes it */
  function sheet(title, build, opts) {
    opts = opts || {};
    var d = el("dialog", "st-dlg" + (opts.cls ? " " + opts.cls : ""));
    var s = el("div", "sheet");
    var id = "dlg-" + rid(6);
    if (title) { var h = attr(el("h2", null, title), { id: id, tabindex: "-1" }); s.appendChild(h); d.setAttribute("aria-labelledby", id); }
    if (!opts.stay) s.appendChild(attr(btn("chip round close", "×", function () { close(); }), { "aria-label": t("site.close") }));
    d.appendChild(s);
    function close() { if (d.open) d.close(); }
    d.addEventListener("close", function () { window.setTimeout(function () { d.remove(); }, 0); if (opts.onClose) opts.onClose(); });
    d.addEventListener("cancel", function (e) { if (opts.stay) e.preventDefault(); });
    if (!opts.stay) d.addEventListener("click", function (e) { if (e.target === d) close(); });
    build(s, close);
    document.body.appendChild(d);
    try { d.showModal(); } catch (e) { d.setAttribute("open", ""); }
    var f = d.querySelector("h2"); if (f) f.focus();
    return { el: d, close: close };
  }

  /* ---------------- the bar at the top ---------------- */
  function bar(o) {
    o = o || {};
    var h = el("header", "bar st-bar");
    var w = attr(el("a", "wordmark", "Logicers"), { href: o.home || "/" });
    if (o.studio) w.appendChild(el("small", null, "Studio"));
    h.appendChild(w);
    var tools = el("div", "bar-tools");
    if (o.streak != null && o.streak > 0) tools.appendChild(el("span", "chip st-streakchip", t("play.streak", { n: o.streak })));
    if (o.make) tools.appendChild(attr(el("a", "chip st-make", t(mine().maker ? "dir.mine" : "dir.make")), { href: "/new/" }));   // 9 Nov 2026: a maker finds their games here
    if (o.langs) tools.appendChild(langPicker());
    if (o.help) tools.appendChild(attr(btn("chip round st-help", "?", function () { howSheet(o.help); }), { "aria-label": t("how.h"), "aria-haspopup": "dialog" }));
    h.appendChild(tools);
    return h;
  }
  function langPicker() {
    var wrap = el("div", "st-langs");
    var b = attr(btn("chip", uiLang.toUpperCase()), { "aria-haspopup": "true", "aria-expanded": "false", "aria-label": t("site.lang") });
    var menu = el("div", "st-langmenu"); menu.hidden = true;
    LANGS.forEach(function (l) {
      var x = attr(btn(null, LANG_NAMES[l], function () {
        try { window.localStorage.setItem(KEY_LANG, l); } catch (e) { /* fine */ }
        uiLang = l; useLang(l); route();
      }), { lang: l, "aria-current": l === uiLang ? "true" : "false" });
      menu.appendChild(x);
    });
    b.addEventListener("click", function () { menu.hidden = !menu.hidden; b.setAttribute("aria-expanded", String(!menu.hidden)); });
    document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) { menu.hidden = true; b.setAttribute("aria-expanded", "false"); } });
    wrap.appendChild(b); wrap.appendChild(menu);
    return wrap;
  }

  /* a chip with a small icon: a button, or a link when href is given (F, 8 Nov 2026) */
  var CHIP_ICON = {
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7 3.5 12l5 5"/><path d="M15.5 7l5 5-5 5"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><path d="M12 7.6v.1"/></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.5h12M8 12h12M8 17.5h12"/><path d="M4 6.5h.1M4 12h.1M4 17.5h.1"/></svg>'
  };
  function iconChip(icon, label, onClick, href) {
    var c = href ? attr(el("a", "chip st-ichip"), { href: href }) : btn("chip st-ichip", "", onClick);
    var s = el("span", "ic"); s.innerHTML = CHIP_ICON[icon]; c.appendChild(s);
    c.appendChild(el("span", null, label));
    return c;
  }

  /* ---------------- the notice line ---------------- */
  function notice(meta) {
    var p = el("p", "st-notice");
    p.appendChild(el("b", null, t("notice.made", { maker: meta.maker_name || meta.maker })));
    p.appendChild(document.createTextNode(" " + t("notice.host") + " "));
    p.appendChild(btn(null, t("notice.report"), function () { report(meta); }));
    return p;
  }
  function head(meta, extra) {
    var h = el("div", "st-head");
    h.appendChild(el("p", "st-gname", meta.title));
    var by = el("p", "st-by");
    var a = attr(el("a", null, t("play.by", { maker: meta.maker_name || meta.maker })), { href: "/" + meta.maker + "/" });
    if (document.body.classList.contains("st-embed")) a.target = "_blank";
    by.appendChild(a);
    if (extra) by.appendChild(el("span", "st-day", extra));
    h.appendChild(by);
    return h;
  }

  /* ---------------- the pages ---------------- */
  var app = $("app");
  function page(cls) {
    app.textContent = ""; document.body.classList.remove("has-dock");
    document.body.dataset.w = cls === "st-wide" ? "wide" : "col";        // the bar lines up with the page's own column (F)
    var m = el("main", "st-main" + (cls ? " " + cls : "")); return m;
  }
  function mount(nodes) { app.textContent = ""; nodes.forEach(function (n) { if (n) app.appendChild(n); }); }
  function waitView() { var w = el("p", "st-wait"); w.appendChild(attr(el("span", "st-spin"), { "aria-hidden": "true" })); w.appendChild(el("span", null, t("site.loading"))); return w; }
  function errorView(key, again) {
    var box = el("div", "st-card-box st-enter");
    box.appendChild(el("p", "st-h2", t(key)));
    if (again) box.appendChild(btn("btn ghost st-gap", t("site.retry"), again));
    return box;
  }
  function plainPage(titleKey, withLink) {
    document.body.dataset.t = "studio";
    var m = page();
    m.appendChild(el("h1", "st-h1", t(titleKey)));
    if (withLink) m.appendChild(attr(el("a", "btn solid st-gap", t("site.all_games")), { href: "/" }));
    mount([bar({ studio: true }), m]);
    setTitle(t(titleKey));
  }
  function setTitle(s) { document.title = s ? s + " | Logicers" : "Logicers Studio"; }

  /* the directory: every game a maker chose to list and Logicers listed */
  function directory() {
    useLang(uiLang);
    document.body.dataset.t = "studio";
    setTitle("");
    var m = page("st-wide");
    m.appendChild(el("h1", "st-h1", t("dir.h1")));
    m.appendChild(el("p", "st-dirnote", t("dir.notice")));
    var tools = el("div", "st-tools");
    tools.appendChild(codeBox());
    m.appendChild(tools);
    var list = el("div"); list.appendChild(waitView());
    m.appendChild(list);
    mount([bar({ studio: true, make: true, langs: true, home: MAIN + "/" }), m]);
    function load() {
      list.textContent = ""; list.appendChild(waitView());
      API.list(today()).then(function (r) {
        list.textContent = "";
        if (!r.ok) { list.appendChild(errorView(API.errKey(r), load)); return; }
        var games = (Array.isArray(r.b.games) ? r.b.games : Array.isArray(r.b.items) ? r.b.items : Array.isArray(r.b.list) ? r.b.list : []).map(function (g) { return API.meta(g); });
        if (!games.length) { list.appendChild(el("p", "st-empty", t("dir.empty"))); return; }
        list.appendChild(cards(games, true));
      });
    }
    load();
  }
  function codeBox() {
    var f = el("form", "st-codebox");
    var i = attr(el("input"), { type: "text", maxlength: "8", autocomplete: "off", autocapitalize: "characters", spellcheck: "false", placeholder: t("dir.code_ph"), "aria-label": t("dir.code_ph") });
    var go = el("button", null, t("dir.code_go")); go.type = "submit";
    var msg = attr(el("span", "st-codemsg"), { role: "status" });
    f.appendChild(i); f.appendChild(go);
    var wrap = el("div", "st-row"); wrap.appendChild(f); wrap.appendChild(msg);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var c = i.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (c.length < 4) { msg.textContent = t("dir.code_bad"); return; }
      msg.textContent = "";
      API.code(c).then(function (r) {
        if (!r.ok) { msg.textContent = r.status === 0 ? t("site.err_net") : t("dir.code_bad"); return; }
        var b = r.b || {}, g = obj(b.game) ? b.game : b;
        var id = /^([a-z0-9-]+)\/([a-z0-9-]+)$/.exec(String(g.id || b.id || (typeof b.game === "string" && b.game.indexOf("/") > 0 ? b.game : "")));
        var mk = id ? id[1] : String((obj(g.maker) ? g.maker.slug : g.maker) || ""), gs = id ? id[2] : String(g.slug || (typeof b.game === "string" ? b.game : ""));
        window.location.href = SLUG.test(mk) && SLUG.test(gs) ? "/" + mk + "/" + gs + "/" : "/c/" + c;
      });
    });
    return wrap;
  }
  var ART = {
    number: '<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="6" y="30" width="52" height="8" rx="4" fill="currentColor" opacity=".25"/><rect x="6" y="30" width="30" height="8" rx="4" fill="currentColor"/><circle cx="36" cy="34" r="7" fill="#fff" stroke="currentColor" stroke-width="3"/><text x="32" y="22" text-anchor="middle" font-size="18" font-weight="800" fill="currentColor" font-family="sans-serif">42</text></svg>',
    line: '<svg viewBox="0 0 64 50" aria-hidden="true"><path d="M6 32h52" stroke="currentColor" stroke-width="3" opacity=".4"/><path d="M6 26v12M58 26v12M19 29v6M32 29v6M45 29v6" stroke="currentColor" stroke-width="2.5" opacity=".4"/><path d="M38 10a7 7 0 0 1 7 7c0 6-7 13-7 13s-7-7-7-13a7 7 0 0 1 7-7z" fill="currentColor"/><circle cx="38" cy="17" r="2.6" fill="#fff"/></svg>',
    pick: '<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="8" y="6" width="48" height="10" rx="5" fill="currentColor" opacity=".25"/><rect x="8" y="20" width="48" height="10" rx="5" fill="currentColor"/><rect x="8" y="34" width="48" height="10" rx="5" fill="currentColor" opacity=".25"/><circle cx="14" cy="25" r="3" fill="#fff"/></svg>',
    rank: '<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="16" y="6" width="40" height="10" rx="5" fill="currentColor"/><rect x="16" y="20" width="32" height="10" rx="5" fill="currentColor" opacity=".6"/><rect x="16" y="34" width="22" height="10" rx="5" fill="currentColor" opacity=".3"/><text x="8" y="15" font-size="10" font-weight="800" fill="currentColor" font-family="sans-serif">1</text><text x="8" y="29" font-size="10" font-weight="800" fill="currentColor" font-family="sans-serif">2</text><text x="8" y="43" font-size="10" font-weight="800" fill="currentColor" font-family="sans-serif">3</text></svg>',
    picture: '<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="8" y="6" width="48" height="38" rx="7" fill="currentColor" opacity=".25"/><path d="M12 40l13-15 9 10 6-6 12 11z" fill="currentColor"/><circle cx="44" cy="17" r="5" fill="currentColor"/></svg>',
    read: '<svg viewBox="0 0 64 50" aria-hidden="true"><rect x="10" y="6" width="44" height="38" rx="6" fill="currentColor" opacity=".2"/><path d="M17 15h30M17 22h30M17 29h22" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="45" cy="36" r="6" fill="currentColor"/></svg>'
  };
  function artFor(tpl) { var s = el("span"); s.innerHTML = ART[tpl] || ART.pick; return s.firstChild; }
  function cards(games, withMaker) {
    var ul = el("ul", "st-cards");
    games.forEach(function (g, i) {
      var li = el("li");
      var a = attr(el("a", "st-card st-enter"), { href: "/" + g.maker + "/" + g.slug + "/", "data-t": TPL[g.template] ? g.template : "pick" });
      if (!reduced()) a.style.animationDelay = Math.min(i, 8) * 60 + "ms";
      /* F, 8 Nov 2026: the game's own cover when it has one; else the template's drawing on a tint turned a little by the title,
         so no two cards of one template look the same. No caps label. */
      var art = el("div", "st-card-art" + (g.cover ? " has-cover" : ""));
      art.style.color = "var(--c)";
      var hsh = 0; for (var k = 0; k < g.title.length; k++) hsh = (hsh * 31 + g.title.charCodeAt(k)) | 0;
      art.style.setProperty("--turn", ((Math.abs(hsh) % 7) - 3) * 9 + "deg");
      art.style.setProperty("--slide", (Math.abs(hsh >> 3) % 5) * 12 + "%");
      if (g.cover) { var ci = attr(el("img"), { src: g.cover, alt: "", loading: "lazy", decoding: "async" }); ci.addEventListener("error", function () { ci.remove(); art.classList.remove("has-cover"); }); art.appendChild(ci); }
      art.appendChild(artFor(g.template));
      a.appendChild(art);
      var body = el("div", "st-card-body");
      body.appendChild(el("h3", null, g.title));
      if (withMaker) body.appendChild(el("p", "st-by", t("play.by", { maker: g.maker_name || g.maker })));
      a.appendChild(body);
      var foot = el("div", "st-card-foot");
      foot.appendChild(el("span", null, t("card.played", { n: fmt(g.plays) })));
      var st = cardState(g); if (st) foot.appendChild(st);
      a.appendChild(foot);
      li.appendChild(a); ul.appendChild(li);
    });
    return ul;
  }
  function cardState(g) {
    if (g.mode === "open") {
      var done = Object.keys(store().r[g.key] || {}).length;
      if (g.count) return el("span", "st-state" + (done >= g.count ? " done" : ""), done ? t("play.of", { k: fmt(done), n: fmt(g.count) }) : t("card.open", { n: fmt(g.count) }));
      return null;
    }
    if (result(g.key, today())) return el("span", "st-state done", "✓ " + t("card.done"));
    if (g.today === false) return el("span", "st-state quiet", t("card.out"));
    if (g.today === true) return el("span", "st-state dot", t("card.today"));
    return null;                                   // not known (a maker page): say nothing rather than guess (F)
  }

  /* the maker's page: their listed games, and their saved quizzes when they added them */
  function makerPage(slug) {
    useLang(uiLang);
    document.body.dataset.t = "studio";
    var m = page("st-wide");
    m.appendChild(waitView());
    mount([bar({ studio: true, make: true, langs: true }), m]);
    API.maker(slug, today()).then(function (r) {
      m.textContent = "";
      if (!r.ok) { if (r.status === 404) return plainPage("site.none_h", true); m.appendChild(errorView(API.errKey(r), function () { makerPage(slug); })); return; }
      var mk = obj(r.b.maker) || {};
      var name = String(mk.name || slug);
      setTitle(name);
      m.appendChild(el("h1", "st-h1", name));
      var games = (Array.isArray(r.b.games) ? r.b.games : []).map(function (g) { return API.meta(g, slug); });
      games.forEach(function (g) { if (!g.maker_name) g.maker_name = name; });
      if (games.length) m.appendChild(cards(games, false));
      else m.appendChild(el("p", "st-empty", t("dir.empty")));
      var kits = (Array.isArray(r.b.kits) ? r.b.kits : []).map(function (k) { return typeof k === "string" ? { code: k } : k; })
        .filter(function (k) { return obj(k) && /^[A-Z]{7}$/.test(String(k.code)); });
      if (kits.length) {
        var ul = el("ul", "st-kits");
        kits.forEach(function (k) {
          var a = attr(el("a"), { href: MAIN + "/live/#" + k.code });
          a.appendChild(el("small", null, t("card.quiz")));
          a.appendChild(el("span", null, String(k.title || k.code)));
          var li = el("li"); li.appendChild(a); ul.appendChild(li);
        });
        m.appendChild(ul);
      }
      var p = el("p", "st-notice");
      p.appendChild(el("b", null, t("notice.made", { maker: name })));
      p.appendChild(document.createTextNode(" " + t("notice.host_all")));
      m.appendChild(p);
    });
  }

  /* ---------------- a game: load it, then the right screen ---------------- */
  var SLUG = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/;
  function gamePage(mk, g, view) {
    var embed = view === "embed";
    if (embed) document.body.classList.add("st-embed");
    var m = page();
    m.appendChild(waitView());
    mount(embed ? [m] : [bar({ studio: true }), m]);
    if (embed) heightPoster(mk + "/" + g);
    var day = today();
    API.game(mk, g, day).then(function (r) {
      if (!r.ok) {
        if (r.status === 404 || r.status === 410 || /gone|hidden|not_found|deleted|blocked/.test(String(r.b.e || r.b.error || ""))) return gone(embed);
        m.textContent = ""; m.appendChild(errorView(API.errKey(r), function () { gamePage(mk, g, view); }));
        return;
      }
      var meta = API.meta(r.b.game || r.b, mk);
      if (!meta.slug) meta.slug = g;
      if (!meta.maker) meta.maker = mk;
      meta.key = meta.id || meta.maker + "/" + meta.slug;
      if (meta.hidden) return gone(embed);
      useLang(meta.lang);
      document.body.dataset.t = TPL[meta.template] ? meta.template : "pick";
      setTitle(t("play.title_by", { title: meta.title, maker: meta.maker_name || meta.maker }));
      /* A's states: today | soon (not started) | out (no question left) | open */
      var st = String(r.b.state || "");
      var data = {
        meta: meta,
        state: st === "soon" ? "before" : st,
        day: num(r.b.number) ? r.b.number : num(r.b.day) ? r.b.day : null,
        item: r.b.item ? API.item(r.b.item, 0) : null,
        items: (Array.isArray(r.b.items) ? r.b.items : []).map(API.item)
      };
      if (meta.mode === "daily" && data.day == null && meta.start_day) data.day = dayIndex(day) - dayIndex(meta.start_day) + 1;
      if (meta.count == null && meta.mode === "open") meta.count = data.items.length;
      if (view === "about") return aboutPage(data);
      gameScreen(data, embed);
    });
  }
  function gone(embed) {
    document.body.dataset.t = "studio";
    useLang(uiLang);
    var m = page();
    m.appendChild(el("h1", "st-h1", t("site.gone_h")));
    if (!embed) m.appendChild(attr(el("a", "btn solid st-gap", t("site.all_games")), { href: "/" }));
    else m.appendChild(attr(el("a", "st-powered", t("notice.powered")), { href: SITE + "/", target: "_blank", rel: "noopener" }));
    mount(embed ? [m] : [bar({ studio: true }), m]);
    setTitle(t("site.gone_h"));
  }
  function gameURL(meta, tail) { return SITE + "/" + meta.maker + "/" + meta.slug + "/" + (tail || ""); }

  function gameScreen(data, embed) {
    var meta = data.meta;
    var streak = meta.mode === "daily" ? streakOf(meta.key) : 0;
    var m = page();
    var parts = embed ? [m] : [bar({ studio: true, streak: streak, help: meta }), m];
    mount(parts);
    if (meta.keep_answers && !store().pid[meta.key]) return keepFirst(m, data, embed);
    if (meta.mode === "open") return openList(m, data, embed, null);
    /* daily */
    var dayLine = data.day != null && data.day >= 1 ? t("play.day", { n: fmt(data.day) }) : "";
    m.appendChild(head(meta, dayLine));
    if (data.state === "before" || (data.day != null && data.day < 1)) {
      m.appendChild(el("p", "st-out st-enter", t("play.before", { date: dayLong(meta.start_day) })));
    } else if (!data.item || data.state === "out") {
      m.appendChild(el("p", "st-out st-enter", t("play.out", { maker: meta.maker_name || meta.maker })));
    } else {
      playItem(m, data, data.item, { slot: today(), daily: true, embed: embed });
    }
    finishPage(m, meta, embed);
  }
  function finishPage(m, meta, embed) {
    m.appendChild(notice(meta));
    if (embed) m.appendChild(attr(el("a", "st-powered", t("notice.powered")), { href: gameURL(meta), target: "_blank", rel: "noopener" }));
  }

  /* "keep answers" on: the first screen says where the answers go, and the player may give a name or skip */
  function keepFirst(m, data, embed) {
    var meta = data.meta;
    m.appendChild(head(meta));
    var box = el("div", "st-keep st-enter");
    var h = attr(el("h1", null, t("keep.h", { maker: meta.maker_name || meta.maker })), { tabindex: "-1" });
    box.appendChild(h);
    var lab = attr(el("label", "st-lab", t("keep.name")), { for: "keep-name" });
    var inp = attr(el("input", "st-in"), { id: "keep-name", type: "text", maxlength: "40", autocomplete: "name", dir: "auto" });
    box.appendChild(lab); box.appendChild(inp);
    var acts = el("div", "actions");
    function go(withName) {
      var s = store();
      s.pid[meta.key] = rid(16);
      var nm = withName ? inp.value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 40) : "";
      if (nm) s.name[meta.key] = nm;
      storeSet(s);
      gameScreen(data, embed);
    }
    acts.appendChild(btn("btn solid", t("keep.go"), function () { go(true); }));
    acts.appendChild(btn("btn ghost", t("keep.skip"), function () { go(false); }));
    box.appendChild(acts);
    m.appendChild(box);
    finishPage(m, meta, embed);
  }

  /* open mode: every question at once, any order */
  function openList(m, data, embed, focusN) {
    var meta = data.meta, items = data.items;
    m.textContent = "";
    var r = store().r[meta.key] || {};
    var done = items.filter(function (it) { return r[slotOf(it)]; }).length;
    m.appendChild(head(meta, t("play.of", { k: fmt(done), n: fmt(items.length) })));
    var bar1 = el("div", "st-progress"); var fill = el("i"); bar1.appendChild(fill);
    fill.style.transform = "scaleX(" + (items.length ? done / items.length : 0) + ")";
    m.appendChild(bar1);
    if (!items.length) m.appendChild(el("p", "st-out", t("play.out", { maker: meta.maker_name || meta.maker })));
    else if (done >= items.length) m.appendChild(el("p", "st-tomorrow st-pop", t("play.all_done")));
    var ul = el("ul", "st-items");
    items.forEach(function (it, i) {
      var li = el("li");
      var b = btn(r[slotOf(it)] ? "done" : "", fmt(i + 1), function () { openOne(m, data, embed, i); });
      b.setAttribute("aria-label", t("play.pos", { k: i + 1, n: items.length }));
      li.appendChild(b); ul.appendChild(li);
    });
    m.appendChild(ul);
    finishPage(m, meta, embed);
    if (focusN != null) { var f = ul.querySelectorAll("button")[focusN]; if (f) f.focus(); }
  }
  function slotOf(it) { return "i:" + (it.id || it.n); }
  function openOne(m, data, embed, i) {
    var meta = data.meta, it = data.items[i];
    m.textContent = "";
    m.appendChild(head(meta, t("play.pos", { k: fmt(i + 1), n: fmt(data.items.length) })));
    playItem(m, data, it, {
      slot: slotOf(it), daily: false, embed: embed,
      next: i + 1 < data.items.length ? function () { openOne(m, data, embed, i + 1); window.scrollTo(0, 0); } : null,
      list: function () { openList(m, data, embed, i); window.scrollTo(0, 0); }
    });
    finishPage(m, meta, embed);
    window.scrollTo(0, 0);
    var q = m.querySelector(".st-q"); if (q) { q.tabIndex = -1; q.focus({ preventScroll: true }); }   /* focus follows the screen */
  }

  var SITTING = {};                                            // games answered on this page since it opened
  /* ---------------- one question: play it, answer, reveal ---------------- */
  function playItem(m, data, it, o) {
    var meta = data.meta, T = TPL[meta.template] || TPL.pick;
    var wrap = el("div", "st-play st-enter");
    m.appendChild(wrap);
    var ctx = { t: t, el: el, btn: btn, attr: attr, fmt: fmt, lang: lang, reduced: reduced, rich: rich, countUp: countUp, hist: hist, meta: meta };
    if (it.image && meta.template !== "picture") wrap.appendChild(image(it.image, false));
    var stageBox = el("div");
    wrap.appendChild(stageBox);
    var acts = el("div", "actions reserve");
    var lock = btn("btn solid", t("play.lock"));
    lock.disabled = true;
    acts.appendChild(lock);
    var past = result(meta.key, o.slot);
    if (past && o.daily && (past.id != null && it.id != null ? past.id !== it.id : past.n != null && it.n != null && past.n !== it.n)) past = null;   // the maker moved the questions: a new one
    ctx.ready = function (yes) { lock.disabled = !yes; };
    var handle = T.play(stageBox, it, ctx);
    wrap.appendChild(acts);
    var after = el("section", "st-after"); after.hidden = true;
    wrap.appendChild(after);
    lock.addEventListener("click", function () {
      var a = handle.value();
      if (a == null) return;
      lock.disabled = true;
      answer(a);
    });
    if (past) { acts.hidden = true; reveal(past.a, past.c || null, false); }

    function answer(a) {
      var k = T.tier(it, a);
      var res = { a: a, k: k, n: it.n, id: it.id, c: null, t: Date.now() };
      saveResult(meta.key, o.slot, res);
      playNote(meta, o.slot, k, data.items.length || null);
      acts.hidden = true;
      reveal(a, null, true);
      var game = meta.key, iid = it.id != null ? it.id : it.n;
      var first = !SITTING[game]; SITTING[game] = 1;           // one sitting = one play on the counter (F, 8 Nov 2026)
      API.play(game, iid, T.wire ? T.wire(it, a) : a, first).then(function (r) {
        if (!r.ok) return;
        var c = API.counts(r.b);
        res.c = c; saveResult(meta.key, o.slot, res);
        showCounts(c, a);
        if (!first) return;
        var was = meta.plays;
        meta.plays = num(r.b.plays) ? r.b.plays : was + 1;
        if (playedNode) countUp(playedNode.querySelector("b"), meta.plays, was);
      });
      if (meta.keep_answers) {
        var s = store();
        if (s.pid[meta.key]) API.keep(game, iid, s.pid[meta.key], s.name[meta.key] || "", T.wire ? T.wire(it, a) : a);
      }
    }
    var distBox = null, playedNode = null;
    function showCounts(c, a) {
      if (!c || !Object.keys(c).length) { if (distBox) distBox.hidden = true; return; }
      if (handle.counts) handle.counts(c, a);
      if (distBox && T.dist) {
        var d = T.dist(it, c, a, ctx);
        distBox.textContent = "";
        if (d) { distBox.appendChild(d); distBox.hidden = false; } else distBox.hidden = true;
      }
    }
    function reveal(a, c, fresh) {
      handle.reveal(a, fresh);
      var v = T.verdict(it, a, ctx);
      var ver = el("div", "verdict st-verdict");
      var h1 = el("p", "turnsout", v.head);
      ver.appendChild(h1);
      if (v.line) ver.appendChild(el("p", "offby", v.line));
      (handle.verdictHost || stageBox).appendChild(ver);
      if (fresh) { h1.classList.add("st-pop"); }
      after.textContent = "";
      after.hidden = false;
      if (it.explain) after.appendChild(rich(it.explain, "sentence"));
      if (T.dist) { distBox = el("div", "st-dist"); distBox.hidden = true; after.appendChild(distBox); }
      /* F, 8 Nov 2026: one calm line (how close you were, your streak, the plays), not three pills */
      var fin = el("div", "st-fin");
      var dots = el("span", "st-pill st-res");
      var tier = T.tier(it, a);
      dots.setAttribute("aria-label", tier + "/3");
      var dd = el("span", "st-dots"); for (var i = 0; i < 3; i++) dd.appendChild(el("i", i < tier ? "on" : ""));
      dots.appendChild(dd); fin.appendChild(dots);
      if (o.daily) {
        var sk = streakOf(meta.key);
        if (sk > 0) { var sp = el("span", "st-pill st-flame"); sp.appendChild(el("b", null, t("play.streak", { n: fmt(sk) }))); fin.appendChild(sp); }
      }
      playedNode = el("span", "st-pill");
      var pb = el("b", null, fmt(meta.plays)); playedNode.appendChild(pb);
      var words = t("play.played", { n: "\u0000" }).split("\u0000");
      if (words[0]) playedNode.insertBefore(document.createTextNode(words[0]), pb);
      if (words[1]) playedNode.appendChild(document.createTextNode(words[1]));
      fin.appendChild(playedNode);
      after.appendChild(fin);
      var row = el("div", "actions");
      row.appendChild(btn("btn solid", t("play.share"), function () { share(meta, it, a, data.day, o.daily); }));
      if (o.next) row.appendChild(btn("btn ghost", t("play.next"), o.next));
      after.appendChild(row);
      /* the quieter ways on, as chips with an icon; Report lives in the notice line only, Embed never inside an embed */
      var ln = el("div", "st-links");
      if (o.list) ln.appendChild(iconChip("list", t("play.list"), o.list));
      if (!o.embed && !document.body.classList.contains("st-embed")) ln.appendChild(iconChip("code", t("play.embed"), function () { embedSheet(meta); }));
      if (meta.about) {                                       // 9 Nov 2026: only when the maker wrote one (it was an empty page)
        var ab = iconChip("info", t("play.about"), null, gameURL(meta, "about/"));
        if (o.embed || document.body.classList.contains("st-embed")) ab.target = "_blank";
        ln.appendChild(ab);
      }
      after.appendChild(ln);
      if (o.daily) after.appendChild(el("p", "st-tomorrow", t("play.tomorrow")));
      if (fresh) enter(after, reduced() ? 0 : 220);
      if (c) showCounts(c, a);
    }
  }
  function image(img, big) {
    var f = el("figure", "st-img" + (big ? " big" : ""));
    var i = attr(el("img"), { src: img.url, alt: "", loading: "lazy", decoding: "async" });
    i.addEventListener("error", function () { f.hidden = true; });
    f.appendChild(i);
    return f;
  }
  /* how everyone answered a number or a line: ten bars from one end to the other, the right one and yours marked */
  function hist(o) {
    var lo = o.min, hi = o.max, bins = 10, n = new Array(bins).fill(0), total = 0;
    var span = hi - lo || 1;
    function bin(v) { return Math.max(0, Math.min(bins - 1, Math.floor((v - lo) / span * bins))); }
    Object.keys(o.counts).forEach(function (k) {
      /* a bucket is the value itself, or "p" and a percent of the way along (A: when the range is over 100) */
      var p = /^p(\d+(?:\.\d+)?)$/.exec(k);
      var v = p ? lo + parseFloat(p[1]) / 100 * span : parseFloat(k), c = o.counts[k];
      if (!isFinite(v) || !num(c)) return;
      n[bin(v)] += c; total += c;
    });
    if (!total) return null;
    var box = el("div");
    var h = el("div", "st-dist-h");
    h.appendChild(el("span", null, t("play.answered", { n: fmt(total) })));
    box.appendChild(h);
    var row = attr(el("div", "st-hist"), { "aria-hidden": "true" });
    var max = Math.max.apply(null, n), right = bin(o.right), you = bin(o.you);
    n.forEach(function (c, i) {
      var b = el("i", (i === right ? "right" : "") + (i === you ? " you" : ""));
      row.appendChild(b);
      var s = max ? Math.max(c ? 0.06 : 0.02, c / max) : 0.02;
      if (reduced()) b.style.transform = "scaleY(" + s + ")";
      else window.setTimeout(function () { b.style.transform = "scaleY(" + s + ")"; }, 60 + i * 50);
    });
    box.appendChild(row);
    var ends = el("div", "st-hist-ends");
    ends.appendChild(el("span", null, o.fmt(lo))); ends.appendChild(el("span", null, o.fmt(hi)));
    box.appendChild(ends);
    var key = el("div", "st-key");
    var k1 = el("span"); k1.appendChild(el("i", "k-right")); k1.appendChild(document.createTextNode(o.rightLabel)); key.appendChild(k1);
    var k2 = el("span"); k2.appendChild(el("i", "k-you")); k2.appendChild(document.createTextNode(t("play.you"))); key.appendChild(k2);
    box.appendChild(key);
    return box;
  }

  /* ---------------- share: a picture and a line, "History a day, by Anna Rossi" ---------------- */
  var LIGHT = { number: "#3460A8", line: "#8A5A2B", pick: "#B23A48", rank: "#2E7550", picture: "#8B3F8F", read: "#4A4FAF" };
  function shareText(meta, it, a, day, daily) {
    var T = TPL[meta.template] || TPL.pick, k = T.tier(it, a), dots = "";
    for (var i = 0; i < 3; i++) dots += i < k ? "●" : "○";
    var top = t("play.title_by", { title: meta.title, maker: meta.maker_name || meta.maker }) + (daily && day ? " · " + t("play.day", { n: day }) : "");
    return top + "\n" + dots + " " + T.verdict(it, a, { t: t, fmt: fmt }).head + "\n" + gameURL(meta);
  }
  function wrapLines(c, text, max, most) {
    var words = String(text).split(/\s+/), lines = [], cur = "";
    words.forEach(function (w) {
      var tt = cur ? cur + " " + w : w;
      if (cur && c.measureText(tt).width > max) { lines.push(cur); cur = w; } else cur = tt;
    });
    if (cur) lines.push(cur);
    if (lines.length > most) { lines = lines.slice(0, most); lines[most - 1] = lines[most - 1].replace(/\s*\S*$/, "") + "…"; }
    return lines;
  }
  function picture(meta, it, a, day, daily) {
    var W = 1080, H = 1350, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var c = cv.getContext("2d");
    if (!c) return Promise.resolve(null);
    var col = LIGHT[meta.template] || LIGHT.pick, T = TPL[meta.template] || TPL.pick, k = T.tier(it, a);
    var D = '"Bricolage Grotesque", "Figtree", system-ui, sans-serif', X = '"Figtree", system-ui, sans-serif';
    var ready = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load('800 60px "Bricolage Grotesque"'), document.fonts.load('700 40px "Figtree"')]).then(function () {}, function () {}) : Promise.resolve();
    return ready.then(function () {
      c.fillStyle = "#F3F4F9"; c.fillRect(0, 0, W, H);
      c.fillStyle = col; c.beginPath(); c.roundRect ? c.roundRect(60, 60, W - 120, 760, 56) : c.rect(60, 60, W - 120, 760); c.fill();
      c.fillStyle = "#fff"; c.textBaseline = "alphabetic";
      c.font = "800 96px " + D;
      var lines = wrapLines(c, meta.title, W - 240, 3);
      lines.forEach(function (ln, i) { c.fillText(ln, 120, 230 + i * 104); });
      c.font = "700 46px " + X; c.globalAlpha = .9;
      c.fillText(t("play.by", { maker: meta.maker_name || meta.maker }), 120, 230 + lines.length * 104 + 10);
      c.globalAlpha = 1;
      if (daily && day) { c.font = "700 42px " + X; c.fillText(t("play.day", { n: fmt(day) }), 120, 760); }
      for (var d = 0; d < 3; d++) {
        c.beginPath(); c.arc(W - 300 + d * 74, 744, 24, 0, Math.PI * 2);
        if (d < k) { c.fillStyle = "#fff"; c.fill(); } else { c.lineWidth = 7; c.strokeStyle = "rgba(255,255,255,.75)"; c.stroke(); }
      }
      c.fillStyle = "#15172B"; c.font = "800 84px " + D;
      c.fillText(T.verdict(it, a, { t: t, fmt: fmt }).head, 66, 960);
      c.fillStyle = "#5D6279"; c.font = "700 38px " + X;
      c.fillText(String(gameURL(meta)).replace(/^https?:\/\//, ""), 66, 1262);
      c.fillStyle = "#15172B"; c.font = "800 44px " + D; c.fillText("Logicers", 66, 1200);
      [["#2D4FC4", 936], ["#CF4327", 978], ["#0D7D73", 1020]].forEach(function (x) { c.beginPath(); c.arc(x[1], 1240, 15, 0, Math.PI * 2); c.fillStyle = x[0]; c.fill(); });
      return new Promise(function (resolve) { try { cv.toBlob(function (b) { resolve(b || null); }, "image/png"); } catch (e) { resolve(null); } });
    });
  }
  function share(meta, it, a, day, daily) {
    var text = shareText(meta, it, a, day, daily);
    var nav = window.navigator;
    function copyOnly() { copyText(text).then(function () { toast(t("share.copied")); }); }
    if (!nav.share) return copyOnly();
    picture(meta, it, a, day, daily).then(function (blob) {
      var file = null;
      try { if (blob && typeof File === "function") file = new File([blob], meta.slug + ".png", { type: "image/png" }); } catch (e) { file = null; }
      var o = file && nav.canShare && nav.canShare({ files: [file] }) ? { files: [file], text: text } : { text: text };
      return nav.share(o).then(function () {}, function (e) { if (!e || e.name !== "AbortError") copyOnly(); });
    }, copyOnly);
  }

  /* ---------------- embed: what it is in one line, then how, in three short steps (9 Nov 2026) ---------------- */
  function embedCode(url, title) {
    var safe = String(title).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return '<iframe src="' + url + '" title="' + safe + '" width="100%" height="720" style="border:0;border-radius:24px;max-width:640px" loading="lazy" allow="clipboard-write"></iframe>';
  }
  function embedSheet(meta) {
    sheet(t("embed.h"), function (s) {
      s.classList.add("st-embedsheet");
      s.appendChild(el("p", "st-what", t("embed.what")));
      var ol = el("ol", "st-steps");
      var li1 = el("li");
      li1.appendChild(el("p", null, t("embed.s1")));
      var ta = attr(el("textarea", "st-snippet"), { readonly: "", rows: "1", wrap: "off", "aria-label": t("embed.h"), spellcheck: "false" });
      ta.value = embedCode(gameURL(meta, "embed/"), t("play.title_by", { title: meta.title, maker: meta.maker_name || meta.maker }));
      li1.appendChild(ta);
      li1.appendChild(btn("btn solid st-copycode", t("embed.copy"), function () { ta.select(); copyText(ta.value).then(function () { toast(t("site.copied")); }); }));
      ol.appendChild(li1);
      var li2 = el("li"); li2.appendChild(el("p", null, t("embed.s2"))); ol.appendChild(li2);
      var li3 = el("li");
      li3.appendChild(el("p", null, t("embed.s3")));
      li3.appendChild(btn("chip st-copylink", t("embed.copy_link"), function () { copyText(gameURL(meta)).then(function () { toast(t("site.copied")); }); }));
      ol.appendChild(li3);
      s.appendChild(ol);
    });
  }
  /* the "?" of a game: what will happen, in one short line, then the maker's own About (9 Nov 2026) */
  function howSheet(meta) {
    sheet(t("how.h"), function (s) {
      var ul = el("ul", "st-how");
      var lines = [t("how." + (TPL[meta.template] ? meta.template : "pick")), t("how.after"), t(meta.mode === "open" ? "how.open" : "how.daily")];
      if (meta.keep_answers) lines.push(t("keep.h", { maker: meta.maker_name || meta.maker }));
      lines.forEach(function (x) { ul.appendChild(el("li", null, x)); });
      s.appendChild(ul);
      if (meta.about) {
        var ab = el("div", "st-how-about");
        ab.appendChild(el("p", "st-lab", t("play.by", { maker: meta.maker_name || meta.maker })));
        ab.appendChild(rich(meta.about, "st-about"));
        s.appendChild(ab);
      }
    });
  }
  /* the link, the code and the QR code of a game: the editor's Share */
  function linkSheet(meta) {
    sheet(t("link.h"), function (s) {
      var url = gameURL(meta);
      s.appendChild(el("p", "st-lab", t("link.link")));
      var row = el("div", "st-linkrow");
      var inp = attr(el("input"), { readonly: "", value: url, "aria-label": t("link.link") });
      row.appendChild(inp);
      row.appendChild(btn("chip", t("site.copy"), function () { copyText(url).then(function () { toast(t("site.copied")); }); }));
      s.appendChild(row);
      if (meta.code) {
        s.appendChild(el("p", "st-lab", t("link.code")));
        var cb = el("div", "st-codeboxes");
        meta.code.split("").forEach(function (ch) { cb.appendChild(el("i", null, ch)); });
        s.appendChild(cb);
      }
      var qr = attr(el("div", "st-qr"), { role: "img", "aria-label": t("link.qr") });
      s.appendChild(qr);
      loadScript("/qr.js?v=4b9e678330").then(function () { qr.innerHTML = qrSvg(url); });
      var acts = el("div", "actions");
      acts.appendChild(btn("btn ghost", t("play.embed"), function () { embedSheet(meta); }));
      s.appendChild(acts);
    });
  }
  function qrSvg(text) {
    var Q = window.qrcodegen; if (!Q) return "";
    try {
      var q = Q.QrCode.encodeText(text, Q.QrCode.Ecc.MEDIUM), d = "", n = q.size;
      for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (q.getModule(x, y)) d += "M" + (x + 2) + " " + (y + 2) + "h1v1h-1z";
      return '<svg viewBox="0 0 ' + (n + 4) + " " + (n + 4) + '" aria-hidden="true"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#15172B"/></svg>';
    } catch (e) { return ""; }
  }
  var loaded = {};
  function loadScript(src) {
    if (loaded[src]) return loaded[src];
    loaded[src] = new Promise(function (resolve, reject) {
      var s = el("script"); s.src = src; s.async = true;
      s.onload = function () { resolve(); }; s.onerror = function () { delete loaded[src]; reject(); };
      document.head.appendChild(s);
    });
    return loaded[src];
  }

  /* ---------------- the report: on every maker game and its About page ---------------- */
  var WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "wrong", "other"];
  function report(meta) {
    sheet(t("rep.h"), function (s, close) {
      var lab = attr(el("p", "st-lab", t("rep.why")), { id: "rep-why-l" });
      s.appendChild(lab);
      var group = attr(el("div", "st-why"), { role: "radiogroup", "aria-labelledby": "rep-why-l" });
      var why = "";
      WHYS.forEach(function (w) {
        var b = attr(btn(null, t("rep.why_" + w), function () {
          why = w;
          Array.prototype.forEach.call(group.children, function (x) { x.setAttribute("aria-checked", String(x === b)); });
          err.textContent = "";
        }), { role: "radio", "aria-checked": "false" });
        group.appendChild(b);
      });
      s.appendChild(group);
      var tl = attr(el("label", "st-lab", t("rep.text")), { for: "rep-text" });
      var ta = attr(el("textarea", "st-in"), { id: "rep-text", maxlength: "1000", dir: "auto", rows: "3" });
      s.appendChild(tl); s.appendChild(ta);
      var tick = el("label", "st-tick");
      var cb = attr(el("input"), { type: "checkbox" });
      tick.appendChild(cb); tick.appendChild(el("span", null, t("rep.good")));
      s.appendChild(tick);
      var err = attr(el("p", "ed-err"), { role: "alert" });
      s.appendChild(err);
      var acts = el("div", "actions");
      var send = btn("btn solid", t("rep.send"), function () {
        if (!why) { err.textContent = t("rep.err_why"); return; }
        if (!cb.checked) { err.textContent = t("rep.err_good"); return; }
        send.disabled = true;
        API.report(meta.key, why, ta.value.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim().slice(0, 1000), browserId()).then(function (r) {
          send.disabled = false;
          if (!r.ok) { err.textContent = t(API.errKey(r)); return; }
          s.textContent = "";
          s.appendChild(attr(el("h2", "st-pop", t("rep.done")), { tabindex: "-1" }));
          var a2 = el("div", "actions"); a2.appendChild(btn("btn solid", t("site.close"), close)); s.appendChild(a2);
          s.querySelector("h2").focus();
        });
      });
      acts.appendChild(send);
      s.appendChild(acts);
      s.appendChild(el("p", "st-small st-danger-line", t("rep.danger")));   // F: the emergency line, last and small
    });
  }

  /* this browser's random id: three reports from three browsers hide a game until Khayyam looks (the Worker tells them apart by it) */
  function browserId() {
    var s = store();
    if (!/^[a-z2-9]{16}$/.test(String(s.browser))) { s.browser = rid(16); storeSet(s); }
    return s.browser;
  }

  /* ---------------- the About page ---------------- */
  function aboutPage(data) {
    var meta = data.meta;
    var m = page();
    mount([bar({ studio: true }), m]);
    m.appendChild(el("h1", "st-h1", meta.title));
    var by = el("p", "st-by");
    by.appendChild(attr(el("a", null, t("play.by", { maker: meta.maker_name || meta.maker })), { href: "/" + meta.maker + "/" }));
    m.appendChild(by);
    if (meta.about) m.appendChild(rich(meta.about, "st-about st-enter"));
    var acts = el("div", "actions");
    acts.appendChild(attr(el("a", "btn solid", t("play.play")), { href: gameURL(meta) }));
    acts.appendChild(btn("btn ghost", t("play.share"), function () { linkSheet(meta); }));   // F: the link, code and QR; Report stays in the notice
    m.appendChild(acts);
    m.appendChild(notice(meta));
    setTitle(t("play.title_by", { title: meta.title, maker: meta.maker_name || meta.maker }));
  }

  /* ---------------- the terms ---------------- */
  function termsPage() {
    useLang(uiLang);
    document.body.dataset.t = "studio";
    var m = page("st-terms");
    m.appendChild(el("h1", "st-h1", t("terms.title")));
    m.appendChild(el("p", "st-small st-gap", t("terms.date")));
    m.appendChild(el("p", "st-sub", t("terms.lead")));
    for (var i = 1; i <= 8; i++) {
      var s = el("section");
      s.appendChild(el("h2", null, t("terms.h" + i)));
      s.appendChild(rich(t("terms.p" + i)));
      m.appendChild(s);
    }
    mount([bar({ studio: true, langs: true }), m]);
    setTitle(t("terms.title"));
  }

  /* ---------------- the embed: its height, told to the page around it (embed.js listens) ----------------
     The same message as our daily games' ?embed=1 (chat C): { source: "logicers-embed", type: "height", height, game } */
  function heightPoster(game) {
    if (window.parent === window) return;
    var last = 0;
    function post() {
      var h = Math.ceil(document.body.getBoundingClientRect().height + 2);
      if (Math.abs(h - last) < 2) return;
      last = h;
      try { window.parent.postMessage({ source: "logicers-embed", type: "height", height: h, game: game }, "*"); } catch (e) { /* the page around is gone */ }
    }
    if (typeof ResizeObserver === "function") new ResizeObserver(post).observe(document.body);
    window.addEventListener("load", post);
    window.setInterval(post, 1500);
    post();
  }

  /* ---------------- the router ---------------- */
  function route() {
    var path = window.location.pathname;
    if (!/\/$/.test(path)) { window.history.replaceState(null, "", path + "/" + window.location.search + window.location.hash); path += "/"; }
    var p = path.split("/").filter(Boolean).map(function (s) { try { return decodeURIComponent(s).toLowerCase(); } catch (e) { return ""; } });
    document.body.classList.remove("st-embed");
    useLang(uiLang);
    if (!p.length) return directory();
    if (p.length === 1 && p[0] === "new") return editor(null);
    if (p.length === 1 && p[0] === "terms") return termsPage();
    if (!p.every(function (s, i) { return i >= 2 || SLUG.test(s); })) return plainPage("site.none_h", true);
    if (p.length === 1) return makerPage(p[0]);
    if (p.length === 2) return gamePage(p[0], p[1], "play");
    if (p.length === 3 && p[2] === "about") return gamePage(p[0], p[1], "about");
    if (p.length === 3 && p[2] === "embed") return gamePage(p[0], p[1], "embed");
    if (p.length === 3 && p[2] === "edit") return editor({ maker: p[0], slug: p[1] });
    plainPage("site.none_h", true);
  }
  function editor(which) {
    useLang(uiLang);
    document.body.dataset.t = "studio";
    mount([bar({ studio: true, langs: !which }), waitView()]);
    loadScript("/editor.js?v=4a22bd0cfc").then(function () {
      if (window.StudioEditor) window.StudioEditor(which);
    }, function () { mount([bar({ studio: true }), errorView("site.err_net", function () { editor(which); })]); });
  }

  /* what the templates and the editor share */
  window.Studio = {
    t: t, el: el, btn: btn, attr: attr, fmt: fmt, rich: rich, links: links, countUp: countUp, enter: enter, hist: hist,
    reduced: reduced, rid: rid, sheet: sheet, toast: toast, copyText: copyText, bar: bar, mount: mount, page: page,
    waitView: waitView, errorView: errorView, linkSheet: linkSheet, embedSheet: embedSheet, artFor: artFor,
    today: today, dayIndex: dayIndex, dayFrom: dayFrom, dayLong: dayLong, useLang: useLang, setTitle: setTitle,
    lang: function () { return lang; }, uiLang: function () { return uiLang; }, LANGS: LANGS, LANG_NAMES: LANG_NAMES,
    mine: mine, mineSet: mineSet, bridge: bridge, SITE: SITE, MAIN: MAIN, TERMS_VERSION: TERMS_VERSION, SLUG: SLUG,
    gameURL: gameURL, route: route
  };
  route();
})();
