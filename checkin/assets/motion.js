/* Check-in: the motion (claude/motion-spec.md, 5 Nov 2026). The one place where motion runs from JavaScript.
   The numbers live in checkin.css (the tokens at the top: --m-fast, --m-base, --m-slow, --e-out, --e-in, --e-spring); this file
   reads them from there, so a duration or a curve is changed in one place. Every helper here leaves the page usable at every
   moment: nothing blocks a tap, a tap during a motion is taken and the motion catches up, and with reduced motion each helper
   lands on the final state at once (screens and sheets crossfade in --m-fast, taps still change colour).
   What is here: tokens, wait, count, show (enter / pop / rise / fade), leave, pulse, the timeline (sequence), the slide between
   questions (View Transitions, with the same motion by hand where the browser has none), the hand-made slide inside a card,
   and the sheets' way out. No imports: core.js uses this file, not the other way round. */

const doc = document.documentElement;
const STAGGER = 50;                                         /* the one stagger used when nothing says otherwise (40-60 ms) */

/* ------------------------------------------------------------------ the tokens ------ */
let TK = null;
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t, sy = (t) => ((ay * t + by) * t + cy) * t, dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) { const e = sx(t) - x; if (Math.abs(e) < 1e-6) return sy(t); const d = dx(t); if (Math.abs(d) < 1e-6) break; t -= e / d; }
    let lo = 0, hi = 1; t = x;
    for (let i = 0; i < 30; i++) { const v = sx(t); if (Math.abs(v - x) < 1e-6) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return sy(t);
  };
}
function curveOf(text, dflt) {
  const m = String(text || '').match(/cubic-bezier\(([^)]+)\)/);
  const p = m ? m[1].split(',').map(Number) : [];
  return p.length === 4 && p.every(isFinite) ? bezier(...p) : bezier(...dflt);
}
function tokens() {
  if (TK) return TK;
  const cs = getComputedStyle(doc);
  const num = (n, d) => { const v = parseFloat(cs.getPropertyValue(n)); return isFinite(v) && v >= 0 ? v : d; };
  TK = {
    fast: num('--m-fast', 120), base: num('--m-base', 220), slow: num('--m-slow', 400),
    out: curveOf(cs.getPropertyValue('--e-out'), [0.2, 0.8, 0.2, 1]),
    in: curveOf(cs.getPropertyValue('--e-in'), [0.4, 0, 1, 1]),
    spring: curveOf(cs.getPropertyValue('--e-spring'), [0.2, 1.1, 0.3, 1])
  };
  return TK;
}
/* 'fast' | 'base' | 'slow' -> ms */
export function ms(name) { return tokens()[name]; }
export function still() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
export const wait = (t) => new Promise((r) => setTimeout(r, Math.max(0, t || 0)));
export const frame = () => new Promise((r) => requestAnimationFrame(() => r()));

/* iOS Safari only shows :active (the press) on a page that listens to touches */
document.addEventListener('touchstart', () => {}, { passive: true });

/* ------------------------------------------------------------------ count ------
   A number rises to its value over --m-slow with --e-out, by requestAnimationFrame. `paint(v, k)` writes each frame (the
   digits, and a needle or a ring that moves with them: k is the same eased 0…1 for all of them). Returns a promise for the end. */
export function count(o) {
  const from = o.from || 0, to = o.to, paint = o.paint;
  if (!isFinite(to) || still() || from === to) { paint(to, 1); return Promise.resolve(); }
  const dur = o.dur || ms('slow'), ease = tokens()[o.ease || 'out'];
  return new Promise((done) => {
    const t0 = performance.now();
    paint(from, 0);
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = ease(k);
      if (o.node && !o.node.isConnected) { done(); return; }
      paint(k >= 1 ? to : from + (to - from) * e, e);
      if (k < 1) requestAnimationFrame(tick); else done();
    };
    requestAnimationFrame(tick);
  });
}

/* ------------------------------------------------------------------ show, hide, leave, pulse ------
   kinds (checkin.css): enter (8 px up, --m-base, --e-out), far (the same with 16 px: the consent card), pop (.85 -> 1, --e-spring),
   fade (opacity, --m-base), leave (up 6 px and out, --m-fast, --e-in). */
