// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEVloy5I6VfR7fhZZqlrzaA617ttAj0t0",
  authDomain: "fb-gbc-2223.firebaseapp.com",
  projectId: "fb-gbc-2223",
  storageBucket: "fb-gbc-2223.appspot.com",
  messagingSenderId: "681558080827",
  appId: "1:681558080827:web:9e98b7401f548d1cc58b1e",
  measurementId: "G-J4R4P7QFD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const store = getFirestore(app)

