const puppeteer = require(process.env.APPDATA?'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core':'/tmp/node_modules/puppeteer-core');
(async()=>{
 const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox']});
 const p=await b.newPage(); await p.setViewport({width:1920,height:1080});
 await p.goto('http://127.0.0.1:8890/01_History_Part_1/index.html',{waitUntil:'networkidle2'});
 await new Promise(r=>setTimeout(r,1200));await p.waitForFunction(()=>window.Reveal&&Reveal.isReady(),{timeout:8000});
 // slide 1 (aiml)
 await p.evaluate(x=>Reveal.slide(1),1); await new Promise(r=>setTimeout(r,700));
 const info=await p.evaluate(()=>{
   const s=document.querySelector('.present');
   // find the strong Turing and em testable behavior
   function box(el){const b=el.getBoundingClientRect();return{x:b.x,y:b.y,w:b.width,h:b.height};}
   const strong=[...s.querySelectorAll('strong')].find(e=>e.textContent.trim()==='Turing');
   const em=[...s.querySelectorAll('em')].find(e=>e.textContent.includes('testable'));
   return {strong:strong?box(strong):null, em:em?box(em):null,
     liStrong:(strong&&strong.closest('li'))?(t=>({txt:t.textContent.slice(0,40),...box(t)}))(strong.closest('li')):null};
 });
 console.log(JSON.stringify(info,null,1));
 await b.close();
})();