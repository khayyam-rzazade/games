/* Play Logicers — the pages' script (chat B, 19 Nov 2026). The pages work without it (every link is a real link); it adds:
     - the device's id (portal.id: 16 random bytes as 22 base64url characters, made once), sent only with a count
     - the counts: a tap on a coin, on Play or on the big coin of a game page sends /api/hit by sendBeacon (the link itself
       opens the game: one tap to play, chat H, 20 Nov 2026); a page under /<lang>/ sends /api/view once; the numbers come
       live from /api/counts (on load, and again when the page is shown after a game, so a player back from it sees it
       counted). A 0 is never written: a coin with nobody today shows its kind's icon (.is-0), and the lines "{n} players
       today" and a game page's numbers stay hidden until 1.
     - Yours (portal.mine: saved games and the day each was last played, the device's own day): the Yours row from
       /api/<lang>/games?ids=, the Save buttons, the tick of a game played today
     - the language: a language's page is remembered (portal.lang); the wall puts it, or the browser's language, first
     - the sheets (add a game, report) with every error, and More on a kind's page
   Words come only from the page's own data (#pl-data), never from this file. No inline style, no HTML strings: the CSP
   forbids them, so everything is built with the DOM. */
(function () {
  "use strict";
  var doc = document;
  var D = {};
  try { D = JSON.parse(doc.getElementById("pl-data").textContent) || {}; } catch (e) { D = {}; }
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
  function localDay(t) { var d = t ? new Date(t) : new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var GAME_ID = /^[a-z0-9-]{1,40}$/;
  function readMine() {
    var m = null;
    try { m = JSON.parse(get("portal.mine") || "null"); } catch (e) { m = null; }
    var out = { v: 1, star: [], played: {} };
    if (m && typeof m === "object") {
      if (Array.isArray(m.star)) out.star = m.star.filter(function (x) { return typeof x === "string" && GAME_ID.test(x); }).slice(0, 200);
      if (m.played && typeof m.played === "object") Object.keys(m.played).forEach(function (k) { if (GAME_ID.test(k) && /^\d{4}-\d{2}-\d{2}$/.test(m.played[k])) out.played[k] = m.played[k]; });
    }
    return out;
  }
  function saveMine(m) {
    var cut = localDay(Date.now() - 8 * 864e5);
    Object.keys(m.played).forEach(function (k) { if (m.played[k] < cut) delete m.played[k]; });
    put("portal.mine", JSON.stringify(m));
  }

  /* ---- numbers and words ---- */
  var NF = null, PR = null;
  try { NF = new Intl.NumberFormat(TAG); } catch (e) { NF = null; }
  try { PR = new Intl.PluralRules(TAG); } catch (e) { PR = null; }
  function fmt(n) { return NF ? NF.format(n) : String(n); }
  function wordN(key, n) {
    var cat = PR ? PR.select(n) : "other";
    var s = cat !== "other" && W[key + "." + cat] != null ? W[key + "." + cat] : W[key];
    return s == null ? "" : String(s);
  }
  function aroundN(key, n) { var s = wordN(key, n), i = s.indexOf("{n}"); return i < 0 ? [s.trim(), ""] : [s.slice(0, i).trim(), s.slice(i + 3).trim()]; }
  function withN(key, n) { return wordN(key, n).replace("{n}", fmt(n)); }
  function numCls(s) { var n = String(s).replace(/\D/g, "").length; return n >= 7 ? "n7" : n === 6 ? "n6" : n === 5 ? "n5" : ""; }
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
  var lastCounts = 0;
  function counts() {
    if (!window.fetch) return;
    lastCounts = Date.now();
    window.fetch(IN_LANG ? "/api/counts?lang=" + encodeURIComponent(LANG) : "/api/counts", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.ok) return;
        var g = j.games || {};
        $$("[data-game]").forEach(function (el) {
          var c = g[el.getAttribute("data-game")];
          if (!c || el.tagName === "FORM") return;
          var t = Math.max(c.t, bumped[el.getAttribute("data-game")] || 0);
          $$('[data-count="today"]', el).forEach(function (x) { if (x.classList.contains("tile-n")) x.setAttribute("data-today", String(t)); setNum(x, t); });
          $$('[data-count="all"]', el).forEach(function (x) { setNum(x, c.a); });
          $$('[data-count-label="today"]', el).forEach(function (x) { setLabel(x, t); });
          var art = el.tagName === "ARTICLE" ? el : null;
          if (art) {
            $$(".num-today", art).forEach(function (b) { setWords(b, "today_n", t); b.hidden = !t; });
            $$(".num-all", art).forEach(function (b) { setWords(b, "total_n", c.a); b.hidden = !c.a; });
            $$(".game-nums", art).forEach(function (b) { b.hidden = !t && !c.a; });
          }
        });
        if (typeof j.page === "number") $$(".today").forEach(function (p) { setNum($(".today-n", p), j.page); setWords(p, "players_today", j.page); p.hidden = !j.page; });
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
  /* one tile from the template, for a game as /api/<lang>/games gives it: the coin plays (the game's own site, new tab,
     counted), the name under it opens the game's page (a Logicers game: the same link, out of the tab order) */
  var SAFE = /^https:\/\//i;
  function build(g, mine) {
    var tpl = $("#tpl-tile");
    if (!tpl || !tpl.content || !SAFE.test(g.url || "")) return null;
    var li = tpl.content.firstElementChild.cloneNode(true), a = $(".tile-a", li), nm = $(".tile-name", li);
    var cls = ["tile", /^t\d{1,2}$/.test(g.ring) ? g.ring : "t8"];
    if (g.logicers) cls.push("tile-lg");
    else { if (g.new) cls.push("tile-new"); if (g.slot === 1 && !mine) cls.push("tile-one"); if (g.sold && !mine) cls.push("tile-sold"); }
    if (mine) cls.push("tile-mine");
    li.className = cls.join(" ");
    li.setAttribute("data-game", g.id);
    li.setAttribute("data-kind", g.kind);
    a.setAttribute("href", g.url);
    if (g.logicers) {
      nm.setAttribute("href", g.url); nm.setAttribute("target", "_blank"); nm.setAttribute("rel", "noopener"); nm.setAttribute("data-hit", "");
      nm.setAttribute("tabindex", "-1"); nm.setAttribute("aria-hidden", "true");
    } else nm.setAttribute("href", "/" + LANG + "/g/" + encodeURIComponent(g.slug) + "/");
    $(".tile-badge", li).hidden = !(g.new && !g.logicers);
    $(".tile-chip", li).hidden = !g.en;
    $$(".tile-kind use, .tile-zero use", li).forEach(function (u) { u.setAttribute("href", SPRITE + "#k-" + g.kind); });
    nm.textContent = g.name;
    var vn = $(".tile-vn > span", li);
    if (vn) vn.textContent = g.name;
    if (g.en) { nm.setAttribute("lang", "en"); if (vn) vn.setAttribute("lang", "en"); }
    var n = $(".tile-n", li), t = Math.max(g.today || 0, bumped[g.id] || 0);
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
        clear(ul);
        list.forEach(function (g) { var li = build(g, true); if (li) ul.appendChild(li); });
        sec.hidden = !ul.children.length;
        paintStars(m);
        paintTicks(m);
        refocus();
      })
      .catch(function () { /* the row stays as it was */ });
  }
  function toggleStar(btn) {
    var id = btn.getAttribute("data-star");
    if (!GAME_ID.test(id || "")) return;
    var m = readMine(), i = m.star.indexOf(id);
    if (i >= 0) m.star.splice(i, 1); else m.star.unshift(id);
    saveMine(m);
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
    saveMine(m);
    if (first) {
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
  }

  /* ---- the sheets ---- */
  var opener = null;
  function errs(form) { return $$(".sheet-err", form); }
  function showErr(form, key) { errs(form).forEach(function (p) { p.hidden = p.getAttribute("data-e") !== key; }); }
  function clearMarks(form) {
    errs(form).forEach(function (p) { p.hidden = true; });
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
    opener = doc.activeElement;
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
    var first = form && ($('input[name="url"]', form) || $('input[name="reason"]', form));
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
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
        else if (e === "here") { showErr(form, "here"); urlIn.focus(); }
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

  /* ---- one listener for every tap ---- */
  doc.addEventListener("click", function (e) {
    var t = e.target;
    var star = closest(t, "[data-star]");
    if (star) { e.preventDefault(); toggleStar(star); return; }
    var hit = closest(t, "[data-hit]");
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
  });
  doc.addEventListener("change", function (e) {             // a choice made clears its own mark
    var t = e.target, f = closest(t, ".sheet-form");
    if (!f) return;
    if (t.name === "kind") { var k = $(".kinds", f); if (k) k.removeAttribute("data-invalid"); }
    if (t.name === "reason") { var r = $(".reasons", f); if (r) r.removeAttribute("data-invalid"); }
    if (t.getAttribute("aria-invalid")) t.removeAttribute("aria-invalid");
  });
  doc.addEventListener("input", function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute("aria-invalid")) t.removeAttribute("aria-invalid"); });
  $$("dialog.sheet").forEach(function (dlg) {
    dlg.addEventListener("close", function () {
      if (opener && doc.contains(opener) && opener.focus) { try { opener.focus({ preventScroll: true }); } catch (e) { opener.focus(); } }
      opener = null;
    });
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
  renderMine();
  counts();
  doc.addEventListener("visibilitychange", function () {
    if (doc.visibilityState !== "visible") return;
    var m = readMine();
    paintStars(m);
    paintTicks(m);
    if (Date.now() - lastCounts > 30000 || hitAt > lastCounts) { counts(); renderMine(); }
  });
})();
