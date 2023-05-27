import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './AppRouter';
import HomePage from './HomePage';
import NotImplement from './NotImplement';
import Header from './header';
import H1 from './h1';
import Red from './Red';
import Footer from './footer';
import Tshirts from './Products';
import Details from './details';
import ShoppingCart from './shoppingCart';
import LogIn from './login';
import db from './index';
import { useState,useEffect } from 'react';
import firebase from 'firebase/compat/app';
import CreateFromPicture from './CreateFromPicture';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("anchors").get().then((querySnapshot)=>{
      console.log(querySnapshot.docs.map((doc)=>doc.data()))
    })
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className='App'>
      <Red />
      <Header />
      <H1 user={user}/>
      <Routes>
        <Route exact path={routes.home} element={<HomePage />}></Route>
        <Route exact path={routes.NotImplement} element={<NotImplement />}></Route>
        <Route exact path={routes.Tshirts} element={<Tshirts />}></Route>
        <Route exact path={routes.Details} element={<Details/>}></Route>
        <Route exact path={routes.ShoppingCart} element={<ShoppingCart/>}></Route>
        <Route exact path={routes.LogIn} element={<LogIn />}></Route>
        <Route exact path={routes.CreateFromPicture} element={<CreateFromPicture />}></Route>
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;
export const Cart = [];
//export let userNmae;