const KINDS = ['ck-enter', 'ck-far', 'ck-pop', 'ck-fade', 'ck-leave', 'ck-fadefast'];
function settle(node, cls) {
  const end = (e) => { if (e.target !== node) return; node.removeEventListener('animationend', end); node.classList.remove(cls); node.style.animationDelay = ''; };
  node.addEventListener('animationend', end);
}
/* hidden until its turn in a timeline (only when there will be a motion to show it) */
export function hide(node) { if (node && !still()) node.classList.add('ck-pre'); return node; }
export function show(node, kind, delay) {
  if (!node) return 0;
  node.classList.remove('ck-pre');
  if (still()) return 0;
  const cls = 'ck-' + (kind || 'enter');
  node.classList.remove(...KINDS);
  node.style.animationDelay = delay ? delay + 'ms' : '';
  void node.offsetWidth;                                     /* the same class again plays again */
  node.classList.add(cls); settle(node, cls);
  return ms(cls === 'ck-leave' ? 'fast' : 'base') + (delay || 0);
}
/* a screen arrives (a crossfade of --m-fast under reduced motion) */
export function screenIn(node) {
  if (!node) return;
  node.classList.remove(...KINDS);
  const cls = still() ? 'ck-fadefast' : 'ck-enter';
  node.classList.add(cls); settle(node, cls);
}
/* a card goes: it leaves, then `then` runs (it removes the card) */
export function leave(node, then) {
  if (!node || !node.isConnected || still()) { if (then) then(); return; }
  node.classList.add('ck-going'); node.inert = true;
  show(node, 'leave');
  setTimeout(() => { if (then) then(); }, ms('fast'));
}
/* something waiting on others: a soft 1 -> 1.04 -> 1 every 1.6 s until the wait ends */
export function pulse(node, on) { if (node) node.classList.toggle('ck-pulse', !!on && !still()); }
/* a list of bars grows, item after item (their --i, 50 ms apart): the class starts it */
export function grow(node) {
  if (!node || still()) return 0;
  node.classList.remove('ck-growing'); void node.offsetWidth; node.classList.add('ck-growing');
  const n = node.querySelectorAll('[style*="--i"]').length;
  return Math.max(0, n - 1) * STAGGER + ms('slow');
}

/* ------------------------------------------------------------------ the timeline ------
   One list of steps, each waiting for the one before: { at: the element it shows (or null), run(): ms until the next step may
   start }. A step whose element is still below the screen waits until the person scrolls to it, so a phone sees the bars grow
   where it is looking. Once the person scrolls, taps or types, the gaps shrink to one stagger: nothing waits on the timeline.
   With reduced motion every step runs at once and lands still. `owner`: when it leaves the page, the timeline stops. */
export function sequence(steps, owner) {
  let hurry = false, stopped = false;
  const wakers = new Set();
  const user = () => { if (hurry) return; hurry = true; for (const w of [...wakers]) w(); };
  let y0 = window.scrollY;
  const onScroll = () => { if (Math.abs(window.scrollY - y0) > 4) user(); };
  const EVS = [['wheel', user], ['touchmove', user], ['pointerdown', user], ['keydown', user], ['scroll', onScroll]];
  const gone = () => stopped || (owner && !owner.isConnected);
  const pause = (t) => new Promise((res) => {
    if (!t) return res();
    let timer = setTimeout(fin, hurry ? Math.min(t, STAGGER) : t);
    function fin() { wakers.delete(wake); res(); }
    function wake() { clearTimeout(timer); timer = setTimeout(fin, STAGGER); }
    wakers.add(wake);
  });
  /* near: in view or above it (a fast fling past it counts) */
  const near = (node) => { if (!node || !node.isConnected || !node.getClientRects().length) return true; return node.getBoundingClientRect().top < window.innerHeight * 0.92; };
  const reach = (node) => new Promise((res) => {
    if (near(node)) return res();
    let io = null;
    const fin = () => { if (io) io.disconnect(); window.removeEventListener('scroll', check); clearInterval(poll); res(); };
    const check = () => { if (gone() || near(node)) fin(); };
    if ('IntersectionObserver' in window) { io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) fin(); }, { rootMargin: '100000px 0px -8% 0px' }); io.observe(node); }
    window.addEventListener('scroll', check, { passive: true });
    const poll = setInterval(check, 500);                        /* the screen was resized, the page grew: look again now and then */
  });
  const unhide = () => { if (owner) owner.querySelectorAll('.ck-pre').forEach((n) => n.classList.remove('ck-pre')); };
  const done = (async () => {
    if (still()) { for (const s of steps) { try { s.run(); } catch (e) { /* the next step still runs */ } } unhide(); return; }
    for (let k = 0; k < 90 && owner && !owner.isConnected && !stopped; k++) await frame();   /* the page puts it in place */
    if (owner && !owner.isConnected) { unhide(); return; }
    await frame(); await frame();                                 /* mounted, and the mount's own scroll to the top is behind us */
    y0 = window.scrollY;
    for (const [ev, f] of EVS) window.addEventListener(ev, f, { passive: true, capture: true });
    try {
      for (const s of steps) {
        if (gone()) break;
        if (s.at) await reach(s.at);
        if (gone()) break;
        let gap = 0;
        try { gap = s.run() || 0; } catch (e) { if (window.console) console.warn('Check-in motion:', e); }
        await pause(gap);
      }
    } finally {
      for (const [ev, f] of EVS) window.removeEventListener(ev, f, { capture: true });
      if (!gone()) unhide();
    }
  })();
  return { done, hurry: user, stop() { stopped = true; unhide(); } };
}

