import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBKf3BkeEUP7_7oha3_dB7-CzxPLnwCVnA",
    authDomain: "nutriai-d6574.firebaseapp.com",
    projectId: "nutriai-d6574",
    storageBucket: "nutriai-d6574.firebasestorage.app",
    messagingSenderId: "959286882644",
    appId: "1:959286882644:web:32dd2193a1bce4db4258c1",
    measurementId: "G-VFPRHJ9XD4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
