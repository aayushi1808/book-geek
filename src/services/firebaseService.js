import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8hhcpjtE-IFMqNrLy1pwwU6voe44PGaA",
  authDomain: "book-test-8aa5c.firebaseapp.com",
  projectId: "book-test-8aa5c",
  storageBucket: "book-test-8aa5c.appspot.com",
  messagingSenderId: "212667985668",
  appId: "1:212667985668:web:9448ebd953cbe0c57d2a51",
  measurementId: "G-KJKTKL9Y5K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
