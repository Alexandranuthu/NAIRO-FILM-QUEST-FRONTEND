import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";

import "./Searchicon.css";

const SearchIcon = ( ) => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = async (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/search?q=${e.target.value}`);
      console.log('Response:', response);

      if (response.status === 200) {
        const data = response.data;
        console.log('Data:', data);
        setResults(data.data);
      } else {
        console.error('Error:', response.status, response.statusText);
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setLoading(false);
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
              <Link to={`/film/${film._id}`}>
              <p>{film.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
