/* Small teaching experiments alongside the full CSP playback labs. */
(function(scope){
 'use strict';
 const names=['red','green','blue'],fills=['#9c4255','#25705d','#335f96'];
 function graph(a){
  const points={A:[100,85],B:[580,85],C:[580,280],D:[100,280]};let lines='';
  CSP.edges.forEach(([v,w])=>{const p=points[v],q=points[w],bad=a[v]===a[w];lines+=`<path d="M${p[0]} ${p[1]} L${q[0]} ${q[1]}" stroke="${bad?'#ff5c77':'#526079'}" stroke-width="${bad?5:3}"/>`;if(bad)lines+=`<text x="${(p[0]+q[0])/2}" y="${(p[1]+q[1])/2-12}" fill="#ff5c77" text-anchor="middle" font-size="29">×</text>`;});
  for(const v of CSP.names){const [x,y]=points[v];lines+=`<circle cx="${x}" cy="${y}" r="38" fill="${fills[a[v]]}" stroke="#c2cee0" stroke-width="2"/><text x="${x}" y="${y+10}" text-anchor="middle" fill="#e8ecf4" font-size="30">${v}</text><text x="${x}" y="${y+70}" text-anchor="middle" fill="#e8ecf4" font-size="24">${names[a[v]]}</text>`;}
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 365" role="img" aria-label="Current coloring: ${CSP.names.map(v=>v+' '+names[a[v]]).join(', ')}"><g font-family="Segoe UI, sans-serif">${lines}</g></svg>`;
 }
 class Experiment{
  constructor(el){
   this.el=el;this.kind=el.dataset.explorer;el.setAttribute('role','region');el.setAttribute('aria-label',this.kind==='support'?'Support explorer':'Plateau repair explorer');
   if(this.kind==='support'){
    this.value=2;this.remaining=[1,2,3,4];
    el.innerHTML=`<div class="teaching-controls"><label>Try A = <select data-teaching-setting="A" aria-label="Value of A">${[1,2,3,4].map(v=>`<option${v===2?' selected':''}>${v}</option>`).join('')}</select></label><span>Remaining B values:</span>${[1,2,3,4].map(v=>`<button type="button" data-b="${v}" aria-pressed="true" aria-label="Keep B value ${v}">${v}</button>`).join('')}<button type="button" data-teaching-action="reset">Restore B values</button></div><div class="teaching-grid"><div><div class="teaching-values"></div><div class="teaching-legend">Green: supports A &lt; B. Red: fails. Faded: removed.</div></div><div><div class="teaching-result"></div><div class="teaching-message" role="status" aria-live="polite"></div></div></div>`;
    el.addEventListener('change',e=>{if(e.target.dataset.teachingSetting==='A'){this.value=Number(e.target.value);this.render();}});
   }else{
    this.a={A:0,B:1,C:0,D:2};this.message='No one-variable move reduces the initial score below 1. Try strict improvement, then a sideways move.';
    el.innerHTML='<div class="teaching-controls"><button type="button" data-teaching-action="strict">Try strict improvement</button><button type="button" data-teaching-action="sideways">Take sideways move (B to blue)</button><button type="button" data-teaching-action="reset">Reset</button></div><div class="teaching-grid"><div class="teaching-graphic"></div><div><div class="teaching-result"></div><div class="teaching-message" role="status" aria-live="polite"></div></div></div>';
   }
   el.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||b.disabled)return;
    if(this.kind==='support'){
     if(b.dataset.b){const v=Number(b.dataset.b);this.remaining=this.remaining.includes(v)?this.remaining.filter(x=>x!==v):[...this.remaining,v].sort();}
     else if(b.dataset.teachingAction==='reset')this.remaining=[1,2,3,4];
    }else{
     const action=b.dataset.teachingAction;
     if(action==='reset'){this.a={A:0,B:1,C:0,D:2};this.message='Reset to the plateau: one conflict, with no strictly improving neighbor.';}
     if(action==='strict'){
      const candidates=CSP.neighbors(this.a),minimum=Math.min(...candidates.map(m=>m.score));
      if(minimum<CSP.score(this.a)){const move=candidates.find(m=>m.score===minimum);this.a=move.a;this.message='Change '+move.v+' to '+names[move.x]+'. The score falls to '+minimum+'.'+(minimum===0?' Every edge now has different endpoint colors.':'');}
      else this.message='Strict improvement stops here: every one-variable neighbor has at least '+CSP.score(this.a)+' conflict. This does not prove that the CSP has no solution.';
     }
     if(action==='sideways'){this.a={...this.a,B:2};this.message='B changes from green to blue. The score stays at 1, but an improving move is now available. Try strict improvement again.';}
    }
    this.render();
   });
   el.addEventListener('keydown',e=>e.stopPropagation());this.render();
  }
  render(){
   if(this.kind==='support'){
    const c={vars:['A','B'],test:a=>a.A<a.B},domains={A:[this.value],B:this.remaining},witness=CSP.support(c,'A',this.value,domains),good=this.remaining.filter(v=>this.value<v);
    this.el.querySelectorAll('[data-b]').forEach(b=>b.setAttribute('aria-pressed',String(this.remaining.includes(Number(b.dataset.b)))));
    this.el.querySelector('.teaching-values').innerHTML=[1,2,3,4].map(v=>`<div class="${!this.remaining.includes(v)?'removed':good.includes(v)?'supports':'no-support'}">B = ${v}</div>`).join('');
    this.el.querySelector('.teaching-result').textContent='A = '+this.value+(witness?' has support':' has no support');
    this.el.querySelector('.teaching-message').textContent=witness?'Possible partners: B = '+good.join(' or ')+'. One working partner is enough to keep this A value.':this.remaining.length?'No remaining B value is larger than '+this.value+'. Remove this A value when revising A against A < B.':'B has an empty domain, so this branch already has no solution.';
    this.el.dataset.support=String(!!witness);this.el.dataset.a=String(this.value);this.el.dataset.b=this.remaining.join(',');
   }else{
    this.el.querySelector('.teaching-graphic').innerHTML=graph(this.a);this.el.querySelector('.teaching-result').textContent='h(a) = '+CSP.score(this.a)+' conflict'+(CSP.score(this.a)===1?'':'s');
    this.el.querySelector('.teaching-message').textContent=this.message;
    this.el.querySelector('[data-teaching-action="sideways"]').disabled=this.a.B===2||CSP.score(this.a)===0;
    this.el.querySelector('[data-teaching-action="strict"]').disabled=CSP.score(this.a)===0;
    this.el.dataset.score=String(CSP.score(this.a));this.el.dataset.assignment=JSON.stringify(this.a);
   }
  }
 }
 scope.CSPTeaching={instances:[...document.querySelectorAll('.teaching-explorer')].map(el=>new Experiment(el))};
})(window);
