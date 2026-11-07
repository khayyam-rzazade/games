/* TEST STUB for assets/js/me-passkey.js (Chat A2). A classic script: window.MePasskey with the real names and states.
   lg.test.pk: "0" = nothing (supported() false, canLogin() false); "login" = canLogin() only (a computer: the phone's passkey by QR);
   anything else = supported. lg.test.pkcancel "1" = the player closes the sheet. window.__pk records what the page called. */
(function () {
  window.__pk = { prepare: 0, prepareLogin: 0, autofill: 0, stopAutofill: 0, forget: 0, register: 0, login: 0 };
  var mode = function () { return localStorage.getItem('lg.test.pk') || 'on'; };
  function post(path, body) {
    return fetch('/__me' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, data: j }; }); });
  }
  var waiting = null;
  window.MePasskey = {
    supported: function () { return Promise.resolve(mode() === 'on'); },
    canLogin: function () { return mode() !== '0'; },
    platform: function () { return /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'face' : 'finger'; },
    kept: function () { try { return !!JSON.parse(localStorage.getItem('lg.test.doors') || '{}').passkey; } catch (e) { return false; } },
    prepare: function () { window.__pk.prepare++; return Promise.resolve({}); },
    prepareLogin: function () { window.__pk.prepareLogin++; return Promise.resolve({}); },
    register: function (code) {
      window.__pk.register++;
      if (localStorage.getItem('lg.test.pkcancel') === '1') return Promise.resolve({ ok: false, state: 'cancelled' });
      return post('/passkey/register', { code: code }).then(function (r) {
        if (r.status === 429) return { ok: false, state: 'failed', reason: 'too many' };
        if (!(r.data && r.data.ok)) return { ok: false, state: 'failed', reason: 'server' };
        var d = JSON.parse(localStorage.getItem('lg.test.doors') || '{}'); d.passkey = true; localStorage.setItem('lg.test.doors', JSON.stringify(d));
        return { ok: true, state: 'done' };
      }, function () { return { ok: false, state: 'failed', reason: 'offline' }; });
    },
    login: function () {
      window.__pk.login++;
      if (localStorage.getItem('lg.test.pkcancel') === '1') return Promise.resolve({ ok: false, state: 'cancelled' });
      return post('/passkey/login', {}).then(function (r) {
        if (r.status === 200 && r.data.ok) return { ok: true, code: r.data.code, record: r.data.record };
        return { ok: false, state: 'failed', reason: r.status === 404 ? 'server' : 'server' };
      }, function () { return { ok: false, state: 'failed', reason: 'offline' }; });
    },
    autofill: function () {
      window.__pk.autofill++;
      return new Promise(function (resolve) {
        waiting = resolve;
        window.__pkPick = function () {                       // a test "picks" the kept passkey from the keyboard
          post('/passkey/login', {}).then(function (r) { var w = waiting; waiting = null; if (w) w(r.status === 200 && r.data.ok ? { ok: true, code: r.data.code, record: r.data.record } : null); });
        };
      });
    },
    stopAutofill: function () { window.__pk.stopAutofill++; var w = waiting; waiting = null; if (w) w(null); },
    forget: function () { window.__pk.forget++; try { var d = JSON.parse(localStorage.getItem('lg.test.doors') || '{}'); d.passkey = false; localStorage.setItem('lg.test.doors', JSON.stringify(d)); } catch (e) { /* nothing */ } return Promise.resolve(); }
  };
})();
