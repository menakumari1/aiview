// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb6_BKAOpQy8tVhRdV4y7a_nOEd4qx-sY",
  authDomain: "ai-interview-596c3.firebaseapp.com",
  projectId: "ai-interview-596c3",
  storageBucket: "ai-interview-596c3.firebasestorage.app",
  messagingSenderId: "623239107421",
  appId: "1:623239107421:web:aa21a679f0d691f9b90eb4",
  measurementId: "G-84WBT9ZVD1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
