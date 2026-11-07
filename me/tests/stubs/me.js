/* TEST STUB for assets/js/me.js (Chat A). A classic script: window.LogicersMe with the real names and the real answers
   (collect() sync; draw, keep, restore, adopt, remove resolve { ok, ... } and never throw; the code lives under lg.me.v1 = { v: 1, code }).
   The "phone" is localStorage["lg.test.phone"] = { stats }; the Worker is the fake under /__me/. Never shipped. */
(function () {
  var WORDS = { en: ['river', 'blue', 'cat', 'maple', 'cloud', 'tiger', 'green', 'stone'], it: ['fiume', 'blu', 'gatto', 'acero', 'nuvola', 'tigre', 'verde', 'pietra'],
    es: ['rio', 'azul', 'gato', 'arce', 'nube', 'tigre', 'verde', 'piedra'], pt: ['rio', 'azul', 'gato', 'bordo', 'nuvem', 'tigre', 'verde', 'pedra'],
    fr: ['fleuve', 'bleu', 'chat', 'erable', 'nuage', 'tigre', 'vert', 'pierre'], tr: ['nehir', 'mavi', 'kedi', 'akcaagac', 'bulut', 'kaplan', 'yesil', 'tas'] };
  var KEY = 'lg.me.v1';
  function post(path, body) {
    return fetch('/__me' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, data: j }; }); });
  }
  function state() { try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); return s && s.v === 1 ? s : { v: 1 }; } catch (e) { return { v: 1 }; } }
  function setState(f) { var s = state(); f(s); localStorage.setItem(KEY, JSON.stringify(s)); }
  function phone() { try { return JSON.parse(localStorage.getItem('lg.test.phone') || 'null'); } catch (e) { return null; } }
  function code() { var c = state().code; return typeof c === 'string' ? c : null; }
  function draw(lang) {
    var w = WORDS[lang] || WORDS.en, n = +(localStorage.getItem('lg.test.draws') || '0') + 1; localStorage.setItem('lg.test.draws', String(n));
    var long = localStorage.getItem('lg.test.long') === '1';
    var a = long ? 'abcdefgx' : w[n % w.length], b = long ? 'hijklmn' : w[(n + 3) % w.length], c = long ? 'opqrstu' : w[(n + 5) % w.length];
    return Promise.resolve(a + '-' + b + '-' + c + '-' + String(10 + (n * 7) % 90));
  }
  function keep(c, lang, tries) {
    tries = tries || 0;
    var p = phone(), tk = +(localStorage.getItem('lg.test.taken') || '0');
    if (tk > 0) { localStorage.setItem('lg.test.taken', String(tk - 1)); return draw(lang).then(function (n) { return keep(n, lang, tries + 1); }); }   // a taken code is drawn again, silently
    return post('/new', { code: c, record: { logicer: p && p.stats ? p.stats.logicer : null, stats: p ? p.stats : null } }).then(function (r) {
      if (r.status === 200 && r.data.ok) { setState(function (s) { s.code = c; }); return { ok: true, code: c }; }
      if (r.data && r.data.exists) return { ok: false, exists: true };
      return { ok: false, error: 'server' };
    }, function () { return { ok: false, error: 'network' }; });
  }
  function apply(record, c) {
    localStorage.setItem('lg.test.phone', JSON.stringify({ stats: record.stats })); localStorage.setItem('lg.test.doors', JSON.stringify(record.doors || {}));
    localStorage.setItem('lg.test.applied', JSON.stringify({ code: c, logicer: record.logicer })); setState(function (s) { s.code = c; });
    return Promise.resolve({ ok: true });
  }
  window.LogicersMe = {
    KEY: KEY,
    collect: function () { var p = phone(); return { logicer: p && p.stats ? p.stats.logicer : null, stats: p ? p.stats : null }; },
    code: code,
    draw: draw,
    keep: keep,
    restore: function (c) {
      return post('/restore', { code: c }).then(function (r) {
        if (r.status === 404) return { ok: false, error: 'unknown' };
        if (r.status === 429) return { ok: false, error: 'many' };
        if (r.status !== 200 || !r.data.ok) return { ok: false, error: 'server' };
        return apply(r.data.record, c).then(function () { return { ok: true, record: r.data.record }; });
      }, function () { return { ok: false, error: 'network' }; });
    },
    adopt: function (c, rec) { if (!c || !rec) return Promise.resolve({ ok: false, error: 'code' }); return apply(rec, c).then(function () { return { ok: true, record: rec }; }); },
    remove: function (opts) {
      var c = code(); window.__removeOpts = opts || null;
      return (c ? post('/delete', { code: c }) : Promise.resolve({ status: 200 })).then(function (r) {
        if (r.status !== 200) return { ok: false, error: 'network' };
        try { localStorage.removeItem(KEY); } catch (e) { /* nothing */ }
        return { ok: true };
      }, function () { return { ok: false, error: 'network' }; });
    },
    normalize: function (s) { return String(s || '').toLowerCase(); },
    sync: function () { return Promise.resolve(null); }
  };
})();
