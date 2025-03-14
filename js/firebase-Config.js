import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyA7mfIdJAmuFmzEWSsDdhbpi8F_ZQjU3aI",
  authDomain: "ecommerce-store-e90c3.firebaseapp.com",
  projectId: "ecommerce-store-e90c3",
  storageBucket: "ecommerce-store-e90c3.firebasestorage.app",
  messagingSenderId: "267494361465",
  appId: "1:267494361465:web:373d7f210d6821b14647a8",
  measurementId: "G-DHXSYX5NEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
  auth,
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
}