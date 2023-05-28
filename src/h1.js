import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';
import routes from './AppRouter';

function H1({user}){
 
  const getGoogleProfileImageUrl = () => {
    if (user && user.providerData.length > 0) {
      const provider = user.providerData[0];
      if (provider.providerId === "google.com") {
        return provider.photoURL;
      }
    }
    return null;
  };
    return(
        <div>

            <hr/>
            <h1>
        
        <div className="h1text">
            
          <p>
          <Link to={routes.Tshirts} className="my-link"  style={{ color: "red" ,textDecoration:"none"}} >
                    T-SHIRTS
            </Link>
          </p>
          
        </div>
        <div className="h1text">
          <p>
          <Link to={routes.CreateFromPicture} className="my-link"style={{ color: "red" ,textDecoration:"none"}}>
              CREATE FROM PICTURE
            
            </Link>
          </p>
        </div>
        <div className="h1text">
          <p>
          <Link to={routes.NotImplement} className="my-link"style={{ color: "red" ,textDecoration:"none"}}>
              CREATE YOUR OWN
            
            </Link>
          </p>
        </div>
        <div className="h1text">
          <p>
          <Link to={routes.NotImplement} className="my-link"style={{ color: "red" ,textDecoration:"none"}}>
              ABOUT US
            
            </Link>
          </p>
        </div>
        <div className="h1text">
          
          <Link to={routes.LogIn} className="my-link"style={{ color: "red" ,textDecoration:"none"}}>
          {user ? (
        <div className="replaceLogIn">
          <img src={getGoogleProfileImageUrl()} alt="Profile" className='photo'></img>
          <p> {user.displayName}</p>
        </div>
      ) : (
        <p>LOG IN</p>
      )}
            
            </Link>
          
        </div>
    
    
      </h1>
      <hr></hr>
              </div>
        
    );
    
}
export default H1;

      