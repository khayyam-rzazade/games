/* The World table (16 Oct 2026): which country plays the daily games best, today, yesterday, this week and this month.
   Everything comes from the server's summary of a date or a month (/stats/world, server/live/src/tally.js),
   ranked here by assets/js/world.js (LogicersWorld.rank): a country's score is its players' average points,
   made fair across games by the server, pulled toward the world's average while it has few games, plus a small
   bonus for how many games it played (16 Oct 2026). Each table can be shared as a picture of its top 10, the
   winner given the most room (16 Oct 2026, Khayyam: "it has to trigger competition, but simple, at the same time
   attractive").

   Two tables (29 Oct 2026, Khayyam: "on top there is 2 big windows to choose daily word games and daily games",
   and the total "like 30343 today's word games of 4385934854 total"): one slim box at the top, split into two
   halves, Daily games and Word games, each with its games today and its games ever. Tapping a half switches the
   whole page below it to that table (the server's t: "words", tally.js), without loading a new page; the address
   keeps it (?t=words), so a reload, a shared link and a change of language stay on it. The page opens on the word
   games' side when it is opened from a word game or with ?t=words, otherwise on the daily games'.
   The few new words are kept here, in the six languages, until the next build of the dictionaries takes them in
   (the keys wt.side_*): a key the dictionary already has always wins. */
