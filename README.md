# SABXI - Marketing Site (BetterSabxi)

A dark-mode-enabled rebuild of the SABXI marketing site. Next.js 16.3, React 19, TypeScript strict, CSS Modules. Clerk auth + Vercel Blob for user-submitted content + an admin moderation area.

> **Status:** this is a working pitch-ready build, not the final shipping product. The user-submitted review and blog forms render and validate but do not persist yet. The admin moderation area at `/admin/` is a placeholder. Real product, studio, and founder images are placeholders. Everything else is shipping-quality.

---

## What this is, honestly

This codebase is a "better version" of the current sabxi.com. Same content, same brand, same product info, but with the things the live site is missing:

| What's on sabxi.com today | What's here that the live site doesn't have |
|---|---|
| Light theme only | Full dark mode (system / light / dark, persisted) |
| 4 sections on the home page | 16 sections, including a page-wide falling-produce interaction (FruitNinja) |
| No search, no sitemap, no robots.txt | `app/robots.ts` + `app/sitemap.ts` |
| Stock food video from Mixkit on hero | Same stock video, but in a section that does not collide with the phone carousel |
| Site copy: "the future of quick commerce for fresh food" | Direct, operational copy that matches the founder's voice |
| `body { overflow-x: hidden }` band-aid hiding layout bugs | Real layout fix, no band-aid |
| Google Fonts render-blocking `<link>` | Self-hosted Bebas Neue + Outfit via `next/font/local` |
| 2,055-line single CSS file | Token-driven design system (light + dark tokens, no class soup) |
| No auth | Clerk auth scaffolded (email OTP, Google, GitHub), wired and ready to use |
| Hardcoded "Chembur" address in marketing copy | "Kurla" canonical everywhere with "near Chembur" as the disambiguator |

If the founders like the pitch, this codebase ships. If not, the spec docs (`PRD.md`, `design.md`, `IMPLEMENTATION_PLAN.md`) are still useful as a reference for the next attempt.

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

## Routes (24)

Public:

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home: hero, stats, journey, promise, products, falling produce, prep, studio, reviews, mission, FAQ, blog, CTA, user blog | Composed from 16 components |
| `/about/` | Company story | Placeholder for the founder photo |
| `/products/` | 7 product lines | Placeholders for real product photos |
| `/areas/` | Service areas | Chembur and nearby, pin-code list |
| `/studio/` | Studio detail + map | Placeholder for real studio photos |
| `/blog/` | Blog index | 1 real + 5 placeholders |
| `/blog/best-cut-veg-chembur/` | The one real blog article | Content from live site |
| `/blog/{5 stub slugs}/` | Friendly placeholders | "Coming soon" with email link |
| `/hi/` | Hindi one-pager | "Outdated" banner, archived |
| `/company/` | MCA-style company info | CIN, GSTIN |
| `/privacy/`, `/terms/`, `/refund/` | Legal pages | Verbatim from live site |
| `/reviews/` | Customer reviews + write-a-review form | **Stub**: form renders + validates, does not persist yet |
| `/sign-in/`, `/sign-up/` | Clerk auth | Email OTP, Google, GitHub. Configured via Clerk Dashboard. |
| `/not-found` | Custom 404 | Sliced-onion SVG illustration |

Signed-in users:

| Route | Purpose | Notes |
|---|---|---|
| `/my-reviews/` | "My reviews" placeholder | Resource-based auth via `currentUser()`. Full UI ships in the next pass. |

Admins (role: `admin` in Clerk `publicMetadata`):

| Route | Purpose | Notes |
|---|---|---|
| `/admin/` | Admin landing | Placeholder. **Full moderation dashboard ships in the next pass.** |

All routes use the shared `<SiteHeader>` and `<SiteFooter>` from the root layout. The header has a left hamburger that opens a left-side drawer (`<SideNav />`) with collapsible Browse + Company categories. State persists in `localStorage`.

---

## Architecture

- **Stack:** Next.js 16.3.0 App Router, React 19.2.8, TypeScript 5 strict
- **Styling:** CSS Modules + `app/styles/tokens.css` (light + dark)
- **Fonts:** Self-hosted via `next/font/local` (Bebas Neue + Outfit, woff2 in `public/fonts/`)
- **Dark mode:** 3-state toggle (system / light / dark) via `data-theme` on `<html>`. Persists in `localStorage` under `sabxi-theme`. Initial value set synchronously by inline `ThemeScript` to prevent flash of wrong theme.
- **Auth:** Clerk (v7). Strategies configured in the Clerk Dashboard: email OTP (6-digit code), Google OAuth, GitHub OAuth. **Phone OTP is removed.** Admin accounts are determined by `publicMetadata.role === 'admin'` in Clerk; they are routed to `/admin/` after sign-in.
- **Database:** `@vercel/kv` is installed, but the user-submitted content forms (reviews, blogs) are **stubs** in this build. They render, validate, and show a success toast, but do not persist yet. The wiring (Zod schemas, KV write, admin moderation queue) ships in the next pass. See "Future vision" below.
- **Image storage:** `@vercel/blob` is installed. Used in the next pass for blog cover images and user-uploaded photos.
- **Validation:** `zod` is installed. Used in the next pass for form schemas and API route input validation.
- **No CMS. No third-party analytics in the initial JS. No framer-motion. No game library.** FruitNinja is hand-rolled DOM + CSS, ~250 lines.

