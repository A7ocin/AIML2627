/* Native SVG diagrams keep the examples crisp and work without a network. */
(function(scope){
  const C={text:'#e8ecf4',muted:'#93a0b6',line:'#526079',teal:'#45d6c0',blue:'#4db8ff',purple:'#c792ea',orange:'#ff9d4d'};
  let ids=0;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=(x,y,s,size=28,color=C.text,anchor='middle')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" dominant-baseline="central">${esc(s)}</text>`;
  const line=(x1,y1,x2,y2,color=C.line,dash='')=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="3" fill="none" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
  const node=(x,y,label,color=C.blue)=>`<circle cx="${x}" cy="${y}" r="31" fill="#141a26" stroke="${color}" stroke-width="3"/>${text(x,y,label,29)}`;
  const svg=(body,w=800,h=480,label='Search diagram')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  function layout(graph) {
    let leaf=0;const points={};
    function place(id,depth){const children=graph.nodes[id].children||[];children.forEach(c=>place(c,depth+1));points[id]={x:children.length?children.reduce((sum,c)=>sum+points[c].x,0)/children.length:leaf++,y:depth};}
    place(graph.start,0);const depth=Math.max(...Object.values(points).map(p=>p.y));
    for(const p of Object.values(points)){p.x=55+p.x*1010/Math.max(1,leaf-1);p.y=52+p.y*(depth>3?125:160);}
    return points;
  }
  function graphSVG(graph,state={},options={}) {
    const points=layout(graph),uid='arrow-'+(++ids),goals=new Set(options.goals||graph.goals),frontier=new Set((state.frontier||[]).map(p=>p.id));
    const processed=new Set(state.processed||[]),pruned=new Set(state.pruned||[]),solution=state.best?.path||[];
    let body=`<defs><marker id="${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${C.line}"/></marker></defs>`;
    for(const e of graph.edges){const a=points[e.from],b=points[e.to],y1=a.y+25,y2=b.y-29,mid=(y1+y2)/2;
      const solved=solution.some((n,i)=>n===e.from&&solution[i+1]===e.to);
      body+=`<path class="edge ${solved?'solution':''}" d="M${a.x} ${y1}C${a.x} ${mid} ${b.x} ${mid} ${b.x} ${y2}" marker-end="url(#${uid})"/>`;
      // Place the weight on the curve at t=.7, below the parent's h label.
      if(options.weights){const t=.7,x=a.x*(1-3*t*t+2*t*t*t)+b.x*(3*t*t-2*t*t*t),y=(1-t)**3*y1+3*(1-t)*t*mid+t**3*y2;body+=`<rect x="${x-15}" y="${y-14}" width="30" height="28" rx="7" fill="#101622"/>`+`<text class="weight" x="${x}" y="${y}">${e.cost}</text>`;}
    }
    for(const [id,p] of Object.entries(points)){
      const classes=[processed.has(id)?'processed':'',frontier.has(id)?'frontier':'',pruned.has(id)?'pruned':'',solution.includes(id)?'solution':''].join(' ');
      body+=`<g class="${classes}" data-node="${id}" transform="translate(${p.x},${p.y})"><title>${esc(id+(goals.has(id)?' — goal':'')+(options.heuristics?' · h = '+(options.zero?0:graph.nodes[id].h):''))}</title>`;
      if(state.current?.id===id)body+='<circle class="current-ring" r="36"/>';
      if(id===graph.start)body+='<circle class="start-ring" r="30"/>';
      body+=goals.has(id)?'<polygon class="node-shape" points="0,-29 29,0 0,29 -29,0"/>':'<circle class="node-shape" r="24"/>';
      body+=`<text class="node-label">${esc(id)}</text>`;
      if(options.heuristics)body+=`<text class="h-label" y="47">h=${options.zero?0:graph.nodes[id].h}</text>`;
      body+='</g>';
    }
    return `<svg class="search-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 620" role="img" aria-label="${esc(graph.name)}"><title>${esc(graph.name)}</title>${body}</svg>`;
  }
  function cover(){let b='';const ps=[[75,245],[270,100],[270,245],[270,390],[475,50],[475,145],[475,300],[475,430],[690,110],[690,250],[690,390]];const es=[[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[3,7],[5,8],[6,9],[7,10]];es.forEach(([a,z])=>b+=line(...ps[a],...ps[z],[0,2,6,9].includes(a)&&[0,2,6,9].includes(z)?C.teal:C.line));ps.forEach(([x,y],i)=>b+=`<circle cx="${x}" cy="${y}" r="${i===0||i===9?27:19}" fill="${[0,2,6,9].includes(i)?'#174d46':'#1b2332'}" stroke="${[0,2,6,9].includes(i)?C.teal:C.line}" stroke-width="3"/>`);b+=text(75,300,'start',25,C.muted)+text(690,304,'goal',25,C.teal);return svg(b,800,480,'A highlighted path through a branching search tree');}
  function directed(weighted=false){const uid='directed-'+(++ids);let b=`<defs><marker id="${uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C.blue}"/></marker></defs>`;const ps={A:[105,220],B:[365,85],C:[365,355],D:[650,220]};
    for(const [a,z,c] of [['A','B',1],['A','C',10],['B','D',5],['C','D',8]]){const p=ps[a],q=ps[z],dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy);b+=`<path d="M${p[0]+32*dx/l} ${p[1]+32*dy/l}L${q[0]-36*dx/l} ${q[1]-36*dy/l}" stroke="${C.blue}" stroke-width="3" marker-end="url(#${uid})"/>`;if(weighted)b+=text((p[0]+q[0])/2,(p[1]+q[1])/2-23,c,30,C.orange);}
    if(!weighted)b+=`<path d="M650 255C650 465 105 465 105 255" stroke="${C.purple}" fill="none" stroke-width="3" marker-end="url(#${uid})"/>`;
    Object.entries(ps).forEach(([id,p])=>b+=node(...p,id,id==='D'?C.teal:C.blue));return svg(b,800,480,weighted?'Two weighted paths from A to D':'Directed graph with a cycle');}
  function unfold(){let b=text(175,30,'State graph',27,C.muted)+text(570,30,'Search tree',27,C.muted);b+=line(95,170,175,300)+line(255,170,175,300)+line(175,90,95,170)+line(175,90,255,170);[['A',175,90],['B',95,170],['C',255,170],['D',175,300]].forEach(([id,x,y])=>b+=node(x,y,id));b+=text(358,220,'→',55,C.muted);b+=line(575,90,465,200)+line(575,90,685,200)+line(465,200,465,330)+line(685,200,685,330);[['A',575,90],['B',465,200],['C',685,200],['D',465,330],['D',685,330]].forEach(([id,x,y])=>b+=node(x,y,id,id==='D'?C.teal:C.blue));b+=text(575,412,'Same state, two paths',27,C.teal);return svg(b,800,470,'One shared graph state becomes two search-tree nodes');}
  function order(depth){const ps=[[400,60],[215,220],[585,220],[110,375],[310,375],[490,375],[690,375]],order=depth?[1,5,2,7,6,4,3]:[1,2,3,4,5,6,7];let b='';[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]].forEach(([a,z])=>b+=line(...ps[a],...ps[z]));ps.forEach(([x,y],i)=>b+=node(x,y,String(order[i]),depth?C.purple:C.blue));return svg(b,800,450,depth?'DFS selection order, rightmost child first':'BFS selection order by depth');}
  function heuristic(){let b='<rect x="315" y="65" width="90" height="335" rx="12" fill="#263148"/>'+text(360,435,'obstacle',25,C.muted);b+=`<path d="M100 310L100 45L565 45L670 310" stroke="${C.blue}" stroke-width="5" fill="none"/>`+line(100,310,670,310,C.teal,'10 8');b+=node(100,310,'n')+node(670,310,'G',C.teal)+text(230,200,'route distance',24,C.blue)+text(560,350,'straight-line h',25,C.teal);return svg(b,800,480,'Straight-line distance underestimates a route around an obstacle');}
  function mount(){document.querySelectorAll('[data-diagram]').forEach(el=>{const name=el.dataset.diagram;el.innerHTML=name==='cover'?cover():name==='directed'?directed():name==='weighted'?directed(true):name==='course'?graphSVG(SearchEngine.fromTree(TREE_DATA),{best:{path:['A','B','F','P','S']}}):name==='unfold'?unfold():name==='breadth'?order(false):name==='depth'?order(true):heuristic();});}
  scope.SearchVisuals={graphSVG,mount,esc};
})(window);
