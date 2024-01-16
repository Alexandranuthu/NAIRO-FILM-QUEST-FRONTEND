import React from "react";
import "./NairoFilmQuest.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { IoTime } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./NairoFilmQuest.css";
import {useEffect, useState} from "react";
import Rating from './Rating';
import { FaCirclePlay } from "react-icons/fa6";


const FeaturedContent = () => {
    const [filmList, setFilmList] = useState([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const url = "http://localhost:4000/getFilms";
                const response = await fetch(url, {
                    method: 'GET', 
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                const json = await response.json();
                setFilmList(json.data);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchFilms();
    }, []);
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
    
    const shuffle = (array) => {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Shuffle the filmList array
    const shuffledFilms = shuffle(filmList);

    // Slice the first six films
    const firstSixFilms = shuffledFilms.slice(0, 6);
  

    return(
        <>
            <div className="featured-content">

                
                <div className="content">
                    <Carousel showArrows={true}
                        renderArrowPrev={CustomPrevArrow}
                        renderArrowNext={CustomNextArrow}
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false} // Disable the little dots
                        width="100%" // Set the width of the carousel
                        height= "90vh"
                        infiniteLoop={true}
                    className="carousel">
                        
                        {firstSixFilms.map((film, index) => (
    <div className="content" key={index}>
        <div className="image-container">
            <img src={`http://localhost:3000${film.posterImagePath}`} alt={`Poster for ${film.title}`} className="featured-posters" />
        </div>
        
        <div className="info">
            <h2 className="typography">{film.title}</h2>
            <div className="analytics">
            <span className="runtime"><IoTime color="#EA0085" size={30} />{film.runtime}</span>
            {
                film.ratings && film.ratings.length > 0 && (
                    <div className="ratings">
                        {film.ratings.map((rating, ratingsIndex)=>(
                            <Rating key={ratingsIndex} rating={rating}>
                                
                            </Rating>
                        ))}
                        </div>
                )
            }
            </div>
            
            <p className="desc">{film.synopsis}</p>
            
            {
                film.trailers && film.trailers.length > 0 && (
                    <div className="trailers">
                        {film.trailers.map((trailer, trailerIndex)=>(
                            <button key={trailerIndex} onClick={() => window.open(trailer.link, "_blank")} className="trailers">
                               <FaCirclePlay size={30} color="black"/> Watch Trailer
                            </button>
                        ))}
                        </div>
                )
            }
            
        </div>
    </div>
))}

                        
                    {/* <div className="content one">
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
                    </div> */}
                    </Carousel>
                    
                </div>
            </div>
        </>
    )
}

export default FeaturedContent;