/* Logicers, the cards: the painter (me/year/draw.js, 7 Nov 2026).
   One function paints one screen of a card on a canvas, at one moment: draw(ctx, screen, env, t).
   t is the milliseconds since the screen came into view, or Infinity for "finished". The page calls it every frame while a
   screen arrives; the share picture calls it once with Infinity on a 1080 x 1350 canvas. So the picture that is shared is
   exactly the picture that was looked at: there is no second drawing to fall out of step with the first.
   The look is fixed (the site's night colours, Bricolage Grotesque and Figtree) so a card looks the same on every phone and
   in every chat it is shared to, whatever mode the phone is in.
   Motion (claude/motion-spec.md): the durations and curves are the spec's tokens (fast 180, base 340, slow 600 ms, step 100)
   and nothing here lasts past 1.2 s. Numbers COUNT (slow, out), bars and cells GROW (slow, out, one step apart), a mark POPS
   (base, spring, once), a screen's text ENTERS (8 px up, base, out). Only position, scale and opacity change.
   env, made by year.js: { T(key, vars), Tn(n, key, vars), fmt(n), pct(n), date(iso, withYear), lang, card, month(ym) }. */

export const W = 1080, H = 1350, M = 72;
export const FONT_DISPLAY = '"Bricolage Grotesque", "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
export const FONT_TEXT = '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif';
const INK = '#F3F4FF', SOFT = '#A3A9CB', BG = '#080A15', UNLIT = 'rgba(255,255,255,.075)', LINE = 'rgba(255,255,255,.12)';
const TK = { fast: 180, base: 340, slow: 600, step: 100 };

/* ---- the spec's curves ---- */
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
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
const EASE = { out: bezier(.3, .55, .35, 1), in: bezier(.4, 0, 1, 1), spring: bezier(.2, 1.1, .3, 1) };
/* progress 0..1 of something that starts `delay` ms after the screen came in and lasts `dur` ms (spring may pass 1 a little) */
export function prog(t, delay, dur, curve) {
  if (t === Infinity) return 1;
  const k = (t - delay) / dur;
  if (k <= 0) return 0;
  if (k >= 1) return 1;
  return (EASE[curve || 'out'])(k);
}
const a01 = (v) => Math.max(0, Math.min(1, v));
export const LAST = 1200;                        // no screen is still moving after this many ms

/* ---- small tools ---- */
export function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}
const font = (w, px, display) => w + ' ' + px + 'px ' + (display ? FONT_DISPLAY : FONT_TEXT);
function rr(c, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
/* the largest size (down to min) at which text fits maxW */
function fit(c, text, maxW, px, min, weight, display, clipped) {
  let s = px; c.font = font(weight, s, display);
  while (s > min && c.measureText(text).width > maxW) { s -= 2; c.font = font(weight, s, display); }
  /* tests only: a text that is still too wide at its smallest size is recorded (nothing happens unless a test made the map) */
  const log = globalThis.__YC_OVERFLOW;
  if (log && !clipped && c.measureText(text).width > maxW + 0.5) log.set(text + '|' + maxW, { text, maxW, w: Math.round(c.measureText(text).width), size: s });
  return s;
}
/* the text cut with an ellipsis when even its smallest size is too wide (a game name nobody planned for) */
function clip(c, text, maxW) {
  if (c.measureText(text).width <= maxW) return text;
  let t = String(text);
  while (t.length > 1 && c.measureText(t + '\u2026').width > maxW) t = t.slice(0, -1);
  return t.trimEnd() + '\u2026';
}
/* words wrapped to maxW; only a plain space breaks (a no-break space keeps "83 %" and "n° 4" together) */
function wrap(c, text, maxW) {
  const words = String(text).split(' '), lines = []; let cur = '';
  words.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (cur && c.measureText(t).width > maxW) { lines.push(cur); cur = w; } else cur = t; });
  if (cur) lines.push(cur);
  return lines;
}
/* text that wraps: the largest size (down to min) at which it fits in maxLines lines of maxW; { size, lines } */
function wrapFit(c, text, maxW, px, min, weight, display, maxLines) {
  let size = px, lines;
  for (;;) {
    c.font = font(weight, size, display); lines = wrap(c, text, maxW);
    const widest = Math.max.apply(null, lines.map((l) => c.measureText(l).width));
    if ((lines.length <= maxLines && widest <= maxW) || size <= min) {
      const log = globalThis.__YC_OVERFLOW;
      if (log && (lines.length > maxLines || widest > maxW + .5)) log.set(text + '|' + maxW + '|wrap', { text, maxW, lines: lines.length, size });
      return { size, lines: lines.slice(0, maxLines) };
    }
    size -= 2;
  }
}
/* a line of text that rises 8 px into place as it appears (alpha too) */
function enter(c, a) { c.globalAlpha = a01(a); c.translate(0, 8 * (1 - a01(a))); }
function text(c, s, x, y, size, color, o) {
  o = o || {};
  c.font = font(o.weight || 700, size, o.display); c.fillStyle = color; c.textAlign = o.align || 'left'; c.textBaseline = 'alphabetic';
  c.fillText(s, x, y);
}

