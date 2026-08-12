/**
 * Admin index — placeholder.
 *
 * Auth is resource-based (Clerk deprecates createRouteMatcher path checks):
 * this page calls isAdmin()/auth itself. proxy.ts only hydrates the Clerk
 * session — it does not gate routes by path.
 *
 * The full admin dashboard is built in M9.13. For now, this is a
 * minimal landing page so admins don't see a 404 after signing in.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/auth";

export default async function AdminLayoutPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in/");

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
