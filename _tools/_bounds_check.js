// Checks for: (1) elements overflowing the slide viewport, (2) genuine DOM
// overlaps. Uses Reveal.slide + fragment reveal.
const puppeteer = require(process.env.APPDATA?'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core':'/tmp/node_modules/puppeteer-core');
(async()=>{
 const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--disable-gpu']});
 const p=await b.newPage(); await p.setViewport({width:1920,height:1080});
 await p.goto('http://127.0.0.1:8890/01_History_Part_1/index.html',{waitUntil:'networkidle2'});
 await new Promise(r=>setTimeout(r,1300));await p.waitForFunction(()=>window.Reveal&&Reveal.isReady(),{timeout:8000});
 const n=await p.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length);
 for(let i=0;i<n;i++){
   await p.evaluate(x=>Reveal.slide(x),i); await new Promise(r=>setTimeout(r,650));
   await p.evaluate(()=>{const s=document.querySelector('.present');if(s)s.querySelectorAll('.fragment').forEach(f=>f.classList.add('visible'));});
   await new Promise(r=>setTimeout(r,250));
   const res=await p.evaluate(()=>{
     const slide=document.querySelector('.present');
     const VW=1920,VH=1080; // reveal scales to this
     const issues=[];
     slide.querySelectorAll('*').forEach(el=>{
       if(getComputedStyle(el).display==='none')return;
       const b=el.getBoundingClientRect();
       if(!isFinite(b.x))return;
       if(b.width<4&&b.height<4)return;
       // off-screen right/bottom
       if(b.right>VW+2 || b.bottom>VH+6){
         let label='<'+(el.tagName.toLowerCase())+(typeof el.className==='string'?' .'+String(el.className).split(' ')[0]:'');
         const t=(el.textContent||'').trim().replace(/\s+/g,' ');
         issues.push({kind:'overflow',label,txt:t.slice(0,34),right:Math.round(b.right),bottom:Math.round(b.bottom)});
       }
     });
     return {kicker:(slide.querySelector('.kicker')?.textContent||'').trim(), overflow:issues.slice(0,6)};
   },i);
   if(res.overflow.length){console.log(`Slide ${i} "${res.kicker.replace(/\s+/g,' ')}":`);res.overflow.forEach(o=>console.log(`  OVERFLOW ${o.label} "${o.txt}" right=${o.right} bottom=${o.bottom}`));}
 }
 await b.close();
})();