"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import styles from "./DrawerAuthControl.module.css";

/**
 * DrawerAuthControl — full-width auth UI for the SideNav footer.
 *
 * Signed out: "Sign in" opens Clerk modal.
 * Signed in: UserButton + "Hi, {firstName}" (sign-out lives in UserButton menu).
 */
export function DrawerAuthControl() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return <div className={styles.root} aria-hidden="true" />;
  }

  if (!isSignedIn) {
    return (
      <div className={styles.root}>
        <SignInButton mode="modal">
          <button type="button" className={styles.signIn}>
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  const firstName = user?.firstName?.trim() || "there";

  return (
    <div className={styles.root}>
      <div className={styles.signedIn}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: styles.avatar,
            },
          }}
        />
        <span className={styles.greeting}>Hi, {firstName}</span>
      </div>
    </div>
  );
}
