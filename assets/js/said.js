/* Logicers: what players said (19 Oct 2026, Khayyam: "I can build a community and keep these people somehow
   connected to Logicers"). Two small things on the site's own server (server/live/src/said.js):

   1. On the finish card of the last game of the day, one question, "What surprised you today?", with room for
      one line. Khayyam reads every line on his desk before it shows anywhere ("Khayyam will read it", so it
      is a person, not a form). Under the question, the lines of today he has already let through, each with
      the flag of its country.
   2. On the home page, a box, "Yesterday, players said…": a few of the lines he let through, with their flags,
      the day after. Hidden until there are some; a day without lines shows the latest day that had some.

   A line is kept with the country of the connection and the date, nothing that identifies anyone (the privacy
   line in the About sheet says so). Every line is put on the page as text (textContent), never as HTML. Nothing
   here can break a game: every part is wrapped, and the whole file does nothing when the world's server is off. */
(function () {
  "use strict";
  var TO = window.TurnsOut, W = window.LogicersWorld;
  if (!TO || !W || !W.on()) return;

  var MAX = 140;
  var SHOW = 2;                       // lines on the home page's box (it sits in the narrow column beside the title)
  var SHOW_CARD = 4;                  // lines under the question on the finish card

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
    var t = el("span", "said-text", x.text);
    t.dir = "auto";
    li.appendChild(t);
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
    box.setAttribute("aria-label", "What surprised you today?");
    var head = el("div", "said-head");
    head.appendChild(face(36));
    var hw = el("div", "said-headwords");
    hw.appendChild(el("h3", "said-h", "What surprised you today?"));
    hw.appendChild(el("p", "said-sub", "One line. Khayyam reads every one before it shows."));
    head.appendChild(hw);
    box.appendChild(head);
    var form = el("form", "said-form");
    form.noValidate = true;
    var ta = el("textarea", "said-field");
    ta.rows = 2; ta.maxLength = MAX; ta.placeholder = "I didn’t know that…";
    ta.setAttribute("aria-label", "What surprised you today?");
    form.appendChild(ta);
    var row = el("div", "said-row");
    var left = el("span", "said-left", "");
    var send = el("button", "btn solid said-send", "Send to Khayyam");
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
      left.textContent = v.length > MAX - 30 ? (MAX - v.length) + " left" : "";
    });
    function said(t) { note.textContent = t; note.hidden = !t; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = tidy();
      if (text.length < 3 || send.getAttribute("aria-busy") === "true") return;
      send.setAttribute("aria-busy", "true"); send.textContent = "Sending…"; said("");
      TO.count("said/send");
      W.post("/said/add", { d: d, text: text }).then(function (r) {
        send.removeAttribute("aria-busy"); send.textContent = "Send to Khayyam";
        if (r.status === 200) {
          form.hidden = true;
          var th = el("div", "said-thanks");
          th.appendChild(el("p", "said-big", "Thank you! 🙏"));
          th.appendChild(el("p", "", "Khayyam will read it. Lines he lets through show here today and on the home page tomorrow."));
          box.insertBefore(th, shown);
          TO.count("said/sent");
        } else if (r.status === 400 && r.data && r.data.e === "text") {
          said("Only words, please: no links, addresses or emails, 3 to 140 characters.");
        } else if (r.status === 400 && r.data && r.data.e === "enough") {
          said("Three lines a day is the most. Thank you for all of them!");
        } else if (r.status === 400 && r.data && r.data.e === "same") {
          said("You sent that one already. Thank you!");
        } else if (r.status === 429) {
          said("Too many from here for the moment. Try again in a few minutes.");
        } else {
          said("That did not go through. Please try again.");
        }
      }, function () {
        send.removeAttribute("aria-busy"); send.textContent = "Send to Khayyam";
        said("That did not go through. Please try again.");
      });
    });
    /* today's lines he has let through, if any */
    W.post("/said/view", { d: d }).then(function (r) {
      if (r.status !== 200 || !Array.isArray(r.data.lines) || !r.data.lines.length) return;
      shown.appendChild(el("p", "said-shown-h", "Players said today"));
      shown.appendChild(linesEl(r.data.lines, SHOW_CARD));
      shown.hidden = false;
    }, function () { /* then only the question */ });
  }
  TO.saidHook = function (host) { try { card(host); } catch (e) { /* the question is optional */ } };

  /* ---------------- the home page: yesterday's lines ---------------- */
  function home() {
    var box = document.getElementById("saidbox");
    if (!box) return;
    var d = W.shiftKey ? W.shiftKey(W.todayKey(), -1) : "";
    if (!d) return;
    W.post("/said/view", { d: d, back: true }).then(function (r) {
      if (r.status !== 200 || !Array.isArray(r.data.lines) || r.data.lines.length < 1) return;
      box.textContent = "";
      var head = el("div", "said-head");
      head.appendChild(face(40));
      var hw = el("div", "said-headwords");
      hw.appendChild(el("b", "gameroom-h", r.data.d === d ? "Yesterday, players said…" : "Players said…"));
      hw.appendChild(el("span", "gameroom-sub", "Each one read by Khayyam first."));
      head.appendChild(hw);
      box.appendChild(head);
      box.appendChild(linesEl(r.data.lines, SHOW));
      box.hidden = false;
      TO.count("said/home-seen");
    }, function () { /* the box stays hidden */ });
  }

  function start() { if (document.getElementById("saidbox")) home(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
