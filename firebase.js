import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    // ... FIREBASE_CONFIGURATION
    apiKey: "AIzaSyACO67fP1fkY1mFzT2vJgw4CrqoYeCD6Sw",
    authDomain: "class-work-9cbca.firebaseapp.com",
    projectId: "class-work-9cbca",
    storageBucket: "class-work-9cbca.appspot.com",
    messagingSenderId: "739558401618",
    appId: "1:739558401618:web:42e1a44180239d35bb618b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// TODO: Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)