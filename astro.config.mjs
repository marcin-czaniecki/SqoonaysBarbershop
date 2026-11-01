import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';
import robots from './scripts/robots.mjs';

// Fontsource subsets, resolved from the installed packages without network access.
const latin = ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD'];
const latinExt = ['U+0100-02BA', 'U+02BD-02C5', 'U+02C7-02CC', 'U+02CE-02D7', 'U+02DD-02FF', 'U+0304', 'U+0308', 'U+0329', 'U+1D00-1DBF', 'U+1E00-1E9F', 'U+1EF2-1EFF', 'U+2020', 'U+20A0-20AB', 'U+20AD-20C0', 'U+2113', 'U+2C60-2C7F', 'U+A720-A7FF'];

const { SITE_URL, SITE_NOINDEX } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
// The owner confirmed this production domain. Missing build variables must not block indexing.
const origin = SITE_URL?.trim() || 'https://sqoonays.pl';
const noindex = SITE_NOINDEX?.trim() === 'true';
if (SITE_NOINDEX?.trim() && !['true', 'false'].includes(SITE_NOINDEX.trim())) {
  throw new Error('SITE_NOINDEX must be true or false.');
}
if (origin) {
  const parsed = new URL(origin);
  if (parsed.protocol !== 'https:' || parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password) {
    throw new Error('SITE_URL must be an HTTPS origin, without a path, credentials, query or hash.');
  }
}

export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      name: 'Barlow Condensed',
      cssVariable: '--font-barlow',
      provider: fontProviders.local(),
      options: { variants: [
        { src: ['@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2'], weight: 600, style: 'normal', unicodeRange: latin },
        { src: ['@fontsource/barlow-condensed/files/barlow-condensed-latin-ext-600-normal.woff2'], weight: 600, style: 'normal', unicodeRange: latinExt },
      ] },
    },
    {
      name: 'Manrope',
      cssVariable: '--font-manrope',
      provider: fontProviders.local(),
      options: { variants: [
        { src: ['@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'], weight: '200 800', style: 'normal', unicodeRange: latin },
        { src: ['@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2'], weight: '200 800', style: 'normal', unicodeRange: latinExt },
      ] },
    },
  ],
  ...(!noindex ? { site: origin } : {}),
  integrations: [robots(), ...(!noindex ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
