// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "imagine-ai-a4da5.firebaseapp.com",
  projectId: "imagine-ai-a4da5",
  storageBucket: "imagine-ai-a4da5.appspot.com",
  messagingSenderId: "44423476261",
  appId: "1:44423476261:web:60dd52cca3709e2707bbcc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
