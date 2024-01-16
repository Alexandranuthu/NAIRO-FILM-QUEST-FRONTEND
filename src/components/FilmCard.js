import React, { useState, useEffect } from "react";
import axios from "axios";

const FilmCard = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        const response = await axios.get('http://localhost:4000/getFilm', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setFilms(response.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };
  
    fetchFilms();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {films.map((film) => (
        <div key={film._id} className="col">
          <div className="card h-100 w-60">
            <img
              src={`${process.env.PUBLIC_URL}/Posters/${film.posterImagePath}`}
              className="card-img-top"
              alt={film.title}
              style={{ width: "300", height: "300" }}
            />
            <div className="card-body">
              <h5 className="card-title">{film.title}</h5>
              <p className="card-text">{film.synopsis}</p>
            </div>
            <div className="card-button">
              <a
                href={
                  film.whereToWatch.length > 0
                    ? film.whereToWatch[0].link
                    : ""
                }
              >
                WATCH NOW
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmCard;
