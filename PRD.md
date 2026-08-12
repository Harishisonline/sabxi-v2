# BetterSabxi — Product Requirements Document

**Project code name:** `bettersabxi`
**Repo target:** `~/Downloads/bettersabxi/` (currently empty — to be scaffolded)
**Source-of-truth clone:** `~/Downloads/Programming/sabxiharish/` (the existing automated-clone Next.js site)
**Build target:** A polished, ready-to-pitch **rebuild of the SABXI marketing site** — same content, same assets, same flow, but with a proper shared design system, **dark mode**, a **Fruit-Ninja-style playful interaction**, **proper shared navigation and footer across all 12 routes**, and code that's clean enough for the actual founder to take over after the pitch.
**Status:** Draft v2.0, awaits your sign-off.
**Author:** Harish, building to pitch to Syed Irfan Raza (founder, Sabxi Private Limited).
**Companion document:** `design.md` (in the same folder). PRD = what and why. design.md = how it looks and feels. If they disagree, PRD wins on scope, design.md wins on visual.

**Change log:**
- v2.0 (this file). Complete rewrite. The previous v1.x (Vercel KV, blog forms, admin area, email-link moderation) is replaced with a scope that matches the actual ask: a polished marketing site that uses the existing clone's content, adds dark mode, a Fruit-Ninja-style interaction, and shared nav/footer, ready to pitch.

---

## 0. Why this PRD exists

The clone at `~/Downloads/Programming/sabxiharish/` is a 1:1 automated extraction of the live `sabxi.com`. It runs on `localhost:3000` and ships the same content, copy, and assets — but it has real problems that will be obvious in a pitch:

1. The home page works, but **every inner page has its own copy of the nav and footer with relative paths** (`../about/`, `../blog/`). Mobile users can't navigate from `/about/` to `/blog/`. This is a "the right side of the page feels broken" bug.
2. **No dark mode.** The site is hard-coded light.
3. **No Fruit-Ninja-style playful interaction** — the existing "decorative emoji floating around" is not interactive.
4. **One of the six blog posts actually has content; the other five are stubs** that all show the same Chembur article. This will fall apart in a pitch the moment the founder clicks two different blog cards.
5. The **single CSS file is 2,055 lines** of duplicated selectors. No design tokens, no CSS variables used consistently, no dark mode hooks.
6. The **three "People Love Fresh" reviews on the home page are fake** (Priya S. Mumbai, Rahul M. Mumbai, Anita K. Delhi) — one even mentions Delhi when SABXI only operates in Chembur. This is a legal risk for a real pitch.
7. The site uses **Google Fonts via a render-blocking stylesheet** and a **stock food video from Mixkit** for the hero background. Both are cheap, but the video is 1–3 MB and loads on every homepage visit.
8. The hero has a **`overflow-x: hidden` band-aid on `body`** that hides layout bugs and breaks sticky positioning on some browsers.
9. The studio address is shown as **"Chembur" everywhere in copy** but the legal address and Google Maps embed are in **Kurla (Yashwanth Nagar, 400071)**.

The pitch to the founder is: *"we took your existing site, fixed the things that would embarrass you in a meeting, added dark mode, added a real interaction, and made it ready to take over."* The PRD defines what that means in concrete terms.

---

## 1. Scope: what we are building

A Next.js 16 (App Router) **marketing site** with 12 routes, a shared header/footer, a proper design token system, a first-class **dark mode**, and a single **Fruit-Ninja-style interactive section** on the home page where the visitor can click falling vegetables and fruits to "slice" them and reveal product cards.

### 1.1 In scope (v1.0)

