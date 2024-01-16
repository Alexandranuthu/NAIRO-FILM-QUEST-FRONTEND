import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import { Slide, ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Searchicon.css";

const SearchIcon = ( ) => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const onChange = async (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setSearchKey(inputValue);
  
    try {
      setLoading(true);
  
      const accessToken = sessionStorage.getItem('access_token');
  
      // Check if the input value is empty, and reset the results if true
      if (inputValue.trim() === '') {
        setResults([]);
      } else {
        const response = await axios.get(`http://localhost:4000/search?q=${inputValue}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Response:', response);
  
        if (response.status === 200) {
          const data = response.data;
          console.log('Data:', data);
          setResults(data.data);
        } else {
          console.error('Error:', response.status, response.statusText);
          setResults([]);
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToWatchlist = async (id) => {
    try{
      setWatchlist(true);

      const accessToken = sessionStorage.getItem('access_token');
      const storedUserId = sessionStorage.getItem('userId');

      const response = await axios.post(
        `http://localhost:4000/addToWatchlist/${storedUserId}`,
        {filmId: id},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('Film added to watchlist', response.data);
      // Check if the response indicates the movie is already in the watchlist
      if (response.status === 400 && response.data.message === 'Movie is already in the watchlist') {
        toast.warn('Film is already in your watchlist');
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
    }else{
      console.error('Unexpected response:', response.status, response.data);
    }
  }catch(error){
    console.error('Error adding film to watchlist', error);

    toast.error('Failed to add film to watchlist');
  }finally{
    setWatchlist(false);
  }
};



  const onSubmit = (e) => {
    e.preventDefault();
    // You can perform additional actions if needed
  };

  return (
    <div className="search-icon">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchKey}
          onChange={onChange}
          placeholder="Search for Films..."
        />
        <button type="submit">
          <FaSearchengin size={25} className="icon" />
        </button>
      </form>
      {results.length > 0 && (
        <div className="results">
          {results.map((film) => (
            <div key={film._id}>
              <Link to={`/film/${film._id}`} style={{ color: 'gold', textDecoration: 'none', backgroundColor: 'white' }}>
              <img src={`${process.env.PUBLIC_URL}/Posters${film.posterImagePath}`} alt={`Poster for ${film.title}`} className="film-posters-featured" />

              <p>{film.title}</p>
              <p>{film.releaseyear}</p>
              </Link>
              <div className="watchlist">
  <button onClick={handleAddToWatchlist} disabled={watchlist} className="watchlist btn">
    {watchlist ? 'Adding to Watchlist...' : 'Add to Watchlist'}
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
