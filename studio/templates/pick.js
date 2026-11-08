/* Logicers Studio, template 3: Pick (the Long Lost Cousin feel). A question with 2 to 4 choices, one right.
   item: { id, q, choices: [text], answer: index of the right one, image, explain }   answer sent to /play: the index chosen.
   After the answer each choice fills with the share of players who chose it. Read uses this module for its question. */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};
  var LETTERS = "ABCD";
  function num(v) { return typeof v === "number" && isFinite(v); }
  function list(it) { return (Array.isArray(it.choices) ? it.choices : []).map(function (c) { return String(c == null ? "" : c); }); }

  function choices(box, it, ctx, withQ) {
    var el = ctx.el, picked = null;
    if (withQ !== false) box.appendChild(el("h1", "question st-q", it.q));
    var group = ctx.attr(el("div", "st-choices"), { role: "group" });
    var buttons = list(it).map(function (text, i) {
      var b = ctx.attr(ctx.btn("st-choice", null, function () {
        if (group.classList.contains("shown")) return;
        picked = i;
        buttons.forEach(function (x, j) { x.setAttribute("aria-pressed", String(j === i)); });
        ctx.ready(true);
      }), { "aria-pressed": "false" });
      b.appendChild(el("span", "st-letter", LETTERS.charAt(i)));
      b.appendChild(el("span", "st-txt", text));
      group.appendChild(b);
      return b;
    });
    box.appendChild(group);
    var hint = el("p", "st-hint", ctx.t("play.hint_pick"));
    box.appendChild(hint);
    var verdictHost = el("div");
    box.appendChild(verdictHost);
    return {
      value: function () { return picked; },
      verdictHost: verdictHost,
      reveal: function (a) {
        picked = a;
        group.classList.add("shown");
        hint.hidden = true;
        buttons.forEach(function (b, j) {
          b.disabled = true;
          b.setAttribute("aria-pressed", String(j === a));
          if (j === it.answer) b.classList.add("is-right");
          if (j === a) {
            b.classList.add("is-mine");
            if (j !== it.answer) b.appendChild(el("span", "st-tag", ctx.t("play.you")));
          }
        });
      },
      counts: function (c) {
        var total = 0, n = buttons.map(function (b, j) { var v = c[String(j)]; v = num(v) ? v : 0; total += v; return v; });
        if (!total) return;
        buttons.forEach(function (b, j) {
          var p = Math.round(n[j] / total * 100);
          var bar = el("span", "st-bar");
          b.insertBefore(bar, b.firstChild);
          var pc = el("span", "st-pct", p + "%");
          b.appendChild(pc);
          if (ctx.reduced()) bar.style.transform = "scaleX(" + p / 100 + ")";
          else window.setTimeout(function () { bar.style.transform = "scaleX(" + p / 100 + ")"; }, 80 + j * 100);
        });
      }
    };
  }

  TPL.pick = {
    blank: function () { return { q: "", choices: ["", ""], answer: null }; },
    play: function (box, it, ctx) { return choices(box, it, ctx, true); },
    _choices: choices,
    tier: function (it, a) { return a === it.answer ? 3 : 0; },
    verdict: function (it, a, ctx) {
      return { head: a === it.answer ? ctx.t("play.right") : ctx.t("play.wrong"), line: a === it.answer ? "" : ctx.t("play.answer", { x: list(it)[it.answer] || "" }) };
    },
    dist: function (it, c, a, ctx) {
      var total = 0; Object.keys(c).forEach(function (k) { if (num(c[k])) total += c[k]; });
      if (!total) return null;
      var right = num(c[String(it.answer)]) ? c[String(it.answer)] : 0;
      var h = ctx.el("div", "st-dist-h");
      h.appendChild(ctx.el("span", null, ctx.t("play.pct_right", { p: Math.round(right / total * 100) })));
      h.appendChild(ctx.el("span", null, ctx.t("play.answered", { n: ctx.fmt(total) })));
      return h;
    },
    wire: function (it, a) { return a; },
    check: function (it, t) {
      var e = {}, c = list(it);
      if (!String(it.q || "").trim()) e.q = t("err.q");
      if (c.length < 2 || c.length > 4 || c.some(function (x) { return !x.trim(); })) e.choices = t("err.choices");
      else if (!num(it.answer) || it.answer < 0 || it.answer >= c.length || Math.round(it.answer) !== it.answer) e.choices = t("err.right");
      return e;
    },
    summary: function (it) { return list(it)[it.answer] || ""; },
    edit: function (box, it, ed) {
      ed.field(box, it, { key: "q", label: "ed.q", area: true, max: 200 });
      ed.choices(box, it);
    }
  };
})();
