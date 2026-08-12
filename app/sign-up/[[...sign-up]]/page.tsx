import { SignUp } from "@clerk/nextjs";
import styles from "../../sign-in/auth-form.module.css";

export const metadata = {
  title: "Sign up",
};

// NOTE: Clerk v6 configures which authentication strategies appear
// (Google, GitHub, Email OTP, Phone OTP, etc.) via the Clerk Dashboard,
// not via props on <SignUp />. The auth-form CSS overrides below are
// the only customization available here.
export default function SignUpPage() {
  return (
    <main className={styles.wrap}>
      <SignUp
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
