/* Logicers: the world's counts (16 Oct 2026). How a finished daily game turns into points from 0 to 100,
   and what one result may send. Two places use this one file, so a phone and the server always agree: the
   pages (assets/js/points.js) and the server (server/live/src/points.js, a copy byte for byte, as
   live/wayprint.js is of the server's wayprint.js). r/site-workshop/checks/t_world.py compares the two.

   Points follow each game's own stamp (assets/js/turnsout.js, "tier"): where the stamp says "Spot on" a game
   gives 100, at the edge of its second stamp 70, at the edge of its third 40, and then down to 0. Between two
   of those marks the points fall in a straight line. So the points say in one number what the stamps say in
   four, and no game is easier to score in than another for the way it counts.

   Your Call has no right answer, so it has no points: it sends only which of the three choices was made.

   What a result sends is only this: the game, the error (how far off, in the game's own unit), and for the five
   games whose guess is one number, the guess, so the world's average guess can be drawn beside the answer.
   Never the day's answer, never anything about the player. */
(function (root) {
  "use strict";

  /* [error, points] marks, the error rising. Before the first mark 100, after the last 0. */
  var CURVES = {
    hundred: [[0, 100], [3, 70], [8, 40], [30, 0]],        // people off, of 100
    apart:   [[5, 100], [40, 70], [120, 40], [400, 0]],    // thousandths of the line off
    gets:    [[15, 100], [50, 70], [120, 40], [350, 0]],   // tenths of a point of the price misplaced
    every:   [[0, 100], [13, 70], [20, 40], [100, 0]],     // ten times "how many times too fast or too slow"
    o24:     [[0, 100], [45, 70], [120, 40], [480, 0]],    // minutes off
    energy:  [[0, 100], [2, 70], [4, 40], [12, 0]],        // twice the portions off
    club:    [[0, 100], [5, 0]],                           // wrong calls at the door, of 5
    cousin:  [[0, 100], [2, 0]],                           // branches away: 0, 1 or 2

    /* Altitude (28 Oct 2026), the word climb: one id per language, outside the nine daily games. Its error is
       how many levels short of the summit the climb stopped (0 the summit, 8 the first word missed), so a height
       h is worth round(100 * h / 8) points. Straight down from 100 to 0, no stamps to follow. */
    "altitude-en": [[0, 100], [8, 0]],
    "altitude-it": [[0, 100], [8, 0]],
    "altitude-tr": [[0, 100], [8, 0]],
    "altitude-es": [[0, 100], [8, 0]],
    "altitude-pt": [[0, 100], [8, 0]],
    "altitude-fr": [[0, 100], [8, 0]],

    /* Lookalike (29 Oct 2026), three words a day: one id per language, outside the nine. Its error is a mask of the
       traps fallen for (bit 0 the first word, bit 1 the second, bit 2 the third), so 0 is no trap and 7 all three;
       round(100 * (1 - e / 7)) puts the eight masks in eight different tenths, which is how the page reads them. */
    "lookalike-en": [[0, 100], [7, 0]],
    "lookalike-it": [[0, 100], [7, 0]],
    "lookalike-tr": [[0, 100], [7, 0]],
    "lookalike-es": [[0, 100], [7, 0]],
    "lookalike-pt": [[0, 100], [7, 0]],
    "lookalike-fr": [[0, 100], [7, 0]],

    /* Passport (29 Oct 2026), one word a day and where it came from: one id per language, outside the nine. 0 the
       right origin (100 points), 1 a wrong one (0). */
    "passport-en": [[0, 100], [1, 0]],
    "passport-it": [[0, 100], [1, 0]],
    "passport-tr": [[0, 100], [1, 0]],
    "passport-es": [[0, 100], [1, 0]],
    "passport-pt": [[0, 100], [1, 0]],
    "passport-fr": [[0, 100], [1, 0]]
  };

  /* What the server accepts, game by game: the error (whole numbers), and the guess where there is one.
     "skip" is a band of errors a game can never give (Every Beat says "spot on" or at least 1.1 times off;
     Out of 24 "spot on" or more than 15 minutes off). */
  var LIMITS = {
    hundred: { e: [0, 100], g: [0, 100], whole: true },
    apart:   { e: [0, 1000], g: [0, 1000], whole: true },
    gets:    { e: [0, 20000] },
    every:   { e: [0, 20000], skip: [1, 10], g: [1, 2000] },
    o24:     { e: [0, 1440], skip: [1, 15], g: [0, 1440], whole: true },
    energy:  { e: [0, 120], g: [0, 60] },
    club:    { e: [0, 5] },
    cousin:  { e: [0, 2] },
    call:    { c: [0, 2] },

    /* Altitude: e the levels short of the summit (7 can never happen: there is no 1-letter word), g the guesses
       used, at most BUDGET + BONUS * 6 = 26 (a hint counts 2; finding the 8-letter word ends the climb).
       And, since 30 Oct 2026 (Khayyam: when everything else is the same, the time decides), two optional numbers
       for the order of finish: t the seconds the climb took (0 to 3599, whole) and q 1 when the player gave up.
       A page without them (an old one) is taken as before. */
    "altitude-en": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },
    "altitude-it": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },
    "altitude-tr": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },
    "altitude-es": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },
    "altitude-pt": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },
    "altitude-fr": { e: [0, 8], skip: [7, 7], g: [0, 26], t: [0, 3599], whole: true },

    /* Lookalike: e the mask of the traps fallen for, 0 to 7, no guess. Passport: e 0 or 1, no guess. */
    "lookalike-en": { e: [0, 7] }, "lookalike-it": { e: [0, 7] }, "lookalike-tr": { e: [0, 7] },
    "lookalike-es": { e: [0, 7] }, "lookalike-pt": { e: [0, 7] }, "lookalike-fr": { e: [0, 7] },
    "passport-en": { e: [0, 1] }, "passport-it": { e: [0, 1] }, "passport-tr": { e: [0, 1] },
    "passport-es": { e: [0, 1] }, "passport-pt": { e: [0, 1] }, "passport-fr": { e: [0, 1] }
  };

  /* The five games whose guess is one number, and the scale their guesses are averaged on: Every Beat's
     guesses run from 1 to 2,000 beats a minute, so their average is taken on a log scale (a geometric mean). */
  var GUESS = { hundred: "lin", apart: "lin", o24: "lin", energy: "lin", every: "log",
    "altitude-en": "lin", "altitude-it": "lin", "altitude-tr": "lin",
    "altitude-es": "lin", "altitude-pt": "lin", "altitude-fr": "lin" };

  function num(v) { return typeof v === "number" && isFinite(v); }
  function whole(v) { return num(v) && Math.round(v) === v; }

  /* the points of an error in a game: a whole number from 0 to 100 (null for Your Call or an unknown game) */
  function points(k, e) {
    var c = CURVES[k];
    if (!c || !num(e)) return null;
    if (e <= c[0][0]) return c[0][1];
    for (var i = 1; i < c.length; i++) {
      if (e <= c[i][0]) {
        var a = c[i - 1], b = c[i];
        return Math.round(a[1] + (b[1] - a[1]) * (e - a[0]) / (b[0] - a[0]));
      }
    }
    return 0;
  }

  /* what a game's own stored result sends ({ k, e, g } or { k, c }); null when the result is not one to send */
  function n(v) { return typeof v === "number" ? v : NaN; }          // a number as stored, never text made into one
  var READ = {
    hundred: function (r) { return { e: Math.abs(n(r.g) - n(r.a)), g: n(r.g) }; },
    apart:   function (r) { return { e: Math.abs(n(r.g) - n(r.a)), g: n(r.g) }; },
    gets:    function (r) { return { e: n(r.y) }; },
    every:   function (r) { return { e: Math.abs(n(r.y)), g: n(r.g) }; },
    o24:     function (r) { return { e: Math.abs(n(r.y)), g: n(r.g) }; },
    energy:  function (r) { return { e: Math.abs(n(r.y)), g: n(r.g) }; },
    club:    function (r) { return { e: 5 - n(r.r) }; },
    cousin:  function (r) { return { e: n(r.r) }; },
    call:    function (r) { return { c: n(r.c) }; }
  };
  function read(k, r) {
    if (!READ[k] || !r || typeof r !== "object") return null;
    var x;
    try { x = READ[k](r); } catch (e) { return null; }
    x.k = k;
    if (x.g !== undefined) x.g = Math.round(x.g * 10) / 10;          // a tenth is all any guess has
    return valid(x) ? x : null;
  }

  /* whether one result is one the server takes */
  function inside(v, r) { return num(v) && v >= r[0] && v <= r[1]; }
  function valid(x) {
    if (!x || typeof x !== "object" || typeof x.k !== "string") return false;
    var L = LIMITS.hasOwnProperty(x.k) ? LIMITS[x.k] : null;
    if (!L) return false;
    if (L.c) return whole(x.c) && inside(x.c, L.c) && x.e === undefined && x.g === undefined;
    if (!whole(x.e) || !inside(x.e, L.e)) return false;
    if (L.skip && inside(x.e, L.skip)) return false;
    if (GUESS[x.k]) {
      if (!inside(x.g, L.g)) return false;
      if (L.whole && !whole(x.g)) return false;
      if (Math.abs(Math.round(x.g * 10) - x.g * 10) > 1e-6) return false;   // a tenth at the finest
    } else if (x.g !== undefined) return false;
    if (L.t) {                                                  // Altitude's order of finish: both optional
      if (x.t !== undefined && !(whole(x.t) && inside(x.t, L.t))) return false;
      if (x.q !== undefined && x.q !== 0 && x.q !== 1) return false;
    } else if (x.t !== undefined || x.q !== undefined) return false;
    return x.c === undefined;
  }

  /* Altitude's order of finish (30 Oct 2026): the height reached (the more the better), then the guesses used (the
     fewer the better; a climb that was given up ranks after every other at its height, as 27), then the seconds
     taken (the fewer the better). [height, guesses, seconds], or null when the result carries no time. */
  function order(x) {
    if (!x || !LIMITS.hasOwnProperty(x.k) || !LIMITS[x.k].t || x.t === undefined) return null;
    return [8 - x.e, x.q === 1 ? 27 : x.g, x.t];
  }

  /* which tenth of the scores a result falls in, as the server counts them and the pages read them: 0 for 0 to 9
     points, 1 for 10 to 19 ... 9 for 90 to 99, and 10 for spot on (100) alone, so "spot on" means exactly that */
  function tenth(p) {
    if (!num(p)) return null;
    return p >= 100 ? 10 : Math.max(0, Math.min(9, Math.floor(p / 10)));
  }

  root.LogicersPoints = {
    CURVES: CURVES, LIMITS: LIMITS, GUESS: GUESS,
    points: points, read: read, valid: valid, tenth: tenth, order: order,
    SCORED: ["hundred", "apart", "gets", "every", "o24", "energy", "club", "cousin"]
  };
})(typeof window !== "undefined" ? window : globalThis);
