const assert=require('node:assert/strict'),R=require('../js/engine.js'),ref=require('./reference.json');let checks=0;const check=f=>{f();checks++;},near=(a,b,tol=1e-10)=>assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} differs from ${b}`);
for(const name of ['lr_scatter','lr_maybe','lr_corcau']){const d=require('../data/'+name+'.json'),t=d.data.find(t=>t.name==='Train points')||d.data[0],pts=R.points(t),o=R.infer(pts),expected=ref[name];for(const k of ['intercept','slope','rss','rse','r2','se','t'])check(()=>near(o[k],expected[k]));check(()=>assert(Math.abs(o.p/expected.p-1)<1e-10));check(()=>o.ci.forEach((v,i)=>near(v,expected.ci[i])));const c=R.fit(pts,1);check(()=>{near(c[0],o.intercept);near(c[1],o.slope);});}
for(const t of ref.tReferences){check(()=>near(R.tPDF(t.t,t.df),t.pdf));check(()=>assert(Math.abs(R.tP(t.t,t.df)/t.p-1)<1e-10));check(()=>near(R.tP(t.t,t.df),R.tP(-t.t,t.df)));}
check(()=>near(R.critical(1),12.7062047361747));check(()=>near(R.critical(23),2.06865761041904));
const constant=R.ols([{x:2,y:1},{x:2,y:3},{x:2,y:5}]);check(()=>{assert(!constant.identified);assert.equal(constant.intercept,3);assert.equal(constant.rss,8);});
check(()=>assert.equal(R.metrics([{x:0,y:4},{x:1,y:4}],()=>4).r2,null));
check(()=>assert(R.metrics([{x:0,y:1},{x:1,y:2},{x:2,y:3}],()=>20).r2<0));
check(()=>assert.throws(()=>R.fit([{x:1,y:1},{x:1,y:2}],1),/Rank deficient/));
for(const degree of [0,1,2,5,9])for(const n of [12,25,60])for(const seed of [1,7,23]){
 const e=R.ensemble(degree,n,seed);check(()=>assert.equal(e.fits.length,60));
 for(const x of [-.8,0,.8]){const s=e.at(x),vals=e.fits.map(c=>R.predict(c,x)),direct=vals.reduce((sum,y)=>sum+(y-R.truth(x))**2,0)/60+.09;check(()=>near(s.total,direct));check(()=>assert(s.variance>=0&&s.bias2>=0));}
 // Compare the first replicate to an independently reconstructed sample and OLS normal equations.
 const random=R.rng(seed),data=Array.from({length:n},(_,i)=>{const x=-1+2*i/(n-1),z=Math.sqrt(-2*Math.log(Math.max(random(),1e-15)))*Math.cos(2*Math.PI*random());return {x,y:2+1.2*x-.9*x*x+.3*z};});
 for(let j=0;j<=degree;j++)check(()=>assert(Math.abs(data.reduce((s,p)=>s+(p.y-R.predict(e.fits[0],p.x))*p.x**j,0))<1e-8));
}
for(const kind of ['Well behaved','Curvature','Unequal variance','Serial pattern'])for(const seed of [1,7,23]){const d=R.diagnostic(kind,seed);check(()=>assert.deepEqual(d,R.diagnostic(kind,seed)));check(()=>near(d.residuals.reduce((s,p)=>s+p.residual,0),0));check(()=>near(d.residuals.reduce((s,p)=>s+p.residual*p.x,0),0));}
console.log(checks+' checks passed: independent SciPy statistics, Student t tails, OLS/QR, rank cases, ensemble decomposition and diagnostic residuals.');
