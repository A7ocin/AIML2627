(function(scope){
 'use strict';
 function sample({n=30,noise=.08,slope=.1,spread=1,seed=7}={}){
  const random=RG.rng(seed);
  return Array.from({length:n},(_,i)=>{const x=.5+spread*(i/(n-1)-.5);return {x,y:.5+slope*x+noise*RG.gaussian(random)};});
 }
 function analyse(data){const fit=RG.infer(data);return {data,fit,mean:RG.mean(data.map(p=>p.y)),critical:RG.critical(fit.df)};}
 function repeated({n=90,noise=.08,seed=7,count=20}={}){
  return Array.from({length:count},(_,i)=>{const result=analyse(sample({n,noise,seed:seed+104729*i,slope:.1,spread:1}));return {...result,covers:result.fit.ci[0]<=.1&&result.fit.ci[1]>=.1};});
 }
 const api={sample,analyse,repeated};
 if(typeof module!=='undefined')module.exports=api;else scope.RGInferenceModel=api;
})(typeof window==='undefined'?globalThis:window);
