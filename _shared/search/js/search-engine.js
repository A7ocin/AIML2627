/* Finite teaching examples. Pure search logic, shared by the widgets and tests. */
(function (scope) {
  'use strict';
  const ALGORITHMS = {
    BFS: {name:'Breadth-first search', rule:'FIFO · oldest path first'},
    DFS: {name:'Depth-first search', rule:'LIFO · newest path first'},
    IDS: {name:'Iterative deepening', rule:'Depth-limited DFS · restart at a larger limit'},
    UCS: {name:'Lowest-cost-first search', rule:'Priority queue · minimum g'},
    GBFS: {name:'Greedy best-first search', rule:'Priority queue · minimum h'},
    HDFS: {name:'Heuristic depth-first search', rule:'Stack · best new child first'},
    ASTAR: {name:'A* search', rule:'Priority queue · minimum f = g + h'},
    BNB: {name:'Depth-first branch-and-bound', rule:'Stack · prune f ≥ bound; keep improving'}
  };
  function fromTree(tree) {
    const nodes={}, edges=[];
    function visit(n, parent=null, depth=0) {
      nodes[n.name]={id:n.name,h:n.cost||0,depth,children:(n.children||[]).map(c=>c.name)};
      if(parent)edges.push({from:parent,to:n.name,cost:n.edgeCost??1});
      (n.children||[]).forEach(c=>visit(c,n.name,depth+1));
    }
    visit(tree);
    return {nodes,edges,start:tree.name,goals:['S'],name:'Course tree'};
  }
  function routeGraph() {
    return fromTree({name:'A',cost:4,children:[
      {name:'B',cost:7,edgeCost:1,children:[{name:'G1',cost:0,edgeCost:8}]},
      {name:'C',cost:4,edgeCost:2,children:[{name:'D',cost:2,edgeCost:2,children:[{name:'G2',cost:0,edgeCost:2}]}]},
      {name:'E',cost:1,edgeCost:3,children:[{name:'G3',cost:0,edgeCost:9}]}
    ]});
  }
  function routes() {const g=routeGraph();g.goals=['G1','G2','G3'];g.name='Three acceptable exits';return g;}
  function trace(graph, algorithm, options={}) {
    if(!ALGORITHMS[algorithm])throw Error('Unknown algorithm: '+algorithm);
    const goals=new Set(options.goals||graph.goals), weighted=options.weighted??!['BFS','DFS','IDS'].includes(algorithm);
    const h=id=>options.zeroHeuristic?0:graph.nodes[id].h;
    let serial=0,limit=0,cutoff=false,bound=options.bound??Infinity;
    let frontier=[],processed=[],pruned=[],selected=[],expanded=0,peak=1,current=null,best=null;
    const states=[];
    const entry=(path,g)=>({path:[...path],id:path.at(-1),g,h:h(path.at(-1)),f:g+h(path.at(-1)),serial:serial++});
    const sort=()=>{
      if(['UCS','GBFS','ASTAR'].includes(algorithm)) {
        const key={UCS:'g',GBFS:'h',ASTAR:'f'}[algorithm];
        frontier.sort((a,b)=>a[key]-b[key]||a.serial-b.serial);
      }
    };
    const display=()=>['DFS','IDS','HDFS','BNB'].includes(algorithm)?[...frontier].reverse():[...frontier];
    const snapshot=(message,event,done=false)=>{
      sort();peak=Math.max(peak,frontier.length);
      states.push({message,event,done,current:current?{...current,path:[...current.path]}:null,
        frontier:display().map(p=>({...p,path:[...p.path]})),processed:[...processed],pruned:[...pruned],selected:[...selected],
        expanded,peak,limit,bound,best:best?{...best,path:[...best.path]}:null});
    };
    frontier=[entry([graph.start],0)];
    snapshot(algorithm==='IDS'?'Depth limit 0. Start with A.':'Ready. Select the first path from the frontier.','ready');
    while(true) {
      if(!frontier.length) {
        if(algorithm==='IDS'&&cutoff) {
          limit++;cutoff=false;processed=[];current=null;frontier=[entry([graph.start],0)];
          snapshot('Increase the depth limit to '+limit+' and restart from A.','restart');continue;
        }
        const message=best?'Search complete. Best path cost: '+best.g+'.':(algorithm==='BNB'&&Number.isFinite(bound)?'No solution strictly below the initial bound.':'Frontier exhausted. No solution exists in this example.');
        snapshot(message,'complete',true);break;
      }
      sort();current=['DFS','IDS','HDFS','BNB'].includes(algorithm)?frontier.pop():frontier.shift();
      selected.push(current.id);
      if(algorithm==='BNB'&&current.f>=bound) {
        pruned.push(current.id);snapshot('Prune '+current.id+': f = '+current.f+' ≥ bound '+bound+'.','prune');continue;
      }
      processed.push(current.id);
      if(goals.has(current.id)) {
        best=current;
        if(algorithm==='BNB') {bound=current.g;snapshot('Better solution: cost '+bound+'. Tighten the bound and continue.','incumbent');continue;}
        snapshot('Goal '+current.id+' selected. Solution cost: '+current.g+'.','goal',true);break;
      }
      const children=graph.edges.filter(e=>e.from===current.id&&!current.path.includes(e.to));
      if(algorithm==='IDS'&&current.path.length-1===limit) {
        if(children.length)cutoff=true;
        snapshot('Select '+current.id+'. Depth limit '+limit+' reached'+(children.length?' — do not generate its children.':'; this is a leaf.'),'cutoff');continue;
      }
      expanded++;
      let added=children.map(e=>entry([...current.path,e.to],current.g+(weighted?e.cost:1)));
      if(algorithm==='HDFS')added.sort((a,b)=>b.h-a.h||b.serial-a.serial);
      frontier.push(...added);
      snapshot('Expand '+current.id+(added.length?'; add '+added.map(p=>p.id).join(', ')+'.':'; no successors.'),'expand');
    }
    return states;
  }
  const api={ALGORITHMS,fromTree,routes,trace};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else scope.SearchEngine=api;
})(typeof window!=='undefined'?window:globalThis);
