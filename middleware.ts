import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Routes that are part of the user account area (must be signed in).
 */
const isProtectedRoute = createRouteMatcher([
  "/my-reviews(.*)",
  "/my-blogs(.*)",
]);

/**
 * Routes that require admin role.
 */
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Admin routes: must be signed in AND have role=admin in publicMetadata
  if (isAdminRoute(req)) {
    const { userId, sessionClaims, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      const homeUrl = new URL("/", req.url);
      homeUrl.searchParams.set("admin_required", "1");
      return Response.redirect(homeUrl);
    }
  }

  // Protected user routes: must be signed in. We explicitly redirect
  // (rather than auth.protect()) because auth.protect() can be flaky in
  // Clerk v6 / Next 16 when the route is a server component.
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|woff2|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};
