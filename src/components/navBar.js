import React from "react";
import SearchIcon from "./Searchicon";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="container">
            <nav className="navbar">
                <div className="navbar-search-icon">
                    <SearchIcon />
                </div>
                <ul className="navbar-start">
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>Shows</li>
                    <li>Movies</li>
                    <li>Discover</li>
                </ul>
                <ul className="navbar-end">
                    <li>SIGN IN</li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;

