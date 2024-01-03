import React, { useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "./SingleFilm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";


const SingleFilm = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    const {
        addMovieToWatchlist, watchlist
    } = useContext(GlobalContext);

    let storedMovie = watchlist.find(o => o.id === film.id)

    const watchlistDisabled = storedMovie ? true : false;

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
        <button key={film._id} 
        disabled = {watchlistDisabled}
        onClick={() => addMovieToWatchlist(film)}>Add to Watchlist</button>
        {/* {watchlistAdditionStatus === 'success' && (
            <div style={{ color: 'green' }}>Film added to watchlist successfully</div>
        )}
        {watchlistAdditionStatus === 'error' && (
            <div style={{ color: 'red' }}>Failed to add film to watchlist</div>
        )} */}
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
                <p>Genres: {film.genre.map(g => g.name).join(', ')}</p>
                <p>{film.cast}</p>
            </div>
                
            </div>
        </>
    );
}

export default SingleFilm;
