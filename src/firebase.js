// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSSa_8V3dCK7P5VtSK45vZ54mdeZqqpm0",
  authDomain: "saveplus-62d7c.firebaseapp.com",
  databaseURL: "https://saveplus-62d7c-default-rtdb.firebaseio.com",
  projectId: "saveplus-62d7c",
  storageBucket: "saveplus-62d7c.appspot.com",
  messagingSenderId: "370888720894",
  appId: "1:370888720894:web:66767a081ea9d7789c80af",
  measurementId: "G-J582C5GS70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
