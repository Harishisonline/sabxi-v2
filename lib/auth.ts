/**
 * Auth helpers — Clerk session + role check + KV user mirror.
 *
 * Vercel KV is deprecated. Use Upstash Redis from Vercel Marketplace instead.
 * The @vercel/kv client works with Upstash's REST API because they share the
 * same wire protocol. Env vars KV_REST_API_URL and KV_REST_API_TOKEN are
 * auto-populated by Upstash.
 */

import { currentUser } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";

/**
 * Our internal User type — a mirror of Clerk's user with app-specific fields.
 * Stored in KV at kv:users:{clerkUserId}.
 */
export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: "user" | "admin";
  createdAt: string;
};

const USER_KEY = (id: string) => `kv:users:${id}`;
const USER_EMAIL_KEY = (email: string) => `kv:users:byEmail:${email.toLowerCase()}`;

function kvAvailable(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Get the current signed-in user, mirrored to KV on first sign-in.
 * Returns null if not signed in.
 *
 * If KV is not configured (no env vars), returns a transient User built
 * from Clerk's sessionClaims — no mirror is written.
 */
export async function getCurrentUser(): Promise<User | null> {
  const cu = await currentUser();
  if (!cu) return null;

  const role = ((cu.publicMetadata as { role?: string } | undefined)?.role ?? "user") as
    | "user"
    | "admin";

  const baseUser: User = {
    id: cu.id,
    email: cu.emailAddresses[0]?.emailAddress ?? "",
    name: cu.fullName ?? cu.firstName ?? cu.username ?? "Anonymous",
    avatarUrl: cu.imageUrl ?? null,
    role,
    createdAt: new Date(cu.createdAt).toISOString(),
  };

  // No KV configured — return transient user, skip mirror
  if (!kvAvailable()) return baseUser;

  // Mirror to KV on first sign-in
  const existing = await kv.get<User>(USER_KEY(cu.id));
  if (existing) {
    // Keep role fresh (admin promotion should take effect immediately)
    if (existing.role !== role) {
      const updated = { ...existing, role };
      await kv.set(USER_KEY(cu.id), updated);
      return updated;
    }
    return existing;
  }

  await kv.set(USER_KEY(cu.id), baseUser);
  await kv.set(USER_EMAIL_KEY(baseUser.email), cu.id);
  return baseUser;
}

/**
 * Check if the current user is an admin.
 * Reads from sessionClaims first (fast, no DB call), falls back to KV.
 */
export async function isAdmin(): Promise<boolean> {
  const cu = await currentUser();
  if (!cu) return false;
  const role = (cu.publicMetadata as { role?: string } | undefined)?.role;
  return role === "admin";
}

/**
 * Server-side helper: require admin role or throw.
 * Use in server actions and API routes.
 */
export async function requireAdmin(): Promise<{ user: User }> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  if (user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return { user };
}
