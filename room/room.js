/* The room page: where a room's link lands, where a room is made, and where its table lives.
   Joining is one tap (plus the name window, once, the same one the duel built). The table shows
   the day, the week and the month, each on its own tab (15 Oct 2026); Leave deletes everything of
   yours at once, and the maker can delete the whole room. If the server cannot be reached the page says so and nothing breaks.
   Why each decision was taken: r/rooms-workshop/design.txt on the Mac. */
(function () {
  "use strict";
  var TO = window.TurnsOut, D = window.Duel, R = window.Rooms, LG = window.LG, T = LG ? LG.t : function (k) { return k; };
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
  function monthWords(mon) { return LG ? LG.date(new Date(+mon.slice(0, 4), +mon.slice(4, 6) - 1, 15), { month: "long", year: "numeric" }) : MONTHS[+mon.slice(4, 6) - 1] + " " + mon.slice(0, 4); }
  function monthName(mon) { return LG ? LG.date(new Date(+mon.slice(0, 4), +mon.slice(4, 6) - 1, 15), { month: "long" }) : MONTHS[+mon.slice(4, 6) - 1]; }
  function roomLabel(room) { return !room.label || room.label === "Your room" ? T("room.your_room") : room.label; }
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
      head.textContent = T("rm.not_open");
      lede.textContent = T("rm.not_open_lede");
      say(T("rm.come_back"));
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
    if (!keepWords) { head.textContent = T("rm.play_with_friends"); say(""); }
    show(paneMake);
    $("rm-make-go").onclick = function () {
      if (!D.named()) { D.askName(function () { fresh(); make(); }, T("duel.save")); return; }
      make();
    };
  }
  function make() {
    say(T("rm.making"));
    R.call("make", { tok: R.token(), name: D.me() }).then(function (r) {
      if (r.status !== 200) { say(""); tell(oops(r)); return; }
      remember(r.data.code, "Your room");
      TO.count("room/made");
      table(known(r.data.code), true);
    }, function () { say(""); tell(oops(null)); });
  }

  function landing(code) {               // a friend's link, not joined yet
    say(T("rm.looking"));
    show(null);
    R.call("peek", { code: code }).then(function (r) {
      say("");
      if (r.status === 404) {
        head.textContent = T("rm.gone_h");
        lede.textContent = T("rm.gone_lede");
        if (R.myRooms().length) { table(R.myRooms()[0]); } else { fresh(true); }
        return;
      }
      if (r.status !== 200) { tell(oops(r)); fresh(); return; }
      var who = r.data.names || [], count = r.data.count || 0;
      var label = (r.data.makerName ? T("rm.someones_room", { name: r.data.makerName }) : T("rm.a_room"));
      head.textContent = T("rm.invited_to", { room: label });
      lede.textContent = T("rm.join_lede");
      var box = $("rm-who");
      box.textContent = "";
      var line = who.slice(0, 4).join(", ");
      if (count > 4) line += " " + T("rm.and_n_more", { n: count - 4 });
      box.appendChild(pair(T("rm.already_in"), count ? line : T("rm.nobody_yet")));
      box.appendChild(pair(T("rm.since"), D.dateWords(r.data.made) || ""));
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
    if (!D.named()) { D.askName(function () { join(code, label); }, T("duel.save")); return; }
    say(T("rm.joining"));
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
        tell(T("rm.name_taken", { name: D.me() }));
        D.askName(function () { tell(""); join(code, label); }, T("duel.save"));
        return;
      }
      if (r.data && r.data.err === "full") { tell(T("rm.full")); return; }
      if (r.status === 404) { tell(T("rm.gone")); return; }
      tell(oops(r));
    }, function () { say(""); tell(oops(null)); });
  }

  function oops(r) {
    if (r && r.status === 429) return T("rm.busy");
    return T("rm.unreachable");
  }

  /* ---------------- the table: Day, Week, Month ----------------
     Khayyam, 15 Oct 2026: "in the room results we can switch between daily, weekly and monthly results and
     see relevant tables". Three tabs, each with its own table and one step back (yesterday, last week, last
     month); the tab last chosen is remembered in this browser. The day and the month come from one call
     each, as before. The week is the sum of its days, asked for only when the week is shown: each day's
     points come from the server by its own rule (a game is taken by whoever was strictly closest, among two
     or more who played it), the rule of the month too, so no two tables can disagree. */
  var TAB_KEY = "logicers-room:tab";
  var TABS = [["day", T("rm.tab_day")], ["week", T("rm.tab_week")], ["month", T("rm.tab_month")]];
  function savedTab() {
    try { var t = window.localStorage.getItem(TAB_KEY); return t === "week" || t === "month" ? t : "day"; }
    catch (e) { return "day"; }
  }
  function saveTab(t) { try { window.localStorage.setItem(TAB_KEY, t); } catch (e) { /* a convenience only */ } }

  /* day keys, "YYYYMMDD", counted as the server counts them (calendar days, the week Monday to Sunday) */
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function dateOfKey(k) { return new Date(Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8))); }
  function keyOfDate(d) { return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()); }
  function addDays(k, n) { return keyOfDate(new Date(dateOfKey(k).getTime() + n * 86400000)); }
  function mondayOf(k) { return addDays(k, -((dateOfKey(k).getUTCDay() + 6) % 7)); }
  var SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortDay(k) { return LG ? LG.date(new Date(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8)), { day: "numeric", month: "short" }) : (+k.slice(6, 8)) + " " + SHORT[+k.slice(4, 6) - 1]; }
  function spanWords(a, z) {             // "12 – 18 Oct", or "28 Sep – 4 Oct"
    return a.slice(4, 6) === z.slice(4, 6) ? (+a.slice(6, 8)) + " – " + shortDay(z) : shortDay(a) + " – " + shortDay(z);
  }

  var showing = null;                    // { room, tab, back, mon }: back 0 is this day, week or month; 1 the one before
  var gen = 0;                           // a newer tap wins over an answer still on its way
  function switcher(current) {
    var rooms = R.myRooms();
    paneSwitch.hidden = rooms.length < 2;
    paneSwitch.textContent = "";
    if (rooms.length < 2) return;
    rooms.forEach(function (room) {
      var b = el("button", "rm-chip" + (room.code === current.code ? " on" : ""), room.label ? roomLabel(room) : T("rm.a_room"));
      b.type = "button";
      b.setAttribute("aria-pressed", room.code === current.code ? "true" : "false");
      b.onclick = function () { table(room); };
      paneSwitch.appendChild(b);
    });
  }

  function table(room, justMade, tab, back) {
    tab = tab || savedTab();
    back = back ? 1 : 0;
    var mon = tab === "month" && back ? prevMonth(thisMon) : thisMon;
    showing = { room: room, tab: tab, back: back, mon: mon };
    var my = ++gen;
    head.textContent = roomLabel(room);
    lede.textContent = T("rm.table_lede");
    switcher(room);
    show(paneTable);
    say(T("rm.fetching"));
    /* Today's finished games go up BEFORE the table is read, every time. Making a room (or just
       opening the page) used to send nothing, so games played earlier in the day were missing and
       a friend could stand alone on a game and take nothing. A resend is free: the first result
       always stands. (The Alyosha fix, 9 Oct 2026.) */
    if (!back && D.named()) { R.flush(D.todayKey(), function () { fetchTable(); }); return; }
    fetchTable();
    function viewOf(day) { return R.call("view", { code: room.code, tok: R.token(), day: day }); }
    function fetchTable() {
      var today = D.todayKey();
      if (tab === "week") {
        var first = addDays(mondayOf(today), back ? -7 : 0), days = [];
        for (var i = 0; i < 7; i++) { var k = addDays(first, i); if (k <= today) days.push(k); }
        Promise.all(days.map(viewOf)).then(function (rs) {
          if (my !== gen) return;
          /* a day the server will not show (400 "day": past the edge of its window, as for a clock east of UTC
             on the 1st of a month) is left out of the sum; any other trouble is said */
          var good = rs.filter(function (r) { return r.status === 200; });
          var bad = rs.filter(function (r) { return r.status !== 200 && !(r.status === 400 && r.data && r.data.err === "day"); })[0];
          if (bad || !good.length) { trouble(bad || rs[rs.length - 1]); return; }
          say("");
          var datas = good.map(function (r) { return r.data; });
          fixLabel(datas[datas.length - 1]);
          drawWeek(room, datas, first, back, !!justMade);
        }, failed);
        return;
      }
      var day = tab === "day" ? (back ? addDays(today, -1) : today) : (back ? lastDayOf(mon) : today);
      viewOf(day).then(function (r) {
        if (my !== gen) return;
        if (r.status !== 200) { trouble(r); return; }
        say("");
        fixLabel(r.data);
        if (tab === "day") drawDay(room, r.data, day, back, !!justMade);
        else drawMonth(room, r.data, mon, back, !!justMade);
      }, failed);
    }
    function fixLabel(data) {
      if (room.label === "Your room" && !data.maker) {        // an older label put right
        room.label = (data.standings && data.standings[0] ? T("rm.someones_room", { name: data.standings[0].name }) : room.label);
      }
    }
    function trouble(r) {
      say("");
      if (r.status === 404) { tell(T("rm.gone")); R.forget(room.code); fresh(); return; }
      if (r.status === 403) { tell(T("rm.no_longer")); R.forget(room.code); fresh(); return; }
      paneTable.textContent = "";
      say(oops(r));
    }
    function failed() { if (my !== gen) return; say(""); paneTable.textContent = ""; say(oops(null)); }
  }

  /* the top of every tab: the room just made, its link one tap away, and the three tabs */
  function frame(room, justMade) {
    paneTable.textContent = "";
    if (justMade) {
      var made = el("div", "rm-made");
      made.appendChild(el("p", "rm-made-h", T("rm.made")));
      made.appendChild(el("p", "rm-made-p", T("rm.made_lede")));
      paneTable.appendChild(made);
    }
    var share = el("div", "rm-share");
    var sgo = el("button", "rm-big", justMade ? T("rm.send_link") : T("rm.invite_link"));
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
        snote.textContent = ok ? T("rm.copied_chat") : T("world.copy_failed", { url: link });
        snote.hidden = false;
      });
    };
    var tabs = el("div", "rm-tabs");
    tabs.setAttribute("role", "group");
    tabs.setAttribute("aria-label", T("rm.tabs_aria"));
    TABS.forEach(function (t) {
      var on = t[0] === showing.tab;
      var b = el("button", "rm-tab" + (on ? " on" : ""), t[1]);
      b.type = "button";
      b.setAttribute("data-tab", t[0]);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.onclick = function () {
        if (on && !showing.back) return;
        saveTab(t[0]);
        table(room, false, t[0], 0);
      };
      tabs.appendChild(b);
    });
    paneTable.appendChild(tabs);
  }

  /* a tab's own heading: what it shows, and one step back (or forward again) */
  function periodHead(sec, title, sub, flipWords, onFlip, extra) {
    var mh = el("div", "rm-mh");
    mh.appendChild(el("h2", "rm-h", title));
    if (sub) mh.appendChild(el("span", "rm-span", sub));
    if (extra) mh.appendChild(extra);
    var flip = el("button", "rm-flip", flipWords);
    flip.type = "button";
    flip.onclick = onFlip;
    mh.appendChild(flip);
    sec.appendChild(mh);
  }

  /* a table: the place (medals for the first three with points), the name, what was played, the points;
     past eight rows the first five and you, and "See all". rows: [{ name, you, pts, n }] in order */
  var MEDALS = ["🥇", "🥈", "🥉"];
  function standList(sec, rows, unit, joked) {
    var list = el("ol", "rm-stand");
    var youAt = -1;
    rows.forEach(function (x, i) { if (x.you) youAt = i; });
    var fold = rows.length > 8;
    rows.forEach(function (x, i) {
      var li = el("li", x.you ? "you" : "");
      if (fold && i >= 5 && i !== youAt) li.className += " folded";
      li.appendChild(el("span", "rm-rank", i < 3 && x.pts > 0 ? MEDALS[i] : String(i + 1)));
      var nm = el("span", "rm-name", x.you ? T("rm.name_you", { name: x.name }) : x.name);
      if (joked && joked[x.name]) {
        var j = el("i", "rm-joke", " " + joked[x.name][0]);
        j.title = joked[x.name][1];
        j.setAttribute("aria-label", joked[x.name][1]);
        nm.appendChild(j);
      }
      li.appendChild(nm);
      li.appendChild(el("span", "rm-days", unit(x.n)));
      li.appendChild(el("b", "rm-pts", String(x.pts)));
      list.appendChild(li);
    });
    sec.appendChild(list);
    if (fold) {
      var more = el("button", "rm-flip rm-more", T("rm.see_all", { n: rows.length }));
      more.type = "button";
      more.onclick = function () {
        list.classList.add("open");
        more.hidden = true;
      };
      sec.appendChild(more);
    }
  }
  function daysWords(n) { return T.n(n, "rm.days"); }
  function gamesWords(n) { return T.n(n, "wt.games"); }
  function byPoints(a, c) { return c.pts - a.pts || c.n - a.n || (a.name < c.name ? -1 : a.name > c.name ? 1 : 0); }

  /* ---- Day: the board (one row per friend, one column per game; a filled dot played, an empty one not
     yet, a crown on who took it; no sentences, the second round), then the day's table ---- */
  function drawDay(room, data, day, back, justMade) {
    frame(room, justMade);
    var today = !back;
    var t = el("section", "rm-sec");
    var streak = null;
    if (today && data.streak > 1) {
      streak = el("span", "rm-streak", "🔥 " + T.n(data.streak, "rm.days"));
      streak.title = T("rm.room_streak_title", { n: data.streak });
    }
    periodHead(t, today ? T("end.today") : T("wt.tab_yesterday"), today ? "" : shortDay(day), today ? T("wt.tab_yesterday") : T("end.today"),
      function () { table(room, false, "day", today ? 1 : 0); }, streak);

    var names = data.standings.map(function (x) { return x.name; });
    var book = R.faces(names);
    var byName = {};
    data.today.points.forEach(function (p) { byName[R.foldN(p.name)] = p; });
    var reacted = {};
    (data.today.reactions || []).forEach(function (x) { reacted[R.foldN(x.name)] = x.r; });
    var anyPlayed = data.today.points.some(function (p) { return p.sent > 0; });

    if (!anyPlayed) {
      t.appendChild(el("p", "rm-quiet-line", today ? T("rm.nobody_today") : T("rm.nobody_that_day")));
    } else {
      /* at 40 the board scrolls, and the header and your own row stay in view */
      var wrap = el("div", "rm-board-wrap" + (data.count > 12 ? " tall" : ""));
      var board = el("div", "rm-board");
      board.setAttribute("role", "table");
      board.setAttribute("aria-label", today ? T("rm.board_today") : T("rm.board_that_day"));
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
        if (small) who.appendChild(el("span", "rm-bname", x.you ? T("rm.name_you", { name: x.name }) : x.name));
        if (p.streak > 1) {
          var flame = el("i", "rm-flame", "🔥" + p.streak);
          flame.title = T("rm.player_streak_title", { name: x.name, n: p.streak });
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
        if (today && !p.sent && !x.you) {
          var poke = el("button", "rm-poke", "👉");
          poke.type = "button";
          poke.title = T("rm.poke", { name: x.name });
          poke.setAttribute("aria-label", T("rm.poke_aria", { name: x.name }));
          poke.onclick = function () { pokeOne(room, x.name); };
          end.appendChild(poke);
        }
        row.appendChild(end);
        board.appendChild(row);
      });
      wrap.appendChild(board);
      t.appendChild(wrap);

      if (today) {
        /* one tap says how today felt: the same tap takes it back */
        var mineReact = null;
        (data.today.reactions || []).forEach(function (x) { if (x.you) mineReact = x.r; });
        var rr = el("div", "rm-reacts");
        rr.setAttribute("role", "group");
        rr.setAttribute("aria-label", T("rm.react_aria"));
        ["🔥", "😂", "😮", "🙈"].forEach(function (emo) {
          var b = el("button", "rm-react" + (mineReact === emo ? " on" : ""), emo);
          b.type = "button";
          b.setAttribute("aria-pressed", mineReact === emo ? "true" : "false");
          b.onclick = function () {
            R.call("react", { code: room.code, tok: R.token(), day: D.todayKey(), r: mineReact === emo ? "" : emo })
              .then(function (res) { if (res.status === 200) table(room, false, "day", 0); else tell(oops(res)); },
                    function () { tell(oops(null)); });
          };
          rr.appendChild(b);
        });
        t.appendChild(rr);
      }

      /* the day's table: games taken, then games played */
      var rows = data.today.points.map(function (p) { return { name: p.name, you: !!p.you, pts: p.pts || 0, n: p.sent || 0 }; })
        .filter(function (x) { return x.n > 0 || x.pts > 0; }).sort(byPoints);
      var dt = el("div", "rm-daytable");
      dt.appendChild(el("h3", "rm-h3", today ? T("rm.todays_table") : T("rm.that_days_table")));
      standList(dt, rows, gamesWords, null);
      t.appendChild(dt);
    }
    if (today && data.today.notPlayed.length) {
      var np = data.today.notPlayed;
      var words = np.length <= 10 ? np.join(", ") : T("rm.n_of_you", { n: np.length });
      t.appendChild(el("p", "rm-quiet-line", T("rm.not_played_yet", { who: words })));
    }
    /* the day's recap card: offered from the evening, never pushed, never an answer */
    if (today && anyPlayed && new Date().getHours() >= 17) {
      var rec = el("button", "rm-quiet rm-recap", T("rm.share_recap"));
      rec.type = "button";
      var rnote = el("p", "quiet rm-small");
      rnote.hidden = true;
      rec.onclick = function () { shareDay(room, data, rnote); };
      t.appendChild(rec);
      t.appendChild(rnote);
    }
    paneTable.appendChild(t);
    foot(room, data, today);
  }

  /* ---- Week: Monday to Sunday, the sum of its days ---- */
  function drawWeek(room, datas, first, back, justMade) {
    frame(room, justMade);
    var data = datas[datas.length - 1];
    var w = el("section", "rm-sec");
    periodHead(w, back ? T("rm.last_week") : T("rm.this_week"), spanWords(first, addDays(first, 6)), back ? T("rm.this_week") : T("rm.last_week"),
      function () { table(room, false, "week", back ? 0 : 1); });
    var by = {}, order = [];
    datas.forEach(function (d) {
      ((d.today && d.today.points) || []).forEach(function (p) {
        var f = R.foldN(p.name);
        if (!by[f]) { by[f] = { name: p.name, you: !!p.you, pts: 0, n: 0 }; order.push(f); }
        by[f].pts += p.pts || 0;
        if (p.sent > 0) by[f].n += 1;
      });
    });
    var rows = order.map(function (f) { return by[f]; }).sort(byPoints);
    if (!rows.some(function (x) { return x.pts > 0 || x.n > 0; })) {
      w.appendChild(el("p", "rm-quiet-line", back ? T("rm.nothing_that_week") : T("rm.week_fills")));
    } else {
      standList(w, rows, daysWords, null);
      if (!back && new Date().getDay() === 0) w.appendChild(el("p", "rm-week", T("rm.week_ends")));
    }
    paneTable.appendChild(w);
    foot(room, data, !back);
  }

  /* ---- Month: the standings, as before ---- */
  function drawMonth(room, data, mon, back, justMade) {
    frame(room, justMade);
    var m = el("section", "rm-sec");
    periodHead(m, monthWords(mon), "", back ? T("rm.this_month") : T("rm.last_month"),
      function () { table(room, false, "month", back ? 0 : 1); });
    var rows = (data.standings || []).map(function (x) { return { name: x.name, you: !!x.you, pts: x.pts || 0, n: x.days || 0 }; });
    var any = rows.some(function (x) { return x.pts > 0 || x.n > 0; });
    if (!any) {
      m.appendChild(el("p", "rm-quiet-line", !back ? T("rm.month_fills") : T("rm.nothing_that_month", { month: monthWords(mon) })));
    } else {
      /* the bottom three get a gentle joke only once the month has a real field (six playing),
         and the label rotates by the day, so nobody carries the same one twice running */
      var active = rows.filter(function (x) { return x.n > 0; });
      var joked = {};
      if (active.length >= 6) active.slice(-3).forEach(function (x) { joked[x.name] = jokeFor(x.name); });
      standList(m, rows, daysWords, joked);
      var card = el("button", "rm-big rm-card-go", T("rm.share_month"));
      card.type = "button";
      var cnote = el("p", "quiet rm-small");
      cnote.hidden = true;
      card.onclick = function () { shareMonth(room, data.standings || [], mon, cnote); };
      m.appendChild(card);
      m.appendChild(cnote);
    }
    paneTable.appendChild(m);
    foot(room, data, !back);
  }

  /* under every tab: into the games (for the day, week or month still running), who you are, the ways out */
  function foot(room, data, current) {
    if (current) {
      var next = null;
      TO.GAMES.forEach(function (G) { if (!next && !TO.playedToday(G)) next = G; });
      var go = el("a", "d-go rm-go");
      go.href = TO.here(next ? "../" + next.href : "../");
      go.setAttribute("data-g", next ? next.key : "room");
      var tx = el("span", "d-go-text");
      tx.appendChild(el("span", "d-go-kicker", next ? T("rm.play_for_table") : T("rm.all_played_today")));
      tx.appendChild(el("span", "d-go-name", next ? next.name : T("rm.see_games")));
      go.appendChild(tx);
      go.insertAdjacentHTML("beforeend",
        '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11M10.5 5.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      paneTable.appendChild(go);
    }

    var who = el("p", "duel-who rm-who-line");
    who.appendChild(document.createTextNode(T("rm.sees_you_as") + " "));
    who.appendChild(el("b", "", data.you));
    who.appendChild(document.createTextNode(" "));
    var rename = el("button", "duel-rename", T("duel.change"));
    rename.type = "button";
    rename.onclick = function () {
      D.askName(function () {
        R.flush(D.todayKey(), function () { table(room, false, showing.tab, showing.back); });   // the new name travels with the next send
      }, T("duel.save"));
    };
    who.appendChild(rename);
    paneTable.appendChild(who);

    var outs = el("div", "rm-outs");
    var leave = el("button", "rm-quiet", T("rm.leave"));
    leave.type = "button";
    leave.onclick = function () {
      sure(T("rm.leave_sure"), function () {
        R.call("leave", { code: room.code, tok: R.token() }).then(done, function () { tell(oops(null)); });
        function done() { R.forget(room.code); tell(T("rm.left")); start(); }
      });
    };
    outs.appendChild(leave);
    if (data.maker) {
      var wipe = el("button", "rm-quiet rm-danger-link", T("rm.delete_room"));
      wipe.type = "button";
      wipe.onclick = function () {
        sure(T("rm.delete_sure", { n: data.count }), function () {
          R.call("wipe", { code: room.code, tok: R.token() }).then(done, function () { tell(oops(null)); });
          function done() { R.forget(room.code); tell(T("rm.deleted")); start(); }
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
    var text = T("rm.poke_text", { name: name }) + " " + roomLink(room.code);
    var nav = window.navigator;
    if (nav.share) { nav.share({ text: text }).catch(function () { /* closed */ }); return; }
    TO.copyText(text).then(function (okd) {
      tell(okd ? T("rm.copied_to", { name: name }) : T("rm.copy_failed_msg", { text: text }));
    });
  }

  /* the gentle jokes of the month's foot, rotated by the day so nobody carries one twice running */
  var JOKES = [["🐢", T("rm.joke_1")], ["🛌", T("rm.joke_2")], ["🌱", T("rm.joke_3")]];
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
    var head2 = lead ? (lead.you ? T("rm.you_lead") : T("rm.name_leads", { name: lead.name })) : T("rm.quiet_month");
    var hs = 110;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head2).width > W - 2 * MG && hs > 44) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head2, W / 2, 330);
    x.font = "600 42px " + F; x.fillStyle = "rgba(255, 255, 255, .78)";
    x.fillText(label || T("rm.room_of_friends"), W / 2, 400);

    /* the podium: up to five rows, then where you stand */
    var y = 520, shown = rows.slice(0, 5);
    shown.forEach(function (r, i) {
      var fs = 46;
      x.font = (r.you ? "800 " : "600 ") + fs + "px " + F;
      x.textAlign = "left"; x.fillStyle = r.you ? "#fff" : "rgba(255, 255, 255, .78)";
      var nm = (i + 1) + ".  " + (r.you ? T("rm.name_you", { name: r.name }) : r.name);
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
      x.fillText(T("rm.pic_you_at", { at: meAt + 1, of: rows.length, points: T.n(rows[meAt].pts, "rm.points") }), W / 2, y + 26);
    }

    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 62px " + FD;
    x.fillText(T("rm.new_month"), W / 2, 1160);
    var where = TO.address() || "logicers.com";
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText(T("duel.play_at", { where: where }), W / 2, 1254);
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
    var head2 = T("rm.today_in_room");
    var hs = 96;
    x.font = "800 " + hs + "px " + FD;
    while (x.measureText(head2).width > W - 2 * MG && hs > 44) { hs -= 2; x.font = "800 " + hs + "px " + FD; }
    x.fillText(head2, W / 2, 300);
    x.font = "600 46px " + F; x.fillStyle = "rgba(255, 255, 255, .80)";
    x.fillText(T("rm.n_of_played", { n: played.length, of: data.count }) + (data.streak > 1 ? " · 🔥 " + T.n(data.streak, "rm.days") : ""), W / 2, 372);

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
      var who = "👑 " + (g.took === data.you ? T("duel.you_lower") : g.took);
      var room2 = (W - 2 * MG) * 0.45, ws = 42;
      x.font = "700 " + ws + "px " + F;
      while (x.measureText(who).width > room2 && ws > 24) { ws -= 2; x.font = "700 " + ws + "px " + F; }
      x.fillText(who, W - MG, y);
      x.font = "600 42px " + F;
      y += 64;
    });
    if (!tookRows.length) {
      x.fillStyle = "rgba(255, 255, 255, .78)"; x.font = "600 44px " + F;
      x.fillText(T("rm.no_crowns"), W / 2, 640);
    }

    x.textAlign = "center"; x.fillStyle = "#fff"; x.font = "800 62px " + FD;
    x.fillText(T("home.new_at_midnight"), W / 2, 1160);
    var where = TO.address() || "logicers.com";
    x.font = "600 40px " + F; x.fillStyle = "rgba(255, 255, 255, .72)";
    x.fillText(T("duel.play_at", { where: where }), W / 2, 1254);
    window.LogicersRoomDayCard = { head: head2, played: played.length, crowns: tookRows.length,
                                   streak: data.streak || 0 };    // read by the checks
    return c;
  }
  function shareDay(room, data, rnote) {
    TO.count("room/share");
    var link = roomLink(room.code);
    var text = T("rm.recap_text", { n: data.today.points.filter(function (p) { return p.sent > 0; }).length, of: data.count }) + " " + link;
    function go() {
      var c = drawDayCard(data);
      c.toBlob(function (b) {
        TO.share({ blob: b, filename: "logicers-room-day-" + D.todayKey() + ".png", text: text }).then(function (how) {
          if (how !== "fallback") return;
          TO.copyText(text).then(function (okd) {
            rnote.textContent = okd ? T("rm.copied_chat") : T("world.copy_failed", { url: link });
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
    var text = (lead && lead.pts ? (lead.you ? T("rm.i_lead_month", { month: monthName(mon) }) : T("rm.leads_month", { name: lead.name, month: monthName(mon) }))
      : T("rm.our_room_month", { month: monthWords(mon) })) + " " + link;
    function go() {
      var c = drawMonthCard(rows, mon, !room.label || room.label === "Your room" ? "" : room.label);
      c.toBlob(function (b) {
        TO.share({ blob: b, filename: "logicers-room-" + mon + ".png", text: text }).then(function (how) {
          if (how !== "fallback") return;
          TO.copyText(text).then(function (ok) {
            cnote.textContent = ok ? T("rm.copied_chat") : T("world.copy_failed", { url: link });
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
