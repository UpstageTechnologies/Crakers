// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAti6Ii3hG3BocKflo0FjyHK7AcaQtodHI",
  authDomain: "login-form-9111e.firebaseapp.com",
  projectId: "login-form-9111e",
  storageBucket: "login-form-9111e.firebasestorage.app",
  messagingSenderId: "803303155404",
  appId: "1:803303155404:web:2121b3df1a44b5adb04469"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
