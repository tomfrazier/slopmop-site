// Renders the 1200x630 share image for every content page from _build/og_manifest.json (written by content.py).
// Run from the repo root after content.py:  NODE_PATH=<dir with playwright> node _build/og.js [--all]
// Without --all it only renders images that don't exist yet. Needs Chromium; set CHROMIUM to its path if needed.
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const rows = JSON.parse(fs.readFileSync(path.join(__dirname, 'og_manifest.json'), 'utf8'));
const all = process.argv.includes('--all');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mark = fs.readFileSync(path.join(root, 'assets/img/mark.svg'), 'utf8');
const page = r => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px}
body{background:#16181A;color:#F1F3F5;font-family:Archivo,sans-serif;padding:72px 80px;display:flex;flex-direction:column;position:relative;overflow:hidden}
body:after{content:"";position:absolute;right:-120px;bottom:-160px;width:460px;height:460px;border-radius:50%;background:#F5B400;opacity:.16}
.eb{font:500 22px 'JetBrains Mono',monospace;letter-spacing:.06em;color:#F5B400;text-transform:lowercase}
h1{margin-top:28px;font-weight:700;letter-spacing:-.025em;line-height:1.02;font-size:${r.title.length > 48 ? 64 : r.title.length > 26 ? 80 : 104}px;max-width:1000px}
p{margin-top:28px;font-size:34px;line-height:1.3;color:#C9CED4;max-width:920px}
.ft{margin-top:auto;display:flex;align-items:center;gap:16px;font-weight:600;font-size:28px;position:relative;z-index:1}
.ft svg{width:44px;height:44px}.ft span{font:500 22px 'JetBrains Mono',monospace;color:#8A929B;margin-left:auto}
</style></head><body><div class="eb">${esc(r.eyebrow)}</div><h1>${esc(r.title)}</h1>${r.line ? `<p>${esc(r.line)}</p>` : ''}
<div class="ft">${mark}Slop Mop<span>${esc(r.url)}</span></div></body></html>`;
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
  let n = 0;
  for (const r of rows) {
    const out = path.join(root, r.out);
    if (!all && fs.existsSync(out)) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await pg.setContent(page(r), { waitUntil: 'networkidle' });
    await pg.screenshot({ path: out, type: 'png' });
    n++;
  }
  await b.close();
  console.log(`rendered ${n} image(s)`);
})();
