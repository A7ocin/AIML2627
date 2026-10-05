/* Native vector diagrams remain sharp at every Reveal scale. */
(() => {
  const C={text:'#e8ecf4',muted:'#93a0b6',stat:'#45d6c0',cyber:'#ff9d4d',comp:'#c792ea',neural:'#4db8ff',ml:'#7ee08a',winter:'#ff5c77',deep:'#ffd166'};
  const text=(x,y,s,col=C.text,size=26,anchor='middle')=>`<text x="${x}" y="${y}" fill="${col}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const line=(x,y,X,Y,col=C.muted,dash='')=>`<line x1="${x}" y1="${y}" x2="${X}" y2="${Y}" stroke="${col}" stroke-width="2" stroke-dasharray="${dash||'none'}"/>`;
  const arrow=(x,y,X,Y,col=C.muted)=>line(x,y,X,Y,col)+`<path d="M ${X-10} ${Y-6} L ${X} ${Y} L ${X-10} ${Y+6}" fill="none" stroke="${col}" stroke-width="2"/>`;
  const box=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${col}" fill-opacity=".08" stroke="${col}" stroke-width="2"/>`;
  const circle=(x,y,r,col)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`;
  const path=(d,col,dash='')=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${dash||'none'}"/>`;
  function svg(id,w,h,title,body,classes='diagram') {
    return `<svg id="${id}" class="${classes}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${id}-title" xmlns="http://www.w3.org/2000/svg"><title id="${id}-title">${title}</title>${body}</svg>`;
  }
  function replace(id,w,h,title,body){
    const old=document.getElementById(id); if(!old)return;
    old.outerHTML=svg(id,w,h,title,body,`diagram ${old.classList.contains('fragment')?'fragment fade-up':''}`);
  }
  function strips(){
    const nodes=[['1763','Bayes','stat'],['1936','Turing','comp'],['1956','Dartmouth','neural'],['1970s','Winter I','winter'],['1980s','Experts','ml'],['1990s','ML turn','ml'],['2012','Deep learning','deep'],['2022','ChatGPT','deep']];
    for(const id of ['title-strip','end-strip'])if(document.getElementById(id))document.getElementById(id).innerHTML=nodes.map(([y,l,c])=>`<div class="tl-node" style="--era-color:${C[c]}"><div class="tl-year">${y}</div><div class="tl-track"><div class="tl-dot"></div></div><div class="tl-label">${l}</div></div>`).join('');
  }
  function map(){
    if(!document.getElementById('era-map'))return;
    const fields=[['Statistics','Probability &amp; regression — Bayes, Markov chains','stat'],['Cybernetics','Feedback systems &amp; the artificial neuron','cyber'],['Computation Theory','Turing, computability &amp; logic','comp'],['Artificial Intelligence','From its birth to deep learning','neural']];
    document.getElementById('era-map').innerHTML='<div style="display:grid;grid-template-columns:repeat(2,1fr)">'+fields.map(([n,d,c])=>`<div class="fragment fade-up" style="background:var(--bg-elevated);border:1px solid var(--line);border-left:4px solid ${C[c]};border-radius:12px;text-align:left"><span style="font-weight:650">${n}</span><div>${d}</div></div>`).join('')+'</div>';
  }
  function eras(){
    if(!document.getElementById('era-list'))return;
    const list=[['I','Foundations · Statistics','1763–1936',C.stat],['II','Computation Theory &amp; Turing','1936–50',C.comp],['III','Cybernetics &amp; Neurons','1943–49',C.cyber],['IV','The Birth of AI','1950s',C.neural],['V','The First Winter','1970s',C.winter],['VI','Expert Systems Boom','1980s',C.ml],['VII','Connectionism Returns','1980–89',C.neural],['VIII','Second Winter &amp; ML Turn','1980s–90s',C.winter],['IX','Deep Learning Rises','2006→12',C.deep],['X','Modern Generative AI','2014–22',C.deep]];
    document.getElementById('era-list').innerHTML='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px 30px;max-width:1560px;margin:0 auto">'+list.map(([n,t,y,c])=>`<div class="fragment fade-up" style="background:var(--bg-elevated);border:1px solid var(--line);border-left:4px solid ${c};border-radius:12px;padding:18px 26px;display:flex;align-items:center;justify-content:space-between;column-gap:20px"><span style="font-size:30px;white-space:nowrap;color:var(--text-muted)">Era <b style="color:#fff">${n}</b></span><span style="font-size:32px;line-height:1.2;flex:1;min-width:0"><b style="color:${c}">${t}</b></span><span style="font-size:24px;white-space:nowrap;background:rgba(255,255,255,.06);padding:6px 16px;border-radius:999px;color:#fff">${y}</span></div>`).join('')+'</div>';
  }
  function cover(){
    if(!document.querySelector('[data-slide="title"] .slide-body'))return;
    const layers=[[65,[115,215,315]],[220,[65,165,265,365]],[380,[115,215,315]]];let b='';
    for(let i=0;i<layers.length-1;i++)for(const y of layers[i][1])for(const Y of layers[i+1][1])b+=line(layers[i][0],y,layers[i+1][0],Y,'#2d4560');
    layers.forEach(([x,ys],i)=>ys.forEach(y=>{b+=`<circle cx="${x}" cy="${y}" r="23" fill="${[C.stat,C.neural,C.comp][i]}" fill-opacity=".13" stroke="${[C.stat,C.neural,C.comp][i]}" stroke-width="2"/>`+circle(x,y,5,[C.stat,C.neural,C.comp][i]);}));
    document.querySelector('[data-slide="title"] .slide-body').insertAdjacentHTML('beforeend',svg('cover-network',450,430,'An abstract neural network',b,'cover-graphic'));
  }
  function foundations(){
    const b=text(225,55,'LEARNING FROM EVIDENCE',C.stat,21)+box(65,95,320,85,C.stat)+text(225,146,'Prior belief',C.text,30)+line(225,180,225,230,C.stat)+box(65,235,320,85,C.neural)+text(225,286,'New evidence',C.text,30)+line(225,320,225,365,C.neural)+box(65,370,320,85,C.comp)+text(225,422,'Updated belief',C.text,30)+text(225,507,'The Bayesian idea',C.muted,23);
    const aside=document.querySelector('[data-slide="era-stat"] aside');
    if(aside)aside.innerHTML=svg('bayesian-update',450,550,'Prior belief combines with new evidence to form an updated belief',b);
  }
  function neuron(){
    let b=text(145,42,'INPUTS',C.stat,22)+text(585,42,'AGGREGATION',C.deep,22)+text(995,42,'THRESHOLD',C.cyber,22)+text(1440,42,'OUTPUT',C.ml,22);
    [90,155,220].forEach((y,i)=>{b+=text(90,y+8,`x${i+1}`,C.stat,27)+line(135,y,515,155,C.stat)+text(260,y+(155-y)*125/380-18,`w${i+1}`,C.muted,23);});
    b+=`<circle cx="585" cy="155" r="64" fill="#302a1b" stroke="${C.deep}" stroke-width="2"/>`+text(585,175,'Σ',C.deep,58)+arrow(650,155,870,155,C.deep)+box(880,94,220,122,C.cyber)+path('M 920 178 H 987 V 132 H 1060',C.cyber)+arrow(1100,155,1365,155,C.ml)+box(1375,114,145,82,C.ml)+text(1447,165,'0 / 1',C.ml,34);
    replace('neuron-canvas',1630,280,'Weighted inputs feed a sum, then a threshold produces a binary output',b);
  }
  function xor(){
    let b=text(330,44,'XOR: A SINGLE LAYER’S LIMIT',C.winter,23);
    b+=line(135,340,535,340,'#334157')+line(135,340,135,90,'#334157')+text(548,366,'x₁',C.muted,23)+text(106,87,'x₂',C.muted,23);
    for(const [x,y,label,col] of [[185,290,'0',C.winter],[475,110,'0',C.winter],[185,110,'1',C.ml],[475,290,'1',C.ml]])b+=circle(x,y,26,col)+text(x,y+9,label,'#0b0f17',27);
    b+=line(235,65,445,333,C.muted,'8 8')+text(330,404,'No straight boundary separates',C.text,26)+text(330,440,'both classes.',C.text,26);
    replace('xor-canvas',660,480,'XOR has matching classes on opposite corners; one straight line cannot separate them',b);
  }
  function rules(){
    if(!document.getElementById('rule-chain'))return;
    let b=text(52,37,'KNOWLEDGE → RULE → DECISION',C.ml,22,'start');
    [89,161,233].forEach((y,i)=>{b+=box(52,y-25,260,52,C.cyber)+text(182,y+8,['Symptom A','Symptom B','Observation C'][i],C.text,25)+line(312,y,540,161,C.muted);});
    b+=box(540,106,370,110,C.ml)+text(725,149,'IF A and B and C',C.text,29)+text(725,192,'THEN suggest D',C.ml,29)+arrow(910,161,1190,161,C.ml)+box(1200,123,330,76,C.ml)+text(1365,171,'Candidate diagnosis',C.text,27);
    replace('rule-chain',1650,280,'Illustrative symbolic reasoning: observations trigger a rule that suggests a candidate diagnosis',b);
    document.getElementById('rule-chain').classList.add('fragment','fade-up');
  }
  function vanishing(){
    let b=text(52,37,'GRADIENT STRENGTH',C.muted,21,'start')+text(1035,37,'ILLUSTRATIVE',C.muted,18,'end');
    b+=line(95,247,1040,247,'#334157')+path('M 105 80 C 265 165 380 217 565 231 S 835 244 1025 246',C.winter);
    [[105,80],[290,172],[475,222],[660,237],[845,243],[1025,246]].forEach(([x,y])=>{b+=circle(x,y,6,C.text);});
    b+=text(727,174,'Repeated small derivatives',C.winter,25)+text(727,208,'weaken the learning signal',C.winter,25)+text(98,286,'Near the output',C.muted,22,'start')+text(1036,286,'Earlier layers',C.muted,22,'end')+arrow(470,285,665,285,C.muted);
    replace('vanishing-canvas',1120,330,'The gradient shrinks as backpropagation travels from the output toward earlier layers',b);
  }
  function bitter(){
    let b=text(65,39,'CAPABILITY',C.muted,21,'start')+text(1045,39,'CONCEPTUAL · NOT MEASURED DATA',C.muted,17,'end');
    b+=line(80,285,1030,285,'#334157')+line(80,285,80,73,'#334157')+path('M 95 260 C 380 260 750 245 1020 85',C.deep)+path('M 95 205 C 340 145 650 137 1018 137',C.winter,'10 9');
    b+=text(965,79,'General methods + compute',C.deep,25,'end')+text(400,112,'Handcrafted methods',C.winter,25)+text(560,337,'Increasing available computation →',C.muted,24);
    replace('bitter-canvas',1120,380,'Conceptual comparison: general methods benefit more from increasing computation than handcrafted methods',b);
  }
  function waves(){
    let b=text(38,42,'A RECURRING PATTERN',C.neural,22,'start')+text(38,75,'Conceptual overview · not a quantitative timeline',C.muted,18,'start');
    // Winter markers share exact endpoints with the curve's troughs.
    const winter1={x:210,y:325}, winter2={x:430,y:309};
    b+=line(55,354,750,354,'#334157')+path(`M 55 324 C 115 268 145 239 180 290 C 190 310 192 ${winter1.y} ${winter1.x} ${winter1.y} C 245 ${winter1.y} 275 205 315 205 C 355 205 387 ${winter2.y} ${winter2.x} ${winter2.y} C 475 ${winter2.y} 521 209 584 173 C 640 150 695 128 750 101`,C.neural);
    b+=circle(winter1.x,winter1.y,7,C.winter)+circle(winter2.x,winter2.y,7,C.winter)+text(winter1.x,391,'Winter I',C.winter,24)+text(winter2.x,391,'Winter II',C.winter,24)+text(310,161,'Expert systems',C.ml,24)+text(590,120,'Deep learning',C.deep,24);
    replace('wave-canvas',800,460,'A conceptual wave of AI enthusiasm with two winters and a later deep learning rise',b);
  }
  function modern(){
    const f=document.querySelector('[data-slide="gpt3"] figure');
    if(!f)return;
    let b=text(340,46,'FROM CONTEXT TO THE NEXT TOKEN',C.deep,22);
    ['The','model','learns'].forEach((s,i)=>{b+=box(63+i*188,88,166,65,C.neural)+text(146+i*188,130,s,C.text,28)+line(146+i*188,153,146+i*188,207,C.neural);});
    b+=box(63,207,542,99,C.comp)+text(334,249,'Causal self-attention',C.text,27)+text(334,285,'Decoder-only Transformer',C.comp,23)+line(334,306,334,345,C.comp)+box(206,346,256,65,C.deep)+text(334,388,'“patterns”',C.deep,30);
    f.innerHTML=svg('transformer-context',680,440,'Illustrative token flow: a decoder-only Transformer uses preceding context to predict a next token',b)+'<figcaption>GPT-3 · schematic next-token prediction<span class="media-credit"><a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noopener noreferrer">Brown et al., 2020 · Language Models are Few-Shot Learners</a></span></figcaption>';
  }
  function deep(){
    const f=document.querySelector('[data-slide="deep-recipe-old"] figure');
    if(!f)return;
    let b=text(295,46,'THE RECIPE FOR A BREAKTHROUGH',C.deep,21);
    [['Data','Large labeled datasets',C.stat],['Compute','GPU acceleration',C.neural],['Learning','Deep neural networks',C.comp]].forEach(([s,l,c],i)=>{const y=83+i*117;b+=box(36,y,518,92,c)+text(70,y+36,s,c,29,'start')+text(70,y+69,l,C.text,23,'start');});
    f.innerHTML=svg('deep-recipe',590,460,'Deep learning combines large datasets, GPU compute and neural networks',b)+'<figcaption>Three ingredients behind the deep learning breakthrough</figcaption>';
  }
  function init(){strips();map();eras();cover();foundations();neuron();xor();rules();vanishing();bitter();waves();modern();deep();Reveal.sync();Reveal.layout();}
  // note: modern()/deep() are guarded and only inject SVGs if a matching section still exists.
  if(Reveal.isReady())init();else Reveal.on('ready',init);
})();
