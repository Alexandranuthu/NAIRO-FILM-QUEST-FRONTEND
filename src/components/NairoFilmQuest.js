import React from "react";
import "./NairoFilmQuest.css";
import FeaturedContent from "./FeaturedContent";
import NavbarOfficial from "./navbarOfficial";
import FeaturedContentFilms from "./featuredContentFilms";
import WelcomeMessage from "./WelcomeMessage";
import { useState } from "react";

const NairoFilmQuest = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <div className="Nairo-Film-Quest">
        <NavbarOfficial />
        <WelcomeMessage user={user}/>
        <div className="featured-content">
            <FeaturedContent />
        </div>
        <div>
          <FeaturedContentFilms/>
        </div>
      </div>
    </>
  );
};

export default NairoFilmQuest;
