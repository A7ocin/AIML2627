(function(scope){
 const colors={text:'#e8ecf4',muted:'#93a0b6',line:'#526079',teal:'#45d6c0',blue:'#4db8ff',purple:'#c792ea',red:'#ff5c77',orange:'#ff9d4d'};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const pretty=s=>String(s).replace(/X1/g,'X₁').replace(/X2/g,'X₂').replace(/X3/g,'X₃');
 const txt=(x,y,label,size=28,color=colors.text,anchor='middle')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" dominant-baseline="central">${esc(pretty(label))}</text>`;
 const svg=(body,label,w=1100,h=560)=>`<svg class="cp-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
 const path=(d,color=colors.line,width=3,dash='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?'stroke-dasharray="'+dash+'"':''}/>`;
 function tree(nodes,s,split=false){
  const children=id=>nodes.filter(n=>n.parent===id);let count=0;const ps={};
  function place(id){const ns=children(id);ns.forEach(n=>place(n.id));ps[id]={x:ns.length?ns.reduce((sum,n)=>sum+ps[n.id].x,0)/ns.length:count++,y:nodes[id].depth};}place(0);
  const max=Math.max(1,...nodes.map(n=>n.depth)),margin=split?140:75;for(const p of Object.values(ps)){p.x=margin+p.x*(1200-2*margin)/Math.max(1,count-1);if(count===1)p.x=600;p.y=70+p.y*440/max;}
  const visited=new Set(s.visited);let b='';
  nodes.forEach(n=>{if(n.parent!==null){const a=ps[n.parent],z=ps[n.id],mid=(a.y+z.y)/2;b+=path(`M${a.x} ${a.y+25} C${a.x} ${mid} ${z.x} ${mid} ${z.x} ${z.y-25}`);}});
  nodes.forEach(n=>{const p=ps[n.id],seen=visited.has(n.id),color=!seen?colors.line:n.status==='fail'?colors.red:n.status==='solution'?colors.teal:colors.blue;const label=split?n.label:pretty(n.label);
   b+=`<g data-tree-node="${n.id}" tabindex="0" role="button" aria-label="${esc(label)}" transform="translate(${p.x},${p.y})"><title>${esc(split?label:JSON.stringify(n.a))}</title>`;
   if(s.current===n.id)b+=split?`<rect x="-109" y="-40" width="218" height="80" rx="16" fill="none" stroke="${colors.orange}" stroke-width="3"/>`:`<ellipse rx="42" ry="32" fill="none" stroke="${colors.orange}" stroke-width="3"/>`;
   b+=split?`<rect x="-100" y="-31" width="200" height="62" rx="12" fill="#141a26" stroke="${color}" stroke-width="2"/>`:`<ellipse rx="35" ry="24" fill="#141a26" stroke="${color}" stroke-width="2"/>`;
   b+=txt(0,0,label,split?23:22)+ (seen&&n.status==='fail'?txt(0,split?54:47,'×',26,colors.red):seen&&n.status==='solution'?txt(0,split?54:47,'✓',24,colors.teal):'')+'</g>';
  });return svg(b,split?'Domain splitting search tree':'Pruned course assignment tree',1200,600);
 }
 function network(p,s={domains:p.domains,arc:null}){
  const pos={},cpos={};p.vars.forEach((v,i)=>pos[v]=90+i*180);p.constraints.forEach((c,i)=>cpos[c.id]=90+i*180);let b='';
  p.constraints.forEach(c=>c.vars.forEach(v=>{const active=s.arc?.v===v&&s.arc?.c===c.id;b+=path(`M390 ${pos[v]} C560 ${pos[v]} 560 ${cpos[c.id]} 730 ${cpos[c.id]}`,active?colors.orange:colors.line,active?5:2.5);}));
  p.vars.forEach(v=>{const y=pos[v],ds=s.domains[v],active=s.arc?.v===v;b+=`<rect x="65" y="${y-47}" width="325" height="94" rx="45" fill="#141a26" stroke="${active?colors.orange:colors.blue}" stroke-width="3"/>`+txt(123,y,v,31)+txt(267,y,ds.length?'{'+ds.join(', ')+'}':'∅',30,ds.length?colors.text:colors.red);});
  p.constraints.forEach(c=>{const y=cpos[c.id];b+=`<rect x="730" y="${y-38}" width="290" height="76" rx="12" fill="#141a26" stroke="${s.arc?.c===c.id?colors.orange:colors.purple}" stroke-width="3"/>`+txt(875,y,c.label,30);});
  return svg(b,p.name+' constraint network');
 }
 function coloring(a,history=[]){const ps={A:[275,95],B:[730,95],C:[730,315],D:[275,315]},fills=['#9c4255','#25705d','#335f96'],letters=['R','G','B'];let b='';
  CSP.edges.forEach(([v,w])=>{const [x,y]=ps[v],[xx,yy]=ps[w],bad=a[v]===a[w];b+=path(`M${x} ${y}L${xx} ${yy}`,bad?colors.red:colors.line,bad?5:3);if(bad)b+=txt((x+xx)/2,(y+yy)/2-18,'×',28,colors.red);});
  Object.entries(ps).forEach(([v,[x,y]])=>{b+=`<circle cx="${x}" cy="${y}" r="43" fill="${fills[a[v]]}" stroke="#c2cee0" stroke-width="2"/>`+txt(x,y,v+' · '+letters[a[v]],28);});
  if(history.length){b+=txt(100,443,'Conflicts',23,colors.muted,'start')+path('M220 430L220 530L1000 530');for(const n of [0,5])b+=txt(195,530-n*18,n,20,colors.muted);const points=history.map((s,i)=>[220+i*780/Math.max(1,history.length-1),530-s.score*18]);b+=path('M'+points.map(p=>p.join(' ')).join('L'),colors.teal,3);}
  return svg(b,'Three-color assignment with conflict markers');
 }
 function probability(delta,T,u){let b=path('M100 60L100 450L1020 450');for(const x of [-3,0,3,6])b+=txt(100+(x+3)*920/9,486,x,25,colors.muted);for(const p of [0,.5,1])b+=txt(60,450-p*350,p,25,colors.muted);b+=txt(560,535,'Score change ΔE',26,colors.muted)+txt(100,28,'Acceptance probability',25,colors.muted,'start');const pts=Array.from({length:181},(_,i)=>{const d=-3+i*.05;return [100+(d+3)*920/9,450-CSP.acceptance(d,T)*350];});b+=path('M'+pts.map(p=>p.join(' ')).join('L'),colors.teal,4);const x=100+(delta+3)*920/9,y=450-CSP.acceptance(delta,T)*350;b+=path(`M100 ${450-u*350}L1020 ${450-u*350}`,colors.purple,2,'8 7')+txt(1020,450-u*350-20,'test draw u',22,colors.purple,'end')+`<circle cx="${x}" cy="${y}" r="9" fill="${colors.orange}" stroke="#0b0f17" stroke-width="3"/>`;return svg(b,'Annealing acceptance curve with selected score change and test draw');}
 function cooling(){let b=path('M100 65L100 435L1000 435');const pts=Array.from({length:41},(_,i)=>[100+i*22,435-330*Math.pow(.92,i)]);b+=path('M'+pts.map(p=>p.join(' ')).join('L'),colors.orange,5)+txt(100,30,'Temperature T',27,colors.muted,'start')+txt(575,500,'Iteration k',27,colors.muted);for(const n of [0,20,40])b+=txt(100+n*22,465,n,24,colors.muted);return svg(b,'Geometric cooling schedule');}
 function cover(){return network({name:'Constraint satisfaction',vars:['X1','X2','X3'],domains:{X1:[1],X2:[1,2],X3:[0]},constraints:[{id:'a',label:'X₁ < 2',vars:['X1']},{id:'b',label:'X₂ > 0',vars:['X2']},{id:'c',label:'X₃ < X₁',vars:['X3','X1']}]});}
 function mount(){document.querySelectorAll('[data-diagram]').forEach(el=>{const kind=el.dataset.diagram;el.innerHTML=kind==='cover'?cover():kind==='network'||kind==='chain'?network(CSP.problem('chain')):kind==='coloring'?coloring({A:0,B:1,C:0,D:2}):cooling();});}
 scope.CSPVisuals={esc,pretty,txt,svg,tree,network,coloring,probability,mount};
})(window);
