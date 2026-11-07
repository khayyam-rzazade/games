/* TEST STUB for assets/js/me-doors.js (Chat A3). A classic script: window.MeDoors with the documented names and answers
   ({ ok, ... } or { ok: false, why, left? }; every call resolves). normalizeAnswer is the rule of plan 3e as A3 describes it (NFKD, apostrophes
   deleted, other punctuation and spaces become one space). Never shipped. */
(function () {
  function normalizeAnswer(s) {
    return String(s || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ı/g, 'i').replace(/ß/g, 'ss').replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/œ/g, 'oe')
      .replace(/['’`]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function post(path, body) {
    return fetch('/__me' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, data: j }; }); });
  }
  function net() { return { ok: false, why: 'net' }; }
  function mark(d) { localStorage.setItem('lg.test.doors', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('lg.test.doors') || '{}'), d))); }
  function setDoor(code, kind, value) {
    return post('/door/set', { code: code, kind: kind, value: value }).then(function (r) {
      if (r.status === 404) return { ok: false, why: 'code' };
      if (!r.data.ok) return { ok: false, why: r.data.reason || 'code' };
      var d = { pw: !!r.data.pw, rq: !!r.data.rq }; mark(d); return { ok: true, pw: d.pw, rq: d.rq };
    }, net);
  }
  function open(path, logicer, value) {
    return post(path, { logicer: logicer, value: value }).then(function (r) {
      if (r.status === 429) return { ok: false, why: 'busy', left: 0 };
      if (r.data && r.data.ok) return { ok: true, code: r.data.code, record: r.data.record };
      return { ok: false, why: 'wrong', left: typeof r.data.left === 'number' ? r.data.left : 0 };
    }, net);
  }
  window.MeDoors = {
    normalizeAnswer: normalizeAnswer,
    setPassword: function (code, password) { return setDoor(code, 'pw', password); },
    setQuestions: function (code, list) { return setDoor(code, 'rq', list.map(function (x) { return { id: x.id, answer: normalizeAnswer(x.answer) }; })); },
    removeDoor: function (code, kind) {
      return post('/door/set', { code: code, kind: kind, remove: true }).then(function (r) {
        if (!r.data.ok) return { ok: false, why: 'code' };
        var d = { pw: !!r.data.pw, rq: !!r.data.rq }; mark(d); return { ok: true, pw: d.pw, rq: d.rq };
      }, net);
    },
    which: function (logicer) {
      return post('/door/which', { logicer: logicer }).then(function (r) {
        if (r.status === 429) return { ok: false, why: 'busy' };
        return { ok: true, pw: !!r.data.pw, rq: r.data.rq || false };
      }, net);
    },
    openWithPassword: function (logicer, password) { return open('/door/password', logicer, password); },
    openWithQuestions: function (logicer, answers) { return open('/door/questions', logicer, answers.map(function (x) { return { id: x.id, answer: normalizeAnswer(x.answer) }; })); }
  };
})();
