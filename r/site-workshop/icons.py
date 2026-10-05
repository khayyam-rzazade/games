"""Logicers: the three dots as favicon.ico, for browsers that do not use the SVG tab icon (assets/img/favicon.svg).

    python3 icons.py [folder of the site]      writes favicon.ico at the top of the site (16, 32 and 48 pixels)

The dots are the same as in favicon.svg (a 64 by 64 drawing): blue above, coral below left, teal below right.
make_brand.py calls write_ico() too. Every page links the icon as <link rel="icon" href="favicon.ico" sizes="32x32">
before the SVG one (sizes="32x32" keeps Chrome on the SVG), and stamp.py puts a version on all three icons.
"""
import os, sys
from PIL import Image, ImageDraw

DOTS = [((32, 16.5), '#3558DC'), ((14.5, 47), '#E0512F'), ((49.5, 47), '#11998B')]   # as in favicon.svg
R = 11.5

def drawing(px=256):
    """The three dots on a transparent square of px pixels."""
    im = Image.new('RGBA', (px, px), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    k = px / 64
    for (x, y), colour in DOTS:
        d.ellipse([(x - R) * k, (y - R) * k, (x + R) * k, (y + R) * k], fill=colour)
    return im

def write_ico(site):
    path = os.path.join(site, 'favicon.ico')
    drawing(256).save(path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    return path

if __name__ == '__main__':
    print('written:', write_ico(sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/site2'))
