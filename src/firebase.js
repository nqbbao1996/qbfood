// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzAeJkOAJJObp6fE3D0h_SUAKM3kv85W8",
  authDomain: "api-food-7c534.firebaseapp.com",
  projectId: "api-food-7c534",
  storageBucket: "api-food-7c534.appspot.com",
  messagingSenderId: "899724692822",
  appId: "1:899724692822:web:6ad25e37232047af4d9af7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
