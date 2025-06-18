import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Viewreview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("http://localhost:7000/user/viewreviews");
                setReviews(res.data.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching reviews.");
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-6">
            <h2 className="text-4xl font-extrabold text-white mb-8 uppercase tracking-wide drop-shadow-lg">
                ⭐ User Reviews
            </h2>

            {loading && <p className="text-center text-blue-300 text-lg">Loading reviews...</p>}
            {error && <p className="text-center text-red-400 text-lg">{error}</p>}

            {!loading && !error && reviews.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {reviews.map((review) => (
                        <div 
                            key={review._id} 
                            className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-6 transition transform hover:scale-105 hover:shadow-3xl border border-gray-700"
                        >
                            {/* User Info */}
                            <div className="flex items-center mb-4">
                                <img 
                                    src={`http://localhost:7000/${review.userid.image}` || "https://via.placeholder.com/60"} 
                                    alt="User" 
                                    className="w-14 h-14 rounded-full border-2 border-yellow-400 shadow-md mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-yellow-300">{review.userid.name || "Anonymous"}</h3>
                                    <p className="text-sm text-gray-400">🕒 {new Date(review.date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Star Rating with Animation */}
                            <div className="flex text-yellow-400 mb-3 animate-pulse">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-2xl" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-300 italic text-lg">“{review.review}”</p>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center text-gray-400 text-xl">No reviews found.</p>
            )}
        </div>
    );
};



export default Viewreview