/* ------------------------------------------------------------------ the slide between questions ------
   The next question comes from the right while the current one leaves to the left; Back is the mirror. With the View
   Transitions API the old screen is a picture and the new one is live underneath it from the first frame, so a tap during the
   slide lands on the new question (checkin.css lets taps through the transition's layer). Without it, the two bodies overlap
   in one grid cell for --m-base: the new one first in the page (it is the one that counts), the old one inert and on its way. */
let slideNo = 0;
const noVT = () => !document.startViewTransition || window.CHECKIN_NO_VT;
export function slide(stage, next, dir, after) {
  const swap = () => { stage.replaceChildren(next); if (after) after(); };
  if (!stage.firstElementChild || !dir) { swap(); return; }
  if (still()) { swap(); next.classList.add('ck-fadefast'); settle(next, 'ck-fadefast'); return; }
  if (!noVT()) {
    const no = ++slideNo;
    doc.dataset.ckSlide = dir > 0 ? 'fwd' : 'back';
    let vt = null;
    try { vt = document.startViewTransition(swap); } catch (e) { vt = null; }
    if (!vt) { delete doc.dataset.ckSlide; if (next.parentNode !== stage) swap(); return; }
    for (const p of [vt.ready, vt.updateCallbackDone, vt.finished]) if (p && p.catch) p.catch(() => {});
    vt.finished.then(() => { if (no === slideNo) delete doc.dataset.ckSlide; }, () => { if (no === slideNo) delete doc.dataset.ckSlide; });
    return;
  }
  byHand(stage, next, dir);
  if (after) after();
}
/* the same motion by hand; also the consent card's two optional taps, which slide forward inside the card */
export function byHand(stage, next, dir) {
  if (still() || !stage.firstElementChild) {
    stage.replaceChildren(next);
    if (still()) { next.classList.add('ck-fadefast'); settle(next, 'ck-fadefast'); }
    return;
  }
  const olds = [...stage.children];
  for (const o of olds) if (o.classList.contains('ck-going')) o.remove();              /* one still on its way: it is gone now */
  const cur = [...stage.children];
  stage.insertBefore(next, stage.firstChild);
  const inCls = dir < 0 ? 'ck-in-l' : 'ck-in-r', outCls = dir < 0 ? 'ck-out-r' : 'ck-out-l';
  next.classList.add(inCls); settle(next, inCls);
  for (const o of cur) { o.classList.add('ck-going', outCls); o.inert = true; o.setAttribute('aria-hidden', 'true'); }
  setTimeout(() => { for (const o of cur) o.remove(); }, ms('base'));
}

/* ------------------------------------------------------------------ the sheets' way out ------
   A sheet rises when it opens (checkin.css, dialog[open]). On the way out the dialog closes at once, so the page under it takes
   taps straight away, and a still picture of it sinks while its backdrop fades: both let every tap through. */
export function closeSheet(d) {
  if (!d || !d.open) return;
  if (still() || !d.isConnected) { d.close(); return; }
  const r = d.getBoundingClientRect();
  const ghost = document.createElement('div');
  ghost.className = 'ck-ghost ' + d.className; ghost.setAttribute('aria-hidden', 'true'); ghost.inert = true;
  ghost.innerHTML = d.innerHTML;
  ghost.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  Object.assign(ghost.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
  const scrim = document.createElement('div'); scrim.className = 'ck-ghost-scrim'; scrim.setAttribute('aria-hidden', 'true');
  d.close();
  document.body.appendChild(scrim); document.body.appendChild(ghost);
  setTimeout(() => { ghost.remove(); scrim.remove(); }, ms('base') + 40);
}
/* Escape and the back gesture close a sheet the same way */
export function wireSheet(d) {
  if (!d || d.dataset.ckSheet) return;
  d.dataset.ckSheet = '1';
  d.addEventListener('cancel', (e) => { if (still()) return; e.preventDefault(); closeSheet(d); });
}
