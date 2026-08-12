"use client";

import { usePathname } from "next/navigation";
import { PageLoader } from "./PageLoader";

/**
 * HomeLoaderBoundary - renders the SABXI Studio intro animation
 * ONLY on the home page ("/"). On every other route, renders nothing,
 * so client-side navigation between pages does not replay the loader.
 */
export function HomeLoaderBoundary() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <PageLoader />;
}
