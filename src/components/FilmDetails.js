// FilmDetails.js
import React, { useEffect, useState } from "react";
import featuredContentFilms from  "./featuredContentFilms"

const FilmDetails = ({ match }) => {
  const { filmId } = match.params;
  const [filmDetails, setFilmDetails] = useState(null);

  useEffect(() => {
    const getFilmDetails = () => {
      fetch(`http://localhost:4000/getFilmDetails/${filmId}`)
        .then(res => res.json())
        .then(json => setFilmDetails(json.data))
        .catch(error => console.error('Error fetching film details:', error));
    }

    getFilmDetails();
  }, [filmId]);

  return (
    <>
      <div className="filmDetails-container">
          {filmDetails.map((film)=>(
            <img src={`http://localhost:3000${film.posterImagePath}` } alt="film posters" className="film-posters"/>
          ))}
      </div>
        
    </>
  );
}

export default FilmDetails;