/* ---- the frame every screen shares: the night sky, the glow of the screen's colour, the header and the footer ---- */
function frame(c, s, env, t, o) {
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, s.tint); g.addColorStop(.6, BG); g.addColorStop(1, BG);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  const gl = c.createRadialGradient(W - 110, 150, 0, W - 110, 150, 640);
  gl.addColorStop(0, hexA(s.accent, .24)); gl.addColorStop(1, hexA(s.accent, 0));
  c.fillStyle = gl; c.fillRect(0, 0, W, H);
  const a = a01(prog(t, 0, TK.base));
  c.save(); c.globalAlpha = a;
  [['#2D4FC4', 0, -12], ['#D5492F', -11, 8], ['#0D7D73', 11, 8]].forEach((d) => { c.beginPath(); c.arc(M + 26 + d[1], 96 + d[2] * 1.0, 11, 0, Math.PI * 2); c.fillStyle = d[0]; c.fill(); });
  text(c, 'Logicers', M + 66, 112, 46, INK, { weight: 800, display: true });
  text(c, env.tag, W - M, 110, 38, SOFT, { align: 'right' });
  if (env.logicer && (!o || !o.noNumber)) text(c, env.T('logicer_number', { n: env.fmt(env.logicer) }), M, H - 60, 38, INK, { weight: 800 });
  text(c, 'logicers.com', W - M, H - 60, 36, SOFT, { align: 'right' });
  c.restore();
}

/* a big number that counts from 0; returns the value shown */
function counted(t, delay, to) { return Math.round(to * prog(t, delay, TK.slow)); }

/* ============================ the screens ============================ */
const PAINT = {};

PAINT.cover = (c, s, env, t) => {
  frame(c, s, env, t, { noNumber: true });
  const cx = W / 2, cy = 520;
  [[0, -241, '#2D4FC4'], [-211, 120, '#D5492F'], [211, 120, '#0D7D73']].forEach((d, i) => {
    const k = prog(t, i * TK.step, TK.base, 'spring');
    c.save(); c.globalAlpha = a01(k);
    c.beginPath(); c.arc(cx + d[0], cy + d[1], 140 * (.85 + .15 * Math.min(1.04, k)), 0, Math.PI * 2); c.fillStyle = d[2]; c.fill();
    c.restore();
  });
  c.save(); enter(c, prog(t, 260, TK.base));
  const title = env.card.kind === 'year' ? env.T('cover_year', { y: env.card.y }) : env.T('cover_month', { month: env.month(env.card.ym) });
  const size = fit(c, title, W - 2 * M, 170, 80, 800, true);
  text(c, title, M, 930, size, INK, { weight: 800, display: true });
  c.restore();
  c.save(); enter(c, prog(t, 380, TK.base));
  if (s.logicer) text(c, env.T('logicer_number', { n: env.fmt(s.logicer) }), M, 1020, fit(c, env.T('logicer_number', { n: env.fmt(s.logicer) }), W - 2 * M, 60, 36, 800), INK, { weight: 800 });
  if (s.since) text(c, env.T('first_day', { date: env.date(s.since, env.card.kind === 'month' || String(s.since).slice(0, 4) !== String(env.card.y)) }), M, 1082, 42, SOFT, { weight: 700 });
  c.restore();
};

