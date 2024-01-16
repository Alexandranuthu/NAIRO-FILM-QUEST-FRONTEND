import React from "react";
import "./NairoFilmQuest.css";
import FeaturedContent from "./FeaturedContent";
import NavbarOfficial from "./navbarOfficial";
import FeaturedContentFilms from "./featuredContentFilms";
import WelcomeMessage from "./WelcomeMessage";
import { useState } from "react";
import List from "./List";
import axios from "axios";
import { useEffect } from "react";


const NairoFilmQuest = () => {
  const [user, setUser] = useState(null);

const fetchData = async (searchKey) => {
    try {
      const accessToken = sessionStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:4000/getFilms${searchKey ? `?search=${searchKey}` : ''}`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
          },
        });
        // Process response data
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid, refresh token or handle accordingly
            // Example: refreshToken() and retry the request
            // setAccessToken(newAccessToken);
        } else {
            console.error('Error fetching search results:', error);
        }
    }
};

// Call fetchData when component mounts
useEffect(() => {
    fetchData();
}, []);

  return (
    <>
      <div className="Nairo-Film-Quest">
        <NavbarOfficial/>
        <WelcomeMessage/>
        <div className="featured-content">
            <FeaturedContent />
        </div>
        <div>
          <FeaturedContentFilms/>
        </div>
        <div>
          <List />
        </div>
      </div>
    </>
  );
};

export default NairoFilmQuest;
