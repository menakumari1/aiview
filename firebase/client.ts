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
  apiKey: "AIzaSyA084o7pMDwiypU-m3BCsirXq4ZSkKAkJc",
  authDomain: "aiview-36256.firebaseapp.com",
  projectId: "aiview-36256",
  storageBucket: "aiview-36256.firebasestorage.app",
  messagingSenderId: "26682071291",
  appId: "1:26682071291:web:6b5875ad292b96b445b85e",
  measurementId: "G-9GZ3B7HZSX",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
