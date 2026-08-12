import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Next.js 16 Proxy (formerly middleware.ts).
 *
 * Clerk session hydration only — no createRouteMatcher path checks.
 * Protected routes enforce auth in the page/layout via auth()/currentUser()
 * (resource-based checks). See app/admin/page.tsx and app/my-reviews/page.tsx.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
