/* Play Logicers — the queue page (chat B, 19 Nov 2026). English only, never indexed, never cached. Plan 2.12.
   Two keys: the admin key (Khayyam: everything) and the review key (the Monday run: list, reject, leave, edit, show again,
   done; never hide, delete or import, and never the address of a game that has been on the list; chat H, 20 Nov 2026). The page asks for a key once and keeps it in memory only. "Remember on this
   computer" is offered only once the server says the key is the review key, and then keeps it in this browser's storage
   (portal.review), so the weekly task can open the queue; the admin key is never written anywhere. A remembered key that
   turns out not to be a review key is forgotten at once.
   The page's CSP requires Trusted Types with the one policy "portal-admin", made here and never used for HTML: every card
   is built with the DOM (createElement, textContent), so nothing a sender wrote can become markup. */
(function () {
  "use strict";
  var doc = document;
  try {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
      window.trustedTypes.createPolicy("portal-admin", { createHTML: function () { throw new TypeError("the queue page writes no HTML"); } });
    }
  } catch (e) { /* the policy exists already: nothing to do */ }

  var D = {};
  try { D = JSON.parse(doc.getElementById("pl-data").textContent) || {}; } catch (e) { D = {}; }
  var KINDS = D.kinds || ["words", "numbers", "maps", "knowledge", "music", "screen", "sport", "other"];
  var LANGS = D.langs || [];
  var REJECT = D.reasons || ["notdaily", "notgame", "broken", "unsafe", "copy", "other"];
  var ENDONYM = {};
  LANGS.forEach(function (l) { ENDONYM[l.code] = l.endonym; });
  var REMEMBER = "portal.review";

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = doc.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = String(text); return e; }
  function get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* not kept */ } }
  function drop(k) { try { window.localStorage.removeItem(k); } catch (e) { /* nothing kept */ } }

  var form = $("#admin-key"), msg = $(".admin-msg"), bar = $(".admin-bar"), roleEl = $(".admin-role"), rem = $(".admin-remember"),
    remBox = rem ? $("input", rem) : null, lock = $(".admin-lock"), filters = $(".admin-filters"), cards = $("#admin-cards"), moreBtn = $(".admin-more");
  var key = null, role = null, filter = "todo", next = null;

  var WORDS = {
    key: "Wrong key.", busy: "Too many tries. Wait ten minutes, then try again.", server: "The server did not answer. Try again.",
    here: "Another game has this address in this language.", admin_only: "Only the admin key can do this.", logicers: "Logicers' own games change in src/logicers.js.",
    reason: "Choose a reason first.", action: "Not possible for this game now.", nogame: "This game is gone.", origin: "Open this page from play.logicers.com.",
  };
  var FIELD = { kind: "the kind", name: "the name", line: "the line (at most 60 characters)", lang: "the language", url: "the address (https only)", maker: "the maker" };
  function say(j) {
    if (!j) return WORDS.server;
    if (j.e === "field") return "Fill in " + (FIELD[j.field] || j.field) + ".";
    return WORDS[j.e] || ("Not done (" + j.e + ").");
  }
  function post(path, body) {
    return window.fetch(path, { method: "POST", credentials: "omit", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, e: r.status === 429 ? "busy" : "server" }; }); })
      .catch(function () { return { ok: false, e: "server" }; });
  }
  function when(t) {
    if (!t) return "";
    var d = new Date(t);
    if (isNaN(d)) return String(t);
    return d.toISOString().slice(0, 16).replace("T", " ") + " UTC";
  }

  /* ---- the key ---- */
  function showForm(text) {
    key = null; role = null;
    form.hidden = false; bar.hidden = true; filters.hidden = true; moreBtn.hidden = true;
    while (cards.firstChild) cards.removeChild(cards.firstChild);
    msg.textContent = text || ""; msg.hidden = !text;
    var i = $('input[name="key"]', form);
    i.value = "";
    i.focus();
  }
  function open(k, fromMemory) {
    return post("/admin/queue", { key: k, filter: filter }).then(function (j) {
      if (!j || !j.ok) {
        if (fromMemory) { drop(REMEMBER); showForm(""); return; }
        showForm(say(j));
        return;
      }
      if (fromMemory && j.role !== "review") { drop(REMEMBER); showForm(""); return; }   // only a review key is ever remembered
      key = k; role = j.role;
      form.hidden = true; msg.hidden = true; bar.hidden = false; filters.hidden = false;
      roleEl.textContent = role === "admin" ? "Admin key" : "Review key";
      rem.hidden = role !== "review";
      if (remBox) remBox.checked = role === "review" && get(REMEMBER) === k;
      if (role !== "review") drop(REMEMBER);
      $$('.admin-filter[data-filter="tell"], .admin-filter[data-filter="searches"]').forEach(function (b) { b.hidden = role !== "admin"; });   // emails and searches: Khayyam only
      paint(j, false);
    });
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var k = ($('input[name="key"]', form).value || "").trim();
    if (!k) return;
    msg.hidden = true;
    open(k, false);
  });
  if (remBox) remBox.addEventListener("change", function () {
    if (remBox.checked && role === "review" && key) put(REMEMBER, key); else drop(REMEMBER);
  });
  lock.addEventListener("click", function () { showForm(""); });

  /* ---- the filters and the list ---- */
  function counts(open) {
    if (!open) return;
    $$(".admin-filter").forEach(function (b) {
      var f = b.getAttribute("data-filter"), n = $(".admin-filter-n", b);
      if (n) n.textContent = open[f] != null ? String(open[f]) : "";
    });
  }
  /* Numbers (chat K, 21 Nov 2026): what is counted, while the pages show none of it. Three small tables, numbers only. */
  function numTable(title, head, rows) {
    var box = el("section", "admin-nums"), t = el("table", "admin-nums-t"), tr = el("tr");
    box.appendChild(el("h2", "admin-nums-h", title));
    head.forEach(function (h, i) { var th = el("th", i ? "is-n" : null, h); th.scope = "col"; tr.appendChild(th); });
    var th = el("thead"); th.appendChild(tr); t.appendChild(th);
    var tb = el("tbody");
    rows.forEach(function (r) {
      var row = el("tr", r.cls || null);
      r.cells.forEach(function (c, i) { var td = el(i ? "td" : "th", i ? "is-n" : null, typeof c === "number" ? (c ? c.toLocaleString("en-US") : "·") : c); if (!i) td.scope = "row"; row.appendChild(td); });
      tb.appendChild(row);
    });
    t.appendChild(tb); box.appendChild(t);
    return box;
  }
  function numbersView(n) {
    var f = doc.createDocumentFragment(), three = function (x) { return [x[0], x[1], x[2]]; };
    f.appendChild(el("p", "admin-nums-note", (n.shown ? "The pages show these numbers." : "Counted, not shown on the pages (SHOW_NUMBERS in wrangler.jsonc is \"0\"; \"1\" shows them).") + " Today is " + n.day + " (UTC)."));
    var head = ["", "Games", "Opened today", "7 days", "In all", "Sent today", "7 days", "In all"];
    var rows = n.langs.map(function (l) { return { cells: [l.endonym + " (" + l.code + ")", l.games].concat(three(l.opened), three(l.sent)) }; });
    rows.unshift({ cls: "is-total", cells: ["All languages", n.langs.reduce(function (s, l) { return s + l.games; }, 0)].concat(three(n.total.opened), three(n.total.sent)) });
    rows.push({ cells: ["Sent to Logicers' own games", ""].concat(["", "", ""], three(n.total.logicers)) });
    f.appendChild(numTable("By language: people who opened a page, players sent to games", head, rows));
    f.appendChild(numTable("The last 14 days", ["Day (UTC)", "Opened a page", "Sent to games"], n.days.map(function (d) { return { cells: [d.day, d.opened, d.sent] }; })));
    f.appendChild(numTable("Games that sent most players (7 days)", ["Game", "Language", "Today", "7 days", "In all"],
      n.games.map(function (g) { return { cells: [g.name + (g.logicers ? " (Logicers)" : "") + (g.status !== "listed" ? " (" + g.status + ")" : ""), g.lang].concat(three(g.sent)) }; })));
    if (!n.games.length) f.appendChild(el("p", "admin-empty", "No player sent yet."));
    return f;
  }
  /* Searches (chat S, 24 Nov 2026; the admin key only): what people searched for on a language's page and did not find, the
     last 30 days, as the words were compared (case, accents and spaces gone), most first. Never public. */
  function searchesView(x) {
    var f = doc.createDocumentFragment();
    f.appendChild(el("p", "admin-nums-note", "Searches that found nothing, " + x.from + " to " + x.to + " (UTC), as they were compared: no case, no accents, no spaces. Kept 90 days; only this key sees them."));
    x.langs.forEach(function (l) {
      f.appendChild(numTable(l.endonym + " (" + l.code + ")", ["Searched for", "Times"], l.terms.map(function (t) { return { cells: [t[0], t[1]] }; })));
    });
    if (!x.langs.length) f.appendChild(el("p", "admin-empty", "No search has come up empty yet."));
    return f;
  }
  function paint(j, append) {
    counts(j.open);
    $$(".admin-filter").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filter") === filter ? "true" : "false"); });
    if (!append) while (cards.firstChild) cards.removeChild(cards.firstChild);
    if (j.numbers) { cards.appendChild(numbersView(j.numbers)); next = null; moreBtn.hidden = true; return; }
    if (j.searches) { cards.appendChild(searchesView(j.searches)); next = null; moreBtn.hidden = true; return; }
    (j.cards || []).forEach(function (c) { cards.appendChild(card(c)); });
    if (!cards.children.length) cards.appendChild(el("p", "admin-empty", "Nothing here."));
    next = j.next;
    moreBtn.hidden = next == null;
  }
  function load(append) {
    if (!key) return;
    return post("/admin/queue", { key: key, filter: filter, before: append ? next : undefined }).then(function (j) {
      if (!j || !j.ok) { if (j && j.e === "key") showForm(WORDS.key); return; }
      paint(j, append);
    });
  }
  filters.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".admin-filter") : null;
    if (!b) return;
    filter = b.getAttribute("data-filter");
    load(false);
  });
  moreBtn.addEventListener("click", function () { load(true); });
  function refreshCounts() { if (key) post("/admin/queue", { key: key, filter: filter }).then(function (j) { if (j && j.ok) counts(j.open); }); }

  /* ---- one card ---- */
  var FLAG = { blocklist_host: "Blocklist: address", blocklist_words: "Blocklist: words", other_site: "Moved to another site", hp: "Hidden field filled",
    lang_differs: "Page in another language", noopen: "Did not open" };
  /* the queue rows of a card, by kind (chat H, 20 Nov 2026: "blocked" and "jump" added) */
  var ROW = { add: "Queue", report: "Report", dead: "Dead link", moved: "Moved", blocked: "Blocklist", check: "Check by hand", jump: "Numbers jump",
    gotw: "Game of the week", edit: "Maker's change", pic: "New logo" };
  function link(href, text, cls) {
    var a = el("a", cls, text);
    if (/^https:\/\//i.test(href || "")) { a.setAttribute("href", href); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener noreferrer"); }
    return a;
  }
  function fact(dl, k, v) {
    if (v == null || v === "") return;
    dl.appendChild(el("dt", null, k));
    var dd = el("dd");
    if (v instanceof window.Node) dd.appendChild(v); else dd.textContent = String(v);
    dl.appendChild(dd);
  }
  function select(name, values, label, current) {
    var s = el("select"); s.name = name;
    values.forEach(function (v) {
      var o = el("option", null, label ? label(v) : v); o.value = v;
      if (v === current) o.selected = true;
      s.appendChild(o);
    });
    return s;
  }
  function field(label, input, wide) {
    var l = el("label", "fld" + (wide ? " fld-wide" : ""));
    l.appendChild(el("span", "fld-l", label));
    l.appendChild(input);
    return l;
  }
  function input(name, value, max) {
    var i = el("input"); i.name = name; i.value = value || ""; i.autocomplete = "off"; i.spellcheck = false;
    if (max) i.maxLength = max;
    return i;
  }
  /* To tell (chat J, stage 4): one email a game, written from logicers.world@gmail.com by hand once a week (plan, prompt M) */
  function copyBtn(text, label) {
    var b = el("button", "btn", label); b.type = "button";
    b.addEventListener("click", function () {
      var done = function () { b.textContent = "Copied"; window.setTimeout(function () { b.textContent = label; }, 1400); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { /* the text is on the card */ });
    });
    return b;
  }
  function tellCard(c) {
    var t = c.tell, a = el("article", "card card-tell");
    a.setAttribute("data-id", c.id);
    var head = el("div", "card-head");
    head.appendChild(el("h2", "card-name", c.name || c.host || c.id));
    head.appendChild(link(t.page, t.page, "card-url"));
    a.appendChild(head);
    var tags = el("div", "card-tags");
    [(ENDONYM[c.lang] || c.lang) + " (" + c.lang + ")", c.listed_at ? "listed " + when(c.listed_at).slice(0, 10) : "", c.hits ? c.hits + " players in all" : ""]
      .filter(Boolean).forEach(function (x) { tags.appendChild(el("span", null, x)); });
    a.appendChild(tags);
    var dl = el("dl", "card-facts");
    fact(dl, "To", t.email); fact(dl, "From", t.from); fact(dl, "Subject", t.subject); fact(dl, "Claim link", t.link);
    a.appendChild(dl);
    a.appendChild(el("pre", "card-mail", t.text));
    var acts = el("div", "card-acts"), msgEl = el("p", "card-msg");
    msgEl.setAttribute("role", "status"); msgEl.hidden = true;
    acts.appendChild(copyBtn(t.text, "Copy the text"));
    acts.appendChild(copyBtn(t.subject, "Copy the subject"));
    var g = link(t.gmail, "Write it in Gmail (" + t.from + ")", "btn");
    acts.appendChild(g);
    var sent = el("button", "btn btn-send", "Sent"); sent.type = "button";
    sent.addEventListener("click", function () { act(a, c, "told"); });
    acts.appendChild(sent);
    a.appendChild(acts);
    a.appendChild(msgEl);
    return a;
  }
  function card(c) {
    if (c.tell) return tellCard(c);
    var a = el("article", "card");
    a.setAttribute("data-id", c.id);
    var lg = c.source === "logicers";

    var flags = el("div", "card-flags");
    (c.flags || []).forEach(function (f) { flags.appendChild(el("span", "card-flag", FLAG[f] || f)); });
    if (c.left) flags.appendChild(el("span", "card-flag is-soft", "Left for Khayyam"));
    if (c.crown) flags.appendChild(el("span", "card-flag is-soft", "Game of the week"));
    if (c.reports && c.reports.browsers >= 3) flags.appendChild(el("span", "card-flag", c.reports.browsers + " browsers reported it"));
    if (flags.children.length) a.appendChild(flags);

    var head = el("div", "card-head");
    head.appendChild(el("h2", "card-name", c.name || c.host || c.id));
    head.appendChild(link(c.url, c.url, "card-url"));
    a.appendChild(head);

    var tags = el("div", "card-tags");
    [ (ENDONYM[c.lang] || c.lang) + " (" + c.lang + ")", c.kind, c.status, c.source, "sent " + when(c.made).slice(0, 10),
      c.listed_at ? "listed " + when(c.listed_at).slice(0, 10) : "", c.hits ? c.hits + " players in all" : "" ]
      .filter(Boolean).forEach(function (t) { tags.appendChild(el("span", null, t)); });
    a.appendChild(tags);

    var dl = el("dl", "card-facts");
    (c.sent || []).forEach(function (s) {
      fact(dl, "Sent by", [s.name || "(no name)", s.email || "", when(s.made)].filter(Boolean).join(" · "));
    });
    var k = c.check;
    if (k) {
      if (k.final && k.final !== c.url) fact(dl, "Ends at", link(k.final, k.final));
      if (k.block_words && k.block_words.length) fact(dl, "Blocklist words", k.block_words.join(", "));
      fact(dl, "Opened", k.status ? String(k.status) + (k.same_site === false ? " · another site" : "") : (k.error ? "no · " + k.error : ""));
      fact(dl, "Title", k.title);
      fact(dl, "Page language", k.lang);
      fact(dl, "Description", k.desc);
      fact(dl, "Says daily", k.daily_hint ? "yes" : (k.status ? "no sign" : ""));
    }
    /* playing inside (chat Inside, 27 Nov 2026): what the look found, and the switch (the maker's form has the same one) */
    if (!lg && c.status === "listed") fact(dl, "Playing here", c.frame_off ? "off (switched off; kept even if the site allows frames)" : c.frame === 1 ? "on (the site allows it)" : c.frame === 0 ? "no (the site does not allow it)" : "not known yet");
    if (c.link && (c.link.state || c.link.last)) fact(dl, "Night check", [c.link.state || "ok", c.link.fails ? c.link.fails + " fails" : "", when(c.link.last)].filter(Boolean).join(" · "));
    if (c.reports && c.reports.n) fact(dl, "Reports", c.reports.n + " (" + c.reports.browsers + " browsers): " + Object.keys(c.reports.reasons || {}).map(function (r) { return r + " " + c.reports.reasons[r]; }).join(", "));
    (c.rows || []).forEach(function (r) { fact(dl, ROW[r.kind] || "Queue: " + r.kind, r.text + " · " + when(r.made)); });
    if (c.maker_of) fact(dl, "Claimed by", c.maker_of.name + " (" + c.maker_of.slug + ")" + (c.claimed_at ? " · " + when(c.claimed_at) : "") + (c.line_by === "maker" ? " · the line is the maker's" : ""));
    /* the logo (chat J, stage 3): the one shown, and a new one waiting for a look (fetched on a click, as a data: picture) */
    if (c.pic || c.pic_wait) {
      var lw = el("div", "card-logos");
      if (c.pic) { var on = el("img", "card-logo"); on.src = c.pic; on.alt = "The logo shown"; on.width = 72; on.height = 72; lw.appendChild(on); }
      if (c.pic_wait) {
        var pw = c.pic_wait, seeB = el("button", "btn card-logo-see", "Look at the new logo (" + pw.w + "×" + pw.h + ", " + Math.ceil(pw.size / 1024) + " KB)");
        seeB.type = "button";
        seeB.addEventListener("click", function () {
          seeB.disabled = true;
          post("/admin/pic", { key: key, game: c.id }).then(function (j) {
            if (!j || !j.ok || !/^data:image\/(png|jpeg|webp);base64,/.test(j.data || "")) { seeB.disabled = false; return; }
            var im = el("img", "card-logo card-logo-new"); im.src = j.data; im.alt = "The new logo"; im.width = 120; im.height = 120;
            seeB.parentNode.replaceChild(im, seeB);
          });
        });
        lw.appendChild(seeB);
      }
      fact(dl, "Logo", lw);
    }
    if (c.page) fact(dl, "Page", link(c.page, c.page));
    if (c.notes) fact(dl, "Notes", c.notes);
    if (dl.children.length) a.appendChild(dl);

    var msgEl = el("p", "card-msg");
    msgEl.hidden = true;

    if (!lg) {
      var fs = el("div", "card-fields");
      var fKind = select("kind", KINDS, null, c.kind), fLang = select("lang", LANGS.map(function (l) { return l.code; }), function (v) { return ENDONYM[v] + " (" + v + ")"; }, c.lang);
      var fName = input("name", c.name, 80), fMaker = input("maker", c.maker, 80), fLine = input("line", c.line, 60), fUrl = input("url", c.url, 500);
      fUrl.type = "url";
      var count = el("span", "card-count");
      var paintCount = function () { var n = Array.from(fLine.value).length; count.textContent = n + "/60"; count.classList.toggle("is-over", n > 60); };
      fLine.addEventListener("input", paintCount);
      paintCount();
      fs.appendChild(field("Kind", fKind));
      fs.appendChild(field("Language", fLang));
      fs.appendChild(field("Name, as the maker writes it", fName));
      fs.appendChild(field("Maker (if the page shows one)", fMaker));
      var lineBox = field("One line in the game's language: what you do (at most 60)", fLine, true);
      lineBox.appendChild(count);
      fs.appendChild(lineBox);
      /* a game that has been on the list keeps its address unless the admin key changes it (a page the weekly run opens
         could ask it to point the game elsewhere) */
      if (role !== "admin" && c.listed_at) { fUrl.readOnly = true; fUrl.setAttribute("aria-readonly", "true"); fUrl.title = "Only the admin key changes the address of a listed game."; }
      fs.appendChild(field(role !== "admin" && c.listed_at ? "Address (admin key only)" : "Address", fUrl, true));
      a.appendChild(fs);
    }

    var acts = el("div", "card-acts");
    var fields = function () {
      if (lg) return undefined;
      var out = {}, f = { kind: fKind.value, lang: fLang.value, name: fName.value.trim(), maker: fMaker.value.trim(), line: fLine.value.trim(), url: fUrl.value.trim() };
      Object.keys(f).forEach(function (x) { if (f[x] !== (c[x] || "")) out[x] = f[x]; });
      return out;
    };
    var btn = function (text, cls, fn) { var b = el("button", "btn" + (cls ? " " + cls : ""), text); b.type = "button"; b.addEventListener("click", fn); acts.appendChild(b); return b; };
    var st = c.status;
    if (!lg) {
      if (st === "waiting" || st === "left") btn("List", "btn-send", function () { act(a, c, "list", fields()); });
      if (st === "hidden" || st === "dead" || st === "rejected" || st === "left") btn("Show again", st === "left" ? "" : "btn-send", function () { act(a, c, "show", fields()); });
      if (st !== "listed" && st !== "rejected") {
        var why = select("reason", REJECT, function (v) { return { notdaily: "Not daily", notgame: "Not a game", broken: "Broken", unsafe: "Unsafe", copy: "A copy", other: "Other" }[v] || v; }, null);
        var none = el("option", null, "Reason…"); none.value = ""; why.insertBefore(none, why.firstChild); why.value = "";
        acts.appendChild(why);
        btn("Reject", "", function () { if (!why.value) { note(msgEl, WORDS.reason, false); why.focus(); return; } act(a, c, "reject", undefined, why.value); });
      }
      if ((st === "waiting" || st === "listed") && !c.left) btn("Leave for Khayyam", "", function () { act(a, c, "leave"); });
      btn("Save changes", "", function () { var f = fields(); if (!Object.keys(f).length) { note(msgEl, "Nothing changed.", true); return; } act(a, c, "edit", f); });
    }
    if (!lg && c.pic_wait) { btn("Show this logo", "btn-send", function () { act(a, c, "pic_ok"); }); btn("Refuse the logo", "", function () { act(a, c, "pic_no"); }); }
    if (!lg && c.pic) btn("Take the logo off", "", function () { act(a, c, "pic_off"); });
    if ((c.rows || []).length) btn("Done", "", function () { act(a, c, "done"); });
    if (!lg && role === "admin") {
      if (c.crown) btn("Take the crown off", "", function () { act(a, c, "nocrown"); });   // the game of the week (chat J, 20 Nov 2026)
      if (st === "listed") btn(c.frame_off ? "Turn playing here on" : "Turn playing here off", "", function () { act(a, c, c.frame_off ? "frame_on" : "frame_off"); });
      if (st === "listed") btn("Hide", "is-danger", function () { act(a, c, "hide"); });
      var del = btn("Delete", "is-danger", function () {
        if (del.getAttribute("data-sure") !== "1") { del.setAttribute("data-sure", "1"); del.textContent = "Delete for good? Click again"; return; }
        act(a, c, "delete");
      });
    }
    a.appendChild(acts);
    a.appendChild(msgEl);
    return a;
  }
  function note(p, text, ok) { p.textContent = text; p.classList.toggle("is-ok", !!ok); p.hidden = !text; }
  var DONE = { list: "Listed.", show: "Back on the list.", reject: "Rejected.", leave: "Left for Khayyam.", edit: "Saved.", done: "Closed.", hide: "Hidden.",
    nocrown: "The crown is off.", pic_ok: "The logo is shown.", pic_no: "The logo is refused.", pic_off: "The logo is off.",
    frame_off: "Playing here is off.", frame_on: "Playing here is on." };
  function act(cardEl, c, action, fields, reason) {
    if (!key) return;
    cardEl.classList.add("is-busy");
    var body = { key: key, game: c.id, action: action };
    if (fields && Object.keys(fields).length) body.fields = fields;
    if (reason) body.reason = reason;
    post("/admin/act", body).then(function (j) {
      cardEl.classList.remove("is-busy");
      if (!j || !j.ok) {
        if (j && j.e === "key") { showForm(WORDS.key); return; }
        note($(".card-msg", cardEl), say(j), false);
        return;
      }
      if (j.deleted || action === "told") { cardEl.parentNode.removeChild(cardEl); refreshCounts(); return; }
      var fresh = card(j.card);
      cardEl.parentNode.replaceChild(fresh, cardEl);
      note($(".card-msg", fresh), (DONE[action] || "Done.") + (j.opened && j.opened.length ? " Opened: " + j.opened.join(", ") + "." : ""), true);
      refreshCounts();
    });
  }

  /* ---- start: a remembered review key opens the queue at once ---- */
  var kept = get(REMEMBER);
  if (kept) open(kept, true); else showForm("");
})();
