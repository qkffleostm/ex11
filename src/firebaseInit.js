// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHmvQvoy850o3ugo6NpLd-lnmYGecc9wQ",
    authDomain: "react-35d7a.firebaseapp.com",
    projectId: "react-35d7a",
    storageBucket: "react-35d7a.appspot.com",
    messagingSenderId: "138268676691",
    appId: "1:138268676691:web:71f5b2552a1fbaa536eca6",
    measurementId: "G-QHFNFJXHQ7"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
