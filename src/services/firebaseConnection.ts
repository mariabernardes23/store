// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmWM8fh1v_aeBTQfx72UThOvR4N8WNuS0",
  authDomain: "react-routes-ad010.firebaseapp.com",
  projectId: "react-routes-ad010",
  storageBucket: "react-routes-ad010.appspot.com",
  messagingSenderId: "769255142816",
  appId: "1:769255142816:web:2ad22840cf31786137a0c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }