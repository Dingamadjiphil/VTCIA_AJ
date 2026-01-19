// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZNKFpJ6Z5r9LoNZgvKD54fYvnQBFKWOY",
  authDomain: "vtcia-c1bc4.firebaseapp.com",
  projectId: "vtcia-c1bc4",
  storageBucket: "vtcia-c1bc4.firebasestorage.app",
  messagingSenderId: "908912641737",
  appId: "1:908912641737:web:5bf1f3192b041a3a41ef18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);