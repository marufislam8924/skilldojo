"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
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

  useEffect(() => {
    setExistingStudent(getStudentSession());
  }, []);

  function handleSignIn(event) {
    event.preventDefault();
    setAuthError("");
    signInStudent(name);
    router.push("/student/dashboard");
  }

  async function handleGoogleSignIn() {
    setAuthError("");
    try {
      await signInStudentWithGoogle();
      router.push("/student/dashboard");
    } catch (error) {
      setAuthError(error?.message || "Google sign-in failed. Please try again.");
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
            Continue with Google
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
