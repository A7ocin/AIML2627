"""Reproducible added demonstrations; original course JSON remains untouched."""
from pathlib import Path
import json
import numpy as np
from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.special import logsumexp
from scipy.stats import multivariate_normal
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples
import sklearn, scipy

ROOT=Path(__file__).resolve().parents[1]
def source(name):return json.loads((ROOT/'data'/f'{name}.json').read_text())
def xy(t):return np.array([t['x'],t['y']]).T
X=xy(source('kmeans_data')['data'][0]); n=len(X)
def assignment(c):return np.argmin(((X[:,None,:]-c[None,:,:])**2).sum(2),axis=1)
def inertia(c,a):return float(((X-c[a])**2).sum())
def state(c,a,phase,it):return dict(centers=c.tolist(),labels=a.tolist(),inertia=inertia(c,a),phase=phase,iteration=it)
traces={}
for k in [2,3,4]:
 for seed in [0,7,19]:
  c=X[np.random.default_rng(seed).choice(n,k,replace=False)].copy();a=assignment(c);states=[state(c,a,'Assign to initial centers',0)]
  for it in range(1,51):
   c=np.array([X[a==j].mean(0) if (a==j).any() else c[j] for j in range(k)])
   states.append(state(c,a,'Update the means',it));new=assignment(c);states.append(state(c,new,'Assign to nearest centers',it))
   if np.array_equal(a,new):break
   a=new
  assert all(states[i]['inertia']<=states[i-1]['inertia']+1e-8 for i in range(1,len(states)))
  ref=KMeans(n_clusters=k,init=np.array(states[0]['centers']),n_init=1,tol=0,max_iter=100,algorithm='lloyd').fit(X)
  assert abs(ref.inertia_-states[-1]['inertia'])<1e-7
  traces[f'{k}-{seed}']=states
selection=[]
for k in range(1,11):
 m=KMeans(n_clusters=k,n_init=30,random_state=42,tol=1e-8).fit(X)
 sil=silhouette_samples(X,m.labels_) if k>1 else None
 selection.append(dict(k=k,inertia=float(m.inertia_),centers=m.cluster_centers_.tolist(),labels=m.labels_.tolist(),silhouette=None if sil is None else float(sil.mean()),samples=None if sil is None else sil.tolist()))
# Genuine EM updates on the original unlabeled observations; no class labels used.
means=X[[0,1,5]].copy();covs=np.tile(np.cov(X.T),(3,1,1));weights=np.ones(3)/3;gmm=[]
for it in range(41):
 logp=np.column_stack([np.log(weights[k])+multivariate_normal.logpdf(X,means[k],covs[k]) for k in range(3)])
 norm=logsumexp(logp,axis=1);resp=np.exp(logp-norm[:,None]);ll=float(norm.sum())
 gmm.append(dict(iteration=it,means=means.tolist(),covariances=covs.tolist(),weights=weights.tolist(),responsibilities=resp.tolist(),logLikelihood=ll))
 if it==40:break
 nk=resp.sum(0);means=resp.T@X/nk[:,None]
 covs=np.array([((X-means[k])*resp[:,k,None]).T@(X-means[k])/nk[k]+1e-6*np.eye(2) for k in range(3)])
 weights=nk/n
assert all(gmm[i]['logLikelihood']>=gmm[i-1]['logLikelihood']-1e-7 for i in range(1,len(gmm)))
H=xy(source('hc_dendogram')['data'][0]);hier={}
for method in ['single','complete','average','centroid']:
 z=linkage(H,method=method);d=dendrogram(z,no_plot=True)
 hier[method]=dict(merges=z.tolist(),leafOrder=d['leaves'],icoord=d['icoord'],dcoord=d['dcoord'])
pca={}
for name in ['gaussian_points','gaussian_points_rot30','two_gaussian_blobs']:
 x=np.concatenate([xy(t) for t in source(name)['data']]);mu=x.mean(0);cov=np.cov(x.T);val,u=np.linalg.eigh(cov);val=val[::-1];u=u[:,::-1]
 if u[0,0]<0:u[:,0]*=-1
 pca[name]=dict(mean=mu.tolist(),covariance=cov.tolist(),eigenvalues=val.tolist(),components=u.T.tolist(),points=x.tolist())
# The source panel uses existing coordinates. Record covariance rather than silently recalculating it.
panel=[]
for i in range(4):
 t=source('two_gaussian_blobs_panel')['data'][i*2:i*2+2];x=np.concatenate([xy(j) for j in t]);panel.append(dict(mean=x.mean(0).tolist(),covariance=np.cov(x.T).tolist(),min=x.min(0).tolist(),max=x.max(0).tolist()))
data=dict(points=X.tolist(),kmeans=traces,selection=selection,gmm=gmm,hierarchy=hier,hierarchyPoints=H.tolist(),pca=pca,panelStats=panel)
(ROOT/'data/teaching-models.json').write_text(json.dumps(data,separators=(',',':')))
(ROOT/'js/models.js').write_text('window.Models='+json.dumps(data,separators=(',',':'))+';')
(ROOT/'notes/numerical-review.json').write_text(json.dumps(dict(kmeansRuns=len(traces),kmeansStates=sum(map(len,traces.values())),selectionFits=10,gmmStates=len(gmm),gmmLikelihoodStart=gmm[0]['logLikelihood'],gmmLikelihoodEnd=gmm[-1]['logLikelihood'],hierarchyMethods=4,pcaDatasets=3,panelStats=panel,versions=dict(numpy=np.__version__,scipy=scipy.__version__,sklearn=sklearn.__version__)),indent=2))
print('Prepared',sum(map(len,traces.values())),'K-means states,',len(gmm),'EM states, 10 selection fits, 4 hierarchies and 3 PCA datasets.')
