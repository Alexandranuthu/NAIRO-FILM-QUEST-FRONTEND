import React, { useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "./SingleFilm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SingleFilm = ({addToWatchlist}) => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [watchlistAdditionStatus, setWatchlistAdditionStatus] = useState(null);
    const navigate = useNavigate();

    const handleAddToWatchlist = async (filmId,e) => {
        e.preventDefault();
  
    try {
      // Log the constructed API URL
      const apiUrl = `http://localhost:4000/Watchlist/post`;
      const response = await axios.post(apiUrl, {filmId});
  
      // Log the response for debugging
      console.log("Server Response:", response);
  
      if (response.status === 200) {
        console.log('Film Added Successfully to watchlist');
        setWatchlistAdditionStatus('success');
        // Redirect to your desired route after successful upload
        navigate ('/watchlist')
      } else  {
        console.error('Failed to add film to watchlist');
        setWatchlistAdditionStatus('error');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      setWatchlistAdditionStatus('error');
    }
    }

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const url = `http://localhost:4000/getFilmDetails/${id}`;
                const response = await fetch(url);
                const json = await response.json();
                setFilm(json.data);
            } catch (error) {
                console.error('Error fetching film:', error);
            }
        }
        fetchFilm();
    }, [id]);

    if (!film) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <button onClick={(e) => handleAddToWatchlist(film._id, e)}>Add to Watchlist</button>
        {watchlistAdditionStatus === 'success' && (
            <div style={{ color: 'green' }}>Film added to watchlist successfully</div>
        )}
        {watchlistAdditionStatus === 'error' && (
            <div style={{ color: 'red' }}>Failed to add film to watchlist</div>
        )}
            <div className="film-details">
                <div className="film-backdrop">
                    <img
                        src={`/Posters/Backdropstills/house-of-lungula.png`}
                        alt={`Backdrop for ${film.title}`}
                        className="film-backdrop-image"
                    />
                    <div className="shadow-overlay"></div>
                </div>
                <div className="film-poster-container">
                    <img
                        src={`http://localhost:3000${film.posterImagePath}`}
                        alt={`Poster for ${film.title}`}
                        className="film-poster"
                    />
                </div>
                <div className="film-info-row">
                <h1 className="title">{film.title}</h1>
                <p>{film.releaseyear}</p>
                <p>Directed By{film.director}</p>
                <p>{film.synopsis}</p>
                <span className="runtime"><IoTime color="#EA0085" size={40} />{film.runtime}</span>
                <p>{film.genre}</p>
                <p>{film.cast}</p>
            </div>
                
            </div>
        </>
    );
}

export default SingleFilm;
