(function(scope){
 const {esc}=RGVisuals;
 const num=(x,d=4)=>x==null?'Undefined':!Number.isFinite(x)?String(x):Math.abs(x)>0&&Math.abs(x)<.0001?x.toExponential(3):x.toFixed(d);
 const opts=(xs,s)=>xs.map(x=>`<option value="${esc(x)}" ${String(x)===String(s)?'selected':''}>${esc(x)}</option>`).join('');
 const select=(k,label,xs,s)=>`<label>${label} <select data-setting="${k}">${opts(xs,s)}</select></label>`;
 const btn=(k,label,primary=false)=>`<button data-action="${k}" class="${primary?'primary':''}">${label}</button>`;
 const range=(k,label,min,max,step,v)=>`<label>${label} <input data-setting="${k}" type="range" min="${min}" max="${max}" step="${step}" value="${v}"><output data-output="${k}">${v}</output></label>`;
 const box=(label,body)=>`<div class="rg-box"><div class="rg-heading">${label}</div>${body}</div>`;
 const metric=(label,n)=>box(label,`<span class="rg-metric">${num(n)}</span>`);
 const chartButtons=()=>btn('zoom','Zoom',true)+btn('pan','Pan')+btn('view','Reset view');
 function layout(x='Predictor x',y='Response y'){return {paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Segoe UI, sans-serif',size:21,color:'#e8ecf4'},margin:{l:88,r:28,t:32,b:105},height:535,autosize:true,xaxis:{title:{text:x,standoff:12},gridcolor:'#293244',zeroline:false,autorange:true},yaxis:{title:{text:y,standoff:12},gridcolor:'#293244',zeroline:false,autorange:true},legend:{orientation:'h',y:-.22,x:0,font:{size:18}},hovermode:'closest',dragmode:'zoom',showlegend:true};}
 const line=(x,y,name,color='#45d6c0',dash='solid')=>({x,y,name,mode:'lines',line:{color,width:3,dash}});
 const markers=(data,name='Observations',color='#4db8ff',symbol='circle')=>({x:data.map(p=>p.x),y:data.map(p=>p.y),name,mode:'markers',marker:{color,size:9,symbol},hovertemplate:'x = %{x:.4f}<br>y = %{y:.4f}<extra>%{fullData.name}</extra>'});
 class Widget{
  constructor(el){this.el=el;this.kind=el.dataset.kind;this.source=el.dataset.source;this.overlay=false;this.ready=Promise.resolve();let t='';
   if(this.kind==='source'){
    this.raw=COURSE_DATA[this.source];this.pointTraces=this.raw.data.filter(t=>t.mode==='markers');t=chartButtons();
    if(['lr_scatter_mod','lr_maybe'].includes(this.source))t+=btn('overlay','Show recomputed OLS');
    if(['lr_scatter_polymods_with_test','lr_underfitting'].includes(this.source))t+=select('degree','Degree',this.source==='lr_underfitting'?['All',0,1,2]:['All',1,5,15,23],'All');
    if(this.pointTraces.length>1)t+=select('set','Inspect set',this.pointTraces.map(t=>t.name),this.pointTraces[0].name);
    t+=select('point','Point',this.pointTraces[0].x.map((_,i)=>i+1),1);
   }
   if(this.kind==='residual')t=range('intercept','β₀',0,4,.05,1.5)+range('slope','β₁',-1,5,.05,2)+btn('fit','Fit OLS',true)+btn('reset','Reset')+btn('segments','Hide residuals');
   if(this.kind==='bias')t=select('degree','Degree',[0,1,2,5,9],2)+select('n','Sample size',[12,25,60],25)+select('seed','Seed',[7,1,23],7)+select('x','Inspect x',[-.8,0,.8],.8)+chartButtons();
   if(this.kind==='tails')t=range('t','Observed t',-8,8,.1,2.2)+select('df','Degrees of freedom',[3,10,23,88],23)+btn('source','Use course statistic',true)+chartButtons();
   if(this.kind==='diagnostics')t=select('example','Scenario',['Well behaved','Curvature','Unequal variance','Serial pattern'],'Curvature')+select('axis','Horizontal axis',['Fitted values','Observation order'],'Fitted values')+select('seed','Seed',[7,1,23],7)+chartButtons();
   el.setAttribute('role','region');el.setAttribute('aria-label',this.kind+' regression demonstration');el.innerHTML=`<div class="rg-toolbar">${t}</div><div class="rg-main"><div class="rg-graphic"><div class="rg-plot"></div></div><div class="rg-side" aria-live="polite"></div></div><div class="rg-bottom"><span></span><span></span></div>`;
   this.plot=el.querySelector('.rg-plot');this.side=el.querySelector('.rg-side');this.footer=el.querySelector('.rg-bottom');this.segments=true;
   el.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)this.action(b.dataset.action);});
   el.addEventListener('change',e=>{if(['intercept','slope'].includes(e.target.dataset.setting))this.exactOLS=null;if(e.target.dataset.setting==='t')this.exactT=null;if(e.target.dataset.setting==='set'){const t=this.pointTraces.find(t=>t.name===this.value('set'));this.setting('point').innerHTML=opts(t.x.map((_,i)=>i+1),1);}this.render();});
   el.addEventListener('input',e=>{if(e.target.type==='range'){if(['intercept','slope'].includes(e.target.dataset.setting))this.exactOLS=null;if(e.target.dataset.setting==='t')this.exactT=null;this.render();}});el.addEventListener('keydown',e=>e.stopPropagation());this.render();
  }
  setting(k){return this.el.querySelector(`[data-setting="${k}"]`);}
  value(k){return this.setting(k)?.value;}
  action(a){
   if(a==='zoom'||a==='pan'){this.ready=Plotly.relayout(this.plot,{dragmode:a});return;}
   if(a==='view'){this.ready=Plotly.relayout(this.plot,{'xaxis.autorange':true,'yaxis.autorange':true});return;}
   if(a==='overlay')this.overlay=!this.overlay;
   if(a==='segments')this.segments=!this.segments;
   if(a==='fit'){const o=RG.ols(RG.points(COURSE_DATA.lr_scatter.data[0]));this.setting('intercept').value=o.intercept;this.setting('slope').value=o.slope;this.exactOLS=o;}
   if(a==='reset'){this.setting('intercept').value=1.5;this.setting('slope').value=2;this.exactOLS=null;this.segments=true;}
   if(a==='source'){const o=RG.infer(RG.points(COURSE_DATA.lr_maybe.data[0]));this.setting('df').value=o.df;this.setting('t').value=o.t;this.exactT=o.t;}
   this.render(a);
  }
  draw(data,l){const cfg={displayModeBar:false,responsive:false,scrollZoom:false};this.ready=this.initialized?Plotly.react(this.plot,data,l,cfg):Plotly.newPlot(this.plot,data,l,cfg);this.initialized=true;}
  render(action=''){
   let data=[],l=layout(),side='',foot='Hover to inspect · drag to zoom · use Pan or Reset view',tail='';
   if(this.kind==='source'){
    const curves=this.raw.data.filter(t=>t.mode==='lines'),train=this.pointTraces[0],set=this.pointTraces.find(t=>t.name===this.value('set'))||train,i=Number(this.value('point'))-1;
    l=layout(this.raw.layout.xaxis.title.text+(this.source==='lr_corcau'?' · normalized':' · source scale'),this.raw.layout.yaxis.title.text);l.uirevision=this.source;
    let ci=0;data=this.raw.data.map(t=>{const d=JSON.parse(JSON.stringify(t));d.name=d.name||'Observations';if(d.mode==='lines'){d.line={...d.line,color:['#45d6c0','#c792ea','#ff9d4d','#ff5c77'][ci++],width:3};if(this.value('degree')&&this.value('degree')!=='All')d.visible=d.name==='p = '+this.value('degree')?true:'legendonly';}else d.marker={...d.marker,color:d.name==='Test points'?'#c792ea':'#4db8ff',symbol:d.name==='Test points'?'diamond-open':'circle',size:9};d.hovertemplate='x = %{x:.4f}<br>y = %{y:.4f}<extra>%{fullData.name}</extra>';return d;});
    const trainData=RG.points(train),o=RG.infer(trainData);this.computed=o;side=box((set.name||'Observation')+' · '+(i+1),`<span class="point-values">x = ${num(set.x[i])}<br>y = ${num(set.y[i])}</span>`);
    if(this.source==='lr_scatter')side+=box('25 course observations','<p>Inspect the trend and the departures from it. A straight line is a candidate model.</p>');
    if(this.source==='lr_scatter_mod'){
     const t=curves[0],slope=(t.y.at(-1)-t.y[0])/(t.x.at(-1)-t.x[0]),intercept=t.y[0]-slope*t.x[0],m=RG.metrics(trainData,x=>intercept+slope*x);
     side+='<div class="rg-metrics">'+metric('Supplied line RSS',m.rss)+metric('OLS RSS',o.rss)+'</div>'+box('Recomputed OLS',`β̂₀ = ${num(o.intercept)}<br>β̂₁ = ${num(o.slope)}`)+'<p class="rg-small">The supplied line is close to, but differs from, OLS on these points.</p>';
    }
    if(this.source==='lr_scatter_mod_with_test'){
     const t=curves[0],b1=(t.y.at(-1)-t.y[0])/(t.x.at(-1)-t.x[0]),b0=t.y[0]-b1*t.x[0],ms=this.pointTraces.map(t=>RG.metrics(RG.points(t),x=>b0+b1*x));
     side+='<div class="rg-metrics">'+metric('Train RMSE',ms[0].rmse)+metric('Test RMSE',ms[1].rmse)+'</div>'+box('Same supplied line','<p>Only the evaluation points change. Test targets do not update the coefficients.</p>');
    }
    if(this.source==='lr_scatter_polymods_with_test'){
     const p=this.value('degree'),reported={1:[.9850,.1220],5:[.9878,.1225],15:[.9933,.1548],23:[.9938,.3052]};
     side+=p==='All'?box('Compare the supplied fits','<p>Choose a degree to read its course-reported metrics, or toggle curves in the legend.</p>'):'<div class="rg-metrics">'+metric('Reported train R²',reported[p][0])+metric('Reported test RMSE',reported[p][1])+'</div>';
     side+='<p class="rg-small">Curves and metrics retained from the course. Degree-23 numerical fitting details are not supplied.</p>';l.legend.font.size=17;
    }
    if(this.source==='lr_underfitting'){
     const p=this.value('degree');if(p!=='All'){const c=RG.fit(trainData,Number(p)),m=RG.metrics(trainData,x=>RG.predict(c,x),Number(p)+1),test=RG.metrics(RG.points(this.pointTraces[1]),x=>RG.predict(c,x));side+='<div class="rg-metrics">'+metric('Training R²',m.r2)+metric('Test RMSE',test.rmse)+'</div>'+metric('RSE · n − '+(Number(p)+1),m.rse);}else side+=box('All source observations visible','<p>The original 0–6 vertical limit hid points. Here the view includes the complete range.</p>');side+='<p class="rg-small">RSE uses the appropriate parameter count for each degree.</p>';l.legend.font.size=17;
    }
    if(this.source==='lr_maybe'){side+='<div class="rg-metrics">'+metric('Slope estimate',o.slope)+metric('Slope SE',o.se)+metric('t · '+o.df+' df',o.t)+metric('Two-sided p',o.p)+'</div>'+'<p class="rg-small">Recomputed from these 90 points under classical error assumptions. The source text’s t and p differ.</p>';}
    if(this.source==='lr_corcau'){side+='<div class="rg-metrics">'+metric('Training R²',o.r2)+metric('Slope t · 78 df',o.t)+'</div>'+box('Association, not causation','<p>Temperature or other common causes could explain the pattern.</p>')+'<p class="rg-small">Statistics recomputed from the 80 plotted training points.</p>';}
    if(this.overlay){const xs=[Math.min(...train.x),Math.max(...train.x)];data.push(line(xs,xs.map(x=>o.intercept+o.slope*x),'Recomputed OLS','#ff9d4d','dash'));}
    const overlay=this.el.querySelector('[data-action="overlay"]');if(overlay)overlay.textContent=this.overlay?'Hide recomputed OLS':'Show recomputed OLS';tail='Original source chart';
   }
   if(this.kind==='residual'){
    const pts=RG.points(COURSE_DATA.lr_scatter.data[0]),b0=this.exactOLS?.intercept??Number(this.value('intercept')),b1=this.exactOLS?.slope??Number(this.value('slope')),pred=x=>b0+b1*x,m=RG.metrics(pts,pred);
    this.el.querySelector('[data-output="intercept"]').textContent=num(b0,3);this.el.querySelector('[data-output="slope"]').textContent=num(b1,3);this.currentCoefficients=[b0,b1];
    if(this.segments){const x=[],y=[];pts.forEach(p=>{x.push(p.x,p.x,null);y.push(p.y,pred(p.x),null);});data.push({x,y,mode:'lines',name:'Residuals',line:{color:'#c792ea',width:2},hoverinfo:'skip'});}data.push(markers(pts),line([0,1],[pred(0),pred(1)],'Current line'));l=layout('Fertilizer · source scale','Crop yield');side=box('Current parameters',`β₀ = ${num(b0)}<br>β₁ = ${num(b1)}`)+'<div class="rg-metrics">'+metric('RSS',m.rss)+metric('R²',m.r2)+'</div>'+box('Vertical discrepancies','<p>Each segment compares the observed response with the line at the same x.</p>');foot='Fit OLS uses the exact analytic coefficients.';tail='Original observations · added explorer';this.el.querySelector('[data-action="segments"]').textContent=this.segments?'Hide residuals':'Show residuals';
   }
   if(this.kind==='bias'){
    const degree=Number(this.value('degree')),n=Number(this.value('n')),seed=Number(this.value('seed')),x0=Number(this.value('x')),key=[degree,n,seed].join('/');if(this.cacheKey!==key){this.ensemble=RG.ensemble(degree,n,seed);this.cacheKey=key;}
    const xs=Array.from({length:181},(_,i)=>-1+i/90),fs=this.ensemble.fits,stat=this.ensemble.at(x0);this.currentStats=stat;data=fs.slice(0,15).map((f,i)=>({...line(xs,xs.map(x=>RG.predict(f,x)),'Individual fits','#526079'),opacity:.45,showlegend:i===0}));data.push(line(xs,xs.map(x=>this.ensemble.at(x).mean),'Mean of 60 fits','#45d6c0'),line(xs,xs.map(RG.truth),'True mean','#ff9d4d','dash'));l=layout('Predictor x · synthetic','Predicted response');l.xaxis.ticklabelstandoff=10;l.yaxis.ticklabelstandoff=10;l.shapes=[{type:'line',x0,x1:x0,y0:0,y1:1,yref:'paper',line:{color:'#c792ea',dash:'dot',width:2}}];
    side=box('At x = '+x0,'60 independently noisy training samples')+'<div class="rg-metrics">'+metric('Bias²',stat.bias2)+metric('Variance',stat.variance)+metric('Fresh noise σ²',stat.noise)+metric('Expected error*',stat.total)+'</div>'+'<p class="rg-small">*Finite-ensemble decomposition plus known fresh-noise variance. Thin lines show 15 of the 60 fits.</p>';foot='Known truth: 2 + 1.2x − 0.9x² · noise σ = 0.3';tail='Repeated-sample illustration';
   }
   if(this.kind==='tails'){
    const t=this.exactT??Number(this.value('t')),df=Number(this.value('df')),a=Math.abs(t),p=RG.tP(t,df);this.currentP=p;this.el.querySelector('[data-output="t"]').textContent=num(t,3);const extent=Math.max(5,a+1),xs=Array.from({length:401},(_,i)=>-extent+2*extent*i/400);data=[line(xs,xs.map(x=>RG.tPDF(x,df)),'t density','#4db8ff')];
    for(const sign of [-1,1]){const xx=Array.from({length:101},(_,i)=>sign*(a+(extent-a)*i/100)).sort((a,b)=>a-b);data.push({...line(xx,xx.map(x=>RG.tPDF(x,df)),sign<0?'Two-sided tail area':'Right tail','#c792ea'),fill:'tozeroy',fillcolor:'rgba(199,146,234,.42)',showlegend:sign<0});}
    l=layout('t statistic under H₀','Density');l.shapes=[-a,a].map(x=>({type:'line',x0:x,x1:x,y0:0,y1:RG.tPDF(x,df),line:{color:'#ff9d4d',width:2,dash:'dot'}}));side=box('Observed statistic',`t = ${num(t)}<br>df = ${df}`)+metric('Two-sided p-value',p)+box('Conditional probability','<p>P(|T| ≥ |t|), assuming H₀ and the stated error model.</p>')+'<p class="rg-small">The exact tail probability includes mass beyond the visible plot edges.</p>';foot='Purple shading: values at least as extreme in either direction';tail='A density height is not a probability';
   }
   if(this.kind==='diagnostics'){
    const kind=this.value('example'),d=RG.diagnostic(kind,Number(this.value('seed'))),ordered=this.value('axis')==='Observation order';this.diagnostic=d;data=[{x:d.residuals.map(p=>ordered?p.order:p.fitted),y:d.residuals.map(p=>p.residual),name:'OLS residuals',mode:'markers',marker:{color:'#4db8ff',size:9}}];l=layout(ordered?'Observation order':'Fitted response','Residual y − ŷ');l.showlegend=false;l.shapes=[{type:'line',xref:'paper',x0:0,x1:1,y0:0,y1:0,line:{color:'#45d6c0',width:2,dash:'dot'}}];const notes={'Well behaved':'No designed mean or variance pattern. Random samples can still look uneven.','Curvature':'A straight line omits a quadratic term. Look for a curved residual mean.','Unequal variance':'The error scale grows with x. Look for a widening residual spread.','Serial pattern':'Errors follow an AR(1) pattern. Switch to observation order to inspect runs.'};side=box(kind,`<p>${notes[kind]}</p>`)+metric('Training R²',d.ols.r2)+box('Read the pattern','<p>A high R² does not certify independent, normal or equal-variance errors.</p>');foot='Synthetic data · fresh OLS fit for each scenario and seed';tail='Patterns guide investigation';
   }
   this.side.innerHTML=side;this.footer.children[0].textContent=foot;this.footer.children[1].textContent=tail;this.draw(data,l);
  }
 }
 scope.RGWidgets={instances:[],mount(){this.instances=[...document.querySelectorAll('.rg-widget')].map(el=>new Widget(el));return Promise.all(this.instances.map(w=>w.ready));},resize(){this.instances.filter(w=>w.plot&&Reveal.getCurrentSlide()?.contains(w.el)).forEach(w=>w.ready=Plotly.Plots.resize(w.plot));}};
})(window);
