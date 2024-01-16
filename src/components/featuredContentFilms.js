import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NairoFilmQuest.css";
import SearchIcon from "./Searchicon";

const Films = () => {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    const fetchFilms = async (searchKey) => {
      try {
        const url = `http://localhost:4000/getFilms${searchKey ? `?search=${searchKey}` : ''}`;
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
}, []); // Ensure that accessToken is included in the dependency array


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