(function(scope){
 const {esc}=RGVisuals;
 const num=(x,d=4)=>x==null?'Undefined':!Number.isFinite(x)?String(x):Math.abs(x)>0&&Math.abs(x)<.0001?x.toExponential(3):x.toFixed(d);
 const sampleSeed=v=>({A:7,B:1,C:23}[v]??Number(v));
 const opts=(xs,s)=>xs.map(x=>`<option value="${esc(x)}" ${String(x)===String(s)?'selected':''}>${esc(x)}</option>`).join('');
 const select=(k,label,xs,s)=>`<label>${label} <select data-setting="${k}">${opts(xs,s)}</select></label>`;
 const btn=(k,label,primary=false)=>`<button data-action="${k}" class="${primary?'primary':''}">${label}</button>`;
 const range=(k,label,min,max,step,v)=>`<label>${label} <input data-setting="${k}" type="range" min="${min}" max="${max}" step="${step}" value="${v}"><output data-output="${k}">${v}</output></label>`;
 const box=(label,body)=>`<div class="rg-box"><div class="rg-heading">${label}</div>${body}</div>`;
 const metric=(label,n)=>box(label,`<span class="rg-metric">${num(n)}</span>`);

 const RG_STATS_BETA="<math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"rg-inline-math\"><mrow><msub><mover accent=\"true\"><mi>β</mi><mo stretchy=\"false\">ˆ</mo></mover><mrow><mn>1</mn></mrow></msub></mrow></math>",RG_STATS_SIGMA="<math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"rg-inline-math\"><mrow><mover accent=\"true\"><mi>σ</mi><mo stretchy=\"false\">ˆ</mo></mover></mrow></math>";
 const chartButtons=()=>btn('zoom','Zoom',true)+btn('pan','Pan')+btn('view','Reset view');
 function layout(x='Predictor x',y='Response y'){return {paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Segoe UI, sans-serif',size:21,color:'#e8ecf4'},margin:{l:88,r:28,t:32,b:105},height:535,autosize:true,xaxis:{title:{text:x,standoff:12},gridcolor:'#293244',zeroline:false,autorange:true},yaxis:{title:{text:y,standoff:12},gridcolor:'#293244',zeroline:false,autorange:true},legend:{orientation:'h',y:-.22,x:0,font:{size:18}},hovermode:'closest',dragmode:'zoom',showlegend:true};}
 const line=(x,y,name,color='#45d6c0',dash='solid')=>({x,y,name,mode:'lines',line:{color,width:3,dash}});
 const markers=(data,name='Observations',color='#4db8ff',symbol='circle')=>({x:data.map(p=>p.x),y:data.map(p=>p.y),name,mode:'markers',marker:{color,size:9,symbol},hovertemplate:'x = %{x:.4f}<br>y = %{y:.4f}<extra>%{fullData.name}</extra>'});
 class Widget{
  constructor(el){this.el=el;this.kind=el.dataset.kind;this.source=el.dataset.source;this.overlay=this.source==='lr_maybe';this.ready=Promise.resolve();let t='';
   if(this.kind==='source'){
    this.raw=COURSE_DATA[this.source];this.pointTraces=this.raw.data.filter(t=>t.mode==='markers');t=chartButtons();
    if(['lr_scatter_mod','lr_maybe'].includes(this.source))t+=btn('overlay',this.source==='lr_scatter_mod'?'Show OLS best fit':'Hide fitted line');
    if(['lr_scatter_polymods_with_test','lr_underfitting'].includes(this.source))t+=select('degree','Degree',this.source==='lr_underfitting'?['All',0,1,2]:['All',1,5,15,23],'All');
    if(this.pointTraces.length>1)t+=select('set','Inspect set',this.pointTraces.map(t=>t.name),this.pointTraces[0].name);
    if(!['lr_scatter_mod','lr_maybe'].includes(this.source))t+=select('point','Point',this.pointTraces[0].x.map((_,i)=>i+1),1);
   }
   if(this.kind==='residual')t=range('intercept','β₀',0,4,.05,1.5)+range('slope','β₁',-1,5,.05,2)+btn('fit','Fit OLS',true)+btn('reset','Reset')+btn('segments','Hide residuals');
   if(this.kind==='bias')t=select('degree','Degree',[0,1,2,5,9],2)+select('n','Training cases per fit',[12,25,60],25)+select('seed','Sample set',['A','B','C'],'A')+select('x','Inspect input x',[-.8,0,.8],.8)+chartButtons();
   if(this.kind==='tails')t=range('t','Observed t',-8,8,.1,2.2)+select('df','Degrees of freedom',[3,10,23,88],88)+btn('source','Use 90-point fit',true)+chartButtons();
   if(this.kind==='diagnostics')t=select('example','Scenario',['Well behaved','Curvature','Unequal variance','Serial pattern'],'Curvature')+select('axis','Horizontal axis',['Fitted values','Observation order'],'Fitted values')+select('seed','Sample set',['A','B','C'],'A')+chartButtons();
   if(this.kind==='confounding')t=select('model','Model',['Sales only','Sales + temperature'],'Sales only')+select('seed','Sample set',['A','B','C'],'A')+chartButtons();
   el.setAttribute('role','region');el.setAttribute('aria-label',this.kind+' regression demonstration');el.innerHTML=`<div class="rg-toolbar">${t}</div><div class="rg-main"><div class="rg-graphic"><div class="rg-plot"></div></div><div class="rg-side" aria-live="polite"></div></div><div class="rg-bottom"><span></span><span></span></div>`;
   this.plot=el.querySelector('.rg-plot');this.side=el.querySelector('.rg-side');this.footer=el.querySelector('.rg-bottom');this.segments=true;
   el.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)this.action(b.dataset.action);});
   el.addEventListener('change',e=>{if(this.kind==='diagnostics'&&e.target.dataset.setting==='example')this.setting('axis').value=this.value('example')==='Serial pattern'?'Observation order':'Fitted values';if(['intercept','slope'].includes(e.target.dataset.setting))this.exactOLS=null;if(e.target.dataset.setting==='t')this.exactT=null;if(e.target.dataset.setting==='set'){const t=this.pointTraces.find(t=>t.name===this.value('set'));this.setting('point').innerHTML=opts(t.x.map((_,i)=>i+1),1);}this.render();});
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
    const curves=this.raw.data.filter(t=>t.mode==='lines'),train=this.pointTraces[0],set=this.pointTraces.find(t=>t.name===this.value('set'))||train,i=Number(this.value('point')||1)-1;
    l=layout(this.raw.layout.xaxis.title.text+(this.source==='lr_corcau'?' · normalized':' · illustrative scale'),this.raw.layout.yaxis.title.text);l.uirevision=this.source;
    let ci=0;data=this.raw.data.map(t=>{const d=JSON.parse(JSON.stringify(t));d.name=d.name||'Observations';if(d.mode==='lines'){d.line={...d.line,color:['#45d6c0','#c792ea','#ff9d4d','#ff5c77'][ci++],width:3};if(this.value('degree')&&this.value('degree')!=='All')d.visible=d.name==='p = '+this.value('degree')?true:'legendonly';}else d.marker={...d.marker,color:d.name==='Test points'?'#c792ea':'#4db8ff',symbol:d.name==='Test points'?'diamond-open':'circle',size:9};d.hovertemplate='x = %{x:.4f}<br>y = %{y:.4f}<extra>%{fullData.name}</extra>';return d;});
    const trainData=RG.points(train),o=RG.infer(trainData);this.computed=o;side=box((set.name||'Observation')+' · '+(i+1),`<span class="point-values">x = ${num(set.x[i])}<br>y = ${num(set.y[i])}</span>`);
    if(this.source==='lr_scatter')side+=box('25 illustrative observations','<p>Inspect the trend and the departures from it. A straight line is a candidate model.</p>');
    if(this.source==='lr_scatter_mod'){
     // A deliberately chosen starting guess makes the purpose of fitting visible.
     const xs=[Math.min(...train.x),Math.max(...train.x)],candidate=x=>2+2*x,m=RG.metrics(trainData,candidate);
     data=[markers(trainData,'Training observations'),line(xs,xs.map(candidate),'Starting guess','#c792ea','dash')];
     l=layout('Fertilizer x · illustrative scale','Yield y');l.uirevision=this.source;
     side=box('Starting guess · chosen by us','f(x) = 2 + 2x<p>These coefficients were not fitted to the dots.</p>');
     if(this.overlay){
      side+=box('OLS best fit · calculated from the dots',`f(x) ≈ ${num(o.intercept)} + ${num(o.slope)}x`);
      side+='<div class="rg-metrics">'+metric('Starting guess RSS',m.rss)+metric('OLS best-fit RSS',o.rss)+'</div>';
      side+='<p class="rg-small">OLS chooses the intercept and slope with the smallest RSS on these observations.</p>';
     }else{
      side+=metric('Starting guess RSS',m.rss)+box('Try the fit','<p>Press Show OLS best fit. Compare both lines and their RSS values.</p>');
     }
     foot='Same 25 observations · only the intercept and slope change';tail='A candidate is a proposed line';
    }
    if(this.source==='lr_scatter_mod_with_test'){
     const t=curves[0],b1=(t.y.at(-1)-t.y[0])/(t.x.at(-1)-t.x[0]),b0=t.y[0]-b1*t.x[0],ms=this.pointTraces.map(t=>RG.metrics(RG.points(t),x=>b0+b1*x));
     side+='<div class="rg-metrics">'+metric('Train RMSE',ms[0].rmse)+metric('Test RMSE',ms[1].rmse)+'</div>'+box('Same supplied line','<p>Only the evaluation points change. Test targets do not update the coefficients.</p>');
    }
    if(this.source==='lr_scatter_polymods_with_test'){
     const p=this.value('degree'),reported={1:[.9850,.1220],5:[.9878,.1225],15:[.9933,.1548],23:[.9938,.3052]};
     side+=p==='All'?box('Compare the supplied fits','<p>Choose a degree to read its illustrative metrics, or toggle curves in the legend.</p>'):'<div class="rg-metrics">'+metric('Reported train R²',reported[p][0])+metric('Reported test RMSE',reported[p][1])+'</div>';
     side+='<p class="rg-small">These scores describe the supplied curves. High-degree results depend on numerical fitting choices.</p>';l.legend.font.size=17;
    }
    if(this.source==='lr_underfitting'){
     const p=this.value('degree');if(p!=='All'){const c=RG.fit(trainData,Number(p)),m=RG.metrics(trainData,x=>RG.predict(c,x),Number(p)+1),test=RG.metrics(RG.points(this.pointTraces[1]),x=>RG.predict(c,x));side+='<div class="rg-metrics">'+metric('Training R²',m.r2)+metric('Test RMSE',test.rmse)+'</div>'+metric('RSE · n − '+(Number(p)+1),m.rse);}else side+=box('All 25 observations visible','<p>Compare the constant, linear and quadratic families across the complete response range.</p>');side+='<p class="rg-small">RSE uses the appropriate parameter count for each degree.</p>';l.legend.font.size=17;
    }
    if(this.source==='lr_maybe'){
     data=[markers(trainData,'90 observations')];
     side=box('1 · Fit the slope '+RG_STATS_BETA,`<span class="rg-metric">${num(o.slope)}</span>`)
      +'<div class="rg-metrics">'+box('2 · Estimate its SE '+RG_STATS_SIGMA,`<span class="rg-metric">${num(o.se,5)}</span>`)+metric('3 · Calculate t',o.t)+metric('4 · Two-sided p-value',o.p)+metric('Training RSE',o.rse)+'</div>'
      +box('Interpret under the zero-slope null',`<p>The estimate is ${num(o.t,2)} standard errors from zero. Its tiny p-value supports a linear association.</p>`);
     foot='n = 90 observations · degrees of freedom: n − 2 = '+o.df;
    }
    if(this.source==='lr_corcau'){
     l=layout('Ice-cream sales · normalized index','Shark-attack index');l.uirevision=this.source;const xs=[Math.min(...train.x),Math.max(...train.x)],test=RG.points(this.pointTraces[1]),tm=RG.metrics(test,x=>o.intercept+o.slope*x);
     data=data.filter(t=>t.mode!=='lines');data.unshift(line(xs,xs.map(x=>o.intercept+o.slope*x),'OLS association fit'));
     side+='<div class="rg-metrics">'+metric('Training R²',o.r2)+metric('Training RSE',o.rse)+metric('Test RMSE',tm.rmse)+metric('Two-sided slope p-value',o.p)+'</div>'+box('Association, not causation','<p>Temperature or another common cause could explain the pattern.</p>');
     foot='OLS fitted to 80 training observations · test RMSE uses 20 separate cases';
    }
    if(this.overlay){const xs=[Math.min(...train.x),Math.max(...train.x)];data.push(line(xs,xs.map(x=>o.intercept+o.slope*x),this.source==='lr_scatter_mod'?'OLS best fit':'OLS fitted line','#45d6c0','solid'));}
    const overlay=this.el.querySelector('[data-action="overlay"]');if(overlay)overlay.textContent=this.source==='lr_scatter_mod'?(this.overlay?'Hide OLS best fit':'Show OLS best fit'):(this.overlay?'Hide fitted line':'Show fitted line');if(this.source!=='lr_scatter_mod')tail=this.source==='lr_maybe'?'Statistics use unrounded values':'Illustrative regression data';
   }
   if(this.kind==='residual'){
    const pts=RG.points(COURSE_DATA.lr_scatter.data[0]),b0=this.exactOLS?.intercept??Number(this.value('intercept')),b1=this.exactOLS?.slope??Number(this.value('slope')),pred=x=>b0+b1*x,m=RG.metrics(pts,pred);
    this.el.querySelector('[data-output="intercept"]').textContent=num(b0,3);this.el.querySelector('[data-output="slope"]').textContent=num(b1,3);this.currentCoefficients=[b0,b1];
    if(this.segments){const x=[],y=[];pts.forEach(p=>{x.push(p.x,p.x,null);y.push(p.y,pred(p.x),null);});data.push({x,y,mode:'lines',name:'Residuals',line:{color:'#c792ea',width:2},hoverinfo:'skip'});}data.push(markers(pts),line([0,1],[pred(0),pred(1)],'Current line'));l=layout('Fertilizer · illustrative scale','Crop yield');side=box('Current parameters',`β₀ = ${num(b0)}<br>β₁ = ${num(b1)}`)+metric('RSS',m.rss)+box('Vertical discrepancies','<p>Each segment compares the observed response with the line at the same x.</p>');foot='Fit OLS uses the exact analytic coefficients.';tail='Same observations, adjustable candidate line';this.el.querySelector('[data-action="segments"]').textContent=this.segments?'Hide residuals':'Show residuals';
   }
   if(this.kind==='bias'){
    const degree=Number(this.value('degree')),n=Number(this.value('n')),seed=sampleSeed(this.value('seed')),x0=Number(this.value('x')),key=[degree,n,seed].join('/');if(this.cacheKey!==key){this.ensemble=RG.ensemble(degree,n,seed);this.cacheKey=key;}
    const xs=Array.from({length:181},(_,i)=>-1+i/90),fs=this.ensemble.fits,stat=this.ensemble.at(x0);this.currentStats=stat;
    data=fs.slice(0,15).map((f,i)=>({...line(xs,xs.map(x=>RG.predict(f,x)),'Individual fits','#63748a'),opacity:.45,showlegend:i===0}));
    data.push(line(xs,xs.map(x=>this.ensemble.at(x).mean),'Average of 60','#45d6c0'),line(xs,xs.map(RG.truth),'True mean','#ff9d4d','dash'));
    data.push({x:fs.map(()=>x0),y:fs.map(c=>RG.predict(c,x0)),name:'Predictions at x',mode:'markers',marker:{size:5,color:'#c792ea',opacity:.65},hovertemplate:'Prediction = %{y:.4f}<extra>One fitted model</extra>'});
    data.push({x:[x0,x0],y:[RG.truth(x0),stat.mean],name:'Truth and average at x',mode:'markers',showlegend:false,marker:{color:['#ff9d4d','#45d6c0'],size:12,symbol:['diamond','circle'],line:{color:'#fff',width:1}}});
    l=layout('Input x · synthetic example','Predicted response');l.legend.font.size=18;l.shapes=[{type:'line',x0,x1:x0,y0:0,y1:1,yref:'paper',line:{color:'#4db8ff',dash:'dot',width:3}}];
    side=box('At input x = '+x0,'<p>Purple dots: one prediction from each of 60 independently fitted models.</p>')+'<div class="rg-metrics">'+metric('Squared bias',stat.bias2)+metric('Prediction variance',stat.variance)+metric('Observation-noise variance',stat.noise)+metric('Expected test MSE*',stat.total)+'</div>'
     +box('What to compare','<p>Bias: average prediction versus truth. Variance: spread of the purple predictions.</p>');
    foot='*At the selected x · squared response units · 60-fit approximation';tail='15 curves shown · all 60 fits enter the scores';
   }
   if(this.kind==='tails'){
    const t=this.exactT??Number(this.value('t')),df=Number(this.value('df')),a=Math.abs(t),p=RG.tP(t,df);this.currentP=p;this.el.querySelector('[data-output="t"]').textContent=num(t,3);const extent=Math.max(5,a+1),xs=Array.from({length:401},(_,i)=>-extent+2*extent*i/400);data=[line(xs,xs.map(x=>RG.tPDF(x,df)),'t density','#4db8ff')];
    for(const sign of [-1,1]){const xx=Array.from({length:101},(_,i)=>sign*(a+(extent-a)*i/100)).sort((a,b)=>a-b);data.push({...line(xx,xx.map(x=>RG.tPDF(x,df)),sign<0?'Two-sided tail area':'Right tail','#c792ea'),fill:'tozeroy',fillcolor:'rgba(199,146,234,.42)',showlegend:sign<0});}
    l=layout('t statistic under H₀','Density');l.shapes=[-a,a].map(x=>({type:'line',x0:x,x1:x,y0:0,y1:RG.tPDF(x,df),line:{color:'#ff9d4d',width:2,dash:'dot'}}));side=box('Observed statistic',`t = ${num(t)}<br>df = n − 2 = ${df}`)+metric('Two-sided p-value',p)+box('What the shaded area means','<p>Repeat the study with a zero population slope. This area is the chance of a t value at least as far from zero as yours.</p>')+box('Illustration: threshold α = 0.05',p<.05?'<p>Reject the zero-slope null at this threshold.</p>':'<p>Not enough evidence to reject the zero-slope null.</p>');foot='Purple shading: values at least as extreme in either direction';tail='A density height is not a probability';
   }
   if(this.kind==='diagnostics'){
    const kind=this.value('example'),d=RG.diagnostic(kind,sampleSeed(this.value('seed'))),ordered=this.value('axis')==='Observation order';this.diagnostic=d;data=[{x:d.residuals.map(p=>ordered?p.order:p.fitted),y:d.residuals.map(p=>p.residual),name:'OLS residuals',mode:'markers',marker:{color:'#4db8ff',size:9}}];l=layout(ordered?'Observation order':'Fitted response','Residual y − ŷ');l.showlegend=false;l.shapes=[{type:'line',xref:'paper',x0:0,x1:1,y0:0,y1:0,line:{color:'#45d6c0',width:2,dash:'dot'}}];const notes={'Well behaved':'No designed mean or variance pattern. Random samples can still look uneven.','Curvature':'A straight line omits a quadratic term. Look for a curved residual mean.','Unequal variance':'The error scale grows with x. Look for a widening residual spread.','Serial pattern':'Each error partly carries over from the preceding observation. Use observation order to inspect runs.'};side=box(kind,`<p>${notes[kind]}</p>`)+metric('Training RSE',d.ols.rse)+box('Read the pattern','<p>A high R² does not certify independent, normal or equal-variance errors.</p>');foot='Synthetic observations · a new OLS fit for each scenario and sample set';tail='Patterns guide investigation';
   }
   if(this.kind==='confounding'){
    const seed=sampleSeed(this.value('seed'));if(this.confSeed!==seed){this.conf=RG.confounding(seed);this.confSeed=seed;}const c=this.conf,adjusted=this.value('model')==='Sales + temperature',m=c.adjusted,xs=[Math.min(...c.data.map(p=>p.sales)),Math.max(...c.data.map(p=>p.sales))];
    data=[{x:c.data.map(p=>p.sales),y:c.data.map(p=>p.attacks),mode:'markers',name:'Same 80 observations',marker:{size:9,color:c.data.map(p=>p.temp),colorscale:[[0,'#4db8ff'],[1,'#ff9d4d']],showscale:true,colorbar:{title:{text:'Temperature'},thickness:15,len:.75}},hovertemplate:'Sales index = %{x:.2f}<br>Attack index = %{y:.2f}<extra></extra>'}];
    data.push(line(xs,xs.map(x=>adjusted?m.intercept+m.salesSlope*x+m.tempSlope*c.tempMean:c.simple.intercept+c.simple.slope*x),adjusted?'Temperature held at its mean':'Sales-only fit',adjusted?'#45d6c0':'#c792ea'));
    l=layout('Ice-cream sales · illustrative index','Shark-attack risk · illustrative index');l.margin.r=125;l.legend.font.size=17;
    side=box(adjusted?'Model includes temperature':'Model ignores temperature',adjusted?'<p>The line compares sales while temperature is held at its sample mean.</p>':'<p>The slope mixes sales with their shared temperature pattern.</p>')+'<div class="rg-metrics">'+metric('Sales coefficient',adjusted?m.salesSlope:c.simple.slope)+metric('Sales p-value',adjusted?m.salesP:c.simple.p)+(adjusted?metric('Temperature coefficient',m.tempSlope)+metric('Temperature p-value',m.tempP):'')+'</div>'+box('Known simulation mechanism',adjusted&&m.salesP<.05?'<p>The true sales term is zero here. This sample still gives a small p-value: a false positive can occur.</p>':'<p>Temperature affects both indices. Sales has no direct term in the outcome generator.</p>');
    foot='Compare both models on the same observations · sample sets are reproducible';tail='Synthetic mechanism, not evidence about real shark attacks';
   }
   this.side.innerHTML=side;this.footer.children[0].textContent=foot;this.footer.children[1].textContent=tail;this.draw(data,l);
  }
 }
 scope.RGWidgets={instances:[],mount(){this.instances=[...document.querySelectorAll('.rg-widget')].map(el=>new Widget(el));return Promise.all(this.instances.map(w=>w.ready));},resize(){this.instances.filter(w=>w.plot&&Reveal.getCurrentSlide()?.contains(w.el)).forEach(w=>w.ready=Plotly.Plots.resize(w.plot));}};
})(window);
