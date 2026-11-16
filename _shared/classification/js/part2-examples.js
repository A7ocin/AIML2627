(function(){
 'use strict';
 const E=CLEngine,blue='#6ea8fe',orange='#f4a261',green='#45d6c0',purple='#ba8cff';
 const f=(v,d=3)=>Number.isFinite(v)?v.toFixed(d):'—',pct=v=>(100*v).toFixed(1)+'%',lin=(a,b,n=101)=>Array.from({length:n},(_,i)=>a+(b-a)*i/(n-1));
 const number=v=>Math.abs(v)>0&&Math.abs(v)<.0001?v.toExponential(3):f(v,4);
 const likelihoodText=logL=>{const exponent=Math.floor(logL/Math.LN10),mantissa=Math.exp(logL-exponent*Math.LN10);return math(mn(f(mantissa,3))+'<mo>×</mo><msup><mn>10</mn>'+mn(exponent)+'</msup>');};
 const math=s=>'<math xmlns="http://www.w3.org/1998/Math/MathML">'+s+'</math>',mn=v=>'<mn>'+v+'</mn>',frac=(a,b)=>math('<mfrac><mrow>'+a+'</mrow><mrow>'+b+'</mrow></mfrac>');
 const slider=(id,label,a,b,step,value)=>`<label>${label}<input aria-label="${label}" data-value="${id}" type="range" min="${a}" max="${b}" step="${step}" value="${value}"><output data-output="${id}">${value}</output></label>`;
 const select=(id,label,options,value)=>`<label>${label}<select aria-label="${label}" data-value="${id}">${options.map(o=>{const [v,t]=Array.isArray(o)?o:[o,o];return `<option value="${v}" ${String(v)===String(value)?'selected':''}>${t}</option>`;}).join('')}</select></label>`;
 const box=(title,content)=>`<div class="c2-box"><h4>${title}</h4>${content}</div>`;
 const points=COURSE_DATA.cls_two_class.data.flatMap((t,c)=>t.x.map((x,i)=>({x,y:t.y[i],c,id:c*25+i})));
 const hospital=COURSE_DATA.lr_logreg.data[0];
 function layout(x,y){return {paper_bgcolor:'transparent',plot_bgcolor:'#0b0f17',font:{family:'Segoe UI, sans-serif',size:23,color:'#e8ecf4'},margin:{l:80,r:22,t:15,b:85},xaxis:{title:{text:x,standoff:13},gridcolor:'#273144',zeroline:false},yaxis:{title:{text:y,standoff:13},gridcolor:'#273144',zeroline:false},legend:{orientation:'h',x:0,y:-.24,font:{size:20}},hovermode:'closest',dragmode:false};}
 function markers(ps){return [0,1].map(c=>({type:'scatter',mode:'markers',name:'Class '+c,x:ps.filter(p=>p.c===c).map(p=>p.x),y:ps.filter(p=>p.c===c).map(p=>p.y),marker:{color:c?orange:blue,symbol:c?'x':'circle',size:10},hovertemplate:'Feature 1 = %{x:.3f}<br>Feature 2 = %{y:.3f}<extra>Class '+c+'</extra>'}));}
 const instances=[];
 class Example{
  constructor(el){this.el=el;this.type=el.dataset.example;this.ready=Promise.resolve();this.cache=new Map();this.queryOverride=null;
   let controls='',foot='';
   if(this.type==='fit')controls=select('preset','Start from',[[0,'Moderate curve'],[1,'Flat at 50%'],[2,'Reversed curve'],[3,'Steeper curve']],0)+slider('b0','Intercept β₀',-20,10,.1,-7.5)+slider('b1','Slope β₁',-25,35,.1,15.5)+slider('case','Patient i',1,100,1,1);
   if(this.type==='plane')controls=slider('case','Stored observation',1,50,1,1);
   if(['neighbors','boundary','density'].includes(this.type)){
    if(this.type==='boundary')controls=select('position','Query position',[[0,'Mixed region'],[1,'Near class 0'],[2,'Near class 1'],[3,'Exact stored point']],0);
    else controls=select('k','K: neighbors',[1,2,3,5,9,15,25,50],5);
    controls+=slider('x','Query feature 1',-1.3,2.3,.05,.5)+slider('y','Query feature 2',-.9,1.4,.05,.2);
    if(this.type==='density')controls+=select('class','Class c to inspect',[0,1],1);
   }
   if(this.type==='regression')controls=select('k','K: neighbors',[1,3,7,15,25],3)+slider('q','New input x',-2,2,.05,.4);
   el.innerHTML=`<div class="c2-controls">${controls}</div><div class="c2-main"><div class="c2-plot" role="img" aria-label="${this.type} worked example"></div><div class="c2-work" aria-live="polite"></div></div><div class="c2-result" aria-live="polite"></div><div class="c2-foot"></div>`;
   this.plot=el.querySelector('.c2-plot');this.work=el.querySelector('.c2-work');this.resultBox=el.querySelector('.c2-result');this.foot=el.querySelector('.c2-foot');
   el.querySelectorAll('[data-value]').forEach(c=>c.addEventListener(c.type==='range'?'input':'change',()=>{
    if(c.dataset.value==='preset'){const v=+c.value;this.setting('b0').value=[-7.5,0,7.5,-12][v];this.setting('b1').value=[15.5,0,-15.5,24][v];}
    if(c.dataset.value==='position'){const p=[[.5,.2],[-.8,.7],[1.6,-.4],[points[0].x,points[0].y]][+c.value];this.setting('x').step='any';this.setting('y').step='any';this.setting('x').value=p[0];this.setting('y').value=p[1];this.queryOverride=p;}
    if(['x','y'].includes(c.dataset.value))this.queryOverride=null;
    this.render();
   }));
   this.render();instances.push(this);
  }
  setting(k){return this.el.querySelector('[data-value="'+k+'"]');}v(k){return +this.setting(k).value;}
  render(){this.el.querySelectorAll('[data-output]').forEach(o=>o.textContent=['x','y'].includes(o.dataset.output)?f(+this.setting(o.dataset.output).value,2):this.setting(o.dataset.output).value);let traces=[],l=layout('Feature 1','Feature 2'),work='',answer='',foot='';
   if(this.type==='fit'){
    const b0=this.v('b0'),b1=this.v('b1'),i=this.v('case')-1,ps=hospital.x.map(x=>E.sigmoid(b0+b1*x)),contrib=hospital.x.map((x,j)=>E.sigmoid((hospital.y[j]?1:-1)*(b0+b1*x))),logL=hospital.x.reduce((s,x,j)=>{const z=b0+b1*x;return s+hospital.y[j]*z-E.softplus(z);},0),z=b0+b1*hospital.x[i],p=ps[i],q=contrib[i],xs=lin(0,1);
    traces=[{type:'scatter',mode:'markers',name:'Observed labels',x:hospital.x,y:hospital.y,marker:{color:blue,size:8,opacity:.7}},{type:'scatter',mode:'lines',name:'Candidate probability',x:xs,y:xs.map(x=>E.sigmoid(b0+b1*x)),line:{color:green,width:4}},{type:'scatter',mode:'markers',name:'Selected patient',x:[hospital.x[i]],y:[hospital.y[i]],marker:{symbol:'circle-open',color:orange,size:18,line:{width:3}}},{type:'scatter',mode:'markers',name:'Model probability',x:[hospital.x[i]],y:[p],marker:{color:green,size:13}}];
    l=layout('Cholesterol input x (illustrative scale)','Observed label / model probability');l.yaxis.range=[-.12,1.12];l.shapes=[{type:'line',x0:hospital.x[i],x1:hospital.x[i],y0:0,y1:1,line:{color:orange,dash:'dot',width:2}}];
    work=box('1. One recorded patient',`<p>i = ${i+1}<br>Input xᵢ = ${f(hospital.x[i],3)}<br>Observed yᵢ = ${hospital.y[i]} (${hospital.y[i]?'present':'absent'})</p>`)+box('2. Probability from these coefficients',`<p>Score = ${f(b0,1)} + ${f(b1,1)} × ${f(hospital.x[i],3)} = ${f(z)}<br>σ(xᵢ) = ${p<.0001?likelihoodText(Math.log(p)):f(p,4)}</p>`)+box('3. Use the observed label',`<p>${hospital.y[i]?'Label 1: use σ(xᵢ)':'Label 0: use 1 − σ(xᵢ)'}<br>This patient contributes <strong>${q<.0001?likelihoodText(Math.log(q)):f(q,4)}</strong>.</p>`);
    answer=`<div><strong>Likelihood of all 100 observed labels</strong><br>Multiply all 100 patient contributions: L = ${likelihoodText(logL)}</div><div><strong>Fitting seeks a larger product.</strong><br>Changing coefficients changes every contribution.</div>`;
    foot='The inputs and observed labels stay fixed. These controls try candidate coefficients, rather than running an optimizer. The curve is not a class label. Displayed values are rounded.';
    this.result={b0,b1,i,p,q,logL,L:Math.exp(logL)};
   }
   if(this.type==='plane'){
    const p=points[this.v('case')-1];traces=markers(points);traces.push({type:'scatter',mode:'markers',name:'Selected observation',x:[p.x],y:[p.y],marker:{symbol:'circle-open',color:green,size:23,line:{width:3}}});
    work=box('What do the coordinates mean?',`<p>These are two synthetic input measurements in arbitrary units.<br>Each dot stores an input pair and a known label.</p>`)+box('Selected training observation',`<p>x₁ = ${f(p.x)} (horizontal)<br>x₂ = ${f(p.y)} (vertical)<br>y = ${p.c} (known class)</p>`)+box('What will KNN do?',`<p>For a new input pair, find nearby stored dots.<br>Use their labels to predict the new label.</p>`);
    answer='<div><strong>Position encodes the inputs.</strong><br>The two coordinates are the features.</div><div><strong>Colour and shape encode the target.</strong><br>Blue circles: class 0. Orange crosses: class 1.</div>';foot='50 stored observations: 25 in each class. Feature 2 is an input measurement, not the class label.';
   }
   if(['neighbors','boundary','density'].includes(this.type)){
    const k=this.type==='boundary'?1:this.v('k'),q=this.queryOverride||[this.v('x'),this.v('y')],r=E.knn(points,q,k),c=this.type==='density'?this.v('class'):1,kc=r.near.filter(n=>n.p.c===c).length,tied=Math.abs(r.p-.5)<1e-12;
    if(this.type!=='density'){
     if(!this.cache.has(k)){const xx=lin(-1.4,2.4,71),yy=lin(-1,1.5,51);this.cache.set(k,{xx,yy,z:yy.map(y=>xx.map(x=>E.knn(points,[x,y],k).label))});}const bg=this.cache.get(k);
     traces.push({type:'heatmap',x:bg.xx,y:bg.yy,z:bg.z,colorscale:[[0,'#20364f'],[1,'#4c3325']],zmin:0,zmax:1,showscale:false,hoverinfo:'skip'});
    }
    traces.push(...markers(points),{type:'scatter',mode:'markers+text',name:'Selected neighbors',x:r.near.map(n=>n.p.x),y:r.near.map(n=>n.p.y),text:r.near.map((n,i)=>k<=9?String(i+1):''),textposition:'top right',textfont:{color:green,size:20},marker:{symbol:'circle-open',size:20,color:green,line:{width:2}}},{type:'scatter',mode:'markers',name:'New query',x:[q[0]],y:[q[1]],marker:{symbol:'star',size:21,color:purple,line:{color:'#fff',width:1}}});
    l.xaxis.range=[-1.4,2.4];l.yaxis.range=[-1,1.5];
    if(this.type==='density'){
     const radius=r.near[k-1].d,V=Math.PI*radius*radius,input=k/(50*V),classDensity=kc/(25*V);l.yaxis.scaleanchor='x';l.yaxis.scaleratio=1;l.shapes=[{type:'circle',x0:q[0]-radius,x1:q[0]+radius,y0:q[1]-radius,y1:q[1]+radius,line:{color:green,width:3,dash:'dot'},fillcolor:'rgba(69,214,192,.06)'}];l.xaxis.range=[Math.min(-1.4,q[0]-radius-.1),Math.max(2.4,q[0]+radius+.1)];l.yaxis.range=[Math.min(-1,q[1]-radius-.1),Math.max(1.5,q[1]+radius+.1)];
     work=box('1. Count the points in the circle',`<p>All training points: n = 50<br>Class-${c} training points: n꜀ = 25<br>Selected points: K = ${k}<br>Of these, class ${c}: K꜀ = ${kc}</p>`)+box('2. Use the same region for both densities',`<p>Radius r = ${f(radius)}<br>Area V = πr² = ${f(V)}</p><table><tr><td>Input density</td><td>${k}/(50 × ${f(V)}) = ${f(input)}</td></tr><tr><td>Class-${c} density</td><td>${kc}/(25 × ${f(V)}) = ${f(classDensity)}</td></tr><tr><td>Class-${c} prior</td><td>25/50 = 0.5</td></tr></table>`);
     answer=`<div><strong>3. Apply Bayes: class density × prior / input density</strong><br>${frac(mn(f(classDensity))+'<mo>×</mo>'+mn('0.5'),mn(f(input)))} ≈ ${frac(mn(kc),mn(k))} = <strong>${pct(kc/k)}</strong> for class ${c}</div><div><strong>The common area cancels.</strong><br>Only the selected class count / K remains.</div>`;foot='Both densities use exactly the same circle. Calculations use full precision. Density heights can exceed 1, while the normalized class probability stays between 0 and 1.';this.result={k,kc,c,V,p:kc/k,q};
    }else{
     const sums=[k-kc,kc];
     work=box('1. The new input has no known label',`<p>Query = (${f(q[0],2)}, ${f(q[1],2)})<br>Select the ${k} nearest input${k===1?'':'s'} by Euclidean distance.</p>`)+`<div class="c2-neighbor-table"><table><thead><tr><th>Rank</th><th>Distance d</th><th>Known class</th></tr></thead><tbody>${r.near.map((n,i)=>`<tr><td>${i+1}</td><td>${f(n.d)}</td><td class="c2-class-${n.p.c}">${n.p.c}</td></tr>`).join('')}</tbody></table></div>`+box('2. Count the votes for each class',`<p>Class 0: ${sums[0]} &nbsp;&nbsp; Class 1: ${sums[1]}<br>${sums[1]} / ${k} = ${pct(r.p)} of the votes are for class 1.</p>`);
     answer=`<div><strong>${tied?'Tie: both classes have the same vote count':'3. Predict class '+r.label}</strong><br>${tied?'This demo uses class 0 to break a tie.':'Class '+r.label+' has the larger vote count.'}</div><div><strong>Each row counts once.</strong><br>Distance determines which neighbors are selected.</div>`;
     foot='Synthetic measurements in arbitrary units. Rings show selected inputs. Background colors show the predicted class at other inputs. Equal distances use stored order.';this.result={...r,k,q,tied,sums};
    }
   }
   if(this.type==='regression'){
    const ps=E.regressionData(),k=this.v('k'),q=this.v('q'),r=E.regress(ps,q,k),xs=lin(-2,2,201),sum=r.near.reduce((s,n)=>s+n.p.y,0);
    traces=[{type:'scatter',mode:'markers',name:'Stored observations',x:ps.map(p=>p.x),y:ps.map(p=>p.y),marker:{color:blue,size:9}},{type:'scatter',mode:'lines',name:'KNN prediction at each x',x:xs,y:xs.map(x=>E.regress(ps,x,k).y),line:{color:green,width:3}},{type:'scatter',mode:'markers',name:'Selected neighbors',x:r.near.map(n=>n.p.x),y:r.near.map(n=>n.p.y),marker:{symbol:'circle-open',size:20,color:orange,line:{width:2}}},{type:'scatter',mode:'markers',name:'New prediction',x:[q],y:[r.y],marker:{symbol:'star',color:purple,size:20}}];l=layout('Input x (illustrative units)','Numerical target y');l.shapes=[{type:'line',x0:q,x1:q,y0:-1.4,y1:1.4,line:{color:purple,dash:'dot',width:2}}];
    work=box('1. Select by input distance only',`<p>New input x = ${f(q,2)}<br>Choose the K = ${k} smallest |xⱼ − x|.<br>The vertical y-values are targets to predict.</p>`)+`<div class="c2-neighbor-table"><table><thead><tr><th>Input xⱼ</th><th>Target yⱼ</th><th>Distance</th></tr></thead><tbody>${r.near.map(n=>`<tr><td>${f(n.p.x)}</td><td>${f(n.p.y)}</td><td>${f(n.d)}</td></tr>`).join('')}</tbody></table></div>`+box('2. Add the selected targets',`<p>Sum of the table’s yⱼ values = <strong>${f(sum)}</strong></p>`);
    answer=`<div><strong>3. Divide the sum by K</strong><br>Predicted ŷ = ${frac(mn(f(sum)),mn(k))} = <strong>${f(r.y)}</strong></div><div><strong>Each selected target has equal weight.</strong><br>K = 1 copies one target. K = 25 returns the global mean.</div>`;foot='25 illustrative observations. Only horizontal input distance selects neighbors. The green curve repeats this same average at every input.';this.result={k,q,sum,y:r.y};
   }
   this.work.innerHTML=work;this.resultBox.innerHTML=answer;this.foot.textContent=foot;
   this.ready=this.ready.then(()=>Plotly.react(this.plot,traces,l,{displayModeBar:false,responsive:false,scrollZoom:false}));return this.ready;
  }
 }
 function mountValidation(el) {
  // Fixed, illustrative data. Each row gives the input scores for classes 0 and 1.
  const toPoints = groups => groups.flatMap((scores, c) => scores.map(x => ({x, y: 0, c})));
  const train = toPoints([[9,14,19,22,27,32,37,42,46,64], [34,55,59,72,78]]);
  const validation = toPoints([[12,23,35,44,47], [53,61,65,70,80]]).sort((a, b) => a.x - b.x);
  const test = toPoints([[16,25,33,45,52], [49,57,63,74,82]]);
  const candidates = [1, 5, 15].map(k => {
   const cases = validation.map(point => ({point, prediction: E.knn(train, [point.x, 0], k)}));
   return {k, cases, correct: cases.filter(({point, prediction}) => point.c === prediction.label).length};
  });

  el.innerHTML = `
   <div class="c2-validation-train"><strong>15 labelled training cases</strong><span>Every choice uses the same training cases. Nearest means closest on a single input score.</span></div>
   <div class="c2-validation-panel">
    <h4>1. Compare the same 10 validation cases</h4>
    <div class="c2-validation-options" role="group" aria-label="Candidate neighbor counts">
     ${candidates.map(({k, correct}) => `<button type="button" data-candidate="${k}" aria-pressed="false"><strong>K = ${k}</strong><span>${correct} / ${validation.length} correct</span></button>`).join('')}
    </div>
    <div class="c2-validation-case-label">Select a validation case by its input score</div>
    <div class="c2-validation-cases" role="group" aria-label="Inspect validation cases">
     ${validation.map(({x}, i) => `<button type="button" data-case="${i}" aria-pressed="false"><span>${x}</span><strong aria-hidden="true"></strong></button>`).join('')}
    </div>
    <div class="c2-validation-detail" aria-live="polite"></div>
   </div>
   <div class="c2-validation-panel c2-validation-test">
    <div><h4>2. Lock your choice and check 10 separate test cases</h4><div class="c2-test-result" aria-live="polite"></div></div>
    <div class="c2-validation-actions"><button type="button" data-action="lock" class="c2-primary">Lock K = 1</button><button type="button" data-action="restart">Start over</button></div>
   </div>`;
  const options = [...el.querySelectorAll('[data-candidate]')];
  const tiles = [...el.querySelectorAll('[data-case]')];
  const detail = el.querySelector('.c2-validation-detail');
  const testResult = el.querySelector('.c2-test-result');
  const lock = el.querySelector('[data-action="lock"]');
  const restart = el.querySelector('[data-action="restart"]');
  let selected = candidates[0];
  let inspected = 2;
  let locked = false;

  function showValidation() {
   for (const button of options) {
    button.setAttribute('aria-pressed', String(+button.dataset.candidate === selected.k));
    button.disabled = locked;
   }
   tiles.forEach((button, i) => {
    const {point, prediction} = selected.cases[i];
    const correct = point.c === prediction.label;
    button.dataset.correct = String(correct);
    button.setAttribute('aria-pressed', String(i === inspected));
    button.setAttribute('aria-label', `Input score ${point.x}, ${correct ? 'correct' : 'incorrect'} prediction`);
    button.querySelector('strong').textContent = correct ? '✓' : '×';
   });
   const {point, prediction} = selected.cases[inspected];
   const votes = [0, 1].map(c => prediction.near.filter(({p}) => p.c === c));
   detail.innerHTML = `<span><strong>Input score ${point.x}</strong> · Actual class ${point.c} · Predicted class ${prediction.label}</span>
    <div class="c2-validation-votes">${votes.map((neighbors, c) => {
     const scores = neighbors.map(({p}) => p.x).join(', ');
     return `<span><strong>Class ${c}: ${neighbors.length} vote${neighbors.length === 1 ? '' : 's'}</strong>${scores ? ` (training scores ${scores})` : ''}</span>`;
    }).join('')}</div>`;
  }

  function showTest() {
   lock.textContent = locked ? `K = ${selected.k} locked` : `Lock K = ${selected.k}`;
   lock.disabled = locked;
   restart.disabled = !locked;
   if (locked) {
    const correct = Math.round(test.length * E.accuracy(train, test, selected.k));
    testResult.innerHTML = `<strong>Test accuracy: ${correct} / ${test.length} correct (${100 * correct / test.length}%)</strong> · Validation: ${selected.correct} / ${validation.length} correct`;
   } else {
    testResult.textContent = 'Test accuracy stays hidden until you lock your choice.';
   }
  }

  options.forEach((button, i) => button.addEventListener('click', () => {
   selected = candidates[i];
   showValidation();
   showTest();
  }));
  tiles.forEach((button, i) => button.addEventListener('click', () => {
   inspected = i;
   showValidation();
  }));
  lock.addEventListener('click', () => {
   locked = true;
   showValidation();
   showTest();
   restart.focus();
  });
  restart.addEventListener('click', () => {
   locked = false;
   selected = candidates[0];
   inspected = 2;
   showValidation();
   showTest();
   options[0].focus();
  });
  showValidation();
  showTest();
 }
 document.querySelectorAll('.c2-widget').forEach(el => {
  if (el.dataset.example === 'validation') mountValidation(el);
  else new Example(el);
 });
 document.querySelectorAll('.c2-complexity-plot').forEach(el=>{
  const ps=E.regressionData(),k=el.dataset.k==='all'?ps.length:1,x=lin(-2,2,201),l=layout('Input x','Target / prediction');l.font.size=20;l.margin={l:58,r:12,t:8,b:57};l.showlegend=false;l.yaxis.range=[-1.4,1.4];
  Plotly.newPlot(el,[{type:'scatter',mode:'markers',x:ps.map(p=>p.x),y:ps.map(p=>p.y),marker:{color:blue,size:7}},{type:'scatter',mode:'lines',x,y:x.map(q=>E.regress(ps,q,k).y),line:{color:green,width:3}}],l,{displayModeBar:false,responsive:true});
 });
 function resize(){for(const w of instances){if(w.el.getBoundingClientRect().width>0)w.ready=w.ready.then(()=>Plotly.Plots.resize(w.plot));}}
 if(window.Reveal){Reveal.on('slidechanged',resize);Reveal.on('ready',resize);}window.addEventListener('resize',resize);
 window.C2Examples={instances,ready:Promise.all(instances.map(w=>w.ready)),resize};
})();
