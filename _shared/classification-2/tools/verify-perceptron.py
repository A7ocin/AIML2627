from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
cases=[]
for name in ['cls_and','cls_and_noisy','cls_xor']:
 data=json.loads((ROOT/'data'/f'{name}.json').read_text());points=[dict(x=x,y=y,c=c) for c,t in enumerate(data['data']) for x,y in zip(t['x'],t['y'])]
 for reverse in [False,True]:
  for eta in [.25,1,4]:
   order=list(reversed(points)) if reverse else points;w=[0.,0.,0.];updates=0;seen=0;states=[];converged=False
   for epoch in range(1,26):
    changes=0
    for p in order:
     guess=int(w[0]+w[1]*p['x']+w[2]*p['y']>=0);error=p['c']-guess;delta=[eta*error,eta*error*p['x'],eta*error*p['y']];w=[a+b for a,b in zip(w,delta)];seen+=1
     if error:updates+=1;changes+=1
     if seen<=16 or seen%len(points)==0:states.append(dict(seen=seen,w=w[:],updates=updates,guess=guess))
    if changes==0:converged=True;break
   cases.append(dict(name=name,reverse=reverse,eta=eta,seen=seen,updates=updates,w=w,converged=converged,states=states))
(ROOT/'tests/perceptron-reference.json').write_text(json.dumps(cases,indent=2))
print(json.dumps([{k:c[k] for k in ['name','reverse','eta','seen','updates','converged']} for c in cases],indent=2))
