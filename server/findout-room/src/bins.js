/* The strips' bins, one table for the room server. Copied from the find-out Worker's METRICS
   (server/findout/src/worker.js) so a room's chart and the world's curve line up bin for bin.
   A phone sends the 0-based index of the bin its score fell in: index = round((score - lo) / step).
   Game 1 is the Outgoing bar (the strip its reveal shows); game 9 has no score and no bin. */
"use strict";
export const BINS = {
  1: { lo: 1, hi: 5, step: 0.5 },    // the Outgoing trait: 9 bins
  2: { lo: 1, hi: 5, step: 0.25 },   // 17
  3: { lo: 0, hi: 24, step: 1 },     // 25
  4: { lo: 0, hi: 4, step: 1 },      // 5
  5: { lo: 0, hi: 10, step: 0.5 },   // 21
  6: { lo: 0, hi: 4, step: 1 },      // 5 (riddles right)
  7: { lo: 0, hi: 10, step: 0.5 },   // 21
  8: { lo: 1, hi: 5, step: 0.25 },   // 17
};
export function binCount(game) { const b = BINS[game]; return b ? Math.round((b.hi - b.lo) / b.step) + 1 : 0; }
