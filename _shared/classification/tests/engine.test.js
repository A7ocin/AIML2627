const assert=require('node:assert/strict'),E=require('../js/engine.js'),ref=require('./reference.json'),data=require('../data/cls_two_class.json'),binary=require('../data/lr_logreg.json').data[0];
let checks=0;function close(a,b,t=1e-11){assert(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);checks++;}function eq(a,b){assert.deepEqual(a,b);checks++;}
const points=data.data.flatMap((t,c)=>t.x.map((x,i)=>({x,y:t.y[i],c,id:c*25+i})));
for(const r of ref.knn){const a=E.knn(points,r.q,r.k,r.scale,r.weighted);eq(a.near.map(n=>n.i),r.indices);close(a.p,r.p);eq(a.label,r.label);}
for(const r of ref.naive){const a=E.gaussianNB(r.x,r.prior);close(a.p,r.p);a.scores.forEach((v,i)=>close(v,r.scores[i]));close(a.p,E.sigmoid(Math.log(r.prior/(1-r.prior))+2*r.x[0]+2*r.x[1]));}
for(const r of ref.logistic){const z=binary.x.map(x=>r.slope*(x-r.mid)),p=z.map(E.sigmoid),a=E.decisions(binary.y,p,r.threshold);for(const k of ['tp','tn','fp','fn'])eq(a[k],r[k]);close(z.reduce((s,v,i)=>s+E.softplus(v)-binary.y[i]*v,0)/z.length,r.loss);eq(a.tp+a.tn+a.fp+a.fn,100);}
for(const z of [-1000,-100,-1,0,1,100,1000]){assert(Number.isFinite(E.sigmoid(z))&&Number.isFinite(E.softplus(z)));checks++;close(E.sigmoid(z)+E.sigmoid(-z),1);}
eq(E.decisions([0,0],[0,0]).precision,null);eq(E.decisions([0,0],[1,1]).recall,null);
const ties=[{x:0,y:0,c:1},{x:0,y:0,c:0},{x:2,y:0,c:1}];eq(E.knn(ties,[0,0],1).label,1);eq(E.knn(ties,[0,0],2).label,0);close(E.knn(ties,[0,0],3,1,true).p,.5);
for(const k of [0,51,1.5]){assert.throws(()=>E.knn(points,[0,0],k));checks++;}
const split=E.split(points);eq([split.train.length,split.validation.length,split.test.length],[30,10,10]);eq(new Set([...split.train,...split.validation,...split.test].map(p=>p.id)).size,50);for(const part of Object.values(split))eq(part.filter(p=>p.c===0).length,part.length/2);eq(E.split(points),split);
const original=JSON.stringify(split.train),scores=[1,3,5,7,9,15,29].map(k=>({k,validation:E.accuracy(split.train,split.validation,k)}));eq(JSON.stringify(split.train),original);eq(E.accuracy(split.train,split.train,1),1);const altered=split.test.map(p=>({...p,c:1-p.c}));eq(scores,[1,3,5,7,9,15,29].map(k=>({k,validation:E.accuracy(split.train,split.validation,k)})));close(E.accuracy(split.train,split.test,3)+E.accuracy(split.train,altered,3),1);
const ps=E.regressionData(),mean=ps.reduce((s,p)=>s+p.y,0)/ps.length;for(const q of [-2,-.4,0,.8,2])close(E.regress(ps,q,25).y,mean);for(const p of ps)close(E.regress(ps,p.x,1).y,p.y);eq(E.regress([{x:0,y:2},{x:2,y:6}],1,2).y,4);
console.log(JSON.stringify({checks,independentKnnCases:ref.knn.length,independentNaiveCases:ref.naive.length,independentLogisticCases:ref.logistic.length,validationScores:scores},null,2));
