import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Dynamic blog route handler.
 *
 * INTENTIONAL (E1): All 6 blog slugs have dedicated static files at
 * app/blog/<slug>/page.tsx which take precedence in Next.js routing.
 * This dynamic handler is a deliberate 404 fallback for unknown slugs,
 * reserved for M9.10 when user-posted blogs get unique slugs from KV.
 * Do not delete — keep as the catch-all until that ships.
 */

export const metadata: Metadata = {
  title: "SABXI Blog",
  description:
    "Practical guides on cut-to-order produce, quick meals from Kurla, and why freshness at speed beats dark-store grocery.",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Consume params so the route stays typed; unknown slugs 404.
  await params;

  // All current slugs are handled by static files at app/blog/<slug>/page.tsx.
  // If we reach this code, the slug wasn't found — return 404.
  // Future: M9.10 will look up user-posted blogs from Vercel KV here.
  notFound();
}
