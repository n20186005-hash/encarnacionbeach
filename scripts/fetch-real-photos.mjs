import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../public/images');
const photos = [
  ['playa-san-jose-encarnacion-main.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Playa_San_Jos%C3%A9%2C_Encarnaci%C3%B3n_Paraguay.jpg'],
  ['playa-san-jose-sunset.jpg', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Playa_San_Jos%C3%A9_-_Avenida_Costanera_%28Encarnaci%C3%B3n%2C_Paraguay%29.jpg'],
  ['playa-san-jose-summer.jpg', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Playa_San_Jos%C3%A9_165245.jpg'],
  ['playa-san-jose-river.jpg', 'https://upload.wikimedia.org/wikipedia/commons/1/16/Playa_San_Jos%C3%A9-WA0085.jpg']
];
await fs.mkdir(out, { recursive: true });
for (const [name, url] of photos) {
  const response = await fetch(url, { headers: { 'User-Agent': 'PlayaSanJoseEncarnacion/1.0' } });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const type = response.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error(`${name}: unexpected content-type ${type}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await fs.writeFile(path.join(out, name), bytes);
  console.log(`${name}: ${bytes.length} bytes`);
}
