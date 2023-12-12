import React from "react";
import { ImEyePlus } from "react-icons/im";
import { VscPreview } from "react-icons/vsc";
import { MdStarRate } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Journals from "./Journals";
import Footer from "./Footer";
import FilmCard from "./FilmCard";

const HomePage = () => {
  return (
    <>
    <section className="highlights">
        <h2>NFQ ALLOWS YOU TO ...</h2>
      <div className="carousel">
        <div className="highlight-item">
          <span><FaEye size={40}/></span>
          <p>Keep track of films you have watched</p>
        </div>
        <div className="highlight-item">
          <span><VscPreview size={40}/></span>
          <p>Write and share reviews about films you love</p>
        </div>
        <div className="highlight-item">
          <span><MdStarRate size={40} /></span>
          <p>Rate films on a five-star scale to record your reaction</p>
        </div>
        <div className="highlight-item">
          <span><ImEyePlus size={40} /></span>
          <p>Add films to your watchlist</p>
        </div>
      </div>
    </section>

    <section>
        <Journals />
    </section>
    <section>
      <Footer />
    </section>
    <section>
      <FilmCard />
    </section>
    </>
  );
};

export default HomePage;
