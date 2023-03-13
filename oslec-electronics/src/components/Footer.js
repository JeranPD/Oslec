import "../assets/css/Footer.css";
import Logo from "../assets/image/logo.png";
import address from "../assets/image/address.png";
import { TbSend } from "react-icons/tb";
import { CiFacebook } from "react-icons/ci";
import { RiMessengerLine } from "react-icons/ri";
import React, { useRef } from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  const navRef = useRef();
  return (
    <div className="footer">
      <div className="footer-section">
        <div className="message-container">
          <h3 className="message-text">
            Message <span className="us-lowercase">us</span>
          </h3>
          <input type="text" className="message-input" />
          <button className="message-btn">
            <TbSend />
          </button>
        </div>
        <div className="footer-logo-container">
          <img src={Logo} className="footer-logo" />
          <h2 className="logo-text">
            <span className="os-color">Os</span>lec Electronics Services
          </h2>
        </div>
      </div>

      <div className="oslec-links-footer">
        <ul className="footer-links">
          <li className="footer-link">
            <Link
              to="/"
              className="link-footer"
              > 
                  Home
            </Link>
          </li>
          <li className="footer-link">
            <Link
              to="/tracking"
              className="link-footer"
              >
                  Tracking
            </Link>
          </li>
          <li className="footer-link">
            <Link
              to="/aboutUs"
              className="link-footer"
              >
                  About Us
            </Link>
          </li>
          <li className="footer-link">
          <Link
              to="/login"
              className="link-footer"
              >
                  Login
            </Link>
          </li>
        </ul>
      </div>

      <div className="Address-container">
        <h2 className="Address-title">Contact us</h2>
        <h3 className="phone-number">
          <span>phone</span>(42) 82-221-3575
        </h3>
        <h3 className="shop-status"> <span className="os-color">Shop</span> Status: Open</h3>
      </div>

      <div className="Map-container">
        <h2 className="Address-title">Our Address</h2>
        <button className="map" ref={navRef}>
          <Link className="btn--text btn--scroll-to" to="/aboutUS">
            <img src={address} className="address"/>
          </Link>
          
        </button>
        <div className="social-links">
          <h3 className="social-title">
            Follow <span className="us-lowercase">us</span>
          </h3>
          <span className="social-link">
            <a href="https://www.facebook.com/doitelectronically"><CiFacebook /></a>
          </span>
          <span className="social-link">
          <a href="https://www.facebook.com/messages/t/2403974803219495"><RiMessengerLine /></a>
            
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
