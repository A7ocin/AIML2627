(function(){'use strict';
document.querySelectorAll('.cl-derivation').forEach(root=>{
 const ss=[...root.querySelectorAll('.cl-step')],single=root.hasAttribute('data-single-step'),markers=[...root.querySelectorAll('[data-step-index]')],reference=root.querySelector('[data-previous-equation]');let selected=0,all=false;
 function render(){ss.forEach((s,i)=>{s.classList.toggle('current',!all&&i===selected);s.classList.toggle('past',!all&&i<selected);s.classList.toggle('future',!all&&i>selected);if(single)s.hidden=!all&&i!==selected;});markers.forEach((b,i)=>{if(i===selected)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.classList.toggle('is-past',i<selected);});
  if(reference){
   reference.replaceChildren();
   reference.hidden=all||selected===0;
   ss[selected].append(reference);
   if(!reference.hidden){
    const label=document.createElement('span');
    label.textContent='Previous step '+selected;
    reference.append(label,ss[selected-1].querySelector('.cl-equation math').cloneNode(true));
   }
  }
  const comment=root.querySelector('.cl-step-comment');if(!all&&ss[selected].dataset.commentHtml){comment.innerHTML=ss[selected].dataset.commentHtml;}else{comment.textContent=all?'All steps are visible. Read the equations in order, then use Back or Next to focus on one step.':ss[selected].dataset.comment;}root.querySelector('.cl-step-count').textContent=all?'All '+ss.length+' steps':'Step '+(selected+1)+' / '+ss.length;root.querySelector('[data-step=back]').disabled=!all&&selected===0;root.querySelector('[data-step=next]').disabled=!all&&selected===ss.length-1;}
 root.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.step==='all'){all=!all;}else if(b.dataset.step==='reset'){selected=0;all=false;}else{if(all){all=false;selected=b.dataset.step==='back'?ss.length-1:0;}else selected=Math.max(0,Math.min(ss.length-1,selected+(b.dataset.step==='next'?1:-1)));}render();}));markers.forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.stepIndex);all=false;render();}));render();
});
const colors=['#6ea8fe','#f4a261'];
document.querySelectorAll('.cl-density-widget').forEach(root=>{
 const ps=COURSE_DATA.cls_two_class.data.flatMap((t,c)=>t.x.map((x,i)=>({x,y:t.y[i],c,id:c*25+i})));
 root.innerHTML='<div class="cl-density-controls"><label>K <select aria-label="Density neighbor count" data-density="k"><option>3</option><option selected>5</option><option>9</option><option>15</option></select></label><label>Query x <input aria-label="Density query x" data-density="x" type="range" min="-.8" max="1.8" step=".05" value=".5"></label><label>Query y <input aria-label="Density query y" data-density="y" type="range" min="-.6" max="1.1" step=".05" value=".2"></label></div><div class="cl-density-layout"><div class="cl-density-plot" role="img" aria-label="Circle around the K nearest training observations"></div><div class="cl-density-result" aria-live="polite"></div></div>';
 const plot=root.querySelector('.cl-density-plot'),out=root.querySelector('.cl-density-result');
 function render(){const val=k=>+root.querySelector('[data-density='+k+']').value,k=val('k'),q=[val('x'),val('y')],r=CLEngine.knn(ps,q,k,1,false),k1=r.near.filter(n=>n.p.c===1).length,radius=r.near[k-1].d,V=Math.PI*radius*radius;
 const traces=[0,1].map(c=>({type:'scatter',mode:'markers',name:'Class '+c,x:ps.filter(p=>p.c===c).map(p=>p.x),y:ps.filter(p=>p.c===c).map(p=>p.y),marker:{color:colors[c],symbol:c?'x':'circle',size:9}}));traces.push({type:'scatter',mode:'markers',name:'Neighbors',x:r.near.map(n=>n.p.x),y:r.near.map(n=>n.p.y),marker:{color:'#45d6c0',symbol:'circle-open',size:18,line:{width:2}}},{type:'scatter',mode:'markers',name:'Query',x:[q[0]],y:[q[1]],marker:{color:'#ba8cff',symbol:'star',size:17}});
 Plotly.react(plot,traces,{paper_bgcolor:'transparent',plot_bgcolor:'#0b0f17',font:{family:'Segoe UI',size:18,color:'#e8ecf4'},margin:{l:60,r:20,t:20,b:85},xaxis:{title:{text:'Feature 1',standoff:14},range:[Math.min(-1.4,q[0]-radius-.1),Math.max(2.4,q[0]+radius+.1)],gridcolor:'#273144'},yaxis:{title:{text:'Feature 2',standoff:12},range:[Math.min(-.9,q[1]-radius-.1),Math.max(1.4,q[1]+radius+.1)],scaleanchor:'x',scaleratio:1,gridcolor:'#273144'},legend:{orientation:'h',y:-.22,font:{size:16}},shapes:[{type:'circle',x0:q[0]-radius,x1:q[0]+radius,y0:q[1]-radius,y1:q[1]+radius,line:{color:'#45d6c0',width:2,dash:'dot'}}]},{displayModeBar:false,responsive:true});
 const f=x=>x.toFixed(3);out.innerHTML='<strong>Query ('+q.map(f).join(', ')+')</strong><br>K = '+k+' neighbors, K₁ = '+k1+' class-1 neighbors<br>n = 50 points, n₁ = 25 class-1 points<br>r = K-th neighbor distance = '+f(radius)+'<br>Area V = πr² = '+f(V)+'<table><tr><td>Input density K/(nV)</td><td>'+f(k/(50*V))+'</td></tr><tr><td>Class-1 density K₁/(n₁V)</td><td>'+f(k1/(25*V))+'</td></tr><tr><td>Class-1 prior n₁/n</td><td>0.500</td></tr></table><div class="cl-key">Posterior estimate = (class density × prior) / input density<br><strong>K₁/K = '+k1+'/'+k+' = '+f(k1/k)+'</strong></div>';root.result={k,k1,V,p:k1/k,q};}
 root.querySelectorAll('[data-density]').forEach(c=>c.addEventListener(c.type==='range'?'input':'change',render));render();if(window.Reveal)Reveal.on('slidechanged',()=>{if(Reveal.getCurrentSlide()?.contains(root))Plotly.Plots.resize(plot);});
});
})();
