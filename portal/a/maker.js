/* Play Logicers — the claim pages and the maker's form (chat J, 20 Nov 2026, plan 2.20). English pages, never indexed, never
   kept by the edge. portal.js runs on them too (the add sheet, the device's id); this file does the rest:
     /claim/?g=<id>    Get your line (POST /api/claim/code: a code and a secret only this device gets, kept for this tab in
                       sessionStorage "portal.claim"), then Check (POST /api/claim/check: the Worker opens the game's page and
                       looks for the line)
     /claim/<token>/   Claim it (POST /api/claim/token): the single-use link of the weekly email; nothing is used before the tap
     /maker/           the maker's form: the key on this device (localStorage "portal.maker"; or pasted), the maker's name, and
                       for each game its line, its kind (POST /api/maker, /api/maker/edit) and its logo (POST /api/maker/pic:
                       PNG, JPEG or WebP, at most 150 KB, 256 px at least; it shows once the queue said yes)
   It also keeps which maker the key opens and its games ("portal.makerof"), so portal.js shows Edit on their pages.
   A claim that gives a key shows it once and keeps it on the device. Everything is built with the DOM (createElement,
   textContent): nothing a maker types becomes markup, and the CSP forbids inline script and style. */
(function () {
  "use strict";
  var doc = document;
  var D = {};
  try { D = JSON.parse(doc.getElementById("pl-data").textContent) || {}; } catch (e) { D = {}; }
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = doc.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = String(text); return e; }
  function get(k, s) { try { return (s || window.localStorage).getItem(k); } catch (e) { return null; } }
  function put(k, v, s) { try { (s || window.localStorage).setItem(k, v); } catch (e) { /* not kept */ } }
  function drop(k, s) { try { (s || window.localStorage).removeItem(k); } catch (e) { /* none */ } }
  var KEY = "portal.maker", KEY_OK = /^[a-z2-7]{24}$/;
  function keyOf() { var k = (get(KEY) || "").trim().toLowerCase(); return KEY_OK.test(k) ? k : ""; }
  function keepMakerOf(slug, games, add) {
    var o = null;
    try { o = JSON.parse(get("portal.makerof") || "null"); } catch (e) { o = null; }
    var list = add && o && o.slug === slug && Array.isArray(o.games) ? o.games.slice(0, 200) : [];
    games.forEach(function (g) { if (list.indexOf(g) < 0) list.push(g); });
    put("portal.makerof", JSON.stringify({ slug: slug, games: list }));
  }
  function post(path, body) {
    return window.fetch(path, { method: "POST", credentials: "omit", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, e: r.status === 429 ? "busy" : "server" }; }); })
      .catch(function () { return { ok: false, e: "server" }; });
  }
  function busy(b, on) { if (!b) return; if (on) { b.setAttribute("aria-busy", "true"); b.disabled = true; } else { b.removeAttribute("aria-busy"); b.disabled = false; } }
  function errs(box, key) {
    $$(".claim-err", box).forEach(function (p) { p.hidden = p.getAttribute("data-e") !== key; });
    if (key && !$('.claim-err[data-e="' + key + '"]', box)) { var s = $('.claim-err[data-e="server"]', box); if (s) s.hidden = false; }
  }
  function focus(e) { if (!e) return; if (!e.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(e.tagName)) e.setAttribute("tabindex", "-1"); try { e.focus({ preventScroll: false }); } catch (x) { e.focus(); } }

  /* Copy: the text of the element named by data-copy; the button says Copied for a moment */
  doc.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-copy]") : null;
    if (!b) return;
    var t = doc.getElementById(b.getAttribute("data-copy"));
    if (!t) return;
    var text = t.textContent || "", done = function () { var was = b.textContent; b.textContent = "Copied"; window.setTimeout(function () { b.textContent = was; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { pick(t); });
    else pick(t);
  });
  function pick(t) { var r = doc.createRange(); r.selectNodeContents(t); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }

  /* ---- a claim that worked: the key once (kept on this device), or "with your other games" ---- */
  function claimed(box, j) {
    var ok = $("#claim-ok", box);
    $$(".claim-steps, .claim-token, .claim-err, .claim-other", box).forEach(function (x) { x.hidden = true; });
    if (j.key && KEY_OK.test(j.key)) {
      put(KEY, j.key);
      $(".claim-keybox", ok).hidden = false;
      $("#claim-key", ok).textContent = j.key;
    }
    $(".claim-joined", ok).hidden = j.how !== "joined";
    if (j.maker && j.maker.slug) keepMakerOf(j.maker.slug, [j.game], !j.key || j.how === "rotated");
    drop("portal.claim", window.sessionStorage);
    ok.hidden = false;
    focus($("#claim-ok-h", ok));
  }

  /* ---- /claim/?g=<id> ---- */
  function claimPage() {
    var box = $(".claim"), game = box && box.getAttribute("data-game");
    if (!box || !game) return;
    var get1 = $("#claim-get"), check = $("#claim-check"), codeBox = $(".claim-code", box), line = $("#claim-line");
    var mine = null;
    try { mine = JSON.parse(get("portal.claim", window.sessionStorage) || "null"); } catch (e) { mine = null; }
    function show(m) {
      mine = m;
      line.textContent = m.line;
      codeBox.hidden = false;
      check.disabled = false;
      get1.textContent = "Get a new line";
      get1.classList.remove("btn-send");
    }
    if (mine && mine.g === game && /^[a-z2-7]{24}$/.test(mine.s || "") && mine.line) show(mine);
    get1.addEventListener("click", function () {
      errs(box, null); busy(get1, true);
      post("/api/claim/code", { game: game }).then(function (j) {
        busy(get1, false);
        if (!j || !j.ok) { errs(box, j && j.e); return; }
        var m = { g: game, s: j.s, line: j.line };
        put("portal.claim", JSON.stringify(m), window.sessionStorage);
        show(m);
        focus(line);
      });
    });
    check.addEventListener("click", function () {
      if (!mine) return;
      errs(box, null); busy(check, true);
      post("/api/claim/check", { game: game, s: mine.s, key: keyOf() || undefined }).then(function (j) {
        busy(check, false);
        if (j && j.ok) return claimed(box, j);
        errs(box, j && j.e);
        if (j && j.e === "nocode") { mine = null; codeBox.hidden = true; check.disabled = true; drop("portal.claim", window.sessionStorage); }
        var shown = $(".claim-err:not([hidden])", box);
        if (shown) focus(shown);
      });
    });
  }

  /* ---- /claim/<token>/ ---- */
  function linkPage() {
    var box = $(".claim"), b = $("#claim-token");
    if (!box || !b) return;
    b.addEventListener("click", function () {
      errs(box, null); busy(b, true);
      post("/api/claim/token", { token: box.getAttribute("data-token"), key: keyOf() || undefined }).then(function (j) {
        busy(b, false);
        if (j && j.ok) return claimed(box, j);
        errs(box, j && j.e);
        if (j && j.e === "token") b.hidden = true;
      });
    });
  }

  /* ---- /maker/ ---- */
  var SPRITE = (function () { var u = $("svg use"); var h = u ? u.getAttribute("href") || "" : ""; return h.split("#")[0] || "/a/icons.svg"; })();
  var SVG = "http://www.w3.org/2000/svg";              // the SVG namespace, not an address
  function icon(id) {
    var s = doc.createElementNS(SVG, "svg"), u = doc.createElementNS(SVG, "use");
    s.setAttribute("class", "ico"); s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
    u.setAttribute("href", SPRITE + "#" + id); s.appendChild(u);
    return s;
  }
  var SAY = { field: "Fill it in: 1 to 60 characters.", blocked: "Some of these words can't be used here.", busy: "Too many changes at once. Try again later.",
    server: "Something went wrong. Try again.", nogame: "This game is not yours to change." };
  function note(p, text, ok) { p.textContent = text; p.classList.toggle("is-ok", !!ok); p.hidden = !text; }
  function makerPage() {
    var root = $("#maker"), nokey = $("#maker-nokey"), main = $("#maker-main"), keyform = $("#maker-keyform"), namef = $("#maker-namef"), list = $("#maker-games");
    if (!root) return;
    var key = keyOf();
    function noKey(e) { main.hidden = true; nokey.hidden = false; errs(keyform, e || null); if (e) focus($('.claim-err[data-e="' + e + '"]', keyform)); }
    function open(k, typed) {
      return post("/api/maker", { key: k }).then(function (j) {
        if (!j || !j.ok) {
          if (!typed && j && j.e === "key") drop(KEY);           // a key that no longer opens anything (a newer claim replaced it)
          noKey(typed || (j && j.e !== "key") ? (j && j.e) || "server" : "key");
          return;
        }
        key = k; put(KEY, k);
        keepMakerOf(j.maker.slug, (j.games || []).map(function (g) { return g.id; }), false);
        nokey.hidden = true; main.hidden = false;
        namef.elements.namedItem("name").value = j.maker.name;
        var pg = $("#maker-page");
        if (pg) { pg.setAttribute("href", "/m/" + j.maker.slug + "/"); pg.hidden = !(j.games || []).some(function (g) { return g.status === "listed"; }); }
        while (list.firstChild) list.removeChild(list.firstChild);
        (j.games || []).forEach(function (g) { list.appendChild(card(g)); });
      });
    }
    keyform.addEventListener("submit", function (e) {
      e.preventDefault();
      var k = (keyform.elements.namedItem("key").value || "").trim().toLowerCase().replace(/\s+/g, "");
      if (!KEY_OK.test(k)) { errs(keyform, "key"); return; }
      open(k, true);
    });
    namef.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $(".maker-msg", namef), b = $("button", namef);
      busy(b, true);
      post("/api/maker/edit", { key: key, name: (namef.elements.namedItem("name").value || "").trim() }).then(function (j) {
        busy(b, false);
        if (j && j.ok) { namef.elements.namedItem("name").value = j.maker.name; note(msg, "Saved. It's live.", true); return; }
        if (j && j.e === "key") return noKey("key");
        note(msg, SAY[j && j.e] || SAY.server, false);
      });
    });
    $("#maker-forget").addEventListener("click", function () { drop(KEY); drop("portal.makerof"); key = ""; keyform.reset(); noKey(null); });
    if (key) open(key, false); else noKey(null);
  }
  var NAMES = D.kindNames || {}, LANGN = D.langNames || {};
  function card(g) {
    var a = el("article", "maker-card");
    a.setAttribute("data-game", g.id);
    var h = el("h2", "maker-card-h");
    if (g.page) { var l = el("a", "maker-card-a", g.name); l.setAttribute("href", g.page); h.appendChild(l); } else h.appendChild(el("span", null, g.name));
    h.appendChild(el("span", "maker-card-lang", LANGN[g.lang] || g.lang));
    a.appendChild(h);
    if (g.status !== "listed") a.appendChild(el("p", "claim-p", "Not on the list now."));
    var f = el("form", "maker-gamef");
    f.setAttribute("novalidate", "");
    var lab = el("label", "fld"), inp = el("input");
    lab.appendChild(el("span", "fld-l", "Its line, in " + (LANGN[g.lang] || g.lang) + ": what you do in the game (at most 60 characters)"));
    inp.name = "line"; inp.maxLength = 60; inp.value = g.line || ""; inp.setAttribute("lang", g.lang); inp.autocomplete = "off";
    lab.appendChild(inp);
    var count = el("span", "card-count");
    var paint = function () { var n = Array.from(inp.value).length; count.textContent = n + "/60"; count.classList.toggle("is-over", n > 60); };
    inp.addEventListener("input", paint); paint();
    lab.appendChild(count);
    f.appendChild(lab);
    var fs = el("fieldset", "fld fld-kind"), lg = el("legend", "fld-l", "Kind"), ks = el("div", "kinds");
    fs.appendChild(lg);
    (D.kinds || []).forEach(function (k) {
      var o = el("label", "kind-opt"), r = el("input");
      r.type = "radio"; r.name = "kind"; r.value = k; if (k === g.kind) r.checked = true;
      o.appendChild(r); o.appendChild(icon("k-" + k)); o.appendChild(el("span", "kind-opt-t", NAMES[k] || k));
      ks.appendChild(o);
    });
    fs.appendChild(ks); f.appendChild(fs);
    var b = el("button", "btn btn-send", "Save"); b.type = "submit"; f.appendChild(b);
    var msg = el("p", "maker-msg"); msg.setAttribute("role", "status"); msg.hidden = true; f.appendChild(msg);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var k = $('input[name="kind"]:checked', f), body = { key: keyOf(), game: g.id, line: (inp.value || "").trim() };
      if (k) body.kind = k.value;
      busy(b, true);
      post("/api/maker/edit", body).then(function (j) {
        busy(b, false);
        if (j && j.ok) { inp.value = j.game.line; paint(); note(msg, "Saved. It's live.", true); return; }
        if (j && j.e === "field" && j.field === "line") inp.setAttribute("aria-invalid", "true");
        note(msg, SAY[j && j.e] || SAY.server, false);
      });
    });
    inp.addEventListener("input", function () { inp.removeAttribute("aria-invalid"); });
    a.appendChild(f);
    a.appendChild(logoForm(g));
    return a;
  }

  /* the logo: a picture of the maker's own, square is best; it waits for a look in the queue, then shows on the coins */
  var PIC_MAX = 150 * 1024, PIC_TYPES = ["image/png", "image/jpeg", "image/webp"];
  var PIC_SAY = { type: "Use a PNG, JPEG or WebP picture.", big: "The picture is over 150 KB. Make it smaller and try again.",
    small: "The picture must be at least 256 pixels wide and high.", huge: "The picture is too large: 4096 pixels at most.",
    animated: "Use a still picture.", bad: "This file can't be read as a picture.", busy: SAY.busy, server: SAY.server, nogame: SAY.nogame };
  function logoForm(g) {
    var f = el("form", "maker-logo"), id = "logo-" + g.id;
    f.setAttribute("novalidate", "");
    f.appendChild(el("h3", "maker-logo-h", "Logo"));
    var row = el("div", "maker-logo-row"), view = el("div", "maker-logo-view"), now = el("img", "maker-logo-img");
    now.alt = ""; now.width = 96; now.height = 96;
    if (g.pic) now.src = g.pic; else now.hidden = true;
    view.appendChild(now);
    if (!g.pic) view.appendChild(icon("k-" + g.kind));
    row.appendChild(view);
    var side = el("div", "maker-logo-side");
    var state = el("p", "maker-logo-state", g.pic_wait ? "A new logo is waiting for a look." : g.pic ? "Shown on your game's coins and page." : "Square, at least 256 pixels, at most 150 KB: PNG, JPEG or WebP. It shows once we have looked at it.");
    side.appendChild(state);
    var lab = el("label", "btn maker-logo-pick"), inp = el("input", "maker-logo-file");
    inp.type = "file"; inp.accept = PIC_TYPES.join(","); inp.id = id;
    lab.appendChild(inp); lab.appendChild(el("span", null, g.pic || g.pic_wait ? "Choose another" : "Choose a picture"));
    side.appendChild(lab);
    var send = el("button", "btn btn-send maker-logo-send", "Send the logo"); send.type = "submit"; send.hidden = true;
    side.appendChild(send);
    var msg = el("p", "maker-msg"); msg.setAttribute("role", "status"); msg.hidden = true;
    side.appendChild(msg);
    row.appendChild(side);
    f.appendChild(row);
    var data = null;
    inp.addEventListener("change", function () {
      var file = inp.files && inp.files[0];
      data = null; send.hidden = true; note(msg, "", false);
      if (!file) return;
      if (PIC_TYPES.indexOf(file.type) < 0) { note(msg, PIC_SAY.type, false); return; }
      if (file.size > PIC_MAX) { note(msg, PIC_SAY.big, false); return; }
      var r = new FileReader();
      r.onload = function () {
        data = String(r.result || "");
        if (!/^data:image\/(png|jpeg|webp);base64,/.test(data)) { data = null; note(msg, PIC_SAY.type, false); return; }
        now.src = data; now.hidden = false;
        var ic = $("svg", view); if (ic) view.removeChild(ic);
        send.hidden = false;
        focus(send);
      };
      r.onerror = function () { note(msg, PIC_SAY.bad, false); };
      r.readAsDataURL(file);
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!data) return;
      busy(send, true);
      post("/api/maker/pic", { key: keyOf(), game: g.id, data: data }).then(function (j) {
        busy(send, false);
        if (j && j.ok) { send.hidden = true; data = null; state.textContent = j.state === "ok" ? "Shown on your game's coins and page." : "Sent. It shows once we have looked at it."; note(msg, "", false); focus(state); return; }
        note(msg, PIC_SAY[j && (j.why || j.e)] || SAY.server, false);
      });
    });
    return f;
  }

  if (D.page === "claim") claimPage();
  else if (D.page === "claimlink") linkPage();
  else if (D.page === "maker") makerPage();
})();
