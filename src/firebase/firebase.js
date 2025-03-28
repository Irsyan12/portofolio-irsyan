import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  Timestamp,
  arrayUnion,
  collection,
} from "firebase/firestore";

// Konfigurasi Firebase dari .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
  app,
  analytics,
  db,
  logEvent,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  Timestamp,
  arrayUnion,
  addDoc,
  collection,
};
