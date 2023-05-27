import React from 'react';
import './index.css'
import scotty from './assets/images/scotty.png';
function NotImplement(){
    return (
        <div className="notImplement">
          
            <div className="backgroud">
              
              <img src={scotty} alt="image_description"></img>
              Oops!this page doesn't exist yet... how about the shirt from the last page?
            </div>
            
          
        </div>
      );
}
export default NotImplement;