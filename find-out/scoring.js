// Find out about yourself: scoring for the nine games.
// Rules: claude/find-outs-scoring.md (rules version 1, 21 Oct 2026), written from the item sheet
// (claude/find-outs-items.md, version 1). Plain ES module with no dependencies; runs in the browser,
// in a Cloudflare Worker and in Node.
//
// Raw answers are the record; everything here is derived and can be rebuilt from them.
// Bands are decided with whole-number arithmetic on sums (never by comparing a rounded decimal).

export const RULES_VERSION = '1';

// ---------------------------------------------------------------- the spec, from the item sheet

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));

export const SPEC = Object.freeze({
  1: {
    name: "What's your type?",
    keys: range(1, 10),
    scale: [1, 5],
    reversed: ['1', '3', '4', '5', '7'], // 6 - x
    traits: { E: ['1', '6'], A: ['2', '7'], C: ['3', '8'], N: ['4', '9'], O: ['5', '10'] },
    bands: null,
  },
  2: {
    name: 'Who calls the shots?',
    keys: ['POP1', 'POP2', 'POP3', 'POP4', 'POP5', 'POP7'],
    scale: [1, 5],
    bands: ["The system's friend", 'The watchful middle', "The people's champion"], // < 8/3 · < 11/3 · rest
  },
  3: {
    name: 'Sunny or cloudy?',
    keys: range(1, 9),
    scale: [0, 4],
    scored: ['1', '3', '4', '7', '8', '9'],
    reversed: ['3', '7', '8'], // 4 - x
    fillers: ['2', '5'],
    attention: '6',
    attentionValue: 3, // "agree"
    bands: ['The realist', 'The hopeful realist', 'The sunny side'], // < 12 · < 18 · rest (on 0-24)
  },
  4: {
    name: 'What makes a good kid?',
    keys: range(1, 6),
    pairs: {
      1: { options: ['Independence', 'Respect for elders'], authoritarian: 'Respect for elders' },
      2: { options: ['Curiosity', 'Good manners'], authoritarian: 'Good manners' },
      3: { options: ['A big imagination', 'A good memory'], authoritarian: null }, // filler (ours)
      4: { options: ['Obedience', 'Self-reliance'], authoritarian: 'Obedience' },
      5: { options: ['Being considerate', 'Well behaved'], authoritarian: 'Well behaved' },
      6: { options: ['One best friend', 'Lots of friends'], authoritarian: null }, // filler (ours)
    },
    bands: ['Wings', 'A bit of both', 'Roots'], // nearest whole count: 0-1 · 2 · 3-4
  },
  5: {
    name: 'Is there more to the story?',
    keys: range(1, 5),
    scale: [0, 10],
    bands: ['The straight reader', 'The raised eyebrow', 'The detective'], // < 4 · < 6.5 · rest
  },
  6: {
    name: 'Think twice?',
    keys: range(1, 4),
    extraKeys: ['seen_before'],
    riddles: {
      1: { correct: 'Second', lure: 'First', other: ['Third', 'Last'] },
      2: { correct: '8', lure: '7', other: ['15', '0'] },
      3: { correct: 'Emily', lure: 'June', other: ['July', 'March'] },
      4: { correct: 'None', lure: '27', other: ['9', '3'] },
    },
    bands: ['Fast and sure', 'Quick with a check', 'Takes a second look'], // 0-1 · 2 · 3-4
  },
  7: {
    name: 'Who would you believe?',
    keys: ['B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'grandmother'],
    scale: [0, 10],
    bandItems: ['B6', 'B7', 'B8', 'B9', 'B10', 'B12'], // B11 (EU only) and the filler never count
    bands: ['The careful checker', 'The balanced truster', 'The trusting citizen'], // < 4 · < 6.5 · rest
  },
  8: {
    name: 'Home sweet home?',
    keys: ['Q3a', 'Q3b', 'Q3c', 'Q3d', 'Q3e', 'Q3f'],
    scale: [1, 5], // ISSP codes: 1 = Agree strongly ... 5 = Disagree strongly
    index: ['Q3a', 'Q3c', 'Q3d', 'Q3e'], // reversed (6 - code): higher = more chauvinist
    single: ['Q3b', 'Q3f'],
    bands: ['World citizen', 'At home in both', 'Home first'], // < 8/3 · < 11/3 · rest
  },
  9: {
    name: 'Quick ones',
    keys: range(1, 9),
    scales: { 1: [0, 10], 2: [0, 10], 3: [1, 10], 4: [0, 10], 5: [1, 4], 6: [0, 10], 7: [0, 10], 8: [0, 10], 9: [1, 2] },
    bands: null,
  },
});

// ---------------------------------------------------------------- helpers

// Two-thirds of n, rounded up, in whole numbers: ceil(2n/3) = floor((2n + 2) / 3).
export const needed = (n) => Math.floor((2 * n + 2) / 3);

function fail(game, msg) {
  throw new RangeError(`game ${game}: ${msg}`);
}

function checkShape(game, answers, allowed) {
  if (answers === null || typeof answers !== 'object' || Array.isArray(answers)) {
    throw new TypeError(`game ${game}: answers must be an object of item key -> value`);
  }
  for (const k of Object.keys(answers)) {
    if (!allowed.includes(k)) fail(game, `unknown item "${k}"`);
  }
}

// null or absent -> null (not answered); otherwise a whole number inside the scale, or an error.
function wholeNumber(game, key, v, lo, hi) {
  if (v === null || v === undefined) return null;
  if (typeof v !== 'number' || !Number.isInteger(v) || v < lo || v > hi) {
    fail(game, `item "${key}" must be a whole number ${lo}-${hi} or null, got ${JSON.stringify(v)}`);
  }
  return v;
}

function choice(game, key, v, options) {
  if (v === null || v === undefined) return null;
  if (typeof v !== 'string' || !options.includes(v)) {
    fail(game, `item "${key}" must be one of ${JSON.stringify(options)} or null, got ${JSON.stringify(v)}`);
  }
  return v;
}

const base = (game, total, answered) => {
  const need = needed(total);
  return { game, rules_version: RULES_VERSION, total, answered, needed: need, scored: answered >= need, score: null, band: null };
};

// Band for a mean S/n against the exact thirds 8/3 and 11/3 (games 2 and 8).
const thirdsBand = (S, n) => (3 * S < 8 * n ? 0 : 3 * S < 11 * n ? 1 : 2);
// Band for a mean S/n on 0-10 against 4 and 6.5, as lower bounds (games 5 and 7).
const tenBand = (S, n) => (S < 4 * n ? 0 : 2 * S < 13 * n ? 1 : 2);

// ---------------------------------------------------------------- the games

function game1(a) {
  const s = SPEC[1];
  checkShape(1, a, s.keys);
  const v = {};
  for (const k of s.keys) {
    const x = wholeNumber(1, k, a[k], ...s.scale);
    v[k] = x === null ? null : s.reversed.includes(k) ? 6 - x : x;
  }
  const answered = s.keys.filter((k) => v[k] !== null).length;
  const r = base(1, s.keys.length, answered);
  r.traits = null;
  r.calm = null;
  if (r.scored) {
    const traits = {};
    for (const [t, [i, j]] of Object.entries(s.traits)) {
      traits[t] = v[i] !== null && v[j] !== null ? (v[i] + v[j]) / 2 : null; // both items needed (G4)
    }
    r.traits = traits;
    r.calm = traits.N === null ? null : 6 - traits.N;
  }
  return r;
}

function meanGame(game, itemKeys, value, bandOf) {
  const s = SPEC[game];
  let S = 0, n = 0;
  for (const k of itemKeys) {
    const x = value(k);
    if (x !== null) { S += x; n += 1; }
  }
  const r = base(game, itemKeys.length, n);
  if (r.scored) {
    r.score = S / n;
    r.band = s.bands[bandOf(S, n)];
  }
  return r;
}

function game2(a) {
  const s = SPEC[2];
  checkShape(2, a, s.keys);
  const v = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(2, k, a[k], ...s.scale)]));
  return meanGame(2, s.keys, (k) => v[k], thirdsBand);
}

