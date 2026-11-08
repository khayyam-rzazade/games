/* Logicers Studio, template 2: Line (the Years Apart feel). Place a date or a number on a line between two ends.
   item: { id, q, min, max, min_label, max_label, answer, image, explain }  (the two labels are small extras the Worker keeps)   answer sent to /play: the number placed.
   Numbers under 10,000 are shown without a thousands mark, so years read as years (1989, not 1,989). */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};
  function num(v) { return typeof v === "number" && isFinite(v); }
  function plainish(it) { return Math.max(Math.abs(it.min), Math.abs(it.max)) < 10000; }
  function f(it, ctx) { var p = plainish(it); return function (v) { return ctx.fmt(v, p); }; }
  function stepOf(it) { return TPL._step(Math.abs(it.max - it.min) || 1); }

  TPL.line = {
    blank: function () { return { q: "", min: null, max: null, min_label: "", max_label: "", answer: null }; },
    play: function (box, it, ctx) {
      var el = ctx.el, fm = f(it, ctx);
      box.appendChild(el("h1", "question st-q", it.q));
      var panel = el("section", "panel st-panel st-line");
      var ro = el("div", "readout");
      var count = el("output", "count", "?");
      ro.appendChild(count);
      panel.appendChild(ro);
      var s = TPL._slider(panel, {
        min: it.min, max: it.max, step: stepOf(it), fmt: fm, ruler: true,
        loLabel: it.min_label || "", hiLabel: it.max_label || "",
        onChange: function (v) { count.textContent = fm(v); ctx.ready(true); }
      }, ctx);
      box.appendChild(panel);
      var hint = el("p", "st-hint", ctx.t("play.hint_line"));
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
          if (fresh) ctx.countUp(count, it.answer, a, fm);
          else count.textContent = fm(it.answer);
        }
      };
    },
    tier: function (it, a) {
      var span = Math.abs(it.max - it.min) || 1, d = Math.abs(a - it.answer);
      if (d < stepOf(it)) return 3;
      var r = d / span;
      return r <= 0.02 ? 2 : r <= 0.07 ? 1 : 0;
    },
    verdict: function (it, a, ctx) {
      var d = Math.abs(a - it.answer), fm = f(it, ctx);
      return { head: d < stepOf(it) ? ctx.t("play.spot") : ctx.t("play.off", { n: ctx.fmt(d, plainish(it)) }), line: ctx.t("play.answer", { x: fm(it.answer) }) };
    },
    dist: function (it, c, a, ctx) {
      return ctx.hist({ min: it.min, max: it.max, counts: c, right: it.answer, you: a, fmt: f(it, ctx), rightLabel: ctx.t("play.answer", { x: f(it, ctx)(it.answer) }) });
    },
    wire: function (it, a) { return a; },
    check: function (it, t) {
      var e = {};
      if (!String(it.q || "").trim()) e.q = t("err.q");
      if (!num(it.min) || !num(it.max) || it.max <= it.min || Math.abs(it.min) > 1e9 || Math.abs(it.max) > 1e9) e.max = t("err.from_to");
      else if (!num(it.answer) || it.answer < it.min || it.answer > it.max) e.answer = t("err.answer", { a: it.min, b: it.max });
      return e;
    },
    summary: function (it, fmt) { return num(it.answer) ? fmt(it.answer, Math.abs(it.answer) < 10000) : ""; },
    edit: function (box, it, ed) {
      ed.field(box, it, { key: "q", label: "ed.q", area: true, max: 200 });
      var two = ed.el("div", "ed-two");
      ed.field(two, it, { key: "min", label: "ed.from", number: true, neg: true });
      ed.field(two, it, { key: "max", label: "ed.to", number: true, neg: true });
      ed.field(two, it, { key: "min_label", label: "ed.label", max: 30 });
      ed.field(two, it, { key: "max_label", label: "ed.label", max: 30 });
      box.appendChild(two);
      ed.field(box, it, { key: "answer", label: "ed.answer", number: true, neg: true, short: true });
    }
  };
})();
