import React, { useEffect, useState } from "react";
import { IoTime } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "./SingleFilm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "./comment";
import NavbarOfficial from "./navbarOfficial";
import { BsBookmarkPlus } from "react-icons/bs";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from "./Review";
import EditReview from "./EditReview";


const SingleFilm = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState(null);
    const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    const handleCommentChange = (event) => {
        setContent(event.target.value);
    };


    
    const handleEditReview = (review) => {
        setSelectedReview(review);
        setIsEditingReview(true);
    };

    const handleCloseEditReview = () => {
        setSelectedReview(null);
        setIsEditingReview(false);
    };

    useEffect(() => {
        const fetchWatchlistStatus = async () => {
            try {
                const accessToken = sessionStorage.getItem('access_token');
                const storedUserId = sessionStorage.getItem('userId');

                const watchlistResponse = await axios.get(
                    `http://localhost:4000/inWatchlist/${storedUserId}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setIsInWatchlist(watchlistResponse.data.isInWatchlist);
            } catch (error) {
                console.error('Error fetching watchlist status:', error);
            }
        };

        fetchFilm();
        fetchWatchlistStatus();
    }, [id]); 


    const fetchFilm = async () => {
        try {
            const accessToken = sessionStorage.getItem('access_token');
            const storedUserId = sessionStorage.getItem('userId');
            // Fetch film details
            const filmUrl = `http://localhost:4000/getFilmDetails/${id}`;
            const filmResponse = await fetch(filmUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const filmJson = await filmResponse.json();
            setFilm(filmJson.data);

            // Fetch reviews
            const reviewsUrl = `http://localhost:4000/getReview/${filmJson.data._id}`;
            const reviewsResponse = await fetch(reviewsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const reviewsJson = await reviewsResponse.json();
            setReviews(reviewsJson.success ? reviewsJson.data : []);

            // const watchlistResponse = await axios.get(`http://localhost:4000/inWatchlist/${storedUserId}/${id}`, {
            //     headers:{
            //         Authorization:  `Bearer ${accessToken}`,
            //         'Content-Type': 'application/json',
            //     },
            // });
            // setIsInWatchlist(watchlistResponse.data.isInWatchlist);

        } catch (error) {
            console.error('Error fetching film and reviews:', error);
        }
    };

    useEffect(() => {
        fetchFilm();
    }, [id]);

    if (!film) {
        return <div>Loading...</div>;
    }

    

    const handleAddToWatchlist = async () => {
        try {
            setIsAddingToWatchlist(true);

            const accessToken = sessionStorage.getItem('access_token');
            const storedUserId = sessionStorage.getItem('userId');

            const response = await axios.post(
                `http://localhost:4000/addToWatchlist/${storedUserId}`,
                { filmId: id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Film added to watchlist:', response.data);

            // Check if the response indicates the movie is already in the watchlist
            if (response.status === 400 && response.data.message === 'Movie is already in the watchlist') {
                await axios.delete(
                    `http://localhost:4000/remove/${storedUserId}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                toast.warn('Film removed from your watchlist');
                setIsInWatchlist(false); // Update the state to reflect removal
            } else if (response.status === 200) {
                // Movie added to watchlist successfully
                toast.success('Film added to watchlist successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000, //3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    transition: Slide,
                });
                setIsInWatchlist(true);
            } else {
                // Handle other cases, if any
                console.error('Unexpected response:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error adding film to watchlist', error);

            toast.error('Failed to add film to watchlist');
        } finally {
            setIsAddingToWatchlist(false);
        }
    };

    

    const handleAddComment = async () => {
        try {
            const accessToken = sessionStorage.getItem('access_token');
            const storedUserId = sessionStorage.getItem('userId');

            if (content.trim() === "") {
                console.error("Review content is empty");
                return;
            }

            console.log('Text before making the request:', content);

            const response = await axios.post(`http://localhost:4000/addReview/${storedUserId}`, {
                filmId: film._id,
                text: content,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
            );

            console.log(response.data);
            toast.success('Review added successfully', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });

            setComments([...comments, response.data.data]);
            setContent("");
        } catch (error) {
            console.error("error adding review:", error);
        }
    }

    const handleLikeReview = async (reviewId) => {
        try {
            const accessToken = sessionStorage.getItem('access_token');

            await axios.post(
                `http://localhost:4000/like/${reviewId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            fetchFilm();
        } catch (error) {
            console.error('Error liking review', error);
        }
    }

    const handleUpdateReview = async (editedText) => {
        try {
            const accessToken = sessionStorage.getItem('access_token');
            // Make API call to update the review
            const response = await axios.put(
                `http://localhost:4000/reviews/${selectedReview._id}/edit`,
                { text: editedText },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Update the reviews state with the updated review
            const updatedReview = response.data.data;
            setReviews((prevReviews) => prevReviews.map((r) => (r._id === updatedReview._id ? updatedReview : r)));

            toast.success('Review updated successfully', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
        } catch (error) {
            console.error('Error updating review:', error);
            toast.error('Failed to update review');
        } finally {
            handleCloseEditReview();
        }
    };

    const castList = film.cast.map((person, index) => (
        <span key={index} className="cast-person">
            {person}
        </span>
    ));

    return (
        <>
            <div>
                <NavbarOfficial />
            </div>
            <div className="film-backdrop">
                <img
                    src={`/Posters/Backdropstills/house-of-lungula.png`}
                    alt={`Backdrop for ${film.title}`}
                    className="film-backdrop-image"
                />
                <div className="shadow-overlay"></div>
            </div>

            {isAddingToWatchlist && <ToastContainer />}
            <div className="container">
                <div className="film-details-container">
                    <div className="film-poster-container">
                        <img
                            src={`http://localhost:3000${film.posterImagePath}`}
                            alt={`Poster for ${film.title}`}
                            className="film-poster-single"
                        />
                    </div>
                    <div className="film-info">
                        <div className="film-info-title">
                            <h1 className="title-single">{film.title}</h1>
                            <p className="Year">{film.releaseyear}</p>
                            <p className="directed">Directed By: {film.director}</p>
                            {/*reviews*/}
                            
                        </div>
                        <div className="watchlist-button-container">
                        <button onClick={handleAddToWatchlist} disabled={isAddingToWatchlist} className="watchlist-button">
                            {isAddingToWatchlist ? 'Adding to Watchlist...' : isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </button>
                            </div>
                        <p>{film.synopsis}</p>
                        <span className="runtime"><IoTime color="#EA0085" size={40} />{film.runtime}</span>
                        {/* <p>Genres: {film.genre.map(g => g.name).join(', ')}</p> */}
                        <div className="cast-container">
                            CAST FOR THE FILM:
                            {castList}
                        </div>
                        
                    </div>
                </div>

                <div className="comments">
                    {/*COMMENT INPUT*/}
                    <div className="review-area">
                        <textarea
                            value={content}
                            name="text"
                            onChange={handleCommentChange}
                            placeholder="share thoughts about this film"
                        />
                        <button className="review-button"
                            onClick={handleAddComment}>Add review</button>
                    </div>

                    {/* all reviews */}
                    <div className="reviews-container">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <Review 
                                key={index} 
                                review={review}
                                handleLike={() => handleLikeReview(review._id)} 
                                handleEditReview={handleEditReview}
                                />
                            ))
                        ) : (
                            <p>No reviews available for this film.</p>
                        )}
                    </div>
                        {isEditingReview && (
                            <EditReview
                            review={selectedReview}
                            onUpdateReview={handleUpdateReview}
                            onClose={handleCloseEditReview}
                        />
                        )}
                </div>
            </div>
        </>
    );
}

export default SingleFilm;
