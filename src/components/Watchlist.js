import React, { useEffect, useState } from "react";
import axios from "axios";

const WatchList = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                // Assuming you have a dynamic watchlist item ID (replace with the actual ID)
                const watchlistItemId = "your_actual_watchlist_item_id";
                const response = await axios.get(`http://localhost:4000/watchlist/get/${watchlistItemId}`);
                setWatchlist([response.data]); // Assuming the response is a single watchlist item
            } catch (error) {
                console.error(`Error fetching watchlist: ${error}`);
            }
        };

        fetchWatchlist();
    }, []);

    return (
        <>
            <div>
                <h1>Watch List</h1>
                {watchlist.length > 0 ? (
                    <ul>
                        {watchlist.map((item) => (
                            <li key={item._id}>
                                <p>{item.film.title}</p>
                                {/* Include other details as needed */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the watchlist</p>
                )}
            </div>
        </>
    );
};

export default WatchList;
