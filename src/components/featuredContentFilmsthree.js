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
          <Link to={`/film/${film.id}`} key={film._id} className="film-item">
            <img src={`http://localhost:3000${film.posterImagePath}`} alt={`Poster for ${film.title}`} className="film-posters" />
            <div>
              <h2 style={{ color: "black" }}>{film.title}</h2>
            </div>
            <div>
              {film.cast}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Films;
