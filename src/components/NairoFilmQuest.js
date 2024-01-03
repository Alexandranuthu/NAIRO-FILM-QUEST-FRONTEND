import React from "react";
import "./NairoFilmQuest.css";
import FeaturedContent from "./FeaturedContent";
import NavbarOfficial from "./navbarOfficial";
import FeaturedContentFilms from "./featuredContentFilms";
import WelcomeMessage from "./WelcomeMessage";
import { useState } from "react";
import List from "./List";

const NairoFilmQuest = () => {
  const [user, setUser] = useState(null);
  return (
    <>
      <div className="Nairo-Film-Quest">
        <NavbarOfficial />
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
