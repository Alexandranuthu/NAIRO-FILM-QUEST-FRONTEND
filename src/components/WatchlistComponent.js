import React, { useState } from 'react';
import './Watchlist.css';
import { FaEye } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { MdBookmarkRemove } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState("");

  return (
    <>
      <div className='main-container'>
        <div className='watchlist-container'>
          {/* watched? */}
          <div className='watched'>
              <FaEye />
          </div>

          {/* add to watchlist */}
          <div className='watchlist'>
            <MdBookmarkAdded />
            <MdBookmarkRemove />
          </div>

          {/* rate */}
          <div className='rate'>
          <IoStarOutline />
          </div>

          {/* add to list */}
          <div>
            Add to list
          </div>
        </div>
      </div>
    </>
  )
}
export default Watchlist;