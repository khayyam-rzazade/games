/* My Logicers: the words and the language of the page (Chat B, 7 Nov 2026).
   One pick per phone, the site's own: "lg.findout.lang" (assets/js/lang.js, find-out, check-in). The page's words are
   me/lang/<code>.json (built from claude/me-copy.md); a key missing in a language falls back to English, and a key
   missing everywhere gives "" and a console warning, never a crash. Nothing here touches the network except the one
   small json file. */
export const LANG_KEY = 'lg.findout.lang';
/* code, name, flag, locale: the same list, order and locales as assets/js/lang.js */
export const LANGS = [['en', 'English', '🇬🇧', 'en-GB'], ['it', 'Italiano', '🇮🇹', 'it-IT'], ['tr', 'Türkçe', '🇹🇷', 'tr-TR'],
                      ['es', 'Español', '🇪🇸', 'es-ES'], ['pt', 'Português', '🇧🇷', 'pt-BR'], ['fr', 'Français', '🇫🇷', 'fr-FR']];

export let LANG = 'en';
export let LOCALE = 'en-GB';
let FALLBACK = {};
let OWN = {};

function known(c) { return LANGS.find((l) => l[0] === c) || null; }
export function savedLang() { try { const v = localStorage.getItem(LANG_KEY); return known(v) ? v : null; } catch (e) { return null; } }
export function rememberLang(code) { try { localStorage.setItem(LANG_KEY, code); } catch (e) { /* no storage: the page still works */ } }
function phoneLang() {
  const list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
  for (const l of list) { const c = String(l).slice(0, 2).toLowerCase(); if (known(c)) return c; }
  return 'en';
}
/* a test can force a language with ?lang=it (never remembered) */
function forced() { try { const q = new URLSearchParams(location.search).get('lang'); return known(q) ? q : null; } catch (e) { return null; } }

async function fetchWords(code) {
  const r = await fetch(new URL('lang/' + code + '.json', import.meta.url), { cache: 'no-cache' });
  if (!r.ok) throw new Error('words ' + r.status);
  return r.json();
}
/* pick: a code chosen on this page just now (then it is remembered); otherwise ?lang=, the phone's one pick, the phone's own language */
export async function initWords(pick) {
  const want = known(pick) ? pick : (forced() || savedLang() || phoneLang());
  FALLBACK = await fetchWords('en');
  OWN = FALLBACK; LANG = 'en';
  if (want !== 'en') { try { OWN = await fetchWords(want); LANG = want; } catch (e) { OWN = FALLBACK; /* English stays */ } }
  LOCALE = known(LANG)[3];
  document.documentElement.lang = LANG;
  document.title = T('app.title');
  const d = document.querySelector('meta[name="description"]'); if (d) d.setAttribute('content', T('app.desc'));
  return LANG;
}

export async function setLang(code) { if (!known(code)) return LANG; rememberLang(code); return initWords(code); }

/* Italian: "dal 8 ott" is "dall'8 ott" (and all', dell', nell'): the date is filled in before this runs */
const IT_ELIDE = { il: "l'", dal: "dall'", al: "all'", del: "dell'", nel: "nell'" };
export function T(key, vars) {
  let s = typeof OWN[key] === 'string' ? OWN[key] : FALLBACK[key];
  if (typeof s !== 'string') { if (window.console) console.warn('My Logicers: no words for ' + key); return ''; }
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  if (LANG === 'it') s = s.replace(/\b(il|dal|al|del|nel) (8|11)(?=\D|$)/g, (m, a, d) => IT_ELIDE[a] + d);
  return s;
}
export function has(key) { return typeof OWN[key] === 'string' || typeof FALLBACK[key] === 'string'; }

/* the device the page is on, for the words that say "this phone" (7 Nov 2026, Khayyam on a Mac: "it has to decide based on the
   device"): 'phone', 'tablet' or 'computer'. An iPad says it is a Mac, so a Mac that takes touches is a tablet; an Android
   without "Mobile" is a tablet; a coarse pointer on a small screen is a phone; everything else is a computer.
   ?device=computer (or phone, tablet) forces it, for the checks. */
export const DEVICE = (() => {
  try {
    const q = new URLSearchParams(location.search).get('device'); if (q === 'phone' || q === 'tablet' || q === 'computer') return q;
    const ua = navigator.userAgent || '';
    if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'tablet';
    if (/Android/.test(ua) && !/Mobile/.test(ua)) return 'tablet';
    if (/iPhone|iPod|Android.*Mobile|Windows Phone|Mobi/.test(ua)) return 'phone';
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return Math.min(screen.width, screen.height) < 600 ? 'phone' : 'tablet';
    return 'computer';
  } catch (e) { return 'phone'; }
})();
/* a key with its own words for a tablet or a computer ("out.sure.computer"); the plain key is the phone's */
export function TD(key, vars) { return DEVICE !== 'phone' && has(key + '.' + DEVICE) ? T(key + '.' + DEVICE, vars) : T(key, vars); }

/* numbers, days and months in the language's own form */
export function fmtN(n) { try { return Number(n).toLocaleString(LOCALE); } catch (e) { return String(n); } }
function parseDay(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
export function fmtDay(iso, opts) {
  const d = parseDay(iso); if (!d) return '';
  try { return new Intl.DateTimeFormat(LOCALE, opts || { day: 'numeric', month: 'short' }).format(d); } catch (e) { return String(iso); }
}
export function monthName(ym) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(ym || '')); if (!m) return '';
  try { return new Intl.DateTimeFormat(LOCALE, { month: 'long' }).format(new Date(+m[1], +m[2] - 1, 1)); } catch (e) { return ym; }
}
