import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const html = await readFile('dist/index.html', 'utf8');
const robots = await readFile('dist/robots.txt', 'utf8');
const booking = 'https://booksy.com/pl-pl/363234_sqoonay-s-barbershop_barber-shop_21029_gdynia';

assert.match(html, /<html\s+lang="pl"/);
assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, 'Exactly one H1');
assert.match(html, /<title>Sqoonay/);
assert.match(html, /name="description"/);
assert.match(html, /property="og:image"/);
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(anchor), `Missing anchor: ${anchor}`);
for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith('https://booksy.com/')) assert.equal(href, booking, 'Exact booking URL');
}
assert.ok(html.includes(booking));
assert.ok(html.includes('https://www.instagram.com/sqoonaybarbershop/'));
assert.ok(html.includes('https://www.google.com/maps/dir/?api=1'));
assert.equal(/<script[^>]+src="https?:/i.test(html), false, 'No third-party scripts');

// Guard the loading regressions identified by the PageSpeed audit.
assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"/, 'Small page CSS is inlined without a render-blocking request');
assert.match(html, /size-adjust:/, 'Web fonts include metric-adjusted local fallbacks');
assert.match(html, /ascent-override:/, 'Font fallbacks reserve matching vertical metrics');
const fontPreloads = [...html.matchAll(/<link[^>]+href="([^\"]+)"[^>]+as="font"/g)];
assert.equal(fontPreloads.length, 4, 'Both local font families preload Latin and Polish subsets');
for (const [, path] of fontPreloads) await access(`dist${path}`);
const activeHtml = html.replace(/<(template|noscript)\b[^>]*>[\s\S]*?<\/\1>/g, '');
assert.doesNotMatch(activeHtml, /<iframe\b/i, 'Google Maps must wait until its section approaches the viewport');
assert.match(html, /<template><iframe[^>]+title="Mapa Google/);
assert.match(html, /<noscript><iframe[^>]+title="Mapa Google/);
const pictures = [...html.matchAll(/<picture[^>]*>([\s\S]*?)<\/picture>/g)];
assert.equal(pictures.length, 6, 'Hero, portraits and gallery retain their photos');
for (const [, picture] of pictures) {
  assert.match(picture, /type="image\/avif"/);
  assert.match(picture, /<img[^>]+width="\d+"[^>]+height="\d+"/);
  for (const [, srcset] of picture.matchAll(/srcset="([^\"]+)"/g)) {
    for (const candidate of srcset.split(',')) await access(`dist${candidate.trim().split(/\s+/)[0]}`);
  }
}
const inlineScripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter(([, attributes]) => !attributes.includes('application/ld+json'));
assert.ok(inlineScripts.reduce((bytes, [, , code]) => bytes + Buffer.byteLength(code), 0) < 2048, 'Inline page JavaScript stays below 2 KiB');

const jsonText = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(jsonText, 'Local business structured data exists');
const schema = JSON.parse(jsonText);
assert.equal(schema['@type'], 'HairSalon');
assert.equal(schema.address.streetAddress, 'Mylna 1');
assert.equal(schema.address.addressLocality, 'Gdynia');
for (const field of ['telephone', 'openingHours', 'aggregateRating', 'review']) assert.equal(field in schema, false, `Unconfirmed field: ${field}`);

const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
if (canonical) {
  const origin = new URL(canonical);
  assert.equal(origin.protocol, 'https:');
  assert.equal(schema.url, origin.href);
  assert.match(html, /name="robots"\s+content="index, follow"/);
  assert.doesNotMatch(html, /noindex/i, 'Production homepage must not block indexing');
  assert.ok(robots.includes(`Sitemap: ${new URL('sitemap-index.xml', origin).href}`));
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
  assert.ok(sitemap.includes(origin.href));
  assert.equal(sitemap.includes('/404'), false, '404 page excluded from sitemap');
  assert.equal(robots.includes('Disallow: /'), false);
  assert.match(robots, /User-agent: \*\s+Allow: \//);
} else {
  assert.match(html, /content="noindex, nofollow"/);
  assert.match(robots, /Disallow: \//);
  await assert.rejects(access('dist/sitemap-index.xml'), 'No sitemap with invented domain');
}

for (const [, path] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)) {
  await access(`dist${path}`);
}
const imageUrl = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1];
assert.ok(imageUrl, 'Social image metadata exists');
const parsedImageUrl = new URL(imageUrl, canonical ?? 'https://local.invalid');
assert.match(parsedImageUrl.pathname, /^\/social\/sqoonays-[a-f0-9]{12}\.png$/);
if (canonical) assert.equal(parsedImageUrl.origin, new URL(canonical).origin, 'Social image uses the canonical host');
const png = await readFile(`dist${parsedImageUrl.pathname}`);
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.ok(png.length < 1024 * 1024, 'Social card stays below 1 MB');
assert.ok(parsedImageUrl.pathname.includes(createHash('sha256').update(png).digest('hex').slice(0, 12)), 'Social image filename matches its content');
assert.deepEqual(await readFile('dist/og.png'), png, 'Legacy social image URL still works');
assert.equal(html.match(/name="twitter:image"\s+content="([^"]+)"/)?.[1], imageUrl);
assert.match(html, /property="og:image:type"\s+content="image\/png"/);
assert.match(html, /name="twitter:card"\s+content="summary_large_image"/);
assert.ok(html.includes('property="og:image:alt"'));
assert.ok(html.includes('name="twitter:image:alt"'));
const notFound = await readFile('dist/404.html', 'utf8');
assert.match(notFound, /content="noindex, nofollow"/);
assert.match(notFound, /href="\/"/);
await access('dist/_headers');
console.log(`Build verified: Polish page, H1, anchors, local assets, booking links, JSON-LD, OG, ${canonical ? 'indexable production canonical and sitemap' : 'explicit noindex preview'}.`);
