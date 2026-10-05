(function(root){
'use strict';
const sigmoid=z=>z>=0?1/(1+Math.exp(-z)):Math.exp(z)/(1+Math.exp(z));
const softplus=z=>Math.max(0,z)+Math.log1p(Math.exp(-Math.abs(z)));
function decisions(y,p,t=.5){let tp=0,tn=0,fp=0,fn=0;for(let i=0;i<y.length;i++){const a=p[i]>=t;if(y[i]===1){if(a)tp++;else fn++;}else{if(a)fp++;else tn++;}}return {tp,tn,fp,fn,accuracy:(tp+tn)/y.length,precision:tp+fp?tp/(tp+fp):null,recall:tp+fn?tp/(tp+fn):null};}
function gaussianNB(x,prior){const means=[[-1,-1],[1,1]],scores=means.map((m,c)=>Math.log(c?prior:1-prior)+x.reduce((s,v,j)=>s-.5*Math.log(2*Math.PI)-.5*(v-m[j])**2,0)),mx=Math.max(...scores),e=scores.map(s=>Math.exp(s-mx));return {scores,p:e[1]/(e[0]+e[1]),contributions:x.map(v=>2*v)};}
function knn(points,q,k,scale=1,weighted=false){if(!Number.isInteger(k)||k<1||k>points.length)throw Error('K outside dataset');if(!(scale>0))throw Error('Scale must be positive');const near=points.map((p,i)=>({p,i,d:Math.hypot(p.x-q[0],scale*(p.y-q[1]))})).sort((a,b)=>a.d-b.d||a.i-b.i).slice(0,k),exact=near.some(n=>n.d===0);let total=0,one=0;for(const n of near){n.w=!weighted?1:exact?(n.d===0?1:0):1/n.d;total+=n.w;one+=n.w*n.p.c;}const p=one/total;return {near,p,label:p>.5?1:0};}
function regress(points,q,k){if(!Number.isInteger(k)||k<1||k>points.length)throw Error('K outside dataset');const near=points.map((p,i)=>({p,i,d:Math.abs(p.x-q)})).sort((a,b)=>a.d-b.d||a.i-b.i).slice(0,k);return {near,y:near.reduce((s,n)=>s+n.p.y,0)/k};}
function split(points){const train=[],validation=[],test=[];for(const c of [0,1]){const a=points.filter(p=>p.c===c); // Reproducible permutation; no label-dependent choice within a class.
let seed=2026+c;for(let i=a.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[a[i],a[j]]=[a[j],a[i]];}train.push(...a.slice(0,15));validation.push(...a.slice(15,20));test.push(...a.slice(20));}return {train,validation,test};}
const accuracy=(train,evaluation,k)=>evaluation.reduce((s,p)=>s+(knn(train,[p.x,p.y],k).label===p.c?1:0),0)/evaluation.length;
const regressionData=()=>Array.from({length:25},(_,i)=>{const x=-2+4*i/24;return {x,y:Math.sin(1.5*x)+.18*Math.cos(8*x)};});
const api={sigmoid,softplus,decisions,gaussianNB,knn,regress,split,accuracy,regressionData};root.CLEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
