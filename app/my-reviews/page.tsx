/**
 * /my-reviews — placeholder.
 *
 * Resource-based auth: unsigned users redirect to /sign-in via currentUser().
 * proxy.ts does not path-match this route. Full UI ships in M9.9 / M9.11.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function MyReviewsPage() {
  const cu = await currentUser();
  if (!cu) redirect("/sign-in/");
  return (
    <main style={{ padding: "4rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
      <h1>My reviews</h1>
      <p>
        Welcome, {cu.firstName ?? "user"}. Your submitted reviews will
        appear here once M9.9 (review CRUD) ships.
      </p>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/">← Back to site</Link>
      </p>
    </main>
  );
}
