import React from "react";
import { ImEyePlus } from "react-icons/im";
import { VscPreview } from "react-icons/vsc";
import { MdStarRate } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Journals from "./Journals";
import Footer from "./Footer";
import FilmCard from "./FilmCard";
import { Link } from "react-router-dom";
import HomeLayout from "./HomeLayout";

const HomePage = () => {
  return (
    <>
    <section id="home">
      <HomeLayout />
    </section>
    <section className=" section highlights" id="features">
        <h2>NFQ ALLOWS YOU TO ...</h2>
      <div className="carousel">
        <div className="highlight-item track">
          <Link to="/keepTrack" style={{ textDecoration: 'none', color: 'white' }}>
          <span><FaEye size={40}/></span>
          </Link>
          <p>Keep track of films you have watched</p>
          
        </div>
        <div className="highlight-item">
          <Link to="/KeepTrack" style={{ textDecoration: 'none', color: 'white' }} >
          <span><VscPreview size={40}/></span>
          </Link>
          
          <p>Write and share reviews about films you love</p>
        </div>
        <div className="highlight-item">
          <Link to= "/KeepTrack" style={{ textDecoration: 'none', color: 'white' }}>
            <span><MdStarRate size={40} /></span>
          </Link>
          
          <p>Rate films on a five-star scale to record your reaction</p>
        </div>
        <div className="highlight-item">
          <Link to="/KeepTrack" style={{ textDecoration: 'none', color: 'white' }}>
          <span><ImEyePlus size={40} /></span>
          </Link>
          
          <p>Add films to your watchlist</p>
        </div>
      </div>
    </section>
    <section className="section film-card-section">
      <FilmCard />
    </section>
    <section className="section journals-section" id="journals">
        <Journals />
    </section>
    
    
    <section className="section footer" id="about">
      <Footer />
    </section>
    </>
  );
};

export default HomePage;
