import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { business } from '../src/data/business.ts';
import { social } from '../src/data/social.ts';

// Use the existing image processor and Fontsource files; no remote assets at build time.
const requireFromAstro = createRequire(import.meta.resolve('astro/package.json'));
const sharp = requireFromAstro('sharp');
const requireFromFontace = createRequire(requireFromAstro.resolve('fontace'));
const { create: createFont } = requireFromFontace('fontkitten');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontPaths = {
  display: resolve(root, 'node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff'),
  body: resolve(root, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'),
  bodyExtended: resolve(root, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2'),
};
const width = 1200;
const height = 630;
const displayFont = createFont(await readFile(fontPaths.display));
const bodyFonts = [
  createFont(await readFile(fontPaths.body)),
  createFont(await readFile(fontPaths.bodyExtended)),
];

async function textLayer(text, { x, y, size, color = '#f1eee8', display = false, maxWidth = 520 }) {
  const fonts = display ? [displayFont] : bodyFonts;
  const glyphs = Array.from(text, (character) => {
    const codePoint = character.codePointAt(0);
    const font = fonts.find((candidate) => candidate.hasGlyphForCodePoint(codePoint));
    if (!font) throw new Error(`Missing social-card glyph: ${character}`);
    return { glyph: font.glyphForCodePoint(codePoint), scale: size / font.unitsPerEm };
  });
  const textWidth = glyphs.reduce((total, { glyph, scale }) => total + glyph.advanceWidth * scale, 0);
  const fit = Math.min(1, maxWidth / textWidth);
  if (size * fit < 14) throw new Error(`Social card text is too long: ${text}`);
  const ascent = Math.max(...glyphs.map(({ glyph, scale }) => Number.isFinite(glyph.bbox.maxY) ? glyph.bbox.maxY * scale * fit : 0));
  let offset = 0;
  const paths = glyphs.map(({ glyph, scale }) => {
    const path = glyph.path.toSVG();
    const emphasis = display ? '' : ` stroke="${color}" stroke-width="0.3" stroke-linejoin="round" vector-effect="non-scaling-stroke"`;
    const element = path ? `<path d="${path}" transform="translate(${x + offset},${y + ascent}) scale(${scale * fit},${-scale * fit})"${emphasis}/>` : '';
    offset += glyph.advanceWidth * scale * fit;
    return element;
  });
  return `<g fill="${color}">${paths.join('')}</g>`;
}

async function iconLayer(name, { x, y, size = 24, color = '#c9ac7d' }) {
  const svg = await readFile(resolve(root, `src/assets/icons/material-symbols/${name}.svg`), 'utf8');
  const body = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1];
  if (!body) throw new Error(`Invalid local icon: ${name}`);
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 -960 960 960" fill="${color}">${body}</svg>`;
}

// The source is the user-supplied salon photo. Crop the ceiling, then frame the chairs.
const resizedInterior = await sharp(resolve(root, 'src/assets/salon/interior.jpg'))
  .autoOrient()
  .resize(1200, 900, { fit: 'cover' })
  .toBuffer();
const photo = await sharp(resizedInterior)
  .extract({ left: 0, top: 210, width: 1200, height: 690 })
  .resize(554, height, { fit: 'cover', position: sharp.gravity.southeast })
  .jpeg({ quality: 88 })
  .toBuffer();
const brand = business.name.replace(/\s+Barbershop$/i, '').replace("'", '’').toUpperCase();
const layers = [
  await iconLayer('location_on', { x: 64, y: 62, size: 23 }),
  await textLayer(`${business.address.city.toUpperCase()} / ${business.address.street.toUpperCase()}`, { x: 97, y: 64, size: 17, color: '#c9ac7d' }),
  await textLayer(brand, { x: 60, y: 132, size: 148, display: true }),
  await textLayer('BARBERSHOP', { x: 64, y: 260, size: 52, display: true, color: '#c9ac7d' }),
  await textLayer(social.headline, { x: 64, y: 352, size: 24 }),
  await textLayer(social.tagline, { x: 64, y: 392, size: 19, color: '#c5c1b8' }),
  await textLayer(social.bookingLabel, { x: 84, y: 459, size: 18, color: '#191a18', maxWidth: 330 }),
  await iconLayer('north_east', { x: 422, y: 456, size: 24, color: '#191a18' }),
  await textLayer(social.domainLabel, { x: 64, y: 553, size: 20, color: '#c9ac7d' }),
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="shade"><stop stop-color="#191a18" stop-opacity=".28"/><stop offset="1" stop-color="#191a18" stop-opacity=".02"/></linearGradient></defs>
  <rect width="1200" height="630" fill="#191a18"/>
  <image x="646" width="554" height="630" href="data:image/jpeg;base64,${photo.toString('base64')}"/>
  <rect x="646" width="554" height="630" fill="url(#shade)"/>
  <path d="M646 0V630" stroke="#b99a69" stroke-opacity=".6"/>
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#b99a69" stroke-opacity=".65"/>
  <path d="M64 326H582" stroke="#b99a69" stroke-opacity=".45"/>
  <rect x="64" y="440" width="400" height="56" fill="#c9ac7d"/>
  ${layers.join('\n')}
</svg>`;
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true, colours: 256, dither: 0.5 }).toBuffer();
const hash = createHash('sha256').update(png).digest('hex').slice(0, 12);
const imagePath = `/social/sqoonays-${hash}.png`;
await mkdir(resolve(root, 'public/social'), { recursive: true });
await writeFile(resolve(root, `public${imagePath}`), png);
// Preserve legacy URLs; metadata uses the new content-versioned file.
await writeFile(resolve(root, 'public/og.png'), png);
await writeFile(resolve(root, 'public/og.svg'), svg);
await writeFile(resolve(root, 'src/data/social-image.json'), `${JSON.stringify({ path: imagePath, width, height, type: 'image/png' }, null, 2)}\n`);
console.log(`Generated ${imagePath} (${width} × ${height}, ${Math.round(png.length / 1024)} KB).`);
