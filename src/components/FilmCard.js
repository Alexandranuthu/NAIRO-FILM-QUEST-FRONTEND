import React, { useState, useEffect } from "react";
import axios from "axios";

const FilmCard = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getFilm"); // Replace with your actual backend API endpoint
        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className="col">
      <div className="card h-100 w-60">
        <img src={films.length > 0 ? films[0].poster : ''} className="card-img-top" alt={films.length > 0 ? films[0].title : ''} style={{ width: "300", height: "300" }} />
        <div className="card-body">
            <img src={films.poster} alt={films.title}></img>
          <h5 className="card-title">{films.length > 0 ? films[0].title : ''}</h5>
          <p className="card-text">{films.length > 0 ? films[0].synopsis : ''}</p>
        </div>
        <div className="card-button">
          <a href={films.length > 0 && films[0].whereToWatch.length > 0 ? films[0].whereToWatch[0].link : ''}>WATCH NOW</a>
        </div>
      </div>

      <div className="card h-100 w-60">
        <img src={films.length > 0 ? films[1].poster : ''} className="card-img-top" alt={films.length > 0 ? films[1].title : ''} style={{ width: "300", height: "300" }} />
        <div className="card-body">
            <img src={films.poster} alt={films.title}></img>
          <h5 className="card-title">{films.length > 0 ? films[1].title : ''}</h5>
          <p className="card-text">{films.length > 0 ? films[1].synopsis : ''}</p>
        </div>
        <div className="card-button">
          <a href={films.length > 0 && films[0].whereToWatch.length > 0 ? films[0].whereToWatch[0].link : ''}>WATCH NOW</a>
        </div>
      </div>

      <div className="card h-100 w-60">
        <img src={films.length > 0 ? films[4].poster : ''} className="card-img-top" alt={films.length > 0 ? films[1].title : ''} style={{ width: "300", height: "300" }} />
        <div className="card-body">
            <img src={films.poster} alt={films.title}></img>
          <h5 className="card-title">{films.length > 0 ? films[4].title : ''}</h5>
          <p className="card-text">{films.length > 0 ? films[4].synopsis : ''}</p>
        </div>
        <div className="card-button">
          <a href={films.length > 0 && films[0].whereToWatch.length > 0 ? films[0].whereToWatch[0].link : ''}>WATCH NOW</a>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
