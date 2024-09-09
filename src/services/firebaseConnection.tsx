// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFsnGszUBNPsgWAvWOX5y9zRUcmAKxf_g",
  authDomain: "linktree-f04b4.firebaseapp.com",
  projectId: "linktree-f04b4",
  storageBucket: "linktree-f04b4.appspot.com",
  messagingSenderId: "644730485205",
  appId: "1:644730485205:web:af4f16392783479150255c",
  measurementId: "G-57DCWW9CW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
