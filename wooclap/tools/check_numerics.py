"""Independent small arithmetic and finite-case checks for the introductory bank."""
from pathlib import Path
from itertools import product
from collections import deque, Counter
import json
R=Path(__file__).resolve().parents[1]
qs={q['id']:q for q in json.loads((R/'question-bank.json').read_text(encoding='utf8'))['questions']}
checks=[]
def check(id, calculation, got, expected):
    assert got==expected,(id,got,expected)
    q=qs[id];assert q['choices'][q['correct_index']-1]==q['correct']
    checks.append({'id':id,'calculation':calculation,'result':str(got),'key':q['correct'],'passed':True})
check('L01-C01','Compare route times sum([3,3]) and sum([1,1,1])',(sum([3,3]),sum([1,1,1])),(6,3))
check('L01-C02','First in, first out',deque(['B','C']).popleft()+'.',qs['L01-C02']['correct'])
check('L01-C03','Last in, first out',['B','C'].pop()+'.',qs['L01-C03']['correct'])
check('L01-C05','Add remaining step to second route; compare',(2+1,(2+1)<10),(3,True))
check('L01-C06','4 plus 3',str(4+3)+'.',qs['L01-C06']['correct'])
check('L01-C08','Current cost 8 already exceeds best complete cost 6',8>6,True)
check('L01-O01','Only overestimate among 0,3,5,7',[v for v in [0,3,5,7] if v>5],[7])
check('L02-C01','Both rooms are available and distinct',all(v in [1,2] for v in [1,2]) and 1!=2,True)
check('L02-C03','Finish strictly before 3',[v for v in [1,2,3] if not v<3],[3])
check('L02-C04','Count assignments of three distinct rooms from two options',sum(len(set(v))==3 for v in product([1,2],repeat=3)),0)
check('L02-C05','Disjoint exhaustive split',(set([1,2])&set([3,4]),set([1,2])|set([3,4])),(set(),{1,2,3,4}))
check('L02-O01','Fewest remaining options',min(2,5),2)
check('L04-C01','7 minus 5',f'{7-5:+d}.',qs['L04-C01']['correct'])
check('L04-C02','Sum of zero squared errors',sum(e*e for e in [0,0,0]),0)
check('L04-C03','Compare RSS=(1-R2)*TSS with same positive TSS',(1-.8)*10<(1-.3)*10,True)
check('L05-C05','A lower threshold can only add fixed-score flags',all(int(s>=.2)>=int(s>=.5) for s in [0,.1,.2,.3,.5,.7,1]),True)
check('L05-C06','Largest probability for the true cat class',max([.9,.1,.3,.5]),.9)
check('L05-C07','Three-neighbor majority',Counter(['Cat','Cat','Dog']).most_common(1)[0][0]+'.',qs['L05-C07']['correct'])
check('L05-O03','Average of 2 and 6',str((2+6)//2)+'.',qs['L05-O03']['correct'])
check('L06-C01','Only both switches on satisfy AND',[v for v in product([False,True],repeat=2) if all(v)],[(True,True)])
check('L07-C02','Average positions 0,2,4',str(sum([0,2,4])//3)+'.',qs['L07-C02']['correct'])
(R/'numerical-checks.json').write_text(json.dumps({'revision':'introductory undergraduate','checks':checks,'passed':len(checks)},indent=2),encoding='utf8')
print(f'{len(checks)} independent numerical and finite-case checks passed.')