(function () {
  "use strict";

  var TO = window.TurnsOut, W = window.LogicersWorld, LG = window.LG, T = LG ? LG.t : function (k) { return k; };
  function $(id) { return document.getElementById(id); }
  if (!TO || !W) return;
  var el = W.el;
  TO.wireDialogs();
  TO.fixLocalLinks();

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today = W.todayKey();
  var span = "day", shown = null, all = false, allBusy = false;   // all, allBusy: "Show every country" tapped

  /* ---------------- the two tables: daily games and word games (29 Oct 2026) ---------------- */
  var LANG = LG && LG.lang ? LG.lang : "en";
  var NB = "\u00a0";
  var WORDS_T = {
    en: { daily: "Daily games", words: "Word games", today: "{n} today", all: "{n} in all", aria: "Which games",
          lede: "Every word game anyone finishes counts for their country. The better you play, the higher it climbs.",
          help: "Word games have a table of their own, never mixed with the daily games. Each language is scored against its own players that day, so a hard word never sinks a country." },
    it: { daily: "Giochi quotidiani", words: "Giochi di parole", today: "{n} oggi", all: "{n} in tutto", aria: "Quali giochi",
          lede: "Ogni gioco di parole che qualcuno finisce conta per il suo Paese. Più giochi bene, più sale.",
          help: "I giochi di parole hanno una classifica tutta loro, mai mescolata con quella dei giochi quotidiani. Ogni lingua si misura con chi l'ha giocata quel giorno, così una parola difficile non affonda mai un Paese." },
    tr: { daily: "Günlük oyunlar", words: "Kelime oyunları", today: "bugün {n}", all: "toplam {n}", aria: "Hangi oyunlar",
          lede: "Herkesin bitirdiği her kelime oyunu kendi ülkesi için sayılır. Ne kadar iyi oynarsan ülken o kadar yükselir.",
          help: "Kelime oyunlarının kendi tablosu var; günlük oyunlarla hiç karışmaz. Her dil, o gün o dilde oynayanlarla karşılaştırılır; böylece zor bir kelime hiçbir ülkeyi aşağı çekmez." },
    es: { daily: "Juegos diarios", words: "Juegos de palabras", today: "{n} hoy", all: "{n} en total", aria: "Qué juegos",
          lede: "Cada juego de palabras que alguien termina cuenta para su país. Cuanto mejor juegues, más sube.",
          help: "Los juegos de palabras tienen su propia clasificación, que nunca se mezcla con la de los juegos diarios. Cada idioma se mide con quienes lo jugaron ese día, así que una palabra difícil nunca hunde a un país." },
    pt: { daily: "Jogos diários", words: "Jogos de palavras", today: "{n} hoje", all: "{n} no total", aria: "Quais jogos",
          lede: "Todo jogo de palavras que alguém termina conta para o país dessa pessoa. Quanto melhor você joga, mais alto o país sobe.",
          help: "Os jogos de palavras têm um ranking só deles, que nunca se mistura com o dos jogos diários. Cada idioma é comparado com quem jogou nele naquele dia, então uma palavra difícil nunca derruba um país." },
    fr: { daily: "Jeux du jour", words: "Jeux de mots", today: "{n} aujourd’hui", all: "{n} au total", aria: "Quels jeux",
          lede: "Chaque jeu de mots que quelqu’un termine compte pour son pays. Mieux tu joues, plus il monte.",
          help: "Les jeux de mots ont leur propre classement, jamais mêlé à celui des jeux du jour. Chaque langue est comparée à ceux qui l’ont jouée ce jour-là" + NB + ": un mot difficile ne fait donc jamais plonger un pays." }
  };
  function L(k, vars) {
    var key = "wt.side_" + k;
    if (LG && T.has && T.has(key)) return T(key, vars);
    var s = (WORDS_T[LANG] || WORDS_T.en)[k] || WORDS_T.en[k] || "";
    return vars ? s.replace(/\{([a-z]+)\}/g, function (m, v) { return Object.prototype.hasOwnProperty.call(vars, v) ? String(vars[v]) : m; }) : s;
  }
  /* The word games, in the order of the home page's row. A word game joins the word table on the server by itself;
     here it needs one line, for "Play" and for opening on the word side: its folder and its own storage key, whose
     "main" holds the day's first finished play (the three games write it so). */
  var WORD_GAMES = [
    { id: "altitude", href: "altitude/", store: "altitude:v1" },
    { id: "lookalike", href: "lookalike/", store: "lookalike:v1" },
    { id: "passport", href: "passport/", store: "passport:v1" }
  ];
  function wordPlayed(G) {
    try { var s = JSON.parse(window.localStorage.getItem(G.store) || "null"); return !!(s && s.main && s.main[today]); } catch (e) { return false; }
  }
  var query = (function () { try { return new window.URLSearchParams(window.location.search); } catch (e) { return null; } })();
  var side = (function () {
    var t = query ? query.get("t") : "";
    if (t === "words" || t === "daily") return t;
    try {
      var r = document.referrer ? new URL(document.referrer) : null;
      if (r && r.origin === window.location.origin && WORD_GAMES.some(function (G) { return r.pathname.indexOf("/" + G.href) >= 0; })) return "words";
    } catch (e) { /* no referrer: the daily games */ }
    return "daily";
  })();
  function isWords() { return side === "words"; }
  function sideQ(first) { return isWords() ? (first ? "?" : "&") + "t=words" : ""; }
  var tot = null;                                  // { d, daily: [today, ever], words: [today, ever] }, today's
  function sideBox() {
    var box = $("wt-side");
    if (!box) return;
    if (!box.firstChild) {
      box.setAttribute("aria-label", L("aria"));
      ["daily", "words"].forEach(function (t) {
        var b = el("button", "wt-sd");
        b.type = "button";
        b.id = "side-" + t;
        b.setAttribute("role", "tab");
        b.setAttribute("data-t", t);
        b.appendChild(el("b", "", L(t)));
        var n = el("span", "wt-sd-n");
        n.appendChild(el("span", "wt-sd-day", ""));
        n.appendChild(el("span", "wt-sd-all", ""));
        b.appendChild(n);
        b.addEventListener("click", function () { if (side !== t) setSide(t); });
        box.appendChild(b);
      });
      box.hidden = false;
    }
    ["daily", "words"].forEach(function (t) {
      var b = $("side-" + t), on = side === t;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      var x = tot && tot[t];
      b.querySelector(".wt-sd-day").textContent = x ? L("today", { n: W.commas(x[0]) }) : "";
      b.querySelector(".wt-sd-all").textContent = x ? L("all", { n: W.commas(x[1]) }) : "";
      b.setAttribute("aria-label", L(t) + (x ? ": " + L("today", { n: W.commas(x[0]) }) + ", " + L("all", { n: W.commas(x[1]) }) : ""));
    });
  }
  var LEDE = null;                                 // the daily games' lede, as the page came
  function sideWords() {
    var lede = document.querySelector(".wt-lede");
    if (lede) {
      if (LEDE === null) LEDE = lede.textContent;
      lede.textContent = isWords() ? L("lede") : LEDE;
    }
    var help = $("wt-help-words");
    if (!help) {
      var ol = document.querySelector("#dlg-help ol");
      if (ol) {
        help = el("p", "quiet wt-help-words", L("help"));
        help.id = "wt-help-words";
        ol.parentNode.insertBefore(help, ol.nextSibling);
      }
    }
    if (help) help.hidden = !isWords();
  }
  function setSide(t) {
    side = t === "words" ? "words" : "daily";
    try {
      var q2 = new window.URLSearchParams(window.location.search);
      if (isWords()) q2.set("t", "words"); else q2.delete("t");
      var qs = q2.toString();
      window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : "") + window.location.hash);
    } catch (e) { /* the address just stays */ }
    TO.count(isWords() ? "world/side-words" : "world/side-daily");
    sideBox();
    sideWords();
    play();
    if (home()) team(home());
    if (W.on()) load(span);
  }

  /* the way to today's games: how many are played */
  function play() {
    if (isWords()) {                                 /* the word games: the first not played today, else their row at home */
      var wn = WORD_GAMES.filter(wordPlayed).length, WN = WORD_GAMES.length, wf = null;
      WORD_GAMES.forEach(function (G) { if (!wf && !wordPlayed(G)) wf = G; });
      $("wt-play-kicker").textContent = wn === WN ? T("wt.all_played", { n: WN }) : T("wt.n_played_today", { n: wn, of: WN });
      $("wt-play").href = wf ? TO.here(LG ? LG.href(wf.href) : "../" + wf.href) : TO.here("../") + "#words-title";
      return;
    }
    var n = TO.GAMES.filter(TO.playedToday).length, N = TO.GAMES.length;
    $("wt-play-kicker").textContent = n === N ? T("wt.all_played", { n: N }) : T("wt.n_played_today", { n: n, of: N });
    /* 19 Oct 2026, Khayyam: "it has to bring me to where the games are". The button opens the first game not yet
       played today (from there every finished game hands on to the next); with all of them played it goes to
       the games that never run out, on the home page. */
    var first = null;
    TO.GAMES.forEach(function (G) { if (!first && !TO.playedToday(G)) first = G; });
    var a = $("wt-play");
    a.href = first ? TO.here("../" + first.href) : TO.here("../") + "#more-to-play";   /* ../ is this language's home and games */
  }
  /* your country's team page, the other half of the button (19 Oct 2026): shown once the country is known (the one
     the last answer named is kept in this browser, so the button is there at once the next time) */
  function team(c) {
    var a = $("wt-team"), name = W.countryName(c);
    if (!name) { a.hidden = true; $("wt-go").classList.remove("two"); $("wt-play-b").textContent = T("wt.play_for_country"); return; }
    var k = $("wt-team-kicker");
    k.textContent = "";
    k.appendChild(W.flagEl(c));
    k.appendChild(document.createTextNode(name));
    a.href = W.teamHref(c) + sideQ();
    a.setAttribute("aria-label", T("wt.team_page_aria", { country: name }));
    a.hidden = false;
    $("wt-go").classList.add("two");
    $("wt-play-b").textContent = T("site.play");
  }
  function home() { var c = TO.worldStore().home; return typeof c === "string" && /^[A-Z]{2}$/.test(c) ? c : ""; }
  function remember(c) {
    if (!/^[A-Z]{2}$/.test(String(c)) || home() === c) return;
    try { TO.worldUpdate(function (w) { w.home = c; }); } catch (e) { /* the button simply waits for the next answer */ }
  }
  $("wt-team").addEventListener("click", function () { TO.count("world/team"); });

  /* the privacy switch */
  var opt = $("wt-optin");
  opt.checked = !W.off();
  opt.addEventListener("change", function () {
    W.setOff(!opt.checked);
    $("wt-optnote").textContent = opt.checked ? T("wt.opt_in_note") : T("wt.opt_out_note");
    $("wt-optnote").hidden = false;
    TO.count(opt.checked ? "world/opt-in" : "world/opt-out");
  });

  /* the week runs from Monday, as the server counts it */
  function monday(key) { var d = W.dateOf(key); return d ? W.shiftKey(key, -((d.getDay() + 6) % 7)) : key; }
  function dayWords(key) { var d = W.dateOf(key); return d ? (LG ? LG.date(d, { weekday: "long", day: "numeric", month: "long" }) : DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]) : ""; }
  function monthWords(d) { return LG ? LG.date(d, { month: "long", year: "numeric" }) : MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function words(key, sp) {
    var d = W.dateOf(key);
    if (!d) return "";
    if (sp === "month") return T("wt.month_up_to_today", { month: monthWords(d) });
    if (sp === "week") return T("wt.from_up_to_today", { day: dayWords(monday(key)) });
    return dayWords(key);
  }
  function when(sp) { return sp === "month" ? T("wt.this_month") : sp === "week" ? T("wt.this_week") : sp === "yday" ? T("wt.yesterday") : T("wt.today_lower"); }
  function ofSpan(sp) { return sp === "yday" ? "day" : sp; }        // the table the server and the ranking know

  function row(x, i, mine, value, sub, barMax) {
    var li = el("li", x.c === mine ? "me" : "");
    li.appendChild(el("span", "at", i ? String(i) : "–"));
    var who = el("span", "who");
    var tl = el("a", "wt-tl");
    tl.href = W.teamHref(x.c) + sideQ();
    tl.appendChild(W.flagEl(x.c));
    tl.appendChild(document.createTextNode(W.countryName(x.c)));
    who.appendChild(tl);
    if (sub) who.appendChild(el("small", "", sub));
    li.appendChild(who);
    var val = el("span", "val");
    val.appendChild(el("b", "", value));
    if (barMax) {
      var bar = el("span", "wd-bar"), fill = el("i", "");
      fill.style.width = Math.max(3, Math.round(100 * x.played / barMax)) + "%";
      bar.appendChild(fill);
      val.appendChild(bar);
    }
    li.appendChild(val);
    return li;
  }
  function gap() { var li = el("li", "gap"); li.appendChild(el("span", "", "···")); li.setAttribute("aria-hidden", "true"); return li; }
  function games(n) { return T.n(n, "wt.games", { n: W.commas(n) }); }

  function mineCard(d, t, sp) {
    var box = $("wt-mine");
    box.textContent = "";
    var you = d.you || {}, c = you.c, name = W.countryName(c);
    if (name) remember(c);
    team(name ? c : "");
    var x = null;
    t.rows.forEach(function (r) { if (r.c === c) x = r; });
    var note = el("p", "wd-note");
    note.hidden = true;
    note.setAttribute("role", "status");
    if (!name) {
      box.appendChild(el("p", "wt-mine-line", T("wt.no_country")));
      return;
    }
    var top = el("div", "wt-mine-top");
    var f = el("span", "wt-bigflag", W.flag(c));
    f.setAttribute("aria-hidden", "true");
    top.appendChild(f);
    var nm = el("div", "wt-mine-name");
    nm.appendChild(el("b", "", name));
    nm.appendChild(el("span", "", T("wt.your_country_when", { when: when(sp) })));
    top.appendChild(nm);
    if (x && x.at) {
      var pl = el("div", "wt-place");
      pl.appendChild(el("b", "", W.nth(x.at)));
      pl.appendChild(el("span", "", T("wt.of_n", { n: t.ranked.length })));
      top.appendChild(pl);
    }
    box.appendChild(top);

    var facts = el("div", "wt-mine-facts");
    function fact(v, label) { var e = el("div", "wt-fact"); e.appendChild(el("b", "", v)); e.appendChild(el("span", "", label)); facts.appendChild(e); }
    fact(x && x.at ? String(Math.round(x.s)) : "–", T("wt.score"));
    fact(x ? W.commas(x.played) : "0", x && x.played === 1 ? T("wt.game_played") : T("wt.games_played"));
    fact(String(Math.round(t.m)), T("wt.world_avg"));
    box.appendChild(facts);

    var line = el("p", "wt-mine-line");
    if (x && x.at === 1) {
      line.appendChild(document.createTextNode(T("wt.top_of_world", { when: when(sp) })));
      if (t.ranked[1]) {
        var lead = Math.round(x.s - t.ranked[1].s);
        line.appendChild(document.createTextNode(" " + (lead >= 1 ? T.n(lead, "wt.points_ahead", { country: W.countryName(t.ranked[1].c) }) : T("wt.just_ahead_of", { country: W.countryName(t.ranked[1].c) }))));
      }
    } else if (x && x.at) {
      var above = t.ranked[x.at - 2], diff = Math.max(1, Math.round(above.s - x.s));
      line.innerHTML = T.n(diff, "wt.points_behind", { flag: W.flag(above.c), country: W.esc(W.countryName(above.c)), place: W.nth(above.at) });
    } else if (x && x.played) {
      var need = Math.max(1, t.min - x.n);
      line.innerHTML = T.n(need, "wt.more_games_place", { country: W.esc(name) });
    } else {
      line.textContent = sp === "day" ? T("wt.no_games_today", { country: name }) : T("wt.no_games_when", { country: name, when: when(sp) });
    }
    box.appendChild(line);
    if (sp !== "yday") {
      box.appendChild(duo(c, sp === "day" && x ? x.at : 0, note));
      box.appendChild(note);
      fitDuo();
    }
  }

  /* The two ways to bring friends, side by side in one box that never grows taller (16 Oct 2026, Khayyam:
     "the same size button next to 'invite friends from Italy' saying 'create your room with your friends'",
     and then "this is how we keep taking more and more space... i don't want it"). The long words show where
     the box is wide enough; a phone gets the short ones, on one line. A browser already in a room gets "Your
     room", which opens it, instead of a second room. */
  var ROOM_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="7" cy="7.2" r="2.9" fill="currentColor"/><circle cx="13.6" cy="8.2" r="2.4" fill="currentColor" opacity=".55"/><path d="M1.8 16.4c.4-3 2.5-4.7 5.2-4.7s4.8 1.7 5.2 4.7z" fill="currentColor"/><path d="M12.4 16.4c-.2-1.6-.8-2.9-1.8-3.8.9-.6 1.9-.9 3-.9 2.3 0 4.1 1.5 4.6 4.7z" fill="currentColor" opacity=".55"/></svg>';
  function inRoom() {
    try { return TO.roomsStore().list.some(function (r) { return r && typeof r.code === "string"; }); } catch (e) { return false; }
  }
  function duo(c, place, note) {
    var box = el("div", "wt-duo");
    var inv = W.inviteButton(c, place, note, "wt-duo-inv"), name = W.countryName(c);
    inv.textContent = "";
    inv.appendChild(el("span", "wt-long", name ? T("world.invite_from", { country: name }) : T("world.invite")));
    inv.appendChild(el("span", "wt-short", T("world.invite")));
    box.appendChild(inv);
    var mine = inRoom(), a = el("a", "wt-duo-room");
    a.href = TO.here("../room/");
    a.id = "wt-room";
    a.insertAdjacentHTML("beforeend", ROOM_ICON);
    a.appendChild(el("span", "", mine ? T("wt.your_room") : T("wt.start_room")));
    a.addEventListener("click", function () { TO.count(mine ? "world/room" : "world/room-new"); });
    box.appendChild(a);
    return box;
  }
  /* a long country name ("Invite friends from Bosnia and Herzegovina") takes the short words, so nothing is cut */
  function fitDuo() {
    Array.prototype.forEach.call(document.querySelectorAll(".wt-duo-inv"), function (b) {
      b.classList.remove("tight");
      var long = b.querySelector(".wt-long");
      if (long && (long.scrollWidth > long.clientWidth + 1 || b.scrollWidth > b.clientWidth + 1)) b.classList.add("tight");
    });
  }
  window.addEventListener("resize", fitDuo);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitDuo, function () {});

  function render(d, sp) {
    shown = { d: d, sp: sp };
    loadFonts();
    var t = W.rank(Object.assign({}, d, { span: ofSpan(sp) }));
    var mine = (d.you || {}).c;
    shown.t = t;
    $("wt-date").textContent = words(d.d, ofSpan(sp));
    mineCard(d, t, sp);
    play();

    /* continents */
    var cl = $("wt-conts");
    cl.textContent = "";
    t.conts.forEach(function (x) {
      var li = el("li", x.ct === (d.you || {}).ct ? "me" : "");
      li.appendChild(el("span", "n", W.contName(x.ct)));
      var bar = el("span", "wd-bar"), fill = el("i", "");
      fill.style.width = Math.max(2, Math.min(100, x.s)) + "%";
      bar.appendChild(fill);
      li.appendChild(bar);
      li.appendChild(el("b", "", String(Math.round(x.s))));
      cl.appendChild(li);
    });
    $("wt-conts-card").hidden = t.conts.length < 2;

    /* the best scores: the top 10 (or all), and your country's row where it stands */
    var best = $("wt-best");
    best.textContent = "";
    var cut = all ? t.ranked.length : 10, meAt = 0;      // the top 10; "Show every country", all of them
    t.ranked.forEach(function (x) { if (x.c === mine) meAt = x.at; });
    t.ranked.slice(0, cut).forEach(function (x) { best.appendChild(row(x, x.at, mine, String(Math.round(x.s)), games(x.played))); });
    if (meAt > cut) {
      if (meAt > cut + 1) best.appendChild(gap());
      best.appendChild(row(t.ranked[meAt - 1], meAt, mine, String(Math.round(t.ranked[meAt - 1].s)), games(t.ranked[meAt - 1].played)));
    }
    $("wt-best-more").hidden = all || t.ranked.length <= 10;
    $("wt-best-note").textContent = t.ranked.length
      ? T.n(t.ranked.length, "wt.countries_with", { min: t.min })
      : T("wt.no_country_yet", { min: t.min, when: when(sp) });
    $("wt-best-card").hidden = !t.rows.length;
    $("wt-share").hidden = !t.ranked.length;

    /* the most games played */
    var busy = $("wt-busy");
    busy.textContent = "";
    var max = t.busy.length ? t.busy[0].played : 1, busyAt = 0;
    t.busy.forEach(function (x, i) { if (x.c === mine) busyAt = i + 1; });
    var busyCut = allBusy ? t.busy.length : 10;
    t.busy.slice(0, busyCut).forEach(function (x, i) { busy.appendChild(row(x, i + 1, mine, W.commas(x.played), "", max)); });
    if (busyAt > busyCut) {
      if (busyAt > busyCut + 1) busy.appendChild(gap());
      busy.appendChild(row(t.busy[busyAt - 1], busyAt, mine, W.commas(t.busy[busyAt - 1].played), "", max));
    }
    $("wt-busy-more").hidden = allBusy || t.busy.length <= 10;
    $("wt-busy-card").hidden = !t.busy.length;
    $("wt-share-busy").hidden = !t.busy.length;

    var total = (d.n || 0) + (d.calls || 0);
    $("wt-foot").textContent = total
      ? T("wt.foot", { games: games(total), when: when(sp), countries: T.n(t.rows.length, "wt.countries") })
      : T("wt.nobody_yet", { when: when(sp) });
  }

  var asked = 0;                                   // the latest call: an answer to an earlier one is dropped
  function load(sp) {
    span = sp;
    all = false;
    allBusy = false;
    ["day", "yday", "week", "month"].forEach(function (s) { $("tab-" + s).setAttribute("aria-selected", s === sp ? "true" : "false"); });
    var key = sp === "yday" ? W.shiftKey(today, -1) : today, mine = ++asked;
    $("wt-mine").textContent = "";
    $("wt-mine").appendChild(el("p", "wt-wait", T("world.counting")));
    return W.call("world", { d: key, span: ofSpan(sp), t: side, tot: 1 }).then(function (r) {
      if (mine !== asked) return;                   // another tab or half was tapped meanwhile
      if (r.status !== 200) { fail(); return; }
      if (r.data && r.data.tot && r.data.tot.d === today) { tot = r.data.tot; sideBox(); }
      render(r.data, sp);
    }, function () { if (mine === asked) fail(); });
  }
  function fail() {
    shown = null;
    var box = $("wt-mine");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", T("wt.unreachable")));
    ["wt-conts-card", "wt-best-card", "wt-busy-card"].forEach(function (id) { $(id).hidden = true; });
  }

  /* ---------------- the picture you share: the top 10, the winner given the most room ----------------
     Drawn when the button is tapped, at once (fonts loaded beforehand), so the phone's share sheet still opens
     from the tap. 1080 by 1350, the shape the chat apps and Instagram show whole. */
  var EMO = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  var F = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif', FD = '"Bricolage Grotesque", ' + F;
  var GOLD = "#F6C445", INK = "#15172B";
  var fontsReady = null, flagsDraw = null;
  function loadFonts() {
    if (fontsReady || !(document.fonts && document.fonts.load)) return;
    fontsReady = Promise.all([
      document.fonts.load('800 80px "Bricolage Grotesque"'),
      document.fonts.load('800 40px "Figtree"'),
      document.fonts.load('700 40px "Figtree"'),
      document.fonts.load('600 34px "Figtree"')
    ]).catch(function () {});
  }
  /* whether this system draws flags (Windows writes two letters instead): Italy's in colour, or not */
  function canFlag() {
    if (flagsDraw !== null) return flagsDraw;
    flagsDraw = false;
    try {
      var c = document.createElement("canvas");
      c.width = c.height = 40;
      var x = c.getContext("2d");
      x.font = "32px " + EMO;
      x.textBaseline = "top";
      x.fillStyle = "#000000";
      x.fillText(W.flag("IT"), 2, 2);
      var p = x.getImageData(0, 0, 40, 40).data;
      for (var i = 0; i < p.length; i += 4) {
        if (p[i + 3] > 150 && (Math.abs(p[i] - p[i + 1]) > 60 || Math.abs(p[i + 1] - p[i + 2]) > 60)) { flagsDraw = true; break; }
      }
    } catch (e) { flagsDraw = false; }
    return flagsDraw;
  }
  function roundRect(x, l, t, w, h, r) {
    x.beginPath();
    x.moveTo(l + r, t);
    x.arcTo(l + w, t, l + w, t + h, r);
    x.arcTo(l + w, t + h, l, t + h, r);
    x.arcTo(l, t + h, l, t, r);
    x.arcTo(l, t, l + w, t, r);
    x.closePath();
  }
  /* the font at size, made smaller until text fits in w */
  function fit(x, text, weight, size, family, w, least) {
    x.font = weight + " " + size + "px " + family;
    while (x.measureText(text).width > w && size > (least || 20)) { size -= 2; x.font = weight + " " + size + "px " + family; }
    return size;
  }
  /* a flag at (l, middle) of height h; or, where flags aren't drawn, the country's two letters in a pill */
  function drawFlag(x, c, l, mid, h, light) {
    x.font = Math.round(h) + "px " + EMO;
    var fw = x.measureText(W.flag(c)).width;
    if (canFlag() && fw && fw < h * 1.6) {          // a code with no flag of its own comes out as two wide letters
      x.textAlign = "left";
      x.textBaseline = "middle";
      x.fillText(W.flag(c), l, mid + h * 0.04);
      x.textBaseline = "alphabetic";
      return Math.ceil(fw);
    }
    var w = Math.round(h * 1.3), ph = Math.round(h * 0.86);
    roundRect(x, l, mid - ph / 2, w, ph, ph * 0.22);
    x.fillStyle = light ? "rgba(21, 23, 43, .14)" : "rgba(255, 255, 255, .16)";
    x.fill();
    x.fillStyle = light ? INK : "#ffffff";
    x.font = "800 " + Math.round(h * 0.42) + "px " + F;
    x.textAlign = "center";
    x.fillText(c, l + w / 2, mid + h * 0.15);
    x.textAlign = "left";
    return w;
  }
  function crown(x, cx, cy, s) {           // a small crown, s wide
    x.beginPath();
    x.moveTo(cx - s / 2, cy + s * 0.3);
    x.lineTo(cx - s / 2, cy - s * 0.22);
    x.lineTo(cx - s / 4, cy + s * 0.02);
    x.lineTo(cx, cy - s * 0.34);
    x.lineTo(cx + s / 4, cy + s * 0.02);
    x.lineTo(cx + s / 2, cy - s * 0.22);
    x.lineTo(cx + s / 2, cy + s * 0.3);
    x.closePath();
    x.fill();
  }
  /* what the picture says of the table: "Friday 16 October", "Week of 12 October", "October 2026" */
  function period(key, sp) {
    var d = W.dateOf(key);
    if (!d) return "";
    if (sp === "month") return monthWords(d);
    if (sp === "week") { var m = W.dateOf(monday(key)); return T("wt.week_of", { day: LG ? LG.date(m, { day: "numeric", month: "long" }) : m.getDate() + " " + MONTHS[m.getMonth()] }); }
    return dayWords(key);
  }
  function topLine(sp, busy) {
    var w = sp === "month" ? T("wt.this_month") : sp === "week" ? T("wt.this_week") : sp === "yday" ? T("wt.that_day") : T("wt.today_lower");
    return busy ? T("wt.pic_most_games", { when: w }) : T("wt.pic_top", { when: w });
  }
  /* two tables can be shared: the best scores (the default) and, since 16 Oct 2026 on Khayyam's word ("maybe the
     same share top 10 country for most games played part too?"), the most games played. Both are drawn alike;
     the second counts games, never players, because the server counts games. */
  function picRows(t, busy) {
    if (!busy) return t.ranked.map(function (r) { return { c: r.c, at: r.at, big: String(Math.round(r.s)), s: r.s, played: r.played }; });
    return t.busy.map(function (r, i) { return { c: r.c, at: i + 1, big: W.commas(r.played), played: r.played }; });
  }
  function drawTable(d, t, sp, busy) {
    var WD = 1080, HT = 1350, M = 72;
    var c = document.createElement("canvas");
    c.width = WD; c.height = HT;
    var x = c.getContext("2d");
    var bg = x.createLinearGradient(0, 0, 0, HT);
    bg.addColorStop(0, "#262B52");
    bg.addColorStop(1, "#0F1126");
    x.fillStyle = bg;
    x.fillRect(0, 0, WD, HT);
    x.textBaseline = "alphabetic";

    x.fillStyle = "#ffffff";
    x.textAlign = "left";
    x.font = "800 46px " + FD;
    x.fillText("Logicers", M, 104);
    x.textAlign = "right";
    x.globalAlpha = 0.75;
    x.font = "700 36px " + F;
    var label = (busy ? T("wt.most_games_played") : T("world.table")) + (isWords() ? " · " + L("words") : "");
    fit(x, label, "700", 36, F, WD - 2 * M - 250, 22);
    x.fillText(label, WD - M, 104);
    x.globalAlpha = 1;
    x.textAlign = "left";
    fit(x, period(d.d, sp), "800", 76, FD, WD - 2 * M, 40);
    x.fillText(period(d.d, sp), M - 3, 200);

    /* the winner */
    var list = picRows(t, busy), w1 = list[0], top = 236, bh = 372;
    var g = x.createLinearGradient(0, top, 0, top + bh);
    g.addColorStop(0, "#FFD866");
    g.addColorStop(1, "#F2B33A");
    roundRect(x, M, top, WD - 2 * M, bh, 40);
    x.fillStyle = g;
    x.fill();
    x.fillStyle = INK;
    crown(x, M + 66, top + 64, 46);
    x.font = "800 30px " + F;
    x.fillText(topLine(sp, busy).toUpperCase(), M + 104, top + 75);
    x.textAlign = "right";
    x.font = "800 30px " + F;
    x.fillText(T("wt.pic_first"), WD - M - 44, top + 75);
    x.textAlign = "left";
    var fw = drawFlag(x, w1.c, M + 44, top + 178, 120, true);
    x.fillStyle = INK;
    var nl = M + 44 + fw + 30, nw = WD - M - 44 - nl;
    x.font = "700 40px " + F;
    x.fillText(T("wt.congratulations"), nl, top + 150);
    fit(x, W.countryName(w1.c) + "!", "800", 76, FD, nw, 36);
    x.fillText(W.countryName(w1.c) + "!", nl - 2, top + 226);
    /* its score, games and lead */
    x.fillStyle = "rgba(21, 23, 43, .12)";
    x.fillRect(M + 44, top + 266, WD - 2 * M - 88, 2);
    x.fillStyle = INK;
    var facts;
    if (busy) {
      var sum = 0;
      list.forEach(function (r) { sum += r.played; });
      var part = sum ? Math.round(100 * w1.played / sum) : 0;
      facts = [[W.commas(w1.played), w1.played === 1 ? T("wt.game") : T("wt.games_word")], [(part < 1 && w1.played ? "<1" : String(part)) + "%", T("wt.of_all_games")]];
      if (list[1]) {
        var more = w1.played - list[1].played;
        facts.push(more >= 1 ? ["+" + W.commas(more), T("wt.ahead_of_2nd")] : ["0", T("wt.level_with_2nd")]);
      }
    } else {
      facts = [[String(Math.round(w1.s)), T("wt.points")], [W.commas(w1.played), w1.played === 1 ? T("wt.game") : T("wt.games_word")]];
      if (list[1]) {
        var lead = Math.round(w1.s - list[1].s);
        facts.push(lead >= 1 ? ["+" + lead, T("wt.ahead_of_2nd")] : ["0", T("wt.just_ahead")]);
      }
    }
    var cw = (WD - 2 * M - 88) / 3;
    facts.forEach(function (f, i) {
      var l = M + 44 + i * cw;
      fit(x, f[0], "800", 58, FD, cw * 0.6, 34);         // a long count of games makes the figure smaller, not wider
      x.fillText(f[0], l, top + 336);
      var vw = x.measureText(f[0]).width;
      fit(x, f[1], "700", 30, F, cw - vw - 28, 18);
      x.fillText(f[1], l + vw + 12, top + 334);
    });

    /* 2nd to 10th */
    var rows = list.slice(1, 10), rh = 58, y0 = top + bh + 34;
    var RANK = ["#D9DEEC", "#E9A877"];
    rows.forEach(function (r, i) {
      var y = y0 + i * rh, mid = y + rh / 2;
      if (i) { x.fillStyle = "rgba(255, 255, 255, .09)"; x.fillRect(M, y, WD - 2 * M, 2); }
      x.textAlign = "center";
      x.fillStyle = RANK[i] || "rgba(255, 255, 255, .6)";
      x.font = "800 38px " + FD;
      x.fillText(String(r.at), M + 26, mid + 13);
      x.textAlign = "left";
      var w = drawFlag(x, r.c, M + 70, mid, 42, false);
      x.fillStyle = "#ffffff";
      var l = M + 70 + w + 18;
      x.font = "800 42px " + FD;
      var bw = x.measureText(r.big).width;
      fit(x, W.countryName(r.c), "700", 38, F, WD - M - 40 - bw - l, 24);
      x.fillText(W.countryName(r.c), l, mid + 13);
      x.textAlign = "right";
      x.font = "800 42px " + FD;
      x.fillText(r.big, WD - M - 8, mid + 15);
      x.textAlign = "left";
    });

    /* the challenge */
    var total = (d.n || 0) + (d.calls || 0);
    x.fillStyle = "#ffffff";
    var ask = busy ? T("wt.catch_them") : T("wt.beat_them");
    fit(x, ask, "800", 62, FD, WD - 2 * M, 36);
    x.fillText(ask, M - 2, 1228);
    var where = TO.address() || "logicers.com";
    x.fillStyle = GOLD;
    x.font = "800 38px " + F;
    x.fillText(where + "/" + (LG ? LG.base : "") + "world", M, 1290);
    var pw = x.measureText(where + "/" + (LG ? LG.base : "") + "world").width;
    x.textAlign = "right";
    x.fillStyle = "rgba(255, 255, 255, .7)";
    var sum = games(total) + ", " + T.n(t.rows.length, "wt.countries");
    fit(x, sum, "600", 32, F, WD - 2 * M - pw - 30, 20);
    x.fillText(sum, WD - M, 1290);
    x.textAlign = "left";
    return c;
  }
  function shareText(d, t, sp, busy) {
    var list = picRows(t, busy), w1 = list[0], name = W.countryName(w1.c), mine = (d.you || {}).c, me = null;
    list.forEach(function (r) { if (r.c === mine) me = r; });
    var lines = [busy
      ? (sp === "yday" ? "🎮 " + T("wt.share_most_yday", { country: name }) : "🎮 " + T("wt.share_most", { country: name, when: when(sp) }))
      : (sp === "yday" ? "🏆 " + T("wt.share_top_yday", { country: name }) : "🏆 " + T("wt.share_top", { country: name, when: when(sp) }))];
    if (isWords()) lines[0] += " (" + L("words") + ")";
    function line(r) { return r.at + ". " + W.flag(r.c) + " " + W.countryName(r.c) + " " + r.big + (busy ? " " + (r.played === 1 ? T("wt.game") : T("wt.games_word")) : ""); }
    list.slice(0, 3).forEach(function (r) { lines.push(line(r)); });
    if (me && me.at > 3) lines.push("…" + line(me));
    lines.push((busy ? T("wt.catch_them") : T("wt.beat_them")) + " " + W.tableUrl() + sideQ(true));
    return lines.join("\n");
  }
  function fileName(d, sp, busy) {
    var k = String(sp === "week" ? monday(d.d) : d.d), day = k.slice(0, 4) + "-" + k.slice(4, 6) + "-" + k.slice(6, 8);
    return "logicers-world-" + (isWords() ? "words-" : "") + (busy ? "games-" : "") + (sp === "month" ? day.slice(0, 7) : sp === "week" ? "week-" + day : day) + ".png";
  }
  function blobOf(url) {
    var b = window.atob(url.split(",")[1]), a = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
    return new Blob([a], { type: "image/png" });
  }
  var shareUrl = null;
  function shareTable(busy) {
    if (!shown || !shown.t || !(busy ? shown.t.busy : shown.t.ranked).length) return;
    var d = shown.d, t = shown.t, sp = shown.sp, url = "", blob = null, text = shareText(d, t, sp, busy);
    try { url = drawTable(d, t, sp, busy).toDataURL("image/png"); blob = blobOf(url); } catch (e) { url = ""; blob = null; }
    TO.count(busy ? "world/share-games" : "world/share");
    $("share-title").textContent = busy ? T("wt.share_most_title") : T("wt.share_title");
    $("share-img").alt = busy ? T("wt.share_most_alt") : T("wt.share_alt");
    TO.share({ blob: blob, filename: fileName(d, sp, busy), text: text }).then(function (how) {
      if (how !== "fallback") return;
      var img = $("share-img"), save = $("share-save");
      if (shareUrl) { window.URL.revokeObjectURL(shareUrl); shareUrl = null; }
      if (blob) {
        shareUrl = window.URL.createObjectURL(blob);
        img.src = url; img.hidden = false;
        save.href = shareUrl; save.hidden = false;
        save.setAttribute("download", fileName(d, sp, busy));
      } else { img.hidden = true; save.hidden = true; }
      $("share-copied").textContent = "";
      $("share-copy").onclick = function () {
        TO.copyText(text).then(function (ok) {
          $("share-copied").textContent = ok ? T("wt.copied_post") : T("world.copy_failed", { url: W.tableUrl() });
        });
      };
      TO.openDialog($("dlg-share"));
    });
  }
  $("wt-share").addEventListener("click", function () { shareTable(false); });
  $("wt-share-busy").addEventListener("click", function () { shareTable(true); });

  $("tab-day").addEventListener("click", function () { load("day"); });
  $("tab-yday").addEventListener("click", function () { load("yday"); });
  $("tab-week").addEventListener("click", function () { load("week"); });
  $("tab-month").addEventListener("click", function () { load("month"); });
  $("wt-best-more").addEventListener("click", function () { all = true; if (shown) render(shown.d, shown.sp); });
  $("wt-busy-more").addEventListener("click", function () { allBusy = true; if (shown) render(shown.d, shown.sp); });

  sideBox();
  sideWords();
  play();
  if (home()) team(home());
  if (!W.on()) {
    var box = $("wt-mine");
    box.textContent = "";
    box.appendChild(el("p", "wt-mine-line", T("wt.off_here")));
    return;
  }
  /* today's games not yet counted go first, so your own country already holds them */
  W.flushBoth(today).then(function () { return load("day"); }, function () { return load("day"); });
})();
