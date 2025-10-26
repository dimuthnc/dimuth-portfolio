# Dimuth Menikgama — Portfolio

A performant, accessible portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX.

- App directory (Next.js 14)
- Content from JSON + MDX (content/blog)
- Theming with `next-themes`
- Unit tests with Vitest + Testing Library
- Automated sitemap/robots

## Requirements
- Node.js 20+
- npm 9+

## Getting started
1) Install deps

```bash
npm ci
```

2) Run locally

```bash
npm run dev
```

Open http://localhost:3000

3) Recommended editor setup
- VS Code + ESLint + Tailwind CSS IntelliSense

## Scripts
- dev: start Next.js in dev
- build: typecheck, lint, compile, prerender; also generates sitemap and robots
- start: run the production build
- lint: ESLint (CI fails on errors)
- test: Vitest in CI mode
- test:watch: Vitest in watch mode

```bash
npm run dev
npm run build
npm start
npm run lint
npm test
npm run test:watch
```

## Environment variables
Create a `.env.local` in project root. Example:

```env
# Required for contact form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id

# Optional: used by sitemap/robots generation (scripts/generate-sitemap.mjs)
# Will fall back to https://dimuthmenikgama.com if not provided
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# or
SITE_URL=https://your-domain.com
```

Notes
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is required for the contact form. If missing, the UI will show a toast error when submitting.
- `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) improves the generated absolute URLs in `public/sitemap.xml` and `public/robots.txt`.

## Running tests

```bash
npm test
# or watch
npm run test:watch
```

## CI (GitHub Actions)
CI runs on pushes/PRs to `main` and performs:
- Install with `npm ci`
- ESLint (fail on error)
- Typecheck (fail on error)
- Build
- Tests
- Uploads the `.next` folder as an artifact for debugging (hidden files included)

Workflow: `.github/workflows/ci.yml`.

## Deployment (Vercel recommended)
Vercel auto-detects Next.js projects — setup takes ~1–2 minutes.

Option A: Git integration (recommended)
1) Push this repo to GitHub/GitLab/Bitbucket
2) In Vercel, “Import Project” → select the repo
3) Framework Preset: Next.js (auto-detected)
4) Build settings (defaults are fine)
   - Install Command: `npm ci`
   - Build Command: `npm run build`
5) Environment Variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` = your Formspree endpoint
   - Optional: `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) = your production URL (e.g., https://dimuthmenikgama.com)
6) Deploy

Option B: Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow prompts, then add env vars in Vercel dashboard and redeploy.

vercel.json
- A minimal `vercel.json` is included. Vercel still auto-detects Next.js and uses the project defaults.

## Content management
- Edit MDX posts under `content/blog/` (filename = slug.mdx)
- JSON data under `data/` (blogs.json, profile.json, projects.json)
- Frontmatter fields used for blog MDX: `title`, `date`, `tags`, `description`

## Accessibility (a11y)
- Keyboard-accessible navigation and focus states
- Skip-to-content link in the navbar
- Dev helper: `DevA11y` (in `src/components/dev-a11y.tsx`) loads `@axe-core/react` in development
  - To use, temporarily add `<DevA11y />` to your root layout when developing locally

## SEO
- Canonical URLs, titles, descriptions (see `src/lib/seo.ts` and usage in pages)
- `scripts/generate-sitemap.mjs` produces `public/sitemap.xml` and `public/robots.txt` at build time
- Blog pages include JSON-LD Article schema for richer previews

## Performance
- Tailwind + minimal JS
- MDX rendered on the server where applicable
- Image formats AVIF/WebP enabled in `next.config.mjs`

## Troubleshooting
- Contact form shows “Contact form is not configured. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT.”
  - Define the env var locally (`.env.local`) and on Vercel (Project Settings → Environment Variables)
- Sitemap has localhost URLs
  - Set `NEXT_PUBLIC_SITE_URL` or `SITE_URL` before building

---

# Final Verification Checklist

Use this before and after deployment.

SEO
- [ ] Titles and meta descriptions are present and descriptive
- [ ] Canonical URLs resolve to production domain
- [ ] `sitemap.xml` includes all expected routes (home, blog, about, portfolio, contact, MDX posts)
- [ ] `robots.txt` lists the correct `Sitemap:` URL
- [ ] Open Graph and Twitter card metadata show good previews (test on several pages)
- [ ] Blog posts include JSON-LD (`Article` schema)

Accessibility
- [ ] Keyboard navigation works across the site without traps
- [ ] Visible focus styles on interactive elements
- [ ] Landmarks and headings are structured logically
- [ ] Color contrast meets WCAG AA
- [ ] Try `DevA11y` (axe) locally and resolve any critical issues

Performance
- [ ] Lighthouse 90+ for Performance/Best Practices on key pages
- [ ] No oversized images; static assets are optimized
- [ ] Minimal render-blocking scripts; only necessary third-parties are loaded
- [ ] Test on mobile network throttling

Deployment
- [ ] Vercel build succeeds (uses `npm ci` + `npm run build`)
- [ ] Environment variables set in Vercel: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, optionally `NEXT_PUBLIC_SITE_URL`/`SITE_URL`
- [ ] Health-check manual smoke test: open Home, Blog list, Blog post, Contact form
