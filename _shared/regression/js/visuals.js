(function(scope){
 const C={text:'#e8ecf4',muted:'#93a0b6',line:'#526079',teal:'#45d6c0',blue:'#4db8ff',purple:'#c792ea',orange:'#ff9d4d',bg:'#141a26'};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const text=(x,y,t,size=28,color=C.text)=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="${size}" fill="${color}">${esc(t)}</text>`;
 const path=(d,c=C.line,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"/>`;
 const box=(x,y,w,h,label,color=C.blue)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${C.bg}" stroke="${color}" stroke-width="2"/>`+text(x+w/2,y+h/2,label);
 const svg=(b,label,w=1100,h=500)=>`<svg class="rg-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${b}</svg>`;
 function cover(){let b=path('M90 65V420H1020');for(let i=0;i<18;i++){const x=140+i*45,y=390-16*i+Math.sin(i*3)*35,yh=390-16*i;b+=path(`M${x} ${y}V${yh}`,C.purple,2)+`<circle cx="${x}" cy="${y}" r="8" fill="${C.blue}"/>`;}b+=path('M130 394L940 106',C.teal,5)+text(550,470,'observations · fitted line · residuals',29,C.muted);return svg(b,'A fitted line and vertical residuals');}
 function splits(){return svg(box(20,80,500,105,'Training',C.blue)+box(550,80,300,105,'Validation',C.purple)+box(880,80,200,105,'Test',C.teal)+text(550,240,'Fit → compare → final assessment',28,C.muted),'Training, validation and test roles',1100,280);}
 function confound(){return svg(box(370,35,360,90,'Temperature',C.purple)+box(65,320,350,100,'Ice-cream sales',C.blue)+box(700,320,340,100,'Shark attacks',C.teal)+path('M440 125L255 310M254 292L255 310L273 307',C.purple,4)+path('M660 125L870 310M852 305L870 310L868 292',C.purple,4)+text(575,255,'Shared cause?',30,C.muted),'Proposed temperature confounder with arrows to both variables');}
 function mount(){const f={cover,splits,confound};document.querySelectorAll('[data-diagram]').forEach(el=>el.innerHTML=f[el.dataset.diagram]());}
 scope.RGVisuals={C,esc,mount};
})(window);
