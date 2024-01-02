// Films.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NairoFilmQuest.css";

const Films = () => {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    // Fetch films based on the search term
    const fetchFilms = async () => {
      try {
        const url = `http://localhost:4000/getFilms`;
        const response = await fetch(url);
        const json = await response.json();
        setFilmList(json.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <>
      <div className="film-container">
        {filmList.map((film) => (
          <div className="featured-items">
          <Link to={`/film/${film._id}`} style={{ textDecoration: 'none',}} key={film._id} className="film-item">
            <img src={`http://localhost:3000${film.posterImagePath}`} alt={`Poster for ${film.title}`} className="film-posters-featured" />
            <div>
              <h2 className="film-title">{film.title}</h2>
            </div>
            <div className="release-year">
              {film.releaseyear}
            </div>
          </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Films;
