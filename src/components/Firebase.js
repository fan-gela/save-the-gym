// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeaYW_bikOfz3B9d_roJ2jjCF43Aq7Is0",
  authDomain: "save-the-gym.firebaseapp.com",
  projectId: "save-the-gym",
  storageBucket: "save-the-gym.appspot.com",
  messagingSenderId: "795231253611",
  appId: "1:795231253611:web:69c2c64ff5efbd4e65ed2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;