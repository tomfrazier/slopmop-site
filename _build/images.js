// Renders every page's images from _build/images_manifest.json (written by content.py) using _build/render.html:
// the share image (1200x630), the header image (960x720) and the "Slop Mop at work" figure (1200x720).
// Run from the repo root after content.py, with the site served on :8765 (python3 -m http.server 8765):
//   NODE_PATH=<dir with playwright> node _build/images.js [--all]
// Only images whose spec changed since the last run are re-rendered (hashes in _build/images_done.json).
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'images_manifest.json'), 'utf8'));
const donePath = path.join(__dirname, 'images_done.json');
const done = fs.existsSync(donePath) && !process.argv.includes('--all') ? JSON.parse(fs.readFileSync(donePath, 'utf8')) : {};
const SIZE = { og: [1200, 630], hero: [960, 720], fig: [1200, 720] };
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const pg = await b.newPage({ viewport: { width: 1200, height: 720 }, deviceScaleFactor: 1 });
  await pg.goto('http://localhost:8765/_build/render.html', { waitUntil: 'networkidle' });
  let n = 0;
  for (const r of rows) {
    const hash = crypto.createHash('md5').update(JSON.stringify(r.spec)).digest('hex');
    const out = path.join(root, r.out);
    if (done[r.out] === hash && fs.existsSync(out)) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.evaluate(s => window.render(s), r.spec);
    const [w, h] = SIZE[r.spec.mode];
    await pg.screenshot({ path: out, type: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: w, height: h } });
    done[r.out] = hash; n++;
    if (n % 50 === 0) { fs.writeFileSync(donePath, JSON.stringify(done)); console.log(n); }
  }
  fs.writeFileSync(donePath, JSON.stringify(done));
  await b.close();
  console.log(`rendered ${n} image(s)`);
})();
