import React from 'react';
import { Link } from 'react-router-dom';
import shirts from '../src/shared/shirts'
import routes from './AppRouter';
function Tshirts(){
    return (
        <div className="T-SHIRTS">
          {shirts.map((shirt, index) => (
            <div key={index} className="divForBlocks">
              <div className="block">
                <Link to={routes.Details} className="imgbutton" onClick={() => {localStorage.setItem('selectedButton', JSON.stringify(shirt));  localStorage.setItem(
                        'selectedButton',
                        JSON.stringify(shirt)
                      );
                      localStorage.setItem('name', JSON.stringify(shirt.name));} }>
                  <img src={shirt.colors.white.front } alt="White shirt front view"/>
                </Link>
                <p className="productname">{shirt.name}</p>
                <p className="colornumber">
                  Available in {Object.keys(shirt.colors).length} colors
                </p>
                <div className="productbutton">
                  {/* <button
                    className="innerproductbutton"
                    onClick={() => {
                      localStorage.setItem(
                        'selectedButton',
                        JSON.stringify(shirt)
                      );
                    }}
                  >
                    Quick view
                  </button> */}
                  <Link to={routes.Details}
                    id={`button${index}`}
                    className="seePage"
                    onClick={() => {
                      localStorage.setItem(
                        'selectedButton',
                        JSON.stringify(shirt)
                      );
                      localStorage.setItem('name', JSON.stringify(shirt.name));
                    }}
                    
                  >
                    See Page
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}
export default Tshirts;
