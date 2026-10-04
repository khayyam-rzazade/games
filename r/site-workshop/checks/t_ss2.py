"""Checks of Same Street. The site is expected in SITE and served at B (see t_site.py)."""
import asyncio, json, datetime, math, re, os
from playwright.async_api import async_playwright
B=os.environ.get("LOGICERS_URL", "http://localhost:8790")
SITE=os.environ.get("LOGICERS_SITE", "/home/claude/work/site2")
os.makedirs('shots', exist_ok=True)
# the homes in the order of play, straight from the game's own file
_js=open(SITE+'/same-street/puzzles.js', encoding='utf-8').read()
_d=json.loads(_js[_js.index('{',_js.index('window.TURNSOUT_DATA["same-street"]')):_js.rindex('}')+1])
homes=[dict(id=x['id'], house=x['house'], country=x['country']) for x in _d['homes']]
START=datetime.datetime.strptime(_d['start'], '%Y-%m-%d')
res=[]; 
def ok(name, cond, info=''):
    res.append((name, bool(cond)))
    print(('PASS ' if cond else 'FAIL ')+name+('' if cond else '  -> '+str(info)))
def day_date(n): return START+datetime.timedelta(days=n-1, hours=12)
async def new(p_br, day=1, w=390, h=664, scheme='light', reduced=False, touch=True):
    ctx=await p_br.new_context(viewport={'width':w,'height':h},device_scale_factor=2,has_touch=touch,color_scheme=scheme,reduced_motion='reduce' if reduced else 'no-preference')
    pg=await ctx.new_page(); pg.errs=[]
    pg.on('console',lambda m: pg.errs.append(m.text) if m.type=='error' else None)
    pg.on('pageerror',lambda e: pg.errs.append('PAGEERR '+str(e)))
    await pg.clock.set_fixed_time(day_date(day))
    return ctx,pg
async def place(pg, house):
    r=await pg.evaluate("document.getElementById('row-top').getBoundingClientRect().toJSON()")
    s=await pg.evaluate("document.getElementById('street').getBoundingClientRect().toJSON()")
    x=r['x']+r['width']*((house-0.5)/100); y=s['y']+s['height']/2
    await pg.mouse.move(x,y); await pg.mouse.down(); await pg.mouse.up()
    t=await pg.evaluate("document.getElementById('count').textContent")
    return int(t) if t.isdigit() else None
