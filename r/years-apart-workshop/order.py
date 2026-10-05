"""Finds an order of play for the puzzles (C) and prints it, to be copied into ORDER in puzzles.py.

Rules, also across the loop from the last day back to day 1:
  - day 1 is fixed (the strongest puzzle); EARLY puzzles are pulled towards the first ten days
  - neighbours differ in the topic of the middle event (the colour of the stamp)
  - no event appears in two neighbouring puzzles, in any role
  - the true spots of neighbours are at least 12 percent of the line apart
  - the same middle event comes back at most every 8 days, the same line (both ends) at most every 14
It searches by swapping (simulated annealing) until no rule is broken. Used only once, before day 1:
once puzzles are live their order never changes.
"""
import math, random
from events import EVENTS
from puzzles import PUZZLES
from common import spot

FIRST = 'cleopatra-pyramid-moon'
EARLY = ['titanic-wright-moon', 'bastille-firelondon-titanic', 'pompeii-caesar-moon', 'google-berlinwall-iphone',
         'nintendo-waterloo-moon', 'waterloo-caesar-iphone', 'shakespeare-magna-iphone', 'hagia-olympia-athens']
P = {p['id']: p for p in PUZZLES}
F = {k: spot(p)[0] for k, p in P.items()}
T = {k: EVENTS[P[k]['mid']]['topic'] for k in P}
E = {k: {P[k]['left'], P[k]['mid'], P[k]['right']} for k in P}
N = len(P)

def cost(seq):
    c = 0
    for i in range(N):
        a, b = seq[i], seq[(i + 1) % N]
        if T[a] == T[b]: c += 1
        if E[a] & E[b]: c += 1
        if abs(F[a] - F[b]) < 0.12: c += 1
        for d in range(2, 15):
            j = seq[(i + d) % N]
            if d < 8 and P[a]['mid'] == P[j]['mid']: c += 1
            if (P[a]['left'], P[a]['right']) == (P[j]['left'], P[j]['right']): c += 1
    for k in EARLY:                      # soft: the strong ones early
        c += 0.05 * max(0, seq.index(k) - 9)
    return c

def anneal(seed):
    rnd = random.Random(seed)
    rest = [k for k in P if k != FIRST]; rnd.shuffle(rest)
    seq = [FIRST] + rest
    cur = cost(seq); temp = 2.0
    for step in range(60000):
        i, j = rnd.randrange(1, N), rnd.randrange(1, N)
        if i == j: continue
        seq[i], seq[j] = seq[j], seq[i]
        new = cost(seq)
        if new <= cur or rnd.random() < math.exp((cur - new) / temp):
            cur = new
        else:
            seq[i], seq[j] = seq[j], seq[i]
        temp = max(0.02, temp * 0.9997)
        if cur < 1: break
    return seq, cur

if __name__ == '__main__':
    for seed in range(20):
        seq, c = anneal(seed)
        hard = c - sum(0.05 * max(0, seq.index(k) - 9) for k in EARLY)
        print('seed', seed, 'cost', round(c, 3), 'hard', round(hard, 3))
        if hard < 0.5:
            print('ORDER = [' + ',\n         '.join(', '.join(repr(x) for x in seq[i:i + 3]) for i in range(0, N, 3)) + ']')
            break
