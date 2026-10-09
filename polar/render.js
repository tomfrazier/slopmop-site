// Renders each slide to a 16:9 PNG next to its HTML: node polar/render.js [1-brand.html ...]
const {chromium}=require('playwright');
const files=process.argv.slice(2).length?process.argv.slice(2):['1-brand.html','2-preview.html','3-usage.html'];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1.5});
p.on('pageerror',e=>console.error('page error:',e.message));
for(const f of files){await p.goto('file://'+__dirname+'/'+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
await p.screenshot({path:__dirname+'/'+f.replace('.html','.png')});console.log(f)}
await b.close()})();