function game3(a) {
  const s = SPEC[3];
  checkShape(3, a, s.keys);
  const raw = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(3, k, a[k], ...s.scale)]));
  let S = 0, n = 0;
  for (const k of s.scored) {
    const x = raw[k];
    if (x !== null) { S += s.reversed.includes(k) ? 4 - x : x; n += 1; }
  }
  const r = base(3, s.scored.length, n);
  r.mean = null;
  r.prorated = false;
  if (r.scored) {
    r.score = n === s.scored.length ? S : (s.scored.length * S) / n;
    r.mean = S / n;
    r.prorated = n < s.scored.length;
    // 6S/n < 12  <=>  S < 2n ;  6S/n < 18  <=>  S < 3n
    r.band = s.bands[S < 2 * n ? 0 : S < 3 * n ? 1 : 2];
  }
  r.attention_passed = raw[s.attention] === s.attentionValue;
  return r;
}

function game4(a) {
  const s = SPEC[4];
  checkShape(4, a, s.keys);
  let C = 0, n = 0;
  for (const k of s.keys) {
    const p = s.pairs[k];
    const x = choice(4, k, a[k], p.options);
    if (p.authoritarian !== null && x !== null) {
      n += 1;
      if (x === p.authoritarian) C += 1;
    }
  }
  const pairs = Object.values(s.pairs).filter((p) => p.authoritarian !== null).length;
  const r = base(4, pairs, n);
  r.share = null;
  r.count = null;
  r.pairs_answered = n;
  if (r.scored) {
    r.share = C / n;
    r.count = C;
    r.score = (4 * C) / n;
    // nearest whole count, then 0-1 / 2 / 3-4:  4C/n < 1.5 <=> 8C < 3n ;  4C/n < 2.5 <=> 8C < 5n.
    // 4C/n never ends in .5 for n = 3 or 4, so there are no ties.
    r.band = s.bands[8 * C < 3 * n ? 0 : 8 * C < 5 * n ? 1 : 2];
  }
  return r;
}

