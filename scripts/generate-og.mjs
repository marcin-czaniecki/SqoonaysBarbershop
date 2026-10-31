import { createRequire } from 'node:module';

// Reuse Astro's installed image processor; SVG is the editable, local source.
const requireFromAstro = createRequire(import.meta.resolve('astro/package.json'));
const sharp = requireFromAstro('sharp');
await sharp('public/og.svg').png().toFile('public/og.png');
console.log('Generated public/og.png (1200 × 630).');
