// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqFCWG4jZn4W1GHBYsPor1sXGnHMDIOok",
  authDomain: "football-21631.firebaseapp.com",
  projectId: "football-21631",
  storageBucket: "football-21631.firebasestorage.app",
  messagingSenderId: "305627854591",
  appId: "1:305627854591:web:e78ac3105869d51b93beca",
  measurementId: "G-8M2KY1W5C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);