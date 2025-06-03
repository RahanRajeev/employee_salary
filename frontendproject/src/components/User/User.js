import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    FaSignOutAlt, FaUser, FaWallet, FaClipboardList, FaMoneyBillWave, 
    FaLock, FaStar, FaPlusCircle, FaEnvelopeOpenText 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const User = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Redirect if not logged in
        if (!sessionStorage.getItem('uid')) {
            navigate('/login');
        }

        // Prevent going back after logout
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
        };

        // Set static images (API optional)
        setImages([
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
            "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=1600&q=80",
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80"
        ]);
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('uid');
        navigate('/login');
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center text-gray-800 p-6">
            {/* Header */}
            <motion.header 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center w-full max-w-5xl"
            >
                <h2 className="text-2xl font-bold text-gray-700">User Dashboard</h2>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-700 flex items-center gap-2"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </motion.header>

            {/* Image Carousel */}
            <div className="mt-6 w-full max-w-5xl">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className="h-80 w-full">
                            <img 
                                src={img} 
                                alt={`slide-${index}`} 
                                className="h-full w-full object-cover rounded-xl shadow-md" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/1600x900'}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Cards Section */}
            <motion.section 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
            >
                {[
                    { icon: <FaUser className="text-blue-500" />, title: "View Profile", link: "/viewprofile", color: "text-blue-500" },
                    { icon: <FaWallet className="text-green-500" />, title: "Manage Budget", link: "/addbudget", color: "text-green-500" },
                    { icon: <FaMoneyBillWave className="text-red-500" />, title: "View Expenses", link: "/viewexpense", color: "text-red-500" },
                    { icon: <FaClipboardList className="text-yellow-500" />, title: "Send Complaint", link: "/sendcomplaint", color: "text-yellow-500" },
                    { icon: <FaStar className="text-purple-500" />, title: "Reviews", link: "/addreview", color: "text-purple-500" },
                    { icon: <FaLock className="text-gray-600" />, title: "Change Password", link: "/changepassword", color: "text-gray-600" },
                    { icon: <FaPlusCircle className="text-indigo-500" />, title: "Add Expense", link: "/addexpense", color: "text-indigo-500" },
                    { icon: <FaEnvelopeOpenText className="text-teal-500" />, title: "View Reply", link: "/viewreply", color: "text-teal-500" },
                ].map((item, index) => (
                    <div key={index} className="bg-white shadow-md p-6 rounded-xl text-center">
                        <div className="text-4xl mx-auto">{item.icon}</div>
                        <h3 className="text-lg font-bold mt-3">{item.title}</h3>
                        <Link to={item.link} className={`${item.color} hover:underline`}>Go to {item.title}</Link>
                    </div>
                ))}
            </motion.section>

            {/* About Section */}
            <motion.section 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="mt-10 bg-white shadow-lg rounded-2xl p-8 max-w-5xl text-center"
            >
                <h3 className="text-xl font-semibold text-gray-800">About This Dashboard</h3>
                <p className="mt-4 text-gray-600">
                    Welcome to your User Dashboard! This platform allows you to manage your budget, track expenses, send complaints, view reports, and much more. Explore the available features using the navigation options above.
                </p>
            </motion.section>
        </div>
    );
};

export default User;
