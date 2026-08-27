# HartHaulage — working context
_Last wrapped: 2026-08-23 · live, CMS-wired_

## What this is
Hart Haulage's site (transport/haulage). Live and CMS-wired, but built before the
current standards, so it is on the **modernisation list** alongside tend-site.

## Current state
- Live: `main`, deployed on Netlify.
- **In flight: branch `repeater-count-derived` (1 commit, NOT merged).** Converts the
  repeaters to count-derived layout. Reviewed by Lazar 2026-08-23 ("HH looks great").
  Deliberately held back so it ships with the modernisation batch rather than
  spending a production deploy of its own ([[netlify-deploy-credits]]).

## Modernisation — DONE 2026-08-27, on branch `modernisation` (NOT yet merged)
Two commits: editability + strict mode (`0fbc209`), then the SEO foundation
(`59e1396`). **cms-check 0 fail · 0 warn · 23 pass (strict).** No design or copy
change anywhere — every bound literal renders the same words it already did.

- [x] Merged `repeater-count-derived`
- [x] `Nav - CTA` duplicate key — mobile twin now renders `c.nav_cta` with no
      data-cms (the sitemog-starter convention)
- [x] Editable coverage 95% → 100%. Four literals bound to new content keys
      (`footer_nav_heading`, `terms_download_label`, `terms_cta_body`), six declared
      `data-cms-static` with reasons
- [x] 27 long fields gained `whitespace-pre-line` (23 page-level + 4 inside
      repeaters, which take `{item.field}` not `{c.key}` and needed a second pass)
- [x] Gallery's index-derived alt text (invisible, but the same defect class)
- [x] **SEO foundation** — see below
- [x] Strict mode on (`.cms-check.json`)
- [x] Riders attached to this deploy: edit-bridge re-synced from the starter, and
      the markdown-only build skip in `netlify.toml`

### The SEO retrofit, and the stack decision behind it
Hart was the odd site out on **react-router-dom 7**; `vite-react-ssg` supports React
19 and Vite 8 but declares router `^6.14.1` in every version. Rather than force an
unsupported peer on a live client site, the router dropped to **6.30.6** (which
supports React >=16.8, so React 19 and Vite 8 stay). Hart only used
BrowserRouter/Routes/Route/useLocation/Link/NavLink — identical in v6, and the first
three are replaced by the route table. Lazar's call, 2026-08-27.

Shipped: route table in `App.jsx`, shared shell in `Layout.jsx`, ViteReactSSG entry,
`Seo.jsx` (per-page title/description/canonical/OG using that page's own hero),
`Schema.jsx` (LocalBusiness + BreadcrumbList), `scripts/gen-seo.mjs` (sitemap +
robots), and a real 404 page, which the site never had.

**Two things pulled out of `index.html`:** the static title/description, which were
duplicating the per-page head on all 7 prerendered pages, and 4.2KB of dead inline
script that fetched CMS content from `http://localhost:3000` — a pre-bridge relic
that could only ever fail in production.

## Still outstanding
- [ ] **Lazar to review on localhost** (`npm run dev` — note it is `vite-react-ssg
      dev` now) before this merges. Nothing should look different.
- [ ] **Merge to `main`** = one production deploy. Both riders ride it.
- [ ] **CMS force-overwrite re-scan AFTER merging** — three new fields
      (`Footer - Navigation - Heading`, `Terms - Document - Download Label`,
      `Terms - CTA - Body`) will not appear in the dashboard until a rescan, and the
      existing scan predates several changes. ([[cms-rescan-gotchas]])
- [ ] **Top-level NAP for the JSON-LD.** `Schema.jsx` omits phone/email/address
      because Hart publishes three depot contacts and no single primary one, and
      wrong NAP is worse than absent NAP. Add `phone`/`email`/`address` to
      content.js once Lazar confirms which is the business's primary contact.
- [ ] **`/gallery` declares 37 slots** — overflow escaping its container (unchanged)
- [ ] **Netlify Image CDN** (`src/lib/img.js` + `[images] remote_images`) is not on
      this site yet; its hero images come from the Supabase bucket unoptimised.
      Tracked fleet-wide, not done here.

## Decisions & why
- **Do NOT bend fleet-wide logic to fit this site.** It is awaiting a rebuild, so a
  shared rule shaped around its quirks would outlive the quirks. Fix at site level.
  ([[feedback-dont-bend-shared-logic-for-legacy-sites]])
- Value drift adopted 2026-08-23: `Terms - Intro - Last Updated` was "March 2026" in
  the CMS vs "May 2026" in code. The CMS's published record had been wrong for months.

## Gotchas / lessons
- `src/index.css` had **no `@layer components`** — the repeater work had to open one,
  placed after the `@tailwind` directives so utilities still override it.
- `Home - Stats` uses a **responsive gap** (`gap-6 md:gap-0 md:divide-x`), so
  `--rb-gap` has to track per breakpoint or the row comes up short at md.

## Session log (brief, newest first)
- 2026-08-23: repeater conversion (held on branch); value drift adopted; CONTEXT created.
