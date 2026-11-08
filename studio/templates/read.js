/* Logicers Studio, template 6: Read. A short text (up to 600 characters, paragraphs allowed) and one Pick question.
   item: { id, text, q, choices, answer: index, image, explain }   answer sent to /play: the index chosen (as Pick). */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};

  TPL.read = {
    blank: function () { return { text: "", q: "", choices: ["", ""], answer: null }; },
    play: function (box, it, ctx) {
      var card = ctx.el("div", "st-read");
      String(it.text || "").replace(/\r/g, "").split(/\n{2,}/).forEach(function (p) {
        p = p.trim(); if (!p) return;
        var para = ctx.el("p");
        p.split("\n").forEach(function (ln, i) { if (i) para.appendChild(ctx.el("br")); para.appendChild(document.createTextNode(ln)); });
        card.appendChild(para);
      });
      box.appendChild(card);
      return TPL.pick._choices(box, it, ctx, true);
    },
    tier: function (it, a) { return TPL.pick.tier(it, a); },
    verdict: function (it, a, ctx) { return TPL.pick.verdict(it, a, ctx); },
    dist: function (it, c, a, ctx) { return TPL.pick.dist(it, c, a, ctx); },
    wire: function (it, a) { return a; },
    check: function (it, t) {
      var e = TPL.pick.check(it, t);
      var tx = String(it.text || "").trim();
      if (!tx) e.text = t("err.text");
      else if (tx.length > 600) e.text = t("err.long");
      return e;
    },
    summary: function (it) { return TPL.pick.summary(it); },
    edit: function (box, it, ed) {
      ed.field(box, it, { key: "text", label: "ed.text", area: true, max: 600, rows: 6 });
      TPL.pick.edit(box, it, ed);
    }
  };
})();
