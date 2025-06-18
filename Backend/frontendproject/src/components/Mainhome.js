import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaMoneyBillWave, FaChartBar, FaComments, FaCogs, FaUserShield, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';



const Mainhome = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

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




  //   userreg
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState('')
  const navuser = useNavigate()
  const userreg = async (e) => {
    e.preventDefault()
    setIsButtonClicked(true);
    const res = await axios.post("http://localhost:7000/user/userreg",
      { username, useremail, usergender, userphone, userpassword, usercpassword, userfile },
      { headers: { 'Content-Type': 'multipart/form-data' } })
    if (userphone.length !== 10 || !isStrongPassword(userpassword)) {
      return; // Stop submission if phone number is invalid
    }
    if (res.data.status === 'user') {
      alert('ok')
      navuser('/')
    } else {
      alert('username or password is already exist')
      navuser('/')
    }
  }
  const [useremail, setuseremail] = useState('')
  const [usergender, setusergender] = useState('')
  const [userphone, setuserphone] = useState('')
  const [userpassword, setuserpassword] = useState('')
  const [usercpassword, setusercpassword] = useState('')
  const [userfile, setuserfile] = useState('')
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (!useremail) {
      setMessage("");
      return;
    }

    setLoading(true);

    const checkEmail = async () => {
      const response = await axios.get(`http://localhost:7000/user/checkemail/${useremail}`);

      if (response.data.exists) {
        setMessage("Email already exists!");
      } else {
        setMessage("Email available!");
      }

      setLoading(false);
    };

    // Debounce API calls (waits 1000ms after the last keystroke)
    const timeoutId = setTimeout(checkEmail, 1000);
    return () => clearTimeout(timeoutId);
  }, [useremail]);


  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //login

  const goToLogin = () => {
    navuser('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111' : '#f8f9fa',
      color: darkMode ? '#ecf0f1' : '#2c3e50',
      fontFamily: 'Arial, sans-serif',
      transition: 'all 0.5s ease'
    }}>
      {/* Header */}
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
          <button style={buttonStyle} onClick={goToLogin}>Login</button>
          <button style={buttonStyle} onClick={handleShow}>Register</button>
          <span
            style={{ marginLeft: '15px', cursor: 'pointer', fontSize: '20px' }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun color="yellow" /> : <FaMoon />}
          </span>
        </div>
      </header>

      {/* Spacing Between Navbar and Image */}
      <div style={{ height: '20px' }}></div>

      {/* Image Carousel */}
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



      {/* Register */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
          <Form className='reg' onSubmit={userreg} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Form.Group controlId="emailInput" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

              <Form.Label style={{ fontWeight: 'bold' }}>Username</Form.Label>
              {isButtonClicked && !username && <span style={{ color: "red", fontSize: '12px' }}>Username is required!</span>}
              <Form.Control
                type="text"
                onChange={(e) => setusername(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />

              <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
              <span style={{ color: message === "Email already exists!" ? "red" : "green", fontSize: '12px' }}>
                {loading ? "Checking..." : message}
              </span>
              <Form.Control
                type="email"
                value={useremail}
                placeholder="name@example.com"
                onChange={(e) => setuseremail(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />

              <Form.Label style={{ fontWeight: 'bold' }}>Gender</Form.Label>
              {isButtonClicked && !usergender && <span style={{ color: "red", fontSize: '12px' }}>Gender is required!</span>}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label><input type="radio" name="gen" value="male" onChange={(e) => setusergender(e.target.value)} /> Male</label>
                <label><input type="radio" name="gen" value="female" onChange={(e) => setusergender(e.target.value)} /> Female</label>
                <label><input type="radio" name="gen" value="other" onChange={(e) => setusergender(e.target.value)} /> Others</label>
              </div>

              <Form.Label style={{ fontWeight: 'bold' }}>Phone</Form.Label>
              {isButtonClicked && userphone.length > 0 && userphone.length !== 10 && (
                <span style={{ color: "red", fontSize: '12px' }}>Phone number must be 10 digits!</span>
              )}
              <Form.Control
                type="text"
                value={userphone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setuserphone(value);
                  }
                }}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />


              <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
              {isButtonClicked && !userpassword && (
                <span style={{ color: "red", fontSize: '12px' }}>Password is required!</span>
              )}
              {isButtonClicked && userpassword && !isStrongPassword(userpassword) && (
                <span style={{ color: "red", fontSize: '12px' }}>
                  Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character!
                </span>
              )}
              <Form.Control
                type="password"
                onChange={(e) => setuserpassword(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />


              <Form.Label style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
              {isButtonClicked && userpassword && usercpassword && userpassword !== usercpassword && (
                <span style={{ color: "red", fontSize: '12px' }}>Passwords do not match!</span>
              )}
              <Form.Control
                type="text"
                onChange={(e) => setusercpassword(e.target.value)}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />

              <Form.Label style={{ fontWeight: 'bold' }}>Image</Form.Label>
              {isButtonClicked && !userfile && <span style={{ color: "red", fontSize: '12px' }}>Image is required!</span>}
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => setuserfile(e.target.files[0])}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <Button variant="secondary" onClick={handleClose} style={{ padding: '6px 16px' }}>Close</Button>
              <Button
                variant="primary"
                type="submit"
                // disabled={
                //   loading || message === "Email already exists!" ||
                //   userphone.length !== 10 ||
                //   !username || !useremail || !usergender || !userphone ||
                //   !userpassword || !usercpassword || !userfile ||
                //   userpassword !== usercpassword
                // }
                style={{ padding: '6px 16px', backgroundColor: '#007bff', border: 'none' }}
              >
                Register
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f1f1f1' }} />
      </Modal>

      {/* About Section */}
      <section style={{ padding: '30px 20px', textAlign: 'center' }}>
        <h1>Welcome to Employee Salary Management System</h1>
        <p>Manage salaries, track expenses, file complaints, and view profiles seamlessly.</p>
      </section>

      {/* Features Section */}
      <section style={{ padding: '30px 20px', backgroundColor: darkMode ? '#1e293b' : '#f8f9fa' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Key Features</h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'
        }}>
          <FeatureCard icon={<FaMoneyBillWave />} text="Salary Management" />
          <FeatureCard icon={<FaChartBar />} text="Expense Tracking" />
          <FeatureCard icon={<FaComments />} text="Complaint System" />
          <FeatureCard icon={<FaCogs />} text="Admin Controls" />
          <FeatureCard icon={<FaUser />} text="User Profiles" />
          <FeatureCard icon={<FaUserShield />} text="User Blocking" />
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ textAlign: 'center', padding: '30px 20px' }}>
        <h2>Contact Us</h2>
        <p>Email: support@salarysystem.com</p>
        <p>Phone: +91 98765 43210</p>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1'
      }}>
        &copy; 2025 Employee Salary Management System
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, text }) => (
  <motion.div
    style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '150px',
      cursor: 'pointer',
      color: '#16a085'
    }}
    whileHover={{ scale: 1.1 }}
    transition={{ duration: 0.3 }}
  >
    <div style={{ fontSize: '30px', marginBottom: '10px' }}>
      {icon}
    </div>
    <div>{text}</div>
  </motion.div>
);

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

buttonStyle[':hover'] = {
  backgroundColor: '#2980b9'
};

export default Mainhome