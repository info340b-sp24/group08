import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ------------------------------------------------------------
// Firebase Part
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMMbuJlexyr1Od4R8w7tXoJ1MlMMq94Uk",
  authDomain: "interstu-spot.firebaseapp.com",
  projectId: "interstu-spot",
  storageBucket: "interstu-spot.appspot.com",
  messagingSenderId: "63117534608",
  appId: "1:63117534608:web:5906bff231307c278b3f15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);