- **All 12 routes from the clone**, kept on `trailingSlash: true` so URLs match the live site (the founder's existing SEO and external links continue to work):
  - `/` (home with Fruit-Ninja section added)
  - `/about/`
  - `/products/`
  - `/areas/`
  - `/studio/`
  - `/blog/`
  - `/blog/best-cut-veg-chembur/` (one real article; the other five remain URL-stubbed to 404 with a friendly fallback, OR we re-scope — see open question 1)
  - `/hi/`
  - `/company/`
  - `/privacy/`
  - `/terms/`
  - `/refund/`
  - plus a 404 page
- **Shared `<SiteHeader>` and `<SiteFooter>`** that render the same content on every route.
- **Mobile menu** that works on every route.
- **Dark mode** as a first-class theme (toggle in header, `prefers-color-scheme` respected on first load, persists in `localStorage`).
- **Fruit-Ninja-style interaction** on the home page: vegetables and fruits fall from the top, the user clicks/slices them, each slice reveals a product card underneath. Static fallback on mobile (`<600px`), under `prefers-reduced-motion`, and on low-power devices. "Skip the game" link always visible.
- **One real, written blog article** with full content. The other five blog URLs either get real content (preferred) or a friendly "Article coming soon — email info@sabxi.com" placeholder page. **No fake reviews on the homepage.**
- All **legal pages, copy, and product info carried over verbatim** from the clone, with no em-dash removal (the live site uses em-dashes and the founder expects the same voice).
- A **single `globals.css`** rebuilt around design tokens (light + dark) with proper cascade. No more 2,055 lines of duplicated selectors.
- **No database. No CMS. No admin area. No email-link moderation. No public review form. No public blog form.**
  The v1.0 PRD previously had all of these. They are out of scope. The site reads from the repo's content (typed in code) and writes nothing.

### 1.2 Out of scope (explicitly, for v1.0)

- **Subscription pricing block** (founder decision, deferred).
- **A live order placement flow on the web.** Web funnels to the iOS / Android app, same as today.
- **B2B / corporate enquiry form.**
- **A live serviceability API** beyond the in-zone copy on `/areas/`.
- **Multi-language UI.** English first. The `/hi/` page is a static archived page, same as today.
- **Auth, OAuth, admin login, password gating** of any kind.
- **Server-side content moderation, image uploads, blog CMS, review CMS.**
- **Analytics dashboards.** We may add Plausible if the founder asks. v1.0 ships with no analytics.
- **Shopify / Medusa / commerce integration.** The site does not sell.
- **A new CMS, MDX migration, or external blog platform.** Blog content stays as JSX in `app/blog/[slug]/page.tsx` — 1 real article and 5 friendly placeholders, see §4.3.
- **PWA, offline support, push notifications, search.**

### 1.3 What "ready to ship" means

The site is "ready to ship" when:

1. **`npm run dev` and `npm run build` both succeed** with zero errors and zero ESLint warnings.
2. **Every route renders without errors** and matches the live `sabxi.com` content, copy, and assets.
3. **The shared header and footer render on every route**, including the legal pages.
4. **Dark mode toggle works** on every route and persists across reloads.
5. **The Fruit-Ninja section works on desktop**, with a static grid fallback on mobile and `prefers-reduced-motion`.
6. **The blog post that has content renders correctly**, and the other five blog URLs either render real content or a friendly placeholder.
7. **No fake reviews** on the homepage. The three "People Love Fresh" cards are replaced with one of: (a) a real review the founder provides, (b) a "Reviews coming soon" empty state, or (c) hidden until founder provides reviews. The current state (one Mumbai review, one Mumbai review, one Delhi review) is not acceptable to ship.
8. **`trailingSlash: true`** is on, so all 12 routes match the live site URLs.
9. **No remote third-party font, image, or video is loaded** that isn't on the founder's existing whitelist (or we replace the Mixkit hero video with the founder's own footage when they provide it).
10. **Lighthouse mobile ≥ 85** for performance, ≥ 95 for accessibility and best-practices. (Performance is not the primary bar; this is a marketing site, not an app.)
11. **The site deploys to Vercel** with a single command and serves the production build at a stable URL.

---

## 2. Source-of-truth references

When the spec is ambiguous, the source of truth is in this order:

1. **The clone at `~/Downloads/Programming/sabxiharish/`** — for content, copy, routes, images, legal text, FAQ, MCA data, blog post body.
2. **The live site at `sabxi.com`** (via the `ferret` snapshot I already have) — for the same content, with the clone as the cached version.
3. **The design.md in the same folder** — for visual and interaction decisions.
4. **This PRD** — for scope decisions.

The implementation does **not** call the live site at build time. Everything is read from the clone's `app/`, `public/`, and content within the new `bettersabxi` repo.

---

## 3. Audience and goals

### 3.1 Primary audience

The pitch audience is **Syed Irfan Raza** (founder, Sabxi Private Limited). The site is being shown to him to demonstrate what a polished, code-quality version of his existing site looks like — and to give him something he can take over with no rework.

The secondary audience is **end users of the SABXI app** who land on the site from search, social, or word of mouth. They want to know: what is SABXI, where do I download the app, what areas do you serve.

### 3.2 Site goals (in order)

1. **Make the founder say "yes, this is what I want"** at the pitch. Visual polish, dark mode, the Fruit-Ninja interaction, the fix to the inner-page nav bug — all of these are proof that you understood his site and improved it.
2. **Get the visitor to download the SABXI app** (App Store / Play Store deep link, measured by UTM-tagged click events if analytics is added later).
3. **Establish credibility** (CIN, GSTIN, directors, real legal entity, real company info page).
4. **Be ready for handoff** to the founder with zero rework. The README explains how to swap content, add a blog post, change the hero, and deploy.

### 3.3 Non-goals

- SEO domination for "online grocery Mumbai." SABXI is not competing on SEO with Zepto/Blinkit.
- Internationalisation. English only for v1.0; `/hi/` is preserved as-is.
- A new app or web app. The iOS/Android apps are the founder's, not ours.

---

## 4. Information architecture

### 4.1 Routes (12, trailing slash)

| Route | Source in clone | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Home with hero, stats, journey, promise, products showcase, prep animations, studio, Fruit-Ninja, reviews, mission, FAQ, blog teaser, CTA, footer |
| `/about/` | `app/about/page.tsx` | Founder + company story |
| `/products/` | `app/products/page.tsx` | 6 product lines grid |
| `/areas/` | `app/areas/page.tsx` | Service areas + in-zone list |
| `/studio/` | `app/studio/page.tsx` | Studio detail + map |
| `/blog/` | `app/blog/page.tsx` | Blog index |
| `/blog/[slug]/` | `app/blog/[slug]/page.tsx` | Blog post (one full, five placeholder OK for v1.0) |
| `/hi/` | `app/hi/page.tsx` | Hindi one-pager (archived) |
| `/company/` | `app/company/page.tsx` | MCA-style company info |
| `/privacy/` | `app/privacy/page.tsx` | Privacy policy |
| `/terms/` | `app/terms/page.tsx` | Terms of service |
| `/refund/` | `app/refund/page.tsx` | Refund & cancellation policy |
| `/not-found` | new | Custom 404 |

Total: **12 routes + 404**. The clone has the same 12 (no custom 404 yet).

### 4.2 Shared layout (NEW)

The clone's biggest bug is that every page has its own copy of the nav and footer. The rebuild fixes this with a shared layout:

```
app/
  layout.tsx              # <html>, <body>, fonts, metadata
  components/
    SiteHeader.tsx        # Logo + nav links + dark mode toggle + mobile menu trigger
    SiteFooter.tsx        # 4-column footer + legal line
    MobileMenu.tsx        # Full-screen overlay on mobile
    ThemeToggle.tsx       # 3-state: system / light / dark
    Container.tsx         # max-w wrapper
    Section.tsx           # full-width page band
  page.tsx                # /
  about/page.tsx          # /about/
  ...
```

`SiteHeader` and `SiteFooter` are rendered once in `app/layout.tsx` and appear on every route. The `SiteChrome` client component from the clone (which runs all the homepage-only `useEffect`s) is **only** mounted on the home page. The inner pages do not need any client-side JS to render.

### 4.3 Content sources (carried over from clone, with notes)

- **FAQ (homepage)**: hard-coded in `app/page.tsx` lines 514–566 of the clone. 13 entries. Carried over verbatim. No new content needed.
- **Hindi FAQ**: hard-coded in `app/hi/page.tsx`. Carried over verbatim.
- **About / Company / Privacy / Terms / Refund**: each is a long static page. Carried over verbatim.
- **Products data**: 7 product lines in `app/products/page.tsx` (Cut Veggies, Cut Fruits, Fresh Juices, Mixed Packs, Whole Vegetables, Whole Fruits, Smoothies). Carried over verbatim, with the note that the brand says "six lines" but the products page lists seven — the rebuild keeps seven and updates the brand copy to match.
- **Blog posts**: the clone has 6 slugs in `generateStaticParams`, but only one (best-cut-veg-chembur) has real content. The other five URLs all show the same Chembur content. **The rebuild has two options**, and we need to pick one before M3 (see open question 1):
  - **(a)** Write real content for all 6 blog posts. ~3 hours of work. Best result.
  - **(b)** Keep one real article and add a friendly "Coming soon" placeholder for the other 5. ~30 minutes. Lower quality but unblocks the build.
  - **Recommended:** (a) if the founder can give you 5 blog topics or 5 minutes of conversation, (b) otherwise.
- **Reviews (homepage)**: 3 fake reviews in the clone. **Replaced.** See §6.1.

### 4.4 The fruit-ninja section (NEW, home only)

A new section on the home page, between **Products Showcase** and **Live Prep**, with the following structure:

```
<section id="fruit-ninja" className="fn">
  <header>
    <span className="section-label">Slice to explore</span>
    <h2>Click a fruit. Cut it. See the line.</h2>
    <p>Vegetables and fruits fall. You slice. Behind each one is a real product line from SABXI Studio.</p>
    <a className="fn-skip" href="#lines">Skip the game</a>
  </header>

  <div className="fn-canvas" ref={canvasRef} aria-label="Interactive section: click falling vegetables and fruits to slice them and reveal SABXI products." role="img">
    {/* Rendered by a <canvas> + a list of static fallback cards for SR + reduced-motion. */}
  </div>

  <div className="fn-fallback-grid" hidden={!reducedMotion && !isMobile}>
    {/* 6 product cards in a 3×2 grid. Always in the DOM for a11y, hidden when the canvas is active. */}
  </div>
</section>
```

**Implementation outline:**
- A single `<canvas>` element with `requestAnimationFrame` driving the loop. 60 fps on desktop, capped at 30 on low-power.
- 6 produce types: carrot, onion, tomato, palak, watermelon, mango. Each is a small SVG sprite (re-use the existing visual language from the clone's `feat-glyph` icons).
- Physics: parabolic motion, gravity 0.18 px/frame², spawn rate 1 per 600ms, cap 8 on screen.
- Click/touch: detect hit on the bounding ellipse, split the produce into two halves along the click vector using `clip-path`, reveal a product card for 800ms, then dismiss.
- After 30 seconds (or "Skip" click), the canvas fades out and the static grid fades in.
- `prefers-reduced-motion: reduce` → no canvas, static grid only.
- Viewport < 600px → no canvas, static grid only.
- `prefers-reduced-data: reduce` → no canvas, static grid only.
- Low-power mode detection (`navigator.getBattery()` if available, otherwise always play) → no canvas, static grid only.
- Keyboard a11y: a "Slice all" button appears below the canvas for keyboard users. Each product card is independently focusable and links to `/products/`.

**Tech:** hand-rolled canvas, no game library. ~150 lines of TS. `framer-motion` is **not** used (the existing PRD over-engineered this; the canvas API is enough).

### 4.5 Dark mode (NEW, site-wide)

A three-state theme system:

```
[System] → follows prefers-color-scheme
[Light] → always light
[Dark] → always dark
```

- Toggle in the header (sun/moon SVG icon, three states on click).
- Persists in `localStorage` under `sabxi-theme` (`"system" | "light" | "dark"`).
- On first load, reads `localStorage` first, then `prefers-color-scheme`.
- Implementation: a `ThemeProvider` client component that sets `data-theme` on `<html>`. The CSS uses `:root` for system, `[data-theme="light"]` for explicit light, `[data-theme="dark"]` for explicit dark.
- **Critical**: dark mode must not "AI-default" to washed-out dark. The design.md §3.2 has the full token list and contrast checks.

### 4.6 Navigation (the actual fix)

The shared `<SiteHeader>` on every route, with the same items:

**Desktop nav (right-aligned):**
```
[Logo]                    [Products] [Reviews] [Blog] [Areas] [About]  | [Pin code] [Download app]
```

**Mobile nav (hamburger → full-screen overlay):**
```
[Logo]                                                            [☰]
```

**Click behavior:**
- `Products` → `/products/`
- `Reviews` → scrolls to `#reviews` on home (the new homepage reviews section, see §6.1), or to `/about/#reviews` from inner pages
- `Blog` → `/blog/`
- `Areas` → `/areas/`
- `About` → `/about/`
- `Pin code` → opens a slide-over (header only) with the in-zone list, "Check pin code" input, and a "we serve 400071, 400070, 400088" message
- `Download app` → App Store badge (left) + Play Store badge (right), official SVGs
- Dark mode toggle (3-state) → sun/moon icon
- Hamburger (mobile only) → full-screen overlay with the same links in a stack, plus a footer line with the legal address and "© 2026 Sabxi Private Limited"

**Removed from the nav** (carried over from the existing PRD's analysis):
- "हिंदी" (moved to footer as a small link)
- "Studio" (rolled into the footer "Find us" link)
- "Order Now" CTA in the header (rolled into "Download app")

**Removed entirely**:
- The "People Love Fresh" emoji floats on the reviews section
- The mission chip cloud (9 chips after the mission)
- The duplicate "freshness" / "speed" / "convenience" animations
- The marquee strip with 8 keywords
- The cursor-following glow on the home page
- The fixed full-screen film grain overlay
- The `body { overflow-x: hidden }` band-aid

---

## 5. Design system (summary; full details in `design.md`)

### 5.1 Tokens

A single `app/styles/tokens.css` with CSS custom properties for:
- Brand: orange (`#FF6B00`), green (`#2E8540`), cream (`#FAF8F5`), ink (`#141414`)
- Neutrals: white, paper, ink-soft, ink-muted, line
- Surfaces: tomato, palak, turmeric, eggplant, lemon (vegetable-tinted bands, used in section backgrounds)
- Type: `--font-display: "Bebas Neue"`, `--font-body: "Outfit"`
- Type scale: 100–900 (1.250 major third, fluid via `clamp()` for display sizes)
- Space: 1–12 (4px base)
- Radius: xs (4) → 2xl (36), pill (999)
- Shadow: sm, md, lg, glow-orange, glow-green
- Motion: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`, `--dur-fast: 120ms`, `--dur-base: 200ms`, `--dur-slow: 400ms`, `--dur-stage: 800ms`

Dark mode is a complete override block in the same file. Both modes have explicit, named surfaces (not just `bg` / `text`). See `design.md` §2 for the full block.

### 5.2 Component model

Two layers:

- **Layout** (`app/components/`): `SiteHeader`, `SiteFooter`, `MobileMenu`, `ThemeToggle`, `Container`, `Section`, `Stack`, `Cluster`, `Grid`. These are presentational, no data fetching, no client-only logic (except `ThemeToggle` and `MobileMenu`).
- **Marketing** (`app/components/marketing/`): `Hero`, `HeroProductMock`, `Stats`, `Journey`, `Promise`, `ProductShowcase`, `PrepAnimations`, `StudioShowcase`, `Reviews`, `Mission`, `FAQ`, `BlogTeaser`, `FinalCTA`, `FruitNinja`. The home page composes these in order.

All components are typed, exported, and have one place to read their props. No 600-line `page.tsx`. No 370-line `SiteChrome.tsx`.

### 5.3 Pages

- Each page is its own `page.tsx`, ~50–120 lines.
- All marketing components are imported and composed in the page.
- All pages share `<SiteHeader>` + `<SiteFooter>` via the root layout.
- The home page is the only page that mounts `<SiteChrome>` (which holds the homepage-only client effects from the clone's `SiteChrome.tsx`).

---

## 6. The home page, section by section

The home page is composed of 14 sections, in this order:

| # | Section | Component | Source in clone |
|---|---|---|---|
| 1 | `PageLoader` (the existing "SABXI Studio" intro animation) | `PageLoader` | clone's `PageLoader.tsx`, ported to the new component shape |
| 2 | Site header (sticky) | `SiteHeader` | new |
| 3 | Hero with stock food video background | `Hero`, `HeroProductMock` | clone's `app/page.tsx` lines 47–98 |
| 4 | Stats strip | `Stats` | clone's `app/page.tsx` lines 109–116 |
| 5 | Journey (Chop / Pack / Deliver) | `Journey` | clone's `app/page.tsx` lines 119–144 |
| 6 | Promise (Fresh / Fast / Effortless) | `Promise` | clone's `app/page.tsx` lines 147–199 |
| 7 | Why SABXI features grid | `Features` | clone's `app/page.tsx` lines 202–260 |
| 8 | Products showcase | `ProductShowcase` | clone's `app/page.tsx` lines 263–306 |
| 9 | **Fruit-Ninja section (NEW)** | `FruitNinja` | new |
| 10 | Live prep animations | `PrepAnimations` | clone's `app/page.tsx` lines 309–421 |
| 11 | Studio | `StudioShowcase` | clone's `app/page.tsx` lines 424–461 |
| 12 | Reviews (REPLACED — see §6.1) | `Reviews` | clone's `app/page.tsx` lines 464–476 |
| 13 | Mission | `Mission` | clone's `app/page.tsx` lines 479–498 |
| 14 | FAQ + blog teaser + final CTA | `FAQ`, `BlogTeaser`, `FinalCTA` | clone's `app/page.tsx` lines 501–611 |
| 15 | Site footer | `SiteFooter` | new (replaces the inline `<footer>` in the clone) |
| 16 | Sticky mobile download bar | `StickyDownloadBar` | clone's `app/page.tsx` lines 655–664 |

The fruit-ninja section is added at position 9 (between the products showcase and the live prep animations). It is the only new section in the rebuild.

### 6.1 The reviews section — what replaces the fake reviews

The clone has three hard-coded "testimonials" on the homepage:
- Priya S. · Mumbai ★★★★★ "The cut fruit bowl is perfect for my kids' tiffin..."
- Rahul M. · Mumbai ★★★★★ "Orange juice tastes like it was just squeezed..."
- Anita K. · Delhi ★★★★★ "I order diced tomatoes and sliced onions every day..."

**Two of these name the same city as the brand (Mumbai, fine), but the third says "Delhi" — SABXI only operates in Chembur, so a Delhi review is a credibility leak in a real pitch.** The founder will catch it. The rebuild replaces all three with one of three options, decided before M5:

**(a) Real reviews from the founder.** If the founder can provide 1–3 real reviews from real customers, those go in. Best result.

**(b) Honest empty state.** If the founder doesn't have real reviews yet, the section shows: "Reviews coming soon. Be the first to order and tell us what you think." This is a one-liner, an honest empty state, no fake quotes. The Play Store and App Store ratings are linked so the founder's existing 5-star reviews on the actual stores are visible.

**(c) Hide the section entirely.** If (a) and (b) both feel too bare, the section is removed and the page flows from StudioShowcase → Mission → FAQ.

**Recommended:** (a) if possible, (b) otherwise. **(b) is the default unless the founder provides reviews.**

### 6.2 The address contradiction (Chembur vs Kurla)

The clone has the same problem flagged in the old PRD's audit: brand copy says "Chembur", legal address and Google Maps embed are in **Kurla (Yashwanth Nagar, 400071)**. The rebuild picks **Kurla** as the canonical truth and updates the brand copy:

- Hero subhead: "Cut veggies, cut fruits, fresh juices, whole vegetables, fruits, and smoothies — all from SABXI Studio, delivered to your door in under 30 minutes."
- Address: **"Shop No. 4, Sai Life, Yashwanth Nagar, Kurla, Mumbai 400071"** (this is the legal address, the Google Maps embed, and the map share URL).
- Brand line in the footer: "Freshly cut, quickly delivered — from our Kurla studio to your door in 30 minutes."
- `/studio/` page: same — Kurla is the truth.
- `/areas/` page: keeps "Chembur and nearby" as a marketing-friendly description of the delivery zone, but the canonical address on every page is Kurla.
- The Google Maps embed (`/studio/`) and share URL stay as they are — they point to the real location.

This is a small, surgical copy fix across 6 files. No redesign.

### 6.3 Em-dash policy

**No change from the live site.** The live sabxi.com uses em-dashes throughout its copy. The previous v1.x PRD said "no em-dashes ever." This v2.0 PRD reverses that: the founder's existing voice uses em-dashes, and the rebuild uses the founder's voice. We do not scrub em-dashes from the copy.

This applies to: all `app/**/page.tsx` and `content/**` files. The site ships with the same em-dashes the live site has.

---

## 7. Technical architecture

### 7.1 Stack (carried over from the clone, locked)

- **Framework:** Next.js 16.3.0 (App Router, RSC, Turbopack by default). This version has breaking changes from prior Next versions (RSC by default, async params). The repo keeps the same `package.json` (modulo dependencies we add) and the same `tsconfig.json`.
- **UI:** React 19.2.8.
- **Language:** TypeScript strict (carried over from the clone's `tsconfig.json`).
- **Styling:** CSS Modules + a tokens layer. **No Tailwind.** The design system is small enough that tokens + CSS Modules is faster to maintain. (This was already a decision in v1.x; we keep it.)
- **Animation:** hand-rolled canvas for Fruit-Ninja. CSS transitions and keyframes for everything else. **No framer-motion.** (Removed from v1.x's stack — the home page does not need it, and adding it would inflate the JS bundle by ~30 KB.)
- **Forms:** none in v1.0. (The previous v1.x had `/leave-review/` and `/write-blog/` — both removed for v2.0.)
- **Email:** none. (The previous v1.x had Resend or stubbed email — both removed for v2.0. The site has no forms.)
- **Storage:** none. (No Vercel KV, no Vercel Blob, no JSON files in `content/` for content — the clone's content is in `page.tsx` files and stays there.)
- **Analytics:** none in v1.0. (Plausible/Umami can be added by the founder with one env var and one `<script>` in `app/layout.tsx`.)
- **Hosting:** Vercel. Single deploy target. The clone is already Vercel-ready (`next.config.ts` is minimal).
- **Image optimisation:** `next/image` with `images` config restricted to own domain + the founder's existing remote hosts (Mixkit for the hero video, Unsplash for the hero poster, Google for the maps iframe). The mixkit and unsplash stays in for v1.0 (the founder wants the stock video kept). They can be replaced in v1.1 with the founder's own assets.
- **Markdown rendering:** not used in v1.0. Blog content is React JSX in `app/blog/[slug]/page.tsx`, with the existing single article copy-pasted into the new repo. (We do not introduce MDX for v1.0 — the blog is small enough that JSX is fine, and the founder said "no MDX" in v1.x's clarification.)
- **Fonts:** **self-hosted via `next/font/local`** in v1.0. The clone uses Google Fonts via a render-blocking `<link>`. v1.0 downloads the woff2 files for Bebas Neue and Outfit into `public/fonts/` and uses `next/font/local` to serve them with zero render-blocking cost. (Net: ~200ms LCP improvement on the home page.)

### 7.2 Repository layout

```
bettersabxi/
  app/
    layout.tsx              # html, body, fonts, metadata, SiteHeader, SiteFooter
    page.tsx                # home (composes 16 sections)
    about/page.tsx
    products/page.tsx
    areas/page.tsx
    studio/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx    # 6 slugs via generateStaticParams; one full, 5 placeholder
    hi/page.tsx
    company/page.tsx
    privacy/page.tsx
    terms/page.tsx
    refund/page.tsx
    not-found.tsx
    components/             # layout + marketing components
      SiteHeader.tsx
      SiteFooter.tsx
      MobileMenu.tsx
      ThemeToggle.tsx
      Container.tsx
      Section.tsx
      PageLoader.tsx        # vegetable-themed intro animation (carried from clone)
      Hero.tsx
      HeroProductMock.tsx
      Stats.tsx
      Journey.tsx
      Promise.tsx
      Features.tsx
      ProductShowcase.tsx
      PrepAnimations.tsx
      StudioShowcase.tsx
      Reviews.tsx
      Mission.tsx
      FAQ.tsx
      BlogTeaser.tsx
      FinalCTA.tsx
      FruitNinja.tsx        # NEW
      StickyDownloadBar.tsx
    styles/
      tokens.css            # light + dark tokens
      reset.css             # tiny modern reset
      globals.css           # the only CSS file
    types.ts                # shared types (Product, BlogPost, etc.)
  public/
    images/
      products/             # copied from clone
      app/                  # copied from clone
      founder/              # empty for v1.0 (no real photo yet)
      icons/                # small SVG icons used in nav
    fonts/                  # Bebas Neue + Outfit woff2 files
  next.config.ts
  package.json
  tsconfig.json
  eslint.config.mjs
  README.md
  README.md                 # developer-facing guide, env vars, deploy steps
  PRD.md
  design.md
```

### 7.3 Path aliases (carried over from the clone)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

All imports use `@/components/...`, `@/lib/...`, `@/styles/...`. No relative paths.

### 7.4 Environment variables

v1.0 ships with **zero required environment variables**. Optional:

```
NEXT_PUBLIC_SITE_URL=        # defaults to https://sabxi.com in production, http://localhost:3000 in dev. Used in OG tags, sitemap.xml, RSS.
```

If the founder later wants analytics:

```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=sabxi.com
```

If the founder later wants forms:

```
RESEND_API_KEY=              # for the contact form (post-pitch)
```

### 7.5 Performance budget (revised, realistic for a marketing site)

- Initial JS (home, gzipped): < 200 KB
- LCP (home, mobile slow 4G): < 2.0s
- CLS: < 0.05
- INP: < 200ms
- Total page weight (home, gzipped): < 1.5 MB (the Mixkit hero video is the biggest contributor; founder can swap in their own footage to drop this to < 800 KB)
- Hero image: 0 KB (the hero background is the Mixkit video; the poster is the existing Unsplash photo at the next/image layer)
- Self-hosted fonts: yes, no Google Fonts in the render path
- KV/Blob reads per homepage render: 0
- Lighthouse mobile score: ≥ 85 perf, ≥ 95 a11y, ≥ 95 best-practices, ≥ 95 SEO

The Lighthouse bar is intentionally lower than v1.x's "≥ 90 perf" — this is a marketing site, not a transactional app, and the founder's existing site does not hit 90 perf either. We can do better than the founder's current site, but the bar is "looks great and loads fast" not "ship a PWA-grade marketing site."

---

## 8. Milestones and sequence

The build is split into 8 milestones. Each is small enough to ship a working site at the end of any one of them.

| Milestone | Scope | Done when |
|---|---|---|
| **M0: Project skeleton** | New Next.js app at `~/Downloads/bettersabxi/`. Path aliases. Design tokens (light + dark). `SiteHeader`, `SiteFooter`, `Container`, `Section`, `Button`, `ThemeToggle`. Stub homepage. | `npm run dev` shows a token-driven page on `localhost:3000` with working dark-mode toggle. `npm run build` succeeds. |
| **M1: Shared layout + content migration** | Port all 11 inner pages from the clone, with shared `<SiteHeader>` + `<SiteFooter>` on every route. The home page is still the clone's. | Every route renders with the same header and footer. Mobile menu works on every route. No relative-path nav links. |
| **M2: Homepage rebuild with components** | The 14 sections of the home page become individual components. The home `page.tsx` is < 100 lines of composition. | The home page renders identically to the clone's home page, but the source is split into components. No 600-line `page.tsx`. |
| **M3: Dark mode** | Full dark theme on every route, via the shared tokens. Theme toggle in the header. `prefers-color-scheme` respected. | Toggle works, persists across reload, looks great in both modes (verified by manual screenshot review in both modes). |
| **M4: Fruit-Ninja section** | The new interactive section on the home page, between products and prep animations. | Desktop: clicking a falling produce splits it and reveals a product card. Mobile / reduced-motion: static grid. Performance holds at 60fps. |
| **M5: Reviews, blog, and copy fixes** | Replace fake reviews (§6.1). Write real content for the 5 placeholder blog posts (or keep them as friendly placeholders per open question 1). Fix the Chembur/Kurla address contradiction (§6.2). | Reviews are real or honestly empty. Blog URLs all return useful pages. Address is consistent across all routes. |
| **M6: Self-hosted fonts, perf polish** | Move from Google Fonts to `next/font/local`. Remove the `body { overflow-x: hidden }` band-aid. Remove the cursor glow + grain overlay + duplicate marquee (per `design.md` §3.3). Verify Lighthouse scores. | Lighthouse mobile ≥ 85 perf, ≥ 95 a11y. All decorative overlays removed. Fonts load with no FOIT. |
| **M7: README + handoff** | A `README.md` that documents: how to add a blog post, how to swap the hero video for founder footage, how to change the brand colors, how to deploy to Vercel, how to add Plausible analytics, how to add a contact form later. | The founder can take the repo, follow the README, and ship v1.1 without asking us anything. |
| **M8: Deploy to Vercel** | `vercel deploy` from the repo root. The site goes live at the Vercel-provided URL. If the founder wants it on `sabxi.com`, that's a DNS cutover the founder does (we document the steps in the README). | The site is live at a stable URL. Old `sabxi.com` redirect rules documented in the README for the founder. |

Sequence: M0 → M1 → M2 → M3 → M4 → M5 → M6 → M7 → M8.

---

## 9. Open questions for the founder

These are the questions I will ask the founder (Syed Irfan Raza) at the pitch. For each, I'll bring a recommendation he can confirm or change in 30 seconds.

1. **Blog content (5 placeholder posts).** Do you have 5 topics you want written? If yes, I'll write them. If no, friendly "Article coming soon" placeholders for the 5 stubs. *(My recommendation: placeholders for the 5 stubs, write the one full article. We can write more after the pitch.)*
2. **Reviews.** Do you have 1–3 real customer reviews you can share? If yes, those go on the home page. If no, the section shows "Reviews coming soon — be the first to order and tell us what you think." *(My recommendation: empty state for the pitch. Founder swaps in real reviews after.)*
3. **Founder photo.** Do you have a real photo for `/about/`? If yes, we swap the placeholder. If no, we ship the existing text-only founder card. *(My recommendation: ship text-only for v1.0, add photo in v1.1 if you provide one.)*
4. **Hero video.** The current site uses a stock food video from Mixkit. Do you have real kitchen footage from SABXI Studio you'd like to use instead? If yes, drop the file in `public/videos/hero.mp4` and we swap. If no, the Mixkit video stays. *(My recommendation: keep the Mixkit video for the pitch. Swap in real footage when you have it.)*
5. **WhatsApp / Instagram.** Do you have a WhatsApp Business number or an Instagram handle? If yes, the contact footer shows them. If no, the contact footer is just `info@sabxi.com` + studio address. *(My recommendation: no handles for the pitch, founder adds them when ready.)*

That's the whole list. The previous v1.x PRD had 11 open questions; v2.0 has 5 because the scope shrank.

---

## 10. Risks and how we handle them

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Fruit-Ninja jank on low-end laptops | Medium | Medium | Throttle to 30fps cap, fall back to static grid on `prefers-reduced-motion`, viewport < 600px, low-power mode, `prefers-reduced-data: reduce`. "Skip game" link always visible. |
| The founder doesn't have time to answer the 5 open questions before we ship | High | Low | The 5 questions all have my recommended defaults. The build ships with the defaults. Founder answers the questions later and we apply changes. |
| The founder doesn't want the Fruit-Ninja section | Low | Medium | It's his site. We make it a single component (`FruitNinja.tsx`) that can be removed in 30 seconds by deleting one import. No vendor lock-in. |
| The hero video breaks on a slow connection | Medium | Low | The video has a poster image (the existing Unsplash photo). The page renders even if the video never loads. The poster stays visible. |
| The dark mode looks washed-out on some elements | Medium | Medium | design.md §3.2 has an explicit light/dark contrast check for every surface. We screenshot every page in both modes before declaring M3 done. |
| The shared header/footer doesn't match the clone's design | Low | High | design.md §4 has the exact header and footer layouts, with a screenshot of the expected output. The implementation matches the spec or we don't ship. |
| The 5 blog stubs 404 in a pitch and the founder clicks them | High | High | This is real. v2.0 ships with friendly "Article coming soon" placeholders for all 5. The founder can see in 5 seconds that they're placeholders, not broken pages. *(See open question 1.)* |
| The Mixkit video is taken down by Mixkit before the pitch | Low | Low | The video has a poster image. If the video 404s, the poster stays. We document in the README how to swap in a local file. |

---

## 11. What this PRD does NOT do (the v2-backlog)

These were in v1.x or are reasonable v1.1 candidates. They are **out of scope for v2.0**:

- A subscription pricing block (deferred until the founder is ready to publicly price subscriptions).
- A real `/check-pincode` form with a live API (we just show the in-zone list on `/areas/`).
- A `/contact/` form that sends email (the founder can add Resend + a contact form post-pitch; one env var + one route).
- A real founder photo card with photo and bio (text-only for v1.0; founder provides photo for v1.1).
- Service-worker / PWA / offline support.
- Push notifications.
- Search (Algolia or similar).
- Real-time presence indicators ("X people viewing").
- Custom domain email (hello@sabxi.com via Resend with a verified domain).
- Server-side rendering of all blog posts via MDX (the 1–6 blog posts are JSX for v1.0; if the blog grows past 20 posts, we move to MDX in v1.2).
- A real admin area (Vercel KV + JWT cookie + email-link moderation). The site has no admin needs at this scale.
- The Hindi page being a real translated UI (it's a static archived page, same as today).

---

## 12. Hand-off gate

This document is the first of two. The second is `design.md`. Both must be approved before any implementation work begins.

The order of review:
1. Read this `PRD.md` v2.0.
2. Read `design.md` v2.0.
3. Sign off (or request changes).

After sign-off, I will invoke the `plan` skill to write the implementation plan. Implementation begins only after that.

---

*End of PRD v2.0.*
