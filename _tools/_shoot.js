const puppeteer = require(process.env.APPDATA ? 'C:/Users/Nicola/AppData/Local/Temp/node_modules/puppeteer-core' : '/tmp/node_modules/puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true, args:['--no-sandbox','--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1920, height:1080, deviceScaleFactor:1.5 });
  await page.goto('http://127.0.0.1:8890/01_History_Part_1/index.html', { waitUntil:'networkidle2' });
  await new Promise(r=>setTimeout(r,1500));
  await page.waitForFunction(()=>window.Reveal&&Reveal.isReady(),{timeout:8000});
  const n=await page.evaluate(()=>document.querySelectorAll('.reveal .slides > section').length);
  require('fs').mkdirSync('_shots',{recursive:true});
  for(let i=0;i<n;i++){
    await page.evaluate((idx)=>Reveal.slide(idx),i);
    await new Promise(r=>setTimeout(r,900));
    // reveal all fragments so we capture the full slide
    await page.keyboard.press('End');
    await new Promise(r=>setTimeout(r,500));
    // go back to start of that slide's fragments is tricky; just screenshot current (all frags shown)
    await page.screenshot({ path:`_shots/slide${String(i).padStart(2,'0')}.png` });
  }
  console.log('shot', n);
  await browser.close();
})();
