import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0E8oIMhT61CMgQ_G1Eclc-qC6WarWzPU",
  authDomain: "smart-school-53db1.firebaseapp.com",
  projectId: "smart-school-53db1",
  storageBucket: "smart-school-53db1.firebasestorage.app",
  messagingSenderId: "202873105374",
  appId: "1:202873105374:web:077007afd032e533210b4f",
  measurementId: "G-2LMH4BF5YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (conditionally)
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Initialize Auth, Firestore and Realtime Database
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

export default app;
