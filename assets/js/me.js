/* Logicers — My Logicers: the code, the locked box, sync and restore (Chat A, 7 Nov 2026).

   The games are not changed. This file reads the keys they already write (the storage inventory in claude/me-a.md),
   builds the player's record from them (collect), and on another phone writes a record back into those same keys
   (apply), so every game and every host page finds its own data where it always looked.

   Needs assets/js/me-stats.js first (the record's rules). Works on any page; on a game page it rides on
   assets/js/turnsout.js, which loads it only on a phone that keeps a code (the one-line hook in claude/me-a.md).

   window.LogicersMe:
     collect()                 the record from this phone's own storage (merged with the last one the server sent),
                               with the box's contents attached unsealed as record._open; synchronous, no network, no code needed
     apply(record, code, claim) opens the box (when code is given) and writes the record into the games' keys -> Promise<{ ok, open }>;
                               claim = true (restore, adopt) also asks the find-outs' server for the portrait with the code in the box
     draw(lang)                a new code: three words of me/words/<lang>.json and a number 10-99 -> Promise<"river-blue-cat-42">
     keep(code, lang)          POST /new; a taken code is drawn again silently -> Promise<{ ok, code } | { ok: false, exists } | { ok: false, error }>
     sync()                    pull, merge, push; debounced 5 s when called from a game's finish -> Promise<{ ok, record } | null>
     restore(code)             POST /restore, apply, keep the code on this phone -> Promise<{ ok, record } | { ok: false, error }>
     remove(opts)              POST /delete and forget the code; { local: true } also empties every key of the inventory here
     openBox(box, code)        -> Promise<object | null> (null: wrong code or no box)
     sealBox(data, code, salt) -> Promise<{ salt, data }>
     code()                    the code kept on this phone, or null; normalize(s) a typed code as the server knows it
   The code is kept under one key, lg.me.v1: { v: 1, code, lang, at, last, rec } (rec = the last record the server sent).
   Never sent anywhere but the My Logicers server (logicers-me): the code, the record, the sealed box. */