PAINT.days = (c, s, env, t) => {
  frame(c, s, env, t);
  c.save(); enter(c, prog(t, 60, TK.base));
  const big = env.fmt(counted(t, 120, s.days)), bigFit = fit(c, env.fmt(s.days), W - 2 * M, 300, 150, 800, true);
  text(c, big, M, 500, bigFit, s.accent, { weight: 800, display: true });
  c.restore();
  c.save(); enter(c, prog(t, 200, TK.base));
  text(c, env.Tn(s.days, 'days_played'), M, 582, fit(c, env.Tn(s.days, 'days_played'), W - 2 * M, 64, 36, 700, true), INK, { weight: 700, display: true });
  c.restore();
  const h = s.heat;
  if (h) {
    const gap = h.cols > 30 ? 3 : h.cols > 16 ? 6 : 10, areaW = W - 2 * M, areaH = 440;
    const cell = Math.max(4, Math.min(60, Math.floor((areaW - (h.cols - 1) * gap) / h.cols), Math.floor((areaH - 6 * gap) / 7)));
    const gw = h.cols * cell + (h.cols - 1) * gap, gh = 7 * cell + 6 * gap, x0 = M + (areaW - gw) / 2, y0 = 650 + (areaH - gh) / 2;
    const step = Math.min(40, 600 / Math.max(1, h.cols));
    h.cells.forEach((k) => {
      const p = prog(t, 150 + k.col * step, 300), x = x0 + k.col * (cell + gap), y = y0 + k.row * (cell + gap), sc = .6 + .4 * p;
      c.save(); c.globalAlpha = a01(p);
      c.translate(x + cell / 2, y + cell / 2); c.scale(sc, sc);
      rr(c, -cell / 2, -cell / 2, cell, cell, cell * .28);
      c.fillStyle = k.v ? hexA(s.accent, h.max > 1 ? .45 + .55 * (k.v / h.max) : 1) : UNLIT; c.fill();
      c.restore();
    });
  }
  c.save(); enter(c, prog(t, 600, TK.base));
  text(c, env.T('streak_longest'), M, 1150, 38, SOFT, { weight: 700 });
  const longest = env.Tn(s.longest, 'streak_days', { n: env.fmt(s.longest) });
  text(c, longest, M, 1218, fit(c, longest, 440, 68, 36, 800, true), INK, { weight: 800, display: true });
  const games = env.Tn(s.games, 'games', { n: env.fmt(s.games) });
  text(c, games, W - M, 1218, fit(c, games, 440, 68, 36, 800, true), INK, { weight: 800, display: true, align: 'right' });
  c.restore();
};

PAINT.spot = (c, s, env, t) => {
  frame(c, s, env, t);
  const cx = W / 2, cy = 570, R = 290, lw = 62;
  c.save(); c.globalAlpha = a01(prog(t, 0, TK.base));
  c.lineWidth = lw; c.lineCap = 'round'; c.strokeStyle = UNLIT;
  c.beginPath(); c.arc(cx, cy, R, 0, Math.PI * 2); c.stroke();
  c.restore();
  const p = prog(t, 100, TK.slow);
  if (p > 0 && s.pct > 0) {
    c.lineWidth = lw; c.lineCap = 'round'; c.strokeStyle = s.accent;
    c.beginPath(); c.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (Math.min(100, s.pct) / 100) * p); c.stroke();
  }
  c.save(); c.globalAlpha = a01(prog(t, 100, TK.base));
  const shown = env.pct(Math.round(s.pct * p)), size = fit(c, env.pct(s.pct), 440, 230, 90, 800, true);
  text(c, shown, cx, cy + size * .32, size, INK, { weight: 800, display: true, align: 'center' });
  text(c, env.T('spot_caption'), cx, cy + size * .32 + 76, fit(c, env.T('spot_caption'), 420, 56, 32, 700), SOFT, { weight: 700, align: 'center' });
  c.restore();
  if (s.best) {
    c.save(); enter(c, prog(t, 500, TK.base));
    text(c, env.T('best_game'), M, 1000, 38, SOFT, { weight: 700 });
    rr(c, M, 1030, 14, 150, 7); c.fillStyle = s.best.colour; c.fill();
    const bsz = fit(c, s.best.name, W - 2 * M - 40, 76, 40, 800, true, true);
    text(c, clip(c, s.best.name, W - 2 * M - 40), M + 40, 1100, bsz, s.best.colour, { weight: 800, display: true });
    const line = env.T('spot_of', { n: env.fmt(s.best.spotOn), of: env.fmt(s.best.played) });
    text(c, line, M + 40, 1162, fit(c, line, W - 2 * M - 40, 44, 28, 700), INK, { weight: 700 });
    c.restore();
  }
};

