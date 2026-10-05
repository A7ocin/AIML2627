(function(scope){
 const {esc,bandit}=MLVisuals;
 const options=(xs,selected)=>xs.map(x=>`<option value="${esc(x)}" ${String(x)===String(selected)?'selected':''}>${esc(x)}</option>`).join('');
 const select=(key,label,xs,selected)=>`<label>${label} <select data-setting="${key}">${options(xs,selected)}</select></label>`;
 const button=(a,label,primary=false)=>`<button data-action="${a}" class="${primary?'primary':''}">${label}</button>`;
 const box=(label,body)=>`<div class="ml-box"><div class="ml-heading">${label}</div>${body}</div>`;
 const baseLayout=()=>({paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Segoe UI, sans-serif',size:22,color:'#e8ecf4'},margin:{l:86,r:30,t:34,b:95},height:535,autosize:true,xaxis:{title:{text:'% Fertilizer · source scale',standoff:14},gridcolor:'#293244',zeroline:false},yaxis:{title:{text:'Crop yield',standoff:12},gridcolor:'#293244',zeroline:false},legend:{orientation:'h',y:-.20,x:0,font:{size:20}},hovermode:'closest',dragmode:'zoom',showlegend:true});
 class Widget{
  constructor(el){this.el=el;this.kind=el.dataset.kind;this.timer=null;this.running=false;this.revealed=false;this.checked=false;this.ready=Promise.resolve();let toolbar='';
   if(this.kind==='signals')toolbar=select('scenario','Scenario',[1,2,3,4,5,6],1)+select('answer','Setting',['Supervised','Unsupervised','Self-supervised','Semi-supervised','Reinforcement'],'Supervised')+button('check','Check answer',true);
   if(this.kind==='mask')toolbar=select('sentence','Sentence',[1,2,3],1)+select('token','Hidden token',[1,2,3,4],4)+button('reveal','Reveal target',true);
   if(this.kind==='bandit')toolbar=button('play','Play',true)+button('back','← Back')+button('next','Next →')+button('reset','Reset')+select('epsilon','ε',[0,.1,.3,1],.1)+select('seed','Seed',[7,1,23],7)+button('armA','Pull A')+button('armB','Pull B')+button('armC','Pull C')+button('reveal','Show true rates');
   if(['observations','hypothesis'].includes(this.kind))toolbar=button('zoom','Zoom',true)+button('pan','Pan')+button('view','Reset view')+select('point','Inspect point',Array.from({length:25},(_,i)=>i+1),1);
   if(this.kind==='generalization')toolbar=select('degree','Degree',[0,1,2,5,9],2)+select('noise','Noise σ',[0,.25,.6],.25)+select('seed','Seed',[7,1,23],7)+button('truth','Show generating curve')+button('zoom','Zoom')+button('pan','Pan')+button('view','Reset view');
   el.setAttribute('role','region');el.setAttribute('aria-label',this.kind+' interactive lab');
   el.innerHTML=`<div class="ml-toolbar">${toolbar}</div><div class="ml-main"><div class="ml-graphic"></div><div class="ml-side" aria-live="polite"></div></div><div class="ml-bottom"><span></span><span></span></div>`;
   this.graphic=el.querySelector('.ml-graphic');this.side=el.querySelector('.ml-side');this.footer=el.querySelector('.ml-bottom');
   el.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)this.action(b.dataset.action);});
   el.addEventListener('change',e=>{const k=e.target.dataset.setting;if(this.kind==='signals')this.checked=false;if(this.kind==='mask'){this.revealed=false;if(k==='sentence'){const words=ML.sentences[this.value('sentence')-1].split(' ');this.setting('token').innerHTML=options(words.map((_,i)=>i+1),words.length);}}if(this.kind==='bandit')this.reset();else this.render();});
   el.addEventListener('keydown',e=>e.stopPropagation());this.reset();
  }
  setting(k){return this.el.querySelector(`[data-setting="${k}"]`);}
  value(k){return this.setting(k)?.value;}
  reset(){this.pause();this.revealed=false;this.checked=false;if(this.kind==='bandit')this.b=new ML.Bandit(Number(this.value('seed')));this.render();}
  pause(){clearTimeout(this.timer);this.running=false;const b=this.el.querySelector('[data-action="play"]');if(b)b.textContent='Play';}
  action(a){
   if(a==='reset'){this.reset();return;}
   if(a==='zoom'||a==='pan'){this.ready=Plotly.relayout(this.plot,{dragmode:a});return;}
   if(a==='view'){this.ready=Plotly.relayout(this.plot,{'xaxis.autorange':true,'yaxis.autorange':true});return;}
   if(a==='truth'){this.revealed=!this.revealed;this.render();return;}
   if(a==='check'){this.checked=true;this.render();return;}
   if(a==='reveal'){this.revealed=!this.revealed;this.render();return;}
   if(this.kind==='bandit'){
    if(a==='play'){if(this.running){this.pause();return;}this.running=true;this.el.querySelector('[data-action="play"]').textContent='Pause';this.schedule();return;}
    this.pause();if(a==='back')this.b.index=Math.max(0,this.b.index-1);else if(a==='next')this.advance();else if(a.startsWith('arm'))this.b.pull(a.charCodeAt(3)-65);this.render();
   }
  }
  advance(){if(this.b.index<this.b.history.length-1)this.b.index++;else if(this.b.index<60)this.b.step(Number(this.value('epsilon')));}
  schedule(){this.timer=setTimeout(()=>{if(!this.running)return;this.advance();if(this.b.index>=60)this.pause();this.render();if(this.running)this.schedule();},400);}
  plotData(data,layout){if(!this.plot){this.graphic.innerHTML='<div class="ml-plot"></div>';this.plot=this.graphic.firstElementChild;this.ready=Plotly.newPlot(this.plot,data,layout,{displayModeBar:false,responsive:false,scrollZoom:false});}else this.ready=Plotly.react(this.plot,data,layout,{displayModeBar:false,responsive:false,scrollZoom:false});}
  render(){let left='',right='',foot='',tail='';
   if(this.kind==='signals'){const s=ML.scenarios[this.value('scenario')-1],ok=this.value('answer')===s.answer;left=`<div class="scenario"><span class="number">SCENARIO ${this.value('scenario')} / 6</span><p>${esc(s.title)}</p></div>`;right=box('Your classification',esc(this.value('answer')))+(this.checked?`<div class="ml-box ml-answer ${ok?'good':'bad'}"><div class="ml-heading">${ok?'Correct':'Reconsider the signal'}</div><p>${esc(s.why)}</p></div>`:'<p>Identify what supplies feedback, then check your answer.</p>');foot='One scenario can have a task type and a learning setting.';}
   if(this.kind==='mask'){const words=ML.sentences[this.value('sentence')-1].split(' '),i=Number(this.value('token'))-1;left='<div class="mask-display"><div class="mask-caption">Input available to the learner</div><div class="tokens">'+words.map((w,j)=>`<span class="token ${i===j?'hidden':''}">${i===j?'[MASK]':esc(w)}</span>`).join('')+'</div><div class="mask-caption">Training target</div><div class="target-token">'+(this.revealed?esc(words[i]):'?')+'</div></div>';right=box('Where the target comes from','<p>The original sentence already contains the answer.</p>')+box('What training would compare','<p>A model’s prediction for the hidden position versus the recorded token.</p>');foot='This constructs a training pair; no language model is running.';this.el.querySelector('[data-action="reveal"]').textContent=this.revealed?'Hide target':'Reveal target';}
   if(this.kind==='bandit'){const s=this.b.state;left=bandit(s,this.revealed);right=`<div class="ml-status">${this.b.index?s.mode+' · arm '+String.fromCharCode(65+s.arm)+' · reward '+s.reward:'Start with unknown reward rates.'}</div>`+box('Reward collected',`<span class="ml-metric">${s.total}</span> / ${this.b.index} pulls`)+box('Policy','<p>Try each arm once; then explore with probability ε, otherwise exploit a highest estimated mean.</p>')+`<p class="ml-small">${this.revealed?'Orange lines: true reward probabilities. The policy only uses observed rewards.':'Bar heights are observed means. A small sample can be misleading.'}</p>`;foot='Blue A · Purple B · Teal C · rewards are 0 or 1';tail=`Pull ${this.b.index} / 60`;for(const a of ['armA','armB','armC'])this.el.querySelector(`[data-action="${a}"]`).disabled=this.b.index!==this.b.history.length-1||this.b.index>=60;this.el.querySelector('[data-action="back"]').disabled=this.b.index===0;for(const a of ['play','next'])this.el.querySelector(`[data-action="${a}"]`).disabled=this.b.index>=60;this.el.querySelector('[data-action="reveal"]').textContent=this.revealed?'Hide true rates':'Show true rates';}
   if(['observations','hypothesis'].includes(this.kind)){
    const source=COURSE_DATA[this.kind==='observations'?'nonlinear':'nonlinear_mod'],data=source.data.map((t,i)=>({...JSON.parse(JSON.stringify(t)),marker:{...t.marker,color:'#4db8ff',size:11},line:{...t.line,color:'#45d6c0',width:4},hovertemplate:'x = %{x:.4f}<br>y = %{y:.4f}<extra>%{fullData.name}</extra>'}));
    const layout=baseLayout();layout.uirevision='course';this.plotData(data,layout);
    const i=Number(this.value('point'))-1,x=data[0].x[i],y=data[0].y[i];right=box('Observation '+(i+1),`x = ${x.toFixed(4)}<br>y = ${y.toFixed(4)}`);
    if(data.length>1){const yh=data[1].y[i],mse=data[0].y.reduce((s,y,j)=>s+(y-data[1].y[j])**2,0)/25;right+=box('Provided hypothesis',`ŷ = ${yh.toFixed(4)}<br>Residual = ${(y-yh).toFixed(4)}`)+box('MSE on these 25 points',`<span class="ml-metric">${mse.toFixed(4)}</span>`);}
    else right+=box('25 paired measurements','<p>The scatter suggests a relationship. The shape alone does not establish its cause.</p>');right+='<p class="ml-small">Original course coordinates. Physical units and data provenance are not specified.</p>';foot='Hover · drag to zoom · Pan · Reset view';tail=this.kind==='hypothesis'?'Click legend entries to toggle traces':'Source: nonlinear.json';
   }
   if(this.kind==='generalization'){
    const e=ML.experiment(Number(this.value('degree')),Number(this.value('seed')),Number(this.value('noise')));this.result=e;const xs=Array.from({length:241},(_,i)=>-1+i/120),data=[{x:e.train.map(p=>p.x),y:e.train.map(p=>p.y),mode:'markers',name:'Training',marker:{color:'#4db8ff',size:10}},{x:e.validation.map(p=>p.x),y:e.validation.map(p=>p.y),mode:'markers',name:'Validation',marker:{color:'#c792ea',symbol:'diamond-open',size:9}},{x:xs,y:xs.map(x=>ML.predict(e.coef,x)),mode:'lines',name:'Fitted curve',line:{color:'#45d6c0',width:3}}];
    if(this.revealed)data.push({x:xs,y:xs.map(ML.truth),mode:'lines',name:'Generating curve',line:{color:'#ff9d4d',width:3,dash:'dot'}});const layout=baseLayout();layout.xaxis.title.text='Predictor x · synthetic';layout.yaxis.title.text='Outcome y';layout.legend.font.size=17;this.plotData(data,layout);right=box('Training MSE',`<span class="ml-metric">${e.trainMSE.toFixed(4)}</span>`)+box('Validation MSE',`<span class="ml-metric">${e.validationMSE.toFixed(4)}</span>`)+`<p>Degree ${this.value('degree')}: ${Number(this.value('degree'))+1} fitted coefficients.</p><p class="ml-small">16 training points · 40 validation points.<br>Only training targets enter the fit.</p>`;foot='Same synthetic process, separate noisy observations.';tail='Validation supports model choice';this.el.querySelector('[data-action="truth"]').textContent=this.revealed?'Hide generating curve':'Show generating curve';
   }
   if(left)this.graphic.innerHTML=left;if(right)this.side.innerHTML=right;this.footer.children[0].textContent=foot;this.footer.children[1].textContent=tail;
  }
 }
 scope.MLWidgets={instances:[],mount(){this.instances=[...document.querySelectorAll('.ml-widget')].map(el=>new Widget(el));return Promise.all(this.instances.map(w=>w.ready));},pauseAll(){this.instances.forEach(w=>w.pause());},resize(){this.instances.filter(w=>w.plot&&Reveal.getCurrentSlide()?.contains(w.el)).forEach(w=>w.ready=Plotly.Plots.resize(w.plot));}};
})(window);
