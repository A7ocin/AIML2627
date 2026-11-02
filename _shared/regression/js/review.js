(function(){
 'use strict';
 // Normalize accents in inserted question text, such as y + combining hat.
 document.querySelectorAll('.wc-stem,.wc-choice-text').forEach(el=>{el.textContent=el.textContent.normalize('NFC');});
 document.querySelectorAll('.rg-derivation').forEach(el=>{
  const steps=[...el.querySelectorAll('.rg-step')],back=el.querySelector('[data-step="back"]'),next=el.querySelector('[data-step="next"]');
  let index=0;
  const render=()=>{steps.forEach((s,i)=>{s.classList.toggle('active',i===index);if(el.dataset.layout==='progressive-row'){s.classList.toggle('past',i<index);s.classList.toggle('future',i>index);s.setAttribute('aria-hidden',String(i>index));}});back.disabled=index===0;next.disabled=index===steps.length-1;el.querySelector('[data-step-count]').textContent=`Step ${index+1} / ${steps.length}`;const description=el.querySelector('.rg-step-description');if(description)description.innerHTML=steps[index].querySelector('p').innerHTML;};
  back.addEventListener('click',()=>{index=Math.max(0,index-1);render();});
  next.addEventListener('click',()=>{index=Math.min(steps.length-1,index+1);render();});
  render();
 });
})();
