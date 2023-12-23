import React from "react";
import "./NairoFilmQuest.css";
import FeaturedContent from "./FeaturedContent";
import NavbarOfficial from "./navbarOfficial";

const NairoFilmQuest = () => {
  return (
    <>
      <div className="Nairo-Film-Quest">
        <NavbarOfficial />
        <div className="featured-content">
            <FeaturedContent />

        </div>
      </div>
    </>
  );
};

export default NairoFilmQuest;
