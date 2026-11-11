/* Logicers Studio: the one place that talks to the Studio Worker (server/studio, chat A), on its own origin
   (by.logicers.com). POST with JSON unless GET, no key in a URL (claude/studio-plan.md section 3, and chat A's report in
   section 5, which this file follows where the two differ). Every answer is { ok: true, ... } or { ok: false, e: <key> }.

   What the pages use:
     GET  /list?day=D                -> { games: [card] }   the directory (A added it; card = meta)
     GET  /m/<maker>?day=D           -> { maker: {slug, name}, games: [card], kits: [{code, title}] }
     GET  /g/<maker>/<game>?day=D    -> { game: meta, state: "today" | "soon" | "out" | "open", number (the day), item, items (open) }
                                        D is the player's local day, YYYY-MM-DD; the item carries its answer (shown only after the guess)
     GET  /code/<CODE>               -> the game of a code (6 letters); the page /c/<CODE> is a 302 to it
     POST /maker/new  {name, lang, terms_version}                 -> { slug, key }
     POST /game/new   {maker_key, template, title, lang, mode, start_day, keep_answers, want_listed, terms_version} -> { slug, edit_key, code }
     POST /game/save  {edit_key, title, about, mode, start_day, keep_answers, want_listed, items: [item]}
                      a bad item: { e: "item", i, field }
     POST /game/mine  {edit_key} or {maker_key, game}   -> { game: meta, items: [item] }   (every /game/* and /img/* call takes either)
     POST /game/delete {edit_key}
     POST /img/put    multipart {edit_key, game, file}             -> { id, url }   (after the Worker's picture check)
     POST /img/del    {edit_key, id}
     POST /play       {game, item, answer, first, pid?, name?, again?} -> { bucket, counts: { n, b: {bucket: n} }, reveal, kept? }
                      11 Nov 2026: a question reaches the page without its answer; /play gives it back ("reveal": answer, or
                      order for a Rank, explain, values). With "keep answers" on, pid and name keep the answer in the same call.
     POST /play/keep  {game, item, pid, name, answer}               (older pages; the page keeps through /play now)
     POST /report     {game, reason, text, browser}
   game = "<maker>/<game>"; item = the item's id, given by the Worker (n when an item has none yet).
   An item, flat (A's src/items.js): number {q, max, answer} · line {q, min, max, answer} · pick {q, choices, answer: index}
     · rank {q, things in the right order} · picture {image, + the pick or the number fields} · read {text, q, choices, answer};
     any of them: id, image (an id from /img/put; image_url comes back), explain, unit, and small extras (form, min_label, max_label).
   meta: maker, maker_name, slug, title, template, lang, mode, start_day, about, keep_answers, want_listed, listed, hidden,
     status (listed | waiting | private | hidden), plays, items (count), code. The normalisers below accept the other spellings. */