PAINT.words = (c, s, env, t) => {
  frame(c, s, env, t);
  c.save(); enter(c, prog(t, 0, TK.base));
  text(c, env.T('words_label'), M, 236, fit(c, env.T('words_label'), W - 2 * M, 44, 30, 700), SOFT, { weight: 700 });
  c.restore();
  c.save(); enter(c, prog(t, 80, TK.base));
  if (s.highest >= 2) {
    text(c, env.fmt(counted(t, 120, s.highest)), M, 500, 300, s.accent, { weight: 800, display: true });
    text(c, env.T('letters'), M, 582, fit(c, env.T('letters'), W - 2 * M, 64, 36, 700, true), INK, { weight: 700, display: true });
  } else {
    const b = env.T('base_camp');
    text(c, b, M, 470, fit(c, b, W - 2 * M, 150, 60, 800, true), s.accent, { weight: 800, display: true });
  }
  c.restore();
  /* the mountain: seven bands, 2 to 8 letters from the bottom; the bands up to the best height fill in, one step apart, and a flag stands on the top one */
  const apexY = 650, baseY = 1070, bandH = (baseY - apexY) / 7, level = Math.max(0, Math.min(7, s.highest - 1));
  c.save();
  c.beginPath(); c.moveTo(W / 2, apexY); c.lineTo(W - M, baseY); c.lineTo(M, baseY); c.closePath();
  c.fillStyle = UNLIT; c.fill(); c.clip();
  for (let k = 1; k <= level; k++) {
    const p = prog(t, 250 + (k - 1) * TK.step * .7, TK.base), h = bandH * p;
    c.fillStyle = hexA(s.accent, .38 + .62 * (k / 7)); c.fillRect(M, baseY - (k - 1) * bandH - h, W - 2 * M, h + 1);
  }
  c.strokeStyle = BG; c.lineWidth = 5;
  for (let k = 1; k < 7; k++) { c.beginPath(); c.moveTo(M, baseY - k * bandH); c.lineTo(W - M, baseY - k * bandH); c.stroke(); }
  c.restore();
  const fp = prog(t, 250 + level * TK.step * .7 + 120, TK.base, 'spring');
  if (level > 0 && fp > 0) {
    const fy = baseY - level * bandH;
    c.save(); c.globalAlpha = a01(fp); c.translate(W / 2, fy); c.scale(.85 + .15 * Math.min(1.04, fp), .85 + .15 * Math.min(1.04, fp));
    c.fillStyle = INK; c.fillRect(-3, -96, 6, 96);
    c.beginPath(); c.moveTo(3, -96); c.lineTo(66, -76); c.lineTo(3, -56); c.closePath(); c.fillStyle = s.accent; c.fill();
    c.restore();
  }
  c.save(); enter(c, prog(t, 600, TK.base));
  const cl = env.Tn(s.climbs, 'climbs', { n: env.fmt(s.climbs) });
  text(c, cl, M, 1210, fit(c, cl, s.perfect > 0 ? 440 : W - 2 * M, 64, 34, 800, true), INK, { weight: 800, display: true });
  if (s.perfect > 0) { const pf = env.Tn(s.perfect, 'perfect', { n: env.fmt(s.perfect) }); text(c, pf, W - M, 1210, fit(c, pf, 440, 64, 34, 800, true), INK, { weight: 800, display: true, align: 'right' }); }
  c.restore();
};

