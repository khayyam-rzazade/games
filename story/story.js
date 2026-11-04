/* Logicers Story: the page (4 Nov 2026). English only.

   One story a week, one chapter a day, the same for everyone. Monday to Saturday a chapter ends with a vote; at 00:00 UTC the
   world's majority picks which version of the next chapter everyone reads. Sunday has no vote: it is the ending.
   The chapters are static files (story/weeks/wN.json, the shared format); the server (story/worker/) knows only the calendar,
   the votes and the counts.

   What this file does, in the order of a player's day:
     route()        asks the server what day it is and what the world has chosen so far (GET /state), then shows
                    the intro (once), or the result of yesterday's vote if it has not been seen, or the week.
     hub            the week: seven day pills and the one thing to do next.
     reader         one screen at a time, tap to continue; the two small choices (POST /small); the vote (POST /vote);
                    that the chapter was read to its end (POST /read).
     result         the world's choice, the country's, yours, the glimpse if you lost, the science line.
     Sunday         the ending, "Read the week as you chose it" (the chapters that match your own votes, as one long
                    read) and the week card (your votes against the world).
     end card       the site's finish card after a vote and after the week card, pointing to the next unplayed game.

   Time. The chapter day is the UTC day. The page takes the server's clock (state.now) and keeps the difference to the
   phone's clock, so a wrong phone clock cannot show the wrong chapter. Countdowns are in hours and minutes and the closing
   time is shown in the player's own clock.

   Storage (localStorage "story:v1", this browser only, like the other games):
     id      a random 32-hex ID for this browser (the "device" the server counts one vote for)
     intro   whether the first screen was seen
     weeks   { "<week>": { days: { "<day>": { pos, small: { "<n>": 0|1 }, vote: "A"|"B", ver, voteAt, seen, read, readSent } },
                           cache: { path: ["A", ...], days: { "<day>": { result, a, b, voters, countries, readers, ca, cb } },
                                    today: { day, voters, countries, readers }, todayAt, country } } }
             the cache is the world's fixed results, which never change, so a week can be read without the server;
             "today" is the live count of the day that is on (shown on the week page, refreshed every minute)
     taps    the hidden portrait (v2): every small choice and vote with its axis and side, in the order made:
             { w, d, k: "s"|"v", n, axis, side, pick, ver, at, sent }. Nothing here is shown to the player yet. Both kinds
             are kept in this browser AND sent to the server (small choices: POST /small, kept until the server has them,
             tried again later if the phone was offline; votes: POST /vote). The first screen says so: counted by country,
             no names. The server also counts who read each chapter to its end ("N read" on the page). */
