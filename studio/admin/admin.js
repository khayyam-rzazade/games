/* Khayyam's queue, by.logicers.com/admin/ (9 Nov 2026: rebuilt around games). English only: it is his own page.
   One card per game with everything in it: the maker, the title, the code, the link, its state (private, wants listing,
   listed, hidden), what is new since his last look, the reports, every question with its answer, the pictures with what
   the check said and a Remove each, the About text, every link. One set of buttons per game: Done, List or Unlist, Hide or
   Unhide; Delete game and Block maker under More, each two taps. A maker's other games are one tap away. A new maker
   without a game has a small card of their own.
   Calls (server/studio/src/admin.js; every answer is {ok:true,…} or {ok:false, e:<key>}; the key goes in the body):
     POST /admin/queue {key, all?, before?}   -> { cards: [{type:"game", game, maker} | {type:"maker", maker}], cards_next, open_cards }
     POST /admin/game  {key, game | maker}    -> { card }
     POST /admin/act   {key, action, game | maker | image}   list unlist hide unhide delete block_maker unblock_maker done remove_image
     POST /admin/img   {key, image}           -> the picture's bytes (a hidden game's too)
     POST /admin/ai    {key}                  -> { works, models: [{model, ok, word, said | error, ms}] }
   Nothing here writes HTML from text: every word a stranger wrote goes in with textContent, links are made by hand with a
   checked address, and the page's security line (index.html) refuses the rest (Trusted Types: no innerHTML at all). */
