import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import './Watchlist.css';

const Watchlist = () => {
    const { userId } = useParams();
    const [watchlist, setWatchlist] = useState([]);
    const [isFetchingWatchlist, setIsFetchingWatchlist] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const storedUserId = sessionStorage.getItem('userId');

                const response = await axios.get(
                    `http://localhost:4000/getWatchlist/${storedUserId}`,
                    {
                        headers: { 
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Watchlist API Response:', response.data);

                setWatchlist(response.data);
                toast.success('Watchlist fetched successfully');
            } catch (error) {
                console.error('Error fetching watchlist:', error);
                toast.error('Failed to fetch watchlist');
            } finally {
                setIsFetchingWatchlist(false);
            }
        };

        fetchWatchlist();
    }, []);

    useEffect(() => {
        console.log('Watchlist Data:', watchlist);
    }, [watchlist]);

    return (
        <div className="Watchlist-container">
            <h2>Your Watchlist</h2>
            <ul>
            {watchlist.map((item) => (
    <li key={item._id}>
        {item.films.map((filmItem) => (
            <div key={filmItem._id}>
                {console.log('Film Item:', filmItem)}
                {console.log('Poster Path:', filmItem.film.posterImagePath)}
                {console.log('Film Title:', filmItem.film.title)}
                <img 
                    src={`${process.env.PUBLIC_URL}/Posters/${filmItem.film.posterImagePath}`}
                    alt={`Poster for ${filmItem.film.title}`}
                    onLoad={() => console.log('Poster loaded successfully')}
                    onError={() => console.error('Error loading poster')}
                />
                <p>Film: {filmItem.film.title}</p>
                <p>Added At: {new Date(item.addedAt).toLocaleDateString()}</p>
                <p>Watched: {filmItem.watched ? 'Yes' : 'No'}</p>
            </div>
        ))}
    </li>
))}

            </ul>
        </div>
    );
};

export default Watchlist;
