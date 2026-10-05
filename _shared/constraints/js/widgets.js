(function(scope){
 const {esc,pretty,tree,network,coloring,probability}=CSPVisuals;
 const controls='<button data-action="play">Play</button><button data-action="prev">← Back</button><button data-action="next">Next →</button><button data-action="reset">Reset</button>';
 const fmt=a=>Object.entries(a).map(([v,x])=>pretty(v)+' = '+x).join(', ')||'∅';
 const ruleHTML=(p,a)=>p.constraints.map(c=>{const r=CSP.evaluate(c,a);return `<div class="cp-rule ${r===null?'pending':r?'true':'false'}"><span>${esc(c.label)}</span><b>${r===null?'Pending':r?'✓ True':'× False'}</b></div>`;}).join('');
 class Widget{
  constructor(el){
   this.el=el;this.kind=el.dataset.kind;this.timer=null;this.isRunning=false;this.manual=['assignment','anneal'].includes(this.kind);
   let settings='';
   if(this.kind==='dfs')settings='<label>Value order <select data-setting="order"><option value="forward">0, 1, 2</option><option value="reverse">2, 1, 0</option></select></label>';
   if(['gac','split'].includes(this.kind))settings='<label>Example <select data-setting="example"><option value="course">Course CSP</option><option value="chain">A &lt; B &lt; C</option><option value="contradiction">Consistent but unsatisfiable</option></select></label>';
   if(this.kind==='local')settings='<label>Policy <select data-setting="policy"><option value="best">Strict improvement</option><option value="sampling">Random sampling</option><option value="walk">Random walk</option><option value="tabu">Tabu (tenure 2)</option><option value="anneal">Annealing</option></select></label><label>Start <select data-setting="start"><option value="plateau">Plateau</option><option value="red">All red</option></select></label><label>Seed <select data-setting="seed"><option>7</option><option>1</option><option>23</option></select></label>';
   if(this.kind==='assignment')settings=['X1','X2','X3'].map(v=>`<label>${pretty(v)} <select data-setting="${v}"><option value="">Unassigned</option><option>0</option><option>1</option><option>2</option></select></label>`).join('');
   if(this.kind==='anneal')settings='<label>ΔE <input data-setting="delta" type="range" min="-3" max="6" step="1" value="2"><output data-output="delta">2</output></label><label>Temperature <select data-setting="T"><option value="4">4</option><option value="1" selected>1</option><option value="0.5">0.5</option><option value="0.1">0.1</option></select></label><label>Test draw u <select data-setting="u"><option value="0.1">0.1</option><option value="0.5" selected>0.5</option><option value="0.9">0.9</option></select></label>';
   el.setAttribute('role','region');el.setAttribute('aria-label',this.kind+' interactive demonstration');
   el.innerHTML=`<div class="cp-toolbar">${this.manual?'':controls}${settings}${this.manual?'':'<label class="speed">Speed <select data-setting="speed"><option value="1400">Slow</option><option value="850" selected>Normal</option><option value="300">Fast</option></select></label>'}</div><div class="cp-main"><div class="cp-graphic"></div><div class="cp-side"></div></div><div class="cp-bottom"><div class="cp-legend"></div><span class="cp-step"></span></div>`;
   el.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)this[b.dataset.action]();});
   el.addEventListener('change',e=>{if(e.target.dataset.setting==='speed'){if(this.isRunning){this.pause();this.play();}}else this.reset();});
   el.addEventListener('input',e=>{if(this.kind==='anneal'&&e.target.matches('input'))this.render();});
   el.addEventListener('keydown',e=>{e.stopPropagation();if(e.target.matches('select,input')||this.manual)return;if(e.key==='ArrowRight'){e.preventDefault();this.next();}if(e.key==='ArrowLeft'){e.preventDefault();this.prev();}});
   if(this.kind==='dfs'){
    const inspect=e=>{const n=e.target.closest('[data-tree-node]');if(n)this.inspect(Number(n.dataset.treeNode));};
    el.addEventListener('mouseover',inspect);el.addEventListener('focusin',inspect);
    el.addEventListener('mouseout',e=>{if(e.target.closest('[data-tree-node]')&&!e.relatedTarget?.closest?.('[data-tree-node]'))this.side(this.states[this.index]);});
    el.addEventListener('focusout',e=>{if(e.target.closest('[data-tree-node]'))this.side(this.states[this.index]);});
   }
   this.reset();
  }
  setting(key){return this.el.querySelector(`[data-setting="${key}"]`);}
  value(key){return this.setting(key)?.value;}
  reset(){this.pause();this.p=CSP.problem(this.value('example')||'course');this.index=0;if(this.kind==='dfs'||this.kind==='split'){const result=this.kind==='dfs'?CSP.dfs(this.p,this.value('order')==='reverse'):CSP.split(this.p);this.nodes=result.nodes;this.states=result.states;}else if(this.kind==='gac')this.states=CSP.gac(this.p).states;else if(this.kind==='local')this.states=CSP.local(this.value('policy'),Number(this.value('seed')),this.value('start'));else this.states=[];this.render();}
  pause(){clearTimeout(this.timer);this.timer=null;this.isRunning=false;const b=this.el.querySelector('[data-action="play"]');if(b)b.textContent='Play';}
  play(){if(this.isRunning){this.pause();return;}if(this.index===this.states.length-1)return;this.isRunning=true;this.render();this.schedule();}
  schedule(){this.timer=setTimeout(()=>{if(!this.isRunning)return;this.index++;if(this.index>=this.states.length-1)this.pause();this.render();if(this.isRunning)this.schedule();},Number(this.value('speed')));}
  next(){this.pause();this.index=Math.min(this.states.length-1,this.index+1);this.render();}
  prev(){this.pause();this.index=Math.max(0,this.index-1);this.render();}
  seek(i){this.pause();this.index=Math.max(0,Math.min(i,this.states.length-1));this.render();}
  inspect(id){const n=this.nodes[id],s=this.states[this.index];this.side({...s,a:n.a,message:'Inspecting node: '+fmt(n.a)});}
  side(s){
   const el=this.el.querySelector('.cp-side');let b=`<div class="cp-status" role="status" aria-live="polite">${esc(s.message)}</div>`;
   if(this.kind==='dfs'){b+=`<div><div class="cp-heading">Context</div><div class="cp-context">${esc(fmt(s.a))}</div></div><div class="cp-rules">${ruleHTML(this.p,s.a)}</div><div class="cp-found"><div class="cp-heading">Solutions found · ${s.found.length}</div>${s.found.map(a=>esc(fmt(a))).join('<br>')||'None yet'}</div>`;}
   if(this.kind==='gac'){b+=`<div><div class="cp-heading">Worklist · ${s.queue.length} arcs</div><div class="cp-queue">${s.queue.map(a=>'<span>'+pretty(a.v)+' · '+esc(this.p.constraints.find(c=>c.id===a.c).label)+'</span>').join('')||'<span>Empty</span>'}</div></div><div class="cp-support"><div class="cp-heading">Support witnesses for selected arc</div>${Object.entries(s.witnesses||{}).map(([x,a])=>x+' → '+esc(fmt(a))).join('<br>')||'Select an arc to inspect its values.'}</div>`;}
   if(this.kind==='split'){b+=`<div><div class="cp-heading">Domains after propagation</div>${this.p.vars.map(v=>`<div class="cp-domain"><span>${pretty(v)}</span><span>${s.domains[v].length?'{'+s.domains[v].join(', ')+'}':'∅'}</span></div>`).join('')}</div><div class="cp-found"><div class="cp-heading">Solutions found · ${s.found.length}</div>${s.found.map(a=>esc(fmt(a))).join('<br>')||'None yet'}</div>`;}
   if(this.kind==='local'){b+=`<div class="cp-metrics"><span>Conflicts <b>${s.score}</b></span><span>Best so far <b>${s.best}</b></span></div><div class="cp-rules">${CSP.edges.map(([v,w])=>`<div class="cp-rule ${s.a[v]===s.a[w]?'false':'true'}"><span>${v} ≠ ${w}</span><b>${s.a[v]===s.a[w]?'× Conflict':'✓ Satisfied'}</b></div>`).join('')}</div><div class="cp-support">${this.value('policy')==='anneal'&&s.T?`T = ${s.T.toFixed(3)} · ΔE = ${s.delta}<br>P = ${s.p.toFixed(3)} · u = ${s.u.toFixed(3)}`:this.value('policy')==='tabu'?'Tabu variables: '+(s.tabu.join(', ')||'none'):'One run · maximum 40 steps'}</div>`;}
   el.innerHTML=b;
  }
  render(){
   const graphic=this.el.querySelector('.cp-graphic'),side=this.el.querySelector('.cp-side'),legend=this.el.querySelector('.cp-legend'),step=this.el.querySelector('.cp-step');
   if(this.kind==='assignment'){
    const a={};this.p.vars.forEach(v=>{if(this.value(v)!=='')a[v]=Number(this.value(v));});const checks=this.p.constraints.map(c=>CSP.evaluate(c,a)),total=Object.keys(a).length===3;
    graphic.innerHTML='<div class="assignment-cards">'+this.p.vars.map(v=>`<div>${pretty(v)}<strong>${v in a?a[v]:'?'}</strong></div>`).join('')+'</div>';
    side.innerHTML=`<div class="cp-status" role="status">${checks.includes(false)?'A constraint is violated. This context cannot become a solution.':total?'All constraints hold. This total assignment is a solution.':'No evaluated constraint is false. Some values are still unassigned.'}</div><div class="cp-rules">${ruleHTML(this.p,a)}</div><div class="cp-found">${Object.keys(a).length} / 3 variables assigned</div>`;legend.textContent='? = unassigned · Pending = incomplete scope';return;
   }
   if(this.kind==='anneal'){
    const d=Number(this.value('delta')),T=Number(this.value('T')),u=Number(this.value('u')),p=CSP.acceptance(d,T);this.el.querySelector('[data-output="delta"]').textContent=d;
    graphic.innerHTML=probability(d,T,u);side.innerHTML=`<div class="cp-status">ΔE = ${d} · T = ${T}</div><div><div class="cp-heading">Acceptance probability</div><div class="probability-value">${(p*100).toFixed(1)}%</div></div><div class="formula">P = min(1, exp(−ΔE/T))</div><div class="cp-decision">u = ${u}<br><strong>${u<p?'Accept the move':'Reject the move'}</strong></div><div class="cp-support">The test draw is user-controlled here. The local-search lab samples its draws.</div>`;legend.innerHTML='<span class="solved">Teal curve: P(accept)</span><span>Purple line: test draw</span><span>Orange point: selected ΔE</span>';return;
   }
   const s=this.states[this.index];graphic.innerHTML=this.kind==='dfs'||this.kind==='split'?tree(this.nodes,s,this.kind==='split'):this.kind==='gac'?network(this.p,s):coloring(s.a,this.states.slice(0,this.index+1));this.side(s);
   legend.innerHTML=['dfs','split'].includes(this.kind)?'<span>Blue: checked</span><span class="failed">× Failed branch</span><span class="solved">✓ Solution</span><span>Orange: selected</span>':this.kind==='gac'?'<span>Ovals: variable domains</span><span>Rectangles: constraints</span><span>Orange: selected arc</span>':'<span>R / G / B: assigned colors</span><span class="failed">× Conflicting edge</span>';
   step.textContent=`Step ${this.index} / ${this.states.length-1}`;
   const b=a=>this.el.querySelector(`[data-action="${a}"]`);b('play').textContent=this.isRunning?'Pause':'Play';b('play').disabled=s.done;b('prev').disabled=this.index===0;b('next').disabled=s.done;this.el.dataset.step=this.index;
  }
 }
 scope.CSPWidgets={instances:[],mount(){this.instances=[...document.querySelectorAll('.cp-widget')].map(el=>new Widget(el));},pauseAll(){this.instances.forEach(w=>w.pause());}};
})(window);
