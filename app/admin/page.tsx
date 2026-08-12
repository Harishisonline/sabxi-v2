/**
 * Admin index — placeholder.
 *
 * The middleware (app/middleware.ts) gates this route: signed-in
 * non-admin users get redirected to /, unauthenticated users to
 * /sign-in. So this page only ever renders for users with
 * Clerk publicMetadata.role === "admin".
 *
 * The full admin dashboard is built in M9.13. For now, this is a
 * minimal landing page so that the middleware redirect is testable
 * and so admins don't see a 404 after signing in.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayoutPage() {
  // Belt-and-braces: middleware already enforces this, but we double-check.
  const admin = await isAdmin();
  if (!admin) redirect("/");
  return (
    <main style={{ padding: "4rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
      <h1>Admin dashboard</h1>
      <p>
        Welcome, admin. The full moderation dashboard is coming in the
        next milestone (M9.13: review queue, blog queue, user management,
        email log). For now, use the Clerk dashboard to manage users.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/">← Back to site</Link>
      </p>
    </main>
  );
}
