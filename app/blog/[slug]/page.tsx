import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

/**
 * Dynamic blog route handler.
 *
 * All 6 blog slugs have dedicated static files at app/blog/<slug>/page.tsx
 * which take precedence in Next.js routing. The dynamic handler below is
 * a fallback for future blog slugs (when M9.10 ships and users can post
 * blogs that get a unique slug). For now, any slug not in the static
 * list returns 404.
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
  const { slug } = await params;

  // All current slugs are handled by static files at app/blog/<slug>/page.tsx.
  // If we reach this code, the slug wasn't found — return 404.
  // Future: M9.10 will look up user-posted blogs from Vercel KV here.
  notFound();
}
