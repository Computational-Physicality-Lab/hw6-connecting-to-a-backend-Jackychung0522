import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import routes from './AppRouter';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';
import db from '.';

function Details(props) {
  const [shirt, setShirt] = useState(JSON.parse(localStorage.getItem("selectedButton")));
  const [color, setColor] = useState("white");
  const [side, setSide] = useState("front");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedButton] = useState(
    JSON.parse(localStorage.getItem("selectedButton"))
  );
  const [selectedSize, setSelectedSize] = useState("Size");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);
 
  

  const handleQuantityChange = (e) => {
    localStorage.setItem("quantity", JSON.stringify(parseInt(e.target.value)));
    setSelectedQuantity(parseInt(e.target.value));
  }
  const handleSizeChange = (e) => {
    localStorage.setItem("size", JSON.stringify(e.target.value));
    setSelectedSize(e.target.value);
  };
  function handleAddToCartClick() {

    const shirtObject = JSON.parse(localStorage.getItem('shirt'))
    const color = JSON.parse(localStorage.getItem('color'))
    const selectedButton = JSON.parse(localStorage.getItem('selectedButton'))
    //const   side= JSON.parse(localStorage.getItem('side'))
    const size = JSON.parse(localStorage.getItem('size'))
    //const quantity = JSON.parse(localStorage.getItem('quantity'))
    const shirt = {
      name: shirtObject.shirt.name,
      color: color,
      size: size,
      price: selectedButton.price,
      quantity: selectedQuantity,
      id: uuidv4(),
      side: "front"
    }
    
    if (shirtObject.shirt.name === "Beep Boop") {
         
        
    }
    if(shirtObject.shirt.name === "Car-negie Mellon"){
     
      
    }
    if(shirtObject.shirt.name === "Forever Plaid"){
      
   
    }
    if(shirtObject.shirt.name === "Carnegie Mellon Melon"){
     
      
    }
    let cartItem = {
      name:  shirtObject.shirt.name,
      color: color,
      size: size,
      price: selectedButton.price,
      quantity: selectedQuantity,
      //src:"./assets/shirt_images/"+nickname+"-"+color+"-"+"front"+".png",
      isPicture:false,
      selectedButton:selectedButton.colors,
      createdAt:new Date()
    };
    //const unsplash = createApi({ accessKey: "QzlDf7ckHUDnJ6CJt-6gfdRGrzWavNCuyijZdgYC-Go" });
    //console.log("user", user.uid);
    let userId=sessionStorage.getItem('userId');
    db.collection(userId).add(cartItem)
        .then((docRef) => {
            console.log("Data saved to Firestore. Document ID:", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document:", error);
        });
    const cart = sessionStorage.getItem("cart");
    let newCart = [];

    if (cart) {
      newCart = JSON.parse(cart);
    }

    newCart.push(shirt);
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    //Cart.push(shirt);
    if (selectedSize === "Size") {
      return;
    }



  }
  
  const dataArray = Object.keys(selectedButton.colors);

  useEffect(() => {
    
    localStorage.clear();
    localStorage.setItem("side", JSON.stringify("front"));
    localStorage.setItem("color", JSON.stringify("white"));
    localStorage.setItem("shirt", JSON.stringify({ shirt }));
    localStorage.setItem("selectedButton", JSON.stringify(selectedButton));
    
   
  
    // eslint-disable-next-line
  }, []); 

  const handleColorChange = (selectedColor) => {
    localStorage.setItem("color", JSON.stringify(selectedColor));
    setColor(selectedColor);
    const img = `shirt_images/${shirt}-${JSON.parse(
      localStorage.getItem("color")
    )}-${JSON.parse(localStorage.getItem("side"))}.png`;
    setShirt(img);
  };

  const handleSideChange = (selectedSide) => {
    localStorage.setItem("side", JSON.stringify(selectedSide));
    setSide(selectedSide);
    const img = `shirt_images/${shirt}-${JSON.parse(
      localStorage.getItem("color")
    )}-${JSON.parse(localStorage.getItem("side"))}.png`;
    setShirt(img);
  };

  return (

    <div className="Details">

      <div className="detail">
        <div className="divforImage">
          <p className="productdetailname">{selectedButton.name}</p>
          <img src={selectedButton.colors[color][side]} className="picture" alt="" />
        </div>
        <div className="divforText">
          <p className="price">{selectedButton.price}</p>
          <p className="intro">{selectedButton.description}</p>
          <div className="divforDirection">
            <p className="direction">Side:</p>
            <button className="button" onClick={() => handleSideChange("front")}>
              Front
            </button>
            <button className="button" onClick={() => handleSideChange("back")}>
              Back
            </button>
          </div>
          <div className="divforColor">
            <p className="color">Color:</p>
            {dataArray.map((item, index) => (
              <button
                key={index}
                className="colorbutton"
                style={{ backgroundColor: item }}
                onClick={() => handleColorChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="divforQuantity">
            <label htmlFor="quantity" className="quantity">Quantity:</label>
            <select value={selectedQuantity} onChange={handleQuantityChange} id="quantity" name="quantity">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="divforQuantity">
            <label htmlFor="quantity" className="quantity">Size:</label>
            <select value={selectedSize} onChange={handleSizeChange} id="quantity" name="quantity">
              <option value="Size">Size</option>
              <option value="Women’s XS">Women’s XS</option>
              <option value="Women’s S">Women’s S</option>
              <option value="Women’s M">Women’s M</option>
              <option value="Women’s L">Women’s L</option>
              <option value="Women’s XL">Women’s XL</option>
              <option value="Women’s 2XL">Women’s 2XL</option>
              <option value="Men’s XS">Men’s XS</option>
              <option value="Men’s S">Men’s S</option>
              <option value="Men’s M">Men’s M</option>
              <option value="Men’s L">Men’s L</option>
              <option value="Men’s XL">Men’s XL</option>
              <option value="Men’s 2XL">Men’s 2XL</option>
            </select>

          </div>
          {selectedSize === "Size" ||  !isLoggedIn? (
            <button disabled id="addToCart" className="disable-button">Add To Cart</button>
          ) : (
            <Link to={routes.ShoppingCart}>
              <button onClick={()=>handleAddToCartClick()} id="addToCart">Add To Cart</button>

            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;