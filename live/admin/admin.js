/* Logicers Live: Logicers' own desk (15 Oct 2026). Not linked from anywhere; for Khayyam only.

   What it does, all through the live server's POST /admin (server/live/src/worker.js, admin()):
   - the reports, the ones still to do first, 200 at a time (the EU's Digital Services Act, Art. 16): each
     with its game's code and title, the reason, the words, the name and email if given, and the date;
   - "See the game": its questions and answers, read-only, and its family (the game it was copied from,
     the first game of the family and every copy), or a live game and the saved game it came from;
   - Stop: this game, or the game with its original and every copy (a copy carries the same text), with a
     reason the maker reads on the game's edit link, in the game's language (Art. 17's statement of
     reasons, as far as a site with no accounts can give one); Start again, the same two ways;
   - Close a report with a decision (stopped, kept, other) and a note: the log of reports and decisions;
   - the two emails to whoever reported and gave an address: the receipt (Art. 16(4)) and the decision with
     the ways to challenge it (Art. 16(5)), opened ready in the mail app;
   - a box to look up any code; the totals, without names;
   - a lost edit link (15 Oct 2026): the games whose way back is the email a maker wrote from, and a new edit
     key for one of them, with its email ready in the mail app (only the address's fingerprint, made by
     ../wayprint.js, goes to the server).

   Security, because this page shows text written by strangers right next to the admin key:
   - Every stranger's text (titles, questions, answers, reports, names, emails, links) goes into the page as
     text: createElement and textContent only. There is no innerHTML, outerHTML, insertAdjacentHTML,
     document.write or eval in this file, and the page's security line makes the browser refuse HTML put in
     by a script anyway (Trusted Types). A game titled <img src=x onerror=...> is shown as those characters.
   - A link a stranger wrote (a question's source) is shown as plain text, never as a link. The one link
     built from a stranger's words is the reply email, mailto: with every part percent-encoded, so it can
     only ever open a new email.
   - The key is typed into a password field, taken out of it at once, and kept in one variable of this
     closure: never in storage, never in the address, never in the console. It goes to the server only in
     the body of a POST. "Forget the key" drops it and everything shown; so do 30 minutes without a tap
     or a key, and leaving the page (a page brought back from the browser's cache shows the lock again).
   - Inside another site's frame the page does nothing (a frame could trick a tap). */
