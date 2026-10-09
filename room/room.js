/* The room page: where a room's link lands, where a room is made, and where its table lives.
   Joining is one tap (plus the name window, once, the same one the duel built). The table shows
   today and the month; Leave deletes everything of yours at once, and the maker can delete the
   whole room. If the server cannot be reached the page says so and nothing breaks.
   Why each decision was taken: r/rooms-workshop/design.txt on the Mac. */
(function () {
  "use strict";
  var TO = window.TurnsOut, D = window.Duel, R = window.Rooms;
  if (!TO || !D || !R) return;
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  TO.wireDialogs();
  TO.fixLocalLinks();
  TO.count("room/page");

  var head = $("rm-head"), lede = $("rm-lede"), state = $("rm-state"), note = $("rm-note");
  var paneJoin = $("rm-join"), paneMake = $("rm-make"), paneTable = $("rm-table"), paneSwitch = $("rm-switch");
  $("rm-date").textContent = D.dateWords(D.todayKey());

  function say(t) { state.textContent = t || ""; }
  function tell(t) { note.textContent = t || ""; note.hidden = !t; }
  function show(pane) {
    [paneJoin, paneMake, paneTable].forEach(function (p) { p.hidden = p !== pane; });
    if (!pane) [paneJoin, paneMake, paneTable].forEach(function (p) { p.hidden = true; });
  }

  /* ---------------- months and words ---------------- */
  var MONTHS = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
  function monthOf(key) { return String(key).slice(0, 6); }
  function monthWords(mon) { return MONTHS[+mon.slice(4, 6) - 1] + " " + mon.slice(0, 4); }
  function prevMonth(mon) {
    var y = +mon.slice(0, 4), m = +mon.slice(4, 6) - 1;
    if (m < 1) { m = 12; y--; }
    return String(y) + (m < 10 ? "0" : "") + m;
  }
  function lastDayOf(mon) {              // a real day inside that month, for asking the server
    var n = new Date(+mon.slice(0, 4), +mon.slice(4, 6), 0).getDate();
    return mon + (n < 10 ? "0" : "") + n;
  }
  var thisMon = monthOf(D.todayKey());

  /* ---------------- which room this page is about ---------------- */
  function hashCode() {
    /* 10 letters since the second round; every 20-letter link from the first keeps working */
    var m = /[#&]r=([23456789abcdefghjkmnpqrstvwxyz]{10}(?:[23456789abcdefghjkmnpqrstvwxyz]{10})?)\b/.exec(window.location.hash || "");
    return m ? m[1] : null;
  }
  function known(code) {
    var hit = null;
    R.myRooms().forEach(function (x) { if (x.code === code) hit = x; });
    return hit;
  }
  function remember(code, label) {
    TO.roomsUpdate(function (st) {
      if (!st.list.some(function (x) { return x && x.code === code; })) st.list.push({ code: code, label: label });
    });
  }

  /* ---------------- the states of the page ---------------- */
  function start() {
    if (!R.on()) {
      head.textContent = "Rooms are not open yet";
      lede.textContent = "A room is 2 to 50 friends playing the same daily games, with today's table and the month's. This part of the site is still being switched on.";
      say("Come back soon — the daily games themselves are all open.");
      show(null);
      return;
    }
    var code = hashCode();
    if (code && !known(code)) { landing(code); return; }
    if (code && known(code)) { table(known(code)); return; }
    if (R.myRooms().length) { table(R.myRooms()[0]); return; }
    fresh();
  }

  function fresh(keepWords) {            // no room yet: the page that makes one
    if (!keepWords) { head.textContent = "Play with your friends"; say(""); }
    show(paneMake);
    $("rm-make-go").onclick = function () {
      if (!D.named()) { D.askName(function () { fresh(); make(); }, "Save"); return; }
      make();
    };
  }
  function make() {
    say("Making the room…");
    R.call("make", { tok: R.token(), name: D.me() }).then(function (r) {
      if (r.status !== 200) { say(""); tell(oops(r)); return; }
      remember(r.data.code, "Your room");
      TO.count("room/made");
      table(known(r.data.code), true);
    }, function () { say(""); tell(oops(null)); });
  }

  function landing(code) {               // a friend's link, not joined yet
    say("Looking at the room…");
    show(null);
    R.call("peek", { code: code }).then(function (r) {
      say("");
      if (r.status === 404) {
        head.textContent = "That room is gone";
        lede.textContent = "Rooms that nobody plays in are deleted after 60 days, and a room's maker can delete it at any time.";
        if (R.myRooms().length) { table(R.myRooms()[0]); } else { fresh(true); }
        return;
      }
      if (r.status !== 200) { tell(oops(r)); fresh(); return; }
      var who = r.data.names || [], count = r.data.count || 0;
      var label = (r.data.makerName ? r.data.makerName + "'s room" : "A room");
      head.textContent = "You are invited to " + label;
      lede.textContent = "Join, and every daily game you finish counts on this room's table.";
      var box = $("rm-who");
      box.textContent = "";
      var line = who.slice(0, 4).join(", ");
      if (count > 4) line += " and " + (count - 4) + " more";
      box.appendChild(pair("Already in", count ? line : "nobody yet"));
      box.appendChild(pair("Since", D.dateWords(r.data.made) || ""));
      show(paneJoin);
      $("rm-join-go").onclick = function () { join(code, label); };
    }, function () { say(""); tell(oops(null)); });
  }
  function pair(k, v) {
    var p = el("p", "d-pair");
    p.appendChild(el("span", "d-pair-k", k));
    p.appendChild(el("span", "d-pair-v", v));
    return p;
  }

  function join(code, label) {
    if (!D.named()) { D.askName(function () { join(code, label); }, "Save"); return; }
    say("Joining…");
    R.call("join", { code: code, tok: R.token(), name: D.me() }).then(function (r) {
      say("");
      if (r.status === 200) {
        remember(code, label);
        TO.count("room/joined");
        tell("");
        table(known(code));
        R.flush(D.todayKey(), null);     // today's games, if any are already played, join the table at once
        return;
      }
      if (r.data && r.data.err === "name-taken") {
        tell("Someone in this room is already called " + D.me() + ". Pick another name and join again.");
        D.askName(function () { tell(""); join(code, label); }, "Save");
        return;
      }
      if (r.data && r.data.err === "full") { tell("This room is full: 50 is as many as one room holds."); return; }
      if (r.status === 404) { tell("That room is gone."); return; }
      tell(oops(r));
    }, function () { say(""); tell(oops(null)); });
  }

  function oops(r) {
    if (r && r.status === 429) return "The server is busy. Try again in a little while.";
    return "The server cannot be reached right now. Your games all work as always; the room comes back when it can.";
  }

  /* ---------------- the table ---------------- */
  var showing = null;                    // { room, mon }
  function switcher(current) {
    var rooms = R.myRooms();
    paneSwitch.hidden = rooms.length < 2;
    paneSwitch.textContent = "";
    if (rooms.length < 2) return;
    rooms.forEach(function (room) {
      var b = el("button", "rm-chip" + (room.code === current.code ? " on" : ""), room.label || "A room");
      b.type = "button";
      b.setAttribute("aria-pressed", room.code === current.code ? "true" : "false");
      b.onclick = function () { table(room); };
      paneSwitch.appendChild(b);
    });
  }

  function table(room, justMade, mon) {
    mon = mon || thisMon;
    showing = { room: room, mon: mon };
    head.textContent = room.label === "Your room" || !room.label ? "Your room" : room.label;
    lede.textContent = "Today's board and the month's table. Each daily game you finish joins them by itself.";
    switcher(room);
    show(paneTable);
    say("Fetching the table…");
    var day = mon === thisMon ? D.todayKey() : lastDayOf(mon);
    /* Today's finished games go up BEFORE the table is read, every time. Making a room (or just
       opening the page) used to send nothing, so games played earlier in the day were missing and
       a friend could stand alone on a game and take nothing. A resend is free: the first result
       always stands. (The Alyosha fix, 9 Oct 2026.) */
    if (mon === thisMon && D.named()) { R.flush(D.todayKey(), function () { fetchTable(); }); return; }
    fetchTable();
    function fetchTable() {
    R.call("view", { code: room.code, tok: R.token(), day: day }).then(function (r) {
      say("");
      if (r.status === 404) { tell("That room is gone."); R.forget(room.code); fresh(); return; }
      if (r.status === 403) { tell("You are no longer in this room."); R.forget(room.code); fresh(); return; }
      if (r.status !== 200) { paneTable.textContent = ""; say(oops(r)); return; }
      if (room.label === "Your room" && !r.data.maker) {       // an older label put right
        room.label = (r.data.standings[0] ? r.data.standings[0].name + "'s room" : room.label);
      }
      draw(room, r.data, mon, !!justMade);
    }, function () { say(""); paneTable.textContent = ""; say(oops(null)); });
    }
  }

  function draw(room, data, mon, justMade) {
    paneTable.textContent = "";
    var today = mon === thisMon;

    if (justMade) {
      var made = el("div", "rm-made");
      made.appendChild(el("p", "rm-made-h", "The room is made."));
      made.appendChild(el("p", "rm-made-p", "Send its link to your friends: whoever opens it is in. Without the link, nobody can find the room."));
      paneTable.appendChild(made);
    }

    /* the link, always one tap away */
    var share = el("div", "rm-share");
    var sgo = el("button", "rm-big", justMade ? "Send the room's link" : "Invite a friend: send the link");
    sgo.type = "button";
    share.appendChild(sgo);
    var snote = el("p", "quiet rm-small");
    snote.hidden = true;
    share.appendChild(snote);
    paneTable.appendChild(share);
    sgo.onclick = function () {
      var link = roomLink(room.code);
      var text = R.invite(room.code);
      var nav = window.navigator;
      if (nav.share) { nav.share({ text: text }).catch(function () { /* closed */ }); return; }
      TO.copyText(text).then(function (ok) {
        snote.textContent = ok ? "Copied. Paste it into your group chat." : "Copying did not work here. The link is: " + link;
        snote.hidden = false;
      });
    };

    /* today: the board — one row per friend, one column per game; a filled dot played, an
       empty one not yet, a crown on who took it. No sentences (the second round). At 40 the
       board scrolls and the header and your own row stay in view. */
    if (today) {
      var t = el("section", "rm-sec");
      var th = el("div", "rm-mh");
      th.appendChild(el("h2", "rm-h", "Today"));
      if (data.streak > 1) {
        var fl = el("span", "rm-streak", "🔥 " + data.streak + " days");
        fl.title = "The whole room has played " + data.streak + " days in a row";
        th.appendChild(fl);
      }
      t.appendChild(th);

      var names = data.standings.map(function (x) { return x.name; });
      var book = R.faces(names);
      var byName = {};
      data.today.points.forEach(function (p) { byName[R.foldN(p.name)] = p; });
      var reacted = {};
      (data.today.reactions || []).forEach(function (x) { reacted[R.foldN(x.name)] = x.r; });
      var anyPlayed = data.today.points.some(function (p) { return p.sent > 0; });

      if (!anyPlayed) {
        t.appendChild(el("p", "rm-quiet-line", "Nobody has played yet today. The games are a tap away below."));
      } else {
        var wrap = el("div", "rm-board-wrap" + (data.count > 12 ? " tall" : ""));
        var board = el("div", "rm-board");
        board.setAttribute("role", "table");
        board.setAttribute("aria-label", "Who has played which game today");
        var hr = el("div", "rm-brow rm-bhead");
        hr.setAttribute("role", "row");
        hr.appendChild(el("span", "rm-bwho", ""));
        data.today.games.forEach(function (g) {
          var G = null;
          TO.GAMES.forEach(function (x) { if (x.key === g.key) G = x; });
          var c = el("i", "rm-bdot");
          c.setAttribute("data-g", g.key);
          c.title = G ? G.name : g.key;
          hr.appendChild(c);
        });
        hr.appendChild(el("span", "rm-bend", ""));
        board.appendChild(hr);

        var small = data.count <= 10;        // the name beside the face where there is room
        data.standings.forEach(function (x) {
          var f = R.foldN(x.name);
          var p = byName[f] || { sent: 0, streak: 0 };
          var row = el("div", "rm-brow" + (x.you ? " you" : ""));
          row.setAttribute("role", "row");
          var who = el("span", "rm-bwho");
          who.appendChild(R.faceEl(x.name, book));
          if (small) who.appendChild(el("span", "rm-bname", x.you ? x.name + " (you)" : x.name));
          if (p.streak > 1) {
            var flame = el("i", "rm-flame", "🔥" + p.streak);
            flame.title = x.name + " has played " + p.streak + " days in a row";
            who.appendChild(flame);
          }
          if (reacted[f]) who.appendChild(el("i", "rm-react-chip", reacted[f]));
          row.appendChild(who);
          var playedSet = {};
          data.today.games.forEach(function (g) {
            (g.who || []).forEach(function (n) { if (R.foldN(n) === f) playedSet[g.key] = true; });
          });
          data.today.games.forEach(function (g) {
            var cell;
            if (g.took && R.foldN(g.took) === f) { cell = el("i", "rm-cell crown", "👑"); }
            else cell = el("i", "rm-cell" + (playedSet[g.key] ? " on" : ""));
            cell.setAttribute("data-g", g.key);
            row.appendChild(cell);
          });
          var end = el("span", "rm-bend");
          if (!p.sent && !x.you) {
            var poke = el("button", "rm-poke", "👉");
            poke.type = "button";
            poke.title = "Poke " + x.name;
            poke.setAttribute("aria-label", "Poke " + x.name + ", who has not played today");
            poke.onclick = function () { pokeOne(room, x.name); };
            end.appendChild(poke);
          }
          row.appendChild(end);
          board.appendChild(row);
        });
        wrap.appendChild(board);
        t.appendChild(wrap);

        /* one tap says how today felt: the same tap takes it back */
        var mineReact = null;
        (data.today.reactions || []).forEach(function (x) { if (x.you) mineReact = x.r; });
        var rr = el("div", "rm-reacts");
        rr.setAttribute("role", "group");
        rr.setAttribute("aria-label", "Your reaction to today's board");
        ["🔥", "😂", "😮", "🙈"].forEach(function (emo) {
          var b = el("button", "rm-react" + (mineReact === emo ? " on" : ""), emo);
          b.type = "button";
          b.setAttribute("aria-pressed", mineReact === emo ? "true" : "false");
          b.onclick = function () {
            R.call("react", { code: room.code, tok: R.token(), day: D.todayKey(), r: mineReact === emo ? "" : emo })
              .then(function (res) { if (res.status === 200) table(room, false, mon); else tell(oops(res)); },
                    function () { tell(oops(null)); });
          };
          rr.appendChild(b);
        });
        t.appendChild(rr);
      }
      if (data.today.notPlayed.length) {
        var np = data.today.notPlayed;
        var words = np.length <= 10 ? np.join(", ") : String(np.length) + " of you";
        t.appendChild(el("p", "rm-quiet-line", "Not played yet: " + words + "."));
      }
      /* the day's recap card: offered from the evening, never pushed, never an answer */
      if (anyPlayed && new Date().getHours() >= 17) {
        var rec = el("button", "rm-quiet rm-recap", "Share today's recap");
        rec.type = "button";
        var rnote = el("p", "quiet rm-small");
        rnote.hidden = true;
        rec.onclick = function () { shareDay(room, data, rnote); };
        t.appendChild(rec);
        t.appendChild(rnote);
      }
      paneTable.appendChild(t);
    }

    /* the month */
    var m = el("section", "rm-sec");
    var mh = el("div", "rm-mh");
    mh.appendChild(el("h2", "rm-h", monthWords(mon)));
    var flip = el("button", "rm-flip", today ? "Last month" : "This month");
    flip.type = "button";
    flip.onclick = function () { table(room, false, today ? prevMonth(mon) : thisMon); };
    mh.appendChild(flip);
    m.appendChild(mh);

    /* the week, Monday to Sunday, beside the month (the second round) */
    if (today && (data.week || data.lastWeek)) {
      var wd = new Date().getDay();              // 0 Sunday ... 6 Saturday
      if (data.week) {
        var youLead = data.week.name === data.you && !data.week.tie;
        var wline = data.week.tie ? "This week: a tie at the top with " + data.week.pts + "."
          : "This week: " + (youLead ? "you lead" : data.week.name + " leads") + " with " + data.week.pts + ".";
        if (wd === 0) wline += " The week ends tonight.";
        m.appendChild(el("p", "rm-week", wline));
      }
      if (data.lastWeek && wd === 1) {
        m.appendChild(el("p", "rm-week rm-week-last", "Last week: " +
          (data.lastWeek.tie ? "a tie at the top" : (data.lastWeek.name === data.you ? "you took it" : data.lastWeek.name + " took it")) +
          " (" + data.lastWeek.pts + ")."));
      }
    }

    var rows = data.standings || [];
    var any = rows.some(function (x) { return x.pts > 0 || x.days > 0; });
    if (!any) {
      m.appendChild(el("p", "rm-quiet-line", today
        ? "The month's table fills as the room plays. A game is taken by whoever was strictly closest that day."
        : "Nothing was played in " + monthWords(mon) + "."));
    } else {
      var list = el("ol", "rm-stand");
      var youAt = -1;
      rows.forEach(function (x, i) { if (x.you) youAt = i; });
      var fold = rows.length > 8;
      var MEDALS = ["🥇", "🥈", "🥉"];
      var active = rows.filter(function (x) { return x.days > 0; });
      /* the bottom three get a gentle joke only once the month has a real field (six playing),
         and the label rotates by the day, so nobody carries the same one twice running */
      var joked = {};
      if (active.length >= 6) active.slice(-3).forEach(function (x) { joked[x.name] = jokeFor(x.name); });
      rows.forEach(function (x, i) {
        var li = el("li", x.you ? "you" : "");
        if (fold && i >= 5 && i !== youAt) li.className += " folded";
        var rank = el("span", "rm-rank", i < 3 && x.pts > 0 ? MEDALS[i] : String(i + 1));
        li.appendChild(rank);
        var nm = el("span", "rm-name", x.you ? x.name + " (you)" : x.name);
        if (joked[x.name]) {
          var j = el("i", "rm-joke", " " + joked[x.name][0]);
          j.title = joked[x.name][1];
          j.setAttribute("aria-label", joked[x.name][1]);
          nm.appendChild(j);
        }
        li.appendChild(nm);
        li.appendChild(el("span", "rm-days", x.days + (x.days === 1 ? " day" : " days")));
        li.appendChild(el("b", "rm-pts", String(x.pts)));
        list.appendChild(li);
      });
      m.appendChild(list);
      if (fold) {
        var more = el("button", "rm-flip rm-more", "See all " + rows.length);
        more.type = "button";
        more.onclick = function () {
          list.classList.add("open");
          more.hidden = true;
        };
        m.appendChild(more);
      }
      var card = el("button", "rm-big rm-card-go", "Share the month");
      card.type = "button";
      var cnote = el("p", "quiet rm-small");
      cnote.hidden = true;
      card.onclick = function () { shareMonth(room, rows, mon, cnote); };
      m.appendChild(card);
      m.appendChild(cnote);
    }
    paneTable.appendChild(m);

    /* into the games */
    if (today) {
      var next = null;
      TO.GAMES.forEach(function (G) { if (!next && !TO.playedToday(G)) next = G; });
      var go = el("a", "d-go rm-go");
      go.href = TO.here(next ? "../" + next.href : "../");
      go.setAttribute("data-g", next ? next.key : "room");
      var tx = el("span", "d-go-text");
      tx.appendChild(el("span", "d-go-kicker", next ? "Play for the table" : "All played today"));
      tx.appendChild(el("span", "d-go-name", next ? next.name : "See the games"));
      go.appendChild(tx);
      go.insertAdjacentHTML("beforeend",
        '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      paneTable.appendChild(go);
    }

    /* who you are, and the two ways out */
    var who = el("p", "duel-who rm-who-line");
    who.appendChild(document.createTextNode("This table sees you as "));
    var whoName = el("b", "", data.you);
    who.appendChild(whoName);
    who.appendChild(document.createTextNode(" "));
    var rename = el("button", "duel-rename", "Change");
    rename.type = "button";
    rename.onclick = function () {
      D.askName(function () {
        R.flush(D.todayKey(), function () { table(room, false, mon); });   // the new name travels with the next send
      }, "Save");
    };
    who.appendChild(rename);
    paneTable.appendChild(who);

    var outs = el("div", "rm-outs");
    var leave = el("button", "rm-quiet", "Leave the room");
    leave.type = "button";
    leave.onclick = function () {
      sure("Leaving deletes you and every score of yours from this room, at once. The others keep their table.", function () {
        R.call("leave", { code: room.code, tok: R.token() }).then(done, function () { tell(oops(null)); });
        function done() { R.forget(room.code); tell("You left the room, and everything of yours in it was deleted."); start(); }
      });
    };
    outs.appendChild(leave);
    if (data.maker) {
      var wipe = el("button", "rm-quiet rm-danger-link", "Delete the whole room");
      wipe.type = "button";
      wipe.onclick = function () {
        sure("This deletes the room for all " + data.count + " of you — every member and every score, at once. Nobody can bring it back.", function () {
          R.call("wipe", { code: room.code, tok: R.token() }).then(done, function () { tell(oops(null)); });
          function done() { R.forget(room.code); tell("The room was deleted, with everything in it."); start(); }
        });
      };
      outs.appendChild(wipe);
    }
    paneTable.appendChild(outs);
  }

  function sure(words, go) {
    var dlg = $("dlg-sure");
    $("sure-words").textContent = words;
    $("sure-go").onclick = function () { TO.closeDialog(dlg); go(); };
    TO.openDialog(dlg);
  }

  function roomLink(code) { return R.link(code); }   // short since the second round: /r/#Name-code

  /* ---------------- the poke ---------------- */
  /* One tap makes the message; the friends do the reminding, the site sends nothing by itself. */
  function pokeOne(room, name) {
    TO.count("room/poke");
    var text = name + ", the room is waiting 👀 " + roomLink(room.code);
    var nav = window.navigator;
    if (nav.share) { nav.share({ text: text }).catch(function () { /* closed */ }); return; }
    TO.copyText(text).then(function (okd) {
      tell(okd ? "Copied. Paste it to " + name + "." : "Copying did not work here. The message is: " + text);
    });
  }

  /* the gentle jokes of the month's foot, rotated by the day so nobody carries one twice running */
  var JOKES = [["🐢", "slow and steady"], ["🛌", "still waking up"], ["🌱", "just getting started"]];
  function jokeFor(name) {
    var h = 5381, f = R.foldN(name);
    for (var i = 0; i < f.length; i++) h = ((h * 33) ^ f.charCodeAt(i)) >>> 0;
    return JOKES[(h + Math.floor(Date.now() / 86400000)) % 3];
  }

  /* ---------------- the month card ---------------- */
  function roundRect(x, a, b, w, h, rad) {
    x.beginPath();
    x.moveTo(a + rad, b);
    x.arcTo(a + w, b, a + w, b + h, rad);
    x.arcTo(a + w, b + h, a, b + h, rad);
    x.arcTo(a, b + h, a, b, rad);
    x.arcTo(a, b, a + w, b, rad);
  }
  function drawMonthCard(rows, mon, label) {
    var W = 1080, H = 1350, MG = 80, INK = "#0E1020";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + F;
    x.fillStyle = INK; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 80, 40, W / 2, 80, 1200);
    glow.addColorStop(0, "rgba(174, 182, 218, .16)"); glow.addColorStop(1, "rgba(0, 0, 0, .25)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.lineWidth = 3; x.strokeStyle = "rgba(255, 255, 255, .18)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke();
    x.textBaseline = "alphabetic";
    [["#2D4FC4", 0], ["#CF4327", 30], ["#0D7D73", 60]].forEach(function (d) {
      x.fillStyle = d[0]; x.beginPath(); x.arc(MG + 11 + d[1], 108, 11, 0, 6.2832); x.fill();
    });
    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 46px " + FD;
    x.fillText("Logicers", MG + 92, 122);
    x.textAlign = "right"; x.font = "600 36px " + F;
    x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText(monthWords(mon), W - MG, 122);

    x.textAlign = "center"; x.fillStyle = "#fff";
    var top = rows.filter(function (r) { return r.pts > 0 || r.days > 0; });
    var lead = top[0];
    var head2 = lead ? (lead.you ? "You lead" : lead.name + " leads") : "A quiet month";
    var hs = 110;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head2).width > W - 2 * MG && hs > 44) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head2, W / 2, 330);
    x.font = "600 42px " + F; x.fillStyle = "rgba(255, 255, 255, .78)";
    x.fillText(label || "A room of friends", W / 2, 400);

    /* the podium: up to five rows, then where you stand */
    var y = 520, shown = rows.slice(0, 5);
    shown.forEach(function (r, i) {
      var fs = 46;
      x.font = (r.you ? "800 " : "600 ") + fs + "px " + F;
      x.textAlign = "left"; x.fillStyle = r.you ? "#fff" : "rgba(255, 255, 255, .78)";
      var nm = (i + 1) + ".  " + r.name + (r.you ? " (you)" : "");
      var room = W - 2 * MG - 170, ns = fs;
      while (x.measureText(nm).width > room && ns > 26) { ns -= 2; x.font = (r.you ? "800 " : "600 ") + ns + "px " + F; }
      x.fillText(nm, MG + 30, y);
      x.font = (r.you ? "800 " : "600 ") + fs + "px " + F;
      x.textAlign = "right";
      x.fillText(String(r.pts), W - MG - 30, y);
      y += 78;
    });
    var meAt = -1;
    rows.forEach(function (r, i) { if (r.you) meAt = i; });
    if (meAt >= 5) {
      x.textAlign = "center"; x.font = "700 44px " + F; x.fillStyle = "#fff";
      x.fillText("You: " + (meAt + 1) + ". of " + rows.length + " · " + rows[meAt].pts +
        (rows[meAt].pts === 1 ? " point" : " points"), W / 2, y + 26);
    }

    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 62px " + FD;
    x.fillText("A new month starts on the 1st.", W / 2, 1160);
    var where = TO.address() || "logicers.com";
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText("Play at " + where, W / 2, 1254);
    window.LogicersRoomCard = { head: head2, rows: shown.length, month: monthWords(mon) };   // read by the checks
    return c;
  }
  /* ---------------- the day's recap card ----------------
     "Today in our room": the faces of who played, a crown per game taken, the streak — never an
     answer, never a guess. Drawn like the month card, offered from the evening, never pushed. */
  function drawDayCard(data) {
    var W = 1080, H = 1350, MG = 80, INK = "#0E1020";
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var x = c.getContext("2d");
    var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
    var FD = '"Bricolage Grotesque", ' + F;
    x.fillStyle = INK; x.fillRect(0, 0, W, H);
    var glow = x.createRadialGradient(W / 2, 80, 40, W / 2, 80, 1200);
    glow.addColorStop(0, "rgba(174, 182, 218, .16)"); glow.addColorStop(1, "rgba(0, 0, 0, .25)");
    x.fillStyle = glow; x.fillRect(0, 0, W, H);
    x.lineWidth = 3; x.strokeStyle = "rgba(255, 255, 255, .18)";
    roundRect(x, 26, 26, W - 52, H - 52, 44); x.stroke();
    x.textBaseline = "alphabetic";
    [["#2D4FC4", 0], ["#CF4327", 30], ["#0D7D73", 60]].forEach(function (d) {
      x.fillStyle = d[0]; x.beginPath(); x.arc(MG + 11 + d[1], 108, 11, 0, 6.2832); x.fill();
    });
    x.fillStyle = "#fff"; x.textAlign = "left"; x.font = "800 46px " + FD;
    x.fillText("Logicers", MG + 92, 122);
    x.textAlign = "right"; x.font = "600 36px " + F;
    x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText(D.dateWords(D.todayKey()), W - MG, 122);

    x.textAlign = "center"; x.fillStyle = "#fff";
    var played = data.today.points.filter(function (p) { return p.sent > 0; });
    var head2 = "Today in our room";
    var hs = 96;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head2).width > W - 2 * MG && hs > 44) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head2, W / 2, 300);
    x.font = "600 46px " + F; x.fillStyle = "rgba(255, 255, 255, .80)";
    x.fillText(played.length + " of " + data.count + " played" + (data.streak > 1 ? " · 🔥 " + data.streak + " days" : ""), W / 2, 372);

    /* the faces of who played, a row of coloured circles */
    var names = data.standings.map(function (s) { return s.name; });
    var book = R.faces(names);
    var shown = played.slice(0, 10);
    var fy = 470, R2 = 34, gap2 = Math.min(92, (W - 2 * MG) / Math.max(shown.length, 1));
    var fx = W / 2 - ((shown.length - 1) * gap2) / 2;
    x.font = "800 30px " + F;
    shown.forEach(function (p) {
      var f = book[R.foldN(p.name)] || { bg: "#3A3F5C", two: "?" };
      x.fillStyle = f.bg;
      x.beginPath(); x.arc(fx, fy, R2, 0, 6.2832); x.fill();
      x.fillStyle = "#fff";
      x.fillText(f.two, fx, fy + 11);
      fx += gap2;
    });

    /* one line per game taken: the game's name and who wears the crown */
    var tookRows = data.today.games.filter(function (g) { return g.took; });
    var y = 610;
    x.font = "600 42px " + F;
    tookRows.slice(0, 9).forEach(function (g) {
      var G = null;
      TO.GAMES.forEach(function (gg) { if (gg.key === g.key) G = gg; });
      var col = (window.Duel && window.Duel.DOT && window.Duel.DOT[g.key]) || "#7FA5FF";
      x.fillStyle = col;
      x.beginPath(); x.arc(MG + 16, y - 13, 12, 0, 6.2832); x.fill();
      x.textAlign = "left"; x.fillStyle = "rgba(255, 255, 255, .78)";
      x.fillText(G ? G.name : g.key, MG + 52, y);
      x.textAlign = "right"; x.fillStyle = "#fff";
      var who = "👑 " + (g.took === data.you ? "you" : g.took);
      var room2 = (W - 2 * MG) * 0.45, ws = 42;
      x.font = "700 " + ws + "px " + F;
      while (x.measureText(who).width > room2 && ws > 24) { ws -= 2; x.font = "700 " + ws + "px " + F; }
      x.fillText(who, W - MG, y);
      x.font = "600 42px " + F;
      y += 64;
    });
    if (!tookRows.length) {
      x.fillStyle = "rgba(255, 255, 255, .78)"; x.font = "600 44px " + F;
      x.fillText("No crowns yet — every game is still open.", W / 2, 640);
    }

    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 62px " + FD;
    x.fillText("New games at midnight.", W / 2, 1160);
    var where = TO.address() || "logicers.com";
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText("Play at " + where, W / 2, 1254);
    window.LogicersRoomDayCard = { head: head2, played: played.length, crowns: tookRows.length,
                                   streak: data.streak || 0 };    // read by the checks
    return c;
  }
  function shareDay(room, data, rnote) {
    TO.count("room/share");
    var link = roomLink(room.code);
    var text = "Today in our Logicers room: " + data.today.points.filter(function (p) { return p.sent > 0; }).length +
      " of " + data.count + " played. " + link;
    function go() {
      var c = drawDayCard(data);
      c.toBlob(function (b) {
        TO.share({ blob: b, filename: "logicers-room-day-" + D.todayKey() + ".png", text: text }).then(function (how) {
          if (how !== "fallback") return;
          TO.copyText(text).then(function (okd) {
            rnote.textContent = okd ? "Copied. Paste it into your group chat." : "Copying did not work here. The link is: " + link;
            rnote.hidden = false;
          });
        });
      }, "image/png");
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 96px "Bricolage Grotesque"'), document.fonts.load('600 46px "Figtree"')]).then(go, go);
    } else go();
  }

  function shareMonth(room, rows, mon, cnote) {
    TO.count("room/share");
    var link = roomLink(room.code);
    var lead = rows[0];
    var text = (lead && lead.pts ? (lead.you ? "I lead" : lead.name + " leads") + " our Logicers room in " + monthWords(mon).split(" ")[0] + "."
      : "Our Logicers room, " + monthWords(mon) + ".") + " " + link;
    function go() {
      var c = drawMonthCard(rows, mon, room.label === "Your room" ? "" : room.label);
      c.toBlob(function (b) {
        TO.share({ blob: b, filename: "logicers-room-" + mon + ".png", text: text }).then(function (how) {
          if (how !== "fallback") return;
          TO.copyText(text).then(function (ok) {
            cnote.textContent = ok ? "Copied. Paste it into your group chat." : "Copying did not work here. The link is: " + link;
            cnote.hidden = false;
          });
        });
      }, "image/png");
    }
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('800 110px "Bricolage Grotesque"'), document.fonts.load('600 46px "Figtree"')]).then(go, go);
    } else go();
  }

  /* a second link tapped while this page is open changes only the fragment; run again */
  window.addEventListener("hashchange", function () { window.location.reload(); });

  window.RoomsPage = function () {       // read by r/site-workshop/checks/t_rooms.py
    return { on: R.on(), head: head.textContent, state: state.textContent, note: note.hidden ? "" : note.textContent,
             mode: !paneTable.hidden ? "table" : !paneJoin.hidden ? "join" : !paneMake.hidden ? "make" : "none",
             rooms: R.myRooms().length, showing: showing, named: D.named() };
  };

  start();
})();
