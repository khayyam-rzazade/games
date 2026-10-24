/* Logicers: what players said (19 Oct 2026, Khayyam: "I can build a community and keep these people somehow
   connected to Logicers"). Two small things on the site's own server (server/live/src/said.js):

   1. On the finish card of the last game of the day, one question, "What surprised you today?", with room for
      one line. Khayyam reads every line on his desk before it shows anywhere ("Khayyam will read it", so it
      is a person, not a form). Under the question, the lines of today he has already let through, each with
      the flag of its country.
   2. On the home page, a slim box beside the Game Room, "Players said…": the newest line he let through, with
      its flag; a tap opens a window with the latest 12 (any day, the newest on top). Hidden until there is one.

   A line is kept with the country of the connection and the date, nothing that identifies anyone (the privacy
   line in the About sheet says so). Every line is put on the page as text (textContent), never as HTML. Nothing
   here can break a game: every part is wrapped, and the whole file does nothing when the world's server is off. */
(function () {
  "use strict";
  var TO = window.TurnsOut, W = window.LogicersWorld, LG = window.LG, T = LG ? LG.t : function (k) { return k; };
  if (!TO || !W || !W.on()) return;

  var MAX = 140;
  var SHOW = 1;                       // lines on the home page's box (a half of a row, beside the Game Room)
  var SHOW_CARD = 4;                  // lines under the question on the finish card
  var NAME_MAX = 40, ROLE_MAX = 60;   // the optional name and "I am a…" (the server has the same limits)
  var ROLES = [T("said.role_student"), T("said.role_teacher"), T("said.role_parent"), T("said.role_researcher"), T("said.role_curious"), T("said.role_gamer")];   // examples to tap

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = String(text);
    return e;
  }
  /* a line someone else wrote: its own direction (Arabic or Hebrew must not turn the layout around) */
  function lineEl(x) {
    var li = el("li", "said-line");
    if (W.countryName(x.c)) li.appendChild(W.flagEl(x.c));
    var body = el("span", "said-body");
    var t = el("span", "said-text", x.text);
    t.dir = "auto";
    body.appendChild(t);
    /* who wrote it, when they said (20 Oct 2026): a name and an "I am a…", each only if the player typed it */
    var by = [];
    if (typeof x.name === "string" && x.name) by.push(x.name);
    if (typeof x.role === "string" && x.role) by.push(x.role);
    if (by.length) { var b = el("span", "said-by", by.join(" \u00b7 ")); b.dir = "auto"; body.appendChild(b); }
    li.appendChild(body);
    return li;
  }
  function linesEl(lines, n) {
    var ul = el("ul", "said-lines");
    lines.slice(0, n).forEach(function (x) { if (x && typeof x.text === "string") ul.appendChild(lineEl(x)); });
    return ul;
  }
  function face(size) {
    var i = document.createElement("img");
    i.src = (TO.siteRoot ? TO.siteRoot() : "") + "assets/img/khayyam.jpg";
    i.alt = ""; i.width = size; i.height = size; i.decoding = "async"; i.loading = "lazy";
    var s = el("span", "khay-photo said-face"); s.appendChild(i);
    return s;
  }

  /* ---------------- the finish card: the question ---------------- */
  function card(host) {
    if (!host) return;
    var d = W.todayKey();
    var box = el("section", "said");
    box.setAttribute("aria-label", T("said.q"));
    var head = el("div", "said-head");
    head.appendChild(face(36));
    var hw = el("div", "said-headwords");
    hw.appendChild(el("h3", "said-h", T("said.q")));
    hw.appendChild(el("p", "said-sub", T("said.sub")));
    head.appendChild(hw);
    box.appendChild(head);
    var form = el("form", "said-form");
    form.noValidate = true;
    var ta = el("textarea", "said-field");
    ta.rows = 2; ta.maxLength = MAX; ta.placeholder = T("said.ph");
    ta.setAttribute("aria-label", T("said.q"));
    form.appendChild(ta);
    /* two optional lines about the writer; they show next to the line if Khayyam lets it through */
    var who = el("div", "said-who");
    var nameIn = el("input", "said-in"); nameIn.type = "text"; nameIn.maxLength = NAME_MAX; nameIn.autocomplete = "off";
    nameIn.placeholder = T("said.name_ph"); nameIn.setAttribute("aria-label", T("said.name_aria"));
    var roleIn = el("input", "said-in"); roleIn.type = "text"; roleIn.maxLength = ROLE_MAX; roleIn.autocomplete = "off";
    roleIn.placeholder = T("said.role_ph"); roleIn.setAttribute("aria-label", T("said.role_aria"));
    who.appendChild(nameIn); who.appendChild(roleIn);
    form.appendChild(who);
    var egs = el("div", "said-egs");
    egs.setAttribute("aria-label", T("said.examples_aria"));
    ROLES.forEach(function (r) {
      var c = el("button", "said-eg", r); c.type = "button";
      c.addEventListener("click", function () { roleIn.value = r; roleIn.focus(); });
      egs.appendChild(c);
    });
    form.appendChild(egs);
    form.appendChild(el("p", "said-hint", T("said.hint")));
    var row = el("div", "said-row");
    var left = el("span", "said-left", "");
    var send = el("button", "btn solid said-send", T("tell.send"));
    send.type = "submit"; send.disabled = true;
    row.appendChild(left); row.appendChild(send);
    form.appendChild(row);
    var note = el("p", "said-note"); note.setAttribute("role", "status"); note.hidden = true;
    form.appendChild(note);
    box.appendChild(form);
    var shown = el("div", "said-shown"); shown.hidden = true;
    box.appendChild(shown);
    host.appendChild(box);

    function tidy() { return ta.value.replace(/\s+/g, " ").trim(); }
    ta.addEventListener("input", function () {
      var v = tidy();
      send.disabled = v.length < 3;
      left.textContent = v.length > MAX - 30 ? T("said.n_left", { n: MAX - v.length }) : "";
    });
    function said(t) { note.textContent = t; note.hidden = !t; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = tidy();
      if (text.length < 3 || send.getAttribute("aria-busy") === "true") return;
      send.setAttribute("aria-busy", "true"); send.textContent = T("tell.sending"); said("");
      TO.count("said/send");
      var body = { d: d, text: text };
      var nm = nameIn.value.replace(/\s+/g, " ").trim(), rl = roleIn.value.replace(/\s+/g, " ").trim();
      if (nm) body.name = nm;
      if (rl) body.role = rl;
      W.post("/said/add", body).then(function (r) {
        send.removeAttribute("aria-busy"); send.textContent = T("tell.send");
        if (r.status === 200) {
          form.hidden = true;
          var th = el("div", "said-thanks");
          th.appendChild(el("p", "said-big", T("tell.thanks")));
          th.appendChild(el("p", "", T("said.thanks_sub")));
          box.insertBefore(th, shown);
          TO.count("said/sent");
        } else if (r.status === 400 && r.data && r.data.e === "text") {
          said(T("said.err_text"));
        } else if (r.status === 400 && r.data && (r.data.e === "name" || r.data.e === "role")) {
          said(r.data.e === "name" ? T("said.err_name") : T("said.err_role"));
        } else if (r.status === 400 && r.data && r.data.e === "enough") {
          said(T("said.err_enough"));
        } else if (r.status === 400 && r.data && r.data.e === "same") {
          said(T("said.err_same"));
        } else if (r.status === 429) {
          said(T("said.err_many"));
        } else {
          said(T("said.err_failed"));
        }
      }, function () {
        send.removeAttribute("aria-busy"); send.textContent = T("tell.send");
        said(T("said.err_failed"));
      });
    });
    /* today's lines he has let through, if any */
    W.post("/said/view", { d: d }).then(function (r) {
      if (r.status !== 200 || !Array.isArray(r.data.lines) || !r.data.lines.length) return;
      shown.appendChild(el("p", "said-shown-h", T("said.today_h")));
      shown.appendChild(linesEl(r.data.lines, SHOW_CARD));
      shown.hidden = false;
    }, function () { /* then only the question */ });
  }
  TO.saidHook = function (host) { try { card(host); } catch (e) { /* the question is optional */ } };

  /* ---------------- the home page: the newest line, and a window with the latest twelve ----------------
     Khayyam, 20 Oct 2026: a tap on the box opens a window with the latest 12 lines he let through, whatever their
     day, the newest on top; the 13th pushes the oldest out. An older server that does not know "recent" answers
     with the lines of one day instead, and the window shows those. */
  function win(lines) {
    var dlg = document.getElementById("said-win");
    if (dlg) dlg.parentNode.removeChild(dlg);
    dlg = document.createElement("dialog");
    dlg.id = "said-win"; dlg.className = "said-win";
    dlg.setAttribute("aria-labelledby", "said-win-h");
    var sheet = el("div", "sheet");
    var x = el("button", "chip round close", "\u00d7"); x.type = "button"; x.setAttribute("data-close", ""); x.setAttribute("aria-label", T("site.close"));
    sheet.appendChild(x);
    var h = el("h2", "", T("said.title")); h.id = "said-win-h";
    sheet.appendChild(h);
    sheet.appendChild(el("p", "quiet said-win-sub", T("said.win_sub")));
    sheet.appendChild(linesEl(lines, 12));
    dlg.appendChild(sheet);
    document.body.appendChild(dlg);
    return dlg;
  }
  function openWin(lines) {
    var dlg = win(lines);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    TO.count("said/window");
  }
  function home() {
    var box = document.getElementById("saidbox");
    if (!box) return;
    var d = W.shiftKey ? W.shiftKey(W.todayKey(), -1) : "";
    if (!d) return;
    W.post("/said/view", { d: d, back: true, recent: true }).then(function (r) {
      if (r.status !== 200 || !Array.isArray(r.data.lines) || r.data.lines.length < 1) return;
      var lines = r.data.lines.filter(function (x) { return x && typeof x.text === "string"; });
      if (!lines.length) return;
      box.textContent = "";
      var head = el("div", "said-head");                        /* no photo here (Khayyam, 20 Oct 2026: "it'd be too much") */
      var hw = el("div", "said-headwords");
      var top = el("div", "said-top");
      top.appendChild(el("b", "gameroom-h", T("said.title")));
      if (lines.length > 1) top.appendChild(el("span", "said-plus", "+" + (lines.length - 1)));
      hw.appendChild(top);
      hw.appendChild(linesEl(lines, SHOW));
      head.appendChild(hw);
      box.appendChild(head);
      box.setAttribute("role", "button"); box.tabIndex = 0;
      box.setAttribute("aria-label", T.n(lines.length, "said.box_aria"));
      function go(e) { e.preventDefault(); try { openWin(lines); } catch (err) { /* the window is optional */ } }
      box.addEventListener("click", go);
      box.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") go(e); });
      box.hidden = false;
      TO.count("said/home-seen");
    }, function () { /* the box stays hidden */ });
  }

  function start() { if (document.getElementById("saidbox")) home(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
