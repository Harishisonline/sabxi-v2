# BetterSabxi — Complete Navbar + Site Audit + Fixes

## STEP 0: Read these files in order before doing ANYTHING

1. `.cursorrules` (project rules)
2. `IMPLEMENTATION_PLAN.md` (the build plan)
3. `PRD.md` (product spec)
4. `design.md` (visual spec)
5. `app/components/SideNav.tsx` and `app/components/SideNav.module.css` (current side nav)
6. `app/components/SiteHeader.tsx` and `app/components/SiteHeader.module.css` (current header)
7. `app/components/AuthControl.tsx` (current auth button)
8. `app/layout.tsx` (root layout)
9. `app/middleware.ts` (Clerk middleware)
10. `app/styles/tokens.css` (color tokens)

## STEP 1: Do your own audit first

Before fixing, do a fresh audit of the entire codebase. Look for:

- Bugs in the navbar (hamburger position, drawer behavior, accordion state)
- Bugs in the side nav drawer (categories expanding by default, missing sign-in, focus management)
- Bugs in Clerk auth (deprecated `createRouteMatcher`, `middleware.ts` vs `proxy.ts` naming)
- Bugs in theme handling (FOUC, dark mode contrast, missing `prefers-color-scheme` fallback)
- Bugs in metadata (`metadataBase`, missing OG image, missing Twitter card)
- Bugs in routing (`/blog/[slug]` is a dead 404 route, `/#notify` hash doesn't exist on all pages)
- Bugs in lint (14 `<img>` warnings, unused imports, unused `variant` prop)
- Bugs in SEO (no `robots.txt`, no `sitemap.xml`, no OG image)
- Bugs in git hygiene (`.hermes/` tracked, `next-env.d.ts` modified, `.cursorrules` tracked — fine to keep but audit intent)

Write your audit findings as a comment block in your first reply. Don't skip this step. If you find bugs I didn't list, that's fine — fix them too. Use the same numbering scheme (A1, A2, B1, B2, ...) so we can refer to bugs across the conversation.

## STEP 2: The user-reported nav bugs (MUST FIX)

The user reported three specific issues with the navbar. These are the most important fixes:

### N1. Drawer categories should be COLLAPSED by default

Current behavior: `SideNav.tsx` has `DEFAULT_EXPANDED = { browse: true, company: true }`. Both categories open when the drawer opens.

Required behavior: `DEFAULT_EXPANDED = { browse: false, company: false }`. The user sees only:
- 00 HOME (always visible, top-level)
- 01 BROWSE (header only, click to expand)
- 02 COMPANY (header only, click to expand)

When the user clicks a category header, the accordion expands to reveal the 4-6 links inside. When they click again, it collapses. State persists in localStorage under `sabxi-sidenav-expanded` (already implemented).

### N2. Add sign-in / account-management button to drawer footer

The drawer footer currently has only language switch + email + ©. Add a Clerk auth control element above the © line, full-width:

- If user is signed OUT: a "Sign in" button that opens Clerk's sign-in modal (use `<SignInButton mode="modal">` from `@clerk/nextjs`)
- If user is signed IN: a `<UserButton />` component from Clerk, plus the user's first name as a label (e.g. "Hi, Syed")

Reuse the existing `AuthControl.tsx` component if it can be adapted, or create a `DrawerAuthControl.tsx` if the layout needs to differ (full-width, larger tap target).

### N3. Hamburger position

The hamburger should be on the FAR LEFT of the navbar (leftmost element before the logo). This is ALREADY the case in the current code — `SiteHeader.tsx` has the hamburger as the first child of `.inner`, and the CSS has `flex-shrink: 0`. Verify by reading the code and confirm it's not in the wrong position. If you find it positioned differently anywhere, fix it. If the user's video showed it near a "company icon", that might have been the SideNav drawer's "02 COMPANY" section header that was misread as a hamburger — confirm and explain.

## STEP 3: Fix all other bugs from the audit

For each bug in the audit list (A, B, C, D, E, F sections), fix it. The most critical fixes:

1. **B1**: Replace `createRouteMatcher` with resource-based auth checks per Clerk's deprecation warning. Move auth into each protected page's `auth()` call instead of middleware. Delete `app/middleware.ts` if no longer needed.
2. **B2**: Rename `app/middleware.ts` to `app/proxy.ts` (Next.js 16+ new convention).
3. **B22**: Update `ThemeScript.tsx` to fall back to `prefers-color-scheme` when localStorage is empty.
4. **B14**: Make `metadataBase` dynamic — derive from `NEXT_PUBLIC_SITE_URL` env var, fall back to localhost in dev, sabxi.com in prod.
5. **B20**: Add an OpenGraph image (1200x630) at `app/opengraph-image.png` or generate one with `next/og`.
6. **B21**: Add `app/robots.ts` and `app/sitemap.ts` for SEO.
7. **A4 + A2**: The drawer must show the signed-in user's name and a sign-out option in the footer.
8. **A6**: Add `box-shadow: var(--focus-ring)` to `.close:focus-visible`, `.homeLink:focus-visible`, `.categoryHeader:focus-visible`, `.link:focus-visible` in `SideNav.module.css`.
9. **A8**: At width 720-1023px, hide the right cluster's app store badges and theme toggle to give the hamburger + logo room. The drawer is the only nav at this width.
10. **A10**: Replace emoji icons in ThemeToggle with inline SVGs (sun + moon) for cross-OS consistency.
11. **A9**: Save the actual `document.body.style.overflow` value, not empty string, when restoring.
12. **B6, B7, B8**: Remove unused imports / props.
13. **B5**: Don't change the `<img>` to `<Image>` everywhere — the lint warnings are pre-existing and changing them all is a perf-polish task that touches 14+ files. Just note in a comment that this is a future Lighthouse improvement. Do NOT refactor.
14. **C1, C2**: Don't touch `.hermes/` or `next-env.d.ts` — they're either build artifacts or working AI planning data.
15. **D3**: Keep `suppressHydrationWarning` on `<html>` and `<body>` for now (Clerk adds classes dynamically). Note it in a TODO.
16. **E1**: Remove `app/blog/[slug]/page.tsx` (or keep it as a proper 404 fallback but mark it intentional).
17. **E3**: Audit the `/#notify` hash in the footer — does it exist on every page? If not, link to the home page with the hash and let user scroll, or use a different routing pattern.

## STEP 4: Verification after each fix

After each fix:
1. Run `npm run build` — must succeed
2. Run `npm run lint` — should still be 0 errors
3. Run `npx tsc --noEmit` — should be clean
4. Visually verify the navbar:
   - Click hamburger on home page → drawer opens with 00 HOME + collapsed 01 BROWSE + collapsed 02 COMPANY
   - Click 01 BROWSE → it expands to show 4 links
   - Click 01 BROWSE again → it collapses
   - State persists after page reload
   - At bottom of drawer, sign-in button is visible
   - Press Esc → drawer closes
   - Click backdrop → drawer closes
   - Click a link inside drawer → navigates AND closes drawer

## STEP 5: Final commit

After all fixes pass verification, commit each fix separately with a clear message:

```
fix(sidenav): collapse categories by default (N1)
feat(sidenav): add sign-in button to drawer footer (N2)
fix(header): responsive right cluster at 720-1023px (A8)
fix(theme): respect prefers-color-scheme when localStorage is empty (B22)
feat(metadata): dynamic metadataBase + OG image (B14, B20)
feat(seo): add robots.txt and sitemap.xml (B21)
chore(middleware): migrate to resource-based auth + proxy.ts (B1, B2)
```

## RULES

1. Never break the build. Run `npm run build` after every change.
2. Never add features the user didn't ask for. They want the navbar fixed, not redesigned.
3. The user has a strict "no fabrication, no over-scope" rule. If you're not sure, ask in chat instead of guessing.
4. Don't touch the Hero, Footer, Reviews, Blog, or any other section unless the user explicitly asked. Stay focused on the navbar + the audit fixes.
5. Don't change copy / marketing text. Fix code, not words.
6. Don't add new dependencies. Everything you need is already in `package.json`.
7. Don't use `any`. Type everything strictly.
8. Don't use inline `style={}` attributes. Use CSS modules.
9. Don't commit `.env.local`, `node_modules/`, or `.next/`. They should be in `.gitignore` already.
10. If you find a bug that's NOT in my audit list, fix it. Use a new number (A20, B23, etc.) and mention it in your reply.

## DELIVERABLE

When done:
- All bugs from sections A-F are fixed (or noted as out-of-scope if they conflict with the rules)
- Build clean, lint clean, tsc clean
- All commits are clean, atomic, with messages matching the format above
- A summary of what was fixed, in the order it was fixed, with commit hashes
