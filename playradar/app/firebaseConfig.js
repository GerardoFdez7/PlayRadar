
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChFGIJkYWhNmhPGU24ItgLPZdcC9s-NP8",
  authDomain: "playradar-a90bf.firebaseapp.com",
  projectId: "playradar-a90bf",
  storageBucket: "playradar-a90bf.firebasestorage.app",
  messagingSenderId: "305780706564",
  appId: "1:305780706564:web:a4534ba3744c5bfb7a1451"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
    