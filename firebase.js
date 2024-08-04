// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsMXsLI7EnmMaQl5i3SNWjJRMRlZSMOU0",
    authDomain: "cninjas-8ab4e.firebaseapp.com",
    projectId: "cninjas-8ab4e",
    storageBucket: "cninjas-8ab4e.appspot.com",
    messagingSenderId: "383516081066",
    appId: "1:383516081066:web:a0ad2748eda603e013c9d3",
    measurementId: "G-E8GEV2YY4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
