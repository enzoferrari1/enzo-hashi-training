// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv6HOLANSkgWGBJdAx7ozy_Ut9DFTwOCk",
  authDomain: "hashi-training.firebaseapp.com",
  projectId: "hashi-training",
  storageBucket: "hashi-training.firebasestorage.app",
  messagingSenderId: "985948587722",
  appId: "1:985948587722:web:8a3c9af3dcf84f96465633",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
