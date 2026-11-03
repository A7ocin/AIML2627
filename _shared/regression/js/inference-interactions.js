(function(scope){
 'use strict';
 const M=scope.RGInferenceModel;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=(x,d=4)=>Math.abs(x)>0&&Math.abs(x)<.0001?x.toExponential(3):Number(x).toFixed(d);
 const math=s=>'<math class="rg-inline-math" xmlns="http://www.w3.org/1998/Math/MathML"><mrow>'+s+'</mrow></math>';
 const mathNum=(value,d=4)=>{const label=num(value,d);if(label.includes('e')){const [coefficient,power]=label.split('e');return '<mn>'+coefficient+'</mn><mo>×</mo><msup><mn>10</mn><mn>'+Number(power).toString().replace('-','−')+'</mn></msup>';}return '<mn>'+label.replace('-','−')+'</mn>';};
 const hat=x=>'<mover accent="true"><mi>'+x+'</mi><mo stretchy="false">ˆ</mo></mover>';
 const beta=math('<msub>'+hat('β')+'<mn>1</mn></msub>'),sigma=math(hat('σ'));
 const trueBeta=math('<msub><mi>β</mi><mn>1</mn></msub>'),noiseSigma=math('<msub><mi>σ</mi><mi>ε</mi></msub>');
 const actual=()=>M.analyse(RG.points(COURSE_DATA.lr_maybe.data.find(t=>t.mode==='markers')));
 const box=(label,body)=>'<div class="rg-box"><div class="rg-heading">'+label+'</div>'+body+'</div>';
 const metric=(label,value,d=4)=>box(label,'<span class="rg-metric">'+(typeof value==='number'?num(value,d):value)+'</span>');
 const button=(action,label,primary=false)=>'<button type="button" data-i-action="'+action+'"'+(primary?' class="primary"':'')+'>'+label+'</button>';
 const select=(name,label,options,value)=>'<label>'+label+' <select data-i-setting="'+name+'">'+options.map(p=>{const [v,t]=Array.isArray(p)?p:[p,p];return '<option value="'+esc(v)+'"'+(String(v)===String(value)?' selected':'')+'>'+esc(t)+'</option>';}).join('')+'</select></label>';
 const range=(name,label,min,max,value)=>'<label>'+label+' <input type="range" data-i-setting="'+name+'" min="'+min+'" max="'+max+'" step="any" value="'+value+'"/><output data-i-output="'+name+'"></output></label>';
 const seeds=[['7','A'],['23','B'],['41','C']];
 const colors={teal:'#45d6c0',blue:'#4db8ff',purple:'#c792ea',orange:'#ffb86c',red:'#ff5c77'};
 function layout(height,x,y){return {height,autosize:true,paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Segoe UI, sans-serif',size:20,color:'#e8ecf4'},margin:{l:74,r:28,t:24,b:74},xaxis:{title:{text:x,standoff:12},gridcolor:'#293244',zeroline:false},yaxis:{title:{text:y,standoff:12},gridcolor:'#293244',zeroline:false},legend:{orientation:'h',y:-.25,x:0,font:{size:17}},showlegend:false,dragmode:'zoom',hovermode:'closest'};}
 class Interactive{
  constructor(el){
   this.el=el;this.mode=el.dataset.mode;this.offset=0;this.ready=Promise.resolve();let controls='';
   if(this.mode==='t'){
    const a=actual().fit;
    controls=range('slope','Fitted slope '+beta,-.25,.25,a.slope)+range('se','Estimated SE '+sigma,.005,.1,a.se)+button('actual','90-point values')+button('near','Near zero')+button('far','Far from zero');
   }
   if(this.mode==='p')controls=range('t','Observed t',-6,6,2.2)+select('n','Observations n',[5,12,16,25,90],90)+select('alpha','Threshold α',[.01,.05,.1],.05)+button('zero','t = 0')+button('actual','90-point result');
   if(this.mode==='fit')controls='<div class="rg-i-fit-top">'+select('source','Data',[['actual','Supplied 90 cases'],['simulation','Simulate new data']],'actual')+select('fit','Fitting view',[['ols','OLS line'],['compare','OLS + mean-only fit']],'ols')+button('sample','New simulated sample',true)+button('reset','Reset view')+'</div><fieldset class="rg-i-simulation-controls"><legend>Simulation settings</legend>'+select('n','Cases n',[12,30,90],90)+select('noise','Noise SD '+noiseSigma,[.03,.08,.2],.08)+select('slope','True slope '+trueBeta,[0,.1,.3],.1)+select('spread','Input spread',[[.25,'Narrow'],[1,'Wide']],1)+select('seed','Sample set',seeds,7)+'</fieldset>';
   if(this.mode==='ci')controls=select('view','View',[['actual','90-point interval'],['repeat','20 repeated studies']],'actual')+select('n','Cases per study',[12,30,90],90)+select('noise','Noise SD '+noiseSigma,[.04,.1,.2],.1)+select('seed','Sample set',seeds,7)+select('inspect','Inspect interval',Array.from({length:20},(_,i)=>i+1),1)+button('repeat','Repeat 20 studies',true);
   if(this.mode!=='fit')controls+=button('reset','Reset view');
   this.el.setAttribute('role','region');this.el.setAttribute('aria-label',({t:'Adjust the t statistic',p:'Explore a two-sided p-value',fit:'Generate data and compare regression fits',ci:'Explore confidence intervals'})[this.mode]);
   this.el.innerHTML='<div class="rg-toolbar">'+controls+'</div><div class="rg-main"><div class="rg-graphic"><div class="rg-plot"></div></div><div class="rg-side" aria-live="polite"></div></div><div class="rg-bottom"><span></span><span></span></div>';
   this.plot=el.querySelector('.rg-plot');this.side=el.querySelector('.rg-side');this.footer=el.querySelector('.rg-bottom');
   if(this.mode==='fit'){this.interpretation=document.createElement('div');this.interpretation.className='rg-fit-interpretation';this.interpretation.setAttribute('aria-live','polite');this.footer.before(this.interpretation);}
   el.addEventListener('input',e=>{if(e.target.matches('input[type=range]'))this.render();});
   el.addEventListener('change',()=>this.render());
   el.addEventListener('keydown',e=>e.stopPropagation());
   el.addEventListener('click',e=>{const action=e.target.closest('[data-i-action]')?.dataset.iAction;if(!action)return;
    if(action==='sample'){this.set('source','simulation');this.offset++;}
    if(action==='repeat'){this.set('view','repeat');this.offset++;}
    if(action==='zero')this.set('t',0);
    if(action==='near'){this.set('slope',.01);this.set('se',.05);}
    if(action==='far'){this.set('slope',.1);this.set('se',.02);}
    if(action==='actual'){const a=actual().fit;if(this.mode==='t'){this.set('slope',a.slope);this.set('se',a.se);}else{this.set('t',a.t);this.set('n',a.df+2);}}
    this.render();
   });
   this.render();
  }
  control(key){return this.el.querySelector('[data-i-setting="'+key+'"]');}
  value(key){return this.control(key)?.value;}
  set(key,value){this.control(key).value=value;}
  disable(keys,disabled){keys.forEach(k=>this.control(k).disabled=disabled);}
  outputs(){this.el.querySelectorAll('[data-i-output]').forEach(e=>e.textContent=num(Number(this.value(e.dataset.iOutput)),this.mode==='t'?5:2));}
  draw(data,l){this.chartHeight=l.height;const cfg={displayModeBar:false,responsive:false,scrollZoom:false};this.plot.parentElement.style.height=l.height+'px';this.ready=(this.initialized?Plotly.react(this.plot,data,l,cfg):Plotly.newPlot(this.plot,data,l,cfg));this.initialized=true;}
  render(){
   let data=[],l,side='',foot='',tail='';this.outputs();
   if(this.mode==='t'){
    const b=Number(this.value('slope')),se=Number(this.value('se')),t=b/se,extent=Math.max(3,Math.ceil(Math.abs(t)+1));
    l=layout(170,'Distance from zero in estimated slope standard errors','');l.margin={l:42,r:42,t:35,b:62};l.yaxis={visible:false,range:[-.3,1]};l.xaxis.range=[-extent,extent];l.xaxis.zeroline=true;l.xaxis.zerolinecolor=colors.orange;l.xaxis.zerolinewidth=2;
    l.shapes=[{type:'line',x0:0,x1:t,y0:.35,y1:.35,line:{color:colors.teal,width:4}}];
    data=[{x:[0,t],y:[.35,.35],mode:'markers+text',text:['Zero',num(t,2)+' SE'],textposition:['bottom center','top center'],marker:{color:[colors.orange,colors.teal],size:[10,15]},hovertemplate:'t = %{x:.4f}<extra></extra>'}];
    side=metric('Observed t = fitted slope ÷ estimated SE',t,3)+box('Read the distance','<p>'+num(b,5)+' ÷ '+num(se,5)+' ≈ '+num(t,2)+'.</p><p>'+((Math.abs(t)<1)?'The fitted slope is close to zero relative to its uncertainty.':'The fitted slope is '+num(Math.abs(t),2)+' estimated standard errors from zero.')+'</p>');
    foot='Keep the slope fixed and increase its SE: |t| becomes smaller.';tail='Illustration controls adjust the estimate and its uncertainty';
   }
   if(this.mode==='p'){
    const t=Number(this.value('t')),n=Number(this.value('n')),df=n-2,alpha=Number(this.value('alpha')),a=Math.abs(t),p=RG.tP(t,df),extent=Math.max(5,a+1),xs=Array.from({length:401},(_,i)=>-extent+2*extent*i/400),reject=p<alpha;
    l=layout(Number(this.el.dataset.plotHeight)||270,'T values in hypothetical zero-slope studies','Density');l.margin={l:66,r:20,t:20,b:65};
    data=[{x:xs,y:xs.map(x=>RG.tPDF(x,df)),mode:'lines',line:{color:colors.blue,width:3},name:'Student t density'}];
    for(const sign of [-1,1]){const xx=Array.from({length:151},(_,i)=>sign*(a+(extent-a)*i/150)).sort((x,y)=>x-y);data.push({x:xx,y:xx.map(x=>RG.tPDF(x,df)),mode:'lines',line:{color:colors.purple,width:1},fill:'tozeroy',fillcolor:'rgba(199,146,234,.65)',hoverinfo:'skip'});}
    l.shapes=[-a,a].map(x=>({type:'line',x0:x,x1:x,y0:0,y1:RG.tPDF(x,df),line:{color:colors.orange,width:2,dash:'dot'}}));
    side=metric('Both tails together: p-value',p)+box(a===0?'Why p = 1 here':'Assuming a zero population slope',a===0?'<p>With positive SE, observed t = 0 means a flat fitted line. Every hypothetical |T| ≥ 0, so p = 1.</p><p>This gives no evidence against zero. It does not prove the true slope is zero.</p>':'<p>'+num(100*p,2)+'% of hypothetical repetitions give |T| ≥ '+num(a,2)+', the fixed observed distance.</p>')+box('Decision at α = '+alpha,'<strong class="rg-test-decision '+(reject?'rg-reject':'rg-dont-reject')+'">'+(reject?'REJECT':"DON'T REJECT")+'</strong><p>'+(reject?'p < α: reject H₀ (zero population slope).':'p ≥ α: insufficient evidence to reject H₀.')+'</p>');
    foot='n = number of observations in each study.';tail='The shaded area is probability; the curve height is density.';
   }
   if(this.mode==='fit'){
    const simulated=this.value('source')==='simulation';this.disable(['n','noise','slope','spread','seed'],!simulated);
    const config={n:Number(this.value('n')),noise:Number(this.value('noise')),slope:Number(this.value('slope')),spread:Number(this.value('spread')),seed:Number(this.value('seed'))+this.offset};
    const result=simulated?M.analyse(M.sample(config)):actual(),o=result.fit,points=result.data,xs=[Math.min(...points.map(p=>p.x)),Math.max(...points.map(p=>p.x))];this.result=result;
    l=layout(390,'Input x','Response y');l.showlegend=true;l.legend.y=-.26;l.margin.b=92;
    data=[{x:points.map(p=>p.x),y:points.map(p=>p.y),mode:'markers',name:points.length+' observations',marker:{color:colors.blue,size:8},hovertemplate:'x = %{x:.4f}<br>y = %{y:.4f}<extra>Observed case</extra>'},{x:xs,y:xs.map(x=>o.intercept+o.slope*x),mode:'lines',name:'OLS line',line:{color:colors.teal,width:3}}];
    if(simulated)data.push({x:xs,y:xs.map(x=>.5+config.slope*x),mode:'lines',name:'True mean (simulation)',line:{color:colors.orange,width:2,dash:'dash'}});
    const compare=this.value('fit')==='compare';if(compare)data.push({x:xs,y:[result.mean,result.mean],mode:'lines',name:'Mean-only fit',line:{color:colors.purple,width:3,dash:'dot'}});
    side='<div class="rg-metrics">'+metric('1 · Slope '+beta,o.slope)+metric('2 · Slope SE '+sigma,o.se,5)+metric('3 · t statistic',o.t)+metric('4 · Two-sided p-value',o.p)+metric('Training RSE',o.rse)+metric('OLS RSS',o.rss)+'</div>';
    const reject=o.p<.05,step=(heading,body)=>'<div class="rg-fit-reason-step"><div class="rg-heading">'+heading+'</div>'+body+'</div>';
    const distance=math('<mi>t</mi><mo>=</mo><mfrac><mrow><msub>'+hat('β')+'<mn>1</mn></msub><mo>−</mo><mn>0</mn></mrow>'+hat('σ')+'</mfrac><mo>≈</mo>'+mathNum(o.t,2));
    const probability=math('<mi>p</mi><mo>≈</mo>'+mathNum(o.p,6))+'<br/>'+math('<mi>p</mi>'+(reject?'<mo>&lt;</mo>':'<mo>≥</mo>')+'<mi>α</mi><mo>=</mo><mn>0.05</mn>');
    let meaning=reject?'A t this far from zero would be rare under a flat population mean. Evidence of association, not causation.':'This t is not rare enough under a flat population mean to reject it at α = 0.05. This does not prove the true slope is zero.';
    if(simulated&&config.slope===0&&reject)meaning='The test rejects zero, but the simulation’s true slope is zero. Noise has produced a false positive in this sample.';
    this.interpretation.innerHTML=step('1 · How far is the slope from zero?',distance+'<p>'+num(Math.abs(o.t),2)+' estimated slope SEs from zero.</p>')+step('2 · Compare p with α',probability+'<strong class="rg-test-decision '+(reject?'rg-reject':'rg-dont-reject')+'">'+(reject?'REJECT':"DON'T REJECT")+'</strong>')+step('3 · What does this sample tell us?','<p>'+meaning+'</p>');
    foot=(simulated?'Simulated: true slope '+config.slope+', response-noise SD '+config.noise:'Supplied 90-observation dataset')+' · n − 2 = '+o.df+' degrees of freedom';
    if(compare)foot+=' · Mean-only RSS = '+num(o.tss);
    tail='Slope-test statistics describe the OLS line. '+(simulated?'New samples can give different results.':'Choose “Simulate new data” to change the generator.');
   }
   if(this.mode==='ci'){
    const repeat=this.value('view')==='repeat';this.disable(['n','noise','seed','inspect'],!repeat);
    let results,index=0;
    if(repeat){const key=[this.value('n'),this.value('noise'),this.value('seed'),this.offset].join('/');if(this.cacheKey!==key){this.repetitions=M.repeated({n:Number(this.value('n')),noise:Number(this.value('noise')),seed:Number(this.value('seed'))+this.offset});this.cacheKey=key;}results=this.repetitions;index=Number(this.value('inspect'))-1;}else results=[actual()];
    const current=results[index],o=current.fit;this.result=current;this.repeated=repeat?results:null;
    l=layout(300,'Population slope values',repeat?'Repeated study':'');l.margin={l:70,r:28,t:22,b:66};l.yaxis.range=repeat?[20.7,.3]:[0,2];l.yaxis.tickvals=repeat?[1,5,10,15,20]:[];l.yaxis.showgrid=false;
    const ends=results.flatMap(x=>x.fit.ci);l.xaxis.range=[Math.min(0,...ends)-.025,Math.max(.16,...ends)+.025];
    results.forEach((result,i)=>{const f=result.fit,y=repeat?i+1:1,color=repeat&&!result.covers?colors.red:colors.teal;data.push({x:[f.ci[0],f.slope,f.ci[1]],y:[y,y,y],mode:'lines+markers',line:{color,width:i===index?5:2.5},marker:{color:[color,i===index?colors.blue:color,color],size:[5,i===index?12:6,5]},customdata:[i+1,i+1,i+1],hovertemplate:'Study '+(i+1)+'<br>Slope %{x:.5f}<extra>95% confidence interval</extra>'});});
    const truth=repeat ? .1 : 0;l.shapes=[{type:'line',x0:truth,x1:truth,y0:0,y1:1,yref:'paper',line:{color:colors.orange,width:2,dash:'dash'}}];
    l.annotations=[{x:truth,y:1.02,yref:'paper',text:repeat?'Known true slope = 0.10':'Zero slope',showarrow:false,font:{size:17,color:colors.orange},yanchor:'bottom'}];
    side='<div class="rg-metrics">'+metric('Fitted slope '+beta,o.slope)+metric('Estimated SE '+sigma,o.se,5)+metric('Critical t (97.5th percentile)',current.critical,3)+metric('95% interval','['+num(o.ci[0],4)+', '+num(o.ci[1],4)+']')+'</div>';
    if(repeat){const count=results.filter(x=>x.covers).length;side+=box('This finite group: '+count+' of 20 cover the truth','<p>Teal intervals cover 0.10. Red intervals miss it. Inspect any interval with the selector.</p>');}
    else side+=box('Estimate ± uncertainty margin','<p>'+num(o.slope,4)+' ± '+num(current.critical,3)+' × '+num(o.se,5)+'. Zero lies outside this interval.</p>');
    foot=repeat?'Each row uses a new sample and a new OLS fit. Selected row: '+(index+1)+'.':'This interval is calculated from the same 90 supplied observations.';
    tail='95% is a long-run coverage rate; a group of 20 need not have exactly 19 hits.';
   }
   this.side.innerHTML=side;this.footer.children[0].textContent=foot;this.footer.children[1].textContent=tail;this.draw(data,l);
  }
 }
 const api={instances:[],mount(root=document){root.querySelectorAll('.rg-inference-widget:not([data-i-mounted])').forEach(el=>{el.dataset.iMounted='true';this.instances.push(new Interactive(el));});return Promise.all(this.instances.map(w=>w.ready));},resize(){this.instances.filter(w=>w.el.getClientRects().length&&w.plot.clientWidth).forEach(w=>{w.ready=w.ready.then(()=>Plotly.Plots.resize(w.plot));});}};
 scope.RGInference=api;
 const boot=()=>api.mount().then(()=>api.resize());
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
 addEventListener('resize',()=>api.resize());
 if(scope.Reveal?.on){Reveal.on('ready',()=>api.resize());Reveal.on('slidechanged',()=>requestAnimationFrame(()=>api.resize()));}
})(window);
