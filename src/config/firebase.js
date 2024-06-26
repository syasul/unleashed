// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRM_vdWgOIApzSqP_em-d5865Bl7RgYUQ",
  authDomain: "pictpo.firebaseapp.com",
  databaseURL: "https://pictpo-default-rtdb.firebaseio.com",
  projectId: "pictpo",
  storageBucket: "pictpo.appspot.com",
  messagingSenderId: "467877661436",
  appId: "1:467877661436:web:64d002e6e8b803e2c66579",
  measurementId: "G-97EZ58S0LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)

export {auth, firestore}