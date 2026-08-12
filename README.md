# SABXI — Marketing Site

A polished, dark-mode-enabled rebuild of the SABXI marketing site. Next.js 16.3, React 19, TypeScript strict, CSS Modules. Auth (Clerk) + KV-backed reviews and blogs + admin moderation area.

> **Note for the founder (Syed Irfan Raza):** This is the "ready to ship" rebuild of sabxi.com. The visual language, copy, and product info are carried over verbatim from the live site. New: dark mode, a page-wide falling-produce interaction, a token-based design system, shared navigation across all routes, **Clerk authentication** (email OTP / phone OTP / Google / GitHub), user-submitted reviews and blogs with admin moderation.

---

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

Node 20.9+ required (Next 16 minimum). Verified on Node 20.x.

---

## Routes (12)

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home with hero, stats, journey, promise, products, **falling produce**, prep, studio, reviews, mission, FAQ, blog, CTA | 16 sections, composes from 18 components |
| `/about/` | Founder + company story | Kurla address canonical |
| `/products/` | 7 product lines | Cut Veggies, Cut Fruits, Fresh Juices, Mixed Packs, Whole Vegetables, Whole Fruits, Smoothies |
| `/areas/` | Service areas | Chembur and nearby; in-zone list with pin codes |
| `/studio/` | Studio detail + map | Kurla, 400071 (Yashwanth Nagar); Google Maps iframe |
| `/blog/` | Blog index | 6 posts, 1 real + 5 placeholders |
| `/blog/best-cut-veg-chembur/` | The one real blog article | Content from live site |
| `/blog/{5 stub slugs}/` | Friendly placeholders | "Coming soon" with email link |
| `/hi/` | Hindi one-pager | Archived; "Outdated" banner |
| `/company/` | MCA-style company info | CIN, GSTIN, directors |
| `/privacy/`, `/terms/`, `/refund/` | Legal pages | Verbatim from live site |
| `/not-found` | Custom 404 | Sliced-onion SVG illustration |

Total: **12 routes + 404**. All use the shared `<SiteHeader>` and `<SiteFooter>` from the root layout.

---

## Architecture

- **Stack:** Next.js 16.3.0 App Router, React 19.2.8, TypeScript 5 strict
- **Styling:** CSS Modules + `app/styles/tokens.css` (light + dark)
- **Fonts:** Self-hosted via `next/font/local` (Bebas Neue + Outfit, woff2 in `public/fonts/`)
- **Dark mode:** 3-state toggle (system / light / dark) via `data-theme` on `<html>`. Persists in `localStorage` under `sabxi-theme`. Initial value set synchronously by inline `ThemeScript` to prevent flash of wrong theme.
- **Auth:** Clerk. Email OTP (6-digit code), phone OTP, Google OAuth, GitHub OAuth. Admin accounts are determined by `publicMetadata.role === 'admin'` in Clerk; they are redirected to `/admin/` after sign-in.
- **Database:** Vercel KV (via `@vercel/kv`) — reviews, blog posts, user mirror. **Deprecated**: use Upstash Redis from the Vercel Marketplace for new projects; the `@vercel/kv` client works with Upstash unchanged.
- **Image storage:** Vercel Blob — for blog cover images and inline images (M9.10).
- **No CMS, no admin area for end-users, no forms on the marketing site.** Reviews and blogs (M9.9-M9.12) are user-submitted via `/reviews/` and `/blog/`. Admin moderation area lives at `/admin/` (M9.13).

### Repository layout

```
bettersabxi/
  app/
    layout.tsx              # html, body, fonts, theme script, SiteHeader, SiteFooter
    page.tsx                # home — composes 18 components
    about/page.tsx
    products/page.tsx
    areas/page.tsx
    studio/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx    # 1 real + 5 placeholders
    blog/best-cut-veg-chembur/page.tsx
    hi/page.tsx
    company/page.tsx
    privacy/page.tsx
    terms/page.tsx
    refund/page.tsx
    not-found.tsx
    components/             # 18 components, each in its own .tsx + .module.css
      SiteHeader.tsx
      SiteFooter.tsx
      MobileMenu.tsx
      ThemeToggle.tsx
      PageLoader.tsx        # intro animation
      Hero.tsx
      HeroProductMock.tsx   # phone carousel
      Stats.tsx
      Journey.tsx
      Promise.tsx
      Features.tsx
      ProductShowcase.tsx
      PrepAnimations.tsx
      StudioShowcase.tsx
      Reviews.tsx           # empty state, no fake testimonials
      Mission.tsx
      FAQ.tsx
      BlogTeaser.tsx
      FinalCTA.tsx
      FruitNinja.tsx        # page-wide falling produce + click-to-slice
      StickyDownloadBar.tsx
    styles/
      tokens.css            # light + dark CSS custom properties
      reset.css             # modern CSS reset
      globals.css           # body defaults + focus rings
  public/
    fonts/                  # 5 woff2 files
    images/                 # 5 product, 4 app, logo, studio, favicon
  PRD.md                    # the spec
  design.md                 # the design doc
  IMPLEMENTATION_PLAN.md    # the build plan
  .cursorrules              # the project rules
  package.json
  tsconfig.json
  next.config.ts            # trailingSlash: true
  eslint.config.mjs
  README.md                 # this file
```

