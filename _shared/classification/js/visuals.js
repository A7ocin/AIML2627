window.CLVisuals={mount(){const colors=['#6ea8fe','#f4a261','#45d6c0','#ba8cff'],text=(x,y,t,size=30,c='#e8ecf4')=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${c}" font-size="${size}">${t}</text>`,box=(x,y,w,h,label,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#141a26" stroke="${c}" stroke-width="2"/>${text(x+w/2,y+h/2+10,label,30,c)}`;
for(const el of document.querySelectorAll('[data-diagram]')){let s='',vb='0 0 1200 350',name=el.dataset.diagram;if(name==='cover'){
 vb='0 0 650 500';
 const ps=COURSE_DATA.cls_two_class.data.flatMap((t,c)=>t.x.map((x,i)=>({x,y:t.y[i],c}))),q=[.5,.2],near=CLEngine.knn(ps,q,5).near;
 const px=x=>70+(x+1.1)*160,py=y=>385-(y+.7)*175;
 s='<rect x="30" y="20" width="590" height="410" rx="24" fill="#101722" stroke="#263148"/>';
 for(const n of near)s+=`<path d="M${px(q[0])} ${py(q[1])}L${px(n.p.x)} ${py(n.p.y)}" stroke="#45d6c0" stroke-width="2" opacity=".6"/>`;
 for(const p of ps){const x=px(p.x),y=py(p.y),c=colors[p.c];s+=p.c===0?`<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`:`<path d="M${x-5} ${y-5}l10 10m0-10l-10 10" stroke="${c}" stroke-width="3"/>`;}
 for(const n of near)s+=`<circle cx="${px(n.p.x)}" cy="${py(n.p.y)}" r="12" fill="none" stroke="#45d6c0" stroke-width="2"/>`;
 s+=`<circle cx="${px(q[0])}" cy="${py(q[1])}" r="9" fill="#ba8cff" stroke="#e8ecf4" stroke-width="2"/>`;
 s+=text(180,475,'Class 0',25,colors[0])+text(465,475,'Class 1',25,colors[1]);
} 
if(name==='bayes'){s=text(600,45,'At the same observed x',30)+`<rect x="160" y="90" width="264" height="100" fill="${colors[0]}" rx="10"/><rect x="424" y="90" width="616" height="100" fill="${colors[1]}" rx="10"/>`+text(292,150,'P(0 | x) = 0.3',28,'#0b0f17')+text(732,150,'P(1 | x) = 0.7',28,'#0b0f17')+text(600,258,'Predict class 1',38,colors[2])+text(600,320,'30% of outcomes can still be class 0',30);}
if(name==='naive'){s=`<path d="M600 95L270 240M600 95L600 240M600 95L930 240" stroke="#586680" stroke-width="3"/>`+box(490,20,220,90,'Class Y',colors[3])+box(160,230,220,90,'Feature X₁',colors[0])+box(490,230,220,90,'Feature X₂',colors[2])+box(820,230,220,90,'Feature X₃',colors[1]);}
if(name==='splits'){s=box(20,70,340,120,'Training',colors[0])+box(430,70,340,120,'Validation',colors[3])+box(840,70,340,120,'Final test',colors[2])+text(395,145,'→',35)+text(805,145,'→',35)+text(190,255,'Fit the candidate',27)+text(600,255,'Choose the procedure',27)+text(1010,255,'Assess it once',27);}
el.innerHTML=`<svg class="rg-svg" viewBox="${vb}" role="img" aria-label="${name} diagram">${s}</svg>`;
}}};
