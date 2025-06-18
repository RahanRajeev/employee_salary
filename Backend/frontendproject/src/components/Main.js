import React, { useState, useEffect } from 'react';
import { FaUser, FaMoneyBillWave, FaChartBar, FaComments, FaCogs, FaUserShield, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
        "https://images.unsplash.com/photo-1556761175-4b46a572b786"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: darkMode ? '#111' : '#f8f9fa',
            color: darkMode ? '#ecf0f1' : '#2c3e50',
            fontFamily: 'Arial, sans-serif',
            transition: 'all 0.5s ease'
        }}>
            <header style={{
                padding: '20px 50px',
                backgroundColor: darkMode ? '#2c3e50' : '#2c3e50',
                color: '#ecf0f1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>Employee Salary Management System</h2>
                <div>
                    <button style={buttonStyle}>Login</button>
                    <button style={buttonStyle}>Register</button>
                    <span
                        style={{ marginLeft: '15px', cursor: 'pointer', fontSize: '20px' }}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? <FaSun color="yellow" /> : <FaMoon />}
                    </span>
                </div>
            </header>

            <div style={{ width: '100%', height: '350px', overflow: 'hidden', position: 'relative' }}>
                {images.map((img, index) => (
                    <motion.img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: index === currentImageIndex ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        }}
                    />
                ))}
            </div>

            {/* User Home Image */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img 
    src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5" 
    alt="User Home"
    style={{ width: '80%', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
/>
            </div>
        </div>
    );
};

const buttonStyle = {
    marginRight: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    outline: 'none'
};

export default Main;
