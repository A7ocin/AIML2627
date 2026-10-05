(function(scope){
  'use strict';
  const {esc,graphSVG}=SearchVisuals;
  const controls='<button type="button" data-action="play">Play</button><button type="button" data-action="prev">← Back</button><button type="button" data-action="next">Next →</button><button type="button" data-action="reset">Reset</button>';
  class SearchWidget {
    constructor(el){
      this.el=el;this.algorithm=el.dataset.algorithm;this.kind=el.dataset.graph;this.isRunning=false;this.timer=null;
      this.graph=this.kind==='routes'?SearchEngine.routes():SearchEngine.fromTree(TREE_DATA);
      el.setAttribute('role','region');el.setAttribute('aria-label',SearchEngine.ALGORITHMS[this.algorithm].name+' interactive demonstration');
      const goals=['BFS','DFS','IDS'].includes(this.algorithm)?'<label>Goal <select data-setting="goal"><option>S</option><option>B</option><option>R</option><option value="Z">Unreachable</option></select></label>':'';
      const algo=this.kind==='routes'&&this.algorithm!=='BNB'?'<label>Method <select data-setting="algorithm"><option value="BFS">BFS</option><option value="UCS" selected>Lowest-cost-first</option><option value="GBFS">Greedy</option><option value="ASTAR">A*</option></select></label>':'';
      const heuristic=this.algorithm==='ASTAR'?'<label><input type="checkbox" data-setting="zero">h = 0</label>':'';
      const bound=this.algorithm==='BNB'?'<label>Initial bound <select data-setting="bound"><option value="Infinity">∞</option><option value="12">12</option><option value="6">6</option></select></label>':'';
      el.innerHTML=`<div class="demo-toolbar">${controls}${goals}${algo}${heuristic}${bound}<label class="speed-control">Speed <select data-setting="speed"><option value="1400">Slow</option><option value="850" selected>Normal</option><option value="320">Fast</option></select></label></div><div class="demo-main"><div class="demo-canvas"><div class="demo-graph"></div><div class="current-path"></div></div><div class="demo-sidebar"><div class="demo-rule"></div><div class="demo-status" role="status" aria-live="polite"></div><div class="demo-metrics"></div><div class="frontier-title"><span>Frontier</span><span>Next path first</span></div><div class="frontier-list"></div><div class="solution-box"></div></div></div><div class="demo-legend"><div class="legend-items"><span><i></i>Processed</span><span><i class="front"></i>Frontier</span><span><i class="active"></i>Selected</span><span><i class="goal"></i>Solution · ◇ goal</span>${this.algorithm==='BNB'?'<span><i class="pruned-dot"></i>Pruned</span>':''}</div><span class="demo-progress"></span></div>`;
      el.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;this[b.dataset.action]();});
      el.addEventListener('change',e=>{if(e.target.dataset.setting==='speed'){if(this.isRunning){this.pause();this.play();}}else this.reset();});
      el.addEventListener('keydown',e=>{
        // Form controls keep their native keyboard behavior and do not navigate Reveal.
        e.stopPropagation();
        if(e.target.tagName==='SELECT'||e.target.tagName==='INPUT')return;
        if(e.key==='ArrowRight'){e.preventDefault();this.next();}
        if(e.key==='ArrowLeft'){e.preventDefault();this.prev();}
      });
      this.reset();
    }
    setting(name){return this.el.querySelector(`[data-setting="${name}"]`);}
    reset(){
      this.pause();this.algorithm=this.setting('algorithm')?.value||this.el.dataset.algorithm;
      this.goals=this.setting('goal')?[this.setting('goal').value]:this.graph.goals;
      this.zero=this.setting('zero')?.checked||false;
      this.weighted=this.kind==='routes'||!['BFS','DFS','IDS'].includes(this.algorithm);
      this.states=SearchEngine.trace(this.graph,this.algorithm,{goals:this.goals,zeroHeuristic:this.zero,weighted:this.weighted,bound:this.setting('bound')?Number(this.setting('bound').value):Infinity});
      this.index=0;this.render();
    }
    next(){this.pause();if(this.index<this.states.length-1)this.index++;this.render();}
    prev(){this.pause();if(this.index>0)this.index--;this.render();}
    play(){if(this.isRunning){this.pause();this.render();return;}if(this.index===this.states.length-1)return;this.isRunning=true;this.render();this.schedule();}
    schedule(){this.timer=setTimeout(()=>{if(!this.isRunning)return;if(this.index<this.states.length-1)this.index++;if(this.index===this.states.length-1)this.pause();this.render();if(this.isRunning)this.schedule();},Number(this.setting('speed').value));}
    pause(){clearTimeout(this.timer);this.timer=null;this.isRunning=false;const b=this.el.querySelector('[data-action="play"]');if(b)b.textContent='Play';}
    seek(index){this.pause();this.index=Math.max(0,Math.min(index,this.states.length-1));this.render();}
    render(){
      const s=this.states[this.index],heuristics=['GBFS','HDFS','ASTAR','BNB'].includes(this.algorithm);
      this.el.querySelector('.demo-graph').innerHTML=graphSVG(this.graph,s,{weights:this.weighted&&!['GBFS','HDFS'].includes(this.algorithm),heuristics,goals:this.goals,zero:this.zero});
      this.el.querySelector('.demo-rule').textContent=SearchEngine.ALGORITHMS[this.algorithm].rule;
      this.el.querySelector('.demo-status').textContent=s.message;
      this.el.querySelector('.demo-metrics').innerHTML=`<span>Selected <b>${s.selected.length}</b></span><span>Expanded <b>${s.expanded}</b></span><span>Peak frontier <b>${s.peak}</b></span>`;
      const priority=p=>this.algorithm==='ASTAR'||this.algorithm==='BNB'?`g ${p.g} · h ${p.h} · f ${p.f}`:this.algorithm==='UCS'?`g = ${p.g}`:heuristics?`h = ${p.h}`:`depth ${p.path.length-1}`;
      this.el.querySelector('.frontier-list').innerHTML=s.frontier.length?s.frontier.map(p=>`<div class="frontier-item"><span class="path">${p.path.map(esc).join(' → ')}</span><span class="priority">${priority(p)}</span></div>`).join(''):'<span class="frontier-empty">Empty</span>';
      this.el.querySelector('.current-path').innerHTML='<span>Selected path</span>'+(s.current?s.current.path.map(esc).join(' → '):'—');
      this.el.querySelector('.solution-box').innerHTML='<span>'+(this.algorithm==='BNB'?'Best solution so far':'Solution')+'</span>'+(s.best?s.best.path.map(esc).join(' → ')+` · cost ${s.best.g}`:'Waiting for a goal');
      this.el.querySelector('.demo-progress').textContent=`Step ${this.index} / ${this.states.length-1}`+(this.algorithm==='IDS'?` · depth limit ${s.limit}`:'')+(this.algorithm==='BNB'?` · bound ${Number.isFinite(s.bound)?s.bound:'∞'}`:'');
      const b=a=>this.el.querySelector(`[data-action="${a}"]`);
      b('play').textContent=this.isRunning?'Pause':'Play';b('play').disabled=s.done;b('prev').disabled=this.index===0;b('next').disabled=s.done;
      this.el.dataset.step=this.index;this.el.dataset.done=s.done;
    }
  }
  scope.SearchWidgets={instances:[],mount(){this.instances=[...document.querySelectorAll('.search-demo')].map(el=>new SearchWidget(el));},pauseAll(){this.instances.forEach(w=>w.pause());}};
})(window);
