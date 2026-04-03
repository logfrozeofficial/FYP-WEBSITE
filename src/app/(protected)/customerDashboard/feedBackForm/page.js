"use client";

import { useState } from "react";
import "./feedbackForm.css";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment, photos });
    alert("Feedback submitted!");
    // Reset form
    setRating(0);
    setHoverRating(0);
    setComment("");
    setPhotos([]);
  };

  return (
    <div className="feedback-form-page">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>Leave Your Feedback</h2>

        {/* Star Rating */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment */}
        <div className="form-group">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            rows="5"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <label htmlFor="photos">Upload Photos</label>
          <input
            id="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
          <div className="photo-preview">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`preview ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
}