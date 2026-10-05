const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
const {pathToFileURL}=require('url');
const puppeteer=require(path.join(process.env.LOCALAPPDATA,'Temp/node_modules/puppeteer-core'));
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.gif':'image/gif','.svg':'image/svg+xml'};
(async()=>{
  const server=http.createServer((req,res)=>{
    const f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,pipe:true,args:['--no-sandbox','--disable-gpu']});
  const results=[];
  try{
    const p=await browser.newPage();await p.setViewport({width:1920,height:1080});
    for(const mode of ['file','http']){
      for(const name of ['churchturing','backprop','alphago-transformers']){
        const pack=name==='churchturing'?'01_History_Part_1':'02_History_Part_2';
        await p.goto(mode==='file'?pathToFileURL(path.join(root,pack,'index.html')).href:`http://127.0.0.1:${server.address().port}/${pack}/index.html`,{waitUntil:'load'});
        await p.waitForFunction(()=>Reveal.isReady());
        await p.evaluate(()=>{Reveal.configure({transition:'none'});window.__opened=[];window.open=(url)=>{window.__opened.push(url);};});
        await p.evaluate(name=>{const slides=Reveal.getSlides(),s=slides.find(s=>s.dataset.slide===name);Reveal.slide(slides.indexOf(s));s.querySelectorAll('.fragment').forEach(f=>f.classList.add('visible'));},name);
        await new Promise(r=>setTimeout(r,250));
        const selector=`[data-slide="${name}"] .video-card`;
        await p.click(selector+' button');
        if(mode==='file'){
          const last=await p.evaluate(()=>window.__opened.at(-1));assert(last.startsWith('https://www.youtube.com/watch?v='));results.push({mode,slide:name,url:last,passed:true});
        } else {
          const frame=await p.waitForSelector(selector+' iframe');
          const src=await frame.evaluate(f=>f.src);assert(src.includes('youtube-nocookie.com/embed/'));
          await new Promise(r=>setTimeout(r,2200));
          const embedded=await frame.contentFrame();
          let playerStatus='';try{playerStatus=(await embedded.evaluate(()=>document.body.innerText)).slice(0,350);}catch(e){playerStatus=String(e);}
          await p.evaluate(()=>Reveal.slide(0));
          assert.equal(await p.$(selector+' iframe'),null);
          assert(await p.$(selector+' button'));
          results.push({mode,slide:name,url:src,playerStatus,stopOnLeave:true,passed:true});
        }
      }
    }
    fs.writeFileSync(path.resolve(__dirname,'../_review/after/media-verification.json'),JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
  } finally {await browser.close();server.close();}
})();
