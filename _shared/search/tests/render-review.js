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
  const page=await browser.newPage();await page.setViewport({width:1920,height:1080});
  const errors=[],network=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.setRequestInterception(true);page.on('request',req=>{if(/^https?:/.test(req.url())){network.push(req.url());req.abort();}else req.continue();});
  const url=pathToFileURL(path.join(root,'index.html')).href;
  await page.goto(url,{waitUntil:'load'});await page.waitForFunction(()=>Reveal.isReady());
  await page.evaluate(()=>Reveal.configure({transition:'none'}));
  const count=await page.evaluate(()=>Reveal.getTotalSlides());
  const results=[];
  for(let i=0;i<count;i++){
    await page.evaluate(i=>{Reveal.slide(i);const w=SearchWidgets.instances.find(w=>Reveal.getCurrentSlide().contains(w.el));if(w)w.seek(w.algorithm==='BNB'?7:w.algorithm==='IDS'?23:Math.min(6,w.states.length-2));},i);
    await delay(50);const r=await page.evaluate(audit);results.push(r);
    await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-${r.slide}.png`)});
  }
  const responsive=[];
  for(const [width,height] of [[1366,768],[1024,768]]){await page.setViewport({width,height});for(let i=0;i<count;i++){await page.evaluate(i=>{Reveal.slide(i);Reveal.layout();},i);await delay(10);const r=await page.evaluate(audit);if(r.issues.length)responsive.push({viewport:[width,height],...r});}}
  await page.setViewport({width:1920,height:1080});
  const states=[];
  const widgets=await page.evaluate(()=>SearchWidgets.instances.map(w=>({slide:w.el.closest('section').dataset.slide,count:w.states.length})));
  for(let w=0;w<widgets.length;w++)for(let i=0;i<widgets[w].count;i++){
    await page.evaluate(({w,i})=>{const widget=SearchWidgets.instances[w];Reveal.slide(Reveal.getSlides().indexOf(widget.el.closest('section')));widget.seek(i);},{w,i});
    const r=await page.evaluate(audit);if(r.issues.length)states.push({step:i,...r});
  }
  // Audit every state for each alternate setting; also exercise native controls.
  const variants=[];
  for(const [slide,setting,values] of [['bfs-lab','goal',['B','R','Z']],['dfs-lab','goal',['B','R','Z']],['ids-lab','goal',['B','R','Z']],['weighted-lab','algorithm',['BFS','GBFS','ASTAR']],['astar-lab','zero',['on']],['branch-bound-lab','bound',['12','6']]]){
    await page.evaluate(slide=>Reveal.slide(Reveal.getSlides().findIndex(s=>s.id===slide)),slide);
    for(const value of values){
      const selector=`[data-slide="${slide}"] [data-setting="${setting}"]`;
      if(setting==='zero')await page.click(selector);else await page.select(selector,value);
      const count=await page.evaluate(slide=>SearchWidgets.instances.find(w=>w.el.closest('section').id===slide).states.length,slide);
      for(let i=0;i<count;i++){
        await page.evaluate(({slide,i})=>SearchWidgets.instances.find(w=>w.el.closest('section').id===slide).seek(i),{slide,i});
        const r=await page.evaluate(audit);if(r.issues.length)states.push({setting,value,step:i,...r});
      }
      variants.push({slide,setting,value,states:count});
    }
  }
  // Restore defaults before testing playback and completion controls.
  await page.goto(url,{waitUntil:'load'});await page.reload({waitUntil:'load'});await page.waitForFunction(()=>Reveal.isReady());await page.evaluate(()=>Reveal.configure({transition:'none'}));
  // Exercise actual buttons, rewind, reset, playback, keyboard isolation and goal changes.
  const interactions=[];
  for(let n=0;n<widgets.length;n++){
    await page.evaluate(n=>{const w=SearchWidgets.instances[n];Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));w.reset();},n);
    const prefix=`[data-slide="${widgets[n].slide}"] `;
    await page.click(prefix+'[data-action="next"]');assert.equal(await page.evaluate(n=>SearchWidgets.instances[n].index,n),1);
    await page.click(prefix+'[data-action="prev"]');assert.equal(await page.evaluate(n=>SearchWidgets.instances[n].index,n),0);
    await page.select(prefix+'[data-setting="speed"]','320');
    await page.click(prefix+'[data-action="play"]');await delay(380);await page.click(prefix+'[data-action="play"]');
    assert(await page.evaluate(n=>SearchWidgets.instances[n].index>0&&!SearchWidgets.instances[n].isRunning,n));
    await page.click(prefix+'[data-action="reset"]');assert.equal(await page.evaluate(n=>SearchWidgets.instances[n].index,n),0);
    await page.click(prefix+'[data-action="play"]');await page.evaluate(()=>Reveal.slide(0));await delay(380);
    assert(await page.evaluate(n=>!SearchWidgets.instances[n].isRunning&&SearchWidgets.instances[n].index===0,n));
    interactions.push({slide:widgets[n].slide,buttons:true,pauseOnLeave:true});
  }
  await page.evaluate(()=>{const w=SearchWidgets.instances[0];Reveal.slide(Reveal.getSlides().indexOf(w.el.closest('section')));});
  await page.select('[data-slide="bfs-lab"] [data-setting="goal"]','B');
  await page.click('[data-slide="bfs-lab"] [data-action="next"]');await page.keyboard.press('ArrowRight');
  assert(await page.evaluate(()=>Reveal.getCurrentSlide().id==='bfs-lab'&&SearchWidgets.instances[0].states[SearchWidgets.instances[0].index].done));
  await page.evaluate(()=>{document.activeElement.blur();Reveal.slide(0);});
  for(let i=1;i<count;i++)await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(()=>Reveal.getIndices().h),count-1);
  const hash=[];
  for(const id of ['bfs-lab','ids-lab','astar-lab','branch-bound-lab','references']){await page.goto('about:blank');await page.goto(url+'#/'+id,{waitUntil:'load'});await page.waitForFunction(id=>Reveal.isReady()&&Reveal.getCurrentSlide().id===id,{timeout:5000},id);hash.push(id);}
  const report={count,offlineRequests:network,errors,slides:results,responsive,stateIssues:states,stateCount:widgets.reduce((a,w)=>a+w.count,0)+variants.reduce((a,v)=>a+v.states,0),variants,interactions,keyboardNavigation:true,directHashEntry:hash};
  fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({count,errors,network,issues:results.filter(r=>r.issues.length),responsive,stateIssues:states.slice(0,12),stateIssueCount:states.length,stateCount:report.stateCount,interactions:interactions.length},null,2));
  const files=results.map((r,i)=>`${String(i+1).padStart(2,'0')}-${r.slide}.png`);
  fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><title>AIML · Search · Rendered slides</title><style>body{margin:0;background:#0b0f17;color:#e8ecf4;font:18px system-ui}header{padding:24px}a{color:#45d6c0}img{display:block;width:100%;height:auto}figure{margin:0 0 30px}figcaption{padding:12px 24px}@media print{@page{size:1920px 1080px;margin:0}header,figcaption{display:none}figure{margin:0;break-after:page}img{height:1080px}}</style><header>Lesson 1 · Search Algorithms · ${count} slides · static previews<br><a href="../index.html">Open the interactive deck</a></header>${files.map((f,i)=>`<figure><img src="${f}" alt="Slide ${i+1}: ${results[i].slide}"><figcaption>${i+1} / ${count} · ${results[i].slide}</figcaption></figure>`).join('')}</html>`);
  await page.goto(pathToFileURL(path.join(out,'index.html')).href,{waitUntil:'load'});
  await page.pdf({path:path.join(out,'AIML-Search-reviewed.pdf'),printBackground:true,preferCSSPageSize:true});
  assert.equal(errors.length+network.length+results.filter(r=>r.issues.length).length+responsive.length+states.length,0,'Review found layout or runtime issues; inspect _review/audit.json');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
