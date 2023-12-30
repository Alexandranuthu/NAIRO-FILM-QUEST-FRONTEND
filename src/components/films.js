import React, { useEffect, useState } from "react";

const Films = () => {
  const [filmList, setFilmList] = useState([]);

  const getFilms = () => {
    fetch('http://localhost:4000/getFilms')
      .then(res => res.json())
      .then(json => setFilmList(json.data))
      .catch(error => console.error('Error fetching films:', error));
  }

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <>
    <div className="film-container">
    {filmList.map((film) => (
        <div key={film.id} className="film-item">
          <img src={`http://localhost:3000${film.posterImagePath}`} alt="film posters" className="film-posters" />
          <div>
            <h2>{film.title}</h2>
            <p>{film.synopsis}</p>
          </div>
          <div>
          {film.trailers.map((trailer, index) => (
            <a key={index} href={trailer.link} target="_blank" rel="noopener noreferrer">
              Trailer Link
            </a>
          ))}
          </div>
        </div>
      ))}
    </div>
      
    </>
  );
}

export default Films;
