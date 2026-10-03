"""Read the raw PhyloPic material, convert every silhouette, and draw contact sheets for choosing."""
import os, re, json, csv, sys, glob, asyncio
sys.path.insert(0, '.')
from makepics import convert
from organisms import ORG
RAW = 'raw/long-lost-cousin-raw'
LIC = {
 'https://creativecommons.org/publicdomain/zero/1.0/': 'pd',
 'https://creativecommons.org/publicdomain/mark/1.0/': 'pd',
 'https://creativecommons.org/licenses/by/3.0/': 'by3',
 'https://creativecommons.org/licenses/by/4.0/': 'by4',
}
def records():
    """image id -> record, from every list or single record the R script saved"""
    rec = {}
    for f in glob.glob(RAW + '/*.json'):
        try: d = json.load(open(f, encoding='utf-8'))
        except Exception: continue
        items = (d.get('_embedded') or {}).get('items') or ([d] if 'uuid' in d and '_links' in d and 'license' in d['_links'] else [])
        for it in items:
            if isinstance(it, dict) and 'uuid' in it and 'license' in it.get('_links', {}):
                rec[it['uuid']] = it
    return rec
def main():
    rec = records()
    rows = list(csv.DictReader(open(RAW + '/found.csv', encoding='utf-8')))
    out = []
    bad = 0
    for r in rows:
        key, n, img = r['key'], int(r['n']), r['image']
        it = rec.get(img)
        path = f"{RAW}/{r['file']}"
        if not it or not os.path.exists(path):
            bad += 1; continue
        L = it['_links']
        lic = LIC.get(L['license']['href'])
        try:
            c = convert(open(path, encoding='utf-8', errors='replace').read())
        except Exception as e:
            print('convert failed', r['file'], e); bad += 1; continue
        out.append({'key': key, 'n': n, 'image': img, 'lic': lic, 'lic_url': L['license']['href'],
                    'by': it.get('attribution') or (L.get('contributor') or {}).get('title') or '',
                    'taxon': (L.get('specificNode') or {}).get('title') or '', 'asked': r['asked'],
                    'w': c['w'], 'h': c['h'], 'd': c['d'], 'how': c['how']})
    json.dump(out, open('pics_all.json', 'w'))
    keys = sorted(set(o['key'] for o in out), key=list(ORG).index)
    print(len(rows), 'rows;', len(out), 'converted;', bad, 'skipped;', len(keys), 'of', len(ORG), 'with at least one picture')
    print('without picture:', [k for k in ORG if k not in keys])
    from collections import Counter
    print('licences:', Counter(o['lic'] for o in out), 'how:', Counter(o['how'].split()[0] for o in out))
    print('path sizes: max', max(len(o['d']) for o in out), 'mean', sum(len(o['d']) for o in out) // len(out))
if __name__ == '__main__':
    main()
