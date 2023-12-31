import React from "react";
import "./NairoFilmQuest.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { IoTime } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./NairoFilmQuest.css";
import {useEffect, useState} from "react";


const FeaturedContent = () => {

    const CustomPrevArrow = (onClickHandler, hasPrev, label) => (
        <button type="button" onClick={onClickHandler} disabled={!hasPrev} aria-label={label} className="custom-arrow custom-prev-arrow">
            <span><FaChevronCircleLeft size={35} /></span>
        </button>
    );

    const CustomNextArrow = (onClickHandler, hasNext, label) => (
        <button type="button" onClick={onClickHandler} disabled={!hasNext} aria-label={label} className="custom-arrow custom-next-arrow">
            <span><FaChevronCircleRight size={35}/></span>
        </button>
    );
    

  

    return(
        <>
            <div className="feautured-content">

                
                <div className="content">
                    <Carousel showArrows={true}
                        renderArrowPrev={CustomPrevArrow}
                        renderArrowNext={CustomNextArrow}
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false} // Disable the little dots
                        width="80%" // Set the width of the carousel
                        infiniteLoop={true}
                    className="carousel">
                    <div className="content one">
                        <img src="images/40sticks.jpg" alt="40 sticks" style={{ height: '80%' }} />
                        <div className="info">
                        <img src="imagetext/40sticks.png" className="imagetext" style={{ width: '250px' }} alt="40sticks-text"/>
                        <span className="runtime"><IoTime color="#EA0085" size={40}/>92</span>
                        <p className="desc">When their prison bus crashes in a forest on a rainy night, a group of criminals finds themselves battling wild animals and a mysterious killer.</p>
                        </div>
                        
                    </div>

                    <div className="content">
                        <img src="images/volume.jpg" alt="volume" style={{ height: '80%' }}/>
                        <div className="info">
                        <img src="imagetext/volume.png" className="imagetext" style={{ width: '250px' }} alt="volume-text"/>
                        <span className="runtime"><IoTime color="#EA0085" size={40}/>1 season</span>
                        <p className="desc">While chasing his dream of making a living through music, a talented young man from humble
                         origins gets entangled in dubious dealings.</p>
                        </div>
                    </div>

                    <div className="content">
                        <img src="images/softie.png" alt="softie" style={{ width: '100%' }}/>
                        <div className="info">
                        <img src="imagetext/softie.png" className="imagetext" style={{ width: '250px' }} alt="softie-text"/>
                        <span className="runtime"><IoTime color="#EA0085" size={40}/>92</span>
                        <p className="desc">
                        Boniface “Softie” Mwangi has long fought injustices in his country as a political activist.
                         From the moment Boniface decides to run, he responds to each challenge with optimism. 
                        And Boniface soon finds that challenging strong political dynasties is putting his family at risk.
                        </p>
                        </div>
                    </div>

                    <div className="content">
                        <img src="images/rafiki.jpg" alt="Rafiki" style={{ width: '100%' }}/>
                        <div className="info">
                        <img src="imagetext/rafiki.png" className="imagetext" style={{ width: '250px' }} alt="rafiki-text"/>
                        <span className="runtime"><IoTime color="#EA0085" size={40}/>92</span>
                        <p className="desc">In Nairobi, Kena and Ziki lead contrasting lives. Their worlds collide during their fathers' political campaigns, sparking a connection that evolves into a secret love</p>
                        </div>
                    </div>

                    <div className="content">
                        <img src="images/nairobi-half-life.jpg" alt="nairobi half life"/>
                        <div className="info">
                        <img src="imagetext/nairobi-half-life.png" className="imagetext" style={{ width: '300px', float: 'left' }} alt="softie-text"/>
                        <span className="runtime"><IoTime color="#EA0085" size={40}/>96</span>
                        <p className="desc">
                            <i>Have we chosen to be the way we are?</i>
                        As a seller of Western action films,
                        he transforms into a captivating actor, 
                        performing stunts to enthrall customers. Crossing paths with Nairobi actors, 
                        he seeks their guidance to kickstart his own aspiring acting career.
                        </p>
                        </div>
                    </div>
                    </Carousel>
                    
                </div>
            </div>
        </>
    )
}

export default FeaturedContent;