T=lambda pg,i: pg.evaluate(f"document.getElementById('{i}').textContent")
async def main():
    async with async_playwright() as p:
        br=await p.chromium.launch()
        # A fresh day 1
        ctx,pg=await new(br,1); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(500)
        m=await pg.evaluate("({sh:document.documentElement.scrollHeight, ih:innerHeight, sw:document.documentElement.scrollWidth, iw:innerWidth})")
        ok('A1 no scrolling while guessing (390x664)', m['sh']<=m['ih'] and m['sw']<=m['iw'], m)
        ok('A2 starts with ? and no buttons', await T(pg,'count')=='?' and await pg.evaluate("lock.hidden && minus.hidden && plus.hidden"))
        ok('A0 button says what it does', await pg.evaluate("document.getElementById('lock').textContent")=='See where it is')
        ok('A3 day label and title', await T(pg,'day-label')=='Day 1' and (await pg.title())=='Same Street, day 1 | Logicers')
        ok('A4 three photos loaded', await pg.evaluate("[0,1,2].every(i=>document.getElementById('photo-'+i).naturalWidth===640)"))
        ok("A5 photos are today's home", (await pg.evaluate("document.getElementById('photo-0').getAttribute('src')"))==f"photos/{homes[0]['id']}-1.jpg")
        ok('A6 nothing on the page names the country before the reveal', homes[0]['country'] not in await pg.evaluate("document.body.innerText"))
        # B placing
        g=await place(pg,37); ok('B1 tap places the home', g==37, g)
        ok('B2 buttons appear', await pg.evaluate("!lock.hidden && !minus.hidden && !plus.hidden"))
        ok('B3 dollars shown for the house', 'about $' in await T(pg,'hint'), await T(pg,'hint'))
        s=await pg.evaluate("document.getElementById('street').getBoundingClientRect().toJSON()")
        await pg.mouse.move(s['x']+50,s['y']+30); await pg.mouse.down(); await pg.mouse.move(s['x']-200,s['y']+30,steps=5); await pg.mouse.up()
        ok('B4 drag past the left end stops at 1', await T(pg,'count')=='1' and await pg.evaluate("minus.disabled && !plus.disabled"))
        ok('B5 house 1 is $25', '$25 ' in await T(pg,'hint'), await T(pg,'hint'))
        await pg.mouse.move(s['x']+50,s['y']+30); await pg.mouse.down(); await pg.mouse.move(s['x']+900,s['y']+30,steps=5); await pg.mouse.up()
        ok('B6 drag past the right end stops at 100', await T(pg,'count')=='100' and await pg.evaluate("plus.disabled && !minus.disabled"))
        ok('B7 house 100 is $15,000', '$15,000' in await T(pg,'hint'), await T(pg,'hint'))
        await pg.click('#minus'); await pg.click('#minus'); await pg.click('#plus')
        ok('B8 minus and plus move one house', await T(pg,'count')=='99')
        ok('B9 only one house is marked', await pg.evaluate("document.querySelectorAll('.ss-house.on').length")==1)
        ok('B10 still no scrolling after placing', await pg.evaluate("document.documentElement.scrollHeight<=innerHeight"))
        # D photos
        await pg.click('.ss-photo[data-i="1"]')
        ok('D1 tapping a small photo makes it big', await pg.evaluate("document.querySelector('.ss-photo.big').dataset.i")=='1' and await pg.evaluate("document.querySelectorAll('.ss-photo.big').length")==1)
        b=await pg.evaluate("document.querySelector('.ss-photo.big').getBoundingClientRect().toJSON()"); sm=await pg.evaluate("document.querySelector('.ss-photo[data-i=\"0\"]').getBoundingClientRect().toJSON()")
        ok('D2 big photo is about twice the small one', 1.9<b['width']/sm['width']<2.1 and abs(b['width']-b['height'])<6, (b['width'],b['height'],sm['width']))
        await pg.click('.ss-photo.big'); await pg.wait_for_timeout(200)
        ok('D3 tapping the big photo opens it larger', await pg.evaluate("document.getElementById('dlg-photo').open && document.getElementById('zoom-img').src.endsWith('-2.jpg')"))
        await pg.screenshot(path='shots/ss-s6-zoom.png')
        await pg.click('#dlg-photo [data-close]'); ok('D4 it closes', not await pg.evaluate("document.getElementById('dlg-photo').open"))
        # C keyboard on a fresh page
        await pg.reload(); await pg.wait_for_timeout(300)
        await pg.focus('#street'); await pg.keyboard.press('ArrowRight'); a=await T(pg,'count'); await pg.keyboard.press('ArrowRight'); b2=await T(pg,'count'); await pg.keyboard.press('PageUp'); c=await T(pg,'count'); await pg.keyboard.press('Home'); d=await T(pg,'count'); await pg.keyboard.press('End'); e=await T(pg,'count'); await pg.keyboard.press('ArrowLeft'); f=await T(pg,'count')
        ok('C1 keyboard places the home', (a,b2,c,d,e,f)==('50','51','61','1','100','99'), (a,b2,c,d,e,f))
        # E lock in with a gap of 6
        real=homes[0]['house']; g=await place(pg, real+6); ok('E0 placed', g==real+6, g)
        await pg.click('#lock'); await pg.wait_for_timeout(300)
        ok('E1 buttons go away at once', await pg.evaluate("document.getElementById('guess-actions').hidden"))
        await pg.wait_for_timeout(2600)
        st=json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))
        ok('E2 result kept in the browser', st['games']['same-street']['results']=={'1':{'g':real+6,'a':real,'id':homes[0]['id']}}, st)
        ok('E3 verdict', await T(pg,'turnsout')==f'Turns out, house {real}.' and await T(pg,'offby')==f'You said house {real+6}. 6 doors away.', (await T(pg,'turnsout'), await T(pg,'offby')))
        ok('E4 sentence names the country', await T(pg,'sentence')=='This home is in Sri Lanka. Each adult here lives on about $910 a month.', await T(pg,'sentence'))
        src=await pg.evaluate("document.querySelector('.after .source').innerText")
        ok('E5 credit line', src.startswith('Photos: Chris Dade for Dollar Street 2018. Free material from GAPMINDER.ORG, CC-BY LICENSE.'), src)
        ok('E6 links', await pg.evaluate("document.getElementById('family-link').href")=='https://www.gapminder.org/dollar-street/families/family-263' and await pg.evaluate("[...document.querySelectorAll('.after .source a')].map(a=>a.href).join()")=='https://www.gapminder.org/dollar-street,https://creativecommons.org/licenses/by/4.0/,https://www.gapminder.org/dollar-street/families/family-263')
        ok('E7 streak chip', await T(pg,'streak-chip')=='Streak 1')
        ok('E8 real and mine marked, one each', await pg.evaluate("document.querySelectorAll('.ss-house.real').length===1 && document.querySelectorAll('.ss-house.mine').length===1 && document.querySelectorAll('.ss-house.walk').length===0"))
        tg=await pg.evaluate("(()=>{const s=street.getBoundingClientRect(); return ['tag-you','tag-real','stem-you','stem-real','gap'].map(i=>{const e=document.getElementById(i); const r=e.getBoundingClientRect(); return {i, hidden:e.hidden, l:r.left-s.left, r:s.right-r.right, w:r.width, h:r.height}})})()")
        ok('E9 labels, lines and the yellow stretch are shown inside the street', all((t['hidden'] and t['i'].startswith('stem')) or ((not t['hidden']) and t['l']>=-0.5 and t['r']>=-0.5) for t in tg), tg)
        ok('E10 stamp', (await pg.evaluate("document.getElementById('earned-stamp').innerText")).split()==['House',str(real),'Sri','Lanka','$910','a','month'] and not await pg.evaluate("earned.hidden"), await pg.evaluate("document.getElementById('earned-stamp').innerText"))
        await pg.click('#streak-chip'); await pg.wait_for_timeout(150)
        ok('E11 album', await T(pg,'st-played')=='1' and await T(pg,'st-streak')=='1' and await T(pg,'st-gap')=='6' and await T(pg,'album-countries')=='Homes in 1 country so far.' and await pg.evaluate("document.querySelectorAll('#album .stamp').length")==1)
        await pg.screenshot(path='shots/ss-s7-album.png'); await pg.click('#dlg-album [data-close]')
        # N share
        await pg.click('#share'); await pg.wait_for_timeout(500)
        ok('N1 share picture 1080x1350', await pg.evaluate("document.getElementById('dlg-share').open && document.getElementById('share-img').naturalWidth===1080 && document.getElementById('share-img').naturalHeight===1350"))
        await ctx.grant_permissions(['clipboard-read','clipboard-write']); await pg.click('#share-copy'); await pg.wait_for_timeout(200)
        clip=await pg.evaluate("navigator.clipboard.readText()")
        ok('N2 share text carries the distance and the link, not the answer', clip=='Same Street, day 1: 6 doors away. Can you get closer? http://localhost:8790/same-street/?d=1&g=6', clip)
        await pg.click('#dlg-share [data-close]')
        # F reload
        await pg.reload(); await pg.wait_for_timeout(400)
        ok('F1 result is shown again after a reload', await T(pg,'turnsout')==f'Turns out, house {real}.' and await pg.evaluate("document.getElementById('guess-actions').hidden && !after.hidden"))
        await place(pg, 10)
        ok('F2 the street no longer moves after the reveal', await pg.evaluate("document.querySelectorAll('.ss-house.on').length===0") and json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['games']['same-street']['results']['1']['g']==real+6)
        ok('F3 no errors so far', pg.errs==[], pg.errs)
        # O home page after playing
        await pg.goto(B+'/'); await pg.wait_for_timeout(400)
        ok('O1 home tile shows the result', await pg.evaluate("document.querySelector('#tile-street .result b').textContent")=='6 doors away' and await pg.evaluate("document.querySelector('#tile-street .go').hidden && !document.querySelector('#tile-street .result').hidden"))
        ok('O2 home: the bar of this game is filled, 1 of 5 played', await pg.evaluate("document.getElementById('pip-street').classList.contains('on')") and await T(pg,'today-count')=='1 of 5 played')
        ok('O4 Same Street is one of five games on the shelf', await pg.evaluate("document.querySelectorAll('.grid .tile').length===5"))
        await pg.screenshot(path='shots/ss-home.png', full_page=True)
        ok('O5 home has no errors and no sideways scroll', pg.errs==[] and await pg.evaluate("document.documentElement.scrollWidth<=innerWidth"), pg.errs)
        await pg.click('[data-open="dlg-about"]'); ok('O6 about names the photo source', 'GAPMINDER.ORG' in await pg.evaluate("document.getElementById('dlg-about').innerText"))
        await ctx.close()
        # home before playing
        ctx,pg=await new(br,4); await pg.goto(B+'/'); await pg.wait_for_timeout(300)
        ok('O7 home before playing: Play is offered, no hint of today', await pg.evaluate("!document.querySelector('#tile-street .go').hidden && document.querySelector('#tile-street .result').hidden") and homes[3]['country'] not in await pg.evaluate("document.getElementById('tile-street').innerText"))
        await pg.click('#tile-street'); await pg.wait_for_timeout(400)
        ok('O8 the card opens the game on day 4', pg.url==B+'/same-street/' and await T(pg,'day-label')=='Day 4' and (await pg.evaluate("document.getElementById('photo-0').getAttribute('src')"))==f"photos/{homes[3]['id']}-1.jpg")
        # M practice list on day 4
        await place(pg, homes[3]['house']); await pg.click('#lock'); await pg.wait_for_timeout(1700)
        ok('H1 the right house', await T(pg,'offby')==f"You said house {homes[3]['house']}. The right house." and await pg.evaluate("document.getElementById('tag-you').hidden && document.getElementById('gap').hidden && document.querySelectorAll('.ss-house.mine').length===0 && !document.getElementById('tag-real').hidden"), await T(pg,'offby'))
        await pg.click('[data-open="dlg-practice"]'); await pg.wait_for_timeout(150)
        items=await pg.evaluate("[...document.querySelectorAll('#practice-list a')].map(a=>[a.getAttribute('href'), a.innerText.replace(/\\n/g,' | ')])")
        ok('M1 practice lists yesterday only, without naming its country', len(items)==1 and items[0][0]=='?p=3' and 'somewhere on the street' in items[0][1] and 'Not played yet' in items[0][1], items)
        await pg.screenshot(path='shots/ss-s9-practice.png')
        await pg.click('#practice-list a[href="?p=3"]'); await pg.wait_for_timeout(400)
        ok('J1 practice page', await T(pg,'day-label')=='Day 3, practice' and await T(pg,'notice')=='Practice. This one does not count for your streak.')
        h2=homes[2]['house']; g=await place(pg, h2-1 if h2>1 else h2+1); await pg.click('#lock'); await pg.wait_for_timeout(1700)
        st=json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['games']['same-street']
        ok('J2 practice is kept apart from the real results', list(st['results'].keys())==['4'] and list(st['practice'].keys())==['3'], st)
        ok('I1 next door', (await T(pg,'offby')).endswith('Next door.'), await T(pg,'offby'))
        ok('J3 practice gives no stamp, keeps the streak, links back', await pg.evaluate("earned.hidden") and await T(pg,'streak-chip')=='Streak 1' and await pg.evaluate("document.querySelector('#next a').getAttribute('href')")=='./')
        await pg.click('[data-open="dlg-practice"]'); await pg.wait_for_timeout(150)
        items=await pg.evaluate("[...document.querySelectorAll('#practice-list a')].map(a=>a.innerText.replace(/\\n/g,' | '))")
        ok('M2 a played practice day names its country', len(items)==1 and homes[2]['country'] in items[0] and 'next door' in items[0], items)
        await pg.goto(B+'/same-street/?p=1'); await pg.wait_for_timeout(400)
        ok('M4 practice two days back is not offered: the page opens today', await T(pg,'day-label')=='Day 4', await T(pg,'day-label'))
        ok('M3 no errors', pg.errs==[], pg.errs)
        await ctx.close()
        # K challenge link for today
        ctx,pg=await new(br,3); await pg.goto(B+'/same-street/?d=3&g=5'); await pg.wait_for_timeout(300)
        ok('K1 challenge notice', await T(pg,'notice')=='A friend was 5 doors away. Can you get closer?' and await T(pg,'day-label')=='Day 3')
        h3=homes[2]['house']; await place(pg, h3+2); await pg.click('#lock'); await pg.wait_for_timeout(1900)
        ok('K2 friend line and a real result', await T(pg,'friend')=='Your friend was 5 doors away. You got closer.' and '3' in json.loads(await pg.evaluate("localStorage.getItem('turnsout:v1')"))['games']['same-street']['results'], await T(pg,'friend'))
        await ctx.close()
        ctx,pg=await new(br,3); await pg.goto(B+'/same-street/?d=2&g=0'); await pg.wait_for_timeout(300)
        ok('L1 a challenge for yesterday is practice', await T(pg,'day-label')=='Day 2, practice' and (await T(pg,'notice')).startswith('A friend found the right house. Can you match it? It is an earlier home'))
        await pg.goto(B+'/same-street/?d=1&g=0'); await pg.wait_for_timeout(300)
        ok('L2 an older challenge opens today, without the friend', await T(pg,'day-label')=='Day 3' and 'friend' not in (await T(pg,'notice')).lower(), await T(pg,'notice'))
        await ctx.close()
        # G edges: lowest and highest homes, guess at the far end
        lo=min(range(len(homes)),key=lambda i:homes[i]['house']); hi=max(range(len(homes)),key=lambda i:homes[i]['house'])
        for name,idx,gs in (('lowest',lo,100),('highest',hi,1)):
            ctx,pg=await new(br,idx+1); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300)
            await place(pg, gs); await pg.click('#lock'); await pg.wait_for_timeout(2700)
            tg=await pg.evaluate("(()=>{const s=street.getBoundingClientRect(); return ['tag-you','tag-real'].map(i=>{const e=document.getElementById(i); const r=e.getBoundingClientRect(); return {hidden:e.hidden, l:r.left-s.left, r:s.right-r.right}})})()")
            gap=abs(gs-homes[idx]['house'])
            ok(f'G {name} home (house {homes[idx]["house"]}), guess {gs}: labels stay inside, {gap} doors', all((not t['hidden']) and t['l']>=-0.5 and t['r']>=-0.5 for t in tg) and (await T(pg,'offby')).endswith(f'{gap} doors away.') and await pg.evaluate("document.documentElement.scrollWidth<=innerWidth"), (tg, await T(pg,'offby')))
            await pg.screenshot(path=f'shots/ss-s10-{name}.png')
            await ctx.close()
        # P sizes
        for (w,h) in ((375,553),(320,568),(360,560),(360,740),(430,800),(768,1024),(1280,800)):
            ctx,pg=await new(br,2,w,h); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300); await place(pg,40)
            m=await pg.evaluate("({sh:document.documentElement.scrollHeight, ih:innerHeight, sw:document.documentElement.scrollWidth, iw:innerWidth, pw:document.getElementById('photos').getBoundingClientRect().width, lockBottom:lock.getBoundingClientRect().bottom})")
            ok(f'P {w}x{h}: fits without scrolling, photos {round(m["pw"])}px wide', m['sh']<=m['ih'] and m['sw']<=m['iw'] and m['lockBottom']<=m['ih'], m)
            await pg.screenshot(path=f'shots/ss-s11-{w}x{h}.png'); await ctx.close()
        # Q dark, R reduced motion
        ctx,pg=await new(br,5,scheme='dark',reduced=True); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300); await place(pg,70); await pg.screenshot(path='shots/ss-s12-dark-guess.png'); await pg.click('#lock'); await pg.wait_for_timeout(120)
        ok('R1 reduced motion: the answer is there at once', not await pg.evaluate("verdict.hidden") )
        await pg.screenshot(path='shots/ss-s12-dark-reveal.png'); ok('Q1 dark mode, no errors', pg.errs==[], pg.errs); await ctx.close()
        # S wrap after the last home
        ctx,pg=await new(br,len(homes)+1); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300)
        ok('S1 the day after the last home starts again from the first home', await T(pg,'day-label')==f'Day {len(homes)+1}' and (await pg.evaluate("document.getElementById('photo-0').getAttribute('src')"))==f"photos/{homes[0]['id']}-1.jpg"); await ctx.close()
        # T missing photo
        ctx,pg=await new(br,6); await pg.route('**/photos/*-1.jpg', lambda r: r.abort()); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300); await place(pg,30); await pg.click('#lock'); await pg.wait_for_timeout(2600); await pg.click('#share'); await pg.wait_for_timeout(500)
        ok('T1 a missing photo does not break the game or the share picture', not await pg.evaluate("verdict.hidden") and await pg.evaluate("document.getElementById('share-img').naturalWidth===1080"))
        b=await pg.evaluate("fetch(document.getElementById('share-img').src).then(r=>r.arrayBuffer()).then(b=>Array.from(new Uint8Array(b)))"); open('shots/ss-s13-card-nophoto.png','wb').write(bytes(b)); await ctx.close()
        # U opened from a folder
        ctx,pg=await new(br,1); await pg.goto('file://'+SITE+'/same-street/index.html'); await pg.wait_for_timeout(400); await place(pg,30); await pg.click('#lock'); await pg.wait_for_timeout(2700); await pg.click('#share'); await pg.wait_for_timeout(600)
        ok('U1 works when opened from a folder, share picture still made', not await pg.evaluate("verdict.hidden") and await pg.evaluate("document.getElementById('share-img').naturalWidth===1080") and (await pg.evaluate("document.querySelector('#next')!==null")), pg.errs)
        ok('U2 links work from a folder', (await pg.evaluate("document.querySelector('.wordmark').getAttribute('href')"))=='../index.html'); await ctx.close()
        # perfect card + next door card
        ctx,pg=await new(br,7); await pg.goto(B+'/same-street/'); await pg.wait_for_timeout(300); await place(pg,homes[6]['house']); await pg.click('#lock'); await pg.wait_for_timeout(1700); await pg.click('#share'); await pg.wait_for_timeout(500)
        b=await pg.evaluate("fetch(document.getElementById('share-img').src).then(r=>r.arrayBuffer()).then(b=>Array.from(new Uint8Array(b)))"); open('shots/ss-s14-card-perfect.png','wb').write(bytes(b))
        await ctx.grant_permissions(['clipboard-read','clipboard-write']); await pg.click('#share-copy'); await pg.wait_for_timeout(200)
        ok('H2 share text for the right house', (await pg.evaluate("navigator.clipboard.readText()"))=='Same Street, day 7: the right house. Can you match it? http://localhost:8790/same-street/?d=7&g=0'); await ctx.close()
        await br.close()
    # V data
    js=open(SITE+'/same-street/puzzles.js').read(); d=json.loads(js[js.index('{',js.index('window.TURNSOUT_DATA["same-street"]')):js.rindex('}')+1])
    hs=d['homes']
    def house(inc): return max(1,min(100,round(1+99*math.log(inc/25)/math.log(600))))
    ok('V1 98 homes, ids unique', len(hs)==98 and len({h['id'] for h in hs})==98)
    ok('V2 every house fits its income (within one house, because the income is rounded)', all(abs(house(h['income'])-h['house'])<=1 for h in hs), [(h['id'],h['house'],h['income']) for h in hs if abs(house(h['income'])-h['house'])>1])
    ok('V3 every home has its three photos and a page', all(os.path.exists(f"{SITE}/same-street/photos/{h['id']}-{n}.jpg") for h in hs for n in (1,2,3)) and all(h['page'] and (h['year'] is None or h['year']>=2014) for h in hs))
    ok('V4 neighbours in the order differ by at least 18 houses and in country', all(abs(hs[i]['house']-hs[i+1]['house'])>=18 and hs[i]['country']!=hs[i+1]['country'] for i in range(len(hs)-1)))
    from PIL import Image
    want={f"{h['id']}-{n}.jpg" for h in hs for n in (1,2,3)}
    have=set(os.listdir(SITE+'/same-street/photos'))
    ok('V5 the photo folder holds exactly the photos on the list', want==have, (len(want),len(have)))
    ok('V6 every photo is a 640 by 640 JPEG', all(Image.open(SITE+'/same-street/photos/'+f).size==(640,640) and Image.open(SITE+'/same-street/photos/'+f).format=='JPEG' for f in sorted(want)))
    import csv
    rows=list(csv.DictReader(open(SITE+'/r/same-street-photos.csv')))
    ok('V7 the photo list for the R script matches the game data', {r['file'] for r in rows}==want and all(r['url'].startswith('https://media.dollarstreet.org/') for r in rows))
    txt=''.join(open(SITE+f).read() for f in ('/same-street/index.html','/same-street/same-street.js','/index.html'))
    ok('W1 the words poor and rich appear nowhere', not re.search(r'\b(poor|poorest|rich|richest|poverty|wealthy)\b', txt, re.I))
    n=sum(1 for r in res if r[1]); print(f'\n{n} of {len(res)} checks passed'); 
asyncio.run(main())