(function () {
  "use strict";
  var WORDS = window.DESK_WORDS || {};
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
  /* Two addresses for the server (27 Oct 2026): live.logicers.com first, because some campus Wi-Fi blocks workers.dev;
     the workers.dev one only when the first gives no answer at all (not even an error) before anything has been heard
     from it, and then for the rest of the page. Nothing is probed on load. */
  var SERVER_NEW = "https://live.logicers.com", SERVER_OLD = "https://logicers-live.rza-khay.workers.dev";
  var TWIN = !LOCAL, heard = false;
  /* The server, as live.js picks it, with one difference: another server is taken only on this computer, and
     only as a string. On the live site nothing in the page can send the key elsewhere, not even an element
     whose id happened to be LIVE_SERVER (the security line would refuse the call anyway). */
  var SERVER = (LOCAL && typeof window.LIVE_SERVER === "string" && window.LIVE_SERVER) || (LOCAL ? "http://127.0.0.1:8787" : SERVER_NEW);
  /* one call to the server, by its path: the first address's failure to answer at all (before it has ever answered)
     moves the page to the second; any answer, even an error, settles it */
  function reach(path, init) {
    var base = SERVER;
    return window.fetch(base + path, init).then(function (res) {
      if (base === SERVER_NEW) heard = true;
      return res;
    }, function (err) {
      if (!TWIN || heard || base !== SERVER_NEW) throw err;
      SERVER = SERVER_OLD;
      return window.fetch(SERVER_OLD + path, init);
    });
  }
  /* 30 minutes; only the checks, on this computer, shorten it */
  var IDLE = (LOCAL && window.DESK_IDLE) || 30 * 60e3;
  var PAGE = 200;                                          // reports the server sends at a time
  var CODE_OK = /^(?:[BCDFGHJKLMNPQRSTVWXZ]{5}|[BCDFGHJKLMNPQRSTVWXZ]{7})$/;
  var EMAIL_OK = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;
  var LANG_NAMES = { en: "English", it: "Italiano", tr: "Türkçe" };
  var LOCALES = { en: "en-GB", it: "it-IT", tr: "tr-TR" };
  var COLOURS = ["indigo", "blue", "teal", "red", "pink", "green", "orange", "slate"];
  var TYPE_WORDS = { num: "Number", mc: "Choice", tf: "True / false", tx: "Typed" };
  var DECISIONS = { stopped: "Stopped", kept: "Kept", other: "Other" };
  var STOP_WHYS = ["illegal", "hate", "sexual", "violence", "personal", "copyright", "spam", "other"];
  var WHY_MAX = 500;                                       // the server keeps the first 500 characters of a reason

  function $(id) { return document.getElementById(id); }
  function has(o, k) { return !!o && typeof o === "object" && Object.prototype.hasOwnProperty.call(o, k); }

  /* Framed by another page: do nothing at all. */
  if (window.top !== window.self) {
    document.body.textContent = "";
    var p = document.createElement("p");
    p.textContent = "This page works only on its own.";
    document.body.appendChild(p);
    return;
  }

  /* ================================================================ the key: here and nowhere else */
  var KEY = "";
  var gen = 0;               // goes up whenever the key is taken or forgotten: late answers of an old one are dropped
  var lastUse = 0, idleTimer = null;

  /* ---- the page's parts, as text only ---- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = String(text);
    return e;
  }
  /* a stranger's text: its own direction (Arabic or Hebrew must not turn the layout around) */
  function their(tag, cls, text) {
    var e = el(tag, cls, text);
    e.dir = "auto";
    return e;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) {
      var c = arguments[i];
      if (c === null || c === undefined || c === false) continue;
      parent.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return parent;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function button(text, cls, go) {
    var b = el("button", cls || "dk-mini", text);
    b.type = "button";
    if (go) b.addEventListener("click", go);
    return b;
  }
  function str(x) { return x === undefined || x === null ? "" : String(x); }
  function fill(s, args) {
    var i = 0;
    return String(s).replace(/%[sd]/g, function () { var a = args[i++]; return a === undefined || a === null ? "" : String(a); });
  }
  function when(t) {
    if (!t || !isFinite(t)) return "";
    try { return new Date(t).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return new Date(t).toISOString(); }
  }
  function day(t) {
    if (!t || !isFinite(t)) return "";
    try { return new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return new Date(t).toISOString().slice(0, 10); }
  }
  function n(x) { return Number(x || 0).toLocaleString("en-US"); }
  function size(bytes) {
    var b = Number(bytes || 0);
    return b >= 1e6 ? (b / 1e6).toLocaleString("en-US", { maximumFractionDigits: 1 }) + " MB" : (b / 1e3).toLocaleString("en-US", { maximumFractionDigits: 1 }) + " KB";
  }
  function whyWord(w) { var en = (WORDS.en && WORDS.en.whys) || {}; return has(en, w) ? en[w] : str(w); }

  /* ================================================================ talking to the server */
  function call(body, path) {
    var payload = { key: KEY };
    Object.keys(body).forEach(function (k) { payload[k] = body[k]; });
    touch();
    return reach(path || "/admin", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer"
    }).then(function (res) {
      return res.json().then(function (b) { return { status: res.status, b: b && typeof b === "object" ? b : {} }; },
                             function () { return { status: res.status, b: {} }; });
    }, function () { return { status: 0, b: {} }; });
  }
  /* the server no longer takes the key (it was changed): back to the lock */
  function keyGone(r) {
    if (r.status === 404 && r.b.e === "nothing") { forget("The server no longer takes this key. Type it again."); return true; }
    return false;
  }
  function trouble(r) {
    if (r.status === 0) return "Can't reach the server. Check the connection and try again.";
    if (r.status === 429) return "Too many wrong keys from this address: the server waits ten minutes.";
    if (r.status === 404) return "No game with this code. It may have been deleted (two months after its last use, or by its maker).";
    if (r.status === 400) return "The server refused this (" + str(r.b.e || "bad") + "). Reload the page and try again.";
    return "The server had a problem (" + r.status + "). Try again in a minute.";
  }
  function deskErr(t) { var e = $("desk-err"); e.textContent = t || ""; e.hidden = !t; }

  /* ================================================================ the lock */
  function lockErr(t) { var e = $("lock-err"); e.textContent = t || ""; e.hidden = !t; }
  $("lockform").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("key"), k = input.value.trim();
    input.value = "";                                     // the field never keeps it
    if (!k) { lockErr("Type the key."); input.focus(); return; }
    KEY = k;
    k = "";
    var g = ++gen, btn = $("open");
    btn.disabled = true;
    lockErr("");
    call({ do: "reports" }).then(function (r) {
      btn.disabled = false;
      if (g !== gen) return;
      if (r.status === 200 && Array.isArray(r.b.reports)) { openDesk(r.b.reports); return; }
      KEY = "";
      if (r.status === 404) lockErr("That key is not right.");
      else if (r.status === 429) lockErr("Too many wrong keys from this address. Wait ten minutes, then try again.");
      else lockErr(trouble(r));
      input.focus();
    });
  });

  function forget(why) {
    KEY = "";
    gen++;
    clearTimeout(idleTimer);
    reports = [];
    more = false;
    current = null;
    clear($("reps"));
    clear($("gamecol"));
    clear($("tot"));
    clear($("rep-count"));
    $("gamecol").hidden = true;
    $("cols").classList.remove("dk-with-game");
    $("look").value = "";
    $("way-email").value = "";
    $("way-code").value = "";
    clear($("way-res"));
    clear($("fb-res"));
    clear($("said-res"));
    clear($("said-count"));
    $("said-more").hidden = true;
    saidLast = "";
    fbAll = [];
    deskErr("");
    $("v-desk").hidden = true;
    $("forget").hidden = true;
    $("v-lock").hidden = false;
    lockErr(why || "");
    document.title = "Desk | Logicers";
  }
  $("forget").addEventListener("click", function () { forget("The key is forgotten."); $("key").focus(); });
  /* leaving the page forgets too: a page the browser brings back from its cache then shows the lock */
  window.addEventListener("pagehide", function () { if (KEY) forget(""); });

  function touch() {
    lastUse = Date.now();
    clearTimeout(idleTimer);
    if (KEY) idleTimer = setTimeout(idle, IDLE + 50);
  }
  function idle() {
    if (!KEY) return;
    var left = IDLE - (Date.now() - lastUse);
    if (left <= 0) forget("The key was forgotten after a long pause. Type it again.");
    else idleTimer = setTimeout(idle, left + 50);
  }
  ["pointerdown", "keydown"].forEach(function (t) { document.addEventListener(t, function () { if (KEY) touch(); }, true); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") idle(); });

  /* ================================================================ the reports */
  var reports = [], more = false, filter = "all", current = null;

  function openDesk(list) {
    reports = list.slice();
    more = list.length >= PAGE;
    $("v-lock").hidden = true;
    $("v-desk").hidden = false;
    $("forget").hidden = false;
    deskErr("");
    drawReports();
    loadTotals();
    touch();
  }

  /* the ones still to do first, then the closed ones; each part newest first, as the server sends them */
  function ordered() {
    return reports.filter(function (r) { return r.state !== "done"; }).concat(reports.filter(function (r) { return r.state === "done"; }));
  }
  function drawReports() {
    var box = $("reps");
    clear(box);
    var todo = reports.filter(function (r) { return r.state !== "done"; }).length;
    var list = ordered().filter(function (r) { return filter === "all" || r.state !== "done"; });
    $("rep-count").textContent = n(todo) + " to do · " + n(reports.length) + (more ? "+ loaded" : " in all");
    document.title = (todo ? "(" + todo + ") " : "") + "Desk | Logicers";
    if (!list.length) box.appendChild(el("p", "dk-empty", filter === "new" ? "Nothing to do." : "No reports yet."));
    list.forEach(function (r) { box.appendChild(repCard(r)); });
    $("more").hidden = !more;
  }
  Array.prototype.forEach.call($("rep-filter").querySelectorAll("button"), function (b) {
    b.addEventListener("click", function () {
      filter = b.getAttribute("data-f");
      Array.prototype.forEach.call($("rep-filter").querySelectorAll("button"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
      drawReports();
    });
  });
  $("more").addEventListener("click", function () {
    var last = reports[reports.length - 1], g = gen, btn = this;
    if (!last) return;
    btn.disabled = true;
    call({ do: "reports", before: str(last.id) }).then(function (r) {
      btn.disabled = false;
      if (g !== gen || keyGone(r)) return;
      if (r.status !== 200 || !Array.isArray(r.b.reports)) { deskErr(trouble(r)); return; }
      var seen = Object.create(null);
      reports.forEach(function (x) { seen[x.id] = 1; });
      r.b.reports.forEach(function (x) { if (!seen[x.id]) reports.push(x); });
      more = r.b.reports.length >= PAGE;
      drawReports();
    });
  });
  function reloadReports() {
    var g = gen;
    return call({ do: "reports" }).then(function (r) {
      if (g !== gen || keyGone(r)) return;
      if (r.status !== 200 || !Array.isArray(r.b.reports)) { deskErr(trouble(r)); return; }
      reports = r.b.reports.slice();
      more = reports.length >= PAGE;
      drawReports();
    });
  }
  $("refresh").addEventListener("click", function () {
    deskErr("");
    reloadReports();
    loadTotals();
    if (current) openGame(current.code, current.rep);
  });

  function repCard(r) {
    var done = r.state === "done";
    var card = el("article", "dk-rep" + (done ? "" : " dk-new"));
    card.setAttribute("data-id", str(r.id));
    if (current && current.rep && current.rep.id === r.id) card.classList.add("dk-open");

    var top = el("div", "dk-reptop");
    var tag = el("span", "dk-tag" + (done ? "" : " dk-on"), done ? (has(DECISIONS, r.decision) ? DECISIONS[r.decision] : "Closed") : "New");
    add(top, tag, el("span", "dk-why-t", whyWord(r.why)), el("span", "", when(r.at)));
    card.appendChild(top);

    var game = el("div", "dk-game");
    game.appendChild(button(str(r.code), "dk-codebtn", function () { openGame(r.code, r); }));
    if (r.title) game.appendChild(their("span", "dk-title", r.title));
    else game.appendChild(el("span", "dk-from", "(no title: a game of Logicers' own sets, or ended)"));
    if (r.kit && r.kit !== r.code) {
      add(game, el("span", "dk-from", "from the saved game"), button(str(r.kit), "dk-codebtn", function () { openGame(r.kit, r); }));
    }
    card.appendChild(game);
    card.appendChild(their("p", "dk-text", r.text));

    var from = el("p", "dk-from");
    if (r.name || r.email) {
      add(from, "From ");
      if (r.name) from.appendChild(their("b", "", r.name));
      if (r.name && r.email) add(from, " · ");
      if (r.email) from.appendChild(their("span", "", r.email));
    } else add(from, "No name or email given.");
    card.appendChild(from);

    if (done) {
      var dec = el("p", "dk-decided");
      add(dec, el("b", "", (has(DECISIONS, r.decision) ? DECISIONS[r.decision] : "Closed") + " · " + when(r.done)));
      if (r.note) { add(dec, " "); dec.appendChild(their("span", "", r.note)); }
      card.appendChild(dec);
    }

    var acts = el("div", "dk-acts");
    acts.appendChild(button("See the game", "dk-mini dk-strong", function () { openGame(r.kit || r.code, r); }));
    if (r.email && EMAIL_OK.test(r.email)) mailLinks(acts, r);
    var closer = null;
    acts.appendChild(button(done ? "Change the decision" : "Close…", "dk-mini", function () {
      if (closer) { card.removeChild(closer); closer = null; return; }
      closer = closeForm(r, card);
      card.appendChild(closer);
      var first = closer.querySelector("button");
      if (first) first.focus();
    }));
    card.appendChild(acts);
    return card;
  }

  /* ---- the two emails to whoever reported: ready in the mail app, never sent from here ---- */
  function mailto(to, subject, body) {
    var at = to.lastIndexOf("@");
    return "mailto:" + encodeURIComponent(to.slice(0, at)) + "@" + encodeURIComponent(to.slice(at + 1)) +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  function mailText(r, kind, lang) {
    var M = (WORDS[lang] && WORDS[lang].mail) || WORDS.en.mail, E = WORDS.en.mail;
    function w(k) { return typeof M[k] === "string" ? M[k] : E[k]; }
    var hi = r.name ? fill(w("hiName"), [r.name]) : w("hi");
    var date;
    try { date = new Date(r.at).toLocaleDateString(LOCALES[lang] || "en-GB", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { date = day(r.at); }
    if (kind === "receipt") return { subject: fill(w("receiptSubject"), [r.code]), body: fill(w("receiptBody"), [hi, r.code, date]) };
    var ds = has(M.decisions, r.decision) ? M.decisions[r.decision] : E.decisions[has(E.decisions, r.decision) ? r.decision : "other"];
    var note = r.note ? fill(w("note"), [r.note]) : "";
    return { subject: fill(w("decisionSubject"), [r.code]), body: fill(w("decisionBody"), [hi, r.code, date, ds, note]) };
  }
  function mailLinks(box, r) {
    var lang = has(LANG_NAMES, r.lang) ? r.lang : "en";
    var sel = el("select", "dk-mini");
    sel.setAttribute("aria-label", "Language of the email");
    Object.keys(LANG_NAMES).forEach(function (l) {
      var o = el("option", "", "Emails in " + LANG_NAMES[l]);
      o.value = l;
      if (l === lang) o.selected = true;
      sel.appendChild(o);
    });
    var receipt = el("a", "dk-mini", "Email: receipt");
    var decision = el("a", "dk-mini", "Email: decision");
    function set() {
      var t = mailText(r, "receipt", sel.value);
      receipt.href = mailto(r.email, t.subject, t.body);
      if (r.state === "done") { t = mailText(r, "decision", sel.value); decision.href = mailto(r.email, t.subject, t.body); }
    }
    sel.addEventListener("change", set);
    set();
    add(box, receipt, r.state === "done" ? decision : null, sel);
  }

  /* ---- closing a report: the decision and a note, kept with it ---- */
  function closeForm(r, card) {
    var box = el("div", "dk-closer"), choice = has(DECISIONS, r.decision) ? r.decision : "";
    var seg = el("div", "dk-seg");
    seg.setAttribute("role", "radiogroup");
    seg.setAttribute("aria-label", "The decision");
    Object.keys(DECISIONS).forEach(function (d) {
      var b = button(DECISIONS[d], "", function () {
        choice = d;
        Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) { x.setAttribute("aria-checked", String(x === b)); });
      });
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(d === choice));
      seg.appendChild(b);
    });
    var id = "note-" + str(r.id).replace(/[^a-z0-9-]/g, "");
    var label = el("label", "dk-label", "A note: what you did and why (kept with the report, and in the decision email)");
    label.htmlFor = id;
    var note = el("textarea", "dk-field");
    note.id = id;
    note.maxLength = 1000;
    note.dir = "auto";
    note.value = str(r.note);
    var err = el("p", "dk-inline-err");
    err.hidden = true;
    var go = button("Close the report", "dk-mini dk-strong", function () {
      if (!choice) { err.textContent = "Choose the decision."; err.hidden = false; return; }
      var text = note.value.replace(/\s+/g, " ").trim();
      if (choice === "other" && !text) { err.textContent = "Say what you decided in the note."; err.hidden = false; note.focus(); return; }
      go.disabled = true;
      var g = gen;
      call({ do: "close", id: str(r.id), decision: choice, note: text }).then(function (res) {
        go.disabled = false;
        if (g !== gen || keyGone(res)) return;
        if (res.status !== 200 || !res.b.ok) { err.textContent = res.status === 200 ? "This report could not be closed: it may have been deleted (after 180 days)." : trouble(res); err.hidden = false; return; }
        r.state = "done";
        r.decision = choice;
        r.note = text;
        r.done = Date.now();
        var fresh = repCard(r);
        if (card.parentNode) card.parentNode.replaceChild(fresh, card);
        var todo = reports.filter(function (x) { return x.state !== "done"; }).length;
        $("rep-count").textContent = n(todo) + " to do · " + n(reports.length) + (more ? "+ loaded" : " in all");
        document.title = (todo ? "(" + todo + ") " : "") + "Desk | Logicers";
      });
    });
    var acts = el("div", "dk-acts");
    acts.appendChild(go);
    add(box, seg, label, note, acts, err);
    return box;
  }

  /* ================================================================ a game, opened */
  function openGame(code, rep) {
    code = str(code).toUpperCase().replace(/[^A-Z]/g, "");
    var col = $("gamecol");
    current = { code: code, rep: rep || null };
    clear(col);
    col.hidden = false;
    $("cols").classList.add("dk-with-game");
    Array.prototype.forEach.call(document.querySelectorAll(".dk-rep"), function (c) {
      c.classList.toggle("dk-open", !!rep && c.getAttribute("data-id") === str(rep.id));
    });
    if (!CODE_OK.test(code)) {
      col.appendChild(panelNote(code || "?", "A code has 5 letters (a live game) or 7 (a saved game), of BCDFGHJKLMNPQRSTVWXZ."));
      return;
    }
    col.appendChild(panelNote(code, "Opening…"));
    var g = gen;
    call({ do: "game", code: code }).then(function (r) {
      if (g !== gen || !current || current.code !== code || keyGone(r)) return;
      clear(col);
      if (r.status === 200 && r.b.kit && r.b.meta) col.appendChild(kitView(r.b, rep));
      else if (r.status === 200 && r.b.meta && r.b.meta.gone) col.appendChild(goneView(r.b.meta, rep));
      else if (r.status === 200 && r.b.live) col.appendChild(liveView(r.b.live, rep));
      else col.appendChild(panelNote(code, trouble(r)));
      if (window.innerWidth < 1000) col.scrollIntoView({ block: "start" });
    });
  }
  function closeGame() {
    current = null;
    clear($("gamecol"));
    $("gamecol").hidden = true;
    $("cols").classList.remove("dk-with-game");
    Array.prototype.forEach.call(document.querySelectorAll(".dk-rep.dk-open"), function (c) { c.classList.remove("dk-open"); });
  }
  function panelHead(code, tags) {
    var head = el("div", "dk-gamehead"), box = el("span", "dk-gametags");
    (tags || []).forEach(function (t) { box.appendChild(el("span", "dk-tag" + (t.on ? " dk-on" : ""), t.text)); });
    add(head, el("span", "dk-gamecode", code), box, button("Close", "dk-mini", closeGame));
    return head;
  }
  function panelNote(code, text) {
    var card = el("article", "dk-gamecard");
    add(card, panelHead(code, []), el("p", "dk-p", text));
    return card;
  }
  function facts(rows) {
    var dl = el("dl", "dk-facts");
    rows.forEach(function (row) {
      if (!row) return;
      dl.appendChild(el("dt", "", row[0]));
      var dd = el("dd");
      (Array.isArray(row[1]) ? row[1] : [row[1]]).forEach(function (x) { add(dd, typeof x === "string" || typeof x === "number" ? String(x) : x); });
      dl.appendChild(dd);
    });
    return dl;
  }
  function codeButtons(codes, rep) {
    var span = el("span");
    codes.forEach(function (c) { span.appendChild(button(str(c), "dk-codebtn", function () { openGame(c, rep); })); });
    return span;
  }

  /* ---- a family's first game that is gone: only its copies' codes are left (kit.js "fam"), so that the
     family can still be stopped together from any copy ---- */
  function goneView(m, rep) {
    var code = str(m.code), copies = Array.isArray(m.copies) ? m.copies.map(str) : [];
    var card = el("article", "dk-gamecard");
    card.appendChild(panelHead(code, [{ text: "Deleted" }]));
    card.appendChild(el("p", "dk-p", "This game is deleted (by its maker, or two months after its last use). Only the codes of its copies are kept, until " +
      day(m.until) + ", so that they can still be stopped together: open any copy and use its family button."));
    var fam = el("div", "dk-fam");
    add(fam, "Its copies (" + n(copies.length) + (m.over ? ", and " + n(m.over) + " more not listed" : "") + ") ", codeButtons(copies, rep));
    card.appendChild(fam);
    return card;
  }

  /* ---- a saved game ---- */
  function kitView(d, rep) {
    var k = d.kit || {}, m = d.meta || {}, qs = Array.isArray(k.qs) ? k.qs : [];
    var code = str(m.code), stopped = m.stopped && typeof m.stopped === "object";
    var card = el("article", "dk-gamecard");
    card.appendChild(panelHead(code, [
      stopped ? { text: "Stopped", on: true } : { text: k.mode === "live" ? "Live games only" : "Anyone can play it alone" }
    ]));
    card.appendChild(their("h2", "dk-h2", k.title));
    if (k.line) card.appendChild(their("p", "dk-after", k.line));

    var colour = COLOURS.indexOf(k.colour) >= 0 ? k.colour : "";
    var sw = el("i", colour ? "dk-sw dk-sw-" + colour : "dk-sw");
    var live = (Array.isArray(m.games) ? m.games : []).filter(function (x) { return Array.isArray(x) && Date.now() - x[1] < 13 * 3600e3; }).map(function (x) { return str(x[0]); });
    card.appendChild(facts([
      ["Language", has(LANG_NAMES, k.lang) ? LANG_NAMES[k.lang] : str(k.lang)],
      ["Colour", [sw, colour || "?"]],
      ["Questions", n(qs.length)],
      ["How sure?", k.sure === false ? "Off" : "Asked"],
      ["Made", when(m.made)],
      ["Last saved", when(m.saved)],
      ["Last used", when(m.used)],
      ["Deleted on", day(m.until)],
      ["Plays alone", n(m.plays)],
      ["Size", size(m.bytes)],
      ["Way back", m.way ? "an email (since " + day(m.wayAt) + ")" : "none"],
      m.rekeyAt ? ["New edit link", "made " + when(m.rekeyAt)] : null,
      ["Live games now", live.length ? codeButtons(live, rep) : "none"]
    ]));

    if (stopped) {
      var box = el("div", "dk-stopped");
      add(box, el("b", "", "Stopped on " + when(m.stopped.at) + ". Its maker reads:"));
      box.appendChild(their("span", "", m.stopped.why || "(no reason given)"));
      card.appendChild(box);
    }

    /* the family: the game it was copied from, the first game of the family, every copy */
    var fam = el("div", "dk-fam");
    var root = str(m.root || code), copies = Array.isArray(m.copies) ? m.copies.map(str) : [];
    if (m.from) add(fam, "Copied from ", codeButtons([m.from], rep), el("br"));
    if (root !== code) add(fam, "First game of its family ", codeButtons([root], rep), el("br"));
    var famLine = el("span");
    fam.appendChild(famLine);
    card.appendChild(fam);
    var familySize = { n: root === code ? 1 + copies.length : 0 };
    function drawCopies(list) {
      clear(famLine);
      if (list.length) add(famLine, (root === code ? "Its copies (" : "The family's copies (") + n(list.length) + ") ", codeButtons(list, rep));
      else add(famLine, root === code ? "No copies." : "");
    }
    drawCopies(copies);
    if (root === code && m.over) add(famLine, " and " + n(m.over) + " more not listed");
    var familyBtn = null;
    if (root !== code) {
      /* a copy: the family's copies are listed on its first game */
      var g = gen;
      call({ do: "game", code: root }).then(function (r) {
        if (g !== gen || keyGone(r)) return;
        var rm = r.status === 200 && r.b.meta ? r.b.meta : null;
        var list = rm && Array.isArray(rm.copies) ? rm.copies.map(str) : [code];
        familySize.n = (rm && !rm.gone ? 1 : 0) + list.length;
        drawCopies(list);
        if (!rm || rm.gone) add(famLine, " (its first game is gone)");
        if (rm && rm.over) add(famLine, " and " + n(rm.over) + " more not listed");
        if (familyBtn) familyBtn.textContent = familyLabel(stopped, familySize.n);
      });
    }

    var acts = stopped ? startBox(code, familySize, function (b) { familyBtn = b; }) : stopBox(code, k, rep, familySize, function (b) { familyBtn = b; });
    /* a game alone in its family (the first game, no copies) needs no family button */
    if (familyBtn && root === code && !copies.length) familyBtn.hidden = true;
    card.appendChild(acts);

    var h = el("h3", "dk-h2", "Questions");
    h.classList.add("dk-more");
    card.appendChild(h);
    card.appendChild(questionList(qs));
    return card;
  }
  function familyLabel(stopped, count) {
    return (stopped ? "Start it again with its original and copies" : "Stop it with its original and copies") + (count > 1 ? " (" + n(count) + " games)" : "");
  }

  /* a button that acts only on a second tap within four seconds: stopping a family can mean hundreds of games */
  function armed(text, sure, go) {
    var b = button(text, "dk-mini"), timer = null;
    b.addEventListener("click", function () {
      if (b.disabled) return;
      if (!b.classList.contains("dk-armed")) {
        b.classList.add("dk-armed");
        b.setAttribute("data-text", b.textContent);
        b.textContent = sure;
        timer = setTimeout(function () { b.classList.remove("dk-armed"); b.textContent = b.getAttribute("data-text"); }, 4000);
        return;
      }
      clearTimeout(timer);
      b.classList.remove("dk-armed");
      b.textContent = b.getAttribute("data-text");
      go();
    });
    return b;
  }

  /* ---- Stop: the reason the maker reads, in the game's language ---- */
  function stopBox(code, k, rep, familySize, keepBtn) {
    var lang = has(LANG_NAMES, k.lang) && WORDS[k.lang] && WORDS[k.lang].stop ? k.lang : "en";
    var S = WORDS[lang].stop, SE = WORDS.en.stop;
    var box = el("div", "dk-stopbox");
    box.appendChild(el("h3", "dk-h2", "Stop it"));
    var selId = "why-" + code, noteId = "wnote-" + code, repId = "wrep-" + code;
    var lab = el("label", "dk-label", "The reason");
    lab.htmlFor = selId;
    /* no reason is chosen for Khayyam (the report's own, when it is one of these): a stop says why, and a
       wrong reason in a statement of reasons is worse than a moment's thought */
    var sel = el("select", "dk-mini");
    sel.id = selId;
    var none = el("option", "", "Choose the reason…");
    none.value = "";
    sel.appendChild(none);
    STOP_WHYS.forEach(function (w) {
      var o = el("option", "", w === "other" ? "Against the terms (something else)" : whyWord(w));
      o.value = w;
      sel.appendChild(o);
    });
    sel.value = rep && STOP_WHYS.indexOf(rep.why) >= 0 ? rep.why : "";
    var chk = el("label", "dk-check");
    var byReport = el("input");
    byReport.type = "checkbox";
    byReport.id = repId;
    byReport.checked = !!rep;
    add(chk, byReport, "After a report (not your own check)");
    var nlab = el("label", "dk-label", "Your words for the maker (optional, in the game's language)");
    nlab.htmlFor = noteId;
    var note = el("textarea", "dk-field");
    note.id = noteId;
    note.dir = "auto";
    var prev = el("div", "dk-preview");
    var prevHead = el("small", "", "The maker will read, on the game's edit link (" + LANG_NAMES[lang] + "):");
    var prevText = el("span");
    prevText.lang = lang;
    add(prev, prevHead, prevText);
    var progress = el("p", "dk-progress");
    progress.hidden = true;

    function why() {
      var reason = has(S.reasons, sel.value) ? S.reasons[sel.value] : SE.reasons.other;
      var words = note.value.replace(/\s+/g, " ").trim();
      return fill(byReport.checked ? S.byReport : S.byCheck, [reason, words ? " " + words : ""]);
    }
    function show() {
      var t = why(), chosen = !!sel.value;
      prevText.textContent = chosen ? t : "";
      var over = t.length > WHY_MAX;
      prevHead.textContent = !chosen ? "Choose the reason: the maker will read it, on the game's edit link (" + LANG_NAMES[lang] + ")."
        : "The maker will read, on the game's edit link (" + LANG_NAMES[lang] + "): " + n(t.length) + " of " + n(WHY_MAX) + " characters" + (over ? ". Too long: shorten your words." : "");
      one.disabled = all.disabled = over || !chosen;
    }
    function run(family) {
      var text = why();
      if (text.length > WHY_MAX || !sel.value) return;
      one.disabled = all.disabled = true;
      progress.hidden = false;
      progress.textContent = "Stopping…";
      runAll("stop", code, family, text, function (done, of) { progress.textContent = "Stopped " + n(done) + " of " + n(of) + "…"; }).then(function (res) {
        if (!res) return;
        if (res.error) { progress.textContent = res.error + (res.done.length ? " (stopped so far: " + res.done.join(", ") + ")" : ""); one.disabled = all.disabled = false; return; }
        progress.textContent = "Stopped " + n(res.done.length) + " of " + n(res.of) + ": " + res.done.join(", ") + ".";
        setTimeout(function () { if (current && current.code === code) openGame(code, rep); }, 900);
      });
    }
    var one = armed("Stop this game", "Tap again to stop " + code, function () { run(false); });
    var all = armed(familyLabel(false, familySize.n), "Tap again to stop the whole family", function () { run(true); });
    keepBtn(all);
    sel.addEventListener("change", show);
    byReport.addEventListener("change", show);
    note.addEventListener("input", show);
    var acts = el("div", "dk-acts");
    add(acts, one, all);
    add(box, lab, sel, chk, nlab, note, prev, acts, progress);
    show();
    return box;
  }

  /* ---- Start again ---- */
  function startBox(code, familySize, keepBtn) {
    var box = el("div", "dk-stopbox");
    box.appendChild(el("h3", "dk-h2", "Start it again"));
    box.appendChild(el("p", "dk-from", "Its code, copy link, hosting and playing work again; its edit link opens it as before."));
    var progress = el("p", "dk-progress");
    progress.hidden = true;
    function run(family) {
      one.disabled = all.disabled = true;
      progress.hidden = false;
      progress.textContent = "Starting…";
      runAll("start", code, family, "", function (done, of) { progress.textContent = "Started " + n(done) + " of " + n(of) + "…"; }).then(function (res) {
        if (!res) return;
        if (res.error) { progress.textContent = res.error; one.disabled = all.disabled = false; return; }
        progress.textContent = "Started " + n(res.done.length) + " of " + n(res.of) + ": " + res.done.join(", ") + ".";
        setTimeout(function () { if (current && current.code === code) openGame(code, current.rep); }, 900);
      });
    }
    var one = armed("Start this game again", "Tap again to start " + code, function () { run(false); });
    var all = armed(familyLabel(true, familySize.n), "Tap again to start the whole family", function () { run(true); });
    keepBtn(all);
    var acts = el("div", "dk-acts");
    add(acts, one, all);
    add(box, acts, progress);
    return box;
  }

  /* Stop or start, forty games per call: while the server says "more", ask again from "next". */
  function runAll(action, code, family, why, step) {
    return new Promise(function (resolve) {
      var done = [], g = gen;
      function go(from) {
        var body = { do: action, code: code, family: !!family };
        if (action === "stop") body.why = why;
        if (from) body.from = from;
        call(body).then(function (r) {
          if (g !== gen || keyGone(r)) { resolve(null); return; }
          if (r.status !== 200) { resolve({ error: trouble(r), done: done }); return; }
          var list = r.b[action === "stop" ? "stopped" : "started"];
          done = done.concat(Array.isArray(list) ? list.map(str) : []);
          var of = Number(r.b.of) || done.length;
          step(done.length, of);
          if (r.b.more && Number(r.b.next) > (from || 0)) go(Number(r.b.next));
          else resolve({ done: done, of: of });
        });
      }
      go(0);
    });
  }

  /* ---- a live game ---- */
  function liveView(lv, rep) {
    var code = str(lv.code), ended = !!lv.ended;
    var card = el("article", "dk-gamecard");
    card.appendChild(panelHead(code, [{ text: ended ? "Ended" : "Live now", on: !ended }]));
    var q = lv.questions, qs = Array.isArray(q) ? q : q && Array.isArray(q.qs) ? q.qs : null;
    if (q && q.title) card.appendChild(their("h2", "dk-h2", q.title));
    card.appendChild(facts([
      ["Made", when(lv.made)],
      ended ? ["Ended", when(lv.ended)] : ["Players now", n(lv.np)],
      lv.kit ? ["Questions from", ["the saved game ", codeButtons([lv.kit], rep)]] : ["Questions from", "Logicers' own set: " + str(lv.set)],
      q && q.lang ? ["Language", has(LANG_NAMES, q.lang) ? LANG_NAMES[q.lang] : str(q.lang)] : null
    ]));
    if (lv.kit) card.appendChild(el("p", "dk-from", "To stop it, stop its saved game: that ends every live game made from it in the last hours."));
    if (qs) {
      var h = el("h3", "dk-h2", "Questions (as hosted)");
      h.classList.add("dk-more");
      card.appendChild(h);
      card.appendChild(questionList(qs));
    }
    return card;
  }

  /* ---- the questions, read-only: everything a stranger wrote is text, a source link is never a link ---- */
  function num(q, x) {
    if (q.k === "year") return str(Math.round(Number(x)));
    return Number(x).toLocaleString("en-US", { maximumFractionDigits: 6 });
  }
  function questionList(qs) {
    var ol = el("ol", "dk-qs");
    qs.forEach(function (q, i) {
      if (!q || typeof q !== "object") return;
      var li = el("li", "dk-q");
      var top = el("div", "dk-qtop");
      add(top, el("span", "dk-qn", String(i + 1)), has(TYPE_WORDS, q.type) ? TYPE_WORDS[q.type] : TYPE_WORDS.num);
      li.appendChild(top);
      li.appendChild(their("p", "dk-qt", q.t));
      var type = q.type || "num";
      if (type === "num") {
        var a = el("p", "dk-ans");
        add(a, "Answer ");
        a.appendChild(their("b", "", num(q, q.a) + (q.u ? " " + q.u : "")));
        add(a, " · slider " + num(q, q.lo) + " to " + num(q, q.hi) + (q.log ? " · log" : "") + (q.k === "year" ? " · a year" : ""));
        li.appendChild(a);
      } else if (type === "mc") {
        var opts = el("ol", "dk-opts");
        (Array.isArray(q.o) ? q.o : []).forEach(function (o, j) {
          var row = el("li", j === q.r ? "dk-right" : "");
          add(row, el("span", "", "ABCD".charAt(j)));
          row.appendChild(their("span", "", o));
          if (j === q.r) row.appendChild(el("span", "dk-righttag", "✓ right"));
          opts.appendChild(row);
        });
        li.appendChild(opts);
      } else if (type === "tf") {
        var t = el("p", "dk-ans");
        add(t, "Right answer ", el("b", "", q.r ? "True" : "False"));
        li.appendChild(t);
      } else {
        var oks = Array.isArray(q.ok) ? q.ok : [];
        var p = el("p", "dk-ans", oks.length ? "Right answers" : "No right answers listed: the host checks each answer.");
        li.appendChild(p);
        if (oks.length) {
          var chips = el("div", "dk-oks");
          oks.forEach(function (x) { chips.appendChild(their("span", "", x)); });
          li.appendChild(chips);
        }
        li.appendChild(el("p", "dk-after", q.fold === false ? "Capitals and accents count." : "Capitals and accents are ignored."));
      }
      if (q.f) {
        var f = el("p", "dk-after");
        add(f, "After the answer: ");
        f.appendChild(their("span", "", q.f));
        li.appendChild(f);
      }
      if (q.s) {
        var s = el("p", "dk-after");
        add(s, "Source (as text, not a link): ");
        s.appendChild(their("span", "dk-url", q.s));
        li.appendChild(s);
      }
      ol.appendChild(li);
    });
    if (!qs.length) ol.appendChild(el("li", "dk-q", "No questions."));
    return ol;
  }

  /* ---- the look-up box ---- */
  var look = $("look");
  look.addEventListener("input", function () {
    var v = look.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7);
    if (v !== look.value) look.value = v;
  });
  $("lookform").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!KEY) return;
    openGame(look.value, null);
  });

  /* ================================================================ a lost edit link (15 Oct 2026)
     A maker who left an email as a way back writes from it. The address typed here stays in this page: only
     its fingerprint goes to the server (../wayprint.js), which answers with the games that carry it, each
     checked against the game itself. "Make a new edit link" (two taps) gives the game a new key and the old
     one stops working at once; the new link is shown here once, to send to that same address ("Email the
     new link" opens it ready in the mail app, in the game's language). Forget the key clears all of it. */
  var WAYP = window.LogicersWay;
  var LATE_WAY = 2 * 86400e3;        // an email set more than two days after the game was made: the card says so
  function makeLink(code, key) {
    var base = LOCAL ? new URL("../build/", window.location.href).href : "https://logicers.com/live/build/";
    return base + "#edit=" + code + "." + key;
  }
  function wayMailText(gm, link, lang) {
    var M = (WORDS[lang] && WORDS[lang].mail) || WORDS.en.mail, E = WORDS.en.mail;
    function w(k) { return typeof M[k] === "string" ? M[k] : E[k]; }
    return { subject: fill(w("newLinkSubject"), [gm.code]), body: fill(w("newLinkBody"), [w("hi"), gm.title, gm.code, link]) };
  }
  function copyField(field, btn) {
    var done = function (ok) { btn.textContent = ok ? "Copied" : "Copy"; if (!ok) { field.focus(); field.select(); } setTimeout(function () { btn.textContent = "Copy"; }, 2000); };
    if (window.navigator.clipboard && window.navigator.clipboard.writeText) window.navigator.clipboard.writeText(field.value).then(function () { done(true); }, function () { done(false); });
    else done(false);
  }
  $("way-code").addEventListener("input", function () {
    var v = this.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 7);
    if (v !== this.value) this.value = v;
  });
  function wayNote(box, cls, text) { clear(box); box.appendChild(el("p", cls, text)); }
  $("wayform").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!KEY) return;
    var email = $("way-email").value.trim(), code = $("way-code").value, box = $("way-res"), btn = $("way-find");
    if (!WAYP || !WAYP.can) { wayNote(box, "dk-inline-err", "This browser can't make the fingerprint (no Web Crypto)."); return; }
    if (!WAYP.ok(email)) { wayNote(box, "dk-inline-err", "Type the email address the maker wrote from."); $("way-email").focus(); return; }
    if (code && !/^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(code)) { wayNote(box, "dk-inline-err", "A saved game's code has 7 letters; or leave it empty."); $("way-code").focus(); return; }
    var g = gen, found = [], seen = {};
    btn.disabled = true;
    wayNote(box, "dk-empty", "Looking…");
    WAYP.print(email).then(function (mp) {
      if (g !== gen) return;
      if (!mp) { btn.disabled = false; wayNote(box, "dk-inline-err", "This browser can't make the fingerprint."); return; }
      function page(from) {
        var body = { do: "way", mp: mp };
        if (code) body.code = code;
        if (from) body.from = from;
        call(body).then(function (r) {
          if (g !== gen || keyGone(r)) return;
          if (r.status !== 200 || !Array.isArray(r.b.games)) { btn.disabled = false; wayNote(box, "dk-inline-err", trouble(r)); return; }
          /* a game added or dropped between two pages moves the list by one: each game is drawn once */
          r.b.games.forEach(function (gm) { var c = str(gm && gm.code); if (c && !seen[c]) { seen[c] = 1; found.push(gm); } });
          if (r.b.more && Number(r.b.next) > (from || 0)) { page(Number(r.b.next)); return; }
          btn.disabled = false;
          drawWayFound(box, found, email, mp, code, !!r.b.has);
        });
      }
      page(0);
    });
  });
  function drawWayFound(box, games, email, mp, code, hasWay) {
    clear(box);
    if (!games.length) {
      box.appendChild(el("p", "dk-empty", code
        ? (hasWay ? "Game " + code + " has a way back, but with another email: no new link from this address."
                  : "Game " + code + " has no way back: Logicers can't make a new link for it.")
        : "No game has this email as its way back. Check that it is the address their message came from."));
      return;
    }
    box.appendChild(el("p", "dk-from", games.length === 1 ? "1 game has this email as its way back:" : n(games.length) + " games have this email as their way back:"));
    games.forEach(function (gm) { box.appendChild(wayCard(gm, email, mp)); });
  }
  function wayCard(gm, email, mp) {
    var code = str(gm.code), lang = has(LANG_NAMES, gm.lang) ? gm.lang : "en";
    var card = el("article", "dk-rep dk-waycard");
    var head = el("div", "dk-game");
    head.appendChild(button(code, "dk-codebtn", function () { openGame(code, null); }));
    head.appendChild(their("span", "dk-title", gm.title));
    card.appendChild(head);
    card.appendChild(el("p", "dk-from", [LANG_NAMES[lang], n(gm.n) + " questions", "made " + day(gm.made), "last used " + day(gm.used),
      gm.wayAt ? "email set " + day(gm.wayAt) : "", gm.stopped ? "stopped by Logicers" : "", gm.rekeyAt ? "a new link was made " + when(gm.rekeyAt) : ""].filter(Boolean).join(" · ")));
    /* anyone who has the edit link can set the email; one set long after the game was made may not be the maker's
       (an independent review, 15 Oct 2026) */
    var late = isFinite(gm.wayAt) && isFinite(gm.made) && gm.wayAt - gm.made > LATE_WAY ? Math.round((gm.wayAt - gm.made) / 86400e3) : 0;
    if (late) card.appendChild(el("p", "dk-caution", "This email was set " + n(late) + (late === 1 ? " day" : " days") + " after the game was made. " +
      "Whoever had the edit link then could have set it. Before a new link, ask something only the maker would know: a question in the game, or when they made it."));
    var out = el("div", "dk-wayout");
    var make = armed("Make a new edit link", "Tap again: the old link stops working", function () {
      make.disabled = true;
      var g = gen;
      call({ do: "rekey", code: code, mp: mp }).then(function (r) {
        if (g !== gen || keyGone(r)) return;
        clear(out);
        if (r.status !== 200 || typeof r.b.edit !== "string") {
          make.disabled = false;
          out.appendChild(el("p", "dk-inline-err", r.status === 409 ? "This game's way back is no longer this email." :
            r.status === 429 && r.b.e === "many" ? "Five new links for this game today already. Try again tomorrow." : trouble(r)));
          return;
        }
        var link = makeLink(code, r.b.edit);
        out.appendChild(el("p", "dk-from", "The new edit link (the old one no longer works). Send it only to " + email + ":"));
        var row = el("div", "dk-keyrow");
        var field = el("input", "dk-field dk-url");
        field.readOnly = true;
        field.value = link;
        field.setAttribute("aria-label", "The new edit link");
        field.addEventListener("focus", function () { field.select(); });
        var cp = button("Copy", "dk-mini");
        cp.addEventListener("click", function () { copyField(field, cp); });
        add(row, field, cp);
        var acts = el("div", "dk-acts");
        var mail = el("a", "dk-mini dk-strong", "Email the new link");
        var sel = el("select", "dk-mini");
        sel.setAttribute("aria-label", "Language of the email");
        Object.keys(LANG_NAMES).forEach(function (l) {
          var o = el("option", "", "Email in " + LANG_NAMES[l]);
          o.value = l;
          if (l === lang) o.selected = true;
          sel.appendChild(o);
        });
        function set() { var t = wayMailText(gm, link, sel.value); mail.href = mailto(email, t.subject, t.body); }
        sel.addEventListener("change", set);
        set();
        add(acts, mail, sel);
        add(out, row, acts);
      });
    });
    var acts0 = el("div", "dk-acts");
    acts0.appendChild(make);
    add(card, acts0, out);
    return card;
  }

  /* ================================================================ feedback emails (15 Oct 2026, evening)
     The makers who ticked "Email me for feedback": their addresses, readable, given for this alone (mail.js).
     Shown on a tap, all pages at once; filtered by language; "Copy the addresses" gives the shown ones, comma
     separated, for the Bcc line. "Remove" (two taps) takes one off at once, and keeps it off (a tick with it is
     refused from then on): the page sends its fingerprint, made here as for a lost link (../wayprint.js); the
     server checked, when it was ticked, that the address is that fingerprint's own. Anyone can type any address,
     so a tick is a request, not a proof (the review of 15 Oct 2026). */
  var fbAll = [], fbLang = "";
  $("fb-load").addEventListener("click", function () {
    if (!KEY) return;
    var g = gen, got = [], box = $("fb-res"), btn = this;
    btn.disabled = true;
    clear(box);
    box.appendChild(el("p", "dk-empty", "Loading…"));
    function page(from) {
      call({ do: "mails", from: from }).then(function (r) {
        if (g !== gen || keyGone(r)) return;
        if (r.status !== 200 || !Array.isArray(r.b.mails)) { btn.disabled = false; clear(box); box.appendChild(el("p", "dk-inline-err", trouble(r))); return; }
        got = got.concat(r.b.mails);
        if (r.b.more && Number(r.b.next) > from) { page(Number(r.b.next)); return; }
        btn.disabled = false;
        btn.textContent = "Refresh";
        fbAll = got.filter(function (x) { return x && typeof x.email === "string"; });
        drawFb();
      });
    }
    page(0);
  });
  function drawFb() {
    var box = $("fb-res");
    clear(box);
    if (!fbAll.length) { box.appendChild(el("p", "dk-empty", "Nobody has ticked it yet.")); return; }
    var shown = fbAll.filter(function (x) { return !fbLang || x.lang === fbLang; });
    var seg = el("div", "dk-seg dk-fbseg");
    seg.setAttribute("role", "radiogroup");
    seg.setAttribute("aria-label", "Language");
    [["", "All"]].concat(Object.keys(LANG_NAMES).map(function (l) { return [l, LANG_NAMES[l]]; })).forEach(function (o) {
      var count = o[0] ? fbAll.filter(function (x) { return x.lang === o[0]; }).length : fbAll.length;
      var b = el("button", "", o[1] + " · " + n(count));
      b.type = "button";
      b.addEventListener("click", function () { fbLang = o[0]; drawFb(); });
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(fbLang === o[0]));
      seg.appendChild(b);
    });
    box.appendChild(seg);
    var acts = el("div", "dk-acts");
    var field = el("textarea", "dk-field dk-fbcopy");
    field.readOnly = true;
    field.value = shown.map(function (x) { return x.email; }).join(", ");
    field.setAttribute("aria-label", "The addresses shown, for the Bcc line");
    field.rows = 2;
    var cp = button("Copy the addresses", "dk-mini dk-strong");
    cp.addEventListener("click", function () { copyField(field, cp); });
    add(acts, cp, el("span", "dk-from", n(shown.length) + (shown.length === 1 ? " address" : " addresses") + " · put them in Bcc"));
    add(box, acts, field);
    var list = el("ul", "dk-fblist");
    shown.forEach(function (x) {
      var li = el("li", "dk-fbrow");
      li.appendChild(their("span", "dk-fbmail", x.email));
      li.appendChild(el("span", "dk-from", [has(LANG_NAMES, x.lang) ? LANG_NAMES[x.lang] : str(x.lang), "ticked " + day(x.at),
        n(x.n) + (x.n === 1 ? " game" : " games")].join(" · ")));
      var out = el("span", "dk-from");
      var rm = armed("Remove", "Tap again: off, and kept off", function () {
        rm.disabled = true;
        var g = gen;
        WAYP.print(x.email).then(function (mp) {
          if (g !== gen) return;
          if (!mp) { rm.disabled = false; out.textContent = "This browser can't make the fingerprint."; return; }
          call({ do: "mailrm", mp: mp }).then(function (r) {
            if (g !== gen || keyGone(r)) return;
            if (r.status !== 200) { rm.disabled = false; out.textContent = trouble(r); return; }
            fbAll = fbAll.filter(function (y) { return y !== x; });
            drawFb();
          });
        });
      });
      add(li, rm, out);
      list.appendChild(li);
    });
    box.appendChild(list);
  }

  /* ================================================================ the totals, without names */
  function loadTotals() {
    var g = gen, box = $("tot");
    clear(box);
    box.appendChild(el("p", "dk-empty", "Loading…"));
    call({ do: "totals" }).then(function (r) {
      if (g !== gen || keyGone(r)) return;
      clear(box);
      if (r.status !== 200 || !r.b.days) { box.appendChild(el("p", "dk-empty", trouble(r))); return; }
      drawTotals(box, r.b);
    });
  }
  function dayName(k) {
    var m = /^(\d{4})(\d{2})(\d{2})$/.exec(str(k));
    if (!m) return str(k);
    return day(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
  }
  function drawTotals(box, t) {
    var days = Object.keys(t.days || {}).filter(function (k) { return /^\d{8}$/.test(k); }).sort().reverse();
    var cols = [["made", "Live games made"], ["started", "Started"], ["rounds", "Rounds"], ["players", "Players"], ["kits", "Saved games"], ["kbytes", "Saved bytes"]];
    var sum = {};
    cols.forEach(function (c) { sum[c[0]] = 0; });
    days.forEach(function (k) { cols.forEach(function (c) { sum[c[0]] += Number((t.days[k] || {})[c[0]]) || 0; }); });

    var stats = el("div", "dk-stats");
    var todo = reports.filter(function (r) { return r.state !== "done"; }).length;
    [[n(sum.made), "live games made"], [n(sum.started), "live games started"], [n(sum.players), "players in rounds"],
     [n(sum.kits), "games saved"], [size(sum.kbytes), "of saved games written"], [n(todo), "reports to do"]].forEach(function (s) {
      var d = el("div", "dk-stat");
      add(d, el("b", "", s[0]), el("span", "", s[1]));
      stats.appendChild(d);
    });
    box.appendChild(stats);
    box.appendChild(el("p", "dk-from", "All the days kept (a year). Saved bytes: what new and changed saved games added that day; the server pauses new saves above 40 MB a day."));

    var wrap = el("div", "dk-tablewrap"), table = el("table", "dk-table");
    var head = el("thead"), hr = el("tr");
    hr.appendChild(el("th", "", "Day"));
    cols.forEach(function (c) { hr.appendChild(el("th", "", c[1])); });
    head.appendChild(hr);
    table.appendChild(head);
    var body = el("tbody");
    days.slice(0, 30).forEach(function (k) {
      var tr = el("tr"), d = t.days[k] || {};
      tr.appendChild(el("td", "", dayName(k)));
      cols.forEach(function (c) { tr.appendChild(el("td", "", c[0] === "kbytes" ? size(d[c[0]]) : n(d[c[0]]))); });
      body.appendChild(tr);
    });
    if (!days.length) { var tr0 = el("tr"), td0 = el("td", "", "No days yet."); td0.colSpan = cols.length + 1; tr0.appendChild(td0); body.appendChild(tr0); }
    table.appendChild(body);
    var foot = el("tfoot"), fr = el("tr");
    fr.appendChild(el("td", "", "All days"));
    cols.forEach(function (c) { fr.appendChild(el("td", "", c[0] === "kbytes" ? size(sum[c[0]]) : n(sum[c[0]]))); });
    foot.appendChild(fr);
    table.appendChild(foot);
    wrap.appendChild(table);
    box.appendChild(wrap);
    if (days.length > 30) box.appendChild(el("p", "dk-from", "The last 30 days of " + n(days.length) + " are shown; the sums count them all."));

    /* how often each net caught each of Logicers' own questions: the numbers that tune the sets */
    var qk = Object.keys(t.questions || {}).sort();
    if (qk.length) {
      var det = el("details", "dk-details");
      det.appendChild(el("summary", "", "Logicers' questions: how often each net caught (" + n(qk.length) + ")"));
      var w2 = el("div", "dk-tablewrap"), t2 = el("table", "dk-table"), h2 = el("thead"), r2 = el("tr");
      ["Question", "Small", "Medium", "Big"].forEach(function (x) { r2.appendChild(el("th", "", x)); });
      h2.appendChild(r2);
      t2.appendChild(h2);
      var b2 = el("tbody");
      qk.forEach(function (k) {
        var v = t.questions[k] || {}, tr = el("tr");
        tr.appendChild(el("td", "", k));
        ["s", "m", "b"].forEach(function (s) {
          var x = Array.isArray(v[s]) ? v[s] : [0, 0];
          var pc = x[1] ? Math.round(100 * x[0] / x[1]) + "%" : "–";
          tr.appendChild(el("td", "", n(x[0]) + " of " + n(x[1]) + " · " + pc));
        });
        b2.appendChild(tr);
      });
      t2.appendChild(b2);
      w2.appendChild(t2);
      det.appendChild(w2);
      box.appendChild(det);
    }
  }

  /* ================================================================ the daily reminder (18 Oct 2026)
     How many phones have said yes, how many got today's reminder, and the one announcement (a new game) that goes out
     in place of the usual line, once to each phone, within the days chosen. At most one reminder a day per phone, always:
     an announcement takes the place of that day's line, it never adds a second push. */
  function drawPush(res) {
    var box = $("push-res");
    clear(box);
    var b = res.b;
    if (res.status !== 200 || typeof b.n !== "number") { box.appendChild(el("p", "dk-inline-err", trouble(res))); return; }
    if (!b.sets) box.appendChild(el("p", "dk-inline-err", "The server has no signing key yet (VAPID_PRIVATE): no reminder can go out."));
    box.appendChild(el("p", "dk-p", n(b.n) + " phones have reminders on · " + n(b.sentToday) + " got one today."));
    if (Array.isArray(b.top) && b.top.length) {
      box.appendChild(el("p", "dk-from", "By country: " + b.top.map(function (x) { return str(x[0]) + " " + n(x[1]); }).join(" · ")));
    }
    box.appendChild(el("p", "dk-from", b.ann && b.ann.text
      ? "Announcement waiting until " + when(b.ann.until) + ": " + str(b.ann.text)
      : "No announcement is waiting."));
  }
  function loadPush() {
    if (!KEY) return;
    var g = gen;
    call({ op: "stats" }, "/push/admin").then(function (r) { if (g === gen && !keyGone(r)) drawPush(r); });
  }
  $("push-load").addEventListener("click", loadPush);
  $("push-send").addEventListener("click", function () {
    if (!KEY) return;
    var g = gen, text = $("push-text").value.trim(), days = Number($("push-days").value) || 3, btn = this;
    btn.disabled = true;
    call({ op: "ann", text: text, days: days }, "/push/admin").then(function (r) {
      if (g !== gen || keyGone(r)) return;
      btn.disabled = false;
      var m = $("push-msg");
      m.hidden = false;
      m.textContent = r.status === 200 ? (text ? "Saved. It goes out as each phone's next reminder, once." : "The announcement is cleared.")
        : (r.b && r.b.e === "text" ? "That text is not allowed (up to 120 characters, no links or addresses)." : trouble(r));
      if (r.status === 200) loadPush();
    });
  });
  $("push-clear").addEventListener("click", function () { $("push-text").value = ""; $("push-send").click(); });

  /* ================================================================ what players said (19 Oct 2026)
     The lines written at the end of a day (server/live/src/said.js), newest first, the ones to do alone or all of
     them; each let through or turned down with one tap. Every line is a stranger's text: put on the page with
     textContent only, in its own direction. */
  var saidOnlyNew = true, saidLast = "";
  function dateWords(d) {
    var m = /^(\d{4})(\d{2})(\d{2})$/.exec(str(d));
    if (!m) return str(d);
    try { return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString("en-GB", { day: "numeric", month: "short" }); } catch (e) { return str(d); }
  }
  function saidRow(x) {
    var row = el("div", "dk-rep dk-said-row" + (x.state === "new" ? " dk-new" : ""));
    var top = el("div", "dk-reptop");
    top.appendChild(el("span", "", (str(x.c) !== "??" ? str(x.c) + " · " : "") + dateWords(x.d) + " · " + when(x.at)));
    var st = el("span", "dk-said-state", x.state === "ok" ? "Let through" : x.state === "no" ? "Turned down" : "To do");
    top.appendChild(st);
    row.appendChild(top);
    row.appendChild(their("p", "dk-said-text", x.text));
    /* the name and the "I am a…" the player typed (20 Oct 2026), as text, beside the line they will show with */
    if (x.name || x.role) row.appendChild(their("p", "dk-from", "By: " + [x.name, x.role].filter(Boolean).map(str).join(" · ")));
    var acts = el("div", "dk-keyrow");
    var yes = el("button", "dk-mini dk-strong", x.state === "ok" ? "Let through ✓" : "Let through");
    yes.type = "button"; yes.disabled = x.state === "ok";
    var no = el("button", "dk-mini", x.state === "no" ? "Turned down ✓" : "Turn down");
    no.type = "button"; no.disabled = x.state === "no";
    function decide(okay) {
      if (!KEY) return;
      var g = gen;
      yes.disabled = no.disabled = true;
      call({ op: "decide", id: str(x.id), ok: okay }, "/said/admin").then(function (r) {
        if (g !== gen || keyGone(r)) return;
        if (r.status !== 200) { yes.disabled = no.disabled = false; deskErr(trouble(r)); return; }
        x.state = okay ? "ok" : "no";
        st.textContent = okay ? "Let through" : "Turned down";
        row.classList.remove("dk-new");
        yes.textContent = okay ? "Let through ✓" : "Let through"; yes.disabled = okay;
        no.textContent = okay ? "Turn down" : "Turned down ✓"; no.disabled = !okay;
        if (saidOnlyNew) row.classList.add("dk-said-done");
      });
    }
    yes.addEventListener("click", function () { decide(true); });
    no.addEventListener("click", function () { decide(false); });
    acts.appendChild(yes); acts.appendChild(no);
    row.appendChild(acts);
    return row;
  }
  function drawSaid(res, more) {
    var box = $("said-res");
    if (!more) clear(box);
    var b = res.b;
    if (res.status !== 200 || !Array.isArray(b.lines)) { box.appendChild(el("p", "dk-inline-err", trouble(res))); return; }
    $("said-count").textContent = n(b.open) + " to do · " + n(b.n) + " kept";
    if (!b.lines.length && !more) box.appendChild(el("p", "dk-from", saidOnlyNew ? "Nothing to do. Every line has been read." : "No lines yet."));
    b.lines.forEach(function (x) { box.appendChild(saidRow(x)); });
    saidLast = b.lines.length ? str(b.lines[b.lines.length - 1].id) : "";
    $("said-more").hidden = b.lines.length < 200;
  }
  function loadSaid(more) {
    if (!KEY) return;
    var g = gen, body = { op: "list", onlyNew: saidOnlyNew };
    if (more && saidLast) body.before = saidLast;
    call(body, "/said/admin").then(function (r) { if (g === gen && !keyGone(r)) drawSaid(r, more); });
  }
  $("said-load").addEventListener("click", function () { loadSaid(false); });
  $("said-more").addEventListener("click", function () { loadSaid(true); });
  Array.prototype.forEach.call($("said-filter").querySelectorAll("[data-f]"), function (b) {
    b.addEventListener("click", function () {
      Array.prototype.forEach.call($("said-filter").querySelectorAll("[data-f]"), function (o) { o.setAttribute("aria-checked", "false"); });
      b.setAttribute("aria-checked", "true");
      saidOnlyNew = b.getAttribute("data-f") === "new";
      loadSaid(false);
    });
  });
})();
