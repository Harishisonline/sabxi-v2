"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

/**
 * AuthControl — renders the correct auth UI based on signed-in state.
 *
 * Uses Clerk v6's `useUser()` hook (instead of the deprecated
 * <SignedIn>/<SignedOut> components which Clerk moved).
 */
export function AuthControl({ className }: { className?: string }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div className={className}>
      {!isSignedIn && (
        <SignInButton mode="modal">
          <button type="button" className="sabxi-clerk-signin-btn">
            Sign in
          </button>
        </SignInButton>
      )}
      {isSignedIn && (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "sabxi-clerk-avatar",
            },
          }}
        />
      )}
    </div>
  );
}
