import React from 'react';
import Logo from "../../Icons/logo.svg";
import "./Header.css";

function Header(props) {
    return (
        <div className="header">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="navbar">
                <ul>
                    <li>Home</li>
                    <li>Plans & Pricing</li>
                    <li>FAQ's</li>
                    <li>Contact us</li>
                </ul>
            </div>
            <div className="btn-container">
                <button className='login-btn'>Login</button>
                <button className='signup-btn'>SignUp</button>
            </div>
        </div>
    );
}

export default Header;