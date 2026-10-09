const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1.5});
for(const f of process.argv.slice(2)){await p.goto('file://'+__dirname+'/'+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
await p.screenshot({path:__dirname+'/'+f.replace('.html','.png')});console.log(f)}
await b.close()})();
