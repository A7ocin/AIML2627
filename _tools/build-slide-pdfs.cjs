// Rebuild the downloadable PDFs after changing slide content or shared assets.
// Usage: node AIML/_tools/build-slide-pdfs.cjs [lecture-folder ...]
// Requires puppeteer-core and Chrome; CHROME_PATH can override the executable.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch (error) {
  // Also support the tool installation used by the existing review scripts.
  if (!process.env.LOCALAPPDATA) throw error;
  puppeteer = require(path.join(process.env.LOCALAPPDATA, 'Temp/node_modules/puppeteer-core'));
}
const root = path.resolve(__dirname, '..');
const packs = [...new Set([...fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .matchAll(/href="([^"/]+)\/index\.html"/g)].map(match => match[1]))];
const requested = process.argv.slice(2);
for (const name of requested) assert(packs.includes(name), `Unknown lecture: ${name}`);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true, pipe: true, args: ['--no-sandbox', '--disable-gpu'],
  });
  try {
    for (const pack of requested.length ? requested : packs) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
      const url = pathToFileURL(path.join(root, pack, 'index.html'));
      url.search = '?print-pdf';
      await page.goto(url.href, { waitUntil: 'load', timeout: 60000 });
      await page.waitForFunction(() => document.documentElement.dataset.pdfReady === 'true', { timeout: 60000 });
      const counts = await page.evaluate(() => ({
        slides: Reveal.getTotalSlides(),
        pages: document.querySelectorAll('.pdf-page').length,
        hiddenFragments: [...document.querySelectorAll('.fragment:not(.fade-out)')]
          .filter(el => getComputedStyle(el).visibility === 'hidden' || getComputedStyle(el).opacity === '0').length,
      }));
      assert.equal(counts.pages, counts.slides, `${pack}: PDF layout must contain one page per slide`);
      assert.equal(counts.hiddenFragments, 0, `${pack}: PDF contains hidden fragments`);
      assert.deepEqual(errors, [], `${pack}: browser errors`);
      const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true, timeout: 60000 });
      const actualPages = (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
      assert.equal(actualPages, counts.slides, `${pack}: generated PDF page count`);
      const filename = `AIML-${pack}.pdf`;
      fs.writeFileSync(path.join(root, pack, filename), pdf);
      console.log(`${filename}: ${actualPages} pages, ${(pdf.length / 1024 / 1024).toFixed(1)} MB`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
