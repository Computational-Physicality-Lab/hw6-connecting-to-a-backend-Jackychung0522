import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';

import routes from './AppRouter';

function Footer() {
    
    return (
        <footer>
        <div className="footerStyle">
          <div className="footerText">
            <p>
            
              <Link to={routes.NotImplement} className="my-link" style={{ color: "gray" ,textDecoration: "none"}}>
                    Contact Us
              </Link>
           
              
            </p>
          </div>
          <div className="footerText">
            <p>
            <Link to={routes.NotImplement} className="my-link"style={{ color: "gray",textDecoration: "none"}}>
                
                Site Map
              </Link>
            </p>
          </div>
          <div className="footerText">
            <p>
            <Link to={routes.NotImplement} className="my-link"style={{ color: "gray" ,textDecoration: "none"}}>
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="footerText">
            <p>
            <Link to={routes.NotImplement} className="my-link"style={{ color: "gray" ,textDecoration: "none"}}>
                Careers
              </Link>
            </p>
          </div>
          <div className="footerText">
            <p>
            <Link to={routes.NotImplement} className="my-link"style={{ color: "gray" ,textDecoration: "none" }}>
                Reviews
              </Link>
            </p>
          </div>
          <div className="footerText">
            <p>
              Designed by Jacky
            </p>
          </div>
        </div>
      </footer> 
      
    );
  }
  
  export default Footer;