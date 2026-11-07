/* TEST STUB for assets/js/me-stats.js (Chat A). A classic script: window.LogicersMeStats.stats(record, period, opts) with the shape of plan 3d, in the
   order and with the ids of the real file (the nine daily games, then Altitude, Lookalike, Passport). The stub's "record" carries ready-made stats
   (record.stats); the real one works them out of the record. Served by tests/server.mjs in place of the real file; never shipped. */
(function () {
  var IDS = ['energy', 'hundred', 'call', 'cousin', 'club', 'apart', 'gets', 'every', 'o24', 'altitude', 'lookalike', 'passport'];
  var EN = { energy: 'Same Energy', hundred: '100 of Us', call: 'Your Call', cousin: 'Long Lost Cousin', club: 'The Club', apart: 'Years Apart', gets: 'Who Gets What',
    every: 'Every Beat', o24: 'Out of 24', altitude: 'Altitude', lookalike: 'Lookalike', passport: 'Passport' };
  function empty() {
    return { logicer: null, since: null, langs: [], days: 0, games: 0, spotOn: 0, pct: 0, current: 0, longest: 0,
      per: IDS.map(function (id) { return { id: id, name: EN[id], played: 0, current: 0, longest: 0, spotOn: 0, best: 0, last: null }; }),
      words: { climbs: 0, highest: 0, perfect: 0 }, story: { chapters: 0, votes: 0, withWorld: 0 }, findouts: { done: 0, portrait: false },
      checkin: { times: 0, last: null, prev: null, history: [] }, mine: [], doors: { passkey: false, pw: false, rq: false }, calendar: { from: null, to: null, d: '' } };
  }
  window.LogicersMeStats = {
    stats: function (record, period, opts) {
      var st = record && record.stats ? JSON.parse(JSON.stringify(record.stats)) : empty();
      st.per.forEach(function (p) { var v = opts && typeof opts.name === 'function' ? opts.name(p.id) : ''; p.name = v || EN[p.id] || p.id; });
      var doors = {}; try { doors = JSON.parse(localStorage.getItem('lg.test.doors') || '{}'); } catch (e) { /* none */ }
      st.doors = Object.assign({ passkey: false, pw: false, rq: false }, st.doors, doors);
      window.__statsCalls = (window.__statsCalls || 0) + 1;
      return st;
    },
    LANGS: ['en', 'it', 'es', 'pt', 'fr', 'tr']
  };
})();
