/* Logicers Studio, template 5: Picture. A picture with a question in Number or Pick form.
   item: { id, form: "number" | "pick", q, image (required), explain, + the Number fields (max, answer, unit)
           or the Pick fields (choices, answer: index) }. form is a small extra the Worker keeps; without it, choices mean Pick.
   Everything but the big picture is the Number or the Pick module's own. */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};
  function sub(it) { return it.form === "number" || (!it.form && !Array.isArray(it.choices) && it.max != null) ? TPL.number : TPL.pick; }

  TPL.picture = {
    blank: function () { return { form: "pick", q: "", choices: ["", ""], answer: null, max: 100, unit: "" }; },
    play: function (box, it, ctx) {
      if (it.image && it.image.url) {
        var f = ctx.el("figure", "st-img big");
        var img = ctx.attr(ctx.el("img"), { src: it.image.url, alt: "", decoding: "async" });
        img.addEventListener("error", function () { f.hidden = true; });
        f.appendChild(img);
        box.appendChild(f);
      }
      return sub(it).play(box, it, ctx);
    },
    tier: function (it, a) { return sub(it).tier(it, a); },
    verdict: function (it, a, ctx) { return sub(it).verdict(it, a, ctx); },
    dist: function (it, c, a, ctx) { return sub(it).dist(it, c, a, ctx); },
    wire: function (it, a) { return sub(it).wire(it, a); },
    check: function (it, t) {
      var e = sub(it).check(it, t);
      if (!it.image || !it.image.url) e.image = t("err.image");
      return e;
    },
    summary: function (it, fmt) { return sub(it).summary(it, fmt); },
    needsImage: true,
    edit: function (box, it, ed) {
      ed.seg(box, "ed.form", [["pick", "t.pick"], ["number", "t.number"]], it.form === "number" ? "number" : "pick", function (v) {
        it.form = v;
        it.answer = null;   /* a number there, the right choice here */
        if (v === "number") { if (it.max == null) it.max = 100; }
        else if (!Array.isArray(it.choices) || it.choices.length < 2) it.choices = ["", ""];
        ed.redraw();
      });
      sub(it).edit(box, it, ed);
    }
  };
})();
