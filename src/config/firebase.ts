// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import {getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDLgtyBtYz2cE_ZQKBKBE2mx3aOdASDX50",
  authDomain: "react-firebase-jusiah.firebaseapp.com",
  projectId: "react-firebase-jusiah",
  storageBucket: "react-firebase-jusiah.appspot.com",
  messagingSenderId: "1042205005511",
  appId: "1:1042205005511:web:40c813d0aedb036dc250e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();