import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ÚNICO lugar para configurar el dominio público.
// Ejemplo al tener dominio: const SITE = 'https://tudominio.com';
const SITE = '';

export default defineConfig({
  site: SITE || undefined,
  output: 'server',
  adapter: cloudflare(),
  integrations: SITE ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
