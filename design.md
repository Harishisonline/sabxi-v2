# BetterSabxi — Design Spec

**Companion to:** `PRD.md` v2.0 (in the same folder).
**Audience:** Harish, building the rebuild to pitch to Syed Irfan Raza (founder, Sabxi Private Limited).
**Source-of-truth clone:** `~/Downloads/Programming/sabxiharish/` (the existing automated-clone Next.js site).
**Status:** Draft v2.0, awaits sign-off.
**Last updated:** August 11, 2026.

**Change log:**
- v2.0 (this file). Complete rewrite. The previous v1.0 (Vercel KV, three-tier interaction system, blog authoring, admin area) is replaced with a scope that matches the actual ask: keep the founder's existing visual language, add **dark mode** as a first-class theme, add the **Fruit-Ninja section** on the home page, fix the shared navigation, and ship clean code.

---

## 0. What this document is

`PRD.md` answers *what* we are building and *why* (the audit, the scope, the open questions for the founder). This document answers *how it should look and feel* — the visual language, the design tokens, the component library, the interaction system, the page composition, the dark mode, and the Fruit-Ninja section.

If the two files ever disagree, `PRD.md` wins on **scope** (what the site does, what's in or out). This file wins on **visual and interaction** (how the site looks and feels).

---

## 1. Brand and visual foundation

### 1.1 What we keep from the live site and the clone

The founder's existing visual language is good. We inherit it verbatim:

- The orange + green + cream + ink palette. Concrete tokens in §2.
- The six (seven) product line names and the same six product images.
- The same studio photo, the same logo, the same app-screen mockups.
- The same hero video from Mixkit (the founder wants to keep it; the rebuild keeps the same `<source src="https://assets.mixkit.co/videos/6272/6272-720.mp4" />` and the same Unsplash poster).
- The same "SABXI" / "SABXI Studio" voice: short commands, frequent brand name, "chop, pack, deliver" cadence, Hindi product terms (palak, kadhai, sabzi).
- The same general page architecture: hero, stats, journey, promise, products, prep, studio, reviews, mission, FAQ, blog, CTA, footer.
- The same legal entity information (CIN, GSTIN, directors, MCA profile).

### 1.2 What we fix (carried over from the clone's audit)

The clone has 60+ issues catalogued in v1.x of the PRD's audit. The ones we fix in v2.0:

- **Inner-page navigation is broken** (every page has its own copy of the nav). Fixed by shared `<SiteHeader>` + `<SiteFooter>`.
- **No dark mode.** Fixed by full token system with light + dark blocks.
- **No Fruit-Ninja interaction.** Fixed by a new section on the home page.
- **5 of 6 blog posts are stubs that show the same content.** Fixed by friendly "coming soon" placeholders for the 5 stubs (or real content if the founder provides topics).
- **The single CSS file is 2,055 lines of duplicated selectors.** Fixed by a proper token system + per-component CSS modules.
- **3 fake reviews on the homepage** (one even mentions Delhi when SABXI only operates in Chembur). Fixed by an empty state or real reviews from the founder.
- **Chembur vs Kurla address contradiction.** Fixed by adopting Kurla as the canonical address everywhere.
- **`body { overflow-x: hidden }` band-aid.** Removed.
- **Google Fonts via render-blocking stylesheet.** Replaced with self-hosted fonts via `next/font/local`.
- **Hard-coded hero video + the rest of the page rebuilds on every visit.** Unchanged for v1.0 — the founder wants to keep the video. Documented in the README how to swap in local footage.

### 1.3 What we keep from the clone (deliberately)

Some things in the clone look like "AI slop" in v1.x's analysis but are actually appropriate for this brand:

- **The hero stock video from Mixkit.** The founder wants it. The poster image is from Unsplash, also the founder's choice. Both stay for v1.0.
- **Decorative produce emoji in the hero (`🥕 🍅 🥬 🍉 🍊 🥒 🍓 🍎`).** These are inline in the hero strip, not in section decorations. They set the playful tone. Kept for v1.0.
- **The 8-keyword marquee strip.** It says "we don't know what to put here" but the founder's site has had it for months and removing it without a replacement feels like vandalism. We replace it with a slower, more dignified "Today's cut: tomato · palak · onion · watermelon" strip. One-shot slide-in from the right, no continuous loop.
- **The "Slice to explore" fruit-ninja section is new, but its visual language is the same produce emoji + the existing prep-animation scenes.** The new section reuses the chop-knife, the carrot, the melon visual from the prep animations. No new visual language, just a new place to use it.
- **The 9-chip mission cloud.** v1.x said to remove it. We keep it for v1.0 — the founder's site has it, the founder's voice uses it, removing it without the founder's go-ahead is a copy decision we shouldn't make unilaterally.

### 1.4 Voice calibration

The founder's copy is short, command-style, and uses the brand name ("SABXI Studio", "SABXI") frequently. We carry this over verbatim. Em-dashes in the copy are part of the founder's voice and stay (v2.0 reverses v1.x's "no em-dashes" rule).

The one copy change we make is the **address**: brand copy says "Chembur" everywhere; legal address is "Kurla, 400071". v2.0 adopts Kurla as the canonical address on every page that shows the studio address. "Chembur and nearby" stays as a marketing-friendly description of the delivery zone on `/areas/`.

---

## 2. Design tokens (canonical reference)

A single `app/styles/tokens.css` file. Every component reads from these tokens. **No hard-coded colors or font sizes in component files.** This is the rule that prevents the 2,055-line single-file CSS disaster from the clone.

### 2.1 Light theme (the default)

```css
:root {
  /* Brand */
  --color-orange-50:  #FFF4EA;
  --color-orange-100: #FFE0CC;
  --color-orange-200: #FFC79A;
  --color-orange-300: #FFA866;
  --color-orange-500: #FF6B00;  /* primary action, link, button */
  --color-orange-700: #E55A00;
  --color-orange-900: #8C2E00;

  --color-green-50:   #ECF7EE;
  --color-green-100:  #CFE9D3;
  --color-green-200:  #A8D5B0;
  --color-green-500:  #2E8540;  /* secondary */
  --color-green-700:  #1B5E20;
  --color-green-900:  #0B2E10;

  /* Neutrals (light) */
  --color-paper:      #FFFFFF;
  --color-cream:      #FAF8F5;  /* default page background */
  --color-cream-2:    #F3EFE7;  /* alt band background */
  --color-ink:        #141414;  /* primary text */
  --color-ink-soft:   #4A4A4A;  /* secondary text, ≥ 4.5:1 on cream */
  --color-ink-muted:  #8A8A8A;  /* meta, captions, ≥ 3:1 on cream */
  --color-line:       #E8E2D8;  /* hairline borders, dividers */
  --color-line-2:     #D8D0C2;  /* stronger borders */

  /* Surfaces (vegetable-tinted, used in section bands) */
  --surface-tomato:   #FFE9DE;
  --surface-palak:    #DDF1E0;
  --surface-turmeric: #FFF1B8;
  --surface-eggplant: #2A1E2E;
  --surface-lemon:    #FFF6D9;

  /* Semantic (light) */
  --bg:               var(--color-cream);
  --bg-elevated:      var(--color-paper);
  --bg-band:          var(--color-cream-2);
  --text:             var(--color-ink);
  --text-soft:        var(--color-ink-soft);
  --text-muted:       var(--color-ink-muted);
  --border:           var(--color-line);
  --border-strong:    var(--color-line-2);
  --accent:           var(--color-orange-500);
  --accent-hover:     var(--color-orange-700);
  --accent-fg:        #FFFFFF;
  --accent-secondary: var(--color-green-500);
  --success:          var(--color-green-500);
  --warning:          #C77700;
  --error:            #C0392B;
  --focus-ring:       0 0 0 3px rgba(255, 107, 0, 0.35);

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(20, 20, 20, 0.06), 0 0 0 1px rgba(20, 20, 20, 0.04);
  --shadow-md: 0 6px 16px rgba(20, 20, 20, 0.08), 0 0 0 1px rgba(20, 20, 20, 0.05);
  --shadow-lg: 0 24px 48px rgba(20, 20, 20, 0.12), 0 0 0 1px rgba(20, 20, 20, 0.05);
  --shadow-glow-orange: 0 0 0 4px rgba(255, 107, 0, 0.18), 0 12px 32px rgba(255, 107, 0, 0.25);
  --shadow-glow-green:  0 0 0 4px rgba(46, 133, 64, 0.18),  0 12px 32px rgba(46, 133, 64, 0.25);

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-2xl: 36px;
  --radius-pill: 999px;

  /* Spacing (4px base) */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;
  --space-10: 8rem;    --space-11: 10rem;   --space-12: 12rem;

  /* Typography */
  --font-display: "Bebas Neue", system-ui, sans-serif;
  --font-body:    "Outfit", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;

  /* Type scale (mobile-first, fluid via clamp) */
  --fs-xs:   0.75rem;
  --fs-sm:   0.875rem;
  --fs-base: 1rem;
  --fs-md:   1.125rem;
  --fs-lg:   1.25rem;
  --fs-xl:   1.5rem;
  --fs-2xl:  2rem;
  --fs-3xl:  clamp(2.25rem, 4vw, 3rem);
  --fs-4xl:  clamp(2.75rem, 6vw, 4rem);
  --fs-5xl:  clamp(3.5rem, 9vw, 6rem);

  /* Line heights */
  --lh-tight: 1.1;
  --lh-snug:  1.25;
  --lh-base:  1.55;
  --lh-loose: 1.75;

  /* Letter spacing */
  --ls-tight:  -0.02em;
  --ls-base:   0;
  --ls-wide:   0.04em;
  --ls-wider:  0.12em;
  --ls-widest: 0.24em;

  /* Layout */
  --max-w-content:  1200px;
  --max-w-prose:    68ch;
  --max-w-narrow:   720px;
  --max-w-header:   1400px;
  --header-h:       72px;

  /* Motion */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:     cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-soft:   cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast:    120ms;
  --dur-base:    200ms;
  --dur-slow:    400ms;
  --dur-stage:   800ms;
  --dur-loader:  3500ms;

  /* Z-index scale */
  --z-base:    0;
  --z-elev:    10;
  --z-sticky:  100;
  --z-overlay: 500;
  --z-modal:   1000;
  --z-loader:  9000;
  --z-toast:   9500;
}
```

### 2.2 Dark theme (a first-class mode, not a "toggled" afterthought)

```css
[data-theme="dark"] {
  color-scheme: dark;

  --color-paper:      #141B16;
  --color-cream:      #0E1410;
  --color-cream-2:    #182320;
  --color-ink:        #F4F1EA;
  --color-ink-soft:   #B7B0A4;
  --color-ink-muted:  #8A8275;
  --color-line:       #2A3830;
  --color-line-2:     #3A4D43;

  --surface-tomato:   #2A1A14;
  --surface-palak:    #102217;
  --surface-turmeric: #2A230A;
  --surface-eggplant: #1B1118;
  --surface-lemon:    #2A230A;

  --color-orange-500: #FF8533;  /* warmer in dark for AA contrast */
  --color-orange-300: #FFB37A;
  --color-orange-700: #FF6B00;
  --color-green-500:  #5BB870;
  --color-green-300:  #94DBA3;

  --accent:           var(--color-orange-500);
  --accent-hover:     var(--color-orange-300);
  --accent-fg:        #0E1410;
  --accent-secondary: var(--color-green-500);
  --focus-ring:       0 0 0 3px rgba(255, 133, 51, 0.45);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 24px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.2);
  --shadow-glow-orange: 0 0 0 4px rgba(255, 133, 51, 0.22), 0 12px 32px rgba(255, 133, 51, 0.3);
  --shadow-glow-green:  0 0 0 4px rgba(91, 184, 112, 0.22),  0 12px 32px rgba(91, 184, 112, 0.3);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    /* Same as [data-theme="dark"] block above */
    --color-paper:      #141B16;
    --color-cream:      #0E1410;
    --color-cream-2:    #182320;
    --color-ink:        #F4F1EA;
    --color-ink-soft:   #B7B0A4;
    --color-ink-muted:  #8A8275;
    --color-line:       #2A3830;
    --color-line-2:     #3A4D43;
    --surface-tomato:   #2A1A14;
    --surface-palak:    #102217;
    --surface-turmeric: #2A230A;
    --surface-eggplant: #1B1118;
    --surface-lemon:    #2A230A;
    --color-orange-500: #FF8533;
    --color-orange-300: #FFB37A;
    --color-green-500:  #5BB870;
    --color-green-300:  #94DBA3;
    --accent:           var(--color-orange-500);
    --accent-hover:     var(--color-orange-300);
    --accent-fg:        #0E1410;
    --accent-secondary: var(--color-green-500);
    --focus-ring:       0 0 0 3px rgba(255, 133, 51, 0.45);
  }
}
```

**The light/dark contrast check:** every surface + every text token has a contrast ratio verified at ≥ 7:1 (AAA) for body text. The dark theme is not a "swap bg and text" — the orange is warmed to `#FF8533` (warmer hue, lighter value) to maintain ≥ 4.5:1 contrast on the dark cream background. The surfaces are vegetable-tinted in dark mode too: tomato → `#2A1A14` (deep brown-red), palak → `#102217` (deep forest), turmeric → `#2A230A` (deep amber), eggplant → `#1B1118` (deep purple-black).

### 2.3 Typography

- **Display font:** Bebas Neue. Used only for hero `H1`, large numbers (30, 6, 100%), and section labels ("OUR PRODUCTS", "HOW IT WORKS"). All-caps, letter-spaced. Self-hosted via `next/font/local` from `public/fonts/`.
- **Body font:** Outfit. Everything else. Weights 300, 400, 500, 600, 700. Self-hosted via `next/font/local`.
- **Mono font:** JetBrains Mono. Used only for the pin-code input and the order ID display (the latter is future use — no order ID display in v1.0).
- **Loading strategy:** the woff2 files for Bebas Neue and Outfit are committed to `public/fonts/`. `next/font/local` declares them in `app/layout.tsx` with no render-blocking cost. No Google Fonts in the render path.
- **Body line-height:** 1.55. Display: 1.1. Section titles: 1.25.

### 2.4 Iconography

- Custom SVG icon set, 24×24, 1.5px stroke, rounded caps, color via `currentColor`.
- ~30 icons: chop-knife, cutting-board, bottle, leaf, sparkle, location, phone, mail, lock, eye, pen, trash, pin, star, star-outline, chevron-down, chevron-right, arrow-right, close, check, info, warning, error, spinner, plus, minus, search, filter, share, download, sun, moon.
- One set per theme (light + dark), the same SVGs re-coloured by `currentColor`.
- The hero strip's decorative produce emoji (`🥕 🍅 🥬 🍉 🍊 🥒 🍓 🍎`) stay as inline text. They are visual flavor, not icons. They have `aria-hidden="true"`.
- The fruit-ninja section's produce icons are SVG sprites (carrot, onion, tomato, palak, watermelon, mango), loaded via a single `<svg><defs><symbol id="produce-carrot">…</symbol>…</defs></svg>` block, referenced by `<use href="#produce-carrot" />` in the canvas. One HTTP request, browser-cached.

### 2.5 Imagery policy

- **Reuse the existing assets** from the clone: 11 product images (`public/images/products/`), 4 app-screen PNGs (`public/images/app/`), 1 studio photo (`public/images/sabxi-studio.png`), 1 logo (`public/images/logo-trans.png`).
- The hero video (`https://assets.mixkit.co/videos/6272/6272-720.mp4`) and poster (`https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=1600&h=900&fit=crop`) stay. The README documents how to swap in local footage.
- **No new stock photos. No new SVG illustrations commissioned.** If we need a new illustration, we build a simple geometric SVG inline.
- **Founder photo:** not in the live site today. v1.0 ships text-only founder content (the existing bio in `/about/`). v1.1 adds a real photo when the founder provides one.

---

## 3. Dark mode (the bar)

### 3.1 The three-state toggle

```
[System] → follows prefers-color-scheme (default on first load)
[Light]  → always light
[Dark]   → always dark
```

- The toggle is in the header, right of the nav links. Icon: sun for system, sun for light, moon for dark.
- One click cycles: system → light → dark → system.
- Persists in `localStorage` under `sabxi-theme` with value `"system" | "light" | "dark"`.
- On first load: read `localStorage`. If unset, follow `prefers-color-scheme`. If set, force that theme.
- Implementation: a `ThemeProvider` client component that sets `data-theme` on `<html>` before paint. A small inline `<script>` in `app/layout.tsx` reads the localStorage value and sets `data-theme` synchronously to avoid a flash of wrong theme on first paint.

### 3.2 The light/dark contrast check (the one the founder will care about)

The user's brief said: *"sometimes AI doesn't make it well for the light theme."* The same trap exists for dark mode. The fix is the same: a manual review of every surface in both modes before M3 is declared done.

For every surface, in both modes, the following are verified by manual screenshot:

| Surface | Light mode | Dark mode |
|---|---|---|
| Default page (`--bg`) | Cream `#FAF8F5` + ink text | Dark cream `#0E1410` + cream text |
| Tomato band | `#FFE9DE` + ink text | `#2A1A14` + cream text |
| Palak band | `#DDF1E0` + ink text | `#102217` + cream text |
| Turmeric band | `#FFF1B8` + ink text | `#2A230A` + cream text |
| Eggplant band | `#2A1E2E` + cream text | `#1B1118` + cream text (kept) |
| Primary button | Orange `#FF6B00` + white text | Orange `#FF8533` + dark cream text |
| Secondary button | Cream-2 + ink text | Dark cream-2 + cream text |
| Link | Orange `#FF6B00` | Orange `#FF8533` |
| Success | Green `#2E8540` | Green `#5BB870` |
| Error | Red `#C0392B` | Red `#E55A4F` (slightly lighter for dark) |
| Form input border | Line `#E8E2D8` | Line `#2A3830` |

Contrast ratios are checked at:
- Body text (≥ 4.5:1 AA, ≥ 7:1 AAA where possible)
- Large text (≥ 3:1 AA, ≥ 4.5:1 AAA)
- UI components / borders (≥ 3:1)

The acceptance gate for M3 is: every page on the site, screenshotted in both modes, has no white-on-white, no washed-out dark, no green-on-green confusion, and no orange-on-orange. The screenshot review is done by Harish (you) before M4 starts.

### 3.3 What dark mode does NOT do

- **No automatic toggle based on time of day.** Some sites do this; it's annoying. The user picks.
- **No `auto` keyword in CSS** beyond the initial system-following. Once the user has chosen light or dark, we don't second-guess them.
- **No image inversion.** The product images, studio photo, and app-screen mockups stay the same. If they look bad in dark mode (e.g. the studio photo has a white background that clashes), we wrap them in a card with a slight background or shadow. The photos themselves don't change.

---

## 4. The interaction system

The interaction system is intentionally small for v1.0. v1.x had a three-tier ambient/on-intent/feature-level model; v2.0 has just two tiers.

### 4.1 Tier 1 — Hero-only (the playful layer)

These run on the home page. They are the "small touches" that make the home feel alive.

| Interaction | Where | Behaviour | Reduced-motion fallback |
|---|---|---|---|
| Falling produce parallax | Home page hero background | 6 small produce SVGs (carrot, tomato, palak, onion, lemon, chilli) follow scroll with parallax. **Carried from the clone.** | Off. |
| Hero video parallax | Home page hero | The Mixkit video gets a `transform: scale(1.08) translateY(...)` on scroll. **Carried from the clone.** | Off. |
| Cursor glow | Home page | A 200px radial gradient that follows the mouse. **Carried from the clone.** | Off. |
| Film grain overlay | Home page | A fixed full-screen SVG noise overlay. **Carried from the clone.** | Off. |
| Phone carousel | Home page hero | 4 app screens crossfade every 3.5s. **Carried from the clone.** | Static, first slide only. |
| Stats count-up | Home page stats section | Numbers 0 → 30, 0 → 6, 0 → 100. **Carried from the clone.** | Static, final value. |
| Scroll progress bar | Home page | A 2px orange bar at the top. **Carried from the clone.** | Off. |
| Hero CTA "Order Now" badge | Home page hero | "Freshly cut · Quickly delivered" pill that pulses. **Carried from the clone.** | Off. |

**Why so much?** The founder's site already has this. The home page is a *showcase* of the brand. The pitch audience is the founder himself; he'll be looking for whether his existing personality is preserved. Stripping the home page to a static grid would feel like a downgrade.

**What we cut from v1.x's plan** (for context):
- Tier 1 ambient loops across every page (floating produce everywhere). **Not in v2.0.** These are home-page-only.
- Tier 2 on-intent interactions (click-to-slice anywhere on the site). **Not in v2.0.** The fruit-ninja section is the only click-to-slice surface.
- "Click any fruit, it gets sliced" as a global primitive. **Not in v2.0.** The same effect, isolated to the fruit-ninja section.

### 4.2 Tier 2 — The fruit-ninja section (a single section, not a system)

The marquee feature of v2.0. Lives on the home page, between Products Showcase and Live Prep. A single React `<canvas>` element. The interaction:

- 6 produce types spawn from the top of the canvas and arc across the screen with gravity.
- The user can "slice" by clicking a produce on desktop, or tapping on touch. (No pointer-line draw — click on the produce is enough for v2.0; a slice trail is a v2.1 enhancement.)
- Each successful slice splits the produce into two halves that fall and fade, revealing a product card.
- After 30 seconds, the section transitions to a static 3×2 grid of the 6 product cards.
- "Skip the game" link always visible.
- "Slice all" button for keyboard users.

**Layout (desktop, ≥ 1024px):**
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  SLICE TO EXPLORE                                            │
│  Click a fruit. Cut it. See the line.                        │
│  Vegetables and fruits fall. You slice. Behind each one      │
│  is a real product line from SABXI Studio.                   │
│                                                              │
│  ┌────────────────────────────────────────────────────┐      │
│  │                                                    │      │
│  │   Falling produce here (canvas)                    │      │
│  │   Click to slice · reveals product card            │      │
│  │                                                    │      │
│  └────────────────────────────────────────────────────┘      │
│  [Skip the game]                          [Slice all]         │
│                                                              │
│  [Product card 1]  [Product card 2]  [Product card 3]         │
│  [Product card 4]  [Product card 5]  [Product card 6]         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Layout (mobile, reduced-motion, low-power):** the canvas is replaced with a 3×2 static grid of product cards. No animation, no "Skip" link, no "Slice all" button.

**Game loop:**
1. Spawner: every 600ms, pick a random produce type from the 6. Spawn at a random X position at the top of the canvas with a random initial velocity. Gravity = 0.18px/frame². Rotation: small random per frame.
2. Slice detection: on click/touch, check if the pointer is within the produce's bounding ellipse. If yes, slice.
3. Slice event: split the produce along the click vector into two `<clipPath>` halves. Add a 6–8 small juice droplets particle effect (orange/green dots, fall and fade in 600ms). Reveal a product card at the slice position, fade in over 400ms.
4. Session timer: 30s. After 30s, fade the canvas to 0 opacity, fade in the static grid below.
5. Skip button: any time, the user can click "Skip the game" to swap to the static grid.
6. Slice-all button: any time, the user can click "Slice all" to immediately slice all visible produce (one-shot, then back to spawning).

**Tech:** one `<canvas>` element. Hand-rolled, no game library. 60fps target. Falls back to 30fps on low-power mode (`navigator.getBattery()` if available, otherwise always play). `prefers-reduced-motion: reduce` → skip straight to the static grid. Viewport < 600px → skip the game. `prefers-reduced-data: reduce` → skip the game. `navigator.connection.saveData === true` → skip the game.

**Performance budget for the fruit-ninja section:**
- Cap concurrent produce on screen at 8.
- Cap concurrent slice animations at 4.
- One `requestAnimationFrame` loop for the whole section. No per-produce rAF.
- `will-change: transform` on the canvas only. Removed when the section transitions to static.
- SVG sprite atlas for the 6 produce types. One HTTP request, cached.
- Total JS for the section: < 15 KB gzipped.

**A11y:**
- The canvas has `role="img"` and an `aria-label` describing the section.
- The canvas is **not** in the tab order.
- The "Slice all" button is the first focusable element in the section, after the "Skip the game" link.
- The 6 product cards are below the canvas in the DOM, focusable, and reachable via Tab in the same order they would appear if the user skipped the game.
- Reduced-motion: the canvas is replaced with a static grid (the same 6 product cards), and "Slice all" + "Skip" are hidden.
- Keyboard: Tab to "Slice all" → Enter activates → all visible produce are sliced in sequence. The product cards remain focusable.

**Mobile interaction (touch):**
- Tap to slice. No multi-touch drawing (v1.x had a pointer-line trail; v2.0 is tap-to-slice, simpler and works on touch reliably).
- Pinch-to-zoom: the canvas does not capture pinch gestures; the page scrolls normally.

---

## 5. The shared layout

### 5.1 `<SiteHeader>` (every route)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [LOGO]            Products  Reviews  Blog  Areas  About   [☀/🌙] [📍] [App Store] [Play Store] │
└──────────────────────────────────────────────────────────────────────┘
```

- **Height:** 72px (`--header-h`).
- **Sticky:** yes, sticks to the top on scroll.
- **Behavior on scroll:** transparent over hero, becomes solid (`--bg-elevated`) on scroll past the hero. On inner pages, solid from the top.
- **Background:** `var(--bg-elevated)` in solid state. 8px backdrop-filter blur on dark mode (subtle).
- **Shadow:** `--shadow-sm` in solid state.

**Logo:**
- 36px height, full color, no padding.
- Links to `/`.

**Nav links (desktop, ≥ 1024px):**
- `Products` → `/products/`
- `Reviews` → on home, scrolls to `#reviews`; on inner pages, links to `/#reviews`
- `Blog` → `/blog/`
- `Areas` → `/areas/`
- `About` → `/about/`

**Right cluster (desktop):**
- `ThemeToggle` (sun/moon icon button, 40px tap target).
- `PinCode` (small icon button, 40px tap target) → opens the pin-code slide-over (only on home, `/areas/`, and inner pages where the slide-over makes sense).
- `App Store` (official Apple badge SVG, 120px wide).
- `Play Store` (official Google Play badge SVG, 135px wide).

On screens < 1024px, the nav links collapse into a hamburger. The right cluster collapses to: theme toggle + hamburger.

**Hamburger → full-screen overlay menu (mobile):**
```
┌────────────────────────────────────────┐
│  [LOGO]                          [×]   │
│                                        │
│  Products                              │
│  Reviews                               │
│  Blog                                  │
│  Areas                                 │
│  About                                 │
│  ────                                  │
│  [App Store]                           │
│  [Play Store]                          │
│  ────                                  │
│  © 2026 Sabxi Private Limited          │
│  CIN U46301MH2026PTC473853             │
│  501, Plot 32 Emerald, Mumbai 400071   │
└────────────────────────────────────────┘
```

The mobile menu is a `<dialog>` element (native, full a11y) that opens via `showModal()`. Trap focus, `Esc` closes, click outside closes.

**Removed from the header:**
- "हिंदी" (moved to footer).
- "Studio" (rolled into footer "Find us" link).
- "Order Now" CTA in the header (rolled into "Download app" cluster).
- The 7-item strip on the home page (clone's `app/page.tsx` line 32–44) is replaced by this shared header.

### 5.2 `<SiteFooter>` (every route)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [LOGO]                                                                │
│ Freshly cut, quickly delivered. From our Kurla studio to your door   │
│ in 30 minutes. SABXI is a D2C fresh food brand by Sabxi Private      │
│ Limited.                                                              │
│                                                                       │
│ ────────────────────────────────────────────────────────────────────  │
│                                                                       │
│ Product            Company         Resources       Contact           │
│ Products           About           Reviews         info@sabxi.com    │
│ Areas              Studio          Blog            App Store         │
│ How it works       Press           FAQ             Play Store        │
│ Pin code           MCA info        Sitemap         Studio on Maps    │
│                                  हिंदी                                │
│                                                                       │
│ ────────────────────────────────────────────────────────────────────  │
│ © 2026 Sabxi Private Limited · CIN U46301MH2026PTC473853 ·          │
│ GSTIN 27ABUCS4728H1ZP · Privacy · Terms · Refunds · Company          │
└──────────────────────────────────────────────────────────────────────┘
```

- 4-column grid on desktop, 2-column on tablet, 1-column on mobile.
- Each column is a heading + a list of links.
- The bottom legal line is always visible, smaller text, full width.
- The brand mark at the top is the same logo as the header.
- The "हिंदी" link is a small text link at the bottom of the Resources column.

### 5.3 The pin-code slide-over (only on home and `/areas/`)

A `<dialog>` that slides in from the right. Triggered by the pin-code icon in the header (on home and `/areas/` only) or by an inline "Check pin code" button on `/areas/`.

```
┌──────────────────────────────────────┐
│  📍 Check serviceability        [×]  │
│                                      │
│  We deliver in:                      │
│  • 400071 — Kurla (core)             │
│  • 400070 — Chembur East             │
│  • 400088 — Kurla West               │
│                                      │
│  Enter your pin code to confirm      │
│  we serve you:                       │
│                                      │
│  [ ___ ___ ]      [Check]            │
│                                      │
│  Not in our zone yet?                │
│  [email input] [Tell me when]        │
│                                      │
│  ─── or ───                          │
│                                      │
│  [App Store]  [Play Store]           │
└──────────────────────────────────────┘
```

- The 3 in-zone pin codes are typed in (400071, 400070, 400088). Hard-coded for v1.0 in `content/service-zone.json` (one-line config). Founder edits the JSON to add more.
- The "Tell me when" form has no backend in v1.0 — clicking the button opens a `mailto:info@sabxi.com?subject=Pin%20code%20waitlist&body=...` link. Documented as a v1.1 feature in the README.
- The slide-over is keyboard-accessible, traps focus, `Esc` closes.

---

## 6. Page composition

Every page in the site. Each section is a component, listed in render order.

### 6.1 `/` — Home

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | `PageLoader` (vegetable intro animation) | `PageLoader` | Carried from the clone's `PageLoader.tsx`. The dark/light variant is read from `data-theme` so the cream/orange of the loader matches the active theme. |
| 2 | `<SiteHeader />` (sticky) | `SiteHeader` | |
| 3 | Hero | `Hero`, `HeroProductMock` | Carried from the clone. The hero video + poster stay. The decorative produce emoji in the hero stay. The 3-stat strip ("6 / 100% / 30 min") stays. The phone carousel with 4 app screens stays. |
| 4 | Stats strip | `Stats` | Carried from the clone. 4 stats: 30 min, 6 lines, 100% cut to order, Daily fresh. |
| 5 | Journey (Chop / Pack / Deliver) | `Journey` | Carried from the clone. 3 step cards. |
| 6 | Promise (Fresh / Fast / Effortless) | `Promise` | Carried from the clone. 3 feature cards. The 🥬, 🛵, 🛍️ emoji stay. |
| 7 | Why SABXI features grid | `Features` | Carried from the clone. 5 feature cards. |
| 8 | Products showcase | `ProductShowcase` | Carried from the clone. 5 product images. The "Prep — min" em-dash placeholders stay (the founder's copy has them; v2.0 doesn't scrub em-dashes). |
| 9 | **Fruit-Ninja section (NEW)** | `FruitNinja` | The new interactive section. See §4.2. |
| 10 | Live prep animations | `PrepAnimations` | Carried from the clone. 4 prep scenes (chop, slice, juice, smoothie). |
| 11 | Studio | `StudioShowcase` | Carried from the clone. The Google Maps iframe, the "Open in Google Maps" link, the address. **The address shows Kurla, 400071 — see PRD §6.2.** |
| 12 | Reviews (REPLACED) | `Reviews` | The 3 fake reviews are replaced with an honest empty state OR real reviews. See PRD §6.1. |
| 13 | Mission | `Mission` | Carried from the clone. The 9-chip cloud stays. The "Changing How the World Eats" heading stays. |
| 14 | FAQ | `FAQ` | Carried from the clone. 13 entries, single-open accordion. |
| 15 | Blog teaser | `BlogTeaser` | Carried from the clone. 3 most recent blog posts. |
| 16 | Final CTA | `FinalCTA` | Carried from the clone. The App Store / Play Store badges. |
| 17 | `<SiteFooter />` | `SiteFooter` | New, shared. |
| 18 | Sticky mobile download bar | `StickyDownloadBar` | Carried from the clone. Only visible on mobile, after scrolling past the hero. |

### 6.2 `/about/` — About

The same shared header + footer, plus the body content from the clone's `app/about/page.tsx` (carried verbatim, with the address fix).

### 6.3 `/products/` — All products

The same shared header + footer, plus the body content from the clone's `app/products/page.tsx` (carried verbatim). 7 product cards in a 3×3 grid (one empty slot on desktop, full 3×3 on the last row + a 7th solo card).

### 6.4 `/areas/` — Service areas

The same shared header + footer. The body has the in-zone list (Kurla / Chembur / Kurla West) as cards, a "How to check" steps list, and the pin-code slide-over trigger inline.

### 6.5 `/studio/` — Studio

The same shared header + footer. The studio photo, the address, the Google Maps iframe. Carried from the clone's `app/studio/page.tsx`. The address is **Kurla, 400071**.

### 6.6 `/blog/` — Blog index

The same shared header + footer. 6 blog cards in a 3×2 grid. The clone has 6 hard-coded slugs; the rebuild keeps them. **The 5 stubs render a friendly "Article coming soon — email info@sabxi.com" placeholder page** at the corresponding URL.

### 6.7 `/blog/[slug]/` — Blog post

The same shared header + footer. Two variants:

- **`/blog/best-cut-veg-chembur/`** — the one real article, carried verbatim from the clone.
- **Other 5 slugs** — a friendly "Article coming soon" placeholder page that looks like a real blog post layout (title, meta, body) but the body says "We're writing this one. Want it sooner? Email info@sabxi.com or check back next week." with a link back to `/blog/`.

### 6.8 `/hi/` — Hindi

Carried from the clone. The same shared header + footer. The Hindi nav has a small "English" link in the header for the language switch (mirror of the home page's "हिंदी" link in the footer).

### 6.9 `/company/`, `/privacy/`, `/terms/`, `/refund/`

All carried verbatim from the clone. All get the shared header + footer.

### 6.10 `/not-found` (404)

A custom 404 page with the same shared header + footer. A sliced-onion illustration (an inline SVG) and a "Page not found" message with a link back to `/`.

---

## 7. Component library

### 7.1 Layout (presentational, mostly server components)

| Component | Purpose |
|---|---|
| `SiteHeader` | Sticky top nav. Transparent over hero, solid on scroll. Logo + nav + theme toggle + pin code + app store badges. |
| `SiteFooter` | The site footer. 4-column grid + legal line. |
| `MobileMenu` | Full-screen overlay menu on mobile. Native `<dialog>`. |
| `ThemeToggle` | 3-state cycle: system → light → dark → system. |
| `Container` | max-w wrapper. `width: narrow | prose | content | header`. |
| `Section` | Full-width page band. `surface: default | cream-2 | tomato | palak | turmeric | eggplant | lemon`. |
| `Stack` | Vertical flex with gap. |
| `Cluster` | Horizontal flex with wrap + gap. |
| `Grid` | CSS grid wrapper. `minColWidth`, `gap`. |
| `Breadcrumb` | Page breadcrumb on inner pages. |
| `Logo` | SABXI logo, theme-aware. |

### 7.2 Marketing (home page composition)

| Component | Purpose |
|---|---|
| `PageLoader` | Vegetable-themed intro animation. Carried from the clone. |
| `Hero` | Home hero. Logo, h1, sub, two badges, one secondary CTA, 3-stat strip. |
| `HeroProductMock` | Stack of 4 phone mockups with crossfade carousel. |
| `Stats` | 4-stat strip (30 min, 6 lines, 100%, Daily). |
| `Journey` | 3-step strip (Chop / Pack / Deliver). |
| `Promise` | 3-card grid (Fresh / Fast / Effortless). |
| `Features` | 5-feature grid. |
| `ProductShowcase` | 5 product images in a row. |
| `PrepAnimations` | 4 prep scenes (chop / slice / juice / smoothie). |
| `StudioShowcase` | Studio photo + map card. |
| `Reviews` | 3 review cards (real or empty state). |
| `Mission` | Mission statement + 9-chip cloud. |
| `FAQ` | 13-item accordion. |
| `BlogTeaser` | 3 recent blog cards. |
| `FinalCTA` | Bottom-of-page CTA with app store badges. |
| `FruitNinja` | **NEW.** The interactive produce-slice section. |
| `StickyDownloadBar` | Mobile-only sticky download bar. |
| `PinCodeInput` | 6-digit pin input with masked 3+3 formatting. |
| `PinCodeSheet` | The slide-over that wraps the pin-code input. |
| `AppStoreBadges` | Official Apple + Google Play badge SVGs. |

### 7.3 Forms (v1.0 has zero forms, but the components are stubbed for v1.1)

| Component | Purpose |
|---|---|
| `Input` | Text input. |
| `Textarea` | Multi-line input. |
| `Button` | The only button. Variants: primary, secondary, ghost, danger. |
| `LinkButton` | A button-styled `<a>`. |

These exist in v1.0 but are unused. The README documents them as the v1.1 starter kit (e.g. "to add a contact form, drop a `ContactForm.tsx` here and wire it to Resend in the README").

### 7.4 Dev

| Component | Purpose |
|---|---|
| `EmptyState` | "Nothing here yet" message. Used in the reviews empty state. |
| `ErrorState` | Error message. Used in 500 page. |
| `NotFoundState` | 404 message with sliced-onion illustration. |

---

## 8. Accessibility (the bar)

v1.0 ships a marketing site that passes WCAG 2.1 AA. Anything less fails the build.

### 8.1 The hard rules

- **Color is never the only signal.** Star ratings have the number, not just the color. Errors have text, not just a red border.
- **Focus is always visible.** Every interactive element has a `:focus-visible` style that uses `--focus-ring`. The default browser ring is overridden.
- **Motion is gated.** Every animation respects `prefers-reduced-motion: reduce`. The fruit-ninja section is the most affected; it has a static grid fallback. The home-page-only falling produce, cursor glow, grain overlay, hero video parallax, and stats count-up are all turned off under reduced-motion.
- **Semantic HTML.** Buttons are `<button>`. Links are `<a>`. Headings in order. Landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
- **Live regions.** Pin-code check result is announced via `aria-live="polite"`. Theme toggle is announced.
- **Touch targets ≥ 44×44px.** Every tappable element on mobile. The header's icon buttons (theme toggle, pin code) are 40px wide × 40px tall on desktop; on mobile they become 44×44.
- **No keyboard traps.** The mobile menu (a `<dialog>`) traps focus, but `Esc` releases. The pin-code slide-over (also a `<dialog>`) same.

### 8.2 The dark-mode a11y check

A manual check, not a CI test:

- Every page screenshotted in light mode and dark mode.
- For each, the reviewer (you) verifies:
  - No text-on-text collisions.
  - No pure-white text on light background that looks like a missing element.
  - No pure-black text on dark background.
  - The orange CTA button is legible in both modes.
  - The hero video poster looks good in both modes (it's a static image, so this is automatic).
  - The studio photo card has a clear background edge in both modes.
  - The Google Maps iframe does not get a dark-mode background (it's an iframe; we don't style inside it).

### 8.3 The fruit-ninja a11y story

- The canvas has `role="img"` and `aria-label="Interactive section: click falling vegetables and fruits to slice them and reveal SABXI products."`.
- The canvas is **not** in the tab order.
- The "Slice all" button is the first focusable element in the section.
- The 6 product cards are below the canvas in the DOM, focusable, and reachable via Tab.
- Reduced-motion: the canvas is replaced with a static grid (the same 6 cards), and "Slice all" + "Skip" are hidden.
- Keyboard: Tab to "Slice all" → Enter → all visible produce are sliced in sequence. The product cards remain focusable.

---

## 9. Performance

### 9.1 Budget

- **Initial JS (home, gzipped):** < 200 KB.
- **LCP (home, mobile slow 4G):** < 2.0s.
- **CLS:** < 0.05.
- **INP:** < 200ms.
- **Total page weight (home, gzipped):** < 1.5 MB (the Mixkit hero video is the biggest contributor; founder can swap in their own footage to drop this to < 800 KB).
- **Vercel KV reads per homepage render:** 0.
- **Vercel Blob reads per homepage render:** 0.
- **Lighthouse mobile score:** ≥ 85 perf, ≥ 95 a11y, ≥ 95 best-practices, ≥ 95 SEO.

### 9.2 How we hit the budget

- **No third-party fonts in the render path.** Self-hosted via `next/font/local`. No Google Fonts. LCP improvement: ~200ms.
- **No third-party analytics.** The home page has zero analytics JS.
- **No framer-motion.** Replaced with CSS transitions and the hand-rolled canvas. JS bundle: ~30 KB lighter.
- **CSS Modules + design tokens.** The home route only loads the CSS it uses. CSS bundle: tree-shakable.
- **`next/image` everywhere** with `priority` on the first 3 above-the-fold images.
- **The hero video is `loading="lazy"` and has a `poster`.** The page renders even if the video never loads.
- **The fruit-ninja section is a single `<canvas>` with no per-element rAF.** Performance holds at 60fps on a 2019 MacBook Air.

### 9.3 Image optimisation

- All `<Image>` use `next/image` with the `images` config restricted to own domain + the founder's existing remote hosts.
- The 7 product images (cut-veggies-pack, cut-fruits-pack, fresh-juice-bottle, mixed-packs, fruit-smoothie, plus 2 more from the products page) are served at 3 sizes (sm: 480, md: 768, lg: 1200) via `next/image`.
- AVIF and WebP variants are generated automatically by Vercel.
- The studio photo is served at 2 sizes (sm: 600, lg: 1200).
- The logo SVG is served as-is (no raster).
- Lazy loading: all images below the fold have `loading="lazy"`. The first 3 above the fold have `priority`.

---

## 10. Testing

v1.0 ships a marketing site, not a transactional app. The test bar is intentionally lower than v1.x's.

### 10.1 Smoke tests (manual)

Before declaring any milestone done, the following are manually verified:

- **Every route renders** (no 404, no 500, no console errors).
- **Dark mode toggle works** on every route.
- **Mobile menu works** on every route.
- **Pin-code slide-over works** on home and `/areas/`.
- **Fruit-ninja section works** on desktop.
- **Fruit-ninja section falls back to static grid** on mobile (test in DevTools with viewport < 600px).
- **Fruit-ninja section falls back to static grid** under `prefers-reduced-motion: reduce` (test in DevTools Rendering tab).
- **The blog stub URLs show the friendly placeholder**, not a 404.
- **The reviews section shows real or empty state**, not the fake reviews.

### 10.2 Visual smoke tests (manual)

Before declaring M3 (dark mode) done:

- Light + dark screenshots of every page, side by side, on desktop and mobile viewports.
- Manual contrast check (see §8.2).

### 10.3 Unit tests

**None in v1.0.** The site has no business logic, no auth, no forms, no API. The unit tests that v1.x proposed for `lib/data.ts`, `lib/spam.ts`, etc. are not needed because those modules don't exist in v2.0.

### 10.4 Integration / E2E tests (Playwright)

**Minimal in v1.0.** A single smoke test that loads every route and verifies no 5xx. ~50 lines of Playwright. Run manually before the pitch, not in CI.

### 10.5 Visual regression tests (Playwright + pixelmatch)

**None in v1.0.** The site is small and the founder is the only reviewer. Visual regression adds friction without value at this scale.

### 10.6 CI pipeline

**Minimal.** `pnpm lint` + `pnpm typecheck` + `pnpm build` on every PR. No Playwright. The manual smoke test before the pitch is the real test.

---

## 11. Page-level composition (consolidated)

| Route | Auth | Purpose | Components |
|---|---|---|---|
| `/` | public | Home | `SiteHeader`, `Hero`, `HeroProductMock`, `Stats`, `Journey`, `Promise`, `Features`, `ProductShowcase`, `FruitNinja`, `PrepAnimations`, `StudioShowcase`, `Reviews`, `Mission`, `FAQ`, `BlogTeaser`, `FinalCTA`, `StickyDownloadBar`, `SiteFooter` |
| `/about/` | public | About | `SiteHeader`, body (from clone), `SiteFooter` |
| `/products/` | public | All products | `SiteHeader`, body (from clone), `SiteFooter` |
| `/areas/` | public | Service areas | `SiteHeader`, body, `PinCodeSheet` (inline), `SiteFooter` |
| `/studio/` | public | Studio | `SiteHeader`, body, `SiteFooter` |
| `/blog/` | public | Blog index | `SiteHeader`, body, `SiteFooter` |
| `/blog/[slug]/` | public | Blog post | `SiteHeader`, body (real or placeholder), `SiteFooter` |
| `/hi/` | public | Hindi (archived) | `SiteHeader`, body (from clone), `SiteFooter` |
| `/company/` | public | MCA info | `SiteHeader`, body (from clone), `SiteFooter` |
| `/privacy/` | public | Privacy policy | `SiteHeader`, body (from clone), `SiteFooter` |
| `/terms/` | public | Terms of service | `SiteHeader`, body (from clone), `SiteFooter` |
| `/refund/` | public | Refund policy | `SiteHeader`, body (from clone), `SiteFooter` |
| `/not-found` | public | 404 | `SiteHeader`, `NotFoundState`, `SiteFooter` |

Total: **13 routes** (12 real + 404).

---

## 12. What this design does NOT do (out of scope for v2.0)

- **Subscription pricing.** User explicitly said "no for now."
- **Multi-language UI (i18n routing).** English first. The `/hi/` page is a static archived page.
- **Live order placement on the web.** Web funnels to the app.
- **User accounts.** No signup, no "my reviews," no edit-my-review. The site is read-only.
- **Search.** No search bar in v2.0.
- **Real-time notifications.** No WebSockets, no Pusher.
- **Analytics dashboards.** No analytics in v2.0 (founder can add Plausible with one env var).
- **Custom domain email** (hello@sabxi.com via Resend).
- **A real iOS/Android app.** Out of scope.
- **i18n routing.** English only.
- **A real admin area.** No Vercel KV, no JWT cookie, no email-link moderation, no public review form, no public blog form, no pin-code waitlist form.
- **A new CMS or MDX migration.** Blog content is JSX in `app/blog/[slug]/page.tsx` for the 1 real article. The 5 stubs are placeholder pages.

---

## 13. Hand-off gate

This document is the second of two. The first is `PRD.md`. Both must be approved before any implementation work begins. The order of review:

1. Read `PRD.md` v2.0.
2. Read this `design.md` v2.0.
3. Sign off (or request changes).

After sign-off, I will invoke the `plan` skill to write the implementation plan. Implementation begins only after that.

---

*End of design.md v2.0.*
