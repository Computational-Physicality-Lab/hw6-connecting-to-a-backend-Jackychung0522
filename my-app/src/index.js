import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnBao8L56f8NLBvm5kb_YQkXNZ5EEEnG0",
  authDomain: "uihw6-37b3a.firebaseapp.com",
  projectId: "uihw6-37b3a",
  storageBucket: "uihw6-37b3a.appspot.com",
  messagingSenderId: "204208012371",
  appId: "1:204208012371:web:590ccf7306ae4444b61aa6",
  measurementId: "G-QZEN6BDJ6S",

};

const firebaseAuthProviderConfig = {
  
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const analytics = getAnalytics(app);

root.render(
  
    <Router>
      <App />
    </Router>
    
  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default db;
