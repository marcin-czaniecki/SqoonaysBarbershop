import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import robots from './scripts/robots.mjs';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const origin = SITE_URL?.trim();
if (origin) {
  const parsed = new URL(origin);
  if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password) {
    throw new Error('SITE_URL must be an HTTPS origin, without a path, credentials, query or hash.');
  }
}

export default defineConfig({
  output: 'static',
  ...(origin ? { site: origin } : {}),
  integrations: [robots(), ...(origin ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
