import React from "react";
import SearchIcon from "./Searchicon";
import { Link } from "react-router-dom";
import "./NavBarOfficial.css";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";

const NavbarOfficial = () => {

  const { userId } = useAuth();

  const handleLogout = async() => {
    try{

      const accessToken = sessionStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');

      await axios.post('http://localhost:4000/logout');

      sessionStorage.removeItem('access_token', accessToken);
      sessionStorage.removeItem('refresh_token', refreshToken);

      window.location.href = "/";
    }catch(error) {
      console.error('Error during logout', error);
    }
  }

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:4000/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const json = await response.json();
        setProfilePicture(json.data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile picture:', error.message);
      }
    };

    fetchProfilePicture();
  }, [userId]);

  return (
    <div>
      <nav className="navbar-official">
        <div className="navbar-search-icon">
          <SearchIcon />
        </div>
        <ul className="navbar-start">
          <li>
            <Link to={"/NairoFilmQuest"} style={{ textDecoration: "none", color: "white" }}>
              HOME
            </Link>
          </li>
          <li>SHOWS</li>
          <li>
            <Link to={"/all-films"} style={{ textDecoration: 'none', color: 'white' }}>WATCH FILMS</Link>
          </li>
          <Link to={`/Watchlist/${userId}`} style={{ textDecoration: "none", color: "white" }}>
              <span>WATCHLIST</span>
          </Link>
        </ul>
        <ul className="navbar-end">
          {/* <Link to="/watchlist">
            <button className="log">
              <BsBookmarkPlus size={25} />ADD
            </button>
          </Link> */}

          

          <div className="profile">
          {profilePicture ? (
              <img
                src={`http://localhost:4000/avatars/${profilePicture}`}
                alt="Profile"
                className="profile-icon"
              />
            ) : (
              <img
                src={`http://localhost:3000/profile/avatar.png`} // Provide the path to your default image
                alt="Default Profile"
                className="default-profile-icon"
              />
            )}
            <MdOutlineArrowDropDownCircle style={{ color: "white" }} size={25} />
            <div className="options">
              <Link to={`/User-Profile/${userId}`} style={{ textDecoration: "none", color: "black" }}>
                <span>Profile</span>
              </Link>
              
              
              <Link style={{ textDecoration: "none", color: "black" }}>
                <span onClick={handleLogout}>Logout</span>
              </Link>
              
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarOfficial;
