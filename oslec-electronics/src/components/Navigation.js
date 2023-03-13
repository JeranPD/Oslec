import React, { useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// Logo
import Logo from "../assets/image/logo1.png";
// Css
import "../assets/css/Navigation.css";

const Navigation = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <div>
      <header className="navbar-section">
        <span className="logo-home">
          <Link className="logo navbar-brand" to="/">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
        </span>
        <nav className="nav" ref={navRef}>
          <Link className="nav-link home" to="/">
            Home
          </Link>
          <Link className="nav-link tracking" to="/tracking">
            Tracking
          </Link>
          <Link className="nav-link about" to="/aboutUS">
            About Us
          </Link>
          <Link className="nav-link login" to="/login">
            Log In
          </Link>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
      <Outlet />
    </div>
  );
};

export default Navigation;
