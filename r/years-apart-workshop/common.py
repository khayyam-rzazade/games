"""Shared arithmetic of the Years Apart workshop: dates as points in time, gaps in years, where the middle event falls."""
import datetime
from events import EVENTS

UNCERTAIN = {'day': 1 / 365.25, 'month': 1 / 12, 'year': 0.5, 'about': 20.0}   # how far (in years) a date may be off, by how exact it is

def astro(y):
    """Historical year -> astronomical year (there is no year 0: 1 BC is 0, 2 BC is -1)."""
    return y + 1 if y < 0 else y

def point(eid):
    """The event as a decimal year: day-exact dates at their day, month dates mid-month, year dates mid-year."""
    y, m, d = EVENTS[eid]['date']
    prec = EVENTS[eid]['prec']
    a = astro(y)
    if prec == 'day':
        return a + ((datetime.date(2001, m, d) - datetime.date(2001, 1, 1)).days + 0.5) / 365.25
    if prec == 'month':
        return a + (m - 0.5) / 12
    return a + 0.5

def years_between(a, b):
    """Whole years from event a to event b, as a sentence would say them.
    Both known to the day or month: the elapsed time, rounded. Otherwise the difference of the years (no year 0)."""
    pa, pb = EVENTS[a]['prec'], EVENTS[b]['prec']
    if pa in ('day', 'month') and pb in ('day', 'month'):
        return int(round(point(b) - point(a)))
    ya, yb = EVENTS[a]['date'][0], EVENTS[b]['date'][0]
    return astro(yb) - astro(ya)

def about(*ids):
    return any(EVENTS[i]['prec'] == 'about' for i in ids)

def spot(p):
    """Where the middle event falls on the line, from 0 (left end) to 1 (right end), and how far that may move
    if each date is off by as much as its exactness allows (worst case, as a share of the line)."""
    L, M, R = point(p['left']), point(p['mid']), point(p['right'])
    f = (M - L) / (R - L)
    uL, uM, uR = (UNCERTAIN[EVENTS[p[k]]['prec']] for k in ('left', 'mid', 'right'))
    move = (uM + uL * (1 - f) + uR * f) / (R - L)
    return f, move, R - L

def year_label(eid):
    """How the year is shown: 'about 2560 BC', '30 BC', 'AD 79', '1066'."""
    y = EVENTS[eid]['date'][0]
    s = (f'{-y} BC' if y < 0 else (f'AD {y}' if y < 1000 else str(y)))
    return ('about ' if EVENTS[eid]['prec'] == 'about' else '') + s