PAINT.story = (c, s, env, t) => {
  frame(c, s, env, t);
  c.save(); enter(c, prog(t, 60, TK.base));
  text(c, env.fmt(counted(t, 120, s.chapters)), M, 500, fit(c, env.fmt(s.chapters), W - 2 * M, 300, 150, 800, true), s.accent, { weight: 800, display: true });
  c.restore();
  c.save(); enter(c, prog(t, 200, TK.base));
  const cap = env.Tn(s.chapters, 'story_chapters');
  text(c, cap, M, 582, fit(c, cap, W - 2 * M, 64, 36, 700, true), INK, { weight: 700, display: true });
  c.restore();
  /* one dot per chapter read, a week to a row of seven */
  const cols = 7, shown = Math.min(s.chapters, 42), total = Math.min(42, Math.max(7, Math.ceil(s.chapters / 7) * 7)), r = 26, pitch = 74;
  const step = Math.min(24, 650 / Math.max(1, total));
  for (let i = 0; i < total; i++) {
    const col = i % cols, row = Math.floor(i / cols), x = M + r + col * pitch, y = 690 + r + row * pitch;
    const lit = i < shown, p = lit ? prog(t, 200 + i * step, 300) : prog(t, 100, TK.base);
    c.save(); c.globalAlpha = a01(p); c.translate(x, y); c.scale(.6 + .4 * Math.min(1.04, p), .6 + .4 * Math.min(1.04, p));
    c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fillStyle = lit ? s.accent : UNLIT; c.fill(); c.restore();
  }
  c.save(); enter(c, prog(t, 600, TK.base));
  if (s.votes > 0) {
    const v = env.Tn(s.votes, 'story_votes', { n: env.fmt(s.votes) });
    text(c, v, 640, 760, fit(c, v, W - M - 640, 64, 34, 800, true), INK, { weight: 800, display: true });
    if (s.pct !== null) {
      const w = env.T('story_with', { pct: env.pct(s.pct) });
      const wf = wrapFit(c, w, W - M - 640, 56, 30, 800, true, 3);
      wf.lines.forEach((ln, i) => text(c, ln, 640, 850 + i * (wf.size + 10), wf.size, s.accent, { weight: 800, display: true }));
    }
  }
  c.restore();
};

PAINT.percent = (c, s, env, t) => {
  frame(c, s, env, t);
  c.save(); enter(c, prog(t, 0, TK.base));
  const cap = env.T('pct_caption');
  let size = 62; c.font = font(700, size, true);
  let lines = wrap(c, cap, W - 2 * M);
  while (lines.length > 3 && size > 36) { size -= 2; c.font = font(700, size, true); lines = wrap(c, cap, W - 2 * M); }
  lines.forEach((ln, i) => text(c, ln, M, 250 + i * (size + 10), size, INK, { weight: 700, display: true }));
  c.restore();
  /* a hundred small figures, as in 100 of Us: the share of Logicers who played fewer days than you lights up, row by row */
  const pitch = 63, r = 26, gw = 9 * pitch + 2 * r, x0 = (W - gw) / 2 + r, y0 = 400 + r;
  for (let i = 0; i < 100; i++) {
    const col = i % 10, row = Math.floor(i / 10), lit = i < s.pct, p = lit ? prog(t, 150 + i * 6, 220) : prog(t, 60, TK.base);
    c.save(); c.globalAlpha = a01(p); c.translate(x0 + col * pitch, y0 + row * pitch); c.scale(.6 + .4 * Math.min(1.04, p), .6 + .4 * Math.min(1.04, p));
    c.beginPath(); c.arc(0, 0, r, 0, Math.PI * 2); c.fillStyle = lit ? s.accent : UNLIT; c.fill(); c.restore();
  }
  const shown = env.pct(Math.round(s.pct * prog(t, 150, TK.slow)));
  c.save(); enter(c, prog(t, 100, TK.base));
  text(c, shown, M, 1192, fit(c, env.pct(s.pct), W - 2 * M, 200, 90, 800, true), s.accent, { weight: 800, display: true });
  c.restore();
};

/* the closing line is written with its numbers and a game's name marked, so they can be lit in the screen's colour:
   \u0001 ... \u0002 around a mark. Words are cut at plain spaces only. */
