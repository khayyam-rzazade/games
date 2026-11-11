/* Logicers Studio: our own date picker, for a game's "First day" (editor.js asks for it; 11 Nov 2026).

   Why: the browser's own date box looks different on every phone, and some show 11/08/2026. This one is the same everywhere.
   - The date is written out in the page's language, by Intl ("11 November 2026", "11 novembre 2026", "11 Kasım 2026").
   - The week starts the way it does where that language is spoken (Intl's own week data): Monday for it, tr, es and fr;
     Sunday for pt (Brazil) and en (the US). When the visitor's browser has a regional form of the page's language
     (en-GB, fr-CA, pt-PT ...) that region decides, so a reader in Britain gets Monday.
   - Today is marked. Past days are open, as the Worker allows them: any real day from 1 Jan 2026 to 31 Dec 2100 (dayOk in
     server/studio/src/util.js, and a test holds the two together). The editor names new questions that fall on days gone.
   - Keys, as in the WAI-ARIA date-picker dialog: arrows move by a day or a week, Home and End to the week's first and last
     day, Page Up and Down by a month (with Shift by a year), Enter or Space picks, Escape closes and gives the focus back.
     Every day button says its full date; the month and the two month arrows are named by Intl too. So the only new word
     is "Today" (ed.today); the title is the field's own name and Close is the site's.
   - A phone gets a sheet from the bottom, like the other sheets; from 700 px it is a small card under the field.

   window.StudioDate.field({ id, label, labelId, value, onChange }) -> { el, button, set(day), get() }  (days are "YYYY-MM-DD") */
