const puppeteer = require(process.env.APPDATA ? 'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core' : '/tmp/node_modules/puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, args:['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1920, height:1080 });
  await page.goto('http://127.0.0.1:8890/01_History_Part_1/index.html',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,1500));
  const n=await page.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length);
  console.log('n=',n);
  for(let i=0;i<n;i++){
    await page.evaluate((idx)=>{ window.Reveal.slide(idx); },i);
    await new Promise(r=>setTimeout(r,500));
    const info=await page.evaluate(()=>{
      const s=document.querySelector('.present');
      return { kicker:(s&&s.querySelector('.kicker'))?s.querySelector('.kicker').textContent.trim():'(no-kicker)',
               dataset:s?s.dataset.slide:'none' };
    });
    console.log('idx',i,'-> present dataset=',info.dataset,'| kicker:',JSON.stringify(info.kicker.slice(0,40)));
  }
  await browser.close();
})();
