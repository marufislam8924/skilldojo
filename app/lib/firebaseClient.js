import { initializeApp, getApps } from "firebase/app";
import {
  GoogleAuthProvider,
  getRedirectResult,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const REQUIRED_CONFIG_KEYS = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

export function isFirebaseConfigured() {
  return REQUIRED_CONFIG_KEYS.every((key) => Boolean(firebaseConfig[key]));
}

function getFirebaseApp() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.");
  }

  return getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
}

function getFirebaseAuth() {
  const app = getFirebaseApp();
  return getAuth(app);
}

function getGoogleProvider() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

export function preferRedirectAuthFlow() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

export function shouldFallbackToRedirect(error) {
  const code = error?.code || "";
  return [
    "auth/popup-blocked",
    "auth/popup-closed-by-user",
    "auth/cancelled-popup-request",
    "auth/operation-not-supported-in-this-environment",
  ].includes(code);
}

function getFirebaseDb() {
  const app = getFirebaseApp();
  return getFirestore(app);
}

export async function signInWithGooglePopup() {
  const auth = getFirebaseAuth();
  const provider = getGoogleProvider();
  return signInWithPopup(auth, provider);
}

export async function signInWithGoogleRedirectStart() {
  const auth = getFirebaseAuth();
  const provider = getGoogleProvider();
  if (typeof window !== "undefined") {
    window.localStorage.setItem("skilldojo.pendingRedirect", "1");
  }
  await signInWithRedirect(auth, provider);
}

export function hasPendingRedirect() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("skilldojo.pendingRedirect") === "1";
}

export function clearPendingRedirect() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("skilldojo.pendingRedirect");
}

export function waitForRedirectUser() {
  if (!isFirebaseConfigured()) return Promise.resolve(null);
  const auth = getFirebaseAuth();
  const TIMEOUT_MS = 5000;
  return new Promise((resolve) => {
    let settled = false;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (settled) return;
      if (user) {
        settled = true;
        unsubscribe();
        resolve(user);
      }
    });
    setTimeout(() => {
      if (settled) return;
      settled = true;
      unsubscribe();
      resolve(null);
    }, TIMEOUT_MS);
  });
}

export async function getGoogleRedirectSignInResult() {
  const auth = getFirebaseAuth();
  return getRedirectResult(auth);
}

export async function signOutFirebase() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export async function readRemoteProgress(uid) {
  if (!isFirebaseConfigured() || !uid) return {};

  const db = getFirebaseDb();
  const snapshot = await getDoc(doc(db, "studentProgress", uid));
  if (!snapshot.exists()) {
    return {};
  }

  return snapshot.data()?.courses || {};
}

export async function writeRemoteProgress(uid, progress) {
  if (!isFirebaseConfigured() || !uid) return;

  const db = getFirebaseDb();
  await setDoc(
    doc(db, "studentProgress", uid),
    {
      courses: progress,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}
