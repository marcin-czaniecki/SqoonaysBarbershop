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
- Do not hotlink or scrape Instagram/Booksy photos for production. Only use assets supplied with permission. Until then create tasteful CSS-based image placeholders or a clearly temporary local asset.
- Use a legitimate map directions link rather than an unsolicited third-party embedded map.
- Do not copy a third party's website design or write exaggerated marketing claims.
- Protect privacy: don't install tracking or third-party scripts by default. Document any analytics/privacy decisions.

## Repository quality
- Organize layout and page sections into reusable Astro components.
- Maintain a usable README including installation, local development, build and content update instructions.
- Add meaningful metadata, canonical URL configuration, sitemap, robots.txt, Open Graph and `HairSalon`/`LocalBusiness` JSON-LD using only confirmed business facts.
- Domain is unknown: make site URL configurable and clearly document the production value to set later.
- Use purposeful visual hierarchy; avoid a template-like hero and excessive animations.
- Keep navigation anchors, CTA, external link behavior, and mobile layout polished.

## Workflow
1. Read `SPEC.md` and inspect the current repository before making changes.
2. Implement a complete first version of the MVP, not only a plan.
3. If network/package installation is blocked, request permission or explain the specific blocker.
4. After changes, run the project checks available (`pnpm install`, `pnpm astro check` if configured, `pnpm build`). Fix issues rather than ignoring them.
5. When browser-based preview or screenshots are available, verify mobile and desktop. Otherwise describe what needs manual inspection.
6. Do not register a domain, deploy, change a Google Business Profile, connect analytics, or publish external content without explicit approval.
7. Do not silently overwrite unrelated existing work; inspect `git status` first.
8. End each task with: summary of changes, commands/checks run and their results, outstanding assumptions and a short next-step list.

## Language
- Website UI and marketing copy: natural Polish.
- Explanations to the owner/developer: Polish.
- Code identifiers, comments where needed, and git messages: English.
