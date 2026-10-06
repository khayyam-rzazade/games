"""The little pictures of the site: logo mark, icons and one drawing per game."""
MARK = '<svg class="mark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="6.2" r="4.1"/><circle cx="5.3" cy="17.8" r="4.1"/><circle cx="18.7" cy="17.8" r="4.1"/></svg>'
FLAME = '<svg class="flame" viewBox="0 0 20 20" aria-hidden="true"><path d="M10.4 1.6c.5 3-1.2 4.3-2.6 5.9C6.3 9.2 5 10.8 5 13a5 5 0 0 0 10 0c0-1.7-.7-3.2-1.500-4.300-.3 1-.9 1.700-1.700 2.100.5-3.400-.2-6.800-1.400-9.200z"/></svg>'.replace('1.500-4.300', '1.5-4.3').replace('1.700-1.700 2.100.5-3.400-.2-6.800-1.400-9.200', '1.7-1.7 2.1.5-3.4-.2-6.8-1.4-9.2')
CHECK = '<svg class="check" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path d="M5.6 10.4l3 3 5.8-6.4" fill="none" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ARROW = '<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5L15 10l-4.500 4.500" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'.replace('-4.500 4.500', '-4.5 4.5')
CHEVRON = '<svg class="chev" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'   # the buttons at the ends of the shelf (turned round for "back")

def n(v):
    s = ('%.1f' % v).rstrip('0').rstrip('.')
    return s

