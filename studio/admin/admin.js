/* Khayyam's queue (8 Nov 2026), by.logicers.com/admin/. English only: it is his own page.
   Calls (server/studio/README.md, section 3 of claude/studio-plan.md; every answer is {ok:true,…} or {ok:false, e:<key>}):
     POST /admin/queue {key, before?, all?} -> {queue:[{id, kind, made, done, text, image, item,
                                                  maker:{slug, name, blocked, url},
                                                  game:{id, title, code, url, want_listed, listed, hidden}}],
                                                next, open, reports:[{game, n, reasons, texts, last}]}
     POST /admin/act   {key, action, game | maker | id}   action: list unlist hide unhide delete block_maker unblock_maker done
                       done takes id (one row) or game (all its rows); block_maker / unblock_maker take game or maker.
   Nothing here writes HTML from text: every word that a stranger wrote goes in with textContent, links and images are made by
   hand with a checked address, and the page's security line (index.html) refuses the rest. */
(function () {
  "use strict";
  var KEYNAME = "lg.studio.admin.key";            // this tab's session storage: asked once per session, gone when the tab closes
  var IMG_HOST = "/i/";                            // the Studio's pictures, served by its Worker (F, 8 Nov 2026)
  var $ = function (id) { return document.getElementById(id); };
  var state = { key: "", rows: [], next: null, open: null, reports: [], view: "queue", filter: "todo", busy: false };

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

  /* a time as a Date: seconds, milliseconds or text */
  function when(v) {
    if (v === null || v === undefined || v === "") return null;
    var d = typeof v === "number" ? new Date(v < 1e12 ? v * 1000 : v) : new Date(/^\d+$/.test(String(v)) ? (Number(v) < 1e12 ? Number(v) * 1000 : Number(v)) : v);
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
  function safeUrl(u) {
    try { var x = new window.URL(String(u)); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch (e) { return ""; }
  }
  function linksIn(text) {
    var out = [], m, re = /https?:\/\/[^\s<>"'\])]+/gi, s = String(text || "");
    while ((m = re.exec(s))) { var u = m[0].replace(/[.,;:!?]+$/, ""); if (out.indexOf(u) < 0) out.push(u); }
    return out;
  }
  function anchor(href, label, cls) {
    var a = h("a", cls || "qa-link", label);
    a.href = href;
    a.target = "_blank";
    a.rel = "nofollow noopener noreferrer";
    return a;
  }
  function imageUrl(v) {
    if (!v) return "";
    if (typeof v === "object") v = v.url || v.id || "";
    v = String(v);
    if (/^https?:/i.test(v)) return safeUrl(v);
    return /^[A-Za-z0-9._\/-]+$/.test(v) ? IMG_HOST + v.replace(/^\//, "") : "";
  }
  function gameId(row) {
    if (row.game && row.game.id) return String(row.game.id);
    return "";
  }
  function makerSlug(row) {
    if (row.maker && row.maker.slug) return String(row.maker.slug);
    var g = gameId(row);
    return g.indexOf("/") > 0 ? g.split("/")[0] : "";
  }

  /* ---- the server ---- */
  var ERR = {
    key: "That key did not work.", auth: "That key did not work.", admin: "That key did not work.", forbidden: "That key did not work.", denied: "That key did not work.",
    brakes: "Too many tries. Wait a minute.", rate: "Too many tries. Wait a minute.", network: "No answer from the server.",
    nogame: "That game is gone.", game: "That game is gone.", notfound: "That is gone.", bad: "The server did not like that.",
    nothing: "That key did not work.", image: "That picture is gone."
  };
  function errText(e) { return ERR[e] || ("The server said: " + e + "."); }
  function isKeyError(e, status) { return status === 401 || status === 403 || /^(key|auth|admin|forbidden|denied|nothing)$/.test(String(e)); }
  function call(path, body) {
    return window.fetch(path, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
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
    var body = { key: state.key };
    if (state.filter === "all") body.all = true;
    if (more && state.next) body.before = state.next;
    return call("/admin/queue", body).then(function (r) {
      state.busy = false;
      if (!r.ok) {
        if (isKeyError(r.e, r.status)) { lock(errText(r.e)); return; }
        fail(errText(r.e));
        return;
      }
      var d = r.data, rows = Array.isArray(d.queue) ? d.queue : [];
      if (more) {
        var have = {};
        state.rows.forEach(function (x) { have[x.id] = true; });
        rows = rows.filter(function (x) { return !have[x.id]; });
        state.rows = state.rows.concat(rows);
      } else {
        state.rows = rows;
        state.reports = Array.isArray(d.reports) ? d.reports : [];
      }
      state.rows.sort(function (a, b) { var A = when(a.made), B = when(b.made); return (B ? B.getTime() : 0) - (A ? A.getTime() : 0); });
      state.next = d.next || null;
      state.open = typeof d.open === "number" ? d.open : null;
      fail("");
      render();
    });
  }
  function fail(text) { var e = $("desk-err"); e.textContent = text || ""; show(e, !!text); }

  function lock(message) {
    state.key = ""; saveKey("");
    state.rows = []; state.reports = []; state.next = null;
    show($("v-desk"), false); show($("v-lock"), true); show($("forget"), false);
    var e = $("lock-err"); e.textContent = message || ""; show(e, !!message);
    $("key").value = "";
    $("key").focus();
  }
  function unlock(key) {
    state.key = key; saveKey(key);
    show($("v-lock"), false); show($("v-desk"), true); show($("forget"), true);
    return load(false);
  }

  /* ---- what a row shows ---- */
  function chip(text, cls) { return h("span", "qa-chip" + (cls ? " " + cls : ""), text); }
  function stateChips(row) {
    var box = h("div", "qa-chips"), g = row.game, m = row.maker;
    if (g) {
      if (g.hidden) box.appendChild(chip("Hidden", "bad"));
      if (g.listed) box.appendChild(chip("Listed", "ok"));
      else if (g.want_listed) box.appendChild(chip("Wants listing", "warn"));
      else box.appendChild(chip("Private"));
    }
    if (m && m.blocked) box.appendChild(chip("Maker blocked", "bad"));
    return box;
  }
  function kindLabel(k) {
    return { maker: "New maker", game: "Game", item: "Item", image: "Image", about: "About text", link: "Link", report: "Report", act: "Done by you" }[k] || String(k || "Item");
  }
  function checkChip(row) {
    var m = /check:\s*(safe|flag|not checked)/i.exec(String(row.text || ""));
    if (row.kind !== "image" || !m) return null;
    var v = m[1].toLowerCase();
    return chip(v === "safe" ? "Looks safe" : v === "flag" ? "Flagged" : "Not checked", v === "safe" ? "ok" : v === "flag" ? "bad" : "warn");
  }

  /* a picture of the queue: asked for with the key (POST /admin/img), so a picture players do not see yet shows here too */
  var BLOBS = {};
  function thumb(row) {
    var src = imageUrl(row.image);
    if (!src) return null;
    var box = h("div", "qa-thumb");
    var img = h("img");
    img.alt = "";
    box.appendChild(img);
    var have = BLOBS[src];
    (have ? Promise.resolve(have) : window.fetch("/admin/img", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ key: state.key, image: src }),
      cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer"
    }).then(function (r) { if (!r.ok) throw r; return r.blob(); }).then(function (b) { var u = URL.createObjectURL(b); BLOBS[src] = u; return u; }))
      .then(function (u) { img.src = u; box.addEventListener("click", function () { window.open(u, "_blank", "noopener"); }); })
      .then(null, function () { box.textContent = "The picture is gone"; box.className = "qa-link"; });
    return box;
  }

  function actBtn(label, action, row, cls, extra) {
    var b = h("button", "qa-act" + (cls ? " " + cls : ""), label);
    b.type = "button";
    b.setAttribute("data-act", action + (extra && extra.whole ? "-game" : ""));
    b.addEventListener("click", function () {
      if (action === "delete" || action === "block_maker") {   // two taps for the things that are hard to undo
        if (!b.classList.contains("sure")) {
          b.classList.add("sure"); b.textContent = "Sure? " + label;
          window.setTimeout(function () { b.classList.remove("sure"); b.textContent = label; }, 4000);
          return;
        }
      }
      act(row, action, extra, b);
    });
    return b;
  }
  /* the buttons that fit what is known about the game and the maker; both of a pair when it is not known */
  function actions(row) {
    var wrap = h("div", "qa-actwrap"), box = h("div", "qa-acts"), g = row.game, m = row.maker, gid = gameId(row), slug = makerSlug(row);
    wrap.appendChild(box);
    if (row.id !== undefined && row.id !== null && !row.done) box.appendChild(actBtn("Done", "done", row, "qa-solid"));
    var held = row.kind === "image" && /check[^:]*: (flag|not checked)/.test(String(row.text || ""));
    if (held && row.image) box.appendChild(actBtn("Show it", "show_image", row, "qa-tint", { image: row.image }));
    if (gid) {
      if (!g || g.listed !== true) box.appendChild(actBtn("List", "list", row, "qa-tint"));
      if (!g || g.listed !== false) box.appendChild(actBtn("Unlist", "unlist", row));
      if (!g || !g.hidden) box.appendChild(actBtn("Hide", "hide", row));          // hidden is "reports", "logicers" or null
      if (!g || g.hidden) box.appendChild(actBtn("Unhide", "unhide", row));
    }
    if (gid && row.id !== undefined && !row.done) box.appendChild(actBtn("Done, whole game", "done", row, "", { whole: true }));
    if (gid || slug) {
      var zone = h("details", "qa-danger-zone"), sum = h("summary", null, "More");
      zone.appendChild(sum);
      var inner = h("div", "qa-acts");
      if (gid) inner.appendChild(actBtn("Delete", "delete", row, "qa-danger"));
      if (!m || m.blocked !== true) inner.appendChild(actBtn("Block maker", "block_maker", row, "qa-danger"));
      if (!m || m.blocked !== false) inner.appendChild(actBtn("Unblock maker", "unblock_maker", row));
      zone.appendChild(inner);
      wrap.appendChild(zone);
    }
    return wrap;
  }

  function rowCard(row) {
    var card = h("article", "qa-card qa-row" + (row.done ? " done" : ""));
    card.setAttribute("data-id", String(row.id));
    var head = h("div", "qa-head");
    head.appendChild(h("span", "qa-kind", kindLabel(row.kind)));
    var t = stamp(row.made);
    if (t) head.appendChild(t);
    if (row.done) head.appendChild(chip("Done"));
    var chk = checkChip(row);
    if (chk) head.appendChild(chk);
    card.appendChild(head);

    var who = h("p", "qa-who");
    if (row.maker && (row.maker.name || row.maker.slug)) {
      var name = row.maker.name || row.maker.slug, url = safeUrl(row.maker.url);
      who.appendChild(url ? anchor(url, name, "qa-link qa-maker") : h("b", "qa-maker", name));
    }
    if (row.game && (row.game.title || row.game.id)) {
      who.appendChild(h("span", "qa-sep", " · "));
      var gt = row.game.title || row.game.id, gurl = safeUrl(row.game.url);
      who.appendChild(gurl ? anchor(gurl, gt, "qa-link qa-game") : h("span", "qa-game", gt));
      if (row.game.code) who.appendChild(h("span", "qa-code", row.game.code));
    }
    if (row.item !== undefined && row.item !== null && row.item !== "") who.appendChild(h("span", "qa-item", " · item " + row.item));
    if (who.childNodes.length) card.appendChild(who);
    card.appendChild(stateChips(row));

    var links = linksIn(row.text);
    var onlyLink = links.length === 1 && String(row.text || "").trim() === links[0];
    var shown = row.kind === "image" ? String(row.text || "").replace(/\s*check:\s*(safe|flag|not checked)\s*/i, "").trim() : String(row.text || "");
    if (shown && !onlyLink) card.appendChild(h("p", "qa-text", shown));
    var pic = thumb(row);
    if (pic) card.appendChild(pic);
    if (links.length) {
      var ul = h("ul", "qa-links");
      links.forEach(function (u) {
        var li = h("li"), ok = safeUrl(u);
        li.appendChild(ok ? anchor(ok, u) : h("span", "", u));
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
    card.appendChild(actions(row));
    return card;
  }

  /* ---- reports ---- */
  function reasonList(v) {
    if (!v) return [];
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    if (typeof v === "object") return Object.keys(v).map(function (k) { return v[k] > 1 ? k + " ×" + v[k] : k; });
    return [String(v)];
  }
  function reportCard(rep) {
    var gid = String(rep.game || "");
    var known = null;
    state.rows.forEach(function (r) { if (!known && gameId(r) === gid) known = r; });
    var row = { id: undefined, kind: "report", game: known && known.game ? known.game : { id: gid }, maker: known && known.maker ? known.maker : null, done: false };
    var card = h("article", "qa-card qa-row");
    card.setAttribute("data-game", gid);
    var head = h("div", "qa-head");
    head.appendChild(h("span", "qa-kind", "Reports"));
    head.appendChild(chip((rep.n || 0) + (rep.n === 1 ? " report" : " reports"), (rep.n || 0) >= 3 ? "bad" : "warn"));
    var t = stamp(rep.last);
    if (t) head.appendChild(t);
    card.appendChild(head);
    var who = h("p", "qa-who");
    var title = known && known.game && known.game.title ? known.game.title : gid;
    who.appendChild(anchor("/" + gid.replace(/^\/+/, "") + "/", title, "qa-link qa-game"));
    if (known && known.maker && known.maker.name) { who.appendChild(h("span", "qa-sep", " · ")); who.appendChild(h("b", "qa-maker", known.maker.name)); }
    card.appendChild(who);
    card.appendChild(stateChips(row));
    var reasons = reasonList(rep.reasons);
    if (reasons.length) {
      var box = h("div", "qa-chips");
      reasons.forEach(function (x) { box.appendChild(chip(x)); });
      card.appendChild(box);
    }
    var texts = Array.isArray(rep.texts) ? rep.texts.filter(Boolean) : (rep.texts ? [String(rep.texts)] : []);
    if (texts.length) {
      var ul = h("ul", "qa-notes");
      texts.forEach(function (x) { ul.appendChild(h("li", "", String(x))); });
      card.appendChild(ul);
    }
    var acts = actions(row);
    var done = actBtn("Done, whole game", "done", row, "qa-solid", { whole: true });   // clears what is waiting on this game
    acts.appendChild(done);
    card.appendChild(acts);
    return card;
  }

  /* ---- drawing ---- */
  function render() {
    var list = $("list"), n = 0;
    list.textContent = "";
    var queue = state.view === "queue";
    show($("filterbar"), queue);
    var shownRows = state.rows.filter(function (r) { return state.filter === "all" || !r.done; });
    if (queue) {
      shownRows.forEach(function (r) { list.appendChild(rowCard(r)); });
      n = shownRows.length;
      if (!n) list.appendChild(h("p", "qa-empty", state.filter === "all" ? "Nothing in the queue." : "Nothing to do."));
      $("count").textContent = state.open !== null && state.filter === "todo" ? state.open + " open" : n + " shown";
    } else {
      state.reports.forEach(function (r) { list.appendChild(reportCard(r)); });
      n = state.reports.length;
      if (!n) list.appendChild(h("p", "qa-empty", "No reports."));
    }
    show($("more"), queue && !!state.next);
    var open = state.open !== null ? state.open : state.rows.filter(function (r) { return !r.done; }).length;
    $("tab-queue").textContent = "Queue" + (open ? " (" + open + ")" : "");
    $("tab-reports").textContent = "Reports" + (state.reports.length ? " (" + state.reports.length + ")" : "");
  }

  /* ---- acting ---- */
  var DONE_TEXT = { list: "Listed", unlist: "Unlisted", hide: "Hidden", unhide: "Unhidden", delete: "Deleted", block_maker: "Maker blocked", unblock_maker: "Maker unblocked", done: "Done", show_image: "Shown to players" };
  function act(row, action, extra, button) {
    var gid = gameId(row), slug = makerSlug(row), body = { key: state.key, action: action };
    if (action === "show_image") body.image = extra && extra.image;
    else if (action === "done") {
      if (extra && extra.whole && gid) body.game = gid; else body.id = row.id;
    } else if (action === "block_maker" || action === "unblock_maker") {
      if (gid) body.game = gid; else body.maker = slug;
    } else body.game = gid;
    var card = button && button.closest(".qa-row"), all = card ? card.querySelectorAll("button") : [];
    Array.prototype.forEach.call(all, function (b) { b.disabled = true; });
    say("");
    call("/admin/act", body).then(function (r) {
      Array.prototype.forEach.call(all, function (b) { b.disabled = false; });
      if (!r.ok) {
        if (isKeyError(r.e, r.status)) { lock(errText(r.e)); return; }
        say(errText(r.e), true);
        return;
      }
      apply(row, action, extra);
      say(DONE_TEXT[action] + (gid && action !== "done" && action !== "block_maker" && action !== "unblock_maker" ? ": " + gid : slug && /block/.test(action) ? ": " + slug : "") + ".");
      render();
    });
  }
  /* what the page shows follows what the server just agreed to, for the game's every row and every report */
  function apply(row, action, extra) {
    var gid = gameId(row), slug = makerSlug(row);
    var openBefore = state.rows.filter(function (r) { return !r.done; }).length;
    function games(fn) { state.rows.forEach(function (r) { if (r.game && String(r.game.id) === gid) fn(r.game, r); }); }
    function makers(fn) { state.rows.forEach(function (r) { if (r.maker && String(r.maker.slug) === slug) fn(r.maker, r); }); }
    if (action === "show_image") row.text = String(row.text || "").replace(/: (flag|not checked)$/, ": shown by you");
    else if (action === "list") games(function (g) { g.listed = true; });
    else if (action === "unlist") games(function (g) { g.listed = false; });
    else if (action === "hide") games(function (g) { g.hidden = true; });
    else if (action === "unhide") games(function (g) { g.hidden = false; });
    else if (action === "block_maker") makers(function (m) { m.blocked = true; });
    else if (action === "unblock_maker") makers(function (m) { m.blocked = false; });
    else if (action === "delete") {
      state.rows = state.rows.filter(function (r) { return !(r.game && String(r.game.id) === gid); });
      state.reports = state.reports.filter(function (r) { return String(r.game) !== gid; });
    } else if (action === "done") {
      if (extra && extra.whole) {
        state.rows.forEach(function (r) { if (r.game && String(r.game.id) === gid) r.done = true; });
        state.reports = state.reports.filter(function (r) { return String(r.game) !== gid; });
      } else row.done = true;
    }
    if (state.open !== null && (action === "done" || action === "delete")) {      // the server's count of open rows, less the ones that just closed here
      state.open = Math.max(0, state.open - (openBefore - state.rows.filter(function (r) { return !r.done; }).length));
    }
  }

  /* ---- wiring ---- */
  function seg(box, attr, fn) {
    Array.prototype.forEach.call(box.querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        fn(b.getAttribute(attr));
      });
    });
  }
  $("lockform").addEventListener("submit", function (e) {
    e.preventDefault();
    var k = $("key").value.trim();
    if (!k) return;
    show($("lock-err"), false);
    $("open").disabled = true;
    unlock(k).then(function () { $("open").disabled = false; }, function () { $("open").disabled = false; });
  });
  $("forget").addEventListener("click", function () { lock(""); });
  $("refresh").addEventListener("click", function () { say(""); load(false); });
  $("more").addEventListener("click", function () { load(true); });
  seg($("view"), "data-v", function (v) { state.view = v; render(); });
  seg($("filter"), "data-f", function (f) { state.filter = f; state.next = null; load(false); });

  var saved = readKey();
  if (saved) unlock(saved); else $("key").focus();
})();
