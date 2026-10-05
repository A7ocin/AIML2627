// Precise DOM overlap detector. Reveal.slide() navigation + programmatic fragment reveal.
const puppeteer = require(process.env.APPDATA ? 'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core' : '/tmp/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, args:['--no-sandbox','--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1920, height:1080 });

  const jsErrors=[];
  page.on('pageerror',e=>jsErrors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')jsErrors.push(m.text());});

  await page.goto('http://127.0.0.1:8890/01_History_Part_1/index.html',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1400));
  await page.waitForFunction(()=>window.Reveal&&Reveal.isReady(),{timeout:8000});

  const n=await page.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length);

  for(let i=0;i<n;i++){
    // navigate cleanly, resetting fragments by reloading approach is heavy; use Reveal.slide then reveal all via next()
    await page.evaluate((idx)=>Reveal.slide(idx),i);
    await new Promise(r=>setTimeout(r,700));
    // programmatically mark every fragment as visible on this slide
    await page.evaluate(()=>{
      const s=document.querySelector('.present');
      if(!s)return;
      s.querySelectorAll('.fragment').forEach(f=>{ f.classList.add('visible'); });
    });
    await new Promise(r=>setTimeout(r,300));

    const res=await page.evaluate((idx)=>{
      const slide=document.querySelector('.reveal .slides > section.present');
      if(!slide)return null;
      const rects=[];
      slide.querySelectorAll('*').forEach(el=>{
        const st=getComputedStyle(el);
        if(st.display==='none'||st.visibility==='hidden')return;
        if(+getComputedStyle(el).opacity===0)return; // hidden fragments (rule-chain .frag)
        const b=el.getBoundingClientRect();
        if(!isFinite(b.x)||!isFinite(b.y))return;
        if(b.width<3&&b.height<3)return;
        let label='<'+(el.tagName.toLowerCase());
        if(el.id)label+='#'+el.id;
        else if(typeof el.className==='string'&&el.className.trim())label+='.'+el.className.trim().split(/\s+/)[0];
        const t=(el.textContent||'').trim().replace(/\s+/g,' ');
        label+='>';
        rects.push({el,label,txt:t.slice(0,30),x:b.x,y:b.y,w:b.width,h:b.height});
      });
      // keep content-bearing elements
      const keep=rects.filter(r=>{
        if(['IMG','CANVAS','SVG','VIDEO'].includes(r.el.tagName))return true;
        return [...r.el.childNodes].some(nn=>nn.nodeType===3&&nn.textContent.trim());
      });
      // also add canvases' own drawn content is NOT in DOM, so skip canvas internals here.
      const hits=[];
      for(let a=0;a<keep.length;a++)for(let b=a+1;b<keep.length;b++){
        if(keep[a].el.contains(keep[b].el)||keep[b].el.contains(keep[a].el))continue;
        const A=keep[a],B=keep[b];
        const ix=Math.max(0,Math.min(A.x+A.w,B.x+B.w)-Math.max(A.x,B.x));
        const iy=Math.max(0,Math.min(A.y+A.h,B.y+B.h)-Math.max(A.y,B.y));
        const area=ix*iy; if(area<80)continue;
        const minA=Math.min(A.w*A.h,B.w*B.h);
        const ratio=minA>0?area/minA:1;
        if(ratio<0.18)continue;
        hits.push({ area,ratio,
          A:`${A.label} "${A.txt}" @(${Math.round(A.x)},${Math.round(A.y)} ${Math.round(A.w)}x${Math.round(A.h)})`,
          B:`${B.label} "${B.txt}" @(${Math.round(B.x)},${Math.round(B.y)} ${Math.round(B.w)}x${Math.round(B.h)})` });
      }
      hits.sort((p,q)=>q.area-p.area);
      const kicker=slide.querySelector('.kicker');
      return { idx, label:kicker?kicker.textContent.trim():'(none)', n:keep.length, hits };
    },i);

    if(!res){console.log(`Slide ${i}: no present`);continue;}
    console.log(`\n===== Slide ${i} "${res.label.replace(/\s+/g,' ')}" (${res.n} visible nodes) =====`);
    if(res.hits.length===0){console.log('  ✓ clean');}
    else{const seen=new Set();
      res.hits.forEach(h=>{const k=[h.A,h.B].sort().join('|');if(seen.has(k))return;seen.add(k);
        console.log(`  ✗ ${Math.round(h.area)}px² (${Math.round(h.ratio*100)}%)\n     A: ${h.A}\n     B: ${h.B}`);});}
  }

  console.log('\n=== JS ERRORS ===');[...new Set(jsErrors)].forEach(e=>console.log(' -',e));
  await browser.close();
})();
