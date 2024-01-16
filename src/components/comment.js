import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = ({comment}) => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const url = `http://localhost:4000/addReview`;
                const response = await fetch(url);
                const json = await response.json();
                setFilm(json.data);
            } catch (error) {
                console.error('Error fetching film:', error);
            }
        };
        fetchFilm();
    }, [id]);
  return (
    <>
        <div>
            <p>{comment.name}</p>
            
        </div>
    </>
  )
}

export default Comment;