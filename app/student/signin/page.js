"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  finishGoogleRedirectSignIn,
  getStudentSession,
  isCloudSyncEnabled,
  signInStudent,
  signInStudentWithGoogle,
  signOutStudent,
} from "../../lib/studentProgress";
import styles from "./signin.module.css";

export default function StudentSignInPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [existingStudent, setExistingStudent] = useState(null);
  const [authError, setAuthError] = useState("");
  const cloudReady = isCloudSyncEnabled();

  function getFriendlyAuthError(error) {
    const code = error?.code || "";

    if (code === "auth/unauthorized-domain") {
      return "This domain is not authorized in Firebase. Add it under Firebase Auth > Settings > Authorized domains.";
    }

    if (code === "auth/operation-not-allowed") {
      return "Google sign-in is disabled in Firebase. Enable Google under Firebase Auth > Sign-in method.";
    }

    if (code === "auth/popup-blocked") {
      return "Popup was blocked by the browser. Allow popups for this site and try again.";
    }

    if (code === "auth/network-request-failed") {
      return "Network issue while connecting to Google. Check your internet and try again.";
    }

    return error?.message || "Google sign-in failed. Please try again.";
  }

  useEffect(() => {
    let active = true;

    async function bootstrapAuth() {
      try {
        await finishGoogleRedirectSignIn();
        if (!active) return;
        const session = getStudentSession();
        setExistingStudent(session);
        if (session?.provider === "google") {
          router.replace("/student/dashboard");
        }
      } catch (error) {
        if (!active) return;
        setExistingStudent(getStudentSession());
        setAuthError(getFriendlyAuthError(error));
      }
    }

    bootstrapAuth();

    return () => {
      active = false;
    };
  }, [router]);

  function handleSignIn(event) {
    event.preventDefault();
    setAuthError("");
    signInStudent(name);
    router.push("/student/dashboard");
  }

  async function handleGoogleSignIn() {
    setAuthError("");
    try {
      const student = await signInStudentWithGoogle();
      if (student) {
        router.push("/student/dashboard");
      }
    } catch (error) {
      setAuthError(getFriendlyAuthError(error));
    }
  }

  function handleSignOut() {
    signOutStudent();
    setExistingStudent(null);
    setName("");
  }

  return (
    <main className={styles.main}>
      <div className={styles.bgMark}>学</div>

      <div className={styles.card}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        <div className={styles.badge}>Student Portal</div>
        <h1 className={styles.title}>Sign In</h1>
        <p className={styles.subtitle}>
          Save your lesson progress and continue from your personal dashboard.
        </p>

        {cloudReady ? (
          <button type="button" className={styles.googleBtn} onClick={handleGoogleSignIn}>
            <svg className={styles.googleIcon} viewBox="0 0 48 48" width="20" height="20">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </button>
        ) : (
          <p className={styles.helperText}>
            Cloud sync is off. Add NEXT_PUBLIC_FIREBASE_* values to enable Google sign-in.
          </p>
        )}

        {authError && <p className={styles.errorText}>{authError}</p>}

        <div className={styles.divider}>or continue with local profile</div>

        {existingStudent ? (
          <div className={styles.returningWrap}>
            <p className={styles.returningText}>
              Signed in as <strong>{existingStudent.name}</strong>
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => router.push("/student/dashboard")}
              >
                Open Dashboard
              </button>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSignIn}>
            <label className={styles.label} htmlFor="studentName">
              Student name
            </label>
            <input
              id="studentName"
              className={styles.input}
              type="text"
              placeholder="e.g. Ayaan"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
            />
            <button className={styles.primaryBtn} type="submit">
              Continue to Dashboard
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