(function () {
  "use strict";
  var KEYNAME = "lg.studio.admin.key";            // this tab's session storage: asked once per session, gone when the tab closes
  var $ = function (id) { return document.getElementById(id); };
  var state = { key: "", cards: [], next: null, openCards: null, filter: "todo", busy: false };

  /* ---- small helpers ---- */
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  function show(e, on) { e.hidden = !on; }
  function say(text, bad) {
    var s = $("status");
    s.textContent = text || "";
    s.className = "qa-status" + (bad ? " bad" : "");
    show(s, !!text);
  }
  function readKey() { try { return window.sessionStorage.getItem(KEYNAME) || ""; } catch (e) { return ""; } }
  function saveKey(k) { try { if (k) window.sessionStorage.setItem(KEYNAME, k); else window.sessionStorage.removeItem(KEYNAME); } catch (e) { /* the key stays in memory */ } }
  function when(v) {
    if (v === null || v === undefined || v === "") return null;
    var d = typeof v === "number" ? new Date(v < 1e12 ? v * 1000 : v) : new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }
  function ago(d) {
    var s = Math.max(0, Math.round((Date.now() - d.getTime()) / 1000));
    if (s < 90) return "just now";
    if (s < 5400) return Math.round(s / 60) + " min ago";
    if (s < 129600) return Math.round(s / 3600) + " h ago";
    return Math.round(s / 86400) + " days ago";
  }
  function stamp(v) {
    var d = when(v);
    if (!d) return null;
    var t = h("time", "qa-when", ago(d));
    t.dateTime = d.toISOString();
    t.title = d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    return t;
  }
  /* only http and https addresses ever become links */
  function safeUrl(u) { try { var x = new window.URL(String(u)); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch (e) { return ""; } }
  function anchor(href, label, cls) {
    var ok = safeUrl(href);
    if (!ok) return h("span", cls || "", label);
    var a = h("a", cls || "qa-link", label);
    a.href = ok; a.target = "_blank"; a.rel = "nofollow noopener noreferrer";
    return a;
  }
  function chip(text, cls) { return h("span", "qa-chip" + (cls ? " " + cls : ""), text); }
  function newDot() { var d = h("span", "qa-new-dot", "new"); return d; }
  function section(title, n, isNew) {
    var s = h("section", "qa-sec");
    var t = h("h3", "qa-sec-h", title);
    if (n !== undefined && n !== null) t.appendChild(h("span", "qa-n", String(n)));
    if (isNew) t.appendChild(newDot());
    s.appendChild(t);
    return s;
  }

  /* ---- the server ---- */
  var ERR = {
    key: "That key did not work.", nothing: "That key did not work.", later: "Too many tries. Wait a minute.",
    network: "No answer from the server.", nogame: "That game is gone.", nomaker: "That maker is gone.", image: "That picture is gone.",
    action: "The server does not know that button. Reload the page."
  };
  function errText(e) { return ERR[e] || ("The server said: " + e + "."); }
  function isKeyError(e, status) { return /^(key|nothing)$/.test(String(e)) || (status === 404 && e === "nothing"); }
  function call(path, body) {
    return window.fetch(path, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.assign({ key: state.key }, body || {})),
      cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer"
    }).then(function (res) {
      return res.json().catch(function () { return null; }).then(function (data) {
        if (data && data.ok === true) return { ok: true, data: data };
        return { ok: false, e: (data && data.e) || (res.ok ? "bad" : "http" + res.status), status: res.status };
      });
    }, function () { return { ok: false, e: "network", status: 0 }; });
  }

  /* ---- loading ---- */
  function load(more) {
    if (state.busy) return Promise.resolve();
    state.busy = true;
    var body = {};
    if (state.filter === "all") body.all = true;
    if (more && state.next) body.before = state.next;
    return call("/admin/queue", body).then(function (r) {
      state.busy = false;
      if (!r.ok) {
        if (isKeyError(r.e, r.status)) { lock(errText(r.e)); return; }
        fail(errText(r.e));
        return;
      }
      var cards = Array.isArray(r.data.cards) ? r.data.cards : [];
      if (more) {
        var have = {};
        state.cards.forEach(function (c) { have[cardId(c)] = true; });
        state.cards = state.cards.concat(cards.filter(function (c) { return !have[cardId(c)]; }));
      } else state.cards = cards;
      state.next = r.data.cards_next || null;
      state.openCards = typeof r.data.open_cards === "number" ? r.data.open_cards : null;
      fail("");
      render();
    });
  }
  function fail(text) { var e = $("desk-err"); e.textContent = text || ""; show(e, !!text); }
  function cardId(c) { return c.type === "game" ? "g:" + c.game.id : "m:" + c.maker.slug; }

  function lock(message) {
    state.key = ""; saveKey("");
    state.cards = []; state.next = null;
    show($("v-desk"), false); show($("v-lock"), true); show($("forget"), false); show($("aitest"), false);
    var e = $("lock-err"); e.textContent = message || ""; show(e, !!message);
    $("key").value = "";
    $("key").focus();
  }
  function unlock(key) {
    state.key = key; saveKey(key);
    show($("v-lock"), false); show($("v-desk"), true); show($("forget"), true); show($("aitest"), true);
    return load(false);
  }

  /* ---- pictures: asked for with the key, so a hidden game's show too ---- */
  var BLOBS = {};
  function picture(src, cls) {
    var box = h("button", cls || "qa-pic");
    box.type = "button";
    box.setAttribute("aria-label", "Open the picture");
    var img = h("img"); img.alt = "";
    box.appendChild(img);
    if (!BLOBS[src]) {                                  // one fetch per picture, however many places show it
      BLOBS[src] = window.fetch("/admin/img", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: state.key, image: src }),
        cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer"
      }).then(function (r) { if (!r.ok) throw r; return r.blob(); }).then(function (b) { return URL.createObjectURL(b); });
      BLOBS[src].then(null, function () { delete BLOBS[src]; });
    }
    BLOBS[src]
      .then(function (u) { img.src = u; box.addEventListener("click", function () { window.open(u, "_blank", "noopener"); }); })
      .then(null, function () { box.classList.add("gone"); box.disabled = true; box.textContent = "gone"; });
    return box;
  }

  /* ---- what a card says ---- */
  var TEMPLATE = { number: "Number", line: "Line", pick: "Pick", rank: "Rank", picture: "Picture", read: "Read" };
  function statusChip(g) {
    if (g.hidden) return chip(g.hidden === "reports" ? "Hidden by reports" : "Hidden", "bad");
    if (g.listed && g.want_listed) return chip("On the list", "ok");
    if (g.want_listed) return chip("Wants listing", "warn");
    return chip("Private");
  }
  function answerLine(it) {
    var p = h("p", "qa-ans");
    if (Array.isArray(it.choices)) {
      it.choices.forEach(function (c, i) {
        if (i) p.appendChild(h("span", "qa-sep", " · "));
        p.appendChild(h(i === it.answer ? "b" : "span", i === it.answer ? "qa-right" : "", c));
      });
    } else if (Array.isArray(it.things)) {
      it.things.forEach(function (c, i) {
        if (i) p.appendChild(h("span", "qa-sep", "  ›  "));
        p.appendChild(h("span", "", (i + 1) + ". " + c));
      });
    } else if (it.answer !== undefined) {
      p.appendChild(h("b", "qa-right", "= " + it.answer + (it.unit ? " " + it.unit : "")));
      var lo = it.min !== undefined ? it.min : 0;
      if (it.max !== undefined) p.appendChild(h("span", "qa-soft", "  (" + lo + " to " + it.max + ")"));
    }
    return p;
  }
  /* what is new since the last look, grouped: one line per kind (the questions and links themselves carry a "new" mark) */
  function freshLines(rows) {
    var out = [], items = [], imgs = {}, links = 0, about = false, order = [];
    function first(k) { if (order.indexOf(k) < 0) order.push(k); }
    rows.forEach(function (r) {
      if (r.kind === "item") { first("item"); if (r.n && items.indexOf(r.n) < 0) items.push(r.n); }
      else if (r.kind === "image") { first("image"); var v = (/check[^:]*:\s*(.+)$/.exec(String(r.text || "")) || [])[1] || "new"; imgs[v] = (imgs[v] || 0) + 1; }
      else if (r.kind === "link") { first("link"); links++; }
      else if (r.kind === "about") { first("about"); about = true; }
      else { order.push(r); }
    });
    order.forEach(function (k) {
      var li = h("li");
      if (k === "item") { li.appendChild(h("b", null, items.length === 1 ? "Question " : "Questions ")); li.appendChild(h("span", null, (items.sort(function (a, b) { return a - b; }).join(", ") || "") + " new or changed")); }
      else if (k === "image") { li.appendChild(h("b", null, "Pictures ")); li.appendChild(h("span", null, Object.keys(imgs).map(function (v) { return imgs[v] + " " + v; }).join(", "))); }
      else if (k === "link") { li.appendChild(h("b", null, links === 1 ? "1 new link" : links + " new links")); }
      else if (k === "about") { li.appendChild(h("b", null, "About text ")); li.appendChild(h("span", null, "new or changed")); }
      else {
        var label = { game: "Game", report: "Report", maker: /^name:/.test(String(k.text || "")) ? "Name" : /^quizzes/.test(String(k.text || "")) ? "Maker page" : "New maker" }[k.kind] || k.kind;
        li.appendChild(h("b", null, label + " "));
        li.appendChild(h("span", "qa-fresh-t", String(k.text || "").replace(/^name: /, "")));
      }
      out.push(li);
    });
    return out;
  }
  function freshSection(rows) {
    var nw = section("New since your last look", rows.length);
    nw.classList.add("qa-fresh");
    var t = stamp(rows[rows.length - 1].made);
    if (t) nw.firstChild.appendChild(t);
    var ul = h("ul", "qa-fresh-list");
    freshLines(rows).forEach(function (li) { ul.appendChild(li); });
    nw.appendChild(ul);
    return nw;
  }

  /* a button that acts; the hard-to-undo ones ask for a second tap */
  function actBtn(label, cls, sure, fn) {
    var b = h("button", "qa-act" + (cls ? " " + cls : ""), label);
    b.type = "button";
    b.addEventListener("click", function () {
      if (sure && !b.classList.contains("sure")) {
        b.classList.add("sure"); b.textContent = "Sure? " + label;
        window.setTimeout(function () { b.classList.remove("sure"); b.textContent = label; }, 4000);
        return;
      }
      fn(b);
    });
    return b;
  }
  function busy(card, on) { Array.prototype.forEach.call(card.querySelectorAll("button"), function (b) { b.disabled = on; }); }

  function gameCard(c) {
    var g = c.game, m = c.maker || {};
    var card = h("article", "qa-card qa-gcard");
    card.setAttribute("data-card", cardId(c));
    /* the head: title, state, maker, code, how it plays */
    var head = h("header", "qa-ghead");
    var tl = h("div", "qa-gtitle");
    tl.appendChild(anchor(g.url, g.title, "qa-title"));
    var meta = h("p", "qa-gmeta");
    meta.appendChild(document.createTextNode("by "));
    meta.appendChild(anchor(m.url, m.name || m.slug, "qa-link qa-maker"));
    if (m.blocked) { meta.appendChild(document.createTextNode(" ")); meta.appendChild(chip("Maker blocked", "bad")); }
    tl.appendChild(meta);
    var facts = h("p", "qa-facts");
    if (g.code) facts.appendChild(h("span", "qa-code", g.code));
    [TEMPLATE[g.template] || g.template, g.mode === "open" ? "All at once" : "One a day", String(g.lang || "").toUpperCase(), (g.plays || 0) + (g.plays === 1 ? " play" : " plays")].forEach(function (x) {
      facts.appendChild(h("span", "qa-fact", x));
    });
    if (g.keep_answers) facts.appendChild(h("span", "qa-fact", "Keeps answers"));
    tl.appendChild(facts);
    head.appendChild(tl);
    head.appendChild(statusChip(g));
    card.appendChild(head);

    /* what is new since the last look */
    if (g.fresh && g.fresh.length) card.appendChild(freshSection(g.fresh));
    /* reports */
    if (g.reports) {
      var rs = section("Reports", g.reports.n);
      rs.classList.add("qa-reports");
      var chips = h("div", "qa-chips");
      Object.keys(g.reports.reasons || {}).forEach(function (k) { var n = g.reports.reasons[k]; chips.appendChild(chip(k + (n > 1 ? " ×" + n : ""), "bad")); });
      rs.appendChild(chips);
      if (g.reports.texts && g.reports.texts.length) {
        var nl = h("ul", "qa-notes");
        g.reports.texts.forEach(function (x) { nl.appendChild(h("li", "", String(x))); });
        rs.appendChild(nl);
      }
      card.appendChild(rs);
    }
    /* the questions, compact, with their answers */
    var items = Array.isArray(g.items) ? g.items : [];
    var qs = section("Questions", items.length);
    if (!items.length) qs.appendChild(h("p", "qa-soft", "No questions yet."));
    var ol = h("ol", "qa-qlist");
    items.forEach(function (it) {
      var li = h("li", it.new ? "is-new" : "");
      var n = h("span", "qa-qn", String(it.n));
      li.appendChild(n);
      var body = h("div", "qa-qbody");
      if (it.text) body.appendChild(h("p", "qa-qtext", it.text));
      var q = h("p", "qa-q", it.q || "");
      if (it.new) q.appendChild(newDot());
      body.appendChild(q);
      body.appendChild(answerLine(it));
      if (it.explain) body.appendChild(h("p", "qa-explain", it.explain));
      if (it.image_removed) body.appendChild(h("p", "qa-soft", "Picture removed."));
      li.appendChild(body);
      if (it.image_url) li.appendChild(picture(it.image_url, "qa-qpic"));
      ol.appendChild(li);
    });
    qs.appendChild(ol);
    card.appendChild(qs);
    /* the pictures, with what the check said, and Remove */
    if (g.images && g.images.length) {
      var ps = section("Pictures", g.images.length);
      var grid = h("div", "qa-grid");
      g.images.forEach(function (im) {
        var f = h("figure", "qa-fig" + (im.new ? " is-new" : ""));
        f.appendChild(picture(im.url, "qa-pic"));
        var cap = h("figcaption");
        cap.appendChild(chip(im.check === "safe" ? "Looks safe" : im.check === "flag" ? "Flagged" : "Not checked", im.check === "safe" ? "ok" : im.check === "flag" ? "bad" : "warn"));
        var where = (im.used || []).map(function (n) { return "Q" + n; }).join(", ") + (im.cover ? (im.used && im.used.length ? ", cover" : "cover") : "");
        if (where) cap.appendChild(h("span", "qa-soft", where));
        if (!where) cap.appendChild(h("span", "qa-soft", "not used"));
        f.appendChild(cap);
        f.appendChild(actBtn("Remove", "qa-danger qa-small", true, function () {
          act(card, c, { action: "remove_image", image: im.id }, "Picture removed. The maker sees it is gone.");
        }));
        grid.appendChild(f);
      });
      ps.appendChild(grid);
      card.appendChild(ps);
    }
    /* the About text */
    if (g.about) {
      var as = section("About", null, g.about_new);
      as.appendChild(h("p", "qa-text", g.about));
      card.appendChild(as);
    }
    /* every link */
    if (g.links && g.links.length) {
      var ls = section("Links", g.links.length);
      var lu = h("ul", "qa-links");
      g.links.forEach(function (l) {
        var li = h("li");
        li.appendChild(anchor(l.url, l.url, "qa-link"));
        li.appendChild(h("span", "qa-soft", "  " + (l.where === "about" ? "About" : "Q" + String(l.where).slice(1))));
        if (l.new) li.appendChild(newDot());
        lu.appendChild(li);
      });
      ls.appendChild(lu);
      card.appendChild(ls);
    }
    /* one set of buttons */
    var acts = h("div", "qa-acts");
    var hasNew = (g.fresh && g.fresh.length) || g.reports;
    /* 9 Nov 2026: plain names. Seen = off To do, nothing changes for players; the list = by.logicers.com's list of games */
    if (hasNew) acts.appendChild(actBtn("Seen", "qa-solid", false, function () { act(card, c, { action: "done", game: g.id }, "Seen: off To do."); }));
    if (g.listed && g.want_listed) acts.appendChild(actBtn("Take off the list", "", false, function () { act(card, c, { action: "unlist", game: g.id }, "Off the list."); }));
    else if (g.want_listed && !g.hidden) acts.appendChild(actBtn("Put on the list", "qa-tint", false, function () { act(card, c, { action: "list", game: g.id }, "On the list."); }));
    if (g.hidden) acts.appendChild(actBtn("Show again", "", false, function () { act(card, c, { action: "unhide", game: g.id }, "Shown again."); }));
    else acts.appendChild(actBtn("Hide", "", false, function () { act(card, c, { action: "hide", game: g.id }, "Hidden: its link stops working."); }));
    card.appendChild(acts);
    if (g.want_listed && !items.length) card.appendChild(h("p", "qa-soft qa-note", "No questions yet: it shows on the list once it has some and you put it there."));
    card.appendChild(moreZone(card, c, g, m));
    return card;
  }
  /* More: the two that are hard to undo, and the maker's other games */
  function moreZone(card, c, g, m) {
    var zone = h("details", "qa-more-zone"), sum = h("summary", null, "More");
    zone.appendChild(sum);
    var inner = h("div", "qa-acts");
    if (g) inner.appendChild(actBtn("Delete game", "qa-danger", true, function () { act(card, c, { action: "delete", game: g.id }, "Deleted."); }));
    if (m && m.slug) {
      if (m.blocked) inner.appendChild(actBtn("Unblock maker", "", true, function () { act(card, c, { action: "unblock_maker", maker: m.slug }, "Maker unblocked."); }));
      else inner.appendChild(actBtn("Block maker", "qa-danger", true, function () { act(card, c, { action: "block_maker", maker: m.slug }, "Maker blocked: their games are hidden."); }));
    }
    zone.appendChild(inner);
    var wrap = h("div", "qa-foot");
    var others = m && Array.isArray(m.games) ? m.games : [];
    if (others.length) {
      var ob = h("details", "qa-others");
      ob.appendChild(h("summary", null, (g ? (m.name || m.slug) + "'s other games" : "Their games") + " (" + others.length + ")"));
      var ul = h("ul", "qa-other-list");
      others.forEach(function (o) {
        var li = h("li");
        var b = h("button", "qa-other", o.title);
        b.type = "button";
        b.appendChild(h("small", "", o.hidden ? "hidden" : o.status === "waiting" ? "wants listing" : o.status));
        b.addEventListener("click", function () { openCard(o.id, card); });
        li.appendChild(b); ul.appendChild(li);
      });
      ob.appendChild(ul);
      wrap.appendChild(ob);
    }
    wrap.appendChild(zone);
    return wrap;
  }
  function makerCard(c) {
    var m = c.maker;
    var card = h("article", "qa-card qa-gcard qa-mcard");
    card.setAttribute("data-card", cardId(c));
    var head = h("header", "qa-ghead");
    var tl = h("div", "qa-gtitle");
    tl.appendChild(anchor(m.url, m.name || m.slug, "qa-title"));
    var meta = h("p", "qa-gmeta", "Maker · " + m.slug + " · ");
    var t = stamp(m.made); if (t) meta.appendChild(t);
    tl.appendChild(meta);
    head.appendChild(tl);
    head.appendChild(m.blocked ? chip("Blocked", "bad") : chip("Maker"));
    card.appendChild(head);
    if (m.fresh && m.fresh.length) card.appendChild(freshSection(m.fresh));
    if (m.kits && m.kits.length) {
      var ks = section("Quizzes on the maker page", m.kits.length);
      ks.appendChild(h("p", "qa-text", m.kits.join(", ")));
      card.appendChild(ks);
    }
    var acts = h("div", "qa-acts");
    if (m.fresh && m.fresh.length) acts.appendChild(actBtn("Seen", "qa-solid", false, function () { act(card, c, { action: "done", maker: m.slug }, "Seen: off To do."); }));
    card.appendChild(acts);
    card.appendChild(moreZone(card, c, null, m));
    return card;
  }

  /* ---- drawing ---- */
  function render() {
    var list = $("list");
    list.textContent = "";
    state.cards.forEach(function (c) { list.appendChild(c.type === "game" ? gameCard(c) : makerCard(c)); });
    if (!state.cards.length) list.appendChild(h("p", "qa-empty", state.filter === "all" ? "Nothing yet." : "Nothing to do."));
    show($("more"), !!state.next);
    var n = state.openCards;
    $("tab-todo").textContent = "To do" + (n ? " (" + n + ")" : "");
  }
  function replaceCard(old, c) {
    var i = state.cards.findIndex(function (x) { return cardId(x) === cardId(c); });
    if (i >= 0) state.cards[i] = c;
    var node = c.type === "game" ? gameCard(c) : makerCard(c);
    old.replaceWith(node);
    return node;
  }
  function dropCard(old, c) {
    state.cards = state.cards.filter(function (x) { return cardId(x) !== cardId(c); });
    old.classList.add("leaving");
    window.setTimeout(function () { old.remove(); if (!state.cards.length) render(); }, 220);
  }
  /* another game of the same maker: its card right under this one (or there already: scrolled to) */
  function openCard(id, after) {
    var there = document.querySelector('[data-card="g:' + CSS.escape(id) + '"]');
    if (there) { there.scrollIntoView({ block: "start", behavior: "smooth" }); return; }
    call("/admin/game", { game: id }).then(function (r) {
      if (!r.ok) { say(errText(r.e), true); return; }
      var c = r.data.card;
      var i = state.cards.findIndex(function (x) { return x.type === "game" && x.game && after.getAttribute("data-card") === cardId(x); });
      state.cards.splice(i + 1, 0, c);
      var node = gameCard(c);
      after.after(node);
      node.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  /* ---- acting: the card follows what the server just agreed to ---- */
  var openNo = 0;
  function act(card, c, body, done) {
    busy(card, true);
    say("");
    call("/admin/act", body).then(function (r) {
      if (!r.ok) {
        busy(card, false);
        if (isKeyError(r.e, r.status)) { lock(errText(r.e)); return; }
        say(errText(r.e), true);
        return;
      }
      say(done);
      if (body.action === "delete") { dropCard(card, c); return; }
      if (body.action === "done" && state.filter === "todo") {
        if (state.openCards) state.openCards = Math.max(0, state.openCards - 1);
        dropCard(card, c);
        $("tab-todo").textContent = "To do" + (state.openCards ? " (" + state.openCards + ")" : "");
        return;
      }
      /* the whole card again, as it is now */
      var no = ++openNo;
      call("/admin/game", c.type === "game" ? { game: c.game.id } : { maker: c.maker.slug }).then(function (g) {
        if (no !== openNo && !card.isConnected) return;
        if (!g.ok) { busy(card, false); return; }
        replaceCard(card, g.data.card);
      });
    });
  }

  /* ---- the picture check, tried on Cloudflare ---- */
  function aiTest() {
    var b = $("aitest");
    b.disabled = true;
    say("Asking the picture check…");
    call("/admin/ai", {}).then(function (r) {
      b.disabled = false;
      if (!r.ok) { if (isKeyError(r.e, r.status)) { lock(errText(r.e)); return; } say(errText(r.e), true); return; }
      var d = r.data, ms = d.models || [];
      if (!d.ai) { say("The picture check is off: the Worker has no AI binding.", true); return; }
      var lines = ms.map(function (m) {
        var name = String(m.model).split("/").pop();
        return name + ": " + (m.ok ? "said " + String(m.word).toUpperCase() : m.error ? "error: " + m.error : "no clear word (\"" + (m.said || "") + "\")") + " (" + (Math.round((m.ms || 0) / 100) / 10) + " s)";
      });
      say((d.works ? "The picture check works. " : "The picture check is not answering. ") + lines.join(" · "), !d.works);
    });
  }

  /* ---- wiring ---- */
  $("lockform").addEventListener("submit", function (e) {
    e.preventDefault();
    var k = $("key").value.trim();
    if (!k) return;
    show($("lock-err"), false);
    $("open").disabled = true;
    unlock(k).then(function () { $("open").disabled = false; }, function () { $("open").disabled = false; });
  });
  $("forget").addEventListener("click", function () { lock(""); });
  $("aitest").addEventListener("click", aiTest);
  $("refresh").addEventListener("click", function () { say(""); load(false); });
  $("more").addEventListener("click", function () { load(true); });
  Array.prototype.forEach.call($("filter").querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () {
      Array.prototype.forEach.call($("filter").querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      state.filter = b.getAttribute("data-f"); state.next = null; say(""); load(false);
    });
  });

  var saved = readKey();
  if (saved) unlock(saved); else $("key").focus();
})();