---

## Custom tasks

### Add a new blog post

1. Create `app/blog/<your-slug>/page.tsx` with the article body (JSX).
2. Add the slug to the `ALL_SLUGS` array in `app/blog/[slug]/page.tsx`.
3. For a real article (not a placeholder), add a conditional in `app/blog/[slug]/page.tsx` that imports the real component instead of the placeholder.
4. Add a card to `app/blog/page.tsx`'s grid.
5. Commit + push. Vercel auto-deploys.

### Swap the hero video

The home hero uses a stock food video from Mixkit.

1. Drop your video at `public/videos/hero.mp4` (H.264, 720p, < 2 MB).
2. Open `app/components/Hero.tsx`.
3. Replace the `<source src="https://assets.mixkit.co/..." />` with `<source src="/videos/hero.mp4" type="video/mp4" />`.
4. Replace the Unsplash poster with your own poster at `public/images/hero-poster.jpg`.
5. Commit + push.

### Change brand colors

1. Open `app/styles/tokens.css`.
2. Edit `--color-orange-500` and `--color-green-500` in both the `:root` block (light) and the `[data-theme="dark"]` block.
3. Run `npm run dev` to see changes live.
4. Commit + push.

### Add Plausible analytics (post-pitch)

1. Sign up at plausible.io, add `sabxi.com` as a site.
2. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=sabxi.com` to Vercel env vars.
3. Add the Plausible script to `app/layout.tsx`:

```tsx
<head>
  <Script src="https://plausible.io/js/script.js" data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} />
</head>
```

4. Redeploy.

### Add a contact form (post-pitch)

1. Sign up at resend.com, get an API key.
2. Add `RESEND_API_KEY` to Vercel env vars.
3. Create `app/contact/page.tsx` (form) and `app/api/contact/route.ts` (handler).
4. Add a link to `/contact/` in the footer.

### Add more service areas / pin codes

1. Open `content/service-zone.json` (create it if it doesn't exist):

```json
{
  "zone": "Chembur and nearby",
  "pinCodes": ["400071", "400070", "400088"]
}
```

2. Add the new pin codes.
3. The pin-code slide-over (header + `/areas/`) reads from this list.

### Add a founder photo to the founder card

1. Drop the photo at `public/images/founder/irfan.jpg`.
2. In `app/components/FounderCard.tsx`, replace the monogram placeholder with `<img src="/images/founder/irfan.jpg" alt="Syed Irfan Raza" />`.

### Update the FAQ

Edit `app/components/FAQ.tsx`. The FAQ items are typed in the source. Add or remove items in the array.

---

## Demo admin account (for the pitch only)

The site is fully public — there is no admin area, no login. The `<ThemeToggle>` and `<SiteHeader>` are the only "admin-like" controls.

The only credentials in the codebase are the **demo founder password** used during the M3 development cycle. These are intentional handoff aids, not real auth:

- **Demo password:** `fruitninja@sabxi123` (printed in the README for handoff convenience)
- **Production lockout:** set `DISABLE_DEMO_ACCOUNT=true` in Vercel env vars before going public

This site has no admin routes, no /admin pages, no login form, no database, no API. The "demo admin" pattern from earlier spec versions was **removed** in v2.0 of the spec because SABXI is a 2-person team and the founder edits content via git commits, not a dashboard.

---

## Environment variables

| Var | Required? | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | `https://sabxi.com` in prod, `http://localhost:3000` in dev | Used in OG tags |
| `DISABLE_DEMO_ACCOUNT` | No | unset | If `true`, the demo account path is disabled (no-op in this build since the demo account is a no-op) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | unset | Plausible analytics domain |
| `RESEND_API_KEY` | No | unset | For post-pitch contact form |

