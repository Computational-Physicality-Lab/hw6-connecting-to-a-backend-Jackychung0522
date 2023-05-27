import React from 'react';
import './shoppingCart.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from './AppRouter';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

import db from './index';
import shirtbase from './assets/images/shirt-base.png';
function ShoppingCart(props) {
    // for (let i = 0; i < Cart.length; i++) {
    //     console.log(Cart[i].quantity);
    // }
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart") || "[]"));
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    //const [user, setUser] = useState("");
    const [subTotalPrice, setSubTotalPrice] = useState(0);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            //setUser(user);


        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const fetchCartItems = async () => {
            let userId = sessionStorage.getItem('userId');
            const cartItemsRef = db.collection(userId);
            const snapshot = await cartItemsRef.orderBy("createdAt", "desc").get();

            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setCartItems(items);
        };

        fetchCartItems();
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
        const fetchTotalPrice = async () => {
            let sub = 0;
            try {
                let userId = sessionStorage.getItem('userId');
                const querySnapshot = await firebase.firestore().collection(userId).get();

                querySnapshot.forEach((doc) => {
                    let price = doc.data().price;
                    const quantity = doc.data().quantity;
                    if (!doc.data().isPicture) {
                        price = price.replace('$', '');
                    }

                    sub += parseFloat(price) * parseInt(quantity);
                });
                sub = sub.toFixed(2);
                setSubTotalPrice(sub);
                let total;
                total = parseFloat(sub) + 6.95;
                total = total.toFixed(2);
                setTotalPrice(total);
                
            } catch (error) {
                console.error('Error calculating total quantity:', error);
            }
        };

        fetchTotalPrice();
    }, [cart]);

    // for (let i = 0; i < cart.length; i++) {
    //     console.log(cart[i].quantity);
    //     console.log(cart[i].price);
    // }

    //const selectedButton = JSON.parse(localStorage.getItem('selectedButton'))
    function handleContinueShopping() {
        localStorage.clear();
    }

    function handleQuantityChange(id, quantity) {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: quantity
                };
            }
            return item;
        });
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
        const updateQuantityInFirestore = async (id, quantity) => {
            try {
                let userId = sessionStorage.getItem('userId');
                const itemRef = firebase.firestore().collection(userId).doc(id);

                await itemRef.update({
                    quantity: quantity
                });

                console.log('Quantity updated successfully in Firestore.');
            } catch (error) {
                console.error('Error updating quantity in Firestore:', error);
            }
        };

        // 在需要更新數量的地方，調用此函式並傳遞對應的項目 ID 和新的數量
        updateQuantityInFirestore(id, quantity).then(() => {
            window.location.reload();
        });
    }
    function handleRemoveItem(id) {
        const cart = sessionStorage.getItem("cart");
        let newCart = [];

        if (cart) {
            newCart = JSON.parse(cart).filter((item) => item.id !== id);
            sessionStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        }
        const deleteDocument = async (collectionPath, documentId) => {
            await firebase.firestore().collection(collectionPath).doc(documentId).delete();
        };
        let userId = sessionStorage.getItem('userId');
        deleteDocument(userId, id).then(() => {
            window.location.reload();
        });



    }
    const nonPictureSrcList = cartItems
        .filter(item => !item.isPicture)
        .map(item => item.src);

    console.log(nonPictureSrcList);

   



    return (
        <div>
            <div className="blockforshoppingCart">


                <div className="shoppingCart">
                    <div className="mycart">
                        <div id='mycart'>My Cart({totalQuantity})</div>

                    </div>
                    {/* <hr /> */}
                    <div className='"cartContainer"'>
                        {cartItems.length === 0 ? (
                            <div className='emptyCart'>
                                <p>Your Cart is empty</p>
                            </div>

                        ) : (
                            cartItems.map((cartItem, index) => (
                                <div className="cartProductBlock" key={index}>
                                    <div className="cartProductName">

                                        {cartItem.isPicture ? (
                                            <div>
                                                <p id='cartItemName'>{cartItem.name}</p>
                                                <div  className="white-shirt">
                                                   
                                                    <img src={cartItem.src} alt={cartItem.alt_description} className="cartshirtbase" id='cartselectedImage' />

                                                    <img src={shirtbase} id="whiteClothingImage" alt="shirtbase" className="cartshirtbase" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="original-shirt">
                                                
                                                <p>{cartItem.name}</p>
                                                {/* eslint-disable-next-line */}
                                                <img src={cartItem.selectedButton[cartItem.color].front} alt="Image" id="original-image" /> 
                                            </div>
                                        )}


                                    </div>
                                    <div className="cartProductInfor">
                                        <DropdownButton

                                            id="quantity-dropdown"
                                            title={`Quantity: ${cartItem.quantity}`}
                                            onSelect={(eventKey) => handleQuantityChange(cartItem.id, eventKey)}
                                        >
                                            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                                <Dropdown.Item key={num} eventKey={num}>
                                                    {num}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>

                                        <p>Color: <span className="redword">{cartItem.color}</span></p>
                                        <p>Size: <span className="redword">{cartItem.size}</span></p>
                                        <p>Price (each): <span className="redword">{cartItem.price}</span></p>
                                        <div >
                                            <button className="cartButton" onClick={() => handleRemoveItem(cartItem.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>


            </div>
            <div className="total">
                <div className="totalBlock">
                    <h3>Order Summary</h3>
                    <p>Subtotal: <span className="redword">${subTotalPrice}</span></p>
                    <p>Est.Shipping: <span className="redword">$6.95</span></p>
                    <p>Total:  <span className="redword">${totalPrice}</span></p>
                    <Link to={routes.NotImplement}>
                        <button className="cartButton">Sign in and checkout</button>
                    </Link>
                </div>
                <div className='continueShopping'>
                    <Link to={routes.Tshirts}>
                        <button className="cartButton" onClick={() => handleContinueShopping()}>Continue Shopping</button>
                    </Link>
                </div>

            </div>
        </div>

    );
}

export default ShoppingCart;