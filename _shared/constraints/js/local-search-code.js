/* A line-by-line reading guide, not an execution of the CSP algorithm. */
(function(){
 'use strict';
 document.querySelectorAll('.local-code-explainer').forEach(el=>{
  const rows=[...el.querySelectorAll('.lc-row')];let step=0;
  function show(n){
   step=Math.max(0,Math.min(rows.length,n));el.dataset.lcStep=String(step);
   rows.forEach((row,i)=>{
    row.classList.toggle('lc-revealed',i<step);row.classList.toggle('lc-current',i===step-1);
    row.querySelector('.lc-comment').setAttribute('aria-hidden',String(i>=step));
    row.querySelector('.lc-number').setAttribute('aria-current',i===step-1?'step':'false');
   });
   el.querySelector('[data-lc-action="back"]').disabled=step===0;
   el.querySelector('[data-lc-action="next"]').disabled=step===rows.length;
   el.querySelector('.lc-progress').textContent=step===0?'Reveal one comment at a time':`Line ${step} / ${rows.length}`;
  }
  el.addEventListener('click',event=>{
   const line=event.target.closest('[data-lc-line]');if(line){show(Number(line.dataset.lcLine));return;}
   const button=event.target.closest('[data-lc-action]');if(!button)return;
   const action=button.dataset.lcAction;show(action==='next'?step+1:action==='back'?step-1:action==='all'?rows.length:0);
  });
  el.addEventListener('keydown',event=>{
   event.stopPropagation();
   if(event.key==='ArrowRight'){event.preventDefault();show(step+1);}
   if(event.key==='ArrowLeft'){event.preventDefault();show(step-1);}
  });
  show(0);
 });
})();
