(function(scope){
 'use strict';
 function rng(seed){let s=seed>>>0;return ()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296);}
 const truth=x=>2+1.2*x-.9*x*x;
 const predict=(coef,x)=>coef.reduceRight((v,c)=>v*x+c,0);
 const mse=(data,fn)=>data.reduce((s,p)=>s+(p.y-fn(p.x))**2,0)/data.length;
 function dataset(seed=7,noise=.25){const r=rng(seed),normal=()=>Math.sqrt(-2*Math.log(Math.max(r(),1e-15)))*Math.cos(2*Math.PI*r());const train=Array.from({length:16},(_,i)=>{const x=-1+2*i/15;return {x,y:truth(x)+noise*normal()};});const validation=Array.from({length:40},(_,i)=>{const x=-.975+1.95*i/39;return {x,y:truth(x)+noise*normal()};});return {train,validation};}
 // Householder QR avoids the squared condition number of the normal equations.
 function fit(data,degree){
  const n=data.length,m=degree+1;if(m>n)throw Error('More coefficients than training rows');
  const A=data.map(p=>Array.from({length:m},(_,j)=>p.x**j)),b=data.map(p=>p.y);
  for(let k=0;k<m;k++){
   const norm=Math.hypot(...A.slice(k).map(row=>row[k]));if(norm<1e-12)throw Error('Rank deficient design');
   const v=A.slice(k).map(row=>row[k]);v[0]+=v[0]>=0?norm:-norm;const vn=Math.hypot(...v);for(let i=0;i<v.length;i++)v[i]/=vn;
   for(let j=k;j<m;j++){let dot=0;for(let i=k;i<n;i++)dot+=v[i-k]*A[i][j];for(let i=k;i<n;i++)A[i][j]-=2*v[i-k]*dot;}
   let dot=0;for(let i=k;i<n;i++)dot+=v[i-k]*b[i];for(let i=k;i<n;i++)b[i]-=2*v[i-k]*dot;
  }
  const coef=Array(m).fill(0);for(let i=m-1;i>=0;i--){let s=b[i];for(let j=i+1;j<m;j++)s-=A[i][j]*coef[j];coef[i]=s/A[i][i];}return coef;
 }
 function experiment(degree=2,seed=7,noise=.25){const d=dataset(seed,noise),coef=fit(d.train,degree);return {...d,coef,trainMSE:mse(d.train,x=>predict(coef,x)),validationMSE:mse(d.validation,x=>predict(coef,x))};}
 class Bandit{
  constructor(seed=7){this.random=rng(seed);this.probs=[.25,.5,.75];this.history=[{counts:[0,0,0],means:[0,0,0],reward:0,total:0,arm:null,mode:'Ready'}];this.index=0;}
  get state(){return this.history[this.index];}
  pull(arm,mode='Manual'){
   if(this.index<this.history.length-1){this.index=this.history.length-1;}
   const old=this.state,reward=this.random()<this.probs[arm]?1:0,counts=[...old.counts],means=[...old.means];counts[arm]++;means[arm]+=(reward-means[arm])/counts[arm];
   this.history.push({counts,means,reward,total:old.total+reward,arm,mode});this.index++;return this.state;
  }
  step(epsilon=.1){const s=this.history.at(-1);let arm=s.counts.findIndex(n=>n===0),mode='Initial sample';if(arm<0){if(this.random()<epsilon){arm=Math.floor(this.random()*3);mode='Explore';}else {const max=Math.max(...s.means),ties=s.means.map((x,i)=>x===max?i:-1).filter(i=>i>=0);arm=ties[Math.floor(this.random()*ties.length)];mode='Exploit';}}return this.pull(arm,mode);}
 }
 const scenarios=[
  {title:'Predict yield from fertilizer measurements and recorded yields.',answer:'Supervised',why:'Each input has a numerical target. This is supervised regression.'},
  {title:'Assign animal categories using images with expert labels.',answer:'Supervised',why:'Input–label pairs provide feedback. This is supervised classification.'},
  {title:'Group unlabeled images by similarity.',answer:'Unsupervised',why:'The grouping is inferred from observations without predefined class targets.'},
  {title:'Hide a recorded word and predict it from its context.',answer:'Self-supervised',why:'The original text supplies the withheld target automatically.'},
  {title:'Train a classifier jointly on 100 labeled and 10,000 unlabeled images.',answer:'Semi-supervised',why:'Learning uses both the labeled subset and the unlabeled examples.'},
  {title:'Choose actions and improve a policy from the rewards received.',answer:'Reinforcement',why:'Feedback evaluates actions through rewards rather than supplied correct-action labels.'}
 ];
 const sentences=['The crop needs water','A model learns from examples','Good predictions require useful data'];
 const api={rng,truth,predict,mse,dataset,fit,experiment,Bandit,scenarios,sentences};if(typeof module!=='undefined')module.exports=api;else scope.ML=api;
})(typeof window==='undefined'?globalThis:window);
