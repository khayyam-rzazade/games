/* Logicers Studio, template 1: Number (the 100 of Us feel). A question, a guess from 0 to a maximum the maker sets,
   the right number and a sentence of explanation.
   item: { id, q, max, answer, unit, image, explain }   answer sent to /play: the guess, a number.

   Every template module gives the same parts (studio.js plays them, editor.js edits them):
     play(box, item, ctx) -> { value(), reveal(answer, fresh), counts(c, answer)?, verdictHost? }
     tier(item, answer) -> 0..3 (how close: the dots)       verdict(item, answer, ctx) -> { head, line }
     dist(item, counts, answer, ctx) -> element | null      wire(item, answer) -> what /play gets
     blank() -> a new item                                   check(item, t) -> { field: words } (empty: fine)
     summary(item) -> a line for the editor's list           edit(box, item, ed) -> the editor's fields
   This file also holds the slider the Line template shares (StudioT._slider). */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};

  function num(v) { return typeof v === "number" && isFinite(v); }
  function stepFor(span) { return span <= 1000 ? 1 : Math.pow(10, Math.floor(Math.log10(span)) - 2); }
  function snap(v, lo, hi, step) { var s = Math.round((v - lo) / step) * step + lo; s = Math.round(s * 1e6) / 1e6; return Math.max(lo, Math.min(hi, s)); }

  /* a slider: drag, tap, keys, and two steps. Starts empty, so nothing anchors the guess. */
  function slider(host, o, ctx) {
    var S = ctx, el = S.el, attr = S.attr;
    var lo = o.min, hi = o.max, step = o.step, value = null;
    var track = attr(el("div", "st-track"), { role: "slider", tabindex: "0", "aria-valuemin": String(lo), "aria-valuemax": String(hi), "aria-label": S.t("play.range_aria", { a: o.fmt(lo), b: o.fmt(hi) }) });
    var line = el("div", "st-track-line"), fill = el("div", "st-track-fill");
    line.appendChild(fill); track.appendChild(line);
    if (o.ruler) { track.appendChild(el("div", "st-ruler")); track.appendChild(el("div", "st-ticks")); line.hidden = true; }
    var thumb = el("div", o.ruler ? "st-pin" : "st-thumb");
    thumb.style.left = "0%"; thumb.style.opacity = ".45";
    track.appendChild(thumb);
    host.appendChild(track);
    var ends = el("div", "st-ends");
    var e1 = el("span", null, o.fmt(lo)), e2 = el("span", null, o.fmt(hi));
    if (o.loLabel) e1.appendChild(el("small", null, o.loLabel));
    if (o.hiLabel) e2.appendChild(el("small", null, o.hiLabel));
    ends.appendChild(e1); ends.appendChild(e2);
    host.appendChild(ends);
    var steps = el("div", "st-steps");
    var less = attr(S.btn("st-step", "−", function () { set((value == null ? lo : value) - step); }), { "aria-label": S.t("play.less") });
    var more = attr(S.btn("st-step", "+", function () { set((value == null ? lo : value) + step); }), { "aria-label": S.t("play.more") });
    steps.appendChild(less); steps.appendChild(more);
    host.appendChild(steps);
    var locked = false;
    function pct(v) { return (v - lo) / (hi - lo || 1) * 100; }
    function set(v) {
      if (locked || !num(v)) return;
      value = snap(v, lo, hi, step);
      thumb.style.left = pct(value) + "%";
      thumb.style.opacity = "";
      fill.style.transform = "scaleX(" + pct(value) / 100 + ")";
      track.setAttribute("aria-valuenow", String(value));
      track.setAttribute("aria-valuetext", o.fmt(value) + (o.unit ? " " + o.unit : ""));
      if (o.onChange) o.onChange(value);
    }
    function fromX(x) { var r = track.getBoundingClientRect(); return lo + (Math.max(0, Math.min(r.width, x - r.left)) / (r.width || 1)) * (hi - lo); }
    var dragging = false;
    track.addEventListener("pointerdown", function (e) {
      if (locked) return;
      dragging = true; track.classList.add("drag");
      try { track.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
      set(fromX(e.clientX));
      e.preventDefault();
    });
    track.addEventListener("pointermove", function (e) { if (dragging) set(fromX(e.clientX)); });
    function up() { dragging = false; track.classList.remove("drag"); }
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
    track.addEventListener("keydown", function (e) {
      if (locked) return;
      var v = value == null ? lo : value, big = Math.max(step, snap((hi - lo) / 10, 0, hi - lo, step));
      var map = { ArrowRight: v + step, ArrowUp: v + step, ArrowLeft: v - step, ArrowDown: v - step, PageUp: v + big, PageDown: v - big, Home: lo, End: hi };
      if (map[e.key] != null) { e.preventDefault(); set(map[e.key]); }
    });
    return {
      value: function () { return value; },
      set: set,
      lock: function () { locked = true; track.setAttribute("aria-disabled", "true"); track.tabIndex = -1; },
      mark: function (v, cls) {
        var m = el("i", "st-mark " + cls); m.style.left = pct(v) + "%";
        track.appendChild(m);
        if (!S.reduced()) { m.classList.add("st-pop"); }
        return m;
      },
      track: track
    };
  }
  TPL._slider = slider;
  TPL._step = stepFor;

  function unitText(it) { return it.unit ? String(it.unit) : ""; }
  function show(it, v, fmt) { var u = unitText(it); return fmt(v) + (u ? (/^[%°]/.test(u) ? "" : " ") + u : ""); }

  TPL.number = {
    blank: function () { return { q: "", max: 100, answer: null, unit: "" }; },
    play: function (box, it, ctx) {
      var el = ctx.el, max = num(it.max) && it.max > 0 ? it.max : 100, step = stepFor(max);
      var q = el("h1", "question st-q", it.q);
      box.appendChild(q);
      var panel = el("section", "panel st-panel st-num");
      var ro = el("div", "readout");
      var count = el("output", "count", "?");
      ro.appendChild(count);
      if (unitText(it)) ro.appendChild(el("span", "st-unit", unitText(it)));
      panel.appendChild(ro);
      var s = slider(panel, { min: 0, max: max, step: step, fmt: function (v) { return ctx.fmt(v); }, unit: unitText(it), onChange: function (v) { count.textContent = ctx.fmt(v); ctx.ready(true); } }, ctx);
      box.appendChild(panel);
      var hint = el("p", "st-hint", ctx.t("play.hint_number"));
      box.appendChild(hint);
      return {
        value: s.value,
        verdictHost: panel,
        reveal: function (a, fresh) {
          s.set(a); s.lock();
          hint.hidden = true;
          panel.classList.add("revealed");
          s.mark(it.answer, "right");
          s.mark(a, "you");
          if (fresh) ctx.countUp(count, it.answer, a);
          else count.textContent = ctx.fmt(it.answer);
        }
      };
    },
    tier: function (it, a) {
      var max = it.max || 100, d = Math.abs(a - it.answer);
      if (d < stepFor(max)) return 3;
      var r = d / max;
      return r <= 0.03 ? 2 : r <= 0.08 ? 1 : 0;
    },
    verdict: function (it, a, ctx) {
      var d = Math.abs(a - it.answer);
      return {
        head: d < stepFor(it.max || 100) ? ctx.t("play.spot") : ctx.t("play.off", { n: show(it, d, ctx.fmt) }),
        line: null          // F: the big number already is the answer (and the chart below names it): said once
      };
    },
    dist: function (it, c, a, ctx) {
      return ctx.hist({ min: 0, max: it.max || 100, counts: c, right: it.answer, you: a, fmt: function (v) { return ctx.fmt(v); }, rightLabel: ctx.t("play.answer", { x: show(it, it.answer, ctx.fmt) }) });
    },
    wire: function (it, a) { return a; },
    check: function (it, t) {
      var e = {};
      if (!String(it.q || "").trim()) e.q = t("err.q");
      if (!num(it.max) || it.max < 1 || it.max > 1000000 || Math.round(it.max) !== it.max) e.max = t("err.max");
      else if (!num(it.answer) || it.answer < 0 || it.answer > it.max) e.answer = t("err.answer", { a: 0, b: it.max });
      return e;
    },
    summary: function (it, fmt) { return num(it.answer) ? show(it, it.answer, fmt) : ""; },
    edit: function (box, it, ed) {
      ed.field(box, it, { key: "q", label: "ed.q", area: true, max: 200 });
      var two = ed.el("div", "ed-two");
      ed.field(two, it, { key: "max", label: "ed.max", number: true, min: 1, maxv: 1000000 });
      ed.field(two, it, { key: "answer", label: "ed.answer", number: true, min: 0 });
      box.appendChild(two);
      ed.field(box, it, { key: "unit", label: "ed.unit", max: 8, ph: "ed.unit_ph", short: true });
    }
  };
})();