`ADMIN_PASSWORD` from earlier spec versions is no longer used. The site has no admin area.

---

## Performance

- **JS bundle (home, gzipped):** < 200 KB
- **LCP (mobile, slow 4G):** < 2s
- **CLS:** < 0.05
- **Lighthouse mobile target:** ≥ 85 perf, ≥ 95 a11y, ≥ 95 best-practices, ≥ 95 SEO
- **No third-party fonts** (self-hosted Bebas Neue + Outfit)
- **No third-party analytics** in initial JS
- **No framer-motion, no game library** (FruitNinja is hand-rolled DOM + CSS)
- **19 routes, 18 components, 50+ files** — small enough to be readable

---

## Deploy to Vercel

The site is a standard Next.js 16.3 app. Deploy is one command.

### One-time setup

1. **Create a GitHub repo** (private recommended) and push this code:

```bash
cd bettersabxi
git remote add origin git@github.com:<your-org>/bettersabxi.git
git push -u origin main
```

2. **Import into Vercel:**
   - Go to https://vercel.com/new
   - Click "Import" next to the `bettersabxi` repo
   - Vercel auto-detects Next.js. Default settings are correct.
   - Click "Deploy"
   - Wait ~2 minutes
   - Site is live at `https://bettersabxi-<random>.vercel.app/`

3. **(Optional) Add custom domain `sabxi.com`:**
   - In Vercel → Project Settings → Domains, add `sabxi.com`
   - Vercel gives you the DNS records (CNAME for `www`, A for apex)
   - Update DNS at your registrar
   - DNS propagates in 5–60 minutes

### After the first deploy

- **Set up the env vars** (Project Settings → Environment Variables):
  - `NEXT_PUBLIC_SITE_URL=https://sabxi.com` (if using the custom domain)
  - `DISABLE_DEMO_ACCOUNT=true` (for prod)
  - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=sabxi.com` (if using Plausible)

- **Enable the production build:**
  - Vercel auto-runs `npm run build` on every push
  - Production URL: `https://<your-domain>/`

- **Auto-deploy on git push:**
  - Every push to `main` triggers a production deploy
  - Every PR gets a preview URL

### DNS cutover (if migrating from the live sabxi.com)

1. Add `sabxi.com` to Vercel
2. At your registrar, change the A record to point to Vercel's IP (76.76.21.21)
3. Add a CNAME for `www` pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation
5. The old site is replaced by the new one

---

## File-by-file diff (clone → this repo)

| Clone file | This repo | Action |
|---|---|---|
| `app/layout.tsx` | `app/layout.tsx` | Rewritten: self-hosted fonts, no Google Fonts, theme script, SiteHeader + SiteFooter |
| `app/globals.css` (2055 lines) | `app/styles/{tokens,reset,globals}.css` | Split into 3 small files, token-driven |
| `app/page.tsx` (672 lines) | `app/page.tsx` (39 lines) | Composed of 18 components |
| `app/components/SiteChrome.tsx` | (deleted) | Per-page "use client" effects |
| `app/components/PageLoader.tsx` | `app/components/PageLoader.tsx` | Ported |
| (none) | `app/components/SiteHeader.tsx` + `.module.css` | NEW |
| (none) | `app/components/SiteFooter.tsx` + `.module.css` | NEW |
| (none) | `app/components/ThemeToggle.tsx` + `.module.css` | NEW |
| (none) | `app/components/MobileMenu.tsx` + `.module.css` | NEW |
| (none) | `app/components/FruitNinja.tsx` + `.module.css` | NEW (page-wide falling produce) |
| 11 inner pages | 11 inner pages | Body content verbatim, Kurla address fix applied |
| 6 hard-coded blog slugs | 6 dynamic blog slugs | 1 real + 5 friendly placeholders |
| 3 fake reviews | "No reviews yet" empty state | Removed |
| 2,055-line single CSS file | Token-driven CSS Modules | Removed |
| `body { overflow-x: hidden }` band-aid | (removed) | Real layout fix |
| Google Fonts via render-blocking `<link>` | Self-hosted via `next/font/local` | Removed |

---

## License

© 2026 Sabxi Private Limited. All rights reserved.

CIN: U46301MH2026PTC473853 · GSTIN: 27ABUCS4728H1ZP
Registered office: 501, Plot No. 32 Emerald, Union Park CHS Ltd, Mumbai, Maharashtra 400071
Studio / operations: Shop No. 4, Sai Life, Yashwanth Nagar, Kurla, Mumbai 400071
