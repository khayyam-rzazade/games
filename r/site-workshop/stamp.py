"""Logicers: a version on every script and stylesheet of the site's own, so that a push never mixes old and new files.

Why: GitHub Pages lets browsers keep each file for ten minutes. Right after a push a browser could take the new
index.html together with the old assets/js/turnsout.js it still kept (on 5 Oct 2026 the home page then said
"5 of 5 played" while it showed six games). With a version in the address (turnsout.js?v=1a2b3c4d5e) a changed
file gets a new address, so a new page always fetches its own new files.

  python3 stamp.py [folder of the site]     sets the versions on every page; run it after changing any .css or .js
  stamp.check(site)                         what is missing or out of date (the check V2 in checks/t_site.py)

The version is the start of the file's SHA-256, so it changes exactly when the file changes, and running this twice
changes nothing. Data that only grows (data/*.js and every puzzles.js) gets no version: an old copy of it for a few
minutes does no harm, and the R script of 100 of Us then never leaves a version out of date.
build_home.py runs this for index.html by itself.
"""
import hashlib, os, re, sys

TAG = re.compile(r'(<link rel="stylesheet" href="|<script src=")([^"?#]+)(\?v=[0-9a-f]+)?(")')

def pages(site):
    """index.html and the page of every game (a folder at the top with an index.html, apart from r/)."""
    out = [os.path.join(site, 'index.html')]
    for d in sorted(os.listdir(site)):
        p = os.path.join(site, d, 'index.html')
        if d not in ('r', '.git') and os.path.isfile(p):
            out.append(p)
    return out

def wants_version(ref):
    if re.match(r'^[a-z]+:|^//', ref):          # another website, or data: and the like
        return False
    if not ref.endswith(('.css', '.js')):
        return False
    return not (ref.endswith('puzzles.js') or ref.startswith('data/') or '/data/' in ref)

def version(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()[:10]

def target(site, page, ref):
    return os.path.normpath(os.path.join(site, ref.lstrip('/')) if ref.startswith('/') else os.path.join(os.path.dirname(page), ref))

def stamp_file(site, page):
    """Sets the versions in one page. Returns True if the page changed."""
    html = open(page, encoding='utf-8').read()
    def fix(m):
        ref = m.group(2)
        if not wants_version(ref):
            return m.group(1) + ref + m.group(4)
        return m.group(1) + ref + '?v=' + version(target(site, page, ref)) + m.group(4)
    new = TAG.sub(fix, html)
    if new != html:
        open(page, 'w', encoding='utf-8').write(new)
    return new != html

def stamp(site):
    return [os.path.relpath(p, site) for p in pages(site) if stamp_file(site, p)]

def check(site):
    """Every reference of the site's own that should carry a version carries the current one; data carries none."""
    bad = []
    for page in pages(site):
        for m in TAG.finditer(open(page, encoding='utf-8').read()):
            ref, v = m.group(2), (m.group(3) or '')[3:]
            rel = os.path.relpath(page, site)
            if not wants_version(ref):
                if v:
                    bad.append(f'{rel}: {ref} should have no version')
                continue
            path = target(site, page, ref)
            if not os.path.isfile(path):
                bad.append(f'{rel}: {ref} does not exist')
            elif v != version(path):
                bad.append(f'{rel}: {ref} has version "{v}", the file is now "{version(path)}"')
    return bad

if __name__ == '__main__':
    site = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work/site2'
    changed = stamp(site)
    print('changed:', ', '.join(changed) if changed else 'nothing (all versions were up to date)')
    problems = check(site)
    print('check:', 'all versions up to date' if not problems else problems)