(function () {
  "use strict";
  var S = window.Studio;
  if (!S) return;
  var t = S.t, el = S.el, btn = S.btn, attr = S.attr;

  var MIN = "2026-01-01", MAX = "2100-12-31";               // the Worker's limits (dayOk)
  var MIN_I = S.dayIndex(MIN), MAX_I = S.dayIndex(MAX);
  var DAY = 86400000;
  var uid = 0;

  /* ---------------- days: counted from 1 Jan 1970 in UTC, as the rest of the Studio counts them ---------------- */
  function lang() { return S.lang(); }
  function at(i) { return new Date(i * DAY); }
  function ymd(i) { var d = at(i); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() }; }
  function idx(y, m, d) { return Math.round(Date.UTC(y, m, d) / DAY); }
  function dow(i) { return at(i).getUTCDay(); }                                   // 0 = Sunday
  function monthLen(y, m) { return new Date(Date.UTC(y, m + 1, 0)).getUTCDate(); }
  function addMonths(i, n) {
    var c = ymd(i), m0 = c.m + n, y = c.y + Math.floor(m0 / 12), m = ((m0 % 12) + 12) % 12;
    return idx(y, m, Math.min(c.d, monthLen(y, m)));
  }
  function clamp(i) { return i < MIN_I ? MIN_I : i > MAX_I ? MAX_I : i; }
  function ok(s) { var i = S.dayIndex(s); return i != null && i >= MIN_I && i <= MAX_I && S.dayFrom(i) === s; }

  /* ---------------- the words: all Intl ---------------- */
  function fmt(i, o) {
    try { return new Intl.DateTimeFormat(lang(), Object.assign({ timeZone: "UTC" }, o)).format(at(i)); }
    catch (e) { return S.dayFrom(i); }
  }
  function cap(s) {
    s = String(s || "");
    try { return s.charAt(0).toLocaleUpperCase(lang()) + s.slice(1); } catch (e) { return s; }
  }
  var LONG = { day: "numeric", month: "long", year: "numeric" };
  var MONTH = { month: "long", year: "numeric" };
  var FULL = { weekday: "long", day: "numeric", month: "long", year: "numeric" };

  /* ---------------- the first day of the week ---------------- */
  /* the regions whose weeks start on Sunday (CLDR), for a browser without Intl's week data */
  var SUNDAY = { AG: 1, AS: 1, BD: 1, BR: 1, BS: 1, BT: 1, BW: 1, BZ: 1, CA: 1, CO: 1, DM: 1, DO: 1, ET: 1, GT: 1, GU: 1, HK: 1, HN: 1, ID: 1, IL: 1, IN: 1, JM: 1, JP: 1, KE: 1, KH: 1, KR: 1, LA: 1, MH: 1, MM: 1, MO: 1, MT: 1, MX: 1, MZ: 1, NI: 1, NP: 1, PA: 1, PE: 1, PH: 1, PK: 1, PR: 1, PT: 1, PY: 1, SA: 1, SG: 1, SV: 1, TH: 1, TT: 1, TW: 1, UM: 1, US: 1, VE: 1, VI: 1, WS: 1, YE: 1, ZA: 1, ZW: 1 };
  function weekStart(l) {          // 0 = Sunday ... 6 = Saturday
    var loc = l, list = [];
    try { list = window.navigator.languages || [window.navigator.language]; } catch (e) { list = []; }
    for (var i = 0; i < list.length; i++) {
      try { var x = new Intl.Locale(String(list[i])); if (x.language === l && x.region) { loc = String(list[i]); break; } } catch (e) { /* the next one */ }
    }
    try {
      var L = new Intl.Locale(loc);
      if (!L.region && typeof L.maximize === "function") L = L.maximize();
      var wi = typeof L.getWeekInfo === "function" ? L.getWeekInfo() : L.weekInfo;
      if (wi && wi.firstDay >= 1 && wi.firstDay <= 7) return wi.firstDay % 7;      // Intl: 1 = Monday ... 7 = Sunday
      return SUNDAY[L.region] ? 0 : 1;
    } catch (e) { return l === "en" || l === "pt" ? 0 : 1; }
  }

  var ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10.2h17M8 3v4M16 3v4"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 9.5 5.5 5.5 5.5-5.5"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6"/></svg>'
  };
  function icon(name) { var s = el("span", "dp-svg"); s.innerHTML = ICON[name]; return s; }
  function wideScreen() { try { return window.matchMedia("(min-width: 700px)").matches; } catch (e) { return false; } }

  /* ================================================================ the field */
  function field(o) {
    o = o || {};
    var n = ++uid;
    var value = ok(o.value) ? o.value : (ok(S.today()) ? S.today() : MIN);
    var wrap = el("div", "dp");
    var b = attr(btn("dp-btn", null, function () { open(); }), { "aria-haspopup": "dialog", "aria-expanded": "false" });
    if (o.id) b.id = o.id;
    var ic = el("span", "dp-ic"); ic.appendChild(icon("cal"));
    var tx = el("span", "dp-t");
    var main = attr(el("b"), { id: "dp-m" + n }), sub = attr(el("small"), { id: "dp-s" + n });
    tx.appendChild(main); tx.appendChild(sub);
    var chev = el("span", "dp-chev"); chev.appendChild(icon("down"));
    b.appendChild(ic); b.appendChild(tx); b.appendChild(chev);
    wrap.appendChild(b);

    function paint() {
      var i = S.dayIndex(value), wd = cap(fmt(i, { weekday: "long" }));
      main.textContent = fmt(i, LONG);
      sub.textContent = value === S.today() ? wd + " · " + t("ed.today") : wd;
      b.setAttribute("data-value", value);
      b.setAttribute("aria-labelledby", (o.labelId ? o.labelId + " " : "") + main.id + " " + sub.id);    // "First day, 11 November 2026, Wednesday"
    }
    paint();

    /* ---------------- the card ---------------- */
    var shown = null;                                           // the calendar on screen, if any
    function open() {
      if (shown && shown.open) return;
      var ws = weekStart(lang());
      var todayI = S.dayIndex(S.today());
      var chosen = S.dayIndex(value);
      var focusI = clamp(chosen != null ? chosen : todayI);       // the day the keys are on: the only tab stop of the grid
      var view = ymd(focusI);                                     // the month on show
      var tid = "dp-title" + n;

      var d = shown = attr(el("dialog", "st-dlg dp-dlg"), { "aria-label": o.label || "" });
      var pop = el("div", "dp-pop");
      d.appendChild(pop);

      var top = el("div", "dp-top");
      top.appendChild(el("h2", null, o.label || ""));
      top.appendChild(attr(btn("chip round close", "×", function () { close(); }), { "aria-label": t("site.close") }));
      pop.appendChild(top);

      var nav = el("div", "dp-nav");
      var prev = btn("dp-step", null, function () { step(-1); });
      prev.appendChild(icon("left"));
      var title = attr(el("div", "dp-month"), { id: tid, "aria-live": "polite", "aria-atomic": "true" });
      var next = btn("dp-step", null, function () { step(1); });
      next.appendChild(icon("right"));
      nav.appendChild(prev); nav.appendChild(title); nav.appendChild(next);
      pop.appendChild(nav);

      var gridBox = el("div", "dp-box");
      var table = attr(el("table", "dp-grid"), { role: "grid", "aria-labelledby": tid });
      var thead = el("thead"), hr = el("tr");
      var base = S.dayIndex("2026-11-08");                          // a Sunday
      for (var k = 0; k < 7; k++) {
        var wi = base + ((ws + k) % 7);
        hr.appendChild(attr(el("th", null, cap(fmt(wi, { weekday: "short" }))), { scope: "col", abbr: cap(fmt(wi, { weekday: "long" })) }));
      }
      thead.appendChild(hr);
      var tbody = el("tbody");
      table.appendChild(thead); table.appendChild(tbody);
      gridBox.appendChild(table);
      pop.appendChild(gridBox);

      if (todayI >= MIN_I && todayI <= MAX_I) {
        var foot = el("div", "dp-foot");
        foot.appendChild(btn("chip dp-today", t("ed.today"), function () { choose(todayI); }));
        pop.appendChild(foot);
      }

      function cell(i) {
        var c = ymd(i), td = attr(el("td"), { role: "gridcell" });
        var x = attr(el("button", "dp-day", S.fmt(c.d, true)), { type: "button", tabindex: i === focusI ? "0" : "-1", "data-i": String(i), "aria-label": cap(fmt(i, FULL)) });
        if (c.m !== view.m) x.classList.add("is-out");
        if (i < todayI) x.classList.add("is-past");
        if (i === todayI) { x.classList.add("is-today"); x.setAttribute("aria-current", "date"); }
        if (i === chosen) { x.classList.add("is-sel"); td.setAttribute("aria-selected", "true"); }
        if (i < MIN_I || i > MAX_I) x.disabled = true;
        td.appendChild(x);
        return td;
      }
      function render(dir) {
        var first = idx(view.y, view.m, 1), lead = (dow(first) - ws + 7) % 7, start = first - lead;
        tbody.textContent = "";
        for (var r = 0; r < 6; r++) {
          var tr = el("tr");
          for (var c = 0; c < 7; c++) tr.appendChild(cell(start + r * 7 + c));
          tbody.appendChild(tr);
        }
        title.textContent = cap(fmt(first, MONTH));
        var before = addMonths(first, -1), after = addMonths(first, 1);
        prev.disabled = first <= MIN_I;
        next.disabled = after > MAX_I;
        prev.setAttribute("aria-label", cap(fmt(before, MONTH)));
        next.setAttribute("aria-label", cap(fmt(after, MONTH)));
        if (dir && !S.reduced()) {
          gridBox.classList.remove("go-next", "go-prev"); void gridBox.offsetWidth;
          gridBox.classList.add(dir > 0 ? "go-next" : "go-prev");
        }
        var a = document.activeElement;                              // a month arrow that has just run out of months gives the focus to the other
        if (a === prev && prev.disabled) next.focus(); else if (a === next && next.disabled) prev.focus();
      }
      function dayButton(i) { return tbody.querySelector('[data-i="' + i + '"]'); }
      function focusDay() { var x = dayButton(focusI); if (x) x.focus(); }
      function go(i, focus) {
        i = clamp(i);
        var was = focusI, c = ymd(i);
        focusI = i;
        if (c.y !== view.y || c.m !== view.m) { view = { y: c.y, m: c.m }; render(i > was ? 1 : -1); }
        else { var a = dayButton(was), z = dayButton(i); if (a) a.tabIndex = -1; if (z) z.tabIndex = 0; }
        if (focus) focusDay();
      }
      function step(dir) {
        var first = idx(view.y, view.m, 1), to = addMonths(first, dir);
        if (to < MIN_I || to > MAX_I) return;
        focusI = clamp(addMonths(focusI, dir));
        view = ymd(to);
        render(dir);
      }
      function choose(i) {
        if (i < MIN_I || i > MAX_I) return;
        var v = S.dayFrom(i), changed = v !== value;
        value = v; paint();
        close();
        if (changed && o.onChange) o.onChange(v);
      }
      function close() { if (d.open) d.close(); }

      tbody.addEventListener("click", function (e) {
        var x = e.target.closest ? e.target.closest(".dp-day") : null;
        if (x && !x.disabled) choose(Number(x.getAttribute("data-i")));
      });
      table.addEventListener("keydown", function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var i = focusI, k = e.key, to = null, lead = (dow(i) - ws + 7) % 7;
        if (k === "ArrowLeft") to = i - 1;
        else if (k === "ArrowRight") to = i + 1;
        else if (k === "ArrowUp") to = i - 7;
        else if (k === "ArrowDown") to = i + 7;
        else if (k === "Home") to = i - lead;
        else if (k === "End") to = i + 6 - lead;
        else if (k === "PageUp") to = addMonths(i, e.shiftKey ? -12 : -1);
        else if (k === "PageDown") to = addMonths(i, e.shiftKey ? 12 : 1);
        else return;
        e.preventDefault();
        go(to, true);
      });

      /* from 700 px the card sits under the field (above it when there is no room), and follows it when the page scrolls */
      var frame = 0;
      function place(first) {
        frame = 0;
        if (!wideScreen()) { d.style.top = ""; d.style.left = ""; return; }
        var r = b.getBoundingClientRect(), w = d.offsetWidth, h = d.offsetHeight, vw = window.innerWidth, vh = window.innerHeight, m = 8;
        var side = r.left - 8 - w >= m ? "l" : r.right + 8 + w <= vw - m ? "r" : "";
        if (first && !side && r.bottom + 6 + h > vh - m && r.top - 6 - h < m) {      // room neither under nor over nor beside the field: the page goes up a little, so the card fits under it
          var by = Math.min(Math.ceil(r.bottom + 6 + h - (vh - m)), Math.max(0, document.documentElement.scrollHeight - vh - window.pageYOffset));
          if (by > 0) { window.scrollBy(0, by); r = b.getBoundingClientRect(); }
        }
        var left = Math.min(Math.max(m, r.left), Math.max(m, vw - w - m)), topPx;
        var down = r.bottom + 6, up = r.top - 6 - h;
        if (down + h <= vh - m) topPx = down;                                   // under the field
        else if (up >= m) topPx = up;                                           // above it
        else if (side) {                                                        // beside it
          topPx = Math.min(Math.max(m, r.top), Math.max(m, vh - h - m));
          left = side === "l" ? r.left - 8 - w : r.right + 8;
        } else topPx = Math.max(m, Math.round((vh - h) / 2));                   // a very short window: in the middle of it
        d.style.left = Math.round(left) + "px"; d.style.top = Math.round(topPx) + "px";
      }
      function again() { if (!frame) frame = window.requestAnimationFrame(place); }
      window.addEventListener("resize", again);
      window.addEventListener("scroll", again, true);

      d.addEventListener("close", function () {
        window.removeEventListener("resize", again);
        window.removeEventListener("scroll", again, true);
        if (shown === d) { shown = null; b.setAttribute("aria-expanded", "false"); b.focus(); }
        window.setTimeout(function () { d.remove(); }, 0);
      });
      d.addEventListener("click", function (e) { if (e.target === d) close(); });

      render(0);
      b.setAttribute("aria-expanded", "true");
      document.body.appendChild(d);
      try { d.showModal(); } catch (e) { d.setAttribute("open", ""); }
      place(true);
      focusDay();
    }

    return {
      el: wrap, button: b,
      set: function (v) { if (ok(v)) { value = v; paint(); } },
      get: function () { return value; }
    };
  }

  window.StudioDate = { field: field, MIN: MIN, MAX: MAX, weekStart: weekStart };
})();
