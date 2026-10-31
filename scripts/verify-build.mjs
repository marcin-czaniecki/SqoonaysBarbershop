import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

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
  assert.match(html, /content="index, follow"/);
  assert.ok(robots.includes(`Sitemap: ${new URL('sitemap-index.xml', origin).href}`));
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
  assert.ok(sitemap.includes(origin.href));
  assert.equal(sitemap.includes('/404'), false, '404 page excluded from sitemap');
  assert.equal(robots.includes('Disallow: /'), false);
} else {
  assert.match(html, /content="noindex, nofollow"/);
  assert.match(robots, /Disallow: \//);
  await assert.rejects(access('dist/sitemap-index.xml'), 'No sitemap with invented domain');
}

for (const [, path] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)) {
  await access(`dist${path}`);
}
const png = await readFile('dist/og.png');
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
const notFound = await readFile('dist/404.html', 'utf8');
assert.match(notFound, /content="noindex, nofollow"/);
assert.match(notFound, /href="\/"/);
await access('dist/_headers');
console.log(`Build verified: Polish page, H1, anchors, local assets, booking links, JSON-LD, OG, ${canonical ? 'production canonical and sitemap' : 'noindex without domain'}.`);
