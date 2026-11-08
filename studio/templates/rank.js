/* Logicers Studio, template 4: Rank (the Who Gets What feel). Put 3 to 5 things in order.
   item: { id, q, things: [text, in the right order, first on top], image, explain }
   The player sees them mixed (the same mix for everyone: it comes from the words themselves, never the right order).
   answer: the order the player made, as the indexes of the right order, e.g. [2, 0, 1], sent to /play as that list
   (the Worker's bucket is the same order as digits, "201").
   Drag a row by its grip or its words, or use its two arrows. */
(function () {
  "use strict";
  var TPL = window.StudioT = window.StudioT || {};
  function list(it) { return (Array.isArray(it.things) ? it.things : []).map(function (c) { return String(c == null ? "" : c); }); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mixed(it) {
    var n = list(it).length, idx = [];
    for (var i = 0; i < n; i++) idx.push(i);
    var seed = hash(list(it).join("|") + (it.id || ""));
    for (var j = n - 1; j > 0; j--) { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; var k = seed % (j + 1); var x = idx[j]; idx[j] = idx[k]; idx[k] = x; }
    if (idx.every(function (v, p) { return v === p; })) idx.push(idx.shift());
    return idx;
  }
  function rightCount(a) { var k = 0; (a || []).forEach(function (v, p) { if (v === p) k++; }); return k; }

  TPL.rank = {
    blank: function () { return { q: "", things: ["", "", ""] }; },
    play: function (box, it, ctx) {
      var el = ctx.el, things = list(it), order = mixed(it), locked = false;
      box.appendChild(el("h1", "question st-q", it.q));
      var ol = ctx.attr(el("ol", "st-rank"), { "aria-label": it.q });
      var rows = {};
      order.forEach(function (ix) {
        var li = el("li", "st-thing");
        li.dataset.ix = ix;
        li.appendChild(ctx.attr(el("span", "st-grip"), { "aria-hidden": "true", title: ctx.t("ed.drag") }));
        li.appendChild(el("span", "st-pos"));
        li.appendChild(el("span", "st-txt", things[ix]));
        var ar = el("span", "st-arrows");
        ar.appendChild(ctx.attr(ctx.btn("st-arrow", "↑", function () { move(li, -1); }), { "aria-label": ctx.t("play.up") + ": " + things[ix] }));
        ar.appendChild(ctx.attr(ctx.btn("st-arrow", "↓", function () { move(li, 1); }), { "aria-label": ctx.t("play.down") + ": " + things[ix] }));
        li.appendChild(ar);
        rows[ix] = li;
        ol.appendChild(li);
        drag(li);
      });
      box.appendChild(ol);
      var hint = el("p", "st-hint", ctx.t("play.hint_rank"));
      box.appendChild(hint);
      var verdictHost = el("div");
      box.appendChild(verdictHost);
      number();
      ctx.ready(true);

      function current() { return Array.prototype.map.call(ol.children, function (li) { return +li.dataset.ix; }); }
      function number() {
        Array.prototype.forEach.call(ol.children, function (li, p) {
          li.querySelector(".st-pos").textContent = String(p + 1);
          var b = li.querySelectorAll(".st-arrow");
          b[0].disabled = p === 0; b[1].disabled = p === ol.children.length - 1;
        });
      }
      /* FLIP: the rows that moved glide from where they were */
      function glide(change) {
        var before = new Map();
        Array.prototype.forEach.call(ol.children, function (li) { before.set(li, li.getBoundingClientRect().top); });
        change();
        if (ctx.reduced()) return;
        Array.prototype.forEach.call(ol.children, function (li) {
          if (li.classList.contains("lift")) return;
          var d = before.get(li) - li.getBoundingClientRect().top;
          if (!d) return;
          li.style.transition = "none";
          li.style.transform = "translateY(" + d + "px)";
          void li.offsetWidth;
          li.style.transition = "";
          li.style.transform = "";
        });
      }
      function move(li, dir) {
        if (locked) return;
        var sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
        if (!sib) return;
        glide(function () { if (dir < 0) ol.insertBefore(sib, li.nextSibling); else ol.insertBefore(sib, li); number(); });   /* the row never leaves the list: it keeps its focus */
        var b = li.querySelectorAll(".st-arrow")[dir < 0 ? 0 : 1];
        if (b && !b.disabled) b.focus(); else li.querySelectorAll(".st-arrow")[dir < 0 ? 1 : 0].focus();
      }
      function drag(li) {
        var on = false, y0 = 0, id = null;
        li.addEventListener("pointerdown", function (e) {
          if (locked || e.target.closest(".st-arrow")) return;
          on = true; id = e.pointerId; y0 = e.clientY;
          li.classList.add("lift");
          try { li.setPointerCapture(id); } catch (x) { /* fine */ }
          e.preventDefault();
        });
        li.addEventListener("pointermove", function (e) {
          if (!on || e.pointerId !== id) return;
          var dy = e.clientY - y0;
          var next = li.nextElementSibling, prev = li.previousElementSibling;
          var gap = 8;
          if (next && dy > next.offsetHeight / 2 + gap / 2) {
            var h = next.offsetHeight + gap;
            glide(function () { ol.insertBefore(next, li); });
            y0 += h; dy -= h; number();
          } else if (prev && dy < -(prev.offsetHeight / 2 + gap / 2)) {
            var h2 = prev.offsetHeight + gap;
            glide(function () { ol.insertBefore(prev, li.nextSibling); });   /* the neighbour moves, never the row: it keeps the pointer */
            y0 -= h2; dy += h2; number();
          }
          li.style.transform = "translateY(" + dy + "px)";
        });
        function end() {
          if (!on) return;
          on = false;
          li.classList.remove("lift");
          li.style.transform = "";
        }
        li.addEventListener("pointerup", end);
        li.addEventListener("pointercancel", end);
      }
      return {
        value: current,
        verdictHost: verdictHost,
        reveal: function (a, fresh) {
          locked = true;
          hint.hidden = true;
          ol.classList.add("shown");
          if (Array.isArray(a) && a.length === things.length) {
            a.forEach(function (ix) { if (rows[ix]) ol.appendChild(rows[ix]); });
          }
          var was = current();
          /* then into the right order, each row with its right place; the ones the player had right in green */
          var settle = function () { for (var p = 0; p < things.length; p++) ol.appendChild(rows[p]); };
          if (fresh) glide(settle); else settle();
          Array.prototype.forEach.call(ol.children, function (li, p) {
            var ix = +li.dataset.ix, at = was.indexOf(ix);
            li.querySelector(".st-pos").textContent = String(p + 1);
            li.classList.add(at === p ? "is-right" : "is-wrong");
            if (at !== p) li.insertBefore(el("span", "st-was", ctx.t("play.you") + ": " + (at + 1)), li.querySelector(".st-arrows"));   // F: words, not an arrow
          });
        }
      };
    },
    tier: function (it, a) {
      var n = list(it).length, k = rightCount(a);
      return k === n ? 3 : Math.min(2, Math.round(3 * k / n));
    },
    verdict: function (it, a, ctx) {
      var n = list(it).length, k = rightCount(a);
      return { head: k === n ? ctx.t("play.spot") : ctx.t("play.rank_res", { k: k, n: n }), line: "" };
    },
    dist: function (it, c, a, ctx) {
      var total = 0, ix = list(it).map(function (x, i) { return i; }), key = ix.join(""), key2 = ix.join(",");
      Object.keys(c).forEach(function (k) { if (typeof c[k] === "number") total += c[k]; });
      if (!total) return null;
      var right = typeof c[key] === "number" ? c[key] : typeof c[key2] === "number" ? c[key2] : 0;
      var h = ctx.el("div", "st-dist-h");
      h.appendChild(ctx.el("span", null, ctx.t("play.pct_right", { p: Math.round(right / total * 100) })));
      h.appendChild(ctx.el("span", null, ctx.t("play.answered", { n: ctx.fmt(total) })));
      return h;
    },
    wire: function (it, a) { return (a || []).slice(); },
    check: function (it, t) {
      var e = {}, c = list(it).map(function (x) { return x.trim().toLowerCase(); });
      if (!String(it.q || "").trim()) e.q = t("err.q");
      var dup = c.some(function (x, i) { return c.indexOf(x) !== i; });
      if (c.length < 3 || c.length > 5 || c.some(function (x) { return !x; }) || dup) e.things = t("err.things");
      return e;
    },
    summary: function (it) { return list(it).filter(Boolean).join(" → "); },
    edit: function (box, it, ed) {
      ed.field(box, it, { key: "q", label: "ed.q", area: true, max: 200 });
      ed.things(box, it);
    }
  };
})();
