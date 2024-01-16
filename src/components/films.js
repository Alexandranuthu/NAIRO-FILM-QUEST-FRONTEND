import React, { useEffect, useState } from "react";
import "./films.css";
import NavbarOfficial from "./navbarOfficial";

const Films = () => {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    // Fetch films based on the search term
    const fetchFilms = async (searchKey) => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        const url = `http://localhost:4000/getFilms${searchKey ? `?search=${searchKey}` : ''}`;
        const response = await fetch(url, {
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
  
  const handleFilmItemClick = (event, film) => {
    // Prevent the default behavior to avoid navigating to the film details page
    event.preventDefault();
    
    // Use window.open to open the "Watch" link in a new tab
    if (film.whereToWatch && film.whereToWatch.length > 0) {
      const watchLink = film.whereToWatch[0].link; // Assuming there's only one link
      window.open(watchLink, "_blank");
    }
  };
  
  return (
    <>
      <div>
        <NavbarOfficial />
      </div>
      <div className="film-container-all">
        {filmList && filmList.length > 0 ? (
          filmList.map((film) => (
            <div key={film._id} className="film-item-all" onClick={(e) => handleFilmItemClick(e, film)}>
              <img src={`http://localhost:3000${film.posterImagePath}`} alt="film posters" className="film-posters-all" />
              <div>
                <h2 className="film-title-all">{film.title}</h2>
              </div>
              <div className="where-to-watch-all">
                {film.whereToWatch && film.whereToWatch.length > 0 && (
                  <div className="where-to-watch-all">
                    {film.whereToWatch.map((whereToWatch, whereToWatchIndex) => (
                      <a
                        key={whereToWatchIndex}
                        href={whereToWatch.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whereToWatch-all"
                      >
                        <button className="watch-film">
                          Watch
                        </button>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Films;
