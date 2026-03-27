"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStudentSession } from "../lib/studentProgress";

export default function StudentNavAction({
  className,
  signInLabel = "Student Sign In",
  dashboardLabel = "Dashboard",
}) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const refreshState = () => {
      setIsSignedIn(Boolean(getStudentSession()));
    };

    refreshState();
    window.addEventListener("storage", refreshState);
    window.addEventListener("skilldojo-auth-changed", refreshState);

    return () => {
      window.removeEventListener("storage", refreshState);
      window.removeEventListener("skilldojo-auth-changed", refreshState);
    };
  }, []);

  return isSignedIn ? (
    <Link href="/student/dashboard" className={className}>
      {dashboardLabel}
    </Link>
  ) : (
    <Link href="/student/signin" className={className}>
      {signInLabel}
    </Link>
  );
}