### Repository layout

```
bettersabxi/
  app/
    layout.tsx              # html, body, fonts, theme script, SiteHeader, SiteFooter
    page.tsx                # home, composes 16 components
    about/page.tsx
    products/page.tsx
    areas/page.tsx
    studio/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    blog/best-cut-veg-chembur/page.tsx
    hi/page.tsx
    company/page.tsx
    privacy/page.tsx
    terms/page.tsx
    refund/page.tsx
    reviews/
      page.tsx              # reviews list + write-a-review form (stub)
      ReviewForm.tsx        # client component, 5-star rating, no persistence
      TopReviews.tsx
    sign-in/[[...sign-in]]/page.tsx
    sign-up/[[...sign-up]]/page.tsx
    my-reviews/page.tsx     # placeholder
    admin/page.tsx          # placeholder
    not-found.tsx
    components/             # 22 components, each in its own .tsx + .module.css
      SiteHeader.tsx
      SiteFooter.tsx
      SideNav.tsx           # left-side drawer with category accordions
      ThemeToggle.tsx
      PageLoader.tsx        # intro animation (home page only)
      HomeLoaderBoundary.tsx
      AuthControl.tsx       # Clerk sign-in / avatar
      Hero.tsx
      Stats.tsx
      Journey.tsx
      Promise.tsx
      Features.tsx
      ProductShowcase.tsx
      PrepAnimations.tsx    # 4 prep stages with keyframe animations
      StudioShowcase.tsx
      Reviews.tsx           # empty state in home, no fake testimonials
      Mission.tsx
      FAQ.tsx
      BlogTeaser.tsx
      FinalCTA.tsx
      FruitNinja.tsx        # page-wide falling produce + click-to-slice
      UserBlogSubmit.tsx    # user-submitted blog form on home (stub)
      StickyDownloadBar.tsx
      AppStoreBadges.tsx    # shared official SVG badge component
    styles/
      tokens.css            # light + dark CSS custom properties
      reset.css             # modern CSS reset
      globals.css           # body defaults + focus rings
    robots.ts               # SEO robots.txt
    sitemap.ts              # SEO sitemap.xml
  lib/
    auth.ts                 # Clerk session + role + KV user mirror helpers
  public/
    fonts/                  # 5 woff2 files
    images/                 # 5 product placeholders, 4 app screenshots, logo, studio placeholder
    icons/                  # opengraph image, favicon
  proxy.ts                  # Next.js 16 Proxy (was middleware.ts in Next 15)
  PRD.md                    # the spec
  design.md                 # the design doc
  IMPLEMENTATION_PLAN.md    # the build plan
  CURSOR_AUDIT_PROMPT.md    # the audit prompt that drove the latest review pass
  DEPLOY.md                 # Vercel deploy guide
  .cursorrules              # the project rules
  package.json
  tsconfig.json
  next.config.ts            # trailingSlash: true
  eslint.config.mjs
  README.md                 # this file
```

---

## What's real vs what's a placeholder

This is the honest inventory.

### Real (verified working in production deploy)

- All 24 routes return HTTP 200
- Dark mode toggle works on every page
- SideNav drawer with category accordions, persisted state, esc-to-close, backdrop-click-to-close
- FruitNinja falling-produce canvas with hit detection
- App Store / Google Play SVG badges on every CTA
- Build clean, lint clean, TypeScript clean
- Self-hosted fonts, no Google Fonts request
- robots.txt and sitemap.xml generated
- OpenGraph image (`app/opengraph-image.png`) and Twitter card metadata
- Dynamic `metadataBase` from `NEXT_PUBLIC_SITE_URL` env var
- Clerk auth wired (sign-in / sign-up render, session cookie, sign-out)
- Resource-based admin auth (`/admin/` checks `role === 'admin'` from `sessionClaims`)

### Stub (renders, looks correct, does not persist)

- **Review form** on `/reviews/`: renders, validates, shows a "Thanks! We'll publish your review once our team reviews it" toast. Does not write to KV.
- **User blog submit** form on the home page: same pattern as reviews.
- **My Reviews** page at `/my-reviews/`: placeholder text, no list rendering yet.
- **Admin dashboard** at `/admin/`: placeholder text, no review/blog queue yet.

