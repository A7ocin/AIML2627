// Render every slide at its final fragment state and audit visible content.
// Usage: node AIML/_tools/render-review.js [before|after]
const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');
const puppeteer = require(path.join(process.env.LOCALAPPDATA, 'Temp/node_modules/puppeteer-core'));
const root = path.resolve(__dirname, '..');
const phase = process.argv[2] || 'after';
const out = path.join(root, '_review', phase);
fs.mkdirSync(out, {recursive:true});
(async () => {
  const browser = await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, pipe:true, args:['--no-sandbox','--disable-gpu']});
  try {
    const page = await browser.newPage();
    await page.setViewport({width:1920,height:1080,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror', e=>errors.push(String(e)));
    await page.goto(pathToFileURL(path.join(root,'01_History_Part_1/index.html')).href,{waitUntil:'networkidle0'});
    await page.waitForFunction(()=>window.Reveal && Reveal.isReady());
    await page.evaluate(()=>{Reveal.configure({transition:'none'}); Reveal.sync();});
    const count=await page.evaluate(()=>Reveal.getTotalSlides());
    const results=[];
    for(let i=0;i<count;i++) {
      await page.evaluate(i=>{Reveal.slide(i,0,-1); Reveal.getCurrentSlide().querySelectorAll('.fragment').forEach(f=>f.classList.add('visible'));},i);
      await new Promise(r=>setTimeout(r,700));
      await page.evaluate(()=>document.querySelectorAll('.present .frag').forEach(f=>f.classList.add('vis')));
      const result=await page.evaluate(()=>{
        const slide=Reveal.getCurrentSlide(), boxes=[], issues=[];
        const visible=el=>{for(let n=el;n&&n!==slide.parentElement;n=n.parentElement){const s=getComputedStyle(n);if(s.display==='none'||s.visibility==='hidden'||+s.opacity===0)return false;}return true;};
        const add=(el,r,label)=>{if(r.width<1||r.height<1)return;boxes.push({el,x:r.x,y:r.y,right:r.right,bottom:r.bottom,label});if(r.x < -1||r.y < -1||r.right>innerWidth+1||r.bottom>innerHeight+1)issues.push({type:'viewport',label});};
        for(const el of slide.querySelectorAll('*')) {
          if(!visible(el))continue;
          if(['IMG','CANVAS','svg'].includes(el.tagName)){add(el,el.getBoundingClientRect(),el.id||el.getAttribute('alt')||el.tagName);if(el.tagName==='IMG'&&!el.naturalWidth)issues.push({type:'missing-image',label:el.src});}
          if(el.closest('svg'))continue;
          for(const node of el.childNodes)if(node.nodeType===3&&node.textContent.trim()) {const range=document.createRange();range.selectNode(node);for(const r of range.getClientRects())add(el,r,node.textContent.trim().slice(0,70));}
          if(el.clientHeight>0&&getComputedStyle(el).overflowY==='hidden'&&el.scrollHeight>el.clientHeight+2)issues.push({type:'clipped-container',label:el.id||el.className});
        }
        for(let a=0;a<boxes.length;a++)for(let b=a+1;b<boxes.length;b++){
          const A=boxes[a],B=boxes[b];if(A.el===B.el||A.el.contains(B.el)||B.el.contains(A.el))continue;
          // A video play control intentionally overlays its poster.
          if(A.el.closest('.video-card') && A.el.closest('.video-card')===B.el.closest('.video-card'))continue;
          const w=Math.min(A.right,B.right)-Math.max(A.x,B.x),h=Math.min(A.bottom,B.bottom)-Math.max(A.y,B.y);
          if(w>3&&h>3&&w*h>60)issues.push({type:'overlap',a:A.label,b:B.label});
        }
        return {slide:slide.dataset.slide,issues};
      });
      result.number=i+1;
      await page.screenshot({path:path.join(out,`${String(i+1).padStart(2,'0')}-${result.slide}.png`)});
      results.push(result);
    }
    fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({count,errors,results},null,2));
    console.log(JSON.stringify({count,errors,issues:results.filter(r=>r.issues.length)},null,2));
    if(phase==='after') {
      const responsive=[];
      for(const [width,height] of [[1366,768],[1024,768]]) {
        await page.setViewport({width,height});
        for(let i=0;i<count;i++) {
          await page.evaluate(i=>{Reveal.slide(i,0,-1);Reveal.getCurrentSlide().querySelectorAll('.fragment').forEach(f=>f.classList.add('visible'));Reveal.layout();},i);
          await new Promise(r=>setTimeout(r,50));
          responsive.push(await page.evaluate(()=>{
            const slide=Reveal.getCurrentSlide(),issues=[];
            for(const el of slide.querySelectorAll('h2,h3,h4,p,li,img,svg,.kicker,.tl-card,.tl-label')) {
              const b=el.getBoundingClientRect();
              if(b.left<0||b.top<0||b.right>innerWidth+1||b.bottom>innerHeight+1)issues.push(el.id||el.textContent.trim().slice(0,55));
            }
            // SVG labels are audited in viewBox coordinates as well as visually.
            for(const s of slide.querySelectorAll('svg')) {
              const v=s.viewBox.baseVal,labels=[...s.querySelectorAll('text')];
              for(const t of labels){const b=t.getBBox();if(b.x<0||b.y<0||b.x+b.width>v.width||b.y+b.height>v.height)issues.push('SVG label clipped: '+t.textContent);}
              for(let a=0;a<labels.length;a++)for(let b=a+1;b<labels.length;b++){
                const A=labels[a].getBBox(),B=labels[b].getBBox();
                if(Math.min(A.x+A.width,B.x+B.width)-Math.max(A.x,B.x)>2&&Math.min(A.y+A.height,B.y+B.height)-Math.max(A.y,B.y)>2)issues.push('SVG label overlap: '+labels[a].textContent+' / '+labels[b].textContent);
              }
            }
            return {viewport:[innerWidth,innerHeight],slide:slide.dataset.slide,issues};
          }));
        }
      }
      await page.setViewport({width:1920,height:1080});
      const deckURL=pathToFileURL(path.join(root,'01_History_Part_1/index.html')).href;
      const navigation=[];
      // Direct entry to every slide must initialize all generated diagrams.
      for(let i=0;i<count;i++) {
        await page.goto(deckURL+'#/'+i,{waitUntil:'load'});
        await page.waitForFunction(()=>Reveal.isReady());
        navigation.push(await page.evaluate(i=>({requested:i,actual:Reveal.getIndices().h,diagrams:Reveal.getCurrentSlide().querySelectorAll('svg').length}),i));
      }
      await page.goto(deckURL,{waitUntil:'load'});
      await page.evaluate(()=>{Reveal.slide(0,0,-1);Reveal.configure({transition:'none'});});
      let steps=0;
      const maxSteps=await page.evaluate(()=>Reveal.getTotalSlides()+document.querySelectorAll('.fragment').length+20);
      while(!(await page.evaluate(()=>Reveal.isLastSlide()))&&steps<maxSteps){await page.keyboard.press('ArrowRight');steps++;}
      const keyboard=await page.evaluate(()=>({slide:Reveal.getIndices().h,visibleTitle:getComputedStyle(document.querySelector('#part-cover h1')).visibility}));
      const verification={responsive,navigation,keyboard:{...keyboard,steps},errors};
      fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(verification,null,2));
      console.log(JSON.stringify({responsiveIssues:responsive.filter(r=>r.issues.length),navigationIssues:navigation.filter(r=>r.requested!==r.actual),keyboard,steps,errors},null,2));
      const images=results.map(r=>`${String(r.number).padStart(2,'0')}-${r.slide}.png`);
      fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html><meta charset="utf-8"><title>AIML — rendered slides</title><style>body{margin:0;background:#0b0f17;color:#e8ecf4;font:18px system-ui}header{padding:24px}img{display:block;width:100%;height:auto}figure{margin:0 0 30px}figcaption{padding:12px 24px}@media print{@page{size:1920px 1080px;margin:0}header,figcaption{display:none}figure{margin:0;break-after:page}img{height:1080px}}</style><header>Lesson 0 · A Short History of AI · ${count} slides</header>${images.map((f,i)=>`<figure><img src="${f}"><figcaption>${i+1} / ${count}</figcaption></figure>`).join('')}</html>`);
      await page.goto(pathToFileURL(path.join(out,'index.html')).href,{waitUntil:'networkidle0'});
      await page.pdf({path:path.join(out,'AIML-History-reviewed.pdf'),printBackground:true,preferCSSPageSize:true});
    }
  } finally {await browser.close();}
})();
