import React, { useCallback, useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import featuredContentFilms from "./featuredContentFilmsthree" // Make sure to import your MediaApi module

const SearchIcon = () => {
  // const [query, setQuery] = useState("");
  // const [onSearch, setOnSearch] = useState(false);
  // const [mediaType, setMediaType] = useState("your_default_media_type");
  // const [medias, setMedias] = useState([]);
  // const [page, setPage] = useState(1);

  // const handleSearch = useCallback(async () => {
  //   setOnSearch(true);

  //   try {
  //     const { response, err } = await featuredContentFilms.search({
  //       mediaType,
  //       query,
  //       page,
  //     });

  //     if (response) {
  //       setMedias(response.data); // Update the state with the fetched data
  //     } else {
  //       console.error("Error fetching media:", err);
  //     }
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //   } finally {
  //     setOnSearch(false);
  //   }
  // }, [mediaType, query, page]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   handleSearch();
  // };

  return (
    <div className="search-icon">
      <form>
        <FaSearchengin size={32} color="white" />
        <input
          type="text"
        />
        <button type="submit">
          SEARCH!
        </button>
      </form>
    </div>
  );
};

export default SearchIcon;
