# Project instructions: Sqoonay's Barbershop

## Mission
Build an accessible, fast, conversion-oriented, Polish-language static website for Sqoonay's Barbershop in Gdynia. Follow `SPEC.md` as the source of truth for scope and business facts.

## Technical standards
- Astro with static output (SSG), TypeScript in strict mode, Tailwind CSS 4, pnpm.
- Prefer `.astro` components and CSS over React. Add a client framework only if a necessary feature cannot be implemented cleanly without it.
- Do not add SSR, API endpoints, a database, authentication, CMS, or a custom booking system in the MVP.
- Never use TypeScript `any`. Use explicit types, `unknown` with narrowing, or generics.
- Keep dependencies minimal and follow Astro's current official instructions.
- Separate business data from presentation (e.g. `src/data/business.ts`, `src/data/services.ts`).
- Use semantic HTML, accessible labels, keyboard focus indicators, responsive images, and respect reduced-motion settings.
- Mobile first, with a clear booking CTA and working outbound links.
- Never invent prices, staff biographies, phone numbers, opening hours, ratings, quotes, awards, or reviews.
- For facts awaiting verification, use obvious internal TODOs / placeholders and do not render unverified data as fact.
- Serve images locally and only with documented permission. The owner authorized the current Booksy portraits and Instagram portfolio; provenance is recorded in `src/assets/SOURCES.md` and `src/assets/team/SOURCES.md`. This does not authorize arbitrary future downloads. Do not hotlink or automate scraping.
- The owner requested a visible Google Maps embed. Keep automatic viewport-based loading, its reserved height, accessible title, no-JavaScript fallback and a direct directions link. Do not add unrelated third-party embeds.
- Do not copy a third party's website design or write exaggerated marketing claims.
- Protect privacy: don't install tracking or third-party scripts by default. Document any analytics/privacy decisions.

## Repository quality
- Organize layout and page sections into reusable Astro components.
- Maintain a usable README including installation, local development, build and content update instructions.
- Add meaningful metadata, canonical URL configuration, sitemap, robots.txt, Open Graph and `HairSalon`/`LocalBusiness` JSON-LD using only confirmed business facts.
- Confirmed production origin: `https://sqoonays.pl` (domain purchased at OVH). Keep it as the default, with optional `SITE_URL` override. Production is indexable; only explicit `SITE_NOINDEX=true` blocks preview indexing. Keep 404 noindex.
- `SPEC.md` defines scope and fact status; `src/data/*` contains runtime data. Update both when a business fact changes; avoid copying editable price tables into documentation.
- Use `README.md` as the documentation index, `SETUP.md` for local setup, `docs/CONTENT.md` for editing, `docs/CLOUDFLARE.md` for hosting, `QA.md` for current checks and `ROADMAP.md` for proposals. Historical QA belongs in `docs/archive/`.
- Use purposeful visual hierarchy; avoid a template-like hero and excessive animations.
- Keep navigation anchors, CTA, external link behavior, and mobile layout polished.

## Workflow
1. Read `SPEC.md` and inspect the current repository before making changes.
2. Complete the requested change within the existing Astro site. Roadmap proposals are not authorization to implement or publish future features.
3. If network/package installation is blocked, request permission or explain the specific blocker.
4. Use `pnpm install --frozen-lockfile` for the existing dependency set and `pnpm cf:check` for Astro/TS, static build, build verification and Wrangler dry-run. Fix issues rather than ignoring them. Never confuse dry-run with deployment.
5. When browser-based preview or screenshots are available, verify mobile and desktop. Otherwise describe what needs manual inspection.
6. Do not deploy, push to an auto-deploy branch, change DNS, Google Business Profile or Search Console, connect analytics, or publish external content without explicit approval. Domain purchase and public availability do not authorize these actions.
7. Do not silently overwrite unrelated existing work; inspect `git status` first.
8. End each task with: summary of changes, commands/checks run and their results, outstanding assumptions and a short next-step list.

## Language
- Website UI and marketing copy: natural Polish.
- Explanations to the owner/developer: Polish.
- Code identifiers, comments where needed, and git messages: English.
