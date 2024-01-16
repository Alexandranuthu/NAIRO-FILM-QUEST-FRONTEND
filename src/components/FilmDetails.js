// FilmDetails.js
import React, { useEffect, useState } from "react";
import featuredContentFilms from  "./featuredContentFilms"

const FilmDetails = ({ match }) => {
  const { filmId } = match.params;
  const [filmDetails, setFilmDetails] = useState(null);

  useEffect(() => {
    const getFilmDetails = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        const response = await fetch(`http://localhost:4000/getFilmDetails/${filmId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setFilmDetails(json.data);
      } catch (error) {
        console.error('Error fetching film details:', error);
      }
    };
  
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
