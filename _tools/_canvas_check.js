// Detects overlaps WITHIN canvas drawings. Instruments ctx, navigates each
// slide (which triggers that slide's draw), and snapshots per-canvas text boxes.
const puppeteer = require(process.env.APPDATA ? 'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core' : '/tmp/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, args:['--no-sandbox','--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1920, height:1080 });

  await page.evaluateOnNewDocument(() => {
    window.__ctxt={}; // id -> {text:[],rects:[], size:{w,h}}
    const proto=CanvasRenderingContext2D.prototype;
    function reg(cid){
      if(!window.__ctxt[cid]) window.__ctxt[cid]={text:[],rects:[]};
    }
    const FT=proto.fillText, ST=proto.strokeText;
    proto.fillText=function(t,x,y){ reg(this.canvas.id);
      let w=0; try{w=this.measureText(String(t)).width}catch(e){} 
      let fs=20; const m=/[\d.]+px/.exec(this.font||''); if(m)fs=parseFloat(m[0]);
      window.__ctxt[this.canvas.id].text.push({t:String(t).slice(0,26),x,y,w,h:fs*1.25});
      return FT.apply(this,[t,x,y]); };
    proto.strokeText=function(t,x,y){ reg(this.canvas.id);
      let w=0; try{w=this.measureText(String(t)).width}catch(e){} 
      let fs=20; const m=/[\d.]+px/.exec(this.font||''); if(m)fs=parseFloat(m[0]);
      window.__ctxt[this.canvas.id].text.push({t:String(t).slice(0,26),x,y,w,h:fs*1.25});
      return ST.apply(this,[t,x,y]); };
  });

  await page.goto('http://127.0.0.1:8890/01_History_Part_1/index.html',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1400));
  await page.waitForFunction(()=>window.Reveal&&Reveal.isReady(),{timeout:8000});

  const n=await page.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length);
  // snapshot per slide
  for(let i=0;i<n;i++){
    await page.evaluate((idx)=>{ window.__ctxt={}; Reveal.slide(idx); },i);
    await new Promise(r=>setTimeout(r,800));
    const snap=await page.evaluate(()=>{
      const out=[];
      for(const id in window.__ctxt){
        const el=document.getElementById(id); if(!el)continue;
        const b=el.getBoundingClientRect();
        const sx=b.width/(el.width||1), sy=b.height/(el.height||1);
        const txts=window.__ctxt[id].text.map(t=>{
          // baseline: textAlign may shift; treat as top-ish for detection
          return {t:t.t, x:b.x+t.x*sx,y:b.y+(t.y-t.h)*sy,w:t.w*sx,h:t.h*sy};
        });
        out.push({id, box:{w:b.width,h:b.height}, texts:txts});
      }
      // only keep the slide's own canvases
      const cur=[...document.querySelectorAll('.present canvas')].map(c=>c.id);
      return { curCanvases:cur, data:out };
    },i);

    // analyze this snapshot vs current-slide canvases
    snap.data.filter(d=>snap.curCanvases.includes(d.id)).forEach(r=>{
      const hits=[];
      for(let a=0;a<r.texts.length;a++)for(let b=a+1;b<r.texts.length;b++){
        if(r.texts[a].t===r.texts[b].t)continue;
        const A=r.texts[a],B=r.texts[b];
        const ix=Math.max(0,Math.min(A.x+A.w,B.x+B.w)-Math.max(A.x,B.x));
        const iy=Math.max(0,Math.min(A.y+A.h,B.y+B.h)-Math.max(A.y,B.y));
        const area=ix*iy;
        if(area<40)continue; // device-px-ish
        hits.push({A:`"${A.t}" @(${Math.round(A.x)},${Math.round(A.y)} ${Math.round(A.w)}x${Math.round(A.h)})`,
                    B:`"${B.t}" @(${Math.round(B.x)},${Math.round(B.y)} ${Math.round(B.w)}x${Math.round(B.h)})`});
      }
      console.log(`Slide ${i} canvas #${r.id} (${Math.round(r.box.w)}x${Math.round(r.box.h)}) — ${r.texts.length} texts`);
      if(hits.length===0)console.log('   ✓ clean');
      else hits.slice(0,10).forEach(h=>console.log(`   ✗ ${h.A}\n        ${h.B}`));
    });
  }
  await browser.close();
})();
