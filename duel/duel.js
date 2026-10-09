/* The duel page: where a friend's link lands.
   It merges the link, says plainly what happened, points at the first game not played today, and
   shows a worked example of the card. It asks for nothing: no name, no email, no permission, no form.
   Everything it knows came inside the link, after the "#", which never reaches a server. */
(function () {
  "use strict";
  var TO = window.TurnsOut, D = window.Duel;
  function $(id) { return document.getElementById(id); }

  TO.wireDialogs();
  TO.fixLocalLinks();
  TO.count("duel/page");

  var key = D.todayKey();
  var got = D.take(window.location.hash);
  var p = got.p;

  /* Once a link is merged the address bar is tidied, so that a player who shares the page they are
     looking at cannot pass a friend's scores on by accident. */
  if (p && window.history && window.history.replaceState) {
    try { window.history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) { /* a folder, or an old browser */ }
  }

  var shift = p ? D.dayShift(p.key) : 0;
  if (p && shift === 0) key = p.key;

  var head = $("d-head"), lede = $("d-lede"), state = $("d-state"), who = $("d-who");
  $("d-date").textContent = D.dateWords(key);

  var how = got.how;
  if (!p) {
    head.textContent = "Who Was Closer";
    lede.textContent = "Send one link and a friend plays the same day's games. Then you both see who was closer.";
    state.textContent = "No challenge in this link. You can start one: play a game, then tap “Send my day” at the end.";
  } else if (how === "over") {
    head.textContent = "That duel is over";
    lede.textContent = "The link was for " + D.dateWords(p.key) + ", and a duel belongs to its own day.";
    state.textContent = "Today's games are waiting, and a new link starts a new duel.";
  } else if (how === "mine") {
    head.textContent = "This is your own link";
    lede.textContent = "It is the link you send to a friend. This is the page they will land on.";
    state.textContent = "Nothing was added: a player cannot duel themselves.";
  } else if (shift > 0) {
    head.textContent = "A friend is a day ahead";
    lede.textContent = D.pretty(p.n) + " has sent you " + D.dateWords(p.key) + ".";
    state.textContent = "It is kept, and the duel opens at your own midnight. Today's games are below in the meantime.";
  } else if (how === "full") {
    head.textContent = "This table is full";
    lede.textContent = "Eight players is as many as one table holds.";
    state.textContent = D.pretty(p.n) + " was not added. The eight already here still count.";
  } else {
    head.textContent = D.pretty(p.n) + " has challenged you";
    lede.textContent = "Play today's games and see who was closer.";
    state.textContent = how === "again"
      ? D.pretty(p.n) + "'s day is in, brought up to date. " + games(p) + " so far."
      : how === "same"
      ? D.pretty(p.n) + "'s day was already in. " + games(p) + " so far."
      : D.pretty(p.n) + "'s day is in: " + games(p) + ". Nothing of the answers came with it.";
    if (p.dropped) {
      state.textContent += " " + p.dropped + (p.dropped === 1 ? " score" : " scores") +
        " in the link could not have come from a game here, so " + (p.dropped === 1 ? "it was" : "they were") + " left out.";
    }
  }
  function games(x) {
    var n = Object.keys(x.s).length;
    return n + (n === 1 ? " game played" : " games played");
  }

  /* Who is at the table for the day on show */
  var t = D.table(key);
  if (t.live) {
    who.hidden = false;
    who.appendChild(line("At this table", D.standings(t).map(function (r) {
      return (r.you ? "you" : D.pretty(r.n));
    }).join(", ")));
    if (Object.keys(t.mine).length) who.appendChild(line("So far", D.tallyWords(t).replace(/^Today: /, "")));
  }
  function line(label, value) {
    var p2 = document.createElement("p");
    p2.className = "d-pair";
    var b = document.createElement("span");
    b.className = "d-pair-k";
    b.textContent = label;
    var v = document.createElement("span");
    v.className = "d-pair-v";
    v.textContent = value;
    p2.appendChild(b); p2.appendChild(v);
    return p2;
  }

  /* The first daily game not played today, so the one button always leads somewhere */
  var next = null;
  TO.GAMES.forEach(function (G) { if (!next && !TO.playedToday(G)) next = G; });
  var go = $("d-go");
  if (next) {
    go.href = TO.here("../" + next.href);
    go.setAttribute("data-g", next.key);
    $("d-go-kicker").textContent = "Start here";
    $("d-go-name").textContent = next.name;
  } else {
    go.href = TO.here("../");
    go.setAttribute("data-g", "duel");
    $("d-go-kicker").textContent = "All played today";
    $("d-go-name").textContent = "See the games";
  }

  /* Every game of the day, so the player can see where the duel stands without hunting */
  if (t.live && Object.keys(t.mine).length) {
    var ul = document.createElement("ul");
    ul.className = "d-games";
    t.rows.forEach(function (r) {
      var li = document.createElement("li");
      li.setAttribute("data-g", r.key);
      li.className = "s-" + r.state;
      var a = document.createElement("a");
      var G = null;
      TO.GAMES.forEach(function (g) { if (g.id === r.id) G = g; });
      a.href = TO.here("../" + G.href);
      a.textContent = r.name;
      li.appendChild(a);
      var w = document.createElement("span");
      w.className = "d-games-w";
      w.textContent = r.state === "won" ? "you were closer" : r.state === "lost" ? "they were closer"
        : r.state === "tie" ? "a tie" : r.state === "match" ? "no win here" : r.state === "mixed" ? "mixed"
        : !r.played ? "not played yet" : "waiting for them";
      li.appendChild(w);
      ul.appendChild(li);
    });
    $("d-list").appendChild(ul);
  }

  /* The worked example, drawn from invented numbers, so that the card can be shown and not described */
  $("d-example").appendChild(D.mini(D.example()));

  /* Your own nickname, and a way to change it without typing a single letter */
  var mineP = $("d-mine");
  mineP.appendChild(document.createTextNode("You are "));
  var nick = document.createElement("b");
  nick.id = "d-nick";
  nick.textContent = D.pretty(D.me());
  mineP.appendChild(nick);
  mineP.appendChild(document.createTextNode(". It is not your real name, and it only ever goes inside the links you send yourself. "));
  var roll = document.createElement("button");
  roll.type = "button";
  roll.className = "d-roll";
  roll.id = "d-roll";
  roll.textContent = "Another name";
  roll.addEventListener("click", function () { nick.textContent = D.pretty(D.roll()); });
  mineP.appendChild(roll);

  /* A second link tapped while this page is already open changes only the part after the "#", which
     no browser treats as a new page. Reading it needs the page to run again. */
  window.addEventListener("hashchange", function () { window.location.reload(); });

  if (p && shift === 0 && (how === "merged" || how === "again")) TO.count("duel/opened");
  window.DuelPage = function () {        // read by r/site-workshop/checks/t_duel.py
    return { how: how, shift: shift, key: key, head: head.textContent, state: state.textContent,
             next: next ? next.id : null, live: t.live, players: t.others.length,
             dropped: p ? p.dropped : 0, hash: window.location.hash };
  };
})();