export function mark(v) { return '\u0001' + v + '\u0002'; }
function richWords(str) {
  const words = []; let cur = []; let hi = false, buf = '';
  const flush = () => { if (buf) { cur.push({ t: buf, hi }); buf = ''; } };
  const end = () => { flush(); if (cur.length) { words.push(cur); cur = []; } };
  for (const ch of String(str)) {
    if (ch === '\u0001') { flush(); hi = true; } else if (ch === '\u0002') { flush(); hi = false; } else if (ch === ' ') end(); else buf += ch;
  }
  end();
  return words;
}
PAINT.closing = (c, s, env, t) => {
  frame(c, s, env, t);
  [['#2D4FC4', 0], ['#D5492F', 1], ['#0D7D73', 2]].forEach((d) => {
    const k = prog(t, d[1] * TK.step, TK.base, 'spring');
    c.save(); c.globalAlpha = a01(k); c.beginPath(); c.arc(M + 26 + d[1] * 70, 330, 26 * (.85 + .15 * Math.min(1.04, k)), 0, Math.PI * 2); c.fillStyle = d[0]; c.fill(); c.restore();
  });
  const vars = {};
  Object.keys(s.line.vars).forEach((k) => { vars[k] = k === 'game' ? mark(s.line.vars[k]) : mark(typeof s.line.vars[k] === 'number' ? env.fmt(s.line.vars[k]) : s.line.vars[k]); });
  const words = richWords(env.T(s.line.key, vars));
  let size = 122, lines, lh;
  for (;;) {
    c.font = font(800, size, true); lh = size * 1.12; lines = []; let cur = [], curW = 0; const sp = c.measureText(' ').width;
    words.forEach((w) => {
      const ww = w.reduce((a, seg) => a + c.measureText(seg.t).width, 0);
      if (cur.length && curW + sp + ww > W - 2 * M) { lines.push(cur); cur = [w]; curW = ww; } else { curW += (cur.length ? sp : 0) + ww; cur.push(w); }
    });
    if (cur.length) lines.push(cur);
    if (lines.length <= 5 || size <= 56) break;
    size -= 4;
  }
  c.save(); enter(c, prog(t, 220, TK.base));
  c.font = font(800, size, true); c.textBaseline = 'alphabetic'; c.textAlign = 'left';
  const sp = c.measureText(' ').width;
  lines.forEach((ln, i) => {
    let x = M; const y = 560 + i * lh;
    ln.forEach((w, wi) => { if (wi) x += sp; w.forEach((seg) => { c.fillStyle = seg.hi ? s.accent : INK; c.fillText(seg.t, x, y); x += c.measureText(seg.t).width; }); });
  });
  c.restore();
};

/* ============================ the entry points ============================ */
export function draw(c, s, env, t) {
  c.save();
  c.clearRect(0, 0, W, H);
  (PAINT[s.id] || PAINT.closing)(c, s, env, t === undefined ? Infinity : t);
  c.restore();
}
/* what a screen says, as plain sentences, for the page's screen-reader copy and the picture's alt text: the same keys as the painting */
export function plain(s, env) {
  const T = env.T, out = [];
  const title = env.card.kind === 'year' ? T('cover_year', { y: env.card.y }) : T('cover_month', { month: env.month(env.card.ym) });
  switch (s.id) {
    case 'cover': out.push(title); if (s.logicer) out.push(T('logicer_number', { n: env.fmt(s.logicer) })); if (s.since) out.push(T('first_day', { date: env.date(s.since, true) })); break;
    case 'days': out.push(env.fmt(s.days) + ' ' + env.Tn(s.days, 'days_played'), T('streak_longest') + ' ' + env.Tn(s.longest, 'streak_days', { n: env.fmt(s.longest) }), env.Tn(s.games, 'games', { n: env.fmt(s.games) })); break;
    case 'spot': out.push(env.pct(s.pct) + ' ' + T('spot_caption')); if (s.best) out.push(T('best_game') + ': ' + s.best.name + ', ' + T('spot_of', { n: env.fmt(s.best.spotOn), of: env.fmt(s.best.played) })); break;
    case 'words': out.push(T('words_label') + ': ' + (s.highest >= 2 ? env.fmt(s.highest) + ' ' + T('letters') : T('base_camp')), env.Tn(s.climbs, 'climbs', { n: env.fmt(s.climbs) })); if (s.perfect > 0) out.push(env.Tn(s.perfect, 'perfect', { n: env.fmt(s.perfect) })); break;
    case 'story': out.push(env.fmt(s.chapters) + ' ' + env.Tn(s.chapters, 'story_chapters')); if (s.votes > 0) { out.push(env.Tn(s.votes, 'story_votes', { n: env.fmt(s.votes) })); if (s.pct !== null) out.push(T('story_with', { pct: env.pct(s.pct) })); } break;
    case 'percent': out.push(T('pct_caption') + ' ' + env.pct(s.pct)); break;
    default: {
      const v = {}; Object.keys(s.line.vars).forEach((k) => { v[k] = typeof s.line.vars[k] === 'number' ? env.fmt(s.line.vars[k]) : s.line.vars[k]; });
      out.push(T(s.line.key, v));
    }
  }
  return out;
}
