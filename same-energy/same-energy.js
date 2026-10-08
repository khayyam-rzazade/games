/* Same Energy: one real food or drink a day at the top. Fill a plate, or pour glasses, of something else until it
   holds the same energy; then the real amount fills in over yours, with where the figures come from.
   The page never shows a calorie figure: the answer and the score are counts of food and glasses. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  var GAME = "same-energy";
  var DATA = (window.TURNSOUT_DATA || {})[GAME];
  function $(id) { return document.getElementById(id); }

  var panel = $("panel"), stage = $("stage"), plate = $("plate"), items = $("items"), baseG = $("base");
  var actions = $("guess-actions"), btnShow = $("btn-show"), hint = $("hint"), thumb = $("thumb");

  if (!TO || !DATA || !DATA.puzzles || !DATA.puzzles.length) {
    $("question").textContent = "Today's day could not be loaded. Please try again in a moment.";
    panel.hidden = true; actions.hidden = true; hint.hidden = true;
    return;
  }

  var SVGNS = "http://www.w3.org/2000/svg";

  /* ---------- the drawings: each a list of layers in a box of 100 by 100, for the page and for the share picture.
     A layer is a filled path {d, f, o} or a line {d, s, w}; "k" marks a detail, which the answer's white and yellow
     leave out. No colour on a food says anything about it: there is no red or green here but the food's own. ---------- */
  function n2(x) { return Math.round(x * 100) / 100; }
  function E(cx, cy, rx, ry) {
    return "M" + n2(cx - rx) + " " + n2(cy) + "a" + n2(rx) + " " + n2(ry) + " 0 1 0 " + n2(2 * rx) + " 0a" + n2(rx) + " " +
      n2(ry) + " 0 1 0 " + n2(-2 * rx) + " 0Z";
  }
  function R(x, y, w, h, r) {
    return "M" + n2(x + r) + " " + n2(y) + "H" + n2(x + w - r) + "Q" + n2(x + w) + " " + n2(y) + " " + n2(x + w) + " " + n2(y + r) +
      "V" + n2(y + h - r) + "Q" + n2(x + w) + " " + n2(y + h) + " " + n2(x + w - r) + " " + n2(y + h) + "H" + n2(x + r) +
      "Q" + n2(x) + " " + n2(y + h) + " " + n2(x) + " " + n2(y + h - r) + "V" + n2(y + r) + "Q" + n2(x) + " " + n2(y) + " " + n2(x + r) + " " + n2(y) + "Z";
  }
  /* a shape given in its own little frame (x and y from -1 to 1), turned and placed */
  function placed(pts, cx, cy, a, sx, sy) {
    var c = Math.cos(a), s = Math.sin(a), out = "";
    pts.forEach(function (p) {
      out += p[0];
      for (var i = 1; i < p.length; i += 2) {
        var x = p[i] * sx, y = p[i + 1] * sy;
        out += n2(cx + x * c - y * s) + " " + n2(cy + x * s + y * c) + (i + 2 < p.length ? " " : "");
      }
    });
    return out;
  }
  var ALMOND = [["M", 0, -1], ["C", 0.55, -0.55, 0.62, 0.45, 0, 1], ["C", -0.62, 0.45, -0.55, -0.55, 0, -1], ["Z"]];
  var ALMOND_LINE = [["M", 0, -0.62], ["C", 0.12, -0.1, 0.12, 0.3, 0, 0.62]];
  var DATE = [["M", 0, -1], ["C", 0.7, -0.95, 0.75, 0.95, 0, 1], ["C", -0.75, 0.95, -0.7, -0.95, 0, -1], ["Z"]];
  var DATE_LINE = [["M", -0.2, -0.55], ["C", 0.1, -0.2, -0.1, 0.2, 0.2, 0.5]];

  var LIQ = { milk: "#FFFDF7", cola: "#4A2618", oj: "#F59E1B", aj: "#E6AF35", beer: "#E3A52E" };
  var CAN = { cola: "#5A2B21", beer: "#C99A2E" };

  /* the inside of a glass and of a can, from one level to another (0 is empty, 1 full) */
  function glassIn(l0, l1) {
    function y(l) { return 90 - l * 72; }
    function xl(yy) { return 25.5 + 5 * (yy - 12) / 80; }
    function xr(yy) { return 74.5 - 5 * (yy - 12) / 80; }
    var a = y(l1), b = y(l0);
    return "M" + n2(xl(a)) + " " + n2(a) + "L" + n2(xr(a)) + " " + n2(a) + "L" + n2(xr(b)) + " " + n2(b) + "L" + n2(xl(b)) + " " + n2(b) + "Z";
  }
  var GLASS = "M23 11L77 11L71 91Q70.5 95 66.5 95L33.5 95Q29.5 95 29 91Z";
  function canIn(l0, l1) {
    var a = 89 - l1 * 69, b = 89 - l0 * 69;
    return "M29 " + n2(a) + "L71 " + n2(a) + "L71 " + n2(b) + "L29 " + n2(b) + "Z";
  }
  var CANBODY = R(26, 14, 48, 80, 7);

  var PICS = {
    apple: function () {
      return [{ d: "M50 31C42 24 22 22 17 43C12 63 27 88 41 89C45 89.5 47 87.5 50 87.5C53 87.5 55 89.5 59 89C73 88 88 63 83 43C78 22 58 24 50 31Z", f: "#D9533F" },
              { d: E(33, 47, 6, 11), f: "#fff", o: 0.32, k: 1 },
              { d: "M49.5 33C49 25 51 18 56 12", s: "#5B3A1E", w: 4.5, k: 1 }];
    },
    banana: function () {
      return [{ d: "M17 28C13 52 29 79 57 83C73 85 85 79 89 70C78 74 63 73 51 67C36 59 27 45 25 28Z", f: "#F2C12E" },
              { d: "M25 33C29 49 39 60 53 66C64 71 77 72 87 70C77 77 61 77 49 71C35 63 27 49 25 33Z", f: "#D9A21C", k: 1 },
              { d: "M16 29L25 29L24 22L17 23Z", f: "#6B4A1F", k: 1 }];
    },
    grape: function () {
      return [{ d: E(50, 50, 42, 42), f: "#7B3F8F" }, { d: E(37, 36, 11, 9), f: "#fff", o: 0.3, k: 1 }];
    },
    bread: function () {
      return [{ d: "M14 44C10 26 30 14 50 18C70 14 90 26 86 44C84 50 80 52 80 56L80 86Q80 91 75 91L25 91Q20 91 20 86L20 56C20 52 16 50 14 44Z", f: "#C8893F" },
              { d: "M23 44C20 31 35 24 50 27C65 24 80 31 77 44C76 48 72 51 72 55L72 83L28 83L28 55C28 51 24 48 23 44Z", f: "#F3D9A4", k: 1 }];
    },
    egg: function () {
      return [{ d: E(50, 54, 31, 39), f: "#E2D6BF" }, { d: E(50, 54, 29, 37), f: "#FBF6EC", k: 1 },
              { d: E(39, 40, 7, 11), f: "#fff", o: 0.85, k: 1 }];
    },
    glass: function (liquid) {
      var L = [{ d: GLASS, f: "#E7EEF5", o: 0.75 }, { d: glassIn(0, 0.86), f: LIQ[liquid] || LIQ.milk, k: 1 }];
      L.push({ d: GLASS, s: "#9FB3C8", w: 3, k: 1 });
      L.push({ d: "M31 20L34 84", s: "#fff", w: 3, o: 0.7, k: 1 });
      return L;
    },
    can: function (liquid) {
      return [{ d: CANBODY, f: CAN[liquid] || CAN.cola }, { d: R(26, 40, 48, 26, 0), f: "#fff", o: 0.9, k: 1 },
              { d: E(50, 53, 10, 7), f: CAN[liquid] || CAN.cola, o: 0.85, k: 1 },
              { d: E(50, 15, 22, 4), f: "#C9CED6", k: 1 }, { d: R(26, 86, 48, 8, 4), f: "#B9BFC8", k: 1 }];
    },
    bottle: function (liquid) {
      var body = "M41 16L59 16L59 23C59 27 70 31 70 42L70 88Q70 95 63 95L37 95Q30 95 30 88L30 42C30 31 41 27 41 23Z";
      return [{ d: body, f: "#E7EEF5", o: 0.75 },
              { d: "M33 40L67 40L67 88Q67 92 62 92L38 92Q33 92 33 88Z", f: LIQ[liquid] || LIQ.cola, k: 1 },
              { d: R(30, 54, 40, 18, 2), f: "#fff", o: 0.9, k: 1 }, { d: body, s: "#9FB3C8", w: 2.5, k: 1 },
              { d: R(40, 7, 20, 10, 2), f: "#3E6FA8", k: 1 }];
    },
    bigbottle: function (liquid) {
      var body = "M42 8L58 8L58 15C58 20 76 24 76 38L76 89Q76 96 69 96L31 96Q24 96 24 89L24 38C24 24 42 20 42 15Z";
      return [{ d: body, f: "#E7EEF5", o: 0.75 },
              { d: "M27 34L73 34L73 89Q73 93 68 93L32 93Q27 93 27 89Z", f: LIQ[liquid] || LIQ.cola, k: 1 },
              { d: R(24, 50, 52, 20, 2), f: "#fff", o: 0.9, k: 1 }, { d: body, s: "#9FB3C8", w: 2.5, k: 1 },
              { d: R(41, 1, 18, 9, 2), f: "#3E6FA8", k: 1 }];
    },
    carton: function (liquid) {
      var c = liquid === "aj" ? "#E2A92C" : "#F08A24";
      return [{ d: "M27 36L35 18L65 18L73 36L73 92Q73 95 70 95L30 95Q27 95 27 92Z", f: c },
              { d: "M35 18L65 18L65 11L35 11Z", f: "#F4F1EA", k: 1 }, { d: "M27 36L35 18L43 36Z", f: "#fff", o: 0.35, k: 1 },
              { d: R(33, 48, 34, 30, 5), f: "#fff", o: 0.92, k: 1 },
              { d: E(50, 63, 9, 9), f: liquid === "aj" ? "#D9533F" : "#F59E1B", k: 1 }];
    },
    beer: function () {
      var g = "M25 10L75 10L71 91Q70.5 95 66.5 95L33.5 95Q29.5 95 29 91Z";
      return [{ d: g, f: "#E7EEF5", o: 0.75 }, { d: "M28 26L72 26L68.6 89L31.4 89Z", f: LIQ.beer, k: 1 },
              { d: "M26 27C26 15 34 12 40 15C44 9 56 9 60 15C66 12 74 15 74 27Z", f: "#FFF8E8", k: 1 },
              { d: g, s: "#9FB3C8", w: 3, k: 1 }, { d: "M33 32L35 84", s: "#fff", w: 3, o: 0.55, k: 1 }];
    },
    croissant: function () {
      return [{ d: "M11 63C9 44 29 29 50 29C71 29 91 44 89 63C87 71 79 73 73 67C67 61 59 58 50 58C41 58 33 61 27 67C21 73 13 71 11 63Z", f: "#D9963A" },
              { d: "M30 37C34 47 36 55 33 63", s: "#A8662A", w: 3.2, k: 1 }, { d: "M50 30L50 58", s: "#A8662A", w: 3.2, k: 1 },
              { d: "M70 37C66 47 64 55 67 63", s: "#A8662A", w: 3.2, k: 1 },
              { d: "M32 38C42 33 58 33 68 38C60 35.5 40 35.5 32 38Z", f: "#fff", o: 0.3, k: 1 }];
    },
    almonds: function () {
      var L = [], at = [[30, 60, -0.5], [52, 44, 0.3], [70, 64, 0.9], [44, 74, 1.4], [62, 30, -0.2]];
      at.forEach(function (p, i) {
        L.push({ d: placed(ALMOND, p[0], p[1], p[2], 13, 20), f: i % 2 ? "#A65F35" : "#B36B3C", k: i ? 1 : 0 });
        L.push({ d: placed(ALMOND_LINE, p[0], p[1], p[2], 13, 20), s: "#7E4524", w: 2, k: 1 });
      });
      return L;
    },
    oil: function () {
      return [{ d: "M60 72L90 92", s: "#9AA5B1", w: 8 }, { d: E(42, 63, 27, 17), f: "#C3CBD4" },
              { d: E(42, 62, 22, 12.5), f: "#D8B12A", k: 1 }, { d: E(35, 58, 7, 3), f: "#fff", o: 0.5, k: 1 },
              { d: "M44 8C44 8 33 23 33 30A11 11 0 0 0 55 30C55 23 44 8 44 8Z", f: "#D8B12A" }];
    },
    pb: function () {
      return [{ d: "M60 72L90 92", s: "#9AA5B1", w: 8 }, { d: E(42, 63, 27, 17), f: "#C3CBD4" },
              { d: "M18 62C20 44 32 37 43 41C53 36 66 45 66 62C57 69 28 69 18 62Z", f: "#B5743A" },
              { d: "M30 50C34 45 40 44 44 46", s: "#fff", w: 3, o: 0.45, k: 1 }];
    },
    choc: function () {
      var L = [{ d: R(10, 24, 66, 52, 5), f: "#4E2B1F" }];
      for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) L.push({ d: R(14 + c * 20.5, 28 + r * 23, 17, 19.5, 2.5), f: "#6A3B29", k: 1 });
      L.push({ d: "M62 20L91 22L89 80L62 80Z", f: "#D4D8DE", k: 1 });
      L.push({ d: "M62 20L70 34L62 48Z", f: "#B9BFC8", k: 1 });
      return L;
    },
    cheese: function () {
      return [{ d: "M8 62L68 30L92 46L92 70L8 86Z", f: "#F2BE2E" }, { d: "M8 62L68 30L92 46Z", f: "#FFD95A", k: 1 },
              { d: E(36, 72, 6, 4.5), f: "#D9A21E", k: 1 }, { d: E(62, 65, 4.5, 3.5), f: "#D9A21E", k: 1 },
              { d: E(80, 58, 3.5, 2.6), f: "#D9A21E", k: 1 }, { d: E(56, 44, 4, 2), f: "#E8B23A", k: 1 }];
    },
    dates: function () {
      var L = [], at = [[32, 56, 0.5], [56, 42, -0.2], [64, 70, 1.1]];
      at.forEach(function (p, i) {
        L.push({ d: placed(DATE, p[0], p[1], p[2], 15, 25), f: i === 1 ? "#7A4122" : "#6A361B", k: i ? 1 : 0 });
        L.push({ d: placed(DATE_LINE, p[0], p[1], p[2], 15, 25), s: "#9A5A32", w: 2.2, k: 1 });
      });
      return L;
    },
    crisps: function () {
      return [{ d: "M22 12L78 12L74 20L80 88Q80 94 74 94L26 94Q20 94 20 88L26 20Z", f: "#2F6FB2" },
              { d: R(20, 6, 60, 9, 3), f: "#24589A", k: 1 },
              { d: "M33 54C39 41 61 41 67 54C62 65 39 66 33 54Z", f: "#F2C14E", k: 1 },
              { d: "M39 75C42 69 52 69 55 75C52 80 42 80 39 75Z", f: "#F2C14E", k: 1 },
              { d: "M44 30L56 30", s: "#fff", w: 3, o: 0.7, k: 1 }];
    },
    oats: function () {
      return [{ d: "M10 50L90 50C90 73 72 89 50 89C28 89 10 73 10 50Z", f: "#E8EEF4" },
              { d: "M16 50C22 36 40 30 50 32C60 30 78 36 84 50C70 56 30 56 16 50Z", f: "#E2C891", k: 1 },
              { d: E(36, 42, 5, 3), f: "#C9A764", k: 1 }, { d: E(52, 38, 5, 3), f: "#C9A764", k: 1 }, { d: E(66, 44, 5, 3), f: "#C9A764", k: 1 },
              { d: "M10 50L90 50", s: "#B9C6D3", w: 3, k: 1 }, { d: "M24 62C30 74 40 80 50 81", s: "#fff", w: 3, o: 0.7, k: 1 }];
    }
  };
  function layers(key, liquid) { return (PICS[key] || PICS.apple)(liquid); }
  function svgOf(L, cls) {
    return L.map(function (l) {
      var c = l.k ? ' class="d"' : "";
      if (l.s) return '<path' + c + ' d="' + l.d + '" fill="none" stroke="' + l.s + '" stroke-width="' + l.w + '" stroke-linecap="round"' +
        (l.o ? ' stroke-opacity="' + l.o + '"' : "") + '/>';
      return '<path' + c + ' d="' + l.d + '" fill="' + l.f + '"' + (l.o ? ' fill-opacity="' + l.o + '"' : "") + '/>';
    }).join("");
  }
  function drawOn(x, L, left, top, size) {      // the same drawing on the share picture's canvas
    if (!window.Path2D) return;
    x.save();
    x.translate(left, top); x.scale(size / 100, size / 100);
    L.forEach(function (l) {
      x.globalAlpha = l.o || 1;
      var p = new Path2D(l.d);
      if (l.s) { x.strokeStyle = l.s; x.lineWidth = l.w; x.lineCap = "round"; x.stroke(p); }
      else { x.fillStyle = l.f; x.fill(p); }
    });
    x.restore();
  }

  /* ---------- which day, which puzzle, which mode ---------- */
  var today = Math.max(1, TO.dayNumber(DATA.start));
  var params = new URLSearchParams(window.location.search);
  function int(v) { return (v !== null && /^\d{1,7}$/.test(v)) ? parseInt(v, 10) : null; }
  function signed(v) { return (v !== null && /^-?\d{1,4}$/.test(v)) ? parseInt(v, 10) : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }

  var day = today, practice = false, friendRaw = null;
  var pDay = int(params.get("p")), cDay = int(params.get("d")), cG = signed(params.get("g"));
  if (pDay !== null && pDay >= 1 && pDay === today - 1) {
    day = pDay; practice = true;
  } else if (cDay !== null && cDay >= 1 && cDay >= today - 1 && cDay <= today + 1) {
    day = cDay; practice = cDay < today;
    friendRaw = cG;
  }

  var byId = {};
  DATA.puzzles.forEach(function (x) { byId[x.id] = x; });
  function puzzleOf(n) { return DATA.puzzles[(n - 1) % DATA.puzzles.length]; }

  /* a score is kept in halves of a unit: y = 2 × (yours − the real amount), and 0 when spot on */
  function scoreOk(p, y) {
    if (!num(y) || Math.round(y) !== y || Math.abs(y) > 2 * p.b.max) return false;
    if (y === 0) return true;
    if (p.b.step === 1 && y % 2 !== 0) return false;
    return Math.abs(y) / 2 > p.band;
  }
  function valid(r, p) {
    p = p || (r && r.id && byId[r.id]);
    if (!r || !p) return false;
    var stepOk = num(r.g) && Math.round(r.g / p.b.step) * p.b.step === r.g;
    return stepOk && r.g >= 0 && r.g <= p.b.max && scoreOk(p, r.y) && typeof r.t === "string" && r.y === scoreOf(r.g, p);
  }

  var stored = TO.game(GAME);
  var earlier = practice ? stored.practice[day] : stored.results[day];
  var q = puzzleOf(day);
  if (earlier && earlier.id && byId[earlier.id] && valid(earlier, byId[earlier.id])) q = byId[earlier.id];
  if (!valid(earlier, q)) earlier = null;
  var friend = (friendRaw !== null && scoreOk(q, friendRaw)) ? friendRaw : null;

  var B = q.b, STEP = B.step, MAX = B.max, DRINK = !!B.drink;
  var v = 0;                                // how many you have piled or poured: the plate starts empty
  var phase = "play", cardBlob = null, cardUrl = "", layout = null;
  var reduced = TO.reducedMotion();

  /* ---------- counts, written the way the page writes them ---------- */
  function half(x) {                        // 2.5 → "2½", 0.5 → "½"
    var w = Math.floor(x + 1e-9), r = x - w;
    if (r < 0.25) return String(w);
    return (w ? String(w) : "") + "½";
  }
  function many(x, p) {                     // "½ apple", "1 apple", "1½ apples", "2 glasses"
    var s = (p || q).b.short;
    return half(x) + " " + (x <= 1 ? s[0] : s[1]);
  }
  function scoreOf(g, p) {
    p = p || q;
    var d = g - p.ans;
    if (Math.abs(d) <= p.band + 1e-9) return 0;
    return Math.round(2 * d);
  }
  function scoreText(y, p) { return y === 0 ? "Spot on" : "Off by " + many(Math.abs(y) / 2, p); }
  function snap(x) { return Math.max(0, Math.min(MAX, Math.round(x / STEP) * STEP)); }
  function spoken(x) {                      // for screen readers: "one and a half apples"
    if (x === 0) return "none";
    var w = Math.floor(x), h = x - w > 0.25;
    var words = (w ? String(w) : "") + (h ? (w ? " and a half" : "a half") : "");
    return words + " " + (x <= 1 ? B.one : B.many);
  }

  /* ---------- the screen ---------- */
  $("day-label").textContent = "Day " + day + (practice ? ", practice" : "");
  document.title = "Same Energy, day " + day + " | Logicers";
  $("question").textContent = "How many " + B.many + " have the same energy?";
  $("face").textContent = q.a.name;
  $("portion").textContent = q.a.portion;
  $("pic").innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + svgOf(layers(q.a.pic, q.a.liquid)) + '</svg>';
  $("unit-portion").textContent = B.portion;
  plate.setAttribute("aria-valuemax", String(MAX));
  plate.setAttribute("aria-label", "How many " + B.many);
  hint.textContent = DRINK ? (B.pic === "can" ? "Drag up to pour, or tap the cans." : "Drag up to pour, or tap the glasses.") : "Drag up on the plate to add, or tap it.";

  /* the plate, or the table the glasses stand on */
  baseG.innerHTML = DRINK
    ? '<path class="e-table" d="' + R(14, 134, 272, 9, 4.5) + '"/>'
    : '<path class="e-dish" d="' + E(150, 128, 140, 21) + '"/><path class="e-dish-in" d="' + E(150, 126.5, 104, 13) + '"/>';

  /* ---------- where each one goes: a pile on the plate, or glasses in a row ---------- */
  /* The pile grows on the plate and the foods get a little smaller as it does, so that the stage stays short. */
  var BIG = { apple: 1, banana: 1.04, bread: 0.95, egg: 0.86 };
  function slots(count) {
    var n = Math.ceil(count - 1e-9), out = [], i;
    if (DRINK) {
      var w = 48, x0 = 150 - (Math.max(n, 1) * w) / 2 + w / 2;
      for (i = 0; i < Math.max(n, 1); i++) out.push({ x: x0 + i * w, y: 92, s: 84 });
      return out;
    }
    var grape = B.key === "grape", caps, S, dx, dy, y0;
    if (grape) { caps = [13, 12, 11, 9, 7, 5, 3]; S = 19; dx = 19.6; dy = 15; y0 = 121; }
    else {
      var k0 = BIG[B.key] || 1;
      S = (n <= 4 ? 64 : n <= 7 ? 56 : 48) * k0;
      caps = n <= 4 ? [4] : n <= 7 ? [4, 3] : [4, 3, 2, 1];
      dx = S + 2; dy = S * 0.6; y0 = 126 - S * 0.36;
    }
    var left = n, row = 0;
    while (left > 0 && row < caps.length) {
      var k = Math.min(left, caps[row]);
      for (i = 0; i < k; i++) out.push({ x: 150 + (i - (k - 1) / 2) * dx, y: y0 - row * dy, s: S });
      left -= k; row++;
    }
    return out;
  }

  function item(slot, cls, clip, liquid) {   // one food on the plate, whole or half
    var g = '<g class="it ' + cls + '"' + (clip ? ' clip-path="url(#clip-' + clip + ')"' : "") + '>' +
      '<g transform="translate(' + n2(slot.x - slot.s / 2) + ' ' + n2(slot.y - slot.s / 2) + ') scale(' + n2(slot.s / 100) + ')">' +
      svgOf(layers(B.pic, liquid)) + '</g></g>';
    return g;
  }
  function vessel(slot, segs) {             // one glass or can, with what is in it, in pieces from one level to another
    var inner = B.pic === "can" ? canIn : glassIn;
    var out = '<g class="it" transform="translate(' + n2(slot.x - slot.s / 2) + ' ' + n2(slot.y - slot.s / 2) + ') scale(' + n2(slot.s / 100) + ')">';
    out += B.pic === "can"
      ? '<path class="glassline" d="' + CANBODY + '"/><path class="e-can-top" d="' + E(50, 15, 22, 4) + '" fill="#C9CED6"/>'
      : '<path d="' + GLASS + '" fill="#E7EEF5" fill-opacity=".55"/><path class="glassline" d="' + GLASS + '"/>';
    segs.forEach(function (sg) {
      if (sg.b - sg.a <= 0) return;
      out += '<g class="' + sg.cls + '"><path d="' + inner(sg.a, sg.b) + '"' +
        (sg.cls ? "" : ' fill="' + (B.pic === "can" ? CAN[B.liquid] : LIQ[B.liquid]) + '"') + '/></g>';
    });
    return out + '</g>';
  }

  /* what you have while playing */
  function drawPlay() {
    var s = slots(v), html = "";
    if (DRINK) {
      s.forEach(function (sl, i) { html += vessel(sl, [{ a: 0, b: Math.max(0, Math.min(1, v - i)), cls: "" }]); });
    } else {
      s.forEach(function (sl, i) {
        var part = Math.min(1, v - i);
        html += item(sl, "", part < 1 ? "l" : "", B.liquid);
      });
    }
    items.innerHTML = html;
  }

  /* the answer: the real amount in white, the part you got wrong in yellow (filled where you had too little,
     dashed where you had too much), drawn up to "upto" of the real amount while it fills in */
  function drawReal(upto, showMiss) {
    var g = v, a = q.ans, real = Math.min(a, upto);
    var top = Math.max(g, a), s = slots(top), html = "";
    s.forEach(function (sl, i) {
      var you = Math.max(0, Math.min(1, g - i)), re = Math.max(0, Math.min(1, real - i)), fin = Math.max(0, Math.min(1, a - i));
      if (DRINK) {
        var segs = [{ a: 0, b: Math.min(you, re), cls: "ok" }];
        if (showMiss) {
          if (fin > you) segs.push({ a: you, b: fin, cls: "miss" });
          if (you > fin) segs.push({ a: fin, b: you, cls: "extra" });
        } else if (re > you) segs.push({ a: you, b: re, cls: "ok" });
        html += vessel(sl, segs);
        return;
      }
      // a food: a whole one, a left half or a right half in each colour
      function put(cls, from, to) {          // from and to in halves of this one: 0 to 1
        if (to - from <= 0) return;
        html += item(sl, cls, (from === 0 && to === 1) ? "" : (from === 0 ? "l" : "r"));
      }
      var common = Math.min(you, re);
      put("ok", 0, common);
      if (showMiss) {
        if (fin > you) put("miss", you, fin);
        if (you > fin) put("extra", fin, you);
      } else {
        if (re > common) put("ok", common, re);
        if (you > re) put("ghost", re, you);
      }
    });
    items.innerHTML = html;
  }

  function paint() {
    drawPlay();
    thumb.setAttribute("cy", n2(128 - v / MAX * 116));
    if (phase === "play") count(v, "", "");
    plate.setAttribute("aria-valuenow", String(v));
    plate.setAttribute("aria-valuetext", spoken(v));
  }
  function count(x, cap, you) {
    $("cap").textContent = cap || "";
    $("count").textContent = half(x);
    $("unit").textContent = x <= 1 && x > 0 ? B.short[0] : B.short[1];
    $("you").textContent = you || "";
  }

  /* ---------- filling ---------- */
  /* The plate starts empty, and nothing in the stock is as little as nothing, so the start is never an answer; and,
     as Every Beat learnt, Show still asks for one move first. A touch that changes nothing is not a move. */
  var moved = false, nudgeTimer = 0;
  function setV(x) {
    if (phase !== "play") return;
    x = snap(x);
    if (x === v) return;
    v = x;
    moved = true;
    if (nudgeTimer) { window.clearTimeout(nudgeTimer); nudgeTimer = 0; btnShow.textContent = "Show the real amount"; }
    paint();
  }
  function nudge() {
    btnShow.textContent = DRINK ? "First drag up to pour" : "First drag up on the plate";
    $("say").textContent = "";
    $("say").textContent = DRINK ? "First pour: drag up on the glasses, tap them, or use the arrow keys."
      : "First fill the plate: drag up on it, tap it, or use the arrow keys.";
    if (!reduced) {
      [items, baseG].forEach(function (el) { el.classList.remove("nudge"); void el.getBoundingClientRect(); el.classList.add("nudge"); });
    }
    window.clearTimeout(nudgeTimer);
    nudgeTimer = window.setTimeout(function () { nudgeTimer = 0; btnShow.textContent = "Show the real amount"; }, 1800);
  }

  /* Drag up anywhere on the stage to add, down to take away: one step for every few pixels, so that the whole
     plate is about one long thumb's travel. A tap adds one step. */
  var drag = null;
  function pxPerStep() {
    var h = plate.getBoundingClientRect().height || 200;
    return Math.max(4, Math.min(22, (h * 1.45) / (MAX / STEP)));
  }
  plate.addEventListener("pointerdown", function (e) {
    if (phase !== "play" || e.button > 0) return;
    drag = { id: e.pointerId, y0: e.clientY, v0: v, far: 0, t0: Date.now() };
    stage.classList.add("on");
    try { plate.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    e.preventDefault();
  });
  plate.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dy = drag.y0 - e.clientY;
    drag.far = Math.max(drag.far, Math.abs(dy));
    if (drag.far >= 6) setV(drag.v0 + Math.round(dy / pxPerStep()) * STEP);
    e.preventDefault();
  });
  function stop(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    var tap = drag.far < 6 && e && e.type === "pointerup";
    var from = drag.v0;
    drag = null;
    stage.classList.remove("on");
    if (tap) setV(from + STEP);
  }
  plate.addEventListener("pointerup", stop);
  plate.addEventListener("pointercancel", stop);
  plate.addEventListener("lostpointercapture", function (e) { if (drag && e.pointerId === drag.id) { drag = null; stage.classList.remove("on"); } });

  /* keys: arrows by one step, Page keys by a whole unit (five grapes), Home and End to the ends, Enter shows */
  plate.addEventListener("keydown", function (e) {
    if (phase !== "play" || e.altKey || e.ctrlKey || e.metaKey) return;
    var big = B.key === "grape" ? 5 : 1;
    switch (e.key) {
      case "ArrowUp": case "ArrowRight": setV(v + STEP); break;
      case "ArrowDown": case "ArrowLeft": setV(v - STEP); break;
      case "PageUp": setV(v + big); break;
      case "PageDown": setV(v - big); break;
      case "Home": setV(0); break;
      case "End": setV(MAX); break;
      case "Enter": case " ": show(); break;
      default: return;
    }
    e.preventDefault();
  });

  var notice = $("notice");
  if (friend !== null) {
    notice.textContent = (friend === 0 ? "A friend was spot on. Can you match that?"
      : "A friend was off by " + many(Math.abs(friend) / 2) + ". Can you beat that?") +
      (practice ? " It is an earlier day, so it does not count for your streak." : "");
    notice.hidden = false;
  } else if (practice) {
    notice.textContent = "Practice. This one does not count for your streak.";
    notice.hidden = false;
  }

  TO.wireDialogs();
  renderChip();
  buildPractice();
  TO.fixLocalLinks();
  if (friend !== null) TO.count("same-energy/challenge-opened");

  if (earlier) { v = snap(earlier.g); paint(); showResult(false); } else { paint(); fit(); }
  window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit, function () { /* ignore */ });

  /* ---------- nothing may need scrolling while you play; after Show, the plate and the verdict stay in view,
     above the bar that leads to the next game ---------- */
  function fit() {
    var app = document.documentElement;
    function over() {
      if (phase === "play") return document.body.scrollHeight > window.innerHeight + 1;
      return panel.getBoundingClientRect().bottom + window.pageYOffset > window.innerHeight - 76;
    }
    app.classList.remove("fit1", "fit2", "fit3");
    for (var i = 1; i <= 3 && over(); i++) {
      app.classList.remove("fit1", "fit2", "fit3");
      app.classList.add("fit" + i);
    }
  }

  /* ---------- showing the real amount ---------- */
  function show() {
    if (phase !== "play") return;
    if (!moved) { nudge(); return; }
    var g = v, y = scoreOf(g), t = scoreText(y);
    TO.update(GAME, function (s) {
      var slot = practice ? s.practice : s.results;
      if (!valid(slot[day])) slot[day] = { g: g, y: y, t: t, id: q.id };
    });
    TO.count(practice ? "same-energy/practice-played" : "same-energy/played/day-" + day);
    showResult(true);
  }
  btnShow.addEventListener("click", show);

  var drawing = 0;
  function showResult(animate) {
    var g = v, y = scoreOf(g);
    var hadFocus = document.activeElement === btnShow || document.activeElement === plate;
    phase = "done";
    drag = null;
    actions.hidden = true;
    hint.hidden = true;
    panel.classList.add("revealed");
    stage.classList.remove("on");
    plate.setAttribute("tabindex", "-1");
    plate.setAttribute("aria-hidden", "true");
    var you = "You: " + half(g);
    // the real amount enters the page only now, and fills in over yours
    function finish() {
      drawing = 0;
      drawReal(q.ans, true);
      count(q.ans, "THE SAME ENERGY", you);
      panel.setAttribute("data-drawn", "1");
      fit();
    }
    if (animate && !reduced && window.requestAnimationFrame) {
      var t0 = null, dur = 1200;
      var frame = function (t) {
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 2.4);
        var upto = Math.round(q.ans * e / STEP) * STEP;
        drawReal(upto, false);
        count(upto, "THE SAME ENERGY", you);
        if (p < 1) drawing = window.requestAnimationFrame(frame);
        else finish();
      };
      drawReal(0, false);
      count(0, "THE SAME ENERGY", you);
      drawing = window.requestAnimationFrame(frame);
    } else finish();

    var o = $("offby");
    o.innerHTML = "";
    var b = document.createElement("b");
    b.textContent = scoreText(y);
    o.appendChild(b);
    o.appendChild(document.createTextNode(" You said " + many(g) + "; the real answer is " + many(q.ans) + "."));
    o.classList.toggle("hit", y === 0);
    $("verdict").hidden = false;
    fillAfter(y);
    renderChip();
    buildPractice();
    fit();
    if (hadFocus) { o.setAttribute("tabindex", "-1"); try { o.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  function link(s) {
    var a = document.createElement("a");
    a.href = s.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = s.name;
    return a;
  }
  function fillAfter(y) {
    var f = $("friend");
    if (friend !== null) {
      var said = friend === 0 ? "Your friend was spot on" : "Your friend was off by " + many(Math.abs(friend) / 2);
      var a = Math.abs(y), c = Math.abs(friend);
      f.textContent = a < c ? said + ". You were closer." : a === c ? said + ", like you. A tie." : said + ". Closer than you.";
      f.hidden = false;
    }
    $("sentence").textContent = q.sentence;
    $("note").textContent = q.note;
    var list = $("sources");
    list.innerHTML = "";
    q.src.forEach(function (s) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(s.what + ": "));
      li.appendChild(link(s.usda));
      li.appendChild(document.createTextNode(" · "));
      li.appendChild(link(s.norway));
      list.appendChild(li);
    });
    if (!practice) { fillStamp($("earned-stamp"), q); $("earned").hidden = false; }
    var next = $("next");
    if (practice) next.innerHTML = '<a href="' + TO.here("./") + '">Back to today</a>';
    else next.textContent = "A new day arrives at midnight.";
    $("after").hidden = false;
    TO.onward({ game: GAME, day: day, today: today, practice: practice });
    prepareCard(y);
  }

  /* ---------- streak chip and album ---------- */
  function playedPuzzle(r, n) { return (r && r.id && byId[r.id]) || puzzleOf(n); }
  function renderChip() {
    var res = TO.game(GAME).results;
    var s = TO.streak(res, today);
    $("streak-chip").textContent = "Streak " + s.current;
    var days = Object.keys(res).map(Number).filter(function (n) { return n >= 1 && valid(res[n]); })
      .sort(function (a, b) { return b - a; });
    $("st-played").textContent = String(s.played);
    $("st-streak").textContent = String(s.current);
    $("st-best").textContent = String(s.best);
    var album = $("album"), spot = 0;
    album.innerHTML = "";
    days.forEach(function (n) {
      if (res[n].y === 0) spot++;
      var st = document.createElement("div");
      st.className = "stamp se";
      fillStamp(st, playedPuzzle(res[n], n));
      album.appendChild(st);
    });
    $("st-spot").textContent = String(spot);
    $("album-empty").hidden = days.length > 0;
  }
  function fillStamp(el, p) {
    el.style.setProperty("--hue", TO.colour(p.colour));
    el.innerHTML = '<svg class="sed" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + svgOf(layers(p.a.pic, p.a.liquid)) + '</svg>';
    function add(cls, text) { var s = document.createElement("span"); s.className = cls; s.textContent = text; el.appendChild(s); }
    add("p", "= " + half(p.ans));
    add("what", p.ans <= 1 ? p.b.one : p.b.many);
    add("of", p.a.name);
  }

  /* ---------- practice: yesterday only ---------- */
  function buildPractice() {
    var list = $("practice-list");
    list.innerHTML = "";
    var g = TO.game(GAME);
    var first = Math.max(1, today - 1);
    for (var n = today - 1; n >= first; n--) {
      var r = g.results[n] || g.practice[n];
      var p = playedPuzzle(r, n);
      if (!valid(r)) { r = null; p = puzzleOf(n); }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = TO.here("?p=" + n);
      var d = document.createElement("span"); d.className = "d"; d.textContent = "Day " + n;
      var t = document.createElement("span"); t.className = "q"; t.textContent = p.a.name + " = how many " + p.b.many + "?";
      var s = document.createElement("span"); s.className = "s";
      s.textContent = r ? r.t : "Not played yet";
      a.appendChild(d); a.appendChild(t); a.appendChild(s);
      li.appendChild(a);
      list.appendChild(li);
    }
    $("practice-empty").hidden = today > 1;
    $("practice-back").hidden = !(practice || day !== today);
  }

  /* ---------- the picture you share: the thing at the top, the unit, and how far off you were; never the real
     amount, never yours ---------- */
  function shareUrl(y) {
    var base = window.location.href.split("#")[0].split("?")[0];
    return base + "?d=" + day + "&g=" + y;
  }
  function shareText(y) {
    return "Same Energy, day " + day + ": " + q.a.name.charAt(0).toLowerCase() + q.a.name.slice(1) + " has the same energy as how many " +
      B.many + "? " + (y === 0 ? "I was spot on." : "I was off by " + many(Math.abs(y) / 2) + ".") + " Can you beat that? " + shareUrl(y);
  }
  function roundRect(x, a, b, w, h, rad) {
    x.beginPath();
    x.moveTo(a + rad, b);
    x.arcTo(a + w, b, a + w, b + h, rad);
    x.arcTo(a + w, b + h, a, b + h, rad);
    x.arcTo(a, b + h, a, b, rad);
    x.arcTo(a, b, a + w, b, rad);
    x.closePath();
  }
  function wrap(x, text, weight, size, family, maxW, maxLines, floor) {
    for (var s = size; s >= floor; s -= 2) {
      x.font = weight + " " + s + "px " + family;
      var words = text.split(" "), lines = [], cur = "";
      for (var i = 0; i < words.length; i++) {
        var t = cur ? cur + " " + words[i] : words[i];
        if (x.measureText(t).width <= maxW || !cur) cur = t;
        else { lines.push(cur); cur = words[i]; }
      }
      if (cur) lines.push(cur);
      var widest = Math.max.apply(null, lines.map(function (l) { return x.measureText(l).width; }));
      if (lines.length <= maxLines && widest <= maxW) return { lines: lines, size: s, fits: true };
      if (s - 2 < floor) return { lines: lines, size: s, fits: false };
    }
  }
  function drawCard(y) {
    var W = 1080, H = 1350, MG = 76, INK = "#A55200";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var Fn = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + Fn;
    var fits = true;
    x.fillStyle = INK; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 0, 40, W / 2, 0, 1100);
    glow.addColorStop(0, "rgba(250, 232, 215, .18)"); glow.addColorStop(1, "rgba(0, 0, 0, .16)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.setLineDash([16, 12]); x.lineWidth = 3; x.strokeStyle = "rgba(250, 232, 215, .36)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke(); x.setLineDash([]);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 48px " + FD;
    x.fillText("Logicers", MG, 118);
    x.textAlign = "right"; x.font = "600 40px " + Fn;
    x.fillText("Same Energy, day " + day, W - MG, 118);

    // the thing at the top and the unit, side by side, with "=" and "?" between them: never an amount
    var box = 300, gap = 150, top = 250, lx = W / 2 - gap / 2 - box, rx = W / 2 + gap / 2;
    [[lx, layers(q.a.pic, q.a.liquid)], [rx, layers(B.pic, B.liquid)]].forEach(function (it) {
      x.fillStyle = "#fff"; roundRect(x, it[0], top, box, box, 48); x.fill();
      drawOn(x, it[1], it[0] + 40, top + 40, box - 80);
    });
    x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = "800 120px " + FD;
    x.fillText("=", W / 2, top + box / 2 + 4);
    x.fillStyle = INK; x.beginPath(); x.arc(rx + box - 26, top + 26, 52, 0, 2 * Math.PI); x.fill();
    x.fillStyle = "#fff"; x.font = "800 70px " + FD; x.fillText("?", rx + box - 26, top + 30);
    x.textBaseline = "alphabetic";

    var q1 = wrap(x, q.a.name, "800", 74, FD, W - 2 * MG, 1, 50);
    fits = fits && q1.fits;
    x.font = "800 " + q1.size + "px " + FD; x.fillStyle = "#fff";
    x.fillText(q1.lines[0], W / 2, top + box + 112);
    var q2 = wrap(x, "= how many " + B.many + "?", "700", 58, FD, W - 2 * MG, 1, 38);
    fits = fits && q2.fits;
    x.font = "700 " + q2.size + "px " + FD; x.fillStyle = "rgba(255, 255, 255, .9)";
    x.fillText(q2.lines[0], W / 2, top + box + 112 + 84);

    var vy = top + box + 112 + 84 + 190;
    var head = scoreText(y), hs = 112;
    x.font = "800 " + hs + "px " + FD; x.fillStyle = "#fff";
    while (x.measureText(head).width > W - 2 * MG && hs > 60) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head, W / 2, vy);

    x.font = "800 70px " + FD;
    x.fillText("Can you beat that?", W / 2, 1204);
    var where = TO.address();
    if (where) {
      var line = "Play at " + where, ws = 40;
      x.font = "600 " + ws + "px " + Fn;
      while (x.measureText(line).width > W - 2 * MG && ws > 24) { ws -= 2; x.font = "600 " + ws + "px " + Fn; }
      x.fillText(line, W / 2, 1270);
    }
    fits = fits && vy <= 1204 - 80;
    layout = { fits: fits, bottom: vy, limit: 1204 - 80, sizes: [q1.size, q2.size, hs], verdict: head, name: q.a.name,
               unit: B.many, answerShown: false, guessShown: false };
    return c;
  }
  window.SameEnergyCard = function () { return layout; };     // read by r/site-workshop/checks/t_energy.py
  function prepareCard(y) {
    function make() {
      try {
        drawCard(y).toBlob(function (blob) {
          if (!blob) return;
          cardBlob = blob;
          if (cardUrl) window.URL.revokeObjectURL(cardUrl);
          cardUrl = window.URL.createObjectURL(blob);
        }, "image/png");
      } catch (e) { cardBlob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 74px "Bricolage Grotesque"'),
        document.fonts.load('700 58px "Bricolage Grotesque"'),
        document.fonts.load('600 40px "Figtree"')
      ]).then(make, make);
    } else make();
  }

  $("share").addEventListener("click", function () {
    var y = scoreOf(v);
    TO.count("same-energy/share");
    TO.share({ blob: cardBlob, filename: "same-energy-day-" + day + ".png", text: shareText(y) }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (cardUrl) { img.src = cardUrl; img.hidden = false; save.href = cardUrl; save.hidden = false; }
      else { img.hidden = true; save.hidden = true; }
      save.setAttribute("download", "same-energy-day-" + day + ".png");
      $("share-copied").textContent = "";
      TO.openDialog($("dlg-share"));
    });
  });
  $("share-copy").addEventListener("click", function () {
    var y = scoreOf(v);
    TO.copyText(shareText(y)).then(function (ok) {
      $("share-copied").textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + shareUrl(y);
    });
  });

  /* ---------- a new day while the page is open ---------- */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (!practice && day === today && Math.max(1, TO.dayNumber(DATA.start)) !== today && !window.location.search) {
      window.location.reload();
    }
  });

  /* a small way in for the browser checks: play a day, and read what the page thinks */
  window.SameEnergy = {
    now: function () {
      var y = scoreOf(v);
      return { day: day, id: q.id, v: v, ans: phase === "done" ? q.ans : null, max: MAX, step: STEP, unit: B.key, drink: DRINK,
               phase: phase, score: y, text: scoreText(y), moved: moved, drawing: !!drawing,
               items: items.querySelectorAll(".it").length };
    },
    set: function (x) { if (phase !== "play") return false; setV(x); return true; },
    show: show
  };
})();
