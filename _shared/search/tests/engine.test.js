const assert=require('node:assert/strict');
const E=require('../js/search-engine'),tree=require('../js/source-tree'),course=E.fromTree(tree);
let checks=0;
function check(fn){fn();checks++;}
const final=(g,a,o)=>E.trace(g,a,o).at(-1);
check(()=>assert.equal(Object.keys(course.nodes).length,19));
check(()=>assert.deepEqual(course.nodes.P.children,['S']));
const expected={BFS:'A B C D E F G H I J K L M N O P Q R S',DFS:'A D C J I H R Q B G F P S',GBFS:'A B E F O P S',HDFS:'A B E L K F O P S'};
for(const [a,order] of Object.entries(expected))check(()=>assert.equal(final(course,a).selected.join(' '),order));
for(const a of Object.keys(E.ALGORITHMS)) {
  const states=E.trace(course,a);
  check(()=>assert.deepEqual(states.at(-1).best.path,['A','B','F','P','S']));
  check(()=>assert.equal(states.at(-1).best.g,['BFS','DFS','IDS'].includes(a)?4:12));
  check(()=>assert.equal(states.filter(s=>s.done).length,1));
  check(()=>assert.equal(states[0].frontier.length,1));
  for(const s of states) {
    for(const p of [...s.frontier,...(s.current?[s.current]:[])])check(()=>{
      assert.equal(new Set(p.path).size,p.path.length);
      let cost=0;
      for(let i=1;i<p.path.length;i++){const e=course.edges.find(e=>e.from===p.path[i-1]&&e.to===p.path[i]);assert(e);cost+=['BFS','DFS','IDS'].includes(a)?1:e.cost;}
      assert.equal(p.g,cost);
    });
    if(['UCS','GBFS','ASTAR'].includes(a))check(()=>{const key={UCS:'g',GBFS:'h',ASTAR:'f'}[a];for(let i=1;i<s.frontier.length;i++)assert(s.frontier[i-1][key]<=s.frontier[i][key]);});
  }
}
check(()=>assert.deepEqual(E.trace(course,'IDS').filter(s=>s.event==='restart').map(s=>s.limit),[1,2,3,4]));
check(()=>assert.equal(final(course,'IDS',{goals:['B']}).current.path.length-1,1));
check(()=>{const s=E.trace(course,'IDS',{goals:['Z']});assert.equal(s.at(-1).best,null);assert(s.at(-1).done);assert.equal(s.at(-1).limit,4);});
check(()=>assert.deepEqual(final(course,'ASTAR',{zeroHeuristic:true}).selected,final(course,'UCS').selected));
const route=E.routes();
for(const [a,cost] of Object.entries({BFS:9,UCS:6,GBFS:12,ASTAR:6,BNB:6}))check(()=>assert.equal(final(route,a,{weighted:true}).best.g,cost));
check(()=>assert.deepEqual(E.trace(route,'BNB').filter(s=>s.event==='incumbent').map(s=>s.bound),[12,6]));
check(()=>assert.deepEqual(final(route,'BNB').pruned,['B']));
check(()=>{const s=final(route,'BNB',{bound:6});assert.equal(s.best,null);assert.match(s.message,/strictly below/);});
check(()=>assert.equal(final(route,'BNB',{bound:12}).best.g,6));
// Independent exhaustive oracle on varied small, positively weighted trees.
let seed=71237;
const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
for(let trial=0;trial<30;trial++){
  let next=0;const goals=[];
  function build(depth){const n={name:'N'+next++,cost:0,edgeCost:1+Math.floor(rand()*9)};if(depth<3){n.children=Array.from({length:2+Math.floor(rand()*2)},()=>build(depth+1));}else if(rand()<.55)goals.push(n.name);return n;}
  const g=E.fromTree(build(0));g.goals=goals.length?goals:[Object.keys(g.nodes).at(-1)];
  function trueRemaining(id){if(g.goals.includes(id))return 0;return Math.min(Infinity,...g.edges.filter(e=>e.from===id).map(e=>e.cost+trueRemaining(e.to)));}
  const optimum=trueRemaining(g.start);
  for(const n of Object.values(g.nodes)){const exact=trueRemaining(n.id);n.h=Number.isFinite(exact)?Math.floor(exact*rand()):Math.floor(rand()*12);}
  for(const a of ['UCS','ASTAR','BNB'])check(()=>assert.equal(final(g,a).best.g,optimum));
}
// A cycle is pruned only on the current path; a second route stays available.
const cycle={start:'A',goals:['G'],nodes:{A:{h:0},B:{h:0},G:{h:0}},edges:[{from:'A',to:'B',cost:1},{from:'B',to:'A',cost:1},{from:'A',to:'G',cost:4},{from:'B',to:'G',cost:1}]};
check(()=>assert.equal(final(cycle,'UCS').best.g,2));
check(()=>assert.equal(final(cycle,'IDS',{goals:['Z']}).best,null));
console.log(`${checks} assertions passed: traversal order, path/cost validity, priorities, IDS cutoff/failure, A*, branch-and-bound and 30 independent optimal-cost cases.`);