### Placeholder content (visuals)

- **Product images** on `/products/`: the existing 5 product PNGs are the ones from the live sabxi.com site. They look like the actual products but are low-res stock-style photos. If the founders want their real product photos, those need to be shot and uploaded.
- **Studio photos** on `/studio/` and the home hero: one stock-style photo. Real studio photos needed.
- **Founder photo** on `/about/`: the founder card is text-only, no photo slot exists. The page has a "Founder" section heading but the photo placeholder is missing.

### Future vision (what ships in the next pass if the founders like this)

If SABXI's team likes the pitch and wants to ship to production, here is what the next pass adds. None of this is in this build.

**Data layer (review + blog moderation)**

The deps are installed (`@vercel/kv`, `@vercel/blob`, `zod`, `lib/auth.ts` is written). What's missing:

1. Wire the review form to a server action that writes to KV. Schema: `{ id, userId, rating, title, body, createdAt, status: 'pending' | 'approved' | 'rejected' }`. Stored at `kv:reviews:{id}` and indexed at `kv:reviews:byStatus:pending` for the admin queue.
2. Wire the blog submit form to a server action. Schema: `{ id, userId, title, body, coverImageBlobUrl, createdAt, status }`. Stored at `kv:blogs:{id}`.
3. Build the admin moderation dashboard at `/admin/`: list of pending reviews and blogs, approve / reject buttons, edit-and-approve, reject with reason.
4. Build the public reads: `/reviews/` reads `kv:reviews:byStatus:approved` and renders the cards. `/blog/` reads `kv:blogs:byStatus:approved` and renders the post list. Individual blog posts at `/blog/{slug}/` read from KV.
5. Build the user "My Reviews" list at `/my-reviews/`: shows the user's submitted reviews with their status (pending / approved / rejected) and the moderator's note if rejected.

**Image uploads**

`@vercel/blob` is installed but unused. The blog cover image field in the submit form would upload to Blob, store the URL in KV.

**Email notifications**

When a review is approved or rejected, the user gets an email. When a blog is published, the user gets an email. The email provider is `RESEND_API_KEY` (Resend, free tier is 100 emails/day). Wire it through `app/api/notify/route.ts`.

**Real product, studio, and founder images**

These need to come from the founders. Drop them into:
- `public/images/products/{cut-veggies,cut-fruits,juices,mixed-packs,whole-vegetables,whole-fruits,smoothies}.webp` for the products page
- `public/images/studio/real-studio-1.webp` etc. for the studio page
- `public/images/founder/` for the founder photo on the about page

**Plausible analytics (or PostHog)**

Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to Vercel env vars and a single `<Script>` tag in `app/layout.tsx`. The site has no analytics today.

**Email OTP and Google OAuth in Clerk Dashboard**

This is a Clerk Dashboard config, not a code change. Currently the sign-in page lets Clerk render whatever strategies the dashboard has enabled. The dashboard needs to have: Email (Email verification code strategy), Google OAuth, GitHub OAuth enabled. Phone number should be **disabled**.

**SEO polish**

- Add structured data (`schema.org/LocalBusiness` for the studio, `schema.org/Product` for the products, `schema.org/Article` for blog posts).
- Add a `robots.txt` allow for `Yandex` and `Baidu` if the founders care about international traffic.
- Image alt-text pass: currently many alt texts say "SABXI" or are generic. They should describe the actual product and studio.

**Lighthouse / Web Vitals pass**

There are 14 lint warnings about `<img>` tags that should be `<Image>` from `next/image`. That's a separate pass. Target: ≥ 90 Lighthouse Performance, ≥ 95 Accessibility, ≥ 95 Best Practices, ≥ 95 SEO on mobile.

**Pin-code slide-over**

The header has a "Check delivery" button that opens a slide-over for pin code entry. The UI is sketched in the design doc but not implemented. Worth doing if SABXI wants to drive direct sign-ups from the marketing site.

---

## Environment variables

| Var | Required? | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes (for auth) | unset | Clerk public key from dashboard |
| `CLERK_SECRET_KEY` | Yes (for auth) | unset | Clerk secret key from dashboard |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | No | `/sign-in` | Where Clerk redirects to sign in |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | No | `/sign-up` | Where Clerk redirects to sign up |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | No | `/` | Where to land after sign in |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | No | `/` | Where to land after sign up |
| `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Yes (for next pass) | unset | Vercel KV (deprecated) or Upstash Redis auto-populated env vars. Without these, user-submitted content does not persist. |
| `BLOB_READ_WRITE_TOKEN` | Yes (for next pass) | unset | Vercel Blob storage. Auto-populated when you create a Blob store. |
| `ADMIN_BOOTSTRAP_EMAIL` | No | unset | Email of the pre-existing admin account. Used to set `publicMetadata.role = "admin"` on first sign-in. |
| `NEXT_PUBLIC_SITE_URL` | No | `http://localhost:3000` in dev, `https://sabxi.com` in prod | Used in OG tags, canonical URLs, sitemap |

