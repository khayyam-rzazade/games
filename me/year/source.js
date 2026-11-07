/* Logicers, the cards: where the numbers come from (me/year/source.js, 7 Nov 2026).
   The one file that touches the other chats' work.

   1. stats(record, period, opts)   assets/js/me-stats.js (Chat A, window.LogicersMeStats, a classic script). The record is
      LogicersMe.collect() from assets/js/me.js (window.LogicersMe, classic, needs me-stats.js first): this phone's own
      storage merged with the last record the server sent. So the cards work with no code and no server.
   2. GET /dist             the logicers-me Worker (plan 3c, server/me/worker.js): percentiles over the records it holds, nothing
      personal. A failure of any kind gives null and the card simply has no "more days than" screen.
   3. Whether this phone keeps a code   LogicersMe.code() (a string, or null).

   Both scripts are classic scripts, so they are loaded as <script> tags (in this order), not imported. me.js also starts
   its own sync when a code is kept and the last one is older than six hours; that is My Logicers doing its job on any page
   that loads it, and sends the phone's own record to the same server.
   A page that sets window.LOGICERS_ME_SOURCE = { stats(period, opts), dist(), hasCode() } overrides all of it (the tests use this;
   so can a preview). On localhost and file:// nothing is asked of any server unless window.LOGICERS_ME_API names one,
   exactly as me.js does. */

const g = globalThis;
const JS = new URL('../../assets/js/', import.meta.url).href;
const API = ['https://me.logicers.com', 'https://logicers-me.rza-khay.workers.dev'];     // the Worker's two addresses (me.js says the same)
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(g.location.hostname) || g.location.protocol === 'file:';

function script(src) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src; s.async = false; s.onload = () => resolve(true); s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}
/* me-stats.js, then me.js (which does nothing without the first). Already there? Then not again. */
async function modules() {
  if (!g.LogicersMeStats) await script(JS + 'me-stats.js');
  if (g.LogicersMeStats && !g.LogicersMe) await script(JS + 'me.js');
  return { S: g.LogicersMeStats || null, Me: g.LogicersMe || null };
}

function bases() {
  if (LOCAL) return typeof g.LOGICERS_ME_API === 'string' && g.LOGICERS_ME_API ? [g.LOGICERS_ME_API] : [];
  return API;
}
export async function dist() {
  for (const b of bases()) {
    let r;
    try {
      const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 4000);
      try { r = await fetch(b.replace(/\/$/, '') + '/dist', { signal: ctl.signal, credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer' }); }
      finally { clearTimeout(timer); }
    } catch (e) { continue; }                                         // no answer at all: the other address
    if (!r.ok) return null;                                           // an answer that is an error: nothing to show
    try { const j = await r.json(); return j && typeof j === 'object' && j.ok !== false ? j : null; } catch (e) { return null; }
  }
  return null;
}

/* what the page needs: { ok, stats, dist, hasCode }. ok is false when no source of numbers could be found at all.
   opts.name(id) gives a game's name in the page's language (me-stats.js would use English). */
export async function load(period, wantDist, opts) {
  const o = g.LOGICERS_ME_SOURCE;
  if (o && typeof o.stats === 'function') {
    const [stats, d, code] = await Promise.all([
      Promise.resolve(o.stats(period, opts)), wantDist ? Promise.resolve(o.dist ? o.dist() : dist()).catch(() => null) : null,
      o.hasCode ? Promise.resolve(o.hasCode()).catch(() => false) : false
    ]);
    return { ok: !!stats, stats, dist: d || null, hasCode: !!code };
  }
  const { S, Me } = await modules();
  if (!S || !Me) return { ok: false, stats: null, dist: null, hasCode: false };
  let stats = null;
  try { stats = S.stats(await Me.collect(), period, opts); } catch (e) { stats = null; }
  let code = false; try { code = !!Me.code(); } catch (e) { code = false; }
  return { ok: !!stats, stats, dist: wantDist ? await dist() : null, hasCode: code };
}
