import React from 'react';
import logo from './assets/images/logo.png';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';
import cartimage from './assets/images/cart.png';
import routes from './AppRouter';
import './index.css'

function Header() {
  const [cart] = useState(JSON.parse(sessionStorage.getItem("cart") || "[]"));
  //const [cartQuantity, setCartQuantity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const [user, setUser] = useState("");

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const headerTitle = {
    fontSize: '40px',
    fontFamily: 'Catamaran',
    marginLeft: '50px'
  }
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
     // setUser(user);
      setIsLoggedIn(!!user);

    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchTotalQuantity = async () => {
      let sum = 0;
      try {
        let userId = sessionStorage.getItem('userId');
        const querySnapshot = await firebase.firestore().collection(userId).get();

        querySnapshot.forEach((doc) => {
          const quantity = doc.data().quantity;

          sum += parseInt(quantity);
        });
        setTotalQuantity(sum);
        console.log('Total Quantity:', sum);
      } catch (error) {
        console.error('Error calculating total quantity:', error);
      }
    };

    fetchTotalQuantity();
  }, [cart]);

  return (

    <header style={headerStyle} >

      <Link to={routes.home} className="my-link" >
        <div className="logo">
          <img src={logo} alt="image_description"  className='dog'/>
        </div>
      </Link>


      <div className="headerTitle">
        <p style={headerTitle}>Scotty Shirts U Illustrate(SSUI)</p>
      </div>
      <div className={`shoppingCar ${!isLoggedIn ? 'disabled' : ''}`}ㄎ>
        {isLoggedIn ? (
          <Link className="shoppingCar" to={routes.ShoppingCart}>
            <img src={cartimage} alt="image_description" className="car" />
          </Link>
        ) : (
          <span className="disabledShoppingCar">
            <img src={cartimage} alt="image_description" className="car" />
          </span>
        )}
        <p>
          <span className="totalQuantity">{totalQuantity}</span>
        </p>
      </div>

    </header>
  );
}

export default Header;