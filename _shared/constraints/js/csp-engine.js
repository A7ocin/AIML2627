/* Pure finite-domain algorithms; no expression evaluation or external dependencies. */
(function(scope){
 'use strict';
 const clone=o=>JSON.parse(JSON.stringify(o));
 const constraint=(id,label,vars,test)=>({id,label,vars,test});
 function problem(name='course'){
  if(name==='chain')return {name:'Ordered chain',vars:['A','B','C'],domains:{A:[1,2,3,4],B:[1,2,3,4],C:[1,2,3,4]},constraints:[constraint('c1','A < B',['A','B'],a=>a.A<a.B),constraint('c2','B < C',['B','C'],a=>a.B<a.C)]};
  if(name==='contradiction')return {name:'Consistent arcs, no solution',vars:['X1','X2','X3'],domains:{X1:[1,2,3,4],X2:[1,2,3,4],X3:[1,2,3,4]},constraints:[constraint('c1','X₁ = X₂',['X1','X2'],a=>a.X1===a.X2),constraint('c2','X₂ = X₃',['X2','X3'],a=>a.X2===a.X3),constraint('c3','X₁ ≠ X₃',['X1','X3'],a=>a.X1!==a.X3)]};
  return {name:'Course CSP',vars:['X1','X2','X3'],domains:{X1:[0,1,2],X2:[0,1,2],X3:[0,1,2]},constraints:[constraint('c1','X₁ < 2',['X1'],a=>a.X1<2),constraint('c2','X₂ > 0',['X2'],a=>a.X2>0),constraint('c3','X₃ < X₁',['X3','X1'],a=>a.X3<a.X1)]};
 }
 const evaluate=(c,a)=>c.vars.every(v=>v in a)?c.test(a):null;
 const valid=(p,a)=>p.constraints.every(c=>evaluate(c,a)!==false);
 function assignments(vars,domains,base={}){if(!vars.length)return [{...base}];const [v,...rest]=vars;return domains[v].flatMap(x=>assignments(rest,domains,{...base,[v]:x}));}
 const solutions=p=>assignments(p.vars,p.domains).filter(a=>valid(p,a));
 function dfs(p,reverse=false){
  const nodes=[],states=[],visited=[],found=[];
  function visit(a,parent=null,depth=0){
   const id=nodes.length,checks=p.constraints.map(c=>evaluate(c,a)),status=checks.includes(false)?'fail':depth===p.vars.length?'solution':'ok';
   nodes.push({id,parent,depth,a:{...a},status,label:depth?p.vars[depth-1]+'='+a[p.vars[depth-1]]:'∅'});visited.push(id);
   if(status==='solution')found.push({...a});
   states.push({current:id,a:{...a},checks,visited:[...visited],found:clone(found),message:status==='fail'?'Constraint violated: prune this branch.':status==='solution'?'Solution found. Continue searching for all solutions.':depth?'Partial assignment accepted; continue deeper.':'Begin with an empty context.',done:false});
   if(status==='ok'&&depth<p.vars.length){const v=p.vars[depth];(reverse?[...p.domains[v]].reverse():p.domains[v]).forEach(x=>visit({...a,[v]:x},id,depth+1));}
  }
  visit({});states.push({...clone(states.at(-1)),message:'Search exhausted. '+found.length+' solutions found.',done:true});return {nodes,states};
 }
 function support(c,v,x,domains){return assignments(c.vars.filter(y=>y!==v),domains,{[v]:x}).find(a=>c.test(a))||null;}
 function gac(p,input=p.domains){
  const domains=clone(input),queue=p.constraints.flatMap(c=>c.vars.map(v=>({v,c:c.id}))),states=[];
  const snap=(message,arc=null,removed=[],witnesses={})=>states.push({domains:clone(domains),queue:clone(queue),arc,removed:[...removed],witnesses:clone(witnesses),message,done:false});
  snap('Start with every variable–constraint arc in the worklist.');
  if(p.vars.some(v=>!domains[v].length)){snap('Empty domain: this branch has no solution.');states.at(-1).done=true;return {domains,states};}
  while(queue.length){
   const arc=queue.shift(),c=p.constraints.find(c=>c.id===arc.c),witnesses={};
   const keep=domains[arc.v].filter(x=>{const a=support(c,arc.v,x,domains);if(a)witnesses[x]=a;return !!a;}),removed=domains[arc.v].filter(x=>!keep.includes(x));
   domains[arc.v]=keep;
   if(removed.length)for(const other of p.constraints)if(other.id!==c.id&&other.vars.includes(arc.v))for(const v of other.vars)if(v!==arc.v&&!queue.some(a=>a.v===v&&a.c===other.id))queue.push({v,c:other.id});
   snap(removed.length?'Revise '+arc.v+': remove unsupported '+removed.join(', ')+'.':'Revise '+arc.v+': every value has support.',arc,removed,witnesses);
   if(!keep.length){states.at(-1).message+=' Empty domain: no solution in this branch.';states.at(-1).done=true;return {domains,states};}
  }
  snap(p.vars.every(v=>domains[v].length===1)?'Fixed point: all domains are singleton. One solution.':'Fixed point: domains are nonempty. Further search may be needed.');states.at(-1).done=true;return {domains,states};
 }
 function split(p){
  const nodes=[],states=[],found=[],visited=[];
  function visit(domains,parent=null,label='Initial domains'){
   const id=nodes.length,result=gac(p,domains),d=result.domains,empty=p.vars.some(v=>!d[v].length),single=p.vars.every(v=>d[v].length===1),status=empty?'fail':single?'solution':'split';
   nodes.push({id,parent,depth:parent===null?0:nodes[parent].depth+1,label,domains:clone(d),status});visited.push(id);
   if(single&&!empty)found.push(Object.fromEntries(p.vars.map(v=>[v,d[v][0]])));
   states.push({current:id,domains:clone(d),visited:[...visited],found:clone(found),checks:result.states.length-2,message:empty?'Propagation empties a domain. Reject this branch.':single?'All domains are singleton. Record this solution.':'Propagate to a fixed point, then split a non-singleton domain.',done:false});
   if(status==='split'){const v=p.vars.find(v=>d[v].length>1),cut=Math.ceil(d[v].length/2);for(const part of [d[v].slice(0,cut),d[v].slice(cut)])visit({...clone(d),[v]:part},id,v+' ∈ {'+part.join(',')+'}');}
  }
  visit(p.domains);states.push({...clone(states.at(-1)),message:'Both sides of every split exhausted. '+found.length+' solutions.',done:true});return {nodes,states};
 }
 const edges=[['A','B'],['B','C'],['C','D'],['D','A'],['A','C']],names=['A','B','C','D'];
 const conflicts=a=>edges.filter(([v,w])=>a[v]===a[w]);
 const score=a=>conflicts(a).length;
 const neighbors=a=>names.flatMap(v=>[0,1,2].filter(x=>x!==a[v]).map(x=>({v,x,a:{...a,[v]:x},score:score({...a,[v]:x})})));
 const acceptance=(delta,T)=>{if(!(T>0))throw Error('Temperature must be positive');return delta<=0?1:Math.exp(-delta/T);};
 function local(mode='best',seed=7,start='plateau',budget=40){
  let randomState=seed>>>0;const rand=()=>((randomState=(Math.imul(randomState,1664525)+1013904223)>>>0)/4294967296),choose=a=>a[Math.floor(rand()*a.length)];
  let a=start==='plateau'?{A:0,B:1,C:0,D:2}:{A:0,B:0,C:0,D:0},best=score(a),tabu=[],states=[];
  const snap=(message,extra={})=>states.push({a:{...a},score:score(a),conflicts:clone(conflicts(a)),best,tabu:[...tabu],message,done:false,...extra});
  snap('Start with a total assignment. Minimize the number of conflicts.');
  for(let i=0;i<budget&&score(a)>0;i++){
   const all=neighbors(a),before=score(a);let move,accepted=true,delta=0,p=1,T=2*Math.pow(.92,i),u=null;
   if(mode==='sampling'){a=Object.fromEntries(names.map(v=>[v,Math.floor(rand()*3)]));}
   else {
    if(mode==='walk'||mode==='anneal')move=choose(all);
    else {const allowed=mode==='tabu'?all.filter(m=>!tabu.includes(m.v)||m.score<best):all,min=Math.min(...allowed.map(m=>m.score));move=choose(allowed.filter(m=>m.score===min));}
    if(!move){snap('No admissible move. Stop this run.',{done:true});break;}
    if(mode==='best'&&move.score>=before){snap('No strictly improving one-variable move. Stop on this plateau.',{done:true});break;}
    delta=move.score-before;
    if(mode==='anneal'){p=acceptance(delta,T);u=rand();accepted=u<p;}
    if(accepted){a=move.a;if(mode==='tabu')tabu=[...tabu,move.v].slice(-2);}
   }
   best=Math.min(best,score(a));
   snap(mode==='sampling'?'Sample a new total assignment.':(accepted?'Accept ':'Reject ')+move.v+' → '+['red','green','blue'][move.x]+'.',{move:move?{v:move.v,x:move.x}:null,delta,p,T,u,accepted});
  }
  const last=states.at(-1);if(last.score===0){last.done=true;last.message+=' Zero conflicts: solution found.';}else if(!last.done){last.done=true;last.message+=' Step budget reached; no solution found in this run.';}
  return states;
 }
 const api={problem,evaluate,valid,assignments,solutions,dfs,support,gac,split,edges,names,conflicts,score,neighbors,acceptance,local};
 if(typeof module!=='undefined')module.exports=api;else scope.CSP=api;
})(typeof window!=='undefined'?window:globalThis);
