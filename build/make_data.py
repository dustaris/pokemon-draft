import json, base64, os
d = json.load(open('pokedex.json'))
LEG = {'Restricted Legendary','Sub-Legendary','Mythical','Ultra Beast','Paradox'}
rows = {}
for k, v in d.items():
    n = v.get('num', 0)
    if n < 1 or n > 1025 or v.get('forme') or 'baseStats' not in v or n in rows: continue
    s = v['baseStats']
    rows[n] = [n, v['name'], v['types'], [s[x] for x in ('hp','atk','def','spa','spd','spe')], 1 if LEG & set(v.get('tags', [])) else 0]
assert len(rows) == 1025, len(rows)
out = [rows[i] for i in range(1, 1026)]
base = {v['name']: v['num'] for v in d.values() if 'baseStats' in v and not v.get('forme') and 1 <= v.get('num', 0) <= 1025}
nfe = sorted({v['num'] for v in d.values() if 'baseStats' in v and not v.get('forme') and 1 <= v.get('num', 0) <= 1025 and any(e in base for e in v.get('evos', []))})
open('../dex.js', 'w').write('window.DEX=' + json.dumps(out, separators=(',', ':'), ensure_ascii=False) + ';window.NFE=' + json.dumps(nfe) + ';')
print(len(nfe), 'NFE')
sp = [base64.b64encode(open(f'sprites/{i}.png', 'rb').read()).decode() for i in range(1, 1026)]
open('../sprites.js', 'w').write('window.SPRITES=' + json.dumps(sp, separators=(',', ':')) + ';')
print(sum(r[4] for r in out), 'legends')
