import React from "react";
import "./NairoFilmQuest.css";
import FeaturedContent from "./FeaturedContent";
import NavbarOfficial from "./navbarOfficial";
import FeaturedContentFilms from "./featuredContentFilms";

const NairoFilmQuest = () => {
  return (
    <>
      <div className="Nairo-Film-Quest">
        <NavbarOfficial />
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