(function () {
  "use strict";
  var M = window.LogicersMeStats;
  if (!M) return;

  var KEY = "lg.me.v1";
  var API = "https://me.logicers.com", API_OLD = "https://logicers-me.rza-khay.workers.dev";
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
  var heard = false, useOld = false;
  function apiBase() {
    if (LOCAL) return typeof window.LOGICERS_ME_API === "string" ? window.LOGICERS_ME_API : "";
    return useOld ? API_OLD : API;
  }
  var ITER = 200000;                       // PBKDF2 rounds for the box key (plan 3a)
  var WAIT = 12000;
  var SELF = (document.currentScript && document.currentScript.src) || "";
  var ROOT = /assets\/js\/me\.js/.test(SELF) ? SELF.replace(/assets\/js\/me\.js.*$/, "") : "/";
  var DEBOUNCE = 5000, STALE = 6 * 36e5;
  var CODE_RE = /^[a-z]{4,7}-[a-z]{4,7}-[a-z]{4,7}-[1-9][0-9]$/;

  /* ---------------- this phone's storage ---------------- */
  function get(k) { try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function put(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function obj(v) { return v && typeof v === "object" && !Array.isArray(v) ? v : null; }
  function num(v) { return typeof v === "number" && isFinite(v); }
  function whole(v) { return num(v) && Math.round(v) === v; }
  function state() { var s = obj(get(KEY)); return s && s.v === 1 ? s : { v: 1 }; }
  function setState(change) { var s = state(); change(s); put(KEY, s); return s; }
  function code() { var c = state().code; return typeof c === "string" && CODE_RE.test(c) ? c : null; }
  function normalize(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var D = M.dayIndex, DATE = M.dateOf;
  var todayI = function () { return D(M.localDate()); };
  function key8(i) { return DATE(i).replace(/-/g, ""); }               // YYYYMMDD, as world.js and the word games write a date
  function dayN(start, i) { return i - D(start) + 1; }               // a game's day number of a calendar day
  function dateN(start, n) { return D(start) + n - 1; }

  /* ---------------- the nine daily games: done and tier exactly as assets/js/turnsout.js GAMES; fake(g) a stand-in result
     of that grade for a day the phone does not have (it passes done() and has the same tier, so streaks, the Today card,
     stamps and spot-on counts read the same; it is marked me: 1) ---------------- */
  var RULES = {
    energy: { done: function (r) { return num(r.g) && r.g >= 0 && r.g <= 60 && num(r.y) && typeof r.t === "string"; },
              tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 2 ? 2 : a <= 4 ? 1 : 0; },
              fake: function (t) { return { g: 10, y: [8, 4, 2, 0][t], t: "" }; } },
    hundred: { done: function (r) { return num(r.g) && num(r.a); },
               tier: function (r) { var a = Math.abs(r.g - r.a); return a === 0 ? 3 : a <= 3 ? 2 : a <= 8 ? 1 : 0; },
               fake: function (t) { return { g: 50 + [20, 5, 2, 0][t], a: 50 }; } },
    call: { done: function (r) { return num(r.c); },
            tier: function (r) { return r.c === r.r ? 3 : 0; },
            fake: function (t) { return { c: 0, r: t === 3 ? 0 : 1 }; } },
    cousin: { done: function (r) { return num(r.c); },
              tier: function (r) { return r.r === 0 ? 3 : r.r === 1 ? 2 : 0; },
              fake: function (t) { return { c: 0, r: t === 3 ? 0 : t === 2 ? 1 : 2 }; } },
    club: { done: function (r) { return Array.isArray(r.c) && r.c.length === 5 && num(r.r) && r.r >= 0 && r.r <= 5; },
            tier: function (r) { return r.r >= 5 ? 3 : r.r === 4 ? 2 : r.r === 3 ? 1 : 0; },
            fake: function (t) { return { c: [0, 0, 0, 0, 0], r: [0, 3, 4, 5][t] }; } },
    apart: { done: function (r) { return num(r.g) && num(r.a) && num(r.y) && r.g >= 0 && r.g <= 1000 && r.y >= 0; },
             tier: function (r) { var a = Math.abs(r.g - r.a); return a <= 5 ? 3 : a <= 40 ? 2 : a <= 120 ? 1 : 0; },
             fake: function (t) { return { g: 500 + [300, 80, 20, 0][t], a: 500, y: [300, 80, 20, 0][t] }; } },
    gets: { done: function (r) { return Array.isArray(r.g) && r.g.length >= 3 && r.g.length <= 4 && num(r.y) && r.y >= 0 && typeof r.t === "string"; },
            tier: function (r) { return r.y <= 15 ? 3 : r.y <= 50 ? 2 : r.y <= 120 ? 1 : 0; },
            fake: function (t) { return { g: [250, 250, 250, 250], y: [200, 80, 30, 0][t], t: "" }; } },
    every: { done: function (r) { return num(r.g) && r.g >= 1 && r.g <= 2000 && num(r.y) && typeof r.t === "string"; },
             tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 13 ? 2 : a <= 20 ? 1 : 0; },
             fake: function (t) { return { g: 60, y: [40, 15, 12, 0][t], t: "" }; } },
    o24: { done: function (r) { return num(r.g) && r.g >= 0 && r.g <= 1440 && num(r.y) && typeof r.t === "string"; },
           tier: function (r) { var a = Math.abs(r.y); return a === 0 ? 3 : a <= 45 ? 2 : a <= 120 ? 1 : 0; },
           fake: function (t) { return { g: 0, y: [300, 90, 30, 0][t], t: "" }; } }
  };
  function safe(fn, r) { try { return !!r && fn(r); } catch (e) { return false; } }
  function tierOf(id, r) { try { var t = RULES[id].tier(r); return whole(t) && t >= 0 && t <= 3 ? t : null; } catch (e) { return null; } }

  /* ---------------- collect: the record from this phone ---------------- */
  function local() {
    var rec = { v: 2, logicer: null, first: null, langs: [], g: {}, mine: [] };
    var open = { ci: [], mine: {}, recent: {}, st: {} };
    var firsts = [], langs = [];
    var T = M.localDate(), ti = D(T);
    function lang(l) { if (M.LANGS.indexOf(l) >= 0 && langs.indexOf(l) < 0) langs.push(l); }
    lang((function () { try { return window.localStorage.getItem("lg.findout.lang"); } catch (e) { return null; } })());

    /* the nine daily games */
    var all = obj(get("turnsout:v1")) || {};
    var games = obj(all.games) || {};
    M.DAILY.forEach(function (G) {
      var res = obj(obj(games[G.page]) && games[G.page].results);
      if (!res) return;
      var days = [], grade = {};
      Object.keys(res).forEach(function (k) {
        var n = Number(k), r = res[k];
        if (!whole(n) || n < 1 || !safe(RULES[G.id].done, r)) return;
        var i = dateN(G.start, n);
        if (i > ti) return;
        days.push(i);
        var t = tierOf(G.id, r);
        grade[i] = t === null ? "x" : String(t);
        if (r.l) lang(r.l);
        if (i >= ti - 1) { (open.recent[G.id] = open.recent[G.id] || {})[n] = r; }
      });
      put1(rec, G.id, days, grade, 0, firsts);
    });
    var world = obj(all.world) || {};
    var L = obj(world.logicer);
    if (L && whole(L.n) && L.n > 0) {
      rec.logicer = L.n;
      if (/^\d{8}$/.test(String(L.d))) firsts.push(D(L.d.slice(0, 4) + "-" + L.d.slice(4, 6) + "-" + L.d.slice(6, 8)));
    }
    var rooms = obj(all.rooms), duels = obj(all.duels);
    if (rooms && typeof rooms.tok === "string" && rooms.tok && Array.isArray(rooms.list) && rooms.list.length) {
      open.rooms = { tok: rooms.tok, list: rooms.list.filter(function (x) { return x && typeof x.code === "string"; }).slice(0, 30),
                     me: duels && typeof duels.me === "string" ? duels.me : "" };
    }

    /* the word games */
    M.WORDS.forEach(function (W) {
      var s = obj(get(W.store));
      if (!s || !obj(s.main)) return;
      var days = [], grade = {}, runs = obj(s.runs) || {};
      Object.keys(s.main).forEach(function (k) {
        var n = Number(k), m = s.main[k];
        if (!whole(n) || n < 1 || !m) return;
        var i = dateN(W.start, n);
        if (i > ti) return;
        var l = W.id === "passport" ? m && m.l : m;
        lang(l);
        var run = obj(runs[l]) && runs[l][k];
        var g = "x";
        if (W.id === "altitude" && run && run.done && whole(run.h) && run.h >= 0 && run.h <= 8) g = String(run.h);
        if (W.id === "lookalike") {
          if (run && run.done && Array.isArray(run.p)) g = String(Math.min(3, run.p.filter(function (x) { return x === "r"; }).length));
          else if (obj(s.perf) && s.perf[k]) g = "3";
        }
        if (W.id === "passport") g = m.ok === true ? "1" : "0";
        days.push(i);
        grade[i] = g;
        if (i >= ti - 1 && run) (open.recent[W.id] = open.recent[W.id] || {})[n] = { l: l, run: run };
      });
      var e = put1(rec, W.id, days, grade, W.id === "altitude" && whole(s.best) ? Math.max(0, Math.min(8, s.best)) : 0, firsts);
      if (e && W.id === "passport" && obj(s.stamps)) {
        var k = {};
        Object.keys(s.stamps).forEach(function (o) { if (/^[a-z]{2,4}$/.test(o) && whole(s.stamps[o]) && s.stamps[o] >= 1) k[o] = s.stamps[o]; });
        if (Object.keys(k).length) e.k = k;
      }
    });

    /* the story (UTC days) */
    var st = obj(get("story:v1"));
    if (st && obj(st.weeks)) {
      var sdays = [], votes = 0, withW = 0;
      Object.keys(st.weeks).forEach(function (w) {
        var wk = obj(st.weeks[w]), dd = obj(wk && wk.days), cache = obj(obj(wk && wk.cache) && wk.cache.days) || {};
        if (!dd || !whole(+w) || +w < 1) return;
        Object.keys(dd).forEach(function (d) {
          var x = obj(dd[d]);
          if (!x || !whole(+d) || +d < 1 || +d > 7) return;
          var voted = x.vote === "A" || x.vote === "B";
          if (voted || x.read === true || x.readSent === true) sdays.push(D(M.storyDate(+w, +d)));
          if (voted) {
            votes++;
            (open.st[w] = open.st[w] || {})[d] = x.vote;
            var c = obj(cache[d]);
            if (c && c.result === x.vote) withW++;
          }
        });
      });
      var sb = M.build(sdays);
      if (sb || votes) { rec.story = sb ? { f: sb.f, d: sb.d } : {}; rec.story.votes = votes; rec.story.with = withW; if (sb) firsts.push(D(sb.f)); }
    }

    /* the find-outs: how many finished in the open; the portrait code only in the box (it opens the research record on the
       find-outs' own server, so it is a secret like the host keys: joint check, 7 Nov 2026); nothing else */
    var fo = obj(get("lg.findout.v1"));
    if (fo && obj(fo.games)) {
      var done = 0;
      for (var n = 1; n <= 9; n++) { var g = obj(fo.games[n]); if (g && obj(g.result) && g.result.scored !== false) done++; }
      var fcode = typeof fo.code === "string" && /^[A-Z0-9-]{4,12}$/.test(fo.code) ? fo.code : null;
      if (done || fcode) rec.fo = { done: done, has: !!fcode };
      if (fcode) open.fo = fcode;
      if (done && fo.created) { var fd = new Date(fo.created); if (!isNaN(fd.getTime())) firsts.push(D(M.localDate(fd))); }
    }

    /* the check-in: dates in the open, the entries in the box (never the research id or receipt) */
    var ck = obj(get("lg.checkin.v1"));
    if (ck) {
      var hist = Array.isArray(ck.history) ? ck.history.filter(function (e) { return obj(e) && num(e.at) && num(e.who); }) : [];
      hist.sort(function (a, b) { return a.at - b.at; });
      var cdays = hist.map(function (e) { lang(e.lang); return D(M.localDate(new Date(e.at))); });
      var cb = M.build(cdays);
      if (cb) { rec.ci = cb; firsts.push(D(cb.f)); }
      open.ci = hist.map(function (e, i) {
        var full = i >= hist.length - 3;                     // the last three whole (the result screen draws from a); the rest, the scores
        var x = full ? JSON.parse(JSON.stringify(e)) : { at: e.at, who: e.who, st: e.st, role: e.role, lang: e.lang };
        delete x.upload; delete x.send; delete x.cmp;
        x.consent = e.consent === "yes" ? "yes" : "no";
        x.first = false;
        return x;
      });
      (Array.isArray(ck.hosts) ? ck.hosts : []).forEach(function (h) {
        if (!obj(h) || typeof h.key !== "string" || typeof h.code !== "string") return;
        mineAdd(rec, open, "checkin", h.code, "", h.at, { key: h.key, at: h.at });
      });
    }

    /* the games and rooms the player made */
    var made = get("logicers-make:games");
    (Array.isArray(made) ? made : []).forEach(function (g) {
      if (!obj(g) || !/^[BCDFGHJKLMNPQRSTVWXZ]{7}$/.test(String(g.code)) || typeof g.edit !== "string") return;
      mineAdd(rec, open, "made", g.code, typeof g.title === "string" ? g.title : "", g.t,
              { edit: g.edit, n: g.n, lang: g.lang, colour: g.colour, t: g.t });
    });
    try {
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i), m = /^logicers-live:host:([A-Za-z0-9]{3,16})$/.exec(k || "");
        if (!m) continue;
        var h = get(k);
        if (obj(h) && typeof h.key === "string") mineAdd(rec, open, "howsure", m[1], "", h.t, { rec: h });
      }
    } catch (e) { /* no storage */ }
    var fr = obj(get("lg.findout.room.host"));
    if (fr && typeof fr.code === "string" && typeof fr.host_key === "string") mineAdd(rec, open, "findout", fr.code, "", fr.made, { rec: fr });

    rec.langs = langs;
    var f = Math.min.apply(null, firsts.filter(isFinite).concat([Infinity]));
    rec.first = isFinite(f) ? DATE(f) : null;
    return { record: rec, open: open };
  }
  function put1(rec, id, days, grade, best, firsts) {
    var b = M.build(days);
    if (!b) return null;
    var a = D(b.f), t = "";
    for (var i = 0; i < b.d.length; i++) t += b.d.charAt(i) === "1" ? (grade[a + i] || "x") : ".";
    var e = { f: b.f, d: b.d, t: t, n: days.length, s: 0, b: best || 0 };
    e.s = 0; for (var j = 0; j < t.length; j++) if (t.charAt(j) === String(M.TOP[id])) e.s++;
    rec.g[id] = e;
    firsts.push(a);
    return e;
  }
  function mineAdd(rec, open, kind, code, title, at, secret) {
    if (!/^[A-Za-z0-9]{3,16}$/.test(code)) return;
    var k = kind + ":" + code;
    if (open.mine[k]) return;
    var made = num(at) ? M.localDate(new Date(at)) : null;
    rec.mine.push({ kind: kind, title: String(title || "").slice(0, 80), code: code, made: made });
    open.mine[k] = secret;
  }
  /* the links, made on this phone from the secrets (never stored in the box: the site may move) */
  function linksOf(open) {
    var out = {};
    Object.keys((open && open.mine) || {}).forEach(function (k) {
      var s = open.mine[k] || {}, i = k.indexOf(":"), kind = k.slice(0, i), c = k.slice(i + 1);
      var link = kind === "made" && s.edit ? ROOT + "live/build/#edit=" + c + "." + s.edit
        : kind === "checkin" && s.key ? ROOT + "checkin/host/#" + s.key
        : kind === "howsure" ? ROOT + "live/#" + c
        : kind === "findout" ? ROOT + "find-out/room/" : null;
      out[k] = { link: link };
    });
    return out;
  }

  /* collect(): this phone's record, merged with the last one the server sent; the box's contents attached as _open */
  function collect() {
    var L = local(), s = state();
    var rec = s.rec ? M.merge(stripSecret(s.rec), L.record) : L.record;
    rec = M.clean(rec) || L.record;
    if (s.rec && s.rec.doors) rec.doors = s.rec.doors;
    if (s.rec && num(s.rec.pk)) rec.pk = s.rec.pk;
    Object.defineProperty(rec, "_open", { value: { ci: L.open.ci, mine: linksOf(L.open), rooms: L.open.rooms || null }, enumerable: false });
    return rec;
  }
  function stripSecret(r) { var x = JSON.parse(JSON.stringify(r)); delete x.box; delete x.pk; return x; }

  /* ---------------- the locked box (Web Crypto: PBKDF2-SHA256 200k -> AES-GCM 256) ---------------- */
  var subtle = window.crypto && window.crypto.subtle;
  var te = new TextEncoder(), td = new TextDecoder();
  function b64(bytes) { var s = ""; for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s); }
  function unb64(s) { var bin = atob(s), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; }
  function rand(n) { var a = new Uint8Array(n); window.crypto.getRandomValues(a); return a; }
  var keys = {};                                  // derived keys, for this page only (never stored)
  function boxKey(c, salt) {
    var k = c + "|" + salt;
    if (keys[k]) return keys[k];
    keys[k] = subtle.importKey("raw", te.encode(c), "PBKDF2", false, ["deriveKey"]).then(function (base) {
      return subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: unb64(salt), iterations: ITER }, base,
                              { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    });
    keys[k].then(null, function () { delete keys[k]; });
    return keys[k];
  }
  function sealBox(data, c, salt) {
    salt = salt || b64(rand(16));
    var iv = rand(12);
    return boxKey(c, salt).then(function (key) {
      return subtle.encrypt({ name: "AES-GCM", iv: iv }, key, te.encode(JSON.stringify(data)));
    }).then(function (ct) {
      var all = new Uint8Array(12 + ct.byteLength);
      all.set(iv, 0); all.set(new Uint8Array(ct), 12);
      return { salt: salt, data: b64(all) };
    });
  }
  function openBox(box, c) {
    if (box && box.box) box = box.box;            // a record or a box
    if (!box || typeof box.salt !== "string" || typeof box.data !== "string" || !c) return Promise.resolve(null);
    var all;
    try { all = unb64(box.data); } catch (e) { return Promise.resolve(null); }
    if (all.length < 29) return Promise.resolve(null);
    return boxKey(c, box.salt).then(function (key) {
      return subtle.decrypt({ name: "AES-GCM", iv: all.slice(0, 12) }, key, all.slice(12));
    }).then(function (pt) {
      var x = JSON.parse(td.decode(pt));
      return obj(x) || null;
    }, function () { return null; });              // the wrong code: AES-GCM refuses, nothing is opened
  }

  /* ---------------- apply: write a record back into the games' own keys ----------------
     Nothing this phone already has is overwritten; a day it does not have is added. Today's and yesterday's results come
     back exactly from the box (so a reveal shows the real guess); an older day comes back as a stand-in of the same grade.
     A day of today without its real result is left unplayed here (the record still counts it), so a game never shows a
     guess nobody made. */
  function apply(record, c, claim) {
    if (!record) return Promise.resolve({ ok: false });
    var p = c && record.box ? openBox(record.box, c) : Promise.resolve(null);
    return p.then(function (open) {
      try { writeGames(record, open); } catch (e) { /* one part failing never stops the others */ }
      try { writeWords(record, open); } catch (e) { /* idem */ }
      try { writeStory(record, open); } catch (e) { /* idem */ }
      if (open) {
        try { writeCheckin(open.ci); } catch (e) { /* idem */ }
        try { writeMine(open.mine); } catch (e) { /* idem */ }
        try { writeRooms(open.rooms); } catch (e) { /* idem */ }
      }
      /* the portrait is asked for only when a code is typed or a door opened (restore, adopt): never on an ordinary sync */
      var q = claim && open && open.fo ? claimFindouts(open.fo) : Promise.resolve();
      return q.then(function () { return { ok: true, open: !!open }; }, function () { return { ok: true, open: !!open }; });
    });
  }
  function gradeAt(g, i) { var k = i - D(g.f); return k >= 0 && k < g.d.length && g.d.charAt(k) === "1" ? (g.t || "").charAt(k) || "x" : null; }
  function writeGames(record, open) {
    var all = obj(get("turnsout:v1")) || {};
    all.games = obj(all.games) || {};
    var ti = todayI(), wrote = {};
    M.DAILY.forEach(function (G) {
      var g = record.g && record.g[G.id];
      if (!g) return;
      var slot = obj(all.games[G.page]) || { results: {}, practice: {} };
      slot.results = obj(slot.results) || {};
      slot.practice = obj(slot.practice) || {};
      var recent = open && obj(open.recent) && obj(open.recent[G.id]) || {};
      M.spread(g.f, g.d).forEach(function (i) {
        var n = dayN(G.start, i);
        if (n < 1 || i > ti || safe(RULES[G.id].done, slot.results[n])) return;
        var raw = recent[n];
        if (raw && safe(RULES[G.id].done, raw)) slot.results[n] = raw;
        else if (i === ti) return;                                  // today: only the real result
        else {
          var c = gradeAt(g, i), t = c >= "0" && c <= "3" ? +c : 0;   // a grade not known any more comes back as the lowest stamp
          var r = RULES[G.id].fake(t); r.me = 1; slot.results[n] = r;
        }
        if (i >= ti - 1) (wrote[key8(i)] = wrote[key8(i)] || []).push(G.id);
      });
      all.games[G.page] = slot;
    });
    /* the world's counts: what came back for today and yesterday was already counted on the other phone */
    var w = all.world = obj(all.world) || {};
    ["sent", "got"].forEach(function (list) {
      w[list] = obj(w[list]) || {};
      Object.keys(wrote).forEach(function (d) {
        var have = Array.isArray(w[list][d]) ? w[list][d] : [];
        wrote[d].forEach(function (k) { if (have.indexOf(k) < 0) have.push(k); });
        w[list][d] = have;
      });
    });
    /* the Logicer number: the older one */
    if (whole(record.logicer) && record.logicer > 0) {
      var L = obj(w.logicer);
      if (!L || !whole(L.n) || record.logicer < L.n) w.logicer = { n: record.logicer, d: record.first ? record.first.replace(/-/g, "") : key8(ti) };
    }
    milestones(all);
    put("turnsout:v1", all);
  }
  /* the returning-player events (turnsout.js milestones): marked as sent for what the restored days reach, so a restored
     phone is never counted as a new player */
  function milestones(all) {
    var on = {}, days = 0, run = 0, ti = todayI();
    M.DAILY.forEach(function (G) {
      var res = obj(obj(all.games[G.page]) && all.games[G.page].results) || {};
      Object.keys(res).forEach(function (k) {
        var i = dateN(G.start, Number(k));
        if (Number(k) >= 1 && i <= ti && safe(RULES[G.id].done, res[k]) && !on[i]) { on[i] = 1; days++; }
      });
    });
    for (var d = ti; on[d]; d--) run++;
    var sent = obj(all.sent) || {};
    [["players/new", 1, 0], ["players/2-days", 2, 0], ["players/7-days", 7, 0], ["players/2-days-in-a-row", 0, 2], ["players/7-days-in-a-row", 0, 7]]
      .forEach(function (m) { if (days > 0 && days >= m[1] && run >= m[2]) sent[m[0]] = 1; });
    all.sent = sent;
  }
  function writeWords(record, open) {
    var ti = todayI(), fallback = (record.langs && record.langs[0]) || "en";
    M.WORDS.forEach(function (W) {
      var g = record.g && record.g[W.id];
      if (!g) return;
      var s = obj(get(W.store)) || {};
      ["runs", "main", "sent"].forEach(function (k) { s[k] = obj(s[k]) || {}; });
      if (W.id === "lookalike") s.perf = obj(s.perf) || {};
      if (W.id === "passport") s.stamps = obj(s.stamps) || {};
      var recent = open && obj(open.recent) && obj(open.recent[W.id]) || {};
      M.spread(g.f, g.d).forEach(function (i) {
        var n = dayN(W.start, i);
        if (n < 1 || i > ti || s.main[n]) return;
        var c = gradeAt(g, i), rr = obj(recent[n]), l = rr && M.LANGS.indexOf(rr.l) >= 0 ? rr.l : fallback;
        if (W.id === "passport") s.main[n] = { l: l, ok: c === "1" };
        else s.main[n] = l;
        if (W.id === "lookalike" && c === "3") s.perf[n] = 1;
        if (rr && obj(rr.run)) {
          s.runs[l] = obj(s.runs[l]) || {};
          if (!s.runs[l][n]) s.runs[l][n] = rr.run;
          s.sent[key8(i) + ":" + l] = 1;                               // counted already, on the other phone
        }
      });
      if (W.id === "altitude" && whole(g.b) && g.b > (whole(s.best) ? s.best : 0)) s.best = g.b;
      if (W.id === "passport" && obj(g.k)) Object.keys(g.k).forEach(function (o) { if (!s.stamps[o] || g.k[o] < s.stamps[o]) s.stamps[o] = g.k[o]; });
      if (W.id === "altitude" && !num(s.best)) s.best = 0;
      put(W.store, s);
    });
  }
  function hex(n) { var a = rand(n), s = ""; for (var i = 0; i < a.length; i++) s += (a[i] < 16 ? "0" : "") + a[i].toString(16); return s; }
  function writeStory(record, open) {
    var sv = open && obj(open.st) || {};
    var list = record.story ? M.spread(record.story.f, record.story.d) : [];
    if (!list.length && !Object.keys(sv).length) return;
    var S = obj(get("story:v1"));
    if (!S || S.v !== 1 || !/^[0-9a-f]{32}$/.test(String(S.id))) S = { v: 1, id: hex(16), intro: false, weeks: {}, taps: [] };
    S.weeks = obj(S.weeks) || {};
    function day(w, d) {
      var k = S.weeks[w] = obj(S.weeks[w]) || {};
      k.days = obj(k.days) || {};
      k.cache = obj(k.cache) || { path: [], days: {} };
      return k.days[d] = obj(k.days[d]) || {};
    }
    list.forEach(function (i) {
      var ch = M.storyChapter(DATE(i));
      if (!ch) return;
      var x = day(ch.w, ch.d);
      x.readSent = true;                                             // the server counted it from the other phone
      if (ch.d === 7) x.read = true;
    });
    Object.keys(sv).forEach(function (w) {
      Object.keys(obj(sv[w]) || {}).forEach(function (d) {
        var v = sv[w][d];
        if (v !== "A" && v !== "B") return;
        var x = day(w, d);
        if (!x.vote) { x.vote = v; x.readSent = true; }
      });
    });
    S.intro = true;
    put("story:v1", S);
  }
  function writeCheckin(entries) {
    if (!Array.isArray(entries) || !entries.length) return;
    var st = obj(get("lg.checkin.v1"));
    if (!st || st.v !== 1) st = { v: 1, id: null, draft: null, history: [], consent: {}, hosts: [], rooms: {}, counted: false };
    st.history = Array.isArray(st.history) ? st.history : [];
    var have = {};
    st.history.forEach(function (e) { if (obj(e) && num(e.at)) have[e.at] = e; });
    entries.forEach(function (e) {
      if (!obj(e) || !num(e.at) || !num(e.who)) return;
      var mine = have[e.at];
      if (!mine) { have[e.at] = e; st.history.push(e); }
      else if (!mine.a && e.a) mine.a = e.a;                         // a slim copy here, the whole one in the box
    });
    st.history.sort(function (a, b) { return (a.at || 0) - (b.at || 0); });
    if (st.history.length > 30) st.history.splice(0, st.history.length - 30);
    put("lg.checkin.v1", st);
  }
  function writeMine(mine) {
    if (!obj(mine)) return;
    var made = get("logicers-make:games"); made = Array.isArray(made) ? made : [];
    var ck = null, changed = false;
    Object.keys(mine).forEach(function (k) {
      var s = obj(mine[k]); if (!s) return;
      var i = k.indexOf(":"), kind = k.slice(0, i), c = k.slice(i + 1);
      if (kind === "made" && typeof s.edit === "string" && !made.some(function (g) { return g && g.code === c; })) {
        made.push({ code: c, edit: s.edit, title: "", n: s.n, lang: s.lang, colour: s.colour, t: s.t });
        changed = true;
      }
      if (kind === "checkin" && typeof s.key === "string") {
        ck = ck || obj(get("lg.checkin.v1")) || { v: 1, id: null, draft: null, history: [], consent: {}, hosts: [], rooms: {}, counted: false };
        ck.hosts = Array.isArray(ck.hosts) ? ck.hosts : [];
        if (!ck.hosts.some(function (h) { return h && h.key === s.key; })) ck.hosts.push({ key: s.key, code: c, at: num(s.at) ? s.at : Date.now() });
      }
      if (kind === "howsure" && obj(s.rec) && !get("logicers-live:host:" + c)) put("logicers-live:host:" + c, s.rec);
      if (kind === "findout" && obj(s.rec) && !obj(get("lg.findout.room.host"))) put("lg.findout.room.host", s.rec);
    });
    if (changed) {
      made.sort(function (a, b) { return (b.t || 0) - (a.t || 0); });
      put("logicers-make:games", made.slice(0, 50));
    }
    if (ck) { ck.hosts.sort(function (a, b) { return (a.at || 0) - (b.at || 0); }); if (ck.hosts.length > 12) ck.hosts.splice(0, ck.hosts.length - 12); put("lg.checkin.v1", ck); }
  }
  /* the titles of made games are in the open record; put them back on the editor's own list */
  function titles(record) {
    var made = get("logicers-make:games");
    if (!Array.isArray(made)) return;
    var by = {};
    (record.mine || []).forEach(function (x) { if (x.kind === "made" && x.title) by[x.code] = x.title; });
    var ch = false;
    made.forEach(function (g) { if (g && !g.title && by[g.code]) { g.title = by[g.code]; ch = true; } });
    if (ch) put("logicers-make:games", made);
  }
  function writeRooms(rooms) {
    if (!obj(rooms) || typeof rooms.tok !== "string" || !Array.isArray(rooms.list) || !rooms.list.length) return;
    var all = obj(get("turnsout:v1")) || {};
    var r = obj(all.rooms) || {};
    if (Array.isArray(r.list) && r.list.length) return;               // a phone already in rooms of its own keeps them
    all.rooms = { tok: rooms.tok, list: rooms.list, out: {} };
    all.duels = obj(all.duels) || {};
    if (!all.duels.me && typeof rooms.me === "string") all.duels.me = rooms.me;
    all.duels.days = obj(all.duels.days) || {};
    put("turnsout:v1", all);
  }
  /* the portrait: a phone with no find-outs of its own and a portrait code asks the find-outs' own server for it, exactly as
     the find-outs page does with "Have a code?" (find-out.js codeEntry and adopt) */
  var FO_API = ["https://findout.logicers.com", "https://logicers-findout.rza-khay.workers.dev"];
  function claimFindouts(c) {
    if (typeof c !== "string" || !/^[A-Z0-9-]{4,12}$/.test(c)) return Promise.resolve();
    var fo = obj(get("lg.findout.v1"));
    if (fo && obj(fo.games) && Object.keys(fo.games).length) return Promise.resolve();
    var bases = LOCAL ? (typeof window.FINDOUT_API === "string" ? [window.FINDOUT_API] : []) : FO_API;
    function go(i) {
      if (i >= bases.length) return Promise.resolve(null);
      return fetchJson(bases[i] + "/claim", { code: c }).then(function (r) { return r; }, function () { return go(i + 1); });
    }
    return go(0).then(function (res) {
      var r = res && res.data;
      if (!r || !r.ok || !Array.isArray(r.games) || !obj(r.player)) return;
      if (obj(get("lg.findout.v1")) && Object.keys(get("lg.findout.v1").games || {}).length) return;
      var st = { v: 1, id: r.id, created: r.player.created || new Date().toISOString(), header_country: r.player.header_country || "",
                 country: r.player.country, country_asked: true, games: {}, consent: { status: "yes", version: r.player.consent_version, at: r.player.consent_at },
                 uploaded: { at: new Date().toISOString(), games: [] }, code: r.code, demographics: null, funnel: {}, done_order: [] };
      r.games.forEach(function (g) {
        if (g.wave !== 1) return;
        st.games[g.game] = { started: g.started, finished: g.finished, duration_ms: g.duration_ms, answers: {}, times: {}, positions: {}, order: [],
                             guess: g.guess === null ? null : { p: g.guess_p, value: g.guess }, result: g.sub, rules_version: g.sub && g.sub.rules_version, adopted: true };
        if (g.sub && g.sub.scored !== false) st.done_order.push(g.game);
      });
      st.done_order.sort(function (x, y) {
        var gx = r.games.filter(function (g) { return g.game === x; })[0] || {}, gy = r.games.filter(function (g) { return g.game === y; })[0] || {};
        return (gx.order_index || 0) - (gy.order_index || 0);
      });
      if (r.demographics) st.demographics = r.demographics;
      if (r.player.room) st.room = { code: null, tag: r.player.room, key: null, joined: null, ended: true, done: {} };
      put("lg.findout.v1", st);
    });
  }

  /* ---------------- the server ---------------- */
  function fetchJson(url, body) {
    var ctl = null, timer = null;
    try { ctl = new window.AbortController(); } catch (e) { ctl = null; }
    if (ctl) timer = window.setTimeout(function () { ctl.abort(); }, WAIT);
    return window.fetch(url, {
      method: body === undefined ? "GET" : "POST", cache: "no-store",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body), signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) window.clearTimeout(timer);
      return res.json().then(function (d) { return { status: res.status, data: d || {} }; }, function () { return { status: res.status, data: {} }; });
    }, function (e) { if (timer) window.clearTimeout(timer); throw e; });
  }
  function call(path, body) {
    var base = apiBase();
    if (!base) return Promise.reject(new Error("off"));
    return fetchJson(base + path, body).then(function (r) { if (base === API) heard = true; return r; }, function (e) {
      if (base !== API || heard || LOCAL) throw e;                  // the first address only, and only while it never answered
      useOld = true;
      return fetchJson(API_OLD + path, body);
    });
  }

  /* the record that goes up: this phone's own, cut to fit (the box loses yesterday's and today's raw results first, then
     the oldest check-ins' answers), sealed */
  function sealed(c, salt, extra) {
    var L = local(), rec = L.record;
    var data = { ci: L.open.ci, mine: L.open.mine, rooms: L.open.rooms || null, st: L.open.st, recent: L.open.recent, fo: L.open.fo || null };
    if (extra) data = mergeOpen(extra, data);
    rec.upd = new Date().toISOString();
    function fit(d) {
      return sealBox(d, c, salt).then(function (box) {
        rec.box = box;
        if (M.size(rec) <= M.LIMIT - 512) return { record: rec, data: d };
        if (d.recent && Object.keys(d.recent).length) { d.recent = {}; return fit(d); }
        var full = (d.ci || []).filter(function (e) { return e.a; });
        if (full.length > 1) { delete full[0].a; return fit(d); }
        if ((d.ci || []).length > 2) { d.ci = d.ci.slice(-Math.max(2, Math.floor(d.ci.length / 2))); return fit(d); }
        delete rec.box;                                             // nothing secret fits: the open record still goes
        return { record: rec, data: null };
      });
    }
    return fit(data);
  }
  /* two boxes' contents as one: check-ins by their time, games by kind and code, votes by chapter, recent by game and day */
  function mergeOpen(a, b) {
    a = a || {}; b = b || {};
    var ci = {}, out = { ci: [], mine: {}, rooms: b.rooms || a.rooms || null, st: {}, recent: {}, fo: b.fo || a.fo || null };
    (a.ci || []).concat(b.ci || []).forEach(function (e) {
      if (!obj(e) || !num(e.at)) return;
      if (!ci[e.at] || (!ci[e.at].a && e.a)) ci[e.at] = e;
    });
    out.ci = Object.keys(ci).map(function (k) { return ci[k]; }).sort(function (x, y) { return x.at - y.at; }).slice(-30);
    [a.mine, b.mine].forEach(function (m) { Object.keys(obj(m) || {}).forEach(function (k) { if (!out.mine[k]) out.mine[k] = m[k]; }); });
    [a.st, b.st].forEach(function (s) {
      Object.keys(obj(s) || {}).forEach(function (w) {
        out.st[w] = out.st[w] || {};
        Object.keys(obj(s[w]) || {}).forEach(function (d) { if (!out.st[w][d]) out.st[w][d] = s[w][d]; });
      });
    });
    [a.recent, b.recent].forEach(function (r) {
      Object.keys(obj(r) || {}).forEach(function (g) {
        out.recent[g] = out.recent[g] || {};
        Object.keys(obj(r[g]) || {}).forEach(function (n) { if (!out.recent[g][n]) out.recent[g][n] = r[g][n]; });
      });
    });
    return out;
  }
  function same(a, b) { try { return JSON.stringify(a) === JSON.stringify(b); } catch (e) { return false; } }

  /* sync: (1) the open record goes up and the merged one comes back, with the box the server keeps; (2) that box is opened
     and written here; (3) if this phone holds something the server's box does not, a box of both goes up. */
  var busy = null;
  function sync() {
    var c = code();
    if (!c || !apiBase()) return Promise.resolve(null);
    if (busy) return busy;
    busy = (function () {
      var L = local(), up = L.record;
      up.upd = new Date(0).toISOString();                           // the open part only: the stored box stays
      return call("/sync", { code: c, record: up }).then(function (r) {
        if (r.status === 404) { forgetIfGone(c); return { ok: false, error: "unknown" }; }
        if (r.status !== 200 || !r.data.ok) return { ok: false, error: r.data.error || "server" };
        var srv = r.data.record;
        return openBox(srv.box, c).then(function (theirs) {
          return apply(srv, c).then(function () {
            titles(srv);
            var salt = srv.box && srv.box.salt;
            return sealed(c, salt, theirs).then(function (s) {
              var mine = s.data;
              if (theirs && mine && same(mergeOpen(theirs, {}), mergeOpen(mine, {}))) return srv;    // nothing new for the box
              if (!s.record.box && srv.box) return srv;
              return call("/sync", { code: c, record: s.record }).then(function (r2) { return r2.status === 200 && r2.data.ok ? r2.data.record : srv; });
            });
          });
        }).then(function (rec) {
          setState(function (st) { st.rec = rec; st.last = Date.now(); });
          return { ok: true, record: rec };
        });
      });
    })().then(function (x) { busy = null; return x; }, function (e) { busy = null; return { ok: false, error: "network" }; });
    return busy;
  }
  /* the server no longer knows the code (deleted from another phone): forget it here as remove() does, so the game pages
     stop loading these scripts for nothing (joint check) */
  function forgetIfGone(c) {
    if (code() !== c) return;
    try { window.localStorage.removeItem(KEY); } catch (e) { setState(function (st) { if (st.code === c) { delete st.code; delete st.rec; } }); }
  }
  var timer = null;
  function soon() {
    if (!code()) return;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(function () { timer = null; sync(); }, DEBOUNCE);
  }

  /* draw: three different words and a number, from the phone's own random numbers */
  var lists = {};
  function words(lang) {
    lang = M.LANGS.indexOf(lang) >= 0 ? lang : "en";
    if (!lists[lang]) {
      lists[lang] = window.fetch(ROOT + "me/words/" + lang + ".json", { cache: "force-cache" }).then(function (r) { return r.json(); })
        .then(function (j) { if (!j || !Array.isArray(j.words) || j.words.length < 100) throw new Error("words"); return j.words; });
      lists[lang].then(null, function () { delete lists[lang]; });
    }
    return lists[lang];
  }
  function pick(n) {                       // a whole number 0..n-1, without bias
    var lim = Math.floor(4294967296 / n) * n, a = new Uint32Array(1);
    do { window.crypto.getRandomValues(a); } while (a[0] >= lim);
    return a[0] % n;
  }
  function draw(lang) {
    return words(lang).then(function (list) {
      var w = [];
      while (w.length < 3) { var x = list[pick(list.length)]; if (w.indexOf(x) < 0) w.push(x); }
      return w.join("-") + "-" + (10 + pick(90));
    });
  }

  /* keep: the code becomes this phone's, and the record goes up for the first time */
  function keep(c, lang, tries) {
    c = normalize(c);
    if (!CODE_RE.test(c)) return Promise.resolve({ ok: false, error: "code" });
    tries = tries || 0;
    return sealed(c, null).then(function (s) {
      return call("/new", { code: c, record: s.record, lang: M.LANGS.indexOf(lang) >= 0 ? lang : null });
    }).then(function (r) {
      if (r.status === 200 && r.data.ok) {
        setState(function (st) { st.code = c; st.lang = lang || null; st.at = Date.now(); st.last = Date.now(); st.rec = r.data.record || null; });
        return { ok: true, code: c };
      }
      if (r.data && r.data.taken && tries < 4) return draw(lang).then(function (n) { return keep(n, lang, tries + 1); });
      if (r.data && r.data.exists) return { ok: false, exists: true };
      return { ok: false, error: (r.data && r.data.error) || "server" };
    }, function () { return { ok: false, error: "network" }; });
  }

  /* restore: a code typed on a new phone (or handed over by a door) */
  function restore(c) {
    c = normalize(c);
    if (!CODE_RE.test(c)) return Promise.resolve({ ok: false, error: "code" });
    return call("/restore", { code: c }).then(function (r) {
      if (r.status === 404) return { ok: false, error: "unknown" };
      if (r.status === 429) return { ok: false, error: "many" };
      if (r.status !== 200 || !r.data.ok) return { ok: false, error: (r.data && r.data.error) || "server" };
      var rec = r.data.record;
      return apply(rec, c, true).then(function () {
        titles(rec);
        setState(function (st) { st.code = c; st.at = st.at || Date.now(); st.rec = rec; st.last = Date.now(); });
        return sync().then(function (s) { return { ok: true, record: (s && s.record) || rec }; });
      });
    }, function () { return { ok: false, error: "network" }; });
  }
  /* a door (passkey, password, questions) handed this phone the code and the record */
  function adopt(c, rec) {
    c = normalize(c);
    if (!CODE_RE.test(c) || !rec) return Promise.resolve({ ok: false, error: "code" });
    return apply(rec, c, true).then(function () {
      titles(rec);
      setState(function (st) { st.code = c; st.at = st.at || Date.now(); st.rec = rec; st.last = Date.now(); });
      return sync().then(function (s) { return { ok: true, record: (s && s.record) || rec }; });
    });
  }

  /* remove: the record goes from the server; with { local: true } every key of the inventory goes from this phone too */
  var LOCAL_KEYS = ["turnsout:v1", "altitude:v1", "lookalike:v1", "passport:v1", "altitude.lang", "lookalike.lang", "passport.lang",
                    "story:v1", "story:readers", "lg.findout.v1", "lg.findout.marks", "lg.findout.room.host", "lg.checkin.v1",
                    "logicers-make:games", "logicers-room:tab"];
  function remove(opts) {
    var c = code();
    var p = c && apiBase() ? call("/delete", { code: c }).then(function (r) { return r.status === 200; }, function () { return false; }) : Promise.resolve(true);
    return p.then(function (ok) {
      if (!ok) return { ok: false, error: "network" };
      try { window.localStorage.removeItem(KEY); } catch (e) { /* nothing */ }
      if (opts && opts.local) {
        try {
          LOCAL_KEYS.forEach(function (k) { window.localStorage.removeItem(k); });
          var drop = [];
          for (var i = 0; i < window.localStorage.length; i++) { var k = window.localStorage.key(i); if (/^logicers-live:/.test(k || "")) drop.push(k); }
          drop.forEach(function (k) { window.localStorage.removeItem(k); });
        } catch (e) { /* nothing */ }
      }
      return { ok: true };
    });
  }

  /* ---------------- the hook: a game's finish, as the games already report it ----------------
     Every game page calls TurnsOut.count("<game>/played/...") at its finish (the daily games, Altitude, Lookalike,
     Passport), the story ("story/w1/d2/voted"), the editor ("live/build/saved", "live/build/keep...") and a How Sure
     host ("live/hosted..."). Wrapping that one function catches them all without touching a game. */
  var HOOK = /\/played\/|^story\/w\d+\/d\d+\/(voted|read)|^live\/build\/(saved|keep)|^live\/hosted/;
  function hook() {
    var TO = window.TurnsOut;
    if (!TO || typeof TO.count !== "function" || TO.count.__me) return;
    var inner = TO.count;
    var wrapped = function (name) {
      var out = inner.apply(this, arguments);
      try { if (HOOK.test(String(name || ""))) soon(); } catch (e) { /* counting must never break a game */ }
      return out;
    };
    wrapped.__me = true;
    TO.count = wrapped;
  }
  function start() {
    hook();
    var s = state();
    if (code() && (!s.last || Date.now() - s.last > STALE)) window.setTimeout(sync, 3000);   // pull what the other phones did
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  window.LogicersMe = {
    KEY: KEY, collect: collect, apply: apply, draw: draw, keep: keep, sync: sync, soon: soon, restore: restore, adopt: adopt,
    remove: remove, openBox: openBox, sealBox: sealBox, code: code, normalize: normalize, isCode: function (c) { return CODE_RE.test(normalize(c)); },
    _test: { local: local, mergeOpen: mergeOpen, RULES: RULES, hook: hook }
  };
})();
