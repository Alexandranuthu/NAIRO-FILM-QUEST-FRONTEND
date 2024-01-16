import React from "react";
import { useState } from "react";

const EditReview = ({ review, onUpdateReview, onClose}) => {
    //state to track the edited text of the review
    const [editedText, setEditedText] = useState(review.content);


    //event handler to update the state when the text in the text area changes
    const handleTextChange = (event) => {
        setEditedText(event.target.value);
    };

    // Event handler to trigger the review update when the "Update Review" button is clicked
    const handleUpdateReview = () => {
        onUpdateReview(editedText);
    };

    return(
        <>
            <div>
                <textarea
                value={editedText}
                onChange={handleTextChange}
                placeholder="edit your review"
                />

                <button onClick={handleUpdateReview}>Update Review</button>

                <button onClick={onClose}>Cancel</button>
            </div>
        </>
    )
 }
 export default EditReview;