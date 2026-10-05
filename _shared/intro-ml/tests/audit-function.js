module.exports=function audit(){
  const slide=Reveal.getCurrentSlide(),boxes=[],issues=[];
  const stage=slide.getBoundingClientRect();
  const visible=el=>{for(let n=el;n&&n!==slide.parentElement;n=n.parentElement){const s=getComputedStyle(n);if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)===0)return false;}return true;};
  const add=(el,b,label)=>{if(b.width<1||b.height<1)return;boxes.push({el,b,label});if(b.left<-1||b.right>innerWidth+1||b.top<-1||b.bottom>innerHeight+1)issues.push({type:'viewport',label});if(b.bottom>stage.bottom-35*stage.height/1080)issues.push({type:'footer-zone',label});};
  for(const el of slide.querySelectorAll('*')){
    if(!visible(el))continue;
    if(el.closest('.ml-plot'))continue;
    if(el.tagName==='svg'){
      add(el,el.getBoundingClientRect(),el.getAttribute('aria-label')||'SVG');
      const bounds=el.getBoundingClientRect(),labels=[...el.querySelectorAll('text')].map(t=>({b:t.getBoundingClientRect(),label:t.textContent}));
      for(const node of el.querySelectorAll('[data-tree-node]')){const b=node.getBoundingClientRect();if(b.left<bounds.left-1||b.right>bounds.right+1||b.top<bounds.top-1||b.bottom>bounds.bottom+1)issues.push({type:'svg-node-clipping',label:node.getAttribute('aria-label')});}
      for(const {b,label}of labels)if(b.left<bounds.left-1||b.right>bounds.right+1||b.top<bounds.top-1||b.bottom>bounds.bottom+1)issues.push({type:'svg-text-clipping',label});
      for(let a=0;a<labels.length;a++)for(let z=a+1;z<labels.length;z++){const A=labels[a],B=labels[z];if(Math.min(A.b.right,B.b.right)-Math.max(A.b.left,B.b.left)>2&&Math.min(A.b.bottom,B.b.bottom)-Math.max(A.b.top,B.b.top)>2)issues.push({type:'svg-label-overlap',a:A.label,b:B.label});}
    }
    if(el.closest('svg'))continue;
    if(el.tagName==='IMG'){add(el,el.getBoundingClientRect(),el.alt);if(!el.naturalWidth)issues.push({type:'missing-image',label:el.src});}
    if(el.tagName==='SELECT'){add(el,el.getBoundingClientRect(),'select');continue;}
    if(el.tagName==='OPTION')continue;
    for(const n of el.childNodes)if(n.nodeType===3&&n.textContent.trim()){const r=document.createRange();r.selectNode(n);for(const b of r.getClientRects())add(el,b,n.textContent.trim().slice(0,70));}
    if(el.clientWidth&&el.scrollWidth>el.clientWidth+3&&!['inline','contents'].includes(getComputedStyle(el).display))issues.push({type:'horizontal-overflow',label:el.className||el.tagName});
    if(el.clientHeight&&el.scrollHeight>el.clientHeight+3&&getComputedStyle(el).overflowY==='hidden')issues.push({type:'clipped-container',label:el.className||el.tagName});
  }
  for(let a=0;a<boxes.length;a++)for(let z=a+1;z<boxes.length;z++){const A=boxes[a],B=boxes[z];if(A.el===B.el||A.el.contains(B.el)||B.el.contains(A.el))continue;const w=Math.min(A.b.right,B.b.right)-Math.max(A.b.left,B.b.left),h=Math.min(A.b.bottom,B.b.bottom)-Math.max(A.b.top,B.b.top);if(w>3&&h>3&&w*h>55)issues.push({type:'overlap',a:A.label,b:B.label});}
  return {slide:slide.dataset.slide,issues};
};