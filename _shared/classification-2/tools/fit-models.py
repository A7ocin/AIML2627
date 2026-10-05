"""Fit explicit offline SVM examples and create independent reference predictions."""
from pathlib import Path
import json, math
import numpy as np
from sklearn.svm import SVC
from scipy.optimize import minimize
ROOT=Path(__file__).resolve().parents[1]
data={p.stem:json.loads(p.read_text()) for p in (ROOT/'data').glob('cls_*.json')}
def points(name):
 return np.array([[x,y,c] for c,t in enumerate([t for t in data[name]['data'] if t.get('name','').startswith('Class ')]) for x,y in zip(t['x'],t['y'])])
p=points('cls_circle_clusters');X=p[:,:2];y=p[:,2];queries=np.array([[a,b] for a in np.linspace(-1.5,1.5,9) for b in np.linspace(-1.5,1.5,9)])
models=[];refs=[]
for kernel in ['linear','poly','rbf']:
 for C in [.1,1,100]:
  for gamma in ([.1,1,10] if kernel=='rbf' else [1]):
   model=SVC(kernel=kernel,C=C,gamma=gamma,degree=2,coef0=0,tol=1e-9,max_iter=1000000).fit(X,y)
   assert model.fit_status_==0
   m=dict(kernel=kernel,C=C,gamma=gamma,support=model.support_.tolist(),vectors=model.support_vectors_.tolist(),dual=model.dual_coef_[0].tolist(),bias=float(model.intercept_[0]),accuracy=float(model.score(X,y)))
   models.append(m);refs.append(dict(index=len(models)-1,queries=queries.tolist(),scores=model.decision_function(queries).tolist(),trainScores=model.decision_function(X).tolist()))
mp=points('cls_svm_margin');mx=mp[:,:2];t=2*mp[:,2]-1
cons={'type':'ineq','fun':lambda z:t*(mx@z[:2]+z[2])-1,'jac':lambda z:t[:,None]*np.column_stack([mx,np.ones(len(mx))])}
fit=minimize(lambda z:.5*(z[0]**2+z[1]**2),[1.,0.,-.3],jac=lambda z:np.array([z[0],z[1],0]),constraints=cons,method='SLSQP',options={'ftol':1e-12,'maxiter':1000})
assert fit.success and min(cons['fun'](fit.x))>-1e-8
w=fit.x[:2];b=fit.x[2];norm=float(np.linalg.norm(w));svm=SVC(kernel='linear',C=1e6,tol=1e-10).fit(mx,t)
assert np.max(np.abs(w-svm.coef_[0]))<1e-6
margin=dict(w=w.tolist(),bias=float(b),normal=(w/norm).tolist(),offset=float(b/norm),clearance=1/norm,width=2/norm,support=np.flatnonzero(np.abs(t*(mx@w+b)-1)<1e-6).tolist())
z0=np.array(data['cls_circle_clusters_3d']['data'][0]['z']);z1=np.array(data['cls_circle_clusters_3d']['data'][1]['z'])
for k in [0,1]:
 raw=data['cls_circle_clusters_3d']['data'][k]
 assert np.allclose(raw['z'],np.array(raw['x'])**2+np.array(raw['y'])**2,atol=1e-14)
 assert raw['x']==data['cls_circle_clusters']['data'][k]['x'] and raw['y']==data['cls_circle_clusters']['data'][k]['y']
lift=dict(innerMax=float(z0.max()),outerMin=float(z1.min()),threshold=float((z0.max()+z1.min())/2));assert lift['innerMax']<lift['outerMin']
result=dict(models=models,margin=margin,lift=lift)
(ROOT/'data/fitted-models.json').write_text(json.dumps(result,separators=(',',':')))
(ROOT/'js/models.js').write_text('window.FITTED_MODELS='+json.dumps(result,separators=(',',':'))+';')
(ROOT/'tests/model-reference.json').write_text(json.dumps(refs,separators=(',',':')))
report=dict(originalCharts=9,circlePoints=len(p),noisyANDPoints=len(points('cls_and_noisy')),marginOptimum=margin,lift=lift,fittedModels=[{k:m[k] for k in ['kernel','C','gamma','accuracy']}|{'supportVectors':len(m['support'])} for m in models],polynomialFeatureCount=math.comb(110,10))
# Compute source line training accuracies and signed geometric clearances independently.
report['sourceLines']={}
for name,labelsFirst in [('cls_and_noisy_mod',True),('cls_svm_both_mod',True)]:
 pp=points(name);xx=pp[:,:2];tt=2*pp[:,2]-1
 for trace in data[name]['data'][2:]:
  x1,x2=trace['x'];y1,y2=trace['y'];ww=np.array([y1-y2,x2-x1]);bb=-(ww@[x1,y1]);score=xx@ww+bb
  if np.mean((score>=0)==(tt==1))<.5:ww=-ww;bb=-bb;score=-score
  report['sourceLines'][trace['name']]={'accuracy':float(np.mean((score>=0)==(tt==1))),'minSignedDistance':float(min(tt*score)/np.linalg.norm(ww))}
(ROOT/'notes/numerical-review.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
