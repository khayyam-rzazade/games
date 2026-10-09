/* Logicers — Who Was Closer (the duel): one link that carries a player's day.
   A link holds one calendar date, a nickname and that player's score in the daily games they
   finished. It rides after a "#", so it never reaches a server, not even ours. The phone that
   opens it merges it into that date's table and, at the reveal of each game, says who was closer.
   No account, no server: the group chat carries the results.
   How it is made, and why each decision was taken: r/duel-workshop/design.txt.
   Nothing here can change how a daily game is scored, kept or shown: a duel lives beside the
   games in the store, never inside them, and no game script knows it exists. */
(function () {
  "use strict";

  var TO = window.TurnsOut;
  if (!TO) return;

  var MAXP = 8;                         // players at one table, counting you (the same cap as the games for groups)
  var MAXNICK = 24;                     // a nickname longer than this is not one of ours

  /* The night colours of logicers.css, for the marks on the dark card.
     r/site-workshop/checks/t_duel.py compares this list with the stylesheet. */
  var DOT = {
    energy: "#E08600", hundred: "#7FA5FF", call: "#B99DFF", street: "#3FE0C6", cousin: "#FF8468",
    club: "#FF86BF", apart: "#D9A983", gets: "#35C95F", every: "#FF6687", o24: "#12B2C6"
  };

  /* ---------------- the nickname: two plain words, and never a text field ---------------- */
  /* Words every player can read, whatever their English. 16 x 16 = 256, so a clash among a few
     friends is unlikely; if two clash, either rolls again. The link carries the WORDS, not a
     number in these lists, so the lists can change without breaking a link already sent. */
  var WORD1 = ["amber", "blue", "bronze", "copper", "coral", "golden", "green", "grey",
               "indigo", "olive", "plum", "red", "sandy", "silver", "teal", "violet"];
  var WORD2 = ["bear", "crane", "deer", "dolphin", "fox", "heron", "lemur", "llama",
               "otter", "owl", "panda", "seal", "swan", "tiger", "turtle", "whale"];

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function newNick() { return pick(WORD1) + "-" + pick(WORD2); }
  function nickOk(s) {
    return typeof s === "string" && s.length > 0 && s.length <= MAXNICK && /^[a-z]+(-[a-z]+)?$/.test(s);
  }
  function pretty(n) {                   // "copper-llama" -> "Copper Llama"
    return String(n).split("-").map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
  }
  function me() {
    var d = TO.duels();
    if (nickOk(d.me)) return d.me;
    var n = newNick();
    TO.duelsUpdate(function (s) { s.me = n; });
    return n;
  }
  function roll() {
    var was = TO.duels().me, n = newNick();
    for (var i = 0; i < 8 && n === was; i++) n = newNick();
    TO.duelsUpdate(function (s) { s.me = n; });
    return n;
  }

  /* ---------------- dates ---------------- */
  /* A duel is about one calendar DATE, never about a day number: each game counts its days from
     its own start, so one day number would mean ten different things. The phone that opens a link
     works out each game's own day number for that date, which is also what makes time zones right. */
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function keyOf(d) { return String(d.getFullYear()) + two(d.getMonth() + 1) + two(d.getDate()); }
  function dateOf(key) {
    var m = /^(\d{4})(\d{2})(\d{2})$/.exec(String(key));
    if (!m) return null;
    var y = +m[1], mo = +m[2], da = +m[3];
    if (mo < 1 || mo > 12 || da < 1 || da > 31 || y < 2026 || y > 2100) return null;
    var d = new Date(y, mo - 1, da, 12, 0, 0);
    if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== da) return null;   // 31 February and the like
    return d;
  }
  function todayKey() { return keyOf(new Date()); }
  function dayShift(key) {               // how many days that date is from today: 0 today, -1 yesterday, +1 tomorrow
    var d = dateOf(key);
    if (!d) return null;
    var n = new Date();
    var a = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    var b = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
    return Math.round((a - b) / 86400000);
  }
  var MONTHS = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  function dateWords(key) {
    var d = dateOf(key);
    return d ? d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear() : "";
  }

  /* Which day number a game was on, on that date. 0 means the game had not started yet. */
  function dayFor(G, key) {
    var d = dateOf(key);
    if (!d) return 0;
    var n = TO.dayNumber(G.start, d);
    return n >= 1 ? n : 0;
  }

  /* ---------------- my own scores for a date ---------------- */
  /* Only finished games of that date, read from what the games themselves stored. Practice is
     never read: it has never counted anywhere on this site. */
  function mine(key) {
    var out = {};
    TO.GAMES.forEach(function (G) {
      var n = dayFor(G, key);
      if (!n) return;
      var r;
      try { r = TO.game(G.id).results[n]; } catch (e) { return; }
      if (!r || !G.done(r)) return;
      var v = G.score(r);
      if (G.ok(v)) out[G.key] = v;
    });
    return out;
  }
  function countOf(s) { return Object.keys(s || {}).length; }

  /* ---------------- the link ---------------- */
  /* Readable key=value pairs, not a packed blob: a curious person can read the whole thing and see
     there is nothing hidden in it, and a long string of numbers is itself a reason people distrust
     a link. Everything rides after the "#", which browsers never send to a server. */
  function payload(key, nick, scores) {
    var bits = ["d=" + key, "me=" + nick];
    TO.GAMES.forEach(function (G) {
      if (scores[G.key] !== undefined) bits.push(G.key + "=" + scores[G.key]);
    });
    return bits.join("&");
  }
  /* Where the duel page is, from wherever we stand. It is worked out from this script's own address,
     not from the page's path: the site is also opened straight from a folder, where the path says
     nothing about how deep in the site we are. */
  var SELF = (document.currentScript && document.currentScript.src) || "";
  var ROOT = /assets\/js\/duel\.js/.test(SELF) ? SELF.replace(/assets\/js\/duel\.js.*$/, "") : "";
  function base() {
    if (ROOT) return TO.here(ROOT + "duel/");
    var dir = window.location.pathname.replace(/[^\/]*$/, "");          // the folder we stand in
    if (/(^|\/)duel\/$/.test(dir)) return TO.here("./");
    return TO.here(/\/[^\/]+\/$/.test(dir) ? "../duel/" : "duel/");
  }
  function absolute(href) {
    try { return new URL(href, window.location.href).href; } catch (e) { return href; }
  }
  function linkFor(key, nick, scores) {
    return absolute(base()) + "#" + payload(key, nick, scores);
  }
  function link(key) {
    key = key || todayKey();
    return linkFor(key, me(), mine(key));
  }
  /* The message is in the sender's own voice, not the site's: no emoji, no urgency, no "you've won",
     because those are what a scam message looks like. */
  function message(key) {
    key = key || todayKey();
    var n = countOf(mine(key));
    return "I played today's Logicers — " + n + " of " + TO.GAMES.length +
      " games. Think you can beat that? " + link(key);
  }

  /* ---------------- reading a link ---------------- */
  /* A fragment can be edited by hand, so every score is put through the same rule the game itself
     uses for its own friend link. A score that fails is dropped on its own; the rest of the day
     still counts. */
  function read(hash) {
    var raw = String(hash || "").replace(/^#/, "");
    if (!raw) return null;
    var p;
    try { p = new URLSearchParams(raw); } catch (e) { return null; }
    var key = p.get("d"), nick = p.get("me");
    if (!dateOf(key)) return null;
    if (!nickOk(nick)) return null;
    var s = {}, dropped = 0;
    TO.GAMES.forEach(function (G) {
      var v = p.get(G.key);
      if (v === null) return;
      if (!/^-?\d{1,9}(\.\d{1,3})?$/.test(v)) { dropped++; return; }
      var n = parseFloat(v);
      if (!isFinite(n) || !G.ok(n)) { dropped++; return; }
      s[G.key] = n;
    });
    return { key: key, n: nick, s: s, dropped: dropped };
  }

  /* ---------------- merging ---------------- */
  function players(key) {
    var d = TO.duels(), day = d.days[key];
    var list = (day && Array.isArray(day.p)) ? day.p : [];
    return list.filter(function (x) { return x && nickOk(x.n) && x.s && typeof x.s === "object"; });
  }
  /* "merged" a new player, "again" the same nickname with new scores, "same" nothing new,
     "full" the table is full, "over" that day is gone, "mine" it is my own link. */
  function merge(p) {
    if (!p) return "bad";
    var shift = dayShift(p.key);
    if (shift === null || shift < 0) return "over";        // yesterday or older: that duel is over
    if (p.n === TO.duels().me) return "mine";
    var out = "merged";
    TO.duelsUpdate(function (st) {
      var day = st.days[p.key] = (st.days[p.key] && typeof st.days[p.key] === "object") ? st.days[p.key] : {};
      if (!Array.isArray(day.p)) day.p = [];
      var at = -1;
      day.p.forEach(function (x, i) { if (x && x.n === p.n) at = i; });
      if (at >= 0) {
        var before = JSON.stringify(day.p[at].s);
        day.p[at] = { n: p.n, s: p.s };
        out = (before === JSON.stringify(p.s)) ? "same" : "again";
      } else if (day.p.length >= MAXP - 1) {               // minus one, because you are at the table too
        out = "full";
      } else {
        day.p.push({ n: p.n, s: p.s });
      }
    });
    return out;
  }
  function take(hash) {                  // read a link and merge it in one step
    var p = read(hash);
    if (!p) return { how: "bad", p: null };
    return { how: merge(p), p: p };
  }

  /* ---------------- the table ---------------- */
  /* A player gets a game only by being STRICTLY closest: a tie gives nobody a point, so the two
     numbers of "You 4 - 3 Ana" can never add up to more than the games played.
     Your Call is never a win or a loss (the brief): it says only whether you chose the same. */
  function better(G, a, b) {             // is a better than b in this game? 1 yes, -1 no, 0 the same
    if (G.wins === "match") return 0;
    if (G.wins === "high") return a > b ? 1 : a < b ? -1 : 0;
    var x = Math.abs(a), y = Math.abs(b);
    return x < y ? 1 : x > y ? -1 : 0;
  }
  function table(key) {
    key = key || todayKey();
    var others = players(key), my = mine(key);
    var t = { key: key, shift: dayShift(key), me: TO.duels().me || "", mine: my, others: others,
              rows: [], you: 0, ties: 0, lost: 0, scores: {}, live: others.length > 0 };
    others.forEach(function (o) { t.scores[o.n] = 0; });
    TO.GAMES.forEach(function (G) {
      var row = { id: G.id, key: G.key, name: G.name, match: G.wins === "match",
                  played: my[G.key] !== undefined, them: [], state: "none" };
      others.forEach(function (o) {
        if (o.s[G.key] === undefined) return;
        var cmp = row.played ? better(G, my[G.key], o.s[G.key]) : null;
        row.them.push({ n: o.n, cmp: cmp, same: G.wins === "match" && row.played && my[G.key] === o.s[G.key] });
      });
      if (!row.played || !row.them.length) {
        row.state = "none";
      } else if (G.wins === "match") {
        row.state = "match";
      } else {
        var beat = 0, lostTo = 0, tied = 0;
        row.them.forEach(function (x) { if (x.cmp > 0) beat++; else if (x.cmp < 0) lostTo++; else tied++; });
        row.beat = beat; row.lostTo = lostTo; row.tied = tied;
        if (lostTo === 0 && tied === 0) { row.state = "won"; t.you++; }
        else if (lostTo > 0 && beat === 0 && tied === 0) { row.state = "lost"; t.lost++; }
        else if (tied > 0 && lostTo === 0) { row.state = "tie"; t.ties++; }
        else { row.state = "mixed"; }
        /* each friend's own tally, by the same rule: strictly closest, counting everyone at the table */
        var all = [{ n: null, v: my[G.key] }].concat(row.them.map(function (x) {
          var o = null;
          others.forEach(function (y) { if (y.n === x.n) o = y; });
          return { n: x.n, v: o.s[G.key] };
        }));
        var best = all[0];
        all.forEach(function (c) { if (better(G, c.v, best.v) > 0) best = c; });
        var alone = all.filter(function (c) { return better(G, c.v, best.v) === 0; }).length === 1;
        if (alone && best.n !== null) t.scores[best.n]++;
      }
      t.rows.push(row);
    });
    return t;
  }

  /* ---------------- the words ---------------- */
  function headline(t) {
    if (!t.live) return "Who was closer?";
    if (t.others.length === 1) return "You " + t.you + " – " + t.scores[t.others[0].n] + " " + pretty(t.others[0].n);
    return "You " + t.you + " of " + playableCount(t);
  }
  function playableCount(t) {
    var n = 0;
    t.rows.forEach(function (r) { if (!r.match && r.played && r.them.length) n++; });
    return n;
  }
  function standings(t) {                // you and every friend, most games first
    var list = [{ n: t.me, you: true, v: t.you }];
    t.others.forEach(function (o) { list.push({ n: o.n, you: false, v: t.scores[o.n] }); });
    list.sort(function (a, b) { return b.v - a.v; });
    return list;
  }
  /* The line for the game just revealed. It says WHO WAS CLOSER and never the friend's score:
     one sentence that reads the same in all ten games, needs no game's own vocabulary and gives
     nothing of the puzzle away. */
  function lineFor(t, gameId) {
    var row = null;
    t.rows.forEach(function (r) { if (r.id === gameId) row = r; });
    if (!row || !row.played) return null;
    var one = t.others.length === 1 ? pretty(t.others[0].n) : null;
    if (!row.them.length) {
      return { flat: one ? one + " has not played this one yet." : "No one else has played this one yet.", strong: "" };
    }
    if (row.match) {
      var same = row.them.filter(function (x) { return x.same; }).length;
      if (one) return { flat: "", strong: same ? one + " made your call." : one + " chose differently." };
      return { flat: "", strong: same + " of " + row.them.length + " made your call." };
    }
    if (one) {
      if (row.state === "won") return { flat: "", strong: "You were closer than " + one + "." };
      if (row.state === "lost") return { flat: "", strong: one + " was closer." };
      return { flat: "", strong: "A tie with " + one + "." };
    }
    if (row.lostTo === 0 && row.tied === 0) return { flat: "", strong: "You were closest." };
    if (row.beat === 0 && row.tied === 0) return { flat: "", strong: "All " + row.lostTo + " were closer." };
    return { flat: "", strong: "Closer than " + row.beat + " of " + row.them.length + "." };
  }
  function tallyWords(t) {
    if (!t.live) return "";
    if (t.others.length === 1) {
      return "Today: you " + t.you + " – " + t.scores[t.others[0].n] + " " + pretty(t.others[0].n) +
        (t.ties ? " · " + t.ties + (t.ties === 1 ? " tie" : " ties") : "");
    }
    return "Today: " + standings(t).map(function (r) {
      return (r.you ? "you" : pretty(r.n)) + " " + r.v;
    }).join(" · ");
  }

  /* ---------------- little pieces of page ---------------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  var MARK = '<svg class="duel-dots" viewBox="0 0 34 10" aria-hidden="true" focusable="false">' +
    '<circle cx="5" cy="5" r="4" fill="#2D4FC4"/><circle cx="17" cy="5" r="4" fill="#CF4327"/>' +
    '<circle cx="29" cy="5" r="4" fill="#0D7D73"/></svg>';

  /* The card, in miniature, built from the same numbers as the picture that gets shared, so that
     "this is what your friend sees" is true. */
  function mini(t) {
    var box = el("div", "duel-mini");
    box.setAttribute("role", "img");
    var top = el("div", "duel-mini-top");
    top.insertAdjacentHTML("afterbegin", MARK);
    top.appendChild(el("span", "duel-mini-word", "Logicers"));
    top.appendChild(el("span", "duel-mini-date", dateWords(t.key)));
    box.appendChild(top);
    box.appendChild(el("p", "duel-mini-head", headline(t)));
    if (!t.live) {
      box.appendChild(el("p", "duel-mini-sub", "I played " + countOf(t.mine) + " of " + TO.GAMES.length + " today."));
    } else if (t.others.length > 1) {
      var ol = el("ul", "duel-mini-list");
      standings(t).forEach(function (r) {
        var li = el("li", r.you ? "you" : "");
        li.appendChild(el("span", "", r.you ? "You" : pretty(r.n)));
        li.appendChild(el("b", "", String(r.v)));
        ol.appendChild(li);
      });
      box.appendChild(ol);
    }
    var marks = el("div", "duel-mini-marks");
    marks.setAttribute("aria-hidden", "true");
    t.rows.forEach(function (r) {
      var i = el("i", "s-" + (t.live ? r.state : (r.played ? "won" : "none")));
      i.setAttribute("data-g", r.key);
      /* the colour is set here, from the same list the drawn card uses, and not left to the
         stylesheet: the card is always dark, so a mark must always wear the night colour, or the
         miniature and the picture would not match and "this is what your friend sees" would be false */
      if (DOT[r.key]) i.style.setProperty("--c", DOT[r.key]);
      marks.appendChild(i);
    });
    box.appendChild(marks);
    if (t.live) {                        // the same legend the drawn card carries, so the two really match
      var key = el("p", "duel-mini-key");
      [["won", "you"], ["lost", "them"], ["tie", "a tie"]].forEach(function (b) {
        var sp = el("span", "");
        sp.appendChild(el("i", "s-" + b[0]));
        sp.appendChild(document.createTextNode(b[1]));
        key.appendChild(sp);
      });
      box.appendChild(key);
    }
    box.appendChild(el("p", "duel-mini-foot", TO.address() || "logicers.com"));
    box.setAttribute("aria-label", headline(t) + ". " + tallyWords(t));
    return box;
  }

  /* ---------------- the picture that gets shared ---------------- */
  var shot = null;                       // { blob, url, layout } of the last card drawn
  function roundRect(x, a, b, w, h, rad) {
    x.beginPath();
    x.moveTo(a + rad, b);
    x.arcTo(a + w, b, a + w, b + h, rad);
    x.arcTo(a + w, b + h, a, b + h, rad);
    x.arcTo(a, b + h, a, b, rad);
    x.arcTo(a, b, a + w, b, rad);
  }
  function drawCard(t) {
    var W = 1080, H = 1350, MG = 80, INK = "#0E1020";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + F;
    var fits = true;
    x.fillStyle = INK; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 80, 40, W / 2, 80, 1200);
    glow.addColorStop(0, "rgba(127, 165, 255, .16)"); glow.addColorStop(1, "rgba(0, 0, 0, .25)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.lineWidth = 3; x.strokeStyle = "rgba(255, 255, 255, .18)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke();
    x.textBaseline = "alphabetic";

    /* the wordmark, with the three dots */
    [["#2D4FC4", 0], ["#CF4327", 30], ["#0D7D73", 60]].forEach(function (d) {
      x.fillStyle = d[0]; x.beginPath(); x.arc(MG + 11 + d[1], 108, 11, 0, 6.2832); x.fill();
    });
    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 46px " + FD;
    x.fillText("Logicers", MG + 92, 122);
    x.textAlign = "right"; x.font = "600 36px " + F;
    x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText(dateWords(t.key), W - MG, 122);

    /* the headline */
    x.textAlign = "center"; x.fillStyle = "#fff";
    var head = headline(t), hs = 118;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head).width > W - 2 * MG && hs > 44) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    if (hs <= 44 && x.measureText(head).width > W - 2 * MG) fits = false;
    x.fillText(head, W / 2, 360);

    /* Everything between the headline and the invitation at the foot: a line for a day with no
       opponent yet, or the standings when the table is bigger than two. The marks then follow at a
       fixed distance, so the card never has a hole in the middle of it. */
    var y = 450, my;
    if (!t.live) {
      x.font = "600 44px " + F; x.fillStyle = "rgba(255, 255, 255, .80)";
      x.fillText("I played " + countOf(t.mine) + " of " + TO.GAMES.length + " today.", W / 2, y);
      my = 700;
    } else if (t.others.length > 1) {
      var rows = standings(t);
      var step = rows.length > 5 ? 56 : 66, fs = rows.length > 5 ? 38 : 44;
      rows.forEach(function (r) {
        var nm = r.you ? "You" : pretty(r.n);
        x.font = (r.you ? "800 " : "600 ") + fs + "px " + F;
        x.textAlign = "left"; x.fillStyle = r.you ? "#fff" : "rgba(255, 255, 255, .78)";
        var room = W - 2 * MG - 160, ns = fs;
        while (x.measureText(nm).width > room && ns > 26) { ns -= 2; x.font = (r.you ? "800 " : "600 ") + ns + "px " + F; }
        x.fillText(nm, MG + 40, y);
        x.font = (r.you ? "800 " : "600 ") + fs + "px " + F;
        x.textAlign = "right";
        x.fillText(String(r.v), W - MG - 40, y);
        y += step;
      });
      x.textAlign = "center";
      my = y + 56;
    } else {
      if (t.ties) {
        x.font = "600 42px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
        x.fillText("and " + t.ties + (t.ties === 1 ? " tie" : " ties"), W / 2, y);
      }
      my = 700;
    }
    if (my > 1020) { my = 1020; fits = false; }

    /* one mark per game, in that game's own colour: filled when you were closer, a ring when your
       friend was, a bar for a tie, faint when nobody played it. Nothing of any puzzle is on it. */
    var n = t.rows.length, gap = 86, startX = W / 2 - ((n - 1) * gap) / 2;
    t.rows.forEach(function (r, i) {
      var cx = startX + i * gap, col = DOT[r.key] || "#7FA5FF";
      var state = t.live ? r.state : (r.played ? "won" : "none");
      x.lineWidth = 5;
      if (state === "won") {
        x.fillStyle = col; x.beginPath(); x.arc(cx, my, 26, 0, 6.2832); x.fill();
      } else if (state === "lost") {
        x.strokeStyle = col; x.beginPath(); x.arc(cx, my, 24, 0, 6.2832); x.stroke();
      } else if (state === "tie" || state === "match" || state === "mixed") {
        x.strokeStyle = col; x.beginPath(); x.arc(cx, my, 24, 0, 6.2832); x.stroke();
        x.fillStyle = col; roundRect(x, cx - 15, my - 5, 30, 10, 5); x.fill();
      } else {                                        // nobody has played it: a small faint dot, not a ring,
        x.fillStyle = "rgba(255, 255, 255, .26)";     // so it can never be mistaken for "they were closer"
        x.beginPath(); x.arc(cx, my, 9, 0, 6.2832); x.fill();
      }
    });

    /* A legend, so the card explains its own marks to someone who has never seen one. It is drawn
       only when there is room for it, which a big table may not leave. */
    var legend = my + 104 <= 1080 && t.live;
    if (legend) {
      var ly = my + 104, bits = [["won", "you"], ["lost", "them"], ["tie", "a tie"]];
      x.font = "600 30px " + F;
      var wide = bits.reduce(function (a, b) { return a + 40 + x.measureText(b[1]).width + 34; }, 0) - 34;
      var lx = W / 2 - wide / 2;
      bits.forEach(function (b) {
        x.lineWidth = 4; x.strokeStyle = "rgba(255, 255, 255, .62)"; x.fillStyle = "rgba(255, 255, 255, .62)";
        if (b[0] === "won") { x.beginPath(); x.arc(lx + 13, ly - 10, 13, 0, 6.2832); x.fill(); }
        else {
          x.beginPath(); x.arc(lx + 13, ly - 10, 12, 0, 6.2832); x.stroke();
          if (b[0] === "tie") { roundRect(x, lx + 5, ly - 13, 16, 6, 3); x.fill(); }
        }
        x.textAlign = "left"; x.fillStyle = "rgba(255, 255, 255, .62)";
        x.fillText(b[1], lx + 40, ly);
        lx += 40 + x.measureText(b[1]).width + 34;
      });
      x.textAlign = "center";
    }

    /* the invitation, plain: no "you've won", no countdown, no urgency */
    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 64px " + FD;
    x.fillText(t.live ? "Who was closer?" : "Same games, same day.", W / 2, 1182);
    var where = TO.address() || "logicers.com";
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText("Play at " + where, W / 2, 1254);

    shot = { fits: fits, head: head, marks: t.rows.map(function (r) { return t.live ? r.state : (r.played ? "won" : "none"); }),
             words: [head, t.live ? "Who was closer?" : "Same games, same day.", "Play at " + where, dateWords(t.key)],
             dotY: my, legend: legend, rows: t.live && t.others.length > 1 ? standings(t).length : 0 };
    return c;
  }
  window.LogicersDuelCard = function () { return shot; };      // read by r/site-workshop/checks/t_duel.py

  var blob = null, blobUrl = null;
  function prepare(t) {
    function make() {
      try {
        drawCard(t).toBlob(function (b) {
          if (!b) return;
          blob = b;
          if (blobUrl) window.URL.revokeObjectURL(blobUrl);
          blobUrl = window.URL.createObjectURL(b);
        }, "image/png");
      } catch (e) { blob = null; }
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 118px "Bricolage Grotesque"'),
                   document.fonts.load('600 44px "Figtree"')]).then(make, make);
    } else make();
  }

  /* ---------------- sending ---------------- */
  function send(key, onFallback) {
    key = key || todayKey();
    var t = table(key);
    TO.count("duel/share");
    prepare(t);
    var text = message(key);
    window.setTimeout(function () {
      TO.share({ blob: blob, filename: "logicers-" + key + ".png", text: text }).then(function (how) {
        if (how === "fallback" && typeof onFallback === "function") onFallback(text, blobUrl);
      });
    }, 60);
  }

  /* ---------------- the block at every reveal ---------------- */
  /* Loud here, quiet everywhere else (Khayyam's requirement 2): the offer stands where the player
     has just felt something. It is added by the frame's way onward, so no game script changes. */
  function block(after, o) {
    var old = document.getElementById("duel");
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var liveDay = !o.practice && (!o.day || !o.today || o.day === o.today);
    var key = todayKey();
    var t = table(key);
    if (!countOf(t.mine) && !t.live) return null;        // nothing of today to send and no one to answer

    var box = el("section", "duel");
    box.id = "duel";
    box.setAttribute("aria-label", "Who Was Closer");

    if (t.live && liveDay && o.game) {
      var said = lineFor(t, o.game);
      if (said) {
        var p = el("p", "duel-line");
        if (said.flat) p.appendChild(document.createTextNode(said.flat));
        if (said.strong) p.appendChild(el("b", "", said.strong));
        box.appendChild(p);
      }
      box.appendChild(el("p", "duel-tally", tallyWords(t)));
    } else if (!t.live) {
      box.appendChild(el("p", "duel-tally", "Send one link and a friend plays the same day."));
    }

    var fig = el("figure", "duel-figure");
    fig.appendChild(mini(t));
    fig.appendChild(el("figcaption", "duel-say", "This is what your friend sees."));
    box.appendChild(fig);

    var acts = el("div", "duel-acts");
    var go = el("button", "duel-send", t.live ? "Send my day again" : "Send my day");
    go.type = "button";
    acts.appendChild(go);
    var what = el("a", "duel-what", "What is this?");
    what.href = base();
    acts.appendChild(what);
    box.appendChild(acts);

    var note = el("p", "duel-note");
    note.hidden = true;
    box.appendChild(note);

    go.addEventListener("click", function () {
      send(key, function (text) {
        TO.copyText(text).then(function (ok) {
          note.textContent = ok ? "Copied. Paste it into a chat." : "Copying did not work here. The link is: " + link(key);
          note.hidden = false;
        });
      });
    });

    after.appendChild(box);
    return box;
  }
  TO.duelHook = block;

  /* ---------------- one line in every game's help sheet ---------------- */
  /* Quiet, and in one place: it is put in beside the privacy line, which every help sheet has.
     No game's own page is edited for it. */
  function helpLine() {
    var anchor = document.querySelector("dialog [data-privacy]");
    if (!anchor || document.getElementById("duel-help")) return;
    var host = anchor.parentNode;
    if (!host) return;
    var h = document.createElement("h3");
    h.id = "duel-help";
    h.textContent = "Who Was Closer";
    var p = el("p", "quiet");
    p.appendChild(document.createTextNode("Send one link from the end of any game and a friend plays the same day. " +
      "After each game you both see who was closer. No login, nothing to install: the scores ride inside the link " +
      "itself and never reach a server. "));
    var a = document.createElement("a");
    a.href = base();
    a.textContent = "See what your friend sees";
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
    var before = anchor.previousElementSibling && anchor.previousElementSibling.nodeName === "H3"
      ? anchor.previousElementSibling : anchor;
    host.insertBefore(h, before);
    host.insertBefore(p, before);
  }

  /* ---------------- a worked example ----------------
     The duel page shows the card before a player has a duel of their own, so that "this is what
     your friend sees" can be shown rather than described (Khayyam's requirement 2). The numbers are
     invented and the page says so; no real day is read. */
  function example() {
    /* 4 won, 3 lost, 1 tie, 1 that is never a win (Your Call) and 1 nobody played: the marks and the
       numbers on the example must add up, or a careful reader catches the card lying about itself. */
    var state = ["won", "lost", "won", "match", "won", "lost", "won", "tie", "lost", "none"];
    var t = { key: todayKey(), shift: 0, me: "copper-llama", mine: {}, live: true,
              others: [{ n: "sandy-otter", s: {} }], rows: [], you: 4, ties: 1, lost: 3, scores: { "sandy-otter": 3 } };
    TO.GAMES.forEach(function (G, i) {
      var st = state[i] || "none";
      t.rows.push({ id: G.id, key: G.key, name: G.name, match: G.wins === "match",
                    played: st !== "none", them: st === "none" ? [] : [{ n: "sandy-otter", cmp: 0, same: true }],
                    state: st });
      if (st !== "none") t.mine[G.key] = 0;
    });
    return t;
  }

  window.Duel = {
    me: me, roll: roll, pretty: pretty, nickOk: nickOk,
    keyOf: keyOf, dateOf: dateOf, todayKey: todayKey, dayShift: dayShift, dateWords: dateWords,
    dayFor: dayFor, mine: mine, countOf: countOf,
    payload: payload, link: link, linkFor: linkFor, message: message, base: base,
    read: read, merge: merge, take: take, players: players,
    table: table, headline: headline, standings: standings, lineFor: lineFor, tallyWords: tallyWords,
    mini: mini, example: example, drawCard: drawCard, prepare: prepare, send: send, block: block,
    MAXP: MAXP, DOT: DOT, WORDS: [WORD1, WORD2]
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", helpLine);
  else helpLine();
})();
