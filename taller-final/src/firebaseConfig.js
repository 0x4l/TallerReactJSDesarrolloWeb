import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDW6P6G0Mt46QE5MB7-mb8XwbkWFtQ1YHM",
    authDomain: "taller-final-29da6.firebaseapp.com",
    projectId: "taller-final-29da6",
    storageBucket: "taller-final-29da6.firebasestorage.app",
    messagingSenderId: "439461161991",
    appId: "1:439461161991:web:b4ad27cfaefdf781638ea2",
    measurementId: "G-BYQ83X9YVN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };