// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orkhan-estate.firebaseapp.com",
  projectId: "orkhan-estate",
  storageBucket: "orkhan-estate.appspot.com",
  messagingSenderId: "149378910168",
  appId: "1:149378910168:web:a8dde0a1c9b696fae7d4ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);