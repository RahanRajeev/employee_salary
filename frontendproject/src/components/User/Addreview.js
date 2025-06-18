import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Addreview = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch reviews from the backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("http://localhost:7000/user/viewreviews");
                setReviews(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    // Submit Review
    const handleSubmitReview = async () => {
        const uid = sessionStorage.getItem("uid");
        if (rating === 0 || comment.trim() === "") {
            alert("Please select a rating and enter a comment.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:7000/user/addreview", {
                rating,
                comment,
                uid
            });
            alert("Review submitted successfully!");
            setReviews([...reviews, { rating, comment, date: new Date() }]);  // Update UI
            setRating(0);
            setComment("");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Leave a Review</h2>

            {/* Star Rating Input */}
            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                                className="hidden"
                            />
                            <FaStar
                                size={30}
                                className="cursor-pointer transition-colors"
                                color={currentRating <= (hover || rating) ? "#facc15" : "#e5e7eb"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>

            {/* Comment Input */}
            <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                rows="3"
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <button
                className="w-full bg-blue-500 text-white py-2 mt-3 rounded-lg hover:bg-blue-600 transition"
                onClick={handleSubmitReview}
            >
                Submit Review
            </button>

            {/* Reviews List */}
            <h3 className="text-xl font-semibold text-gray-700 mt-6">Reviews</h3>
            {loading ? (
                <p className="text-gray-500">Loading reviews...</p>
            ) : reviews.length > 0 ? (
                <div className="mt-3 space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="p-3 border rounded-md shadow-sm bg-gray-50">
                            <div className="flex items-center space-x-2">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} size={18} color="#facc15" />
                                ))}
                            </div>
                            <p className="text-gray-700 mt-1">{review.review}</p>
                            <p className="text-gray-500 text-sm mt-1">
                                Reviewed on: {new Date(review.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No reviews yet.</p>
            )}
        </div>
    );
};

export default Addreview