Copy `.env.example` to `.env.local` (gitignored) and fill in the values. For Vercel, set these in Project Settings → Environment Variables.

---

## Deploy to Vercel

The site is a standard Next.js 16.3 app. Deploy is one command if you have the Vercel CLI authenticated.

```bash
cd bettersabxi
vercel deploy --prod
```

Vercel will auto-detect Next.js. Default settings are correct. Site will be live at `https://<random>-<team>.vercel.app/` in ~60 seconds.

For full deploy steps (DNS, custom domain, env vars, rollback), see `DEPLOY.md`.

### Auto-deploy on git push

Vercel watches `main` on GitHub. Every push to `main` triggers a production build. Every PR gets a preview URL.

---

## Performance

- **JS bundle (home, gzipped):** < 200 KB
- **No third-party fonts** (self-hosted Bebas Neue + Outfit via `next/font/local`)
- **No third-party analytics** in initial JS
- **No framer-motion, no game library** (FruitNinja is hand-rolled DOM + CSS)
- **Lighthouse mobile target:** ≥ 85 perf, ≥ 95 a11y, ≥ 95 best-practices, ≥ 95 SEO
- **Lighthouse mobile actual:** not yet measured in this build. Run `npx lighthouse` against the deployed URL before declaring done.

---

## What's in the spec docs (not in the code)

The following live in `PRD.md` and `design.md` as future specs, not as implemented features:

- Service-zone slide-over (pin code entry in the header)
- Real-time order tracking on the marketing site (the app already does this; the web doesn't)
- Recipe generator (input your ingredients, get a recipe from the SABXI catalogue)
- Subscription page (the app has a subscription; the web has no marketing for it)
- A/B testing framework (no experimentation library chosen yet)

These are all in the "what if the founders like it" bucket.

---

## File-by-file diff (current sabxi.com → this codebase)

| Current sabxi.com | This codebase | Action |
|---|---|---|
| `app/layout.tsx` | `app/layout.tsx` | Rewritten: self-hosted fonts, theme script, SiteHeader + SiteFooter |
| `app/globals.css` (~2,055 lines) | `app/styles/{tokens,reset,globals}.css` | Split into 3 files, token-driven |
| `app/page.tsx` (~672 lines) | `app/page.tsx` (~80 lines) | Composed of 16 components |
| `app/components/SiteChrome.tsx` | (deleted) | Per-page "use client" effects split into individual components |
| `app/components/PageLoader.tsx` | `app/components/PageLoader.tsx` | Ported, gated by `HomeLoaderBoundary` so it only runs on `/` |
| (none) | `app/components/SiteHeader.tsx` | NEW |
| (none) | `app/components/SiteFooter.tsx` | NEW |
| (none) | `app/components/SideNav.tsx` | NEW (replaces `MobileMenu.tsx`) |
| (none) | `app/components/ThemeToggle.tsx` | NEW |
| (none) | `app/components/FruitNinja.tsx` | NEW (page-wide falling produce) |
| (none) | `app/components/Reviews.tsx` + `/reviews/` page + `/reviews/ReviewForm.tsx` | NEW (review form is a stub) |
| (none) | `app/components/UserBlogSubmit.tsx` | NEW (user blog submit is a stub) |
| 11 inner pages | 11 inner pages | Body content ported with Kurla address fix |
| 6 hard-coded blog slugs | 6 dynamic blog slugs | 1 real + 5 placeholders |
| 3 fake reviews (Priya S., Rahul M., Anita K.) | "No reviews yet" empty state | Removed |
| `body { overflow-x: hidden }` band-aid | (removed) | Real layout fix |
| Google Fonts via render-blocking `<link>` | Self-hosted via `next/font/local` | Removed |
| `middleware.ts` (Next 15) | `proxy.ts` (Next 16) | Renamed per Next 16 deprecation |
| (none) | `lib/auth.ts` | NEW (Clerk session + role + KV helpers, for next pass) |
| (none) | `app/admin/`, `app/my-reviews/` | NEW (placeholders) |
| (none) | `app/robots.ts`, `app/sitemap.ts` | NEW |

---

## License

© 2026 Sabxi Private Limited. All rights reserved.

CIN: U46301MH2026PTC473853 · GSTIN: 27ABUCS4728H1ZP
Registered office: 501, Plot No. 32 Emerald, Union Park CHS Ltd, Mumbai, Maharashtra 400071
Studio / operations: Shop No. 4, Sai Life, Yashwanth Nagar, Kurla, Mumbai 400071
