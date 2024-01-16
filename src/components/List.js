import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const response = await axios.get("http://localhost:4000/getLists",
                {
                    headers: { 
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
                );
                setList(response.data.data);
            } catch (error) {
                console.error('Error fetching Lists:', error);
            }
        };

        fetchLists();
    }, []);

    if (!list) {
        return <div>Loading...</div>;
    }

    return (
        <div className="List-container">
            {list.map((listItem) => (
                <div key={listItem._id}>
                    <h3>Title: {listItem.title}</h3>
                    <ul>
                        {listItem.film.map((film) => (
                            <li key={film._id}>
                                <img src={`http://localhost:3000${film.posterImagePath}`} alt={`Poster for ${film.title}`} />
                                <p>Title: {film.title}</p>
                                {/* <p>Genres: {film.genre.map(g => g.name).join(', ')}</p> */}
                                {/* Add other film details */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default List;
