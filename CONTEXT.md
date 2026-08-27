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

## Outstanding — everything this repo needs, in one place
Run `node ~/.claude/skills/cms-check/check.mjs .` for the live list. As of 2026-08-23:

- [ ] **Merge `repeater-count-derived`** (done, just held for the batch)
- [ ] **`Nav - CTA` is a duplicate key (×2)** — two elements share one field name, so
      editing one changes both
- [ ] **95% editable coverage — 10 literals the client cannot change**, incl. the
      Footer's "Navigation" heading
- [ ] **1 repeater computes a numeral from the render index** — the live editor clones
      a sibling to preview an added item, so the number arrives stale. Use a CSS
      counter (`cms-count-root` / `cms-count`)
- [ ] **22 long fields lack `whitespace-pre-line`** — the biggest count in the fleet.
      A paragraph break the client types is stored and then silently collapses
- [ ] **No SEO foundation** and the CMS scan is stale (pre-dates several changes)
- [ ] **`/gallery` declares 37 slots** — overflow escaping its container
- [ ] Not in strict mode: no `.cms-check.json`. Add `{"strict": true}` once cleared,
      so the gate holds ([[editability-ship-gate]])

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
