// Renders slides to 16:9 PNGs next to their HTML. Serves this folder over local HTTP so
// the in-browser Babel loader can fetch the .jsx files (file:// XHR is blocked).
//   node polar/render.js                      the XL set
//   node polar/render.js lifetime/1-brand.html ...
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const files=process.argv.slice(2).length?process.argv.slice(2):['1-brand.html','2-preview.html','3-usage.html'];
const types={'.html':'text/html','.js':'text/javascript','.jsx':'text/babel','.css':'text/css'};
const server=http.createServer((req,res)=>{const f=path.join(__dirname,decodeURIComponent(req.url.split('?')[0]));
  if(!f.startsWith(__dirname)||!fs.existsSync(f)){res.writeHead(404);return res.end()}
  res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res)});
server.listen(0,'127.0.0.1',async()=>{const base=`http://127.0.0.1:${server.address().port}/`;
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1.5});
  p.on('pageerror',e=>console.error('page error:',e.message));
  for(const f of files){await p.goto(base+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
    await p.screenshot({path:path.join(__dirname,f.replace('.html','.png'))});console.log(f)}
  await b.close();server.close()});
