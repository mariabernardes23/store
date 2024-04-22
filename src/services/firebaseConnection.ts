// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVvS8h7kps7M5_4p6pB9WRP9IsEh9oPLY",
  authDomain: "contextapi-a4757.firebaseapp.com",
  projectId: "contextapi-a4757",
  storageBucket: "contextapi-a4757.appspot.com",
  messagingSenderId: "554098605258",
  appId: "1:554098605258:web:86c280cf704cda0ada0833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }