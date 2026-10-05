const assert=require('node:assert/strict'),C=require('../js/csp-engine'),source=require('../js/source-tree');
let checks=0;const check=f=>{f();checks++;},key=a=>JSON.stringify(Object.fromEntries(Object.entries(a).sort())),keys=as=>as.map(key).sort();
const p=C.problem(),expected=[{X1:1,X2:1,X3:0},{X1:1,X2:2,X3:0}];
check(()=>assert.deepEqual(keys(C.solutions(p)),keys(expected)));
check(()=>assert.equal(C.evaluate(p.constraints[2],{X1:1}),null));
check(()=>assert.equal(C.evaluate(p.constraints[2],{X1:1,X3:0}),true));
const original=[];(function walk(n,a={}){const next=n.var?{...a,[n.var.toUpperCase()]:n.value}:a;original.push({a:next,status:n.result});n.children.forEach(c=>walk(c,next));})(source);
const dfs=C.dfs(p);
check(()=>assert.equal(dfs.nodes.length,22));
for(let i=0;i<original.length;i++)check(()=>{assert.deepEqual(dfs.nodes[i].a,original[i].a);if(i)assert.equal(dfs.nodes[i].status,original[i].status);});
for(const reverse of [false,true])check(()=>assert.deepEqual(keys(C.dfs(p,reverse).states.at(-1).found),keys(expected)));
check(()=>assert.deepEqual(C.gac(p).domains,{X1:[1],X2:[1,2],X3:[0]}));
check(()=>assert.deepEqual(C.gac(C.problem('chain')).domains,{A:[1,2],B:[2,3],C:[3,4]}));
check(()=>{const states=C.gac(C.problem('chain')).states;assert(states.filter(s=>s.arc?.v==='A'&&s.arc.c==='c1').length>1);});
check(()=>assert.deepEqual(C.gac(C.problem('contradiction')).domains,C.problem('contradiction').domains));
for(const name of ['course','chain','contradiction'])check(()=>{const p=C.problem(name);assert.deepEqual(keys(C.split(p).states.at(-1).found),keys(C.solutions(p)));});
for(const name of ['course','chain','contradiction']){
 const p=C.problem(name),result=C.gac(p);
 for(const s of result.states)for(const v of p.vars)check(()=>assert(s.domains[v].every(x=>p.domains[v].includes(x))));
 for(const c of p.constraints)for(const v of c.vars)for(const x of result.domains[v])check(()=>assert(C.support(c,v,x,result.domains)));
}
// Independent truth-table oracle for varied binary and ternary constraint networks.
for(let k=0;k<20;k++){
 const p={vars:['A','B','C'],domains:{A:[0,1,2],B:[0,1,2],C:[0,1,2]},constraints:[{id:'sum',vars:['A','B','C'],test:a=>(a.A+a.B+a.C)%3===k%3},{id:'order',vars:['A','B'],test:a=>k%2?a.A<=a.B:a.A!==a.B}]};
 const brute=[];for(let A=0;A<3;A++)for(let B=0;B<3;B++)for(let Cc=0;Cc<3;Cc++)if((A+B+Cc)%3===k%3&&(k%2?A<=B:A!==B))brute.push({A,B,C:Cc});
 check(()=>assert.deepEqual(keys(C.split(p).states.at(-1).found),keys(brute)));
 const d=C.gac(p).domains;for(const a of brute)for(const v of p.vars)check(()=>assert(d[v].includes(a[v])));
}
check(()=>assert.equal(C.score({A:0,B:1,C:0,D:2}),1));
check(()=>assert(C.neighbors({A:0,B:1,C:0,D:2}).every(n=>n.score>=1)));
check(()=>assert.equal(C.local('best',7,'plateau').at(-1).score,1));
check(()=>assert.match(C.local('best',7,'plateau').at(-1).message,/plateau/));
check(()=>assert.equal(C.acceptance(0,1),1));check(()=>assert.equal(C.acceptance(-2,1),1));
check(()=>assert(Math.abs(C.acceptance(2,4)-Math.exp(-.5))<1e-12));check(()=>assert(C.acceptance(2,.5)<C.acceptance(2,4)));
for(const mode of ['sampling','walk','best','tabu','anneal'])for(const seed of [1,7,23])for(const start of ['plateau','red']){
 const states=C.local(mode,seed,start);check(()=>assert.deepEqual(states,C.local(mode,seed,start)));
 for(let i=0;i<states.length;i++){const s=states[i];check(()=>{assert.equal(s.score,C.edges.filter(([v,w])=>s.a[v]===s.a[w]).length);assert(C.names.every(v=>[0,1,2].includes(s.a[v])));});
  if(i&&s.move){const prev=states[i-1];check(()=>{assert.equal(C.names.filter(v=>s.a[v]!==prev.a[v]).length,s.accepted?1:0);if(mode==='anneal'){assert.equal(s.accepted,s.u<s.p);assert(Math.abs(s.p-C.acceptance(s.delta,s.T))<1e-12);}});}
 }
 check(()=>assert(states.at(-1).done));
}
console.log(checks+' checks passed: source DFS tree, solutions, GAC propagation, domain splitting, random CSP truth tables, local transitions and annealing probabilities.');
