/* Logicers Studio: the editor (by.logicers.com/new/ and /<maker>/<game>/edit/#<edit key>), loaded by studio.js only there.

   /new/: the maker's name once (then kept in this browser and, on a phone with a My Logicers code, in My Logicers),
   the template, the name of the game, its language, one a day or all at once, the first day, "keep answers",
   "List it on Logicers", and the terms tick box (its text's version goes to the Worker with the game).
   Then the big "Keep your edit link" sheet: Done opens only once the link is kept somewhere.
   The editor: the questions in order (drag the grip, or Move up / Move down), each with its picture (made smaller in the
   browser: 1600 px on the longest side and under 500 KB, before it is sent) and its explanation (one link at most);
   the settings; Listed / Not listed yet / Hidden by Logicers; Share (link, code, QR, embed); Delete.

   Keys kept: lg.studio.mine { v, maker: {slug, name, key, t}, games: [{maker, slug, title, edit, t}] } in this browser
   (the maker always; a game's edit link only when "This browser" is chosen) and, through bridge.html, on logicers.com
   when the phone keeps a My Logicers code (chat D reads it there). */
(function () {
  "use strict";
  var S = window.Studio, API = window.StudioAPI, TPL = window.StudioT;
  if (!S || !API) return;
  var t = S.t, el = S.el, btn = S.btn, attr = S.attr;
  var TEMPLATES = ["number", "line", "pick", "rank", "picture", "read"];
  var LIMIT_ITEMS = 500, LIMIT_IMAGES = 30, IMG_SIDE = 1600, IMG_BYTES = 500 * 1024;
  var MAX = { title: 60, about: 2000, explain: 300, name: 40 };

  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function clean(s, n) { return String(s == null ? "" : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/g, "").slice(0, n || 2000); }
  function slugify(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/ı/g, "i").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60).replace(/-+$/, "");
  }

  /* ---------------- the keys this browser keeps, and My Logicers' ---------------- */
  var hello = null;     // what bridge.html said: { code: bool, mine }
  function askBridge() {
    if (hello) return Promise.resolve(hello);
    return S.bridge("hello").then(function (r) { hello = obj(r) ? r : { code: false, mine: null }; return hello; });
  }
  function known() {
    var m = S.mine(), out = { maker: m.maker, games: m.games.slice() };
    var b = hello && obj(hello.mine);
    if (b) {
      if (!out.maker && obj(b.maker) && b.maker.key) out.maker = b.maker;
      (Array.isArray(b.games) ? b.games : []).forEach(function (g) {
        if (obj(g) && g.edit && !out.games.some(function (x) { return x.maker === g.maker && x.slug === g.slug; })) out.games.push(g);
      });
    }
    return out;
  }
  function keepMaker(mk) {
    var m = S.mine(); m.maker = { slug: mk.slug, name: mk.name, key: mk.key, t: Date.now() }; S.mineSet(m);
    if (hello && hello.code) S.bridge("put", { maker: m.maker });
  }
  function keepGameHere(g) {
    var m = S.mine();
    m.games = m.games.filter(function (x) { return !(x.maker === g.maker && x.slug === g.slug); });
    m.games.unshift({ maker: g.maker, slug: g.slug, title: g.title, edit: g.edit, t: Date.now() });
    S.mineSet(m);
  }
  function hereHas(g) { return S.mine().games.some(function (x) { return x.maker === g.maker && x.slug === g.slug; }); }
  function keepGameMe(g) {
    if (!hello || !hello.code) return Promise.resolve(false);
    return S.bridge("put", { games: [{ maker: g.maker, slug: g.slug, title: g.title, edit: g.edit, t: Date.now() }] }).then(function (r) { return !!(r && r.kept); });
  }
  function forget(g) {
    var m = S.mine();
    m.games = m.games.filter(function (x) { return !(x.maker === g.maker && x.slug === g.slug); });
    S.mineSet(m);
    if (hello && hello.code) S.bridge("drop", { maker: g.maker, slug: g.slug });
  }

  /* ---------------- small form pieces ---------------- */
  var uid = 0;
  function label(text, forId) { return attr(el("label", "st-lab", text), { for: forId }); }
  function seg(box, labelKey, options, value, onChange) {
    var id = "seg" + (++uid);
    box.appendChild(attr(el("p", "st-lab", t(labelKey)), { id: id }));
    var g = attr(el("div", "ed-seg"), { role: "radiogroup", "aria-labelledby": id });
    options.forEach(function (o) {
      var b = attr(btn(null, o[2] ? o[1] : t(o[1]), function () {
        Array.prototype.forEach.call(g.children, function (x) { x.setAttribute("aria-checked", String(x === b)); });
        onChange(o[0]);
      }), { role: "radio", "aria-checked": String(o[0] === value) });
      if (o[3]) b.setAttribute("lang", o[3]);
      g.appendChild(b);
    });
    box.appendChild(g);
    return g;
  }
  function toggle(box, labelKey, hintText, on, onChange) {
    var id = "sw" + (++uid);
    var row = el("div", "ed-switch");
    var l = attr(el("label", null, t(labelKey)), { for: id });
    if (hintText) l.appendChild(el("small", null, hintText));
    var i = attr(el("input"), { id: id, type: "checkbox", role: "switch" });
    i.checked = !!on;
    i.addEventListener("change", function () { onChange(i.checked); });
    row.appendChild(l); row.appendChild(i);
    box.appendChild(row);
    return i;
  }
  function counter(input, max) {
    var c = el("span", "ed-count");
    function upd() { var left = max - input.value.length; c.textContent = left < 60 ? t("ed.chars", { n: left }) : ""; }
    input.addEventListener("input", upd); upd();
    return c;
  }
  function errSlot(key) { return attr(el("p", "ed-err"), { "data-err": key, role: "alert" }); }
  function toNum(s) {
    s = String(s).trim().replace(/\s| /g, "");
    if (!s) return null;
    if (/^-?\d{1,3}([.,]\d{3})+$/.test(s)) s = s.replace(/[.,]/g, "");
    s = s.replace(",", ".");
    var n = Number(s);
    return isFinite(n) ? n : null;
  }

  /* ================================================================ /new/ */
  function newPage() {
    var m = S.page("ed");
    S.mount([S.bar({ studio: true, langs: true }), m]);
    /* a maker this browser already knows is drawn at once; otherwise My Logicers is asked first (it may know the maker) */
    if (S.mine().maker) { drawNew(m); var had = known().games.length; askBridge().then(function () { var ti = m.querySelector("#f-title"); if (known().games.length > had && ti && !ti.value) drawNew(m); }); return; }
    m.appendChild(S.waitView());
    askBridge().then(function () { drawNew(m); });
  }
  function drawNew(m) {
    m.textContent = "";
    var k = known();
    var f = { name: "", template: "", title: "", lang: S.uiLang(), mode: "daily", start: S.today(), keep: false, list: true, terms: false };
    m.appendChild(el("h1", "st-h1", t("ed.h1")));
    m.appendChild(el("p", "st-sub", t("ed.sub")));
    var sec = el("section", "ed-sec st-enter");
    var nameIn = null, addr = null, keepHint = null;
    if (k.maker && k.maker.key) {
      sec.appendChild(el("p", "st-by", t("ed.maker_as", { maker: k.maker.name })));
    } else {
      sec.appendChild(label(t("ed.maker"), "f-name"));
      nameIn = attr(el("input", "st-in"), { id: "f-name", type: "text", maxlength: String(MAX.name), autocomplete: "nickname", dir: "auto" });
      sec.appendChild(nameIn);
      sec.appendChild(el("p", "ed-hint", t("ed.maker_hint")));
      addr = el("p", "ed-addr");
      sec.appendChild(addr);
      sec.appendChild(errSlot("name"));
      nameIn.addEventListener("input", function () {
        f.name = nameIn.value;
        bad("name", "");
        if (keepHint) keepHint.textContent = t("ed.keep_d", { maker: nameIn.value.trim() || "…" });
        var s = slugify(nameIn.value);
        addr.textContent = s ? S.SITE.replace(/^https?:\/\//, "") + "/" + s + "/" : "";
      });
    }
    m.appendChild(sec);

    var s2 = el("section", "ed-sec st-enter");
    s2.appendChild(attr(el("p", "st-h2", t("ed.template")), { id: "tpl-l" }));
    var tiles = attr(el("div", "ed-tpls"), { role: "radiogroup", "aria-labelledby": "tpl-l" });
    TEMPLATES.forEach(function (tp) {
      var b = attr(btn("ed-tpl", null, function () {
        f.template = tp;
        Array.prototype.forEach.call(tiles.children, function (x) { x.setAttribute("aria-checked", String(x === b)); });
        bad("template", "");
      }), { role: "radio", "aria-checked": "false", "data-t": tp, "data-v": tp });
      b.style.color = "var(--c)";
      b.appendChild(S.artFor(tp));
      b.appendChild(el("b", null, t("t." + tp)));
      b.appendChild(el("span", null, t("t." + tp + "_d")));
      tiles.appendChild(b);
    });
    s2.appendChild(tiles);
    s2.appendChild(errSlot("template"));
    s2.appendChild(label(t("ed.title"), "f-title"));
    var titleIn = attr(el("input", "st-in"), { id: "f-title", type: "text", maxlength: String(MAX.title), placeholder: t("ed.title_ph"), dir: "auto", autocomplete: "off" });
    titleIn.addEventListener("input", function () { f.title = titleIn.value; bad("title", ""); });
    s2.appendChild(titleIn);
    s2.appendChild(errSlot("title"));
    seg(s2, "ed.lang", S.LANGS.map(function (l) { return [l, S.LANG_NAMES[l], true, l]; }), f.lang, function (v) { f.lang = v; });
    seg(s2, "ed.mode", [["daily", "ed.daily"], ["open", "ed.open"]], f.mode, function (v) { f.mode = v; modeHint.textContent = t(v === "open" ? "ed.open_d" : "ed.daily_d"); startRow.hidden = v === "open"; });
    var modeHint = el("p", "ed-hint", t("ed.daily_d"));
    s2.appendChild(modeHint);
    var startRow = el("div");
    startRow.appendChild(label(t("ed.start"), "f-start"));
    var startIn = attr(el("input", "st-in"), { id: "f-start", type: "date", value: f.start });
    startIn.addEventListener("change", function () { if (S.dayIndex(startIn.value) != null) f.start = startIn.value; });
    startRow.appendChild(startIn);
    s2.appendChild(startRow);
    toggle(s2, "ed.keep", t("ed.keep_d", { maker: (k.maker && k.maker.name) || "…" }), f.keep, function (v) { f.keep = v; });
    keepHint = s2.querySelector(".ed-switch:last-of-type small");
    toggle(s2, "ed.list", t("ed.list_d"), f.list, function (v) { f.list = v; });
    var tick = el("label", "st-tick");
    var tb = attr(el("input"), { type: "checkbox", id: "f-terms" });
    tb.addEventListener("change", function () { f.terms = tb.checked; if (tb.checked) bad("terms", ""); });
    tick.appendChild(tb); tick.appendChild(el("span", null, t("ed.terms_tick")));
    s2.appendChild(tick);
    var tl = el("p", "st-small st-gap");
    tl.appendChild(attr(el("a", "st-link", t("ed.terms")), { href: "/terms/", target: "_blank" }));
    s2.appendChild(tl);
    s2.appendChild(errSlot("terms"));
    var go = btn("btn solid st-gap", t("ed.make"), make);
    go.style.width = "100%";
    s2.appendChild(go);
    var msg = attr(el("p", "st-err"), { role: "alert" }); msg.hidden = true;
    s2.appendChild(msg);
    m.appendChild(s2);

    if (k.games.length) {
      var s3 = el("section", "ed-sec st-enter");
      s3.appendChild(el("p", "st-h2", t("ed.your_games")));
      var ul = el("ul", "ed-mine");
      k.games.forEach(function (g) {
        var li = el("li");
        li.appendChild(el("b", null, g.title || g.slug));
        li.appendChild(attr(el("a", "chip", t("ed.edit")), { href: "/" + g.maker + "/" + g.slug + "/edit/#" + g.edit }));
        ul.appendChild(li);
      });
      s3.appendChild(ul);
      m.appendChild(s3);
    }

    function bad(key, text) { var e = m.querySelector('[data-err="' + key + '"]'); if (e) e.textContent = text; return !!text; }
    var busy = false;
    function make() {
      if (busy) return;
      msg.hidden = true;
      var wrong = false;
      var name = nameIn ? clean(nameIn.value, MAX.name).trim() : "";
      if (nameIn) wrong = bad("name", name.length < 2 || name.length > MAX.name || !slugify(name) ? t("err.name_len") : "") || wrong;
      wrong = bad("template", f.template ? "" : t("ed.template")) || wrong;
      var title = clean(titleIn.value, MAX.title).trim();
      wrong = bad("title", title ? "" : t("err.title")) || wrong;
      wrong = bad("terms", f.terms ? "" : t("err.terms")) || wrong;
      if (wrong) { var first = m.querySelector(".ed-err:not(:empty)"); if (first) first.scrollIntoView({ block: "center", behavior: S.reduced() ? "auto" : "smooth" }); return; }
      busy = true; go.disabled = true; go.textContent = t("ed.saving");
      var mk = k.maker && k.maker.key ? Promise.resolve(k.maker) : API.makerNew({ name: name, lang: S.uiLang(), terms_version: S.TERMS_VERSION }).then(function (r) {
        if (!r.ok || !r.b.key || !r.b.slug) throw r;
        var made = { slug: String(r.b.slug), name: String(r.b.name || name), key: String(r.b.key) };
        keepMaker(made);
        return made;
      });
      mk.then(function (maker) {
        return API.gameNew({
          maker_key: maker.key, template: f.template, title: title, lang: f.lang, mode: f.mode,
          start_day: f.mode === "daily" ? f.start : S.today(), keep_answers: f.keep, want_listed: f.list, terms_version: S.TERMS_VERSION
        }).then(function (r) {
          if (!r.ok || !r.b.edit_key || !r.b.slug) throw r;
          var meta = API.meta({ maker: maker.slug, maker_name: maker.name, slug: r.b.slug, title: title, template: f.template, lang: f.lang, mode: f.mode,
            start_day: f.mode === "daily" ? f.start : S.today(), keep_answers: f.keep, want_listed: f.list, code: r.b.code });
          var key = String(r.b.edit_key);
          window.history.replaceState(null, "", "/" + maker.slug + "/" + meta.slug + "/edit/#" + key);
          var ed = open({ key: key, meta: meta, maker: maker, items: [], fresh: true });
          keepSheet(ed);
        });
      }).then(null, function (r) {
        busy = false; go.disabled = false; go.textContent = t("ed.make");
        msg.textContent = t(API.errKey(r)); msg.hidden = false;
      });
    }
  }

  /* ================================================================ the editor */
  function editPage(which) {
    var key = decodeURIComponent((window.location.hash || "").replace(/^#/, "")).replace(/[^A-Za-z0-9]/g, "");
    var m = S.page("ed");
    S.mount([S.bar({ studio: true }), m]);
    m.appendChild(S.waitView());
    askBridge().then(function () {
      if (!key) {
        var g = known().games.filter(function (x) { return x.maker === which.maker && x.slug === which.slug; })[0];
        if (g && g.edit) { key = g.edit; window.history.replaceState(null, "", window.location.pathname + "#" + key); }
      }
      if (!key) { m.textContent = ""; m.appendChild(S.errorView("ed.no_key")); return; }
      API.gameMine(key).then(function (r) {
        if (!r.ok) { m.textContent = ""; m.appendChild(S.errorView(API.errKey(r), r.status === 0 ? function () { editPage(which); } : null)); return; }
        var mk = obj(r.b.maker) || {};
        var meta = API.meta(r.b.game || r.b, which.maker);
        if (!meta.slug) meta.slug = which.slug;
        if (!meta.maker_name) meta.maker_name = String(mk.name || "");
        var items = (Array.isArray(r.b.items) ? r.b.items : []).map(API.item);
        items.forEach(lk);
        open({ key: key, meta: meta, maker: { slug: meta.maker, name: meta.maker_name }, items: items, fresh: false });
      });
    });
  }

  function snapshot(E) {
    return JSON.stringify({ g: [E.meta.title, E.meta.about, E.meta.mode, E.meta.start_day, E.meta.keep_answers, E.meta.want_listed], i: E.items.map(wireItem) });
  }
  /* an item as it is saved: its template's own fields, trimmed, with its id, explanation and picture */
  var FIELDS = {
    number: ["q", "max", "answer", "unit"], line: ["q", "min", "max", "min_label", "max_label", "answer"],
    pick: ["q", "choices", "answer"], rank: ["q", "things"], read: ["text", "q", "choices", "answer"],
    picture: ["form", "q", "max", "answer", "unit", "choices"]
  };
  /* each question's own key on this page (its fields' ids): never sent, so the Worker's item id stays the only id */
  function lk(it) { if (!it._k) Object.defineProperty(it, "_k", { value: S.rid(8), enumerable: false }); return it; }
  function wireItem(it) {
    var o = {};
    if (it.id != null && it.id !== "") o.id = it.id;
    (FIELDS[current.tpl] || []).forEach(function (k) {
      var v = it[k];
      if (typeof v === "string") v = k === "text" ? v.replace(/\r/g, "").trim() : v.trim();
      if (Array.isArray(v)) v = v.map(function (x) { return String(x == null ? "" : x).trim(); });
      if (v !== undefined && v !== null && v !== "") o[k] = v;
    });
    if (current.tpl === "picture") { if (o.form === "number") delete o.choices; else { o.form = "pick"; delete o.max; delete o.unit; } }
    if (it.explain && it.explain.trim()) o.explain = it.explain.trim();
    if (it.image && it.image.id) o.image = it.image.id;
    return o;
  }

  var current = null;
  function open(E) {
    E.tpl = TPL[E.meta.template] ? E.meta.template : "pick";
    E.openIx = E.items.length ? -1 : null;
    E.newImgs = [];
    E.savedImgs = {};
    E.items.forEach(function (it) { if (it.image && it.image.id) E.savedImgs[it.image.id] = 1; });
    current = E;
    document.body.dataset.t = E.tpl;
    S.setTitle(t("ed.edit") + ": " + E.meta.title);
    E.saved = snapshot(E);
    E.didSave = !E.fresh;
    draw(E);
    window.addEventListener("beforeunload", function (e) {
      if (current === E && (dirty(E) || E.unkept)) { e.preventDefault(); e.returnValue = ""; }
    });
    return E;
  }
  function dirty(E) { return snapshot(E) !== E.saved; }

  function draw(E) {
    var m = S.page("ed");
    S.mount([S.bar({ studio: true }), m]);
    E.root = m;
    var meta = E.meta;

    /* the top: the name, by, its state, Play it, Share */
    var top = el("section", "ed-sec");
    var row = el("div", "ed-top");
    var g = el("div", "st-grow");
    E.titleEl = el("p", "ed-gtitle", meta.title);
    g.appendChild(E.titleEl);
    g.appendChild(el("p", "st-by", t("play.by", { maker: meta.maker_name || meta.maker })));
    row.appendChild(g);
    E.statusEl = el("span");
    row.appendChild(E.statusEl);
    top.appendChild(row);
    status(E);
    var acts = el("div", "ed-acts");
    acts.appendChild(attr(el("a", "chip", t("ed.play_it")), { href: S.gameURL(meta), target: "_blank", rel: "noopener" }));
    acts.appendChild(btn("chip", t("ed.share"), function () { S.linkSheet(meta); }));
    if (num(meta.plays) && meta.plays > 0) acts.appendChild(el("span", "chip", t("ed.plays", { n: S.fmt(meta.plays) })));
    if (meta.keep_answers) acts.appendChild(btn("chip", t("ed.answers"), function () { answersFile(E, this); }));
    top.appendChild(acts);
    if (meta.hidden) {
      var hn = el("p", "st-err st-gap");
      hn.appendChild(el("b", null, t("ed.st_hidden") + ". "));
      hn.appendChild(document.createTextNode(t("ed.hidden_note")));
      top.appendChild(hn);
    }
    m.appendChild(top);

    /* the questions */
    var qs = el("section", "ed-sec");
    var qh = el("div", "st-row");
    E.countEl = el("p", "st-h2 st-grow");
    qh.appendChild(E.countEl);
    qs.appendChild(qh);
    E.list = el("ol", "ed-list");
    qs.appendChild(E.list);
    E.items.forEach(function (it, i) { E.list.appendChild(itemRow(E, it, i)); });
    var add = btn("btn ghost ed-add", "+ " + t("ed.add"), function () {
      if (E.items.length >= LIMIT_ITEMS) { E.qErr.textContent = t("err.items_cap"); return; }
      var it = lk(TPL[E.tpl].blank()); it.explain = ""; it.image = null;
      E.items.push(it);
      var li = itemRow(E, it, E.items.length - 1);
      E.list.appendChild(li);
      S.enter(li);
      openItem(E, E.items.length - 1);
      counts(E);
      changed(E);
    });
    qs.appendChild(add);
    E.qErr = attr(el("p", "ed-err"), { role: "alert" });
    qs.appendChild(E.qErr);
    m.appendChild(qs);
    counts(E);

    /* the settings */
    var st = el("section", "ed-sec");
    st.appendChild(el("p", "st-h2", t("ed.settings")));
    st.appendChild(label(t("ed.title"), "e-title"));
    var ti = attr(el("input", "st-in"), { id: "e-title", type: "text", maxlength: String(MAX.title), dir: "auto" });
    ti.value = meta.title;
    ti.addEventListener("input", function () { meta.title = clean(ti.value, MAX.title); E.titleEl.textContent = meta.title; changed(E); });
    st.appendChild(ti);
    st.appendChild(errSlot("title"));
    var al = label(t("ed.about"), "e-about");
    st.appendChild(al);
    var ab = attr(el("textarea", "st-in"), { id: "e-about", maxlength: String(MAX.about), rows: "5", dir: "auto" });
    ab.value = meta.about || "";
    ab.addEventListener("input", function () { meta.about = clean(ab.value, MAX.about); changed(E); });
    al.appendChild(counter(ab, MAX.about));
    st.appendChild(ab);
    st.appendChild(el("p", "ed-hint", t("ed.about_hint")));
    seg(st, "ed.mode", [["daily", "ed.daily"], ["open", "ed.open"]], meta.mode, function (v) { meta.mode = v; startRow.hidden = v === "open"; counts(E); refreshDays(E); changed(E); });
    var startRow = el("div");
    startRow.appendChild(label(t("ed.start"), "e-start"));
    var si = attr(el("input", "st-in"), { id: "e-start", type: "date", value: meta.start_day || S.today() });
    si.addEventListener("change", function () { if (S.dayIndex(si.value) != null) { meta.start_day = si.value; refreshDays(E); changed(E); } });
    startRow.appendChild(si);
    startRow.hidden = meta.mode === "open";
    st.appendChild(startRow);
    toggle(st, "ed.keep", t("ed.keep_d", { maker: meta.maker_name || meta.maker }), meta.keep_answers, function (v) { meta.keep_answers = v; changed(E); });
    toggle(st, "ed.list", t("ed.list_d"), meta.want_listed, function (v) { meta.want_listed = v; status(E); changed(E); });
    m.appendChild(st);

    m.appendChild(btn("ed-del st-danger-ghost", t("ed.del_game"), function () { delGame(E); }));

    /* the dock: Save, always at hand */
    var dock = el("div", "ed-dock");
    E.stateEl = attr(el("span", "ed-state"), { role: "status" });
    dock.appendChild(E.stateEl);
    E.saveBtn = btn("btn solid", t("ed.save"), function () { save(E); });
    dock.appendChild(E.saveBtn);
    S.mount([S.bar({ studio: true }), m, dock]);
    document.body.classList.add("has-dock");
    E.msg = attr(el("p", "st-err"), { role: "alert" }); E.msg.hidden = true;
    qs.insertBefore(E.msg, qs.firstChild.nextSibling);
    changed(E, true);
  }
  function status(E) {
    var meta = E.meta, s = E.statusEl;
    s.className = ""; s.textContent = "";
    if (meta.hidden) { s.className = "ed-status off"; s.textContent = t("ed.st_hidden"); return; }
    if (!meta.want_listed) return;
    if (meta.listed) { s.className = "ed-status on"; s.textContent = t("ed.st_listed"); }
    else { s.className = "ed-status"; s.textContent = t("ed.st_notyet"); }
  }
  function counts(E) { E.countEl.textContent = t("ed.questions") + " · " + S.fmt(E.items.length); }
  function changed(E, quiet) {
    var d = dirty(E);
    E.stateEl.textContent = d ? t("ed.unsaved") : E.didSave ? t("ed.saved") : "";
    E.saveBtn.textContent = t("ed.save");
    E.saveBtn.classList.toggle("is-clean", !d);                // F: nothing to save: the button steps back
    if (d) { var dot = el("i", "ed-dot"); dot.setAttribute("aria-hidden", "true"); E.saveBtn.appendChild(dot); }
    if (!quiet) E.msg.hidden = true;
  }
  function dayText(E, i) {
    if (E.meta.mode !== "daily" || !E.meta.start_day) return "";
    return S.dayLong(S.dayFrom(S.dayIndex(E.meta.start_day) + i), true);
  }
  function refreshDays(E) {
    Array.prototype.forEach.call(E.list.children, function (li, i) { var it = E.items[i]; summary(E, li, it, i); });
  }

  /* one question in the list: its head (grip, number, words, picture) and, when open, its fields */
  function itemRow(E, it, i) {
    var li = el("li", "ed-item");
    li.__it = it;
    var h = el("div", "ed-ihead");
    var grip = attr(el("span", "st-grip"), { "aria-hidden": "true", title: t("ed.drag") });
    h.appendChild(grip);
    h.appendChild(el("span", "ed-n"));
    var sum = attr(btn("ed-isum", null, function () { openItem(E, E.items.indexOf(it)); }), { "aria-expanded": "false" });
    sum.appendChild(el("b")); sum.appendChild(el("small"));
    h.appendChild(sum);
    var th = attr(el("img", "ed-thumb"), { alt: "" }); th.hidden = true;
    h.appendChild(th);
    li.appendChild(h);
    var body = el("div", "ed-ibody"); body.hidden = true;
    li.appendChild(body);
    summary(E, li, it, i);
    dragRow(E, li, grip);
    return li;
  }
  function summary(E, li, it, i) {
    li.querySelector(".ed-n").textContent = String(i + 1);
    var main = String(it.q || it.text || "").trim() || "…";
    li.querySelector(".ed-isum b").textContent = main;
    var bits = [];
    var d = dayText(E, i); if (d) bits.push(d);
    var s = TPL[E.tpl].summary(it, S.fmt); if (s) bits.push(s);
    li.querySelector(".ed-isum small").textContent = bits.join(" · ");
    var th = li.querySelector(".ed-thumb");
    if (it.image && it.image.url) { th.src = it.image.url; th.hidden = false; } else { th.hidden = true; th.removeAttribute("src"); }
  }
  function openItem(E, i) {
    Array.prototype.forEach.call(E.list.children, function (li, j) {
      var body = li.querySelector(".ed-ibody"), sum = li.querySelector(".ed-isum");
      var on = j === i && body.hidden;
      if (!on) { body.hidden = true; body.textContent = ""; sum.setAttribute("aria-expanded", "false"); return; }
      body.hidden = false; sum.setAttribute("aria-expanded", "true");
      fill(E, li, li.__it);
      S.enter(body);
      var first = body.querySelector("input, textarea");
      if (first && !first.value) first.focus({ preventScroll: true });
      window.setTimeout(function () { li.scrollIntoView({ block: "nearest", behavior: S.reduced() ? "auto" : "smooth" }); }, 50);
    });
  }
  /* the fields of one question: its template's, then the picture and the explanation (every template has both) */
  function fill(E, li, it) {
    var body = li.querySelector(".ed-ibody");
    body.textContent = "";
    var tp = TPL[E.tpl];
    var ed = helpers(E, li, it);
    tp.edit(body, it, ed);
    imageField(E, li, it, body, !!tp.needsImage);
    var lab = label(t("ed.explain"), "x-" + it._k);
    var x = attr(el("textarea", "st-in"), { id: "x-" + it._k, maxlength: String(MAX.explain), rows: "3", dir: "auto" });
    x.value = it.explain || "";
    x.addEventListener("input", function () { it.explain = clean(x.value, MAX.explain); changed(E); });
    lab.appendChild(counter(x, MAX.explain));
    body.appendChild(lab); body.appendChild(x);
    body.appendChild(el("p", "ed-hint", t("ed.explain_hint")));
    body.appendChild(errSlot("explain"));
    var foot = el("div", "ed-ifoot");
    var mv = el("div", "st-row");
    mv.appendChild(attr(btn("chip round", "↑", function () { moveItem(E, li, -1); }), { "aria-label": t("play.up") }));
    mv.appendChild(attr(btn("chip round", "↓", function () { moveItem(E, li, 1); }), { "aria-label": t("play.down") }));
    foot.appendChild(mv);
    foot.appendChild(btn("chip st-danger-chip", t("ed.del_item"), function () {
      var i = E.items.indexOf(it);
      if (i < 0) return;
      dropImage(E, it.image);
      E.items.splice(i, 1);
      li.remove();
      refreshDays(E); counts(E); changed(E);
    }));
    body.appendChild(foot);
    showErrs(E, li, it);
  }
  function helpers(E, li, it) {
    var body = li.querySelector(".ed-ibody");
    function touch() { summary(E, li, it, E.items.indexOf(it)); changed(E); }
    return {
      el: el, t: t,
      redraw: function () { fill(E, li, it); touch(); },
      field: function (box, item, o) {
        var id = "f-" + lk(item)._k + "-" + o.key;
        var wrap = el("div");
        var lab = label(t(o.label), id);
        var inp = o.area ? attr(el("textarea", "st-in"), { rows: String(o.rows || 2) }) : el("input", "st-in");
        attr(inp, { id: id, dir: o.number ? "ltr" : "auto", autocomplete: "off" });
        if (o.number) attr(inp, { type: "text", inputmode: o.neg ? "text" : "decimal" });
        else { inp.setAttribute("maxlength", String(o.max || 200)); if (!o.area) inp.type = "text"; }
        if (o.ph) inp.placeholder = t(o.ph);
        var v = item[o.key];
        inp.value = v == null ? "" : String(v);
        inp.addEventListener("input", function () {
          if (o.number) item[o.key] = toNum(inp.value);
          else item[o.key] = clean(inp.value, o.max || 200);
          touch();
        });
        if (o.area && o.max) lab.appendChild(counter(inp, o.max));
        if (o.short) inp.style.maxWidth = "12rem";
        wrap.appendChild(lab); wrap.appendChild(inp); wrap.appendChild(errSlot(o.key));
        box.appendChild(wrap);
        return inp;
      },
      seg: function (box, labelKey, options, value, onChange) { return seg(box, labelKey, options, value, onChange); },
      choices: function (box, item) { listField(box, item, "choices", "answer", 2, 4, "ed.choices", "ed.add_choice", touch, E); },
      things: function (box, item) { listField(box, item, "things", null, 3, 5, "ed.things", "ed.add_thing", touch, E); },
      body: body
    };
  }
  /* choices (with the right one) or things (in the right order): 2–4 or 3–5 lines */
  function listField(box, it, key, rightKey, min, max, labelKey, addKey, touch, E) {
    if (!Array.isArray(it[key])) it[key] = [];
    while (it[key].length < min) it[key].push("");
    var id = "l-" + lk(it)._k + "-" + key;
    box.appendChild(attr(el("p", "st-lab", t(labelKey)), { id: id }));
    if (rightKey) box.appendChild(el("p", "ed-hint", t("ed.right_hint")));
    var list = attr(el("div", "ed-opts"), { role: rightKey ? "radiogroup" : "group", "aria-labelledby": id });
    box.appendChild(list);
    var addB = btn("chip st-gap", "+ " + t(addKey), function () { it[key].push(""); draw(); touch(); var ins = list.querySelectorAll("input[type=text]"); if (ins.length) ins[ins.length - 1].focus(); });
    box.appendChild(addB);
    box.appendChild(errSlot(key));
    function draw() {
      list.textContent = "";
      it[key].forEach(function (v, i) {
        var row = el("div", "ed-opt");
        if (rightKey) {
          var r = attr(el("input"), { type: "radio", name: "r-" + it._k, "aria-label": t("ed.right_one") + " " + (i + 1) });
          r.checked = it[rightKey] === i;
          r.addEventListener("change", function () { if (r.checked) { it[rightKey] = i; touch(); } });
          row.appendChild(r);
        } else {
          row.appendChild(el("span", "ed-n", String(i + 1)));
        }
        var inp = attr(el("input", "st-in"), { type: "text", maxlength: "80", dir: "auto", "aria-label": t(labelKey) + " " + (i + 1) });
        inp.value = v || "";
        inp.addEventListener("input", function () { it[key][i] = clean(inp.value, 80); touch(); });
        row.appendChild(inp);
        if (it[key].length > min) {
          row.appendChild(attr(btn("ed-x", "×", function () {
            it[key].splice(i, 1);
            if (rightKey && num(it[rightKey])) { if (it[rightKey] === i) it[rightKey] = null; else if (it[rightKey] > i) it[rightKey]--; }
            draw(); touch();
          }), { "aria-label": t("ed.del_item") + " " + (i + 1) }));
        }
        list.appendChild(row);
      });
      addB.hidden = it[key].length >= max;
    }
    draw();
  }

  /* ---------------- pictures: made smaller here, then sent; the Worker checks each one before it keeps it ---------------- */
  function imageField(E, li, it, body, required) {
    var wrap = el("div");
    var id = "img-" + lk(it)._k;
    wrap.appendChild(attr(el("p", "st-lab", t(required ? "ed.picture" : "ed.picture_opt")), { id: id + "-l" }));
    var row = el("div", "ed-img");
    var file = attr(el("input", "ed-file"), { type: "file", accept: "image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,image/avif", id: id, tabindex: "-1", "aria-hidden": "true" });
    var state = attr(el("span", "st-small"), { role: "status" });
    function drawRow() {
      row.textContent = "";
      if (it.image && it.image.url) {
        var pic = attr(el("img"), { src: it.image.preview || it.image.url, alt: "" });
        pic.addEventListener("error", function () { var box = el("span", "ed-img-wait"); box.appendChild(svg("clock")); pic.replaceWith(box); });
        row.appendChild(pic);
        row.appendChild(btn("chip", t("ed.img_change"), function () { file.click(); }));
        row.appendChild(btn("chip", t("ed.img_remove"), function () { dropImage(E, it.image); it.image = null; drawRow(); summary(E, li, it, E.items.indexOf(it)); changed(E); }));
      } else {
        row.appendChild(btn("chip", "+ " + t("ed.img_add"), function () { file.click(); }));
      }
      if (it.image && it.image.held) row.appendChild(el("span", "st-small ed-img-note", t("ed.img_held")));
      row.appendChild(state);
      row.appendChild(file);
    }
    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      file.value = "";
      if (!f) return;
      var err = wrap.querySelector('[data-err="image"]');
      err.textContent = "";
      if (!/^image\//.test(f.type || "image/")) { err.textContent = t("err.img_type"); return; }
      var have = {}; E.items.forEach(function (x) { if (x !== it && x.image && x.image.id) have[x.image.id] = 1; });
      if (Object.keys(have).length >= LIMIT_IMAGES) { err.textContent = t("err.images_cap"); return; }
      state.textContent = t("ed.img_busy");
      var sent = null;
      shrink(f).then(function (blob) {
        if (!blob) throw { b: { e: "bad_type" } };
        if (blob.size > IMG_BYTES) throw { b: { e: "too_big" } };
        sent = blob;
        return API.imgPut(E.key, E.meta.slug, blob, blob.type === "image/webp" ? "picture.webp" : "picture.jpg");
      }).then(function (r) {
        if (!r.ok || !r.b.url) throw r;
        dropImage(E, it.image);
        it.image = { id: String(r.b.id || ""), url: String(r.b.url), held: !!r.b.held };
        if (it.image.held && sent) { try { it.image.preview = URL.createObjectURL(sent); } catch (e) { /* the quiet box instead */ } }
        E.newImgs.push(it.image.id);
        state.textContent = "";
        drawRow(); summary(E, li, it, E.items.indexOf(it)); changed(E);
      }).then(null, function (r) {
        state.textContent = "";
        err.textContent = t(API.errKey(r));
      });
    });
    drawRow();
    wrap.appendChild(row);
    wrap.appendChild(errSlot("image"));
    body.appendChild(wrap);
  }
  /* a picture taken off a question: one sent in this visit and never saved goes at once; a saved one after the next save */
  function dropImage(E, img) {
    if (!img || !img.id) return;
    var i = E.newImgs.indexOf(img.id);
    if (i >= 0) { E.newImgs.splice(i, 1); API.imgDel(E.key, img.id); }
  }
  function shrink(file) {
    return decode(file).then(function (src) {
      if (!src) return null;
      var w = src.width, h = src.height, scale = Math.min(1, IMG_SIDE / Math.max(w, h));
      var webp = null;
      function enc(s, q) {
        var cv = document.createElement("canvas");
        cv.width = Math.max(1, Math.round(w * s)); cv.height = Math.max(1, Math.round(h * s));
        var c = cv.getContext("2d");
        c.fillStyle = "#fff"; c.fillRect(0, 0, cv.width, cv.height);
        c.drawImage(src, 0, 0, cv.width, cv.height);
        return new Promise(function (resolve) {
          var type = webp === false ? "image/jpeg" : "image/webp";
          cv.toBlob(function (b) {
            if (b && webp === null) webp = b.type === "image/webp";
            if (b && b.type !== "image/webp" && type === "image/webp") { cv.toBlob(function (j) { resolve(j); }, "image/jpeg", q); return; }
            resolve(b);
          }, type, q);
        });
      }
      var q = 0.86, s = scale;
      function round(tries) {
        return enc(s, q).then(function (b) {
          if (!b) return null;
          if (b.size <= IMG_BYTES || tries > 9) return b;
          if (q > 0.5) q -= 0.12; else s *= 0.8;
          return round(tries + 1);
        });
      }
      return round(0);
    });
  }
  function decode(file) {
    if (typeof createImageBitmap === "function") {
      return createImageBitmap(file, { imageOrientation: "from-image" }).then(null, function () { return viaImg(file); });
    }
    return viaImg(file);
  }
  function viaImg(file) {
    return new Promise(function (resolve) {
      var u = URL.createObjectURL(file), i = new Image();
      i.onload = function () { resolve(i); URL.revokeObjectURL(u); };
      i.onerror = function () { resolve(null); URL.revokeObjectURL(u); };
      i.src = u;
    });
  }

  /* ---------------- order: drag a row by its grip, or Move up / Move down ---------------- */
  function moveItem(E, li, dir) {
    var sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
    if (!sib) return;
    glide(E.list, function () { if (dir < 0) E.list.insertBefore(sib, li.nextSibling); else E.list.insertBefore(sib, li); });   /* the row itself never leaves the list: it keeps its focus */
    reorder(E);
    var b = li.querySelectorAll(".ed-ifoot .chip")[dir < 0 ? 0 : 1];
    if (b) b.focus();
  }
  function reorder(E) {
    E.items = Array.prototype.map.call(E.list.children, function (li) { return li.__it; });
    refreshDays(E); changed(E);
  }
  function glide(list, change) {
    var before = new Map();
    Array.prototype.forEach.call(list.children, function (li) { before.set(li, li.getBoundingClientRect().top); });
    change();
    if (S.reduced()) return;
    Array.prototype.forEach.call(list.children, function (li) {
      if (li.classList.contains("lift")) return;
      var d = before.get(li) - li.getBoundingClientRect().top;
      if (!d) return;
      li.style.transition = "none"; li.style.transform = "translateY(" + d + "px)";
      void li.offsetWidth;
      li.style.transition = ""; li.style.transform = "";
    });
  }
  function dragRow(E, li, grip) {
    var on = false, y0 = 0, id = null;
    grip.addEventListener("pointerdown", function (e) {
      on = true; id = e.pointerId; y0 = e.clientY;
      li.classList.add("lift");
      try { grip.setPointerCapture(id); } catch (x) { /* fine */ }
      e.preventDefault();
    });
    grip.addEventListener("pointermove", function (e) {
      if (!on || e.pointerId !== id) return;
      var dy = e.clientY - y0, next = li.nextElementSibling, prev = li.previousElementSibling, gap = 8;
      if (next && dy > next.offsetHeight / 2 + gap / 2) { var h = next.offsetHeight + gap; glide(E.list, function () { E.list.insertBefore(next, li); }); y0 += h; dy -= h; }
      else if (prev && dy < -(prev.offsetHeight / 2 + gap / 2)) { var h2 = prev.offsetHeight + gap; glide(E.list, function () { E.list.insertBefore(prev, li.nextSibling); }); y0 -= h2; dy += h2; }   /* the neighbour moves, never the row: it keeps the pointer */
      li.style.transform = "translateY(" + dy + "px)";
      var r = li.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 90) window.scrollBy(0, 8); else if (r.top < 60) window.scrollBy(0, -8);
    });
    function end() { if (!on) return; on = false; li.classList.remove("lift"); li.style.transform = ""; reorder(E); }
    grip.addEventListener("pointerup", end);
    grip.addEventListener("pointercancel", end);
  }

  /* ---------------- checks and save ---------------- */
  function itemErrs(E, it) {
    var e = TPL[E.tpl].check(it, t) || {};
    var x = String(it.explain || "");
    if (x.length > MAX.explain) e.explain = t("err.long");
    else if (S.links(x) > 1) e.explain = t("err.links");
    return e;
  }
  function showErrs(E, li, it) {
    var e = li.__errs || {};
    Array.prototype.forEach.call(li.querySelectorAll("[data-err]"), function (p) { p.textContent = e[p.getAttribute("data-err")] || ""; });
  }
  function save(E) {
    if (E.busy) return;
    var bad = -1;
    Array.prototype.forEach.call(E.list.children, function (li, i) {
      var e = itemErrs(E, li.__it);
      li.__errs = e;
      var has = Object.keys(e).length > 0;
      li.classList.toggle("bad", has);
      if (has && bad < 0) bad = i;
      if (!li.querySelector(".ed-ibody").hidden) showErrs(E, li, li.__it);
    });
    var tErr = E.root.querySelector('[data-err="title"]');
    var title = (E.meta.title || "").trim();
    if (tErr) tErr.textContent = title ? "" : t("err.title");
    if (!title) { tErr.scrollIntoView({ block: "center" }); return; }
    if (S.links(E.meta.about) > 20) { E.msg.textContent = t("err.links"); E.msg.hidden = false; return; }
    if (bad >= 0) {
      E.msg.textContent = t("err.fix"); E.msg.hidden = false;
      var li = E.list.children[bad];
      if (li.querySelector(".ed-ibody").hidden) openItem(E, bad);
      showErrs(E, li, li.__it);
      li.scrollIntoView({ block: "center", behavior: S.reduced() ? "auto" : "smooth" });
      return;
    }
    if (!E.items.length) { E.qErr.textContent = t("err.none"); }
    else E.qErr.textContent = "";
    E.busy = true;
    E.saveBtn.disabled = true;
    E.stateEl.textContent = t("ed.saving");
    var meta = E.meta;
    var body = {
      edit_key: E.key, title: title, about: (meta.about || "").trim(), mode: meta.mode, start_day: meta.start_day || S.today(),
      keep_answers: !!meta.keep_answers, want_listed: !!meta.want_listed,
      items: E.items.map(wireItem)
    };
    if (meta.saved !== "" && meta.saved != null && isFinite(Number(meta.saved))) body.base = Number(meta.saved);
    var snap = snapshot(E);
    API.gameSave(body).then(function (r) {
      E.busy = false; E.saveBtn.disabled = false;
      if (!r.ok) {
        E.stateEl.textContent = t("ed.unsaved"); E.msg.textContent = t(API.errKey(r)); E.msg.hidden = false;
        /* the Worker names the question it refused: { e: "item", i, field } */
        var li = typeof r.b.i === "number" ? E.list.children[r.b.i] : null;
        if (li) {
          li.__errs = {}; li.__errs[String(r.b.field || "q")] = t("err.long");
          li.classList.add("bad");
          if (li.querySelector(".ed-ibody").hidden) openItem(E, r.b.i); else showErrs(E, li, li.__it);
          li.scrollIntoView({ block: "center" });
        }
        return;
      }
      /* pictures the saved game no longer uses: away now (orphans also go each night) */
      var now = {}; E.items.forEach(function (it) { if (it.image && it.image.id) now[it.image.id] = 1; });
      Object.keys(E.savedImgs).forEach(function (id) { if (!now[id]) API.imgDel(E.key, id); });
      E.savedImgs = now; E.newImgs = [];
      var g = obj(r.b.game);
      if (g && g.saved != null) meta.saved = String(g.saved);
      if (g || r.b.status) { var nm = API.meta(g || r.b, meta.maker); meta.listed = nm.listed; meta.hidden = nm.hidden; if (nm.code) meta.code = nm.code; }
      else { if (r.b.listed != null) meta.listed = !!r.b.listed; if (r.b.hidden != null) meta.hidden = !!r.b.hidden; }
      status(E);
      E.saved = snap;
      E.didSave = true;
      changed(E, true);
      adoptIds(E, r.b, snap);
      /* no toast: the dock already says "Saved" (F) */
      var entry = { maker: meta.maker, slug: meta.slug, title: title, edit: E.key };
      if (hereHas(entry)) keepGameHere(entry);
      keepGameMe(entry);
    });
  }

  /* the Worker gives each new question its id; it must be sent back with the next save (chat A), so it is fetched now */
  function adoptIds(E, b, snap) {
    var missing = E.items.some(function (it) { return it.id == null || it.id === ""; });
    if (!missing) return;
    var list = Array.isArray(b.items) ? Promise.resolve(b.items) : API.gameMine(E.key).then(function (r) { return r.ok && Array.isArray(r.b.items) ? r.b.items : null; });
    list.then(function (items) {
      if (!items || items.length !== E.items.length || current !== E) return;
      var clean = snapshot(E) === snap;
      items.forEach(function (raw, i) { var x = API.item(raw, i); if (x.id != null && (E.items[i].id == null || E.items[i].id === "")) E.items[i].id = x.id; });
      if (clean) { E.saved = snapshot(E); changed(E, true); }
    });
  }

  /* the answers kept for this game ("Keep answers" on), as a file (F, 8 Nov 2026) */
  function answersFile(E, button) {
    if (button) button.disabled = true;
    var rows = [], i = 0;
    function more(after) {
      return API.gameAnswers(E.key, after).then(function (r) {
        if (!r.ok) throw r;
        var got = Array.isArray(r.b.rows) ? r.b.rows : [];
        rows = rows.concat(got);
        if (r.b.next != null && got.length && ++i < 25) return more(r.b.next);
      });
    }
    more(0).then(function () {
      if (button) button.disabled = false;
      if (!rows.length) { S.toast(t("ed.no_answers")); return; }
      var byId = {}; E.items.forEach(function (it) { if (it.id != null) byId[String(it.id)] = it; });
      function words(it, a) {
        if (!it) return a;
        if (Array.isArray(a)) return a.map(function (k) { return it.things && it.things[k] != null ? it.things[k] : k; }).join(" > ");
        if (Array.isArray(it.choices) && typeof a === "number" && it.choices[a] != null) return it.choices[a];
        return a;
      }
      function cell(v) {
        var x = String(v == null ? "" : v);
        if (/^[=+\-@\t\r]/.test(x) && !/^-?\d+(\.\d+)?$/.test(x)) x = "'" + x;
        return /[",\n;]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x;
      }
      var head = t("ed.csv_cols").split(",");
      var lines = [head.map(cell).join(",")];
      rows.forEach(function (r) {
        var when = isFinite(Number(r.time)) ? new Date(Number(r.time)).toISOString().replace("T", " ").slice(0, 16) : "";
        lines.push([r.n != null ? r.n : "", r.name || "", words(byId[String(r.item)], r.answer), when].map(cell).join(","));
      });
      var blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
      var a = attr(el("a"), { href: URL.createObjectURL(blob), download: (E.meta.slug || "answers") + "-answers.csv" });
      document.body.appendChild(a); a.click(); a.remove();
    }).then(null, function (r) { if (button) button.disabled = false; S.toast(t(API.errKey(r))); });
  }

  function delGame(E) {
    S.sheet(t("ed.del_game"), function (s, close) {
      s.appendChild(el("p", null, t("ed.del_sure")));
      var acts = el("div", "actions");
      var yes = btn("btn solid", t("ed.del_yes"), function () {
        yes.disabled = true;
        API.gameDelete(E.key).then(function (r) {
          var gone = r.status === 404 || (r.status === 403 && r.b && r.b.e === "key");
          if (!r.ok && !gone) { yes.disabled = false; S.toast(t(API.errKey(r))); return; }
          forget({ maker: E.meta.maker, slug: E.meta.slug });
          E.saved = snapshot(E); E.unkept = false;
          close();
          S.toast(t("ed.deleted"));
          current = null;
          window.history.replaceState(null, "", "/new/");
          newPage();
        });
      });
      yes.style.background = "#B3261E"; yes.style.color = "#fff";
      acts.appendChild(yes);
      acts.appendChild(btn("btn ghost", t("site.cancel"), close));
      s.appendChild(acts);
    });
  }

  /* ---------------- keep your edit link (after the game is made) ---------------- */
  var ICON = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8 20 3M16.5 6.5l2.5 2.5M14 9l2 2"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
    here: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    me: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="6.2" r="4.1" fill="#2D4FC4"/><circle cx="5.3" cy="17.8" r="4.1" fill="#D5492F"/><circle cx="18.7" cy="17.8" r="4.1" fill="#0D7D73"/></svg>'
  };
  function svg(name) { var s = el("span"); s.innerHTML = ICON[name]; return s.firstChild; }
  function keepSheet(E) {
    var link = S.SITE + "/" + E.meta.maker + "/" + E.meta.slug + "/edit/#" + E.key;
    var entry = { maker: E.meta.maker, slug: E.meta.slug, title: E.meta.title, edit: E.key };
    E.unkept = true;
    var kept = false;
    S.sheet(null, function (s, close) {
      s.classList.add("kp");
      var k = el("div", "kp-key"); k.appendChild(svg("key")); s.appendChild(k);
      s.appendChild(attr(el("h2", null, t("kp.h")), { tabindex: "-1", id: "kp-h" }));
      s.appendChild(el("p", "quiet", t("kp.lead")));
      var tiles = el("div", "kp-tiles");
      function done(tile) { tile.classList.add("done"); kept = true; E.unkept = false; msg.textContent = ""; }
      var c = btn("kp-tile", null, function () { copyIt(); done(c); });
      c.appendChild(svg("copy")); c.appendChild(el("span", null, t("kp.copy")));
      tiles.appendChild(c);
      var mail = attr(el("a", "kp-tile"), { href: "mailto:?subject=" + encodeURIComponent(t("kp.mail_subject", { title: E.meta.title })) + "&body=" + encodeURIComponent(t("kp.mail_body") + "\n" + link) });
      mail.addEventListener("click", function () { done(mail); });
      mail.appendChild(svg("mail")); mail.appendChild(el("span", null, t("kp.mail")));
      tiles.appendChild(mail);
      var here = attr(btn("kp-tile", null, function () {
        if (here.classList.contains("done")) { forgetHere(); here.classList.remove("done"); here.setAttribute("aria-pressed", "false"); return; }
        keepGameHere(entry); here.setAttribute("aria-pressed", "true"); done(here);
      }), { "aria-pressed": "false" });
      here.appendChild(svg("here")); here.appendChild(el("span", null, t("kp.here"))); here.appendChild(el("small", null, t("kp.here_sub")));
      tiles.appendChild(here);
      if (hello && hello.code) {
        var me = el("div", "kp-tile");
        me.appendChild(svg("me")); me.appendChild(el("span", null, t("kp.me"))); me.appendChild(el("small", null, t("kp.me_sub")));
        tiles.appendChild(me);
        keepGameMe(entry).then(function (ok) { if (ok) done(me); else me.hidden = true; });
      }
      s.appendChild(tiles);
      var row = el("div", "st-linkrow");
      var inp = attr(el("input"), { readonly: "", value: link, "aria-label": t("kp.link_l") });
      row.appendChild(inp);
      s.appendChild(row);
      var msg = attr(el("p", "ed-err"), { role: "alert" });
      s.appendChild(msg);
      s.appendChild(btn("btn solid kp-done", t("kp.done"), function () {
        if (!kept) { msg.textContent = t("kp.first"); return; }
        close();
      }));
      function copyIt() { inp.select(); S.copyText(link).then(function () { S.toast(t("site.copied")); }); }
      function forgetHere() { var m = S.mine(); m.games = m.games.filter(function (x) { return !(x.maker === entry.maker && x.slug === entry.slug); }); S.mineSet(m); }
    }, { stay: true });
  }

  window.StudioEditor = function (which) {
    if (which) editPage(which); else newPage();
  };
})();
