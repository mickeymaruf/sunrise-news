// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWeHZtEnfclN1LJky2jdi7-8iSwMky7HQ",
  authDomain: "sunrise-news-client.firebaseapp.com",
  projectId: "sunrise-news-client",
  storageBucket: "sunrise-news-client.appspot.com",
  messagingSenderId: "364911812108",
  appId: "1:364911812108:web:307b983de1cfcd7f271829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;