import React from "react";
import SearchIcon from "./Searchicon";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };
    return (
        <div className="container">
            <nav className={`navbar ${isActive ? "active" : ""}`} onClick={toggleNavbar}>
                <div className="navbar-toggle" onClick={toggleNavbar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className="navbar-start">
                    <li>
                        <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                    </li>
                    <li>
                        <a href="#features" style={{ textDecoration: 'none', color: 'white' }}>Features</a>
                    </li>
                    <li>
                        <a href="#journals" style={{ textDecoration: 'none', color: 'white' }}>Journals</a>
                    </li>
                    <li>
                        <a href="#about" style={{ textDecoration: 'none', color: 'white' }}>About</a>
                    </li>
                </ul>
                <ul className="navbar-end">
                    <li>
                        <Link to={"/register"} style={{ textDecoration: 'none', color: 'white' }}>SIGN IN</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