function game5(a) {
  const s = SPEC[5];
  checkShape(5, a, s.keys);
  const v = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(5, k, a[k], ...s.scale)]));
  return meanGame(5, s.keys, (k) => v[k], tenBand);
}

function game6(a) {
  const s = SPEC[6];
  checkShape(6, a, [...s.keys, ...s.extraKeys]);
  const codes = {};
  let answered = 0, correct = 0;
  for (const k of s.keys) {
    const q = s.riddles[k];
    const x = choice(6, k, a[k], [q.correct, q.lure, ...q.other]);
    if (x === null) { codes[k] = 'skipped'; continue; }
    answered += 1;
    if (x === q.correct) { codes[k] = 'correct'; correct += 1; }
    else codes[k] = x === q.lure ? 'lure' : 'other';
  }
  const seen = a.seen_before;
  if (!(seen === undefined || seen === null || seen === true || seen === false)) {
    fail(6, `"seen_before" must be true, false or null, got ${JSON.stringify(seen)}`);
  }
  const r = base(6, s.keys.length, answered);
  if (r.scored) {
    r.score = correct; // a skipped riddle counts as not correct
    r.band = s.bands[correct <= 1 ? 0 : correct === 2 ? 1 : 2];
  }
  r.codes = codes;
  r.seen_before = seen === undefined ? null : seen;
  return r;
}

function game7(a) {
  const s = SPEC[7];
  checkShape(7, a, s.keys);
  const v = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(7, k, a[k], ...s.scale)]));
  const r = meanGame(7, s.bandItems, (k) => v[k], tenBand);
  r.items = v;
  return r;
}

function game8(a) {
  const s = SPEC[8];
  checkShape(8, a, s.keys);
  const v = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(8, k, a[k], ...s.scale)]));
  const r = meanGame(8, s.index, (k) => (v[k] === null ? null : 6 - v[k]), thirdsBand);
  r.single = Object.fromEntries(s.single.map((k) => [k, v[k]]));
  return r;
}

function game9(a) {
  const s = SPEC[9];
  checkShape(9, a, s.keys);
  const items = Object.fromEntries(s.keys.map((k) => [k, wholeNumber(9, k, a[k], ...s.scales[k])]));
  const answered = s.keys.filter((k) => items[k] !== null).length;
  return { game: 9, rules_version: RULES_VERSION, total: s.keys.length, answered, needed: null, scored: null, score: null, band: null, items };
}

const GAMES = { 1: game1, 2: game2, 3: game3, 4: game4, 5: game5, 6: game6, 7: game7, 8: game8, 9: game9 };

// ---------------------------------------------------------------- public

export function scoreGame(game, answers) {
  const f = GAMES[game];
  if (!Number.isInteger(game) || !f) throw new RangeError(`unknown game ${JSON.stringify(game)} (1-9)`);
  return f(answers);
}

// { 1: answers, 2: answers, ... } -> { 1: result, ... } for the games present.
export function scoreAll(byGame) {
  const out = {};
  for (const [g, answers] of Object.entries(byGame)) out[g] = scoreGame(Number(g), answers);
  return out;
}
