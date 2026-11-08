/* Logicers: fits an embedded game's frame to its height (by.logicers.com/embed.js; chat B, 8 Nov 2026).
   The embed code is the <iframe> and this one line; without it the frame simply stays 600 px tall.
   A game page in an embed (a maker's .../embed/ or our daily games' ?embed=1) posts
   { source: "logicers-embed", type: "height", height, game } to the page around it on every change;
   this script finds the frame that sent it and sets its height. It reads nothing else and sends nothing. */
(function () {
  "use strict";
  if (window.__logicersEmbed) return;
  window.__logicersEmbed = true;
  var OK = /^https:\/\/((by|www)\.)?logicers\.com$/;
  window.addEventListener("message", function (e) {
    var d = e.data;
    var ok = OK.test(e.origin) || (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(e.origin));
    if (!ok || !d || d.source !== "logicers-embed" || d.type !== "height" || typeof d.height !== "number") return;
    var h = Math.max(200, Math.min(4000, Math.round(d.height)));
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) { frames[i].style.height = h + "px"; frames[i].setAttribute("height", String(h)); break; }
    }
  });
})();
