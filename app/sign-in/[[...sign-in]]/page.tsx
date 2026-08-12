import { SignIn } from "@clerk/nextjs";
import styles from "../auth-form.module.css";

export const metadata = {
  title: "Sign in",
};

// NOTE: Clerk v6 configures which authentication strategies appear
// (Google, GitHub, Email OTP, Phone OTP, etc.) via the Clerk Dashboard,
// not via props on <SignIn />. The auth-form CSS overrides below are
// the only customization available here.
export default function SignInPage() {
  return (
    <main className={styles.wrap}>
      <SignIn
        appearance={{
          elements: {
            rootBox: styles.root,
            card: styles.card,
          },
        }}
      />
    </main>
  );
}
