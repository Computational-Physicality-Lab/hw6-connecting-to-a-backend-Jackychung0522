import React from 'react';
import SearchBar from './SearchBar';
import './SearchBar.css';
import './CreateFromPicture.css';
import shirtbase from './assets/images/shirt-base.png';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { createApi } from 'unsplash-js';
import { Link } from "react-router-dom";
import routes from './AppRouter';
import db from '.';
function CreateFromPicture() {
    const [selectedSize, setSelectedSize] = useState("Size");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [noResult, setNoResult] = useState(false);
    const unsplash = createApi({ accessKey: "QzlDf7ckHUDnJ6CJt-6gfdRGrzWavNCuyijZdgYC-Go" });
    const handleImageClick = (image) => {
        let now = sessionStorage.getItem("searchText");
        sessionStorage.setItem("now", now);
        setSelectedImage(image);
    };
    const handleSearch = (searchText) => {
        unsplash.search
            .getPhotos({ query: searchText, per_page: 10 }) // Search for photos based on the query keyword
            .then((result) => {
                if (result.errors) {
                    console.error("Failed to search images:", result.errors);

                } else if (result.response.results.length === 0) {
                    // Handle case when there are no search results
                    console.log("No result found");
                    setNoResult(true);
                    // Update state or perform any necessary actions
                    setImages([]);
                }
                else {
                    setImages(result.response.results);
                }
            })
            .catch((error) => {
                console.error("Failed to search images:", error);
            });
        console.log('Search text:', searchText);
    };
    const handleQuantityChange = (e) => {
        //localStorage.setItem("quantity", JSON.stringify(parseInt(e.target.value)));
        setSelectedQuantity(parseInt(e.target.value));
    }
    const handleSizeChange = (e) => {
        // localStorage.setItem("size", JSON.stringify(e.target.value));
        setSelectedSize(e.target.value);
    };
    const handleAddToCart = () => {
        let cartItem = {
            name: "",
            color: "white",
            size: selectedSize,
            price: 20,
            quantity: selectedQuantity,
            isPicture: true,
            createdAt: new Date()
        };
        if (selectedImage !== null) {
            cartItem = {
                name: sessionStorage.getItem("now"),
                color: "white",
                size: selectedSize,
                price: 20,
                quantity: selectedQuantity,
                src: selectedImage.urls.small,
                isPicture: true,
                createdAt: new Date()
            };
        }
        let userId = sessionStorage.getItem('userId');
        db.collection(userId).add(cartItem)
            .then((docRef) => {
                console.log("Data saved to Firestore. Document ID:", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document:", error);
            });
    }


    useEffect(() => {
        // 監聽使用者的登入狀態
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div className='createfrompicturepage'>
            <div className='item'>
                <div className="white-shirt">{selectedImage && (
                    <img src={selectedImage.urls.small} alt={selectedImage.alt_description} className="shirtbase" id='selectedImage' />
                )}<img src={shirtbase} id="whiteClothingImage" alt="shirtbase" className="shirtbase" ></img>
                </div>
                <div className="outofwhite-shirt">
                    <p id='price'>$20.00</p>
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
                    <Link to={routes.ShoppingCart}>
                        <button id='addtocart' onClick={handleAddToCart} disabled={!isLoggedIn || selectedSize === 'Size'||selectedImage==null}  >
                            Add to Cart
                        </button>
                    </Link>
                </div>

            </div>
            <div className='item'>
                <SearchBar className="SearchBar" onSearch={handleSearch} />
                {images.length === 0 && !noResult ? (
                    <p className='Scottytitle'>No search results. Maybe use a Scotty?</p>
                ) : images.length === 0 && noResult ? (
                    <p className='Scottytitle'>No Result</p>
                ) : (
                    <div className="image-grid">
                        {images.map((image) => (
                            <button
                                key={image.id}
                                onClick={() => handleImageClick(image)}
                                className='image-item-button'
                            >
                                <img
                                    key={image.id}
                                    src={image.urls.small}
                                    alt={image.alt_description}
                                    className="image-item"
                                />
                            </button>
                        ))}
                    </div>
                )}



            </div>

        </div>
    );
}
export default CreateFromPicture;