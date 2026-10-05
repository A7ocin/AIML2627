const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const M=require('../js/ml-engine.js');let checks=0;const check=f=>{f();checks++;};
const ref=require('./fit-reference.json');const c=M.fit(ref.data,9);check(()=>c.forEach((v,i)=>assert(Math.abs(v-ref.coef[i])<1e-8)));
for(const degree of [0,1,2,5,9])for(const seed of [1,7,23])for(const noise of [0,.25,.6]){
 const e=M.experiment(degree,seed,noise);check(()=>assert.deepEqual(e,M.experiment(degree,seed,noise)));
 check(()=>assert(e.train.every(t=>e.validation.every(v=>t.x!==v.x))));
 const independentMSE=e.train.reduce((s,p)=>s+(p.y-e.coef.reduce((sum,c,j)=>sum+c*p.x**j,0))**2,0)/16;
 check(()=>assert(Math.abs(independentMSE-e.trainMSE)<1e-10));
 if(!noise&&degree>=2)check(()=>assert(e.trainMSE<1e-20&&e.validationMSE<1e-20));
 if(degree>0){const simpler=M.experiment(degree-1,seed,noise);check(()=>assert(e.trainMSE<=simpler.trainMSE+1e-10));}
 // Least-squares residual must be orthogonal to every fitted feature column.
 for(let j=0;j<=degree;j++)check(()=>assert(Math.abs(e.train.reduce((s,p)=>s+(p.y-M.predict(e.coef,p.x))*p.x**j,0))<1e-8));
 const changed=e.validation.map(p=>({...p,y:9999}));check(()=>assert.deepEqual(M.fit(e.train,degree),e.coef));assert(changed[0].y===9999);
}
for(const seed of [1,7,23])for(const eps of [0,.1,.3,1]){
 const b=new M.Bandit(seed),other=new M.Bandit(seed);for(let i=0;i<60;i++){b.step(eps);other.step(eps);const s=b.state;
  check(()=>assert.equal(s.counts.reduce((a,b)=>a+b),i+1));
  check(()=>assert.equal(s.total,b.history.slice(1).reduce((sum,s)=>sum+s.reward,0)));
  for(let a=0;a<3;a++){const pulls=b.history.slice(1).filter(s=>s.arm===a);check(()=>assert(Math.abs(s.means[a]-(pulls.length?pulls.reduce((v,p)=>v+p.reward,0)/pulls.length:0))<1e-12));}
 }check(()=>assert.deepEqual(b.history,other.history));check(()=>assert.deepEqual(b.history.slice(1,4).map(s=>s.arm),[0,1,2]));
}
const raw=require('../data/nonlinear.json'),mod=require('../data/nonlinear_mod.json');check(()=>assert.equal(raw.data[0].x.length,25));check(()=>assert.deepEqual(raw.data[0],mod.data[0]));check(()=>assert.equal(M.scenarios.length,6));
console.log(checks+' checks passed: independent QR reference, least-squares optimality, disjoint samples, seeded bandit rewards and original chart data.');
