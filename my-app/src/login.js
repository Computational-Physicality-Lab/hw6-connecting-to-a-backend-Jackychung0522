import './login.css';
import google from './assets/images/google-logo.png';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React from 'react';
import index from './index.js';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import route from './AppRouter';

function Login(){
    const [user, setUser] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
         
        });
    
        return () => unsubscribe();
      }, []);
      const handleLogout = () => {
        firebase.auth().signOut();
        // const deleteAllDocuments = async (collectionPath) => {
        //     const snapshot = await firebase.firestore().collection(collectionPath).get();
        //     snapshot.forEach((doc) => {
        //       doc.ref.delete();
        //     });
        //   };
          
        //   deleteAllDocuments(user.displayName);
        sessionStorage.setItem('userId',"logout")
      };
    const handleGoogleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          const result = await firebase.auth().signInWithPopup(provider);
          // 登入成功後的處理邏輯
          console.log('成功登入:', result.user);
          sessionStorage.setItem('userId',result.user.uid)
         navigate(route.home);
        } catch (error) {
          // 登入失敗的錯誤處理邏輯
          console.error('登入失敗:', error);
        }
      };
    
    return (
       <div className="login">
        {!user?(<button className="loginbutton" onClick={handleGoogleLogin}>
            <img src={google} alt="image_description" className="loginimg"></img>
            <p>Log In With Google</p>
        </button>):(
            <button onClick={handleLogout} className='logoutStyle'>
                <p>Log Out As {user.displayName}</p>
            </button>
        )}
        
        </div> 
    );
}
export default Login;