def art_hundred(lit=42):
    s = []; k = 0
    for r in range(5):
        for c in range(20):
            x = 22 + c * 14.5; y = 34 + r * 31
            s.append(f'<g class="{"fg" if k < lit else "mute"}"><circle cx="{n(x)}" cy="{y}" r="3.6"/><path d="M{n(x-5.2)} {y+16}v-5.2a5.2 5.2 0 0 1 10.4 0v5.2z"/></g>')
            k += 1
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_call():
    rows = []
    for i, y in enumerate([30, 81, 132]):
        on = (i == 1)
        rows.append(f'<g class="{"pick" if on else "opt"}"><rect class="pill" x="46" y="{y}" width="228" height="38" rx="19"/>'
                    f'<circle class="dot" cx="67" cy="{y+19}" r="8.5"/>'
                    + (f'<path class="tick" d="M62.6 {n(y+19.4)}l3 3 5.6-6.2" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' if on else '')
                    + f'<rect class="txt" x="88" y="{n(y+14.5)}" width="{[118, 150, 96][i]}" height="9" rx="4.5"/></g>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(rows) + '</svg>'

def art_street():
    hs = [34, 42, 40, 52, 58, 70, 78, 92, 108]
    s = ['<rect class="mute" x="18" y="158" width="284" height="5" rx="2.5"/>']
    x = 26
    for i, h in enumerate(hs):
        w = 24; top = 158 - h; roof = 13 + (i % 3) * 2
        s.append(f'<path class="{"hi" if i == 5 else "fg"}" d="M{x} {top}l{n(w/2)} -{roof} {n(w/2)} {roof}V158H{x}z"/>')
        wy = top + 8
        while wy < 158 - 22:
            s.append(f'<rect class="cut" x="{x+5}" y="{wy}" width="5" height="6" rx="1"/><rect class="cut" x="{x+14}" y="{wy}" width="5" height="6" rx="1"/>')
            wy += 14
        s.append(f'<rect class="cut" x="{x+9}" y="146" width="6" height="12" rx="1.5"/>')
        if i == 5:
            cy = top - roof - 22
            s.append(f'<g class="hi"><circle cx="{n(x+w/2)}" cy="{cy}" r="9"/><path d="M{n(x+w/2-6)} {cy+6}l6 10 6-10z"/></g><circle class="cut" cx="{n(x+w/2)}" cy="{cy}" r="3.4"/>')
        x += w + 7
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_cousin():
    s = ['<svg class="fg" id="cousin-pic" x="50" y="12" width="220" height="92" preserveAspectRatio="xMidYMax meet"></svg>',
         '<path class="ln" d="M160 112V130M86 148V130H234V148M160 130V148" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>']
    for cx in (86, 160, 234):
        s.append(f'<circle class="q" cx="{cx}" cy="165" r="15"/><text class="qm" x="{cx}" y="171.5" text-anchor="middle" font-size="19" font-weight="800">?</text>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_half():
    return ('<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false"><path class="fg" d="M160 38a62 62 0 0 0 0 124z"/><path class="mute" d="M160 38a62 62 0 0 1 0 124z"/>'
            '<path class="ln" d="M160 22V178" fill="none" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/></svg>')

def art_club():
    dots_in = [(138, 84), (172, 72), (150, 118), (186, 110), (164, 138)]
    dots_out = [(62, 60), (258, 70), (250, 146), (70, 140)]
    s = ['<circle class="ring" cx="160" cy="102" r="66" fill="none" stroke-width="4"/>']
    s += [f'<circle class="fg" cx="{x}" cy="{y}" r="9"/>' for x, y in dots_in]
    s += [f'<circle class="mute" cx="{x}" cy="{y}" r="9"/>' for x, y in dots_out]
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_piece():
    s = []
    for r in range(3):
        for c in range(3):
            x = 95 + c * 46; y = 34 + r * 46
            if (r, c) == (1, 2):
                s.append(f'<rect class="gap" x="{x+2}" y="{y+2}" width="34" height="34" rx="8" fill="none" stroke-width="3.5" stroke-dasharray="6 6"/>')
            else:
                s.append(f'<rect class="{"fg" if (r + c) % 2 == 0 else "mute"}" x="{x}" y="{y}" width="38" height="38" rx="9"/>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'


def art_apart():
    """Years Apart: a ruler with brass ends, a slider with a hairline, and a tag hanging from it."""
    s = ['<rect class="mute" x="28" y="66" width="264" height="46" rx="6"/>',
         '<rect class="fg" x="28" y="66" width="13" height="46" rx="4"/><rect class="fg" x="279" y="66" width="13" height="46" rx="4"/>']
    for i in range(0, 41):
        x = 49 + i * 5.55
        h = 15 if i % 10 == 0 else (10 if i % 5 == 0 else 6)
        s.append(f'<rect class="fg" x="{n(x - 0.7)}" y="66" width="1.4" height="{h}" opacity=".55"/>')
    s.append('<rect class="fg" x="186" y="52" width="24" height="74" rx="6"/>')
    s.append('<rect class="cut" x="197" y="58" width="2.4" height="62" rx="1.2"/>')
    s.append('<path class="ln" d="M198 126V142" fill="none" stroke-width="3" stroke-linecap="round"/>')
    s.append('<rect class="q" x="146" y="142" width="104" height="38" rx="8"/>')
    s.append('<rect class="mute" x="162" y="156" width="72" height="9" rx="4.5"/>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'


def art_one():
    """One of 193: 193 dots. Most are ruled out (faint), some are still possible, one is the hidden country."""
    import random
    rnd = random.Random(193)
    cols, rows = 20, 10
    still = set(rnd.sample(range(193), 30))
    hidden = 87
    still.add(hidden)
    s = []
    for k in range(193):
        r, c = divmod(k, cols)
        x = 37 + c * 13.2; y = 39 + r * 13.6
        if k == hidden:
            continue
        s.append(f'<circle class="{"mute" if k in still else "dim"}" cx="{n(x)}" cy="{n(y)}" r="{4.6 if k in still else 3.6}"/>')
    r, c = divmod(hidden, cols)
    x = 37 + c * 13.2; y = 39 + r * 13.6
    s.append(f'<circle class="ring" cx="{n(x)}" cy="{n(y)}" r="10.5" fill="none" stroke-width="3"/><circle class="fg" cx="{n(x)}" cy="{n(y)}" r="6"/>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_still():
    """Still In: the rule on top, twelve countries under it. Some were tapped right (solid), one went wrong (yellow),
    one is picked (ringed), the rest are still to go. The lines of the rule start right of where the badge "New" sits."""
    s = ['<rect class="fg" x="56" y="28" width="208" height="34" rx="11"/>',
         '<rect class="q" x="120" y="37" width="118" height="7" rx="3.5"/>',
         '<rect class="q" x="120" y="49" width="74" height="5" rx="2.5" opacity=".7"/>']
    state = {1: 'fg', 4: 'fg', 6: 'fg', 11: 'fg', 9: 'miss', 2: 'pick'}
    for k in range(12):
        r, c = divmod(k, 4)
        x = 56 + c * 54; y = 74 + r * 36
        st = state.get(k, 'q')
        if st == 'pick':
            s.append(f'<rect class="q" x="{x}" y="{y}" width="46" height="28" rx="8"/>'
                     f'<rect class="ring" x="{x - 3}" y="{y - 3}" width="52" height="34" rx="10" fill="none" stroke-width="3"/>')
        else:
            s.append(f'<rect class="{st}" x="{x}" y="{y}" width="46" height="28" rx="8"/>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'

def art_expert():
    """So-Called Expert: the expert's card. A coloured head band, five numbered lines (the five facts), and a rubber
    stamp across the fourth: the one fact the game invented. The card starts right of where the badge "New" sits."""
    s = ['<rect class="q" x="78" y="20" width="176" height="164" rx="12"/>',
         '<path class="fg" d="M78 32a12 12 0 0 1 12-12h152a12 12 0 0 1 12 12v18H78z"/>',
         '<rect class="cut" x="96" y="31" width="64" height="8" rx="4"/>']
    widths = [124, 104, 132, 112, 92]
    for i, w in enumerate(widths):
        y = 68 + i * 24
        s.append(f'<circle class="mute" cx="98" cy="{y}" r="6"/>')
        s.append(f'<rect class="mute" x="112" y="{y - 4}" width="{w}" height="8" rx="4"/>')
    # the stamp over the fourth line (y = 140): a tilted outline with a bar inside, as an ink stamp reads
    s.append('<g transform="rotate(-9 182 140)"><rect class="stamp" x="128" y="124" width="108" height="32" rx="7" fill="none" stroke-width="3.5"/>'
             '<rect class="fg" x="141" y="136" width="82" height="8" rx="4"/></g>')
    return '<svg viewBox="0 0 320 200" aria-hidden="true" focusable="false">' + ''.join(s) + '</svg>'
