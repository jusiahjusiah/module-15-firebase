// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider } from "firebase/auth"
//importing firestore to access database
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC7FXU11bs5afUr-MrOtHjwzN0B84ljX08",
  authDomain: "react-jusiah-mommy.firebaseapp.com",
  projectId: "react-jusiah-mommy",
  storageBucket: "react-jusiah-mommy.appspot.com",
  messagingSenderId: "487212106446",
  appId: "1:487212106446:web:da1bc4dd4756952892469f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//tells our app that we are going to use fireStore
export const db = getFirestore(app)