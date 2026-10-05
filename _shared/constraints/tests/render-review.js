/* Render the deck offline; audit all slides and every simulation snapshot. */
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {pathToFileURL}=require('url');
const puppeteer=require(path.join(process.env.LOCALAPPDATA,'Temp/node_modules/puppeteer-core'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'_review');
fs.mkdirSync(out,{recursive:true});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function audit(){
  const slide=Reveal.getCurrentSlide(),boxes=[],issues=[];
  const stage=slide.getBoundingClientRect();
  const visible=el=>{for(let n=el;n&&n!==slide.parentElement;n=n.parentElement){const s=getComputedStyle(n);if(s.display==='none'||s.visibility==='hidden'||Number(s.opacity)===0)return false;}return true;};
  const add=(el,b,label)=>{if(b.width<1||b.height<1)return;boxes.push({el,b,label});if(b.left<-1||b.right>innerWidth+1||b.top<-1||b.bottom>innerHeight+1)issues.push({type:'viewport',label});if(b.bottom>stage.bottom-35*stage.height/1080)issues.push({type:'footer-zone',label});};
  for(const el of slide.querySelectorAll('*')){
    if(!visible(el))continue;
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
}
(async()=>{
 const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,pipe:true,args:['--no-sandbox','--disable-gpu']});
 try{
  const page=await browser.newPage();await page.setViewport({width:1920,height:1080});const errors=[],network=[];
  page.on('pageerror',e=>errors.push(String(e)));await page.setRequestInterception(true);page.on('request',r=>{if(/^https?:/.test(r.url())){network.push(r.url());r.abort();}else r.continue();});
  const url=pathToFileURL(path.join(root,'index.html')).href;
  await page.goto(url,{waitUntil:'load'});await page.waitForFunction(()=>Reveal.isReady());await page.evaluate(()=>Reveal.configure({transition:'none'}));
  const count=await page.evaluate(()=>Reveal.getTotalSlides()),slides=[];
  for(let i=0;i<count;i++){
   await page.evaluate(i=>{Reveal.slide(i);const w=CSPWidgets.instances.find(w=>Reveal.getCurrentSlide().contains(w.el));if(w&&!w.manual)w.seek(w.kind==='dfs'?14:w.kind==='gac'?4:w.kind==='split'?2:1);},i);await delay(40);
   const s=await page.evaluate(audit);slides.push(s);await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-${s.slide}.png`)});
  }
  const responsive=[];for(const [width,height]of [[1366,768],[1024,768]]){await page.setViewport({width,height});for(let i=0;i<count;i++){await page.evaluate(i=>{Reveal.slide(i);Reveal.layout();},i);await delay(10);const s=await page.evaluate(audit);if(s.issues.length)responsive.push({viewport:[width,height],...s});}}
  await page.setViewport({width:1920,height:1080});const stateIssues=[],variants=[];let stateCount=0;
  async function inspectStates(kind,variant){const n=await page.evaluate(kind=>CSPWidgets.instances.find(w=>w.kind===kind).states.length,kind);for(let i=0;i<n;i++){await page.evaluate(({kind,i})=>{const w=CSPWidgets.instances.find(w=>w.kind===kind);Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));w.seek(i);},{kind,i});const s=await page.evaluate(audit);if(s.issues.length)stateIssues.push({variant,step:i,...s});stateCount++;}variants.push({kind,variant,states:n});}
  for(const kind of ['dfs','gac','split','local'])await inspectStates(kind,'default');
  await page.select('[data-kind="dfs"] [data-setting="order"]','reverse');await inspectStates('dfs','reverse');
  for(const kind of ['gac','split'])for(const name of ['chain','contradiction']){await page.select(`[data-kind="${kind}"] [data-setting="example"]`,name);await inspectStates(kind,name);}
  for(const policy of ['best','sampling','walk','tabu','anneal'])for(const seed of ['1','7','23'])for(const start of ['plateau','red']){
   await page.select('[data-kind="local"] [data-setting="policy"]',policy);await page.select('[data-kind="local"] [data-setting="seed"]',seed);await page.select('[data-kind="local"] [data-setting="start"]',start);await inspectStates('local',[policy,seed,start].join('/'));
  }
  // All partial/total assignments and all annealing input combinations.
  for(const a of ['',0,1,2])for(const b of ['',0,1,2])for(const c of ['',0,1,2]){
   await page.evaluate(([a,b,c])=>{const w=CSPWidgets.instances.find(w=>w.kind==='assignment');Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));['X1','X2','X3'].forEach((v,i)=>w.setting(v).value=String([a,b,c][i]));w.render();},[a,b,c]);const s=await page.evaluate(audit);if(s.issues.length)stateIssues.push({values:[a,b,c],...s});stateCount++;
  }
  for(const delta of [-3,0,2,6])for(const T of ['4','1','0.5','0.1'])for(const u of ['0.1','0.5','0.9']){
   await page.evaluate(({delta,T,u})=>{const w=CSPWidgets.instances.find(w=>w.kind==='anneal');Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));w.setting('delta').value=delta;w.setting('T').value=T;w.setting('u').value=u;w.render();},{delta,T,u});const s=await page.evaluate(audit);if(s.issues.length)stateIssues.push({delta,T,u,...s});stateCount++;
  }
  // Fresh document before actual interaction checks.
  await page.goto('about:blank');await page.goto(url,{waitUntil:'load'});await page.waitForFunction(()=>Reveal.isReady());await page.evaluate(()=>Reveal.configure({transition:'none'}));
  const interactions=[];
  for(const kind of ['dfs','gac','split','local']){
   await page.evaluate(kind=>{const w=CSPWidgets.instances.find(w=>w.kind===kind);Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));w.reset();},kind);
   const prefix=`[data-kind="${kind}"] `;
   await page.click(prefix+'[data-action="next"]');assert.equal(await page.evaluate(k=>CSPWidgets.instances.find(w=>w.kind===k).index,kind),1);
   await page.click(prefix+'[data-action="prev"]');assert.equal(await page.evaluate(k=>CSPWidgets.instances.find(w=>w.kind===k).index,kind),0);
   await page.select(prefix+'[data-setting="speed"]','300');await page.click(prefix+'[data-action="play"]');await delay(350);
   assert(await page.evaluate(k=>CSPWidgets.instances.find(w=>w.kind===k).index>0,kind));
   if(await page.evaluate(k=>CSPWidgets.instances.find(w=>w.kind===k).isRunning,kind))await page.click(prefix+'[data-action="play"]');
   await page.click(prefix+'[data-action="reset"]');await page.click(prefix+'[data-action="play"]');await page.evaluate(()=>Reveal.slide(0));await delay(350);
   assert(await page.evaluate(k=>{const w=CSPWidgets.instances.find(w=>w.kind===k);return !w.isRunning&&w.index===0;},kind));interactions.push({kind,controls:true,pauseOnLeave:true});
  }
  await page.evaluate(()=>Reveal.slide(Reveal.getSlides().findIndex(s=>s.id==='dfs-lab')));
  await page.hover('[data-kind="dfs"] [data-tree-node="14"]');
  assert.equal(await page.$$eval('[data-kind="dfs"] .cp-rule.true',es=>es.length),3);
  await page.$eval('[data-kind="dfs"] [data-tree-node="21"]',el=>el.focus());
  assert.equal(await page.$$eval('[data-kind="dfs"] .cp-rule.false',es=>es.length),1);
  interactions.push({kind:'dfs',hoverAndKeyboardInspection:true});
  await page.evaluate(()=>Reveal.slide(Reveal.getSlides().findIndex(s=>s.id==='assignment-lab')));
  for(const [v,x]of [['X1','1'],['X2','2'],['X3','0']])await page.select(`[data-kind="assignment"] [data-setting="${v}"]`,x);
  assert.equal(await page.$$eval('[data-kind="assignment"] .cp-rule.true',es=>es.length),3);interactions.push({kind:'assignment',nativeControls:true});
  await page.evaluate(()=>Reveal.slide(Reveal.getSlides().findIndex(s=>s.id==='anneal-lab')));
  await page.select('[data-kind="anneal"] [data-setting="T"]','4');
  assert.match(await page.$eval('[data-kind="anneal"] .cp-decision',e=>e.textContent),/Accept/);
  await page.select('[data-kind="anneal"] [data-setting="T"]','0.1');
  assert.match(await page.$eval('[data-kind="anneal"] .cp-decision',e=>e.textContent),/Reject/);interactions.push({kind:'anneal',nativeControls:true});
  await page.evaluate(()=>{document.activeElement.blur();Reveal.slide(0);});for(let i=1;i<count;i++)await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>Reveal.getIndices().h),count-1);
  for(const id of ['dfs-lab','gac-lab','local-lab','references']){await page.goto('about:blank');await page.goto(url+'#/'+id,{waitUntil:'load'});await page.waitForFunction(id=>Reveal.isReady()&&Reveal.getCurrentSlide().id===id,{},id);}
  const report={count,errors,offlineRequests:network,slides,responsive,stateIssues,stateCount,variants,interactions,keyboardNavigation:true,directEntry:true};fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({count,errors,network,issues:slides.filter(s=>s.issues.length),responsive,stateIssues:stateIssues.slice(0,8),stateIssueCount:stateIssues.length,stateCount,interactions:interactions.length},null,2));
  const files=slides.map((s,i)=>`${String(i+1).padStart(2,'0')}-${s.slide}.png`);
  fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><title>AIML · Constraint Satisfaction · Gallery</title><style>body{margin:0;background:#0b0f17;color:#e8ecf4;font:18px system-ui}header{padding:24px}a{color:#45d6c0}img{display:block;width:100%;height:auto}figure{margin:0 0 30px}figcaption{padding:12px 24px}@media print{@page{size:1920px 1080px;margin:0}header,figcaption{display:none}figure{margin:0;break-after:page}img{height:1080px}}</style><header>Lesson 2 · Constraint Satisfaction · ${count} slides · static previews<br><a href="../index.html">Open interactive presentation</a></header>${files.map((f,i)=>`<figure><img src="${f}" alt="Slide ${i+1}: ${slides[i].slide}"><figcaption>${i+1} / ${count} · ${slides[i].slide}</figcaption></figure>`).join('')}</html>`);
  await page.goto(pathToFileURL(path.join(out,'index.html')).href,{waitUntil:'load'});await page.pdf({path:path.join(out,'AIML-Constraints-reviewed.pdf'),printBackground:true,preferCSSPageSize:true});
  assert.equal(errors.length+network.length+slides.filter(s=>s.issues.length).length+responsive.length+stateIssues.length,0,'Layout issues detected; inspect _review/audit.json');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