(function () {
  "use strict";
  var CFG = window.STORY_CONFIG || {};
  var TO = window.TurnsOut || null;
  var LGT = window.T || function (k) { return k; };
  var DAY = 86400000;
  var KEY = "story:v1";
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var MIN_COUNTRY = 3;                        // a country's split is shown from this many voters
  var VOTE_DAYS = 6;
  var stage = document.getElementById("stage");

  /* ---------------- small helpers ---------------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); return n; }
  function button(label, cls, fn) {
    var b = el("button", cls, label);
    b.type = "button";
    if (fn) b.addEventListener("click", fn);
    return b;
  }
  /* text with the three things a chapter may carry: <br>, *italic* and **bold**; nothing else is ever turned into markup */
  function rich(node, text) {
    String(text == null ? "" : text).split(/<br\s*\/?>/i).forEach(function (part, i) {
      if (i) node.appendChild(document.createElement("br"));
      var re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g, last = 0, m;
      while ((m = re.exec(part))) {
        if (m.index > last) node.appendChild(document.createTextNode(part.slice(last, m.index)));
        var e = document.createElement(m[1] ? "strong" : "em");
        e.textContent = m[1] || m[2];
        node.appendChild(e);
        last = re.lastIndex;
      }
      if (last < part.length) node.appendChild(document.createTextNode(part.slice(last)));
    });
    return node;
  }
  function ev(name) { try { if (TO && TO.count) TO.count("story/" + name); } catch (e) { /* counting never breaks a page */ } }
  function num(n) { try { return Number(n).toLocaleString("en"); } catch (e) { return String(n); } }
  function reduced() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }

  /* ---------------- time ---------------- */
  var skew = 0;                                // the server's clock minus the phone's, in ms
  function now() { return Date.now() + skew; }
  function launchMs() { return Date.parse(String(CFG.launch) + "T00:00:00Z"); }
  /* where the story is at ms: before (not started), on (week, day, start, end), over (all weeks done) */
  function clockAt(ms) {
    var L = launchMs();
    if (!isFinite(L)) return { state: "off" };
    var n = Math.floor((ms - L) / DAY);
    if (n < 0) return { state: "before", n: n, start: L };
    var week = Math.floor(n / 7) + 1;
    if (week > CFG.weeks) return { state: "over", n: n };
    var start = L + n * DAY;
    return { state: "on", n: n, week: week, day: (n % 7) + 1, start: start, end: start + DAY };
  }
  function hhmm(ms) {
    try { return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; }
  }
  function whenLocal(ms) {
    try { return new Date(ms).toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long" }) + ", " + hhmm(ms); } catch (e) { return ""; }
  }
  function left(ms) {                          // 5 h 12 min / 5 h / 12 min; never less than 1 min
    var m = Math.max(1, Math.ceil(ms / 60000)), h = Math.floor(m / 60);
    return h >= 1 ? h + " h" + (m % 60 ? " " + (m % 60) + " min" : "") : m + " min";
  }
  function leftLong(ms) {                      // for the wait before the first story: 2 days 5 h / 1 day / 7 h 5 min
    var h = Math.floor(Math.max(1, Math.ceil(ms / 60000)) / 60);
    if (h < 24) return left(ms);
    var d = Math.floor(h / 24), r = h % 24;
    return d + (d === 1 ? " day" : " days") + (r ? " " + r + " h" : "");
  }

  /* ---------------- what this browser keeps ---------------- */
  var memory = null;
  function newId() {
    var b = new Uint8Array(16), s = "", i;
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(b);
    else for (i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
    for (i = 0; i < 16; i++) s += (b[i] < 16 ? "0" : "") + b[i].toString(16);
    return s;
  }
  function readStore() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && typeof s === "object" && s.v === 1 && /^[0-9a-f]{32}$/.test(String(s.id))) return s; }
    } catch (e) { /* fall through */ }
    return memory;
  }
  var S = readStore() || { v: 1, id: newId(), intro: false, weeks: {}, taps: [] };
  S.weeks = S.weeks || {}; S.taps = Array.isArray(S.taps) ? S.taps : [];
  function save() {
    memory = S;
    try { window.localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* the page still works from memory */ }
  }
  function WK(w) {
    var k = S.weeks[w] || (S.weeks[w] = {});
    k.days = k.days || {};
    k.cache = k.cache || { path: [], days: {} };
    k.cache.path = k.cache.path || []; k.cache.days = k.cache.days || {};
    return k;
  }
  function DY(w, d) { var k = WK(w); return k.days[d] || (k.days[d] = {}); }
  function tap(w, d, kind, n, axis, side, pick, ver) {
    var dup = S.taps.some(function (t) { return t.w === w && t.d === d && t.k === kind && t.n === n; });
    if (!dup) S.taps.push({ w: w, d: d, k: kind, n: n, axis: axis || null, side: side || null, pick: pick, ver: ver || "", at: now() });
  }
  function axisOf(a) { return String(a || "").replace(/[–—]/g, "-").toLowerCase(); }

  /* ---------------- the server ---------------- */
  var NEW = String(CFG.api || ""), OLD = String(CFG.apiOld || "");
  var heardNew = false, useOld = false;
  function call(method, path, body) {
    var bases = useOld ? [OLD] : heardNew || !OLD ? [NEW] : [NEW, OLD];
    function go(i) {
      var base = bases[i];
      return window.fetch(base + path, {
        method: method, cache: "no-store",
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined
      }).then(function (res) {
        if (base === NEW) heardNew = true; else useOld = true;
        return res.json().then(function (j) { return j; }, function () { return {}; }).then(function (j) {
          if (!res.ok) { var err = { status: res.status, error: j && j.error }; throw err; }
          return j;
        });
      }, function () {
        if (i + 1 < bases.length) return go(i + 1);
        throw { network: true };
      });
    }
    return go(0);
  }
  /* the server's clock, the world's fixed results for the week (kept: they never change) and the country */
  function absorb(week, j) {
    if (typeof j.now === "number") skew = j.now - Date.now();
    if (!week || !j.days) return;
    var c = WK(week).cache;
    if (Array.isArray(j.path) && j.path.length >= c.path.length) c.path = j.path.slice();
    j.days.forEach(function (d) { c.days[d.day] = { result: d.result, a: d.a, b: d.b, voters: d.voters, countries: d.countries, readers: d.readers, ca: d.ca, cb: d.cb }; });
    c.today = j.today ? { day: j.today.day, voters: j.today.voters, countries: j.today.countries, readers: j.today.readers } : null;
    c.todayAt = Date.now();
    if (j.you && j.you.country) c.country = j.you.country;
    save();
  }
  /* what this browser tells the server besides the vote. A request is never in flight twice. */
  var sending = {};
  function postRead(w, d) {                      // "I read this chapter to its end": once per chapter
    var dd = DY(w, d), k = "r" + w + "/" + d;
    if (dd.readSent || sending[k]) return;
    sending[k] = true;
    call("POST", "/read", { week: w, day: d, dev: S.id }).then(function () {
      delete sending[k]; dd.readSent = true; save();
      call("GET", "/state?week=" + w).then(function (j) { absorb(w, j); }, function () { /* the count is only a number to look at */ });
    }, function (err) {
      delete sending[k];
      if (err && err.status && err.status !== 429 && err.status < 500) { dd.readSent = true; save(); }      // too early, too late, refused: never sent again
    });
  }
  function sendSmall(t) {
    var k = "s" + t.w + "/" + t.d + "/" + t.n;
    if (t.sent || sending[k]) return;
    sending[k] = true;
    call("POST", "/small", { week: t.w, day: t.d, n: t.n, pick: t.pick, axis: t.axis, side: t.side, ver: t.ver || "", dev: S.id }).then(function () {
      delete sending[k]; t.sent = true; save();
    }, function (err) {
      delete sending[k];
      if (err && err.status && err.status !== 429 && err.status < 500) { t.sent = true; save(); }           // refused for good: never sent again
    });
  }
  function flushSmalls() { S.taps.forEach(function (t) { if (t.k === "s" && !t.sent) sendSmall(t); }); }
  /* "1,204 read · 987 voted · 41 countries": whoever voted also read */
  function countsText(info, day) {
    if (!info) return "";
    var parts = [num(Math.max(info.readers || 0, info.voters || 0)) + " read"];
    if (day <= VOTE_DAYS) parts.push(num(info.voters || 0) + " voted");
    if (info.countries) parts.push(num(info.countries) + (info.countries === 1 ? " country" : " countries"));
    return parts.join(" · ");
  }
  /* the live count of the day that is on: drawn from what this browser last heard, then made fresh (and again every minute) */
  function liveCounts(w, d, fresh) {
    var p = el("p", "st-soft st-counts"), ticks = 0, c = WK(w).cache;
    function draw() { var t = WK(w).cache.today; p.textContent = t && t.day === d ? countsText(t, d) : ""; p.hidden = !p.textContent; }
    function refresh() { call("GET", "/state?week=" + w).then(function (j) { absorb(w, j); draw(); }, function () { draw(); }); }
    draw();
    if (fresh) { p.hidden = true; refresh(); }
    else if (Date.now() - (c.todayAt || 0) > 20000) refresh();
    pending.push(function () { ticks++; if (ticks % 60 === 0) refresh(); });
    return p;
  }
  /* asks what day it is and what the world chose; falls back to what this browser has kept */
  function sync(forWeek) {
    var c = clockAt(Date.now());
    var w = forWeek || (c.state === "on" ? c.week : c.state === "over" ? CFG.weeks : 0);
    return call("GET", "/state" + (w ? "?week=" + w : "")).then(function (j) {
      skew = typeof j.now === "number" ? j.now - Date.now() : 0;
      var cur = clockAt(now());
      var want = forWeek || (cur.state === "on" ? cur.week : cur.state === "over" ? CFG.weeks : 0);
      if (want && want !== w) return call("GET", "/state?week=" + want).then(function (j2) { absorb(want, j2); flushSmalls(); return { cur: clockAt(now()), week: want, online: true }; }, offline);
      absorb(want, j);
      flushSmalls();
      return { cur: cur, week: want, online: true };
    }, offline);
    function offline() {
      var cur = clockAt(now());
      return { cur: cur, week: forWeek || (cur.state === "on" ? cur.week : cur.state === "over" ? CFG.weeks : 0), online: false };
    }
  }

  /* ---------------- the chapters ---------------- */
  var files = {};
  function loadWeekFile(w) {
    if (files[w]) return files[w];
    files[w] = window.fetch("weeks/w" + w + ".json", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("no file");
      return r.json();
    }).then(function (f) {
      if (!f || !Array.isArray(f.days)) throw new Error("bad file");
      f.byDay = {};
      f.days.forEach(function (d) { if (d && d.versions) f.byDay[d.day] = d.versions; });
      if (!Array.isArray(f.keyVotes) || f.keyVotes.length !== 2) f.keyVotes = [1, 4];
      return f;
    });
    files[w].catch(function () { delete files[w]; });
    return files[w];
  }
  /* which version of day `day` the world's path leads to ("" Monday, "A"/"B" Tuesday to Saturday, "AB" Sunday); null when the path is not known yet */
  function worldKey(f, day, path) {
    if (day === 1) return "";
    if (day <= VOTE_DAYS) return path[day - 2] || null;
    var a = path[f.keyVotes[0] - 1], b = path[f.keyVotes[1] - 1];
    return a && b ? a + b : null;
  }
  function chapterOf(f, day, key) {
    var v = f.byDay[day];
    return key !== null && v && v[key] ? v[key] : null;
  }
  function path(w) { return WK(w).cache.path; }
  function closedInfo(w, d) { return WK(w).cache.days[d] || null; }
  function myVote(w, d) { var v = DY(w, d).vote; return v === "A" || v === "B" ? v : null; }
  function labelOf(ch, c) { return ch && ch.vote && ch.vote[c] ? String(ch.vote[c].label || c) : c; }
  function cleanSmall(ch) { return Array.isArray(ch.small) ? ch.small.filter(function (s) { return s && Array.isArray(s.options) && s.options.length === 2; }) : []; }
  function screensOf(ch) { return Array.isArray(ch.screens) && ch.screens.length ? ch.screens : [""]; }

  /* ---------------- the stage ---------------- */
  var view = { kind: "", tick: null, week: 0 };
  var pending = [];                              // the countdowns the screen being built has asked for
  function show(node, kind, noScroll) {
    clear(stage);
    stage.appendChild(node);
    var list = pending;
    pending = [];
    view.kind = kind;
    stage.setAttribute("data-view", kind);                       // which screen this is (the tests read it)
    view.tick = list.length ? function () { list.forEach(function (f) { f(); }); } : null;
    node.classList.add("st-view");
    if (!noScroll) { try { window.scrollTo(0, 0); } catch (e) { /* no scrolling here */ } }
    if (!reduced()) node.classList.add("st-in");
  }
  function loading() { var v = el("div", "st-center"); v.appendChild(el("p", "st-soft", "…")); show(v, "loading"); }
  function problem(text, retry) {
    var v = el("div", "st-center");
    v.appendChild(el("h1", "st-h", text));
    var a = el("div", "actions st-actions");
    a.appendChild(button("Try again", "btn solid", retry));
    v.appendChild(a);
    show(v, "problem");
  }
  function kicker(text) { return el("p", "st-kicker", text); }
  /* a line that counts down by itself: fn(msLeft) gives its text */
  function countdown(node, endMs, fn) {
    function draw() { node.textContent = fn(Math.max(0, endMs - now())); }
    draw();
    pending.push(draw);
  }

  /* ---------------- the first screen, and the days before launch ---------------- */
  function introLines(parent) {
    var ul = el("ul", "st-list");
    [["1", "One short chapter a day. About 2 minutes."], ["2", "Every chapter ends with a vote."], ["3", "At the end of the day, the most votes win. Everyone reads the same next chapter."]].forEach(function (r) {
      var li = el("li");
      li.appendChild(el("b", "st-n", r[0]));
      li.appendChild(el("span", "", r[1]));
      ul.appendChild(li);
    });
    parent.appendChild(ul);
    parent.appendChild(el("p", "st-soft st-fair", "Reads, votes and choices are counted by country. No names."));
  }
  function renderIntro(onStart, back) {
    var v = el("div", "st-intro");
    v.appendChild(kicker("Story"));
    v.appendChild(el("h1", "st-h big", "One story. The whole world decides."));
    introLines(v);
    var cur = clockAt(now());
    if (cur.state === "on") v.appendChild(el("p", "st-soft", "Voting ends every day at " + hhmm(cur.end) + " (your time)."));
    var a = el("div", "actions st-actions");
    a.appendChild(button(back ? "Back" : "Start", "btn solid", function () {
      if (!S.intro) { S.intro = true; save(); ev("intro"); }
      onStart();
    }));
    v.appendChild(a);
    show(v, "intro");
  }
  function renderBefore() {
    var cur = clockAt(now());
    var v = el("div", "st-intro");
    v.appendChild(kicker("Story"));
    v.appendChild(el("h1", "st-h big", "The first story starts on Monday."));
    v.appendChild(el("p", "st-p", whenLocal(cur.start) + " (your time)"));
    var c = el("p", "st-soft");
    countdown(c, cur.start, function (ms) { return "In " + leftLong(ms); });
    v.appendChild(c);
    introLines(v);
    show(v, "before");
  }

  /* ---------------- the week ---------------- */
  function dayStatus(w, d, cur, isNow) {
    // "future" | "today" | "closed"
    if (!isNow) return "closed";
    if (d > cur.day) return "future";
    return d === cur.day ? "today" : "closed";
  }
  function renderHub(w, f, cur) {
    var isNow = cur.state === "on" && cur.week === w;
    var v = el("div", "st-hub");
    v.appendChild(kicker("Week " + w));
    v.appendChild(el("h1", "st-h big", String(f.title || "Story")));

    var pills = el("div", "st-pills");
    for (var d = 1; d <= 7; d++) (function (d) {
      var s = dayStatus(w, d, cur, isNow), dd = DY(w, d), voted = !!myVote(w, d);
      var p = el("button", "st-pill st-" + s + (voted || (d === 7 && dd.read) ? " st-voted" : ""));
      p.type = "button";
      p.setAttribute("data-day", String(d));
      p.appendChild(el("span", "st-pd", DAYS[d - 1].slice(0, 3)));
      var mark = voted || (d === 7 && dd.read) ? "✓" : s === "today" ? "●" : s === "closed" ? "–" : "";
      p.appendChild(el("span", "st-pm", mark));
      p.setAttribute("aria-label", DAYS[d - 1] + ", chapter " + d + (voted ? ", you voted" : ""));
      if (s === "future") p.disabled = true;
      p.addEventListener("click", function () {
        if (s === "today" && !voted) openChapter(w, f, d, "play");
        else openChapter(w, f, d, "read");
      });
      pills.appendChild(p);
    })(d);
    v.appendChild(pills);

    var box = el("div", "st-next");
    if (isNow && cur.day <= VOTE_DAYS) {
      var dd = DY(w, cur.day);
      if (myVote(w, cur.day)) {
        box.appendChild(el("p", "st-big2", "You voted."));
        var t = el("p", "st-soft");
        countdown(t, cur.end, function (ms) { return "Result at " + hhmm(cur.end) + " (your time) · " + left(ms) + " left"; });
        box.appendChild(t);
        box.appendChild(liveCounts(w, cur.day));
        box.appendChild(button("Read chapter " + cur.day + " again", "btn ghost", function () { openChapter(w, f, cur.day, "read"); }));
      } else {
        box.appendChild(el("p", "st-big2", "Chapter " + cur.day + " · " + DAYS[cur.day - 1]));
        var t2 = el("p", "st-soft");
        countdown(t2, cur.end, function (ms) { return "The world is deciding · " + left(ms) + " left"; });
        box.appendChild(t2);
        box.appendChild(liveCounts(w, cur.day));
        box.appendChild(button(dd.pos ? "Continue chapter " + cur.day : "Read chapter " + cur.day, "btn solid", function () { openChapter(w, f, cur.day, "play"); }));
      }
    } else if (isNow && cur.day === 7) {
      var read = DY(w, 7).read;
      box.appendChild(el("p", "st-big2", "Chapter 7 · The ending"));
      var t3 = el("p", "st-soft");
      countdown(t3, cur.end, function (ms) { return left(ms) + " left"; });
      box.appendChild(t3);
      box.appendChild(liveCounts(w, 7));
      box.appendChild(button(read ? "Read the ending again" : "Read the ending", read ? "btn ghost" : "btn solid", function () { openChapter(w, f, 7, "read"); }));
      if (read) box.appendChild(button("My week", "btn solid", function () { openWeekCard(w, f); }));
    } else if (!isNow) {
      box.appendChild(el("p", "st-big2", "That week is over."));
      box.appendChild(button("My week", "btn solid", function () { openWeekCard(w, f); }));
    }
    v.appendChild(box);

    if (isNow && cur.week > 1) {
      var more = el("div", "st-more");
      more.appendChild(button("Last week’s story", "st-link", function () { openLastWeek(cur.week - 1); }));
      v.appendChild(more);
    }
    if (cur.state === "over") {
      v.appendChild(el("p", "st-soft st-pad", "That was the last story for now."));
    }
    show(v, "hub");
    view.week = w;
  }
  function openLastWeek(w) {
    loading();
    Promise.all([loadWeekFile(w), sync(w)]).then(function (r) {
      renderHub(w, r[0], { state: "past", week: w });
    }, function () { problem("The story is not ready yet.", function () { openLastWeek(w); }); });
  }

  /* ---------------- reading ---------------- */
  var R = null;                                  // the chapter being read
  function openChapter(w, f, d, mode) {
    var key = worldKey(f, d, path(w)), ch = chapterOf(f, d, key);
    if (!ch) { problem("Can’t reach the world right now.", function () { route(); }); return; }
    var cur = clockAt(now());
    var live = cur.state === "on" && cur.week === w && cur.day === d;
    var canVote = mode === "play" && live && d <= VOTE_DAYS && !!ch.vote && !myVote(w, d);
    /* the two small choices are asked while the chapter is live and the player is reading it for the first time; a Sunday ending may carry them too */
    var steps = [], small = canVote || (mode === "read" && live && d === 7) ? cleanSmall(ch) : [];
    var scr = screensOf(ch);
    scr.forEach(function (text, i) {
      steps.push({ t: "text", text: text });
      small.forEach(function (sc, n) {
        var at = Math.min(Math.max(parseInt(sc.after, 10) || 0, 0), scr.length - 1);
        if (at === i) steps.push({ t: "small", n: n, sc: sc });
      });
    });
    if (canVote) steps.push({ t: "vote" });
    else if (d === 7) steps.push({ t: "ending" });
    else steps.push({ t: "after" });
    R = { week: w, f: f, day: d, mode: canVote ? "play" : "read", key: key, ch: ch, steps: steps, i: 0, end: live ? cur.end : 0, closed: false };
    if (canVote) {
      var saved = DY(w, d).pos || 0;
      R.i = Math.min(saved, steps.length - 1);
      if (!DY(w, d).pos) ev("w" + w + "/d" + d + "/open");
    }
    showStep();
  }
  function progress(frac) {
    var p = el("div", "st-prog"), i = el("i");
    i.style.width = Math.round(Math.max(0, Math.min(1, frac)) * 100) + "%";
    p.appendChild(i);
    return p;
  }
  function chapterTop(label, onClose) {
    var top = el("div", "st-top");
    top.appendChild(el("span", "st-label", label));
    var x = button("×", "chip round close st-x", onClose);
    x.setAttribute("aria-label", "Close");
    top.appendChild(x);
    return top;
  }
  function closeReader() {
    var cur = clockAt(now());
    if (R && R.chain) { openWeekCard(R.week, R.f); return; }
    if (R) renderHub(R.week, R.f, cur.state === "on" && cur.week === R.week ? cur : { state: "past", week: R.week });
    else route();
  }
  function go(delta) {
    var next = R.i + delta;
    if (next < 0 || next >= R.steps.length) return;
    R.i = next;
    if (R.mode === "play") { var d = DY(R.week, R.day); if (next > (d.pos || 0)) { d.pos = next; save(); } }
    showStep();
  }
  function showStep() {
    var s = R.steps[R.i], last = R.i === R.steps.length - 1;
    var v = el("div", "st-read");
    var label = R.chain ? "Your week" : "Chapter " + R.day + " · " + DAYS[R.day - 1];
    v.appendChild(chapterTop(label, closeReader));
    v.appendChild(progress(R.steps.length > 1 ? R.i / (R.steps.length - 1) : 1));
    var page = el("div", "st-page");
    var nav = el("div", "st-nav");
    var hasNext = false;

    if (s.t === "text" || s.t === "head" || s.t === "chose") {
      var t = el("div", "st-text");
      if (s.t === "text") rich(t, s.text);
      else if (s.t === "head") { t.classList.add("st-headtext"); t.appendChild(el("p", "st-kick2", "Chapter " + s.day)); t.appendChild(el("p", "st-head2", DAYS[s.day - 1])); }
      else { t.classList.add("st-chose"); t.appendChild(el("p", "st-kick2", s.own ? "You chose" : "The world chose")); t.appendChild(el("p", "st-head2", s.label)); }
      page.appendChild(t);
      hasNext = true;
    } else if (s.t === "small") {
      stepSmall(page, s, function () { showStep(); });
      var picked = DY(R.week, R.day).small && DY(R.week, R.day).small[s.n] !== undefined;
      hasNext = !!picked;
    } else if (s.t === "vote") {
      stepVote(page);
    } else if (s.t === "ending") {
      stepEnding(page);
    } else if (s.t === "after") {
      stepAfter(page);
    } else if (s.t === "chainend") {
      stepChainEnd(page);
    }
    v.appendChild(page);

    var back = R.i > 0 ? button("Back", "chip st-back", function () { go(-1); }) : el("span");
    nav.appendChild(back);
    if (hasNext && !last) {
      var cont = button("Continue", "btn solid st-cont", function () { go(1); });
      nav.appendChild(cont);
      page.classList.add("tappable");
      page.addEventListener("click", function (e) { if (e.target.closest("button, a")) return; go(1); });
      page.appendChild(el("p", "st-hint", "Tap to continue"));
    }
    if (R.i > 0 || hasNext) v.appendChild(nav);
    show(v, s.t === "vote" ? "vote" : "reading", true);
    try { window.scrollTo(0, 0); } catch (e) { /* no scrolling here */ }
  }
  document.addEventListener("keydown", function (e) {
    if (!R || view.kind !== "reading" || e.target.closest && e.target.closest("button, a, input")) return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
      var c = stage.querySelector(".st-cont");
      if (c) { e.preventDefault(); c.click(); }
    } else if (e.key === "ArrowLeft") {
      var b = stage.querySelector(".st-back");
      if (b) { e.preventDefault(); b.click(); }
    }
  });

  /* a small choice: two taps, never both; the line shows after the tap and the choice is kept (with its axis and side) */
  function stepSmall(page, s, redraw) {
    var d = DY(R.week, R.day);
    d.small = d.small || {};
    var picked = d.small[s.n];
    var box = el("div", "st-opts");
    s.sc.options.forEach(function (o, idx) {
      var b = el("button", "st-opt" + (picked === idx ? " on" : picked !== undefined ? " off" : ""));
      b.type = "button";
      b.setAttribute("data-pick", String(idx));
      rich(b, o.text);
      if (picked !== undefined) b.disabled = true;
      b.addEventListener("click", function () {
        d.small[s.n] = idx;
        tap(R.week, R.day, "s", s.n, axisOf(s.sc.axis), o.side === "right" ? "right" : "left", idx, R.key);
        save();
        flushSmalls();
        redraw();
      });
      box.appendChild(b);
    });
    page.appendChild(box);
    if (picked !== undefined) {
      var line = el("p", "st-line");
      rich(line, s.sc.options[picked].line || "");
      page.appendChild(line);
    }
  }

  /* the vote */
  function stepVote(page) {
    var ch = R.ch, q = ch.vote, w = R.week, d = R.day;
    var closed = R.closed || (R.end && now() >= R.end);
    var h = el("h2", "st-vq");
    rich(h, q.question || "What do you do?");
    page.appendChild(h);
    if (closed) {
      page.appendChild(el("p", "st-soft", "Voting for this chapter has closed."));
      var a = el("div", "actions st-actions");
      a.appendChild(button("See the result", "btn solid", function () { seeResult(w, R.f, d); }));
      page.appendChild(a);
      return;
    }
    postRead(w, d);                                // the chapter was read to its end
    var chosen = null, list = el("div", "st-opts vote"), go2;
    ["A", "B"].forEach(function (c) {
      var o = q[c] || {};
      var b = el("button", "st-vopt");
      b.type = "button";
      b.setAttribute("data-choice", c);
      b.setAttribute("aria-pressed", "false");
      b.appendChild(el("b", "", String(o.label || c)));
      if (o.reason) b.appendChild(el("span", "", String(o.reason)));
      b.addEventListener("click", function () {
        chosen = c;
        Array.prototype.forEach.call(list.children, function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        go2.disabled = false;
      });
      list.appendChild(b);
    });
    page.appendChild(list);
    var msg = el("p", "st-error");
    msg.hidden = true;
    var lock = el("p", "st-soft st-lock");
    countdown(lock, R.end, function (ms) { return "The whole world votes. It ends at " + hhmm(R.end) + " (your time) · " + left(ms) + " left"; });
    go2 = button("Vote", "btn solid st-go", function () {
      if (!chosen) return;
      go2.disabled = true; msg.hidden = true;
      var o = q[chosen] || {};
      call("POST", "/vote", { week: w, day: d, choice: chosen, dev: S.id, axis: axisOf(o.axis), side: o.side === "right" ? "right" : "left", ver: R.key }).then(function (r) {
        afterVote(r.choice === "A" || r.choice === "B" ? r.choice : chosen, o, r);
      }, function (err) {
        if (err && err.status === 409) { R.closed = true; showStep(); return; }
        msg.textContent = err && err.status === 429 ? "Too many votes from this connection. Try again later." : "Could not send your vote. Try again.";
        msg.hidden = false; go2.disabled = false;
      });
    });
    go2.disabled = true;
    page.appendChild(lock);
    page.appendChild(msg);
    var acts = el("div", "actions st-actions");
    acts.appendChild(go2);
    page.appendChild(acts);
  }
  function afterVote(choice, o, r) {
    var w = R.week, d = R.day, dd = DY(w, d);
    var q = R.ch.vote[choice] || o;
    dd.vote = choice; dd.ver = R.key; dd.voteAt = now(); dd.pos = R.steps.length - 1; dd.readSent = true;      // the server counts a vote as a read
    tap(w, d, "v", 0, axisOf(q.axis), q.side === "right" ? "right" : "left", choice, R.key);
    save();
    ev("w" + w + "/d" + d + "/voted");
    renderVoted(w, R.f, d, true);
  }
  function renderVoted(w, f, d, withCard) {
    var cur = clockAt(now()), ch = chapterOf(f, d, worldKey(f, d, path(w)));
    var mine = myVote(w, d);
    var v = el("div", "st-done");
    v.appendChild(el("div", "st-check", "✓"));
    v.appendChild(el("h1", "st-h", "Your vote is in."));
    v.appendChild(el("p", "st-p", labelOf(ch, mine)));
    var end = cur.state === "on" ? cur.end : 0;
    var t = el("p", "st-soft");
    if (end) countdown(t, end, function (ms) { return "Result at " + hhmm(end) + " (your time) · " + left(ms) + " left"; });
    v.appendChild(t);
    if (end) v.appendChild(liveCounts(w, d, withCard));
    var a = el("div", "actions st-actions");
    a.appendChild(button("Read again", "btn ghost", function () { openChapter(w, f, d, "read"); }));
    a.appendChild(button("Back", "btn ghost", function () { renderHub(w, f, clockAt(now())); }));
    v.appendChild(a);
    show(v, "voted");
    if (withCard) endCard({ title: "Your vote is in", line: end ? "Chapter " + (d + 1) + " opens at " + hhmm(end) + " (your time)." : "" });
  }

  /* read mode ends: the world's result for a day that is over, or back to the week */
  function stepAfter(page) {
    var w = R.week, d = R.day, info = closedInfo(w, d);
    var cur = clockAt(now());
    if (info) {
      page.appendChild(el("p", "st-soft", "That is the end of chapter " + d + "."));
      var a = el("div", "actions st-actions");
      a.appendChild(button("See the result", "btn solid", function () { renderResult(w, R.f, d, { fromRead: true }); }));
      a.appendChild(button("Back", "btn ghost", closeReader));
      page.appendChild(a);
    } else {
      page.appendChild(el("p", "st-soft", d <= VOTE_DAYS && cur.state === "on" && cur.day === d && myVote(w, d) ? "You have voted. The result comes at " + hhmm(cur.end) + " (your time)." : "That is the end of chapter " + d + "."));
      var b = el("div", "actions st-actions");
      b.appendChild(button("Back", "btn solid", closeReader));
      page.appendChild(b);
    }
  }

  /* Sunday */
  function ownKeys(w, f) {
    var p = path(w), own = {}, d;
    for (d = 1; d <= VOTE_DAYS; d++) own[d] = myVote(w, d) || p[d - 1] || null;
    var keys = {};
    keys[1] = "";
    for (d = 2; d <= VOTE_DAYS; d++) keys[d] = own[d - 1];
    keys[7] = own[f.keyVotes[0]] && own[f.keyVotes[1]] ? own[f.keyVotes[0]] + own[f.keyVotes[1]] : null;
    return { own: own, keys: keys };
  }
  function chainDiffers(w, f) {
    var p = path(w), mine = ownKeys(w, f), any = false, d;
    for (d = 1; d <= VOTE_DAYS; d++) if (myVote(w, d)) any = true;
    if (!any) return false;
    for (d = 1; d <= 7; d++) {
      var wk = worldKey(f, d, p);
      if (mine.keys[d] !== null && wk !== null && mine.keys[d] !== wk) return true;
    }
    return false;
  }
  function stepEnding(page) {
    var w = R.week, f = R.f;
    DY(w, 7).read = true; save();
    ev("w" + w + "/d7/read");
    if (R.end) postRead(w, 7);                     // Sunday's ending, read on Sunday
    page.appendChild(el("h2", "st-vq", "The end."));
    var acts = el("div", "actions st-actions st-col");
    if (chainDiffers(w, f)) acts.appendChild(button("Read the week as you chose it", "btn ghost st-chainbtn", function () { openChain(w, f); }));
    acts.appendChild(button("My week", "btn solid st-weekbtn", function () { openWeekCard(w, f); }));
    page.appendChild(acts);
  }

  /* the week as the player chose it: the chapters that match their own votes, read as one long chapter */
  function openChain(w, f) {
    var m = ownKeys(w, f), steps = [], d;
    for (d = 1; d <= 7; d++) {
      var ch = chapterOf(f, d, m.keys[d]);
      if (!ch) continue;
      steps.push({ t: "head", day: d });
      screensOf(ch).forEach(function (text) { steps.push({ t: "text", text: text }); });
      if (d <= VOTE_DAYS && ch.vote && m.own[d]) steps.push({ t: "chose", day: d, own: !!myVote(w, d), label: labelOf(ch, m.own[d]) });
    }
    steps.push({ t: "chainend" });
    R = { week: w, f: f, day: 0, mode: "read", chain: true, steps: steps, i: 0, ch: {}, key: "" };
    ev("w" + w + "/chain");
    showStep();
  }
  function stepChainEnd(page) {
    page.appendChild(el("h2", "st-vq", "That was your week."));
    var acts = el("div", "actions st-actions");
    acts.appendChild(button("My week", "btn solid", function () { openWeekCard(R.week, R.f); }));
    page.appendChild(acts);
  }

  /* your votes against the world */
  function pctOf(a, b, c) { var t = a + b; return t ? Math.round(100 * (c === "A" ? a : b) / t) : 0; }
  function openWeekCard(w, f) {
    DY(w, 7).read = true; save();
    var p = path(w), same = 0, voted = 0, d;
    var v = el("div", "st-weekcard");
    v.appendChild(kicker("Week " + w));
    v.appendChild(el("h1", "st-h", "Your week"));
    var list = el("div", "st-rows");
    for (d = 1; d <= VOTE_DAYS; d++) {
      var info = closedInfo(w, d), ch = chapterOf(f, d, worldKey(f, d, p)), mine = myVote(w, d);
      var row = el("div", "st-row");
      row.setAttribute("data-day", String(d));
      row.appendChild(el("span", "st-rd", DAYS[d - 1].slice(0, 3)));
      var body = el("div", "st-rb");
      if (mine) voted++;
      var ok = info && mine && mine === info.result;
      if (ok) same++;
      body.appendChild(el("p", "st-you", "You: " + (mine ? labelOf(ch, mine) : "–")));
      body.appendChild(el("p", "st-world", info ? "World: " + labelOf(ch, info.result) + (info.voters ? " · " + pctOf(info.a, info.b, info.result) + "%" : "") : "World: –"));
      row.appendChild(body);
      row.appendChild(el("span", "st-rm " + (mine ? (ok ? "same" : "diff") : "none"), mine ? (ok ? "✓" : "✗") : ""));
      list.appendChild(row);
    }
    v.appendChild(list);
    v.appendChild(el("p", "st-p st-sum", voted ? "You voted with the world " + same + " of " + voted + " times." : "You did not vote this week."));
    var acts = el("div", "actions st-actions st-col");
    if (chainDiffers(w, f)) acts.appendChild(button("Read the week as you chose it", "btn solid", function () { openChain(w, f); }));
    acts.appendChild(button("Back", "btn ghost", function () { var c = clockAt(now()); renderHub(w, f, c.state === "on" && c.week === w ? c : { state: "past", week: w }); }));
    v.appendChild(acts);
    show(v, "weekcard");
    ev("w" + w + "/card");
    if (!DY(w, 7).card) {
      DY(w, 7).card = true; save();
      endCard({ title: "That was the week", line: w < CFG.weeks ? "A new story starts on Monday." : "More stories soon." });
    }
  }

  /* ---------------- the result of a vote ---------------- */
  function country(code) {
    try { return code && code !== "ZZ" ? new Intl.DisplayNames(["en"], { type: "region" }).of(code) : ""; } catch (e) { return ""; }
  }
  function flag(code) {
    if (!/^[A-Z]{2}$/.test(code || "") || code === "ZZ") return "";
    return String.fromCodePoint(0x1F1E6 + code.charCodeAt(0) - 65, 0x1F1E6 + code.charCodeAt(1) - 65);
  }
  function splitBar(a, b, cls) {
    var t = a + b, pa = t ? Math.round(100 * a / t) : 0;
    var bar = el("div", "st-bar " + (cls || ""));
    var ia = el("i", "a"), ib = el("i", "b");
    ia.style.width = pa + "%"; ib.style.width = (t ? 100 - pa : 0) + "%";
    bar.appendChild(ia); bar.appendChild(ib);
    return { node: bar, pa: pa, pb: t ? 100 - pa : 0 };
  }
  function renderResult(w, f, d, o) {
    o = o || {};
    var info = closedInfo(w, d);
    if (!info) { route(); return; }
    var p = path(w), ch = chapterOf(f, d, worldKey(f, d, p));
    var mine = myVote(w, d), cur = clockAt(now());
    var dd = DY(w, d);
    if (!dd.seen) { dd.seen = true; save(); ev("w" + w + "/d" + d + "/result"); }
    if (o.auto) for (var k = 1; k < d; k++) if (myVote(w, k)) DY(w, k).seen = true;      // only the latest result is pushed on the player; the others stay a tap away
    var v = el("div", "st-res");
    v.appendChild(kicker("Chapter " + d + " · " + DAYS[d - 1]));
    var win = info.result, tie = info.a === info.b && info.voters > 0;
    v.appendChild(el("p", "st-small", info.voters ? "The world chose" : "Nobody voted"));
    v.appendChild(el("h1", "st-h big st-win", labelOf(ch, win)));
    if (!info.voters) v.appendChild(el("p", "st-soft", "The story took the first way."));
    else if (tie) v.appendChild(el("p", "st-soft", "A tie. The story took the first way."));

    var world = splitBar(info.a, info.b, "st-bar-world");
    var rowW = el("div", "st-brow");
    rowW.appendChild(el("span", "st-bl", "World"));
    rowW.appendChild(world.node);
    v.appendChild(rowW);
    var cc = WK(w).cache.country, ct = (info.ca || 0) + (info.cb || 0);
    if (ct >= MIN_COUNTRY && country(cc)) {
      var cb = splitBar(info.ca, info.cb, "st-bar-country");
      var rowC = el("div", "st-brow");
      rowC.appendChild(el("span", "st-bl", flag(cc) + " " + country(cc)));
      rowC.appendChild(cb.node);
      v.appendChild(rowC);
    }
    var leg = el("div", "st-leg");
    ["A", "B"].forEach(function (c) {
      var item = el("p", "st-li " + c.toLowerCase() + (mine === c ? " mine" : ""));
      item.appendChild(el("i"));
      item.appendChild(el("span", "", labelOf(ch, c) + " " + pctOf(info.a, info.b, c) + "%" + (ct >= MIN_COUNTRY && country(cc) ? " · " + flag(cc) + " " + pctOf(info.ca, info.cb, c) + "%" : "")));
      if (mine === c) item.appendChild(el("em", "st-tag", "You"));
      leg.appendChild(item);
    });
    v.appendChild(leg);
    v.appendChild(el("p", "st-soft st-vc", countsText(info, d)));

    if (mine && mine !== win && ch && ch.glimpse && ch.glimpse[mine]) {
      var g = el("div", "st-glimpse");
      g.appendChild(el("p", "st-gk", "If the world had gone your way:"));
      rich(g.appendChild(el("p", "st-gt")), ch.glimpse[mine]);
      v.appendChild(g);
    }
    if (ch && ch.science) {
      var s = el("div", "st-science");
      s.appendChild(el("p", "st-gk", "Science"));
      s.appendChild(el("p", "st-gt", String(ch.science)));
      v.appendChild(s);
    }

    var acts = el("div", "actions st-actions st-col");
    var nextDay = d + 1;
    var live = cur.state === "on" && cur.week === w && nextDay <= 7 && nextDay <= cur.day;
    if (live) {
      acts.appendChild(button("Chapter " + cur.day + " is ready", "btn solid st-ready", function () { ev("w" + w + "/d" + cur.day + "/ready"); openChapter(w, f, cur.day, cur.day > VOTE_DAYS || myVote(w, cur.day) ? "read" : "play"); }));
      acts.appendChild(button("The week", "btn ghost", function () { renderHub(w, f, clockAt(now())); }));
    } else {
      acts.appendChild(button("Back", "btn solid", function () { var c = clockAt(now()); renderHub(w, f, c.state === "on" && c.week === w ? c : { state: "past", week: w }); }));
    }
    v.appendChild(acts);
    show(v, "result");
  }

  /* the result of a day that has just closed (the page was open at midnight): fresh counts from the server first */
  function seeResult(w, f, d) {
    loading();
    sync(w).then(function (s) {
      var info = closedInfo(w, d);
      if (info) renderResult(w, f, d, {});
      else renderHub(w, f, s.cur);
    });
  }

  /* ---------------- the finish card ---------------- */
  var cardKeys = null;
  function closeCard() {
    var c = document.getElementById("fin");
    if (c && c.parentNode) c.parentNode.removeChild(c);
    if (cardKeys) { document.removeEventListener("keydown", cardKeys); cardKeys = null; }
  }
  /* the next game the player has not played today: the daily games first, in their order, then the word games */
  function nextGame() {
    if (!TO) return null;
    try {
      var i, G, w;
      for (i = 0; i < (TO.GAMES || []).length; i++) { G = TO.GAMES[i]; if (!TO.playedToday(G)) return { id: G.id, key: G.key, name: G.name, href: G.href }; }
      for (i = 0; i < (TO.WORDS || []).length; i++) { w = TO.WORDS[i]; if (TO.dayNumber(w.start) >= 1 && !TO.wordDone(w)) return { id: w.id, key: w.key, name: w.name, href: w.href }; }
    } catch (e) { /* the card still shows the way home */ }
    return null;
  }
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.6v12.8c0 .9 1 1.5 1.8 1L19 13c.8-.5.8-1.6 0-2.1L9.8 4.6c-.8-.5-1.8.1-1.8 1z" fill="currentColor"/></svg>';
  function endCard(o) {
    closeCard();
    var wrap = el("div", "fin"), scrim = el("div", "fin-scrim");
    wrap.id = "fin";
    wrap.appendChild(scrim);
    var sheet = el("section", "fin-sheet");
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", o.title);
    sheet.setAttribute("tabindex", "-1");
    var top = el("div", "onward-top");
    top.appendChild(el("h2", "fin-h", o.title));
    var x = button("×", "chip round close fin-x", closeCard);
    x.setAttribute("aria-label", LGT("site.close") || "Close");
    top.appendChild(x);
    sheet.appendChild(top);
    if (o.line) sheet.appendChild(el("p", "fin-spot", o.line));
    var next = nextGame(), href = function (h) { return TO && TO.here ? TO.here(h) : h; };
    if (next) {
      var a = el("a", "fin-next");
      a.href = href("../" + next.href);
      a.setAttribute("data-g", next.key);
      a.insertAdjacentHTML("beforeend", PLAY);
      var t = el("span", "fin-next-words");
      t.appendChild(el("span", "", LGT("end.next_game") || "Next game"));
      t.appendChild(el("small", "", next.name));
      a.appendChild(t);
      a.addEventListener("click", function () { ev("next/" + next.id); });
      sheet.appendChild(a);
    } else {
      sheet.appendChild(el("p", "fin-spot", "You have played all of today’s games."));
    }
    var all = el("a", "fin-all");
    all.href = href("../");
    all.appendChild(el("span", "", LGT("end.all_games") || "All games"));
    sheet.appendChild(all);
    try {
      var ws = TO && TO.wordStrip ? TO.wordStrip("en", "en") : null;       // Tell Khayyam (the World table's word side does not belong here)
      if (ws) {
        Array.prototype.slice.call(ws.querySelectorAll("a.eod-cell")).forEach(function (n) { n.parentNode.removeChild(n); });
        var cells = ws.querySelectorAll(".eod-cell").length;
        if (cells) { ws.style.setProperty("--n", String(cells)); sheet.appendChild(ws); }
      }
    } catch (e) { /* Tell Khayyam is optional */ }
    wrap.appendChild(sheet);
    document.body.appendChild(wrap);
    scrim.addEventListener("click", closeCard);
    cardKeys = function (e) { if (e.key === "Escape") closeCard(); };
    document.addEventListener("keydown", cardKeys);
    try { sheet.focus({ preventScroll: true }); } catch (e) { /* no focus */ }
  }

  /* ---------------- the router ---------------- */
  var routing = 0;
  function unseenResult(w, upTo) {
    var found = 0;
    for (var d = 1; d <= VOTE_DAYS && d < upTo; d++) {
      if (myVote(w, d) && !DY(w, d).seen && closedInfo(w, d)) found = d;
    }
    return found;
  }
  function route() {
    var token = ++routing;
    closeCard();
    loading();
    sync().then(function (s) {
      if (token !== routing) return;
      var cur = s.cur;
      lastN = cur.state === "on" ? cur.n : cur.state;
      if (cur.state === "off") { problem("The story is not ready yet.", route); return; }
      if (cur.state === "before") { renderBefore(); return; }
      if (!S.intro) { renderIntro(route); return; }
      var w = s.week;
      loadWeekFile(w).then(function (f) {
        if (token !== routing) return;
        var p = path(w);
        var needed = cur.state === "on" ? cur.day - 1 : 6;
        if (!s.online && p.length < Math.min(needed, VOTE_DAYS)) { problem("Can’t reach the world right now.", route); return; }
        var d = unseenResult(w, cur.state === "on" ? cur.day : 8);
        if (d) { renderResult(w, f, d, { auto: true }); return; }
        renderHub(w, f, cur);
      }, function () {
        if (token !== routing) return;
        problem("The next story is not ready yet.", route);
      });
    });
  }

  /* ---------------- the clock ticks ---------------- */
  var lastN = null;
  function tick() {
    if (view.tick) view.tick();
    var c = clockAt(now());
    var n = c.state === "on" ? c.n : c.state;
    if (lastN !== null && n !== lastN) { lastN = n; rolled(); return; }
    lastN = n;
    /* the vote step closes by itself at the end of the day */
    if (R && view.kind === "vote" && R.end && now() >= R.end && !R.closed) { R.closed = true; showStep(); }
  }
  /* midnight (UTC) came while the page was open */
  function rolled() {
    if (R && view.kind === "vote" && R.end) { R.closed = true; showStep(); return; }
    if (view.kind === "voted" || view.kind === "hub" || view.kind === "before" || view.kind === "intro") { route(); return; }
    if (R && view.kind === "reading" && R.end) R.closed = true;          // reading goes on; the vote step will say it has closed
  }
  window.setInterval(tick, 1000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) tick(); });

  /* the "?" chip shows the first screen again */
  var help = document.getElementById("help-btn");
  if (help) help.addEventListener("click", function () { closeCard(); renderIntro(route, true); });

  var first = clockAt(Date.now());
  lastN = first.state === "on" ? first.n : first.state;
  route();
  window.__story = { route: route, state: function () { return S; } };      // for the tests; nothing in the page uses it
})();
