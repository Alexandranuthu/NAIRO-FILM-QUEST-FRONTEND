import React, { useState } from "react";
import SearchIcon from "./Searchicon";
import { Link } from "react-router-dom";
import "./NavBarOfficial.css";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const NavbarOfficial = () => {
    return(
        <div>
            <nav className=" navbar-official">
                <div className="navbar-search-icon">
                    <SearchIcon />
                </div>
                <ul className="navbar-start">
                    <li>
                        <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                    </li>
                    <li>Shows</li>
                    <li>
                        <Link to={"/all-films"}>
                        FILMS
                        </Link>
                        </li>
                    <li>Discover</li>
                </ul>
                <ul className="navbar-end">
                    <li>
                        <Link to={"/register"} style={{ textDecoration: 'none', color: 'white' }}>SIGN IN</Link>
                        
                    </li>

                    <div className="profile">
                        < MdOutlineArrowDropDownCircle  style={{ color: 'white' }}/>
                        <div className="options">
                            <Link to="/User-Profile">
                            <span>Profile</span>
                            </Link>
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
    )
}
export default NavbarOfficial;