"""Independent NumPy/SciPy references for the browser calculations and source grid."""
from pathlib import Path
import json
import numpy as np
from scipy.special import expit, logsumexp
ROOT=Path(__file__).resolve().parents[1]
data={p.stem:json.loads(p.read_text()) for p in (ROOT/'data').glob('*.json')}
points=np.array([[x,y,c] for c,t in enumerate(data['cls_two_class']['data']) for x,y in zip(t['x'],t['y'])])
refs=[]
for k in [1,3,5,9,15,25,49,50]:
 for scale in [.25,1,4]:
  for weighted in [False,True]:
   for q in [[-1.2,-.8],[.5,.2],[2.2,1.3],points[0,:2].tolist()]:
    d=np.linalg.norm((points[:,:2]-q)*[1,scale],axis=1);idx=np.argsort(d,kind='stable')[:k];dd=d[idx]
    weights=np.ones(k) if not weighted else (np.asarray(dd==0,dtype=float) if np.any(dd==0) else 1/dd)
    p=float(np.dot(weights,points[idx,2])/sum(weights))
    refs.append(dict(k=k,scale=scale,weighted=weighted,q=q,indices=idx.tolist(),p=p,label=int(p>.5)))
grid=data['cls_two_class_mod']['data'][0];xx,yy=np.meshgrid(grid['x'],grid['y']);queries=np.column_stack([xx.ravel(),yy.ravel()]);pred=[]
for batch in np.array_split(queries,40):
 idx=np.argmin(np.sum((batch[:,None,:]-points[None,:,:2])**2,axis=2),axis=1);pred.extend(points[idx,2].astype(int).tolist())
mismatch=int(np.count_nonzero(np.array(pred).reshape(xx.shape)!=np.array(grid['z'])))
source=data['lr_logreg_mod']['data'][0];x=np.array(source['x']);p=np.array(source['y']);beta=np.linalg.lstsq(np.column_stack([np.ones(len(x)),x]),np.log(p/(1-p)),rcond=None)[0]
train=data['lr_logreg']['data'][0];tx=np.array(train['x']);ty=np.array(train['y']);tp=expit(beta[0]+beta[1]*tx)
nb=[]
for x1 in [-3,0,3]:
 for x2 in [-3,0,3]:
  for prior in [.05,.5,.95]:
   scores=np.array([np.log(1-prior)-np.log(2*np.pi)-.5*((x1+1)**2+(x2+1)**2),np.log(prior)-np.log(2*np.pi)-.5*((x1-1)**2+(x2-1)**2)])
   nb.append(dict(x=[x1,x2],prior=prior,p=float(np.exp(scores[1]-logsumexp(scores))),scores=scores.tolist()))
logistic=[]
for mid in [0,.5,1]:
 for slope in [-20,0,20]:
  for threshold in [.1,.5,.9]:
   z=slope*(tx-mid);p=expit(z);guess=p>=threshold
   logistic.append(dict(mid=mid,slope=slope,threshold=threshold,loss=float(np.mean(np.logaddexp(0,z)-ty*z)),tp=int(sum(guess&(ty==1))),tn=int(sum((~guess)&(ty==0))),fp=int(sum(guess&(ty==0))),fn=int(sum((~guess)&(ty==1)))))
report={'originalChartCount':4,'binaryObservations':len(tx),'binaryClassCounts':np.bincount(ty).tolist(),'sourceTestObservations':len(data['lr_logreg']['data'][1]['x']),'twoClassObservations':len(points),'sourceBoundaryGrid':list(xx.shape),'sourceBoundaryMismatches':mismatch,'suppliedLogisticCoefficientsFromCurve':beta.tolist(),'maximumCurveReconstructionError':float(max(abs(expit(beta[0]+beta[1]*x)-p0) for x,p0 in zip(x,source['y']))),'suppliedCurveTrainingAccuracy':float(np.mean((tp>=.5)==ty)),'suppliedCurveTrainingLogLoss':float(np.mean(np.logaddexp(0,beta[0]+beta[1]*tx)-ty*(beta[0]+beta[1]*tx)))}
assert mismatch==0
(ROOT/'notes/numerical-review.json').write_text(json.dumps(report,indent=2))
(ROOT/'tests/reference.json').write_text(json.dumps(dict(knn=refs,naive=nb,logistic=logistic),indent=2))
print(json.dumps(report,indent=2))
