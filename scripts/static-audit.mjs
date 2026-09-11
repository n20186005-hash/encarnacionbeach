import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const badVersion = Object.entries(allDeps).filter(([,v]) => /^(latest|\*)$|^[~^]/.test(v));
if (badVersion.length) throw new Error(`Floating versions: ${badVersion.map(([k])=>k).join(', ')}`);
if (!/^pnpm@\d+\.\d+\.\d+$/.test(pkg.packageManager)) throw new Error('packageManager must pin pnpm exactly');
if (!/^\d+\.\d+\.\d+$/.test(pkg.engines?.node || '')) throw new Error('Node engine must be exact');

const forbidden = ['example.com', 'localhost', 'chrome-extension://'];
const ignored = new Set(['node_modules', 'dist', '.git']);
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    if (ignored.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name === 'static-audit.mjs') continue;
    else if (/\.(astro|js|mjs|ts|css|html|json|toml|txt|svg)$/.test(entry.name)) {
      const text = fs.readFileSync(p, 'utf8');
      for (const term of forbidden) {
        if (text.includes(term)) throw new Error(`${term} found in ${path.relative(root,p)}`);
      }
    }
  }
}
walk(root);
console.log('static audit: OK');
