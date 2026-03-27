import { initializeApp, getApps } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
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

function getFirebaseDb() {
  const app = getFirebaseApp();
  return getFirestore(app);
}

export async function signInWithGooglePopup() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, provider);
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
