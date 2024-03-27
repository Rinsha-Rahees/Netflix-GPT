// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQowmb9ik7PFHee4PxqwWydU9wBrdF7ms",
  authDomain: "netflixgpt-e9633.firebaseapp.com",
  projectId: "netflixgpt-e9633",
  storageBucket: "netflixgpt-e9633.appspot.com",
  messagingSenderId: "643269480728",
  appId: "1:643269480728:web:d4b88e24ac963ae1958e6d",
  measurementId: "G-NM8XJCGFWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()