import React, { useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { useParams } from "react-router-dom";

const SingleFilm = () => {
    const { id } = useParams(); // Corrected usage: useParams is a function
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const url = `http://localhost:4000/getFilmDetails/${id}`;
                console.log('Fetching from URL:', url);
                const response = await fetch(url);
                const json = await response.json();
                console.log('Fetched Film:', json);
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
            <div className="film-details">
            <img src={`http://localhost:3000${film.posterImagePath}`} alt={`Poster for ${film.title}`} className="film-posters" />
                <h1>{film.title}</h1>
                <p>{film.director}</p>
                <p>{film.releaseyear}</p>
                <p>{film.synopsis}</p>
                <span className="runtime"><IoTime color="#EA0085" size={40} />{film.runtime}</span>
                <p>{film.genre}</p>
                <p>{film.cast}</p>

            </div>
        </>
    )
}

export default SingleFilm;