(function () {
  "use strict";
  var WAIT = 15000;

  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function str(v) { return typeof v === "string" ? v : v == null ? "" : String(v); }
  function num(v) { var n = typeof v === "string" && v.trim() !== "" ? Number(v) : v; return typeof n === "number" && isFinite(n) ? n : null; }
  function bool(v) { return v === true || v === 1 || v === "1" || v === "true"; }

  function send(path, init) {
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = window.setTimeout(function () { if (ctl) ctl.abort(); }, WAIT);
    if (ctl) init.signal = ctl.signal;
    init.credentials = "omit";
    init.cache = "no-store";
    return window.fetch(path, init).then(function (res) {
      window.clearTimeout(timer);
      return res.text().then(function (t) {
        var b = null;
        try { b = t ? JSON.parse(t) : {}; } catch (e) { b = {}; }
        b = obj(b) || { list: b };
        return { ok: res.ok && b.ok !== false && !b.e && !b.error, status: res.status, b: b };
      });
    }, function () {
      window.clearTimeout(timer);
      return { ok: false, status: 0, b: { e: "net" } };
    });
  }
  function get(path) { return send(path, { method: "GET" }); }
  function post(path, body) {
    return send(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
  }
  function seg(s) { return encodeURIComponent(String(s)); }

  /* ---- the shapes ---- */
  function meta(raw, maker) {
    var g = obj(raw) || {};
    var m = obj(g.maker) ? g.maker : null;
    var id = str(g.id || "");
    var ids = /^([a-z0-9-]+)\/([a-z0-9-]+)$/.exec(id);
    var status = str(g.status || "");
    var out = {
      maker: str(m ? m.slug : g.maker || g.maker_slug || (ids && ids[1]) || maker || ""),
      maker_name: str(m ? m.name : g.maker_name || g.by || ""),
      slug: str(g.slug || (typeof g.game === "string" ? g.game : "") || (ids && ids[2]) || ""),
      title: str(g.title),
      template: str(g.template || "pick"),
      lang: str(g.lang || "en"),
      mode: g.mode === "open" ? "open" : "daily",
      start_day: /^\d{4}-\d{2}-\d{2}$/.test(str(g.start_day)) ? str(g.start_day) : "",
      about: str(g.about || ""),
      keep_answers: bool(g.keep_answers),
      want_listed: g.want_listed != null ? bool(g.want_listed) : status ? status !== "private" : false,
      listed: status ? status === "listed" : bool(g.listed) && (g.listed_by_khayyam == null || bool(g.listed_by_khayyam)),
      hidden: status === "hidden" || bool(g.hidden),
      plays: num(g.plays != null ? g.plays : g.played) || 0,
      count: num(g.count != null ? g.count : typeof g.items === "number" ? g.items : Array.isArray(g.items) ? g.items.length : g.items_n),
      today: g.today == null ? null : bool(g.today),
      code: /^[A-Z0-9]{4,8}$/.test(str(g.code)) ? str(g.code) : "",
      saved: str(g.saved || ""),
      cover: /^(https:\/\/|\/i\/)/.test(str(g.cover_url || "")) ? str(g.cover_url) : ""
    };
    out.key = out.maker + "/" + out.slug;
    return out;
  }
  /* an item: flat (A's shape). Its picture becomes { id, url, held } from the Worker's own image_url only (F, 8 Nov 2026: no
     "json" stand-in and no picture address of the item's own, so nothing reaches the page that the Worker did not check) */
  function item(raw, i) {
    var r = obj(raw) || {};
    var j = r;
    var it = {};
    Object.keys(j).forEach(function (k) { if (k !== "json") it[k] = j[k]; });
    it.n = num(r.n) != null ? num(r.n) : num(it.n) != null ? num(it.n) : i;
    if (r.id != null && it.id == null) it.id = r.id;
    if (it.id != null) it.id = str(it.id);
    var img = r.image != null ? r.image : it.image;
    var url = str(r.image_url || "");
    if (obj(img)) it.image = { id: str(img.id), url: str(img.url || url) };
    else if (typeof img === "string" && img && !/[:\/]/.test(img)) it.image = { id: img, url: url };
    else it.image = null;
    if (it.image && !it.image.url) it.image = null;
    /* 9 Nov 2026: a picture Logicers removed: the editor says so on its question */
    if (r.image_removed) it.image_gone = true;
    delete it.image_url; delete it.img_url; delete it.img_id; delete it.image_held; delete it.image_removed;
    if (it.right != null && it.answer == null && Array.isArray(it.choices)) it.answer = it.right;   /* an older spelling */
    delete it.right;
    return it;
  }
  /* counts: { n, b: {bucket: n} } (A), or { bucket: n }, or [{ bucket, n }] -> { bucket: n } */
  function counts(raw) {
    var out = {};
    var c = raw && (raw.counts != null ? raw.counts : raw);
    if (obj(c) && obj(c.b)) c = c.b;
    if (Array.isArray(c)) c.forEach(function (x) { if (obj(x) && num(x.n) != null) out[str(x.bucket != null ? x.bucket : x.b)] = num(x.n); });
    else if (obj(c)) Object.keys(c).forEach(function (k) { if (k !== "n" && num(c[k]) != null) out[k] = num(c[k]); });
    return out;
  }

  /* what /play gave back about the answer: { answer } (a Rank: { order }), with explain and values; {} when nothing */
  function reveal(b) {
    var r = obj(b && b.reveal) || {}, out = {};
    if (r.answer !== undefined) out.answer = r.answer;
    if (Array.isArray(r.order) && r.order.every(function (x) { return typeof x === "number"; })) out.order = r.order.slice();
    if (typeof r.explain === "string" && r.explain) out.explain = r.explain;
    if (Array.isArray(r.values)) out.values = r.values.slice();
    return out;
  }

  /* the Worker's error keys, as words of words.js */
  var ERR = {
    net: "site.err_net", brake: "err.busy", busy: "err.busy", slow: "err.busy", rate: "err.busy", too_many: "err.busy",
    gone: "site.gone_h", not_found: "site.gone_h", hidden: "site.gone_h", deleted: "site.gone_h", no_game: "site.gone_h",
    blocked: "ed.blocked", bad_key: "ed.bad_key", key: "ed.bad_key", wrong_key: "ed.bad_key", no_key: "ed.bad_key",
    name: "err.name_len", title: "err.title", terms: "err.terms", item: "err.fix", items: "err.fix",
    games_cap: "err.games_cap", maker_cap: "err.games_cap", day_cap: "err.day_cap", cap: "err.day_cap",
    items_cap: "err.items_cap", images_cap: "err.images_cap", image_cap: "err.images_cap",
    image_refused: "err.img_refused", refused: "err.img_refused", nsfw: "err.img_refused", sexual: "err.img_refused",
    too_big: "err.img_big", size: "err.img_big", bad_type: "err.img_type", type: "err.img_type",
    links: "err.links", long: "err.long",
    /* the Worker's other keys (F, 8 Nov 2026) */
    later: "err.busy", not_ready: "err.busy", games_full: "err.games_cap", items_full: "err.items_cap", image_big: "err.img_big",
    image_size: "err.img_big", image_type: "err.img_type", image_full: "err.images_cap", about: "err.long", extra: "err.fix",
    stale: "err.stale", answers_full: "site.err", lang: "site.err"
  };
  function errKey(r) {
    var b = (r && r.b) || {};
    var k = str(b.e || b.error || b.code || "");
    if (ERR[k]) return ERR[k];
    if (r && r.status === 0) return "site.err_net";
    if (r && r.status === 429) return "err.busy";
    if (r && (r.status === 401 || r.status === 403)) return "ed.bad_key";
    return "site.err";
  }

  function auth(k) { return typeof k === "string" ? { edit_key: k } : obj(k) ? (k.edit_key ? { edit_key: k.edit_key } : { maker_key: k.maker_key, game: k.game }) : {}; }

  window.StudioAPI = {
    meta: meta, item: item, counts: counts, reveal: reveal, errKey: errKey,
    list: function (day) { return get("/list?day=" + seg(day)); },
    maker: function (slug, day) { return get("/m/" + seg(slug) + "?day=" + seg(day)); },
    game: function (maker, game, day) { return get("/g/" + seg(maker) + "/" + seg(game) + "?day=" + seg(day)); },
    code: function (c) { return get("/code/" + seg(c)); },
    makerNew: function (o) { return post("/maker/new", o); },
    makerGet: function (key) { return post("/maker/get", { key: key }); },
    gameNew: function (o) { return post("/game/new", o); },
    gameSave: function (o) { return post("/game/save", o); },
    /* the editor's key: the game's edit key (a string), or { maker_key, game } when only the maker key is kept in this
       browser (9 Nov 2026: a game is never lost on the browser that made it). The Worker takes either on every call. */
    gameMine: function (k) { return post("/game/mine", auth(k)); },
    gameDelete: function (k) { return post("/game/delete", auth(k)); },
    gameAnswers: function (k, after) { return post("/game/answers", Object.assign(auth(k), { after: after || 0 })); },
    imgPut: function (k, game, blob, name) {
      var fd = new FormData(), a = auth(k);
      if (a.edit_key) fd.append("edit_key", a.edit_key); else { fd.append("maker_key", a.maker_key); fd.append("game", a.game); }
      if (a.edit_key) fd.append("game", game);
      fd.append("file", blob, name || "picture");
      return send("/img/put", { method: "POST", body: fd });
    },
    imgDel: function (k, id) { return post("/img/del", Object.assign(auth(k), { id: id })); },
    auth: auth,
    /* keep: { pid, name } when the maker keeps the answers; again: an answer this browser gave before, shown again (nothing counted) */
    play: function (game, item, answer, first, keep, again) {
      var b = { game: game, item: item, answer: answer, first: first !== false };
      if (keep && keep.pid) { b.pid = keep.pid; b.name = keep.name || ""; }
      if (again) b.again = true;
      return post("/play", b);
    },
    keep: function (game, item, pid, name, answer) { return post("/play/keep", { game: game, item: item, pid: pid, name: name, answer: answer }); },
    report: function (game, reason, text, browser) { return post("/report", { game: game, reason: reason, text: text || "", browser: browser }); }
  };
})();
